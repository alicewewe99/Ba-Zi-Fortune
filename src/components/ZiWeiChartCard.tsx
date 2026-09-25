import React, { useState } from 'react';
import type { ZiWeiChart, ZiWeiPalace } from '../types/astrology.ts';
import { Stars, Sparkles, Heart, DollarSign, Briefcase, UserCheck } from 'lucide-react';

interface ZiWeiChartCardProps {
  ziwei: ZiWeiChart;
}

export const ZiWeiChartCard: React.FC<ZiWeiChartCardProps> = ({ ziwei }) => {
  const [selectedPalace, setSelectedPalace] = useState<string>('命宮');

  // 尋找特殊四宮以做快速切換
  const activePalaceData = ziwei.palaces.find((p) => p.name === selectedPalace) || ziwei.palaces[0];

  const getPalaceBadge = (name: string) => {
    switch (name) {
      case '命宮':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">元神核心</span>;
      case '夫妻宮':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700">姻緣正配</span>;
      case '財帛宮':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-950 text-yellow-300 border border-yellow-700">資產財庫</span>;
      case '官祿宮':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-700">仕途官祿</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#11131a] border border-amber-900/30 rounded-xl p-5 sm:p-6 shadow-xl shadow-black/40 space-y-6">
      {/* 標題與局數 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-stone-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-indigo-950/60 border border-indigo-700/50 flex items-center justify-center text-indigo-300 font-bold">
            薇
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
              <span>紫微斗數十二宮命盤</span>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-950/70 border border-indigo-800/60 text-indigo-200 font-normal">
                {ziwei.wuxingJu}
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              命坐【{ziwei.mingGongBranch}】宮 · 身坐【{ziwei.shenGongBranch}】宮 · 北斗主星與天府星系巡行
            </p>
          </div>
        </div>

        {/* 快速切換重要宮位 */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {['命宮', '夫妻宮', '財帛宮', '官祿宮', '遷移宮', '福德宮'].map((pName) => (
            <button
              key={pName}
              onClick={() => setSelectedPalace(pName)}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                selectedPalace === pName
                  ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50 font-bold'
                  : 'bg-stone-800/60 text-stone-400 hover:text-stone-200'
              }`}
            >
              {pName}
            </button>
          ))}
        </div>
      </div>

      {/* 十二宮方格佈局 (3x4 或 4x3 網格) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {ziwei.palaces.map((p) => {
          const isSelected = selectedPalace === p.name;
          const isMing = p.name === '命宮';
          const isFuQi = p.name === '夫妻宮';

          return (
            <div
              key={p.name}
              onClick={() => setSelectedPalace(p.name)}
              className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col justify-between min-h-[140px] ${
                isSelected
                  ? 'bg-indigo-950/30 border-amber-500/80 ring-1 ring-amber-500/30 shadow-lg'
                  : isMing
                  ? 'bg-amber-950/20 border-amber-900/60'
                  : isFuQi
                  ? 'bg-rose-950/20 border-rose-900/60'
                  : 'bg-[#151722] border-stone-800/80 hover:border-stone-700'
              }`}
            >
              {/* 宮名與宮干支 */}
              <div className="flex items-center justify-between border-b border-stone-800/60 pb-1.5">
                <span className="font-bold text-xs text-amber-200 flex items-center gap-1">
                  {p.name}
                  {p.isBodyPalace && (
                    <span className="text-[9px] px-1 rounded bg-stone-800 text-stone-400">
                      身
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-stone-400 font-serif">
                  {p.stem}{p.branch}
                </span>
              </div>

              {/* 宮內主星 */}
              <div className="my-2 space-y-1">
                {p.majorStars.length > 0 ? (
                  p.majorStars.map((s) => (
                    <div
                      key={s.name}
                      className="text-xs font-bold text-amber-100 flex items-center justify-between"
                    >
                      <span className="text-amber-200">{s.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-[11px] text-stone-500 italic">無十四正曜 (借對宮)</div>
                )}

                {/* 四化 */}
                {p.yearlyTransforms && p.yearlyTransforms.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.yearlyTransforms.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] px-1 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800 font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 輔星 */}
              <div className="pt-1.5 border-t border-stone-800/40 text-[10px] text-stone-400 flex flex-wrap gap-1">
                {p.minorStars.map((s) => (
                  <span key={s.name} className="text-stone-300">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 當前選中宮位的深度星情精析卡 */}
      {activePalaceData && (
        <div className="bg-gradient-to-r from-[#171a26] to-[#141620] border border-amber-900/40 rounded-lg p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-amber-200 text-sm sm:text-base flex items-center gap-2">
                <span>【{activePalaceData.name}】星情象意解析</span>
                <span className="text-xs text-stone-400 font-normal">
                  （宮位：{activePalaceData.stem}{activePalaceData.branch}）
                </span>
                {getPalaceBadge(activePalaceData.name)}
              </h4>
            </div>
            <div className="text-xs text-stone-400">
              主曜：{activePalaceData.majorStars.map((s) => s.name).join('、') || '借宮推論'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-xs">
            <div className="p-3 bg-stone-900/50 rounded border border-stone-800">
              <span className="font-semibold text-amber-300 block mb-1">
                正曜主星磁場
              </span>
              <p className="text-stone-300 leading-relaxed">
                {activePalaceData.majorStars.length > 0
                  ? `${activePalaceData.majorStars.map((s) => s.name).join('與')}坐守，氣度恢弘，主宰此宮的核心格局與後天能量展現。`
                  : '本宮空劫或無十四主星，須借對面宮位之正曜參照，主機遇多變，宜靈活求穩。'}
              </p>
            </div>

            <div className="p-3 bg-stone-900/50 rounded border border-stone-800">
              <span className="font-semibold text-emerald-300 block mb-1">
                吉輔星煞曜助勢
              </span>
              <p className="text-stone-300 leading-relaxed">
                輔星有：{activePalaceData.minorStars.map((s) => s.name).join('、') || '清幽少煞'}。吉曜照映則增祥瑞，煞曜磨礪則生堅韌。
              </p>
            </div>

            <div className="p-3 bg-stone-900/50 rounded border border-stone-800">
              <span className="font-semibold text-rose-300 block mb-1">
                年干生年四化引動
              </span>
              <p className="text-stone-300 leading-relaxed">
                {activePalaceData.yearlyTransforms && activePalaceData.yearlyTransforms.length > 0
                  ? `本宮得【${activePalaceData.yearlyTransforms.join('、')}】加持，動態轉化極顯著，是本命關鍵發力點。`
                  : '本宮未落生年四化，情態平穩祥和，以本宮星性循序漸進為主。'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
