import React, { useState } from 'react';
import { X, Upload, AlertTriangle } from 'lucide-react';
import { RepairRequest, Item, AuthUser } from '../../types';

interface CreateRepairRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: Omit<RepairRequest, 'id' | 'requestDate' | 'status'>) => void;
  user: AuthUser;
  availableItems: Item[];
}

export const CreateRepairRequestModal: React.FC<CreateRepairRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
  availableItems
}) => {
  const [formData, setFormData] = useState({
    itemId: '',
    damageDescription: '',
    urgencyLevel: 'Medium' as RepairRequest['urgencyLevel'],
    attachments: [] as string[]
  });

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedItem) {
      alert('Harap pilih barang yang akan diperbaiki');
      return;
    }

    const requestData: Omit<RepairRequest, 'id' | 'requestDate' | 'status'> = {
      itemId: formData.itemId,
      itemName: selectedItem.name,
      itemSerialNumber: selectedItem.serialNumber,
      itemNup: selectedItem.nup,
      requesterId: user.id,
      requesterName: user.name,
      requesterNip: user.nip,
      requesterUnit: user.unit,
      damageDescription: formData.damageDescription,
      urgencyLevel: formData.urgencyLevel,
      attachments: formData.attachments
    };

    onSubmit(requestData);
    
    // Reset form
    setFormData({
      itemId: '',
      damageDescription: '',
      urgencyLevel: 'Medium',
      attachments: []
    });
    setSelectedItem(null);
    onClose();
  };

  const handleItemSelect = (itemId: string) => {
    const item = availableItems.find(i => i.id === itemId);
    setSelectedItem(item || null);
    setFormData({ ...formData, itemId });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setFormData({ ...formData, attachments: [...formData.attachments, ...fileNames] });
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index);
    setFormData({ ...formData, attachments: newAttachments });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Ajukan Permintaan Perbaikan</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* User Info (Read-only) */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Informasi Pemohon</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-800"><strong>Nama:</strong> {user.name}</p>
                <p className="text-blue-800"><strong>NIP:</strong> {user.nip}</p>
              </div>
              <div>
                <p className="text-blue-800"><strong>Unit:</strong> {user.unit}</p>
              </div>
            </div>
          </div>

          {/* Item Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pilih Barang yang Rusak
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.itemId}
              onChange={(e) => handleItemSelect(e.target.value)}
            >
              <option value="">-- Pilih Barang --</option>
              {availableItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.serialNumber}) - {item.status}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Item Details */}
          {selectedItem && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Detail Barang</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p><strong>Nama:</strong> {selectedItem.name}</p>
                  <p><strong>Serial Number:</strong> {selectedItem.serialNumber}</p>
                </div>
                <div>
                  <p><strong>NUP:</strong> {selectedItem.nup}</p>
                  <p><strong>Status:</strong> {selectedItem.status}</p>
                </div>
              </div>
            </div>
          )}

          {/* Damage Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Kerusakan
            </label>
            <textarea
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Jelaskan secara detail kerusakan yang terjadi pada barang..."
              value={formData.damageDescription}
              onChange={(e) => setFormData({ ...formData, damageDescription: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">
              Semakin detail deskripsi kerusakan, semakin mudah admin memproses permintaan Anda
            </p>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tingkat Prioritas
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.urgencyLevel}
              onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value as RepairRequest['urgencyLevel'] })}
            >
              <option value="Low">Rendah - Tidak mengganggu pekerjaan</option>
              <option value="Medium">Sedang - Sedikit mengganggu pekerjaan</option>
              <option value="High">Tinggi - Sangat mengganggu pekerjaan</option>
              <option value="Critical">Kritis - Menghentikan pekerjaan</option>
            </select>
          </div>

          {/* File Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lampiran Foto/Dokumen (Opsional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Unggah foto kerusakan atau dokumen pendukung
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                >
                  Pilih File
                </label>
              </div>
            </div>

            {/* Attachment List */}
            {formData.attachments.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">File yang diunggah:</p>
                <div className="space-y-2">
                  {formData.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-700">{attachment}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-amber-800">Perhatian</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Pastikan informasi yang Anda berikan akurat. Permintaan perbaikan akan diproses oleh admin 
                  dan memerlukan persetujuan sebelum dilaksanakan.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ajukan Permintaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};