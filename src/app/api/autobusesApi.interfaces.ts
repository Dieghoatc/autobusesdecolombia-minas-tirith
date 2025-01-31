export interface ApiPhotosResponse {
    author: string;
    bodywork: string;
    category: string;
    chassis: string;
    company: string;
    created_at: string;
    description: string;
    photo_id: number;
    plate: string;
    serial: string;
    url: string;
  }
  
  export interface ApiPostsResponse {
    post_id: number;
    slug: string;
    title: string;
    image_url: string;
    author_id: number;
    created_at: string;
    category: string;
    content: number;
  }