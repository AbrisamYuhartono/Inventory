// AddPegawaiModal.tsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Pegawai } from '../../types';

interface AddPegawaiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (pegawai: Omit<Pegawai, 'id'>) => void;
  onEdit?: (pegawai: Pegawai) => void;
  initialData?: Pegawai;
}

export const AddPegawaiModal: React.FC<AddPegawaiModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  onEdit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Omit<Pegawai, 'id'>>({
    name: '',
    nip: '',
    karpeg: '',
    pangkatGolongan: '',
    jabatan: '',
    unit: 'Setditjen ILMATE',
    isActive: true,
    joinDate: new Date(),
  });

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
    } else {
      setFormData({
        name: '',
        nip: '',
        karpeg: '',
        pangkatGolongan: '',
        jabatan: '',
        unit: 'Setditjen ILMATE',
        isActive: true,
        joinDate: new Date(),
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData&& onEdit) {
      onEdit({ ...formData, id: initialData.id });
    } else {
      onAdd(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Pegawai' : 'Tambah Pegawai'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input
              type="text"
              required
              className="w-full border px-3 py-2 rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NIP</label>
              <input
                type="text"
                required
                className="w-full border px-3 py-2 rounded-lg"
                value={formData.nip}
                onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">KARPEG</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-lg"
                value={formData.karpeg}
                onChange={(e) => setFormData({ ...formData, karpeg: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pangkat / Golongan</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg"
              value={formData.pangkatGolongan}
              onChange={(e) => setFormData({ ...formData, pangkatGolongan: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg"
              value={formData.jabatan}
              onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value as Pegawai['unit'] })}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="Setditjen ILMATE">Setditjen ILMATE</option>
              <option value="Logam">Logam</option>
              <option value="IPAMP">IPAMP</option>
              <option value="IMATAB">IMATAB</option>
              <option value="IET">IET</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Bergabung</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded-lg"
              value={formData.joinDate.toISOString().split('T')[0]}
              onChange={(e) =>
                setFormData({ ...formData, joinDate: new Date(e.target.value) })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              id="isActive"
              className="h-4 w-4"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">
              Pegawai Aktif
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {initialData ? 'Simpan Perubahan' : 'Tambah Pegawai'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
