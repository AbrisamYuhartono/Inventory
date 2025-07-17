import React, { useState } from 'react';
import { User } from '../../types';
import { mockUsers } from '../../data/mockData';
import { format } from 'date-fns';
import { 
  Users, 
  UserPlus, 
  Search, 
  Mail, 
  Phone, 
  Calendar,
  Shield,
  ShieldCheck,
  Crown,
  Edit3,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { AddUserModal } from './AddUserModal';
import { ConfirmationModal } from '../Common/ConfirmationModal';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToggleStatusModal, setShowToggleStatusModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.unit || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && user.isActive) ||
                         (statusFilter === 'inactive' && !user.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: User['role']) => {
    switch (role) {
      case 'Admin':
        return <Crown className="h-4 w-4 text-purple-600" />;
      case 'User':
        return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'User':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const user: User = {
      ...newUser,
      id: Date.now().toString()
    };
    setUsers([...users, user]);
  };

  const handleToggleStatus = () => {
    setUsers(users.map(user => 
      user.id === selectedUserId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const handleDeleteUser = () => {
    setUsers(users.filter(user => user.id !== selectedUserId));
  };

  const openToggleStatusModal = (userId: string) => {
    setSelectedUserId(userId);
    setShowToggleStatusModal(true);
  };

  const openDeleteModal = (userId: string) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const selectedUser = users.find(u => u.id === selectedUserId);
  const activeUsers = users.filter(u => u.isActive);
  const adminUsers = users.filter(u => u.role === 'Admin');

  return (
    <div className="p-4 md:p-6 ml-0 md:ml-64">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">Manage users and their permissions</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
              </div>
              <div className="p-2 md:p-3 bg-blue-50 rounded-lg">
                <Users className="h-4 md:h-6 w-4 md:w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">{activeUsers.length}</p>
              </div>
              <div className="p-2 md:p-3 bg-green-50 rounded-lg">
                <Shield className="h-4 md:h-6 w-4 md:w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Administrators</p>
                <p className="text-2xl md:text-3xl font-bold text-purple-600 mt-2">{adminUsers.length}</p>
              </div>
              <div className="p-2 md:p-3 bg-purple-50 rounded-lg">
                <Crown className="h-4 md:h-6 w-4 md:w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 md:p-3 bg-blue-50 rounded-lg">
                <ShieldCheck className="h-4 md:h-6 w-4 md:w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-lg">
                  {user.username.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">{user.username}</h3>
                  <p className="text-xs md:text-sm text-gray-500">{user.unit}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRoleColor(user.role)}`}>
                  {getRoleIcon(user.role)}
                  <span>{user.role}</span>
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {user.joinDate && (
                <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
                  <Calendar className="h-3 md:h-4 w-3 md:w-4" />
                  <span>Joined {format(user.joinDate, 'MMM dd, yyyy')}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-xs md:text-sm font-medium ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => openToggleStatusModal(user.id)}
                  className={`px-2 md:px-3 py-1 rounded text-xs font-medium transition-colors ${
                    user.isActive 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
                
                {user.role !== 'Admin' && (
                  <button
                    onClick={() => openDeleteModal(user.id)}
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="h-3 md:h-4 w-3 md:w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <Users className="h-8 md:h-12 w-8 md:w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-base md:text-lg">No users found</p>
          <p className="text-gray-400 text-xs md:text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {isAddModalOpen && (
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddUser}
        />
      )}

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showToggleStatusModal}
        onClose={() => setShowToggleStatusModal(false)}
        onConfirm={handleToggleStatus}
        title={`${selectedUser?.isActive ? 'Deactivate' : 'Activate'} User`}
        message={`Apakah Anda yakin ingin ${selectedUser?.isActive ? 'menonaktifkan' : 'mengaktifkan'} user ${selectedUser?.username}?`}
        confirmText="Ya"
        cancelText="Batal"
        type={selectedUser?.isActive ? 'warning' : 'info'}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteUser}
        title="Hapus User"
        message={`Apakah Anda yakin ingin menghapus user ${selectedUser?.username}? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="danger"
      />
    </div>
  );
};