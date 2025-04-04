// Forms modülü için tip tanımları

export interface CustomerInfo {
  name: string;
  surname?: string;
  phone: string;
  email: string;
  address: string;
}

export interface VehicleInfo {
  brand: string;
  model: string;
  year?: string;
  modelYear?: string;
  plate: string;
  vin?: string;
  chassisNo?: string;
  engineNo?: string;
  color?: string;
  km?: string;
  mileage?: string;
  fuelType?: string;
  fuelLevel?: string;
  paperFE?: string;
  paperFEDate?: string;
}

export interface InsuranceInfo {
  company: string;
  policyNumber: string;
  claimNumber: string;
  expiryDate: string;
}

export interface FormSettings {
  showQR: boolean;
  showInsuranceInfo: boolean;
  showCustomerRequests: boolean;
  showServiceNote: boolean;
  showSpecifications: boolean;
  showEmployeeSignature: boolean;
  showCustomerSignature: boolean;
  showFuelLevel: boolean;
  showSalesLines: boolean;
  showLineNumbers: boolean;
  showProductCode: boolean;
  showProductName: boolean;
  showUnitPrice: boolean;
  showQuantity: boolean;
  showVAT: boolean;
  showDiscount: boolean;
  showSubtotalPrice: boolean;
  showTotalPrice: boolean;
  showNonDiscountedSubtotal: boolean;
  showGeneralDiscount: boolean;
  showSubtotal: boolean;
  showVATTotal: boolean;
  showServicePhotos: boolean;
}

export type FormType = 'carAcceptance' | 'deliveryNote' | 'serviceInvoice';

export interface FormData {
  formType: FormType;
  customerInfo: CustomerInfo;
  vehicleInfo: VehicleInfo;
  insuranceInfo: InsuranceInfo;
  requests: string;
  serviceNotes: string;
  specifications: string;
  createdAt: string;
  createdBy: string;
  settings: FormSettings;
} 