import React, { useState } from 'react';
import type { BaZiChart, DailyLoveFortuneResponse } from '../types/astrology.ts';
import { Heart, Sparkles, Compass, AlertCircle, Clock, Palette, CheckCircle2 } from 'lucide-react';

interface DailyLoveFortuneViewProps {
  bazi: BaZiChart | null;
  gender: 1 | 0;
}

export const DailyLoveFortuneView: React.FC<DailyLoveFortuneViewProps> = ({ bazi, gender }) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [relationshipStatus, setRelationshipStatus] = useState<'single' | 'dating' | 'married'>('single');
  const [isLoading, setIsLoading] = useState(false);
  const [loveData, setLoveData] = useState<DailyLoveFortuneResponse | null>(null);

  const handleFetchDailyLove = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/fortune/daily-love', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate,
          bazi,
          gender,
          relationshipStatus,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setLoveData(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#11131a] border border-amber-900/30 rounded-xl p-5 sm:p-6 shadow-xl shadow-black/40 space-y-6">
      {/* 標題 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-stone-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-rose-950/60 border border-rose-700/50 flex items-center justify-center text-rose-300 font-bold">
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
              <span>每日姻緣運勢與好運指數</span>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 font-normal">
                紅鸞咸池桃花感應
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              觀測當日流日干支與本命日柱、夫妻宮之感應，提供具體結緣、相處與開運建議
            </p>
          </div>
        </div>
      </div>

      {/* 控制器 */}
      <div className="bg-[#151722] p-4 rounded-xl border border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              選擇推演日期
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-[#181a24] border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-200 focus:outline-none focus:border-amber-500/80"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              當前情感狀態
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setRelationshipStatus('single')}
                className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all ${
                  relationshipStatus === 'single'
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold'
                    : 'bg-[#181a24] border-stone-700/80 text-stone-400'
                }`}
              >
                單身求緣
              </button>
              <button
                type="button"
                onClick={() => setRelationshipStatus('dating')}
                className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all ${
                  relationshipStatus === 'dating'
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold'
                    : 'bg-[#181a24] border-stone-700/80 text-stone-400'
                }`}
              >
                戀愛交往中
              </button>
              <button
                type="button"
                onClick={() => setRelationshipStatus('married')}
                className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all ${
                  relationshipStatus === 'married'
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold'
                    : 'bg-[#181a24] border-stone-700/80 text-stone-400'
                }`}
              >
                已婚琴瑟
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleFetchDailyLove}
          disabled={isLoading}
          className="py-2.5 px-6 rounded-lg bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-600 hover:to-rose-700 text-rose-50 font-bold text-sm shadow-md border border-rose-400/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-rose-200 border-t-transparent rounded-full animate-spin"></div>
              <span>感應桃花氣機中...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-rose-300" />
              <span>測算今日姻緣</span>
            </>
          )}
        </button>
      </div>

      {/* 推算結果 */}
      {loveData ? (
        <div className="space-y-5">
          {/* 指數與桃花動向卡 */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-rose-950/40 via-[#181a24] to-rose-950/40 border border-rose-900/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-rose-300 font-semibold mb-1">
                <span>陽曆：{loveData.date}</span>
                <span>·</span>
                <span className="font-serif">當日流日：{loveData.ganZhi}日</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-rose-100 flex items-center gap-2">
                <span>今日桃花動態：{loveData.peachBlossomStatus}</span>
              </h4>
            </div>

            {/* 好運指數儀表盤視覺 */}
            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-rose-900/50">
              <div className="relative w-14 h-14 flex items-center justify-center rounded-full border-2 border-rose-500/60 bg-rose-950/40">
                <span className="text-xl font-black text-rose-200">
                  {loveData.loveScore}
                </span>
                <span className="absolute -bottom-2 text-[9px] px-1 rounded bg-rose-600 text-white font-bold">
                  指數
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-rose-200">
                  {loveData.loveScore >= 80 ? '桃花正旺 · 良緣合契' : loveData.loveScore >= 60 ? '平順溫馨 · 宜守常道' : '微帶波折 · 靜心修和'}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  今日姻緣好運指數
                </div>
              </div>
            </div>
          </div>

          {/* 單身者 vs 有伴侶者 雙向建議 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#151722] border border-stone-800 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>單身緣友 · 遇緣與脫單指南</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed bg-stone-900/60 p-3.5 rounded border border-stone-800">
                {loveData.singleAdvice}
              </p>
            </div>

            <div className="bg-[#151722] border border-stone-800 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-xs sm:text-sm mb-2.5">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>有伴侶 / 已婚者 · 恩愛相處指引</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed bg-stone-900/60 p-3.5 rounded border border-stone-800">
                {loveData.inRelationshipAdvice}
              </p>
            </div>
          </div>

          {/* 吉方、開運色、吉時、避忌 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#151722] p-3.5 rounded-xl border border-stone-800 text-center">
              <Compass className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
              <div className="text-[11px] text-stone-400">桃花吉方</div>
              <div className="text-xs font-bold text-amber-200 mt-0.5">
                {loveData.luckyDirection}
              </div>
            </div>

            <div className="bg-[#151722] p-3.5 rounded-xl border border-stone-800 text-center">
              <Palette className="w-4 h-4 text-rose-400 mx-auto mb-1.5" />
              <div className="text-[11px] text-stone-400">今日開運色系</div>
              <div className="text-xs font-bold text-rose-200 mt-0.5">
                {loveData.luckyColor}
              </div>
            </div>

            <div className="bg-[#151722] p-3.5 rounded-xl border border-stone-800 text-center">
              <Clock className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
              <div className="text-[11px] text-stone-400">最佳結緣時辰</div>
              <div className="text-xs font-bold text-emerald-200 mt-0.5">
                {loveData.luckyHour}
              </div>
            </div>

            <div className="bg-[#151722] p-3.5 rounded-xl border border-stone-800 text-center">
              <AlertCircle className="w-4 h-4 text-orange-400 mx-auto mb-1.5" />
              <div className="text-[11px] text-stone-400">今日避忌之事</div>
              <div className="text-xs font-bold text-orange-200 mt-0.5 truncate" title={loveData.warning}>
                {loveData.warning}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-[#151722] rounded-xl border border-dashed border-stone-800 text-stone-500 text-xs">
          點擊「測算今日姻緣」，即可啟動紅鸞星辰之感應。
        </div>
      )}
    </div>
  );
};
