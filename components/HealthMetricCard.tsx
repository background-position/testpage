import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Activity, Moon, HeartPulse } from 'lucide-react';
import { HealthMetric } from '../types';

interface Props {
  metric: HealthMetric;
}

export const HealthMetricCard: React.FC<Props> = ({ metric }) => {
  const chartData = metric.trendData.map((val, i) => ({ val, i }));
  
  const getIcon = () => {
    switch (metric.id) {
      case 'hr': return <Activity size={16} className="text-white" />;
      case 'bp': return <HeartPulse size={16} className="text-white" />;
      case 'sleep': return <Moon size={16} className="text-white" />;
      default: return <Activity size={16} className="text-white" />;
    }
  };

  const gradientColors: Record<string, [string, string]> = {
    blue: ['#3b82f6', '#60a5fa'],
    red: ['#ef4444', '#f87171'],
    purple: ['#8b5cf6', '#a78bfa'],
  };

  const [startColor, endColor] = gradientColors[metric.color] || gradientColors.blue;

  return (
    <div className={`relative flex-shrink-0 w-40 h-32 rounded-3xl p-4 overflow-hidden shadow-lg shadow-${metric.color}-500/20 text-white mr-4`}>
       {/* Background Gradient */}
       <div className={`absolute inset-0 bg-gradient-to-br from-${metric.color}-500 to-${metric.color}-400`}></div>
       
       <div className="relative z-10 flex flex-col justify-between h-full">
         <div className="flex justify-between items-start">
           <div>
            <div className="flex items-center space-x-1 opacity-90 mb-1">
                <span className="text-xs font-medium">{metric.title}</span>
            </div>
            <div className="text-xs opacity-75">{metric.date}</div>
           </div>
           <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
             {getIcon()}
           </div>
         </div>

         <div className="flex items-end space-x-1 mt-1">
           <span className="text-2xl font-bold leading-none tracking-tight">{metric.value}</span>
           <span className="text-xs opacity-80 mb-0.5">{metric.unit}</span>
         </div>

         {/* Mini Chart */}
         <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30 pointer-events-none">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <Area 
                  type="monotone" 
                  dataKey="val" 
                  stroke="#fff" 
                  fill="#fff" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
         </div>
       </div>
    </div>
  );
};