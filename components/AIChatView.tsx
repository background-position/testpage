
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Search, 
  MessageSquare, 
  Camera, 
  CornerDownLeft, 
  Sparkles,
  AlertCircle,
  Smile,
  User
} from 'lucide-react';
import { ChatMessage, ViewState } from '../types';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

interface Props {
  setView: (view: ViewState) => void;
  healthContext: string;
  initialUserMessage?: string | null;
}

const HealthOverviewCard = () => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mt-2 space-y-3">
    <h3 className="text-sm font-bold text-slate-800 flex items-center">
      健康概览 <span className="ml-1.5 w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
    </h3>
    <div className="bg-rose-50 p-2 rounded-lg flex items-start space-x-2">
      <AlertCircle size={12} className="text-rose-600 mt-0.5" />
      <span className="text-[11px] font-bold text-rose-600">紧急： 静息心率过快 (137bpm)</span>
    </div>
    <div className="bg-amber-50 p-2 rounded-lg flex items-start space-x-2">
      <AlertCircle size={12} className="text-amber-600 mt-0.5" />
      <span className="text-[11px] font-bold text-amber-600">关注： 高血压前期 (128/94mmHg, 舒张压偏高)</span>
    </div>
    <div className="bg-emerald-50 p-2 rounded-lg flex items-start space-x-2">
      <Smile size={12} className="text-emerald-600 mt-0.5" />
      <span className="text-[11px] font-bold text-emerald-600">保持： 血糖正常，睡眠充足。</span>
    </div>
    <div className="text-[11px] text-slate-600 leading-relaxed pt-2 border-t border-slate-50">
      建议：立即就医排查。减少钠盐，戒烟限酒。
    </div>
  </div>
);

export const AIChatView: React.FC<Props> = ({ setView, healthContext, initialUserMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greet',
      role: 'model',
      text: '早上好，程观\n冬至到，天渐寒，多添衣，保健康',
      timestamp: new Date(),
      showOverview: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    chatSessionRef.current = createChatSession(healthContext);
    if (initialUserMessage) {
      handleSend(initialUserMessage);
    }
    scrollToBottom();
  }, []);

  useEffect(() => scrollToBottom(), [messages, isTyping]);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleSend = async (msgText: string = input) => {
    if (!msgText.trim() || isTyping) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: msgText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await sendMessageStream(chatSessionRef.current, msgText);
      let fullResponse = '';
      const responseMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: responseMsgId, role: 'model', text: '', timestamp: new Date(), isThinking: true }]);
      for await (const chunk of result) {
        const chunkText = (chunk as GenerateContentResponse).text;
        if (chunkText) {
          fullResponse += chunkText;
          setMessages(prev => prev.map(m => m.id === responseMsgId ? { ...m, text: fullResponse, isThinking: false } : m));
        }
      }
    } catch (error) {
      setIsTyping(false);
    } finally { setIsTyping(false); }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F0F2F5]">
      <header className="bg-white px-4 pt-12 pb-5 rounded-b-[2.5rem] shadow-sm flex items-center justify-between">
        <button onClick={() => setView(ViewState.HOME)} className="p-2 bg-slate-50 rounded-xl"><ArrowLeft size={20}/></button>
        <div className="text-center">
          <h1 className="font-bold text-lg">康康-健康管家</h1>
          <div className="flex space-x-2 text-[10px] justify-center mt-1">
            <span className="text-green-500 font-bold">• 在线</span>
            <span className="text-slate-400 font-bold">• 深度分析模式</span>
          </div>
        </div>
        <button className="p-2 bg-slate-50 rounded-xl"><Search size={20}/></button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-32">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[85%] gap-2`}>
              <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-[10px] ${msg.role === 'model' ? 'bg-white text-slate-800' : 'bg-blue-600 text-white'}`}>
                {msg.role === 'model' ? '康康' : <User size={16}/>}
              </div>
              <div className={`p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none shadow-sm'}`}>
                {msg.text.split('\n').map((l, i) => <p key={i}>{l}</p>)}
                {msg.showOverview && <HealthOverviewCard />}
              </div>
            </div>
          </div>
        ))}
        {isTyping && <div className="text-xs text-slate-400 italic flex items-center space-x-1"><Sparkles size={12}/> <span>康康正在分析中...</span></div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-6 left-4 right-4 bg-white/90 backdrop-blur-xl p-2 rounded-3xl flex items-center shadow-xl border border-white/50">
        <button className="p-3 bg-slate-50 rounded-2xl mr-2"><MessageSquare size={20}/></button>
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="长的是深夜，短的是人生" 
          className="flex-1 bg-slate-50 h-12 rounded-2xl px-4 text-sm outline-none"
        />
        <button className="p-3 text-slate-300"><Camera size={20}/></button>
        <button onClick={() => handleSend()} className="w-12 h-12 bg-slate-800 text-white rounded-2xl ml-2 flex items-center justify-center"><CornerDownLeft size={20}/></button>
      </div>
    </div>
  );
};
