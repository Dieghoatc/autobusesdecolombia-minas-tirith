// Catalog + vehicle shapes used by the admin dashboard (upload tab).

export interface Photographer {
  photographer_id: number;
  name: string;
  active: boolean;
}

export interface VehicleType {
  vehicle_type_id: number;
  name: string;
}

export interface VehicleModel {
  model_id: number;
  model_name: string;
}

export interface Company {
  company_id: number;
  company_name: string;
}

export interface CompanyService {
  company_service_id: number;
  company_id: number | null;
  company_service_name: string;
}

export interface TransportCategory {
  transport_category_id: number;
  name: string;
}

export interface UploadCatalogs {
  photographers: Photographer[];
  vehicleTypes: VehicleType[];
  vehicleModels: VehicleModel[];
  companies: Company[];
  companyServices: CompanyService[];
  transportCategories: TransportCategory[];
}

export interface DashboardVehiclePhoto {
  vehicle_photo_id: number;
  image_url: string;
  location: string;
}

export interface DashboardVehicle {
  vehicle_id: number;
  vehicle_type_id: number;
  model_id: number;
  company_id: number;
  transport_category_id: number;
  plate: string;
  model: { model_name: string };
  companySerial?: { company_serial_code: string } | null;
  vehiclePhotos: DashboardVehiclePhoto[];
}

export interface DashboardVehicleSearchResponse {
  data: DashboardVehicle[];
}
