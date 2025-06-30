import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color: 'primary' | 'blue' | 'purple' | 'danger';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color
}) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    danger: 'bg-danger-50 text-danger-600'
  };

  const changeClasses = {
    positive: 'text-primary-600',
    negative: 'text-danger-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${changeClasses[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};