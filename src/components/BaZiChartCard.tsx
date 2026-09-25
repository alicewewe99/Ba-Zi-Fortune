import React from 'react';
import type { BaZiChart, PillarInfo } from '../types/astrology.ts';
import { Flame, Droplets, Mountain, Trees, ShieldAlert, Sparkles, Compass } from 'lucide-react';

interface BaZiChartCardProps {
  bazi: BaZiChart;
  userName: string;
}

// 顏色對應五行
const ELEMENT_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  金: { text: 'text-amber-200', bg: 'bg-amber-950/40', border: 'border-amber-600/40' },
  木: { text: 'text-emerald-300', bg: 'bg-emerald-950/40', border: 'border-emerald-600/40' },
  水: { text: 'text-sky-300', bg: 'bg-sky-950/40', border: 'border-sky-600/40' },
  火: { text: 'text-rose-300', bg: 'bg-rose-950/40', border: 'border-rose-600/40' },
  土: { text: 'text-amber-400', bg: 'bg-yellow-950/40', border: 'border-yellow-700/40' },
};

export const BaZiChartCard: React.FC<BaZiChartCardProps> = ({ bazi, userName }) => {
  const pillars: Array<{ title: string; pillar: PillarInfo; isDayMaster?: boolean }> = [
    { title: '時柱 · 歸宿門戶', pillar: bazi.timePillar },
    { title: '日柱 · 元神妻妾', pillar: bazi.dayPillar, isDayMaster: true },
    { title: '月柱 · 提綱月令', pillar: bazi.monthPillar },
    { title: '年柱 · 祖德根基', pillar: bazi.yearPillar },
  ];

  return (
    <div className="bg-[#11131a] border border-amber-900/30 rounded-xl p-5 sm:p-6 shadow-xl shadow-black/40 space-y-6">
      {/* 標題與簡介 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-stone-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-amber-900/40 border border-amber-700/50 flex items-center justify-center text-amber-300 font-bold">
            八
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
              <span>四柱八字乾坤命盤</span>
              <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-normal">
                日元：{bazi.dayMaster}（{bazi.dayMasterElement}）
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {bazi.solarDateStr} · {bazi.lunarDateStr}
            </p>
          </div>
        </div>

        {/* 節氣與三宮 */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-300">
          <span className="px-2 py-1 bg-stone-900/80 rounded border border-stone-800">
            當令：<strong className="text-amber-200">{bazi.solarTerm}</strong>
          </span>
          <span className="px-2 py-1 bg-stone-900/80 rounded border border-stone-800">
            命宮：<strong className="text-amber-200">{bazi.mingGong}</strong>
          </span>
          <span className="px-2 py-1 bg-stone-900/80 rounded border border-stone-800">
            身宮：<strong className="text-amber-200">{bazi.shenGong}</strong>
          </span>
          <span className="px-2 py-1 bg-stone-900/80 rounded border border-stone-800">
            胎元：<strong className="text-amber-200">{bazi.taiYuan}</strong>
          </span>
        </div>
      </div>

      {/* 四柱排盤展示 (由右至左：年、月、日、時 或 由左至右清晰排佈) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {pillars.map(({ title, pillar, isDayMaster }, idx) => {
          const stemStyle = ELEMENT_COLORS[pillar.stemElement] || ELEMENT_COLORS['土'];
          const branchStyle = ELEMENT_COLORS[pillar.branchElement] || ELEMENT_COLORS['土'];

          return (
            <div
              key={idx}
              className={`rounded-lg border p-3 sm:p-4 text-center relative transition-all ${
                isDayMaster
                  ? 'bg-gradient-to-b from-amber-950/30 to-[#141620] border-amber-500/60 ring-1 ring-amber-500/20 shadow-md shadow-amber-950/20'
                  : 'bg-[#151722] border-stone-800 hover:border-stone-700'
              }`}
            >
              {isDayMaster && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-500 text-[#0c0d12] text-[10px] font-black tracking-wider shadow">
                  本命日元
                </div>
              )}

              {/* 柱位標題 */}
              <div className="text-xs font-medium text-stone-400 mb-2">
                {title}
              </div>

              {/* 十神天干 */}
              <div className="text-xs font-semibold text-amber-300/90 mb-1">
                {pillar.tenGod}
              </div>

              {/* 天干 */}
              <div className={`text-2xl sm:text-3xl font-extrabold my-1 ${stemStyle.text} font-serif`}>
                {pillar.stem}
                <span className="text-[10px] ml-1 opacity-70 font-sans font-normal">
                  ({pillar.stemElement})
                </span>
              </div>

              {/* 地支 */}
              <div className={`text-2xl sm:text-3xl font-extrabold my-1 ${branchStyle.text} font-serif`}>
                {pillar.branch}
                <span className="text-[10px] ml-1 opacity-70 font-sans font-normal">
                  ({pillar.branchElement})
                </span>
              </div>

              {/* 納音五行 */}
              <div className="mt-2 pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                納音：<span className="text-stone-300 font-medium">{pillar.naYin}</span>
              </div>

              {/* 地支藏干 */}
              <div className="mt-1 text-[11px] text-stone-400">
                藏干：
                <span className="text-amber-200/80">
                  {pillar.hiddenStems.join(' ')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 五行強弱分佈條 */}
      <div className="bg-[#151722] rounded-lg p-3.5 sm:p-4 border border-stone-800/80">
        <div className="flex items-center justify-between text-xs text-stone-300 mb-2.5">
          <span className="font-semibold flex items-center gap-1.5 text-amber-200">
            <Sparkles className="w-3.5 h-3.5" />
            原局五行權重分佈
          </span>
          <span className="text-stone-500">以干支八字及藏干氣勢參照</span>
        </div>
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {Object.entries(bazi.wuxingCount).map(([el, count]) => {
            const style = ELEMENT_COLORS[el] || ELEMENT_COLORS['土'];
            return (
              <div key={el} className={`p-2 rounded border ${style.bg} ${style.border}`}>
                <div className={`font-bold ${style.text}`}>{el}</div>
                <div className="text-stone-300 text-sm font-bold mt-0.5">{count} 點</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 神煞吉凶總覽 */}
      <div className="bg-[#151722] rounded-lg p-3.5 sm:p-4 border border-stone-800/80">
        <div className="text-xs font-semibold text-amber-200 flex items-center gap-1.5 mb-2">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          本命所附吉凶神煞（《三命通會》傳承）
        </div>
        <div className="flex flex-wrap gap-2">
          {bazi.shenSha.map((s, idx) => (
            <div
              key={idx}
              className="text-xs px-2.5 py-1 rounded bg-stone-900 border border-stone-700/80 text-amber-100/90 font-medium"
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* 大運十年輪轉表 */}
      <div className="bg-[#151722] rounded-lg p-3.5 sm:p-4 border border-stone-800/80">
        <div className="flex items-center justify-between text-xs text-stone-300 mb-2.5">
          <span className="font-semibold text-amber-200">
            十年大運輪替軸
          </span>
          {bazi.currentDaYun && (
            <span className="text-xs text-amber-300 font-bold">
              目前正行：{bazi.currentDaYun.age}歲起【{bazi.currentDaYun.ganZhi}】大運
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {bazi.daYunList.map((dy, idx) => {
            const isCurrent = bazi.currentDaYun?.ganZhi === dy.ganZhi;
            return (
              <div
                key={idx}
                className={`p-2 rounded text-center border transition-all ${
                  isCurrent
                    ? 'bg-amber-600/20 border-amber-500 shadow-sm shadow-amber-500/20'
                    : 'bg-stone-900/60 border-stone-800'
                }`}
              >
                <div className="text-[10px] text-stone-400">
                  {dy.startAge}-{dy.endAge}歲
                </div>
                <div className={`text-base font-bold my-0.5 font-serif ${isCurrent ? 'text-amber-200' : 'text-stone-200'}`}>
                  {dy.ganZhi}
                </div>
                <div className="text-[10px] text-stone-500">
                  {dy.startYear}年
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
