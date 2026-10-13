import type { CourseBundle } from '@/data/types'

// SAMPLE CONTENT written for this demo.

export const bookkeepingForMarketTraders: CourseBundle = {
  course: {
    id: 'crs_bookkeeping',
    slug: 'bookkeeping-for-market-traders',
    title: 'Bookkeeping for market traders',
    subtitle: 'A cash book, a credit book and a weekly stock count: simple records that show whether you are really making money.',
    description:
      '“Money dey enter, but where e dey go?” If that sounds familiar, this course is for you. Using the example of Mama Chidi, who sells foodstuff at Ochanja Market, you learn to keep a daily cash book, separate business money from house money, track customers who buy on credit, and work out real profit. It needs only a notebook or a phone, and about ten minutes at closing time.',
    level: 'beginner',
    categoryId: 'cat_money-skills',
    instructorId: 'ins_ngozi-eze',
    priceKobo: 300_000,
    language: 'English and Pidgin',
    outcomes: [
      'Keep a daily cash book that balances at closing time',
      'Separate business money from personal money',
      'Track customers who buy on credit and collect on time',
      'Work out gross profit and know if the business is growing',
    ],
    requirements: ['A notebook and pen, or a phone with a notes or spreadsheet app', 'Basic adding and subtracting'],
    cover: {
      src: '/covers/bookkeeping-for-market-traders.svg',
      alt: 'Green adire-style pattern with an open ledger book, coins and a basket of tomatoes',
    },
    publishedAt: '2026-05-11',
    updatedAt: '2026-05-11',
  },

  modules: [
    { id: 'mod_books-1', courseId: 'crs_bookkeeping', position: 1, title: 'Why keep records', summary: 'Know where the money goes.' },
    { id: 'mod_books-2', courseId: 'crs_bookkeeping', position: 2, title: 'The daily cash book', summary: 'Ten minutes at closing time.' },
    { id: 'mod_books-3', courseId: 'crs_bookkeeping', position: 3, title: 'Profit, stock and credit', summary: 'Are you really making money?' },
  ],

  lessons: [
    {
      id: 'les_books-1-1',
      moduleId: 'mod_books-1',
      slug: 'money-in-money-out',
      position: 1,
      kind: 'video',
      title: 'Money in, money out',
      summary: 'Why a busy stall can still be losing money.',
      durationSeconds: 360,
      transcript:
        'Meet Mama Chidi. Her stall at Ochanja Market is always busy. Customers buy rice, beans, palm oil and crayfish all day. Yet at the end of every month she struggles to pay her shop rent, and she cannot understand why. Busy is not the same as profitable. Money comes in from sales, but money also goes out: buying new stock, transport to the market, the boy who helps her carry bags, school fees taken from the till, and gifts to relatives who visit. Without records, all of these mix together and disappear. Bookkeeping simply means writing down money in and money out, every day. It is not only for big companies with accountants. In this course you will learn a version that takes ten minutes at closing time.',
    },
    {
      id: 'les_books-1-2',
      moduleId: 'mod_books-1',
      slug: 'separate-business-and-personal-money',
      position: 2,
      kind: 'article',
      title: 'Separate business money from personal money',
      summary: 'The one habit that makes every other record make sense.',
      bodyMarkdown: `If house money and business money live in the same purse, you can never know whether the business is making a profit.

## Pay yourself a salary

Decide on a fixed amount the business pays **you**, say ₦5,000 a day or ₦100,000 a month. Take only that for house expenses. Everything else stays in the business.

## Use two places for money

- **Business:** a separate purse, box or, better, a separate bank account or mobile money wallet for sales.
- **Personal:** your salary goes here. School fees, food at home and family support come from this.

## When you must borrow from the business

Life happens. If you take ₦20,000 from the till for a hospital bill, **write it down** as "owner withdrawal" in your cash book. It is not a business expense, and if you don't record it the books will never balance.

> "Na my money, I fit take am anytime" is true. But if you take it without writing it down, you will never know whether the stall is doing well or badly.`,
    },
    {
      id: 'les_books-1-3',
      moduleId: 'mod_books-1',
      slug: 'why-records-check',
      position: 3,
      kind: 'quiz',
      title: 'Check: why keep records',
      summary: 'Three quick questions.',
      quizId: 'quiz_books-1',
    },

    {
      id: 'les_books-2-1',
      moduleId: 'mod_books-2',
      slug: 'setting-up-a-cash-book',
      position: 1,
      kind: 'article',
      title: 'Setting up a cash book',
      summary: 'Five columns in a notebook or on your phone.',
      bodyMarkdown: `A cash book is a list of every time money comes **in** or goes **out**, in the order it happens.

Rule five columns across a page (or make them in a spreadsheet):

| Date | Description | Money in (₦) | Money out (₦) | Balance (₦) |
| --- | --- | --- | --- | --- |
| 12 May | Opening cash | | | 15,000 |
| 12 May | Sold 2 paint rubbers of rice | 9,000 | | 24,000 |
| 12 May | Transport from Head Bridge | | 1,500 | 22,500 |
| 12 May | Sold palm oil (5 litres) | 7,500 | | 30,000 |
| 12 May | Bought crayfish stock | | 12,000 | 18,000 |

## How the balance works

Each new balance = **previous balance + money in − money out**. The balance should always equal the cash actually in your purse.

## Tips

- Write entries **as they happen**, or at least before you go home. Memory is not a record.
- Small amounts matter. ₦200 here and ₦500 there is ₦15,000 a month.
- Mobile transfers count as money in, even though no cash changed hands. Add a note like "transfer" so you can match them to your bank alerts.`,
    },
    {
      id: 'les_books-2-2',
      moduleId: 'mod_books-2',
      slug: 'recording-a-market-day',
      position: 2,
      kind: 'video',
      title: 'Recording a market day',
      summary: 'Follow Mama Chidi’s entries from morning to closing.',
      durationSeconds: 450,
      transcript:
        'Let us follow Mama Chidi through a Tuesday. She opens with fifteen thousand naira in her purse, so the first line says opening cash, fifteen thousand. A customer buys two paint rubbers of rice for nine thousand: money in, balance twenty-four thousand. She pays fifteen hundred naira for transport: money out. A regular customer, Mrs Okafor, collects beans worth six thousand naira but will pay on Friday. That does not go in the cash book, because no money moved. It goes in the credit book, which we cover later. At midday a customer pays eight thousand by transfer. Mama Chidi checks the alert on her phone before writing it in. Notice she writes every entry immediately, in the gaps between customers. At closing time she only has to add up and check, not remember everything.',
    },
    {
      id: 'les_books-2-3',
      moduleId: 'mod_books-2',
      slug: 'balancing-at-closing-time',
      position: 3,
      kind: 'article',
      title: 'Balancing at closing time',
      summary: 'What to do when the purse and the book disagree.',
      bodyMarkdown: `At closing time, count the cash in your purse and check your transfers. Compare the total with the last balance in your cash book.

## If they match

Well done. Draw a line under the day and write tomorrow's opening balance.

## If you have less money than the book says

Something went out that you didn't record. Ask:

1. Did I give change and forget to subtract it?
2. Did I take money for myself, transport or food and not write it down?
3. Did a customer underpay, or did I miscount a bundle of notes?

## If you have more money than the book says

You probably forgot to record a sale. That is good news for today, but a missed sale means your records under-report what you sell.

## Write the difference down

If you cannot find the mistake, write a line: **"Unexplained difference: −₦700"**. Never quietly change numbers to make the book balance. One small difference is normal. The same difference every week is a pattern worth investigating.

> Balancing every day takes five minutes. Balancing once a month takes an afternoon, and by then you will not remember what happened.`,
    },
    {
      id: 'les_books-2-4',
      moduleId: 'mod_books-2',
      slug: 'cash-book-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: the cash book',
      summary: 'Entries, balances and differences.',
      quizId: 'quiz_books-2',
    },

    {
      id: 'les_books-3-1',
      moduleId: 'mod_books-3',
      slug: 'working-out-profit',
      position: 1,
      kind: 'article',
      title: 'Working out profit',
      summary: 'Sales minus costs, done properly.',
      bodyMarkdown: `Cash in your purse is not profit. Profit is what is left after **all** the costs of earning that money.

## Gross profit

**Gross profit = sales − cost of the goods you sold**

If Mama Chidi sold ₦480,000 of foodstuff in a month and those goods cost her ₦390,000 to buy, her gross profit is **₦90,000**.

## Net profit

From gross profit, take away the costs of running the stall:

| Item | Amount (₦) |
| --- | --- |
| Gross profit | 90,000 |
| Shop rent (monthly share) | −20,000 |
| Transport | −18,000 |
| Market levy | −3,000 |
| Helper's pay | −15,000 |
| **Net profit** | **34,000** |

That ₦34,000 is what the business really earned. Notice her own salary isn't in the list yet. If she paid herself ₦50,000 this month, the business actually **lost** ₦16,000, and the extra money came from somewhere else, usually by not restocking.

## Check it every month

Write these two numbers down at the end of each month. If net profit keeps falling, look at your prices and your biggest costs before it becomes a crisis.`,
    },
    {
      id: 'les_books-3-2',
      moduleId: 'mod_books-3',
      slug: 'customers-on-credit',
      position: 2,
      kind: 'article',
      title: 'Customers who buy on credit',
      summary: 'Keep a gbese book and collect on time.',
      bodyMarkdown: `Selling on credit keeps loyal customers, but unpaid debts (*gbese*) are one of the fastest ways a stall runs out of money.

## Keep a separate credit book

One page per customer, with these columns:

| Date | Goods | Amount owed (₦) | Paid (₦) | Balance (₦) | Due date |
| --- | --- | --- | --- | --- | --- |
| 12 May | Beans, 1 paint | 6,000 | | 6,000 | 16 May |
| 16 May | Part payment | | 4,000 | 2,000 | 23 May |

## Rules that protect you

- **Set a limit** for each customer, for example ₦10,000. No new credit until the old debt is cleared.
- **Agree a date** and write it down in front of the customer.
- **Send a friendly reminder** a day before the due date.
- **Review weekly.** Add up everything you are owed. That money is your stock sitting in someone else's kitchen.

> Credit sales are not cash. Record them in the credit book, **not** the cash book. They only enter the cash book on the day the customer pays.`,
    },
    {
      id: 'les_books-3-3',
      moduleId: 'mod_books-3',
      slug: 'counting-stock',
      position: 3,
      kind: 'video',
      title: 'Counting stock',
      summary: 'A weekly count that catches losses early.',
      durationSeconds: 330,
      transcript:
        'Once a week, on a quiet morning, Mama Chidi counts her stock: bags of rice, paint rubbers of beans, kegs of oil, sacks of crayfish. She writes the count next to what she expected to have, based on what she bought and what she sold. This week she expected eight kegs of palm oil but found seven. Where did the other one go? Maybe it was sold and not recorded, maybe a relative took one home, or maybe it leaked. The count does not answer the question, but it tells her to ask. Stock is money sitting on your shelf. Counting it regularly is how you notice spoiled goods, slow sellers and missing items while the loss is still small.',
    },
    {
      id: 'les_books-3-4',
      moduleId: 'mod_books-3',
      slug: 'final-check',
      position: 4,
      kind: 'quiz',
      title: 'Final check',
      summary: 'Profit, credit and stock.',
      quizId: 'quiz_books-3',
    },
  ],

  quizzes: [
    { id: 'quiz_books-1', lessonId: 'les_books-1-3' },
    { id: 'quiz_books-2', lessonId: 'les_books-2-4' },
    { id: 'quiz_books-3', lessonId: 'les_books-3-4' },
  ],

  questions: [
    {
      id: 'q_books-1-1',
      quizId: 'quiz_books-1',
      position: 1,
      type: 'true-false',
      prompt: 'A stall that is busy all day must be making a profit.',
      correct: false,
      explanation: 'Busy is not the same as profitable. Costs and unrecorded withdrawals can eat all the money coming in.',
    },
    {
      id: 'q_books-1-2',
      quizId: 'quiz_books-1',
      position: 2,
      type: 'single',
      prompt: 'You take ₦20,000 from the till for a family emergency. What should you do?',
      options: [
        { id: 'a', text: 'Nothing, it is your money' },
        { id: 'b', text: 'Record it in the cash book as an owner withdrawal' },
        { id: 'c', text: 'Record it as a business expense' },
      ],
      correctOptionId: 'b',
      explanation: 'It is your money, but write it down as an owner withdrawal so the books still balance and it is not mistaken for a business cost.',
    },
    {
      id: 'q_books-1-3',
      quizId: 'quiz_books-1',
      position: 3,
      type: 'multiple',
      prompt: 'Which of these help keep business and personal money separate? Choose all that apply.',
      options: [
        { id: 'a', text: 'Paying yourself a fixed salary' },
        { id: 'b', text: 'Using a separate account or wallet for sales' },
        { id: 'c', text: 'Paying school fees straight from the till' },
        { id: 'd', text: 'Recording any money you take for yourself' },
      ],
      correctOptionIds: ['a', 'b', 'd'],
      explanation: 'Paying house costs straight from the till is exactly what mixes the two. The other three keep them apart.',
    },

    {
      id: 'q_books-2-1',
      quizId: 'quiz_books-2',
      position: 1,
      type: 'single',
      prompt: 'Your balance is ₦18,000. You sell goods for ₦6,000 and pay ₦1,000 for transport. What is the new balance?',
      options: [
        { id: 'a', text: '₦25,000' },
        { id: 'b', text: '₦23,000' },
        { id: 'c', text: '₦13,000' },
      ],
      correctOptionId: 'b',
      explanation: 'New balance = 18,000 + 6,000 − 1,000 = ₦23,000.',
    },
    {
      id: 'q_books-2-2',
      quizId: 'quiz_books-2',
      position: 2,
      type: 'true-false',
      prompt: 'A customer collects goods today and will pay on Friday. You should write it in the cash book today.',
      correct: false,
      explanation: 'No money moved today, so it goes in the credit book. It enters the cash book on the day the customer pays.',
    },
    {
      id: 'q_books-2-3',
      quizId: 'quiz_books-2',
      position: 3,
      type: 'single',
      prompt: 'At closing time your purse has ₦700 less than the cash book says, and you can’t find why. What should you do?',
      options: [
        { id: 'a', text: 'Change an earlier number so it balances' },
        { id: 'b', text: 'Write a line: “Unexplained difference: −₦700”' },
        { id: 'c', text: 'Ignore it' },
      ],
      correctOptionId: 'b',
      explanation: 'Record the difference honestly. If the same difference keeps appearing, the pattern will show you where to look.',
    },
    {
      id: 'q_books-2-4',
      quizId: 'quiz_books-2',
      position: 4,
      type: 'true-false',
      prompt: 'A payment received by bank transfer counts as money in.',
      correct: true,
      explanation: 'Transfers are sales income just like cash. Note them as transfers and check them against your bank alerts.',
    },

    {
      id: 'q_books-3-1',
      quizId: 'quiz_books-3',
      position: 1,
      type: 'single',
      prompt: 'Sales were ₦300,000 and the goods sold cost ₦240,000. What is the gross profit?',
      options: [
        { id: 'a', text: '₦60,000' },
        { id: 'b', text: '₦240,000' },
        { id: 'c', text: '₦540,000' },
      ],
      correctOptionId: 'a',
      explanation: 'Gross profit = sales − cost of goods sold = 300,000 − 240,000 = ₦60,000.',
    },
    {
      id: 'q_books-3-2',
      quizId: 'quiz_books-3',
      position: 2,
      type: 'multiple',
      prompt: 'Which are good rules for selling on credit? Choose all that apply.',
      options: [
        { id: 'a', text: 'Set a credit limit for each customer' },
        { id: 'b', text: 'Agree and write down a due date' },
        { id: 'c', text: 'Give more credit before old debt is paid' },
        { id: 'd', text: 'Add up what you are owed every week' },
      ],
      correctOptionIds: ['a', 'b', 'd'],
      explanation: 'New credit before old debt is cleared is how small debts become large losses.',
    },
    {
      id: 'q_books-3-3',
      quizId: 'quiz_books-3',
      position: 3,
      type: 'true-false',
      prompt: 'A weekly stock count tells you exactly why stock is missing.',
      correct: false,
      explanation: 'The count shows THAT something is missing. You still have to find out why: an unrecorded sale, spoilage or theft.',
    },
    {
      id: 'q_books-3-4',
      quizId: 'quiz_books-3',
      position: 4,
      type: 'single',
      prompt: 'Which of these is NOT part of net profit calculations for the stall?',
      options: [
        { id: 'a', text: 'Shop rent' },
        { id: 'b', text: 'Transport to the market' },
        { id: 'c', text: 'Money a customer still owes you' },
        { id: 'd', text: 'Market levy' },
      ],
      correctOptionId: 'c',
      explanation: 'Money owed is a debt to collect, not a running cost. Rent, transport and levies are costs taken from gross profit.',
    },
  ],

  reviews: [
    {
      id: 'rev_books-1',
      courseId: 'crs_bookkeeping',
      learnerName: 'Mrs Okonkwo',
      location: 'Onitsha',
      rating: 5,
      body: 'I now know which customers owe me and for how long. I collected ₦60,000 of old debt in two weeks.',
      createdAt: '2026-06-02',
    },
    {
      id: 'rev_books-2',
      courseId: 'crs_bookkeeping',
      learnerName: 'Sunday P.',
      location: 'Aba',
      rating: 4,
      body: 'Simple and practical. The examples sound like real market life, not a textbook.',
      createdAt: '2026-07-14',
    },
  ],
}
