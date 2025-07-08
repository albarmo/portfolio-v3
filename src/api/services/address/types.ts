export type Address = {
    id: string;
    user_id: string;
    label: string;
    name: string;
    phone: string;
    type: "BUYER" | "SELLER" | string;
    address: string;
    description?: string;
    recipientName: string;
    recipientPhoneNumber: string;
    latitude: number;
    longitude: number;
    default: boolean;
    postalCodeID: string;
    villageID: string;
    villageName: string;
    districtID: string;
    districtName: string;
    cityID: string;
    cityName: string;
    provinceID: string;
    provinceName: string;
    province: string;
    city: string;
    district: string;
    regency: string;
    postalCode: string;
    created_at: string;
    updated_at: string;
    street: string;
    deleted_at?: {
      Time: string;
      Valid: boolean;
    };
  }