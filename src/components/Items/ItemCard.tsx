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
        return 'bg-green-100 text-green-800';
      case 'Lended':
        return 'bg-blue-100 text-blue-800';
      case 'Broken':
        return 'bg-red-100 text-red-800';
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.serialNumber}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{item.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{item.room}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Added {format(item.createdAt, 'MMM dd, yyyy')}</span>
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
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 text-sm"
          >
            <FileText className="h-4 w-4" />
            <span>Lend</span>
          </button>
        )}
        
        {item.status === 'Lended' && (
          <button
            onClick={() => onStatusUpdate(item.id, 'Available')}
            className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Return
          </button>
        )}
        
        {item.status === 'Broken' && (
          <button
            onClick={() => onStatusUpdate(item.id, 'Available')}
            className="flex-1 bg-amber-600 text-white px-3 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
          >
            Fix
          </button>
        )}
      </div>
    </div>
  );
};