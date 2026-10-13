import type { CourseBundle } from '@/data/types'

// SAMPLE CONTENT written for this demo. This course is new and has no reviews
// yet, which shows the "no reviews" empty state and a null average rating.

export const waecMathsPastQuestions: CourseBundle = {
  course: {
    id: 'crs_waec-maths',
    slug: 'waec-maths-past-questions',
    title: 'WAEC Maths: tough past questions',
    subtitle: 'Indices, logarithms, quadratics and sequences: the topics that cost candidates the most marks, worked step by step.',
    description:
      'This is not a first course in mathematics. It is for SS3 students who know the basics but lose marks on the same hard topics every year. Each lesson takes one topic, shows the method examiners expect, and works through questions in the style of WAEC and NECO papers. Use the short quizzes to check that you can apply each method under time pressure.',
    level: 'advanced',
    categoryId: 'cat_exam-prep',
    instructorId: 'ins_aisha-bello',
    priceKobo: 0,
    language: 'English',
    outcomes: [
      'Apply the laws of indices and logarithms to solve equations',
      'Solve quadratic equations by factorisation and by formula',
      'Use the discriminant, and the sum and product of roots',
      'Find terms and sums of arithmetic and geometric progressions',
    ],
    requirements: ['Comfortable with SS2 algebra', 'A scientific calculator', 'Pencil and paper for working'],
    cover: {
      src: '/covers/waec-maths-past-questions.svg',
      alt: 'Golden adire-style pattern with a parabola curve, a square-root sign and grid lines',
    },
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-06',
  },

  modules: [
    { id: 'mod_maths-1', courseId: 'crs_waec-maths', position: 1, title: 'Indices and logarithms', summary: 'Laws, equations and common traps.' },
    { id: 'mod_maths-2', courseId: 'crs_waec-maths', position: 2, title: 'Quadratic equations', summary: 'Factorisation, the formula and word problems.' },
    { id: 'mod_maths-3', courseId: 'crs_waec-maths', position: 3, title: 'Sequences and series', summary: 'Arithmetic and geometric progressions.' },
  ],

  lessons: [
    {
      id: 'les_maths-1-1',
      moduleId: 'mod_maths-1',
      slug: 'laws-of-indices',
      position: 1,
      kind: 'article',
      title: 'Laws of indices',
      summary: 'Six rules and how to use them to solve equations.',
      bodyMarkdown: `Almost every indices question is solved with the same six laws. Learn them until you don't have to think.

| Law | In symbols |
| --- | --- |
| Multiply: add the powers | \`a^m × a^n = a^(m+n)\` |
| Divide: subtract the powers | \`a^m ÷ a^n = a^(m−n)\` |
| Power of a power: multiply | \`(a^m)^n = a^(mn)\` |
| Zero power | \`a^0 = 1\` (for a ≠ 0) |
| Negative power | \`a^(−n) = 1 / a^n\` |
| Fractional power | \`a^(m/n)\` = the nth root of a, raised to the power m |

## Worked example: a fractional power

\`27^(2/3)\`: take the cube root first (3), then square it: **9**. Taking the root first keeps the numbers small.

## Worked example: an equation

Solve \`2^(x+1) = 32\`.

1. Write both sides with the **same base**: \`32 = 2^5\`.
2. So \`2^(x+1) = 2^5\`.
3. Same base, so the powers are equal: \`x + 1 = 5\`.
4. **x = 4.**

> The trap: \`2^3 × 3^2\` cannot be simplified with these laws. The laws only work when the **bases are the same**.`,
    },
    {
      id: 'les_maths-1-2',
      moduleId: 'mod_maths-1',
      slug: 'solving-log-equations',
      position: 2,
      kind: 'video',
      title: 'Solving logarithm equations',
      summary: 'Combine logs, remove them, and check your answers.',
      durationSeconds: 540,
      transcript:
        'A logarithm answers the question: what power do I raise the base to? Log base 2 of 8 is 3, because 2 to the power 3 is 8. The laws of logs mirror the laws of indices: log of a product is the sum of the logs, log of a quotient is the difference, and log of x to the n is n times log x. Let us solve a typical question: log base 3 of x plus log base 3 of x minus 2 equals 1. First combine the logs using the product law: log base 3 of x times x minus 2 equals 1. Now remove the log: x times x minus 2 equals 3 to the power 1, which is 3. Expand: x squared minus 2x minus 3 equals 0. Factorise: x minus 3, times x plus 1, equals 0, so x is 3 or minus 1. Now the step many candidates skip: check. Log of a negative number is undefined, so x equals minus 1 is rejected. The only answer is x equals 3.',
    },
    {
      id: 'les_maths-1-3',
      moduleId: 'mod_maths-1',
      slug: 'indices-check',
      position: 3,
      kind: 'quiz',
      title: 'Check: indices and logarithms',
      summary: 'Four exam-style questions.',
      quizId: 'quiz_maths-1',
    },

    {
      id: 'les_maths-2-1',
      moduleId: 'mod_maths-2',
      slug: 'factorisation',
      position: 1,
      kind: 'article',
      title: 'Solving by factorisation',
      summary: 'The fastest method when it works.',
      bodyMarkdown: `A quadratic equation has the form \`ax² + bx + c = 0\`. When it factorises neatly, factorisation is the fastest method.

## When a = 1

Solve \`x² − 5x + 6 = 0\`.

Find two numbers that **multiply** to \`c\` (6) and **add** to \`b\` (−5): they are −2 and −3.

\`\`\`
(x − 2)(x − 3) = 0
x = 2  or  x = 3
\`\`\`

If a product is zero, one of the factors must be zero. That's why we can split it into two answers.

## When a is not 1

Solve \`2x² + 3x − 2 = 0\`.

Multiply \`a × c = −4\`. Find two numbers that multiply to −4 and add to 3: **4 and −1**. Split the middle term:

\`\`\`
2x² + 4x − x − 2 = 0
2x(x + 2) − 1(x + 2) = 0
(2x − 1)(x + 2) = 0
x = 1/2  or  x = −2
\`\`\`

## Always check

Substitute each answer back into the original equation. It takes ten seconds and catches sign errors, which are the most common mistake.`,
    },
    {
      id: 'les_maths-2-2',
      moduleId: 'mod_maths-2',
      slug: 'the-quadratic-formula',
      position: 2,
      kind: 'article',
      title: 'The formula and the discriminant',
      summary: 'A method that always works, and what b² − 4ac tells you.',
      bodyMarkdown: `When an equation doesn't factorise, use the formula:

\`\`\`
x = ( −b ± √(b² − 4ac) ) / 2a
\`\`\`

## Worked example

Solve \`2x² + 3x − 2 = 0\`, so \`a = 2\`, \`b = 3\`, \`c = −2\`.

\`\`\`
b² − 4ac = 9 − (4 × 2 × −2) = 9 + 16 = 25
x = (−3 ± 5) / 4
x = 2/4 = 1/2   or   x = −8/4 = −2
\`\`\`

Same answers as factorisation, as it should be.

## The discriminant: b² − 4ac

The part under the square root tells you about the roots **before** you solve:

| b² − 4ac | Roots |
| --- | --- |
| Positive | Two different real roots |
| Zero | One repeated real root |
| Negative | No real roots |

## Sum and product of roots

For \`ax² + bx + c = 0\` with roots α and β:

- **Sum:** \`α + β = −b/a\`
- **Product:** \`αβ = c/a\`

These answer "find the sum of the roots" questions without solving at all. For \`x² − 5x + 6 = 0\`: sum = 5, product = 6. Check: 2 + 3 = 5 and 2 × 3 = 6.`,
    },
    {
      id: 'les_maths-2-3',
      moduleId: 'mod_maths-2',
      slug: 'word-problems',
      position: 3,
      kind: 'video',
      title: 'Quadratic word problems',
      summary: 'Turn a story into an equation, and reject impossible answers.',
      durationSeconds: 600,
      transcript:
        'Word problems scare many candidates, but they follow a pattern. Here is one: the length of a rectangular plot of land in Kaduna is 5 metres more than its width. Its area is 84 square metres. Find its dimensions. Step one: name the unknown. Let the width be w metres. Then the length is w plus 5. Step two: write the equation from the information. Area is length times width, so w times w plus 5 equals 84. Step three: rearrange to equal zero: w squared plus 5w minus 84 equals 0. Step four: solve. Two numbers that multiply to minus 84 and add to 5 are 12 and minus 7. So w plus 12, times w minus 7, equals 0, and w is minus 12 or 7. Step five: interpret. A width cannot be negative, so we reject minus 12. The width is 7 metres and the length is 12 metres. Check: 7 times 12 is 84.',
    },
    {
      id: 'les_maths-2-4',
      moduleId: 'mod_maths-2',
      slug: 'quadratics-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: quadratic equations',
      summary: 'Roots, the discriminant and the sum of roots.',
      quizId: 'quiz_maths-2',
    },

    {
      id: 'les_maths-3-1',
      moduleId: 'mod_maths-3',
      slug: 'arithmetic-progressions',
      position: 1,
      kind: 'article',
      title: 'Arithmetic progressions (AP)',
      summary: 'Add the same number each time.',
      bodyMarkdown: `In an **arithmetic progression** you add the same number, the **common difference** \`d\`, to get each new term:

\`3, 7, 11, 15, …\` has first term \`a = 3\` and \`d = 4\`.

## The nth term

\`\`\`
Tₙ = a + (n − 1)d
\`\`\`

The 10th term of \`3, 7, 11, …\` is \`3 + 9 × 4 = 39\`.

## The sum of the first n terms

\`\`\`
Sₙ = n/2 × (2a + (n − 1)d)
\`\`\`

The sum of the first 10 terms is \`10/2 × (6 + 36) = 5 × 42 = 210\`.

## Worked example: a savings plan

Amina saves ₦2,000 in January and increases it by ₦500 every month. How much does she save in the 12th month, and in total for the year?

- \`a = 2000\`, \`d = 500\`, \`n = 12\`
- 12th month: \`2000 + 11 × 500 = ₦7,500\`
- Total: \`12/2 × (4000 + 5500) = 6 × 9500 = ₦57,000\`

> Common slip: using \`n\` instead of \`(n − 1)\`. The first term has had **no** differences added, so the 10th term has had nine.`,
    },
    {
      id: 'les_maths-3-2',
      moduleId: 'mod_maths-3',
      slug: 'geometric-progressions',
      position: 2,
      kind: 'article',
      title: 'Geometric progressions (GP)',
      summary: 'Multiply by the same number each time.',
      bodyMarkdown: `In a **geometric progression** you multiply by the same number, the **common ratio** \`r\`, to get each new term:

\`2, 6, 18, 54, …\` has \`a = 2\` and \`r = 3\`. Find \`r\` by dividing any term by the one before it.

## The nth term

\`\`\`
Tₙ = a × r^(n − 1)
\`\`\`

The 5th term of \`2, 6, 18, …\` is \`2 × 3^4 = 2 × 81 = 162\`.

## The sum of the first n terms

\`\`\`
Sₙ = a(rⁿ − 1) / (r − 1)     (when r > 1)
\`\`\`

The sum of the first 5 terms is \`2(243 − 1) / 2 = 242\`.

## Sum to infinity

When the ratio is between −1 and 1, the terms get smaller and smaller, and the sum settles at a fixed value:

\`\`\`
S∞ = a / (1 − r)
\`\`\`

For \`8, 4, 2, 1, …\`: \`a = 8\`, \`r = 1/2\`, so \`S∞ = 8 / (1/2) = 16\`.

> A sum to infinity only exists when **−1 < r < 1**. For \`2, 6, 18, …\` the terms grow forever and there is no sum to infinity.`,
    },
    {
      id: 'les_maths-3-3',
      moduleId: 'mod_maths-3',
      slug: 'sequences-check',
      position: 3,
      kind: 'quiz',
      title: 'Check: sequences and series',
      summary: 'Terms, sums and sums to infinity.',
      quizId: 'quiz_maths-3',
    },
  ],

  quizzes: [
    { id: 'quiz_maths-1', lessonId: 'les_maths-1-3' },
    { id: 'quiz_maths-2', lessonId: 'les_maths-2-4' },
    { id: 'quiz_maths-3', lessonId: 'les_maths-3-3' },
  ],

  questions: [
    {
      id: 'q_maths-1-1',
      quizId: 'quiz_maths-1',
      position: 1,
      type: 'single',
      prompt: 'Simplify 2^3 × 2^4.',
      options: [
        { id: 'a', text: '2^7' },
        { id: 'b', text: '2^12' },
        { id: 'c', text: '4^7' },
        { id: 'd', text: '4^12' },
      ],
      correctOptionId: 'a',
      explanation: 'Same base, multiplying: add the powers. 3 + 4 = 7, so 2^7 (= 128).',
    },
    {
      id: 'q_maths-1-2',
      quizId: 'quiz_maths-1',
      position: 2,
      type: 'single',
      prompt: 'Solve 3^(x − 1) = 27.',
      options: [
        { id: 'a', text: 'x = 3' },
        { id: 'b', text: 'x = 4' },
        { id: 'c', text: 'x = 9' },
      ],
      correctOptionId: 'b',
      explanation: '27 = 3^3, so x − 1 = 3 and x = 4.',
    },
    {
      id: 'q_maths-1-3',
      quizId: 'quiz_maths-1',
      position: 3,
      type: 'true-false',
      prompt: 'For any non-zero number a, a^0 = 0.',
      correct: false,
      explanation: 'Any non-zero number to the power 0 is 1, because a^m ÷ a^m = a^0 and anything divided by itself is 1.',
    },
    {
      id: 'q_maths-1-4',
      quizId: 'quiz_maths-1',
      position: 4,
      type: 'single',
      prompt: 'Evaluate log₂ 32.',
      options: [
        { id: 'a', text: '4' },
        { id: 'b', text: '5' },
        { id: 'c', text: '16' },
      ],
      correctOptionId: 'b',
      explanation: '2^5 = 32, so log₂ 32 = 5.',
    },

    {
      id: 'q_maths-2-1',
      quizId: 'quiz_maths-2',
      position: 1,
      type: 'single',
      prompt: 'Solve x² − 7x + 12 = 0.',
      options: [
        { id: 'a', text: 'x = 3 or x = 4' },
        { id: 'b', text: 'x = −3 or x = −4' },
        { id: 'c', text: 'x = 2 or x = 6' },
      ],
      correctOptionId: 'a',
      explanation: '−3 and −4 multiply to 12 and add to −7, so (x − 3)(x − 4) = 0 and x = 3 or 4.',
    },
    {
      id: 'q_maths-2-2',
      quizId: 'quiz_maths-2',
      position: 2,
      type: 'single',
      prompt: 'If b² − 4ac is negative, the equation has…',
      options: [
        { id: 'a', text: 'Two different real roots' },
        { id: 'b', text: 'One repeated root' },
        { id: 'c', text: 'No real roots' },
      ],
      correctOptionId: 'c',
      explanation: 'A negative discriminant means taking the square root of a negative number, which has no real value.',
    },
    {
      id: 'q_maths-2-3',
      quizId: 'quiz_maths-2',
      position: 3,
      type: 'multiple',
      prompt: 'Which are roots of 2x² + 3x − 2 = 0? Choose all that apply.',
      options: [
        { id: 'a', text: 'x = 1/2' },
        { id: 'b', text: 'x = −2' },
        { id: 'c', text: 'x = 2' },
        { id: 'd', text: 'x = −1/2' },
      ],
      correctOptionIds: ['a', 'b'],
      explanation: '(2x − 1)(x + 2) = 0 gives x = 1/2 or x = −2. Substitute to check.',
    },
    {
      id: 'q_maths-2-4',
      quizId: 'quiz_maths-2',
      position: 4,
      type: 'true-false',
      prompt: 'The sum of the roots of x² − 5x + 6 = 0 is 5.',
      correct: true,
      explanation: 'Sum of roots = −b/a = −(−5)/1 = 5. Check: the roots are 2 and 3.',
    },

    {
      id: 'q_maths-3-1',
      quizId: 'quiz_maths-3',
      position: 1,
      type: 'single',
      prompt: 'Find the 10th term of the AP 3, 7, 11, …',
      options: [
        { id: 'a', text: '39' },
        { id: 'b', text: '43' },
        { id: 'c', text: '40' },
      ],
      correctOptionId: 'a',
      explanation: 'T₁₀ = a + 9d = 3 + 9 × 4 = 39. Using 10d instead of 9d gives the wrong answer, 43.',
    },
    {
      id: 'q_maths-3-2',
      quizId: 'quiz_maths-3',
      position: 2,
      type: 'single',
      prompt: 'What is the common ratio of the GP 5, 15, 45, …?',
      options: [
        { id: 'a', text: '10' },
        { id: 'b', text: '3' },
        { id: 'c', text: '1/3' },
      ],
      correctOptionId: 'b',
      explanation: 'Divide a term by the one before it: 15 ÷ 5 = 3.',
    },
    {
      id: 'q_maths-3-3',
      quizId: 'quiz_maths-3',
      position: 3,
      type: 'single',
      prompt: 'Find the sum to infinity of 8, 4, 2, 1, …',
      options: [
        { id: 'a', text: '15' },
        { id: 'b', text: '16' },
        { id: 'c', text: 'It has no sum to infinity' },
      ],
      correctOptionId: 'b',
      explanation: 'a = 8 and r = 1/2, so S∞ = 8 ÷ (1 − 1/2) = 16.',
    },
    {
      id: 'q_maths-3-4',
      quizId: 'quiz_maths-3',
      position: 4,
      type: 'true-false',
      prompt: '5, 10, 20, 40, … is an arithmetic progression.',
      correct: false,
      explanation: 'Each term is multiplied by 2, so it is a geometric progression. An AP adds the same number each time.',
    },
  ],

  reviews: [],
}
