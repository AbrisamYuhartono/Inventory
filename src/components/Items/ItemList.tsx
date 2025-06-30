import React, { useState } from 'react';
import { ItemCard } from './ItemCard';
import { AddItemModal } from './AddItemModal';
import { LendItemModal } from './LendItemModal';
import { mockItems } from '../../data/mockData';
import { Item } from '../../types';
import { Plus, Filter, Search } from 'lucide-react';

export const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLendModalOpen, setIsLendModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddItem = (newItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    const item: Item = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setItems([...items, item]);
  };

  const handleLendItem = (itemId: string, userName: string, userEmail: string, userDepartment: string, returnDate: Date, notes: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, status: 'Lended' as const, updatedAt: new Date() } : item
    ));
    setIsLendModalOpen(false);
    setSelectedItem(null);
  };

  const handleUpdateStatus = (itemId: string, newStatus: Item['status']) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, status: newStatus, updatedAt: new Date() } : item
    ));
  };

  const handleLendClick = (item: Item) => {
    setSelectedItem(item);
    setIsLendModalOpen(true);
  };

  return (
    <div className="p-6 ml-64 bg-cream-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventaris</h1>
            <p className="text-gray-600 mt-2">Kelola barang inventaris Anda</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Tambah Barang</span>
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari barang..."
              className="pl-10 pr-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="all">Semua Status</option>
            <option value="Available">Tersedia</option>
            <option value="Lended">Dipinjam</option>
            <option value="Broken">Rusak</option>
            <option value="Under Repair">Sedang Diperbaiki</option>
            <option value="Disposed">Dibuang</option>
          </select>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6 border border-primary-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary-600">{items.length}</p>
              <p className="text-sm text-gray-600">Total Barang</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-600">{items.filter(i => i.status === 'Available').length}</p>
              <p className="text-sm text-gray-600">Tersedia</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{items.filter(i => i.status === 'Lended').length}</p>
              <p className="text-sm text-gray-600">Dipinjam</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">{items.filter(i => i.status === 'Under Repair').length}</p>
              <p className="text-sm text-gray-600">Sedang Diperbaiki</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-danger-600">{items.filter(i => i.status === 'Broken').length}</p>
              <p className="text-sm text-gray-600">Rusak</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onStatusUpdate={handleUpdateStatus}
            onLend={handleLendClick}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada barang yang ditemukan</p>
          <p className="text-gray-400 text-sm mt-2">Coba sesuaikan pencarian atau filter Anda</p>
        </div>
      )}

      {isAddModalOpen && (
        <AddItemModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddItem}
        />
      )}

      {isLendModalOpen && selectedItem && (
        <LendItemModal
          isOpen={isLendModalOpen}
          item={selectedItem}
          onClose={() => {
            setIsLendModalOpen(false);
            setSelectedItem(null);
          }}
          onLend={handleLendItem}
        />
      )}
    </div>
  );
};