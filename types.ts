
export interface User {
  name: string;
  isPro: boolean;
  avatarUrl: string;
}

export interface HealthMetric {
  id: string;
  title: string;
  value: string;
  unit: string;
  date: string;
  statusText: string;
  statusType: 'normal' | 'warning' | 'alert' | 'critical';
  deviceBrand: string;
  battery: number;
  subValue?: string;
  breakdown?: { label: string; value: string }[];
  isMeasuring?: boolean;
  trendData: number[];
  color: string;
}

export interface DailyTracking {
  id: string;
  type: 'calories' | 'steps' | 'medication' | 'sleep' | 'water';
  title: string;
  current: string | number;
  target?: string | number;
  unit?: string;
  icon: string;
  color: string;
  subInfo?: string | string[];
  progress?: number; 
  isCompleted?: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  AI_CHAT = 'AI_CHAT',
  DEVICES = 'DEVICES',
  NEARBY = 'NEARBY',
  MINE = 'MINE',
  BLOOD_PRESSURE = 'BLOOD_PRESSURE',
  HEART_RATE = 'HEART_RATE'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
  showOverview?: boolean;
}
