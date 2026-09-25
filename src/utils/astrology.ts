import { Solar, Lunar } from 'lunar-typescript';
import type { BaZiChart, PillarInfo, ZiWeiChart, ZiWeiPalace, ZiWeiStar } from '../types/astrology.ts';

// 五行映射
export const STEM_ELEMENTS: Record<string, string> = {
  甲: '木', 乙: '木',
  丙: '火', 丁: '火',
  戊: '土', 己: '土',
  庚: '金', 辛: '金',
  壬: '水', 癸: '水'
};

export const BRANCH_ELEMENTS: Record<string, string> = {
  子: '水', 丑: '土', 寅: '木', 卯: '木',
  辰: '土', 巳: '火', 午: '火', 未: '土',
  申: '金', 酉: '金', 戌: '土', 亥: '水'
};

export const STEM_YIN_YANG: Record<string, '陽' | '陰'> = {
  甲: '陽', 乙: '陰', 丙: '陽', 丁: '陰', 戊: '陽',
  己: '陰', 庚: '陽', 辛: '陰', 壬: '陽', 癸: '陰'
};

const ZHI_ORDER = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const PALACE_NAMES = [
  '命宮', '兄弟宮', '夫妻宮', '子女宮',
  '財帛宮', '疾厄宮', '遷移宮', '交友宮',
  '官祿宮', '田宅宮', '福德宮', '父母宮'
];

// 神煞計算
export function calculateShenSha(dayStem: string, dayBranch: string, yearBranch: string, monthBranch: string): string[] {
  const result: string[] = [];

  // 天乙貴人
  const tianYiMap: Record<string, string[]> = {
    甲: ['丑', '未'], 戊: ['丑', '未'], 庚: ['丑', '未'],
    乙: ['子', '申'], 己: ['子', '申'],
    丙: ['亥', '酉'], 丁: ['亥', '酉'],
    壬: ['卯', '巳'], 癸: ['卯', '巳'],
    辛: ['午', '寅']
  };
  const tianYi = tianYiMap[dayStem] || [];
  if (tianYi.includes(dayBranch) || tianYi.includes(yearBranch)) {
    result.push('天乙貴人 (吉曜照臨，化險為夷)');
  }

  // 文昌貴人
  const wenChangMap: Record<string, string> = {
    甲: '巳', 乙: '午', 丙: '申', 丁: '酉', 戊: '申',
    己: '酉', 庚: '亥', 辛: '子', 壬: '寅', 癸: '卯'
  };
  if (wenChangMap[dayStem] === dayBranch || wenChangMap[dayStem] === yearBranch) {
    result.push('文昌貴人 (文思敏捷，考運名望)');
  }

  // 桃花 (咸池) - 以年支或日支
  const peachMap: Record<string, string> = {
    申: '酉', 子: '酉', 辰: '酉',
    寅: '卯', 午: '卯', 戌: '卯',
    巳: '午', 酉: '午', 丑: '午',
    亥: '子', 卯: '子', 未: '子'
  };
  if (peachMap[yearBranch] === dayBranch || peachMap[dayBranch] === monthBranch || peachMap[dayBranch] === dayBranch) {
    result.push('紅鸞咸池桃花 (情緣豐沛，人緣出眾)');
  }

  // 驛馬
  const yiMaMap: Record<string, string> = {
    申: '寅', 子: '寅', 辰: '寅',
    寅: '申', 午: '申', 戌: '申',
    巳: '亥', 酉: '亥', 丑: '亥',
    亥: '巳', 卯: '巳', 未: '巳'
  };
  if (yiMaMap[yearBranch] === dayBranch || yiMaMap[dayBranch] === yearBranch) {
    result.push('驛馬星 (馳騁四方，變動起運)');
  }

  // 羊刃
  const yangRenMap: Record<string, string> = {
    甲: '卯', 乙: '辰', 丙: '午', 丁: '未', 戊: '午',
    己: '未', 庚: '酉', 辛: '戌', 壬: '子', 癸: '丑'
  };
  if (yangRenMap[dayStem] === dayBranch) {
    result.push('日坐羊刃 (意志堅毅，防感情爭鋒)');
  }

  // 天德 / 月德
  const tianDeMap: Record<string, string> = {
    寅: '丁', 卯: '申', 辰: '壬', 巳: '辛', 午: '亥', 未: '甲',
    申: '癸', 酉: '寅', 戌: '丙', 亥: '乙', 子: '巳', 丑: '庚'
  };
  if (tianDeMap[monthBranch] === dayStem) {
    result.push('天德貴人 (德澤庇佑，一生少險)');
  }

  if (result.length === 0) {
    result.push('太極貴人 (悟性超群，易學道緣)');
  }

  return result;
}

