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
  category_id:     number;
  vehicle_id:      number;
  image_url:       string;
  brand_id:        number;
  company_id:      number;
  serial_company:  string;
  serial_id:       null;
  chassis_id:      number;
  bodywork_id:     number;
  plate:           string;
  service:         string;
  photographer_id: number;
  location:        string;
  country_id:      number;
  created_at:      Date;
  category:        Category;
  vehicle:         Vehicle;
  brand:           Brand;
  company:         Company;
  serial:          null;
  chassis:         Bodywork;
  bodywork:        Bodywork;
  photographer:    Photographer;
  country:         Country;
}

export interface Bodywork {
  bodywork_id?: number;
  brand_id:     number;
  model:        string;
  description:  null | string;
  vehicle_id:   number;
  active:       boolean;
  chassis_id?:  number;
}

export interface Brand {
  brand_id: number;
  name:     string;
  active:   boolean;
  logo:     null;
}

export interface Category {
  category_id: number;
  name:        string;
  description: null;
  active:      boolean;
  created_at:  Date;
  slug:        string;
}

export interface Company {
  company_id:  number;
  name:        string;
  description: string;
  active:      boolean;
}

export interface Country {
  country_id: number;
  name:       string;
  iso_code:   string;
}

export interface Photographer {
  photographer_id: number;
  name:            string;
  email:           null;
  phone:           null;
  active:          boolean;
  created_at:      Date;
}

export interface Vehicle {
  vehicle_id:  number;
  name:        string;
  description: string;
}

export interface Info {
  count?:      number;
  totalPages?: number;
  limit?:      number;
  currentPage: number;
  next:        string;
  prev:        string;
  hasNext:     boolean;
  hasPrev:     boolean;
  startItem:   number;
  endItem:     number;
}