import React from 'react';

export const StatusChart: React.FC = () => {
  const data = [
    { status: 'Available', count: 121, color: 'bg-green-500', percentage: 82 },
    { status: 'Lended', count: 23, color: 'bg-emerald-500', percentage: 16 },
    { status: 'Broken', count: 3, color: 'bg-red-500', percentage: 2 }
  ];

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.status} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
            <span className="text-sm font-medium text-gray-700">{item.status}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-900 font-semibold">{item.count}</span>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 w-8">{item.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};