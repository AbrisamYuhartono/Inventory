import React from 'react';
import { StatCard } from './StatCard';
import { RecentActivity } from './RecentActivity';
import { StatusChart } from './StatusChart';
import { Package, Users, FileText, AlertTriangle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 ml-64 bg-cream-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Selamat datang! Berikut adalah ringkasan inventaris Anda.</p>
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