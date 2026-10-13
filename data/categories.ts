import type { SeedRow } from '@/lib/schema/tables'

// SAMPLE CONTENT.
//
// `as const satisfies readonly SeedRow<'categories'>[]`:
// - satisfies: each row is checked against the category schema's input type
//   (a typo in `tone` or an unknown slug is a compile error), but
// - as const: the list keeps its exact literal types, so code can ask for
//   (typeof categories)[number]['slug'] and get the five literal slugs.
export const categories = [
  {
    id: 'cat_tech-skills',
    slug: 'tech-skills',
    name: 'Tech skills',
    description: 'Build websites and write your first programs, starting from zero.',
    tone: 'indigo',
  },
  {
    id: 'cat_design',
    slug: 'design',
    name: 'Design',
    description: 'Design clear, friendly screens for apps and websites.',
    tone: 'plum',
  },
  {
    id: 'cat_small-business',
    slug: 'small-business',
    name: 'Small business',
    description: 'Practical tools to run, promote and grow a small business.',
    tone: 'kola',
  },
  {
    id: 'cat_money-skills',
    slug: 'money-skills',
    name: 'Money skills',
    description: 'Keep records, understand profit and stay on top of your cash.',
    tone: 'leaf',
  },
  {
    id: 'cat_exam-prep',
    slug: 'exam-prep',
    name: 'Exam prep',
    description: 'Focused practice for JAMB UTME and WAEC papers.',
    tone: 'sun',
  },
] as const satisfies readonly SeedRow<'categories'>[]