// 排八字核心函數
export function calculateBaZi(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number,
  birthMinute: number = 0,
  gender: 1 | 0 = 1, // 1: 男, 0: 女
  currentYear: number = new Date().getFullYear()
): BaZiChart {
  const solar = Solar.fromYmdHms(birthYear, birthMonth, birthDay, birthHour, birthMinute, 0);
  const lunar = solar.getLunar();
  const ec = lunar.getEightChar();

  const yearPillar: PillarInfo = {
    stem: ec.getYearGan(),
    branch: ec.getYearZhi(),
    stemElement: STEM_ELEMENTS[ec.getYearGan()] || '土',
    branchElement: BRANCH_ELEMENTS[ec.getYearZhi()] || '土',
    naYin: ec.getYearNaYin(),
    tenGod: ec.getYearShiShenGan(),
    hiddenStems: ec.getYearHideGan(),
  };

  const monthPillar: PillarInfo = {
    stem: ec.getMonthGan(),
    branch: ec.getMonthZhi(),
    stemElement: STEM_ELEMENTS[ec.getMonthGan()] || '土',
    branchElement: BRANCH_ELEMENTS[ec.getMonthZhi()] || '土',
    naYin: ec.getMonthNaYin(),
    tenGod: ec.getMonthShiShenGan(),
    hiddenStems: ec.getMonthHideGan(),
  };

  const dayPillar: PillarInfo = {
    stem: ec.getDayGan(),
    branch: ec.getDayZhi(),
    stemElement: STEM_ELEMENTS[ec.getDayGan()] || '土',
    branchElement: BRANCH_ELEMENTS[ec.getDayZhi()] || '土',
    naYin: ec.getDayNaYin(),
    tenGod: '日主',
    hiddenStems: ec.getDayHideGan(),
  };

  const timePillar: PillarInfo = {
    stem: ec.getTimeGan(),
    branch: ec.getTimeZhi(),
    stemElement: STEM_ELEMENTS[ec.getTimeGan()] || '土',
    branchElement: BRANCH_ELEMENTS[ec.getTimeZhi()] || '土',
    naYin: ec.getTimeNaYin(),
    tenGod: ec.getTimeShiShenGan(),
    hiddenStems: ec.getTimeHideGan(),
  };

  // 五行計數
  const wuxingCount: Record<string, number> = { 金: 0, 木: 0, 水: 0, 火: 0, 土: 0 };
  [yearPillar, monthPillar, dayPillar, timePillar].forEach(p => {
    wuxingCount[p.stemElement] = (wuxingCount[p.stemElement] || 0) + 1;
    wuxingCount[p.branchElement] = (wuxingCount[p.branchElement] || 0) + 1;
  });

  // 神煞
  const shenSha = calculateShenSha(
    dayPillar.stem,
    dayPillar.branch,
    yearPillar.branch,
    monthPillar.branch
  );

  // 大運計算
  const yun = ec.getYun(gender);
  const rawDaYun = yun.getDaYun();
  const daYunList: Array<{
    startAge: number;
    endAge: number;
    startYear: number;
    ganZhi: string;
  }> = [];

  for (let i = 1; i < rawDaYun.length && i <= 8; i++) {
    const d = rawDaYun[i];
    const sAge = d.getStartAge();
    const sYear = d.getStartYear();
    daYunList.push({
      startAge: sAge,
      endAge: sAge + 9,
      startYear: sYear,
      ganZhi: d.getGanZhi(),
    });
  }

  // 當前大運
  const userCurrentAge = currentYear - birthYear;
  let currentDaYun: { age: number; ganZhi: string; startYear: number } | undefined = daYunList[0]
    ? { age: daYunList[0].startAge, ganZhi: daYunList[0].ganZhi, startYear: daYunList[0].startYear }
    : undefined;

  for (const dy of daYunList) {
    if (userCurrentAge >= dy.startAge && userCurrentAge <= dy.endAge) {
      currentDaYun = {
        age: dy.startAge,
        ganZhi: dy.ganZhi,
        startYear: dy.startYear,
      };
      break;
    }
  }

  // 當令節氣
  const jieQi = lunar.getPrevJieQi(true);
  const solarTerm = jieQi ? `${jieQi.getName()} (${jieQi.getSolar().toYmd()})` : '當令節氣正令';

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    timePillar,
    dayMaster: dayPillar.stem,
    dayMasterElement: dayPillar.stemElement,
    solarDateStr: `${solar.getYear()}年${solar.getMonth()}月${solar.getDay()}日 ${solar.getHour()}:${solar.getMinute().toString().padStart(2, '0')}`,
    lunarDateStr: `農曆 ${lunar.getYearInGanZhi()}年 (${lunar.getYearShengXiao()}) ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} ${ec.getTimeZhi()}時`,
    solarTerm,
    wuxingCount,
    daYunList,
    currentDaYun,
    mingGong: ec.getMingGong(),
    shenGong: ec.getShenGong(),
    taiYuan: ec.getTaiYuan(),
    shenSha
  };
}

