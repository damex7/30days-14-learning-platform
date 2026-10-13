import type { SeedRow } from '@/lib/schema/tables'

// SAMPLE CONTENT. These instructors are fictional people written for this demo.

export const instructors: readonly SeedRow<'instructors'>[] = [
  {
    id: 'ins_tunde-bakare',
    slug: 'tunde-bakare',
    name: 'Tunde Bakare',
    headline: 'Software developer, Yaba, Lagos',
    bio: 'Tunde has built websites and payment tools for Lagos startups for nine years. He started coding on a shared laptop in a cybercafé, so his lessons assume nothing and explain everything, one small step at a time. On weekends he runs a free coding club for secondary school students.',
    location: 'Lagos',
    expertise: ['HTML and CSS', 'Python', 'Teaching beginners'],
  },
  {
    id: 'ins_ngozi-eze',
    slug: 'ngozi-eze',
    name: 'Ngozi Eze',
    headline: 'Chartered accountant, Onitsha',
    bio: 'Ngozi grew up helping her mother run a provision stall at Ochanja Market and now keeps the books for more than forty small businesses. She teaches record-keeping the way traders actually work: with a phone, a notebook and very little spare time.',
    location: 'Onitsha, Anambra',
    expertise: ['Bookkeeping', 'Excel', 'Small business finance'],
  },
  {
    id: 'ins_aisha-bello',
    slug: 'aisha-bello',
    name: 'Aisha Bello',
    headline: 'English and Mathematics teacher, Kaduna',
    bio: 'Aisha has prepared students for WAEC and JAMB for twelve years, first in a government secondary school and now in her own tutorial centre. She is known for short drills, clear explanations of why an answer is right, and for never making a student feel slow.',
    location: 'Kaduna',
    expertise: ['Use of English', 'Mathematics', 'Exam technique'],
  },
  {
    id: 'ins_kemi-adeyemi',
    slug: 'kemi-adeyemi',
    name: 'Kemi Adeyemi',
    headline: 'Product designer, Ibadan',
    bio: 'Kemi designs mobile apps for banks and online shops, and sells her own hand-dyed adire fabric on WhatsApp. She teaches design that works on small screens and slow data, and selling that feels like a conversation rather than an advert.',
    location: 'Ibadan, Oyo',
    expertise: ['UI design', 'Mobile apps', 'Selling online'],
  },
]
