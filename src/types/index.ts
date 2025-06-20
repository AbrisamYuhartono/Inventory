export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  room: string;
  status: 'Available' | 'Lended' | 'Broken';
  serialNumber: string;
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'Admin' | 'Manager' | 'User';
  phone?: string;
  joinDate?: Date;
  isActive: boolean;
}

export interface LendingRecord {
  id: string;
  itemId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userDepartment: string;
  itemName: string;
  itemSerialNumber: string;
  lendDate: Date;
  expectedReturnDate: Date;
  actualReturnDate?: Date;
  status: 'Active' | 'Returned' | 'Overdue';
  notes?: string;
  generatedDocumentId?: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  capacity?: number;
  floor?: number;
  building?: string;
}

export interface LendingDocument {
  id: string;
  lendingRecordId: string;
  documentUrl: string;
  generatedAt: Date;
}

export interface SystemSettings {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  maxLendingDays: number;
  requireApproval: boolean;
  enableNotifications: boolean;
  autoGenerateQR: boolean;
}