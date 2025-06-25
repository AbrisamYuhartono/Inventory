import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Building } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { AuthUser } from '../../types';

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.username === username && u.password === password && u.isActive);

    if (user) {
      const authUser: AuthUser = {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        unit: user.unit,
        nip: user.nip
      };
      onLogin(authUser);
    } else {
      setError('Username atau password salah, atau akun tidak aktif');
    }

    setIsLoading(false);
  };

  const demoAccounts = [
    { username: 'superadmin', password: 'super123', role: 'Superadmin', unit: 'Setditjen ILMATE' },
    { username: 'admin', password: 'admin123', role: 'Admin', unit: 'Setditjen ILMATE' },
    { username: 'logam', password: 'logam123', role: 'User', unit: 'Logam' },
    { username: 'ipamp', password: 'ipamp123', role: 'User', unit: 'IPAMP' },
    { username: 'imatab', password: 'imatab123', role: 'User', unit: 'IMATAB' },
    { username: 'iet', password: 'iet123', role: 'User', unit: 'IET' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
            <Building className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ILMATE Inventory</h1>
          <p className="text-blue-200">Sistem Manajemen Inventaris</p>
          <p className="text-blue-300 text-sm">Direktorat Jenderal Industri Logam, Mesin, Alat Transportasi, dan Elektronika</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Masuk ke Sistem</h2>
            <p className="text-gray-600 mt-2">Silakan masukkan kredensial Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  <span>Masuk</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 text-center">Akun Demo</h3>
          <div className="grid grid-cols-1 gap-3">
            {demoAccounts.map((account, index) => (
              <div key={index} className="bg-white/20 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{account.role}</p>
                    <p className="text-blue-200 text-sm">{account.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm font-mono">{account.username}</p>
                    <p className="text-blue-200 text-sm font-mono">{account.password}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};