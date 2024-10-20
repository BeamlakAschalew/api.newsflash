export interface Source {
  id: number;
  name: string;
  url: string;
  created_at: string;
  updated_at: string;
  source_image_url: string;
  category: number;
}

export interface Sources {
  status: string;
  total_sources: number;
  sources: Source[];
}

export interface ResponseModel {
  total_results: number;
  status: string;
  articles: Article[] | null;
}

export interface Article {
  id: number;
  source: ArticleSource;
  title: string;
  description: string;
  url: string;
  image_url: string;
  published_at: string;
  scraped_at: string;
}

export interface ArticleSource {
  id: number;
  name: string;
  source_image_url: string;
}

export interface Categories {
  total_categories: number;
  status: string;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
