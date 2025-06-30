import React from 'react';
import { 
  Home, 
  Package, 
  Users, 
  FileText, 
  Building, 
  Settings,
  BarChart3,
  CheckSquare,
  Wrench
} from 'lucide-react';
import { AuthUser } from '../../types';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: AuthUser;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, user }) => {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'items', label: 'Inventaris', icon: Package },
      { id: 'lending', label: 'Peminjaman', icon: FileText }
    ];

    if (user.role === 'User') {
      return [
        ...baseItems,
        { id: 'my-requests', label: 'Permintaan Saya', icon: CheckSquare },
        { id: 'repair-requests', label: 'Perbaikan Barang', icon: Wrench }
      ];
    }

    if (user.role === 'Admin') {
      return [
        ...baseItems,
        { id: 'approval', label: 'Persetujuan', icon: CheckSquare },
        { id: 'repair-requests', label: 'Perbaikan Barang', icon: Wrench },
        { id: 'rooms', label: 'Ruangan', icon: Building },
        { id: 'reports', label: 'Laporan', icon: BarChart3 }
      ];
    }

    if (user.role === 'Superadmin') {
      return [
        ...baseItems,
        { id: 'approval', label: 'Persetujuan', icon: CheckSquare },
        { id: 'repair-requests', label: 'Perbaikan Barang', icon: Wrench },
        { id: 'users', label: 'Pengguna', icon: Users },
        { id: 'rooms', label: 'Ruangan', icon: Building },
        { id: 'reports', label: 'Laporan', icon: BarChart3 },
        { id: 'settings', label: 'Pengaturan', icon: Settings }
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Package className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-lg font-bold text-gray-900">ILMATE Inventory</h1>
            <p className="text-xs text-gray-500">Sistem Inventaris</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600">
          <p className="font-medium">{user.name}</p>
          <p>NIP: {user.nip}</p>
          <p>{user.unit}</p>
        </div>
      </div>
    </div>
  );
};