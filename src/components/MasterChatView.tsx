import React, { useState, useRef, useEffect } from 'react';
import type { BaZiChart, ZiWeiChart } from '../types/astrology.ts';
import { Send, Compass, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface MasterChatViewProps {
  bazi: BaZiChart | null;
  ziwei: ZiWeiChart | null;
  userName: string;
  gender: 1 | 0;
}

const QUICK_QUESTIONS = [
  '請問宗師，我命中的正緣大概何時會出現？在何種場合相遇機率最高？',
  '今年流年在事業上有何轉機？適合跳槽換行業或自行創業嗎？',
  '我的四柱八字中喜用神與忌神為何？平時日常穿戴顏色如何開運？',
  '請宗師依《滴天髓》為我解析日元旺衰，如何調濟性情與人際關係？',
  '大運如果與日柱或夫妻宮相衝，該如何化煞為權、避凶趨吉？',
];

export const MasterChatView: React.FC<MasterChatViewProps> = ({
  bazi,
  ziwei,
  userName,
  gender,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: `善信${userName || '緣主'}清安。老夫觀爾原局四柱${
        bazi
          ? `【${bazi.yearPillar.stem}${bazi.yearPillar.branch}、${bazi.monthPillar.stem}${bazi.monthPillar.branch}、${bazi.dayPillar.stem}${bazi.dayPillar.branch}、${bazi.timePillar.stem}${bazi.timePillar.branch}】，日元坐【${bazi.dayMaster}】`
          : ''
      }，氣象流通，自有定數與轉機。爾今若有工作仕途、姻緣正配、流年吉凶或化煞開運之困惑，皆可虔心叩問，老夫必傾囊相授，依正統易道為爾點破迷津。`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || isSending) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setInput('');
    setIsSending(true);

    try {
      const res = await fetch('/api/fortune/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          baziContext: bazi,
          ziweiContext: ziwei,
          userName: userName || '緣主',
          gender: gender === 1 ? '男' : '女',
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setMessages((prev) => [...prev, { role: 'model', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'model', content: '天機微茫，玄意未達。請善信稍歇片刻，再行問道。' },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: '易道通神，感應暫有阻滯，請善信重試。' },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'model',
        content: `善信${userName || '緣主'}心念更新，爐香再起。請隨心垂詢，老夫當以三書正法相授。`,
      },
    ]);
  };

  return (
    <div className="bg-[#11131a] border border-amber-900/30 rounded-xl shadow-xl shadow-black/40 flex flex-col h-[700px] overflow-hidden">
      {/* 宗師道場頂欄 */}
      <div className="p-4 sm:p-5 border-b border-stone-800 bg-gradient-to-r from-[#171a26] via-[#141620] to-[#171a26] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600/40 to-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-200 shadow-inner">
            <Compass className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-bold text-amber-100 text-sm sm:text-base flex items-center gap-2">
              <span>易道宗師御批 · 深度AI雙向問道</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/60 font-normal">
                專屬原局命盤連線
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {bazi
                ? `命主：${userName || '緣主'} · 日元【${bazi.dayMaster}】· 大運【${
                    bazi.currentDaYun?.ganZhi || '初運'
                  }】`
                : '請先在主頁排盤，以獲得精確至干支神煞的推算'}
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          title="清空對話重啟問道"
          className="p-2 rounded-lg bg-stone-800/60 hover:bg-stone-800 text-stone-400 hover:text-amber-200 border border-stone-700/60 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* 訊息展示區域 */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={index}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* 頭像 */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-amber-600 text-black shadow'
                    : 'bg-gradient-to-br from-amber-900 to-stone-900 text-amber-300 border border-amber-600/40 shadow-sm'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : '宗'}
              </div>

              {/* 對話氣泡 */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                  isUser
                    ? 'bg-amber-600/20 text-amber-100 border border-amber-500/40 rounded-tr-none'
                    : 'bg-[#181a26] text-stone-200 border border-stone-800 rounded-tl-none font-serif'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-900 to-stone-900 text-amber-300 border border-amber-600/40 flex items-center justify-center shrink-0 text-xs font-bold">
              宗
            </div>
            <div className="bg-[#181a26] text-amber-200/80 border border-stone-800 rounded-2xl rounded-tl-none p-4 text-xs flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
              <span>宗師演卦凝神中，審天道、按地氣、推演玄機...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 快捷靈動提問建議 */}
      <div className="px-4 py-2 bg-stone-900/40 border-t border-stone-800/60 overflow-x-auto scrollbar-none flex items-center gap-2">
        <span className="text-[11px] text-stone-500 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          常叩之問：
        </span>
        {QUICK_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isSending}
            className="text-xs px-2.5 py-1 rounded bg-[#181a24] hover:bg-amber-950/40 text-stone-300 hover:text-amber-200 border border-stone-800 hover:border-amber-700/50 whitespace-nowrap transition-colors shrink-0"
          >
            {q.length > 18 ? `${q.slice(0, 18)}...` : q}
          </button>
        ))}
      </div>

      {/* 輸入框 */}
      <div className="p-3 sm:p-4 border-t border-stone-800 bg-[#141620]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="向易道宗師垂詢姻緣、事業、大運轉機、開運玄機..."
            disabled={isSending}
            className="flex-1 bg-[#1a1d2a] border border-stone-700/80 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/80 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-50 font-bold text-xs sm:text-sm shadow-md border border-amber-400/40 flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">問道</span>
          </button>
        </form>
      </div>
    </div>
  );
};
