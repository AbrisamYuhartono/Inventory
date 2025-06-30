import React from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { AuthUser } from '../../types';

interface HeaderProps {
  user: AuthUser;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-cream-50 shadow-sm border-b border-primary-200 ml-64">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari barang, pengguna, atau catatan..."
                className="pl-10 pr-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-96 bg-white"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-primary-600 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-danger-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-cream-50 font-semibold text-sm">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-primary-600">{user.role} - {user.unit}</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-danger-500 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};