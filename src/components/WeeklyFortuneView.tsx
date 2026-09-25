import React, { useState } from 'react';
import type { BaZiChart, WeeklyFortuneResponse } from '../types/astrology.ts';
import { CalendarRange, Sparkles, AlertTriangle, ShieldCheck, Briefcase, Heart, Coins, Activity, RefreshCw } from 'lucide-react';

interface WeeklyFortuneViewProps {
  bazi: BaZiChart | null;
  userName: string;
}

export const WeeklyFortuneView: React.FC<WeeklyFortuneViewProps> = ({ bazi, userName }) => {
  // 預設為當前週 (本週一至本週日)
  const today = new Date();
  const currentDayOfWeek = today.getDay() || 7; // 1 (Mon) - 7 (Sun)
  const monday = new Date(today);
  monday.setDate(today.getDate() - currentDayOfWeek + 1);
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - currentDayOfWeek + 7);

  const formatDate = (d: Date) => d.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(formatDate(monday));
  const [endDate, setEndDate] = useState(formatDate(sunday));
  const [isLoading, setIsLoading] = useState(false);
  const [weeklyData, setWeeklyData] = useState<WeeklyFortuneResponse | null>(null);

  const handleFetchWeeklyFortune = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/fortune/weekly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate,
          endDate,
          bazi,
          userName: userName || '緣主',
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setWeeklyData(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getLuckLevelBadge = (level: string) => {
    switch (level) {
      case '大吉':
        return <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">大吉</span>;
      case '吉':
        return <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">吉</span>;
      case '平':
        return <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">平</span>;
      case '宜慎':
        return <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-semibold">宜慎</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">{level}</span>;
    }
  };

  return (
    <div className="bg-[#11131a] border border-amber-900/30 rounded-xl p-5 sm:p-6 shadow-xl shadow-black/40 space-y-6">
      {/* 標題與說明 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-stone-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-amber-900/40 border border-amber-700/50 flex items-center justify-center text-amber-300 font-bold">
            <CalendarRange className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
              <span>手動自選區間每週運勢</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/60 font-normal">
                精準天干地支五行流轉
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              手動自訂觀察日期區間，推演本週天象氣機、重要注意事項、專題解析與宗師建言
            </p>
          </div>
        </div>
      </div>

      {/* 手動日期區間選擇器 */}
      <div className="bg-[#151722] p-4 rounded-xl border border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              起始日期 (週一或自定起始)
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-[#181a24] border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-200 focus:outline-none focus:border-amber-500/80"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              截止日期 (週末或自定截止)
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-[#181a24] border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-200 focus:outline-none focus:border-amber-500/80"
            />
          </div>
        </div>

        <button
          onClick={handleFetchWeeklyFortune}
          disabled={isLoading}
          className="py-2.5 px-6 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-50 font-bold text-sm shadow-md border border-amber-400/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-amber-200 border-t-transparent rounded-full animate-spin"></div>
              <span>運算天象週運中...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>推演區間週運</span>
            </>
          )}
        </button>
      </div>

      {/* 推算結果展示 */}
      {weeklyData ? (
        <div className="space-y-6">
          {/* 本週綜述與吉運分數 */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/30 to-[#181a24] border border-amber-900/40">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-amber-900/30 gap-2">
              <div>
                <span className="text-xs text-amber-400 font-bold">
                  【{weeklyData.dateRange}】運勢總結
                </span>
                <h4 className="text-base font-bold text-amber-100 mt-1">
                  {weeklyData.weekSummary}
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] text-stone-400">本週吉運評分</div>
                  <div className="text-xl font-black text-amber-300">
                    {weeklyData.luckyScore} 分
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-stone-300">
              <span className="font-semibold text-emerald-300">本週最吉之日：</span>
              <div className="flex flex-wrap gap-1.5">
                {weeklyData.favorableDays.map((day, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs font-medium"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 兩大警訊與宗師建議 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 本週注意事項 */}
            <div className="bg-[#151722] border border-rose-900/50 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm mb-3">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>本週重要注意事項（宜防範事項）</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-300 leading-relaxed">
                {weeklyData.cautions.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-rose-950/20 p-2.5 rounded border border-rose-950/60">
                    <span className="text-rose-400 font-bold mt-0.5">·</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 宗師開運建言 */}
            <div className="bg-[#151722] border border-emerald-900/50 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>易道宗師避凶化吉建議</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-300 leading-relaxed">
                {weeklyData.masterSuggestions.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-emerald-950/20 p-2.5 rounded border border-emerald-950/60">
                    <span className="text-emerald-400 font-bold mt-0.5">·</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 四大專題深度解析 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#151722] p-4 rounded-xl border border-stone-800">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-300 mb-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>事業職場解析</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {weeklyData.analysis.career}
              </p>
            </div>

            <div className="bg-[#151722] p-4 rounded-xl border border-stone-800">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-yellow-300 mb-2">
                <Coins className="w-3.5 h-3.5" />
                <span>金錢財庫解析</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {weeklyData.analysis.wealth}
              </p>
            </div>

            <div className="bg-[#151722] p-4 rounded-xl border border-stone-800">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-300 mb-2">
                <Heart className="w-3.5 h-3.5" />
                <span>情感人際解析</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {weeklyData.analysis.love}
              </p>
            </div>

            <div className="bg-[#151722] p-4 rounded-xl border border-stone-800">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 mb-2">
                <Activity className="w-3.5 h-3.5" />
                <span>健康心態調候</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {weeklyData.analysis.health}
              </p>
            </div>
          </div>

          {/* 每日運勢簡析清單 */}
          <div className="bg-[#151722] rounded-xl border border-stone-800 overflow-hidden">
            <div className="p-3.5 border-b border-stone-800 font-bold text-xs text-amber-200">
              自選區間每日天干地支與吉凶速查
            </div>
            <div className="divide-y divide-stone-800">
              {weeklyData.dailyBreakdown.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between text-xs hover:bg-stone-900/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-stone-400">{item.date}</span>
                    <span className="font-serif text-amber-300 font-semibold px-2 py-0.5 rounded bg-stone-900 border border-stone-800">
                      {item.dayGanZhi}日
                    </span>
                    <span className="text-stone-300">{item.highlight}</span>
                  </div>
                  <div>{getLuckLevelBadge(item.luckLevel)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-[#151722] rounded-xl border border-dashed border-stone-800 text-stone-500 text-xs">
          請點擊上方「推演區間週運」按鈕，即可排演該週五行干支之吉凶起伏。
        </div>
      )}
    </div>
  );
};
