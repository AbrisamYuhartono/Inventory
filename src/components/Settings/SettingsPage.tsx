import React, { useState } from 'react';
import { 
  Settings, 
  Building, 
  Mail, 
  Phone, 
  Clock, 
  Shield, 
  Bell, 
  QrCode,
  Save,
  RefreshCw
} from 'lucide-react';
import { SystemSettings } from '../../types';

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings>({
    companyName: 'Kementerian Perindustrian',
    companyAddress: 'Jl. Gatot Subroto No.Kav. 52-53, RT.1/RW.4, Kuningan Tim., Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12950',
    companyPhone: '(021) 5255509',      
    companyEmail: 'kemenperin@gmail.com', 
    maxLendingDays: 14,
    requireApproval: false,
    enableNotifications: true,
    autoGenerateQR: true
  });

  const [activeTab, setActiveTab] = useState('company');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        companyName: 'Kementerian Perindustrian',
        companyAddress: 'Jl. Gatot Subroto No.Kav. 52-53, RT.1/RW.4, Kuningan Tim., Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12950',
        companyPhone: '(021) 5255509',
        companyEmail: 'kemenperin@gmail.com',
        maxLendingDays: 14,
        requireApproval: false,
        enableNotifications: true,
        autoGenerateQR: true
      });
    }
  };

  const tabs = [
    { id: 'company', label: 'Company Info', icon: Building },
    { id: 'lending', label: 'Lending Rules', icon: Clock },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'system', label: 'System', icon: Settings }
  ];

  return (
    <div className="p-6 ml-64">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">Configure system settings and preferences</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reset</span>
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {activeTab === 'company' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="h-4 w-4 inline mr-1" />
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.companyEmail}
                  onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.companyPhone}
                  onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Address
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.companyAddress}
                  onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lending' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Lending Rules</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Maximum Lending Days
                </label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.maxLendingDays}
                  onChange={(e) => setSettings({ ...settings, maxLendingDays: parseInt(e.target.value) || 14 })}
                />
                <p className="text-sm text-gray-500 mt-1">Default maximum number of days an item can be lended</p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requireApproval"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={settings.requireApproval}
                  onChange={(e) => setSettings({ ...settings, requireApproval: e.target.checked })}
                />
                <label htmlFor="requireApproval" className="ml-2 block text-sm text-gray-900">
                  Require admin approval for lending requests
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <Shield className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Security settings are managed by system administrators. Contact your IT department for changes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">Add an extra layer of security to admin accounts</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Session Timeout</h4>
                    <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    30 minutes
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Password Policy</h4>
                    <p className="text-sm text-gray-500">Minimum 8 characters with special characters</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableNotifications"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={settings.enableNotifications}
                  onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                />
                <label htmlFor="enableNotifications" className="ml-2 block text-sm text-gray-900">
                  <Bell className="h-4 w-4 inline mr-1" />
                  Enable system notifications
                </label>
              </div>

              <div className="ml-6 space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="overdueNotifications"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                    disabled={!settings.enableNotifications}
                  />
                  <label htmlFor="overdueNotifications" className="ml-2 block text-sm text-gray-700">
                    Overdue item notifications
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="returnReminders"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                    disabled={!settings.enableNotifications}
                  />
                  <label htmlFor="returnReminders" className="ml-2 block text-sm text-gray-700">
                    Return date reminders
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newUserNotifications"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                    disabled={!settings.enableNotifications}
                  />
                  <label htmlFor="newUserNotifications" className="ml-2 block text-sm text-gray-700">
                    New user registrations
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">System Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoGenerateQR"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={settings.autoGenerateQR}
                  onChange={(e) => setSettings({ ...settings, autoGenerateQR: e.target.checked })}
                />
                <label htmlFor="autoGenerateQR" className="ml-2 block text-sm text-gray-900">
                  <QrCode className="h-4 w-4 inline mr-1" />
                  Auto-generate QR codes for new items
                </label>
              </div>

              <div className="border-t border-gray-200 pt-6">
                
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">Version</h4>
                    <p className="text-sm text-gray-600">v2.1.0</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">Last Updated</h4>
                    <p className="text-sm text-gray-600">January 15, 2024</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">Database</h4>
                    <p className="text-sm text-gray-600">PostgreSQL 14.2</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">Backup Status</h4>
                    <p className="text-sm text-green-600">Last backup: 2 hours ago</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance</h3>
                
                <div className="space-y-3">
                  <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Clear Cache
                  </button>
                  
                  <button className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-0 md:ml-3">
                    Export Data
                  </button>
                  
                  <button className="w-full md:w-auto px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors ml-0 md:ml-3">
                    Run Diagnostics
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};