import React, { useState } from 'react';
import type { SynastryResponse, BaZiChart } from '../types/astrology.ts';
import { Users, Heart, Sparkles, AlertCircle, ShieldCheck, CheckCircle2, Compass } from 'lucide-react';

interface PersonInput {
  name: string;
  gender: 1 | 0;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;
  birthMinute: number;
}

export const SynastryView: React.FC = () => {
  const [personA, setPersonA] = useState<PersonInput>({
    name: '乾造善信',
    gender: 1,
    birthYear: 1993,
    birthMonth: 4,
    birthDay: 15,
    birthHour: 10,
    birthMinute: 30,
  });

  const [personB, setPersonB] = useState<PersonInput>({
    name: '坤造善信',
    gender: 0,
    birthYear: 1995,
    birthMonth: 8,
    birthDay: 22,
    birthHour: 16,
    birthMinute: 15,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [synastryResult, setSynastryResult] = useState<{
    data: SynastryResponse;
    baziA: BaZiChart;
    baziB: BaZiChart;
  } | null>(null);

  const handleComputeSynastry = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/fortune/synastry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personA, personB }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSynastryResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getVerdictStyle = (v: string) => {
    switch (v) {
      case '天作之合':
        return 'bg-amber-500/20 text-amber-200 border-amber-500';
      case '良緣相契':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-600';
      case '中吉磨合':
        return 'bg-blue-950/60 text-blue-300 border-blue-600';
      case '相生帶剋':
        return 'bg-orange-950/60 text-orange-300 border-orange-600';
      case '緣淺須修':
        return 'bg-rose-950/60 text-rose-300 border-rose-600';
      default:
        return 'bg-stone-800 text-stone-200 border-stone-700';
    }
  };

  return (
    <div className="bg-[#11131a] border border-amber-900/30 rounded-xl p-5 sm:p-6 shadow-xl shadow-black/40 space-y-6">
      {/* 頂部標題 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-stone-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-rose-950/60 border border-rose-700/50 flex items-center justify-center text-rose-300 font-bold">
            <Users className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
              <span>雙人八字姻緣深度合盤</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/60 font-normal">
                天干合化 · 夫妻宮印照 · 喜用互補
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              以二人八字四柱為緯，考天干五合、地支六合三合、夫妻宮互動與五行調候互濟
            </p>
          </div>
        </div>
      </div>

      {/* 雙人出生數據輸入卡 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 甲方 */}
        <div className="bg-[#151722] p-4 sm:p-5 rounded-xl border border-stone-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <span className="font-bold text-xs sm:text-sm text-amber-200 flex items-center gap-1.5">
              <span>甲方生辰</span>
              <span className="text-xs font-normal text-stone-400">
                ({personA.gender === 1 ? '男方' : '女方'})
              </span>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPersonA({ ...personA, gender: 1 })}
                className={`px-2 py-0.5 text-xs rounded border ${
                  personA.gender === 1 ? 'bg-amber-600/30 border-amber-500 text-amber-200' : 'bg-stone-800 text-stone-400'
                }`}
              >
                男
              </button>
              <button
                type="button"
                onClick={() => setPersonA({ ...personA, gender: 0 })}
                className={`px-2 py-0.5 text-xs rounded border ${
                  personA.gender === 0 ? 'bg-rose-950/80 border-rose-500 text-rose-200' : 'bg-stone-800 text-stone-400'
                }`}
              >
                女
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-stone-400">姓名/暱稱</label>
              <input
                type="text"
                value={personA.name}
                onChange={(e) => setPersonA({ ...personA, name: e.target.value })}
                className="w-full bg-[#181a24] border border-stone-700/80 rounded px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-400">出生年</label>
              <select
                value={personA.birthYear}
                onChange={(e) => setPersonA({ ...personA, birthYear: Number(e.target.value) })}
                className="w-full bg-[#181a24] border border-stone-700/80 rounded px-2 py-1.5 text-xs text-stone-200"
              >
                {Array.from({ length: 70 }, (_, i) => 2015 - i).map((y) => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] text-stone-400">月</label>
              <select
                value={personA.birthMonth}
                onChange={(e) => setPersonA({ ...personA, birthMonth: Number(e.target.value) })}
                className="w-full bg-[#181a24] border border-stone-700/80 rounded px-2 py-1.5 text-xs text-stone-200"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-stone-400">日</label>
              <select
                value={personA.birthDay}
                onChange={(e) => setPersonA({ ...personA, birthDay: Number(e.target.value) })}
                className="w-full bg-[#181a24] border border-stone-700/80 rounded px-2 py-1.5 text-xs text-stone-200"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-stone-400">時</label>
              <select
                value={personA.birthHour}
                onChange={(e) => setPersonA({ ...personA, birthHour: Number(e.target.value) })}
                className="w-full bg-[#181a24] border border-stone-700/80 rounded px-2 py-1.5 text-xs text-stone-200"
              >
                {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                  <option key={h} value={h}>{h}點</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 乙方 */}
        <div className="bg-[#151722] p-4 sm:p-5 rounded-xl border border-stone-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <span className="font-bold text-xs sm:text-sm text-rose-200 flex items-center gap-1.5">
              <span>乙方生辰</span>
              <span className="text-xs font-normal text-stone-400">
                ({personB.gender === 1 ? '男方' : '女方'})
              </span>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPersonB({ ...personB, gender: 1 })}
                className={`px-2 py-0.5 text-xs rounded border ${
                  personB.gender === 1 ? 'bg-amber-600/30 border-amber-500 text-amber-200' : 'bg-stone-800 text-stone-400'
                }`}
              >
                男
              </button>
              <button
                type="button"
                onClick={() => setPersonB({ ...personB, gender: 0 })}
                className={`px-2 py-0.5 text-xs rounded border ${
                  personB.gender === 0 ? 'bg-rose-950/80 border-rose-500 text-rose-200' : 'bg-stone-800 text-stone-400'
                }`}
              >
                女
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-stone-400">姓名/暱稱</label>
              <input
                type="text"
                value={personB.name}
                onChange={(e) => setPersonB({ ...personB, name: e.target.value })}
                className="w-full bg-[#181a24] border border-stone-700/80 rounded px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-400">出生年</label>
              <select
                value={personB.birthYear}
                onChange={(e) => setPersonB({ ...personB, birthYear: Number(e.target.value) })}
                className="w-full bg-[#181a24] border border-stone-700/80 rounded px-2 py-1.5 text-xs text-stone-200"
              >
                {Array.from({ length: 70 }, (_, i) => 2015 - i).map((y) => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] text-stone-400">月</label>
              <select
                value={personB.birthMonth}
                onChange={(e) => setPersonB({ ...personB, birthMonth: Number(e.target.value) })}
                className="w-full bg-[#181a24] border border-stone-700/80 rounded px-2 py-1.5 text-xs text-stone-200"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-stone-400">日</label>
              <select
                value={personB.birthDay}
                onChange={(e) => setPersonB({ ...personB, birthDay: Number(e.target.value) })}
                className="w-full bg-[#181a24] border border-stone-700/80 rounded px-2 py-1.5 text-xs text-stone-200"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-stone-400">時</label>
              <select
                value={personB.birthHour}
                onChange={(e) => setPersonB({ ...personB, birthHour: Number(e.target.value) })}
                className="w-full bg-[#181a24] border border-stone-700/80 rounded px-2 py-1.5 text-xs text-stone-200"
              >
                {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                  <option key={h} value={h}>{h}點</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 合盤按鈕 */}
      <div>
        <button
          onClick={handleComputeSynastry}
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-rose-700 via-amber-700 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-rose-50 font-bold text-sm sm:text-base shadow-lg shadow-rose-950/40 border border-rose-500/40 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-rose-200 border-t-transparent rounded-full animate-spin"></div>
              <span>雙人四柱交感推演中 · 易道宗師御批合盤...</span>
            </>
          ) : (
            <>
              <Heart className="w-5 h-5 text-rose-300" />
              <span>啟動雙人八字姻緣合盤御批</span>
            </>
          )}
        </button>
      </div>

      {/* 合盤結果 */}
      {synastryResult && (
        <div className="space-y-6 pt-2">
          {/* 契合總分與宗師判詞 */}
          <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-r from-rose-950/40 via-[#181a24] to-amber-950/40 border border-rose-800/40">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-rose-900/30">
              <div>
                <span className="text-xs text-stone-400">二人命盤綜合默契判定</span>
                <div className="flex items-center gap-3 mt-1">
                  <h4 className="text-xl sm:text-2xl font-black text-rose-100">
                    【{personA.name}】與【{personB.name}】
                  </h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black border ${getVerdictStyle(
                      synastryResult.data.verdict
                    )}`}
                  >
                    {synastryResult.data.verdict}
                  </span>
                </div>
              </div>

              <div className="text-right flex items-center gap-3">
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full border-2 border-rose-500 bg-rose-950/50 shadow-inner">
                  <span className="text-2xl font-black text-rose-100">
                    {synastryResult.data.score}
                  </span>
                  <span className="absolute -bottom-2 text-[9px] px-1.5 py-0.2 rounded bg-amber-500 text-black font-bold">
                    契合分
                  </span>
                </div>
              </div>
            </div>

            {/* 雙方八字四柱簡況對照 */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
              <div className="p-3 bg-stone-900/60 rounded border border-stone-800">
                <span className="text-stone-400 font-medium block mb-1">
                  甲方四柱：{synastryResult.baziA.yearPillar.stem}{synastryResult.baziA.yearPillar.branch} / {synastryResult.baziA.monthPillar.stem}{synastryResult.baziA.monthPillar.branch} / {synastryResult.baziA.dayPillar.stem}{synastryResult.baziA.dayPillar.branch} / {synastryResult.baziA.timePillar.stem}{synastryResult.baziA.timePillar.branch}
                </span>
                <span className="text-amber-200 font-bold">
                  日主：{synastryResult.baziA.dayMaster}（{synastryResult.baziA.dayMasterElement}）
                </span>
              </div>

              <div className="p-3 bg-stone-900/60 rounded border border-stone-800">
                <span className="text-stone-400 font-medium block mb-1">
                  乙方四柱：{synastryResult.baziB.yearPillar.stem}{synastryResult.baziB.yearPillar.branch} / {synastryResult.baziB.monthPillar.stem}{synastryResult.baziB.monthPillar.branch} / {synastryResult.baziB.dayPillar.stem}{synastryResult.baziB.dayPillar.branch} / {synastryResult.baziB.timePillar.stem}{synastryResult.baziB.timePillar.branch}
                </span>
                <span className="text-rose-200 font-bold">
                  日主：{synastryResult.baziB.dayMaster}（{synastryResult.baziB.dayMasterElement}）
                </span>
              </div>
            </div>
          </div>

          {/* 三維度契合評析 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 天干相合 */}
            <div className="bg-[#151722] p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-amber-300">
                    日主天干生剋合化
                  </span>
                  <span className="text-xs font-bold text-amber-400">
                    {synastryResult.data.dayMasterAffinity.stemScore}分
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded border border-stone-800">
                  {synastryResult.data.dayMasterAffinity.stemRelationship}
                </p>
              </div>
              <div className="text-[11px] text-stone-500 mt-2">
                主精神共鳴與思想溝通
              </div>
            </div>

            {/* 夫妻宮日支衝合 */}
            <div className="bg-[#151722] p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-rose-300">
                    夫妻宮地支衝合刑害
                  </span>
                  <span className="text-xs font-bold text-rose-400">
                    {synastryResult.data.palaceAffinity.palaceScore}分
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded border border-stone-800">
                  {synastryResult.data.palaceAffinity.branchInteraction}
                </p>
              </div>
              <div className="text-[11px] text-stone-500 mt-2">
                主朝夕相處與生活習慣融洽
              </div>
            </div>

            {/* 五行互補 */}
            <div className="bg-[#151722] p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-emerald-300">
                    五行喜用神互補
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {synastryResult.data.elementComplementarity.complementScore}分
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded border border-stone-800">
                  {synastryResult.data.elementComplementarity.analysis}
                </p>
              </div>
              <div className="text-[11px] text-stone-500 mt-2">
                主婚後運勢互助與健康運勢
              </div>
            </div>
          </div>

          {/* 白話文深度姻緣走向剖析 */}
          <div className="bg-[#151722] p-5 rounded-xl border border-stone-800">
            <span className="text-xs font-semibold text-amber-200 flex items-center gap-1.5 mb-2.5">
              <Compass className="w-4 h-4 text-amber-400" />
              白話文深度姻緣相處走向剖析
            </span>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed bg-stone-900/60 p-4 rounded-lg border border-stone-800">
              {synastryResult.data.detailedLoveAnalysis}
            </p>
          </div>

          {/* 緣分亮點 vs 磨合衝突 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#151722] p-4 rounded-xl border border-emerald-900/40">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                兩情相悅 · 契合亮點
              </span>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {synastryResult.data.prosAndCons.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#151722] p-4 rounded-xl border border-rose-900/40">
              <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5 mb-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                潛在考驗 · 磨合衝突點
              </span>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {synastryResult.data.prosAndCons.frictionPoints.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">!</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 宗師調和破局指南 */}
          <div className="bg-gradient-to-r from-amber-950/30 via-[#151722] to-amber-950/30 p-5 rounded-xl border border-amber-800/40">
            <div className="flex items-center gap-2 text-amber-200 font-bold text-xs sm:text-sm mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>易道宗師調和破局指南（化煞為相生）</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-900/60 p-4 rounded-lg border border-stone-800">
              {synastryResult.data.masterResolutionGuide}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
