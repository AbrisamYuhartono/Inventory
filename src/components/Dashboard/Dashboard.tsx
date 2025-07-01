import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { RecentActivity } from './RecentActivity';
import { StatusChart } from './StatusChart';
import { Package, Users, FileText, AlertTriangle, Plus, Wrench } from 'lucide-react';
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
    <div className="p-6 ml-64 bg-cream-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Selamat datang{user?.pegawaiName ? `, ${user.pegawaiName}` : ''}! 
              Berikut adalah ringkasan inventaris Anda.
            </p>
          </div>
          
          {user?.role === 'User' && (
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRequestPage('lending')}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2 shadow-lg"
              >
                <Plus className="h-5 w-5" />
                <span>Ajukan Peminjaman</span>
              </button>
              
              <button
                onClick={() => setShowRequestPage('repair')}
                className="bg-danger-500 text-white px-4 py-2 rounded-lg hover:bg-danger-600 transition-colors flex items-center space-x-2 shadow-lg"
              >
                <Wrench className="h-5 w-5" />
                <span>Ajukan Perbaikan</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Barang"
          value={147}
          change="+12 bulan ini"
          changeType="positive"
          icon={Package}
          color="primary"
        />
        <StatCard
          title="Sedang Dipinjam"
          value={23}
          change="+5 hari ini"
          changeType="positive"
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Pengguna Aktif"
          value={42}
          change="+3 minggu ini"
          changeType="positive"
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Barang Rusak"
          value={3}
          change="-1 dari minggu lalu"
          changeType="positive"
          icon={AlertTriangle}
          color="danger"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Status Barang</h2>
          <StatusChart />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h2>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};