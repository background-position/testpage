
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Crown,
  ChevronRight,
  Wifi,
  Clock,
  Sparkles,
  History,
  CheckCircle2,
  AlertCircle,
  Smile,
  RefreshCw,
  Check
} from 'lucide-react';
import { ViewState, HealthMetric, DailyTracking } from '../types';

interface Props {
  metrics: HealthMetric[];
  tracking: DailyTracking[];
  setView: (view: ViewState) => void;
  navigateToChat: (msg?: string) => void;
}

export const HomeView: React.FC<Props> = ({ metrics, tracking, setView, navigateToChat }) => {
  const [activeTab, setActiveTab] = useState<'self' | 'father'>('self');
  const [measuringId, setMeasuringId] = useState<string | null>(null);
  const [measureStatus, setMeasureStatus] = useState<string>('正在同步');
  const [isSuccess, setIsSuccess] = useState(false);

  const startMeasure = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // 阻止触发卡片跳转详情
    setMeasuringId(id);
    setIsSuccess(false);
    
    // 模拟不同阶段的交互文案
    const steps = ['正在连接设备...', '正在读取数据...', '数据校准中...'];
    let stepIdx = 0;
    
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setMeasureStatus(steps[stepIdx]);
        stepIdx++;
      }
    }, 800);

    setTimeout(() => {
      clearInterval(interval);
      setIsSuccess(true);
      setMeasureStatus('同步成功');
      
      // 完成后的反馈
      setTimeout(() => {
        setMeasuringId(null);
        setIsSuccess(false);
      }, 1200);
    }, 3000);
  };

  const getStatusColor = (type: HealthMetric['statusType']) => {
    switch(type) {
      case 'critical': return 'text-rose-600 bg-rose-50';
      case 'warning': return 'text-amber-600 bg-amber-50';
      case 'normal': return 'text-emerald-600 bg-emerald-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const handleMetricClick = (id: string) => {
    if (measuringId) return; // 测量中禁止跳转
    if (id === 'bp') setView(ViewState.BLOOD_PRESSURE);
    if (id === 'hr') setView(ViewState.HEART_RATE);
  };

  return (
    <div className="pb-32 pt-12 px-5 font-sans">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150" 
            alt="Avatar" 
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" 
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">早上好，程观</h1>
            <div className="flex items-center space-x-1 text-amber-500 mt-0.5">
               <Crown size={14} fill="currentColor" />
               <span className="text-xs font-bold">专业版会员</span>
            </div>
          </div>
        </div>
        <button className="relative p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 active:scale-95 transition-transform">
          <Bell size={24} className="text-slate-700" />
          <span className="absolute top-2 right-2.5 w-4 h-4 bg-rose-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center border-2 border-white">7</span>
        </button>
      </header>

      {/* Tabs */}
      <div className="flex items-center space-x-6 mb-4 px-1">
        <button onClick={() => setActiveTab('self')} className={`text-xl font-bold ${activeTab === 'self' ? 'text-slate-900' : 'text-slate-300'}`}>自己</button>
        <button onClick={() => setActiveTab('father')} className={`text-xl font-bold ${activeTab === 'father' ? 'text-slate-900' : 'text-slate-300'}`}>父亲</button>
        <span className="flex-1"></span>
        <button className="text-blue-500 text-xs font-bold">+添加家人</button>
      </div>

      {/* Health Overview Card */}
      <section 
        onClick={() => navigateToChat()}
        className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-50 mb-8 cursor-pointer active:scale-[0.98] transition-all"
      >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-slate-800 flex items-center">
              健康概览 <span className="ml-1.5 w-2 h-2 rounded-full bg-rose-500 inline-block animate-pulse"></span>
            </h3>
          </div>

          <div className="space-y-3">
            <div className="bg-rose-50 p-3 rounded-2xl flex items-start space-x-2 border border-rose-100/50">
               <div className="bg-rose-500 p-1 rounded-md shrink-0 mt-0.5">
                  <AlertCircle size={12} className="text-white" />
               </div>
               <span className="text-[12px] font-bold text-rose-600 leading-tight">紧急： 血压 188/138 mmHg已达到3级高血压（重度），存在严重心血管事件风险！</span>
            </div>
            <div className="bg-amber-50 p-3 rounded-2xl flex items-start space-x-2 border border-amber-100/50">
               <div className="bg-amber-500 p-1 rounded-md shrink-0 mt-0.5">
                  <AlertCircle size={12} className="text-white" />
               </div>
               <span className="text-[12px] font-bold text-amber-600 leading-tight">关注： 静息心率99bpm偏高，接近正常范围上限，可能与高血压相关</span>
            </div>
            <div className="bg-emerald-50 p-3 rounded-2xl flex items-start space-x-2 border border-emerald-100/50">
               <div className="bg-emerald-500 p-1 rounded-md shrink-0 mt-0.5">
                  <Smile size={12} className="text-white" />
               </div>
               <span className="text-[12px] font-bold text-emerald-600 leading-tight">保持： 血糖控制良好，无糖尿病风险，睡眠时长充足。</span>
            </div>
          </div>

          <div className="text-[12px] text-slate-500 leading-relaxed mt-4 space-y-2 px-1">
            <p>请立即预约心血管专科医生，完善相关检查，可能需要药物降压治疗。</p>
          </div>

          <div className="flex items-center justify-end space-x-1 text-[10px] text-blue-400 font-medium mt-4 italic">
             <Sparkles size={10} />
             <span>康康健康管家数据分析中心</span>
          </div>
      </section>

      {/* Health Metrics Grid */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="font-bold text-xl text-slate-900 tracking-tight">健康指标</h2>
            <button className="text-[12px] font-bold text-blue-600">+添加设备</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {metrics.map((m) => (
                <div 
                  key={m.id} 
                  onClick={() => handleMetricClick(m.id)}
                  className="bg-white rounded-[1.8rem] p-4 shadow-sm border border-slate-50 flex flex-col relative overflow-hidden active:scale-[0.97] transition-all cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                           <span className="text-sm font-bold text-slate-800">{m.title}</span>
                           <span className={`text-[9px] px-1.5 py-0.5 rounded-lg font-bold ${getStatusColor(m.statusType)}`}>
                              {m.statusText}
                           </span>
                        </div>
                        <span className="text-[9px] text-slate-300 font-bold uppercase tracking-wider">详情 ›</span>
                    </div>

                    <div className="flex items-baseline space-x-1 mb-0.5">
                        <span className="text-lg font-bold text-slate-900 tracking-tight">{m.value}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{m.unit}</span>
                    </div>
                    <div className="text-[9px] text-slate-400 mb-2">{m.subValue}</div>
                    
                    <button 
                      onClick={(e) => startMeasure(e, m.id)}
                      className="text-[11px] font-bold text-blue-600 bg-blue-50 py-1.5 rounded-xl mb-3 hover:bg-blue-100 transition-colors"
                    >
                        开始测量
                    </button>

                    <div className="flex items-center justify-between text-[9px] text-slate-400 pt-2 border-t border-slate-50">
                        <div className="flex items-center space-x-1">
                           <Wifi size={8} className="text-blue-500" />
                           <span className="font-bold uppercase">{m.deviceBrand}</span>
                           <span>{m.battery}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock size={8} />
                            <span>{m.date}</span>
                        </div>
                    </div>

                    {/* Enhanced Measurement Overlay */}
                    {measuringId === m.id && (
                        <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fadeIn">
                            <div className="relative mb-3">
                                {isSuccess ? (
                                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center animate-scaleUp">
                                        <Check size={28} className="text-white" />
                                    </div>
                                ) : (
                                    <>
                                        <RefreshCw size={32} className="text-blue-500 animate-spin" />
                                        <div className="absolute -inset-2 border-2 border-blue-500/20 rounded-full animate-ping"></div>
                                    </>
                                )}
                            </div>
                            <span className={`text-[11px] font-bold text-center ${isSuccess ? 'text-emerald-600' : 'text-blue-600'}`}>
                                {measureStatus}
                            </span>
                            {!isSuccess && (
                                <div className="mt-3 w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 animate-loadingProgress"></div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </section>

      {/* Health Guidance */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="font-bold text-xl text-slate-900">健康指导</h2>
            <button className="text-[12px] font-bold text-blue-500">历史指导</button>
        </div>
        <div className="bg-[#EBF4FF] rounded-[2.5rem] p-6 relative overflow-hidden group shadow-sm">
            <div className="relative z-10">
                <div className="bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-lg inline-block mb-5">今日活力小贴士</div>
                <ul className="space-y-3">
                    {['饮食指导方案', '生活指导方案', '运动指导方案'].map(text => (
                        <li key={text} className="flex items-center text-slate-800 text-sm font-bold">
                            <Sparkles size={14} className="text-blue-500 mr-2" />
                            {text}
                        </li>
                    ))}
                </ul>
            </div>
            <img src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=300&h=300" className="absolute right-[-10px] bottom-[-10px] w-40 h-40 object-contain opacity-90 mix-blend-multiply" />
        </div>
      </section>

      {/* Health Plan - Daily Tracking */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="font-bold text-xl text-slate-900">健康计划</h2>
            <button className="text-[12px] font-bold text-blue-500">更新计划</button>
        </div>
        <div className="space-y-4">
            {tracking.map(t => (
                <div key={t.id} className="bg-white rounded-[1.8rem] p-5 shadow-sm border border-slate-50 flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-xl shadow-inner`}>
                        {t.id === '1' && <img src="https://img.icons8.com/ios-filled/50/000000/dumbbell.png" className="w-8 h-8 opacity-70" alt="icon" />}
                        {t.id === '2' && <img src="https://img.icons8.com/ios-filled/50/000000/walking.png" className="w-8 h-8 opacity-70" alt="icon" />}
                        {t.id === '3' && <img src="https://img.icons8.com/ios-filled/50/000000/apple.png" className="w-8 h-8 opacity-70" alt="icon" />}
                        {t.id === '4' && <img src="https://img.icons8.com/ios-filled/50/000000/bed.png" className="w-8 h-8 opacity-70" alt="icon" />}
                        {t.id === '5' && <img src="https://img.icons8.com/ios-filled/50/000000/water.png" className="w-8 h-8 opacity-70" alt="icon" />}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between mb-1.5 items-end">
                           <span className="font-bold text-slate-800 text-lg">{t.current || t.title}{t.unit || ''}</span>
                           {t.target && <span className="text-[10px] text-slate-400 font-bold tracking-tight">目标: {t.target}{t.unit}</span>}
                        </div>
                        {t.id === '1' && (
                            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-rose-500 rounded-full" style={{width: '75%'}}></div>
                            </div>
                        )}
                        {t.id === '2' && (
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400 font-bold">步数达标</span>
                                <CheckCircle2 size={20} className="text-blue-600" />
                            </div>
                        )}
                        {t.id === '3' && (
                            <div className="flex flex-wrap gap-2">
                                {['维生素A', '布洛芬', '2+'].map(tag => (
                                    <span key={tag} className="text-[10px] px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-bold">{tag}</span>
                                ))}
                            </div>
                        )}
                        {t.id === '4' && (
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400 font-bold">睡眠</span>
                                <div className="relative w-10 h-10">
                                   <svg className="w-full h-full transform -rotate-90">
                                      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                                      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="100" strokeDashoffset="40" className="text-purple-500" />
                                   </svg>
                                   <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold">60%</span>
                                </div>
                            </div>
                        )}
                        {t.id === '5' && (
                            <div className="flex flex-col space-y-1">
                                <div className="flex space-x-1 h-1.5">
                                    {[1,2,3,4,5].map(i => <div key={i} className={`flex-1 rounded-full ${i <= 2 ? 'bg-blue-500' : 'bg-slate-100'}`}></div>)}
                                </div>
                                <span className="text-[9px] text-slate-400 font-bold text-right">目标: 2,000ml</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};
