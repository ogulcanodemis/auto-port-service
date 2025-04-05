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

export interface QuotationProduct {
  id: number;
  code: string;
  name: string;
  unitPrice: number;
  quantity: number;
  taxRate: number;
  discountRate: number;
  totalPrice: number;
}

export interface QuotationFormData {
  customerInfo: CustomerInfo;
  vehicleInfo: VehicleInfo;
  products: QuotationProduct[];
  quotationNumber: string;
  quotationDate: string;
  validUntil: string;
  paymentMethod: string;
  notes: string;
  createdBy: string;
  generalDiscountRate?: number;
  settings: FormSettings;
}

export interface TevkifatliInvoiceProduct extends QuotationProduct {
  tevkifatRate: number; // Tevkifat oranı (örn: 9/10 için 0.9)
}

export interface TevkifatliInvoiceFormData {
  customerInfo: CustomerInfo;
  vehicleInfo: VehicleInfo;
  products: TevkifatliInvoiceProduct[];
  invoiceNumber: string;
  invoiceDate: string;
  paymentMethod: string;
  paymentDueDate: string;
  notes: string;
  taxOffice: string; // Vergi dairesi
  taxNumber: string; // Vergi numarası
  createdBy: string;
  generalDiscountRate?: number;
  settings: FormSettings;
}

export interface InvoiceProduct extends QuotationProduct {
  // Standart fatura için ek alanlar gerekirse buraya eklenebilir
}

export interface InvoiceFormData {
  customerInfo: CustomerInfo;
  vehicleInfo: VehicleInfo;
  products: InvoiceProduct[];
  invoiceNumber: string;
  invoiceDate: string;
  paymentMethod: string;
  paymentDueDate: string;
  notes: string;
  taxOffice: string; // Vergi dairesi
  taxNumber: string; // Vergi numarası
  createdBy: string;
  generalDiscountRate?: number;
  settings: FormSettings;
}

export type FormType = 'carAcceptance' | 'deliveryNote' | 'serviceInvoice' | 'quotation' | 'tevkifatliInvoice' | 'invoice';

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