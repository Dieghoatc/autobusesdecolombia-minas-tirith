export interface APIVehicleResponse {
    info: Info;
    data: Vehicle[];
}

export interface Vehicle {
    vehicle_id:            number;
    vehicle_type_id:       number;
    model_id:              number;
    company_id:            number;
    transport_category_id: number;
    company_serial_id:     number;
    plate:                 string;
    year_manufactured:     string;
    notes:                 string;
    created_at:            Date;
    company:               Company;
    model:                 Model;
    vehiclePhotos:         VehiclePhoto[];
}

export interface Company {
    company_id:   number;
    country_id:   number;
    company_name: string;
    servicio:     string;
    routes:       string;
    description:  string;
    company_logo: string;
    city:         string;
    company_url:  string;
    active:       boolean;
    created_at:   Date;
}

export interface Model {
    model_id:    number;
    brand_id:    number;
    chassis_id:  number;
    bodywork_id: number;
    model_name:  string;
    description: string;
    year_from:   string;
    chassis:     Chassis;
    bodywork:    Bodywork;
}

export interface Bodywork {
    bodywork_id:   number;
    brand_id:      number;
    bodywork_name: string;
    description:   string;
}

export interface Chassis {
    chassis_id:   number;
    brand_id:     number;
    chassis_name: string;
    description:  string;
}

export interface VehiclePhoto {
    vehicle_photo_id: number;
    vehicle_id:       number;
    image_url:        string;
    photographer_id:  number;
    country_id:       number;
    location:         string;
    department:       string;
    description:      string;
    notes:            string;
    tags:             string;
    status:           string;
    likes:            string;
    views:            string;
    favorites:        string;
    shares:           string;
    comments:         string;
    downloads:        string;
    created_at:       Date;
    photographer:     Photographer;
}

export interface Photographer {
    photographer_id: number;
    name:            string;
    email:           string;
    phone:           string;
    active:          boolean;
    created_at:      Date;
}

export interface Info {
    count:       number;
    currentPage: number;
    pages:       number;
    limit:       number;
    next:        string;
    prev:        string;
    hasNext:     boolean;
    hasPrev:     boolean;
    startItem:   number;
    endItem:     number;
}
