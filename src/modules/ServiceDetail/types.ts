export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  companyName: string;
  iban?: string;
  vehicleInfo?: {
    model: string;
    plate: string;
    km: string;
    fuelLevel?: string;
  }
}

// Araç bilgileri için tip tanımı
export type VehicleInfoField = 'model' | 'plate' | 'km' | 'fuelLevel';

// Servis getiren kişi bilgileri için tip tanımı
export type DeliveredByField = 'name' | 'phone';

export interface ServiceInfo {
  id: string;
  customer: Customer;
  serviceType: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  closedAt?: string;
  estimatedCompletionDate?: string;
  complaint?: string;
  technicianNotes?: string;
  approvalInfo?: {
    approved: boolean;
    approvedBy?: string;
    approvedDate?: string;
  };
  assignedTechnician?: string;
  estimatedCost?: string;
  notes: string[];
  tasks: {
    id: number;
    description: string;
    completed: boolean;
  }[];
  usedParts?: {
    id: number;
    name: string;
    quantity: number;
    price: string;
  }[];
  invoiceNo?: string;
  invoiceDate?: string;
  waybillNo?: string;
  waybillDate?: string;
  deliveredBy?: {
    name: string;
    phone: string;
  };
}

export type TabType = 'work-order' | 'pricing' | 'insurance' | 'customer-services' | 'payment' | 'photos'; 