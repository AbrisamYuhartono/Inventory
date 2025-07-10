import React, { useState } from 'react';
import { LendingRequest } from '../../types';
import { mockLendingRequests } from '../../data/mockData';
import { format, isAfter, differenceInDays } from 'date-fns';
import { 
  FileText, 
  Calendar, 
  User, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Search,
  Download
} from 'lucide-react';

export const LendingManagement: React.FC = () => {
  const [records] = useState<LendingRequest[]>(mockLendingRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.pegawaiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.itemSerialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: LendingRequest['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Returned':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: LendingRequest['status']) => {
    switch (status) {
      case 'Active':
        return <Clock className="h-4 w-4" />;
      case 'Returned':
        return <CheckCircle className="h-4 w-4" />;
      case 'Rejected':
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const isOverdue = (record: LendingRequest) => {
    return record.status === 'Active' && isAfter(new Date(), record.expectedReturnDate);
  };

  const getDaysRemaining = (record: LendingRequest) => {
    if (record.status !== 'Active') return null;
    const days = differenceInDays(record.expectedReturnDate, new Date());
    return days;
  };

  const generateReport = async () => {
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('LAPORAN PEMINJAMAN BARANG', 20, 20);
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`, 20, 30);
    
    // Add summary
    doc.setFontSize(12);
    doc.text('SUMMARY:', 20, 45);
    doc.text(`Total Records: ${records.length}`, 25, 55);
    doc.text(`Active Lendings: ${records.filter(r => r.status === 'Active').length}`, 25, 65);
    doc.text(`Returned Items: ${records.filter(r => r.status === 'Returned').length}`, 25, 75);
    doc.text(`Overdue Items: ${records.filter(r => isOverdue(r)).length}`, 25, 85);
    
    // Add records
    let yPosition = 105;
    doc.text('LENDING RECORDS:', 20, yPosition);
    
    filteredRecords.forEach((record, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      yPosition += 15;
      doc.setFontSize(10);
      doc.text(`${index + 1}. ${record.itemName} (${record.itemSerialNumber})`, 25, yPosition);
      yPosition += 10;
      doc.text(`   Borrower: ${record.pegawaiName} - ${record.pegawaiUnit}`, 25, yPosition);
      yPosition += 10;
      doc.text(`   Period: ${format(record.requestDate, 'dd/MM/yyyy')} - ${format(record.expectedReturnDate, 'dd/MM/yyyy')}`, 25, yPosition);
      yPosition += 10;
      doc.text(`   Status: ${record.status}`, 25, yPosition);
      if (record.notes) {
        yPosition += 10;
        doc.text(`   Notes: ${record.notes}`, 25, yPosition);
      }
      yPosition += 5;
    });
    
    doc.save(`Lending_Report_${format(new Date(), 'yyyyMMdd')}.pdf`);
  };

  const activeRecords = records.filter(r => r.status === 'Active');
  const overdueRecords = records.filter(r => isOverdue(r));
  const returnedRecords = records.filter(r => r.status === 'Returned');

  return (
    <div className="p-6 ml-64">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lending Management</h1>
            <p className="text-gray-600 mt-2">Track and manage all lending activities</p>
          </div>
          <button
            onClick={generateReport}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Generate Report</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{records.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Lendings</p>
                <p className="text-3xl font-bold text-amber-600 mt-2">{activeRecords.length}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Items</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{overdueRecords.length}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Returned Items</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{returnedRecords.length}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
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
              placeholder="Search records..."
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
            <option value="Active">Active</option>
            <option value="Returned">Returned</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Records List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Lending Records</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredRecords.map((record) => {
            const daysRemaining = getDaysRemaining(record);
            const overdue = isOverdue(record);
            
            return (
              <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Package className="h-5 w-5 text-gray-400" />
                      <h3 className="font-semibold text-gray-900">{record.itemName}</h3>
                      <span className="text-sm text-gray-500">({record.itemSerialNumber})</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        <span>{record.status}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{record.pegawaiName} - {record.pegawaiUnit}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(record.requestDate, 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {format(record.expectedReturnDate, 'MMM dd, yyyy')}</span>
                      </div>
                    </div>

                    {record.status === 'Active' && (
                      <div className="text-sm">
                        {overdue ? (
                          <span className="text-red-600 font-medium">
                            Overdue by {Math.abs(daysRemaining!)} days
                          </span>
                        ) : (
                          <span className="text-amber-600">
                            {daysRemaining! > 0 ? `${daysRemaining} days remaining` : 'Due today'}
                          </span>
                        )}
                      </div>
                    )}

                    {record.actualReturnDate && (
                      <div className="text-sm text-green-600">
                        Returned on {format(record.actualReturnDate, 'MMM dd, yyyy')}
                      </div>
                    )}

                    {record.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">"{record.notes}"</p>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {filteredRecords.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No lending records found</p>
            <p className="text-gray-400 text-sm mt-2">Records will appear here when items are lended out</p>
          </div>
        )}
      </div>
    </div>
  );
};