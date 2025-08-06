export interface APIVehicleResponse {
  info: Info;
  data: Vehicle[];
}

export interface Vehicle {
  vehicle_id: number;
  vehicle_type_id: number;
  model_id: number;
  company_id: number;
  transport_category_id: number;
  company_serial_id: number;
  company_service_id: null;
  plate: string;
  year_manufactured: null;
  notes: string;
  created_at: Date;
  model: Model;
  company: Company;
  transportCategory: TransportCategory;
  companySerial: CompanySerial;
  companyService: CompanyService;
  vehiclePhotos: VehiclePhoto[];
}

export interface Company {
  company_id: number;
  country_id: number;
  company_name: string;
  servicio: null;
  routes: null;
  description: null;
  company_logo: null;
  city: null;
  company_url: null;
  active: boolean;
  created_at: Date;
}

export interface CompanySerial {
  company_serial_id: number;
  company_id: number;
  company_serial_code: string;
  company: Company;
}

export interface CompanyService {
  company_service_id: number;
  company_id: number;
  company_service_name: string;
  company: Company;
}

export interface Model {
  model_id: number;
  brand_id: number;
  chassis_id: number;
  bodywork_id: number;
  model_name: string;
  description: null;
  year_from: null;
}

export interface TransportCategory {
  transport_category_id: number;
  name: string;
  description: string;
  slug: string;
  created_at: Date;
}

export interface VehiclePhoto {
  vehicle_photo_id: number;
  vehicle_id: number;
  image_url: string;
  photographer_id: number;
  country_id: number;
  location: string;
  department: null;
  description: null;
  notes: null;
  tags: null;
  status: null;
  likes: null;
  views: null;
  favorites: null;
  shares: null;
  comments: null;
  downloads: null;
  created_at: Date;
  photographer: Photographer;
}

export interface Photographer {
  photographer_id: number;
  name: string;
  email: null;
  phone: null;
  active: boolean;
  created_at: Date;
}

export interface Info {
  count: number;
  currentPage: number;
  pages: number;
  limit: number;
  next: null;
  prev: string;
  hasNext: boolean;
  hasPrev: boolean;
  startItem: number;
  endItem: number;
}
