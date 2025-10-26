import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  isDarkMode: boolean;
}

export function MetricCard({ title, value, change, isPositive, isDarkMode }: MetricCardProps) {
  return (
    <div className={`${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-50'} rounded-lg p-6`}>
      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{title}</div>
      <div className="flex items-end justify-between">
        <div className={`text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</div>
        <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <span>{change}</span>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
        </div>
      </div>
    </div>
  );
}
