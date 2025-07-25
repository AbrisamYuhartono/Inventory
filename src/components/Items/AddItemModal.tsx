import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Item } from '../../types';
import { mockRooms } from '../../data/mockData';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAdd, initialData }) => {
  const [formData, setFormData] = useState<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>(
    initialData || {
      serialNumber: '',
      name: '',
      brand: '',
      model: '',
      description: '',
      category: '',
      nup: '',
      year: new Date().getFullYear(),
      roomId: '',
      status: 'Available',
      qrCode: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      qrCode: `QR_${formData.serialNumber}`,
    });
    setFormData({
      serialNumber: '',
      name: '',
      brand: '',
      model: '',
      description: '',
      category: '',
      nup: '',
      year: new Date().getFullYear(),
      roomId: '',
      status: 'Available',
      qrCode: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Item' : 'Add New Item'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Serial Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.serialNumber}
              onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            />
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* NUP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NUP</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.nup}
              onChange={(e) => setFormData({ ...formData, nup: e.target.value })}
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="number"
              required
              min={2000}
              max={new Date().getFullYear() + 1}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            />
          </div>

          {/* Room ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ruangan</label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.roomId}
              onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
            >
              <option value="">Pilih Ruangan</option>
              {mockRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} - {room.roomType} (Lantai {room.lantai})
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
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
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {initialData ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
