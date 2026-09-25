import React from 'react';
import type { MetaphysicsAnalysis } from '../types/astrology.ts';
import { BookOpen, Sparkles, Flame, Droplets, Compass } from 'lucide-react';

interface ClassicAnalysisCardProps {
  analysis: MetaphysicsAnalysis;
}

export const ClassicAnalysisCard: React.FC<ClassicAnalysisCardProps> = ({ analysis }) => {
  return (
    <div className="bg-[#11131a] border border-amber-900/30 rounded-xl p-5 sm:p-6 shadow-xl shadow-black/40 space-y-6">
      {/* 頂部標題 */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-stone-800">
        <div className="w-8 h-8 rounded bg-amber-900/40 border border-amber-700/50 flex items-center justify-center text-amber-300 font-bold">
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
            <span>三大古籍命理精批</span>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40 text-amber-300 font-normal">
              正宗易學傳承
            </span>
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            《三命通會》定格取用 · 《滴天髓》流通抑揚 · 《窮通寶鑒》天時調候
          </p>
        </div>
      </div>

      {/* 三本古籍專屬板塊 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 1. 《三命通會》 */}
        <div className="bg-[#151722] border border-stone-800/90 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-amber-700/50 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="font-bold text-amber-200 text-sm flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400" />
                《三命通會》格局與十神
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40 font-semibold">
                {analysis.sanMingTongHui.patternName}
              </span>
            </div>

            <div className="mt-3.5 space-y-3 text-xs leading-relaxed text-stone-300">
              <div>
                <span className="text-stone-400 font-medium block mb-1">
                  【格局成敗與十神精析】：
                </span>
                <p className="text-stone-200 bg-stone-900/60 p-3 rounded border border-stone-800/60">
                  {analysis.sanMingTongHui.patternAnalysis}
                </p>
              </div>

              <div>
                <span className="text-stone-400 font-medium block mb-1">
                  【吉凶神煞感應】：
                </span>
                <p className="text-amber-100/90 bg-amber-950/20 p-2.5 rounded border border-amber-900/40">
                  {analysis.sanMingTongHui.shenShaSignificance}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-stone-800/60 text-[11px] text-stone-500">
            明代萬民英《三命通會》：格局為綱，十神為緯，辨吉凶之表裡。
          </div>
        </div>

        {/* 2. 《滴天髓》 */}
        <div className="bg-[#151722] border border-stone-800/90 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-700/50 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                《滴天髓》流通與用神
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-semibold">
                {analysis.diTianSui.balanceStatus}
              </span>
            </div>

            <div className="mt-3.5 space-y-3 text-xs leading-relaxed text-stone-300">
              <div>
                <span className="text-stone-400 font-medium block mb-1">
                  【五行氣象與流通生剋】：
                </span>
                <p className="text-stone-200 bg-stone-900/60 p-3 rounded border border-stone-800/60">
                  {analysis.diTianSui.qiFlowAnalysis}
                </p>
              </div>

              <div>
                <span className="text-stone-400 font-medium block mb-1">
                  【用神抑揚與喜忌斷定】：
                </span>
                <p className="text-emerald-100/90 bg-emerald-950/20 p-2.5 rounded border border-emerald-900/40">
                  {analysis.diTianSui.yongShenVerdict}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-stone-800/60 text-[11px] text-stone-500">
            宋代京圖撰·任鐵樵註《滴天髓》：順逆生剋，中和純粹，察源頭而知歸宿。
          </div>
        </div>

        {/* 3. 《窮通寶鑒》 */}
        <div className="bg-[#151722] border border-stone-800/90 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-sky-700/50 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="font-bold text-sky-300 text-sm flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-400" />
                《窮通寶鑒》天時調候
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800/40 font-semibold">
                {analysis.qiongTongBaoJian.seasonalClimate}
              </span>
            </div>

            <div className="mt-3.5 space-y-3 text-xs leading-relaxed text-stone-300">
              <div>
                <span className="text-stone-400 font-medium block mb-1">
                  【月令寒暖燥濕與氣候特性】：
                </span>
                <p className="text-stone-200 bg-stone-900/60 p-3 rounded border border-stone-800/60">
                  本造生於當令時節，天道運行自有寒暑進退。{analysis.qiongTongBaoJian.seasonalClimate}
                </p>
              </div>

              <div>
                <span className="text-stone-400 font-medium block mb-1">
                  【調候神用與氣候救應】：
                </span>
                <p className="text-sky-100/90 bg-sky-950/20 p-2.5 rounded border border-sky-900/40">
                  {analysis.qiongTongBaoJian.tiaoHouAnalysis}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-stone-800/60 text-[11px] text-stone-500">
            清代余春台《窮通寶鑒》：十干配十二月，全在調候得宜，水暖木榮，火煉秋金。
          </div>
        </div>
      </div>
    </div>
  );
};
