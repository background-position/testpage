import React, { useState } from 'react';
import { 
  Watch, 
  Smartphone, 
  Activity, 
  Plus, 
  Battery, 
  Settings, 
  Bluetooth, 
  Scale,
  RefreshCw,
  Clock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: 'watch' | 'scale' | 'monitor' | 'band';
  status: 'connected' | 'syncing' | 'offline';
  battery: number;
  lastSync: string;
  model: string;
  owner: 'self' | 'father';
}

export const DevicesView: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedMember, setSelectedMember] = useState<'self' | 'father'>('self');

  const [devices] = useState<Device[]>([
    {
      id: '1',
      name: 'Apple Watch Series 9',
      type: 'watch',
      status: 'connected',
      battery: 78,
      lastSync: '刚刚',
      model: 'A2980',
      owner: 'self',
    },
    {
      id: '3',
      name: 'Xiaomi Body Scale 2',
      type: 'scale',
      status: 'offline',
      battery: 92,
      lastSync: '今天 08:30',
      model: 'XMTZC05HM',
      owner: 'self',
    },
    {
      id: '2',
      name: 'Omron BP Monitor',
      type: 'monitor',
      status: 'connected', 
      battery: 15,
      lastSync: '10分钟前',
      model: 'HEM-7361T',
      owner: 'father',
    },
    {
      id: '4',
      name: 'Huawei Band 7',
      type: 'band',
      status: 'syncing',
      battery: 60,
      lastSync: '正在更新...',
      model: 'LEA-B19',
      owner: 'father',
    }
  ]);

  const toggleScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const getIcon = (type: Device['type']) => {
    switch (type) {
      case 'watch': return <Watch className="text-white" size={20} />;
      case 'monitor': return <Activity className="text-white" size={20} />;
      case 'scale': return <Scale className="text-white" size={20} />;
      case 'band': return <Smartphone className="text-white" size={20} />;
      default: return <Bluetooth className="text-white" size={20} />;
    }
  };
  
  const getIconBgColor = (type: Device['type']) => {
    switch (type) {
      case 'watch': return 'bg-blue-500';
      case 'monitor': return 'bg-rose-500';
      case 'scale': return 'bg-cyan-500';
      case 'band': return 'bg-purple-500';
      default: return 'bg-gray-400';
    }
  };

  const filteredDevices = devices.filter(d => d.owner === selectedMember);

  return (
    <div className="pb-28 pt-4 px-4 min-h-screen bg-[#F8FAFD] space-y-6 animate-fadeIn">
      {/* Header */}
      <header className="flex justify-between items-center sticky top-0 bg-[#F8FAFD]/95 backdrop-blur-sm z-10 py-2">
        <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">我的设备</h1>
            <p className="text-xs text-slate-500 mt-1">
                {selectedMember === 'self' ? '当前账号' : '家人账号'} • {filteredDevices.length} 台设备
            </p>
        </div>
        <button 
            onClick={toggleScan}
            className={`p-2.5 rounded-2xl shadow-sm border transition-all ${
                isScanning ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'
            }`}
        >
          <Plus size={24} className={isScanning ? 'text-blue-500 rotate-45 transition-transform' : 'text-slate-800 transition-transform'} />
        </button>
      </header>

      {/* Tabs Switcher */}
      <section className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
        <button 
            onClick={() => setSelectedMember('self')}
            className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${selectedMember === 'self' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400'}`}
        >
            自己
        </button>
        <button 
            onClick={() => setSelectedMember('father')}
            className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${selectedMember === 'father' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400'}`}
        >
            父亲
        </button>
      </section>

      {/* Main Device List */}
      <section className="space-y-3">
        {filteredDevices.length > 0 ? (
            filteredDevices.map((device) => (
                <div key={device.id} className="bg-white rounded-[1.5rem] shadow-sm border border-slate-50 p-4 transition-all hover:border-blue-100 group">
                    <div className="flex items-center space-x-4">
                        {/* Device Icon */}
                        <div className={`w-14 h-14 ${getIconBgColor(device.type)} rounded-2xl flex items-center justify-center shadow-lg shadow-gray-100 flex-shrink-0 relative`}>
                            {getIcon(device.type)}
                            {device.battery <= 20 && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center">
                                    <span className="text-[10px] text-white font-bold">!</span>
                                </div>
                            )}
                        </div>

                        {/* Device Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-base leading-tight truncate">{device.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">{device.model}</p>
                                </div>
                                <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                            </div>

                            {/* Status Metrics */}
                            <div className="flex items-center mt-2.5 space-x-3">
                                <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                                    device.status === 'connected' ? 'bg-emerald-50 text-emerald-600' :
                                    device.status === 'syncing' ? 'bg-blue-50 text-blue-600' :
                                    'bg-slate-50 text-slate-500'
                                }`}>
                                    {device.status === 'syncing' ? (
                                        <RefreshCw size={10} className="animate-spin mr-0.5" />
                                    ) : (
                                        <div className={`w-1 h-1 rounded-full mr-0.5 ${
                                            device.status === 'connected' ? 'bg-emerald-500' : 'bg-slate-400'
                                        }`}></div>
                                    )}
                                    {device.status === 'connected' ? '已连接' : device.status === 'syncing' ? '同步中' : '离线'}
                                </div>

                                <div className={`flex items-center space-x-1 text-[11px] font-bold ${
                                    device.battery <= 20 ? 'text-rose-500' : 'text-slate-500'
                                }`}>
                                    <Battery size={14} className={device.battery <= 20 ? 'fill-current' : ''} />
                                    <span>{device.battery}%</span>
                                </div>
                                
                                <div className="flex items-center space-x-1 text-[11px] text-slate-400 font-medium">
                                    <Clock size={12} />
                                    <span>{device.lastSync}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center py-12 bg-white rounded-[2rem] border border-slate-100 border-dashed">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Bluetooth size={32} />
                </div>
                <p className="text-sm font-bold text-slate-400">暂无连接设备</p>
                <button onClick={toggleScan} className="mt-4 px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-transform">
                    添加新设备
                </button>
            </div>
        )}
      </section>

      {/* Device Management Actions */}
      <section className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 px-1 mb-2 flex items-center">
            <Settings size={14} className="mr-2 text-slate-400" /> 设备管理
        </h3>
        
        <div className="space-y-1">
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <Bluetooth size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">自动同步设置</span>
                </div>
                <div className="flex items-center text-slate-400">
                    <span className="text-xs mr-2">开启中</span>
                    <ChevronRight size={14} />
                </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                        <ShieldCheck size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">数据隐私保护</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
            </button>
        </div>
      </section>

      {/* Help Tip */}
      <div className="text-center px-4">
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              如果您遇到无法连接的问题，请确保手机蓝牙已开启<br/>
              并尝试长按设备上的配对键。
          </p>
      </div>
    </div>
  );
};