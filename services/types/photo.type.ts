import { TransportCategory } from "./transportCategories.type";

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

///////////////////////////////

export interface ApiPhotoResponse {
  info: Info;
  data: Photo[];
}

export interface Photo {
  photo_id:        number;
  vehicle_id:      number;
  image_url:       string;
  photographer_id: number;
  transport_category_id: number;
  location:        string;
  department:      string;
  country_id:      number;
  description:     string;
  notes:           string;
  tags:            string;
  status:          string;
  likes:           string;
  views:           string;
  favorites:       string;
  shares:          string;
  comments:        string;
  downloads:       string;
  created_at:      Date;
  vehicles:        Vehicles;
  photographers:   Photographers;
  countries:       Countries;
  transportCategory: TransportCategory;
}

export interface Countries {
  country_id:   number;
  country_name: string;
  iso_code:     string;
}

export interface Photographers {
  photographer_id: number;
  name:            string;
  email:           string;
  phone:           string;
  active:          boolean;
  created_at:      Date;
}

export interface Vehicles {
  vehicle_id:            number;
  vehicle_type_id:       number;
  model_id:              number;
  chassis_id:            number;
  bodywork_id:           number;
  company_id:            number;
  company_serial_id:     number;
  company_service_id:    number;
  transport_category_id: number;
  plate:                 string;
  year_manufactured:     string;
  notes:                 string;
  created_at:            Date;
}

export interface Info {
  count:     number;
  pages:     number;
  limit:     number;
  next:      string;
  hasNext:   boolean;
  hasPrev:   boolean;
  startItem: number;
  endItem:   number;
}


