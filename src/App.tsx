import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { BirthForm, BirthFormData } from './components/BirthForm.tsx';
import { BaZiChartCard } from './components/BaZiChartCard.tsx';
import { ZiWeiChartCard } from './components/ZiWeiChartCard.tsx';
import { ClassicAnalysisCard } from './components/ClassicAnalysisCard.tsx';
import { DetailedFortuneCard } from './components/DetailedFortuneCard.tsx';
import { MasterChatView } from './components/MasterChatView.tsx';
import { WeeklyFortuneView } from './components/WeeklyFortuneView.tsx';
import { DailyLoveFortuneView } from './components/DailyLoveFortuneView.tsx';
import { SynastryView } from './components/SynastryView.tsx';
import { PWAInstallModal } from './components/PWAInstallModal.tsx';
import type { BaZiChart, ZiWeiChart, MetaphysicsAnalysis } from './types/astrology.ts';
import { Compass, Sparkles, BookOpen, Scroll, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analysis' | 'chat' | 'weekly' | 'dailyLove' | 'synastry'>('analysis');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  const [userName, setUserName] = useState('善信緣主');
  const [gender, setGender] = useState<1 | 0>(1);
  const [targetYear, setTargetYear] = useState(2026);

  const [baziChart, setBaziChart] = useState<BaZiChart | null>(null);
  const [ziweiChart, setZiweiChart] = useState<ZiWeiChart | null>(null);
  const [analysis, setAnalysis] = useState<MetaphysicsAnalysis | null>(null);

  // 初次載入自動排盤推演一組標準命盤，確保使用者立即可見完整系統全貌
  useEffect(() => {
    handleFormSubmit({
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
  }, []);

  const handleFormSubmit = async (formData: BirthFormData) => {
    setIsLoading(true);
    setErrorMsg(null);
    setUserName(formData.name || '緣主');
    setGender(formData.gender);
    setTargetYear(formData.targetYear);

    try {
      const res = await fetch('/api/fortune/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          gender: formData.gender,
          birthYear: formData.birthYear,
          birthMonth: formData.birthMonth,
          birthDay: formData.birthDay,
          birthHour: formData.birthHour,
          birthMinute: formData.birthMinute,
          targetYear: formData.targetYear,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBaziChart(data.bazi);
        setZiweiChart(data.ziwei);
        setAnalysis(data.analysis);
      } else {
        setErrorMsg(data.error || '推算排盤異常，請檢查生辰資訊');
      }
    } catch (err: any) {
      setErrorMsg(err.message || '連線伺服器異常');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-stone-200 flex flex-col font-sans selection:bg-amber-600/30 selection:text-amber-200">
      {/* 頂部導航 */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasChart={Boolean(baziChart && ziweiChart)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* 桌面應用與高清Icon下載彈窗 */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* 主體內容容器 */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* 錯誤橫幅 */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-200 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 標籤一：原局排盤與四部深度批命 */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {/* 排盤表單 */}
            <BirthForm onSubmit={handleFormSubmit} isLoading={isLoading} />

            {/* 四柱八字卡 */}
            {baziChart && (
              <BaZiChartCard bazi={baziChart} userName={userName} />
            )}

            {/* 紫微斗數十二宮卡 */}
            {ziweiChart && (
              <ZiWeiChartCard ziwei={ziweiChart} />
            )}

            {/* 三大古籍精批卡 (三命通會 + 滴天髓 + 窮通寶鑒) */}
            {analysis && (
              <ClassicAnalysisCard analysis={analysis} />
            )}

            {/* 四大專題 (姻緣、事業、金錢、流年大運) 與宗師七言詩 */}
            {analysis && (
              <DetailedFortuneCard analysis={analysis} targetYear={targetYear} />
            )}
          </div>
        )}

        {/* 標籤二：易道宗師御批 · 深度AI雙向問道 */}
        {activeTab === 'chat' && (
          <MasterChatView
            bazi={baziChart}
            ziwei={ziweiChart}
            userName={userName}
            gender={gender}
          />
        )}

        {/* 標籤三：手動日期選擇區間每週運勢 */}
        {activeTab === 'weekly' && (
          <WeeklyFortuneView bazi={baziChart} userName={userName} />
        )}

        {/* 標籤四：每日姻緣運勢與好運指數 */}
        {activeTab === 'dailyLove' && (
          <DailyLoveFortuneView bazi={baziChart} gender={gender} />
        )}

        {/* 標籤五：雙人姻緣深度合盤 */}
        {activeTab === 'synastry' && <SynastryView />}
      </main>

      {/* 頁尾 */}
      <footer className="border-t border-stone-800/80 bg-[#0a0b10] py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="tracking-wider text-stone-400">
            易道乾坤 · 八字紫微運勢占卜系統
          </p>
          <p className="text-[11px] text-stone-600">
            奉循《三命通會》十神正格 · 《滴天髓》流通中和 · 《窮通寶鑒》天時調候 · 易學深邃，修心化吉
          </p>
        </div>
      </footer>
    </div>
  );
}
