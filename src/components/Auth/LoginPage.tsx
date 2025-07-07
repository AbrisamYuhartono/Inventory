import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Building2, Zap } from 'lucide-react';
import { mockUsers, mockPegawai } from '../../data/mockData';
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
      let pegawaiName = '';
      let pegawaiNip = '';
      if (user.pegawaiId) {
        const pegawai = mockPegawai.find(p => p.id === user.pegawaiId);
        pegawaiName = pegawai?.name || '';
        pegawaiNip = pegawai?.nip || '';
      }

      const authUser: AuthUser = {
        id: user.id,
        username: user.username,
        role: user.role,
        unit: user.unit,
        pegawaiId: user.pegawaiId,
        pegawaiName,
        name: pegawaiName,
        nip: pegawaiNip
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20 shadow-2xl">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">ILMATE Inventory</h1>
          <p className="text-blue-200 text-lg font-medium">Sistem Manajemen Inventaris</p>
          <div className="mt-4 space-y-1">
            <p className="text-blue-300 text-sm">Direktorat Jenderal Industri Logam, Mesin,</p>
            <p className="text-blue-300 text-sm">Alat Transportasi, dan Elektronika</p>
            <p className="text-blue-400 text-xs mt-2">Kementerian Perindustrian Republik Indonesia</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Selamat Datang</h2>
            <p className="text-blue-200">Masuk ke sistem inventaris</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-100">
                Username
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-white placeholder-blue-200 backdrop-blur-sm"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-100">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-white placeholder-blue-200 backdrop-blur-sm"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-xl font-medium"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Masuk ke Sistem</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-5 w-5 text-blue-300" />
            <h3 className="text-white font-semibold">Akun Demo</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {demoAccounts.map((account, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium text-sm">{account.role}</p>
                    <p className="text-blue-200 text-xs">{account.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-sm font-mono bg-white/10 px-2 py-1 rounded">{account.username}</p>
                    <p className="text-blue-200 text-xs font-mono mt-1">{account.password}</p>
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