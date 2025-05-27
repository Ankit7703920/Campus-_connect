import type { Book, Note, Gig, Meal, AnyResource } from './types';

export const mockBooks: Book[] = [
  {
    id: 'book1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    condition: 'like new',
    price: 45.99,
    description: 'The bible of algorithms. Essential for CS students.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'textbook algorithms',
    type: 'book',
    category: 'Computer Science',
    tags: ['algorithms', 'data structures', 'cs core'],
    listedBy: 'Alice Wonderland',
  },
  {
    id: 'book2',
    title: 'Organic Chemistry As a Second Language',
    author: 'David R. Klein',
    condition: 'good',
    exchangeDetails: 'Willing to trade for a good sci-fi novel or $20.',
    description: 'Helped me survive OChem. Some highlighting.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'chemistry textbook',
    type: 'book',
    category: 'Chemistry',
    tags: ['organic chemistry', 'study guide'],
    listedBy: 'Bob The Builder',
  },
];

export const mockNotes: Note[] = [
  {
    id: 'note1',
    title: 'CS101 Lecture 5 Notes - Sorting Algorithms',
    courseName: 'Introduction to Computer Science',
    courseCode: 'CS101',
    description: 'Detailed notes on bubble sort, merge sort, and quick sort with examples.',
    fileUrl: '#', // Placeholder
    fileType: 'PDF',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'notes document',
    type: 'note',
    category: 'Computer Science',
    tags: ['sorting', 'algorithms', 'lecture notes'],
    uploadedBy: 'Charlie Brown',
  },
  {
    id: 'note2',
    title: 'HIST202 Midterm Study Guide',
    courseName: 'World History II',
    description: 'Comprehensive study guide covering all topics for the midterm exam.',
    fileUrl: '#', // Placeholder
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'study guide',
    type: 'note',
    category: 'History',
    tags: ['midterm', 'study guide', 'world history'],
    uploadedBy: 'Diana Prince',
  },
];

export const mockGigs: Gig[] = [
  {
    id: 'gig1',
    title: 'Freelance Graphic Designer for Startup Logo',
    compensation: 'Fixed $100',
    location: 'Remote',
    description: 'Early-stage startup needs a creative logo. Show us your portfolio!',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'design computer',
    type: 'gig',
    category: 'Design',
    tags: ['graphic design', 'logo', 'freelance', 'remote'],
    postedBy: 'Eve Harrington',
  },
  {
    id: 'gig2',
    title: 'Math Tutor for High School Student',
    compensation: '$20/hr',
    location: 'On-Campus Library',
    description: 'Seeking a patient and knowledgeable math tutor for Algebra II concepts.',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'tutoring books',
    type: 'gig',
    category: 'Tutoring',
    tags: ['math tutor', 'algebra', 'part-time'],
    postedBy: 'Frank N. Stein',
  },
];

export const mockMeals: Meal[] = [
  {
    id: 'meal1',
    title: 'Homemade Lasagna (2 servings)',
    cuisineType: 'Italian',
    quantity: '2 servings',
    pickupTime: 'Today 6-8 PM',
    pickupLocation: 'Campus Cafe Entrance',
    description: 'Delicious homemade lasagna, made too much! Vegetarian option available if requested by noon.',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'lasagna food',
    type: 'meal',
    category: 'Food',
    tags: ['italian', 'pasta', 'dinner', 'vegetarian option'],
    offeredBy: 'Grace Kelly',
  },
  {
    id: 'meal2',
    title: 'Surplus Bakery Items',
    quantity: 'Assorted pastries - 5 items',
    pickupTime: 'Tomorrow 9-10 AM',
    pickupLocation: 'Student Union Bake Sale table',
    description: 'Leftover pastries from today\'s bake sale. Come grab a treat!',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'pastries bakery',
    type: 'meal',
    category: 'Food',
    tags: ['pastries', 'sweets', 'free food'],
    offeredBy: 'Harry Potter',
  },
];

export const mockAllResources: AnyResource[] = [
  ...mockBooks,
  ...mockNotes,
  ...mockGigs,
  ...mockMeals,
];
