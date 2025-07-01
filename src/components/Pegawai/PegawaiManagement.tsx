import React, { useState } from 'react';
import { Pegawai } from '../../types';
import { mockPegawai } from '../../data/mockData';
import { format } from 'date-fns';
import { 
  UserCheck, 
  Search, 
  Filter,
  User,
  Building,
  Calendar,
  Phone,
  Mail,
  Badge
} from 'lucide-react';
import { AuthUser } from '../../types';

interface PegawaiManagementProps {
  user: AuthUser;
}

export const PegawaiManagement: React.FC<PegawaiManagementProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [unitFilter, setUnitFilter] = useState<string>('all');

  // Filter pegawai based on user role and unit
  const getPegawaiData = () => {
    if (user.role === 'Superadmin' || user.role === 'Admin') {
      return mockPegawai; // Show all pegawai
    } else {
      return mockPegawai.filter(p => p.unit === user.unit); // Show only same unit
    }
  };

  const pegawaiData = getPegawaiData();

  const filteredPegawai = pegawaiData.filter(pegawai => {
    const matchesSearch = pegawai.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pegawai.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pegawai.jabatan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUnit = unitFilter === 'all' || pegawai.unit === unitFilter;
    return matchesSearch && matchesUnit;
  });

  const getUnitColor = (unit: string) => {
    switch (unit) {
      case 'Setditjen ILMATE':
        return 'bg-purple-100 text-purple-800';
      case 'Logam':
        return 'bg-blue-100 text-blue-800';
      case 'IPAMP':
        return 'bg-primary-100 text-primary-800';
      case 'IMATAB':
        return 'bg-amber-100 text-amber-800';
      case 'IET':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activePegawai = pegawaiData.filter(p => p.isActive);
  const unitCounts = pegawaiData.reduce((acc, pegawai) => {
    acc[pegawai.unit] = (acc[pegawai.unit] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 ml-64">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Pegawai</h1>
            <p className="text-gray-600 mt-2">
              {user.role === 'User' 
                ? `Data pegawai unit ${user.unit}`
                : 'Kelola data pegawai seluruh unit'
              }
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pegawai</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pegawaiData.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pegawai Aktif</p>
                <p className="text-3xl font-bold text-primary-600 mt-2">{activePegawai.length}</p>
              </div>
              <div className="p-3 bg-primary-50 rounded-lg">
                <User className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unit Terbanyak</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">
                  {Math.max(...Object.values(unitCounts))}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {Object.entries(unitCounts).find(([_, count]) => count === Math.max(...Object.values(unitCounts)))?.[0]}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rata-rata Masa Kerja</p>
                <p className="text-3xl font-bold text-amber-600 mt-2">
                  {Math.round(pegawaiData.reduce((acc, p) => {
                    const years = (new Date().getTime() - p.joinDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
                    return acc + years;
                  }, 0) / pegawaiData.length)}
                </p>
                <p className="text-xs text-gray-500 mt-1">tahun</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari pegawai..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {(user.role === 'Superadmin' || user.role === 'Admin') && (
            <select
              value={unitFilter}
              onChange={(e) => setUnitFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
      </div>

      {/* Pegawai Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPegawai.map((pegawai) => (
          <div key={pegawai.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {pegawai.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{pegawai.name}</h3>
                  <p className="text-sm text-gray-500">{pegawai.jabatan}</p>
                </div>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUnitColor(pegawai.unit)}`}>
                {pegawai.unit}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Badge className="h-4 w-4" />
                <span>NIP: {pegawai.nip}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>KARPEG: {pegawai.karpeg}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Pangkat/Golongan:</span>
                <br />
                <span className="text-xs">{pegawai.pangkatGolongan}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Bergabung {format(pegawai.joinDate, 'MMM yyyy')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${pegawai.isActive ? 'bg-primary-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${pegawai.isActive ? 'text-primary-600' : 'text-red-600'}`}>
                  {pegawai.isActive ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </div>

              <div className="text-xs text-gray-500">
                {Math.round((new Date().getTime() - pegawai.joinDate.getTime()) / (1000 * 60 * 60 * 24 * 365))} tahun
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPegawai.length === 0 && (
        <div className="text-center py-12">
          <UserCheck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Tidak ada pegawai yang ditemukan</p>
          <p className="text-gray-400 text-sm mt-2">Coba sesuaikan pencarian atau filter Anda</p>
        </div>
      )}
    </div>
  );
};