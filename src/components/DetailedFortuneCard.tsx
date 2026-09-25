import React, { useState } from 'react';
import type { MetaphysicsAnalysis } from '../types/astrology.ts';
import { Briefcase, Coins, Heart, Compass, ShieldAlert, Sparkles, Scroll, Calendar, UserCheck } from 'lucide-react';

interface DetailedFortuneCardProps {
  analysis: MetaphysicsAnalysis;
  targetYear: number;
}

export const DetailedFortuneCard: React.FC<DetailedFortuneCardProps> = ({ analysis, targetYear }) => {
  const [subTab, setSubTab] = useState<'love' | 'career' | 'wealth' | 'annual'>('love');

  return (
    <div className="bg-[#11131a] border border-amber-900/30 rounded-xl p-5 sm:p-6 shadow-xl shadow-black/40 space-y-6">
      {/* 宗師御批七言斷命詩與開運箴言 (典雅卷軸設計) */}
      <div className="relative p-5 sm:p-6 rounded-xl bg-gradient-to-r from-amber-950/40 via-[#181a24] to-amber-950/40 border border-amber-500/40 shadow-inner">
        <div className="flex items-center gap-2 mb-3">
          <Scroll className="w-5 h-5 text-amber-400" />
          <h4 className="font-bold text-base text-amber-200 tracking-wider">
            易道宗師御批 · 命運玄機七言詩
          </h4>
        </div>
        <div className="py-2.5 px-4 rounded-lg bg-black/40 border border-amber-700/30 my-2 text-center">
          <p className="text-base sm:text-lg font-bold tracking-widest text-amber-100 font-serif leading-relaxed">
            「{analysis.masterPoem}」
          </p>
        </div>
        <div className="text-xs text-stone-300 mt-2.5 flex items-start gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-amber-200">宗師開運化煞指引：</strong>
            {analysis.masterAdvice}
          </span>
        </div>
      </div>

      {/* 四大領域切換標籤 (姻緣、事業、金錢、流年大運) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-stone-800 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-amber-900/40 border border-amber-700/50 flex items-center justify-center text-amber-300 font-bold">
            批
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-amber-100">
              {targetYear}年度運勢與四大核心專題
            </h3>
            <p className="text-xs text-stone-400">
              流年干支：【{analysis.annualFortune.yearGanZhi}】 · 綜合吉運：{analysis.annualFortune.overallScore} 分
            </p>
          </div>
        </div>

        {/* 標籤按鈕 */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setSubTab('love')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'love'
                ? 'bg-rose-950/80 text-rose-200 border border-rose-500 font-bold shadow-md shadow-rose-950/40'
                : 'bg-stone-800/60 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>詳細白話姻緣</span>
          </button>

          <button
            onClick={() => setSubTab('career')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'career'
                ? 'bg-blue-950/80 text-blue-200 border border-blue-500 font-bold shadow-md shadow-blue-950/40'
                : 'bg-stone-800/60 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>工作仕途晉升</span>
          </button>

          <button
            onClick={() => setSubTab('wealth')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'wealth'
                ? 'bg-yellow-950/80 text-yellow-200 border border-yellow-500 font-bold shadow-md shadow-yellow-950/40'
                : 'bg-stone-800/60 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-yellow-400" />
            <span>金錢財庫聚散</span>
          </button>

          <button
            onClick={() => setSubTab('annual')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'annual'
                ? 'bg-amber-950/80 text-amber-200 border border-amber-500 font-bold shadow-md shadow-amber-950/40'
                : 'bg-stone-800/60 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>大運流年走勢</span>
          </button>
        </div>
      </div>

      {/* 1. 姻緣發展專題 (重點詳細白話文需求) */}
      {subTab === 'love' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-rose-950/30 to-[#151722] border border-rose-900/40 rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-rose-900/30">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400 animate-pulse" />
                <h4 className="font-bold text-base text-rose-200">
                  命中姻緣發展與正緣配偶白話詳解
                </h4>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-stone-400">姻緣評分：</span>
                <span className="text-base font-bold text-rose-300">
                  {analysis.loveFortuneDetail.score} 分
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-200 mt-3 leading-relaxed">
              {analysis.loveFortuneDetail.relationshipOverview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 對象年齡區間 */}
            <div className="bg-[#151722] border border-stone-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5 mb-2">
                  <UserCheck className="w-4 h-4 text-rose-400" />
                  對象年齡區間與歲數差距
                </span>
                <p className="text-xs text-stone-200 leading-relaxed bg-stone-900/60 p-3 rounded border border-stone-800/80">
                  {analysis.loveFortuneDetail.partnerAgeRange}
                </p>
              </div>
              <div className="text-[11px] text-stone-500 mt-3">
                依據夫妻宮藏干與大運生剋推算
              </div>
            </div>

            {/* 對象職業與外貌性格 */}
            <div className="bg-[#151722] border border-stone-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 mb-2">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  對象職業方向與背景氣質
                </span>
                <p className="text-xs text-stone-200 leading-relaxed bg-stone-900/60 p-3 rounded border border-stone-800/80">
                  {analysis.loveFortuneDetail.partnerProfession}
                </p>
              </div>
              <div className="text-[11px] text-stone-500 mt-3">
                由命宮與夫妻宮正曜五行取象
              </div>
            </div>

            {/* 命中相遇時間與契機 */}
            <div className="bg-[#151722] border border-stone-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  相遇時間節點與結緣場景
                </span>
                <p className="text-xs text-stone-200 leading-relaxed bg-stone-900/60 p-3 rounded border border-stone-800/80">
                  {analysis.loveFortuneDetail.encounterTiming}
                </p>
              </div>
              <div className="text-[11px] text-stone-500 mt-3">
                引動紅鸞、天喜或流年地支六合
              </div>
            </div>
          </div>

          {/* 相處維繫實務建議 */}
          <div className="bg-[#151722] border border-stone-800 rounded-xl p-4">
            <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5 mb-2">
              <Compass className="w-4 h-4 text-rose-400" />
              相處維繫與增旺桃花白話建議
            </span>
            <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3.5 rounded border border-stone-800/80">
              {analysis.loveFortuneDetail.actionAdvice}
            </p>
          </div>
        </div>
      )}

      {/* 2. 事業工作專題 */}
      {subTab === 'career' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-950/30 to-[#151722] border border-blue-900/40 rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/30">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <h4 className="font-bold text-base text-blue-200">
                  工作事業仕途深度推演
                </h4>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-stone-400">事業評分：</span>
                <span className="text-base font-bold text-blue-300">
                  {analysis.careerFortune.score} 分
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-200 mt-3 leading-relaxed">
              {analysis.careerFortune.analysis}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#151722] border border-stone-800 rounded-xl p-4">
              <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                今年職場關鍵機遇
              </span>
              <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded border border-stone-800/80">
                {analysis.careerFortune.opportunities}
              </p>
            </div>

            <div className="bg-[#151722] border border-stone-800 rounded-xl p-4">
              <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5 mb-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                需謹慎防範的暗礁陷阱
              </span>
              <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded border border-stone-800/80">
                {analysis.careerFortune.challenges}
              </p>
            </div>
          </div>

          <div className="bg-[#151722] border border-stone-800 rounded-xl p-4">
            <span className="text-xs font-semibold text-amber-300 block mb-2">
              適宜深耕之五行產業領域
            </span>
            <div className="flex flex-wrap gap-2">
              {analysis.careerFortune.prospectiveFields.map((field, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-stone-200"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. 金錢財庫專題 */}
      {subTab === 'wealth' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-yellow-950/30 to-[#151722] border border-yellow-900/40 rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-yellow-900/30">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                <h4 className="font-bold text-base text-yellow-200">
                  金錢財富與財庫聚散
                </h4>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-stone-400">財富評分：</span>
                <span className="text-base font-bold text-yellow-300">
                  {analysis.wealthFortune.score} 分
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-200 mt-3 leading-relaxed">
              {analysis.wealthFortune.analysis}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#151722] border border-stone-800 rounded-xl p-4">
              <span className="text-xs font-semibold text-amber-300 block mb-2">
                正財與偏財格局分佈
              </span>
              <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded border border-stone-800/80">
                {analysis.wealthFortune.zhengCaiPianCai}
              </p>
            </div>

            <div className="bg-[#151722] border border-stone-800 rounded-xl p-4">
              <span className="text-xs font-semibold text-emerald-300 block mb-2">
                投資理財與金錢收支時機
              </span>
              <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded border border-stone-800/80">
                {analysis.wealthFortune.investmentTiming}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. 年度大運流年走勢 */}
      {subTab === 'annual' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-amber-950/30 to-[#151722] border border-amber-900/40 rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/30">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-base text-amber-200">
                  【{analysis.annualFortune.yearGanZhi}】年度總運評述
                </h4>
              </div>
              <div className="text-xs text-stone-400">
                年度吉運指數：
                <span className="text-base font-bold text-amber-300">
                  {analysis.annualFortune.overallScore} 分
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-200 mt-3 leading-relaxed">
              {analysis.annualFortune.overview}
            </p>
          </div>

          <div className="bg-[#151722] border border-stone-800 rounded-xl p-4">
            <span className="text-xs font-semibold text-amber-300 block mb-2">
              當前十年大運與流年干支刑衝合會
            </span>
            <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded border border-stone-800/80">
              {analysis.annualFortune.daYunInteraction}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
