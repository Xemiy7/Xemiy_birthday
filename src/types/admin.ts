export interface AdminProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  long_description: string | null;
  category: string;
  client: string | null;
  year: number;
  software: string[];
  tags: string[];
  cover_image: string | null;
  gallery_images: string[];
  before_image: string | null;
  after_image: string | null;
  featured: boolean;
  size: "short" | "medium" | "tall" | "wide";
  likes_seed: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  long_description: string;
  category: string;
  client: string;
  year: number;
  software: string;
  tags: string;
  cover_image: string;
  gallery_images: string[];
  before_image: string;
  after_image: string;
  featured: boolean;
  size: "short" | "medium" | "tall" | "wide";
  likes_seed: number;
  published: boolean;
}

export interface AdminAnalytics {
  totalProjects: number;
  featuredProjects: number;
  totalBookings: number;
  pendingBookings: number;
  totalLikes: number;
  publishedProjects: number;
}
