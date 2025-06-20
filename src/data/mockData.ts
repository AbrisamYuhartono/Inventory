import { Item, User, LendingRecord, Room } from '../types';

export const mockItems: Item[] = [
  {
    id: '1',
    name: 'Laptop Dell XPS 13',
    description: 'Ultrabook untuk keperluan mobile dengan processor Intel i7',
    category: 'Electronics',
    room: 'IT Office',
    status: 'Available',
    serialNumber: 'DL001',
    qrCode: 'QR_DL001',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Proyektor BenQ MW632ST',
    description: 'Proyektor short throw untuk presentasi ruang kecil',
    category: 'Electronics',
    room: 'Meeting Room A',
    status: 'Lended',
    serialNumber: 'BQ001',
    qrCode: 'QR_BQ001',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Kamera Canon EOS 80D',
    description: 'Kamera DSLR untuk dokumentasi acara dan foto produk',
    category: 'Photography',
    room: 'Media Room',
    status: 'Available',
    serialNumber: 'CN001',
    qrCode: 'QR_CN001',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '4',
    name: 'Microphone Wireless Shure',
    description: 'Mic wireless untuk presentasi dan acara besar',
    category: 'Audio',
    room: 'Storage Room',
    status: 'Broken',
    serialNumber: 'MIC001',
    qrCode: 'QR_MIC001',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '5',
    name: 'MacBook Pro 16"',
    description: 'Laptop untuk design dan video editing',
    category: 'Electronics',
    room: 'Design Studio',
    status: 'Available',
    serialNumber: 'MB001',
    qrCode: 'QR_MB001',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '6',
    name: 'iPad Pro 12.9"',
    description: 'Tablet untuk presentasi dan demo aplikasi',
    category: 'Electronics',
    room: 'Meeting Room B',
    status: 'Lended',
    serialNumber: 'IP001',
    qrCode: 'QR_IP001',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '7',
    name: 'Printer HP LaserJet Pro',
    description: 'Printer laser untuk dokumen berkualitas tinggi',
    category: 'Office Equipment',
    room: 'Admin Office',
    status: 'Available',
    serialNumber: 'HP001',
    qrCode: 'QR_HP001',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    id: '8',
    name: 'Monitor Dell 27" 4K',
    description: 'Monitor eksternal untuk workstation',
    category: 'Electronics',
    room: 'IT Office',
    status: 'Available',
    serialNumber: 'MON001',
    qrCode: 'QR_MON001',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11')
  },
  {
    id: '9',
    name: 'Tripod Manfrotto',
    description: 'Tripod professional untuk kamera dan video',
    category: 'Photography',
    room: 'Media Room',
    status: 'Available',
    serialNumber: 'TRP001',
    qrCode: 'QR_TRP001',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '10',
    name: 'Speaker Bluetooth JBL',
    description: 'Speaker portable untuk acara outdoor',
    category: 'Audio',
    room: 'Storage Room',
    status: 'Available',
    serialNumber: 'SPK001',
    qrCode: 'QR_SPK001',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '11',
    name: 'Webcam Logitech C920',
    description: 'Webcam HD untuk video conference',
    category: 'Electronics',
    room: 'Meeting Room A',
    status: 'Available',
    serialNumber: 'WEB001',
    qrCode: 'QR_WEB001',
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: '12',
    name: 'Whiteboard Portable',
    description: 'Whiteboard mobile untuk brainstorming',
    category: 'Office Equipment',
    room: 'Meeting Room B',
    status: 'Available',
    serialNumber: 'WB001',
    qrCode: 'QR_WB001',
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07')
  },
  {
    id: '13',
    name: 'Drone DJI Mini 3',
    description: 'Drone untuk aerial photography dan videography',
    category: 'Photography',
    room: 'Media Room',
    status: 'Broken',
    serialNumber: 'DRN001',
    qrCode: 'QR_DRN001',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-26')
  },
  {
    id: '14',
    name: 'Keyboard Mechanical Logitech',
    description: 'Keyboard mechanical untuk programmer',
    category: 'Electronics',
    room: 'IT Office',
    status: 'Available',
    serialNumber: 'KB001',
    qrCode: 'QR_KB001',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21')
  },
  {
    id: '15',
    name: 'Mouse Wireless Logitech MX',
    description: 'Mouse wireless precision untuk design work',
    category: 'Electronics',
    room: 'Design Studio',
    status: 'Available',
    serialNumber: 'MS001',
    qrCode: 'QR_MS001',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22')
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin System',
    email: 'admin@company.com',
    department: 'IT',
    role: 'Admin',
    phone: '+62 812-3456-7890',
    joinDate: new Date('2023-01-01'),
    isActive: true
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@company.com',
    department: 'Marketing',
    role: 'User',
    phone: '+62 812-1111-2222',
    joinDate: new Date('2023-03-15'),
    isActive: true
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@company.com',
    department: 'Sales',
    role: 'User',
    phone: '+62 812-3333-4444',
    joinDate: new Date('2023-05-20'),
    isActive: true
  },
  {
    id: '4',
    name: 'Michael Johnson',
    email: 'michael@company.com',
    department: 'Design',
    role: 'User',
    phone: '+62 812-5555-6666',
    joinDate: new Date('2023-07-10'),
    isActive: true
  },
  {
    id: '5',
    name: 'Sarah Wilson',
    email: 'sarah@company.com',
    department: 'HR',
    role: 'Manager',
    phone: '+62 812-7777-8888',
    joinDate: new Date('2023-02-28'),
    isActive: true
  },
  {
    id: '6',
    name: 'David Brown',
    email: 'david@company.com',
    department: 'Finance',
    role: 'User',
    phone: '+62 812-9999-0000',
    joinDate: new Date('2023-06-12'),
    isActive: false
  },
  {
    id: '7',
    name: 'Lisa Anderson',
    email: 'lisa@company.com',
    department: 'Operations',
    role: 'Manager',
    phone: '+62 812-1234-5678',
    joinDate: new Date('2023-04-05'),
    isActive: true
  },
  {
    id: '8',
    name: 'Robert Taylor',
    email: 'robert@company.com',
    department: 'IT',
    role: 'User',
    phone: '+62 812-8765-4321',
    joinDate: new Date('2023-08-18'),
    isActive: true
  }
];

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'IT Office',
    description: 'Ruang kerja tim IT dan development',
    itemCount: 25,
    capacity: 30,
    floor: 2,
    building: 'Main Building'
  },
  {
    id: '2',
    name: 'Meeting Room A',
    description: 'Ruang rapat utama dengan kapasitas 20 orang',
    itemCount: 12,
    capacity: 15,
    floor: 1,
    building: 'Main Building'
  },
  {
    id: '3',
    name: 'Media Room',
    description: 'Ruang peralatan media dan photography',
    itemCount: 18,
    capacity: 25,
    floor: 1,
    building: 'Creative Building'
  },
  {
    id: '4',
    name: 'Storage Room',
    description: 'Ruang penyimpanan peralatan cadangan',
    itemCount: 35,
    capacity: 50,
    floor: 0,
    building: 'Main Building'
  },
  {
    id: '5',
    name: 'Design Studio',
    description: 'Studio untuk tim kreatif dan design',
    itemCount: 15,
    capacity: 20,
    floor: 2,
    building: 'Creative Building'
  },
  {
    id: '6',
    name: 'Meeting Room B',
    description: 'Ruang rapat kecil untuk diskusi tim',
    itemCount: 8,
    capacity: 10,
    floor: 1,
    building: 'Main Building'
  },
  {
    id: '7',
    name: 'Admin Office',
    description: 'Ruang administrasi dan dokumentasi',
    itemCount: 12,
    capacity: 15,
    floor: 1,
    building: 'Main Building'
  }
];

