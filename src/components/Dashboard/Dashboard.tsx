import React from 'react';
import { StatCard } from './StatCard';
import { RecentActivity } from './RecentActivity';
import { StatusChart } from './StatusChart';
import { Package, Users, FileText, AlertTriangle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 ml-64">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your inventory.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Items"
          value={147}
          change="+12 this month"
          changeType="positive"
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Items Lended"
          value={23}
          change="+5 today"
          changeType="positive"
          icon={FileText}
          color="green"
        />
        <StatCard
          title="Active Users"
          value={42}
          change="+3 this week"
          changeType="positive"
          icon={Users}
          color="amber"
        />
        <StatCard
          title="Broken Items"
          value={3}
          change="-1 from last week"
          changeType="positive"
          icon={AlertTriangle}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Item Status Overview</h2>
          <StatusChart />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};