import React, { useMemo, useState } from 'react';
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
  User,
} from 'lucide-react';
import { ConfirmationModal } from '../Common/ConfirmationModal';

interface MyRequestsPageProps {
  user: AuthUser;
}

export const MyRequestsPage: React.FC<MyRequestsPageProps> = ({ user }) => {
  if (user.id === 'user-1' || user.id === 'user-2') {
    return (
      <div className="p-4 md:p-6 ml-0 md:ml-64">
        <p className="text-gray-600">
          Halaman ini hanya tersedia untuk pengguna unit peminjam (Logam, IPAMP, IMATAB, IET).
        </p>
      </div>
    );
  }

  const [records, setRecords] = useState<LendingRecord[]>(mockLendingRecords);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string>('');

  const userRecords = useMemo(() => {
    return records.filter((r) => r.requestedBy === user.id);
  }, [records, user.id]);

  const getStatusColor = (status: LendingRecord['status']) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Returned': return 'bg-gray-100 text-gray-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Canceled': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: LendingRecord['status']) => {
    switch (status) {
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Approved':
      case 'Active':
      case 'Returned': return <CheckCircle className="h-4 w-4" />;
      case 'Rejected':
      case 'Canceled': return <XCircle className="h-4 w-4" />;
    }
  };

  const handleReturnItem = () => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === selectedRecordId
          ? { ...record, status: 'Returned' as const }
          : record
      )
    );
  };

  const handleCancelRequest = () => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === selectedRecordId
          ? { ...record, status: 'Canceled' as const }
          : record
      )
    );
  };

  const openReturnModal = (recordId: string) => {
    setSelectedRecordId(recordId);
    setShowReturnModal(true);
  };

  const openCancelModal = (recordId: string) => {
    setSelectedRecordId(recordId);
    setShowCancelModal(true);
  };

  const pendingCount = userRecords.filter((r) => r.status === 'Pending').length;
  const activeCount = userRecords.filter((r) => r.status === 'Active').length;
  const returnedCount = userRecords.filter((r) => r.status === 'Returned').length;
  const approvedCount = userRecords.filter((r) => r.status === 'Approved').length;
  const canceledCount = userRecords.filter((r) => r.status === 'Canceled').length;

  return (
    <div className="p-4 md:p-6 ml-0 md:ml-64">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Permintaan Saya</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Kelola permintaan peminjaman barang Anda - Unit {user.unit}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6 mb-6 md:mb-8">
          {[
            { label: 'Total', count: userRecords.length, icon: <FileText className="h-4 md:h-6 w-4 md:w-6 text-blue-600" />, bg: 'bg-blue-50' },
            { label: 'Menunggu', count: pendingCount, icon: <Clock className="h-4 md:h-6 w-4 md:w-6 text-amber-600" />, bg: 'bg-amber-50' },
            { label: 'Disetujui', count: approvedCount, icon: <CheckCircle className="h-4 md:h-6 w-4 md:w-6 text-blue-600" />, bg: 'bg-blue-50' },
            { label: 'Dipinjam', count: activeCount, icon: <Package className="h-4 md:h-6 w-4 md:w-6 text-green-600" />, bg: 'bg-green-50' },
            { label: 'Dikembalikan', count: returnedCount, icon: <CheckCircle className="h-4 md:h-6 w-4 md:w-6 text-gray-600" />, bg: 'bg-gray-50' },
            { label: 'Dibatalkan', count: canceledCount, icon: <XCircle className="h-4 md:h-6 w-4 md:w-6 text-yellow-600" />, bg: 'bg-yellow-50' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-xl md:text-3xl font-bold mt-1 md:mt-2">{stat.count}</p>
                </div>
                <div className={`p-2 md:p-3 rounded-lg ${stat.bg}`}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Riwayat Permintaan</h2>
            <div className="text-xs md:text-sm text-gray-500">
              Unit: <span className="font-medium text-blue-600">{user.unit}</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {userRecords.length === 0 ? (
            <div className="p-8 md:p-12 text-center">
              <FileText className="h-8 md:h-12 w-8 md:w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-base md:text-lg">Belum ada permintaan peminjaman</p>
              <p className="text-gray-400 text-xs md:text-sm mt-2">
                Ajukan permintaan peminjaman barang inventaris dari dashboard
              </p>
            </div>
          ) : (
            userRecords.map((record) => (
              <div key={record.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div className="flex items-center space-x-3 mb-2 md:mb-0">
                    <Package className="h-4 md:h-5 w-4 md:w-5 text-gray-400 flex-shrink-0" />
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">{record.itemName}</h3>
                    <span className="text-xs md:text-sm text-gray-500">({record.itemSerialNumber})</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      <span>
                        {{
                          'Pending': 'Menunggu Persetujuan',
                          'Approved': 'Disetujui',
                          'Active': 'Sedang Dipinjam',
                          'Returned': 'Dikembalikan',
                          'Rejected': 'Ditolak',
                          'Canceled': 'Dibatalkan',
                        }[record.status]}
                      </span>
                    </span>

                    {record.status === 'Active' && (
                      <button
                        onClick={() => openReturnModal(record.id)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-xs md:text-sm"
                      >
                        Kembalikan
                      </button>
                    )}

                    {record.status === 'Pending' && (
                      <button
                        onClick={() => openCancelModal(record.id)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors text-xs md:text-sm"
                      >
                        Batalkan
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-xs md:text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 md:h-4 w-3 md:w-4 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{record.pegawaiName}</p>
                      <p className="text-xs">NIP: {record.pegawaiNip}</p>
                      <p className="text-xs">{record.pegawaiUnit}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3 md:h-4 w-3 md:w-4 flex-shrink-0" />
                    <div>
                      <p>Tanggal: {format(record.requestDate, 'dd/MM/yyyy')}</p>
                      <p>Kembali: {format(record.expectedReturnDate, 'dd/MM/yyyy')}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FileText className="h-3 md:h-4 w-3 md:w-4 flex-shrink-0" />
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
                    <p className="text-xs md:text-sm text-blue-800">
                      <strong>Catatan:</strong> {record.notes}
                    </p>
                  </div>
                )}

                {record.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                    <p className="text-xs md:text-sm text-red-800">
                      <strong>Alasan Penolakan:</strong> {record.rejectionReason}
                    </p>
                  </div>
                )}

                {record.status === 'Approved' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                    <p className="text-xs md:text-sm text-green-800">
                      <strong>Status:</strong> Permintaan telah disetujui. Silakan ambil barang di lokasi yang telah ditentukan.
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        onConfirm={handleReturnItem}
        title="Konfirmasi Pengembalian"
        message="Apakah Anda yakin ingin menandai barang ini sebagai dikembalikan?"
        confirmText="Ya, Kembalikan"
        cancelText="Batal"
        type="info"
      />

      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelRequest}
        title="Konfirmasi Pembatalan"
        message="Apakah Anda yakin ingin membatalkan permintaan peminjaman ini?"
        confirmText="Ya, Batalkan"
        cancelText="Tidak"
        type="danger"
      />
    </div>
  );
};