import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';
import { Download, Share2, PlusSquare, Check, X, Sparkles } from 'lucide-react';

export const PWAInstallModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { isIOS, canPromptDirectly, installPWA } = usePWAInstall();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (canPromptDirectly) {
      const ok = await installPWA();
      if (ok) {
        setDownloadSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    }
  };

  const handleDownloadIcon = () => {
    const link = document.createElement('a');
    link.href = '/pwa-512x512.png';
    link.download = '易道乾坤-桌面Icon-512x512.png';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#12141c] border border-amber-600/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Decorative ambient glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon Preview Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative group cursor-pointer" onClick={handleDownloadIcon} title="點擊下載高清圖標">
            <img
              src="/pwa-512x512.png"
              alt="易道乾坤桌面Icon"
              className="w-24 h-24 rounded-2xl shadow-xl border-2 border-amber-500/50 shadow-amber-950/40 group-hover:scale-105 transition-transform"
            />
            <div className="absolute -bottom-2 -right-2 p-1.5 bg-amber-600 rounded-full text-black shadow font-bold text-[10px] flex items-center gap-0.5">
              <Download className="w-3 h-3" />
            </div>
          </div>

          <h3 className="text-lg font-bold text-amber-100 mt-4 flex items-center gap-1.5">
            <span>安裝至手機 / 電腦桌面</span>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-950/80 border border-amber-700/50 text-amber-300 font-normal">
              PWA 桌面應用
            </span>
          </h3>
          <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
            尊享獨立原生 App 全螢幕體驗，一鍵啟動易道乾坤八字紫微排盤，隨時隨地叩問易道宗師。
          </p>
        </div>

        {/* Action Body */}
        <div className="mt-6 space-y-4">
          {/* iOS Safari Guided Steps */}
          {isIOS ? (
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 text-xs text-stone-300 space-y-2.5">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>iPhone / iPad (Safari) 安裝步驟：</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-stone-300 leading-relaxed pl-1">
                <li>
                  點擊瀏覽器底部的 <strong className="text-amber-200">「分享」</strong> 按鈕（向上箭頭）。
                </li>
                <li>
                  在選單中向下滑動，選擇 <strong className="text-amber-200">「加入主畫面」</strong>（<PlusSquare className="w-3.5 h-3.5 inline text-amber-300" />）。
                </li>
                <li>
                  確認右上角點選 <strong className="text-amber-200">「新增」</strong>，即可於手機桌面快速開啟！
                </li>
              </ol>
            </div>
          ) : canPromptDirectly ? (
            <button
              onClick={handleInstallClick}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50 font-bold text-sm shadow-lg shadow-amber-950/40 border border-amber-400/40 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>已成功安裝至桌面！</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>一鍵新增至桌面 App</span>
                </>
              )}
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 text-xs text-stone-300 space-y-2">
              <div className="font-semibold text-amber-300">電腦或安卓瀏覽器快捷加入：</div>
              <p className="text-stone-300 leading-relaxed">
                點擊瀏覽器網址列右側的 <strong className="text-amber-200">「安裝應用程式」</strong> 圖標，或開啟瀏覽器選單點擊「安裝易道乾坤」即可常駐桌面。
              </p>
            </div>
          )}

          {/* Download Raw Icon Asset Button */}
          <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs">
            <span className="text-stone-400">需要高清 Icon 圖標原圖？</span>
            <button
              onClick={handleDownloadIcon}
              className="px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-amber-200 border border-stone-700/60 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下載 512px 圖標 PNG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
