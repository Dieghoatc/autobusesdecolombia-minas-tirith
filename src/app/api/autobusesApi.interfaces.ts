export interface ApiPhotosResponse {
    photo_id: number;
    category_id: number;
    type_id: number;
    url: string;
    company: string;
    serial: string;
    bodywork: string;
    chassis: string;
    plate: string;
    service: string;
    author: string;
    is_international: number;
    country: string;
    location: string;
    create_at: string;
  }
  
  export interface ApiPostsResponse {
    post_id: number;
    slug: string;
    title: string;
    image_url: string;
    author_id: number;
    created_at: string;
    category: string;
    content: string;
  }
 