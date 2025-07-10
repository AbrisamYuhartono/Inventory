import React, { useMemo } from 'react';
import { LendingRecord, AuthUser } from '../../types';
import { mockLendingRecords } from '../../data/mockData';
import { format } from 'date-fns';
import {
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Calendar,
  FileText,
  User
} from 'lucide-react';

interface MyRequestsPageProps {
  user: AuthUser;
}

export const MyRequestsPage: React.FC<MyRequestsPageProps> = ({ user }) => {
  // Optional role check — block admin/superadmin
  if (user.id === 'user-1' || user.id === 'user-2') {
    return (
      <div className="p-6 ml-64">
        <p className="text-gray-600">
          Halaman ini hanya tersedia untuk pengguna unit peminjam (Logam, IPAMP, IMATAB, IET).
        </p>
      </div>
    );
  }

  // Filter records that belong to the current user
  const records = useMemo(() => {
    return mockLendingRecords.filter(r => r.requestedBy === user.id);
  }, [user.id]);

  const getStatusColor = (status: LendingRecord['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Approved':
        return 'bg-blue-100 text-blue-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Returned':
        return 'bg-gray-100 text-gray-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: LendingRecord['status']) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Approved':
      case 'Active':
      case 'Returned':
        return <CheckCircle className="h-4 w-4" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4" />;
    }
  };

  const pendingCount = records.filter(r => r.status === 'Pending').length;
  const activeCount = records.filter(r => r.status === 'Active').length;
  const returnedCount = records.filter(r => r.status === 'Returned').length;
  const approvedCount = records.filter(r => r.status === 'Approved').length;
  const rejectedCount = records.filter(r => r.status === 'Rejected').length;

  return (
    <div className="p-6 ml-64">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Permintaan Saya</h1>
            <p className="text-gray-600 mt-2">
              Kelola permintaan peminjaman barang Anda - Unit {user.unit}
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {[
            { label: 'Total Permintaan', count: records.length, icon: <FileText className="h-6 w-6 text-blue-600" />, bg: 'bg-blue-50' },
            { label: 'Menunggu Persetujuan', count: pendingCount, icon: <Clock className="h-6 w-6 text-amber-600" />, bg: 'bg-amber-50' },
            { label: 'Disetujui', count: approvedCount, icon: <CheckCircle className="h-6 w-6 text-blue-600" />, bg: 'bg-blue-50' },
            { label: 'Sedang Dipinjam', count: activeCount, icon: <Package className="h-6 w-6 text-green-600" />, bg: 'bg-green-50' },
            { label: 'Telah Dikembalikan', count: returnedCount, icon: <CheckCircle className="h-6 w-6 text-gray-600" />, bg: 'bg-gray-50' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.count}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Riwayat Permintaan</h2>
            <div className="text-sm text-gray-500">
              Unit: <span className="font-medium text-blue-600">{user.unit}</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {records.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Belum ada permintaan peminjaman</p>
              <p className="text-gray-400 text-sm mt-2">
                Ajukan permintaan peminjaman barang inventaris dari dashboard
              </p>
            </div>
          ) : (
            records.map((record) => (
              <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Package className="h-5 w-5 text-gray-400" />
                      <h3 className="font-semibold text-gray-900">{record.itemName}</h3>
                      <span className="text-sm text-gray-500">({record.itemSerialNumber})</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        <span>
                          {record.status === 'Pending' ? 'Menunggu Persetujuan' :
                           record.status === 'Approved' ? 'Disetujui' :
                           record.status === 'Active' ? 'Sedang Dipinjam' :
                           record.status === 'Returned' ? 'Dikembalikan' : 'Ditolak'}
                        </span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{record.pegawaiName}</p>
                          <p className="text-xs">NIP: {record.pegawaiNip}</p>
                          <p className="text-xs">{record.pegawaiUnit}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <p>Tanggal Permintaan: {format(record.requestDate, 'dd/MM/yyyy')}</p>
                          <p>Tanggal Kembali: {format(record.expectedReturnDate, 'dd/MM/yyyy')}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <div>
                          <p>NUP: {record.itemNup}</p>
                          {record.approvedBy && (
                            <p className="text-xs">Disetujui oleh: {record.approvedBy}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {record.notes && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <p className="text-sm text-blue-800">
                          <strong>Catatan:</strong> {record.notes}
                        </p>
                      </div>
                    )}

                    {record.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                        <p className="text-sm text-red-800">
                          <strong>Alasan Penolakan:</strong> {record.rejectionReason}
                        </p>
                      </div>
                    )}

                    {record.status === 'Approved' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                        <p className="text-sm text-green-800">
                          <strong>Status:</strong> Permintaan telah disetujui. Silakan ambil barang di lokasi yang telah ditentukan.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
