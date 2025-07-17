import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Room } from '../../types';
import { picOptions, PICData } from '../../data/picData';

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (room: Omit<Room, 'id'>) => void;
  onEdit?: (room: Room) => void;
  initialData?: Room;
}

export const AddRoomModal: React.FC<AddRoomModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  onEdit,
  initialData
}) => {
  const [formData, setFormData] = useState<Omit<Room, 'id'>>({
    name: '',
    roomCode: '',
    lantai: 0,
    roomType: 'Ruang Kerja',
    description: '',
    picName: '',
    picNip: '',
    picJabatan: ''
  });

  const [selectedPIC, setSelectedPIC] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
      // Find matching PIC
      const matchingPIC = picOptions.find(pic => pic.nip === rest.picNip);
      setSelectedPIC(matchingPIC?.id || '');
    } else {
      setFormData({
        name: '',
        roomCode: '',
        lantai: 0,
        roomType: 'Ruang Kerja',
        description: '',
        picName: '',
        picNip: '',
        picJabatan: ''
      });
      setSelectedPIC('');
    }
  }, [initialData]);

  const handlePICChange = (picId: string) => {
    setSelectedPIC(picId);
    const selectedPICData = picOptions.find(pic => pic.id === picId);
    if (selectedPICData) {
      setFormData({
        ...formData,
        picName: selectedPICData.name,
        picNip: selectedPICData.nip,
        picJabatan: selectedPICData.jabatan
      });
    } else {
      setFormData({
        ...formData,
        picName: '',
        picNip: '',
        picJabatan: ''
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData && onEdit) {
      onEdit({ ...initialData, ...formData });
    } else {
      onAdd(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Ruangan' : 'Tambah Ruangan Baru'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
          {/* Room Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ruangan</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Room Code and Floor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kode Ruangan</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                value={formData.roomCode}
                onChange={(e) => setFormData({ ...formData, roomCode: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lantai</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                value={formData.lantai}
                onChange={(e) => setFormData({ ...formData, lantai: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Ruangan</label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              value={formData.roomType}
              onChange={(e) => setFormData({ ...formData, roomType: e.target.value as Room['roomType'] })}
            >
              <option value="Ruang Kerja">Ruang Kerja</option>
              <option value="Ruang Rapat Besar">Ruang Rapat Besar</option>
              <option value="Ruang Rapat Kecil">Ruang Rapat Kecil</option>
              <option value="Ruang Gudang">Ruang Gudang</option>
              <option value="Ruang Koridor">Ruang Koridor</option>
              <option value="Ruang Toilet/WC">Ruang Toilet/WC</option>
              <option value="Ruang Arsip">Ruang Arsip</option>
              <option value="Ruang Musholla">Ruang Musholla</option>
              <option value="Ruang Dapur">Ruang Dapur</option>
              <option value="Ruang Tamu">Ruang Tamu</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* PIC Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PIC (Person in Charge)</label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              value={selectedPIC}
              onChange={(e) => handlePICChange(e.target.value)}
            >
              <option value="">-- Pilih PIC --</option>
              {picOptions.map((pic) => (
                <option key={pic.id} value={pic.id}>
                  {pic.name} - {pic.jabatan}
                </option>
              ))}
            </select>
          </div>

          {/* PIC Details (Auto-filled) */}
          {selectedPIC && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Detail PIC</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-800"><strong>Nama:</strong> {formData.picName}</p>
                  <p className="text-blue-800"><strong>NIP:</strong> {formData.picNip}</p>
                </div>
                <div>
                  <p className="text-blue-800"><strong>Jabatan:</strong> {formData.picJabatan}</p>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {initialData ? 'Simpan Perubahan' : 'Tambah Ruangan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};