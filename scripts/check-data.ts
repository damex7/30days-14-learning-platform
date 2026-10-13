/*
  npm run check:data            validate the seed data in /data
  npm run check:data -- --broken  validate a deliberately broken copy (to see the report)

  Stage 1 parses every row with its Zod schema (each row on its own).
  Stage 2 checks rows against each other: references, unique slugs, quiz
  answers pointing at real options, module and lesson counts.

  Any problem prints a report and exits with code 1, so this can run in CI
  before `next build` and stop a broken deploy.
*/
import { seed as realSeed } from '@/data'
import { checkSeed, parseSeed, type SeedProblem } from '@/lib/seed'
import type { TableName } from '@/lib/schema/tables'
import { breakSeed } from './broken-seed'

const color = process.stdout.isTTY && !process.env.NO_COLOR
const paint = (code: number) => (text: string) => (color ? `\x1b[${code}m${text}\x1b[0m` : text)
const red = paint(31)
const green = paint(32)
const yellow = paint(33)
const dim = paint(2)
const bold = paint(1)

const broken = process.argv.includes('--broken')
const { seed, changes } = broken ? breakSeed(realSeed) : { seed: realSeed, changes: [] }

console.log(bold('\nÌmọ̀ seed data check') + (broken ? yellow('  (deliberately broken copy)') : ''))
if (changes.length) {
  console.log(dim('Changes made to the copy:'))
  for (const change of changes) console.log(dim(`  • ${change}`))
}

function printProblems(problems: readonly SeedProblem[]) {
  for (const p of problems) {
    console.log(`  ${red('✗')} ${p.kind.padEnd(10)} ${bold(p.where)}`)
    console.log(`      ${p.message}`)
  }
}

function fail(stage: string, problems: readonly SeedProblem[]): never {
  console.log(`${red('✗')} ${stage}: ${problems.length} ${problems.length === 1 ? 'problem' : 'problems'}\n`)
  printProblems(problems)
  console.log(red(bold(`\n✗ Seed data is broken. Fix the ${problems.length === 1 ? 'problem' : 'problems'} above before running the app.\n`)))
  process.exit(1)
}

// Stage 1: schemas
const parsed = parseSeed(seed)
if (!parsed.ok) fail('Stage 1 · schemas', parsed.error)
const tables = parsed.value
// Object.keys() is typed string[] (TypeScript can't promise an object has no
// extra keys at runtime). `tables` was built from exactly the table names in
// lib/seed.ts, so asserting TableName[] is safe here.
const counts = (Object.keys(tables) as TableName[]).map((name) => `${tables[name].length} ${name}`).join(', ')
console.log(`${green('✓')} Stage 1 · schemas      ${dim(counts)}`)

// Stage 2: references and rules
const problems = checkSeed(tables)
if (problems.length) fail('Stage 2 · references', problems)
console.log(`${green('✓')} Stage 2 · references   ${dim('every ID points at a real row; slugs unique; answers valid')}`)
console.log(green(bold('\n✓ Seed data is valid.\n')))
