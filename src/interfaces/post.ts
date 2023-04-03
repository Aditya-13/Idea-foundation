export interface Post {
  id: number;
  title: string;
  body: string;
  category: string;
  subcategory: string;
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  name: string;
  posts: Post[];
}
