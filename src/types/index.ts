export interface User {
  id: string;
  name: string;
  nip: string;
  karpeg: string;
  pangkatGolongan: string;
  jabatan: string;
  unit: 'Setditjen ILMATE' | 'Logam' | 'IPAMP' | 'IMATAB' | 'IET';
  username: string;
  password: string;
  role: 'Superadmin' | 'Admin' | 'User';
  isActive: boolean;
  joinDate: Date;
}

export interface Room {
  id: string;
  name: string;
  roomCode: string;
  lantai: number;
  roomType: 'Office' | 'Meeting' | 'Storage' | 'Laboratory' | 'Workshop';
  description: string;
  picName: string; // Person in charge name
  picNip: string; // Person in charge NIP
  picJabatan: string; // Person in charge position
}

export interface Item {
  id: string;
  serialNumber: string;
  name: string;
  nup: string; // Nomor Urut Pendaftaran
  year: number;
  roomId: string;
  currentBorrowerId?: string; // User ID yang sedang meminjam
  status: 'Available' | 'Lended' | 'Broken' | 'Under Repair' | 'Disposed';
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LendingRecord {
  id: string;
  itemId: string;
  borrowerId: string;
  borrowerName: string;
  borrowerNip: string;
  borrowerUnit: string;
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

export interface RepairRequest {
  id: string;
  itemId: string;
  itemName: string;
  itemSerialNumber: string;
  itemNup: string;
  requesterId: string;
  requesterName: string;
  requesterNip: string;
  requesterUnit: string;
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

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  role: 'Superadmin' | 'Admin' | 'User';
  unit: string;
  nip: string;
}