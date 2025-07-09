import { Item, User, Pegawai, LendingRequest, LendingRecord, Room, RepairRequest } from '../types';

export const mockPegawai: Pegawai[] = [
  // Setditjen ILMATE
  {
    id: 'peg-1',
    name: 'Dr. Ahmad Wijaya, S.T., M.T.',
    nip: '197203151995031002',
    karpeg: 'B.234567',
    pangkatGolongan: 'Pembina/IV-a',
    jabatan: 'Direktur Jenderal ILMATE',
    unit: 'Setditjen ILMATE',
    isActive: true,
    joinDate: new Date('2020-03-15')
  },
  {
    id: 'peg-2',
    name: 'Ir. Siti Nurhaliza, M.M.',
    nip: '197805121998032001',
    karpeg: 'C.345678',
    pangkatGolongan: 'Pembina Muda/IV-a',
    jabatan: 'Kepala Bagian Umum',
    unit: 'Setditjen ILMATE',
    isActive: true,
    joinDate: new Date('2020-05-12')
  },
  
  // Logam
  {
    id: 'peg-3',
    name: 'Budi Santoso, S.T.',
    nip: '198005102005031003',
    karpeg: 'D.456789',
    pangkatGolongan: 'Penata Muda Tk.I/III-b',
    jabatan: 'Kepala Seksi Logam',
    unit: 'Logam',
    isActive: true,
    joinDate: new Date('2021-05-10')
  },
  {
    id: 'peg-4',
    name: 'Andi Prasetyo, S.T.',
    nip: '198209152008031004',
    karpeg: 'E.567890',
    pangkatGolongan: 'Penata Muda/III-a',
    jabatan: 'Analis Industri Logam',
    unit: 'Logam',
    isActive: true,
    joinDate: new Date('2021-09-15')
  },
  
  // IPAMP
  {
    id: 'peg-5',
    name: 'Sari Indrawati, S.T., M.T.',
    nip: '198207252010032004',
    karpeg: 'F.678901',
    pangkatGolongan: 'Penata Muda Tk.I/III-b',
    jabatan: 'Kepala Seksi IPAMP',
    unit: 'IPAMP',
    isActive: true,
    joinDate: new Date('2021-07-25')
  },
  {
    id: 'peg-6',
    name: 'Rudi Hermawan, S.T.',
    nip: '198511302012031005',
    karpeg: 'G.789012',
    pangkatGolongan: 'Penata Muda/III-a',
    jabatan: 'Analis Industri Permesinan',
    unit: 'IPAMP',
    isActive: true,
    joinDate: new Date('2021-11-30')
  },
  
  // IMATAB
  {
    id: 'peg-7',
    name: 'Eko Prasetyo, S.T., M.T.',
    nip: '198109182008031005',
    karpeg: 'H.890123',
    pangkatGolongan: 'Penata Muda Tk.I/III-b',
    jabatan: 'Kepala Seksi IMATAB',
    unit: 'IMATAB',
    isActive: true,
    joinDate: new Date('2021-09-18')
  },
  {
    id: 'peg-8',
    name: 'Dedi Kurniawan, S.T.',
    nip: '198803142013031006',
    karpeg: 'I.901234',
    pangkatGolongan: 'Penata Muda/III-a',
    jabatan: 'Analis Industri Maritim',
    unit: 'IMATAB',
    isActive: true,
    joinDate: new Date('2022-03-14')
  },
  
  // IET
  {
    id: 'peg-9',
    name: 'Maya Sari, S.T., M.T.',
    nip: '198412102012032006',
    karpeg: 'J.012345',
    pangkatGolongan: 'Penata Muda Tk.I/III-b',
    jabatan: 'Kepala Seksi IET',
    unit: 'IET',
    isActive: true,
    joinDate: new Date('2021-12-10')
  },
  {
    id: 'peg-10',
    name: 'Fitri Rahayu, S.T.',
    nip: '198906252014032007',
    karpeg: 'K.123456',
    pangkatGolongan: 'Penata Muda/III-a',
    jabatan: 'Analis Industri Elektronika',
    unit: 'IET',
    isActive: true,
    joinDate: new Date('2022-06-25')
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'superadmin',
    password: 'super123',
    role: 'Superadmin',
    unit: 'Setditjen ILMATE',
    isActive: true,
    joinDate: new Date('2020-01-01')
  },
  {
    id: 'user-2',
    username: 'admin',
    password: 'admin123',
    role: 'Admin',
    unit: 'Setditjen ILMATE',
    isActive: true,
    joinDate: new Date('2020-03-15')
  },
  {
    id: 'user-3',
    username: 'logam',
    password: 'logam123',
    role: 'User',
    unit: 'Logam',
    pegawaiId: 'peg-3',
    isActive: true,
    joinDate: new Date('2021-05-10')
  },
  {
    id: 'user-4',
    username: 'ipamp',
    password: 'ipamp123',
    role: 'User',
    unit: 'IPAMP',
    pegawaiId: 'peg-5',
    isActive: true,
    joinDate: new Date('2021-07-25')
  },
  {
    id: 'user-5',
    username: 'imatab',
    password: 'imatab123',
    role: 'User',
    unit: 'IMATAB',
    pegawaiId: 'peg-7',
    isActive: true,
    joinDate: new Date('2021-09-18')
  },
  {
    id: 'user-6',
    username: 'iet',
    password: 'iet123',
    role: 'User',
    unit: 'IET',
    pegawaiId: 'peg-9',
    isActive: true,
    joinDate: new Date('2021-12-10')
  }
];

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Ruang Direktur Jenderal',
    roomCode: 'RDJ-001',
    lantai: 3,
    roomType: 'Office',
    description: 'Ruang kerja Direktur Jenderal ILMATE',
    picName: 'Dr. Ahmad Wijaya, S.T., M.T.',
    picNip: '197203151995031002',
    picJabatan: 'Direktur Jenderal ILMATE'
  },
  {
    id: '2',
    name: 'Ruang Rapat Utama',
    roomCode: 'RRU-001',
    lantai: 2,
    roomType: 'Meeting',
    description: 'Ruang rapat utama untuk meeting besar',
    picName: 'Ir. Siti Nurhaliza, M.M.',
    picNip: '197805121998032001',
    picJabatan: 'Kepala Bagian Umum'
  },
  {
    id: '3',
    name: 'Laboratorium Logam',
    roomCode: 'LAB-LGM-001',
    lantai: 1,
    roomType: 'Laboratory',
    description: 'Laboratorium untuk pengujian material logam',
    picName: 'Budi Santoso, S.T.',
    picNip: '198005102005031003',
    picJabatan: 'Kepala Seksi Logam'
  },
  {
    id: '4',
    name: 'Workshop IPAMP',
    roomCode: 'WS-IPAMP-001',
    lantai: 1,
    roomType: 'Workshop',
    description: 'Workshop untuk industri permesinan dan alat mesin pertanian',
    picName: 'Sari Indrawati, S.T., M.T.',
    picNip: '198207252010032004',
    picJabatan: 'Kepala Seksi IPAMP'
  },
  {
    id: '5',
    name: 'Ruang IMATAB',
    roomCode: 'R-IMATAB-001',
    lantai: 2,
    roomType: 'Office',
    description: 'Ruang kerja industri maritim, alat transportasi dan alat pertahanan',
    picName: 'Eko Prasetyo, S.T., M.T.',
    picNip: '198109182008031005',
    picJabatan: 'Kepala Seksi IMATAB'
  },
  {
    id: '6',
    name: 'Laboratorium IET',
    roomCode: 'LAB-IET-001',
    lantai: 2,
    roomType: 'Laboratory',
    description: 'Laboratorium industri elektronika dan telematika',
    picName: 'Maya Sari, S.T., M.T.',
    picNip: '198412102012032006',
    picJabatan: 'Kepala Seksi IET'
  },
  {
    id: '7',
    name: 'Gudang Penyimpanan',
    roomCode: 'GDG-001',
    lantai: 0,
    roomType: 'Storage',
    description: 'Gudang penyimpanan peralatan dan inventaris',
    picName: 'Ir. Siti Nurhaliza, M.M.',
    picNip: '197805121998032001',
    picJabatan: 'Kepala Bagian Umum'
  }
];

