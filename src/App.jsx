import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Brain, RotateCcw, Check, X, Settings, ArrowLeft, ChevronRight, ChevronLeft, Save, FileText, Calendar as CalendarIcon, Trophy, RefreshCw, Database, Star, Clock } from 'lucide-react';

// ==========================================
// 核心資料庫 (整合您的 CSV 資料)
// ==========================================
const INITIAL_DATA = {
  // --- 五段動詞 (V1) ---
  verb1: [
    { id: 'v1-1', kana: 'あう', kanji: '会う / 合う', meaning: '見面 / 符合', type: '動詞一類' },
    { id: 'v1-2', kana: 'あく', kanji: '開く', meaning: '開 (自動詞)', type: '動詞一類' },
    { id: 'v1-3', kana: 'あずかる', kanji: '預かる', meaning: '保管', type: '動詞一類' },
    { id: 'v1-4', kana: 'あそぶ', kanji: '遊ぶ', meaning: '玩耍', type: '動詞一類' },
    { id: 'v1-5', kana: 'あつまる', kanji: '集まる', meaning: '聚集 (自動詞)', type: '動詞一類' },
    { id: 'v1-6', kana: 'あやまる', kanji: '謝る', meaning: '道歉', type: '動詞一類' },
    { id: 'v1-7', kana: 'あらう', kanji: '洗う', meaning: '清洗', type: '動詞一類' },
    { id: 'v1-8', kana: 'あらそう', kanji: '争う', meaning: '爭奪', type: '動詞一類' },
    { id: 'v1-9', kana: 'ある', kanji: '有る / 在る', meaning: '有 / 在 (無生命)', type: '動詞一類' },
    { id: 'v1-10', kana: 'あるく', kanji: '歩く', meaning: '走路', type: '動詞一類' },
    { id: 'v1-186', kana: 'のぞく', kanji: '除く', meaning: '除去/排除', type: '動詞一類' },
    { id: 'v1-187', kana: 'のばす', kanji: '伸ばす', meaning: '伸展/留長/延期', type: '動詞一類' },
    { id: 'v1-188', kana: 'のぼる', kanji: '登る / 上る', meaning: '攀登 / 上升', type: '動詞一類' },
    { id: 'v1-189', kana: 'のむ', kanji: '飲む', meaning: '喝', type: '動詞一類' },
    { id: 'v1-190', kana: 'のる', kanji: '乗る', meaning: '搭乘', type: '動詞一類' },
    { id: 'v1-191', kana: 'はいる', kanji: '入る', meaning: '進入', type: '動詞一類' },
    { id: 'v1-192', kana: 'はかる', kanji: '計る / 測る / 量る', meaning: '計算 / 測量 / 秤重', type: '動詞一類' },
    { id: 'v1-193', kana: 'はく', kanji: '履く / 吐く / 掃く', meaning: '穿(褲/鞋) / 嘔吐 / 掃地', type: '動詞一類' },
    { id: 'v1-194', kana: 'はこぶ', kanji: '運ぶ', meaning: '運送', type: '動詞一類' },
    { id: 'v1-195', kana: 'はさむ', kanji: '挟む', meaning: '夾', type: '動詞一類' }
  ],
  // --- 上下一段動詞 (V2) ---
  verb2: [
    { id: 'v2-1', kana: 'あける', kanji: '開ける', meaning: '打開 (他動詞)', type: '動詞二類' },
    { id: 'v2-2', kana: 'あげる', kanji: '上げる', meaning: '給予 / 舉起', type: '動詞二類' },
    { id: 'v2-3', kana: 'あこがれる', kanji: '憧れる', meaning: '憧憬', type: '動詞二類' },
    { id: 'v2-4', kana: 'あつめる', kanji: '集める', meaning: '收集 (他動詞)', type: '動詞二類' },
    { id: 'v2-5', kana: 'あてる', kanji: '当てる', meaning: '碰撞 / 猜中', type: '動詞二類' },
    { id: 'v2-6', kana: 'あびる', kanji: '浴びる', meaning: '淋浴', type: '動詞二類' },
    { id: 'v2-7', kana: 'あらわれる', kanji: '現れる', meaning: '出現', type: '動詞二類' },
    { id: 'v2-49', kana: 'こたえる', kanji: '答える', meaning: '回答', type: '動詞二類' },
    { id: 'v2-50', kana: 'こぼれる', kanji: '零れる', meaning: '灑出/溢出', type: '動詞二類' },
    { id: 'v2-51', kana: 'こわれる', kanji: '壊れる', meaning: '壞掉', type: '動詞二類' },
    { id: 'v2-52', kana: 'さける', kanji: '避ける', meaning: '避開', type: '動詞二類' },
    { id: 'v2-53', kana: 'さげる', kanji: '下げる', meaning: '降下/撤下', type: '動詞二類' },
    { id: 'v2-66', kana: 'そだてる', kanji: '育てる', meaning: '養育', type: '動詞二類' },
    { id: 'v2-67', kana: 'そろえる', kanji: '揃える', meaning: '使...一致/備齊', type: '動詞二類' },
    { id: 'v2-68', kana: 'たおれる', kanji: '倒れる', meaning: '倒下', type: '動詞二類' }
  ],
  // --- 不規則動詞 (V3) ---
  verb3: [
    { id: 'v3-1', kana: 'くる', kanji: '来る', meaning: '來', type: '動詞三類' },
    { id: 'v3-2', kana: 'する', kanji: '為る', meaning: '做', type: '動詞三類' },
  ],
  // --- い形容詞 ---
  adj_i: [
    { id: 'adj-i-1', kana: 'あたたかい', kanji: '暖かい', meaning: '溫暖的', type: 'い形容詞' },
    { id: 'adj-i-2', kana: 'あたらしい', kanji: '新しい', meaning: '新的', type: 'い形容詞' },
    { id: 'adj-i-3', kana: 'あつい', kanji: '暑い / 熱い', meaning: '熱的 / 燙的', type: 'い形容詞' },
    { id: 'adj-i-4', kana: 'あぶない', kanji: '危ない', meaning: '危險的', type: 'い形容詞' },
    { id: 'adj-i-5', kana: 'あまい', kanji: '甘い', meaning: '甜的', type: 'い形容詞' },
    { id: 'adj-i-45', kana: 'こわい', kanji: '怖い', meaning: '可怕的', type: 'い形容詞' },
    { id: 'adj-i-46', kana: 'さびしい', kanji: '寂しい', meaning: '寂寞的', type: 'い形容詞' },
    { id: 'adj-i-47', kana: 'さわがしい', kanji: '騒がしい', meaning: '吵鬧的', type: 'い形容詞' },
    { id: 'adj-i-48', kana: 'しかくい', kanji: '四角い', meaning: '四角形的/方形的', type: 'い形容詞' },
    { id: 'adj-i-49', kana: 'したしい', kanji: '親しい', meaning: '親近的/親密的', type: 'い形容詞' }
  ],
  // --- な形容詞 ---
  adj_na: [
    { id: 'adj-na-1', kana: 'あたりまえ', kanji: '当たり前', meaning: '理所當然', type: 'な形容詞' },
    { id: 'adj-na-2', kana: 'あんがい', kanji: '案外', meaning: '意外地', type: 'な形容詞' },
    { id: 'adj-na-3', kana: 'あんしん', kanji: '安心', meaning: '安心', type: 'な形容詞' },
    { id: 'adj-na-4', kana: 'あんぜん', kanji: '安全', meaning: '安全', type: 'な形容詞' },
    { id: 'adj-na-5', kana: 'いじわる', kanji: '意地悪', meaning: '壞心眼', type: 'な形容詞' },
    { id: 'adj-na-80', kana: 'てきとう (な)', kanji: '適当', meaning: '適當的/隨便的', type: 'な形容詞' },
    { id: 'adj-na-81', kana: 'とくい (な)', kanji: '得意', meaning: '擅長的', type: 'な形容詞' },
    { id: 'adj-na-82', kana: 'とくべつ (な)', kanji: '特別', meaning: '特別的', type: 'な形容詞' },
    { id: 'adj-na-86', kana: 'にぎやか (な)', kanji: '賑やか', meaning: '熱鬧的', type: 'な形容詞' },
    { id: 'adj-na-87', kana: 'ねっしん (な)', kanji: '熱心', meaning: '熱心的', type: 'な形容詞' }
  ],
  // --- 名詞 (包含您提供的大量名詞範例) ---
  noun: [
    { id: 'n-1', kana: 'あい', kanji: '愛', meaning: '愛', type: '名詞' },
    { id: 'n-2', kana: 'あいだ', kanji: '間', meaning: '之間', type: '名詞' },
    { id: 'n-3', kana: 'あいて', kanji: '相手', meaning: '對象/對手', type: '名詞' },
    { id: 'n-4', kana: 'アイロン', kanji: 'アイロン', meaning: '熨斗', type: '名詞' },
    { id: 'n-5', kana: 'あかちゃん', kanji: '赤ちゃん', meaning: '嬰兒', type: '名詞' },
    { id: 'n-6', kana: 'あさ', kanji: '朝', meaning: '早上', type: '名詞' },
    { id: 'n-7', kana: 'あさごはん', kanji: '朝ごはん', meaning: '早餐', type: '名詞' },
    { id: 'n-8', kana: 'あじ', kanji: '味', meaning: '味道', type: '名詞' },
    { id: 'n-1663', kana: 'もん', kanji: '門', meaning: '門', type: '名詞' },
    { id: 'n-1664', kana: 'もんく', kanji: '文句', meaning: '抱怨/詞句', type: '名詞' },
    { id: 'n-1665', kana: 'もんだい', kanji: '問題', meaning: '問題', type: '名詞' },
    { id: 'n-1666', kana: 'よくじつ', kanji: '翌日', meaning: '隔天', type: '名詞' },
    { id: 'n-1667', kana: 'よくしゅう', kanji: '翌週', meaning: '下週/隔週', type: '名詞' },
    { id: 'n-1668', kana: 'よくとし / よいねん', kanji: '翌年', meaning: '隔年', type: '名詞' },
    { id: 'n-1669', kana: 'よこ', kanji: '横', meaning: '旁邊/橫', type: '名詞' },
    { id: 'n-1670', kana: 'よこがき', kanji: '横書き', meaning: '橫寫', type: '名詞' },
    { id: 'n-1671', kana: 'よごれ', kanji: '汚れ', meaning: '汙垢', type: '名詞' },
    { id: 'n-1672', kana: 'よさん', kanji: '予算', meaning: '預算', type: '名詞' },
    { id: 'n-1673', kana: 'よてい', kanji: '予定', meaning: '預定', type: '名詞' },
    { id: 'n-1674', kana: 'よだれ', kanji: '涎', meaning: '口水', type: '名詞' },
    { id: 'n-1675', kana: 'よっぱらい', kanji: '酔っ払い', meaning: '醉漢', type: '名詞' },
    { id: 'n-1676', kana: 'よなか', kanji: '夜中', meaning: '半夜', type: '名詞' },
    { id: 'n-1677', kana: 'よる', kanji: '夜', meaning: '夜晚', type: '名詞' },
    { id: 'n-1678', kana: 'らいげつ', kanji: '来月', meaning: '下個月', type: '名詞' },
    { id: 'n-1679', kana: 'らいしゅう', kanji: '来週', meaning: '下週', type: '名詞' },
    { id: 'n-1680', kana: 'ライフ', kanji: 'Life', meaning: '生活', type: '名詞' },
    { id: 'n-1681', kana: 'ライバル', kanji: 'Rival', meaning: '對手', type: '名詞' },
    { id: 'n-1682', kana: 'ライン', kanji: 'Line', meaning: '線/Line', type: '名詞' },
    { id: 'n-1683', kana: 'ランチ', kanji: 'Lunch', meaning: '午餐', type: '名詞' },
    { id: 'n-1684', kana: 'り', kanji: '利', meaning: '利益/好處', type: '名詞' },
    { id: 'n-1685', kana: 'りえき', kanji: '利益', meaning: '利益', type: '名詞' },
    { id: 'n-1686', kana: 'りか', kanji: '理科', meaning: '理科', type: '名詞' },
    { id: 'n-1687', kana: 'りそう', kanji: '理想', meaning: '理想', type: '名詞' },
    { id: 'n-1688', kana: 'リビング', kanji: 'リビング', meaning: '起居室/客廳', type: '名詞' },
    { id: 'n-1689', kana: 'りゅうこうしょく', kanji: '流行色', meaning: '流行色', type: '名詞' }
  ]
};

