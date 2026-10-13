import type { CourseBundle } from '@/data/types'

// SAMPLE CONTENT written for this demo.

export const introToUiDesign: CourseBundle = {
  course: {
    id: 'crs_ui',
    slug: 'intro-to-ui-design',
    title: 'Intro to UI design',
    subtitle: 'Design clear, friendly app screens: layout, hierarchy, colour and type, tested on real users with real phones.',
    description:
      'Good interface design is not decoration. It is the difference between a customer finishing a bank transfer and giving up halfway. In this course you learn the core skills of UI design by redesigning screens Nigerian users meet every day: a transfer screen, a food-ordering app and a school results portal. You will finish with a small prototype and a habit of testing your work with real people.',
    level: 'intermediate',
    categoryId: 'cat_design',
    instructorId: 'ins_kemi-adeyemi',
    priceKobo: 750_000,
    language: 'English',
    outcomes: [
      'Explain the difference between UI and UX and where each fits',
      'Use spacing, alignment and hierarchy to guide the eye',
      'Choose accessible colours and readable type for small screens',
      'Design for low-end phones and expensive mobile data',
      'Build a simple clickable prototype and test it with users',
    ],
    requirements: ['A free design tool account (any tool with frames and prototyping)', 'Comfortable using a computer', 'No design experience required'],
    cover: {
      src: '/covers/intro-to-ui-design.svg',
      alt: 'Plum adire-style pattern with a phone outline showing layout blocks and a colour swatch',
    },
    publishedAt: '2026-06-08',
    updatedAt: '2026-09-21',
  },

  modules: [
    { id: 'mod_ui-1', courseId: 'crs_ui', position: 1, title: 'What UI design is', summary: 'The job, the vocabulary and the mindset.' },
    { id: 'mod_ui-2', courseId: 'crs_ui', position: 2, title: 'Layout and hierarchy', summary: 'Guide the eye to what matters.' },
    { id: 'mod_ui-3', courseId: 'crs_ui', position: 3, title: 'Colour and type', summary: 'Readable, accessible and on-brand.' },
    { id: 'mod_ui-4', courseId: 'crs_ui', position: 4, title: 'Design for real users', summary: 'Small phones, slow data and honest feedback.' },
  ],

  lessons: [
    {
      id: 'les_ui-1-1',
      moduleId: 'mod_ui-1',
      slug: 'what-is-ui-design',
      position: 1,
      kind: 'video',
      title: 'What UI design is (and is not)',
      summary: 'From “making it pretty” to “making it work”.',
      durationSeconds: 420,
      transcript:
        'Think about the last time you sent money from a banking app. You opened the app, chose transfer, picked a bank, typed an account number, checked the name, entered an amount and confirmed. Every one of those screens was designed by someone. User interface design, or UI design, is deciding what goes on each screen, where it goes, and how it looks, so that people can do what they came to do without confusion. It is not just making things pretty. A beautiful transfer screen that hides the confirm button, or shows the recipient’s name in tiny grey text, is a failed design. In this course, we judge every design decision by one question: does this help the person finish their task?',
    },
    {
      id: 'les_ui-1-2',
      moduleId: 'mod_ui-1',
      slug: 'ui-and-ux',
      position: 2,
      kind: 'article',
      title: 'UI and UX: what’s the difference?',
      summary: 'Two words you will hear every day, and where they overlap.',
      bodyMarkdown: `You will hear **UI** and **UX** used together, and sometimes as if they mean the same thing. They don't.

## UX: user experience

UX is the **whole journey**: why someone opens the app, what steps they take, where they get stuck, and how they feel afterwards. A UX designer might discover that market traders want to check a payment came in **without** logging in fully, because they are serving a customer at the same time.

## UI: user interface

UI is the **screens themselves**: layout, buttons, text, colour, icons and spacing. A UI designer decides how that "quick balance check" screen looks and behaves.

| | UX asks | UI asks |
| --- | --- | --- |
| Focus | Is this the right journey? | Is this screen clear? |
| Example | Should transfers need 2 steps or 5? | Where does the Confirm button go? |
| Methods | Interviews, journey maps | Layout, type, colour, components |

## Why it matters to you

Most junior design jobs in Nigeria ask for both. You can't design a good screen (UI) without understanding the person using it (UX). This course focuses on UI, but every module starts with the user.`,
    },
    {
      id: 'les_ui-1-3',
      moduleId: 'mod_ui-1',
      slug: 'basics-check',
      position: 3,
      kind: 'quiz',
      title: 'Check: UI basics',
      summary: 'UI, UX and the designer’s job.',
      quizId: 'quiz_ui-1',
    },

    {
      id: 'les_ui-2-1',
      moduleId: 'mod_ui-2',
      slug: 'spacing-and-alignment',
      position: 1,
      kind: 'article',
      title: 'Spacing and alignment',
      summary: 'Space shows what belongs together.',
      bodyMarkdown: `Before colour or fonts, a screen is organised by **space** and **alignment**.

## Proximity: close means related

Things placed close together look like they belong together. On a transfer screen, the label "Account number" must sit **closer** to its own input than to the input above it. Otherwise people type the amount into the wrong box.

## Use a spacing scale

Don't pick spacing by eye each time. Use a small set of values, for example **4, 8, 16, 24, 32, 48** pixels:

- 8 between a label and its input
- 16 between fields
- 32 between sections

A scale makes screens look calm and consistent, and makes decisions faster.

## Align to edges

Every element should line up with something else. Text left-aligned to the same edge is easy to scan; text centred in some places and left-aligned in others looks messy. Centre only short things like a single heading or an empty-state message.

> Quick test: squint at your screen until the text blurs. You should still see clear groups. If everything blurs into one grey block, add space between groups.`,
    },
    {
      id: 'les_ui-2-2',
      moduleId: 'mod_ui-2',
      slug: 'visual-hierarchy',
      position: 2,
      kind: 'video',
      title: 'Visual hierarchy on a transfer screen',
      summary: 'Size, weight and colour decide what people see first.',
      durationSeconds: 480,
      transcript:
        'Here is a transfer confirmation screen from a made-up bank. Everything on it is the same size and weight: the amount, the recipient’s name, the bank, the fee, the date. Your eye has nowhere to land. Let us fix it. What must the user check before confirming? The amount and the recipient’s name. So we make the amount large and bold: it is the most important thing on the screen. The recipient’s name comes next, slightly smaller. The bank, fee and date become smaller, quieter text below. Finally, there is one main action: Confirm, as a big button in the brand colour. Cancel becomes a plain text link, still easy to find but not competing. Now the screen reads in the right order. That is hierarchy.',
    },
    {
      id: 'les_ui-2-3',
      moduleId: 'mod_ui-2',
      slug: 'grids-for-mobile',
      position: 3,
      kind: 'article',
      title: 'Grids for mobile screens',
      summary: 'Margins, columns and the thumb zone.',
      bodyMarkdown: `A grid is a set of invisible lines that everything lines up to. On phones, keep it simple.

## Start with margins

Use **16 px** side margins on a 360 px wide screen. Nothing touches the edge except full-width images. That leaves 328 px for content.

## Columns

A **4-column** grid works well on phones. Cards can span all 4 columns (one per row) or 2 columns (two per row) for small items like product tiles in a food-ordering app.

## The thumb zone

Most people hold a phone in one hand and tap with a thumb. The **bottom half** of the screen is easiest to reach; the top corners are hardest.

- Put the main action (Order, Pay, Confirm) near the **bottom**.
- Put rarely used things (settings, help) at the top.
- Make every tap target at least **44 × 44 px**, with space between them.

## Design at the smallest size first

Many Nigerian users have phones around 360 px wide. If your design works there, it will work on bigger screens. The reverse is rarely true.`,
    },
    {
      id: 'les_ui-2-4',
      moduleId: 'mod_ui-2',
      slug: 'layout-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: layout and hierarchy',
      summary: 'Spacing, hierarchy and grids.',
      quizId: 'quiz_ui-2',
    },

    {
      id: 'les_ui-3-1',
      moduleId: 'mod_ui-3',
      slug: 'choosing-colours',
      position: 1,
      kind: 'article',
      title: 'Choosing colours that work',
      summary: 'A small palette, strong contrast and colour that means something.',
      bodyMarkdown: `Most good app palettes are smaller than you think.

## A practical palette

- **One brand colour** for the main action and key highlights.
- **Neutrals** (near-black, greys and an off-white) for text and backgrounds. These make up most of the screen.
- **Status colours**: green for success, red for errors, amber for warnings.

## Contrast is not optional

Text must stand out from its background. The WCAG guideline asks for a contrast ratio of at least **4.5:1** for normal text. Light grey text on white often fails, and it is worse outdoors in bright sunlight, which is where many of your users are.

## Never use colour alone

About 1 in 12 men has some colour blindness. A red border alone does not say "error" to everyone. Always add a **word or icon**: "Account number is too short".

## Colour carries meaning

In a banking app, green near an amount reads as "money in". Using green for a debit confuses people. Decide what each colour means and stick to it everywhere.

> Pick colours in this order: neutrals first, then the brand colour, then status colours. Decoration last, if at all.`,
    },
    {
      id: 'les_ui-3-2',
      moduleId: 'mod_ui-3',
      slug: 'type-for-small-screens',
      position: 2,
      kind: 'article',
      title: 'Type for small screens',
      summary: 'Sizes, line length and the fonts that support Nigerian names.',
      bodyMarkdown: `Most of what people do in an app is **read**. Typography is the biggest part of UI design.

## Sizes

On phones, body text should be at least **16 px**. Make a small type scale and stick to it:

| Use | Size | Weight |
| --- | --- | --- |
| Screen title | 24 px | Bold |
| Section heading | 18 px | Semibold |
| Body | 16 px | Regular |
| Caption, labels | 13–14 px | Medium |

## Line height and length

Give body text a line height of about **1.5** and keep lines short. On a phone that happens naturally; on tablets, limit width.

## Check your font supports real names

Many fonts are missing letters used in Nigerian languages, such as **ẹ, ọ, ṣ** and tone marks. Type real names into your design (Adébáyọ̀, Ọlọ́lá, Ṣeun) before you choose a font. A font that shows boxes or wrong letters in a customer's name is a broken product, not just an ugly one.

## Use weight, not just size

Bold and regular at the same size often create enough hierarchy. Too many sizes make a screen feel noisy.`,
    },
    {
      id: 'les_ui-3-3',
      moduleId: 'mod_ui-3',
      slug: 'building-a-palette',
      position: 3,
      kind: 'video',
      title: 'Building a palette for a school portal',
      summary: 'From one brand colour to a full, accessible set.',
      durationSeconds: 420,
      transcript:
        'Let us build a palette for a school results portal. The school’s colour is a deep blue, so that is our brand colour. First, the neutrals: a near-black for text, two greys for secondary text and borders, and an off-white background that is softer on the eyes than pure white. Next we check contrast. Our grey text on the off-white background gives a ratio of 3.8 to 1, which fails for body text, so we darken it until it passes 4.5 to 1. Then status colours: green for passed, red for failed, amber for results not yet released. Each status also gets a label, because some parents and students will not see the colour difference. Finally we test the palette on a real result slip, not just as swatches.',
    },
    {
      id: 'les_ui-3-4',
      moduleId: 'mod_ui-3',
      slug: 'colour-type-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: colour and type',
      summary: 'Contrast, palettes and readable type.',
      quizId: 'quiz_ui-3',
    },

    {
      id: 'les_ui-4-1',
      moduleId: 'mod_ui-4',
      slug: 'low-data-and-small-phones',
      position: 1,
      kind: 'article',
      title: 'Designing for low data and small phones',
      summary: 'Respect the user’s data, battery and storage.',
      bodyMarkdown: `Data is expensive, phones are often shared or second-hand, and networks drop. Good design respects that.

## Make screens light

- Use **fewer, smaller images**. A product photo on a list needs to be a thumbnail, not a full-size image.
- Prefer **icons and text** to decorative illustrations.
- Show **text first** and let images load after.

## Plan for the network failing

Design these states, not just the happy path:

| State | What the user should see |
| --- | --- |
| Loading | A skeleton of the layout, not a blank screen |
| Offline | A clear message and what still works |
| Failed | What went wrong and a Retry button |
| Empty | Why it's empty and what to do next |

For payments, be extra clear: "We couldn't confirm your transfer. **Don't try again yet**; check your balance first." A vague error causes people to pay twice.

## Small screens

Test at **360 px wide**. Watch for long Nigerian names, long bank names and big naira amounts like ₦1,250,000.00 breaking your layout. Real data is always longer than "John Doe".`,
    },
    {
      id: 'les_ui-4-2',
      moduleId: 'mod_ui-4',
      slug: 'prototype-a-food-order-screen',
      position: 2,
      kind: 'video',
      title: 'Prototype a food-ordering flow',
      summary: 'Link three screens into a clickable prototype.',
      durationSeconds: 600,
      transcript:
        'We will design three screens for a small food-ordering app for a buka in Ibadan: the menu, the cart and the order confirmation. On the menu, each dish is a card with a small photo, the name, the price in naira and an Add button within thumb reach. When something is in the cart, a bar appears at the bottom showing the number of items and the total, with a View cart button. The cart screen lists items with plus and minus controls and a clear Pay button at the bottom. The confirmation screen says what was ordered, the total, and roughly when it will arrive. Now we link them: tapping View cart goes to the cart, tapping Pay goes to confirmation. Press play, and you can tap through it like a real app.',
    },
    {
      id: 'les_ui-4-3',
      moduleId: 'mod_ui-4',
      slug: 'getting-feedback',
      position: 3,
      kind: 'article',
      title: 'Getting honest feedback',
      summary: 'Five people, one task, and keeping quiet.',
      bodyMarkdown: `You are too close to your own design to see its problems. Watching other people use it is the fastest way to improve.

## Test with five people

Research shows that a handful of people find most of the big problems. Five is enough. Choose people like your real users: if the app is for traders, don't test only with designer friends.

## Give a task, not a tour

Say: "You're hungry. Order one plate of amala and gbegiri and pay for it." Then **stop talking**.

## Watch, don't help

When they hesitate, don't point. Ask: "What are you looking for?" Write down:

- Where they **paused** or looked confused
- What they **tapped** that wasn't a button
- What they **said** out loud

## After the test

Look for problems that **more than one person** hit. Fix those first. If three of five people missed the cart bar, it isn't the users' fault: the bar needs to be more visible.

> People are polite. "It's nice" tells you nothing. What they **do** tells you everything.`,
    },
    {
      id: 'les_ui-4-4',
      moduleId: 'mod_ui-4',
      slug: 'final-check',
      position: 4,
      kind: 'quiz',
      title: 'Final check',
      summary: 'Real users, real phones.',
      quizId: 'quiz_ui-4',
    },
  ],

  quizzes: [
    { id: 'quiz_ui-1', lessonId: 'les_ui-1-3' },
    { id: 'quiz_ui-2', lessonId: 'les_ui-2-4' },
    { id: 'quiz_ui-3', lessonId: 'les_ui-3-4' },
    { id: 'quiz_ui-4', lessonId: 'les_ui-4-4' },
  ],

  questions: [
    {
      id: 'q_ui-1-1',
      quizId: 'quiz_ui-1',
      position: 1,
      type: 'single',
      prompt: 'Which question is mainly a UI question?',
      options: [
        { id: 'a', text: 'Should transfers take two steps or five?' },
        { id: 'b', text: 'Where should the Confirm button go on this screen?' },
        { id: 'c', text: 'Why do traders open the app during busy hours?' },
      ],
      correctOptionId: 'b',
      explanation: 'UI is about the screen itself. The number of steps and the reasons people use the app are UX questions.',
    },
    {
      id: 'q_ui-1-2',
      quizId: 'quiz_ui-1',
      position: 2,
      type: 'true-false',
      prompt: 'A screen that looks beautiful is a successful design, even if users miss the main button.',
      correct: false,
      explanation: 'A design succeeds when people can complete their task. Looks come second.',
    },
    {
      id: 'q_ui-1-3',
      quizId: 'quiz_ui-1',
      position: 3,
      type: 'multiple',
      prompt: 'Which of these are part of UI design? Choose all that apply.',
      options: [
        { id: 'a', text: 'Button size and placement' },
        { id: 'b', text: 'Text size and colour' },
        { id: 'c', text: 'Server hosting costs' },
        { id: 'd', text: 'Spacing between form fields' },
      ],
      correctOptionIds: ['a', 'b', 'd'],
      explanation: 'Hosting costs are an engineering and business concern, not part of the interface.',
    },

    {
      id: 'q_ui-2-1',
      quizId: 'quiz_ui-2',
      position: 1,
      type: 'single',
      prompt: 'A label sits exactly halfway between two input boxes. What is the problem?',
      options: [
        { id: 'a', text: 'Nothing, it looks balanced' },
        { id: 'b', text: 'Users can’t tell which input the label belongs to' },
        { id: 'c', text: 'The label is too short' },
      ],
      correctOptionId: 'b',
      explanation: 'Proximity groups things. A label must be closer to its own input than to anything else.',
    },
    {
      id: 'q_ui-2-2',
      quizId: 'quiz_ui-2',
      position: 2,
      type: 'single',
      prompt: 'On a transfer confirmation screen, what should be the most prominent piece of information?',
      options: [
        { id: 'a', text: 'The transaction date' },
        { id: 'b', text: 'The amount being sent' },
        { id: 'c', text: 'The bank’s logo' },
        { id: 'd', text: 'The fee' },
      ],
      correctOptionId: 'b',
      explanation: 'The amount (and then the recipient) is what the user must check before confirming, so it leads the hierarchy.',
    },
    {
      id: 'q_ui-2-3',
      quizId: 'quiz_ui-2',
      position: 3,
      type: 'true-false',
      prompt: 'The top corners of a phone screen are the easiest place to tap with one thumb.',
      correct: false,
      explanation: 'The bottom half of the screen is easiest to reach. Put main actions there.',
    },
    {
      id: 'q_ui-2-4',
      quizId: 'quiz_ui-2',
      position: 4,
      type: 'single',
      prompt: 'What is a sensible minimum size for a tap target?',
      options: [
        { id: 'a', text: '20 × 20 px' },
        { id: 'b', text: '44 × 44 px' },
        { id: 'c', text: '100 × 100 px' },
      ],
      correctOptionId: 'b',
      explanation: 'Around 44 × 44 px fits a fingertip comfortably without wasting space.',
    },

    {
      id: 'q_ui-3-1',
      quizId: 'quiz_ui-3',
      position: 1,
      type: 'single',
      prompt: 'What minimum contrast ratio does WCAG recommend for normal body text?',
      options: [
        { id: 'a', text: '2:1' },
        { id: 'b', text: '3:1' },
        { id: 'c', text: '4.5:1' },
      ],
      correctOptionId: 'c',
      explanation: '4.5:1 is the guideline for normal text. Large text can go down to 3:1.',
    },
    {
      id: 'q_ui-3-2',
      quizId: 'quiz_ui-3',
      position: 2,
      type: 'true-false',
      prompt: 'A red border on its own is enough to show a form error.',
      correct: false,
      explanation: 'Some people can’t tell red from other colours. Add a message or icon so the error doesn’t depend on colour alone.',
    },
    {
      id: 'q_ui-3-3',
      quizId: 'quiz_ui-3',
      position: 3,
      type: 'multiple',
      prompt: 'Before choosing a font for a Nigerian app, what should you check? Choose all that apply.',
      options: [
        { id: 'a', text: 'It displays letters like ẹ, ọ and ṣ' },
        { id: 'b', text: 'It is readable at 16 px on a phone' },
        { id: 'c', text: 'It is the most decorative font available' },
        { id: 'd', text: 'Real customer names display correctly' },
      ],
      correctOptionIds: ['a', 'b', 'd'],
      explanation: 'Support for real names and readability matter far more than decoration.',
    },
    {
      id: 'q_ui-3-4',
      quizId: 'quiz_ui-3',
      position: 4,
      type: 'single',
      prompt: 'Most of a well-designed screen is usually made up of…',
      options: [
        { id: 'a', text: 'The brand colour' },
        { id: 'b', text: 'Neutral colours' },
        { id: 'c', text: 'Status colours' },
      ],
      correctOptionId: 'b',
      explanation: 'Neutrals carry text and backgrounds. The brand colour is kept for the main action so it stands out.',
    },

    {
      id: 'q_ui-4-1',
      quizId: 'quiz_ui-4',
      position: 1,
      type: 'multiple',
      prompt: 'Which states should you design besides the “happy path”? Choose all that apply.',
      options: [
        { id: 'a', text: 'Loading' },
        { id: 'b', text: 'Offline or failed' },
        { id: 'c', text: 'Empty' },
        { id: 'd', text: 'None: users rarely see them' },
      ],
      correctOptionIds: ['a', 'b', 'c'],
      explanation: 'On slow and patchy networks, users see these states often. Designing them prevents confusion and double payments.',
    },
    {
      id: 'q_ui-4-2',
      quizId: 'quiz_ui-4',
      position: 2,
      type: 'single',
      prompt: 'During a user test, the person hesitates and looks lost. What should you do?',
      options: [
        { id: 'a', text: 'Point to the right button' },
        { id: 'b', text: 'Ask what they are looking for, and take notes' },
        { id: 'c', text: 'End the test' },
      ],
      correctOptionId: 'b',
      explanation: 'Helping hides the problem. Asking what they expect shows you why the design confused them.',
    },
    {
      id: 'q_ui-4-3',
      quizId: 'quiz_ui-4',
      position: 3,
      type: 'true-false',
      prompt: 'If three out of five testers miss the cart button, the testers were not paying attention.',
      correct: false,
      explanation: 'When several people hit the same problem, the design is the problem. Make the button more visible.',
    },
    {
      id: 'q_ui-4-4',
      quizId: 'quiz_ui-4',
      position: 4,
      type: 'single',
      prompt: 'Why should you test layouts with long real names and big naira amounts?',
      options: [
        { id: 'a', text: 'Real data is often longer than placeholder text and can break layouts' },
        { id: 'b', text: 'It makes the design look more professional' },
        { id: 'c', text: 'It is required by law' },
      ],
      correctOptionId: 'a',
      explanation: 'Names like Oluwadamilare and amounts like ₦1,250,000.00 overflow layouts designed around "John Doe" and "₦500".',
    },
  ],

  reviews: [
    {
      id: 'rev_ui-1',
      courseId: 'crs_ui',
      learnerName: 'Damilola F.',
      location: 'Ibadan',
      rating: 5,
      body: 'The transfer screen example showed me exactly what hierarchy means. I redesigned my portfolio after this.',
      createdAt: '2026-07-01',
    },
    {
      id: 'rev_ui-2',
      courseId: 'crs_ui',
      learnerName: 'Zainab A.',
      location: 'Abuja',
      rating: 5,
      body: 'Finally a design course that talks about low data and small phones. Very relevant.',
      createdAt: '2026-08-19',
    },
    {
      id: 'rev_ui-3',
      courseId: 'crs_ui',
      learnerName: 'Obinna C.',
      location: 'Port Harcourt',
      rating: 3,
      body: 'Good content, but I wanted more time on the prototyping tools themselves.',
      createdAt: '2026-09-25',
    },
  ],
}
