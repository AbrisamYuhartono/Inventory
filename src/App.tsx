import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ItemList } from './components/Items/ItemList';
import { LendingManagement } from './components/Lending/LendingManagement';
import { UserManagement } from './components/Users/UserManagement';
import { RoomManagement } from './components/Rooms/RoomManagement';
import { ReportsPage } from './components/Reports/ReportsPage';
import { SettingsPage } from './components/Settings/SettingsPage';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'items':
        return <ItemList />;
      case 'lending':
        return <LendingManagement />;
      case 'users':
        return <UserManagement />;
      case 'rooms':
        return <RoomManagement />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <Header />
      <main className="pt-20">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;