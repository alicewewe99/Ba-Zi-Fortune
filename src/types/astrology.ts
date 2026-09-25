export interface PillarInfo {
  stem: string; // 天干
  branch: string; // 地支
  stemElement: string; // 天干五行
  branchElement: string; // 地支五行
  naYin: string; // 納音
  tenGod: string; // 十神
  hiddenStems: string[]; // 藏干
  hiddenTenGods?: string[]; // 藏干十神
}

export interface BaZiChart {
  yearPillar: PillarInfo;
  monthPillar: PillarInfo;
  dayPillar: PillarInfo;
  timePillar: PillarInfo;
  dayMaster: string; // 日主 (日干)
  dayMasterElement: string;
  solarDateStr: string; // 陽曆日期
  lunarDateStr: string; // 農曆日期 (含生肖、節氣)
  solarTerm: string; // 當令節氣
  wuxingCount: Record<string, number>; // 金木水火土計數
  favorableElements?: string[]; // 喜用神五行
  unfavorableElements?: string[]; // 忌神五行
  daYunList: Array<{
    startAge: number;
    endAge: number;
    startYear: number;
    ganZhi: string;
  }>;
  currentDaYun?: {
    age: number;
    ganZhi: string;
    startYear: number;
  };
  mingGong: string; // 命宮
  shenGong: string; // 身宮
  taiYuan: string; // 胎元
  shenSha: string[]; // 神煞 (天乙貴人、太極、文昌、桃花、驛馬、天德等)
}

export interface ZiWeiStar {
  name: string;
  type: 'major' | 'minor' | 'transform' | 'other';
  brightness?: '廟' | '旺' | '得' | '利' | '平' | '不' | '陷';
  transform?: '祿' | '權' | '科' | '忌';
}

export interface ZiWeiPalace {
  name: string; // 命宮、夫妻宮、財帛宮、官祿宮等
  branch: string; // 地支 (子丑寅卯...)
  stem: string; // 天干 (甲乙丙丁...)
  majorStars: ZiWeiStar[];
  minorStars: ZiWeiStar[];
  yearlyTransforms?: string[];
  isBodyPalace?: boolean; // 是否身宮同宮
}

export interface ZiWeiChart {
  wuxingJu: string; // 水二局、木三局、金四局、土五局、火六局
  palaces: ZiWeiPalace[];
  mingGongBranch: string;
  shenGongBranch: string;
}

export interface MetaphysicsAnalysis {
  sanMingTongHui: {
    patternName: string; // 格局名稱 (如正印格、食神生財等)
    patternAnalysis: string; // 《三命通會》格局與十神精析
    shenShaSignificance: string; // 吉凶神煞感應
  };
  diTianSui: {
    balanceStatus: string; // 日元旺衰與五行流通狀態
    qiFlowAnalysis: string; // 《滴天髓》氣象生剋與抑揚調濟
    yongShenVerdict: string; // 用神選取與運途喜忌
  };
  qiongTongBaoJian: {
    seasonalClimate: string; // 月令氣候 (如寅月寒木、午月燥土)
    tiaoHouAnalysis: string; // 《窮通寶鑒》調候神取用及氣候救應
  };
  annualFortune: {
    yearGanZhi: string; // 流年干支 (如 2026 丙午年)
    overallScore: number; // 年度綜合運勢 (0-100)
    daYunInteraction: string; // 當前大運與流年刑衝合會解析
    overview: string; // 年度總運評述
  };
  careerFortune: {
    score: number;
    prospectiveFields: string[]; // 適宜發展行業
    analysis: string; // 工作仕途深度剖析
    opportunities: string; // 機遇所在
    challenges: string; // 需防範的暗礁陷阱
  };
  wealthFortune: {
    score: number;
    zhengCaiPianCai: string; // 正財與偏財運勢格局
    analysis: string; // 金錢收支與聚財建議
    investmentTiming: string; // 投資理財吉凶時機
  };
  loveFortuneDetail: {
    score: number;
    relationshipOverview: string; // 姻緣總體走勢
    partnerAgeRange: string; // 命中正緣年齡差距與區間 (明確白話)
    partnerProfession: string; // 命中對象行業職業與外貌性格特質
    encounterTiming: string; // 命中相遇時間節點與結緣場景契機
    actionAdvice: string; // 宗師相處維繫與增旺桃花白話建議
  };
  masterPoem: string; // 易道宗師御批七言斷命詩
  masterAdvice: string; // 易道宗師御批開運化煞指引
}

export interface WeeklyFortuneResponse {
  dateRange: string;
  weekSummary: string;
  luckyScore: number;
  favorableDays: string[];
  cautions: string[]; // 本週注意事項
  analysis: {
    career: string;
    wealth: string;
    love: string;
    health: string;
  };
  masterSuggestions: string[]; // 宗師建議
  dailyBreakdown: Array<{
    date: string;
    dayGanZhi: string;
    luckLevel: '大吉' | '吉' | '平' | '宜慎';
    highlight: string;
  }>;
}

export interface DailyLoveFortuneResponse {
  date: string;
  ganZhi: string;
  loveScore: number; // 好運指數 0-100
  peachBlossomStatus: string; // 桃花動向
  singleAdvice: string; // 單身者遇緣建議
  inRelationshipAdvice: string; // 有伴侶者相處指引
  luckyDirection: string; // 今日桃花吉方
  luckyColor: string; // 開運色系
  luckyHour: string; // 吉祥結緣時辰
  warning: string; // 今日避忌事項
}

export interface SynastryResponse {
  score: number; // 綜合契合度 0-100
  verdict: '天作之合' | '良緣相契' | '中吉磨合' | '相生帶剋' | '緣淺須修';
  dayMasterAffinity: {
    personADayMaster: string;
    personBDayMaster: string;
    stemRelationship: string; // 天干生剋合
    stemScore: number;
  };
  palaceAffinity: {
    branchInteraction: string; // 夫妻宮支衝合刑害
    palaceScore: number;
  };
  elementComplementarity: {
    analysis: string; // 雙方喜忌用神互補性
    complementScore: number;
  };
  detailedLoveAnalysis: string; // 白話文深度姻緣走向
  prosAndCons: {
    strengths: string[]; // 契合亮點
    frictionPoints: string[]; // 磨合衝突點
  };
  masterResolutionGuide: string; // 易道宗師調和破局指南
}
