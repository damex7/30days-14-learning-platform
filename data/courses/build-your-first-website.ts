import type { CourseBundle } from '@/data/types'

// SAMPLE CONTENT written for this demo.

export const buildYourFirstWebsite: CourseBundle = {
  course: {
    id: 'crs_web',
    slug: 'build-your-first-website',
    title: 'Build your first website',
    subtitle: 'Go from a blank folder to a live one-page website for a real local business, using only HTML and CSS.',
    description:
      'In this course you build a one-page website for Mama Nkechi’s Kitchen, a small restaurant in Surulere. You start by learning what really happens when someone types an address into their phone, then write the page in HTML, style it with CSS, make it look right on small phones, and publish it for free. No experience needed, and every step works on a basic laptop.',
    level: 'beginner',
    categoryId: 'cat_tech-skills',
    instructorId: 'ins_tunde-bakare',
    priceKobo: 0,
    language: 'English',
    outcomes: [
      'Explain how a browser, a domain and a web server work together',
      'Write a well-structured HTML page with headings, links and images',
      'Style a page with CSS: colours, fonts, spacing and simple layouts',
      'Make a page that reads well on a small phone screen',
      'Publish a website for free and share the link',
    ],
    requirements: ['A laptop or desktop computer (Windows, macOS or Linux)', 'A free code editor such as VS Code', 'No coding experience'],
    cover: {
      src: '/covers/build-your-first-website.svg',
      alt: 'Indigo adire-style pattern with a simple browser window and angle brackets drawn in cream',
    },
    publishedAt: '2026-03-02',
    updatedAt: '2026-08-14',
    featured: true,
  },

  modules: [
    { id: 'mod_web-1', courseId: 'crs_web', position: 1, title: 'How the web works', summary: 'What happens between typing an address and seeing a page.' },
    { id: 'mod_web-2', courseId: 'crs_web', position: 2, title: 'HTML: the structure', summary: 'Write the content of the page and give it meaning.' },
    { id: 'mod_web-3', courseId: 'crs_web', position: 3, title: 'CSS: the style', summary: 'Colours, fonts, spacing and layout.' },
    { id: 'mod_web-4', courseId: 'crs_web', position: 4, title: 'Publish your site', summary: 'Make it work on phones and put it online.' },
  ],

  lessons: [
    // Module 1
    {
      id: 'les_web-1-1',
      moduleId: 'mod_web-1',
      slug: 'what-happens-when-you-open-a-website',
      position: 1,
      kind: 'video',
      title: 'What happens when you open a website',
      summary: 'Follow one request from your phone to a server and back.',
      durationSeconds: 400,
      transcript:
        'Welcome! Before we write any code, let us follow what happens when you type an address like mamankechi.com.ng into your phone. First, your phone asks a kind of phone book, called DNS, for the number of the computer that holds the site. That number is an IP address. Your browser then sends a request to that computer, the web server, saying: please send me the home page. The server replies with files: HTML for the content, CSS for the style, and images. Your browser reads those files and draws the page. That is the whole trip, and it usually takes less than a second. In this course you will write the HTML and CSS files yourself, and at the end you will put them on a real server so anyone in Nigeria, or anywhere, can open your page.',
    },
    {
      id: 'les_web-1-2',
      moduleId: 'mod_web-1',
      slug: 'domains-hosting-and-files',
      position: 2,
      kind: 'article',
      title: 'Domains, hosting and your project folder',
      summary: 'The three things every website needs, and setting up your folder.',
      bodyMarkdown: `Every website needs three things.

## 1. Files

A website is just files in a folder. Our restaurant site will start with two:

- \`index.html\`: the content (words, links, images)
- \`styles.css\`: how it looks

The name \`index.html\` matters. When someone visits a site without asking for a particular page, the server sends \`index.html\`.

## 2. Hosting

Hosting is a computer that is always on and connected to the internet, which keeps your files and sends them to visitors. In the last module we will use a **free** host, so you do not need to pay anything to finish this course.

## 3. A domain

A domain is the name people type, like \`mamankechi.com.ng\`. Nigerian domains ending in \`.ng\` or \`.com.ng\` are registered through accredited registrars and usually cost a few thousand naira a year. A domain is optional: free hosts give you an address too.

## Set up your folder

1. Create a folder called \`mama-nkechi\` on your desktop.
2. Open it in your code editor.
3. Create an empty file called \`index.html\`.

> Keep file names lowercase with no spaces. \`Menu Page.html\` works on your laptop but can break on a server. Use \`menu.html\` instead.`,
    },
    {
      id: 'les_web-1-3',
      moduleId: 'mod_web-1',
      slug: 'how-the-web-works-check',
      position: 3,
      kind: 'quiz',
      title: 'Check: how the web works',
      summary: 'Four quick questions on browsers, servers and domains.',
      quizId: 'quiz_web-1',
    },

    // Module 2
    {
      id: 'les_web-2-1',
      moduleId: 'mod_web-2',
      slug: 'your-first-html-page',
      position: 1,
      kind: 'video',
      title: 'Your first HTML page',
      summary: 'Write the skeleton every HTML page shares and open it in a browser.',
      durationSeconds: 540,
      transcript:
        'Open index.html in your editor. HTML is made of tags: words in angle brackets that wrap your content. Most tags come in pairs, an opening tag and a closing tag with a slash. Type the skeleton with me: the doctype line, then html, then head and body. The head holds information about the page, like its title, which appears on the browser tab. Type Mama Nkechi’s Kitchen as the title. The body holds everything people see. Inside the body, add an h1 heading with the restaurant’s name and a paragraph that says: Home-cooked jollof, egusi and fresh fish pepper soup in Surulere. Save the file, then double-click it. It opens in your browser. It is plain, but it is a real web page that you wrote. Change a word, save, and refresh to see it update.',
    },
    {
      id: 'les_web-2-2',
      moduleId: 'mod_web-2',
      slug: 'headings-paragraphs-and-links',
      position: 2,
      kind: 'article',
      title: 'Headings, paragraphs and links',
      summary: 'Give your page a clear outline and link to other places.',
      bodyMarkdown: `HTML is not about looks; it is about **meaning**. A heading tag tells the browser, search engines and screen readers "this is a heading", whatever size it appears.

## Headings make an outline

Use one \`h1\` for the page's main title, then \`h2\` for sections and \`h3\` for parts of a section. Do not skip levels just to get a smaller font; CSS handles size.

\`\`\`
<h1>Mama Nkechi's Kitchen</h1>
<h2>Our menu</h2>
<h3>Soups</h3>
<h2>Find us</h2>
\`\`\`

## Paragraphs

Wrap each block of text in \`<p>\`. Do not press Enter twice to make space: HTML ignores extra line breaks.

## Links

A link uses the \`a\` tag and an \`href\` (where it goes):

\`\`\`
<a href="https://wa.me/2348012345678">Order on WhatsApp</a>
\`\`\`

Write link text that makes sense on its own. "Order on WhatsApp" is clear; "click here" is not, especially for someone using a screen reader, who may jump from link to link.

## Try it

Add an \`h2\` called "Our menu" with three dishes as paragraphs, and a WhatsApp ordering link.`,
    },
    {
      id: 'les_web-2-3',
      moduleId: 'mod_web-2',
      slug: 'images-and-alt-text',
      position: 3,
      kind: 'article',
      title: 'Images and alt text',
      summary: 'Add photos that load fast and describe them for everyone.',
      bodyMarkdown: `Images use the \`img\` tag. It has no closing tag.

\`\`\`
<img src="jollof.jpg" alt="A plate of party jollof rice with fried plantain and chicken" width="800" height="600">
\`\`\`

## The alt attribute is not optional

\`alt\` is the text read aloud to people who cannot see the image, and shown when the image fails to load (common on slow mobile data). Describe what someone would **see** and why it matters:

| Weak alt text | Better alt text |
| --- | --- |
| image | A plate of jollof rice with plantain |
| food.jpg | Steaming bowl of egusi soup with pounded yam |
| logo | Mama Nkechi's Kitchen |

If an image is pure decoration, use an empty \`alt=""\` so screen readers skip it.

## Keep images small

Many of your visitors will be on mobile data. A photo straight from a phone can be 4 MB; resized to 800 pixels wide and saved as JPEG or WebP it is often under 150 KB. Set \`width\` and \`height\` so the page does not jump while the image loads.`,
    },
    {
      id: 'les_web-2-4',
      moduleId: 'mod_web-2',
      slug: 'html-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: HTML basics',
      summary: 'Tags, headings, links and alt text.',
      quizId: 'quiz_web-2',
    },

    // Module 3
    {
      id: 'les_web-3-1',
      moduleId: 'mod_web-3',
      slug: 'adding-css',
      position: 1,
      kind: 'video',
      title: 'Adding CSS to your page',
      summary: 'Link a stylesheet and write your first rules.',
      durationSeconds: 480,
      transcript:
        'Our page works, but it looks like a document from 1995. Time for CSS. Create a file called styles.css next to index.html. In the head of your HTML, add a link tag with rel equals stylesheet and href equals styles.css. Now in styles.css, write a rule. A rule has a selector, which says what to style, and declarations inside curly braces, which say how. Type body, open a brace, and add font-family: system-ui, then line-height: 1.6. Save and refresh: the text is already easier to read. Now style the h1: color, a deep green like the leaves we wrap moi moi in. Notice we changed every heading at once without touching the HTML. That is the power of keeping style in its own file.',
    },
    {
      id: 'les_web-3-2',
      moduleId: 'mod_web-3',
      slug: 'colours-fonts-and-spacing',
      position: 2,
      kind: 'article',
      title: 'Colours, fonts and spacing',
      summary: 'The three CSS skills that make the biggest difference.',
      bodyMarkdown: `Most "ugly" pages have the same three problems: hard-to-read colours, too many fonts and no breathing space.

## Colour

Pick **one** main colour for the brand, plus a dark colour for text and a light one for backgrounds. Write colours as hex codes:

\`\`\`
body { color: #1d1a16; background: #fbf6ee; }
h1, h2 { color: #2f6b45; }
\`\`\`

Make sure text has strong **contrast** with its background. Light grey on white looks stylish on a big monitor and is unreadable on a phone in the sun at Balogun Market.

## Fonts

Use at most two fonts. \`system-ui\` uses the phone's own font: it loads instantly and costs no data.

## Spacing

Space shows what belongs together. Use \`margin\` for space outside an element and \`padding\` for space inside it:

\`\`\`
section { padding: 24px; margin-bottom: 32px; }
\`\`\`

Keep lines of text short, about 60 to 75 characters, with \`max-width\`:

\`\`\`
main { max-width: 40rem; margin: 0 auto; }
\`\`\`

\`margin: 0 auto\` centres the block on the page.`,
    },
    {
      id: 'les_web-3-3',
      moduleId: 'mod_web-3',
      slug: 'layouts-with-flexbox',
      position: 3,
      kind: 'video',
      title: 'Layouts with flexbox',
      summary: 'Put the menu items side by side, then let them wrap on phones.',
      durationSeconds: 600,
      transcript:
        'Our menu is one long column. On a laptop we want the dishes side by side, like cards. Wrap the three dishes in a div with a class called menu. In CSS, select .menu and write display: flex. Instantly they line up in a row. Add gap: 16px for space between them. But on a narrow phone, three cards in a row are squashed. Add flex-wrap: wrap, then give each card flex: 1 1 200px. That means: grow and shrink as needed, but try to be about 200 pixels wide. Now on a wide screen they sit side by side, and on a phone they stack neatly. Resize your browser window slowly and watch them reflow. This one pattern handles most simple layouts you will need.',
    },
    {
      id: 'les_web-3-4',
      moduleId: 'mod_web-3',
      slug: 'css-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: CSS',
      summary: 'Selectors, spacing and flexbox.',
      quizId: 'quiz_web-3',
    },

    // Module 4
    {
      id: 'les_web-4-1',
      moduleId: 'mod_web-4',
      slug: 'make-it-work-on-phones',
      position: 1,
      kind: 'article',
      title: 'Make it work on phones',
      summary: 'One line of HTML and a few habits for small screens.',
      bodyMarkdown: `Most people who visit a Nigerian small business website will use a phone. Design for the phone **first**.

## The viewport line

Add this inside \`<head>\`. Without it, phones pretend to be a wide desktop and shrink your page until it is unreadable:

\`\`\`
<meta name="viewport" content="width=device-width, initial-scale=1">
\`\`\`

## Habits that help

- **Big tap targets.** Buttons and links should be at least 44 pixels tall. Add padding to links that look like buttons.
- **Readable text.** Use at least \`16px\` for body text.
- **Images that shrink.** Add \`img { max-width: 100%; height: auto; }\` so photos never spill off the screen.
- **Phone-friendly links.** \`<a href="tel:+2348012345678">\` lets people call with one tap.

## Test it

In Chrome, press **F12**, then the phone icon, and choose a small phone. Better still, open the page on a real, inexpensive Android phone. That is what many of your visitors use.`,
    },
    {
      id: 'les_web-4-2',
      moduleId: 'mod_web-4',
      slug: 'publish-for-free',
      position: 2,
      kind: 'video',
      title: 'Publish your site for free',
      summary: 'Put your folder online and get a link you can share.',
      durationSeconds: 420,
      transcript:
        'This is the exciting part. Several hosts let you publish a simple site for free, by uploading your folder or connecting a code repository. Create an account with your email, choose to deploy a new site, and drag your mama-nkechi folder into the upload area. In under a minute you get an address ending in the host’s own domain. Open it on your phone. That is your page, live on the internet. Send the link to a friend on WhatsApp and ask them to try the Order on WhatsApp button. If you later buy a .com.ng domain, the host’s settings page explains how to connect it. Whenever you change your files, upload the folder again and the live site updates.',
    },
    {
      id: 'les_web-4-3',
      moduleId: 'mod_web-4',
      slug: 'final-check',
      position: 3,
      kind: 'quiz',
      title: 'Final check',
      summary: 'Five questions covering the whole course.',
      quizId: 'quiz_web-4',
    },
  ],

  quizzes: [
    { id: 'quiz_web-1', lessonId: 'les_web-1-3' },
    { id: 'quiz_web-2', lessonId: 'les_web-2-4' },
    { id: 'quiz_web-3', lessonId: 'les_web-3-4' },
    { id: 'quiz_web-4', lessonId: 'les_web-4-3' },
  ],

  questions: [
    // Quiz 1: how the web works
    {
      id: 'q_web-1-1',
      quizId: 'quiz_web-1',
      position: 1,
      type: 'single',
      prompt: 'What does DNS do when you type an address into your browser?',
      options: [
        { id: 'a', text: 'It draws the page on your screen' },
        { id: 'b', text: 'It finds the IP address of the server that holds the site' },
        { id: 'c', text: 'It stores your password' },
        { id: 'd', text: 'It makes the page load faster on mobile data' },
      ],
      correctOptionId: 'b',
      explanation: 'DNS works like a phone book: it turns a name like mamankechi.com.ng into the number (IP address) of the server.',
    },
    {
      id: 'q_web-1-2',
      quizId: 'quiz_web-1',
      position: 2,
      type: 'true-false',
      prompt: 'You must buy a domain name before you can publish a website.',
      correct: false,
      explanation: 'A domain is optional. Free hosts give you a working address; you can add your own domain later.',
    },
    {
      id: 'q_web-1-3',
      quizId: 'quiz_web-1',
      position: 3,
      type: 'single',
      prompt: 'Which file does a server send when a visitor does not ask for a specific page?',
      options: [
        { id: 'a', text: 'home.html' },
        { id: 'b', text: 'styles.css' },
        { id: 'c', text: 'index.html' },
      ],
      correctOptionId: 'c',
      explanation: 'By convention servers look for index.html in a folder, which is why your main page must use that name.',
    },
    {
      id: 'q_web-1-4',
      quizId: 'quiz_web-1',
      position: 4,
      type: 'multiple',
      prompt: 'Which of these are good file names for a website? Choose all that apply.',
      options: [
        { id: 'a', text: 'menu.html' },
        { id: 'b', text: 'Our Menu.html' },
        { id: 'c', text: 'contact-us.html' },
        { id: 'd', text: 'PRICES 2026.HTML' },
      ],
      correctOptionIds: ['a', 'c'],
      explanation: 'Lowercase names with hyphens instead of spaces work everywhere. Spaces and capitals can break links on a server.',
    },

    // Quiz 2: HTML
    {
      id: 'q_web-2-1',
      quizId: 'quiz_web-2',
      position: 1,
      type: 'single',
      prompt: 'Where does the text that appears on the browser tab go?',
      options: [
        { id: 'a', text: 'In an h1 inside the body' },
        { id: 'b', text: 'In the title tag inside the head' },
        { id: 'c', text: 'In the first paragraph' },
      ],
      correctOptionId: 'b',
      explanation: 'The head holds information about the page, including the title shown on the tab and in search results.',
    },
    {
      id: 'q_web-2-2',
      quizId: 'quiz_web-2',
      position: 2,
      type: 'true-false',
      prompt: 'It is fine to use an h4 instead of an h2 just because you want a smaller heading.',
      correct: false,
      explanation: 'Heading levels describe the outline of the page. Use CSS to change size and keep the levels in order.',
    },
    {
      id: 'q_web-2-3',
      quizId: 'quiz_web-2',
      position: 3,
      type: 'single',
      prompt: 'Which link text is best for screen reader users?',
      options: [
        { id: 'a', text: 'Click here' },
        { id: 'b', text: 'Read more' },
        { id: 'c', text: 'Order on WhatsApp' },
        { id: 'd', text: 'Link' },
      ],
      correctOptionId: 'c',
      explanation: 'Link text should make sense on its own, because screen reader users often jump from link to link.',
    },
    {
      id: 'q_web-2-4',
      quizId: 'quiz_web-2',
      position: 4,
      type: 'multiple',
      prompt: 'What should you do with an image of a plate of jollof on the menu? Choose all that apply.',
      options: [
        { id: 'a', text: 'Write alt text that describes the dish' },
        { id: 'b', text: 'Upload the original 4 MB photo for best quality' },
        { id: 'c', text: 'Set its width and height' },
        { id: 'd', text: 'Leave the alt attribute out' },
      ],
      correctOptionIds: ['a', 'c'],
      explanation: 'Describe it with alt text, set width and height to stop the page jumping, and resize it so it loads quickly on mobile data.',
    },

    // Quiz 3: CSS
    {
      id: 'q_web-3-1',
      quizId: 'quiz_web-3',
      position: 1,
      type: 'single',
      prompt: 'In the rule `h1 { color: #2f6b45; }`, what is `h1`?',
      options: [
        { id: 'a', text: 'The selector' },
        { id: 'b', text: 'The property' },
        { id: 'c', text: 'The value' },
      ],
      correctOptionId: 'a',
      explanation: 'The selector chooses which elements the rule applies to. `color` is the property and `#2f6b45` is the value.',
    },
    {
      id: 'q_web-3-2',
      quizId: 'quiz_web-3',
      position: 2,
      type: 'single',
      prompt: 'Which property adds space INSIDE an element, between its border and its content?',
      options: [
        { id: 'a', text: 'margin' },
        { id: 'b', text: 'padding' },
        { id: 'c', text: 'gap' },
      ],
      correctOptionId: 'b',
      explanation: 'Padding is inside the element; margin is outside it.',
    },
    {
      id: 'q_web-3-3',
      quizId: 'quiz_web-3',
      position: 3,
      type: 'true-false',
      prompt: 'Adding `flex-wrap: wrap` lets flex items move onto a new line when there is not enough room.',
      correct: true,
      explanation: 'Without wrapping, flex items squash into one row. With it, they move to the next line on narrow screens.',
    },

    // Quiz 4: final check
    {
      id: 'q_web-4-1',
      quizId: 'quiz_web-4',
      position: 1,
      type: 'single',
      prompt: 'What happens on a phone if you leave out the viewport meta tag?',
      options: [
        { id: 'a', text: 'Nothing changes' },
        { id: 'b', text: 'The page is shown as a tiny desktop page' },
        { id: 'c', text: 'The page will not load' },
      ],
      correctOptionId: 'b',
      explanation: 'Without the viewport line, phones assume a wide desktop page and shrink it to fit.',
    },
    {
      id: 'q_web-4-2',
      quizId: 'quiz_web-4',
      position: 2,
      type: 'multiple',
      prompt: 'Which of these make a page easier to use on a phone? Choose all that apply.',
      options: [
        { id: 'a', text: 'Buttons at least 44 pixels tall' },
        { id: 'b', text: 'Body text of 11px to fit more in' },
        { id: 'c', text: 'img { max-width: 100%; }' },
        { id: 'd', text: 'A tel: link for the phone number' },
      ],
      correctOptionIds: ['a', 'c', 'd'],
      explanation: 'Big tap targets, images that shrink and one-tap calling all help. Tiny text does not.',
    },
    {
      id: 'q_web-4-3',
      quizId: 'quiz_web-4',
      position: 3,
      type: 'true-false',
      prompt: 'After you change your files, the live site updates automatically without uploading again.',
      correct: false,
      explanation: 'With a simple upload host you publish again after each change. Hosts connected to a code repository can redeploy automatically.',
    },
    {
      id: 'q_web-4-4',
      quizId: 'quiz_web-4',
      position: 4,
      type: 'single',
      prompt: 'Which file holds the colours and fonts of the site?',
      options: [
        { id: 'a', text: 'index.html' },
        { id: 'b', text: 'styles.css' },
        { id: 'c', text: 'jollof.jpg' },
      ],
      correctOptionId: 'b',
      explanation: 'Keeping style in styles.css lets you change the look of every page from one file.',
    },
    {
      id: 'q_web-4-5',
      quizId: 'quiz_web-4',
      position: 5,
      type: 'single',
      prompt: 'What does `margin: 0 auto` do to a block with a max-width?',
      options: [
        { id: 'a', text: 'Removes all space around it' },
        { id: 'b', text: 'Centres it horizontally' },
        { id: 'c', text: 'Makes it full width' },
      ],
      correctOptionId: 'b',
      explanation: 'Auto left and right margins share the leftover space equally, which centres the block.',
    },
  ],

  reviews: [
    {
      id: 'rev_web-1',
      courseId: 'crs_web',
      learnerName: 'Chinedu O.',
      location: 'Enugu',
      rating: 5,
      body: 'I built a page for my brother’s barbing salon by the end of the weekend. The flexbox video finally made layouts make sense.',
      createdAt: '2026-04-11',
    },
    {
      id: 'rev_web-2',
      courseId: 'crs_web',
      learnerName: 'Halima S.',
      location: 'Kano',
      rating: 4,
      body: 'Very clear for a complete beginner. I would have liked one more example of a contact form.',
      createdAt: '2026-05-20',
    },
    {
      id: 'rev_web-3',
      courseId: 'crs_web',
      learnerName: 'Femi A.',
      location: 'Abeokuta',
      rating: 5,
      body: 'Short lessons that I could finish on my lunch break. The alt text lesson changed how I think about images.',
      createdAt: '2026-08-30',
    },
  ],
}
