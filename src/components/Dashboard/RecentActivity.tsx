import React from 'react';
import { format } from 'date-fns';
import { Package, User, CheckCircle, AlertCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'lend' | 'return' | 'add' | 'broken';
  description: string;
  timestamp: Date;
  user: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'lend',
    description: 'Proyektor BenQ lended to John Doe',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: 'John Doe'
  },
  {
    id: '2',
    type: 'return',
    description: 'Laptop Dell returned by Jane Smith',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    user: 'Jane Smith'
  },
  {
    id: '3',
    type: 'add',
    description: 'New Canon Camera added to inventory',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    user: 'Admin System'
  },
  {
    id: '4',
    type: 'broken',
    description: 'Microphone Wireless marked as broken',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    user: 'Admin System'
  }
];

export const RecentActivity: React.FC = () => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'lend':
        return <Package className="h-4 w-4 text-green-600" />;
      case 'return':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'add':
        return <Package className="h-4 w-4 text-blue-600" />;
      case 'broken':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {mockActivities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex-shrink-0 mt-0.5">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">{activity.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              {format(activity.timestamp, 'MMM dd, yyyy • HH:mm')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};