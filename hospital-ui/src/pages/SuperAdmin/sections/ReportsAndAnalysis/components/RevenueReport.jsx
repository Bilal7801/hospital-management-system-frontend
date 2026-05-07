import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

const RevenueReport = () => {
  const revenueStats = [
    { label: 'Today', value: '$2,400', icon: Calendar, color: 'text-blue-600', change: '+12%' },
    { label: 'This Month', value: '$48,200', icon: TrendingUp, color: 'text-emerald-600', change: '+18%' },
    { label: 'Total', value: '$520,000', icon: DollarSign, color: 'text-purple-600', change: '+25%' },
  ];

  const revenueByDepartment = [
    { dept: 'Cardiology', revenue: '$125,000', percentage: 24 },
    { dept: 'Neurology', revenue: '$98,500', percentage: 19 },
    { dept: 'Orthopedics', revenue: '$87,200', percentage: 17 },
    { dept: 'Pediatrics', revenue: '$76,300', percentage: 15 },
    { dept: 'General Medicine', revenue: '$133,000', percentage: 25 },
  ];

  const topPaymentMethods = [
    { method: 'Credit Card', amount: '$245,000', count: 1250 },
    { method: 'Insurance', amount: '$180,000', count: 920 },
    { method: 'Cash', amount: '$95,000', count: 450 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Revenue Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {revenueStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-emerald-600 mt-2">{stat.change} from last period</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Revenue by Department</h3>
        <div className="space-y-3">
          {revenueByDepartment.map((item, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-white">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">{item.dept}</p>
                <p className="font-bold text-emerald-600">{item.revenue}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{item.percentage}% of total</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Top Payment Methods</h3>
        <div className="space-y-2">
          {topPaymentMethods.map((method, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
              <div>
                <p className="font-medium text-gray-900">{method.method}</p>
                <p className="text-xs text-gray-500">{method.count} transactions</p>
              </div>
              <p className="font-bold text-emerald-600">{method.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;