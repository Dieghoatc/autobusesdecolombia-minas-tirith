export interface ApiPhoto {
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

export interface ApiPhotosResponse {
  data: ApiPhoto[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    startItem: number;
    endItem: number;
  }
}

export interface ApiPhotoById {
  data: ApiPhoto;
}