export const mockLendingRecords: LendingRecord[] = [
  {
    id: '1',
    itemId: '2',
    userId: '2',
    userName: 'John Doe',
    userEmail: 'john@company.com',
    userDepartment: 'Marketing',
    itemName: 'Proyektor BenQ MW632ST',
    itemSerialNumber: 'BQ001',
    lendDate: new Date('2024-01-20'),
    expectedReturnDate: new Date('2024-01-27'),
    status: 'Active',
    notes: 'Untuk presentasi client minggu depan'
  },
  {
    id: '2',
    itemId: '6',
    userId: '4',
    userName: 'Michael Johnson',
    userEmail: 'michael@company.com',
    userDepartment: 'Design',
    itemName: 'iPad Pro 12.9"',
    itemSerialNumber: 'IP001',
    lendDate: new Date('2024-01-22'),
    expectedReturnDate: new Date('2024-01-29'),
    status: 'Active',
    notes: 'Demo aplikasi mobile untuk klien'
  },
  {
    id: '3',
    itemId: '1',
    userId: '3',
    userName: 'Jane Smith',
    userEmail: 'jane@company.com',
    userDepartment: 'Sales',
    itemName: 'Laptop Dell XPS 13',
    itemSerialNumber: 'DL001',
    lendDate: new Date('2024-01-15'),
    expectedReturnDate: new Date('2024-01-20'),
    actualReturnDate: new Date('2024-01-19'),
    status: 'Returned',
    notes: 'Presentasi di kantor cabang'
  },
  {
    id: '4',
    itemId: '3',
    userId: '5',
    userName: 'Sarah Wilson',
    userEmail: 'sarah@company.com',
    userDepartment: 'HR',
    itemName: 'Kamera Canon EOS 80D',
    itemSerialNumber: 'CN001',
    lendDate: new Date('2024-01-10'),
    expectedReturnDate: new Date('2024-01-15'),
    actualReturnDate: new Date('2024-01-16'),
    status: 'Returned',
    notes: 'Dokumentasi acara company gathering'
  }
];