// 紫微斗數排盤核心函數
export function calculateZiWei(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number,
  gender: 1 | 0 = 1
): ZiWeiChart {
  const solar = Solar.fromYmdHms(birthYear, birthMonth, birthDay, birthHour, 0, 0);
  const lunar = solar.getLunar();
  const yearGan = lunar.getYearGan();

  // 生月與生時地支索引
  const lunarMonth = lunar.getMonth(); // 1 - 12
  // 子時: 23:00 - 00:59, 丑時: 1:00 - 2:59 ...
  const hourZhiIndex = Math.floor((birthHour + 1) / 2) % 12; // 0: 子, 1: 丑, 2: 寅...

  // 1. 定命宮與身宮
  // 命宮: 寅位(index 2)順數至生月(月數-1)，再逆數生時
  let mingGongIndex = (2 + (lunarMonth - 1) - hourZhiIndex) % 12;
  if (mingGongIndex < 0) mingGongIndex += 12;
  const mingGongBranch = ZHI_ORDER[mingGongIndex];

  // 身宮: 寅位(index 2)順數至生月，再順數生時
  const shenGongIndex = (2 + (lunarMonth - 1) + hourZhiIndex) % 12;
  const shenGongBranch = ZHI_ORDER[shenGongIndex];

  // 2. 五虎遁年起月訣定宮干 (以寅宮起)
  // 甲己之年丙作首，乙庚之歲戊為頭，丙辛必定尋庚起，丁壬壬位順行流，戊癸便從甲寅上
  const yearGanToYinStem: Record<string, string> = {
    甲: '丙', 己: '丙',
    乙: '戊', 庚: '戊',
    丙: '庚', 辛: '庚',
    丁: '壬', 壬: '壬',
    戊: '甲', 癸: '甲'
  };
  const STEM_ORDER = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const yinStem = yearGanToYinStem[yearGan] || '甲';
  const yinStemIndex = STEM_ORDER.indexOf(yinStem);

  // 計算每個地支宮位的宮干 (寅宮為 index 2)
  const palaceStems: Record<string, string> = {};
  for (let i = 0; i < 12; i++) {
    // offset from 寅 (index 2)
    const offset = (i - 2 + 12) % 12;
    palaceStems[ZHI_ORDER[i]] = STEM_ORDER[(yinStemIndex + offset) % 10];
  }

  // 3. 確定命宮幹支及五行局
  // 命宮干支
  const mingGongStem = palaceStems[mingGongBranch];
  // 根據命宮納音判定局數：水二局、木三局、金四局、土五局、火六局
  const juMap: Record<string, { juName: string; juNumber: number }> = {
    水: { juName: '水二局', juNumber: 2 },
    木: { juName: '木三局', juNumber: 3 },
    金: { juName: '金四局', juNumber: 4 },
    土: { juName: '土五局', juNumber: 5 },
    火: { juName: '火六局', juNumber: 6 }
  };
  // 簡易五行納音取局
  const sampleSolar = Solar.fromYmdHms(2000, 1, 1, 12, 0, 0);
  const wuxingJu = juMap[STEM_ELEMENTS[mingGongStem] || '水'] || { juName: '水二局', juNumber: 2 };

  // 4. 定紫微星位置 (公式：農曆日數與五行局數相除商餘)
  const dayNum = lunar.getDay();
  let ziWeiBranchIndex = 2; // 預設寅
  // 依日數與局數推演
  const quotient = Math.floor(dayNum / wuxingJu.juNumber);
  const remainder = dayNum % wuxingJu.juNumber;
  if (remainder === 0) {
    ziWeiBranchIndex = (2 + quotient - 1) % 12;
  } else {
    const addX = wuxingJu.juNumber - remainder;
    const isEven = addX % 2 === 0;
    const adjust = isEven ? addX : -addX;
    ziWeiBranchIndex = (2 + quotient + adjust) % 12;
  }
  if (ziWeiBranchIndex < 0) ziWeiBranchIndex += 12;

  // 5. 定天府星位置 (寅申軸對照：天府星與紫微星在寅申線上對稱)
  // 公式：(4 - ziWeiBranchIndex + 12) % 12 (以寅為軸)
  let tianFuBranchIndex = (4 - ziWeiBranchIndex + 12) % 12;

  // 6. 星曜分佈
  // 紫微星系六星逆排: 紫微(0), 天機(-1), 太陽(-3), 武曲(-4), 天同(-5), 廉貞(-8)
  const starPlacement: Record<number, ZiWeiStar[]> = {};
  for (let i = 0; i < 12; i++) starPlacement[i] = [];

  const addStar = (idx: number, name: string, type: 'major' | 'minor' | 'transform') => {
    const normalized = (idx % 12 + 12) % 12;
    starPlacement[normalized].push({ name, type });
  };

  addStar(ziWeiBranchIndex, '紫微星', 'major');
  addStar(ziWeiBranchIndex - 1, '天機星', 'major');
  addStar(ziWeiBranchIndex - 3, '太陽星', 'major');
  addStar(ziWeiBranchIndex - 4, '武曲星', 'major');
  addStar(ziWeiBranchIndex - 5, '天同星', 'major');
  addStar(ziWeiBranchIndex - 8, '廉貞星', 'major');

  // 天府星系八星順排: 天府(0), 太陰(+1), 貪狼(+2), 巨門(+3), 天相(+4), 天梁(+5), 七殺(+6), 破軍(+10)
  addStar(tianFuBranchIndex, '天府星', 'major');
  addStar(tianFuBranchIndex + 1, '太陰星', 'major');
  addStar(tianFuBranchIndex + 2, '貪狼星', 'major');
  addStar(tianFuBranchIndex + 3, '巨門星', 'major');
  addStar(tianFuBranchIndex + 4, '天相星', 'major');
  addStar(tianFuBranchIndex + 5, '天梁星', 'major');
  addStar(tianFuBranchIndex + 6, '七殺星', 'major');
  addStar(tianFuBranchIndex + 10, '破軍星', 'major');

  // 六吉六煞簡易布星
  // 左輔(辰起順數生月), 右弼(戌起逆數生月)
  const zuoFuIdx = (4 + lunarMonth - 1) % 12;
  const youBiIdx = (10 - (lunarMonth - 1) + 12) % 12;
  addStar(zuoFuIdx, '左輔星', 'minor');
  addStar(youBiIdx, '右弼星', 'minor');

  // 文昌(戌起逆生時), 文曲(辰起順生時)
  const wenChangIdx = (10 - hourZhiIndex + 12) % 12;
  const wenQuIdx = (4 + hourZhiIndex) % 12;
  addStar(wenChangIdx, '文昌星', 'minor');
  addStar(wenQuIdx, '文曲星', 'minor');

  // 天魁、天鉞
  const kuiYueMap: Record<string, [number, number]> = {
    甲: [1, 7], 戊: [1, 7], 庚: [1, 7],
    乙: [0, 8], 己: [0, 8],
    丙: [11, 9], 丁: [11, 9],
    壬: [3, 5], 癸: [3, 5],
    辛: [6, 2]
  };
  const [kui, yue] = kuiYueMap[yearGan] || [1, 7];
  addStar(kui, '天魁星', 'minor');
  addStar(yue, '天鉞星', 'minor');

  // 四化星 (化祿、化權、化科、化忌)
  const siHuaMap: Record<string, [string, string, string, string]> = {
    甲: ['廉貞化祿', '破軍化權', '武曲化科', '太陽化忌'],
    乙: ['天機化祿', '天梁化權', '紫微化科', '太陰化忌'],
    丙: ['天同化祿', '天機化權', '文昌化科', '廉貞化忌'],
    丁: ['太陰化祿', '天同化權', '天機化科', '巨門化忌'],
    戊: ['貪狼化祿', '太陰化權', '右弼化科', '天機化忌'],
    己: ['武曲化祿', '貪狼化權', '天梁化科', '文曲化忌'],
    庚: ['太陽化祿', '武曲化權', '太陰化科', '天同化忌'],
    辛: ['巨門化祿', '太陽化權', '文曲化科', '文昌化忌'],
    壬: ['天梁化祿', '紫微化權', '左輔化科', '武曲化忌'],
    癸: ['破軍化祿', '巨門化權', '太陰化科', '貪狼化忌']
  };
  const yearSiHua = siHuaMap[yearGan] || ['化祿', '化權', '化科', '化忌'];

  // 7. 組裝十二宮 (以命宮開始逆排)
  const palaces: ZiWeiPalace[] = [];
  for (let p = 0; p < 12; p++) {
    const palaceName = PALACE_NAMES[p];
    // 逆布十二宮
    const branchIndex = (mingGongIndex - p + 12) % 12;
    const branch = ZHI_ORDER[branchIndex];
    const stem = palaceStems[branch];
    const stars = starPlacement[branchIndex];

    const majorStars = stars.filter(s => s.type === 'major');
    const minorStars = stars.filter(s => s.type === 'minor');

    // 檢查是否有化星
    const yearlyTransforms: string[] = [];
    majorStars.forEach(s => {
      yearSiHua.forEach(sh => {
        if (sh.startsWith(s.name.replace('星', ''))) {
          yearlyTransforms.push(sh);
        }
      });
    });

    palaces.push({
      name: palaceName,
      branch,
      stem,
      majorStars,
      minorStars,
      yearlyTransforms,
      isBodyPalace: branch === shenGongBranch
    });
  }

  return {
    wuxingJu: wuxingJu.juName,
    palaces,
    mingGongBranch,
    shenGongBranch
  };
}
