import React, { useState } from 'react';
import { X, Download } from 'lucide-react';
import { format } from 'date-fns';
import { Item, Pegawai } from '../../types';
import { mockPegawai } from '../../data/mockData';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface LendItemModalProps {
  isOpen: boolean;
  item: Item;
  onClose: () => void;
  onLend: (
    itemId: string,
    pegawai: Pegawai,
    notes: string
  ) => void;
}

export const LendItemModal: React.FC<LendItemModalProps> = ({
  isOpen,
  item,
  onClose,
  onLend,
}) => {
  const [selectedPegawai, setSelectedPegawai] = useState<Pegawai | null>(null);
  const [query, setQuery] = useState('');
  const [notes, setNotes] = useState('');

  const filteredPegawai =
    query === ''
      ? mockPegawai
      : mockPegawai.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPegawai) {
      onLend(item.id, selectedPegawai, notes);
      generateLendingDocument(selectedPegawai);
    }
  };

  const generateLendingDocument = async (pegawai: Pegawai) => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('BUKTI PEMINJAMAN BARANG', 20, 30);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(12);
    doc.text('INFORMASI BARANG:', 20, 50);
    doc.text(`Nama Barang: ${item.name}`, 25, 60);
    doc.text(`Serial Number: ${item.serialNumber}`, 25, 70);
    doc.text(`NUP: ${item.nup}`, 25, 80);
    doc.text(`Tahun: ${item.year}`, 25, 90);

    doc.text('INFORMASI PEMINJAM:', 20, 110);
    doc.text(`Nama: ${pegawai.name}`, 25, 120);
    doc.text(`NIP: ${pegawai.nip}`, 25, 130);
    doc.text(`Jabatan: ${pegawai.jabatan}`, 25, 140);
    doc.text(`Pangkat/Golongan: ${pegawai.pangkatGolongan}`, 25, 150);
    doc.text(`Unit: ${pegawai.unit}`, 25, 160);

    doc.text('INFORMASI PEMINJAMAN:', 20, 180);
    doc.text(`Tanggal Pinjam: ${format(new Date(), 'dd/MM/yyyy')}`, 25, 190);
    doc.text(`Catatan: ${notes || '-'}`, 25, 200);

    doc.text('Tanda Tangan Peminjam:', 20, 230);
    doc.text('Tanda Tangan Admin:', 120, 230);
    doc.line(20, 250, 80, 250);
    doc.line(120, 250, 180, 250);

    doc.setFontSize(10);
    doc.text(`Dokumen dibuat pada: ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`, 20, 270);

    doc.save(`Peminjaman_${item.serialNumber}_${format(new Date(), 'yyyyMMdd')}.pdf`);
  };

  const resetForm = () => {
    setSelectedPegawai(null);
    setQuery('');
    setNotes('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Peminjaman Barang</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-600">Serial Number: {item.serialNumber}</p>
            <p className="text-sm text-gray-600">NUP: {item.nup}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Pegawai
              </label>
              <Combobox value={selectedPegawai} onChange={setSelectedPegawai}>
                <div className="relative">
                  <Combobox.Input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    displayValue={(pegawai: Pegawai) => pegawai?.name || ''}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Ketik nama pegawai..."
                    required
                  />
                  <Combobox.Button className="absolute inset-y-0 right-2 flex items-center">
                    <ChevronUpDownIcon className="w-5 h-5 text-gray-500" />
                  </Combobox.Button>

                  {filteredPegawai.length > 0 && (
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border border-gray-200 z-50">
                      {filteredPegawai.map((pegawai) => (
                        <Combobox.Option
                          key={pegawai.id}
                          value={pegawai}
                          className={({ active }) =>
                            `cursor-pointer select-none relative px-4 py-2 ${
                              active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className="block truncate">
                                {pegawai.name} - {pegawai.unit}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 right-4 flex items-center text-blue-600">
                                  <CheckIcon className="w-5 h-5" />
                                </span>
                              )}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  )}
                </div>
              </Combobox>
            </div>

            {selectedPegawai && (
              <div className="bg-gray-50 p-4 rounded-lg border space-y-1 text-sm text-gray-700">
                <p><strong>Nama:</strong> {selectedPegawai.name}</p>
                <p><strong>NIP:</strong> {selectedPegawai.nip}</p>
                <p><strong>Jabatan:</strong> {selectedPegawai.jabatan}</p>
                <p><strong>Pangkat/Golongan:</strong> {selectedPegawai.pangkatGolongan}</p>
                <p><strong>Unit:</strong> {selectedPegawai.unit}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catatan (Opsional)
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Tambahkan catatan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Pinjam & Generate PDF</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
