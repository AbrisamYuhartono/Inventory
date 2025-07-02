import React, { useState } from 'react';
import { LendingRecord } from '../../types';
import { mockLendingRequests } from '../../data/mockData';
import { format } from 'date-fns';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Package, 
  Calendar,
  FileText,
  Plus
} from 'lucide-react';
import { AuthUser } from '../../types';

interface MyRequestsPageProps {
  user: AuthUser;
}

export const MyRequestsPage: React.FC<MyRequestsPageProps> = ({ user }) => {
  const [records] = useState<LendingRecord[]>(
    mockLendingRequests.filter(r => r.borrowerId === user.id)
  );

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
        return <CheckCircle className="h-4 w-4" />;
      case 'Returned':
        return <CheckCircle className="h-4 w-4" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4" />;
    }
  };

  const pendingCount = records.filter(r => r.status === 'Pending').length;
  const activeCount = records.filter(r => r.status === 'Active').length;
  const returnedCount = records.filter(r => r.status === 'Returned').length;

  return (
    <div className="p-6 ml-64">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Permintaan Saya</h1>
            <p className="text-gray-600 mt-2">Kelola permintaan peminjaman barang Anda</p>
          </div>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Ajukan Peminjaman</span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Permintaan</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{records.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Menunggu Persetujuan</p>
                <p className="text-3xl font-bold text-amber-600 mt-2">{pendingCount}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sedang Dipinjam</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{activeCount}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Telah Dikembalikan</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{returnedCount}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Riwayat Permintaan</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {records.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Belum ada permintaan peminjaman</p>
              <p className="text-gray-400 text-sm mt-2">Ajukan permintaan peminjaman barang inventaris</p>
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
                        <span>{record.status === 'Pending' ? 'Menunggu Persetujuan' : 
                               record.status === 'Approved' ? 'Disetujui' :
                               record.status === 'Active' ? 'Sedang Dipinjam' :
                               record.status === 'Returned' ? 'Dikembalikan' : 'Ditolak'}</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <p>Tanggal Pinjam: {format(record.lendDate, 'dd/MM/yyyy')}</p>
                          <p>Tanggal Kembali: {format(record.expectedReturnDate, 'dd/MM/yyyy')}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <div>
                          <p>NUP: {record.itemNup}</p>
                          {record.approverName && (
                            <p className="text-xs">Disetujui oleh: {record.approverName}</p>
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

                    {record.actualReturnDate && (
                      <div className="text-sm text-green-600">
                        Dikembalikan pada {format(record.actualReturnDate, 'dd/MM/yyyy')}
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