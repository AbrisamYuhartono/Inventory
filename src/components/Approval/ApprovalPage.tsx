import React, { useState } from 'react';
import { LendingRecord } from '../../types';
import { mockLendingRequests } from '../../data/mockData';
import { format } from 'date-fns';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Package, 
  User, 
  Calendar,
  FileText,
  AlertCircle
} from 'lucide-react';

export const ApprovalPage: React.FC = () => {
  const [records, setRecords] = useState<LendingRecord[]>(mockLendingRequests);
  const [selectedRecord, setSelectedRecord] = useState<LendingRecord | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const pendingRecords = records.filter(r => r.status === 'Pending');

  const handleApprove = (recordId: string) => {
    setRecords(records.map(record => 
      record.id === recordId 
        ? { 
            ...record, 
            status: 'Approved' as const,
            approvedBy: '2', // Current admin user
            approverName: 'Ahmad Wijaya'
          }
        : record
    ));
  };

  const handleReject = (recordId: string, reason: string) => {
    setRecords(records.map(record => 
      record.id === recordId 
        ? { 
            ...record, 
            status: 'Rejected' as const,
            rejectionReason: reason,
            approvedBy: '2',
            approverName: 'Ahmad Wijaya'
          }
        : record
    ));
    setShowRejectModal(false);
    setSelectedRecord(null);
    setRejectionReason('');
  };

  const openRejectModal = (record: LendingRecord) => {
    setSelectedRecord(record);
    setShowRejectModal(true);
  };

  return (
    <div className="p-6 ml-64">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Persetujuan Peminjaman</h1>
        <p className="text-gray-600 mt-2">Kelola permintaan peminjaman barang inventaris</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Menunggu Persetujuan</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">{pendingRecords.length}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Disetujui Hari Ini</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {records.filter(r => r.status === 'Approved' && 
                  r.lendDate.toDateString() === new Date().toDateString()).length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ditolak Hari Ini</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {records.filter(r => r.status === 'Rejected' && 
                  r.lendDate.toDateString() === new Date().toDateString()).length}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Permintaan Menunggu Persetujuan</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {pendingRecords.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada permintaan yang menunggu persetujuan</p>
              <p className="text-gray-400 text-sm mt-2">Semua permintaan telah diproses</p>
            </div>
          ) : (
            pendingRecords.map((record) => (
              <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Package className="h-5 w-5 text-gray-400" />
                      <h3 className="font-semibold text-gray-900">{record.itemName}</h3>
                      <span className="text-sm text-gray-500">({record.itemSerialNumber})</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                        Menunggu Persetujuan
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{record.borrowerName}</p>
                          <p className="text-xs">NIP: {record.borrowerNip}</p>
                          <p className="text-xs">{record.borrowerUnit}</p>
                        </div>
                      </div>
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
                          <p className="text-xs">Serial: {record.itemSerialNumber}</p>
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
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleApprove(record.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Setujui</span>
                    </button>
                    
                    <button
                      onClick={() => openRejectModal(record)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Tolak</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Tolak Permintaan</h2>
              <button 
                onClick={() => setShowRejectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <p className="text-red-800 font-medium">
                    Anda akan menolak permintaan peminjaman {selectedRecord.itemName}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alasan Penolakan
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Masukkan alasan penolakan..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleReject(selectedRecord.id, rejectionReason)}
                  disabled={!rejectionReason.trim()}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tolak Permintaan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};