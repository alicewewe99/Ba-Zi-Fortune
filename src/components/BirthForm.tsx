import React, { useState } from 'react';
import { Calendar, Clock, User, Compass, Sparkles, BookOpen } from 'lucide-react';
import { Solar, Lunar } from 'lunar-typescript';

export interface BirthFormData {
  name: string;
  gender: 1 | 0; // 1: 男, 0: 女
  calendarType: 'solar' | 'lunar';
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;
  birthMinute: number;
  targetYear: number;
}

interface BirthFormProps {
  onSubmit: (data: BirthFormData) => void;
  isLoading: boolean;
}

const DOUBLE_HOURS = [
  { hour: 0, name: '早子時 (00:00 - 00:59)' },
  { hour: 2, name: '丑時 (01:00 - 02:59)' },
  { hour: 4, name: '寅時 (03:00 - 04:59)' },
  { hour: 6, name: '卯時 (05:00 - 06:59)' },
  { hour: 8, name: '辰時 (07:00 - 08:59)' },
  { hour: 10, name: '巳時 (09:00 - 10:59)' },
  { hour: 12, name: '午時 (11:00 - 12:59)' },
  { hour: 14, name: '未時 (13:00 - 14:59)' },
  { hour: 16, name: '申時 (15:00 - 16:59)' },
  { hour: 18, name: '酉時 (17:00 - 18:59)' },
  { hour: 20, name: '戌時 (19:00 - 20:59)' },
  { hour: 22, name: '亥時 (21:00 - 22:59)' },
  { hour: 23, name: '夜子時 (23:00 - 23:59)' },
];

