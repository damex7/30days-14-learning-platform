import Link from 'next/link'
import type { ReactNode } from 'react'
import { assertNever } from '@/lib/guards'
import { parseMarkdown, parseInline, type Block, type Inline } from '@/lib/markdown'

/*
  Renders the typed Markdown tree from lib/markdown.ts. Two exhaustive
  switches (blocks and inline nodes): a new node type in the parser is a
  compile error here until it has a way to render. No HTML strings, no
  dangerouslySetInnerHTML.
*/

function renderInline(nodes: readonly Inline[]): ReactNode[] {
  return nodes.map((node, i) => {
    switch (node.type) {
      case 'text':
        return node.value
      case 'strong':
        return (
          <strong key={i} className="font-semibold text-ink">
            {renderInline(node.children)}
          </strong>
        )
      case 'em':
        return <em key={i}>{renderInline(node.children)}</em>
      case 'code':
        return (
          <code key={i} className="rounded bg-sunken px-1.5 py-0.5 font-mono text-[0.88em] text-ink">
            {node.value}
          </code>
        )
      case 'link':
        return node.href.startsWith('/') ? (
          <Link key={i} href={node.href} className="font-medium text-brand underline">
            {renderInline(node.children)}
          </Link>
        ) : (
          <a key={i} href={node.href} className="font-medium text-brand underline" rel="noopener noreferrer">
            {renderInline(node.children)}
          </a>
        )
      default:
        return assertNever(node, 'Unknown inline node')
    }
  })
}

function renderBlock(block: Block, key: number): ReactNode {
  switch (block.type) {
    case 'heading':
      return block.level === 2 ? (
        <h2 key={key} className="mt-9 text-2xl font-semibold first:mt-0">
          {renderInline(block.children)}
        </h2>
      ) : (
        <h3 key={key} className="mt-7 text-xl font-semibold">
          {renderInline(block.children)}
        </h3>
      )
    case 'paragraph':
      return (
        <p key={key} className="mt-4 first:mt-0">
          {renderInline(block.children)}
        </p>
      )
    case 'list': {
      const items = block.items.map((item, i) => (
        <li key={i} className="pl-1">
          {renderInline(item)}
        </li>
      ))
      return block.ordered ? (
        <ol key={key} className="mt-4 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-muted">
          {items}
        </ol>
      ) : (
        <ul key={key} className="mt-4 list-disc space-y-2 pl-6 marker:text-accent">
          {items}
        </ul>
      )
    }
    case 'code':
      // tabIndex makes the scrollable block reachable by keyboard, so long
      // lines can be scrolled without a mouse.
      return (
        <pre
          key={key}
          tabIndex={0}
          aria-label={block.language ? `${block.language} code example` : 'Code example'}
          className="mt-5 overflow-x-auto rounded-control border border-line bg-sunken p-4 font-mono text-sm leading-relaxed text-ink"
        >
          <code>{block.value}</code>
        </pre>
      )
    case 'quote':
      return (
        <blockquote key={key} className="mt-5 rounded-r-control border-l-4 border-accent bg-accent-soft/60 px-4 py-3 text-ink">
          {renderInline(block.children)}
        </blockquote>
      )
    case 'table':
      return (
        <div key={key} tabIndex={0} role="region" aria-label="Table" className="mt-5 overflow-x-auto rounded-control border border-line">
          <table className="w-full border-collapse text-left text-[0.95rem]">
            <thead className="bg-sunken">
              <tr>
                {block.header.map((cell, i) => (
                  <th key={i} scope="col" className="px-3 py-2 font-semibold whitespace-nowrap text-ink">
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-line">
                  {row.map((cell, c) => (
                    <td key={c} className="px-3 py-2 align-top">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return assertNever(block, 'Unknown block')
  }
}

export function Markdown({ source }: { source: string }) {
  return <div className="text-[1.0625rem] leading-[1.75] text-ink/90">{parseMarkdown(source).map(renderBlock)}</div>
}

/** Inline Markdown only (no paragraphs), for quiz prompts like "What is `h1`?". */
export function InlineMarkdown({ text }: { text: string }) {
  return <>{renderInline(parseInline(text))}</>
}
