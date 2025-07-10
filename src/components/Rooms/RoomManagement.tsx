import React, { useState } from 'react';
import { Room } from '../../types';
import { mockRooms } from '../../data/mockData';
import {
  Building,
  Plus,
  Search,
  Edit3,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { AddRoomModal } from './AddRoomModal';

export const RoomManagement: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const filteredRooms = rooms.filter((room) => {
    const search = searchTerm.toLowerCase();
    return (
      room.name.toLowerCase().includes(search) ||
      room.description.toLowerCase().includes(search) ||
      room.picName.toLowerCase().includes(search) ||
      room.roomCode.toLowerCase().includes(search)
    );
  });

  const handleAddRoom = (newRoom: Omit<Room, 'id'>) => {
    const room: Room = {
      ...newRoom,
      id: Date.now().toString()
    };
    setRooms([...rooms, room]);
  };

  const handleEditRoom = (updatedRoom: Room) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room))
    );
    setEditingRoom(null);
  };

  const handleDeleteRoom = (roomId: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(rooms.filter((room) => room.id !== roomId));
    }
  };

  return (
    <div className="p-6 ml-64">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
            <p className="text-gray-600 mt-2">Manage rooms and location details</p>
          </div>
          <button
            onClick={() => {
              setEditingRoom(null);
              setIsAddModalOpen(true);
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Room</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search rooms..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-500">{room.roomType}</p>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-4">{room.description}</p>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Room Code</span>
                <span className="text-gray-900 font-medium">{room.roomCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Floor</span>
                <span className="text-gray-900 font-medium">{room.lantai}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">PIC</span>
                <span className="text-gray-900 font-medium">{room.picName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">NIP</span>
                <span className="text-gray-900 font-medium">{room.picNip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jabatan</span>
                <span className="text-gray-900 font-medium">{room.picJabatan}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setEditingRoom(room);
                  setIsAddModalOpen(true);
                }}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1 text-sm"
              >
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
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No rooms found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search keyword</p>
        </div>
      )}

      {/* Modal: Add or Edit */}
      {isAddModalOpen && (
        <AddRoomModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingRoom(null);
          }}
          onAdd={handleAddRoom}
          onEdit={handleEditRoom}
          initialData={editingRoom || undefined}
        />
      )}
    </div>
  );
};
