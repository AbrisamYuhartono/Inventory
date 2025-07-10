import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  BarChart3, 
  Download, 
  Package, 
  Users,
  FileText,
  PieChart,
  TrendingUp
} from 'lucide-react';
import { mockItems, mockLendingRequests, mockUsers, mockRooms } from '../../data/mockData';

export const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [reportType, setReportType] = useState('overview');

  const stats = {
    totalItems: mockItems.length,
    availableItems: mockItems.filter(i => i.status === 'Available').length,
    lendedItems: mockItems.filter(i => i.status === 'Lended').length,
    brokenItems: mockItems.filter(i => i.status === 'Broken').length,
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter(u => u.isActive).length,
    totalRooms: mockRooms.length,
    activeLendings: mockLendingRequests.filter(r => r.status === 'Active').length
  };

  const categoryData = mockItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentData = mockLendingRequests.reduce((acc, record) => {
    acc[record.pegawaiUnit] = (acc[record.pegawaiUnit] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 ml-64">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-2">Generate and view detailed reports</p>
          </div>

          <div className="flex space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="year">This Year</option>
            </select>

            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="overview">Overview</option>
              <option value="inventory">Inventory</option>
              <option value="lending">Lending</option>
              <option value="users">Users</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard label="Total Items" value={stats.totalItems} icon={<Package />} />
          <MetricCard label="Active Lendings" value={stats.activeLendings} icon={<FileText />} />
          <MetricCard label="Active Users" value={stats.activeUsers} icon={<Users />} />
          <MetricCard label="Utilization Rate" value={`${Math.round((stats.lendedItems / stats.totalItems) * 100)}%`} icon={<TrendingUp />} />
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Items by Category" icon={<PieChart />} data={categoryData} total={stats.totalItems} color="blue" />
          <ChartCard title="Usage by Department" icon={<BarChart3 />} data={departmentData} total={mockLendingRequests.length} color="green" />
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, icon }: { label: string; value: number | string; icon: JSX.Element }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
      </div>
      <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
        {icon}
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, icon, data, total, color }: { title: string; icon: JSX.Element; data: Record<string, number>; total: number; color: string }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div className="text-gray-400">{icon}</div>
    </div>
    <div className="space-y-4">
      {Object.entries(data).map(([label, count]) => {
        const percentage = Math.round((count / total) * 100);
        return (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-900 font-semibold">{count}</span>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-${color}-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 w-8">{percentage}%</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
