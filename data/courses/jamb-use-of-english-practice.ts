import type { CourseBundle } from '@/data/types'

// SAMPLE CONTENT written for this demo. Exam details are summarised for
// practice only; learners should always check the current official brochure.

export const jambUseOfEnglish: CourseBundle = {
  course: {
    id: 'crs_jamb-english',
    slug: 'jamb-use-of-english-practice',
    title: 'JAMB Use of English practice',
    subtitle: 'Short, focused drills on comprehension, lexis and structure, and oral English, with the reasoning behind every answer.',
    description:
      'Use of English is compulsory in the UTME, and it carries more questions than any other subject. This course breaks the paper into the sections that appear every year and gives you techniques, worked examples and practice questions for each. Every answer comes with an explanation, so you learn the rule, not just the answer. Ideal for SS3 students and anyone resitting.',
    level: 'intermediate',
    categoryId: 'cat_exam-prep',
    instructorId: 'ins_aisha-bello',
    priceKobo: 0,
    language: 'English',
    outcomes: [
      'Know what each section of the paper tests and how to pace yourself',
      'Read comprehension passages faster and find the main idea',
      'Answer synonym, antonym and idiom questions with confidence',
      'Apply the concord rules examiners test most often',
      'Identify vowel sounds and stress patterns in oral English questions',
    ],
    requirements: ['Senior secondary level English', 'A notebook for your own word list'],
    cover: {
      src: '/covers/jamb-use-of-english-practice.svg',
      alt: 'Golden adire-style pattern with an open book and a ticked answer box',
    },
    publishedAt: '2026-01-19',
    updatedAt: '2026-07-28',
    featured: true,
  },

  modules: [
    { id: 'mod_jamb-1', courseId: 'crs_jamb-english', position: 1, title: 'Know the exam', summary: 'What is tested and how to manage your time.' },
    { id: 'mod_jamb-2', courseId: 'crs_jamb-english', position: 2, title: 'Comprehension and summary', summary: 'Read faster and answer what is actually asked.' },
    { id: 'mod_jamb-3', courseId: 'crs_jamb-english', position: 3, title: 'Lexis and structure', summary: 'Vocabulary, idioms and grammar rules.' },
    { id: 'mod_jamb-4', courseId: 'crs_jamb-english', position: 4, title: 'Oral English', summary: 'Vowels, consonants and stress.' },
  ],

  lessons: [
    {
      id: 'les_jamb-1-1',
      moduleId: 'mod_jamb-1',
      slug: 'what-the-exam-tests',
      position: 1,
      kind: 'article',
      title: 'What the Use of English paper tests',
      summary: 'The sections that appear every year.',
      bodyMarkdown: `Use of English is the one subject every UTME candidate writes, and it has more questions than your other three subjects. Doing well here lifts your whole score.

## The sections

| Section | What it tests |
| --- | --- |
| Comprehension | Understanding a passage: facts, meaning and the writer's purpose |
| Summary | Picking out the main points of a passage |
| Lexis and structure | Vocabulary, idioms, grammar and sentence completion |
| Oral English | Vowel and consonant sounds, rhymes and word stress |
| Novel | Questions on the prescribed text for your year |

> The prescribed novel changes. Check the current JAMB brochure and read the book **early**: questions assume you know the plot and characters well.

## It is a computer-based test

You answer on screen, and you can move back and forth between questions. Practise reading passages on a screen, not only on paper, so it feels normal on the day.

## How this course works

Each module teaches one section with worked examples, then ends with a short quiz. Read every explanation, especially for the questions you got right by guessing.`,
    },
    {
      id: 'les_jamb-1-2',
      moduleId: 'mod_jamb-1',
      slug: 'managing-your-time',
      position: 2,
      kind: 'video',
      title: 'Managing your time',
      summary: 'A simple plan for pacing yourself on the day.',
      durationSeconds: 360,
      transcript:
        'Many candidates know enough English to score well but run out of time. Here is a simple plan. Remember that your total time covers all four subjects, so you cannot spend the whole exam on English. Start with the quick wins: lexis and structure and oral English questions take seconds each if you know the rule. Answer those first, and flag anything you are unsure about. Then do the comprehension passages, reading the questions before the passage so you know what to look for. Finally return to the flagged questions. Never leave a question blank: there is no penalty for a wrong answer, so an educated guess can only help. Practise this order with past questions and a timer until it feels automatic.',
    },
    {
      id: 'les_jamb-1-3',
      moduleId: 'mod_jamb-1',
      slug: 'know-the-exam-check',
      position: 3,
      kind: 'quiz',
      title: 'Check: know the exam',
      summary: 'Sections and strategy.',
      quizId: 'quiz_jamb-1',
    },

    {
      id: 'les_jamb-2-1',
      moduleId: 'mod_jamb-2',
      slug: 'reading-passages-fast',
      position: 1,
      kind: 'article',
      title: 'Reading passages fast (without missing the point)',
      summary: 'Questions first, then a purposeful read.',
      bodyMarkdown: `Reading every word slowly, twice, is the most common way to lose time in comprehension. Try this instead.

## 1. Read the questions first

Before the passage, skim the questions. Now you read **with a purpose**: you know you are looking for, say, "why the farmers moved" and "what *dwindling* means".

## 2. Skim the passage once

Read the first and last paragraphs carefully and the **first sentence** of every other paragraph. Writers usually put the main idea there.

## 3. Find, don't remember

For each question, go back to the part of the passage that answers it. The answer is **in the passage**, not in your general knowledge. If the passage says the market moved because of flooding, that is the answer, even if you know the real reason was different.

## Watch for these traps

- An option that is **true but not stated** in the passage.
- An option that repeats words from the passage but **changes the meaning**.
- Absolute words like **always**, **never** and **all**, which are rarely right.

## Meaning in context

For "as used in the passage" questions, replace the word with each option and reread the sentence. The right option keeps the sentence's meaning, even if it is not the word's most common meaning.`,
    },
    {
      id: 'les_jamb-2-2',
      moduleId: 'mod_jamb-2',
      slug: 'finding-the-main-idea',
      position: 2,
      kind: 'video',
      title: 'Finding the main idea',
      summary: 'Worked example on a short passage about Kano’s dye pits.',
      durationSeconds: 420,
      transcript:
        'Let us practise with a short passage. It describes the Kofar Mata dye pits in Kano, which have been used for centuries to dye cloth with indigo. The first paragraph gives the history. The second explains the process. The third says young people are leaving the trade for city jobs, and that the pits may close unless something changes. Now, what is the main idea? Many students choose the history, because it comes first and has the most facts. But ask yourself: what is the writer worried about, what is the point of telling us all this? The last paragraph gives it away. The main idea is that an old craft is at risk. The history and the process are supporting details. Always ask: what does the writer want me to think by the end?',
    },
    {
      id: 'les_jamb-2-3',
      moduleId: 'mod_jamb-2',
      slug: 'summary-questions',
      position: 3,
      kind: 'article',
      title: 'Summary questions',
      summary: 'Separate main points from examples and details.',
      bodyMarkdown: `A summary question asks you to choose the option that best captures a point **in fewer words**. The skill is telling a **main point** from **supporting detail**.

## Main point or detail?

| Main point | Supporting detail |
| --- | --- |
| Poor roads raise food prices | A bag of tomatoes costs twice as much in Lagos as in Zaria |
| Mobile money helps rural traders | A woman in Gombe now receives payments without travelling to a bank |

Examples, numbers and stories are almost always **details**. The point they illustrate is the summary.

## How to choose

1. Find the sentence in the paragraph that the others **explain or support**.
2. Choose the option that says the **same thing in general terms**.
3. Reject options that are too narrow (one example) or too wide (claims the passage didn't make).

> If an option includes a specific name, figure or example, be suspicious. Summaries are general.`,
    },
    {
      id: 'les_jamb-2-4',
      moduleId: 'mod_jamb-2',
      slug: 'comprehension-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: comprehension and summary',
      summary: 'Main ideas, traps and summaries.',
      quizId: 'quiz_jamb-2',
    },

    {
      id: 'les_jamb-3-1',
      moduleId: 'mod_jamb-3',
      slug: 'synonyms-and-antonyms',
      position: 1,
      kind: 'article',
      title: 'Synonyms and antonyms',
      summary: 'Nearest in meaning, opposite in meaning, and how to tell under pressure.',
      bodyMarkdown: `These questions underline a word in a sentence and ask for the option **nearest in meaning** (synonym) or **opposite in meaning** (antonym).

## Read the instruction twice

The most painful mistake is choosing a perfect synonym when the question asked for the **opposite**. Underline "nearest" or "opposite" on your rough paper before you look at the options.

## Use the sentence

*The chairman's speech was so **verbose** that many guests left before he finished.*

Even if you don't know *verbose*, the sentence tells you the speech made people leave, so it was probably **too long**. Nearest in meaning: *wordy*. Opposite: *brief* or *concise*.

## Build your own list

Keep a notebook of words from past questions. Some that appear often:

| Word | Nearest | Opposite |
| --- | --- | --- |
| frugal | thrifty | wasteful |
| candid | frank | evasive |
| obstinate | stubborn | flexible |
| meticulous | careful | careless |
| affluent | wealthy | poor |

Learn words in **pairs and opposites** together; it doubles what each new word gives you.`,
    },
    {
      id: 'les_jamb-3-2',
      moduleId: 'mod_jamb-3',
      slug: 'concord',
      position: 2,
      kind: 'article',
      title: 'Concord: subject–verb agreement',
      summary: 'The agreement rules examiners test again and again.',
      bodyMarkdown: `**Concord** means the verb agrees with its subject: a singular subject takes a singular verb, a plural subject a plural verb. Easy, until the subject is disguised.

## Rules that appear most often

**1. Each, every, either, neither, everyone** are singular.
*Each of the boys **has** a textbook.* (not *have*)

**2. "Neither… nor" and "either… or" agree with the nearer subject.**
*Neither the teacher nor the students **were** late.*
*Neither the students nor the teacher **was** late.*

**3. Words between the subject and verb don't change it.**
*The box of mangoes **is** on the table.* (the subject is *box*)

**4. Some nouns look plural but are singular.**
*The news **is** good. Mathematics **is** my best subject.*

**5. Some nouns are always plural.**
*My trousers **are** torn. The scissors **are** blunt.*

**6. "The number of" is singular; "a number of" is plural.**
*The number of applicants **has** risen. A number of applicants **have** arrived.*

> Trick: find the verb, then ask "**who** or **what** is doing it?" Cover up everything in between and read the subject and verb together.`,
    },
    {
      id: 'les_jamb-3-3',
      moduleId: 'mod_jamb-3',
      slug: 'idioms-in-context',
      position: 3,
      kind: 'video',
      title: 'Idioms in context',
      summary: 'Common idioms and how to work out ones you have never seen.',
      durationSeconds: 390,
      transcript:
        'An idiom is a group of words whose meaning is different from the meanings of the individual words. If two brothers bury the hatchet, nobody is digging: they have made peace. If someone lets the cat out of the bag, they have revealed a secret. A storm in a teacup is a lot of fuss about something small, and when the thief took to his heels, he ran away. In the exam you will often meet an idiom you do not know. Do not panic. Read the whole sentence and ask what situation it describes. Then eliminate options that take the words literally, because the literal meaning is almost never the answer. Finally, check your choice by putting it back in the sentence.',
    },
    {
      id: 'les_jamb-3-4',
      moduleId: 'mod_jamb-3',
      slug: 'lexis-check',
      position: 4,
      kind: 'quiz',
      title: 'Check: lexis and structure',
      summary: 'Synonyms, concord and idioms.',
      quizId: 'quiz_jamb-3',
    },

    {
      id: 'les_jamb-4-1',
      moduleId: 'mod_jamb-4',
      slug: 'vowels-and-consonants',
      position: 1,
      kind: 'article',
      title: 'Vowels and consonants',
      summary: 'Hearing the difference between sounds that look alike in writing.',
      bodyMarkdown: `Oral English questions are about **sounds**, not spelling. English spelling is unreliable: *ough* sounds different in *though*, *through* and *tough*.

## Vowel sounds

English has **12 pure vowels** and **8 diphthongs** (vowels that glide from one sound to another, as in *boy* and *time*). Some pairs that Nigerian speakers often merge:

| Sound | Examples | Compare with |
| --- | --- | --- |
| long /iː/ | seat, key, people | short /ɪ/: sit, busy, women |
| long /uː/ | food, blue, shoe | short /ʊ/: good, put, woman |
| /ɔː/ | caught, law, board | /ɒ/: cot, want, knowledge |
| /ɜː/ | bird, word, learn | /e/: bed, said, friend |

Notice *busy* and *women* have the short /ɪ/ sound despite their spelling.

## Consonant sounds

Watch for letters that are **silent** (the *k* in *knee*, the *b* in *debt*, the *h* in *honest*) and letters that sound different from usual (*ch* is /k/ in *chemistry* and *character*).

## Practise out loud

Say each word, slowly, in a full sentence. Your ear learns faster than your eyes.`,
    },
    {
      id: 'les_jamb-4-2',
      moduleId: 'mod_jamb-4',
      slug: 'stress-patterns',
      position: 2,
      kind: 'video',
      title: 'Word stress',
      summary: 'Which syllable is said loudest, and why it changes meaning.',
      durationSeconds: 360,
      transcript:
        'In English, one syllable in a word is said louder and longer than the others. That is stress. Listen: PHO-to-graph. Pho-TO-gra-phy. Pho-to-GRA-phic. Same root, but the stress moves. Exam questions ask which syllable carries the main stress, often using capital letters for the stressed part. Some words change meaning with stress. As nouns, REcord and PREsent are stressed on the first syllable: I bought a REcord, she gave me a PREsent. As verbs, the stress moves to the second: they will reCORD the song, I will preSENT the award. A useful rule of thumb: many two-syllable nouns and adjectives are stressed on the first syllable, and many two-syllable verbs on the second. Practise by clapping on the stressed syllable.',
    },
    {
      id: 'les_jamb-4-3',
      moduleId: 'mod_jamb-4',
      slug: 'oral-english-mock',
      position: 3,
      kind: 'quiz',
      title: 'Mock: oral English',
      summary: 'Vowels, silent letters and stress.',
      quizId: 'quiz_jamb-4',
    },
  ],

  quizzes: [
    { id: 'quiz_jamb-1', lessonId: 'les_jamb-1-3' },
    { id: 'quiz_jamb-2', lessonId: 'les_jamb-2-4' },
    { id: 'quiz_jamb-3', lessonId: 'les_jamb-3-4' },
    { id: 'quiz_jamb-4', lessonId: 'les_jamb-4-3' },
  ],

  questions: [
    {
      id: 'q_jamb-1-1',
      quizId: 'quiz_jamb-1',
      position: 1,
      type: 'true-false',
      prompt: 'In the UTME, a wrong answer costs you marks, so it is safer to leave hard questions blank.',
      correct: false,
      explanation: 'There is no penalty for a wrong answer, so always make an educated guess rather than leaving a blank.',
    },
    {
      id: 'q_jamb-1-2',
      quizId: 'quiz_jamb-1',
      position: 2,
      type: 'single',
      prompt: 'Which section is usually quickest to answer, making it a good place to start?',
      options: [
        { id: 'a', text: 'Comprehension passages' },
        { id: 'b', text: 'Lexis and structure' },
        { id: 'c', text: 'Summary' },
      ],
      correctOptionId: 'b',
      explanation: 'Lexis and structure questions take seconds each if you know the rule, so they bank marks quickly.',
    },
    {
      id: 'q_jamb-1-3',
      quizId: 'quiz_jamb-1',
      position: 3,
      type: 'multiple',
      prompt: 'Which of these are sections of the Use of English paper? Choose all that apply.',
      options: [
        { id: 'a', text: 'Comprehension' },
        { id: 'b', text: 'Oral English' },
        { id: 'c', text: 'Essay writing' },
        { id: 'd', text: 'Lexis and structure' },
      ],
      correctOptionIds: ['a', 'b', 'd'],
      explanation: 'The UTME is multiple choice, so there is no essay. Comprehension, oral English and lexis and structure all appear.',
    },

    {
      id: 'q_jamb-2-1',
      quizId: 'quiz_jamb-2',
      position: 1,
      type: 'single',
      prompt: 'What should you read first in a comprehension section?',
      options: [
        { id: 'a', text: 'The whole passage, slowly, twice' },
        { id: 'b', text: 'The questions' },
        { id: 'c', text: 'Only the last paragraph' },
      ],
      correctOptionId: 'b',
      explanation: 'Reading the questions first tells you what to look for, so your reading of the passage has a purpose.',
    },
    {
      id: 'q_jamb-2-2',
      quizId: 'quiz_jamb-2',
      position: 2,
      type: 'true-false',
      prompt: 'If an option is true in real life, it must be the right answer even if the passage does not say it.',
      correct: false,
      explanation: 'Comprehension answers come from the passage. "True but not stated" is one of the most common traps.',
    },
    {
      id: 'q_jamb-2-3',
      quizId: 'quiz_jamb-2',
      position: 3,
      type: 'single',
      prompt: '"A bag of tomatoes costs twice as much in Lagos as in Zaria." In a summary of a passage about transport costs, this sentence is…',
      options: [
        { id: 'a', text: 'The main point' },
        { id: 'b', text: 'A supporting detail' },
        { id: 'c', text: 'The writer’s conclusion' },
      ],
      correctOptionId: 'b',
      explanation: 'Specific prices are examples that support a general point, such as "poor roads raise food prices".',
    },
    {
      id: 'q_jamb-2-4',
      quizId: 'quiz_jamb-2',
      position: 4,
      type: 'multiple',
      prompt: 'Which words in an option should make you suspicious? Choose all that apply.',
      options: [
        { id: 'a', text: 'always' },
        { id: 'b', text: 'never' },
        { id: 'c', text: 'some' },
        { id: 'd', text: 'all' },
      ],
      correctOptionIds: ['a', 'b', 'd'],
      explanation: 'Absolute words are rarely supported by a passage. "Some" is a cautious word and often appears in correct options.',
    },

    {
      id: 'q_jamb-3-1',
      quizId: 'quiz_jamb-3',
      position: 1,
      type: 'single',
      prompt: 'Choose the option NEAREST in meaning to the word in capitals: The trader was very FRUGAL with her profits.',
      options: [
        { id: 'a', text: 'generous' },
        { id: 'b', text: 'thrifty' },
        { id: 'c', text: 'careless' },
        { id: 'd', text: 'proud' },
      ],
      correctOptionId: 'b',
      explanation: 'Frugal means careful not to waste money, which is what thrifty means. Generous and careless are closer to opposites.',
    },
    {
      id: 'q_jamb-3-2',
      quizId: 'quiz_jamb-3',
      position: 2,
      type: 'single',
      prompt: 'Neither the principal nor the teachers ___ aware of the change.',
      options: [
        { id: 'a', text: 'was' },
        { id: 'b', text: 'were' },
        { id: 'c', text: 'is' },
      ],
      correctOptionId: 'b',
      explanation: 'With "neither… nor", the verb agrees with the nearer subject. "Teachers" is plural, so "were".',
    },
    {
      id: 'q_jamb-3-3',
      quizId: 'quiz_jamb-3',
      position: 3,
      type: 'single',
      prompt: 'Each of the candidates ___ given a seat number.',
      options: [
        { id: 'a', text: 'were' },
        { id: 'b', text: 'are' },
        { id: 'c', text: 'was' },
      ],
      correctOptionId: 'c',
      explanation: '"Each" is singular, so it takes "was", whatever comes after "of".',
    },
    {
      id: 'q_jamb-3-4',
      quizId: 'quiz_jamb-3',
      position: 4,
      type: 'single',
      prompt: 'After years of quarrelling, the two families decided to BURY THE HATCHET. This means they…',
      options: [
        { id: 'a', text: 'hid their weapons' },
        { id: 'b', text: 'made peace' },
        { id: 'c', text: 'went to court' },
        { id: 'd', text: 'held a funeral' },
      ],
      correctOptionId: 'b',
      explanation: 'To bury the hatchet is to end a quarrel. Options that take the words literally are almost never right.',
    },
    {
      id: 'q_jamb-3-5',
      quizId: 'quiz_jamb-3',
      position: 5,
      type: 'true-false',
      prompt: '"The news are good" is correct because "news" ends in -s.',
      correct: false,
      explanation: '"News" is singular despite its spelling: "The news is good."',
    },

    {
      id: 'q_jamb-4-1',
      quizId: 'quiz_jamb-4',
      position: 1,
      type: 'single',
      prompt: 'Which word has the same vowel sound as "seat"?',
      options: [
        { id: 'a', text: 'sit' },
        { id: 'b', text: 'key' },
        { id: 'c', text: 'set' },
        { id: 'd', text: 'busy' },
      ],
      correctOptionId: 'b',
      explanation: '"Seat" and "key" both have the long /iː/ sound. "Sit" and "busy" have the short /ɪ/.',
    },
    {
      id: 'q_jamb-4-2',
      quizId: 'quiz_jamb-4',
      position: 2,
      type: 'multiple',
      prompt: 'In which words is a letter silent? Choose all that apply.',
      options: [
        { id: 'a', text: 'knee' },
        { id: 'b', text: 'debt' },
        { id: 'c', text: 'band' },
        { id: 'd', text: 'honest' },
      ],
      correctOptionIds: ['a', 'b', 'd'],
      explanation: 'The k in knee, the b in debt and the h in honest are silent. Every letter in band is sounded.',
    },
    {
      id: 'q_jamb-4-3',
      quizId: 'quiz_jamb-4',
      position: 3,
      type: 'single',
      prompt: '"They will reCORD the song tomorrow." Where is the stress in "record" as a verb?',
      options: [
        { id: 'a', text: 'On the first syllable: RE-cord' },
        { id: 'b', text: 'On the second syllable: re-CORD' },
      ],
      correctOptionId: 'b',
      explanation: 'As a verb, record is stressed on the second syllable. As a noun (a RE-cord), the stress is on the first.',
    },
    {
      id: 'q_jamb-4-4',
      quizId: 'quiz_jamb-4',
      position: 4,
      type: 'true-false',
      prompt: 'In "chemistry", the letters "ch" are pronounced /k/.',
      correct: true,
      explanation: 'In words from Greek such as chemistry, character and chorus, "ch" is pronounced /k/.',
    },
  ],

  reviews: [
    {
      id: 'rev_jamb-1',
      courseId: 'crs_jamb-english',
      learnerName: 'Blessing U.',
      location: 'Owerri',
      rating: 5,
      body: 'The concord lesson finally made "neither… nor" make sense. I scored much higher in my mock.',
      createdAt: '2026-02-26',
    },
    {
      id: 'rev_jamb-2',
      courseId: 'crs_jamb-english',
      learnerName: 'Yusuf M.',
      location: 'Zaria',
      rating: 5,
      body: 'Every answer has an explanation, which is what my textbooks were missing.',
      createdAt: '2026-03-15',
    },
    {
      id: 'rev_jamb-3',
      courseId: 'crs_jamb-english',
      learnerName: 'Tolu B.',
      location: 'Akure',
      rating: 4,
      body: 'Very helpful. More oral English practice questions would be great.',
      createdAt: '2026-04-02',
    },
    {
      id: 'rev_jamb-4',
      courseId: 'crs_jamb-english',
      learnerName: 'Esther I.',
      location: 'Benin City',
      rating: 5,
      body: 'Doing lexis questions first, like the time-management video says, saved me so much time.',
      createdAt: '2026-08-08',
    },
  ],
}
