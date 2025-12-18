
import React, { useState } from 'react';
import { ArrowLeft, Calculator, Activity, Heart, Calendar, Camera, CornerDownLeft, MessageSquare, ChevronRight } from 'lucide-react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ViewState } from '../types';

interface Props {
  type: 'BP' | 'HR';
  setView: (view: ViewState) => void;
  navigateToChat: (msg: string) => void;
}

const BP_DATA = [
  { day: '周一', sys: [110, 125], dia: [80, 95], pulse: 70 },
  { day: '周二', sys: [100, 125], dia: [85, 95], pulse: 72 },
  { day: '周三', sys: [90, 125], dia: [80, 90], pulse: 75 },
  { day: '周四', sys: [100, 125], dia: [85, 95], pulse: 78 },
  { day: '周五', sys: [100, 110], dia: [85, 95], pulse: 80 },
  { day: '周六', sys: [90, 110], dia: [80, 100], pulse: 82 },
  { day: '周日', sys: [95, 125], dia: [85, 110], pulse: 85 },
];

const HR_DATA = [
  { time: '08:00', value: 88 },
  { time: '10:00', value: 75 },
  { time: '12:00', value: 95 },
  { time: '14:00', value: 80 },
  { time: '16:00', value: 88 },
  { time: '18:00', value: 73 },
  { time: '20:00', value: 92 },
];

export const MetricDetailView: React.FC<Props> = ({ type, setView, navigateToChat }) => {
  const [aiInput, setAiInput] = useState('问问健康管家康康');

  const handleAISend = () => {
    const msg = type === 'BP' 
      ? "嗨，我的最近一次血压数据188/138 mmHg" 
      : "嗨，我的最近一次心率数据95 bpm";
    navigateToChat(msg);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFD] font-sans">
      <header className="px-4 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => setView(ViewState.HOME)} className="p-2.5 bg-white rounded-2xl shadow-sm"><ArrowLeft size={20}/></button>
        <h1 className="font-bold text-lg">{type === 'BP' ? '血压' : '心率监测'}</h1>
        <button className="p-2.5 bg-white rounded-2xl shadow-sm">
          {type === 'BP' ? <Calculator size={20}/> : <Activity size={20}/>}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-40 no-scrollbar">
        {/* Hero Section */}
        <div className="flex flex-col items-center mt-6 mb-8">
           <div className="flex items-center space-x-2 mb-2">
              {type === 'BP' ? <Activity className="text-slate-800" size={32}/> : <Heart className="text-slate-800" fill="currentColor" size={32}/>}
              <h2 className="text-6xl font-bold tracking-tighter">
                {type === 'BP' ? '188/138' : '95'}
                <span className="text-2xl text-slate-400 font-medium ml-2">{type === 'BP' ? 'mmHg' : '次/分'}</span>
              </h2>
           </div>
           <div className="flex items-center space-x-4 text-slate-500 font-bold">
              {type === 'BP' && (
                <div className="flex items-center">
                  <Heart size={20} className="text-rose-500 mr-2" fill="currentColor"/>
                  <span className="text-2xl text-slate-800">112</span>
                  <span className="text-xs ml-1">次/分</span>
                </div>
              )}
              <div className="flex items-center space-x-1 bg-slate-100 px-3 py-1 rounded-full text-xs">
                 <Calendar size={12}/>
                 <span>今天08:23</span>
              </div>
           </div>
        </div>

        {/* Alert Banner */}
        <div className={`p-4 rounded-3xl mb-8 border ${type === 'BP' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
           <div className="flex items-start space-x-2">
              <Activity size={16} className="shrink-0 mt-0.5" />
              <p className="text-xs font-bold leading-relaxed">
                {type === 'BP' 
                  ? '紧急：血压 188/138 mmHg已达到3级高血压（重度），存在严重心血管事件风险！'
                  : '关注：静息心率99bpm偏高，接近正常范围上限，可能与高血压相关'}
              </p>
           </div>
        </div>

        {/* AI Input Bar */}
        <div className="bg-white rounded-3xl p-2 flex items-center shadow-md border border-slate-50 mb-8">
           <button className="p-2.5 bg-slate-50 rounded-xl mr-2"><MessageSquare size={18}/></button>
           <input 
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium outline-none"
            />
           <button className="p-2.5 text-slate-300"><Camera size={18}/></button>
           <button onClick={handleAISend} className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center ml-2">
              <CornerDownLeft size={18}/>
           </button>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-50">
            <div className="flex items-center bg-slate-50 p-1 rounded-2xl mb-8">
                {['今天', '本周', '本月', '今年', '全部'].map(t => (
                    <button key={t} className={`flex-1 py-2 rounded-xl text-xs font-bold ${t === '本周' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>{t}</button>
                ))}
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {type === 'BP' ? (
                  <BarChart data={BP_DATA}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="sys" fill="#2563EB" radius={[4, 4, 4, 4]} barSize={20} />
                    <Bar dataKey="dia" fill="#93C5FD" radius={[4, 4, 4, 4]} barSize={20} />
                  </BarChart>
                ) : (
                  <AreaChart data={HR_DATA}>
                    <defs>
                      <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={[60, 100]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHr)" strokeWidth={3} />
                    <ReferenceLine y={88} stroke="#3b82f6" strokeDasharray="3 3" label={{ position: 'top', value: '88', fill: '#3b82f6', fontSize: 10, fontWeight: 'bold' }} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
            {type === 'BP' && (
              <div className="flex justify-center space-x-6 mt-6 text-[10px] font-bold text-slate-400">
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>收缩压</span>
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-300 mr-2"></span>舒张压</span>
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-slate-200 mr-2"></span>脉搏</span>
              </div>
            )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="fixed bottom-10 left-6 right-6 z-30">
        <button className="w-full h-16 bg-slate-800 rounded-3xl flex items-center justify-between px-6 shadow-2xl shadow-slate-900/40 group active:scale-[0.98] transition-all">
          <div className="flex items-center space-x-4">
             <div className="bg-white/10 p-2 rounded-xl text-white group-hover:translate-x-1 transition-transform">
                <ChevronRight size={24}/>
             </div>
             <span className="text-white font-bold text-lg">滑动开始测量...</span>
          </div>
        </button>
      </div>
    </div>
  );
};
