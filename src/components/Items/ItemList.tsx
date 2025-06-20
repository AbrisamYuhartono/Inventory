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
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = Array.from(new Set(items.map(item => item.category)));

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
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
    <div className="p-6 ml-64">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Items</h1>
            <p className="text-gray-600 mt-2">Manage your inventory items</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search items..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="Lended">Lended</option>
            <option value="Broken">Broken</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{items.length}</p>
              <p className="text-sm text-gray-600">Total Items</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{items.filter(i => i.status === 'Available').length}</p>
              <p className="text-sm text-gray-600">Available</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">{items.filter(i => i.status === 'Lended').length}</p>
              <p className="text-sm text-gray-600">Lended</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{items.filter(i => i.status === 'Broken').length}</p>
              <p className="text-sm text-gray-600">Broken</p>
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
          <p className="text-gray-500 text-lg">No items found matching your criteria</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
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