import React, { useState } from 'react';
import { Item, Pegawai } from '../../types';
import { mockItems, mockPegawai } from '../../data/mockData';
import { 
  Package, 
  Search, 
  Filter,
  ArrowLeft,
  User,
  Calendar,
  FileText,
  Wrench
} from 'lucide-react';
import { AuthUser } from '../../types';

interface RequestSelectionPageProps {
  type: 'lending' | 'repair';
  user: AuthUser;
  onBack: () => void;
  onSubmit: (itemId: string, pegawaiId: string, additionalData: any) => void;
}

export const RequestSelectionPage: React.FC<RequestSelectionPageProps> = ({
  type,
  user,
  onBack,
  onSubmit
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedPegawai, setSelectedPegawai] = useState<string>('');
  const [expectedReturnDate, setExpectedReturnDate] = useState('');
  const [notes, setNotes] = useState('');
  const [damageDescription, setDamageDescription] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');

  // Filter items based on type
  const availableItems = type === 'lending' 
    ? mockItems.filter(item => item.status === 'Available')
    : mockItems.filter(item => item.status === 'Available' || item.status === 'Broken');

  // Filter pegawai based on user's unit
  const unitPegawai = mockPegawai.filter(pegawai => 
    pegawai.unit === user.unit && pegawai.isActive
  );

  const filteredItems = availableItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !selectedPegawai) {
      alert('Harap pilih barang dan pegawai');
      return;
    }

    const additionalData = type === 'lending' 
      ? { expectedReturnDate: new Date(expectedReturnDate), notes }
      : { damageDescription, urgencyLevel };

    onSubmit(selectedItem.id, selectedPegawai, additionalData);
  };

  const getDefaultReturnDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // Default 7 days from now
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-primary-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {type === 'lending' ? 'Ajukan Peminjaman' : 'Ajukan Perbaikan'}
              </h1>
              <p className="text-gray-600">
                Pilih barang dan pegawai untuk {type === 'lending' ? 'peminjaman' : 'perbaikan'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Item Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Pilih Barang</h2>
                <div className="relative">
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari barang..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedItem?.id === item.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Package className="h-5 w-5 text-gray-400" />
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.status === 'Available' ? 'bg-primary-100 text-primary-800' :
                            item.status === 'Broken' ? 'bg-danger-100 text-danger-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status === 'Available' ? 'Tersedia' :
                             item.status === 'Broken' ? 'Rusak' : item.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p><strong>Merek:</strong> {item.brand}</p>
                            <p><strong>Model:</strong> {item.model}</p>
                          </div>
                          <div>
                            <p><strong>Serial:</strong> {item.serialNumber}</p>
                            <p><strong>NUP:</strong> {item.nup}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Tidak ada barang yang ditemukan</p>
                </div>
              )}
            </div>
          </div>

          {/* Request Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Detail {type === 'lending' ? 'Peminjaman' : 'Perbaikan'}
              </h2>

              {selectedItem && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-primary-900 mb-2">Barang Dipilih</h3>
                  <p className="text-sm text-primary-800">{selectedItem.name}</p>
                  <p className="text-xs text-primary-600">{selectedItem.serialNumber}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Pilih Pegawai
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={selectedPegawai}
                    onChange={(e) => setSelectedPegawai(e.target.value)}
                  >
                    <option value="">-- Pilih Pegawai --</option>
                    {unitPegawai.map((pegawai) => (
                      <option key={pegawai.id} value={pegawai.id}>
                        {pegawai.name} ({pegawai.nip})
                      </option>
                    ))}
                  </select>
                </div>

                {type === 'lending' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Tanggal Pengembalian
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={expectedReturnDate}
                        onChange={(e) => setExpectedReturnDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        defaultValue={getDefaultReturnDate()}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="h-4 w-4 inline mr-1" />
                        Catatan (Opsional)
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Tujuan penggunaan barang..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Wrench className="h-4 w-4 inline mr-1" />
                        Deskripsi Kerusakan
                      </label>
                      <textarea
                        rows={4}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Jelaskan kerusakan yang terjadi..."
                        value={damageDescription}
                        onChange={(e) => setDamageDescription(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tingkat Prioritas
                      </label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={urgencyLevel}
                        onChange={(e) => setUrgencyLevel(e.target.value as any)}
                      >
                        <option value="Low">Rendah - Tidak mengganggu</option>
                        <option value="Medium">Sedang - Sedikit mengganggu</option>
                        <option value="High">Tinggi - Sangat mengganggu</option>
                        <option value="Critical">Kritis - Menghentikan pekerjaan</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!selectedItem || !selectedPegawai}
                    className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {type === 'lending' ? <FileText className="h-4 w-4" /> : <Wrench className="h-4 w-4" />}
                    <span>
                      {type === 'lending' ? 'Ajukan Peminjaman' : 'Ajukan Perbaikan'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};