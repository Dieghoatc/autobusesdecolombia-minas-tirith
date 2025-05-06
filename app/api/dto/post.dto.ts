export interface ApiPostsResponse {
  post_id: number;
  image_url: string;
  title: string;
  slug: string;
  content: PostBlock[];
}

export type PostBlock =
  | HeaderBlock
  | HeadingBlock
  | AuthorBlock
  | ImageBlock
  | ParagraphBlock
  | QuoteBlock
  | ListBlock
  | FactBlock;

type HeaderChild =
  | { type: "category"; text: string }
  | { type: "date"; text: string }
  | { type: "reading_time"; text: string };

interface HeaderBlock {
  type: "header";
  children: HeaderChild[];
}

export interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export interface AuthorBlock {
  type: "author";
  text: string;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  overlay?: string;
  authorPhoto: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  level?: "primary";
  text: string;
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  author?: string;
}

export interface ListBlock {
  type: "list";
  style: "unordered" | "ordered";
  items: string[];
}

export interface FactBlock {
  type: "fact";
  heading: string;
  text: string;
}
