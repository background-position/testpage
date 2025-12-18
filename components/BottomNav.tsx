import React from 'react';
import { Home, MonitorSmartphone, MapPin, User } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, label: '首页', icon: Home },
    { id: ViewState.DEVICES, label: '设备', icon: MonitorSmartphone },
    { id: 'CENTER_AI', label: '', icon: null },
    { id: ViewState.NEARBY, label: '附近', icon: MapPin },
    { id: ViewState.MINE, label: '我的', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-50 pt-3 pb-8 px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.04)] z-50 rounded-t-[2.5rem]">
      <div className="flex justify-between items-center relative max-w-md mx-auto">
        {navItems.map((item) => {
          if (item.id === 'CENTER_AI') {
            return (
              <div key={item.id} className="relative -top-10">
                <button
                  onClick={() => setView(ViewState.AI_CHAT)}
                  className={`w-16 h-16 rounded-[1.5rem] flex flex-col items-center justify-center shadow-2xl shadow-blue-500/40 transition-all duration-300 active:scale-90 ${
                    currentView === ViewState.AI_CHAT 
                      ? 'bg-blue-600 scale-105' 
                      : 'bg-[#2563EB] hover:bg-blue-600'
                  }`}
                >
                   <div className="text-[10px] text-white/70 font-bold mb-0.5 tracking-tighter uppercase">AI健康管家</div>
                   <div className="text-white font-bold text-xl leading-none">康康</div>
                </button>
              </div>
            );
          }

          const isActive = currentView === item.id;
          const Icon = item.icon!;
          
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewState)}
              className={`flex flex-col items-center justify-center space-y-1.5 w-14 transition-all duration-300 active:scale-95 ${
                isActive ? 'text-slate-900 translate-y-[-2px]' : 'text-slate-400'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-blue-50' : 'bg-transparent'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-blue-600' : ''} />
              </div>
              <span className={`text-[10px] font-bold tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};