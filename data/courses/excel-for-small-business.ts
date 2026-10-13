import type { CourseBundle } from '@/data/types'

// SAMPLE CONTENT written for this demo.

export const excelForSmallBusiness: CourseBundle = {
  course: {
    id: 'crs_excel',
    slug: 'excel-for-small-business',
    title: 'Excel for small business',
    subtitle: 'Track sales, stock and profit in a spreadsheet you build yourself, using the formulas that matter.',
    description:
      'Many small businesses run on a notebook and memory until the day the numbers stop adding up. In this course you build a working spreadsheet for Ada’s Provisions, a shop in Ikeja: daily sales, a stock sheet that warns you before you run out, markups, and a monthly chart you can show a bank or a partner. Everything also works in Google Sheets, which is free on any phone or laptop.',
    level: 'beginner',
    categoryId: 'cat_small-business',
    instructorId: 'ins_ngozi-eze',
    priceKobo: 450_000,
    language: 'English',
    outcomes: [
      'Find your way around Excel or Google Sheets with confidence',
      'Use SUM, AVERAGE and simple formulas instead of a calculator',
      'Work out markups and profit margins correctly',
      'Build a stock sheet that flags items running low',
      'Turn a month of sales into a clear chart and summary',
    ],
    requirements: ['Excel on a computer, or the free Google Sheets app', 'Basic arithmetic (adding, percentages)'],
    cover: {
      src: '/covers/excel-for-small-business.svg',
      alt: 'Kola-red adire-style pattern with a spreadsheet grid and a rising bar chart',
    },
    publishedAt: '2026-04-06',
    updatedAt: '2026-09-02',
    featured: true,
  },

  modules: [
    { id: 'mod_excel-1', courseId: 'crs_excel', position: 1, title: 'Getting around Excel', summary: 'The screen, cells and how data is laid out.' },
    { id: 'mod_excel-2', courseId: 'crs_excel', position: 2, title: 'Formulas that save time', summary: 'Let the spreadsheet do the sums.' },
    { id: 'mod_excel-3', courseId: 'crs_excel', position: 3, title: 'Track stock and sales', summary: 'A stock sheet that warns you early.' },
    { id: 'mod_excel-4', courseId: 'crs_excel', position: 4, title: 'Charts and reports', summary: 'Show a month of business at a glance.' },
  ],

  lessons: [
    {
      id: 'les_excel-1-1',
      moduleId: 'mod_excel-1',
      slug: 'tour-of-excel',
      position: 1,
      kind: 'video',
      title: 'A quick tour of the screen',
      summary: 'Ribbon, formula bar, sheets and the grid.',
      durationSeconds: 420,
      transcript:
        'Let us open a blank workbook together. Across the top is the ribbon, with buttons grouped into tabs like Home and Insert. Below it is the formula bar: whatever is inside the selected cell appears there, including formulas. The big grid is the sheet. Columns have letters, rows have numbers, so the cell where column B meets row 3 is called B3. At the bottom you can see sheet tabs. We will use one tab for sales, one for stock and one for the monthly summary, like separate pages in a notebook. If you use Google Sheets on your phone, everything is in the same place, just smaller. Tap a cell to select it and tap again to type.',
    },
    {
      id: 'les_excel-1-2',
      moduleId: 'mod_excel-1',
      slug: 'rows-columns-and-cells',
      position: 2,
      kind: 'article',
      title: 'Rows, columns and cells: lay out your data',
      summary: 'One row per sale, one column per detail.',
      bodyMarkdown: `The single most useful habit in spreadsheets is this: **one row per thing, one column per detail.**

For a sales sheet, each sale is one row. Each detail about the sale gets its own column:

| Date | Item | Quantity | Unit price (₦) | Total (₦) |
| --- | --- | --- | --- | --- |
| 03/03/2026 | Peak milk (tin) | 6 | 450 | 2,700 |
| 03/03/2026 | Indomie (carton) | 1 | 9,800 | 9,800 |
| 04/03/2026 | Golden Penny semovita 1kg | 4 | 1,600 | 6,400 |

## Rules that save you later

- Put **headings in row 1** and nothing else in that row.
- Keep **one kind of data per column**. Do not type "6 tins" in Quantity; type \`6\`. Words in a number column break your sums.
- **No blank rows** in the middle of your data. Sorting and filtering stop at a blank row.
- Type dates the same way every time.

> Tip: select row 1 and use **View → Freeze top row**. Your headings stay visible as the list grows to hundreds of sales.`,
    },
    {
      id: 'les_excel-1-3',
      moduleId: 'mod_excel-1',
      slug: 'getting-around-check',
      position: 3,
      kind: 'quiz',
      title: 'Check: getting around',
      summary: 'Cells, rows and laying out data.',
      quizId: 'quiz_excel-1',
    },

    {
      id: 'les_excel-2-1',
      moduleId: 'mod_excel-2',
      slug: 'sum-and-autosum',
      position: 1,
      kind: 'video',
      title: 'SUM and AutoSum',
      summary: 'Add up a column in one step, and keep it correct as you add rows.',
      durationSeconds: 480,
      transcript:
        'Every formula starts with an equals sign. That tells Excel: do not just show this, calculate it. Click under your Total column and type equals SUM, open bracket, then drag over the totals, close bracket and press Enter. Excel shows the answer, but the cell still holds the formula, which you can see in the formula bar. Change any sale and the total updates by itself. That is the big difference from a calculator. The AutoSum button on the Home tab does the same thing in one click: it guesses the range and you press Enter. Always check the range it picked, because it stops at blank cells. For the line total, type equals C2 times D2 and press Enter, then drag the little square in the corner of the cell down to copy the formula to every row.',
    },
    {
      id: 'les_excel-2-2',
      moduleId: 'mod_excel-2',
      slug: 'totals-for-a-provision-shop',
      position: 2,
      kind: 'article',
      title: 'Daily totals for a provision shop',
      summary: 'Line totals, a daily total and an average sale.',
      bodyMarkdown: `Let's finish the sales sheet for Ada's Provisions.

## Line totals

In \`E2\` type \`=C2*D2\` (quantity × unit price). Drag the fill handle down. Each row now calculates its own total.

## The day's takings

Below the list, type \`=SUM(E2:E40)\`. The colon means "everything from E2 to E40". Leave room for more rows than you need today; empty cells add nothing.

## The average sale

\`=AVERAGE(E2:E40)\` gives the average size of a sale. If it is small, you might bundle items: a "breakfast pack" of bread, Milo and sugar at a round price.

## Other useful ones

| Formula | What it gives you |
| --- | --- |
| \`=COUNT(E2:E40)\` | Number of sales |
| \`=MAX(E2:E40)\` | The biggest single sale |
| \`=MIN(E2:E40)\` | The smallest single sale |

> If a cell shows \`#VALUE!\`, one of the cells it uses contains text instead of a number, often a stray "₦" or a space. Type numbers only and use cell formatting to show the naira sign.`,
    },
    {
      id: 'les_excel-2-3',
      moduleId: 'mod_excel-2',
      slug: 'percentages-and-markups',
      position: 3,
      kind: 'article',
      title: 'Percentages, markups and margins',
      summary: 'Price items correctly and avoid the most common profit mistake.',
      bodyMarkdown: `Two words that sound the same and are not: **markup** and **margin**.

- **Markup** is profit as a percentage of what you **paid**.
- **Margin** is profit as a percentage of what you **sell for**.

Ada buys a carton of Indomie for ₦8,500 and sells it for ₦9,800. Profit is ₦1,300.

| | Formula | Result |
| --- | --- | --- |
| Markup | 1,300 ÷ 8,500 | 15.3% |
| Margin | 1,300 ÷ 9,800 | 13.3% |

## In Excel

With cost in \`B2\` and selling price in \`C2\`:

\`\`\`
Profit:  =C2-B2
Markup:  =(C2-B2)/B2
Margin:  =(C2-B2)/C2
\`\`\`

Format the markup and margin cells as **Percentage** (Home → %).

## Setting a price from a markup

To add a 20% markup to a cost in \`B2\`: \`=B2*1.2\`. Use \`=ROUND(B2*1.2,-1)\` to round to the nearest ₦10 so customers aren't waiting for change.

> The common mistake: thinking a 20% markup gives a 20% margin. It gives about 16.7%. If your rent is calculated from margin, price from margin.`,
    },
    {
      id: 'les_excel-2-4',
      moduleId: 'mod_excel-2',
      slug: 'formulas-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: formulas',
      summary: 'SUM, AVERAGE, markup and margin.',
      quizId: 'quiz_excel-2',
    },

    {
      id: 'les_excel-3-1',
      moduleId: 'mod_excel-3',
      slug: 'build-a-stock-sheet',
      position: 1,
      kind: 'article',
      title: 'Build a stock sheet',
      summary: 'Opening stock, items received, items sold and what is left.',
      bodyMarkdown: `A stock sheet answers one question every evening: **what do I have left?**

Make a new sheet called **Stock** with these columns:

| Item | Opening | Received | Sold | Closing | Reorder level |
| --- | --- | --- | --- | --- | --- |
| Peak milk (tin) | 48 | 24 | 30 | | 12 |
| Indomie (carton) | 10 | 0 | 7 | | 3 |

## The closing formula

Closing stock is what you started with, plus what came in, minus what went out. In \`E2\`:

\`\`\`
=B2+C2-D2
\`\`\`

Drag it down for every item.

## Counting is still your job

The sheet tells you what you **should** have. Once a week, count the shelf and compare. If the sheet says 41 tins and the shelf has 36, five tins are missing: a recording mistake, spoilage, or theft. Catching it in a week costs far less than catching it in a year.

## Reorder level

The last column is the quantity at which you should restock, based on how fast an item sells and how long your supplier takes. You'll use it in the next lesson to get automatic warnings.`,
    },
    {
      id: 'les_excel-3-2',
      moduleId: 'mod_excel-3',
      slug: 'sort-and-filter',
      position: 2,
      kind: 'video',
      title: 'Sorting and filtering',
      summary: 'Find your best sellers and slowest items in seconds.',
      durationSeconds: 450,
      transcript:
        'Your sales list is getting long, so let us make it answer questions. Click any cell inside the data, then on the Data tab click Filter. Little arrows appear on each heading. Click the arrow on Item and untick everything except Peak milk: now you see only milk sales. Clear the filter and try sorting the Total column from largest to smallest to see your biggest sales first. Sorting reorders whole rows together, which is why we never leave blank rows inside the data. Combine both: filter to this week, then sort by quantity, and you have your best sellers. Do the opposite to find items that barely move. Those are tying up money on your shelf that could be working for you.',
    },
    {
      id: 'les_excel-3-3',
      moduleId: 'mod_excel-3',
      slug: 'low-stock-alerts-with-if',
      position: 3,
      kind: 'article',
      title: 'Low-stock alerts with IF',
      summary: 'Let the sheet tell you what to reorder.',
      bodyMarkdown: `\`IF\` makes a decision. It has three parts: a test, what to show if the test is true, and what to show if it is false.

\`\`\`
=IF(test, value_if_true, value_if_false)
\`\`\`

## A reorder column

Add a column called **Status** to your stock sheet. With closing stock in \`E2\` and reorder level in \`F2\`:

\`\`\`
=IF(E2<=F2, "REORDER", "OK")
\`\`\`

Drag it down. Every item at or below its reorder level now says **REORDER**.

## Make it stand out

Select the Status column, then **Home → Conditional Formatting → Highlight Cells Rules → Text that Contains**, type \`REORDER\` and choose a red fill. Now one glance down the column shows your shopping list for the market run.

## Going further

You can nest a second test for items that are completely out:

\`\`\`
=IF(E2=0, "OUT", IF(E2<=F2, "REORDER", "OK"))
\`\`\`

Keep formulas this simple. If one gets too long to read aloud, split it across two columns.`,
    },
    {
      id: 'les_excel-3-4',
      moduleId: 'mod_excel-3',
      slug: 'stock-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: stock and sales',
      summary: 'Closing stock, filters and IF.',
      quizId: 'quiz_excel-3',
    },

    {
      id: 'les_excel-4-1',
      moduleId: 'mod_excel-4',
      slug: 'make-a-sales-chart',
      position: 1,
      kind: 'video',
      title: 'Make a sales chart',
      summary: 'Turn a column of numbers into a picture anyone can read.',
      durationSeconds: 390,
      transcript:
        'Numbers in a list are hard to compare. A chart makes the pattern obvious. Make a small table with two columns: the week, and total sales for that week. Select both columns, go to Insert, and choose a column chart. Excel draws one bar per week. Click the chart title and type something useful, like Weekly sales, March 2026, in naira. Delete anything that does not help, such as gridlines you do not need. Look at the bars: is there a week that stands out? For many shops, sales jump at the end of the month when salaries are paid and dip in the middle. Knowing that, you can stock up before month end and avoid running out when customers have money to spend.',
    },
    {
      id: 'les_excel-4-2',
      moduleId: 'mod_excel-4',
      slug: 'monthly-summary',
      position: 2,
      kind: 'article',
      title: 'A one-page monthly summary',
      summary: 'The five numbers to look at every month.',
      bodyMarkdown: `At the end of each month, make a **Summary** sheet with these five numbers. Use formulas that point at your other sheets, so it updates itself.

| Number | Example formula |
| --- | --- |
| Total sales | \`=SUM(Sales!E:E)\` |
| Number of sales | \`=COUNT(Sales!E:E)\` |
| Average sale | \`=AVERAGE(Sales!E:E)\` |
| Cost of goods sold | \`=SUM(Purchases!D:D)\` |
| Gross profit | \`=B2-B5\` |

\`Sales!E:E\` means "the whole of column E on the Sales sheet".

## Read it, don't just make it

Ask three questions each month:

1. Did sales go **up or down** compared with last month? Why?
2. Is **gross profit** enough to cover rent, transport and your own pay?
3. Which item made the **most profit**, not just the most sales?

## Sharing it

Banks, cooperatives and microfinance lenders often ask for proof of sales. A tidy summary with three to six months of figures, plus your chart, makes that conversation much easier. Use **File → Print → Fit to one page** or save it as a PDF.`,
    },
    {
      id: 'les_excel-4-3',
      moduleId: 'mod_excel-4',
      slug: 'final-check',
      position: 3,
      kind: 'quiz',
      title: 'Final check',
      summary: 'Charts, summaries and everything before.',
      quizId: 'quiz_excel-4',
    },
  ],

  quizzes: [
    { id: 'quiz_excel-1', lessonId: 'les_excel-1-3' },
    { id: 'quiz_excel-2', lessonId: 'les_excel-2-4' },
    { id: 'quiz_excel-3', lessonId: 'les_excel-3-4' },
    { id: 'quiz_excel-4', lessonId: 'les_excel-4-3' },
  ],

  questions: [
    {
      id: 'q_excel-1-1',
      quizId: 'quiz_excel-1',
      position: 1,
      type: 'single',
      prompt: 'What is the name of the cell where column C meets row 7?',
      options: [
        { id: 'a', text: '7C' },
        { id: 'b', text: 'C7' },
        { id: 'c', text: 'R7C' },
      ],
      correctOptionId: 'b',
      explanation: 'Cells are named column letter first, then row number: C7.',
    },
    {
      id: 'q_excel-1-2',
      quizId: 'quiz_excel-1',
      position: 2,
      type: 'true-false',
      prompt: 'Typing "6 tins" in a Quantity column is fine because Excel will read the number.',
      correct: false,
      explanation: 'Text in a number column breaks sums and sorting. Type 6 and put the unit in the heading.',
    },
    {
      id: 'q_excel-1-3',
      quizId: 'quiz_excel-1',
      position: 3,
      type: 'multiple',
      prompt: 'Which habits keep a sales sheet easy to work with? Choose all that apply.',
      options: [
        { id: 'a', text: 'One row per sale' },
        { id: 'b', text: 'Blank rows between days' },
        { id: 'c', text: 'Headings in row 1 only' },
        { id: 'd', text: 'One kind of data per column' },
      ],
      correctOptionIds: ['a', 'c', 'd'],
      explanation: 'Blank rows stop sorting and filtering at the gap. Everything else here makes the sheet reliable.',
    },

    {
      id: 'q_excel-2-1',
      quizId: 'quiz_excel-2',
      position: 1,
      type: 'single',
      prompt: 'Which formula adds up the cells from E2 to E40?',
      options: [
        { id: 'a', text: 'SUM E2 to E40' },
        { id: 'b', text: '=SUM(E2:E40)' },
        { id: 'c', text: '=ADD(E2-E40)' },
        { id: 'd', text: '=E2+E40' },
      ],
      correctOptionId: 'b',
      explanation: 'Formulas start with =, and the colon means the whole range from E2 to E40. =E2+E40 adds only two cells.',
    },
    {
      id: 'q_excel-2-2',
      quizId: 'quiz_excel-2',
      position: 2,
      type: 'single',
      prompt: 'You buy a bag of rice for ₦50,000 and sell it for ₦60,000. What is the markup?',
      options: [
        { id: 'a', text: '10%' },
        { id: 'b', text: '16.7%' },
        { id: 'c', text: '20%' },
      ],
      correctOptionId: 'c',
      explanation: 'Markup is profit divided by cost: 10,000 ÷ 50,000 = 20%. The margin would be 10,000 ÷ 60,000 ≈ 16.7%.',
    },
    {
      id: 'q_excel-2-3',
      quizId: 'quiz_excel-2',
      position: 3,
      type: 'true-false',
      prompt: 'A 20% markup gives a 20% profit margin.',
      correct: false,
      explanation: 'Margin is measured against the selling price, which is bigger than the cost, so a 20% markup is about a 16.7% margin.',
    },
    {
      id: 'q_excel-2-4',
      quizId: 'quiz_excel-2',
      position: 4,
      type: 'single',
      prompt: 'A cell shows #VALUE!. What is the most likely cause?',
      options: [
        { id: 'a', text: 'The number is too big' },
        { id: 'b', text: 'A cell in the formula contains text instead of a number' },
        { id: 'c', text: 'The sheet has too many rows' },
      ],
      correctOptionId: 'b',
      explanation: 'Text such as a typed "₦" sign or a space in a number cell is the usual cause of #VALUE!.',
    },

    {
      id: 'q_excel-3-1',
      quizId: 'quiz_excel-3',
      position: 1,
      type: 'single',
      prompt: 'Opening stock is 20, you receive 12 and sell 15. What is closing stock?',
      options: [
        { id: 'a', text: '17' },
        { id: 'b', text: '23' },
        { id: 'c', text: '47' },
        { id: 'd', text: '8' },
      ],
      correctOptionId: 'a',
      explanation: 'Closing = opening + received − sold = 20 + 12 − 15 = 17.',
    },
    {
      id: 'q_excel-3-2',
      quizId: 'quiz_excel-3',
      position: 2,
      type: 'single',
      prompt: 'What does =IF(E2<=F2, "REORDER", "OK") show when E2 is 5 and F2 is 3?',
      options: [
        { id: 'a', text: 'REORDER' },
        { id: 'b', text: 'OK' },
        { id: 'c', text: 'An error' },
      ],
      correctOptionId: 'b',
      explanation: '5 is not less than or equal to 3, so the test is false and IF shows the third part: OK.',
    },
    {
      id: 'q_excel-3-3',
      quizId: 'quiz_excel-3',
      position: 3,
      type: 'true-false',
      prompt: 'Once you have a stock sheet, you no longer need to count the shelves.',
      correct: false,
      explanation: 'The sheet shows what you should have. Counting shows what you really have; the difference reveals mistakes or losses.',
    },
    {
      id: 'q_excel-3-4',
      quizId: 'quiz_excel-3',
      position: 4,
      type: 'multiple',
      prompt: 'Which of these can sorting and filtering help you find? Choose all that apply.',
      options: [
        { id: 'a', text: 'Your best-selling items this week' },
        { id: 'b', text: 'Items that hardly sell' },
        { id: 'c', text: 'Who stole missing stock' },
        { id: 'd', text: 'All sales of one particular item' },
      ],
      correctOptionIds: ['a', 'b', 'd'],
      explanation: 'Sorting and filtering reorganise what you recorded. They cannot tell you anything that was never recorded.',
    },

    {
      id: 'q_excel-4-1',
      quizId: 'quiz_excel-4',
      position: 1,
      type: 'single',
      prompt: 'What does Sales!E:E mean in a formula?',
      options: [
        { id: 'a', text: 'Cell E1 on the current sheet' },
        { id: 'b', text: 'The whole of column E on the Sales sheet' },
        { id: 'c', text: 'Every sheet called Sales' },
      ],
      correctOptionId: 'b',
      explanation: 'The sheet name and an exclamation mark come first, then the range. E:E is the whole column.',
    },
    {
      id: 'q_excel-4-2',
      quizId: 'quiz_excel-4',
      position: 2,
      type: 'true-false',
      prompt: 'The item with the most sales is always the item that makes the most profit.',
      correct: false,
      explanation: 'A fast seller with a tiny margin can earn less than a slower item with a healthy margin. Check profit, not just sales.',
    },
    {
      id: 'q_excel-4-3',
      quizId: 'quiz_excel-4',
      position: 3,
      type: 'single',
      prompt: 'Which chart is best for comparing total sales across four weeks?',
      options: [
        { id: 'a', text: 'A column (bar) chart' },
        { id: 'b', text: 'A pie chart' },
        { id: 'c', text: 'No chart: a long list is clearer' },
      ],
      correctOptionId: 'a',
      explanation: 'Bars side by side make it easy to compare amounts. Pie charts show parts of one whole, not change over time.',
    },
    {
      id: 'q_excel-4-4',
      quizId: 'quiz_excel-4',
      position: 4,
      type: 'single',
      prompt: 'Gross profit for the month is…',
      options: [
        { id: 'a', text: 'Total sales' },
        { id: 'b', text: 'Total sales minus the cost of the goods you sold' },
        { id: 'c', text: 'Money left in the till' },
      ],
      correctOptionId: 'b',
      explanation: 'Gross profit is sales minus the cost of the goods sold. Rent, transport and wages come out of it afterwards.',
    },
  ],

  reviews: [
    {
      id: 'rev_excel-1',
      courseId: 'crs_excel',
      learnerName: 'Adaeze N.',
      location: 'Lagos',
      rating: 5,
      body: 'The markup vs margin lesson alone was worth it. I had been underpricing half my shelf.',
      createdAt: '2026-05-03',
    },
    {
      id: 'rev_excel-2',
      courseId: 'crs_excel',
      learnerName: 'Musa D.',
      location: 'Jos',
      rating: 4,
      body: 'Did everything in Google Sheets on my phone and it worked. Charts were a bit fiddly on a small screen.',
      createdAt: '2026-06-17',
    },
    {
      id: 'rev_excel-3',
      courseId: 'crs_excel',
      learnerName: 'Grace E.',
      location: 'Calabar',
      rating: 5,
      body: 'My stock sheet now tells me what to buy before I go to the market. Simple and practical.',
      createdAt: '2026-07-22',
    },
    {
      id: 'rev_excel-4',
      courseId: 'crs_excel',
      learnerName: 'Ibrahim K.',
      location: 'Ilorin',
      rating: 4,
      body: 'Clear and well paced. A downloadable template would make it even better.',
      createdAt: '2026-09-10',
    },
  ],
}
