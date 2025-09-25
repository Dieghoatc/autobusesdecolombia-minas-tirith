export interface SearchResponse {
    info: Info;
    data: Model[];
}

export interface Model {
    model_id:    number;
    brand_id:    number;
    chassis_id:  number;
    bodywork_id: number;
    model_name:  string;
    description: null;
    year_from:   null;
    chassis:     Chassis;
    bodywork:    Bodywork;
    vehicles:    Vehicle[];
}

export interface Bodywork {
    bodywork_id:   number;
    brand_id:      number;
    bodywork_name: string;
    description:   null;
}

export interface Chassis {
    chassis_id:   number;
    brand_id:     number;
    chassis_name: string;
    description:  null;
}

export interface Vehicle {
    vehicle_id:            number;
    vehicle_type_id:       number;
    model_id:              number;
    company_id:            number;
    transport_category_id: number;
    company_serial_id:     number;
    company_service_id:    number;
    plate:                 string;
    year_manufactured:     null;
    notes:                 null;
    created_at:            Date;
    vehiclePhotos:         VehiclePhoto[];
}

export interface VehiclePhoto {
    vehicle_photo_id: number;
    vehicle_id:       number;
    image_url:        string;
    photographer_id:  number;
    country_id:       number;
    location:         string;
    department:       null;
    description:      null;
    notes:            null;
    tags:             null;
    status:           null;
    likes:            null;
    views:            null;
    favorites:        null;
    shares:           null;
    comments:         null;
    downloads:        null;
    created_at:       Date;
    photographer:     Photographer;
}

export interface Photographer {
    photographer_id: number;
    name:            string;
    email:           null;
    phone:           null;
    active:          boolean;
    created_at:      Date;
}

export interface Info {
    count:       number;
    currentPage: number;
    pages:       number;
    limit:       number;
    next:        null;
    prev:        null;
    hasNext:     boolean;
    hasPrev:     boolean;
    startItem:   number;
    endItem:     number;
}
