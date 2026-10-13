import type { CourseBundle } from '@/data/types'

// SAMPLE CONTENT written for this demo.

export const pythonForBeginners: CourseBundle = {
  course: {
    id: 'crs_python',
    slug: 'python-for-absolute-beginners',
    title: 'Python for absolute beginners',
    subtitle: 'Write real programs from your first line of code: variables, decisions, loops and a naira change calculator.',
    description:
      'Python is one of the friendliest first programming languages, and it is used everywhere from data analysis to web servers. This course starts at zero. You install Python, write your first program, then learn the building blocks every programmer uses, with examples from everyday Nigerian life: a market price list, exam grades and a change calculator for a POS agent. By the end you will have written a complete small program on your own.',
    level: 'beginner',
    categoryId: 'cat_tech-skills',
    instructorId: 'ins_tunde-bakare',
    priceKobo: 600_000,
    language: 'English',
    outcomes: [
      'Install Python and run programs from a file',
      'Work with numbers, text and variables',
      'Make decisions in code with if, elif and else',
      'Repeat work with loops and store items in lists',
      'Plan and build a small, useful program from scratch',
    ],
    requirements: ['A laptop or desktop computer (Windows, macOS or Linux)', 'About 30 minutes a day', 'No programming experience'],
    cover: {
      src: '/covers/python-for-absolute-beginners.svg',
      alt: 'Indigo adire-style pattern with a terminal window and a stylised snake made of dots',
    },
    publishedAt: '2026-08-24',
    updatedAt: '2026-10-01',
    featured: true,
  },

  modules: [
    { id: 'mod_py-1', courseId: 'crs_python', position: 1, title: 'Getting started', summary: 'Install Python and run your first program.' },
    { id: 'mod_py-2', courseId: 'crs_python', position: 2, title: 'Values and variables', summary: 'Numbers, text and names for them.' },
    { id: 'mod_py-3', courseId: 'crs_python', position: 3, title: 'Decisions and loops', summary: 'if, else, for and lists.' },
    { id: 'mod_py-4', courseId: 'crs_python', position: 4, title: 'Your first project', summary: 'A naira change calculator, start to finish.' },
  ],

  lessons: [
    {
      id: 'les_py-1-1',
      moduleId: 'mod_py-1',
      slug: 'install-python',
      position: 1,
      kind: 'video',
      title: 'Install Python and a code editor',
      summary: 'Get set up on Windows, macOS or Linux.',
      durationSeconds: 480,
      transcript:
        'Let us get Python onto your computer. Go to the official Python website and download the latest version for your operating system. It is free. On Windows, when the installer opens, tick the box that says Add Python to PATH before you click install. This one tick saves a lot of confusion later. On macOS, run the installer as normal. Most Linux systems already have Python 3. To check it worked, open a terminal, which on Windows is called Command Prompt or PowerShell, and type python --version. You should see a version number starting with 3. Next, install a free code editor such as VS Code, and add its Python extension. Create a folder called python-course. Everything we write in this course will live there.',
    },
    {
      id: 'les_py-1-2',
      moduleId: 'mod_py-1',
      slug: 'your-first-program',
      position: 2,
      kind: 'article',
      title: 'Your first program',
      summary: 'print(), running a file and reading error messages.',
      bodyMarkdown: `In your \`python-course\` folder, create a file called \`hello.py\` and type:

\`\`\`python
print("Hello, Naija!")
print("I am learning Python.")
\`\`\`

Save it. In the terminal, go to the folder and run:

\`\`\`
python hello.py
\`\`\`

You should see your two lines. That's a program: instructions that run **top to bottom**, one line at a time.

## print()

\`print()\` shows whatever is inside the brackets. Text must be inside **quotes**. Numbers don't need them:

\`\`\`python
print(2026)
print(7 + 5)
\`\`\`

## Your first error

Remove the closing quote from the first line and run it again. Python stops and shows a **SyntaxError**, with the line number and a little arrow.

Errors are not failures; they are Python telling you exactly where to look. Read the **last line** of an error message first: it says what went wrong. The line number says where.

> Every programmer sees errors all day. The skill isn't avoiding them; it's reading them calmly.`,
    },
    {
      id: 'les_py-1-3',
      moduleId: 'mod_py-1',
      slug: 'getting-started-check',
      position: 3,
      kind: 'quiz',
      title: 'Check: getting started',
      summary: 'Running programs and reading errors.',
      quizId: 'quiz_py-1',
    },

    {
      id: 'les_py-2-1',
      moduleId: 'mod_py-2',
      slug: 'numbers-and-strings',
      position: 1,
      kind: 'article',
      title: 'Numbers and strings',
      summary: 'The two kinds of value you will use most.',
      bodyMarkdown: `Every value in Python has a **type**. The two you'll use most:

| Type | Example | What it is |
| --- | --- | --- |
| \`int\` | \`2500\` | A whole number |
| \`float\` | \`2.5\` | A number with a decimal point |
| \`str\` | \`"Ikeja"\` | A string: text, in quotes |

## Arithmetic

\`\`\`python
print(4500 + 1500)   # 6000
print(10 / 4)        # 2.5  (division always gives a float)
print(10 // 4)       # 2    (whole-number division)
print(10 % 4)        # 2    (the remainder)
\`\`\`

The \`#\` starts a **comment**: a note for humans that Python ignores.

## Strings

You can join strings with \`+\`, but you can't add a string and a number:

\`\`\`python
print("Lagos" + " " + "Island")   # Lagos Island
print("Price: " + 4500)           # TypeError!
\`\`\`

Convert the number first with \`str()\`, or better, use an **f-string**:

\`\`\`python
print(f"Price: ₦{4500}")
\`\`\`

The \`f\` before the quote lets you put values inside \`{ }\`. You'll use f-strings constantly.`,
    },
    {
      id: 'les_py-2-2',
      moduleId: 'mod_py-2',
      slug: 'variables-a-market-price-list',
      position: 2,
      kind: 'article',
      title: 'Variables: a market price list',
      summary: 'Give values names so you can use them again.',
      bodyMarkdown: `A **variable** is a name that points at a value. You create one with \`=\`:

\`\`\`python
rice_per_paint = 4500
beans_per_paint = 3800
paints_of_rice = 3

total = rice_per_paint * paints_of_rice
print(f"3 paints of rice cost ₦{total}")
\`\`\`

Now if the price of rice changes, you change **one line** and everything that uses it updates.

## Naming rules

- Use lowercase words joined by underscores: \`price_per_kg\`.
- Names can't start with a number or contain spaces.
- Choose names that say what the value **means**. \`x\` tells you nothing; \`beans_per_paint\` tells you everything.

## Variables can change

\`\`\`python
stock = 20
stock = stock - 3   # sold 3
print(stock)        # 17
\`\`\`

Read \`=\` as "now points at", not "equals". The right side is worked out first, then the name is pointed at the result.`,
    },
    {
      id: 'les_py-2-3',
      moduleId: 'mod_py-2',
      slug: 'input-and-output',
      position: 3,
      kind: 'video',
      title: 'Asking the user with input()',
      summary: 'Make programs that respond to the person using them.',
      durationSeconds: 450,
      transcript:
        'So far our programs always do the same thing. Let us make them interactive. The input function shows a message and waits for the user to type something and press Enter. Type: name equals input, open bracket, What is your name, close bracket. Then print an f-string: Welcome, and the name in curly braces. Run it and type your name. Now try something with numbers: quantity equals input, How many paints of rice? Then total equals quantity times 4500. Run it and type 3. Surprise: you get 3 printed four thousand five hundred times, not 13500. That is because input always gives you a string. Wrap it in int to convert it: quantity equals int of input. Run it again, and now the maths works.',
    },
    {
      id: 'les_py-2-4',
      moduleId: 'mod_py-2',
      slug: 'variables-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: values and variables',
      summary: 'Types, variables and input.',
      quizId: 'quiz_py-2',
    },

    {
      id: 'les_py-3-1',
      moduleId: 'mod_py-3',
      slug: 'if-else-grading-scores',
      position: 1,
      kind: 'article',
      title: 'if and else: grading exam scores',
      summary: 'Let your program make decisions.',
      bodyMarkdown: `\`if\` runs code only when a condition is true:

\`\`\`python
score = int(input("Enter score: "))

if score >= 75:
    print("A1: Excellent")
elif score >= 60:
    print("Credit")
elif score >= 45:
    print("Pass")
else:
    print("Fail")
\`\`\`

## How it works

Python checks each condition **from the top** and runs the **first** one that is true, then skips the rest. That's why the order matters: if \`score >= 45\` came first, a score of 80 would print "Pass".

## Indentation is part of the code

The lines under \`if\` are indented by **four spaces**. That's how Python knows which lines belong to the \`if\`. Forget it and you get an \`IndentationError\`.

## Comparison operators

| Operator | Meaning |
| --- | --- |
| \`==\` | equal to |
| \`!=\` | not equal to |
| \`>\` \`<\` | greater / less than |
| \`>=\` \`<=\` | greater / less than or equal |

Notice \`==\` (compare) is different from \`=\` (assign). Mixing them up is one of the most common beginner mistakes.`,
    },
    {
      id: 'les_py-3-2',
      moduleId: 'mod_py-3',
      slug: 'for-loops',
      position: 2,
      kind: 'video',
      title: 'Repeating work with for loops',
      summary: 'Do something for every item, without copying lines.',
      durationSeconds: 510,
      transcript:
        'Suppose you want to print the times table for the price of a paint of beans, from one paint to ten. You could write ten print lines, but programmers hate repeating themselves. A for loop repeats a block of code for each item in a sequence. Type: for paints in range, open bracket, 1 comma 11, close bracket, colon. Then, indented underneath: print an f-string with paints and paints times 3800. Run it: ten lines, from one paint to ten. Notice range stops just before the second number, so range 1 to 11 gives 1 to 10. Everything indented under the for line runs once per item. You can put anything there: calculations, if statements, even another loop. Loops are where programs start saving you real time.',
    },
    {
      id: 'les_py-3-3',
      moduleId: 'mod_py-3',
      slug: 'lists',
      position: 3,
      kind: 'article',
      title: 'Lists',
      summary: 'Store many values in one variable and loop over them.',
      bodyMarkdown: `A **list** holds many values in order, inside square brackets:

\`\`\`python
sales = [4500, 9800, 1200, 6400]
\`\`\`

## Working with lists

\`\`\`python
print(sales[0])      # 4500: counting starts at 0
print(len(sales))    # 4: how many items
print(sum(sales))    # 21900
sales.append(3000)   # add one at the end
\`\`\`

## Looping over a list

\`\`\`python
for amount in sales:
    if amount >= 5000:
        print(f"Big sale: ₦{amount}")
\`\`\`

## Lists of text

\`\`\`python
states = ["Lagos", "Kano", "Rivers", "Oyo"]
for state in states:
    print(state.upper())
\`\`\`

> If you ask for an item that doesn't exist, like \`sales[10]\` in a list of five, Python stops with an **IndexError**. Use \`len()\` to check how many items there are.`,
    },
    {
      id: 'les_py-3-4',
      moduleId: 'mod_py-3',
      slug: 'decisions-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: decisions and loops',
      summary: 'if/elif/else, range and lists.',
      quizId: 'quiz_py-3',
    },

    {
      id: 'les_py-4-1',
      moduleId: 'mod_py-4',
      slug: 'project-naira-change-calculator',
      position: 1,
      kind: 'article',
      title: 'Project: a naira change calculator',
      summary: 'Plan the program before you write it.',
      bodyMarkdown: `A POS agent receives cash and needs to give change using the **fewest notes**. Let's write a program that does it.

## Plan in plain English first

1. Ask for the price and the amount the customer paid.
2. Work out the change. If the customer paid too little, say so and stop.
3. For each note, largest first, work out how many fit into what's left.
4. Print each note that is used.

## The notes

\`\`\`python
notes = [1000, 500, 200, 100, 50, 20, 10, 5]
\`\`\`

## The key idea: // and %

For ₦1,750 of change and the ₦1,000 note:

\`\`\`python
count = 1750 // 1000      # 1 note
remaining = 1750 % 1000   # 750 left
\`\`\`

Then repeat with ₦500 on the 750 that's left, and so on down the list. That "repeat for each note" should make you think of a **for loop**.

## Try it before the walkthrough

Write it yourself first, even if it's messy. Struggling for 20 minutes teaches more than watching for 5. The next lesson walks through one solution.`,
    },
    {
      id: 'les_py-4-2',
      moduleId: 'mod_py-4',
      slug: 'project-walkthrough',
      position: 2,
      kind: 'video',
      title: 'Project walkthrough',
      summary: 'Build the change calculator step by step and test it.',
      durationSeconds: 660,
      transcript:
        'Let us build it together. First, price equals int of input, Price in naira. Then paid equals int of input, Amount paid. Change equals paid minus price. If change is less than zero, print not enough money, and we stop. Otherwise, print the total change. Now the list of notes, largest first, and a for loop: for note in notes. Inside, count equals change floor-divided by note. If count is more than zero, print the count and the note, for example 1 times 1000 naira. Then change equals change modulo note, so we carry the remainder to the next note. Run it with a price of 3250 and 5000 paid. Change is 1750: one thousand, one five hundred, one two hundred, and one fifty. Test the edge cases too: exact payment, and too little money.',
    },
    {
      id: 'les_py-4-3',
      moduleId: 'mod_py-4',
      slug: 'final-check',
      position: 3,
      kind: 'quiz',
      title: 'Final check',
      summary: 'Everything from the course.',
      quizId: 'quiz_py-4',
    },
  ],

  quizzes: [
    { id: 'quiz_py-1', lessonId: 'les_py-1-3' },
    { id: 'quiz_py-2', lessonId: 'les_py-2-4' },
    { id: 'quiz_py-3', lessonId: 'les_py-3-4' },
    { id: 'quiz_py-4', lessonId: 'les_py-4-3' },
  ],

  questions: [
    {
      id: 'q_py-1-1',
      quizId: 'quiz_py-1',
      position: 1,
      type: 'single',
      prompt: 'Which command runs a Python file called hello.py?',
      options: [
        { id: 'a', text: 'run hello.py' },
        { id: 'b', text: 'python hello.py' },
        { id: 'c', text: 'open hello.py' },
      ],
      correctOptionId: 'b',
      explanation: 'You ask the python program to run your file: python hello.py.',
    },
    {
      id: 'q_py-1-2',
      quizId: 'quiz_py-1',
      position: 2,
      type: 'true-false',
      prompt: 'When Python shows an error, you should read the last line of the message first.',
      correct: true,
      explanation: 'The last line names the kind of error and what went wrong; the lines above show where.',
    },
    {
      id: 'q_py-1-3',
      quizId: 'quiz_py-1',
      position: 3,
      type: 'single',
      prompt: 'What is wrong with print(Hello)?',
      options: [
        { id: 'a', text: 'print must be in capitals' },
        { id: 'b', text: 'Text must be inside quotes' },
        { id: 'c', text: 'Nothing' },
      ],
      correctOptionId: 'b',
      explanation: 'Without quotes Python looks for a variable called Hello. Text needs quotes: print("Hello").',
    },

    {
      id: 'q_py-2-1',
      quizId: 'quiz_py-2',
      position: 1,
      type: 'single',
      prompt: 'What does print(10 // 4) show?',
      options: [
        { id: 'a', text: '2.5' },
        { id: 'b', text: '2' },
        { id: 'c', text: '2.0' },
        { id: 'd', text: '40' },
      ],
      correctOptionId: 'b',
      explanation: '// is whole-number (floor) division, so 10 // 4 is 2. Plain / would give 2.5.',
    },
    {
      id: 'q_py-2-2',
      quizId: 'quiz_py-2',
      position: 2,
      type: 'single',
      prompt: 'quantity = input("How many? ") and the user types 3. What type is quantity?',
      options: [
        { id: 'a', text: 'int' },
        { id: 'b', text: 'float' },
        { id: 'c', text: 'str' },
      ],
      correctOptionId: 'c',
      explanation: 'input() always returns a string. Convert it with int() before doing maths.',
    },
    {
      id: 'q_py-2-3',
      quizId: 'quiz_py-2',
      position: 3,
      type: 'multiple',
      prompt: 'Which are valid, well-chosen variable names? Choose all that apply.',
      options: [
        { id: 'a', text: 'price_per_kg' },
        { id: 'b', text: '2nd_price' },
        { id: 'c', text: 'total sales' },
        { id: 'd', text: 'beans_per_paint' },
      ],
      correctOptionIds: ['a', 'd'],
      explanation: 'Names can’t start with a number or contain spaces. Lowercase words joined by underscores are the convention.',
    },
    {
      id: 'q_py-2-4',
      quizId: 'quiz_py-2',
      position: 4,
      type: 'true-false',
      prompt: 'print(f"Total: ₦{total}") puts the value of total inside the text.',
      correct: true,
      explanation: 'That is exactly what an f-string does: values inside { } are inserted into the text.',
    },

    {
      id: 'q_py-3-1',
      quizId: 'quiz_py-3',
      position: 1,
      type: 'single',
      prompt: 'With the grading code from the lesson, what is printed for a score of 62?',
      options: [
        { id: 'a', text: 'A1: Excellent' },
        { id: 'b', text: 'Credit' },
        { id: 'c', text: 'Pass' },
        { id: 'd', text: 'Credit and Pass' },
      ],
      correctOptionId: 'b',
      explanation: '62 is not ≥ 75 but is ≥ 60, so "Credit" runs and the remaining branches are skipped.',
    },
    {
      id: 'q_py-3-2',
      quizId: 'quiz_py-3',
      position: 2,
      type: 'single',
      prompt: 'Which numbers does range(1, 5) produce?',
      options: [
        { id: 'a', text: '1, 2, 3, 4, 5' },
        { id: 'b', text: '1, 2, 3, 4' },
        { id: 'c', text: '0, 1, 2, 3, 4' },
      ],
      correctOptionId: 'b',
      explanation: 'range stops just before the second number.',
    },
    {
      id: 'q_py-3-3',
      quizId: 'quiz_py-3',
      position: 3,
      type: 'single',
      prompt: 'sales = [4500, 9800, 1200]. What is sales[1]?',
      options: [
        { id: 'a', text: '4500' },
        { id: 'b', text: '9800' },
        { id: 'c', text: '1200' },
      ],
      correctOptionId: 'b',
      explanation: 'List positions start at 0, so sales[1] is the second item.',
    },
    {
      id: 'q_py-3-4',
      quizId: 'quiz_py-3',
      position: 4,
      type: 'true-false',
      prompt: 'In Python, = and == mean the same thing.',
      correct: false,
      explanation: '= assigns a value to a name. == compares two values.',
    },

    {
      id: 'q_py-4-1',
      quizId: 'quiz_py-4',
      position: 1,
      type: 'single',
      prompt: 'What is 1750 % 1000?',
      options: [
        { id: 'a', text: '1' },
        { id: 'b', text: '750' },
        { id: 'c', text: '1.75' },
      ],
      correctOptionId: 'b',
      explanation: '% gives the remainder: 1000 goes into 1750 once, leaving 750.',
    },
    {
      id: 'q_py-4-2',
      quizId: 'quiz_py-4',
      position: 2,
      type: 'single',
      prompt: 'Why must the notes list go from the largest note to the smallest?',
      options: [
        { id: 'a', text: 'Python requires lists to be sorted' },
        { id: 'b', text: 'To give change using the fewest notes' },
        { id: 'c', text: 'It makes the program faster' },
      ],
      correctOptionId: 'b',
      explanation: 'Using the biggest notes first leaves the smallest remainder for the smaller notes.',
    },
    {
      id: 'q_py-4-3',
      quizId: 'quiz_py-4',
      position: 3,
      type: 'multiple',
      prompt: 'Which cases should you test the calculator with? Choose all that apply.',
      options: [
        { id: 'a', text: 'A normal payment with change' },
        { id: 'b', text: 'Exact payment (no change)' },
        { id: 'c', text: 'Paying too little' },
        { id: 'd', text: 'Only the example from the lesson' },
      ],
      correctOptionIds: ['a', 'b', 'c'],
      explanation: 'Edge cases like exact payment and underpayment are where bugs hide.',
    },
    {
      id: 'q_py-4-4',
      quizId: 'quiz_py-4',
      position: 4,
      type: 'true-false',
      prompt: 'Planning a program in plain English before coding is a waste of time.',
      correct: false,
      explanation: 'A short plan shows you the steps and the loops you need before you get lost in the details.',
    },
  ],

  reviews: [
    {
      id: 'rev_py-1',
      courseId: 'crs_python',
      learnerName: 'Ifeoma R.',
      location: 'Awka',
      rating: 5,
      body: 'The change calculator project was the moment it clicked. I built a version for my mum’s POS business.',
      createdAt: '2026-09-14',
    },
    {
      id: 'rev_py-2',
      courseId: 'crs_python',
      learnerName: 'Abdullahi G.',
      location: 'Sokoto',
      rating: 4,
      body: 'Great pace for a beginner. The input() surprise in the video is something I will never forget.',
      createdAt: '2026-10-02',
    },
  ],
}
