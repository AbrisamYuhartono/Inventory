import React, { useState } from 'react';
import { X, Download, User } from 'lucide-react';
import { Item } from '../../types';
import { format, addDays } from 'date-fns';

interface LendItemModalProps {
  isOpen: boolean;
  item: Item;
  onClose: () => void;
  onLend: (itemId: string, userName: string, userEmail: string, userDepartment: string, returnDate: Date, notes: string) => void;
}

export const LendItemModal: React.FC<LendItemModalProps> = ({ isOpen, item, onClose, onLend }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userDepartment, setUserDepartment] = useState('');
  const [returnDate, setReturnDate] = useState(format(addDays(new Date(), 7), 'yyyy-MM-dd'));
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLend(item.id, userName, userEmail, userDepartment, new Date(returnDate), notes);
    generateLendingDocument();
  };

  const generateLendingDocument = async () => {
    // Import jsPDF dynamically
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('BUKTI PEMINJAMAN BARANG', 20, 30);
    
    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    // Add content
    doc.setFontSize(12);
    doc.text('INFORMASI BARANG:', 20, 50);
    doc.text(`Nama Barang: ${item.name}`, 25, 60);
    doc.text(`Serial Number: ${item.serialNumber}`, 25, 70);
    doc.text(`NUP: ${item.nup}`, 25, 80);
    doc.text(`Tahun: ${item.year}`, 25, 90);
    
    doc.text('INFORMASI PEMINJAM:', 20, 110);
    doc.text(`Nama: ${userName}`, 25, 120);
    doc.text(`Email: ${userEmail}`, 25, 130);
    doc.text(`Departemen: ${userDepartment}`, 25, 140);
    
    doc.text('INFORMASI PEMINJAMAN:', 20, 160);
    doc.text(`Tanggal Pinjam: ${format(new Date(), 'dd/MM/yyyy')}`, 25, 170);
    doc.text(`Catatan: ${notes || '-'}`, 25, 190);
    
    // Add footer
    doc.text('Tanda Tangan Peminjam:', 20, 220);
    doc.text('Tanda Tangan Admin:', 120, 220);
    
    doc.line(20, 240, 80, 240);
    doc.line(120, 240, 180, 240);
    
    doc.setFontSize(10);
    doc.text(`Dokumen dibuat pada: ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`, 20, 270);
    
    // Save the PDF
    doc.save(`Peminjaman_${item.serialNumber}_${format(new Date(), 'yyyyMMdd')}.pdf`);
  };

  const resetForm = () => {
    setUserName('');
    setUserEmail('');
    setUserDepartment('');
    setReturnDate(format(addDays(new Date(), 7), 'yyyy-MM-dd'));
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
          <h2 className="text-xl font-semibold text-gray-900">Lend Item</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.serialNumber}</p>
            <p className="text-sm text-gray-600">NUP: {item.nup}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-1" />
                User Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter full name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="user@company.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={userDepartment}
                onChange={(e) => setUserDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="Setditjen ILMATE">Setditjen ILMATE</option>
                <option value="Logam">Logam</option>
                <option value="IPAMP">IPAMP</option>
                <option value="IMATAB">IMATAB</option>
                <option value="IET">IET</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Return Date
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Add any notes about this lending..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Lend & Generate PDF</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};