export const BirthForm: React.FC<BirthFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<BirthFormData>({
    name: '善信緣主',
    gender: 1,
    calendarType: 'solar',
    birthYear: 1995,
    birthMonth: 5,
    birthDay: 20,
    birthHour: 14,
    birthMinute: 30,
    targetYear: 2026,
  });

  // 實時計算對應的農曆或公曆
  const getCorrespondingCalendarInfo = () => {
    try {
      if (formData.calendarType === 'solar') {
        const solar = Solar.fromYmdHms(formData.birthYear, formData.birthMonth, formData.birthDay, formData.birthHour, formData.birthMinute, 0);
        const lunar = solar.getLunar();
        return `對應農曆：${lunar.getYearInGanZhi()}年 (${lunar.getYearShengXiao()}) ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
      } else {
        const lunar = Lunar.fromYmdHms(formData.birthYear, formData.birthMonth, formData.birthDay, formData.birthHour, formData.birthMinute, 0);
        const solar = lunar.getSolar();
        return `對應公曆：${solar.getYear()}年${solar.getMonth()}月${solar.getDay()}日`;
      }
    } catch {
      return '請輸入正確年月日時辰';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.calendarType === 'lunar') {
      try {
        const lunar = Lunar.fromYmdHms(formData.birthYear, formData.birthMonth, formData.birthDay, formData.birthHour, formData.birthMinute, 0);
        const solar = lunar.getSolar();
        onSubmit({
          ...formData,
          birthYear: solar.getYear(),
          birthMonth: solar.getMonth(),
          birthDay: solar.getDay(),
        });
        return;
      } catch {
        // fallback
      }
    }
    onSubmit(formData);
  };

  const handleApplyPreset = (type: string) => {
    if (type === 'sample1') {
      setFormData({
        name: '雲舒',
        gender: 0,
        calendarType: 'solar',
        birthYear: 1996,
        birthMonth: 8,
        birthDay: 18,
        birthHour: 9,
        birthMinute: 30,
        targetYear: 2026,
      });
    } else if (type === 'sample2') {
      setFormData({
        name: '子墨',
        gender: 1,
        calendarType: 'solar',
        birthYear: 1992,
        birthMonth: 3,
        birthDay: 12,
        birthHour: 15,
        birthMinute: 20,
        targetYear: 2026,
      });
    }
  };

  return (
    <div className="bg-[#11131a] border border-amber-900/30 rounded-xl p-5 sm:p-6 shadow-xl shadow-black/40 relative overflow-hidden">
      {/* 裝飾性金線邊框與暗紋 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-stone-800 gap-2 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-amber-950/40 border border-amber-800/40 text-amber-300">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-amber-100 tracking-wide">
              排盤生辰八字與流年設定
            </h2>
            <p className="text-xs text-stone-400">
              嚴格按照二十四節氣精確換算年月柱，杜絕普通日曆偏差
            </p>
          </div>
        </div>

        {/* 快速載入示範名盤 */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500">示範例盤：</span>
          <button
            type="button"
            onClick={() => handleApplyPreset('sample1')}
            className="px-2 py-1 rounded bg-stone-800/80 hover:bg-amber-900/40 text-stone-300 hover:text-amber-200 border border-stone-700/50 transition-colors"
          >
            坤造例盤 (1996女)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('sample2')}
            className="px-2 py-1 rounded bg-stone-800/80 hover:bg-amber-900/40 text-stone-300 hover:text-amber-200 border border-stone-700/50 transition-colors"
          >
            乾造例盤 (1992男)
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 第一排：姓名、性別、曆法選擇 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              命主姓名 / 稱謂
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="善信緣主"
              className="w-full bg-[#181a24] border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/80 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              性別（影響大運順逆）
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 1 })}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                  formData.gender === 1
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200 font-bold'
                    : 'bg-[#181a24] border-stone-700/80 text-stone-400 hover:text-stone-200'
                }`}
              >
                乾造（陽男）
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 0 })}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                  formData.gender === 0
                    ? 'bg-rose-900/30 border-rose-500 text-rose-200 font-bold'
                    : 'bg-[#181a24] border-stone-700/80 text-stone-400 hover:text-stone-200'
                }`}
              >
                坤造（陰女）
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              出生曆法基準
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, calendarType: 'solar' })}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                  formData.calendarType === 'solar'
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200 font-bold'
                    : 'bg-[#181a24] border-stone-700/80 text-stone-400 hover:text-stone-200'
                }`}
              >
                陽曆 (公曆)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, calendarType: 'lunar' })}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                  formData.calendarType === 'lunar'
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200 font-bold'
                    : 'bg-[#181a24] border-stone-700/80 text-stone-400 hover:text-stone-200'
                }`}
              >
                農曆 (陰曆)
              </button>
            </div>
          </div>
        </div>

        {/* 第二排：年、月、日 */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              出生年份 ({formData.calendarType === 'solar' ? '公曆' : '農曆'})
            </label>
            <select
              value={formData.birthYear}
              onChange={(e) => setFormData({ ...formData, birthYear: Number(e.target.value) })}
              className="w-full bg-[#181a24] border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-200 focus:outline-none focus:border-amber-500/80"
            >
              {Array.from({ length: 90 }, (_, i) => 2025 - i).map((y) => (
                <option key={y} value={y}>
                  {y} 年
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              出生月份
            </label>
            <select
              value={formData.birthMonth}
              onChange={(e) => setFormData({ ...formData, birthMonth: Number(e.target.value) })}
              className="w-full bg-[#181a24] border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-200 focus:outline-none focus:border-amber-500/80"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {m} 月
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              出生日期
            </label>
            <select
              value={formData.birthDay}
              onChange={(e) => setFormData({ ...formData, birthDay: Number(e.target.value) })}
              className="w-full bg-[#181a24] border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-200 focus:outline-none focus:border-amber-500/80"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d} 日
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 第三排：時辰 (十二時辰選擇 + 具體時間)、目標流年 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              出生時辰 (十二時辰對照)
            </label>
            <select
              value={
                DOUBLE_HOURS.find(
                  (dh) =>
                    dh.hour === formData.birthHour ||
                    (dh.hour !== 0 && dh.hour !== 23 && Math.abs(dh.hour - formData.birthHour) <= 1)
                )?.hour || 14
              }
              onChange={(e) => {
                const h = Number(e.target.value);
                setFormData({ ...formData, birthHour: h });
              }}
              className="w-full bg-[#181a24] border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-200 focus:outline-none focus:border-amber-500/80"
            >
              {DOUBLE_HOURS.map((dh) => (
                <option key={dh.name} value={dh.hour}>
                  {dh.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              精確時間 (時:分)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={formData.birthHour}
                onChange={(e) => setFormData({ ...formData, birthHour: Number(e.target.value) })}
                className="w-full bg-[#181a24] border border-stone-700/80 rounded-lg px-2 py-2 text-sm text-stone-200 focus:outline-none focus:border-amber-500/80"
              >
                {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                  <option key={h} value={h}>
                    {h.toString().padStart(2, '0')} 點
                  </option>
                ))}
              </select>
              <select
                value={formData.birthMinute}
                onChange={(e) => setFormData({ ...formData, birthMinute: Number(e.target.value) })}
                className="w-full bg-[#181a24] border border-stone-700/80 rounded-lg px-2 py-2 text-sm text-stone-200 focus:outline-none focus:border-amber-500/80"
              >
                {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                  <option key={m} value={m}>
                    {m.toString().padStart(2, '0')} 分
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              批算目標流年
            </label>
            <select
              value={formData.targetYear}
              onChange={(e) => setFormData({ ...formData, targetYear: Number(e.target.value) })}
              className="w-full bg-[#181a24] border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-amber-200 font-semibold focus:outline-none focus:border-amber-500/80"
            >
              <option value={2026}>2026 丙午流年（今年）</option>
              <option value={2027}>2027 丁未流年（明年）</option>
              <option value={2028}>2028 戊申流年</option>
              <option value={2025}>2025 乙巳流年</option>
            </select>
          </div>
        </div>

        {/* 實時曆法對照預覽 */}
        <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-xs text-amber-300/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{getCorrespondingCalendarInfo()}</span>
          </div>
          <span className="text-stone-500 hidden sm:inline">以立春、節氣分界交運</span>
        </div>

        {/* 提交按鈕 */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50 font-bold tracking-wider text-base shadow-lg shadow-amber-900/30 border border-amber-400/40 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-amber-200 border-t-transparent rounded-full animate-spin"></div>
                <span>大衍易數推演中 · 易道宗師御批啟動...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span>排定八字紫微 · 易道宗師三書深批</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
