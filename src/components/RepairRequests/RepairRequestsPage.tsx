import React, { useState } from 'react';
import { RepairRequest } from '../../types';
import { mockRepairRequests, mockItems } from '../../data/mockData';
import { format } from 'date-fns';
import { 
  Wrench, 
  Plus, 
  Search, 
  Filter,
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Package,
  User,
  Calendar,
  FileText,
  DollarSign,
  Phone,
  Building
} from 'lucide-react';
import { AuthUser } from '../../types';
import { CreateRepairRequestModal } from './CreateRepairRequestModal';

interface RepairRequestsPageProps {
  user: AuthUser;
}

export const RepairRequestsPage: React.FC<RepairRequestsPageProps> = ({ user }) => {
  const [requests, setRequests] = useState<RepairRequest[]>(mockRepairRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RepairRequest | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Filter requests based on user role
  const userRequests = user.role === 'User' 
    ? requests.filter(r => r.requesterId === user.id)
    : requests;

  const filteredRequests = userRequests.filter(request => {
    const matchesSearch = request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.itemSerialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requesterName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || request.urgencyLevel === urgencyFilter;
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const getStatusColor = (status: RepairRequest['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Approved':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: RepairRequest['status']) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Approved':
      case 'In Progress':
        return <Wrench className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency: RepairRequest['urgencyLevel']) => {
    switch (urgency) {
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
    }
  };

  const handleCreateRequest = (requestData: Omit<RepairRequest, 'id' | 'requestDate' | 'status'>) => {
    const newRequest: RepairRequest = {
      ...requestData,
      id: Date.now().toString(),
      requestDate: new Date(),
      status: 'Pending'
    };
    setRequests([newRequest, ...requests]);
  };

  const handleApproveRequest = (requestId: string, repairNotes: string, estimatedCost: number, vendorName: string, vendorContact: string) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: 'In Progress' as const,
            approvedBy: user.id,
            approverName: user.name,
            repairNotes,
            estimatedCost,
            vendorName,
            vendorContact,
            repairStartDate: new Date()
          }
        : request
    ));
    setShowApprovalModal(false);
    setSelectedRequest(null);
  };

  const handleRejectRequest = (requestId: string, reason: string) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: 'Rejected' as const,
            approvedBy: user.id,
            approverName: user.name,
            rejectionReason: reason
          }
        : request
    ));
    setShowApprovalModal(false);
    setSelectedRequest(null);
    setRejectionReason('');
  };

  const handleCompleteRepair = (requestId: string, actualCost: number) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: 'Completed' as const,
            actualCost,
            repairCompletionDate: new Date()
          }
        : request
    ));
  };

  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const inProgressCount = requests.filter(r => r.status === 'In Progress').length;
  const completedCount = requests.filter(r => r.status === 'Completed').length;

  return (
    <div className="p-6 ml-64">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user.role === 'User' ? 'Permintaan Perbaikan Saya' : 'Manajemen Perbaikan Barang'}
            </h1>
            <p className="text-gray-600 mt-2">
              {user.role === 'User' 
                ? 'Kelola permintaan perbaikan barang yang Anda ajukan'
                : 'Kelola semua permintaan perbaikan barang inventaris'
              }
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Permintaan</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{userRequests.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Wrench className="h-6 w-6 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">Sedang Diperbaiki</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{inProgressCount}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Wrench className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Selesai</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{completedCount}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
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
              placeholder="Cari permintaan perbaikan..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Semua Status</option>
            <option value="Pending">Menunggu Persetujuan</option>
            <option value="Approved">Disetujui</option>
            <option value="In Progress">Sedang Diperbaiki</option>
            <option value="Completed">Selesai</option>
            <option value="Rejected">Ditolak</option>
          </select>

          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Semua Prioritas</option>
            <option value="Low">Rendah</option>
            <option value="Medium">Sedang</option>
            <option value="High">Tinggi</option>
            <option value="Critical">Kritis</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Permintaan Perbaikan</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredRequests.length === 0 ? (
            <div className="p-12 text-center">
              <Wrench className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada permintaan perbaikan</p>
              <p className="text-gray-400 text-sm mt-2">
                {user.role === 'User' 
                  ? 'Ajukan permintaan perbaikan untuk barang yang rusak'
                  : 'Permintaan perbaikan akan muncul di sini'
                }
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Package className="h-5 w-5 text-gray-400" />
                      <h3 className="font-semibold text-gray-900">{request.itemName}</h3>
                      <span className="text-sm text-gray-500">({request.itemSerialNumber})</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span>{request.status === 'Pending' ? 'Menunggu Persetujuan' : 
                               request.status === 'Approved' ? 'Disetujui' :
                               request.status === 'In Progress' ? 'Sedang Diperbaiki' :
                               request.status === 'Completed' ? 'Selesai' : 'Ditolak'}</span>
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(request.urgencyLevel)}`}>
                        {request.urgencyLevel === 'Low' ? 'Rendah' :
                         request.urgencyLevel === 'Medium' ? 'Sedang' :
                         request.urgencyLevel === 'High' ? 'Tinggi' : 'Kritis'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{request.requesterName}</p>
                          <p className="text-xs">NIP: {request.requesterNip}</p>
                          <p className="text-xs">{request.requesterUnit}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <p>Tanggal Permintaan: {format(request.requestDate, 'dd/MM/yyyy')}</p>
                          <p>NUP: {request.itemNup}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-800">
                        <strong>Deskripsi Kerusakan:</strong> {request.damageDescription}
                      </p>
                    </div>

                    {request.repairNotes && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <p className="text-sm text-blue-800">
                          <strong>Catatan Perbaikan:</strong> {request.repairNotes}
                        </p>
                      </div>
                    )}

                    {request.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                        <p className="text-sm text-red-800">
                          <strong>Alasan Penolakan:</strong> {request.rejectionReason}
                        </p>
                      </div>
                    )}

                    {(request.estimatedCost || request.actualCost) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        {request.estimatedCost && (
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4" />
                            <span>Estimasi Biaya: Rp {request.estimatedCost.toLocaleString('id-ID')}</span>
                          </div>
                        )}
                        {request.actualCost && (
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4" />
                            <span>Biaya Aktual: Rp {request.actualCost.toLocaleString('id-ID')}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {request.vendorName && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4" />
                          <span>Vendor: {request.vendorName}</span>
                        </div>
                        {request.vendorContact && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>Kontak: {request.vendorContact}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {request.repairCompletionDate && (
                      <div className="text-sm text-green-600">
                        Selesai pada {format(request.repairCompletionDate, 'dd/MM/yyyy')}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons for Admin */}
                  {user.role !== 'User' && request.status === 'Pending' && (
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowApprovalModal(true);
                        }}
                        className="bg-gradient-to-r from-green-500 to-lime-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Proses</span>
                      </button>
                    </div>
                  )}

                  {user.role !== 'User' && request.status === 'In Progress' && (
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => {
                          const actualCost = prompt('Masukkan biaya aktual perbaikan (Rp):');
                          if (actualCost) {
                            handleCompleteRepair(request.id, parseInt(actualCost.replace(/\D/g, '')));
                          }
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Selesai</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Repair Request Modal */}
      {isCreateModalOpen && (
        <CreateRepairRequestModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateRequest}
          user={user}
          availableItems={mockItems.filter(item => item.status === 'Broken' || item.status === 'Available')}
        />
      )}

      {/* Approval Modal */}
      {showApprovalModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Proses Permintaan Perbaikan</h2>
              <button 
                onClick={() => setShowApprovalModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-2">{selectedRequest.itemName}</h3>
                <p className="text-sm text-gray-600 mb-2">Serial: {selectedRequest.itemSerialNumber}</p>
                <p className="text-sm text-gray-800">
                  <strong>Kerusakan:</strong> {selectedRequest.damageDescription}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catatan Perbaikan
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan catatan perbaikan..."
                    id="repairNotes"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimasi Biaya (Rp)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      id="estimatedCost"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alasan Penolakan (jika ditolak)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Masukkan alasan penolakan..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-6">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    if (rejectionReason.trim()) {
                      handleRejectRequest(selectedRequest.id, rejectionReason);
                    }
                  }}
                  disabled={!rejectionReason.trim()}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tolak
                </button>
                <button
                  onClick={() => {
                    const repairNotes = (document.getElementById('repairNotes') as HTMLTextAreaElement).value;
                    const estimatedCost = parseInt((document.getElementById('estimatedCost') as HTMLInputElement).value) || 0;
                    const vendorName = (document.getElementById('vendorName') as HTMLInputElement).value;
                    const vendorContact = (document.getElementById('vendorContact') as HTMLInputElement).value;
                    
                    if (repairNotes.trim() && vendorName.trim()) {
                      handleApproveRequest(selectedRequest.id, repairNotes, estimatedCost, vendorName, vendorContact);
                    } else {
                      alert('Harap isi catatan perbaikan dan nama vendor');
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Setujui & Proses
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};