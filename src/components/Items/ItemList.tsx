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
  const [editingItem, setEditingItem] = useState<Item | null>(null);
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
      id: editingItem ? editingItem.id : Date.now().toString(),
      createdAt: editingItem ? editingItem.createdAt : new Date(),
      updatedAt: new Date(),
    };

    if (editingItem) {
      setItems(prev => prev.map(i => (i.id === editingItem.id ? item : i)));
    } else {
      setItems(prev => [...prev, item]);
    }

    setIsAddModalOpen(false);
    setEditingItem(null);
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

  const handleEditClick = (item: Item) => {
    setEditingItem(item);
    setIsAddModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6 ml-0 md:ml-64 bg-cream-50 min-h-screen">
      {/* Header and Filters */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Inventaris</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">Kelola barang inventaris Anda</p>
          </div>
          <button
            onClick={() => {
              setEditingItem(null);
              setIsAddModalOpen(true);
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2 shadow-lg"
          >
            <Plus className="h-4 md:h-5 w-4 md:w-5" />
            <span className="text-sm md:text-base">Tambah Barang</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-6">
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
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onStatusUpdate={handleUpdateStatus}
            onLend={handleLendClick}
            onEdit={handleEditClick}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <p className="text-gray-500 text-base md:text-lg">Tidak ada barang yang ditemukan</p>
          <p className="text-gray-400 text-xs md:text-sm mt-2">Coba sesuaikan pencarian atau filter Anda</p>
        </div>
      )}

      {isAddModalOpen && (
        <AddItemModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingItem(null);
          }}
          onAdd={handleAddItem}
          initialData={editingItem || undefined}
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