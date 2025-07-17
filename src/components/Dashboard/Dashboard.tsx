import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { RecentActivity } from './RecentActivity';
import { StatusChart } from './StatusChart';
import { Package, Users, FileText, AlertTriangle, Plus, Wrench, TrendingUp, Clock } from 'lucide-react';
import { AuthUser } from '../../types';
import { RequestSelectionPage } from '../RequestSelection/RequestSelectionPage';
import { mockLendingRequests, mockRepairRequests, mockPegawai } from '../../data/mockData';

interface DashboardProps {
  user?: AuthUser;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [showRequestPage, setShowRequestPage] = useState<'lending' | 'repair' | null>(null);

  const handleRequestSubmit = (itemId: string, pegawaiId: string, additionalData: any) => {
    const pegawai = mockPegawai.find(p => p.id === pegawaiId);
    
    if (showRequestPage === 'lending') {
      // Create new lending request
      console.log('New lending request:', {
        itemId,
        pegawaiId,
        pegawaiName: pegawai?.name,
        expectedReturnDate: additionalData.expectedReturnDate,
        notes: additionalData.notes,
        requestedBy: user?.id
      });
      alert('Permintaan peminjaman berhasil diajukan!');
    } else if (showRequestPage === 'repair') {
      // Create new repair request
      console.log('New repair request:', {
        itemId,
        pegawaiId,
        pegawaiName: pegawai?.name,
        damageDescription: additionalData.damageDescription,
        urgencyLevel: additionalData.urgencyLevel,
        requestedBy: user?.id
      });
      alert('Permintaan perbaikan berhasil diajukan!');
    }
    
    setShowRequestPage(null);
  };

  if (showRequestPage && user) {
    return (
      <RequestSelectionPage
        type={showRequestPage}
        user={user}
        onBack={() => setShowRequestPage(null)}
        onSubmit={handleRequestSubmit}
      />
    );
  }

  return (
    <div className="p-4 md:p-6 ml-0 md:ml-64 bg-gray-50 min-h-screen">
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600 text-base md:text-lg">
              Selamat datang{user?.pegawaiName ? `, ${user.pegawaiName}` : ''}! 
              Berikut adalah ringkasan inventaris Anda.
            </p>
          </div>
          
          {user?.role === 'User' && (
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowRequestPage('lending')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="h-4 md:h-5 w-4 md:w-5" />
                <span className="font-medium text-sm md:text-base">Ajukan Peminjaman</span>
              </button>
              
              <button
                onClick={() => setShowRequestPage('repair')}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Wrench className="h-4 md:h-5 w-4 md:w-5" />
                <span className="font-medium text-sm md:text-base">Ajukan Perbaikan</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        <StatCard
          title="Total Barang"
          value={147}
          change="+12 bulan ini"
          changeType="positive"
          icon={Package}
          color="blue"
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Sedang Dipinjam"
          value={23}
          change="+5 hari ini"
          changeType="positive"
          icon={FileText}
          color="indigo"
          gradient="from-indigo-500 to-purple-600"
        />
        <StatCard
          title="Pengguna Aktif"
          value={42}
          change="+3 minggu ini"
          changeType="positive"
          icon={Users}
          color="emerald"
          gradient="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Barang Rusak"
          value={3}
          change="-1 dari minggu lalu"
          changeType="positive"
          icon={AlertTriangle}
          color="orange"
          gradient="from-orange-500 to-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Status Barang</h2>
            <TrendingUp className="h-4 md:h-5 w-4 md:w-5 text-gray-400" />
          </div>
          <StatusChart />
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Aktivitas Terbaru</h2>
            <Clock className="h-4 md:h-5 w-4 md:w-5 text-gray-400" />
          </div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};