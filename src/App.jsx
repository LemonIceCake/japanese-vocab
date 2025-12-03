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
    { id: 'v1-11', kana: 'いいかえす', kanji: '言い返す', meaning: '頂嘴、反駁', type: '動詞一類' },
    { id: 'v1-12', kana: 'いう', kanji: '言う', meaning: '說', type: '動詞一類' },
    { id: 'v1-13', kana: 'いく', kanji: '行く', meaning: '去', type: '動詞一類' },
    { id: 'v1-14', kana: 'いそぐ', kanji: '急ぐ', meaning: '著急', type: '動詞一類' },
    { id: 'v1-15', kana: 'いただく', kanji: '頂く', meaning: '領受', type: '動詞一類' },
    { id: 'v1-16', kana: 'いのる', kanji: '祈る', meaning: '祈禱', type: '動詞一類' },
    { id: 'v1-17', kana: 'いらっしゃる', kanji: '-', meaning: '去/來/在', type: '動詞一類' },
    { id: 'v1-18', kana: 'いる', kanji: '要る', meaning: '需要', type: '動詞一類' },
    { id: 'v1-19', kana: 'いわう', kanji: '祝う', meaning: '慶祝', type: '動詞一類' },
    { id: 'v1-20', kana: 'いやがる', kanji: '嫌がる', meaning: '討厭', type: '動詞一類' },
    { id: 'v1-21', kana: 'うかぶ', kanji: '浮かぶ', meaning: '浮現/漂浮', type: '動詞一類' },
    { id: 'v1-22', kana: 'うかる', kanji: '受かる', meaning: '(考試)考上/及格', type: '動詞一類' },
    { id: 'v1-23', kana: 'うく', kanji: '浮く', meaning: '浮', type: '動詞一類' },
    { id: 'v1-24', kana: 'うけとる', kanji: '受け取る', meaning: '接收/領取', type: '動詞一類' },
    { id: 'v1-25', kana: 'うしなう', kanji: '失う', meaning: '失去', type: '動詞一類' },
    { id: 'v1-26', kana: 'うたがう', kanji: '疑う', meaning: '懷疑', type: '動詞一類' },
    { id: 'v1-27', kana: 'うつ', kanji: '打つ', meaning: '打/擊', type: '動詞一類' },
    { id: 'v1-28', kana: 'うなる', kanji: '唸る', meaning: '呻吟/發出嗚嗚聲', type: '動詞一類' },
    { id: 'v1-29', kana: 'うばう', kanji: '奪う', meaning: '奪取', type: '動詞一類' },
    { id: 'v1-30', kana: 'うらかえす', kanji: '裏返す', meaning: '翻過來', type: '動詞一類' },
    { id: 'v1-31', kana: 'うらぎる', kanji: '裏切る', meaning: '背叛', type: '動詞一類' },
    { id: 'v1-32', kana: 'うる', kanji: '売る', meaning: '賣', type: '動詞一類' },
    { id: 'v1-33', kana: 'えがく', kanji: '描く', meaning: '描繪', type: '動詞一類' },
    { id: 'v1-34', kana: 'えらぶ', kanji: '選ぶ', meaning: '選擇', type: '動詞一類' },
    { id: 'v1-35', kana: 'おいこす', kanji: '追い越す', meaning: '趕過/超過', type: '動詞一類' },
    { id: 'v1-36', kana: 'おいつく', kanji: '追いつく', meaning: '追上', type: '動詞一類' },
    { id: 'v1-37', kana: 'おいぬく', kanji: '追い抜く', meaning: '超過/勝過', type: '動詞一類' },
    { id: 'v1-38', kana: 'おう', kanji: '追う', meaning: '追趕', type: '動詞一類' },
    { id: 'v1-39', kana: 'おく', kanji: '置く', meaning: '放置', type: '動詞一類' },
    { id: 'v1-40', kana: 'おくる', kanji: '送る', meaning: '送/寄', type: '動詞一類' },
    { id: 'v1-41', kana: 'おこす', kanji: '起こす', meaning: '叫醒/引起', type: '動詞一類' },
    { id: 'v1-42', kana: 'おこなう', kanji: '行う', meaning: '舉行/進行', type: '動詞一類' },
    { id: 'v1-43', kana: 'おこる', kanji: '怒る', meaning: '生氣', type: '動詞一類' },
    { id: 'v1-44', kana: 'おこる', kanji: '起こる', meaning: '發生', type: '動詞一類' },
    { id: 'v1-45', kana: 'おごる', kanji: '奢る', meaning: '請客', type: '動詞一類' },
    { id: 'v1-46', kana: 'おそう', kanji: '襲う', meaning: '襲擊', type: '動詞一類' },
    { id: 'v1-47', kana: 'おちこむ', kanji: '落ち込む', meaning: '消沉/跌進', type: '動詞一類' },
    { id: 'v1-48', kana: 'おっしゃる', kanji: '仰る', meaning: '說', type: '動詞一類' },
    { id: 'v1-49', kana: 'おどる', kanji: '踊る', meaning: '跳舞', type: '動詞一類' },
    { id: 'v1-50', kana: 'おもいだす', kanji: '思い出す', meaning: '想起來', type: '動詞一類' },
    { id: 'v1-51', kana: 'おもう', kanji: '思う', meaning: '想/認為', type: '動詞一類' },
    { id: 'v1-52', kana: 'およぐ', kanji: '泳ぐ', meaning: '游泳', type: '動詞一類' },
    { id: 'v1-53', kana: 'おる', kanji: '折る', meaning: '折 (他動詞)', type: '動詞一類' },
    { id: 'v1-54', kana: 'おろす', kanji: '下ろす', meaning: '降下/卸下/領錢', type: '動詞一類' },
    { id: 'v1-55', kana: 'おわる', kanji: '終わる', meaning: '結束 (自動詞)', type: '動詞一類' },
    { id: 'v1-56', kana: 'かえす', kanji: '返す', meaning: '歸還', type: '動詞一類' },
    { id: 'v1-57', kana: 'かえる', kanji: '帰る', meaning: '回家/回去', type: '動詞一類' },
    { id: 'v1-58', kana: 'かかる', kanji: '掛かる', meaning: '花費/懸掛 (自動詞)', type: '動詞一類' },
    { id: 'v1-59', kana: 'かく', kanji: '書く / 描く', meaning: '寫 / 畫', type: '動詞一類' },
    { id: 'v1-60', kana: 'かくす', kanji: '隠す', meaning: '隱藏', type: '動詞一類' },
    { id: 'v1-61', kana: 'かさなる', kanji: '重なる', meaning: '重疊 (自動詞)', type: '動詞一類' },
    { id: 'v1-62', kana: 'かざる', kanji: '飾る', meaning: '裝飾', type: '動詞一類' },
    { id: 'v1-63', kana: 'かす', kanji: '貸す', meaning: '借出', type: '動詞一類' },
    { id: 'v1-64', kana: 'かせぐ', kanji: '稼ぐ', meaning: '賺錢', type: '動詞一類' },
    { id: 'v1-65', kana: 'かたよる', kanji: '偏る', meaning: '偏頗/不平衡', type: '動詞一類' },
    { id: 'v1-66', kana: 'かたる', kanji: '語る', meaning: '講述', type: '動詞一類' },
    { id: 'v1-67', kana: 'かつ', kanji: '勝つ', meaning: '勝利', type: '動詞一類' },
    { id: 'v1-68', kana: 'かまう', kanji: '構う', meaning: '介意/照顧', type: '動詞一類' },
    { id: 'v1-69', kana: 'かむ', kanji: '噛む', meaning: '咬/咀嚼', type: '動詞一類' },
    { id: 'v1-70', kana: 'かよう', kanji: '通う', meaning: '往來/通勤', type: '動詞一類' },
    { id: 'v1-71', kana: 'かわかす', kanji: '乾かす', meaning: '弄乾', type: '動詞一類' },
    { id: 'v1-72', kana: 'かわく', kanji: '乾く / 渇く', meaning: '變乾 / 口渴', type: '動詞一類' },
    { id: 'v1-73', kana: 'かわる', kanji: '変わる / 代わる', meaning: '變化 / 代替', type: '動詞一類' },
    { id: 'v1-74', kana: 'きく', kanji: '聞く / 効く', meaning: '聽・問 / 有效', type: '動詞一類' },
    { id: 'v1-75', kana: 'きざむ', kanji: '刻む', meaning: '刻/切碎', type: '動詞一類' },
    { id: 'v1-76', kana: 'きづく', kanji: '気付く', meaning: '察覺/注意到', type: '動詞一類' },
    { id: 'v1-77', kana: 'きにいる', kanji: '気に入る', meaning: '中意/喜歡', type: '動詞一類' },
    { id: 'v1-78', kana: 'きになる', kanji: '気になる', meaning: '在意/掛心', type: '動詞一類' },
    { id: 'v1-79', kana: 'きまる', kanji: '決まる', meaning: '決定 (自動詞)', type: '動詞一類' },
    { id: 'v1-80', kana: 'きる', kanji: '切る', meaning: '切/剪', type: '動詞一類' },
    { id: 'v1-81', kana: 'くさる', kanji: '腐る', meaning: '腐爛', type: '動詞一類' },
    { id: 'v1-82', kana: 'くださる', kanji: '下さる', meaning: '給 (尊敬語)', type: '動詞一類' },
    { id: 'v1-83', kana: 'くだる', kanji: '下る', meaning: '下降/下坡', type: '動詞一類' },
    { id: 'v1-84', kana: 'くもる', kanji: '曇る', meaning: '陰天/變多雲', type: '動詞一類' },
    { id: 'v1-85', kana: 'くらす', kanji: '暮らす', meaning: '生活/度日', type: '動詞一類' },
    { id: 'v1-86', kana: 'くりかえす', kanji: '繰り返す', meaning: '重複', type: '動詞一類' },
    { id: 'v1-87', kana: 'くるしむ', kanji: '苦しむ', meaning: '感到痛苦/受折磨', type: '動詞一類' },
    { id: 'v1-88', kana: 'けす', kanji: '消す', meaning: '關掉/弄熄/擦掉', type: '動詞一類' },
    { id: 'v1-89', kana: 'ける', kanji: '蹴る', meaning: '踢', type: '動詞一類' },
    { id: 'v1-90', kana: 'こおる', kanji: '凍る', meaning: '結冰', type: '動詞一類' },
    { id: 'v1-91', kana: 'こす', kanji: '越す', meaning: '越過/搬家', type: '動詞一類' },
    { id: 'v1-92', kana: 'こする', kanji: '擦る', meaning: '摩擦', type: '動詞一類' },
    { id: 'v1-93', kana: 'ことわる', kanji: '断る', meaning: '拒絕', type: '動詞一類' },
    { id: 'v1-94', kana: 'このむ', kanji: '好む', meaning: '喜好', type: '動詞一類' },
    { id: 'v1-95', kana: 'こぼす', kanji: '零す', meaning: '弄翻/灑出', type: '動詞一類' },
    { id: 'v1-96', kana: 'こまる', kanji: '困る', meaning: '困擾/為難', type: '動詞一類' },
    { id: 'v1-97', kana: 'こむ', kanji: '込む', meaning: '擁擠', type: '動詞一類' },
    { id: 'v1-98', kana: 'ころがす', kanji: '転がす', meaning: '滾動 (他動詞)', type: '動詞一類' },
    { id: 'v1-99', kana: 'ころがる', kanji: '転がる', meaning: '滾動 (自動詞)', type: '動詞一類' },
    { id: 'v1-100', kana: 'ころす', kanji: '殺す', meaning: '殺', type: '動詞一類' },
    { id: 'v1-101', kana: 'こわす', kanji: '壊す', meaning: '弄壞', type: '動詞一類' },
    { id: 'v1-102', kana: 'さく', kanji: '咲く', meaning: '開花', type: '動詞一類' },
    { id: 'v1-103', kana: 'さけぶ', kanji: '叫ぶ', meaning: '呼喊/叫喊', type: '動詞一類' },
    { id: 'v1-104', kana: 'さす', kanji: '指す / 刺す / 差す', meaning: '指 / 刺 / 撐(傘)', type: '動詞一類' },
    { id: 'v1-105', kana: 'さそう', kanji: '誘う', meaning: '邀請', type: '動詞一類' },
    { id: 'v1-106', kana: 'サボる', kanji: '-', meaning: '翹課/偷懶', type: '動詞一類' },
    { id: 'v1-107', kana: 'さます', kanji: '冷ます / 覚ます', meaning: '弄冷 / 弄醒', type: '動詞一類' },
    { id: 'v1-108', kana: 'さる', kanji: '去る', meaning: '離開/經過', type: '動詞一類' },
    { id: 'v1-109', kana: 'さわぐ', kanji: '騒ぐ', meaning: '吵鬧/騷動', type: '動詞一類' },
    { id: 'v1-110', kana: 'さわる', kanji: '触る', meaning: '觸碰', type: '動詞一類' },
    { id: 'v1-111', kana: 'しかる', kanji: '叱る', meaning: '責罵', type: '動詞一類' },
    { id: 'v1-112', kana: 'しずむ', kanji: '沈む', meaning: '沉沒/下沉', type: '動詞一類' },
    { id: 'v1-113', kana: 'したがう', kanji: '従う', meaning: '遵從/跟隨', type: '動詞一類' },
    { id: 'v1-114', kana: 'しぬ', kanji: '死ぬ', meaning: '死', type: '動詞一類' },
    { id: 'v1-115', kana: 'しはらう', kanji: '支払う', meaning: '支付', type: '動詞一類' },
    { id: 'v1-116', kana: 'しばる', kanji: '縛る', meaning: '綑綁/束縛', type: '動詞一類' },
    { id: 'v1-117', kana: 'しぼる', kanji: '絞る', meaning: '擠/擰', type: '動詞一類' },
    { id: 'v1-118', kana: 'しまう', kanji: '仕舞う', meaning: '收拾/結束/～完(補助動詞)', type: '動詞一類' },
    { id: 'v1-119', kana: 'しまる', kanji: '閉まる', meaning: '關閉 (自動詞)', type: '動詞一類' },
    { id: 'v1-120', kana: 'しめきる', kanji: '締め切る', meaning: '截止/封閉', type: '動詞一類' },
    { id: 'v1-121', kana: 'しりぞく', kanji: '退く', meaning: '倒退/退出', type: '動詞一類' },
    { id: 'v1-122', kana: 'しる', kanji: '知る', meaning: '知道', type: '動詞一類' },
    { id: 'v1-123', kana: 'しりあう', kanji: '知り合う', meaning: '相識/認識', type: '動詞一類' },
    { id: 'v1-124', kana: 'すう', kanji: '吸う', meaning: '吸/抽菸', type: '動詞一類' },
    { id: 'v1-125', kana: 'すく', kanji: '好く / 空く / 救う', meaning: '喜歡 / 空出 / 拯救', type: '動詞一類' },
    { id: 'v1-126', kana: 'すすむ', kanji: '進む', meaning: '前進/進展', type: '動詞一類' },
    { id: 'v1-127', kana: 'すむ', kanji: '済む / 住む', meaning: '結束 / 居住', type: '動詞一類' },
    { id: 'v1-128', kana: 'する', kanji: '刷る', meaning: '印刷', type: '動詞一類' },
    { id: 'v1-129', kana: 'すわる', kanji: '座る', meaning: '坐', type: '動詞一類' },
    { id: 'v1-130', kana: 'そだつ', kanji: '育つ', meaning: '成長 (自動詞)', type: '動詞一類' },
    { id: 'v1-131', kana: 'そろう', kanji: '揃う', meaning: '齊全/一致', type: '動詞一類' },
    { id: 'v1-132', kana: 'ぞんじる', kanji: '存じる', meaning: '知道 (謙讓語)', type: '動詞一類' },
    { id: 'v1-133', kana: 'たいする', kanji: '対する', meaning: '面對/關於', type: '動詞一類' },
    { id: 'v1-134', kana: 'たおす', kanji: '倒す', meaning: '弄倒/打倒', type: '動詞一類' },
    { id: 'v1-135', kana: 'たきく', kanji: '炊く', meaning: '煮 (飯)', type: '動詞一類' },
    { id: 'v1-136', kana: 'だす', kanji: '出す', meaning: '拿出/寄出', type: '動詞一類' },
    { id: 'v1-137', kana: 'たすかる', kanji: '助かる', meaning: '得救/省事', type: '動詞一類' },
    { id: 'v1-138', kana: 'たずねる', kanji: '尋ねる / 訪ねる', meaning: '詢問 / 拜訪', type: '動詞一類' },
    { id: 'v1-139', kana: 'たたかう', kanji: '戦う', meaning: '戰鬥', type: '動詞一類' },
    { id: 'v1-140', kana: 'たたく', kanji: '叩く', meaning: '敲/拍/打', type: '動詞一類' },
    { id: 'v1-141', kana: 'たたみ', kanji: '畳む', meaning: '折疊', type: '動詞一類' },
    { id: 'v1-142', kana: 'たつ', kanji: '立つ / 建つ / 経つ', meaning: '站立 / 建造 / 經過 (時間)', type: '動詞一類' },
    { id: 'v1-143', kana: 'たのむ', kanji: '頼む', meaning: '拜託/請求', type: '動詞一類' },
    { id: 'v1-144', kana: 'だまる', kanji: '黙る', meaning: '沈默', type: '動詞一類' },
    { id: 'v1-145', kana: 'ためす', kanji: '試す', meaning: '嘗試', type: '動詞一類' },
    { id: 'v1-146', kana: 'ためる', kanji: '貯める', meaning: '存 (錢)/積蓄', type: '動詞一類' },
    { id: 'v1-147', kana: 'たよる', kanji: '頼る', meaning: '依賴', type: '動詞一類' },
    { id: 'v1-148', kana: 'たりる', kanji: '足りる', meaning: '足夠', type: '動詞一類' },
    { id: 'v1-149', kana: 'ちがう', kanji: '違う', meaning: '不同/錯誤', type: '動詞一類' },
    { id: 'v1-150', kana: 'ちかづく', kanji: '近づく', meaning: '接近', type: '動詞一類' },
    { id: 'v1-151', kana: 'ちる', kanji: '散る', meaning: '凋謝/散落', type: '動詞一類' },
    { id: 'v1-152', kana: 'つうじる', kanji: '通じる', meaning: '通曉/相通', type: '動詞一類' },
    { id: 'v1-153', kana: 'つかう', kanji: '使う', meaning: '使用', type: '動詞一類' },
    { id: 'v1-154', kana: 'つかまる', kanji: '捕まる', meaning: '被抓到/抓住', type: '動詞一類' },
    { id: 'v1-155', kana: 'つかむ', kanji: '掴む', meaning: '抓住', type: '動詞一類' },
    { id: 'v1-156', kana: 'つかれる', kanji: '疲れる', meaning: '疲累', type: '動詞一類' },
    { id: 'v1-157', kana: 'つく', kanji: '着く / 就く / 次ぐ / 注ぐ', meaning: '抵達 / 就職 / 接著 / 注入', type: '動詞一類' },
    { id: 'v1-158', kana: 'つくる', kanji: '作る', meaning: '製作', type: '動詞一類' },
    { id: 'v1-159', kana: 'つたわる', kanji: '伝わる', meaning: '傳達 (自動詞)', type: '動詞一類' },
    { id: 'v1-160', kana: 'つづく', kanji: '続く', meaning: '繼續 (自動詞)', type: '動詞一類' },
    { id: 'v1-161', kana: 'つつむ', kanji: '包む', meaning: '包裝', type: '動詞一類' },
    { id: 'v1-162', kana: 'つとめる', kanji: '勤める', meaning: '工作/任職', type: '動詞一類' },
    { id: 'v1-163', kana: 'つなぐ', kanji: '繋ぐ', meaning: '連接/牽', type: '動詞一類' },
    { id: 'v1-164', kana: 'つもる', kanji: '積もる', meaning: '堆積', type: '動詞一類' },
    { id: 'v1-165', kana: 'つやす', kanji: '費やす', meaning: '花費/耗費', type: '動詞一類' },
    { id: 'v1-166', kana: 'つりあう', kanji: '釣り合う', meaning: '平衡/相稱', type: '動詞一類' },
    { id: 'v1-167', kana: 'つれる', kanji: '連れる', meaning: '帶領', type: '動詞一類' },
    { id: 'v1-168', kana: 'てあらう', kanji: '-', meaning: '洗手', type: '動詞一類' },
    { id: 'v1-169', kana: 'とぶ', kanji: '飛ぶ', meaning: '飛', type: '動詞一類' },
    { id: 'v1-170', kana: 'とまる', kanji: '止まる / 泊まる', meaning: '停止 / 住宿', type: '動詞一類' },
    { id: 'v1-171', kana: 'とる', kanji: '取る / 撮る', meaning: '拿 / 拍照', type: '動詞一類' },
    { id: 'v1-172', kana: 'なおす', kanji: '直す', meaning: '修理/改正', type: '動詞一類' },
    { id: 'v1-173', kana: 'なおる', kanji: '直る / 治る', meaning: '修好 / 治好', type: '動詞一類' },
    { id: 'v1-174', kana: 'なく', kanji: '泣く / 鳴く', meaning: '哭 / 鳴叫', type: '動詞一類' },
    { id: 'v1-175', kana: 'なくす', kanji: '無くす', meaning: '弄丟/消除', type: '動詞一類' },
    { id: 'v1-176', kana: 'なくなる', kanji: '無くなる / 亡くなる', meaning: '遺失 / 去世', type: '動詞一類' },
    { id: 'v1-177', kana: 'なさる', kanji: '為さる', meaning: '做 (尊敬語)', type: '動詞一類' },
    { id: 'v1-178', kana: 'ならぶ', kanji: '並ぶ', meaning: '排列/排隊', type: '動詞一類' },
    { id: 'v1-179', kana: 'ならう', kanji: '習う', meaning: '學習', type: '動詞一類' },
    { id: 'v1-180', kana: 'なる', kanji: '成る / 鳴る', meaning: '變成 / 鳴響', type: '動詞一類' },
    { id: 'v1-181', kana: 'にあう', kanji: '似合う', meaning: '適合/相稱', type: '動詞一類' },
    { id: 'v1-182', kana: 'ぬぐ', kanji: '脱ぐ', meaning: '脫', type: '動詞一類' },
    { id: 'v1-183', kana: 'ぬすむ', kanji: '盗む', meaning: '偷竊', type: '動詞一類' },
    { id: 'v1-184', kana: 'ぬる', kanji: '塗る', meaning: '塗抹', type: '動詞一類' },
    { id: 'v1-185', kana: 'のこる', kanji: '残る', meaning: '殘留/剩餘', type: '動詞一類' },
    { id: 'v1-186', kana: 'のぞく', kanji: '除く', meaning: '除去/排除', type: '動詞一類' },
    { id: 'v1-187', kana: 'のばす', kanji: '伸ばす', meaning: '伸展/留長/延期', type: '動詞一類' },
    { id: 'v1-188', kana: 'のぼる', kanji: '登る / 上る', meaning: '攀登 / 上升', type: '動詞一類' },
    { id: 'v1-189', kana: 'のむ', kanji: '飲む', meaning: '喝', type: '動詞一類' },
    { id: 'v1-190', kana: 'のる', kanji: '乗る', meaning: '搭乘', type: '動詞一類' },
    { id: 'v1-191', kana: 'はいる', kanji: '入る', meaning: '進入', type: '動詞一類' },
    { id: 'v1-192', kana: 'はかる', kanji: '計る / 測る / 量る', meaning: '計算 / 測量 / 秤重', type: '動詞一類' },
    { id: 'v1-193', kana: 'はく', kanji: '履く / 吐く / 掃く', meaning: '穿(褲/鞋) / 嘔吐 / 掃地', type: '動詞一類' },
    { id: 'v1-194', kana: 'はこぶ', kanji: '運ぶ', meaning: '運送', type: '動詞一類' },
    { id: 'v1-195', kana: 'はさむ', kanji: '挟む', meaning: '夾', type: '動詞一類' },
    { id: 'v1-196', kana: 'はしる', kanji: '走る', meaning: '跑', type: '動詞一類' },
    { id: 'v1-197', kana: 'はたらく', kanji: '働く', meaning: '工作', type: '動詞一類' },
    { id: 'v1-198', kana: 'はなす', kanji: '話す / 離す', meaning: '說話 / 放開', type: '動詞一類' },
    { id: 'v1-199', kana: 'はらう', kanji: '払う', meaning: '支付/拂去', type: '動詞一類' },
    { id: 'v1-200', kana: 'はる', kanji: '貼る / 張る', meaning: '貼 / 張開', type: '動詞一類' },
    { id: 'v1-201', kana: 'ひく', kanji: '引く / 弾く', meaning: '拉 / 彈奏', type: '動詞一類' },
    { id: 'v1-202', kana: 'ひく', kanji: '(風邪を) 引く', meaning: '感冒', type: '動詞一類' },
    { id: 'v1-203', kana: 'ひかる', kanji: '光る', meaning: '發光', type: '動詞一類' },
    { id: 'v1-204', kana: 'ひきだす', kanji: '引き出す', meaning: '提款/拉出', type: '動詞一類' },
    { id: 'v1-205', kana: 'ひっこす', kanji: '引っ越す', meaning: '搬家', type: '動詞一類' },
    { id: 'v1-206', kana: 'ひろう', kanji: '拾う', meaning: '撿拾', type: '動詞一類' },
    { id: 'v1-207', kana: 'ふく', kanji: '吹く / 拭く', meaning: '吹 / 擦拭', type: '動詞一類' },
    { id: 'v1-208', kana: 'ふくむ', kanji: '含む', meaning: '包含', type: '動詞一類' },
    { id: 'v1-209', kana: 'ふせぐ', kanji: '防ぐ', meaning: '防禦/防止', type: '動詞一類' },
    { id: 'v1-210', kana: 'ふる', kanji: '降る / 振る', meaning: '下(雨/雪) / 揮動', type: '動詞一類' },
    { id: 'v1-211', kana: 'ふせぐ', kanji: '防ぐ', meaning: '防禦/防止', type: '動詞一類' },
    { id: 'v1-212', kana: 'ぶつかる', kanji: '-', meaning: '碰撞/衝突', type: '動詞一類' },
    { id: 'v1-213', kana: 'ふむ', kanji: '踏む', meaning: '踩/踏', type: '動詞一類' },
    { id: 'v1-214', kana: 'ふる', kanji: '振る / 降る', meaning: '揮動 / 下(雨/雪)', type: '動詞一類' },
    { id: 'v1-215', kana: 'ふるう', kanji: '振るう', meaning: '震動/發揮', type: '動詞一類' },
    { id: 'v1-216', kana: 'へる', kanji: '減る', meaning: '減少', type: '動詞一類' },
    { id: 'v1-217', kana: 'ほす', kanji: '干す', meaning: '曬乾', type: '動詞一類' },
    { id: 'v1-218', kana: 'まう', kanji: '舞う', meaning: '飛舞/跳舞', type: '動詞一類' },
    { id: 'v1-219', kana: 'まがる', kanji: '曲がる', meaning: '彎曲/轉彎', type: '動詞一類' },
    { id: 'v1-220', kana: 'まく', kanji: '巻く / 撒く', meaning: '捲・纏繞 / 撒', type: '動詞一類' },
    { id: 'v1-221', kana: 'まざる', kanji: '混ざる', meaning: '混雜 (自動詞)', type: '動詞一類' },
    { id: 'v1-222', kana: 'ます', kanji: '増す', meaning: '增加', type: '動詞一類' },
    { id: 'v1-223', kana: 'まぜる', kanji: '交ぜる / 混ぜる', meaning: '混合/攪拌 (他動詞)', type: '動詞一類' },
    { id: 'v1-224', kana: 'まつ', kanji: '待つ', meaning: '等待', type: '動詞一類' },
    { id: 'v1-225', kana: 'まにあう', kanji: '間に合う', meaning: '趕上/來得及', type: '動詞一類' },
    { id: 'v1-226', kana: 'まよう', kanji: '迷う', meaning: '迷路/猶豫', type: '動詞一類' },
    { id: 'v1-227', kana: 'まもる', kanji: '守る', meaning: '保護/遵守', type: '動詞一類' },
    { id: 'v1-228', kana: 'まわる', kanji: '回る', meaning: '旋轉/繞行', type: '動詞一類' },
    { id: 'v1-229', kana: 'みがく', kanji: '磨く', meaning: '刷(牙)/磨亮', type: '動詞一類' },
    { id: 'v1-230', kana: 'みたす', kanji: '満たす', meaning: '滿足/充滿', type: '動詞一類' },
    { id: 'v1-231', kana: 'みつかる', kanji: '見つかる', meaning: '被發現', type: '動詞一類' },
    { id: 'v1-232', kana: 'みなす', kanji: '見なす', meaning: '看作/視為', type: '動詞一類' },
    { id: 'v1-233', kana: 'むかう', kanji: '向かう', meaning: '面向/前往', type: '動詞一類' },
    { id: 'v1-234', kana: 'むく', kanji: '向く / 剥く', meaning: '朝向 / 剝(皮)', type: '動詞一類' },
    { id: 'v1-235', kana: 'むすぶ', kanji: '結ぶ', meaning: '連結/打結', type: '動詞一類' },
    { id: 'v1-236', kana: 'めだつ', kanji: '目立つ', meaning: '顯眼/引人注目', type: '動詞一類' },
    { id: 'v1-237', kana: 'もうかる', kanji: '儲かる', meaning: '賺錢/獲利', type: '動詞一類' },
    { id: 'v1-238', kana: 'もつ', kanji: '持つ', meaning: '持有/拿', type: '動詞一類' },
    { id: 'v1-239', kana: 'もどす', kanji: '戻す', meaning: '放回/恢復', type: '動詞一類' },
    { id: 'v1-240', kana: 'もとめる', kanji: '求める', meaning: '追求/要求', type: '動詞一類' },
    { id: 'v1-241', kana: 'もどる', kanji: '戻る', meaning: '返回/恢復', type: '動詞一類' },
    { id: 'v1-242', kana: 'もやす', kanji: '燃やす', meaning: '燃燒 (他動詞)', type: '動詞一類' },
    { id: 'v1-243', kana: 'もらう', kanji: '貰う', meaning: '收到/領受', type: '動詞一類' },
    { id: 'v1-244', kana: 'よっぱらう', kanji: '酔っ払う', meaning: '喝醉', type: '動詞一類' },
    { id: 'v1-245', kana: 'よむ', kanji: '読む', meaning: '閱讀', type: '動詞一類' },
    { id: 'v1-246', kana: 'よろこぶ', kanji: '喜ぶ', meaning: '高興/喜悅', type: '動詞一類' },
    { id: 'v1-247', kana: 'よる', kanji: '寄る', meaning: '順路去/靠近', type: '動詞一類' },
    { id: 'v1-248', kana: 'よる', kanji: '縒る', meaning: '搓/捻 (線等)', type: '動詞一類' },
    { id: 'v1-249', kana: 'わかす', kanji: '沸かす', meaning: '燒開(水)', type: '動詞一類' },
    { id: 'v1-250', kana: 'わかる', kanji: '分かる', meaning: '明白/懂', type: '動詞一類' },
    { id: 'v1-251', kana: 'わく', kanji: '沸く / 湧く', meaning: '沸騰 / 湧出', type: '動詞一類' },
    { id: 'v1-252', kana: 'わたる', kanji: '渡る', meaning: '渡過/經過', type: '動詞一類' },
    { id: 'v1-253', kana: 'わらう', kanji: '笑う', meaning: '笑', type: '動詞一類' },
    { id: 'v1-254', kana: 'わる', kanji: '割る', meaning: '打破/分割', type: '動詞一類' }
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

