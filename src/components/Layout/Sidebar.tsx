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
    <div className="w-64 bg-cream-50 shadow-lg h-screen fixed left-0 top-0 border-r border-primary-200">
      <div className="p-6 border-b border-primary-200 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-cream-50 rounded-lg p-1 border border-primary-300 shadow-sm">
            <img 
              src="https://github.com/AbrisamYuhartono/Inventory/blob/main/docs/Logo_of_the_Ministry_of_Industry_of_the_Republic_of_Indonesia.png?raw=true"
              alt="Ministry of Industry Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-cream-50">ILMATE Inventory</h1>
            <p className="text-xs text-primary-100">Sistem Inventaris</p>
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
                  ? 'bg-primary-50 text-primary-700 border-r-3 border-primary-500 shadow-sm'
                  : 'text-gray-700 hover:bg-primary-25 hover:text-primary-600'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-200 bg-gradient-to-r from-primary-50 to-cream-100">
        <div className="text-xs text-gray-600">
          <p className="font-medium text-primary-700">{user.name}</p>
          <p>NIP: {user.nip}</p>
          <p className="text-primary-600">{user.unit}</p>
        </div>
      </div>
    </div>
  );
};