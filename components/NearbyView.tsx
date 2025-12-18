
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation, Star, Building2, UserRound, HeartHandshake, Phone, Stethoscope, Compass } from 'lucide-react';

type Category = 'station' | 'hospital' | 'nursing' | 'nurse';

interface Location {
  id: string;
  name: string;
  type: Category;
  distance: string;
  rating: number;
  address: string;
  tags: string[];
  imageUrl: string;
  isOpen: boolean;
  price?: string;
}

export const NearbyView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('station');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isNavMode, setIsNavMode] = useState(false);

  const categories = [
    { id: 'station', label: '健康小屋', icon: HeartHandshake },
    { id: 'hospital', label: '医院', icon: Building2 },
    { id: 'nursing', label: '康养机构', icon: Building2 },
    { id: 'nurse', label: '护士上门', icon: UserRound },
  ];

  const mockData: Location[] = [
    {
      id: '1',
      name: '阳光社区智慧健康小屋',
      type: 'station',
      distance: '0.3km',
      rating: 4.9,
      address: '幸福路88号社区中心1楼',
      tags: ['免费血压测量', 'AI问诊', '体脂分析'],
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&h=300',
      isOpen: true
    },
    {
      id: '1b',
      name: '滨江健康驿站',
      type: 'station',
      distance: '0.8km',
      rating: 4.7,
      address: '滨江大道200号',
      tags: ['慢病管理', '中医体质辨识'],
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&h=300',
      isOpen: true
    },
    {
      id: '2',
      name: '市第一人民医院',
      type: 'hospital',
      distance: '1.2km',
      rating: 4.9,
      address: '中山东路123号',
      tags: ['三甲医院', '心血管专科', '24h急诊'],
      imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b9af923?auto=format&fit=crop&w=600&h=300',
      isOpen: true
    },
    {
      id: '2b',
      name: '仁爱康复医院',
      type: 'hospital',
      distance: '3.5km',
      rating: 4.6,
      address: '康复路1号',
      tags: ['二甲', '运动康复', '老年病'],
      imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&h=300',
      isOpen: false
    },
     {
      id: '3',
      name: '松鹤长者照护中心',
      type: 'nursing',
      distance: '2.5km',
      rating: 4.8,
      address: '绿荫路55号',
      tags: ['专业康复', '医养结合', '日间照料'],
      imageUrl: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&h=300',
      isOpen: true
    },
    {
      id: '4',
      name: '李淑芬',
      type: 'nurse',
      distance: '0.8km',
      rating: 5.0,
      address: '可上门服务',
      tags: ['主管护师', '静脉采血', '伤口护理'],
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&h=300',
      isOpen: true,
      price: '¥200/次'
    },
    {
      id: '4b',
      name: '王强',
      type: 'nurse',
      distance: '1.5km',
      rating: 4.9,
      address: '可上门服务',
      tags: ['康复治疗师', '按摩推拿'],
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&h=300',
      isOpen: true,
      price: '¥300/次'
    }
  ];

  const filteredData = mockData.filter(item => item.type === activeCategory);

  // Scroll to selected item
  useEffect(() => {
    if (selectedId) {
      const element = document.getElementById(`location-${selectedId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedId]);

  const getPosition = (index: number) => {
      // Deterministic pseudo-random positions for demo
      const positions = [
        { top: '35%', left: '45%' },
        { top: '55%', left: '70%' },
        { top: '45%', left: '25%' },
        { top: '65%', left: '50%' },
        { top: '25%', left: '60%' },
        { top: '75%', left: '30%' },
      ];
      return positions[index % positions.length];
  };

  return (
    <div className="pb-28 pt-4 min-h-screen bg-gray-50 animate-fadeIn">
       {/* Header */}
      <header className="px-4 mb-4">
        <h1 className="text-2xl font-bold text-slate-800">附近服务</h1>
        <div className="mt-4 relative">
            <input 
                type="text" 
                placeholder="搜索医院、医生、体检..." 
                className="w-full bg-white pl-10 pr-4 py-3 rounded-2xl shadow-sm border border-gray-100 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>
      </header>

      {/* Categories */}
      <section className="px-4 mb-6">
          <div className="flex justify-between items-center bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
              {categories.map(cat => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                      <button 
                        key={cat.id}
                        onClick={() => {
                            setActiveCategory(cat.id as Category);
                            setSelectedId(null);
                        }}
                        className={`flex flex-col items-center justify-center py-2 px-2 flex-1 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-400'}`}
                      >
                          <Icon size={20} className={`mb-1 ${isActive ? 'fill-current' : ''}`} />
                          <span className="text-[10px] font-medium">{cat.label}</span>
                      </button>
                  )
              })}
          </div>
      </section>

      {/* AI Suggestion */}
      {activeCategory === 'station' && (
          <div className="px-4 mb-4 animate-slideIn">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl p-3 text-white flex items-start space-x-3 shadow-lg shadow-blue-500/20">
                  <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm mt-0.5">
                      <Stethoscope size={16} />
                  </div>
                  <div>
                      <div className="text-xs font-bold opacity-90 mb-0.5">AI 健康建议</div>
                      <p className="text-xs leading-relaxed opacity-95">
                          根据您的血压记录，建议前往最近的<span className="font-bold underline ml-1">阳光社区小屋</span>进行一次复测。
                      </p>
                  </div>
              </div>
          </div>
      )}

      {/* Map Section */}
      <section className={`relative mx-4 rounded-3xl overflow-hidden mb-6 shadow-md border border-gray-200 transition-all duration-500 ease-in-out ${isNavMode ? 'h-80' : 'h-48'}`}>
            <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80" 
                className="w-full h-full object-cover opacity-80"
                alt="Map"
                onClick={() => setSelectedId(null)}
            />
            <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>
            
            {/* Markers */}
            {filteredData.map((item, index) => {
                const pos = getPosition(index);
                const isSelected = selectedId === item.id;
                
                return (
                    <div 
                        key={item.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ top: pos.top, left: pos.left }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(item.id === selectedId ? null : item.id);
                        }}
                    >
                         {/* Tooltip on hover/select */}
                         {(isSelected) && (
                             <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-white px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-30 animate-bounce">
                                 <span className="text-[10px] font-bold text-slate-800">{item.name}</span>
                                 <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
                             </div>
                         )}

                        <div className={`relative transition-transform duration-300 ${isSelected ? 'scale-125 -translate-y-1' : 'hover:scale-110'}`}>
                             {isSelected && (
                                <span className="flex h-3 w-3 absolute -top-1 -right-1 z-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                </span>
                             )}
                            <MapPin 
                                className={`${isSelected ? 'text-blue-600' : 'text-slate-500'} drop-shadow-md filter transition-colors`} 
                                size={isSelected ? 36 : 28} 
                                fill={isSelected ? 'white' : '#f8fafc'} 
                            />
                        </div>
                    </div>
                );
            })}
            
            {/* User Location */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-none">
                 <div className="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                 {isNavMode && <div className="mt-1 text-[10px] font-bold text-slate-700 bg-white/80 px-1.5 py-0.5 rounded backdrop-blur-sm shadow-sm">我的位置</div>}
            </div>

            {/* Navigation Toggle */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsNavMode(!isNavMode);
                }}
                className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-full shadow-lg text-xs font-bold flex items-center transition-all duration-300 active:scale-95 z-20 ${
                    isNavMode ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-gray-50'
                }`}
            >
                 {isNavMode ? (
                     <Compass size={14} className="mr-1.5 animate-spin-slow" /> 
                ) : (
                     <Navigation size={12} className="mr-1 text-blue-500" /> 
                )}
                {isNavMode ? '导航中' : '导航模式'}
            </button>
      </section>

      {/* List */}
      <section className="px-4 space-y-4">
          <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-slate-800">
                  {categories.find(c => c.id === activeCategory)?.label}列表
              </h3>
              <span className="text-xs text-gray-400">共 {filteredData.length} 个结果</span>
          </div>

          {filteredData.map(item => (
              <div 
                id={`location-${item.id}`}
                key={item.id} 
                className={`rounded-2xl p-3 shadow-sm border transition-all duration-300 flex space-x-3 cursor-pointer ${
                    selectedId === item.id 
                    ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200 scale-[1.02]' 
                    : 'bg-white border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => setSelectedId(item.id === selectedId ? null : item.id)}
              >
                   <div className="relative w-24 h-24 flex-shrink-0">
                       <img src={item.imageUrl} className="w-full h-full object-cover rounded-xl" alt={item.name} />
                       {item.type !== 'nurse' && (
                           <div className={`absolute top-1 left-1 text-[8px] font-bold px-1.5 py-0.5 rounded-md ${item.isOpen ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                               {item.isOpen ? '营业中' : '休息中'}
                           </div>
                       )}
                   </div>
                   
                   <div className="flex-1 flex flex-col justify-between py-0.5">
                       <div>
                           <div className="flex justify-between items-start">
                               <h4 className={`font-bold text-sm line-clamp-1 ${selectedId === item.id ? 'text-blue-700' : 'text-slate-800'}`}>{item.name}</h4>
                               <span className="text-xs font-medium text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-md whitespace-nowrap ml-2">
                                   {item.distance}
                               </span>
                           </div>
                           
                           <div className="flex items-center space-x-1 text-xs text-orange-400 my-1">
                               <Star size={10} fill="currentColor" />
                               <span className="font-bold">{item.rating}</span>
                               <span className="text-gray-300">|</span>
                               <span className="text-gray-400 font-normal line-clamp-1">{item.address}</span>
                           </div>

                           <div className="flex flex-wrap gap-1 mt-1.5">
                               {item.tags.map(tag => (
                                   <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-50 text-gray-500 rounded-md border border-gray-100">
                                       {tag}
                                   </span>
                               ))}
                           </div>
                       </div>

                       {item.price && (
                           <div className="mt-1 text-right">
                               <span className="text-sm font-bold text-rose-500">{item.price}</span>
                           </div>
                       )}

                       {item.type === 'station' && (
                           <div className="flex justify-end mt-1">
                               <button className="text-[10px] bg-blue-600 text-white px-3 py-1 rounded-full font-medium">
                                   预约测量
                               </button>
                           </div>
                       )}
                        {item.type === 'nurse' && (
                           <div className="flex justify-end mt-1 space-x-2">
                               <button className="text-[10px] bg-white border border-gray-200 text-slate-600 px-3 py-1 rounded-full font-medium flex items-center">
                                   <Phone size={10} className="mr-1" /> 咨询
                               </button>
                               <button className="text-[10px] bg-blue-600 text-white px-3 py-1 rounded-full font-medium">
                                   预约上门
                               </button>
                           </div>
                       )}
                   </div>
              </div>
          ))}
      </section>
    </div>
  );
};