export const mockItems: Item[] = [
  {
    id: '1',
    serialNumber: 'LT-2024-001',
    name: 'Laptop Dell Precision 7560',
    brand: 'Dell',
    model: 'Precision 7560',
    category: 'Electronics',
    nup: '2024.01.001',
    year: 2024,
    roomId: '3',
    status: 'Available',
    qrCode: 'QR_LT_2024_001',
    description: 'Laptop workstation untuk analisis data dan pemodelan 3D',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    serialNumber: 'PRJ-2024-001',
    name: 'Proyektor Epson EB-2250U',
    brand: 'Epson',
    model: 'EB-2250U',
    category: 'Electronics',
    nup: '2024.01.002',
    year: 2024,
    roomId: '2',
    currentBorrowerId: 'peg-3',
    status: 'Lended',
    qrCode: 'QR_PRJ_2024_001',
    description: 'Proyektor WUXGA 5000 lumens untuk presentasi',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    serialNumber: 'CAM-2024-001',
    name: 'Kamera Digital Canon EOS R6',
    brand: 'Canon',
    model: 'EOS R6',
    category: 'Electronics',
    nup: '2024.01.003',
    year: 2024,
    roomId: '7',
    status: 'Available',
    qrCode: 'QR_CAM_2024_001',
    description: 'Kamera mirrorless full-frame untuk dokumentasi kegiatan',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '4',
    serialNumber: 'MIC-2023-001',
    name: 'Microphone Wireless Shure SM58',
    brand: 'Shure',
    model: 'SM58',
    category: 'Audio',
    nup: '2023.12.015',
    year: 2023,
    roomId: '7',
    status: 'Broken',
    qrCode: 'QR_MIC_2023_001',
    description: 'Microphone wireless untuk acara dan presentasi',
    createdAt: new Date('2023-12-12'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '5',
    serialNumber: 'MB-2024-001',
    name: 'MacBook Pro 16" M3',
    brand: 'Apple',
    model: 'MacBook Pro 16" M3',
    category: 'Electronics',
    nup: '2024.01.004',
    year: 2024,
    roomId: '5',
    status: 'Available',
    qrCode: 'QR_MB_2024_001',
    description: 'Laptop premium untuk desain dan pengembangan aplikasi',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  }
];

export const mockLendingRequests: LendingRequest[] = [
  {
    id: '1',
    itemId: '2',
    pegawaiId: 'peg-3',
    pegawaiName: 'Budi Santoso, S.T.',
    pegawaiNip: '198005102005031003',
    pegawaiUnit: 'Logam',
    itemName: 'Proyektor Epson EB-2250U',
    itemSerialNumber: 'PRJ-2024-001',
    itemNup: '2024.01.002',
    requestDate: new Date('2024-01-20'),
    expectedReturnDate: new Date('2024-01-27'),
    status: 'Active',
    approvedBy: 'user-2',
    approverName: 'Admin',
    notes: 'Untuk presentasi hasil penelitian logam',
    requestedBy: 'user-3'
  },
  {
    id: '2',
    itemId: '5',
    pegawaiId: 'peg-5',
    pegawaiName: 'Sari Indrawati, S.T., M.T.',
    pegawaiNip: '198207252010032004',
    pegawaiUnit: 'IPAMP',
    itemName: 'MacBook Pro 16" M3',
    itemSerialNumber: 'MB-2024-001',
    itemNup: '2024.01.004',
    requestDate: new Date('2024-01-25'),
    expectedReturnDate: new Date('2024-02-01'),
    status: 'Pending',
    notes: 'Untuk pengolahan data penelitian material maritim',
    requestedBy: 'user-4'
  }
];

// Create LendingRecord data for compatibility
export const mockLendingRecords: LendingRecord[] = mockLendingRequests.map(request => ({
  ...request,
  borrowerId: request.pegawaiId,
  borrowerName: request.pegawaiName,
  borrowerNip: request.pegawaiNip,
  borrowerUnit: request.pegawaiUnit,
  userName: request.pegawaiName,
  userDepartment: request.pegawaiUnit,
  lendDate: request.requestDate
}));

export const mockRepairRequests: RepairRequest[] = [
  {
    id: '1',
    itemId: '4',
    itemName: 'Microphone Wireless Shure SM58',
    itemSerialNumber: 'MIC-2023-001',
    itemNup: '2023.12.015',
    pegawaiId: 'peg-3',
    pegawaiName: 'Budi Santoso, S.T.',
    pegawaiNip: '198005102005031003',
    pegawaiUnit: 'Logam',
    requesterId: 'user-3',
    requesterName: 'Budi Santoso, S.T.',
    requesterNip: '198005102005031003',
    requesterUnit: 'Logam',
    damageDescription: 'Microphone tidak dapat menangkap suara dengan baik, ada noise yang mengganggu saat digunakan. Kemungkinan ada masalah pada receiver atau transmitter.',
    urgencyLevel: 'High',
    requestDate: new Date('2024-01-25'),
    status: 'Pending',
    attachments: ['mic_damage_photo1.jpg', 'mic_damage_photo2.jpg'],
    requestedBy: 'user-3'
  }
];