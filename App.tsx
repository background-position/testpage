
import React, { useState } from 'react';
import { HomeView } from './components/HomeView';
import { AIChatView } from './components/AIChatView';
import { DevicesView } from './components/DevicesView';
import { NearbyView } from './components/NearbyView';
import { BottomNav } from './components/BottomNav';
import { MetricDetailView } from './components/MetricDetailView';
import { ViewState, HealthMetric, DailyTracking } from './types';

const MOCK_METRICS: HealthMetric[] = [
  {
    id: 'bp',
    title: '血压',
    value: '188/138',
    unit: 'mmHg',
    date: '今天08:23',
    statusText: '3级高血压',
    statusType: 'critical',
    deviceBrand: 'OMRON',
    battery: 78,
    subValue: '脉搏 112 bmp',
    trendData: [120, 140, 130, 160, 188],
    color: 'red'
  },
  {
    id: 'hr',
    title: '心率',
    value: '99',
    unit: '次/分',
    date: '今天08:23',
    statusText: '正常偏高',
    statusType: 'warning',
    deviceBrand: 'iWatch',
    battery: 78,
    subValue: '静止心率',
    trendData: [72, 85, 80, 95, 99],
    color: 'amber'
  },
  {
    id: 'sugar',
    title: '血糖',
    value: '4.3',
    unit: 'mmol/L',
    date: '今天09:17',
    statusText: '健康',
    statusType: 'normal',
    deviceBrand: 'YUYUE',
    battery: 78,
    subValue: '空腹血糖',
    trendData: [4.5, 4.2, 4.4, 4.3],
    color: 'blue'
  },
  {
    id: 'sleep',
    title: '睡眠',
    value: '8.7',
    unit: '小时',
    date: '今天08:23',
    statusText: '睡眠充足',
    statusType: 'normal',
    deviceBrand: 'iWatch',
    battery: 78,
    trendData: [7, 8, 7.5, 8.7],
    color: 'purple',
    subValue: '快速动眼27% 浅睡44% 深睡29%'
  }
];

const MOCK_TRACKING: DailyTracking[] = [
  {
    id: '1',
    type: 'calories',
    title: '卡路里',
    current: 1500,
    target: 2000,
    unit: 'kcal',
    icon: '🏋️',
    color: 'bg-rose-500',
    progress: 75
  },
  {
    id: '2',
    type: 'steps',
    title: '步数达标',
    current: 5291,
    unit: '步',
    icon: '🏃',
    color: 'bg-blue-500',
    isCompleted: true
  },
  {
    id: '3',
    type: 'medication',
    title: '用药计划',
    current: '',
    icon: '🍎',
    color: 'bg-indigo-500',
    subInfo: ['维生素A', '布洛芬', '2+']
  },
  {
    id: '4',
    type: 'sleep',
    title: '睡眠',
    current: '8.2',
    unit: '小时',
    icon: '🛏️',
    color: 'bg-violet-500',
    progress: 60
  },
  {
    id: '5',
    type: 'water',
    title: '已喝水',
    current: 700,
    target: 2000,
    unit: 'ml',
    icon: '💧',
    color: 'bg-sky-500',
    progress: 35
  }
];

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [initialChatMessage, setInitialChatMessage] = useState<string | null>(null);

  const navigateToChat = (message: string | null = null) => {
    setInitialChatMessage(message);
    setCurrentView(ViewState.AI_CHAT);
  };

  const healthContext = `
    User Name: Cheng Cheng (Pro Member)
    Latest Blood Pressure: 188/138 mmHg (Stage 3 Hypertension).
    Heart Rate: 99 bpm.
    Blood Sugar: 4.3 mmol/L.
    Sleep: 8.7 hours.
  `;

  return (
    <div className="min-h-screen bg-[#F8FAFD] max-w-md mx-auto relative overflow-hidden shadow-2xl flex flex-col no-scrollbar">
      
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {currentView === ViewState.HOME && (
          <HomeView 
            metrics={MOCK_METRICS} 
            tracking={MOCK_TRACKING} 
            setView={setCurrentView}
            navigateToChat={navigateToChat}
          />
        )}

        {currentView === ViewState.AI_CHAT && (
          <AIChatView 
            setView={setCurrentView} 
            healthContext={healthContext}
            initialUserMessage={initialChatMessage}
          />
        )}

        {currentView === ViewState.BLOOD_PRESSURE && (
          <MetricDetailView 
            type="BP" 
            setView={setCurrentView} 
            navigateToChat={navigateToChat}
          />
        )}

        {currentView === ViewState.HEART_RATE && (
          <MetricDetailView 
            type="HR" 
            setView={setCurrentView} 
            navigateToChat={navigateToChat}
          />
        )}

        {currentView === ViewState.DEVICES && <DevicesView />}
        {currentView === ViewState.NEARBY && <NearbyView />}
        
        {currentView === ViewState.MINE && (
          <div className="flex flex-col h-full items-center justify-center p-8 text-center text-gray-400">
            <h2 className="text-xl font-bold mb-2">个人中心</h2>
            <p>功能开发中...</p>
          </div>
        )}
      </main>

      {![ViewState.AI_CHAT, ViewState.BLOOD_PRESSURE, ViewState.HEART_RATE].includes(currentView) && (
        <BottomNav currentView={currentView} setView={setCurrentView} />
      )}
    </div>
  );
}

export default App;
