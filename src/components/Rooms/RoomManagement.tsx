import React, { useState } from 'react';
import { Room } from '../../types';
import { mockRooms } from '../../data/mockData';
import { 
  Building, 
  Plus, 
  Search, 
  MapPin, 
  Package,
  Users,
  Edit3,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { AddRoomModal } from './AddRoomModal';

export const RoomManagement: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [buildingFilter, setBuildingFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const buildings = Array.from(new Set(rooms.map(room => room.building).filter(Boolean)));

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBuilding = buildingFilter === 'all' || room.building === buildingFilter;
    return matchesSearch && matchesBuilding;
  });

  const handleAddRoom = (newRoom: Omit<Room, 'id'>) => {
    const room: Room = {
      ...newRoom,
      id: Date.now().toString()
    };
    setRooms([...rooms, room]);
  };

  const handleDeleteRoom = (roomId: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(rooms.filter(room => room.id !== roomId));
    }
  };

  const totalItems = rooms.reduce((sum, room) => sum + room.itemCount, 0);
  const totalCapacity = rooms.reduce((sum, room) => sum + (room.capacity || 0), 0);
  const averageUtilization = rooms.length > 0 
    ? Math.round((totalItems / totalCapacity) * 100) 
    : 0;

  return (
    <div className="p-6 ml-64">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
            <p className="text-gray-600 mt-2">Manage rooms and locations</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Room</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{rooms.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{totalItems}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Capacity</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{totalCapacity}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Utilization</p>
                <p className="text-3xl font-bold text-amber-600 mt-2">{averageUtilization}%</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <MapPin className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search rooms..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={buildingFilter}
            onChange={(e) => setBuildingFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Buildings</option>
            {buildings.map((building) => (
              <option key={building} value={building}>{building}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => {
          const utilization = room.capacity ? Math.round((room.itemCount / room.capacity) * 100) : 0;
          
          return (
            <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{room.name}</h3>
                    <p className="text-sm text-gray-500">{room.building}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{room.description}</p>

              <div className="space-y-3 mb-4">
                {room.floor !== undefined && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Floor</span>
                    <span className="font-medium text-gray-900">{room.floor}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Items</span>
                  <span className="font-medium text-gray-900">{room.itemCount}</span>
                </div>
                
                {room.capacity && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Capacity</span>
                    <span className="font-medium text-gray-900">{room.capacity}</span>
                  </div>
                )}
                
                {room.capacity && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Utilization</span>
                      <span className={`font-medium ${
                        utilization > 80 ? 'text-red-600' : 
                        utilization > 60 ? 'text-amber-600' : 'text-green-600'
                      }`}>
                        {utilization}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          utilization > 80 ? 'bg-red-500' : 
                          utilization > 60 ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(utilization, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1 text-sm">
                  <Edit3 className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No rooms found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {isAddModalOpen && (
        <AddRoomModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddRoom}
        />
      )}
    </div>
  );
};