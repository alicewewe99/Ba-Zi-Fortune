import React from 'react';
import { Compass, Sparkles, BookOpen, MessageSquare, CalendarRange, Heart, Users } from 'lucide-react';

interface HeaderProps {
  activeTab: 'analysis' | 'chat' | 'weekly' | 'dailyLove' | 'synastry';
  setActiveTab: (tab: 'analysis' | 'chat' | 'weekly' | 'dailyLove' | 'synastry') => void;
  hasChart: boolean;
  onOpenInstallModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, hasChart, onOpenInstallModal }) => {
  return (
    <header className="border-b border-stone-800/80 bg-[#0d0f15]/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="易道乾坤圖標"
              className="w-10 h-10 rounded-xl shadow-md border border-amber-500/50 cursor-pointer hover:rotate-12 transition-transform"
              onClick={onOpenInstallModal}
              title="點擊安裝桌面應用或下載圖標"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-wider text-amber-100 flex items-center gap-2">
                  <span>易道乾坤</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-950/60 border border-amber-700/50 text-amber-300 font-normal">
                    三書秘旨合參
                  </span>
                </h1>
              </div>
              <p className="text-xs text-stone-400 tracking-wide mt-0.5">
                《三命通會》正格 · 《滴天髓》源流 · 《窮通寶鑒》天時調候 · 八字紫微雙盤御批
              </p>
            </div>
          </div>

          {/* Quick install button on mobile */}
          <button
            onClick={onOpenInstallModal}
            className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-600/20 text-amber-300 border border-amber-500/40 text-xs font-semibold"
          >
            <span>桌面Icon</span>
          </button>
        </div>

        {/* Navigation tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'analysis'
                ? 'bg-amber-600/20 text-amber-200 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>命盤御批與運勢</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-amber-600/20 text-amber-200 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>易道宗師·深度問道</span>
            {hasChart && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'weekly'
                ? 'bg-amber-600/20 text-amber-200 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <CalendarRange className="w-3.5 h-3.5" />
            <span>自選區間週運</span>
          </button>

          <button
            onClick={() => setActiveTab('dailyLove')}
            className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'dailyLove'
                ? 'bg-amber-600/20 text-amber-200 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>每日姻緣與好運</span>
          </button>

          <button
            onClick={() => setActiveTab('synastry')}
            className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'synastry'
                ? 'bg-amber-600/20 text-amber-200 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-300" />
            <span>雙人姻緣合盤</span>
          </button>

          {/* Desktop Install / Icon Button */}
          <button
            onClick={onOpenInstallModal}
            className="ml-2 px-3 py-1.5 rounded-md text-xs font-semibold bg-gradient-to-r from-amber-600/30 to-amber-700/30 hover:from-amber-600/40 hover:to-amber-700/40 text-amber-300 border border-amber-500/50 transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm shadow-amber-950/40"
          >
            <span>桌面Icon</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
