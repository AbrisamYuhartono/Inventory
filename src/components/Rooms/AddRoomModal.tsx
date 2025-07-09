import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Room } from '../../types';

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (room: Omit<Room, 'id'>) => void;
}

export const AddRoomModal: React.FC<AddRoomModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState<Omit<Room, 'id'>>({
    name: '',
    roomCode: '',
    lantai: 0,
    roomType: 'Ruang Kerja',
    description: '',
    picName: '',
    picNip: '',
    picJabatan: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: '',
      roomCode: '',
      lantai: 0,
      roomType: 'Ruang Kerja',
      description: '',
      picName: '',
      picNip: '',
      picJabatan: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Room</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Code</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.roomCode}
              onChange={(e) => setFormData({ ...formData, roomCode: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Floor (Lantai)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.lantai}
              onChange={(e) => setFormData({ ...formData, lantai: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.roomType}
              onChange={(e) =>
                setFormData({ ...formData, roomType: e.target.value as Room['roomType'] })
              }
            >
              <option value="Ruang Koridor">Ruang Koridor</option>
              <option value="Ruang Gudang">Ruang Gudang</option>
              <option value="Ruang Dapur">Ruang Dapur</option>
              <option value="Ruang Toilet/WC">Ruang Toilet/WC</option>
              <option value="Ruang Kerja">Ruang Kerja</option>
              <option value="Ruang Rapat Besar">Ruang Rapat Besar</option>
              <option value="Ruang Rapat Kecil">Ruang Rapat Kecil</option>
              <option value="Ruang Arsip">Ruang Arsip</option>
              <option value="Ruang Musholla">Ruang Musholla</option>
              <option value="Ruang Tamu">Ruang Tamu</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PIC Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.picName}
              onChange={(e) => setFormData({ ...formData, picName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PIC NIP</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.picNip}
              onChange={(e) => setFormData({ ...formData, picNip: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PIC Jabatan</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.picJabatan}
              onChange={(e) => setFormData({ ...formData, picJabatan: e.target.value })}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
