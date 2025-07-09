export interface Pegawai {
  id: string;
  name: string;
  nip: string;
  karpeg: string;
  pangkatGolongan: string;
  jabatan: string;
  unit: 'Setditjen ILMATE' | 'Logam' | 'IPAMP' | 'IMATAP' | 'IET';
  isActive: boolean;
  joinDate: Date;
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'Superadmin' | 'Admin' | 'User';
  unit: 'Setditjen ILMATE' | 'Logam' | 'IPAMP' | 'IMATAP' | 'IET';
  pegawaiId?: string; // Link to Pegawai for User role
  isActive: boolean;
  joinDate: Date;
}

export interface Room {
  id: string;
  name: string;
  roomCode: string;
  lantai: number;
  roomType: 'Ruang Koridor' | 'Ruang Gudang' | 'Ruang Dapur' | 'Ruang Toilet/WC' | 'Ruang Kerja' | 'Ruang Rapat Besar' | 'Ruang Rapat Kecil' | 'Ruang Arsip' | 'Ruang Musholla' | 'Ruang Tamu';
  description: string;
  picName: string;
  picNip: string;
  picJabatan: string;
}

export interface Item {
  id: string;
  serialNumber: string;
  name: string;
  brand: string;
  model: string;
  nup: string;
  year: number;
  roomId: string;
  currentBorrowerId?: string;
  status: 'Available' | 'Lended' | 'Broken' | 'Under Repair' | 'Disposed';
  qrCode: string;
  description: string;
  category: string; // Add this for compatibility
  createdAt: Date;
  updatedAt: Date;
}

export interface LendingRecord {
  id: string;
  itemId: string;
  borrowerId: string; // Add this field
  borrowerName: string;
  borrowerNip: string;
  borrowerUnit: string;
  userName: string; // Add this for compatibility
  userDepartment: string; // Add this for compatibility
  itemName: string;
  itemSerialNumber: string;
  itemNup: string;
  lendDate: Date;
  expectedReturnDate: Date;
  actualReturnDate?: Date;
  status: 'Pending' | 'Approved' | 'Active' | 'Returned' | 'Rejected';
  approvedBy?: string;
  approverName?: string;
  notes?: string;
  rejectionReason?: string;
}

export interface LendingRequest {
  id: string;
  itemId: string;
  pegawaiId: string;
  pegawaiName: string;
  pegawaiNip: string;
  pegawaiUnit: string;
  itemName: string;
  itemSerialNumber: string;
  itemNup: string;
  requestDate: Date;
  expectedReturnDate: Date;
  actualReturnDate?: Date;
  status: 'Pending' | 'Approved' | 'Active' | 'Returned' | 'Rejected';
  approvedBy?: string;
  approverName?: string;
  notes?: string;
  rejectionReason?: string;
  requestedBy: string; // User ID who made the request
}

export interface RepairRequest {
  id: string;
  itemId: string;
  itemName: string;
  itemSerialNumber: string;
  itemNup: string;
  pegawaiId: string;
  pegawaiName: string;
  pegawaiNip: string;
  pegawaiUnit: string;
  requesterId: string; // Add this field
  requesterName: string; // Add this field
  requesterNip: string; // Add this field
  requesterUnit: string; // Add this field
  damageDescription: string;
  urgencyLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  requestDate: Date;
  status: 'Pending' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';
  approvedBy?: string;
  approverName?: string;
  rejectionReason?: string;
  repairNotes?: string;
  estimatedCost?: number;
  actualCost?: number;
  repairStartDate?: Date;
  repairCompletionDate?: Date;
  vendorName?: string;
  vendorContact?: string;
  attachments?: string[];
  requestedBy: string; // User ID who made the request
}

export interface LendingDocument {
  id: string;
  lendingRequestId: string;
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

export interface AuthUser {
  id: string;
  username: string;
  role: 'Superadmin' | 'Admin' | 'User';
  unit: string;
  pegawaiId?: string;
  pegawaiName?: string;
  name?: string; // Add this for compatibility
  nip?: string; // Add this for compatibility
}