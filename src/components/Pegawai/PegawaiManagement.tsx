import React, { useState } from 'react';
import { Pegawai } from '../../types';
import { mockPegawai } from '../../data/mockData';
import { format } from 'date-fns';
import {
  UserCheck,
  Search,
  User,
  Building,
  Calendar,
  Plus,
} from 'lucide-react';
import { AuthUser } from '../../types';
import { AddPegawaiModal } from './AddPegawaiModal';

interface PegawaiManagementProps {
  user: AuthUser;
}

export const PegawaiManagement: React.FC<PegawaiManagementProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [unitFilter, setUnitFilter] = useState<string>('all');
  const [pegawaiList, setPegawaiList] = useState<Pegawai[]>(mockPegawai);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPegawai, setEditingPegawai] = useState<Pegawai | null>(null);

  const getPegawaiData = () => {
    if (user.role === 'Superadmin' || user.role === 'Admin') return pegawaiList;
    return pegawaiList.filter(p => p.unit === user.unit);
  };

  const handleAddPegawai = (pegawai: Omit<Pegawai, 'id'>) => {
    const newPegawai: Pegawai = {
      ...pegawai,
      id: editingPegawai ? editingPegawai.id : Date.now().toString(),
    };

    if (editingPegawai) {
      setPegawaiList(prev => prev.map(p => (p.id === editingPegawai.id ? newPegawai : p)));
    } else {
      setPegawaiList(prev => [...prev, newPegawai]);
    }

    setIsAddModalOpen(false);
    setEditingPegawai(null);
  };

  const handleEditPegawai = (pegawai: Pegawai) => {
    setEditingPegawai(pegawai);
    setIsAddModalOpen(true);
  };

  const pegawaiData = getPegawaiData();

  const filteredPegawai = pegawaiData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.jabatan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUnit = unitFilter === 'all' || p.unit === unitFilter;
    return matchesSearch && matchesUnit;
  });

  const activePegawai = pegawaiData.filter(p => p.isActive);
  const unitCounts = pegawaiData.reduce((acc, p) => {
    acc[p.unit] = (acc[p.unit] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 ml-64">
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Pegawai</h1>
          <p className="text-gray-600 mt-2">
            {user.role === 'User' ? `Data pegawai unit ${user.unit}` : 'Kelola data pegawai seluruh unit'}
          </p>
        </div>
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2 shadow-lg"
          onClick={() => {
            setEditingPegawai(null);
            setIsAddModalOpen(true);
          }}
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Pegawai</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Pegawai" icon={<UserCheck />} value={pegawaiData.length} color="blue" />
        <StatCard title="Pegawai Aktif" icon={<User />} value={activePegawai.length} color="green" />
        <StatCard
          title="Unit Terbanyak"
          icon={<Building />}
          value={Math.max(...Object.values(unitCounts))}
          subtitle={Object.entries(unitCounts).find(([_, count]) => count === Math.max(...Object.values(unitCounts)))?.[0]}
          color="purple"
        />
        <StatCard
          title="Rata-rata Masa Kerja"
          icon={<Calendar />}
          value={Math.round(pegawaiData.reduce((acc, p) => ((new Date().getTime() - p.joinDate.getTime()) / (1000 * 3600 * 24 * 365)) + acc, 0) / pegawaiData.length)}
          subtitle="tahun"
          color="amber"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative w-full max-w-md">
          <Search className="h-5 w-5 absolute top-2.5 left-3 text-gray-400" />
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
            placeholder="Cari pegawai..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {(user.role === 'Superadmin' || user.role === 'Admin') && (
          <select
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">Semua Unit</option>
            <option value="Setditjen ILMATE">Setditjen ILMATE</option>
            <option value="Logam">Logam</option>
            <option value="IPAMP">IPAMP</option>
            <option value="IMATAB">IMATAB</option>
            <option value="IET">IET</option>
          </select>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPegawai.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.jabatan}</p>
              </div>
              <button
                onClick={() => handleEditPegawai(p)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>NIP:</strong> {p.nip}</p>
              <p><strong>KARPEG:</strong> {p.karpeg}</p>
              <p><strong>Pangkat/Gol:</strong> {p.pangkatGolongan}</p>
              <p><strong>Unit:</strong> {p.unit}</p>
              <p><strong>Bergabung:</strong> {format(p.joinDate, 'dd MMM yyyy')}</p>
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <span className={p.isActive ? 'text-blue-600' : 'text-red-600'}>
                • {p.isActive ? 'Aktif' : 'Tidak Aktif'}
              </span>
              <span className="text-gray-500">
                {Math.round((new Date().getTime() - p.joinDate.getTime()) / (1000 * 60 * 60 * 24 * 365))} tahun
              </span>
            </div>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <AddPegawaiModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingPegawai(null);
          }}
          onAdd={handleAddPegawai}
          onEdit={handleAddPegawai}
          initialData={editingPegawai || undefined}
        />
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, subtitle, color }: { title: string, value: string | number, icon: React.ReactNode, subtitle?: string, color: string }) => (
  <div className="bg-white rounded-xl shadow-sm border p-6">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className={`text-3xl font-bold text-${color}-600 mt-1`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 bg-${color}-50 rounded-lg`}>{icon}</div>
    </div>
  </div>
);
