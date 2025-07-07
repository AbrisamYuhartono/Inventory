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
  Wrench,
  UserCheck,
  Building2
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
        { id: 'pegawai', label: 'Data Pegawai', icon: UserCheck },
        { id: 'rooms', label: 'Ruangan', icon: Building },
        { id: 'reports', label: 'Laporan', icon: BarChart3 }
      ];
    }

    if (user.role === 'Superadmin') {
      return [
        ...baseItems,
        { id: 'approval', label: 'Persetujuan', icon: CheckSquare },
        { id: 'repair-requests', label: 'Perbaikan Barang', icon: Wrench },
        { id: 'users', label: 'Manajemen User', icon: Users },
        { id: 'pegawai', label: 'Data Pegawai', icon: UserCheck },
        { id: 'rooms', label: 'Ruangan', icon: Building },
        { id: 'reports', label: 'Laporan', icon: BarChart3 },
        { id: 'settings', label: 'Pengaturan', icon: Settings }
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white shadow-xl h-screen fixed left-0 top-0 border-r border-gray-200 z-50">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-xl p-2 shadow-lg">
            <Building2 className="w-full h-full text-slate-800" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">ILMATE Inventory</h1>
            <p className="text-xs text-slate-300">Sistem Inventaris</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 rounded-xl mb-1 group ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-[1.02]'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <Icon className={`h-5 w-5 transition-colors ${
                activeTab === item.id ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'
              }`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-semibold text-sm">
              {(user.pegawaiName || user.username).split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate text-sm">{user.pegawaiName || user.username}</p>
            <p className="text-blue-600 text-xs font-medium">{user.unit}</p>
            <p className="text-gray-500 text-xs">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};