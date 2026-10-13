/*
  A TINY, TYPED MARKDOWN PARSER

  Article lessons are written in a small subset of Markdown. Instead of adding
  a library and injecting HTML strings with dangerouslySetInnerHTML, we parse
  the text into a TREE OF TYPED NODES, and a Server Component
  (components/markdown.tsx) renders each node with an exhaustive switch.

  It is the same pattern as lessons and questions: a discriminated union on
  `type`, so the renderer can't forget a node type, and there is no HTML
  string anywhere that could carry a script.

  Supported: ## and ### headings, paragraphs, - and 1. lists, ``` code blocks,
  > quotes, | tables |, **bold**, *italic*, `code` and [links](https://...).
*/

export type Inline =
  | { type: 'text'; value: string }
  | { type: 'strong'; children: Inline[] }
  | { type: 'em'; children: Inline[] }
  | { type: 'code'; value: string }
  | { type: 'link'; href: string; children: Inline[] }

export type Block =
  | { type: 'heading'; level: 2 | 3; children: Inline[] }
  | { type: 'paragraph'; children: Inline[] }
  | { type: 'list'; ordered: boolean; items: Inline[][] }
  | { type: 'code'; language: string | null; value: string }
  | { type: 'quote'; children: Inline[] }
  | { type: 'table'; header: Inline[][]; rows: Inline[][][] }

const FENCE = /^```\s*([\w-]*)\s*$/
const HEADING = /^(#{2,3})\s+(.+)$/
const QUOTE = /^>\s?(.*)$/
const TABLE_ROW = /^\|(.+)\|\s*$/
const TABLE_DIVIDER = /^\|?\s*:?-{3,}/
const BULLET = /^[-*]\s+(.+)$/
const NUMBERED = /^\d+\.\s+(.+)$/

/** Does this line start a block other than a paragraph? */
const startsBlock = (line: string) =>
  FENCE.test(line) || HEADING.test(line) || QUOTE.test(line) || TABLE_ROW.test(line) || BULLET.test(line) || NUMBERED.test(line)

/** Collects consecutive lines matching a pattern, returning the captured group of each. */
function takeWhile(lines: readonly string[], start: number, pattern: RegExp): { items: string[]; next: number } {
  const items: string[] = []
  let i = start
  for (let line = lines[i]; line !== undefined; line = lines[++i]) {
    const match = pattern.exec(line)
    if (!match) break
    items.push(match[1] ?? '')
  }
  return { items, next: i }
}

const splitCells = (row: string) => row.split('|').map((cell) => parseInline(cell.trim()))

export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n?/g, '\n').split('\n')
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    // noUncheckedIndexedAccess: lines[i] is string | undefined, even inside
    // the bounds check. The `?? ''` handles it honestly instead of with `!`.
    const line = lines[i] ?? ''

    if (line.trim() === '') {
      i++
      continue
    }

    const fence = FENCE.exec(line)
    if (fence) {
      const body: string[] = []
      i++
      while (i < lines.length && !FENCE.test(lines[i] ?? '')) body.push(lines[i++] ?? '')
      i++ // skip the closing fence
      blocks.push({ type: 'code', language: fence[1] || null, value: body.join('\n') })
      continue
    }

    const heading = HEADING.exec(line)
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1] === '##' ? 2 : 3, children: parseInline(heading[2] ?? '') })
      i++
      continue
    }

    if (QUOTE.test(line)) {
      const { items, next } = takeWhile(lines, i, QUOTE)
      blocks.push({ type: 'quote', children: parseInline(items.join(' ')) })
      i = next
      continue
    }

    if (TABLE_ROW.test(line)) {
      const { items, next } = takeWhile(lines, i, TABLE_ROW)
      const [headerRow = '', ...rest] = items
      const bodyRows = rest.filter((row) => !TABLE_DIVIDER.test(`|${row}|`))
      blocks.push({ type: 'table', header: splitCells(headerRow), rows: bodyRows.map(splitCells) })
      i = next
      continue
    }

    if (BULLET.test(line) || NUMBERED.test(line)) {
      const ordered = NUMBERED.test(line)
      const { items, next } = takeWhile(lines, i, ordered ? NUMBERED : BULLET)
      blocks.push({ type: 'list', ordered, items: items.map(parseInline) })
      i = next
      continue
    }

    // A paragraph runs until a blank line or the start of another block.
    const text: string[] = []
    while (i < lines.length) {
      const current = lines[i] ?? ''
      if (current.trim() === '' || (text.length > 0 && startsBlock(current))) break
      text.push(current.trim())
      i++
    }
    blocks.push({ type: 'paragraph', children: parseInline(text.join(' ')) })
  }

  return blocks
}

/*
  Inline syntax, tried left to right. Order matters: `code` first (so a * inside
  code is just a character), then **strong**, then *em* (which may contain
  **strong**), then [links](...).
*/
const INLINE = /(`[^`]+`)|(\*\*[^*]+?\*\*)|(\*(?!\*)(?:[^*]|\*\*[^*]+\*\*)+?\*(?!\*))|(\[[^\]]+\]\([^)\s]+\))/g

/** Only these links are rendered as links; anything else becomes plain text. */
const SAFE_HREF = /^(\/|#|https:\/\/|mailto:|tel:)/

export function parseInline(text: string): Inline[] {
  const nodes: Inline[] = []
  let last = 0
  for (const match of text.matchAll(INLINE)) {
    const [token] = match
    const start = match.index
    if (start > last) nodes.push({ type: 'text', value: text.slice(last, start) })
    if (match[1]) nodes.push({ type: 'code', value: token.slice(1, -1) })
    else if (match[2]) nodes.push({ type: 'strong', children: parseInline(token.slice(2, -2)) })
    else if (match[3]) nodes.push({ type: 'em', children: parseInline(token.slice(1, -1)) })
    else if (match[4]) {
      const linkMatch = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token)
      const label = linkMatch?.[1] ?? token
      const href = linkMatch?.[2] ?? ''
      nodes.push(SAFE_HREF.test(href) ? { type: 'link', href, children: parseInline(label) } : { type: 'text', value: label })
    }
    last = start + token.length
  }
  if (last < text.length) nodes.push({ type: 'text', value: text.slice(last) })
  return nodes
}
