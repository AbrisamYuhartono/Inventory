import React, { useState } from 'react';
import { format, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  Package, 
  Users,
  FileText,
  PieChart
} from 'lucide-react';
import { mockItems, mockLendingRequests, mockUsers, mockRooms } from '../../data/mockData';

export const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [reportType, setReportType] = useState('overview');

  const generateInventoryReport = async () => {
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text('INVENTORY REPORT', 20, 20);
    
    // Date
    doc.setFontSize(10);
    doc.text(`Generated on: ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`, 20, 30);
    
    // Summary
    doc.setFontSize(12);
    doc.text('INVENTORY SUMMARY:', 20, 45);
    doc.text(`Total Items: ${mockItems.length}`, 25, 55);
    doc.text(`Available: ${mockItems.filter(i => i.status === 'Available').length}`, 25, 65);
    doc.text(`Lended: ${mockItems.filter(i => i.status === 'Lended').length}`, 25, 75);
    doc.text(`Broken: ${mockItems.filter(i => i.status === 'Broken').length}`, 25, 85);
    
    // Categories
    const categories = mockItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    let yPos = 105;
    doc.text('ITEMS BY CATEGORY:', 20, yPos);
    Object.entries(categories).forEach(([category, count]) => {
      yPos += 10;
      doc.text(`${category}: ${count}`, 25, yPos);
    });
    
    // Rooms
    yPos += 20;
    doc.text('ITEMS BY ROOM:', 20, yPos);
    mockRooms.forEach(room => {
      yPos += 10;
      doc.text(`${room.name}: ${room.itemCount}`, 25, yPos);
    });
    
    doc.save(`Inventory_Report_${format(new Date(), 'yyyyMMdd')}.pdf`);
  };

  const generateLendingReport = async () => {
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text('LENDING ACTIVITY REPORT', 20, 20);
    
    // Date
    doc.setFontSize(10);
    doc.text(`Generated on: ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`, 20, 30);
    
    // Summary
    doc.setFontSize(12);
    doc.text('LENDING SUMMARY:', 20, 45);
    doc.text(`Total Records: ${mockLendingRequests.length}`, 25, 55);
    doc.text(`Active Lendings: ${mockLendingRequests.filter(r => r.status === 'Active').length}`, 25, 65);
    doc.text(`Returned Items: ${mockLendingRequests.filter(r => r.status === 'Returned').length}`, 25, 75);
    
    // Department usage
    const deptUsage = mockLendingRequests.reduce((acc, record) => {
      acc[record.userDepartment] = (acc[record.userDepartment] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    let yPos = 95;
    doc.text('USAGE BY DEPARTMENT:', 20, yPos);
    Object.entries(deptUsage).forEach(([dept, count]) => {
      yPos += 10;
      doc.text(`${dept}: ${count} lendings`, 25, yPos);
    });
    
    doc.save(`Lending_Report_${format(new Date(), 'yyyyMMdd')}.pdf`);
  };

  const generateUserReport = async () => {
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text('USER ACTIVITY REPORT', 20, 20);
    
    // Date
    doc.setFontSize(10);
    doc.text(`Generated on: ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`, 20, 30);
    
    // Summary
    doc.setFontSize(12);
    doc.text('USER SUMMARY:', 20, 45);
    doc.text(`Total Users: ${mockUsers.length}`, 25, 55);
    doc.text(`Active Users: ${mockUsers.filter(u => u.isActive).length}`, 25, 65);
    doc.text(`Administrators: ${mockUsers.filter(u => u.role === 'Admin').length}`, 25, 75);
    doc.text(`Managers: ${mockUsers.filter(u => u.role === 'Manager').length}`, 25, 85);
    
    // Department breakdown
    const deptBreakdown = mockUsers.reduce((acc, user) => {
      acc[user.department] = (acc[user.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    let yPos = 105;
    doc.text('USERS BY DEPARTMENT:', 20, yPos);
    Object.entries(deptBreakdown).forEach(([dept, count]) => {
      yPos += 10;
      doc.text(`${dept}: ${count} users`, 25, yPos);
    });
    
    doc.save(`User_Report_${format(new Date(), 'yyyyMMdd')}.pdf`);
  };

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
    acc[record.userDepartment] = (acc[record.userDepartment] || 0) + 1;
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="year">This Year</option>
            </select>
            
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalItems}</p>
                <p className="text-sm text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Lendings</p>
                <p className="text-3xl font-bold text-amber-600 mt-2">{stats.activeLendings}</p>
                <p className="text-sm text-green-600 mt-1">+8% from last month</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.activeUsers}</p>
                <p className="text-sm text-green-600 mt-1">+5% from last month</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilization Rate</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">
                  {Math.round((stats.lendedItems / stats.totalItems) * 100)}%
                </p>
                <p className="text-sm text-green-600 mt-1">+3% from last month</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={generateInventoryReport}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Inventory Report</h3>
                <p className="text-sm text-gray-600">Complete inventory status and breakdown</p>
              </div>
              <Download className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
          </button>

          <button
            onClick={generateLendingReport}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Lending Report</h3>
                <p className="text-sm text-gray-600">Lending activity and usage patterns</p>
              </div>
              <Download className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
          </button>

          <button
            onClick={generateUserReport}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">User Report</h3>
                <p className="text-sm text-gray-600">User activity and department breakdown</p>
              </div>
              <Download className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
          </button>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Item Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Items by Category</h2>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {Object.entries(categoryData).map(([category, count]) => {
              const percentage = Math.round((count / stats.totalItems) * 100);
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900 font-semibold">{count}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
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

        {/* Department Usage */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Usage by Department</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {Object.entries(departmentData).map(([department, count]) => {
              const percentage = Math.round((count / mockLendingRequests.length) * 100);
              return (
                <div key={department} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-gray-700">{department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900 font-semibold">{count}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
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

        {/* Item Status Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Item Status Overview</h2>
            <Package className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-900 font-semibold">{stats.availableItems}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${Math.round((stats.availableItems / stats.totalItems) * 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-8">
                  {Math.round((stats.availableItems / stats.totalItems) * 100)}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-gray-700">Lended</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-900 font-semibold">{stats.lendedItems}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${Math.round((stats.lendedItems / stats.totalItems) * 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-8">
                  {Math.round((stats.lendedItems / stats.totalItems) * 100)}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium text-gray-700">Broken</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-900 font-semibold">{stats.brokenItems}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${Math.round((stats.brokenItems / stats.totalItems) * 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-8">
                  {Math.round((stats.brokenItems / stats.totalItems) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Trends</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800">Items Added</p>
                <p className="text-xs text-green-600">Last 30 days</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-800">+12</p>
                <p className="text-xs text-green-600">↑ 15%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-800">Lending Activity</p>
                <p className="text-xs text-blue-600">Last 30 days</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-800">+23</p>
                <p className="text-xs text-blue-600">↑ 8%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-purple-800">New Users</p>
                <p className="text-xs text-purple-600">Last 30 days</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-purple-800">+5</p>
                <p className="text-xs text-purple-600">↑ 12%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};