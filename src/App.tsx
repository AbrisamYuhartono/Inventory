import React, { useState } from 'react';
import { LoginPage } from './components/Auth/LoginPage';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ItemList } from './components/Items/ItemList';
import { LendingManagement } from './components/Lending/LendingManagement';
import { UserManagement } from './components/Users/UserManagement';
import { RoomManagement } from './components/Rooms/RoomManagement';
import { ReportsPage } from './components/Reports/ReportsPage';
import { SettingsPage } from './components/Settings/SettingsPage';
import { ApprovalPage } from './components/Approval/ApprovalPage';
import { MyRequestsPage } from './components/MyRequests/MyRequestsPage';
import { RepairRequestsPage } from './components/RepairRequests/RepairRequestsPage';
import { AuthUser } from './types';

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (authUser: AuthUser) => {
    setUser(authUser);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'items':
        return <ItemList />;
      case 'lending':
        return <LendingManagement />;
      case 'approval':
        return <ApprovalPage />;
      case 'my-requests':
        return <MyRequestsPage user={user} />;
      case 'repair-requests':
        return <RepairRequestsPage user={user} />;
      case 'users':
        return user.role === 'Superadmin' ? <UserManagement /> : <Dashboard />;
      case 'rooms':
        return (user.role === 'Admin' || user.role === 'Superadmin') ? <RoomManagement /> : <Dashboard />;
      case 'reports':
        return (user.role === 'Admin' || user.role === 'Superadmin') ? <ReportsPage /> : <Dashboard />;
      case 'settings':
        return user.role === 'Superadmin' ? <SettingsPage /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} user={user} />
      <Header user={user} onLogout={handleLogout} />
      <main className="pt-20">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;