const CATEGORIES = [
  { key: 'verb1', label: '動詞一類 (五段)', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  { key: 'verb2', label: '動詞二類 (一段)', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { key: 'verb3', label: '動詞三類 (不規則)', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { key: 'adj_i', label: 'い形容詞', color: 'bg-sky-100 text-sky-800 border-sky-200' },
  { key: 'adj_na', label: 'な形容詞', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { key: 'noun', label: '名詞', color: 'bg-slate-100 text-slate-800 border-slate-200' },
];

// 取得一年中的第幾天 (0-365)
const getDayOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export default function App() {
  const [view, setView] = useState('home'); 
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Data State
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('jlpt_data_v3');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  // Learned History State
  const [learnedHistory, setLearnedHistory] = useState(() => {
    const saved = localStorage.getItem('jlpt_learned');
    return saved ? JSON.parse(saved) : [];
  });

  // Daily Mission & Review State
  const [dailyQueue, setDailyQueue] = useState([]);
  const [isDailyMode, setIsDailyMode] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Settings State
  const [jsonInput, setJsonInput] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  // Persist Data & History
  useEffect(() => {
    localStorage.setItem('jlpt_data_v3', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('jlpt_learned', JSON.stringify(learnedHistory));
  }, [learnedHistory]);

  // --- 📆 核心邏輯：根據日期產生固定單字表 ---
  const getScheduledWords = (targetDate) => {
    const dayIndex = getDayOfYear(targetDate);
    
    // 定義每日配額
    const QUOTAS = { verb1: 5, verb2: 5, adj_i: 5, adj_na: 5, noun: 20 };
    const TARGET_TOTAL = 40;

    let missionList = [];

    // Helper: 根據日期循環取樣 (Deterministic Slicing)
    const getSliceForDate = (key, count) => {
      if (!data[key] || data[key].length === 0) return [];
      const total = data[key].length;
      // 計算當天應該從第幾個字開始抓
      const startIndex = (dayIndex * count) % total;
      
      let slice = [];
      for (let i = 0; i < count; i++) {
        slice.push(data[key][(startIndex + i) % total]);
      }
      return slice;
    };

    // 1. 抓取基本配額
    const v1 = getSliceForDate('verb1', QUOTAS.verb1);
    const v2 = getSliceForDate('verb2', QUOTAS.verb2);
    
    // 如果 V2 不夠，補 V3
    let extraV3 = [];
    if (v2.length < QUOTAS.verb2) {
       extraV3 = getSliceForDate('verb3', QUOTAS.verb2 - v2.length);
    }
    
    const adjI = getSliceForDate('adj_i', QUOTAS.adj_i);
    const adjNa = getSliceForDate('adj_na', QUOTAS.adj_na);
    const nouns = getSliceForDate('noun', QUOTAS.noun);

    missionList = [...v1, ...v2, ...extraV3, ...adjI, ...adjNa, ...nouns];

    // 2. 如果總數不足 40 (例如資料庫很小)，用名詞補
    let needed = TARGET_TOTAL - missionList.length;
    if (needed > 0) {
      // 名詞的 offset 故意錯開，避免跟上面重複
      const extraNouns = getSliceForDate('noun', needed + 20).slice(20, 20 + needed); 
      missionList = [...missionList, ...extraNouns];
      
      // 最後手段：如果還不夠，從全部亂抓
      needed = TARGET_TOTAL - missionList.length;
      if (needed > 0) {
        const all = Object.values(data).flat();
        for (let i = 0; i < needed; i++) {
           missionList.push(all[(dayIndex + i) % all.length]);
        }
      }
    }
    
    // 去重 (以防資料庫太小導致重複)
    const uniqueList = [];
    const ids = new Set();
    missionList.forEach(w => {
      if(w && !ids.has(w.id)) {
        ids.add(w.id);
        uniqueList.push(w);
      }
    });

    return uniqueList;
  };

  // --- 啟動模式 ---
  
  // 1. 每日任務 (根據選定日期)
  const startDailyMission = () => {
    const words = getScheduledWords(selectedDate);
    setDailyQueue(words);
    setIsDailyMode(true);
    setIsReviewMode(false);
    setView('study');
  };

  // 2. 總複習 (只考已學會的)
  const startMasterReview = () => {
    const allWords = Object.values(data).flat();
    const masteredWords = allWords.filter(w => learnedHistory.includes(w.id));
    
    if (masteredWords.length === 0) {
      alert("您還沒有熟記任何單字喔！請先進行每日練習。");
      return;
    }

    // 隨機打亂
    const shuffled = masteredWords.sort(() => 0.5 - Math.random());
    setDailyQueue(shuffled);
    setIsDailyMode(false);
    setIsReviewMode(true);
    setView('quiz'); // 複習直接進入測驗模式比較合理，或者也可以讓選單選
  };

  // 3. 一般分類練習
  const startCategorySession = (categoryKey, mode) => {
    setActiveCategory(categoryKey);
    setIsDailyMode(false);
    setIsReviewMode(false);
    const list = [...data[categoryKey]].sort(() => Math.random() - 0.5);
    setDailyQueue(list);
    setView(mode);
  };

  const handleMarkAsLearned = (id) => {
    if (!learnedHistory.includes(id)) {
      setLearnedHistory(prev => [...prev, id]);
    }
  };

  const handleSaveData = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setData(parsed);
      setSaveStatus('儲存成功！');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (e) {
      setSaveStatus('錯誤：JSON 格式不正確。');
    }
  };

  // Helper
  const getTotalWords = () => Object.values(data).reduce((acc, curr) => acc + curr.length, 0);
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 pb-10">
      {/* Header */}
      <header className="bg-indigo-900 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <BookOpen size={24} />
            <h1 className="text-xl font-bold tracking-wider">日語特訓</h1>
          </div>
          <button 
            onClick={() => {
              setJsonInput(JSON.stringify(data, null, 2));
              setView('settings');
            }}
            className="p-2 hover:bg-indigo-800 rounded-full transition"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4">
        {view === 'home' && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            
            {/* 數據概覽 */}
            <div className="flex justify-between items-center px-2 text-sm text-stone-500">
               <span className="flex items-center gap-1"><Database size={14}/> 總字彙: {getTotalWords()}</span>
               <span className="flex items-center gap-1 text-amber-600 font-bold"><Star size={14}/> 已熟記: {learnedHistory.length}</span>
            </div>

            {/* 📅 月曆區塊 (Calendar Block) */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-stone-200">
              <div className="flex justify-between items-center mb-4">
                 <h2 className="font-bold text-lg flex items-center gap-2 text-indigo-900">
                   <CalendarIcon size={20} /> 學習日程
                 </h2>
                 <span className="text-sm text-stone-400">
                   {selectedDate.getFullYear()}年 {selectedDate.getMonth()+1}月
                 </span>
              </div>
              
              {/* 簡單的一週日期選擇器 */}
              <div className="flex justify-between mb-4">
                {Array.from({length: 5}).map((_, i) => {
                  // 顯示今天與未來4天
                  const d = new Date();
                  d.setDate(d.getDate() + i - 1); // 包含昨天做參考
                  const isSelected = d.getDate() === selectedDate.getDate();
                  const isTodayDate = isToday(d);
                  
                  return (
                    <button 
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className={`flex flex-col items-center justify-center w-12 h-14 rounded-xl transition-all ${
                        isSelected 
                          ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                          : isTodayDate 
                            ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                            : 'bg-stone-50 text-stone-400 hover:bg-stone-100'
                      }`}
                    >
                      <span className="text-xs font-bold">{d.getMonth()+1}/{d.getDate()}</span>
                      <span className="text-[10px] uppercase">{['日','一','二','三','四','五','六'][d.getDay()]}</span>
                    </button>
                  )
                })}
              </div>

              {/* 每日任務按鈕 */}
              <button 
                onClick={startDailyMission}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition"></div>
                <RefreshCw size={20} /> 
                {isToday(selectedDate) ? '開始今日特訓' : `練習 ${selectedDate.getMonth()+1}/${selectedDate.getDate()} 的單字`}
                <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded ml-2">40字</span>
              </button>
            </div>

            {/* 🏆 總複習按鈕 (新功能) */}
            <div 
              onClick={startMasterReview}
              className="bg-amber-100 border border-amber-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-amber-200 transition shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-amber-400 p-2 rounded-lg text-white shadow-sm group-hover:scale-110 transition">
                  <Trophy size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-amber-900">總複習挑戰</h3>
                  <p className="text-xs text-amber-700">題庫：已熟記的 {learnedHistory.length} 個單字</p>
                </div>
              </div>
              <ChevronRight className="text-amber-500" />
            </div>

            <div className="text-center py-2">
              <p className="text-stone-500 mb-2 text-sm">單項分類練習</p>
              <div className="h-0.5 w-10 bg-stone-300 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => (
                <div key={cat.key} className={`border rounded-xl p-3 shadow-sm hover:shadow-md transition-all ${cat.color} bg-white bg-opacity-50 flex flex-col justify-between`}>
                  <div className="mb-2">
                    <h3 className="font-bold text-sm">{cat.label.split(' ')[0]}</h3>
                    <span className="text-[10px] opacity-70">
                      {data[cat.key]?.length || 0} 字
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => startCategorySession(cat.key, 'study')} className="flex-1 bg-white hover:bg-opacity-80 py-1.5 rounded text-xs font-bold shadow-sm">背誦</button>
                    <button onClick={() => startCategorySession(cat.key, 'quiz')} className="flex-1 bg-black bg-opacity-10 hover:bg-opacity-20 py-1.5 rounded text-xs font-bold shadow-sm">測驗</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 pb-8">
               <button 
                 onClick={() => {
                   if(confirm('確定要清除所有熟記標記嗎？')) {
                     setLearnedHistory([]);
                     localStorage.removeItem('jlpt_learned');
                   }
                 }}
                 className="text-stone-300 text-xs hover:text-red-400 transition"
               >
                 清除學習紀錄
               </button>
            </div>
          </div>
        )}

        {view === 'study' && (
          <StudyMode 
            words={dailyQueue} 
            isDaily={isDailyMode}
            label={isDailyMode ? `${selectedDate.getMonth()+1}/${selectedDate.getDate()} 每日任務` : CATEGORIES.find(c => c.key === activeCategory)?.label}
            onBack={() => setView('home')} 
            onMarkLearned={handleMarkAsLearned}
            learnedIds={learnedHistory}
          />
        )}

        {view === 'quiz' && (
          <QuizMode 
            words={dailyQueue} 
            allData={isReviewMode ? dailyQueue : (isDailyMode ? dailyQueue : data[activeCategory])}
            label={isReviewMode ? '總複習挑戰' : (isDailyMode ? '綜合測驗' : CATEGORIES.find(c => c.key === activeCategory)?.label)}
            onBack={() => setView('home')} 
          />
        )}

        {view === 'settings' && (
          <SettingsMode 
            jsonInput={jsonInput} 
            setJsonInput={setJsonInput} 
            handleSaveData={handleSaveData} 
            saveStatus={saveStatus}
            onBack={() => setView('home')}
            totalWords={getTotalWords()}
          />
        )}
      </main>
    </div>
  );
}

// --- 背單字模式 ---
function StudyMode({ words, label, onBack, onMarkLearned, learnedIds, isDaily }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionLearned, setSessionLearned] = useState(new Set()); 

  if (!words || words.length === 0) return <div className="text-center p-8 mt-10">此類別沒有單字</div>;

  const currentWord = words[currentIndex];
  const isAlreadyLearned = learnedIds.includes(currentWord.id) || sessionLearned.has(currentWord.id);
  
  // 處理如果沒有漢字的情況 (如外來語)，顯示假名
  const displayKanji = (currentWord.kanji === '-' || !currentWord.kanji) ? currentWord.kana : currentWord.kanji;

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
    }, 150);
  };

  const toggleLearned = (e) => {
    e.stopPropagation();
    onMarkLearned(currentWord.id);
    setSessionLearned(prev => new Set(prev).add(currentWord.id));
  };

  // 鍵盤控制
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ' || e.key === 'Enter') setIsFlipped(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [words]);

  return (
    <div className="h-full flex flex-col items-center animate-in fade-in duration-300">
      <div className="w-full flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-stone-500 hover:text-stone-800 p-2">
          <ArrowLeft />
        </button>
        <span className={`font-semibold ${isDaily ? 'text-indigo-600' : 'text-stone-600'}`}>
           {label} <span className="text-sm ml-1 text-stone-400">({currentIndex + 1}/{words.length})</span>
        </span>
        <div className="w-10"></div>
      </div>

      <div className="perspective-1000 w-full max-w-xs h-80 relative cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full duration-500 preserve-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-xl border border-stone-100 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {isAlreadyLearned && (
               <div className="absolute top-0 left-0 bg-amber-500 text-white text-xs px-3 py-1 rounded-br-lg z-10 flex items-center gap-1">
                 <Star size={10} fill="white" /> 已熟記
               </div>
            )}
            <span className="text-sm text-indigo-500 font-bold mb-4 tracking-widest uppercase">Japanese</span>
            <h2 className={`font-bold text-stone-800 mb-2 ${displayKanji.length > 6 ? 'text-3xl' : 'text-5xl'}`}>
              {displayKanji}
            </h2>
            <p className="absolute bottom-6 text-stone-400 text-sm flex items-center gap-1">
              <RotateCcw size={14} /> 點擊翻面
            </p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-indigo-50 rounded-2xl shadow-xl border border-indigo-100 flex flex-col items-center justify-center p-6 text-center relative">
             <span className="text-sm text-stone-500 font-bold mb-4 tracking-widest uppercase">Meaning</span>
             <p className="text-3xl text-indigo-700 font-medium mb-2">{currentWord.kana}</p>
             <div className="w-12 h-1 bg-indigo-200 rounded-full my-4"></div>
             <p className="text-xl text-stone-700 font-bold break-words w-full px-2">{currentWord.meaning}</p>
             
             <div className="absolute bottom-4 w-full px-6 flex justify-center">
                <button 
                  onClick={toggleLearned}
                  disabled={isAlreadyLearned}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm transition ${isAlreadyLearned ? 'bg-amber-100 text-amber-700' : 'bg-white text-stone-600 hover:bg-green-50 hover:text-green-600'}`}
                >
                  {isAlreadyLearned ? <><Check size={16}/> 已熟記</> : <><Trophy size={16}/> 標記為熟記</>}
                </button>
             </div>
             
             <p className="absolute top-4 right-4 text-indigo-400 text-xs px-2 py-1 border border-indigo-200 rounded">
                {currentWord.type.replace('動詞', 'V.').replace('形容詞', 'Adj.')}
             </p>
          </div>
        </div>
      </div>

      <div className="flex gap-8 mt-10">
        <button onClick={handlePrev} className="p-4 bg-white rounded-full shadow-md text-stone-600 hover:bg-stone-100 transition">
          <ChevronLeft size={24} />
        </button>
        <button onClick={handleNext} className="p-4 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200 text-white hover:bg-indigo-700 transition transform hover:scale-105 active:scale-95">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

// --- 測驗模式 ---
function QuizMode({ words, allData, label, onBack }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = words[currentQIndex];
  
  const options = useMemo(() => {
    if (!currentQuestion) return [];
    const correct = currentQuestion;
    // 從全部資料中撈干擾項
    // 注意：如果是總複習模式，allData 應該要是「已熟記」的單字池
    let distractors = allData.filter(w => w.id !== correct.id);
    
    // 預防資料不足
    if (distractors.length < 3) {
      distractors = [...distractors, ...distractors, ...distractors]; 
    }
    
    const finalDistractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...finalDistractors, correct].sort(() => 0.5 - Math.random());
  }, [currentQuestion, allData]);

  const handleAnswer = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);
    const correct = option.id === currentQuestion.id;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (currentQIndex < words.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setQuizFinished(true);
      }
    }, 1200);
  };

  const restartQuiz = () => {
    setCurrentQIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const displayKanji = currentQuestion?.kanji === '-' || !currentQuestion?.kanji ? currentQuestion?.kana : currentQuestion?.kanji;

  if (quizFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-10 text-center animate-in zoom-in duration-300">
        <div className="mb-6 bg-white p-6 rounded-full shadow-lg">
           {score === words.length ? <Trophy size={64} className="text-yellow-500" /> : <BookOpen size={64} className="text-indigo-500" />}
        </div>
        <h2 className="text-3xl font-bold mb-2 text-stone-800">測驗完成！</h2>
        <p className="text-lg text-stone-600 mb-8">
          你的分數：<span className="text-2xl font-bold text-indigo-600">{score}</span> / {words.length}
        </p>
        <div className="flex gap-4">
          <button onClick={onBack} className="px-6 py-3 bg-stone-200 rounded-xl font-semibold text-stone-700 hover:bg-stone-300">回首頁</button>
          <button onClick={restartQuiz} className="px-6 py-3 bg-indigo-600 rounded-xl font-semibold text-white hover:bg-indigo-700">再測一次</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-stone-400 hover:text-stone-800"><X size={24} /></button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{label}</span>
          <span className="font-bold text-indigo-600">Q. {currentQIndex + 1} <span className="text-stone-400 text-sm">/ {words.length}</span></span>
        </div>
        <div className="w-6"></div>
      </div>

      <div className="w-full bg-stone-200 h-2 rounded-full mb-8 overflow-hidden">
        <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${((currentQIndex) / words.length) * 100}%` }}></div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border-b-4 border-stone-200 p-8 text-center mb-8 min-h-[160px] flex flex-col justify-center items-center">
        <h2 className={`font-bold text-stone-800 mb-2 ${displayKanji?.length > 6 ? 'text-2xl' : 'text-4xl'}`}>
          {displayKanji}
        </h2>
        <p className="text-stone-400 text-sm">請選擇正確的意思</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((opt, idx) => {
          const isSelected = selectedOption?.id === opt.id;
          const isRealAnswer = currentQuestion?.id === opt.id;
          let btnClass = "bg-white border-2 border-stone-100 text-stone-700 hover:border-indigo-200 hover:bg-indigo-50";
          if (selectedOption) {
            if (isRealAnswer) btnClass = "bg-green-100 border-green-500 text-green-800";
            else if (isSelected) btnClass = "bg-red-100 border-red-500 text-red-800";
            else btnClass = "bg-stone-50 border-stone-100 text-stone-300 opacity-50";
          }
          return (
            <button key={`${opt.id}-${idx}`} disabled={!!selectedOption} onClick={() => handleAnswer(opt)} className={`w-full p-4 rounded-xl text-lg font-medium transition-all duration-200 flex justify-between items-center shadow-sm ${btnClass}`}>
              <span className="text-left">{opt.meaning} <span className="text-sm opacity-60">({opt.kana})</span></span>
              {selectedOption && isRealAnswer && <Check size={20} />}
              {selectedOption && isSelected && !isRealAnswer && <X size={20} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- 設定頁面 ---
function SettingsMode({ jsonInput, setJsonInput, handleSaveData, saveStatus, onBack, totalWords }) {
  return (
    <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-stone-200 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold">資料管理</h2>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200">
        <h3 className="font-bold flex items-center gap-2 mb-2"><Database size={18} className="text-indigo-600"/> 目前單字庫狀態</h3>
        <p className="text-sm text-stone-500 mb-4">目前 App 內共有 <strong>{totalWords}</strong> 個單字。</p>
        
        <h3 className="font-bold flex items-center gap-2 mb-2 mt-6"><FileText size={18} className="text-indigo-600"/> 編輯原始資料 (JSON)</h3>
        <p className="text-sm text-stone-500 mb-3">若您需要手動新增或修改單字，請編輯下方內容。</p>
        <textarea className="w-full h-80 font-mono text-xs p-3 border rounded-lg bg-stone-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none" value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />
        <div className="flex justify-between items-center mt-3">
          <span className={`text-sm ${saveStatus.includes('錯誤') ? 'text-red-500' : 'text-green-600'}`}>{saveStatus}</span>
          <button onClick={handleSaveData} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"><Save size={18} /> 儲存變更</button>
        </div>
      </div>
    </div>
  );
}
