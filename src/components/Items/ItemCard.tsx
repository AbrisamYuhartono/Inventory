import React from 'react';
import { Item } from '../../types';
import { Package, MapPin, Calendar, QrCode, Edit3, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface ItemCardProps {
  item: Item;
  onStatusUpdate: (itemId: string, newStatus: Item['status']) => void;
  onLend: (item: Item) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onStatusUpdate, onLend }) => {
  const getStatusColor = (status: Item['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-primary-100 text-primary-800';
      case 'Lended':
        return 'bg-blue-100 text-blue-800';
      case 'Broken':
        return 'bg-danger-100 text-danger-800';
      case 'Under Repair':
        return 'bg-amber-100 text-amber-800';
      case 'Disposed':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Item['status']) => {
    switch (status) {
      case 'Available':
        return 'Tersedia';
      case 'Lended':
        return 'Dipinjam';
      case 'Broken':
        return 'Rusak';
      case 'Under Repair':
        return 'Sedang Diperbaiki';
      case 'Disposed':
        return 'Dibuang';
    }
  };

  const generateQRCode = async () => {
    // This would integrate with the QR code generation functionality
    const QRCode = await import('qrcode');
    try {
      const qrCodeUrl = await QRCode.toDataURL(`ITEM_${item.id}_${item.serialNumber}`);
      
      // Create and download the QR code
      const link = document.createElement('a');
      link.download = `QR_${item.serialNumber}.png`;
      link.href = qrCodeUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Package className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.serialNumber}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
          {getStatusText(item.status)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span><strong>NUP:</strong> {item.nup}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span><strong>Tahun:</strong> {item.year}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Ditambahkan {format(item.createdAt, 'dd MMM yyyy')}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={generateQRCode}
          className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1 text-sm"
        >
          <QrCode className="h-4 w-4" />
          <span>QR Code</span>
        </button>
        
        {item.status === 'Available' && (
          <button
            onClick={() => onLend(item)}
            className="flex-1 bg-primary-500 text-white px-3 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-1 text-sm shadow-sm"
          >
            <FileText className="h-4 w-4" />
            <span>Pinjam</span>
          </button>
        )}
        
        {item.status === 'Lended' && (
          <button
            onClick={() => onStatusUpdate(item.id, 'Available')}
            className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm shadow-sm"
          >
            Kembalikan
          </button>
        )}
        
        {item.status === 'Broken' && (
          <button
            onClick={() => onStatusUpdate(item.id, 'Available')}
            className="flex-1 bg-amber-500 text-white px-3 py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm shadow-sm"
          >
            Perbaiki
          </button>
        )}
      </div>
    </div>
  );
};