export type ResourceType = 'book' | 'note' | 'gig' | 'meal';

export interface BaseResource {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  type: ResourceType;
  category?: string; // For filtering, e.g., 'Mathematics', 'Computer Science'
  tags?: string[];   // For finer-grained filtering or search
}

export interface Book extends BaseResource {
  type: 'book';
  author: string;
  isbn?: string;
  condition: 'new' | 'like new' | 'good' | 'fair' | 'poor';
  price?: number; // if for sale
  exchangeDetails?: string; // what they want in exchange or if free
  listedBy: string; // User ID or name
}

export interface Note extends BaseResource {
  type: 'note';
  courseName: string;
  courseCode?: string;
  professorName?: string;
  fileUrl: string; // Link to download the note
  fileType?: string; // e.g. PDF, DOCX
  uploadedBy: string; // User ID or name
}

export interface Gig extends BaseResource {
  type: 'gig';
  compensation: string; // e.g., "$15/hr", "Fixed $50", "Volunteer"
  location?: string; // "Remote", "On-Campus", "Specific Address"
  duration?: string; // e.g., "One-time", "Part-time", "Full-time"
  skillsRequired?: string[];
  postedBy: string; // User ID or name
}

export interface Meal extends BaseResource {
  type: 'meal';
  cuisineType?: string;
  dietaryRestrictions?: ('vegetarian' | 'vegan' | 'gluten-free' | 'halal' | 'kosher')[];
  quantity: string; // e.g., "1 serving", "Feeds 2-3 people"
  pickupTime: string; // e.g., "Today 5-7 PM", "Flexible"
  pickupLocation: string;
  offeredBy: string; // User ID or name
}

export type AnyResource = Book | Note | Gig | Meal;

export interface AIRecommendation {
  resourceType: ResourceType;
  title: string;
  description: string;
  link: string; // This link should ideally point to the resource's page within the app
}
