import type { CourseBundle } from '@/data/types'

// SAMPLE CONTENT written for this demo. App features are described in general
// terms; menus change between versions, so learners should follow the app.

export const sellingOnWhatsApp: CourseBundle = {
  course: {
    id: 'crs_whatsapp',
    slug: 'selling-on-whatsapp-business',
    title: 'Selling on WhatsApp Business',
    subtitle: 'Turn the app your customers already use into a tidy shop: a profile, a catalogue, status updates that sell, and safe payments.',
    description:
      'For many Nigerian small businesses, WhatsApp is the shop. This short course shows you how to use the free WhatsApp Business app properly, using Kemi’s own adire fabric business as the example: a profile customers trust, a catalogue with clear prices, status updates and broadcasts that don’t annoy people, quick replies to save time, and how to confirm payments so you never send goods for a fake alert.',
    level: 'beginner',
    categoryId: 'cat_small-business',
    instructorId: 'ins_kemi-adeyemi',
    priceKobo: 0,
    language: 'English and Pidgin',
    outcomes: [
      'Set up a complete, trustworthy business profile',
      'Build a catalogue with clear photos and prices',
      'Post status updates and broadcasts that bring orders without spamming',
      'Save time with quick replies and labels',
      'Confirm payments safely and avoid fake transfer alerts',
    ],
    requirements: ['An Android phone or iPhone', 'The free WhatsApp Business app', 'Something to sell'],
    cover: {
      src: '/covers/selling-on-whatsapp-business.svg',
      alt: 'Kola-red adire-style pattern with a chat bubble and a price tag',
    },
    publishedAt: '2026-07-20',
    updatedAt: '2026-08-05',
  },

  modules: [
    { id: 'mod_wa-1', courseId: 'crs_whatsapp', position: 1, title: 'Set up your shop', summary: 'A profile and catalogue customers trust.' },
    { id: 'mod_wa-2', courseId: 'crs_whatsapp', position: 2, title: 'Bring in customers', summary: 'Status, broadcasts and photos.' },
    { id: 'mod_wa-3', courseId: 'crs_whatsapp', position: 3, title: 'Serve and get paid', summary: 'Fast replies and safe payments.' },
  ],

  lessons: [
    {
      id: 'les_wa-1-1',
      moduleId: 'mod_wa-1',
      slug: 'set-up-your-business-profile',
      position: 1,
      kind: 'video',
      title: 'Set up your business profile',
      summary: 'Name, photo, description, hours and location.',
      durationSeconds: 360,
      transcript:
        'Install the WhatsApp Business app. It is separate from regular WhatsApp and it is free. If you want to keep your personal chats apart, use a different number for the business. Open the business profile settings. Use your business name exactly as customers know it, here Kemi Adire Ibadan. Add a clear profile photo: your logo, or a neat photo of your best product, not a selfie. Write a one-line description that says what you sell and where: hand-dyed adire fabric, delivery across Nigeria. Add your opening hours, so customers know when to expect a reply, and your location or the area you deliver to. Finally add an email or Instagram link if you have one. A complete profile is the first thing that makes a stranger trust you enough to pay.',
    },
    {
      id: 'les_wa-1-2',
      moduleId: 'mod_wa-1',
      slug: 'catalogue-and-prices',
      position: 2,
      kind: 'article',
      title: 'Build your catalogue (with prices)',
      summary: 'Stop answering “how much?” fifty times a day.',
      bodyMarkdown: `The catalogue is your shop window inside WhatsApp. Customers can browse it from your profile and you can send any item into a chat.

## For every item, add

- **A clear photo** on a plain background (more on photos in the next module).
- **A name** customers would search for: "Adire indigo 2-yard, eleko pattern", not "Item 7".
- **The price.** Hiding prices ("DM for price") makes many customers leave instead of asking.
- **A short description**: size, material, colours available, and delivery time.

## Keep it current

Remove or mark items that are sold out. Nothing loses a sale faster than "sorry, that one has finished" after a customer has decided to buy.

## Group items into collections

Make collections like **"Ready to ship"**, **"Made to order"** and **"Under ₦10,000"**. Customers find what they want faster, and you can send a whole collection to someone who asks "what do you have?"

> Write prices in full, like **₦12,500**, not "12.5k". It looks more professional and avoids confusion.`,
    },
    {
      id: 'les_wa-1-3',
      moduleId: 'mod_wa-1',
      slug: 'set-up-check',
      position: 3,
      kind: 'quiz',
      title: 'Check: set up your shop',
      summary: 'Profile and catalogue.',
      quizId: 'quiz_wa-1',
    },

    {
      id: 'les_wa-2-1',
      moduleId: 'mod_wa-2',
      slug: 'status-updates-that-sell',
      position: 1,
      kind: 'article',
      title: 'Status updates that sell',
      summary: 'What to post, how often, and what to avoid.',
      bodyMarkdown: `Your status is seen by everyone who has saved your number. Used well, it brings orders every day without sending a single message.

## A simple weekly rhythm

| Day | Post idea |
| --- | --- |
| Monday | New arrival, with price |
| Wednesday | Behind the scenes: dyeing, packing, delivering |
| Friday | A happy customer (with their permission) |
| Sunday | A short offer or "last two pieces" |

## Tips

- **Two to four posts a day is plenty.** Twenty posts in a row make people skip all of them.
- **Always include the price** and how to order: "₦12,500. Reply 'ADIRE' to order."
- **Show the product in use**: fabric sewn into a dress sells better than fabric folded on a table.
- **Post when people are free**: early morning, lunch time and evening often work well. Check what works for your customers.

## Ask people to save your number

Status only reaches people who have saved your number. Put "Save this number to see new arrivals" in your welcome message and on your packaging.`,
    },
    {
      id: 'les_wa-2-2',
      moduleId: 'mod_wa-2',
      slug: 'broadcast-lists',
      position: 2,
      kind: 'video',
      title: 'Broadcasts without spamming',
      summary: 'Reach many customers privately, and keep them happy.',
      durationSeconds: 390,
      transcript:
        'A broadcast list sends one message to many people, but each person receives it as a private message from you, like a normal chat. Only people who have saved your number receive it, which is a good thing: they chose to hear from you. Make lists by interest, for example people who bought fabric, and people who asked about tailoring. Then send each list only what matters to them. Keep broadcasts rare, perhaps once a week, and always useful: a new collection, a restock of a popular item, or a real discount. Never add people to groups without asking. And if someone says stop, remove them and say thank you. A customer who mutes you will never see your next offer.',
    },
    {
      id: 'les_wa-2-3',
      moduleId: 'mod_wa-2',
      slug: 'product-photos-with-a-phone',
      position: 3,
      kind: 'article',
      title: 'Product photos with a phone',
      summary: 'Daylight, a plain background and steady hands.',
      bodyMarkdown: `You don't need a professional camera. You need **light**, a **plain background** and a few habits.

## Light

Shoot near a window or outside in **shade** during the day. Direct midday sun makes harsh shadows; a ring light at night often makes colours look wrong. Turn off the flash.

## Background

Use a plain wall, a white sheet or a large piece of cardboard. Remove anything that isn't the product: no phone chargers, no pot of stew behind it.

## Composition

- Fill most of the frame with the product.
- Take **one photo from the front**, one **close-up** of the detail (the pattern, the stitching), and one **in use** (worn, held, on a table).
- Hold the phone steady with both hands, or rest it on something.

## True colours

Customers complain most when colour in the photo doesn't match the item they receive. Avoid heavy filters. If the colour still looks off, say so in the description: "Colour is slightly deeper in person."

> Clean your camera lens with a soft cloth before every shoot. A greasy lens is the most common cause of hazy photos.`,
    },
    {
      id: 'les_wa-2-4',
      moduleId: 'mod_wa-2',
      slug: 'customers-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: bring in customers',
      summary: 'Status, broadcasts and photos.',
      quizId: 'quiz_wa-2',
    },

    {
      id: 'les_wa-3-1',
      moduleId: 'mod_wa-3',
      slug: 'quick-replies-and-labels',
      position: 1,
      kind: 'article',
      title: 'Quick replies and labels',
      summary: 'Answer common questions in seconds and never lose an order.',
      bodyMarkdown: `As orders grow, chats get lost. Two features keep you organised.

## Quick replies

Save answers you type again and again, and insert them with a shortcut such as \`/delivery\`:

| Shortcut | Message |
| --- | --- |
| \`/delivery\` | Delivery within Ibadan is ₦2,000 (1–2 days). Other states ₦4,500 by courier (3–5 days). |
| \`/pay\` | You can pay by transfer to: Kemi Adire Ventures, account details here. Please send a screenshot after paying. |
| \`/thanks\` | Thank you for your order! We'll send your tracking details once it ships. |

## Labels

Labels are coloured tags on chats. Use them to track every order:

- **New order**: customer has said what they want
- **Awaiting payment**
- **Paid: to ship**
- **Shipped**
- **Follow up**: asked a question, didn't buy yet

At the end of the day, open each label. "Awaiting payment" shows who to remind; "Paid: to ship" is tomorrow's packing list.

## Greeting and away messages

Set a greeting for first-time customers and an away message for outside your hours: "Thanks for messaging! We reply between 8am and 8pm."`,
    },
    {
      id: 'les_wa-3-2',
      moduleId: 'mod_wa-3',
      slug: 'taking-payment-safely',
      position: 2,
      kind: 'article',
      title: 'Taking payment safely',
      summary: 'Never ship for a screenshot alone.',
      bodyMarkdown: `Fake transfer alerts and edited screenshots are common. Protect yourself with one rule:

> **Only send goods after the money shows in your own bank app or account statement.**

## Why a screenshot is not enough

A screenshot can be edited in minutes. An SMS alert can be faked. Even a genuine "transfer successful" screen can be followed by a reversal.

## A safe routine

1. Ask the customer to pay to your **business account**, with the order name in the narration if possible.
2. When they say "I've paid", reply politely: "Thank you! Let me confirm it."
3. **Open your banking app** (not the SMS) and check the balance or transaction history.
4. Only then mark the chat **Paid: to ship** and pack the order.

## Pay on delivery?

For new customers far away, ask for payment first. Within your city, pay on delivery can work if your dispatch rider collects the money **before** handing over the item.

## Keep records

Note each order and payment in your cash book. If a customer later says "I paid", you can check the date and amount quickly instead of arguing.`,
    },
    {
      id: 'les_wa-3-3',
      moduleId: 'mod_wa-3',
      slug: 'final-check',
      position: 3,
      kind: 'quiz',
      title: 'Final check',
      summary: 'Quick replies, labels and payments.',
      quizId: 'quiz_wa-3',
    },
  ],

  quizzes: [
    { id: 'quiz_wa-1', lessonId: 'les_wa-1-3' },
    { id: 'quiz_wa-2', lessonId: 'les_wa-2-4' },
    { id: 'quiz_wa-3', lessonId: 'les_wa-3-3' },
  ],

  questions: [
    {
      id: 'q_wa-1-1',
      quizId: 'quiz_wa-1',
      position: 1,
      type: 'multiple',
      prompt: 'What should a complete business profile include? Choose all that apply.',
      options: [
        { id: 'a', text: 'Business name and a clear photo or logo' },
        { id: 'b', text: 'A description of what you sell and where' },
        { id: 'c', text: 'Opening hours' },
        { id: 'd', text: 'Your personal bank PIN' },
      ],
      correctOptionIds: ['a', 'b', 'c'],
      explanation: 'Never share a PIN with anyone. Name, photo, description and hours all help customers trust you.',
    },
    {
      id: 'q_wa-1-2',
      quizId: 'quiz_wa-1',
      position: 2,
      type: 'true-false',
      prompt: 'Writing “DM for price” in your catalogue usually increases sales.',
      correct: false,
      explanation: 'Many customers leave instead of asking. Showing prices saves time for both of you.',
    },
    {
      id: 'q_wa-1-3',
      quizId: 'quiz_wa-1',
      position: 3,
      type: 'single',
      prompt: 'Which is the best catalogue item name?',
      options: [
        { id: 'a', text: 'Item 7' },
        { id: 'b', text: 'Adire indigo 2-yard, eleko pattern' },
        { id: 'c', text: 'NEW!!!' },
      ],
      correctOptionId: 'b',
      explanation: 'A descriptive name tells customers exactly what it is and helps them find it.',
    },

    {
      id: 'q_wa-2-1',
      quizId: 'quiz_wa-2',
      position: 1,
      type: 'single',
      prompt: 'Who can see your WhatsApp status updates?',
      options: [
        { id: 'a', text: 'Everyone on WhatsApp' },
        { id: 'b', text: 'People who have saved your number (depending on your privacy settings)' },
        { id: 'c', text: 'Only people in your groups' },
      ],
      correctOptionId: 'b',
      explanation: 'Status reaches contacts who have saved your number, which is why you should ask customers to save it.',
    },
    {
      id: 'q_wa-2-2',
      quizId: 'quiz_wa-2',
      position: 2,
      type: 'true-false',
      prompt: 'Adding customers to a group without asking is a good way to grow sales.',
      correct: false,
      explanation: 'Unwanted groups annoy people and many will block you. Broadcast lists to people who saved your number are more respectful.',
    },
    {
      id: 'q_wa-2-3',
      quizId: 'quiz_wa-2',
      position: 3,
      type: 'multiple',
      prompt: 'Which make better product photos? Choose all that apply.',
      options: [
        { id: 'a', text: 'Daylight near a window' },
        { id: 'b', text: 'Flash at night' },
        { id: 'c', text: 'A plain background' },
        { id: 'd', text: 'A clean camera lens' },
      ],
      correctOptionIds: ['a', 'c', 'd'],
      explanation: 'Flash creates harsh light and false colours. Daylight, a plain background and a clean lens make a big difference.',
    },
    {
      id: 'q_wa-2-4',
      quizId: 'quiz_wa-2',
      position: 4,
      type: 'single',
      prompt: 'How many status posts a day is usually enough?',
      options: [
        { id: 'a', text: 'Two to four' },
        { id: 'b', text: 'Twenty or more' },
        { id: 'c', text: 'One a week' },
      ],
      correctOptionId: 'a',
      explanation: 'A few good posts a day keep you visible. Too many and people start skipping all of them.',
    },

    {
      id: 'q_wa-3-1',
      quizId: 'quiz_wa-3',
      position: 1,
      type: 'single',
      prompt: 'A customer sends a screenshot of a transfer. When should you ship the order?',
      options: [
        { id: 'a', text: 'Immediately, the screenshot proves it' },
        { id: 'b', text: 'After you see the money in your own bank app or statement' },
        { id: 'c', text: 'After the SMS alert arrives' },
      ],
      correctOptionId: 'b',
      explanation: 'Screenshots and SMS alerts can be faked. Your own bank app or statement is the only reliable proof.',
    },
    {
      id: 'q_wa-3-2',
      quizId: 'quiz_wa-3',
      position: 2,
      type: 'true-false',
      prompt: 'Labels help you see which customers still need to pay.',
      correct: true,
      explanation: 'A label such as “Awaiting payment” shows everyone to remind at a glance.',
    },
    {
      id: 'q_wa-3-3',
      quizId: 'quiz_wa-3',
      position: 3,
      type: 'single',
      prompt: 'What is a quick reply for?',
      options: [
        { id: 'a', text: 'Sending a saved answer with a short shortcut' },
        { id: 'b', text: 'Replying automatically to every message' },
        { id: 'c', text: 'Deleting old chats' },
      ],
      correctOptionId: 'a',
      explanation: 'Quick replies let you insert common answers, like delivery fees, without retyping them.',
    },
    {
      id: 'q_wa-3-4',
      quizId: 'quiz_wa-3',
      position: 4,
      type: 'multiple',
      prompt: 'Which are part of a safe payment routine? Choose all that apply.',
      options: [
        { id: 'a', text: 'Pay into a business account' },
        { id: 'b', text: 'Check your banking app before packing' },
        { id: 'c', text: 'Record the payment in your cash book' },
        { id: 'd', text: 'Trust any alert that looks real' },
      ],
      correctOptionIds: ['a', 'b', 'c'],
      explanation: 'Alerts can be faked. Confirm in your own app, then record it.',
    },
  ],

  reviews: [
    {
      id: 'rev_wa-1',
      courseId: 'crs_whatsapp',
      learnerName: 'Funke O.',
      location: 'Lagos',
      rating: 5,
      body: 'The fake alert lesson saved me. A week later someone tried exactly that trick on me.',
      createdAt: '2026-08-12',
    },
    {
      id: 'rev_wa-2',
      courseId: 'crs_whatsapp',
      learnerName: 'Emeka J.',
      location: 'Nnewi',
      rating: 4,
      body: 'Labels changed how I run my spare parts orders. Short and useful.',
      createdAt: '2026-09-03',
    },
  ],
}
