export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: 'Home' | 'Office' | 'Commercial' | 'Renovation';
  location: string;
  area: string;
  year: string;
  duration: string;
  budgetRange: string;
  heroImage: string;
  gallery: string[];
  beforeImage?: string;
  afterImage?: string;
  overview: string;
  challenge: string;
  solution: string;
  materialsUsed: string[];
  designStyle: string;
  testimonial?: {
    quote: string;
    author: string;
    designation: string;
    avatar?: string;
  };
}
