export interface Project {
  slug: string;
  title: string;
  category: string;
  year: number;
  description: string;
  coverImage: string;
  images: string[];
  featured?: boolean;
}
