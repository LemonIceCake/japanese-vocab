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
    { id: 'v1-132', kana: 'たいする', kanji: '対する', meaning: '面對/關於', type: '動詞一類' },
    { id: 'v1-133', kana: 'たおす', kanji: '倒す', meaning: '弄倒/打倒', type: '動詞一類' },
    { id: 'v1-134', kana: 'たきく', kanji: '炊く', meaning: '煮 (飯)', type: '動詞一類' },
    { id: 'v1-135', kana: 'だす', kanji: '出す', meaning: '拿出/寄出', type: '動詞一類' },
    { id: 'v1-136', kana: 'たすかる', kanji: '助かる', meaning: '得救/省事', type: '動詞一類' },
    { id: 'v1-137', kana: 'たたかう', kanji: '戦う', meaning: '戰鬥', type: '動詞一類' },
    { id: 'v1-138', kana: 'たたく', kanji: '叩く', meaning: '敲/拍/打', type: '動詞一類' },
    { id: 'v1-139', kana: 'たたみ', kanji: '畳む', meaning: '折疊', type: '動詞一類' },
    { id: 'v1-140', kana: 'たつ', kanji: '立つ / 建つ / 経つ', meaning: '站立 / 建造 / 經過 (時間)', type: '動詞一類' },
    { id: 'v1-141', kana: 'たのむ', kanji: '頼む', meaning: '拜託/請求', type: '動詞一類' },
    { id: 'v1-142', kana: 'だまる', kanji: '黙る', meaning: '沈默', type: '動詞一類' },
    { id: 'v1-143', kana: 'ためす', kanji: '試す', meaning: '嘗試', type: '動詞一類' },
    { id: 'v1-144', kana: 'たよる', kanji: '頼る', meaning: '依賴', type: '動詞一類' },
    { id: 'v1-145', kana: 'ちがう', kanji: '違う', meaning: '不同/錯誤', type: '動詞一類' },
    { id: 'v1-146', kana: 'ちかづく', kanji: '近づく', meaning: '接近', type: '動詞一類' },
    { id: 'v1-147', kana: 'ちる', kanji: '散る', meaning: '凋謝/散落', type: '動詞一類' },
    { id: 'v1-148', kana: 'つかう', kanji: '使う', meaning: '使用', type: '動詞一類' },
    { id: 'v1-149', kana: 'つかまる', kanji: '捕まる', meaning: '被抓到/抓住', type: '動詞一類' },
    { id: 'v1-150', kana: 'つかむ', kanji: '掴む', meaning: '抓住', type: '動詞一類' },
    { id: 'v1-151', kana: 'つく', kanji: '着く / 就く / 次ぐ / 注ぐ', meaning: '抵達 / 就職 / 接著 / 注入', type: '動詞一類' },
    { id: 'v1-152', kana: 'つくる', kanji: '作る', meaning: '製作', type: '動詞一類' },
    { id: 'v1-153', kana: 'つたわる', kanji: '伝わる', meaning: '傳達 (自動詞)', type: '動詞一類' },
    { id: 'v1-154', kana: 'つづく', kanji: '続く', meaning: '繼續 (自動詞)', type: '動詞一類' },
    { id: 'v1-155', kana: 'つつむ', kanji: '包む', meaning: '包裝', type: '動詞一類' },
    { id: 'v1-156', kana: 'つなぐ', kanji: '繋ぐ', meaning: '連接/牽', type: '動詞一類' },
    { id: 'v1-157', kana: 'つもる', kanji: '積もる', meaning: '堆積', type: '動詞一類' },
    { id: 'v1-158', kana: 'つやす', kanji: '費やす', meaning: '花費/耗費', type: '動詞一類' },
    { id: 'v1-159', kana: 'つりあう', kanji: '釣り合う', meaning: '平衡/相稱', type: '動詞一類' },
    { id: 'v1-160', kana: 'とぶ', kanji: '飛ぶ', meaning: '飛', type: '動詞一類' },
    { id: 'v1-161', kana: 'とまる', kanji: '止まる / 泊まる', meaning: '停止 / 住宿', type: '動詞一類' },
    { id: 'v1-162', kana: 'とる', kanji: '取る / 撮る', meaning: '拿 / 拍照', type: '動詞一類' },
    { id: 'v1-163', kana: 'なおす', kanji: '直す', meaning: '修理/改正', type: '動詞一類' },
    { id: 'v1-164', kana: 'なおる', kanji: '直る / 治る', meaning: '修好 / 治好', type: '動詞一類' },
    { id: 'v1-165', kana: 'なく', kanji: '泣く / 鳴く', meaning: '哭 / 鳴叫', type: '動詞一類' },
    { id: 'v1-166', kana: 'なくす', kanji: '無くす', meaning: '弄丟/消除', type: '動詞一類' },
    { id: 'v1-167', kana: 'なくなる', kanji: '無くなる / 亡くなる', meaning: '遺失 / 去世', type: '動詞一類' },
    { id: 'v1-168', kana: 'なさる', kanji: '為さる', meaning: '做 (尊敬語)', type: '動詞一類' },
    { id: 'v1-169', kana: 'ならぶ', kanji: '並ぶ', meaning: '排列/排隊', type: '動詞一類' },
    { id: 'v1-170', kana: 'ならう', kanji: '習う', meaning: '學習', type: '動詞一類' },
    { id: 'v1-171', kana: 'なる', kanji: '成る / 鳴る', meaning: '變成 / 鳴響', type: '動詞一類' },
    { id: 'v1-172', kana: 'にあう', kanji: '似合う', meaning: '適合/相稱', type: '動詞一類' },
    { id: 'v1-173', kana: 'ぬぐ', kanji: '脱ぐ', meaning: '脫', type: '動詞一類' },
    { id: 'v1-174', kana: 'ぬすむ', kanji: '盗む', meaning: '偷竊', type: '動詞一類' },
    { id: 'v1-175', kana: 'ぬる', kanji: '塗る', meaning: '塗抹', type: '動詞一類' },
    { id: 'v1-176', kana: 'のこる', kanji: '残る', meaning: '殘留/剩餘', type: '動詞一類' },
    { id: 'v1-177', kana: 'のぞく', kanji: '除く', meaning: '除去/排除', type: '動詞一類' },
    { id: 'v1-178', kana: 'のばす', kanji: '伸ばす', meaning: '伸展/留長/延期', type: '動詞一類' },
    { id: 'v1-179', kana: 'のぼる', kanji: '登る / 上る', meaning: '攀登 / 上升', type: '動詞一類' },
    { id: 'v1-180', kana: 'のむ', kanji: '飲む', meaning: '喝', type: '動詞一類' },
    { id: 'v1-181', kana: 'のる', kanji: '乗る', meaning: '搭乘', type: '動詞一類' },
    { id: 'v1-182', kana: 'はいる', kanji: '入る', meaning: '進入', type: '動詞一類' },
    { id: 'v1-183', kana: 'はかる', kanji: '計る / 測る / 量る', meaning: '計算 / 測量 / 秤重', type: '動詞一類' },
    { id: 'v1-184', kana: 'はく', kanji: '履く / 吐く / 掃く', meaning: '穿(褲/鞋) / 嘔吐 / 掃地', type: '動詞一類' },
    { id: 'v1-185', kana: 'はこぶ', kanji: '運ぶ', meaning: '運送', type: '動詞一類' },
    { id: 'v1-186', kana: 'はさむ', kanji: '挟む', meaning: '夾', type: '動詞一類' },
    { id: 'v1-187', kana: 'はしる', kanji: '走る', meaning: '跑', type: '動詞一類' },
    { id: 'v1-188', kana: 'はたらく', kanji: '働く', meaning: '工作', type: '動詞一類' },
    { id: 'v1-189', kana: 'はなす', kanji: '話す / 離す', meaning: '說話 / 放開', type: '動詞一類' },
    { id: 'v1-190', kana: 'はらう', kanji: '払う', meaning: '支付/拂去', type: '動詞一類' },
    { id: 'v1-191', kana: 'はる', kanji: '貼る / 張る', meaning: '貼 / 張開', type: '動詞一類' },
    { id: 'v1-192', kana: 'ひく', kanji: '引く / 弾く', meaning: '拉 / 彈奏', type: '動詞一類' },
    { id: 'v1-193', kana: 'ひく', kanji: '(風邪を) 引く', meaning: '感冒', type: '動詞一類' },
    { id: 'v1-194', kana: 'ひかる', kanji: '光る', meaning: '發光', type: '動詞一類' },
    { id: 'v1-195', kana: 'ひきだす', kanji: '引き出す', meaning: '提款/拉出', type: '動詞一類' },
    { id: 'v1-196', kana: 'ひっこす', kanji: '引っ越す', meaning: '搬家', type: '動詞一類' },
    { id: 'v1-197', kana: 'ひろう', kanji: '拾う', meaning: '撿拾', type: '動詞一類' },
    { id: 'v1-198', kana: 'ふく', kanji: '吹く / 拭く', meaning: '吹 / 擦拭', type: '動詞一類' },
    { id: 'v1-199', kana: 'ふくむ', kanji: '含む', meaning: '包含', type: '動詞一類' },
    { id: 'v1-200', kana: 'ふせぐ', kanji: '防ぐ', meaning: '防禦/防止', type: '動詞一類' },
    { id: 'v1-201', kana: 'ふる', kanji: '降る / 振る', meaning: '下(雨/雪) / 揮動', type: '動詞一類' },
    { id: 'v1-202', kana: 'ふせぐ', kanji: '防ぐ', meaning: '防禦/防止', type: '動詞一類' },
    { id: 'v1-203', kana: 'ぶつかる', kanji: '-', meaning: '碰撞/衝突', type: '動詞一類' },
    { id: 'v1-204', kana: 'ふむ', kanji: '踏む', meaning: '踩/踏', type: '動詞一類' },
    { id: 'v1-205', kana: 'ふる', kanji: '振る / 降る', meaning: '揮動 / 下(雨/雪)', type: '動詞一類' },
    { id: 'v1-206', kana: 'ふるう', kanji: '振るう', meaning: '震動/發揮', type: '動詞一類' },
    { id: 'v1-207', kana: 'へる', kanji: '減る', meaning: '減少', type: '動詞一類' },
    { id: 'v1-208', kana: 'ほす', kanji: '干す', meaning: '曬乾', type: '動詞一類' },
    { id: 'v1-209', kana: 'まう', kanji: '舞う', meaning: '飛舞/跳舞', type: '動詞一類' },
    { id: 'v1-210', kana: 'まがる', kanji: '曲がる', meaning: '彎曲/轉彎', type: '動詞一類' },
    { id: 'v1-211', kana: 'まく', kanji: '巻く / 撒く', meaning: '捲・纏繞 / 撒', type: '動詞一類' },
    { id: 'v1-212', kana: 'まざる', kanji: '混ざる', meaning: '混雜 (自動詞)', type: '動詞一類' },
    { id: 'v1-213', kana: 'ます', kanji: '増す', meaning: '增加', type: '動詞一類' },
    { id: 'v1-214', kana: 'まつ', kanji: '待つ', meaning: '等待', type: '動詞一類' },
    { id: 'v1-215', kana: 'まにあう', kanji: '間に合う', meaning: '趕上/來得及', type: '動詞一類' },
    { id: 'v1-216', kana: 'まよう', kanji: '迷う', meaning: '迷路/猶豫', type: '動詞一類' },
    { id: 'v1-217', kana: 'まもる', kanji: '守る', meaning: '保護/遵守', type: '動詞一類' },
    { id: 'v1-218', kana: 'まわる', kanji: '回る', meaning: '旋轉/繞行', type: '動詞一類' },
    { id: 'v1-219', kana: 'みがく', kanji: '磨く', meaning: '刷(牙)/磨亮', type: '動詞一類' },
    { id: 'v1-220', kana: 'みたす', kanji: '満たす', meaning: '滿足/充滿', type: '動詞一類' },
    { id: 'v1-221', kana: 'みつかる', kanji: '見つかる', meaning: '被發現', type: '動詞一類' },
    { id: 'v1-222', kana: 'みなす', kanji: '見なす', meaning: '看作/視為', type: '動詞一類' },
    { id: 'v1-223', kana: 'むかう', kanji: '向かう', meaning: '面向/前往', type: '動詞一類' },
    { id: 'v1-224', kana: 'むく', kanji: '向く / 剥く', meaning: '朝向 / 剝(皮)', type: '動詞一類' },
    { id: 'v1-225', kana: 'むすぶ', kanji: '結ぶ', meaning: '連結/打結', type: '動詞一類' },
    { id: 'v1-226', kana: 'めだつ', kanji: '目立つ', meaning: '顯眼/引人注目', type: '動詞一類' },
    { id: 'v1-227', kana: 'もうかる', kanji: '儲かる', meaning: '賺錢/獲利', type: '動詞一類' },
    { id: 'v1-228', kana: 'もつ', kanji: '持つ', meaning: '持有/拿', type: '動詞一類' },
    { id: 'v1-229', kana: 'もどす', kanji: '戻す', meaning: '放回/恢復', type: '動詞一類' },
    { id: 'v1-230', kana: 'もどる', kanji: '戻る', meaning: '返回/恢復', type: '動詞一類' },
    { id: 'v1-231', kana: 'もやす', kanji: '燃やす', meaning: '燃燒 (他動詞)', type: '動詞一類' },
    { id: 'v1-232', kana: 'もらう', kanji: '貰う', meaning: '收到/領受', type: '動詞一類' },
    { id: 'v1-233', kana: 'よっぱらう', kanji: '酔っ払う', meaning: '喝醉', type: '動詞一類' },
    { id: 'v1-234', kana: 'よむ', kanji: '読む', meaning: '閱讀', type: '動詞一類' },
    { id: 'v1-235', kana: 'よろこぶ', kanji: '喜ぶ', meaning: '高興/喜悅', type: '動詞一類' },
    { id: 'v1-236', kana: 'よる', kanji: '寄る', meaning: '順路去/靠近', type: '動詞一類' },
    { id: 'v1-237', kana: 'よる', kanji: '縒る', meaning: '搓/捻 (線等)', type: '動詞一類' },
    { id: 'v1-238', kana: 'わかす', kanji: '沸かす', meaning: '燒開(水)', type: '動詞一類' },
    { id: 'v1-239', kana: 'わかる', kanji: '分かる', meaning: '明白/懂', type: '動詞一類' },
    { id: 'v1-240', kana: 'わく', kanji: '沸く / 湧く', meaning: '沸騰 / 湧出', type: '動詞一類' },
    { id: 'v1-241', kana: 'わたる', kanji: '渡る', meaning: '渡過/經過', type: '動詞一類' },
    { id: 'v1-242', kana: 'わらう', kanji: '笑う', meaning: '笑', type: '動詞一類' },
    { id: 'v1-243', kana: 'わる', kanji: '割る', meaning: '打破/分割', type: '動詞一類' }

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
    { id: 'v2-8', kana: 'あれる', kanji: '荒れる', meaning: '荒蕪 / 天氣變壞', type: '動詞二類' },
    { id: 'v2-9', kana: 'あわせる', kanji: '合わせる', meaning: '配合', type: '動詞二類' },
    { id: 'v2-10', kana: 'あたえる', kanji: '与える', meaning: '給予', type: '動詞二類' },
    { id: 'v2-11', kana: 'いきる', kanji: '生きる', meaning: '生存', type: '動詞二類' },
    { id: 'v2-12', kana: 'いじめる', kanji: '苛める', meaning: '欺負', type: '動詞二類' },
    { id: 'v2-13', kana: 'いる', kanji: '居る', meaning: '在 (有生命)', type: '動詞二類' },
    { id: 'v2-14', kana: 'いれる', kanji: '入れる', meaning: '放入', type: '動詞二類' },
    { id: 'v2-15', kana: 'うけつける', kanji: '受け付ける', meaning: '受理/接受', type: '動詞二類' },
    { id: 'v2-16', kana: 'うける', kanji: '受ける', meaning: '接受/(考試)應試', type: '動詞二類' },
    { id: 'v2-17', kana: 'うまれる', kanji: '生まれる', meaning: '出生', type: '動詞二類' },
    { id: 'v2-18', kana: 'うりきれる', kanji: '売り切れる', meaning: '賣光', type: '動詞二類' },
    { id: 'v2-19', kana: 'おいかける', kanji: '追いかける', meaning: '追趕', type: '動詞二類' },
    { id: 'v2-20', kana: 'おえる', kanji: '終える', meaning: '做完/結束 (他動詞)', type: '動詞二類' },
    { id: 'v2-21', kana: 'おくれる', kanji: '遅れる', meaning: '遲到/延誤', type: '動詞二類' },
    { id: 'v2-22', kana: 'おさえる', kanji: '押さえる', meaning: '壓住/按住', type: '動詞二類' },
    { id: 'v2-23', kana: 'おさめる', kanji: '治める / 納める', meaning: '治理 / 繳納', type: '動詞二類' },
    { id: 'v2-24', kana: 'おちる', kanji: '落ちる', meaning: '落下/掉落', type: '動詞二類' },
    { id: 'v2-25', kana: 'おぼえる', kanji: '覚える', meaning: '記得/背誦', type: '動詞二類' },
    { id: 'v2-26', kana: 'おぼれる', kanji: '溺れる', meaning: '溺水/沉迷', type: '動詞二類' },
    { id: 'v2-27', kana: 'おりる', kanji: '降りる', meaning: '下 (車/樓)', type: '動詞二類' },
    { id: 'v2-28', kana: 'おれる', kanji: '折れる', meaning: '折斷 (自動詞)', type: '動詞二類' },
    { id: 'v2-29', kana: 'かえる', kanji: '変える / 替える', meaning: '改變 / 替換', type: '動詞二類' },
    { id: 'v2-30', kana: 'かかえる', kanji: '抱える', meaning: '抱/夾 (腋下)/承擔', type: '動詞二類' },
    { id: 'v2-31', kana: 'かける', kanji: '掛ける', meaning: '掛/打電話/花費 (他動詞)', type: '動詞二類' },
    { id: 'v2-32', kana: 'かぞえる', kanji: '数える', meaning: '數 (數量)', type: '動詞二類' },
    { id: 'v2-33', kana: 'かたづける', kanji: '片付ける', meaning: '整理/收拾', type: '動詞二類' },
    { id: 'v2-34', kana: 'かりる', kanji: '借りる', meaning: '借入', type: '動詞二類' },
    { id: 'v2-35', kana: 'かんがえる', kanji: '考える', meaning: '思考/考慮', type: '動詞二類' },
    { id: 'v2-36', kana: 'かんじる', kanji: '感じる', meaning: '感覺', type: '動詞二類' },
    { id: 'v2-37', kana: 'きがえる', kanji: '着替える', meaning: '換衣服', type: '動詞二類' },
    { id: 'v2-38', kana: 'きめる', kanji: '決める', meaning: '決定 (他動詞)', type: '動詞二類' },
    { id: 'v2-39', kana: 'きる', kanji: '着る', meaning: '穿 (上衣)', type: '動詞二類' },
    { id: 'v2-40', kana: 'きをつける', kanji: '気をつける', meaning: '小心/注意', type: '動詞二類' },
    { id: 'v2-41', kana: 'くずれる', kanji: '崩れる', meaning: '崩塌/崩潰', type: '動詞二類' },
    { id: 'v2-42', kana: 'くらべる', kanji: '比べる', meaning: '比較', type: '動詞二類' },
    { id: 'v2-43', kana: 'くれる', kanji: '暮れる / くれる', meaning: '天黑 / 給我 (給予)', type: '動詞二類' },
    { id: 'v2-44', kana: 'くわえる', kanji: '加える', meaning: '增加/施加', type: '動詞二類' },
    { id: 'v2-45', kana: 'こえる', kanji: '越える / 超える', meaning: '越過 / 超過', type: '動詞二類' },
    { id: 'v2-46', kana: 'こごえる', kanji: '凍える', meaning: '凍僵', type: '動詞二類' },
    { id: 'v2-47', kana: 'こころみる', kanji: '試みる', meaning: '嘗試', type: '動詞二類' },
    { id: 'v2-48', kana: 'こしらえる', kanji: '拵える', meaning: '製造/做', type: '動詞二類' },
    { id: 'v2-49', kana: 'こたえる', kanji: '答える', meaning: '回答', type: '動詞二類' },
    { id: 'v2-50', kana: 'こぼれる', kanji: '零れる', meaning: '灑出/溢出', type: '動詞二類' },
    { id: 'v2-51', kana: 'こわれる', kanji: '壊れる', meaning: '壞掉', type: '動詞二類' },
    { id: 'v2-52', kana: 'さける', kanji: '避ける', meaning: '避開', type: '動詞二類' },
    { id: 'v2-53', kana: 'さげる', kanji: '下げる', meaning: '降下/撤下', type: '動詞二類' },
    { id: 'v2-54', kana: 'ささえる', kanji: '支える', meaning: '支撐', type: '動詞二類' },
    { id: 'v2-55', kana: 'さしあげる', kanji: '差し上げる', meaning: '給予 (謙讓語)', type: '動詞二類' },
    { id: 'v2-56', kana: 'さめる', kanji: '冷める / 覚める', meaning: '變冷 / 醒來', type: '動詞二類' },
    { id: 'v2-57', kana: 'しめす', kanji: '示す', meaning: '出示/指示', type: '動詞二類' },
    { id: 'v2-58', kana: 'しめる', kanji: '閉める / 締める / 占める', meaning: '關 / 綁 / 佔有', type: '動詞二類' },
    { id: 'v2-59', kana: 'しらべる', kanji: '調べる', meaning: '調查', type: '動詞二類' },
    { id: 'v2-60', kana: 'しらせる', kanji: '知らせる', meaning: '通知/告知', type: '動詞二類' },
    { id: 'v2-61', kana: 'しんじる', kanji: '信じる', meaning: '相信', type: '動詞二類' },
    { id: 'v2-62', kana: 'すかれる', kanji: '好かれる', meaning: '被喜歡 (受歡迎)', type: '動詞二類' },
    { id: 'v2-63', kana: 'すぐれる', kanji: '優れる', meaning: '優秀/出色', type: '動詞二類' },
    { id: 'v2-64', kana: 'すすめる', kanji: '勧める / 進める', meaning: '推薦 / 推進', type: '動詞二類' },
    { id: 'v2-65', kana: 'すてる', kanji: '捨てる', meaning: '丟棄', type: '動詞二類' },
    { id: 'v2-66', kana: 'そだてる', kanji: '育てる', meaning: '養育 (他動詞)', type: '動詞二類' },
    { id: 'v2-67', kana: 'そろえる', kanji: '揃える', meaning: '使...一致/備齊', type: '動詞二類' },
    { id: 'v2-68', kana: 'たおれる', kanji: '倒れる', meaning: '倒下 (自動詞)', type: '動詞二類' },
    { id: 'v2-69', kana: 'たしかめる', kanji: '確かめる', meaning: '確認', type: '動詞二類' },
    { id: 'v2-70', kana: 'たすける', kanji: '助ける', meaning: '幫助/救助', type: '動詞二類' },
    { id: 'v2-71', kana: 'たずねる', kanji: '尋ねる / 訪ねる', meaning: '詢問 / 拜訪', type: '動詞二類' },
    { id: 'v2-72', kana: 'たてる', kanji: '立てる / 建てる', meaning: '立起 / 建造', type: '動詞二類' },
    { id: 'v2-73', kana: 'たべる', kanji: '食べる', meaning: '吃', type: '動詞二類' },
    { id: 'v2-74', kana: 'ちぢめる', kanji: '縮める', meaning: '縮短/縮小', type: '動詞二類' },
    { id: 'v2-75', kana: 'つかれる', kanji: '疲れる', meaning: '疲累', type: '動詞二類' },
    { id: 'v2-76', kana: 'つける', kanji: '付ける / 点ける / 漬ける', meaning: '附上 / 開 (燈) / 醃漬', type: '動詞二類' },
    { id: 'v2-77', kana: 'つたえる', kanji: '伝える', meaning: '傳達 (他動詞)', type: '動詞二類' },
    { id: 'v2-78', kana: 'つづける', kanji: '続ける', meaning: '繼續 (他動詞)', type: '動詞二類' },
    { id: 'v2-79', kana: 'つとめる', kanji: '勤める', meaning: '工作/任職', type: '動詞二類' },
    { id: 'v2-80', kana: 'つぶれる', kanji: '潰れる', meaning: '崩潰/倒閉/壓壞', type: '動詞二類' },
    { id: 'v2-81', kana: 'つれる', kanji: '連れる', meaning: '帶領', type: '動詞二類' },
    { id: 'v2-82', kana: 'とめる', kanji: '止める / 泊める', meaning: '停下 / 讓...住宿', type: '動詞二類' },
    { id: 'v2-83', kana: 'なげる', kanji: '投げる', meaning: '投/丟', type: '動詞二類' },
    { id: 'v2-84', kana: 'にる', kanji: '似る / 煮る', meaning: '相似 / 煮', type: '動詞二類' },
    { id: 'v2-85', kana: 'ぬれる', kanji: '濡れる', meaning: '淋濕/濕', type: '動詞二類' },
    { id: 'v2-86', kana: 'ねる', kanji: '寝る', meaning: '睡覺', type: '動詞二類' },
    { id: 'v2-87', kana: 'のせる', kanji: '乗せる', meaning: '載運/讓...搭乘', type: '動詞二類' },
    { id: 'v2-88', kana: 'のびる', kanji: '伸びる', meaning: '伸長/生長/延期', type: '動詞二類' },
    { id: 'v2-89', kana: 'のりかえる', kanji: '乗り換える', meaning: '換車', type: '動詞二類' },
    { id: 'v2-90', kana: 'はじめる', kanji: '始める', meaning: '開始 (他動詞)', type: '動詞二類' },
    { id: 'v2-91', kana: 'はれる', kanji: '晴れる / 腫れる', meaning: '放晴 / 腫', type: '動詞二類' },
    { id: 'v2-92', kana: 'ひえる', kanji: '冷える', meaning: '變冷', type: '動詞二類' },
    { id: 'v2-93', kana: 'ふえる', kanji: '増える', meaning: '增加', type: '動詞二類' },
    { id: 'v2-94', kana: 'ふれる', kanji: '触れる', meaning: '觸摸/涉及', type: '動詞二類' },
    { id: 'v2-95', kana: 'ふえる', kanji: '増える', meaning: '增加', type: '動詞二類' },
    { id: 'v2-96', kana: 'ふくめる', kanji: '含める', meaning: '包含/包括', type: '動詞二類' },
    { id: 'v2-97', kana: 'ぶらさげる', kanji: 'ぶら下げる', meaning: '懸掛/提著', type: '動詞二類' },
    { id: 'v2-98', kana: 'ふれる', kanji: '触れる', meaning: '觸摸/涉及', type: '動詞二類' },
    { id: 'v2-99', kana: 'ほめる', kanji: '褒める', meaning: '稱讚', type: '動詞二類' },
    { id: 'v2-100', kana: 'まかせる', kanji: '任せる', meaning: '委託/交給', type: '動詞二類' },
    { id: 'v2-101', kana: 'まぜる', kanji: '交ぜる / 混ぜる', meaning: '混合/攪拌 (他動詞)', type: '動詞二類' },
    { id: 'v2-102', kana: 'まちがえる', kanji: '間違える', meaning: '弄錯', type: '動詞二類' },
    { id: 'v2-103', kana: 'まとめる', kanji: '纏める', meaning: '彙整/總結', type: '動詞二類' },
    { id: 'v2-104', kana: 'まねる', kanji: '真似る', meaning: '模仿', type: '動詞二類' },
    { id: 'v2-105', kana: 'みえる', kanji: '見える', meaning: '看得見', type: '動詞二類' },
    { id: 'v2-106', kana: 'みせる', kanji: '見せる', meaning: '給...看', type: '動詞二類' },
    { id: 'v2-107', kana: 'みつける', kanji: '見つける', meaning: '找到/發現', type: '動詞二類' },
    { id: 'v2-108', kana: 'みとめる', kanji: '認める', meaning: '認可/承認', type: '動詞二類' },
    { id: 'v2-109', kana: 'むかえる', kanji: '迎える', meaning: '迎接', type: '動詞二類' },
    { id: 'v2-110', kana: 'めじる', kanji: '命じる', meaning: '命令', type: '動詞二類' },
    { id: 'v2-111', kana: 'もうける', kanji: '設ける / 儲ける', meaning: '設立 / 賺錢', type: '動詞二類' },
    { id: 'v2-112', kana: 'もえる', kanji: '燃える', meaning: '燃燒 (自動詞)', type: '動詞二類' },
    { id: 'v2-113', kana: 'もたれる', kanji: '凭れる', meaning: '倚靠/憑藉', type: '動詞二類' },
    { id: 'v2-114', kana: 'もちいる', kanji: '用いる', meaning: '使用', type: '動詞二類' },
    { id: 'v2-115', kana: 'もとめる', kanji: '求める', meaning: '追求/要求', type: '動詞二類' },
    { id: 'v2-116', kana: 'よごれる', kanji: '汚れる', meaning: '弄髒 (自動詞)', type: '動詞二類' },
    { id: 'v2-117', kana: 'わける', kanji: '分ける', meaning: '分開/分配', type: '動詞二類' },
    { id: 'v2-118', kana: 'わびる', kanji: '詫びる', meaning: '道歉', type: '動詞二類' },
    { id: 'v2-119', kana: 'ぞんじる', kanji: '存じる', meaning: '知道 (謙讓語)', type: '動詞二類' },
    { id: 'v2-120', kana: 'たずねる', kanji: '尋ねる / 訪ねる', meaning: '詢問 / 拜訪', type: '動詞二類' },
    { id: 'v2-121', kana: 'ためる', kanji: '貯める', meaning: '存 (錢)/積蓄', type: '動詞二類' },
    { id: 'v2-122', kana: 'たりる', kanji: '足りる', meaning: '足夠', type: '動詞二類' },
    { id: 'v2-123', kana: 'つうじる', kanji: '通じる', meaning: '通曉/相通', type: '動詞二類' },
    { id: 'v2-124', kana: 'つかれる', kanji: '疲れる', meaning: '疲累', type: '動詞二類' },
    { id: 'v2-125', kana: 'つとめる', kanji: '勤める', meaning: '工作/任職', type: '動詞二類' },
    { id: 'v2-126', kana: 'つれる', kanji: '連れる', meaning: '帶領', type: '動詞二類' },
    { id: 'v2-127', kana: 'まぜる', kanji: '交ぜる / 混ぜる', meaning: '混合/攪拌 (他動詞)', type: '動詞二類' },
    { id: 'v2-128', kana: 'もとめる', kanji: '求める', meaning: '追求/要求', type: '動詞二類' }


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
    { id: 'adj-i-6', kana: 'あやしい', kanji: '怪しい', meaning: '可疑的', type: 'い形容詞' },
    { id: 'adj-i-7', kana: 'いい', kanji: '良い', meaning: '好的', type: 'い形容詞' },
    { id: 'adj-i-8', kana: 'いそがしい', kanji: '忙しい', meaning: '忙碌的', type: 'い形容詞' },
    { id: 'adj-i-9', kana: 'いたい', kanji: '痛い', meaning: '痛的', type: 'い形容詞' },
    { id: 'adj-i-10', kana: 'うすぐらい', kanji: '薄暗い', meaning: '昏暗的', type: 'い形容詞' },
    { id: 'adj-i-11', kana: 'うまい', kanji: '旨い / 上手い', meaning: '美味的 / 高明的', type: 'い形容詞' },
    { id: 'adj-i-12', kana: 'うらやましい', kanji: '羨ましい', meaning: '令人羨慕的', type: 'い形容詞' },
    { id: 'adj-i-13', kana: 'うるさい', kanji: '五月蝿い', meaning: '吵鬧的/囉嗦的', type: 'い形容詞' },
    { id: 'adj-i-14', kana: 'うれしい', kanji: '嬉しい', meaning: '開心的', type: 'い形容詞' },
    { id: 'adj-i-15', kana: 'えらい', kanji: '偉い', meaning: '偉大的/了不起的', type: 'い形容詞' },
    { id: 'adj-i-16', kana: 'おいしい', kanji: '美味しい', meaning: '好吃的', type: 'い形容詞' },
    { id: 'adj-i-17', kana: 'おおい', kanji: '多い', meaning: '多的', type: 'い形容詞' },
    { id: 'adj-i-18', kana: 'おおきい', kanji: '大きい', meaning: '大的', type: 'い形容詞' },
    { id: 'adj-i-19', kana: 'おかしい', kanji: '可笑しい', meaning: '奇怪的/可笑的', type: 'い形容詞' },
    { id: 'adj-i-20', kana: 'おそい', kanji: '遅い', meaning: '慢的/晚的', type: 'い形容詞' },
    { id: 'adj-i-21', kana: 'おそろしい', kanji: '恐ろしい', meaning: '可怕的', type: 'い形容詞' },
    { id: 'adj-i-22', kana: 'おとなしい', kanji: '大人しい', meaning: '乖巧的/文靜的', type: 'い形容詞' },
    { id: 'adj-i-23', kana: 'おもい', kanji: '重い', meaning: '重的', type: 'い形容詞' },
    { id: 'adj-i-24', kana: 'おもしろい', kanji: '面白い', meaning: '有趣的', type: 'い形容詞' },
    { id: 'adj-i-25', kana: 'かしこい', kanji: '賢い', meaning: '聰明的', type: 'い形容詞' },
    { id: 'adj-i-26', kana: 'かたい', kanji: '硬い / 固い', meaning: '硬的 / 堅固的', type: 'い形容詞' },
    { id: 'adj-i-27', kana: 'かなしい', kanji: '悲しい', meaning: '悲傷的', type: 'い形容詞' },
    { id: 'adj-i-28', kana: 'かゆい', kanji: '痒い', meaning: '癢的', type: 'い形容詞' },
    { id: 'adj-i-29', kana: 'からい', kanji: '辛い', meaning: '辣的/鹹的', type: 'い形容詞' },
    { id: 'adj-i-30', kana: 'かるい', kanji: '軽い', meaning: '輕的', type: 'い形容詞' },
    { id: 'adj-i-31', kana: 'かわいい', kanji: '可愛い', meaning: '可愛的', type: 'い形容詞' },
    { id: 'adj-i-32', kana: 'かわいらしい', kanji: '可愛らしい', meaning: '可愛的/討人喜歡的', type: 'い形容詞' },
    { id: 'adj-i-33', kana: 'きたない', kanji: '汚い', meaning: '髒的', type: 'い形容詞' },
    { id: 'adj-i-34', kana: 'きつい', kanji: '-', meaning: '緊的/嚴苛的', type: 'い形容詞' },
    { id: 'adj-i-35', kana: 'きびしい', kanji: '厳しい', meaning: '嚴格的', type: 'い形容詞' },
    { id: 'adj-i-36', kana: 'くだらない', kanji: '下らない', meaning: '無聊的/沒價值的', type: 'い形容詞' },
    { id: 'adj-i-37', kana: 'くやしい', kanji: '悔しい', meaning: '不甘心的/遺憾的', type: 'い形容詞' },
    { id: 'adj-i-38', kana: 'くらい', kanji: '暗い', meaning: '暗的', type: 'い形容詞' },
    { id: 'adj-i-39', kana: 'くるしい', kanji: '苦しい', meaning: '痛苦的/難受的', type: 'い形容詞' },
    { id: 'adj-i-40', kana: 'くろい', kanji: '黒い', meaning: '黑的', type: 'い形容詞' },
    { id: 'adj-i-41', kana: 'こい', kanji: '濃い', meaning: '濃的/深色的', type: 'い形容詞' },
    { id: 'adj-i-42', kana: 'こうばしい', kanji: '香ばしい', meaning: '芳香的 (烤過的焦香)', type: 'い形容詞' },
    { id: 'adj-i-43', kana: 'こころぼそい', kanji: '心細い', meaning: '不安的/孤單的', type: 'い形容詞' },
    { id: 'adj-i-44', kana: 'こまかい', kanji: '細かい', meaning: '細小的/詳細的', type: 'い形容詞' },
    { id: 'adj-i-45', kana: 'こわい', kanji: '怖い', meaning: '可怕的', type: 'い形容詞' },
    { id: 'adj-i-46', kana: 'さびしい', kanji: '寂しい', meaning: '寂寞的', type: 'い形容詞' },
    { id: 'adj-i-47', kana: 'さわがしい', kanji: '騒がしい', meaning: '吵鬧的', type: 'い形容詞' },
    { id: 'adj-i-48', kana: 'しかくい', kanji: '四角い', meaning: '四角形的/方形的', type: 'い形容詞' },
    { id: 'adj-i-49', kana: 'したしい', kanji: '親しい', meaning: '親近的/親密的', type: 'い形容詞' },
    { id: 'adj-i-50', kana: 'しつこい', kanji: '-', meaning: '糾纏不休的/濃郁的', type: 'い形容詞' },
    { id: 'adj-i-51', kana: 'しろい', kanji: '白い', meaning: '白色的', type: 'い形容詞' },
    { id: 'adj-i-52', kana: 'しょっぱい', kanji: '塩っぱい', meaning: '鹹的', type: 'い形容詞' },
    { id: 'adj-i-53', kana: 'すくない', kanji: '少ない', meaning: '少的', type: 'い形容詞' },
    { id: 'adj-i-54', kana: 'すごい', kanji: '凄い', meaning: '厲害的/糟糕的', type: 'い形容詞' },
    { id: 'adj-i-55', kana: 'すずしい', kanji: '涼しい', meaning: '涼爽的', type: 'い形容詞' },
    { id: 'adj-i-56', kana: 'すっぱい', kanji: '酸っぱい', meaning: '酸的', type: 'い形容詞' },
    { id: 'adj-i-57', kana: 'すばらしい', kanji: '素晴らしい', meaning: '極好的/精彩的', type: 'い形容詞' },
    { id: 'adj-i-58', kana: 'すばやい', kanji: '素早い', meaning: '敏捷的/快速的', type: 'い形容詞' },
    { id: 'adj-i-59', kana: 'ずるい', kanji: '狡い', meaning: '狡猾的/奸詐的', type: 'い形容詞' },
    { id: 'adj-i-60', kana: 'そうぞうしい', kanji: '騒々しい', meaning: '吵鬧的', type: 'い形容詞' },
    { id: 'adj-i-61', kana: 'ただしい', kanji: '正しい', meaning: '正確的', type: 'い形容詞' },
    { id: 'adj-i-62', kana: 'たのしい', kanji: '楽しい', meaning: '快樂的', type: 'い形容詞' },
    { id: 'adj-i-63', kana: 'たのもしい', kanji: '頼もしい', meaning: '可靠的', type: 'い形容詞' },
    { id: 'adj-i-64', kana: 'たまらない', kanji: '堪らない', meaning: '受不了的/棒極了的', type: 'い形容詞' },
    { id: 'adj-i-65', kana: 'だるい', kanji: '-', meaning: '懶散的/倦怠的', type: 'い形容詞' },
    { id: 'adj-i-66', kana: 'ちいさい', kanji: '小さい', meaning: '小的', type: 'い形容詞' },
    { id: 'adj-i-67', kana: 'ちかい', kanji: '近い', meaning: '近的', type: 'い形容詞' },
    { id: 'adj-i-68', kana: 'ちゃいろい', kanji: '茶色い', meaning: '茶色的', type: 'い形容詞' },
    { id: 'adj-i-69', kana: 'つめたい', kanji: '冷たい', meaning: '冰冷的/冷淡的', type: 'い形容詞' },
    { id: 'adj-i-70', kana: 'つよい', kanji: '強い', meaning: '強的', type: 'い形容詞' },
    { id: 'adj-i-71', kana: 'つらい', kanji: '辛い', meaning: '痛苦的/難受的', type: 'い形容詞' },
    { id: 'adj-i-72', kana: 'とおい', kanji: '遠い', meaning: '遠的', type: 'い形容詞' },
    { id: 'adj-i-73', kana: 'とくい', kanji: '得意', meaning: '擅長的 (亦可作な形容詞)', type: 'い形容詞' },
    { id: 'adj-i-74', kana: 'とんでもない', kanji: '-', meaning: '出乎意料的/豈有此理', type: 'い形容詞' },
    { id: 'adj-i-75', kana: 'ない', kanji: '無い', meaning: '沒有', type: 'い形容詞' },
    { id: 'adj-i-76', kana: 'ながい', kanji: '長い', meaning: '長的', type: 'い形容詞' },
    { id: 'adj-i-77', kana: 'なかいい', kanji: '仲いい', meaning: '感情好的', type: 'い形容詞' },
    { id: 'adj-i-78', kana: 'なつかしい', kanji: '懐かしい', meaning: '懷念的', type: 'い形容詞' },
    { id: 'adj-i-79', kana: 'にがい', kanji: '苦い', meaning: '苦的', type: 'い形容詞' },
    { id: 'adj-i-80', kana: 'にくい', kanji: '憎い / 難い', meaning: '可恨的 / 難...', type: 'い形容詞' },
    { id: 'adj-i-81', kana: 'ぬるい', kanji: '温い', meaning: '溫的 (不夠熱)', type: 'い形容詞' },
    { id: 'adj-i-82', kana: 'ねむい', kanji: '眠い', meaning: '想睡的', type: 'い形容詞' },
    { id: 'adj-i-83', kana: 'はずかしい', kanji: '恥ずかしい', meaning: '害羞的/可恥的', type: 'い形容詞' },
    { id: 'adj-i-84', kana: 'はやい', kanji: '早い / 速い', meaning: '早的 / 快的', type: 'い形容詞' },
    { id: 'adj-i-85', kana: 'ひくい', kanji: '低い', meaning: '低的', type: 'い形容詞' },
    { id: 'adj-i-86', kana: 'ひどい', kanji: '酷い', meaning: '過分的/殘酷的', type: 'い形容詞' },
    { id: 'adj-i-87', kana: 'ひろい', kanji: '広い', meaning: '寬廣的', type: 'い形容詞' },
    { id: 'adj-i-88', kana: 'ふかい', kanji: '深い', meaning: '深的', type: 'い形容詞' },
    { id: 'adj-i-89', kana: 'ふるい', kanji: '古い', meaning: '舊的', type: 'い形容詞' },
    { id: 'adj-i-90', kana: 'ほしい', kanji: '欲しい', meaning: '想要的', type: 'い形容詞' },
    { id: 'adj-i-91', kana: 'ふかい', kanji: '深い', meaning: '深的', type: 'い形容詞' },
    { id: 'adj-i-92', kana: 'ふとい', kanji: '太い', meaning: '粗的', type: 'い形容詞' },
    { id: 'adj-i-93', kana: 'ふるい', kanji: '古い', meaning: '舊的', type: 'い形容詞' },
    { id: 'adj-i-94', kana: 'ほしい', kanji: '欲しい', meaning: '想要的', type: 'い形容詞' },
    { id: 'adj-i-95', kana: 'ほそい', kanji: '細い', meaning: '細的', type: 'い形容詞' },
    { id: 'adj-i-96', kana: 'まずい', kanji: '不味い', meaning: '難吃的/糟糕的', type: 'い形容詞' },
    { id: 'adj-i-97', kana: 'まぶしい', kanji: '眩しい', meaning: '刺眼的', type: 'い形容詞' },
    { id: 'adj-i-98', kana: 'まるい', kanji: '丸い / 円い', meaning: '圓的', type: 'い形容詞' },
    { id: 'adj-i-99', kana: 'みにくい', kanji: '醜い / 見難い', meaning: '醜陋的 / 難看的', type: 'い形容詞' },
    { id: 'adj-i-100', kana: 'みみっちい', kanji: '-', meaning: '吝嗇的/小氣的 (俗語)', type: 'い形容詞' },
    { id: 'adj-i-101', kana: 'むずかしい', kanji: '難しい', meaning: '困難的', type: 'い形容詞' },
    { id: 'adj-i-102', kana: 'むしあつい', kanji: '蒸し暑い', meaning: '悶熱的', type: 'い形容詞' },
    { id: 'adj-i-103', kana: 'めずらしい', kanji: '珍しい', meaning: '珍奇的/罕見的', type: 'い形容詞' },
    { id: 'adj-i-104', kana: 'めんどうくさい', kanji: '面倒くさい', meaning: '麻煩的', type: 'い形容詞' },
    { id: 'adj-i-105', kana: 'もったいない', kanji: '勿体無い', meaning: '可惜的/浪費的', type: 'い形容詞' },
    { id: 'adj-i-106', kana: 'ものすごい', kanji: '物凄い', meaning: '驚人的/厲害的', type: 'い形容詞' },
    { id: 'adj-i-107', kana: 'やさしい', kanji: '易しい / 優しい', meaning: '簡單的 / 溫柔的 (書中可能已接「や行」但圖中有部分)', type: 'い形容詞' },
    { id: 'adj-i-108', kana: 'わかい', kanji: '若い', meaning: '年輕的', type: 'い形容詞' },
    { id: 'adj-i-109', kana: 'わるい', kanji: '悪い', meaning: '壞的/不好的', type: 'い形容詞' }

  ],
  // --- な形容詞 ---
  adj_na: [
        { id: 'adj-na-1', kana: 'あたりまえ', kanji: '当たり前', meaning: '理所當然', type: 'な形容詞' },
    { id: 'adj-na-2', kana: 'あんがい', kanji: '案外', meaning: '意外地', type: 'な形容詞' },
    { id: 'adj-na-3', kana: 'あんしん', kanji: '安心', meaning: '安心', type: 'な形容詞' },
    { id: 'adj-na-4', kana: 'あんぜん', kanji: '安全', meaning: '安全', type: 'な形容詞' },
    { id: 'adj-na-5', kana: 'いじわる', kanji: '意地悪', meaning: '壞心眼', type: 'な形容詞' },
    { id: 'adj-na-6', kana: 'いっしょうけんめい', kanji: '一生懸命', meaning: '拼命', type: 'な形容詞' },
    { id: 'adj-na-7', kana: 'いや', kanji: '嫌', meaning: '討厭', type: 'な形容詞' },
    { id: 'adj-na-8', kana: 'いろいろ', kanji: '色々', meaning: '各式各樣', type: 'な形容詞' },
    { id: 'adj-na-9', kana: 'いんしょうてき', kanji: '印象的', meaning: '印象深刻的', type: 'な形容詞' },
    { id: 'adj-na-10', kana: 'エレガント', kanji: '-', meaning: '優雅的', type: 'な形容詞' },
    { id: 'adj-na-11', kana: 'おおきな', kanji: '大きな', meaning: '大的 (連體詞)', type: 'な形容詞' },
    { id: 'adj-na-12', kana: 'おおざっぱ', kanji: '大雑把', meaning: '粗枝大葉的/草率的', type: 'な形容詞' },
    { id: 'adj-na-13', kana: 'おだやか', kanji: '穏やか', meaning: '平穩的/溫和的', type: 'な形容詞' },
    { id: 'adj-na-14', kana: 'おしゃべり', kanji: '-', meaning: '愛說話的/健談的', type: 'な形容詞' },
    { id: 'adj-na-15', kana: 'おしゃれ', kanji: '-', meaning: '時髦的/愛打扮的', type: 'な形容詞' },
    { id: 'adj-na-16', kana: 'おんだん', kanji: '温暖', meaning: '溫暖的 (氣候)', type: 'な形容詞' },
    { id: 'adj-na-17', kana: 'かって', kanji: '勝手', meaning: '任性/隨意', type: 'な形容詞' },
    { id: 'adj-na-18', kana: 'かわいそう', kanji: '可哀想', meaning: '可憐的', type: 'な形容詞' },
    { id: 'adj-na-19', kana: 'かんぜん', kanji: '完全', meaning: '完全的', type: 'な形容詞' },
    { id: 'adj-na-20', kana: 'かんたん', kanji: '簡単', meaning: '簡單的', type: 'な形容詞' },
    { id: 'adj-na-21', kana: 'きがる', kanji: '気軽', meaning: '輕鬆的/隨意的', type: 'な形容詞' },
    { id: 'adj-na-22', kana: 'きけん', kanji: '危険', meaning: '危險的', type: 'な形容詞' },
    { id: 'adj-na-23', kana: 'きのどく', kanji: '気の毒', meaning: '可憐的/遺憾的', type: 'な形容詞' },
    { id: 'adj-na-24', kana: 'きみょう', kanji: '奇妙', meaning: '奇妙的', type: 'な形容詞' },
    { id: 'adj-na-25', kana: 'きよう', kanji: '器用', meaning: '靈巧的', type: 'な形容詞' },
    { id: 'adj-na-26', kana: 'きょだい', kanji: '巨大', meaning: '巨大的', type: 'な形容詞' },
    { id: 'adj-na-27', kana: 'きらい', kanji: '嫌い', meaning: '討厭的', type: 'な形容詞' },
    { id: 'adj-na-28', kana: 'きらく', kanji: '気楽', meaning: '輕鬆的/安逸的', type: 'な形容詞' },
    { id: 'adj-na-29', kana: 'きれい', kanji: '綺麗', meaning: '漂亮的/乾淨的', type: 'な形容詞' },
    { id: 'adj-na-30', kana: 'きゅうげき (な)', kanji: '急激', meaning: '急劇的', type: 'な形容詞' },
    { id: 'adj-na-31', kana: 'きらい (な)', kanji: '嫌い', meaning: '討厭的', type: 'な形容詞' },
    { id: 'adj-na-32', kana: 'きらく (な)', kanji: '気楽', meaning: '輕鬆的/安逸的', type: 'な形容詞' },
    { id: 'adj-na-33', kana: 'きれい (な)', kanji: '綺麗', meaning: '漂亮的/乾淨的', type: 'な形容詞' },
    { id: 'adj-na-34', kana: 'げんき (な)', kanji: '元気', meaning: '有精神的', type: 'な形容詞' },
    { id: 'adj-na-35', kana: 'こうへい (な)', kanji: '公平', meaning: '公平的', type: 'な形容詞' },
    { id: 'adj-na-36', kana: 'こうふく (な)', kanji: '幸福', meaning: '幸福的', type: 'な形容詞' },
    { id: 'adj-na-37', kana: 'こせいてき (な)', kanji: '個性的', meaning: '有個性的', type: 'な形容詞' },
    { id: 'adj-na-38', kana: 'さかん (な)', kanji: '盛ん', meaning: '盛行的/繁榮的', type: 'な形容詞' },
    { id: 'adj-na-39', kana: 'ざつ (な)', kanji: '雑', meaning: '粗糙的/雜亂的', type: 'な形容詞' },
    { id: 'adj-na-40', kana: 'さまざま (な)', kanji: '様々', meaning: '各式各樣的', type: 'な形容詞' },
    { id: 'adj-na-41', kana: 'さわやか (な)', kanji: '爽やか', meaning: '清爽的', type: 'な形容詞' },
    { id: 'adj-na-42', kana: 'ざんねん (な)', kanji: '残念', meaning: '遺憾的/可惜的', type: 'な形容詞' },
    { id: 'adj-na-43', kana: 'しあわせ (な)', kanji: '幸せ', meaning: '幸福的', type: 'な形容詞' },
    { id: 'adj-na-44', kana: 'しあわせ (な)', kanji: '幸せ', meaning: '幸福的', type: 'な形容詞' },
    { id: 'adj-na-45', kana: 'しずか (な)', kanji: '静か', meaning: '安靜的', type: 'な形容詞' },
    { id: 'adj-na-46', kana: 'しぜん (な)', kanji: '自然', meaning: '自然的', type: 'な形容詞' },
    { id: 'adj-na-47', kana: 'じみ (な)', kanji: '地味', meaning: '樸素的', type: 'な形容詞' },
    { id: 'adj-na-48', kana: 'じゆう (な)', kanji: '自由', meaning: '自由的', type: 'な形容詞' },
    { id: 'adj-na-49', kana: 'じゅうぶん (な)', kanji: '十分', meaning: '足夠的', type: 'な形容詞' },
    { id: 'adj-na-50', kana: 'しゅよう (な)', kanji: '主要', meaning: '主要的', type: 'な形容詞' },
    { id: 'adj-na-51', kana: 'しょうじき (な)', kanji: '正直', meaning: '老實的/正直的', type: 'な形容詞' },
    { id: 'adj-na-52', kana: 'しょうきょくてき (な)', kanji: '消極的', meaning: '消極的', type: 'な形容詞' },
    { id: 'adj-na-53', kana: 'じょうぶ (な)', kanji: '丈夫', meaning: '結實的/健康的', type: 'な形容詞' },
    { id: 'adj-na-54', kana: 'じょうず (な)', kanji: '上手', meaning: '擅長的', type: 'な形容詞' },
    { id: 'adj-na-55', kana: 'じゃま (な)', kanji: '邪魔', meaning: '打擾的/礙事的', type: 'な形容詞' },
    { id: 'adj-na-56', kana: 'しんこく (な)', kanji: '深刻', meaning: '嚴重的/深刻的', type: 'な形容詞' },
    { id: 'adj-na-57', kana: 'しんせつ (な)', kanji: '親切', meaning: '親切的', type: 'な形容詞' },
    { id: 'adj-na-58', kana: 'しんちょう (な)', kanji: '慎重', meaning: '慎重的', type: 'な形容詞' },
    { id: 'adj-na-59', kana: 'しんけん (な)', kanji: '真剣', meaning: '認真的', type: 'な形容詞' },
    { id: 'adj-na-60', kana: 'すなお (な)', kanji: '素直', meaning: '坦率的/老實的', type: 'な形容詞' },
    { id: 'adj-na-61', kana: 'スマート (な)', kanji: 'Smart', meaning: '苗條的/時髦的', type: 'な形容詞' },
    { id: 'adj-na-62', kana: 'せいかく (な)', kanji: '正確', meaning: '正確的', type: 'な形容詞' },
    { id: 'adj-na-63', kana: 'せいけつ (な)', kanji: '清潔', meaning: '清潔的', type: 'な形容詞' },
    { id: 'adj-na-64', kana: 'せっきょくてき (な)', kanji: '積極的', meaning: '積極的', type: 'な形容詞' },
    { id: 'adj-na-65', kana: 'ぜんたいてき (な)', kanji: '全体的', meaning: '整體的', type: 'な形容詞' },
    { id: 'adj-na-66', kana: 'そこそこ (な)', kanji: '-', meaning: '還可以/普普通通', type: 'な形容詞' },
    { id: 'adj-na-67', kana: 'そっくり (な)', kanji: '-', meaning: '一模一樣', type: 'な形容詞' },
    { id: 'adj-na-68', kana: 'そまつ (な)', kanji: '粗末', meaning: '粗糙的/簡陋的', type: 'な形容詞' },
    { id: 'adj-na-69', kana: 'だいじ (な)', kanji: '大事', meaning: '重要的', type: 'な形容詞' },
    { id: 'adj-na-70', kana: 'たいせつ (な)', kanji: '大切', meaning: '重要的', type: 'な形容詞' },
    { id: 'adj-na-71', kana: 'たいへん (な)', kanji: '大変', meaning: '辛苦的/嚴重的', type: 'な形容詞' },
    { id: 'adj-na-72', kana: 'たしか (な)', kanji: '確か', meaning: '確定的/準確的', type: 'な形容詞' },
    { id: 'adj-na-73', kana: 'たしょう (な)', kanji: '多少', meaning: '多少/稍微', type: 'な形容詞' },
    { id: 'adj-na-74', kana: 'ただ (の)', kanji: '-', meaning: '免費/普通 (作名詞修飾時用の)', type: 'な形容詞' },
    { id: 'adj-na-75', kana: 'たんじゅん (な)', kanji: '単純', meaning: '單純的', type: 'な形容詞' },
    { id: 'adj-na-76', kana: 'ちいさな', kanji: '小さな', meaning: '小的 (連體詞，僅接名詞)', type: 'な形容詞' },
    { id: 'adj-na-77', kana: 'ちかごろ', kanji: '近頃', meaning: '最近 (副詞)', type: 'な形容詞' },
    { id: 'adj-na-78', kana: 'ちゅうとはんぱ (な)', kanji: '中途半端', meaning: '半途而廢/不徹底', type: 'な形容詞' },
    { id: 'adj-na-79', kana: 'ていねい (な)', kanji: '丁寧', meaning: '有禮貌的', type: 'な形容詞' },
    { id: 'adj-na-80', kana: 'てきとう (な)', kanji: '適当', meaning: '適當的/隨便的', type: 'な形容詞' },
    { id: 'adj-na-81', kana: 'とくい (な)', kanji: '得意', meaning: '擅長的', type: 'な形容詞' },
    { id: 'adj-na-82', kana: 'とくべつ (な)', kanji: '特別', meaning: '特別的', type: 'な形容詞' },
    { id: 'adj-na-83', kana: 'とくべつ (な)', kanji: '特別', meaning: '特別的', type: 'な形容詞' },
    { id: 'adj-na-84', kana: 'なまいき (な)', kanji: '生意気', meaning: '狂妄的/自大的', type: 'な形容詞' },
    { id: 'adj-na-85', kana: 'にがて (な)', kanji: '苦手', meaning: '不擅長的/苦手的', type: 'な形容詞' },
    { id: 'adj-na-86', kana: 'にぎやか (な)', kanji: '賑やか', meaning: '熱鬧的', type: 'な形容詞' },
    { id: 'adj-na-87', kana: 'ねっしん (な)', kanji: '熱心', meaning: '熱心的', type: 'な形容詞' },
    { id: 'adj-na-88', kana: 'はで (な)', kanji: '派手', meaning: '花俏的/華麗的', type: 'な形容詞' },
    { id: 'adj-na-89', kana: 'ハンサム (な)', kanji: 'Handsome', meaning: '英俊的', type: 'な形容詞' },
    { id: 'adj-na-90', kana: 'ひさしぶり', kanji: '久しぶり', meaning: '好久不見 (名詞/な形)', type: 'な形容詞' },
    { id: 'adj-na-91', kana: 'ひつよう (な)', kanji: '必要', meaning: '必要的', type: 'な形容詞' },
    { id: 'adj-na-92', kana: 'ひま (な)', kanji: '暇', meaning: '空閒的', type: 'な形容詞' },
    { id: 'adj-na-93', kana: 'ふくざつ (な)', kanji: '複雑', meaning: '複雜的', type: 'な形容詞' },
    { id: 'adj-na-94', kana: 'ふしぎ (な)', kanji: '不思議', meaning: '不可思議的', type: 'な形容詞' },
    { id: 'adj-na-95', kana: 'ふじゆう (な)', kanji: '不自由', meaning: '不自由的/不便的', type: 'な形容詞' },
    { id: 'adj-na-96', kana: 'ふべん (な)', kanji: '不便', meaning: '不便的', type: 'な形容詞' },
    { id: 'adj-na-97', kana: 'ふまん (な)', kanji: '不満', meaning: '不滿的', type: 'な形容詞' },
    { id: 'adj-na-98', kana: 'ふよう (な)', kanji: '不用 / 不要', meaning: '不用的/不要的', type: 'な形容詞' },
    { id: 'adj-na-99', kana: 'ふあん (な)', kanji: '不安', meaning: '不安的', type: 'な形容詞' },
    { id: 'adj-na-100', kana: 'ふカノウ (な)', kanji: '不可能', meaning: '不可能的', type: 'な形容詞' },
    { id: 'adj-na-101', kana: 'ふくざつ (な)', kanji: '複雑', meaning: '複雜的', type: 'な形容詞' },
    { id: 'adj-na-102', kana: 'ふしぎ (な)', kanji: '不思議', meaning: '不可思議的', type: 'な形容詞' },
    { id: 'adj-na-103', kana: 'ふじゆう (な)', kanji: '不自由', meaning: '不自由的', type: 'な形容詞' },
    { id: 'adj-na-104', kana: 'ふへい (な)', kanji: '不平', meaning: '不平的/抱怨', type: 'な形容詞' },
    { id: 'adj-na-105', kana: 'ふべん (な)', kanji: '不便', meaning: '不便的', type: 'な形容詞' },
    { id: 'adj-na-106', kana: 'ふまじめ (な)', kanji: '不真面目', meaning: '不認真的', type: 'な形容詞' },
    { id: 'adj-na-107', kana: 'ふまん (な)', kanji: '不満', meaning: '不滿的', type: 'な形容詞' },
    { id: 'adj-na-108', kana: 'ふゆかい (な)', kanji: '不愉快', meaning: '不愉快的', type: 'な形容詞' },
    { id: 'adj-na-109', kana: 'ふよう (な)', kanji: '不要', meaning: '不要的/不用的', type: 'な形容詞' },
    { id: 'adj-na-110', kana: 'へいき (な)', kanji: '平気', meaning: '不在乎的/沒事的', type: 'な形容詞' },
    { id: 'adj-na-111', kana: 'へた (な)', kanji: '下手', meaning: '笨拙的', type: 'な形容詞' },
    { id: 'adj-na-112', kana: 'べつ (な)', kanji: '別', meaning: '別的/另外的', type: 'な形容詞' },
    { id: 'adj-na-113', kana: 'べんり (な)', kanji: '便利', meaning: '便利的', type: 'な形容詞' },
    { id: 'adj-na-114', kana: 'ほうふ (な)', kanji: '豊富', meaning: '豐富的', type: 'な形容詞' },
    { id: 'adj-na-115', kana: 'ほか (の)', kanji: '他', meaning: '其他的 (連體修飾)', type: 'な形容詞' },
    { id: 'adj-na-116', kana: 'ほがらか (な)', kanji: '朗らか', meaning: '開朗的', type: 'な形容詞' },
    { id: 'adj-na-117', kana: 'まじめ (な)', kanji: '真面目', meaning: '認真的', type: 'な形容詞' },
    { id: 'adj-na-118', kana: 'まっか (な)', kanji: '真っ赤', meaning: '通紅的', type: 'な形容詞' },
    { id: 'adj-na-119', kana: 'まっくろ (な)', kanji: '真っ黒', meaning: '漆黑的', type: 'な形容詞' },
    { id: 'adj-na-120', kana: 'まっさお (な)', kanji: '真っ青', meaning: '鐵青的/蔚藍的', type: 'な形容詞' },
    { id: 'adj-na-121', kana: 'まっしろ (な)', kanji: '真っ白', meaning: '雪白的', type: 'な形容詞' },
    { id: 'adj-na-122', kana: 'むちゃ (な)', kanji: '無茶', meaning: '亂來的/無理的', type: 'な形容詞' },
    { id: 'adj-na-123', kana: 'むちゅう (な)', kanji: '夢中', meaning: '著迷的/熱衷的', type: 'な形容詞' },
    { id: 'adj-na-124', kana: 'むだ (な)', kanji: '無駄', meaning: '浪費的/徒勞的', type: 'な形容詞' },
    { id: 'adj-na-125', kana: 'むり (な)', kanji: '無理', meaning: '勉強的/不可能的', type: 'な形容詞' },
    { id: 'adj-na-126', kana: 'めいかく (な)', kanji: '明確', meaning: '明確的', type: 'な形容詞' },
    { id: 'adj-na-127', kana: 'めんどう (な)', kanji: '面倒', meaning: '麻煩的', type: 'な形容詞' },
    { id: 'adj-na-128', kana: 'もうレツ (な)', kanji: '猛烈', meaning: '猛烈的', type: 'な形容詞' },
    { id: 'adj-na-129', kana: 'ゆうめい (な)', kanji: '有名', meaning: '有名的', type: 'な形容詞' },
    { id: 'adj-na-130', kana: 'りこう (な)', kanji: '利口', meaning: '聰明的/乖巧的', type: 'な形容詞' },
    { id: 'adj-na-131', kana: 'りそうてき (な)', kanji: '理想的', meaning: '理想的', type: 'な形容詞' },
    { id: 'adj-na-132', kana: 'りっぱ (な)', kanji: '立派', meaning: '極好的/宏偉的', type: 'な形容詞' },
    { id: 'adj-na-133', kana: 'わがまま (な)', kanji: '我儘', meaning: '任性的', type: 'な形容詞' }

  ],
  // --- 名詞 (包含您提供的大量名詞範例) ---
  noun: [
        { id: 'n-1', kana: 'あい', kanji: '愛', meaning: '愛', type: '名詞' },
    { id: 'n-2', kana: 'あいだ', kanji: '間', meaning: '之間', type: '名詞' },
    { id: 'n-3', kana: 'あいて', kanji: '相手', meaning: '對象/對手', type: '名詞' },
    { id: 'n-4', kana: 'アイロン', kanji: '-', meaning: '熨斗', type: '名詞' },
    { id: 'n-5', kana: 'あかちゃん', kanji: '赤ちゃん', meaning: '嬰兒', type: '名詞' },
    { id: 'n-6', kana: 'あさ', kanji: '朝', meaning: '早上', type: '名詞' },
    { id: 'n-7', kana: 'あさごはん', kanji: '朝ごはん', meaning: '早餐', type: '名詞' },
    { id: 'n-8', kana: 'あじ', kanji: '味', meaning: '味道', type: '名詞' },
    { id: 'n-9', kana: 'あした', kanji: '明日', meaning: '明天', type: '名詞' },
    { id: 'n-10', kana: 'あせ', kanji: '汗', meaning: '汗', type: '名詞' },
    { id: 'n-11', kana: 'あそこ', kanji: '-', meaning: '那裡', type: '名詞' },
    { id: 'n-12', kana: 'あたま', kanji: '頭', meaning: '頭', type: '名詞' },
    { id: 'n-13', kana: 'あと', kanji: '後', meaning: '之後', type: '名詞' },
    { id: 'n-14', kana: 'あな', kanji: '穴', meaning: '洞', type: '名詞' },
    { id: 'n-15', kana: 'アニメ', kanji: '-', meaning: '動畫', type: '名詞' },
    { id: 'n-16', kana: 'アパート', kanji: '-', meaning: '公寓', type: '名詞' },
    { id: 'n-17', kana: 'あめ', kanji: '雨 / 飴', meaning: '雨 / 糖果', type: '名詞' },
    { id: 'n-18', kana: 'アメリカ', kanji: '-', meaning: '美國', type: '名詞' },
    { id: 'n-19', kana: 'あやまり', kanji: '謝り', meaning: '道歉 (名詞)', type: '名詞' },
    { id: 'n-20', kana: 'い', kanji: '胃', meaning: '胃', type: '名詞' },
    { id: 'n-21', kana: 'いいえ', kanji: '-', meaning: '不 (感嘆詞)', type: '名詞' },
    { id: 'n-22', kana: 'いいわけ', kanji: '言い訳', meaning: '藉口', type: '名詞' },
    { id: 'n-23', kana: 'いえ', kanji: '家', meaning: '家', type: '名詞' },
    { id: 'n-24', kana: 'いか', kanji: '以下', meaning: '以下', type: '名詞' },
    { id: 'n-25', kana: 'いがく', kanji: '医学', meaning: '醫學', type: '名詞' },
    { id: 'n-26', kana: 'いき', kanji: '息', meaning: '呼吸', type: '名詞' },
    { id: 'n-27', kana: 'いけ', kanji: '池', meaning: '池塘', type: '名詞' },
    { id: 'n-28', kana: 'いけん', kanji: '意見', meaning: '意見', type: '名詞' },
    { id: 'n-29', kana: 'いし', kanji: '石 / 医師', meaning: '石頭 / 醫生', type: '名詞' },
    { id: 'n-30', kana: 'いしゃ', kanji: '医者', meaning: '醫生', type: '名詞' },
    { id: 'n-31', kana: 'いす', kanji: '椅子', meaning: '椅子', type: '名詞' },
    { id: 'n-32', kana: 'いなか', kanji: '田舎', meaning: '鄉下', type: '名詞' },
    { id: 'n-33', kana: 'いぬ', kanji: '犬', meaning: '狗', type: '名詞' },
    { id: 'n-34', kana: 'いのち', kanji: '命', meaning: '生命', type: '名詞' },
    { id: 'n-35', kana: 'いま', kanji: '今', meaning: '現在', type: '名詞' },
    { id: 'n-36', kana: 'いみ', kanji: '意味', meaning: '意思', type: '名詞' },
    { id: 'n-37', kana: 'いもうと', kanji: '妹', meaning: '妹妹', type: '名詞' },
    { id: 'n-38', kana: 'いりぐち', kanji: '入口', meaning: '入口', type: '名詞' },
    { id: 'n-39', kana: 'いろ', kanji: '色', meaning: '顏色', type: '名詞' },
    { id: 'n-40', kana: 'いわ', kanji: '岩', meaning: '岩石', type: '名詞' },
    { id: 'n-41', kana: 'インターネット', kanji: '-', meaning: '網路', type: '名詞' },
    { id: 'n-42', kana: 'インタビュー', kanji: '-', meaning: '採訪', type: '名詞' },
    { id: 'n-43', kana: 'いんしゅうんてん', kanji: '飲酒運転', meaning: '酒駕', type: '名詞' },
    { id: 'n-44', kana: 'いんしょう', kanji: '印象', meaning: '印象', type: '名詞' },
    { id: 'n-45', kana: 'インスタントしょくひん', kanji: 'インスタント食品', meaning: '即時食品', type: '名詞' },
    { id: 'n-46', kana: 'インターン', kanji: '-', meaning: '實習', type: '名詞' },
    { id: 'n-47', kana: 'インフルエンザ', kanji: '-', meaning: '流感', type: '名詞' },
    { id: 'n-48', kana: 'ウィルス', kanji: '-', meaning: '病毒', type: '名詞' },
    { id: 'n-49', kana: 'ウェブ', kanji: '-', meaning: 'Web / 網路', type: '名詞' },
    { id: 'n-50', kana: 'ウェブサイト', kanji: 'Website', meaning: '網站', type: '名詞' },
    { id: 'n-51', kana: 'ウェブページ', kanji: 'Webpage', meaning: '網頁', type: '名詞' },
    { id: 'n-52', kana: 'うがいぐすり', kanji: 'うがい薬', meaning: '漱口水', type: '名詞' },
    { id: 'n-53', kana: 'うけつけ', kanji: '受付', meaning: '櫃檯/受理', type: '名詞' },
    { id: 'n-54', kana: 'うけとり', kanji: '受け取り', meaning: '領取/收據', type: '名詞' },
    { id: 'n-55', kana: 'うしろ', kanji: '後ろ', meaning: '後面', type: '名詞' },
    { id: 'n-56', kana: 'うしろすがた', kanji: '後ろ姿', meaning: '背影', type: '名詞' },
    { id: 'n-57', kana: 'うそ', kanji: '嘘', meaning: '謊言', type: '名詞' },
    { id: 'n-58', kana: 'うそつき', kanji: '嘘つき', meaning: '騙子', type: '名詞' },
    { id: 'n-59', kana: 'うたがい', kanji: '疑い', meaning: '懷疑 (名詞)', type: '名詞' },
    { id: 'n-60', kana: 'うちがわ', kanji: '内側', meaning: '內側', type: '名詞' },
    { id: 'n-61', kana: 'うどん', kanji: '-', meaning: '烏龍麵', type: '名詞' },
    { id: 'n-62', kana: 'うなぎ', kanji: '鰻', meaning: '鰻魚', type: '名詞' },
    { id: 'n-63', kana: 'うま', kanji: '馬', meaning: '馬', type: '名詞' },
    { id: 'n-64', kana: 'うまれ', kanji: '生まれ', meaning: '出生/出身 (名詞)', type: '名詞' },
    { id: 'n-65', kana: 'うみ', kanji: '海', meaning: '海', type: '名詞' },
    { id: 'n-66', kana: 'うめ', kanji: '梅', meaning: '梅子', type: '名詞' },
    { id: 'n-67', kana: 'うら', kanji: '裏', meaning: '背面', type: '名詞' },
    { id: 'n-68', kana: 'うりきれ', kanji: '売り切れ', meaning: '售完', type: '名詞' },
    { id: 'n-69', kana: 'うりば', kanji: '売り場', meaning: '賣場', type: '名詞' },
    { id: 'n-70', kana: 'うわぎ', kanji: '上着', meaning: '上衣/外套', type: '名詞' },
    { id: 'n-71', kana: 'うん', kanji: '運', meaning: '運氣', type: '名詞' },
    { id: 'n-72', kana: 'うんてんしゅ', kanji: '運転手', meaning: '司機', type: '名詞' },
    { id: 'n-73', kana: 'うんてんめんきょしょう', kanji: '運転免許証', meaning: '駕照', type: '名詞' },
    { id: 'n-74', kana: 'うんどうかい', kanji: '運動會', meaning: '運動會', type: '名詞' },
    { id: 'n-75', kana: 'え', kanji: '絵 / 柄', meaning: '圖畫 / 花紋', type: '名詞' },
    { id: 'n-76', kana: 'エアコン', kanji: '-', meaning: '冷氣/空調', type: '名詞' },
    { id: 'n-77', kana: 'えいかいわ', kanji: '英会話', meaning: '英語會話', type: '名詞' },
    { id: 'n-78', kana: 'えいぞう', kanji: '映像', meaning: '影像', type: '名詞' },
    { id: 'n-79', kana: 'えがお', kanji: '笑顔', meaning: '笑容', type: '名詞' },
    { id: 'n-80', kana: 'えき', kanji: '駅', meaning: '車站', type: '名詞' },
    { id: 'n-81', kana: 'えさ', kanji: '餌', meaning: '飼料/餌', type: '名詞' },
    { id: 'n-82', kana: 'エリア', kanji: 'Area', meaning: '區域', type: '名詞' },
    { id: 'n-83', kana: 'えん', kanji: '円', meaning: '日圓', type: '名詞' },
    { id: 'n-84', kana: 'えんかい', kanji: '宴会', meaning: '宴會', type: '名詞' },
    { id: 'n-85', kana: 'エンジン', kanji: 'Engine', meaning: '引擎', type: '名詞' },
    { id: 'n-86', kana: 'えんだか', kanji: '円高', meaning: '日圓升值', type: '名詞' },
    { id: 'n-87', kana: 'えんやす', kanji: '円安', meaning: '日圓貶值', type: '名詞' },
    { id: 'n-88', kana: 'おい', kanji: '甥', meaning: '侄子/外甥', type: '名詞' },
    { id: 'n-89', kana: 'おう', kanji: '王', meaning: '國王', type: '名詞' },
    { id: 'n-90', kana: 'おうじ', kanji: '王子', meaning: '王子', type: '名詞' },
    { id: 'n-91', kana: 'おうべい', kanji: '欧米', meaning: '歐美', type: '名詞' },
    { id: 'n-92', kana: 'おおあめ', kanji: '大雨', meaning: '大雨', type: '名詞' },
    { id: 'n-93', kana: 'おおごえ', kanji: '大声', meaning: '大聲', type: '名詞' },
    { id: 'n-94', kana: 'おおぜい', kanji: '大勢', meaning: '眾多 (人)', type: '名詞' },
    { id: 'n-95', kana: 'おおみそか', kanji: '大晦日', meaning: '除夕 (12/31)', type: '名詞' },
    { id: 'n-96', kana: 'おか', kanji: '丘', meaning: '山丘', type: '名詞' },
    { id: 'n-97', kana: 'おかあさん', kanji: 'お母さん', meaning: '母親', type: '名詞' },
    { id: 'n-98', kana: 'おかえし', kanji: 'お返し', meaning: '回禮', type: '名詞' },
    { id: 'n-99', kana: 'おかず', kanji: '-', meaning: '配菜', type: '名詞' },
    { id: 'n-100', kana: 'おきにいり', kanji: 'お気に入り', meaning: '中意/喜愛的東西', type: '名詞' },
    { id: 'n-101', kana: 'おく', kanji: '奥', meaning: '裡面/深處', type: '名詞' },
    { id: 'n-102', kana: 'おくじょう', kanji: '屋上', meaning: '屋頂', type: '名詞' },
    { id: 'n-103', kana: 'おくりもの', kanji: '贈り物', meaning: '禮物', type: '名詞' },
    { id: 'n-104', kana: 'おこさん', kanji: 'お子さん', meaning: '孩子 (尊稱)', type: '名詞' },
    { id: 'n-105', kana: 'おさきに', kanji: 'お先に', meaning: '先 (失陪了)', type: '名詞' },
    { id: 'n-106', kana: 'おさけ', kanji: 'お酒', meaning: '酒', type: '名詞' },
    { id: 'n-107', kana: 'おじ', kanji: '叔父 / 伯父', meaning: '叔叔/伯伯', type: '名詞' },
    { id: 'n-108', kana: 'おじいさん', kanji: 'お爺さん', meaning: '爺爺/老爺爺', type: '名詞' },
    { id: 'n-109', kana: 'おしり', kanji: 'お尻', meaning: '屁股', type: '名詞' },
    { id: 'n-110', kana: 'おすすめ', kanji: 'お勧め', meaning: '推薦', type: '名詞' },
    { id: 'n-111', kana: 'おっと', kanji: '夫', meaning: '丈夫', type: '名詞' },
    { id: 'n-112', kana: 'おとしだま', kanji: 'お年玉', meaning: '壓歲錢', type: '名詞' },
    { id: 'n-113', kana: 'おととし', kanji: '一昨年', meaning: '前年', type: '名詞' },
    { id: 'n-114', kana: 'おとな', kanji: '大人', meaning: '大人/成年人', type: '名詞' },
    { id: 'n-115', kana: 'おなか', kanji: 'お腹', meaning: '肚子', type: '名詞' },
    { id: 'n-116', kana: 'おに', kanji: '鬼', meaning: '鬼/魔鬼', type: '名詞' },
    { id: 'n-117', kana: 'おにいさん', kanji: 'お兄さん', meaning: '哥哥', type: '名詞' },
    { id: 'n-118', kana: 'おねえさん', kanji: 'お姉さん', meaning: '姊姊', type: '名詞' },
    { id: 'n-119', kana: 'おのおの', kanji: '各々', meaning: '各自', type: '名詞' },
    { id: 'n-120', kana: 'おば', kanji: '叔母 / 伯母', meaning: '阿姨/嬸嬸/姑姑', type: '名詞' },
    { id: 'n-121', kana: 'おばあさん', kanji: 'お婆さん', meaning: '奶奶/老奶奶', type: '名詞' },
    { id: 'n-122', kana: 'おはよう', kanji: '-', meaning: '早安', type: '名詞' },
    { id: 'n-123', kana: 'おび', kanji: '帯', meaning: '腰帶 (和服)', type: '名詞' },
    { id: 'n-124', kana: 'オフィス', kanji: 'Office', meaning: '辦公室', type: '名詞' },
    { id: 'n-125', kana: 'おめでとう', kanji: '-', meaning: '恭喜', type: '名詞' },
    { id: 'n-126', kana: 'おもい', kanji: '思い', meaning: '想法/思念', type: '名詞' },
    { id: 'n-127', kana: 'おもいで', kanji: '思い出', meaning: '回憶', type: '名詞' },
    { id: 'n-128', kana: 'おもちゃ', kanji: '-', meaning: '玩具', type: '名詞' },
    { id: 'n-129', kana: 'おもて', kanji: '表', meaning: '表面/正面', type: '名詞' },
    { id: 'n-130', kana: 'おもに', kanji: '主に', meaning: '主要 (副詞)', type: '名詞' },
    { id: 'n-131', kana: 'おもわず', kanji: '思わず', meaning: '不由得/忍不住 (副詞)', type: '名詞' },
    { id: 'n-132', kana: 'おや', kanji: '親', meaning: '雙親/父母', type: '名詞' },
    { id: 'n-133', kana: 'おやつ', kanji: '-', meaning: '點心', type: '名詞' },
    { id: 'n-134', kana: 'おやゆび', kanji: '親指', meaning: '大拇指', type: '名詞' },
    { id: 'n-135', kana: 'おれ', kanji: '俺', meaning: '我 (男性用語)', type: '名詞' },
    { id: 'n-136', kana: 'オレンジ', kanji: '-', meaning: '柳橙', type: '名詞' },
    { id: 'n-137', kana: 'おん', kanji: '恩', meaning: '恩情', type: '名詞' },
    { id: 'n-138', kana: 'おんがく', kanji: '音楽', meaning: '音樂', type: '名詞' },
    { id: 'n-139', kana: 'おんせん', kanji: '温泉', meaning: '溫泉', type: '名詞' },
    { id: 'n-140', kana: 'おんち', kanji: '音痴', meaning: '音痴', type: '名詞' },
    { id: 'n-141', kana: 'おんど', kanji: '温度', meaning: '溫度', type: '名詞' },
    { id: 'n-142', kana: 'おんな', kanji: '女', meaning: '女性', type: '名詞' },
    { id: 'n-143', kana: 'おんどけい', kanji: '温度計', meaning: '溫度計', type: '名詞' },
    { id: 'n-144', kana: 'かいが', kanji: '絵画', meaning: '繪畫', type: '名詞' },
    { id: 'n-145', kana: 'かいがい', kanji: '海外', meaning: '海外', type: '名詞' },
    { id: 'n-146', kana: 'かいぎ', kanji: '会議', meaning: '會議', type: '名詞' },
    { id: 'n-147', kana: 'かいけい', kanji: '会計', meaning: '會計/結帳', type: '名詞' },
    { id: 'n-148', kana: 'かいさつぐち', kanji: '改札口', meaning: '剪票口', type: '名詞' },
    { id: 'n-149', kana: 'かいせい', kanji: '快晴', meaning: '晴朗', type: '名詞' },
    { id: 'n-150', kana: 'かいもの', kanji: '買い物', meaning: '購物', type: '名詞' },
    { id: 'n-151', kana: 'かいわ', kanji: '会話', meaning: '會話', type: '名詞' },
    { id: 'n-152', kana: 'かお', kanji: '顔', meaning: '臉', type: '名詞' },
    { id: 'n-153', kana: 'かがく', kanji: '科学 / 化学', meaning: '科學 / 化學', type: '名詞' },
    { id: 'n-154', kana: 'かかり', kanji: '係', meaning: '負責人/擔任者', type: '名詞' },
    { id: 'n-155', kana: 'かきとめ', kanji: '書留', meaning: '掛號信', type: '名詞' },
    { id: 'n-156', kana: 'かきとり', kanji: '書き取り', meaning: '聽寫/抄寫', type: '名詞' },
    { id: 'n-157', kana: 'かぐ', kanji: '家具', meaning: '家具', type: '名詞' },
    { id: 'n-158', kana: 'がくせい', kanji: '学生', meaning: '學生', type: '名詞' },
    { id: 'n-159', kana: 'かくだい', kanji: '拡大', meaning: '擴大', type: '名詞' },
    { id: 'n-160', kana: 'がくふ', kanji: '楽譜', meaning: '樂譜', type: '名詞' },
    { id: 'n-161', kana: 'がくぶ', kanji: '学部', meaning: '系/學院', type: '名詞' },
    { id: 'n-162', kana: 'がくもん', kanji: '学問', meaning: '學問', type: '名詞' },
    { id: 'n-163', kana: 'かげ', kanji: '影 / 陰', meaning: '影子 / 陰涼處', type: '名詞' },
    { id: 'n-164', kana: 'かけざん', kanji: '掛け算', meaning: '乘法', type: '名詞' },
    { id: 'n-165', kana: 'かこ', kanji: '過去', meaning: '過去', type: '名詞' },
    { id: 'n-166', kana: 'かこう', kanji: '火口', meaning: '火山口', type: '名詞' },
    { id: 'n-167', kana: 'かさい', kanji: '火災', meaning: '火災', type: '名詞' },
    { id: 'n-168', kana: 'かし', kanji: '菓子 / 歌詞', meaning: '點心 / 歌詞', type: '名詞' },
    { id: 'n-169', kana: 'かじ', kanji: '火事 / 家事', meaning: '火災 / 家事', type: '名詞' },
    { id: 'n-170', kana: 'かしだし', kanji: '貸し出し', meaning: '借出', type: '名詞' },
    { id: 'n-171', kana: 'かしゅ', kanji: '歌手', meaning: '歌手', type: '名詞' },
    { id: 'n-172', kana: 'かしょ', kanji: '箇所', meaning: '地方/處', type: '名詞' },
    { id: 'n-173', kana: 'かず', kanji: '数', meaning: '數字/數量', type: '名詞' },
    { id: 'n-174', kana: 'かぜ', kanji: '風 / 風邪', meaning: '風 / 感冒', type: '名詞' },
    { id: 'n-175', kana: 'かた', kanji: '肩 / 型 / 方', meaning: '肩膀 / 型號 / 方面', type: '名詞' },
    { id: 'n-176', kana: 'かたち', kanji: '形', meaning: '形狀', type: '名詞' },
    { id: 'n-177', kana: 'かたな', kanji: '刀', meaning: '刀', type: '名詞' },
    { id: 'n-178', kana: 'かたほう', kanji: '片方', meaning: '單方/其中一邊', type: '名詞' },
    { id: 'n-179', kana: 'かたみち', kanji: '片道', meaning: '單程', type: '名詞' },
    { id: 'n-180', kana: 'がっかい', kanji: '学会', meaning: '學會', type: '名詞' },
    { id: 'n-181', kana: 'かっき', kanji: '活気', meaning: '活力/生氣', type: '名詞' },
    { id: 'n-182', kana: 'がっき', kanji: '楽器 / 学期', meaning: '樂器 / 學期', type: '名詞' },
    { id: 'n-183', kana: 'かっこ', kanji: '括弧', meaning: '括號', type: '名詞' },
    { id: 'n-184', kana: 'かっこう', kanji: '格好', meaning: '裝扮/樣子', type: '名詞' },
    { id: 'n-185', kana: 'カップ', kanji: 'Cup', meaning: '杯子', type: '名詞' },
    { id: 'n-186', kana: 'かてい', kanji: '家庭 / 過程', meaning: '家庭 / 過程', type: '名詞' },
    { id: 'n-187', kana: 'かな', kanji: '仮名', meaning: '假名', type: '名詞' },
    { id: 'n-188', kana: 'かない', kanji: '家内', meaning: '妻子 (謙稱)', type: '名詞' },
    { id: 'n-189', kana: 'かならず', kanji: '必ず', meaning: '必定/一定 (副詞)', type: '名詞' },
    { id: 'n-190', kana: 'かなり', kanji: '-', meaning: '相當地 (副詞)', type: '名詞' },
    { id: 'n-191', kana: 'かね', kanji: '金 / 鐘', meaning: '錢 / 鐘', type: '名詞' },
    { id: 'n-192', kana: 'かねもち', kanji: '金持ち', meaning: '有錢人', type: '名詞' },
    { id: 'n-193', kana: 'かのじょ', kanji: '彼女', meaning: '她/女朋友', type: '名詞' },
    { id: 'n-194', kana: 'かばん', kanji: '鞄', meaning: '包包', type: '名詞' },
    { id: 'n-195', kana: 'かび', kanji: '黴', meaning: '黴菌', type: '名詞' },
    { id: 'n-196', kana: 'かびん', kanji: '花瓶', meaning: '花瓶', type: '名詞' },
    { id: 'n-197', kana: 'かぶ', kanji: '株', meaning: '股票/樹樁', type: '名詞' },
    { id: 'n-198', kana: 'かべ', kanji: '壁', meaning: '牆壁', type: '名詞' },
    { id: 'n-199', kana: 'かみ', kanji: '紙 / 髪 / 神', meaning: '紙 / 頭髮 / 神', type: '名詞' },
    { id: 'n-200', kana: 'かみなり', kanji: '雷', meaning: '雷', type: '名詞' },
    { id: 'n-201', kana: 'カメラ', kanji: 'Camera', meaning: '相機', type: '名詞' },
    { id: 'n-202', kana: 'かもく', kanji: '科目', meaning: '科目', type: '名詞' },
    { id: 'n-203', kana: 'かもしれない', kanji: '-', meaning: '也許/說不定 (句型)', type: '名詞' },
    { id: 'n-204', kana: 'から', kanji: '空 / 殻', meaning: '空 / 殼', type: '名詞' },
    { id: 'n-205', kana: 'がら', kanji: '柄', meaning: '花樣/圖案', type: '名詞' },
    { id: 'n-206', kana: 'からす', kanji: '烏', meaning: '烏鴉', type: '名詞' },
    { id: 'n-207', kana: 'からだ', kanji: '体', meaning: '身體', type: '名詞' },
    { id: 'n-208', kana: 'からて', kanji: '空手', meaning: '空手道', type: '名詞' },
    { id: 'n-209', kana: 'かれ', kanji: '彼', meaning: '他/男朋友', type: '名詞' },
    { id: 'n-210', kana: 'カレー', kanji: 'Curry', meaning: '咖哩', type: '名詞' },
    { id: 'n-211', kana: 'カレンダー', kanji: 'Calendar', meaning: '月曆', type: '名詞' },
    { id: 'n-212', kana: 'かわ', kanji: '川 / 革 / 皮', meaning: '河川 / 皮革 / 皮', type: '名詞' },
    { id: 'n-213', kana: 'かん', kanji: '缶', meaning: '罐頭/罐子', type: '名詞' },
    { id: 'n-214', kana: 'がん', kanji: '癌', meaning: '癌症', type: '名詞' },
    { id: 'n-215', kana: 'かんがえ', kanji: '考え', meaning: '想法', type: '名詞' },
    { id: 'n-216', kana: 'かんきゃく', kanji: '観客', meaning: '觀眾', type: '名詞' },
    { id: 'n-217', kana: 'かんきょう', kanji: '環境', meaning: '環境', type: '名詞' },
    { id: 'n-218', kana: 'かんけい', kanji: '関係', meaning: '關係', type: '名詞' },
    { id: 'n-219', kana: 'かんごし', kanji: '看護師', meaning: '護理師', type: '名詞' },
    { id: 'n-220', kana: 'かんさい', kanji: '関西', meaning: '關西', type: '名詞' },
    { id: 'n-221', kana: 'かんじ', kanji: '漢字 / 感じ', meaning: '漢字 / 感覺', type: '名詞' },
    { id: 'n-222', kana: 'かんそう', kanji: '感想 / 乾燥', meaning: '感想 / 乾燥', type: '名詞' },
    { id: 'n-223', kana: 'かんだん', kanji: '歓談', meaning: '暢談', type: '名詞' },
    { id: 'n-224', kana: 'かんづめ', kanji: '缶詰', meaning: '罐頭食品', type: '名詞' },
    { id: 'n-225', kana: 'かんど', kanji: '感度', meaning: '感度/靈敏度', type: '名詞' },
    { id: 'n-226', kana: 'かんばん', kanji: '看板', meaning: '招牌', type: '名詞' },
    { id: 'n-227', kana: 'かんれん', kanji: '関連', meaning: '關聯', type: '名詞' },
    { id: 'n-228', kana: 'き', kanji: '気 / 木', meaning: '氣氛・精神 / 樹木', type: '名詞' },
    { id: 'n-229', kana: 'きあつ', kanji: '気圧', meaning: '氣壓', type: '名詞' },
    { id: 'n-230', kana: 'きいろ', kanji: '黄色', meaning: '黃色', type: '名詞' },
    { id: 'n-231', kana: 'ぎいん', kanji: '議員', meaning: '議員', type: '名詞' },
    { id: 'n-232', kana: 'きおん', kanji: '気温', meaning: '氣溫', type: '名詞' },
    { id: 'n-233', kana: 'きかい', kanji: '機械 / 機会', meaning: '機械 / 機會', type: '名詞' },
    { id: 'n-234', kana: 'きかん', kanji: '期間 / 機関', meaning: '期間 / 機關', type: '名詞' },
    { id: 'n-235', kana: 'ききとり', kanji: '聞き取り', meaning: '聽力', type: '名詞' },
    { id: 'n-236', kana: 'きぎょう', kanji: '企業', meaning: '企業', type: '名詞' },
    { id: 'n-237', kana: 'きげん', kanji: '期限 / 機嫌', meaning: '期限 / 心情', type: '名詞' },
    { id: 'n-238', kana: 'きこう', kanji: '気候', meaning: '氣候', type: '名詞' },
    { id: 'n-239', kana: 'きじ', kanji: '記事 / 生地', meaning: '報導 / 布料', type: '名詞' },
    { id: 'n-240', kana: 'ぎし', kanji: '技師', meaning: '技師/工程師', type: '名詞' },
    { id: 'n-241', kana: 'きじゅん', kanji: '基準', meaning: '基準', type: '名詞' },
    { id: 'n-242', kana: 'きしょう', kanji: '気象', meaning: '氣象', type: '名詞' },
    { id: 'n-243', kana: 'きず', kanji: '傷', meaning: '傷口', type: '名詞' },
    { id: 'n-244', kana: 'きせつ', kanji: '季節', meaning: '季節', type: '名詞' },
    { id: 'n-245', kana: 'きそ', kanji: '基礎', meaning: '基礎', type: '名詞' },
    { id: 'n-246', kana: 'きそく', kanji: '規則', meaning: '規則', type: '名詞' },
    { id: 'n-247', kana: 'きた', kanji: '北', meaning: '北方', type: '名詞' },
    { id: 'n-248', kana: 'きち', kanji: '基地', meaning: '基地', type: '名詞' },
    { id: 'n-249', kana: 'きちょう', kanji: '貴重', meaning: '貴重', type: '名詞' },
    { id: 'n-250', kana: 'きって', kanji: '切手', meaning: '郵票', type: '名詞' },
    { id: 'n-251', kana: 'きっと', kanji: '-', meaning: '一定 (副詞)', type: '名詞' },
    { id: 'n-252', kana: 'きっぷ', kanji: '切符', meaning: '車票', type: '名詞' },
    { id: 'n-253', kana: 'きのう', kanji: '昨日', meaning: '昨天', type: '名詞' },
    { id: 'n-254', kana: 'きのこ', kanji: '茸', meaning: '蘑菇', type: '名詞' },
    { id: 'n-255', kana: 'きぶん', kanji: '気分', meaning: '氣氛/身體狀況/心情', type: '名詞' },
    { id: 'n-256', kana: 'きぼ', kanji: '規模', meaning: '規模', type: '名詞' },
    { id: 'n-257', kana: 'きぼう', kanji: '希望', meaning: '希望', type: '名詞' },
    { id: 'n-258', kana: 'きほん', kanji: '基本', meaning: '基本', type: '名詞' },
    { id: 'n-259', kana: 'きまぐれ', kanji: '気紛れ', meaning: '心血來潮/善變', type: '名詞' },
    { id: 'n-260', kana: 'きまり', kanji: '決まり', meaning: '規定', type: '名詞' },
    { id: 'n-261', kana: 'きみ', kanji: '君', meaning: '你 (同輩/晚輩)', type: '名詞' },
    { id: 'n-262', kana: 'きもち', kanji: '気持ち', meaning: '心情/感受', type: '名詞' },
    { id: 'n-263', kana: 'きもの', kanji: '着物', meaning: '和服', type: '名詞' },
    { id: 'n-264', kana: 'ぎもん', kanji: '疑問', meaning: '疑問', type: '名詞' },
    { id: 'n-265', kana: 'ぎゃく', kanji: '逆', meaning: '相反', type: '名詞' },
    { id: 'n-266', kana: 'きゃく', kanji: '客', meaning: '客人', type: '名詞' },
    { id: 'n-267', kana: 'きゃくせき', kanji: '客席', meaning: '觀眾席', type: '名詞' },
    { id: 'n-268', kana: 'キャッシュ', kanji: 'Cash', meaning: '現金', type: '名詞' },
    { id: 'n-269', kana: 'きゅう', kanji: '急 / 球 / 級', meaning: '緊急 / 球 / 等級', type: '名詞' },
    { id: 'n-270', kana: 'きゅうか', kanji: '休暇', meaning: '休假', type: '名詞' },
    { id: 'n-271', kana: 'きゅうがく', kanji: '休学', meaning: '休學', type: '名詞' },
    { id: 'n-272', kana: 'きゅうぎょう', kanji: '休業', meaning: '停業/休業', type: '名詞' },
    { id: 'n-273', kana: 'きゅうこう', kanji: '急行', meaning: '急行 (列車)', type: '名詞' },
    { id: 'n-274', kana: 'きゅうじつ', kanji: '休日', meaning: '假日', type: '名詞' },
    { id: 'n-275', kana: 'ぎゅうにゅう', kanji: '牛乳', meaning: '牛奶', type: '名詞' },
    { id: 'n-276', kana: 'きゅうりょう', kanji: '給料', meaning: '薪水', type: '名詞' },
    { id: 'n-277', kana: 'きょう', kanji: '今日', meaning: '今天', type: '名詞' },
    { id: 'n-278', kana: 'きょういく', kanji: '教育', meaning: '教育', type: '名詞' },
    { id: 'n-279', kana: 'きょうかい', kanji: '教会 / 境界', meaning: '教會 / 境界', type: '名詞' },
    { id: 'n-280', kana: 'きょうかしょ', kanji: '教科書', meaning: '教科書', type: '名詞' },
    { id: 'n-281', kana: 'きょうぎ', kanji: '競技', meaning: '競技/比賽', type: '名詞' },
    { id: 'n-282', kana: 'きょうし', kanji: '教師', meaning: '教師', type: '名詞' },
    { id: 'n-283', kana: 'きょうしつ', kanji: '教室', meaning: '教室', type: '名詞' },
    { id: 'n-284', kana: 'きょうじゅ', kanji: '教授', meaning: '教授', type: '名詞' },
    { id: 'n-285', kana: 'きょうだい', kanji: '兄弟', meaning: '兄弟姊妹', type: '名詞' },
    { id: 'n-286', kana: 'きょうつう', kanji: '共通', meaning: '共通', type: '名詞' },
    { id: 'n-287', kana: 'きょうどう', kanji: '共同', meaning: '共同', type: '名詞' },
    { id: 'n-288', kana: 'きょうみ', kanji: '興味', meaning: '興趣', type: '名詞' },
    { id: 'n-289', kana: 'きょか', kanji: '許可', meaning: '許可', type: '名詞' },
    { id: 'n-290', kana: 'きょく', kanji: '曲 / 局', meaning: '歌曲 / 局 (單位)', type: '名詞' },
    { id: 'n-291', kana: 'きょねん', kanji: '去年', meaning: '去年', type: '名詞' },
    { id: 'n-292', kana: 'きり', kanji: '霧', meaning: '霧', type: '名詞' },
    { id: 'n-293', kana: 'きりつ', kanji: '規律', meaning: '規律', type: '名詞' },
    { id: 'n-294', kana: 'キロ', kanji: 'Kilo', meaning: '公里/公斤', type: '名詞' },
    { id: 'n-295', kana: 'ぎろん', kanji: '議論', meaning: '議論', type: '名詞' },
    { id: 'n-296', kana: 'きん', kanji: '金', meaning: '金', type: '名詞' },
    { id: 'n-297', kana: 'ぎん', kanji: '銀', meaning: '銀', type: '名詞' },
    { id: 'n-298', kana: 'きんえん', kanji: '禁煙', meaning: '禁菸', type: '名詞' },
    { id: 'n-299', kana: 'きんがく', kanji: '金額', meaning: '金額', type: '名詞' },
    { id: 'n-300', kana: 'きんこ', kanji: '金庫', meaning: '保險箱/金庫', type: '名詞' },
    { id: 'n-301', kana: 'きんじょ', kanji: '近所', meaning: '附近', type: '名詞' },
    { id: 'n-302', kana: 'きんニク', kanji: '筋肉', meaning: '肌肉', type: '名詞' },
    { id: 'n-303', kana: 'きんゆう', kanji: '金融', meaning: '金融', type: '名詞' },
    { id: 'n-304', kana: 'きんようび', kanji: '金曜日', meaning: '星期五', type: '名詞' },
    { id: 'n-305', kana: 'きもの', kanji: '着物', meaning: '和服', type: '名詞' },
    { id: 'n-306', kana: 'きものすがた', kanji: '着物姿', meaning: '穿和服的樣子', type: '名詞' },
    { id: 'n-307', kana: 'ぎゃく', kanji: '逆', meaning: '相反/逆向', type: '名詞' },
    { id: 'n-308', kana: 'キャッシュカード', kanji: 'Cash Card', meaning: '提款卡', type: '名詞' },
    { id: 'n-309', kana: 'キャプテン', kanji: 'Captain', meaning: '隊長', type: '名詞' },
    { id: 'n-310', kana: 'キャンプ', kanji: 'Camp', meaning: '露營', type: '名詞' },
    { id: 'n-311', kana: 'きゅう', kanji: '九 / 球 / 級', meaning: '九 / 球 / 等級', type: '名詞' },
    { id: 'n-312', kana: 'きゅうか', kanji: '休暇', meaning: '休假', type: '名詞' },
    { id: 'n-313', kana: 'きゅうぎょう', kanji: '休業', meaning: '停業', type: '名詞' },
    { id: 'n-314', kana: 'きゅうこう', kanji: '急行', meaning: '急行列車', type: '名詞' },
    { id: 'n-315', kana: 'きゅうじつ', kanji: '休日', meaning: '假日', type: '名詞' },
    { id: 'n-316', kana: 'きゅうしょく', kanji: '給食 / 求職', meaning: '營養午餐 / 求職', type: '名詞' },
    { id: 'n-317', kana: 'きゅうじょ', kanji: '救助', meaning: '救助', type: '名詞' },
    { id: 'n-318', kana: 'きゅうそく', kanji: '急速', meaning: '急速', type: '名詞' },
    { id: 'n-319', kana: 'きゅうに', kanji: '急に', meaning: '突然 (副詞)', type: '名詞' },
    { id: 'n-320', kana: 'きゅうよう', kanji: '急用', meaning: '急事', type: '名詞' },
    { id: 'n-321', kana: 'きゅうりょう', kanji: '給料', meaning: '薪水', type: '名詞' },
    { id: 'n-322', kana: 'きょう', kanji: '今日', meaning: '今天', type: '名詞' },
    { id: 'n-323', kana: 'きょういく', kanji: '教育', meaning: '教育', type: '名詞' },
    { id: 'n-324', kana: 'きょうかい', kanji: '教会 / 境界', meaning: '教會 / 邊界', type: '名詞' },
    { id: 'n-325', kana: 'きょうそう', kanji: '競争', meaning: '競爭', type: '名詞' },
    { id: 'n-326', kana: 'きょうだい', kanji: '兄弟', meaning: '兄弟', type: '名詞' },
    { id: 'n-327', kana: 'きょうみ', kanji: '興味', meaning: '興趣', type: '名詞' },
    { id: 'n-328', kana: 'きょり', kanji: '距離', meaning: '距離', type: '名詞' },
    { id: 'n-329', kana: 'ぐうぜん', kanji: '偶然', meaning: '偶然', type: '名詞' },
    { id: 'n-330', kana: 'クーラー', kanji: 'Cooler', meaning: '冷氣', type: '名詞' },
    { id: 'n-331', kana: 'くさ', kanji: '草', meaning: '草', type: '名詞' },
    { id: 'n-332', kana: 'くじょう', kanji: '苦情', meaning: '抱怨/客訴', type: '名詞' },
    { id: 'n-333', kana: 'くすり', kanji: '薬', meaning: '藥', type: '名詞' },
    { id: 'n-334', kana: 'くせ', kanji: '癖', meaning: '癖好/習慣', type: '名詞' },
    { id: 'n-335', kana: 'くだり', kanji: '下り', meaning: '下行/下坡', type: '名詞' },
    { id: 'n-336', kana: 'くだもの', kanji: '果物', meaning: '水果', type: '名詞' },
    { id: 'n-337', kana: 'くちびる', kanji: '唇', meaning: '嘴唇', type: '名詞' },
    { id: 'n-338', kana: 'くつ', kanji: '靴', meaning: '鞋子', type: '名詞' },
    { id: 'n-339', kana: 'くつした', kanji: '靴下', meaning: '襪子', type: '名詞' },
    { id: 'n-340', kana: 'くつう', kanji: '苦痛', meaning: '痛苦', type: '名詞' },
    { id: 'n-341', kana: 'くに', kanji: '国', meaning: '國家', type: '名詞' },
    { id: 'n-342', kana: 'くび', kanji: '首', meaning: '脖子', type: '名詞' },
    { id: 'n-343', kana: 'くま', kanji: '熊 / 隈', meaning: '熊 / 黑眼圈', type: '名詞' },
    { id: 'n-344', kana: 'くも', kanji: '雲 / 蜘蛛', meaning: '雲 / 蜘蛛', type: '名詞' },
    { id: 'n-345', kana: 'くもり', kanji: '曇り', meaning: '陰天', type: '名詞' },
    { id: 'n-346', kana: 'くらい', kanji: '位', meaning: '大約/名次', type: '名詞' },
    { id: 'n-347', kana: 'グラム', kanji: 'Gram', meaning: '公克', type: '名詞' },
    { id: 'n-348', kana: 'クラブ', kanji: 'Club', meaning: '社團/俱樂部', type: '名詞' },
    { id: 'n-349', kana: 'グラフ', kanji: 'Graph', meaning: '圖表', type: '名詞' },
    { id: 'n-350', kana: 'グラス', kanji: 'Glass', meaning: '玻璃杯', type: '名詞' },
    { id: 'n-351', kana: 'くらし', kanji: '暮らし', meaning: '生活', type: '名詞' },
    { id: 'n-352', kana: 'クラス', kanji: 'Class', meaning: '班級', type: '名詞' },
    { id: 'n-353', kana: 'クリスマス', kanji: 'Christmas', meaning: '聖誕節', type: '名詞' },
    { id: 'n-354', kana: 'クリーム', kanji: 'Cream', meaning: '奶油', type: '名詞' },
    { id: 'n-355', kana: 'くるま', kanji: '車', meaning: '車子', type: '名詞' },
    { id: 'n-356', kana: 'クレジットカード', kanji: 'Credit Card', meaning: '信用卡', type: '名詞' },
    { id: 'n-357', kana: 'くろ', kanji: '黒', meaning: '黑色', type: '名詞' },
    { id: 'n-358', kana: 'くん', kanji: '君', meaning: '君 (稱呼語)', type: '名詞' },
    { id: 'n-359', kana: 'け', kanji: '毛', meaning: '毛/頭髮', type: '名詞' },
    { id: 'n-360', kana: 'けいかん', kanji: '警官', meaning: '警官', type: '名詞' },
    { id: 'n-361', kana: 'けいご', kanji: '敬語', meaning: '敬語', type: '名詞' },
    { id: 'n-362', kana: 'けいさつ', kanji: '警察', meaning: '警察', type: '名詞' },
    { id: 'n-363', kana: 'けいしき', kanji: '形式', meaning: '形式', type: '名詞' },
    { id: 'n-364', kana: 'けいざい', kanji: '経済', meaning: '經濟', type: '名詞' },
    { id: 'n-365', kana: 'けいたい', kanji: '携帯', meaning: '手機', type: '名詞' },
    { id: 'n-366', kana: 'げいのう', kanji: '芸能', meaning: '演藝', type: '名詞' },
    { id: 'n-367', kana: 'けいば', kanji: '競馬', meaning: '賽馬', type: '名詞' },
    { id: 'n-368', kana: 'けいゆ', kanji: '経由', meaning: '經由', type: '名詞' },
    { id: 'n-369', kana: 'げき', kanji: '劇', meaning: '戲劇', type: '名詞' },
    { id: 'n-370', kana: 'げきじょう', kanji: '劇場', meaning: '劇場', type: '名詞' },
    { id: 'n-371', kana: 'けしゴム', kanji: '消しゴム', meaning: '橡皮擦', type: '名詞' },
    { id: 'n-372', kana: 'けっしん', kanji: '決心', meaning: '決心', type: '名詞' },
    { id: 'n-373', kana: 'けっして', kanji: '決して', meaning: '絕不 (副詞)', type: '名詞' },
    { id: 'n-374', kana: 'けつえき', kanji: '血液', meaning: '血液', type: '名詞' },
    { id: 'n-375', kana: 'けっか', kanji: '結果', meaning: '結果', type: '名詞' },
    { id: 'n-376', kana: 'げつまつ', kanji: '月末', meaning: '月底', type: '名詞' },
    { id: 'n-377', kana: 'げつようび', kanji: '月曜日', meaning: '星期一', type: '名詞' },
    { id: 'n-378', kana: 'けれど', kanji: 'けれど', meaning: '但是 (接續詞)', type: '名詞' },
    { id: 'n-379', kana: 'けん', kanji: '県 / 券 / 件', meaning: '縣 / 券 / 件', type: '名詞' },
    { id: 'n-380', kana: 'げんきん', kanji: '現金', meaning: '現金', type: '名詞' },
    { id: 'n-381', kana: 'げんこう', kanji: '原稿', meaning: '原稿', type: '名詞' },
    { id: 'n-382', kana: 'げんざい', kanji: '現在', meaning: '現在', type: '名詞' },
    { id: 'n-383', kana: 'けんせつ', kanji: '建設', meaning: '建設', type: '名詞' },
    { id: 'n-384', kana: 'げんだい', kanji: '現代', meaning: '現代', type: '名詞' },
    { id: 'n-385', kana: 'けんちく', kanji: '建築', meaning: '建築', type: '名詞' },
    { id: 'n-386', kana: 'けんぽう', kanji: '憲法', meaning: '憲法', type: '名詞' },
    { id: 'n-387', kana: 'けんり', kanji: '権利', meaning: '權利', type: '名詞' },
    { id: 'n-388', kana: 'げんりょう', kanji: '原料', meaning: '原料', type: '名詞' },
    { id: 'n-389', kana: 'ご', kanji: '五 / 語', meaning: '五 / 語言', type: '名詞' },
    { id: 'n-390', kana: 'こ', kanji: '子', meaning: '孩子', type: '名詞' },
    { id: 'n-391', kana: 'こい', kanji: '恋', meaning: '戀愛', type: '名詞' },
    { id: 'n-392', kana: 'こいびと', kanji: '恋人', meaning: '戀人', type: '名詞' },
    { id: 'n-393', kana: 'コイン', kanji: 'Coin', meaning: '硬幣', type: '名詞' },
    { id: 'n-394', kana: 'こううん', kanji: '幸運', meaning: '幸運', type: '名詞' },
    { id: 'n-395', kana: 'こうえん', kanji: '公園 / 講演', meaning: '公園 / 演講', type: '名詞' },
    { id: 'n-396', kana: 'こうがい', kanji: '郊外', meaning: '郊外', type: '名詞' },
    { id: 'n-397', kana: 'こうか', kanji: '効果 / 硬貨', meaning: '效果 / 硬幣', type: '名詞' },
    { id: 'n-398', kana: 'こうぎ', kanji: '講義', meaning: '講課', type: '名詞' },
    { id: 'n-399', kana: 'こうこうせい', kanji: '高校生', meaning: '高中生', type: '名詞' },
    { id: 'n-400', kana: 'こうこく', kanji: '広告', meaning: '廣告', type: '名詞' },
    { id: 'n-401', kana: 'こうこう', kanji: '高校', meaning: '高中', type: '名詞' },
    { id: 'n-402', kana: 'こうさてん', kanji: '交差点', meaning: '十字路口', type: '名詞' },
    { id: 'n-403', kana: 'こうし', kanji: '講師', meaning: '講師', type: '名詞' },
    { id: 'n-404', kana: 'こうじ', kanji: '工事', meaning: '施工', type: '名詞' },
    { id: 'n-405', kana: 'こうじょう', kanji: '工場 / 向上', meaning: '工廠 / 向上', type: '名詞' },
    { id: 'n-406', kana: 'こうすい', kanji: '香水', meaning: '香水', type: '名詞' },
    { id: 'n-407', kana: 'こうせい', kanji: '構成 / 公正', meaning: '構成 / 公正', type: '名詞' },
    { id: 'n-408', kana: 'こうそく', kanji: '高速', meaning: '高速', type: '名詞' },
    { id: 'n-409', kana: 'こうどう', kanji: '行動 / 講堂', meaning: '行動 / 講堂', type: '名詞' },
    { id: 'n-410', kana: 'こうつう', kanji: '交通', meaning: '交通', type: '名詞' },
    { id: 'n-411', kana: 'こうてい', kanji: '校庭', meaning: '校園', type: '名詞' },
    { id: 'n-412', kana: 'こうとうがっこう', kanji: '高等学校', meaning: '高級中學', type: '名詞' },
    { id: 'n-413', kana: 'こうはい', kanji: '後輩', meaning: '學弟妹', type: '名詞' },
    { id: 'n-414', kana: 'こうばん', kanji: '交番', meaning: '派出所', type: '名詞' },
    { id: 'n-415', kana: 'こうふく', kanji: '幸福', meaning: '幸福', type: '名詞' },
    { id: 'n-416', kana: 'こうほ', kanji: '候補', meaning: '候補', type: '名詞' },
    { id: 'n-417', kana: 'こうむいん', kanji: '公務員', meaning: '公務員', type: '名詞' },
    { id: 'n-418', kana: 'こうよう', kanji: '紅葉', meaning: '紅葉/楓葉', type: '名詞' },
    { id: 'n-419', kana: 'こうかいしゃ', kanji: '公会社', meaning: '公家機關/公司? (圖中為こうかいしゃ)', type: '名詞' },
    { id: 'n-420', kana: 'こうじつ', kanji: '口実', meaning: '藉口', type: '名詞' },
    { id: 'n-421', kana: 'こうしゃ', kanji: '校舎', meaning: '校舍', type: '名詞' },
    { id: 'n-422', kana: 'こうじょう', kanji: '工場', meaning: '工廠', type: '名詞' },
    { id: 'n-423', kana: 'こうすい', kanji: '香水', meaning: '香水', type: '名詞' },
    { id: 'n-424', kana: 'こうそうマンション', kanji: '高層マンション', meaning: '高層公寓', type: '名詞' },
    { id: 'n-425', kana: 'こうそくどうろ', kanji: '高速道路', meaning: '高速公路', type: '名詞' },
    { id: 'n-426', kana: 'こうたい', kanji: '交代', meaning: '輪流/替換', type: '名詞' },
    { id: 'n-427', kana: 'こうつう', kanji: '交通', meaning: '交通', type: '名詞' },
    { id: 'n-428', kana: 'こうてい', kanji: '校庭', meaning: '校園', type: '名詞' },
    { id: 'n-429', kana: 'こうどう', kanji: '講堂 / 行動', meaning: '講堂 / 行動', type: '名詞' },
    { id: 'n-430', kana: 'こうはい', kanji: '後輩', meaning: '學弟妹', type: '名詞' },
    { id: 'n-431', kana: 'こうばん', kanji: '交番', meaning: '派出所', type: '名詞' },
    { id: 'n-432', kana: 'こうひょう', kanji: '公表 / 好評', meaning: '發表 / 好評', type: '名詞' },
    { id: 'n-433', kana: 'こうむいん', kanji: '公務員', meaning: '公務員', type: '名詞' },
    { id: 'n-434', kana: 'こうよう', kanji: '紅葉', meaning: '紅葉', type: '名詞' },
    { id: 'n-435', kana: 'こえ', kanji: '声', meaning: '聲音', type: '名詞' },
    { id: 'n-436', kana: 'コース', kanji: 'Course', meaning: '路線/課程', type: '名詞' },
    { id: 'n-437', kana: 'コーナー', kanji: 'Corner', meaning: '角落', type: '名詞' },
    { id: 'n-438', kana: 'コーヒー', kanji: 'Coffee', meaning: '咖啡', type: '名詞' },
    { id: 'n-439', kana: 'コーヒーショップ', kanji: 'Coffee Shop', meaning: '咖啡店', type: '名詞' },
    { id: 'n-440', kana: 'こおり', kanji: '氷', meaning: '冰', type: '名詞' },
    { id: 'n-441', kana: 'ゴールデンウィーク', kanji: 'Golden Week', meaning: '黃金週', type: '名詞' },
    { id: 'n-442', kana: 'こがた', kanji: '小型', meaning: '小型', type: '名詞' },
    { id: 'n-443', kana: 'こぎって', kanji: '小切手', meaning: '支票', type: '名詞' },
    { id: 'n-444', kana: 'こくおう', kanji: '国王', meaning: '國王', type: '名詞' },
    { id: 'n-445', kana: 'こくさい', kanji: '国際', meaning: '國際', type: '名詞' },
    { id: 'n-446', kana: 'こくさん', kanji: '国産', meaning: '國產', type: '名詞' },
    { id: 'n-447', kana: 'こくばん', kanji: '黒板', meaning: '黑板', type: '名詞' },
    { id: 'n-448', kana: 'こくみん', kanji: '国民', meaning: '國民', type: '名詞' },
    { id: 'n-449', kana: 'こくりつ', kanji: '国立', meaning: '國立', type: '名詞' },
    { id: 'n-450', kana: 'こげちゃ', kanji: '焦げ茶', meaning: '深褐色', type: '名詞' },
    { id: 'n-451', kana: 'ここ', kanji: '-', meaning: '這裡', type: '名詞' },
    { id: 'n-452', kana: 'ごご', kanji: '午後', meaning: '下午', type: '名詞' },
    { id: 'n-453', kana: 'ここのか', kanji: '九日', meaning: '9號/9天', type: '名詞' },
    { id: 'n-454', kana: 'ここのつ', kanji: '九つ', meaning: '9個', type: '名詞' },
    { id: 'n-455', kana: 'こころ', kanji: '心', meaning: '心', type: '名詞' },
    { id: 'n-456', kana: 'こし', kanji: '腰', meaning: '腰', type: '名詞' },
    { id: 'n-457', kana: 'こ人', kanji: '個人', meaning: '個人', type: '名詞' },
    { id: 'n-458', kana: 'コスト', kanji: 'Cost', meaning: '成本', type: '名詞' },
    { id: 'n-459', kana: 'こせい', kanji: '個性', meaning: '個性', type: '名詞' },
    { id: 'n-460', kana: 'ごぜん', kanji: '午前', meaning: '上午', type: '名詞' },
    { id: 'n-461', kana: 'こそだて', kanji: '子育て', meaning: '育兒', type: '名詞' },
    { id: 'n-462', kana: 'こたえ', kanji: '答え', meaning: '答案', type: '名詞' },
    { id: 'n-463', kana: 'こたつ', kanji: '-', meaning: '日式暖桌', type: '名詞' },
    { id: 'n-464', kana: 'こっち', kanji: '-', meaning: '這邊', type: '名詞' },
    { id: 'n-465', kana: 'こつ', kanji: '-', meaning: '訣竅', type: '名詞' },
    { id: 'n-466', kana: 'こづかい', kanji: '小遣い', meaning: '零用錢', type: '名詞' },
    { id: 'n-467', kana: 'こづつみ', kanji: '小包', meaning: '包裹', type: '名詞' },
    { id: 'n-468', kana: 'こと', kanji: '事', meaning: '事情', type: '名詞' },
    { id: 'n-469', kana: 'ことし', kanji: '今年', meaning: '今年', type: '名詞' },
    { id: 'n-470', kana: 'ことば', kanji: '言葉', meaning: '語言/話語', type: '名詞' },
    { id: 'n-471', kana: 'ことばづかい', kanji: '言葉遣い', meaning: '措辭', type: '名詞' },
    { id: 'n-472', kana: 'ことり', kanji: '小鳥', meaning: '小鳥', type: '名詞' },
    { id: 'n-473', kana: 'こな', kanji: '粉', meaning: '粉末', type: '名詞' },
    { id: 'n-474', kana: 'このあいだ', kanji: 'この間', meaning: '前陣子', type: '名詞' },
    { id: 'n-475', kana: 'このごろ', kanji: 'この頃', meaning: '最近', type: '名詞' },
    { id: 'n-476', kana: 'このみ', kanji: '好み', meaning: '喜好', type: '名詞' },
    { id: 'n-477', kana: 'ごはん', kanji: 'ご飯', meaning: '飯/餐點', type: '名詞' },
    { id: 'n-478', kana: 'こぶ', kanji: '-', meaning: '腫包/瘤', type: '名詞' },
    { id: 'n-479', kana: 'こま', kanji: '独楽', meaning: '陀螺', type: '名詞' },
    { id: 'n-480', kana: 'こめ', kanji: '米', meaning: '米', type: '名詞' },
    { id: 'n-481', kana: 'ごめん', kanji: '御免', meaning: '抱歉', type: '名詞' },
    { id: 'n-482', kana: 'こや', kanji: '小屋', meaning: '小屋', type: '名詞' },
    { id: 'n-483', kana: 'こゆび', kanji: '小指', meaning: '小指', type: '名詞' },
    { id: 'n-484', kana: 'ごらく', kanji: '娯楽', meaning: '娛樂', type: '名詞' },
    { id: 'n-485', kana: 'ごらん', kanji: 'ご覧', meaning: '看 (尊敬語名詞化)', type: '名詞' },
    { id: 'n-486', kana: 'こり', kanji: '-', meaning: '僵硬 (肩膀等)', type: '名詞' },
    { id: 'n-487', kana: 'ゴリラ', kanji: 'Gorilla', meaning: '大猩猩', type: '名詞' },
    { id: 'n-488', kana: 'ゴルフ', kanji: 'Golf', meaning: '高爾夫', type: '名詞' },
    { id: 'n-489', kana: 'これ', kanji: '-', meaning: '這個', type: '名詞' },
    { id: 'n-490', kana: 'これから', kanji: '-', meaning: '今後/現在起', type: '名詞' },
    { id: 'n-491', kana: 'コレクション', kanji: 'Collection', meaning: '收藏', type: '名詞' },
    { id: 'n-492', kana: 'ころ', kanji: '頃', meaning: '時候', type: '名詞' },
    { id: 'n-493', kana: 'ころぶ', kanji: '転ぶ', meaning: '跌倒 (五段動詞-圖中未標示動詞屬性但通常為動詞)', type: '名詞' },
    { id: 'n-494', kana: 'こん', kanji: '紺', meaning: '深藍色', type: '名詞' },
    { id: 'n-495', kana: 'こんかい', kanji: '今回', meaning: '這次', type: '名詞' },
    { id: 'n-496', kana: 'こんがっき', kanji: '今学期', meaning: '這學期', type: '名詞' },
    { id: 'n-497', kana: 'こんげつ', kanji: '今月', meaning: '這個月', type: '名詞' },
    { id: 'n-498', kana: 'こんご', kanji: '今後', meaning: '今後', type: '名詞' },
    { id: 'n-499', kana: 'こんしゅう', kanji: '今週', meaning: '這週', type: '名詞' },
    { id: 'n-500', kana: 'コンサート', kanji: 'Concert', meaning: '音樂會', type: '名詞' },
    { id: 'n-501', kana: 'こんだて', kanji: '献立', meaning: '菜單', type: '名詞' },
    { id: 'n-502', kana: 'こんど', kanji: '今度', meaning: '這次/下次', type: '名詞' },
    { id: 'n-503', kana: 'こんにちは', kanji: '-', meaning: '你好', type: '名詞' },
    { id: 'n-504', kana: 'こんばん', kanji: '今晩', meaning: '今晚', type: '名詞' },
    { id: 'n-505', kana: 'コンビニ', kanji: 'Convenience Store', meaning: '便利商店', type: '名詞' },
    { id: 'n-506', kana: 'サークル', kanji: 'Circle', meaning: '社團', type: '名詞' },
    { id: 'n-507', kana: 'サービス', kanji: 'Service', meaning: '服務', type: '名詞' },
    { id: 'n-508', kana: 'さい', kanji: '才 / 際', meaning: '歲 / 時候', type: '名詞' },
    { id: 'n-509', kana: 'さいがい', kanji: '災害', meaning: '災害', type: '名詞' },
    { id: 'n-510', kana: 'さいきん', kanji: '最近', meaning: '最近', type: '名詞' },
    { id: 'n-511', kana: 'サイクル', kanji: 'Cycle', meaning: '週期/循環', type: '名詞' },
    { id: 'n-512', kana: 'さいご', kanji: '最後', meaning: '最後', type: '名詞' },
    { id: 'n-513', kana: 'さいこう', kanji: '最高', meaning: '最棒/最高', type: '名詞' },
    { id: 'n-514', kana: 'ざいこ', kanji: '在庫', meaning: '庫存', type: '名詞' },
    { id: 'n-515', kana: 'ざいさん', kanji: '財産', meaning: '財產', type: '名詞' },
    { id: 'n-516', kana: 'さいしゅう', kanji: '最終', meaning: '最終', type: '名詞' },
    { id: 'n-517', kana: 'さいじつ', kanji: '祭日', meaning: '節日', type: '名詞' },
    { id: 'n-518', kana: 'サイズ', kanji: 'Size', meaning: '尺寸', type: '名詞' },
    { id: 'n-519', kana: 'さいのう', kanji: '才能', meaning: '才能', type: '名詞' },
    { id: 'n-520', kana: 'さいばん', kanji: '裁判', meaning: '審判', type: '名詞' },
    { id: 'n-521', kana: 'さいふ', kanji: '財布', meaning: '錢包', type: '名詞' },
    { id: 'n-522', kana: 'さいほう', kanji: '裁縫', meaning: '裁縫', type: '名詞' },
    { id: 'n-523', kana: 'ざいりょう', kanji: '材料', meaning: '材料', type: '名詞' },
    { id: 'n-524', kana: 'さいわい', kanji: '幸い', meaning: '幸運/幸虧', type: '名詞' },
    { id: 'n-525', kana: 'さえ', kanji: '-', meaning: '連.../甚至...', type: '名詞' },
    { id: 'n-526', kana: 'さか', kanji: '坂', meaning: '坡', type: '名詞' },
    { id: 'n-527', kana: 'さかい', kanji: '境', meaning: '邊界/界線', type: '名詞' },
    { id: 'n-528', kana: 'さかな', kanji: '魚', meaning: '魚', type: '名詞' },
    { id: 'n-529', kana: 'さかみち', kanji: '坂道', meaning: '坡道', type: '名詞' },
    { id: 'n-530', kana: 'さき', kanji: '先', meaning: '前面/先', type: '名詞' },
    { id: 'n-531', kana: 'さぎ', kanji: '詐欺', meaning: '詐欺', type: '名詞' },
    { id: 'n-532', kana: 'さきおととい', kanji: '一昨昨日', meaning: '大前天', type: '名詞' },
    { id: 'n-533', kana: 'さきほど', kanji: '先程', meaning: '剛才', type: '名詞' },
    { id: 'n-534', kana: 'さく', kanji: '柵', meaning: '柵欄', type: '名詞' },
    { id: 'n-535', kana: 'さくしゃ', kanji: '作者', meaning: '作者', type: '名詞' },
    { id: 'n-536', kana: 'さくじつ', kanji: '昨日', meaning: '昨天', type: '名詞' },
    { id: 'n-537', kana: 'さくひん', kanji: '作品', meaning: '作品', type: '名詞' },
    { id: 'n-538', kana: 'さくぶん', kanji: '作文', meaning: '作文', type: '名詞' },
    { id: 'n-539', kana: 'さくら', kanji: '桜', meaning: '櫻花', type: '名詞' },
    { id: 'n-540', kana: 'さけ', kanji: '酒 / 鮭', meaning: '酒 / 鮭魚', type: '名詞' },
    { id: 'n-541', kana: 'さじ', kanji: '匙', meaning: '湯匙', type: '名詞' },
    { id: 'n-542', kana: 'さしみ', kanji: '刺身', meaning: '生魚片', type: '名詞' },
    { id: 'n-543', kana: 'さすが', kanji: '流石', meaning: '真不愧是', type: '名詞' },
    { id: 'n-544', kana: 'さつ', kanji: '札', meaning: '鈔票/牌子', type: '名詞' },
    { id: 'n-545', kana: 'さっか', kanji: '作家', meaning: '作家', type: '名詞' },
    { id: 'n-546', kana: 'さっき', kanji: '-', meaning: '剛才', type: '名詞' },
    { id: 'n-547', kana: 'さっきょく', kanji: '作曲', meaning: '作曲', type: '名詞' },
    { id: 'n-548', kana: 'ざっし', kanji: '雑誌', meaning: '雜誌', type: '名詞' },
    { id: 'n-549', kana: 'さっそく', kanji: '早速', meaning: '立刻/馬上', type: '名詞' },
    { id: 'n-550', kana: 'さつじん', kanji: '殺人', meaning: '殺人', type: '名詞' },
    { id: 'n-551', kana: 'ざつおん', kanji: '雑音', meaning: '雜音', type: '名詞' },
    { id: 'n-552', kana: 'さとう', kanji: '砂糖', meaning: '糖', type: '名詞' },
    { id: 'n-553', kana: 'さばく', kanji: '砂漠', meaning: '沙漠', type: '名詞' },
    { id: 'n-554', kana: 'さほう', kanji: '作法', meaning: '禮儀', type: '名詞' },
    { id: 'n-555', kana: 'さま', kanji: '様', meaning: '先生/小姐 (尊稱)', type: '名詞' },
    { id: 'n-556', kana: 'さゆう', kanji: '左右', meaning: '左右', type: '名詞' },
    { id: 'n-557', kana: 'さよう', kanji: '作用', meaning: '作用', type: '名詞' },
    { id: 'n-558', kana: 'さようなら', kanji: '-', meaning: '再見', type: '名詞' },
    { id: 'n-559', kana: 'さら', kanji: '皿', meaning: '盤子', type: '名詞' },
    { id: 'n-560', kana: 'さらいげつ', kanji: '再来月', meaning: '下下個月', type: '名詞' },
    { id: 'n-561', kana: 'さらいねん', kanji: '再来年', meaning: '後年', type: '名詞' },
    { id: 'n-562', kana: 'サラリーマン', kanji: 'Salaryman', meaning: '上班族', type: '名詞' },
    { id: 'n-563', kana: 'さわぎ', kanji: '騒ぎ', meaning: '騷動', type: '名詞' },
    { id: 'n-564', kana: 'さん', kanji: '三', meaning: '三', type: '名詞' },
    { id: 'n-565', kana: 'さんかく', kanji: '三角', meaning: '三角形', type: '名詞' },
    { id: 'n-566', kana: 'さんぎょう', kanji: '産業', meaning: '產業', type: '名詞' },
    { id: 'n-567', kana: 'さんこう', kanji: '参考', meaning: '參考', type: '名詞' },
    { id: 'n-568', kana: 'し', kanji: '四', meaning: '四', type: '名詞' },
    { id: 'n-569', kana: 'じ', kanji: '字', meaning: '字', type: '名詞' },
    { id: 'n-570', kana: 'しあい', kanji: '試合', meaning: '比賽', type: '名詞' },
    { id: 'n-571', kana: 'シーズン', kanji: 'Season', meaning: '季節', type: '名詞' },
    { id: 'n-572', kana: 'シーツ', kanji: 'Sheets', meaning: '床單', type: '名詞' },
    { id: 'n-573', kana: 'ジーンズ / ジーパン', kanji: 'Jeans', meaning: '牛仔褲', type: '名詞' },
    { id: 'n-574', kana: 'シール', kanji: 'Seal', meaning: '貼紙', type: '名詞' },
    { id: 'n-575', kana: 'しお', kanji: '塩', meaning: '鹽', type: '名詞' },
    { id: 'n-576', kana: 'しか', kanji: '鹿', meaning: '鹿', type: '名詞' },
    { id: 'n-577', kana: 'しかい', kanji: '司会 / 歯科医', meaning: '司儀 / 牙醫', type: '名詞' },
    { id: 'n-578', kana: 'しかく', kanji: '四角 / 資格', meaning: '正方形 / 資格', type: '名詞' },
    { id: 'n-579', kana: 'しかし', kanji: '-', meaning: '但是', type: '名詞' },
    { id: 'n-580', kana: 'じかん', kanji: '時間', meaning: '時間', type: '名詞' },
    { id: 'n-581', kana: 'しき', kanji: '四季 / 式', meaning: '四季 / 儀式', type: '名詞' },
    { id: 'n-582', kana: 'じき', kanji: '時期', meaning: '時期', type: '名詞' },
    { id: 'n-583', kana: 'じ', kanji: '字', meaning: '字', type: '名詞' },
    { id: 'n-584', kana: 'じ', kanji: '時', meaning: '～點', type: '名詞' },
    { id: 'n-585', kana: 'しあい', kanji: '試合', meaning: '比賽', type: '名詞' },
    { id: 'n-586', kana: 'しあわせ', kanji: '幸せ', meaning: '幸福', type: '名詞' },
    { id: 'n-587', kana: 'ジーンズ / ジーパン', kanji: 'Jeans', meaning: '牛仔褲', type: '名詞' },
    { id: 'n-588', kana: 'ジェットき', kanji: 'ジェット機', meaning: '噴射機', type: '名詞' },
    { id: 'n-589', kana: 'しお', kanji: '塩', meaning: '鹽', type: '名詞' },
    { id: 'n-590', kana: 'しか', kanji: '鹿', meaning: '鹿', type: '名詞' },
    { id: 'n-591', kana: 'じかい', kanji: '次回', meaning: '下次', type: '名詞' },
    { id: 'n-592', kana: 'しかく', kanji: '四角 / 資格', meaning: '方形 / 資格', type: '名詞' },
    { id: 'n-593', kana: 'じかん', kanji: '時間', meaning: '時間', type: '名詞' },
    { id: 'n-594', kana: 'しき', kanji: '四季 / 式', meaning: '四季 / 儀式', type: '名詞' },
    { id: 'n-595', kana: 'じき', kanji: '時期 / 磁気', meaning: '時期 / 磁性', type: '名詞' },
    { id: 'n-596', kana: 'しけん', kanji: '試験', meaning: '考試', type: '名詞' },
    { id: 'n-597', kana: 'じけん', kanji: '事件', meaning: '事件', type: '名詞' },
    { id: 'n-598', kana: 'じけんげんば', kanji: '事件現場', meaning: '案發現場', type: '名詞' },
    { id: 'n-599', kana: 'じこ', kanji: '事故', meaning: '事故', type: '名詞' },
    { id: 'n-600', kana: 'じこく', kanji: '時刻', meaning: '時刻', type: '名詞' },
    { id: 'n-601', kana: 'じこくひょう', kanji: '時刻表', meaning: '時刻表', type: '名詞' },
    { id: 'n-602', kana: 'じさつ', kanji: '自殺', meaning: '自殺', type: '名詞' },
    { id: 'n-603', kana: 'じじつ', kanji: '事実', meaning: '事實', type: '名詞' },
    { id: 'n-604', kana: 'じしょ', kanji: '辞書', meaning: '辭典', type: '名詞' },
    { id: 'n-605', kana: 'しじょう', kanji: '市場', meaning: '市場', type: '名詞' },
    { id: 'n-606', kana: 'じしん', kanji: '自信 / 地震', meaning: '自信 / 地震', type: '名詞' },
    { id: 'n-607', kana: 'しずく', kanji: '雫', meaning: '水滴', type: '名詞' },
    { id: 'n-608', kana: 'しせい', kanji: '姿勢', meaning: '姿勢', type: '名詞' },
    { id: 'n-609', kana: 'しせつ', kanji: '施設', meaning: '設施', type: '名詞' },
    { id: 'n-610', kana: 'じぜん', kanji: '事前', meaning: '事前', type: '名詞' },
    { id: 'n-611', kana: 'じぞく', kanji: '持続', meaning: '持續', type: '名詞' },
    { id: 'n-612', kana: 'した', kanji: '下 / 舌', meaning: '下面 / 舌頭', type: '名詞' },
    { id: 'n-613', kana: 'じだい', kanji: '時代', meaning: '時代', type: '名詞' },
    { id: 'n-614', kana: 'したぎ', kanji: '下着', meaning: '內衣', type: '名詞' },
    { id: 'n-615', kana: 'じたく', kanji: '自宅', meaning: '自家', type: '名詞' },
    { id: 'n-616', kana: 'しつ', kanji: '質', meaning: '品質', type: '名詞' },
    { id: 'n-617', kana: 'しつ', kanji: '室', meaning: '室/房間', type: '名詞' },
    { id: 'n-618', kana: 'しっかく', kanji: '失格', meaning: '失去資格', type: '名詞' },
    { id: 'n-619', kana: 'じっか', kanji: '実家', meaning: '老家', type: '名詞' },
    { id: 'n-620', kana: 'しっかり', kanji: '-', meaning: '牢固地/振作 (副詞)', type: '名詞' },
    { id: 'n-621', kana: 'じっさい', kanji: '実際', meaning: '實際', type: '名詞' },
    { id: 'n-622', kana: 'じっし', kanji: '実施', meaning: '實施', type: '名詞' },
    { id: 'n-623', kana: 'しつど', kanji: '湿度', meaning: '濕度', type: '名詞' },
    { id: 'n-624', kana: 'しっぽ', kanji: '尻尾', meaning: '尾巴', type: '名詞' },
    { id: 'n-625', kana: 'しつない', kanji: '室内', meaning: '室內', type: '名詞' },
    { id: 'n-626', kana: 'しつれい', kanji: '失礼', meaning: '失禮/告辭', type: '名詞' },
    { id: 'n-627', kana: 'じつりょく', kanji: '実力', meaning: '實力', type: '名詞' },
    { id: 'n-628', kana: 'してん', kanji: '支店 / 視点', meaning: '分店 / 觀點', type: '名詞' },
    { id: 'n-629', kana: 'じどう', kanji: '自動 / 児童', meaning: '自動 / 兒童', type: '名詞' },
    { id: 'n-630', kana: 'じどうしゃ', kanji: '自動車', meaning: '汽車', type: '名詞' },
    { id: 'n-631', kana: 'じどうはんばいき', kanji: '自動販売機', meaning: '自動販賣機', type: '名詞' },
    { id: 'n-632', kana: 'しな', kanji: '品', meaning: '物品', type: '名詞' },
    { id: 'n-633', kana: 'しなもの', kanji: '品物', meaning: '物品', type: '名詞' },
    { id: 'n-634', kana: 'しばらく', kanji: '暫く', meaning: '暫時 (副詞)', type: '名詞' },
    { id: 'n-635', kana: 'じぶん', kanji: '自分', meaning: '自己', type: '名詞' },
    { id: 'n-636', kana: 'しへい', kanji: '紙幣', meaning: '紙鈔', type: '名詞' },
    { id: 'n-637', kana: 'しぼう', kanji: '死亡 / 脂肪', meaning: '死亡 / 脂肪', type: '名詞' },
    { id: 'n-638', kana: 'しま', kanji: '島 / 縞', meaning: '島嶼 / 條紋', type: '名詞' },
    { id: 'n-639', kana: 'しまい', kanji: '姉妹', meaning: '姊妹', type: '名詞' },
    { id: 'n-640', kana: 'じまく', kanji: '字幕', meaning: '字幕', type: '名詞' },
    { id: 'n-641', kana: 'しめい', kanji: '氏名', meaning: '姓名', type: '名詞' },
    { id: 'n-642', kana: 'しめん', kanji: '紙面', meaning: '版面/報刊版面', type: '名詞' },
    { id: 'n-643', kana: 'じむ', kanji: '事務', meaning: '事務/行政', type: '名詞' },
    { id: 'n-644', kana: 'しもん', kanji: '指紋', meaning: '指紋', type: '名詞' },
    { id: 'n-645', kana: 'しゃかい', kanji: '社会', meaning: '社會', type: '名詞' },
    { id: 'n-646', kana: 'しゃしん', kanji: '写真', meaning: '照片', type: '名詞' },
    { id: 'n-647', kana: 'しゃしょう', kanji: '車掌', meaning: '列車長', type: '名詞' },
    { id: 'n-648', kana: 'シャツ', kanji: 'Shirt', meaning: '襯衫', type: '名詞' },
    { id: 'n-649', kana: 'しゃちょう', kanji: '社長', meaning: '社長', type: '名詞' },
    { id: 'n-650', kana: 'シャッター', kanji: 'Shutter', meaning: '快門/鐵捲門', type: '名詞' },
    { id: 'n-651', kana: 'しゃりん', kanji: '車輪', meaning: '車輪', type: '名詞' },
    { id: 'n-652', kana: 'しゃれ', kanji: '洒落', meaning: '玩笑/時髦', type: '名詞' },
    { id: 'n-653', kana: 'シャワー', kanji: 'Shower', meaning: '淋浴', type: '名詞' },
    { id: 'n-654', kana: 'ジャンケン', kanji: 'Janken', meaning: '猜拳', type: '名詞' },
    { id: 'n-655', kana: 'シャンプー', kanji: 'Shampoo', meaning: '洗髮精', type: '名詞' },
    { id: 'n-656', kana: 'しゅう', kanji: '週', meaning: '週', type: '名詞' },
    { id: 'n-657', kana: 'じゅう', kanji: '十 / 銃', meaning: '十 / 槍', type: '名詞' },
    { id: 'n-658', kana: 'しゅうかん', kanji: '週間 / 習慣', meaning: '一週 / 習慣', type: '名詞' },
    { id: 'n-659', kana: 'じゅうしょ', kanji: '住所', meaning: '地址', type: '名詞' },
    { id: 'n-660', kana: 'ジュース', kanji: 'Juice', meaning: '果汁', type: '名詞' },
    { id: 'n-661', kana: 'じゅうどう', kanji: '柔道', meaning: '柔道', type: '名詞' },
    { id: 'n-662', kana: 'しゅみ', kanji: '趣味', meaning: '興趣', type: '名詞' },
    { id: 'n-663', kana: 'じゅみょう', kanji: '寿命', meaning: '壽命', type: '名詞' },
    { id: 'n-664', kana: 'しゅやく', kanji: '主役', meaning: '主角', type: '名詞' },
    { id: 'n-665', kana: 'しゅるい', kanji: '種類', meaning: '種類', type: '名詞' },
    { id: 'n-666', kana: 'じゅん', kanji: '順', meaning: '順序', type: '名詞' },
    { id: 'n-667', kana: 'じゅんばん', kanji: '順番', meaning: '輪流/順序', type: '名詞' },
    { id: 'n-668', kana: 'じゅんび', kanji: '準備', meaning: '準備', type: '名詞' },
    { id: 'n-669', kana: 'しょう', kanji: '賞', meaning: '獎賞', type: '名詞' },
    { id: 'n-670', kana: 'しょうがくきん', kanji: '奨学金', meaning: '獎學金', type: '名詞' },
    { id: 'n-671', kana: 'しょうがくせい', kanji: '小学生', meaning: '小學生', type: '名詞' },
    { id: 'n-672', kana: 'しょうがっこう', kanji: '小学校', meaning: '小學', type: '名詞' },
    { id: 'n-673', kana: 'しょうがつ', kanji: '正月', meaning: '新年', type: '名詞' },
    { id: 'n-674', kana: 'しょうがない', kanji: '仕様がない', meaning: '沒辦法 (慣用語)', type: '名詞' },
    { id: 'n-675', kana: 'しょうぎ', kanji: '将棋', meaning: '將棋', type: '名詞' },
    { id: 'n-676', kana: 'じょうきゃく', kanji: '乗客', meaning: '乘客', type: '名詞' },
    { id: 'n-677', kana: 'じょうきょう', kanji: '状況', meaning: '狀況', type: '名詞' },
    { id: 'n-678', kana: 'しょうぎょう', kanji: '商業', meaning: '商業', type: '名詞' },
    { id: 'n-679', kana: 'じょうくう', kanji: '上空', meaning: '上空', type: '名詞' },
    { id: 'n-680', kana: 'しょうこ', kanji: '証拠', meaning: '證據', type: '名詞' },
    { id: 'n-681', kana: 'しょうご', kanji: '正午', meaning: '正午', type: '名詞' },
    { id: 'n-682', kana: 'しょうじ', kanji: '障子', meaning: '紙拉門', type: '名詞' },
    { id: 'n-683', kana: 'しょうじょ', kanji: '少女', meaning: '少女', type: '名詞' },
    { id: 'n-684', kana: 'じょうし', kanji: '上司', meaning: '上司', type: '名詞' },
    { id: 'n-685', kana: 'しょうせつ', kanji: '小説', meaning: '小說', type: '名詞' },
    { id: 'n-686', kana: 'じょうたい', kanji: '状態', meaning: '狀態', type: '名詞' },
    { id: 'n-687', kana: 'しょうてんがい', kanji: '商店街', meaning: '商店街', type: '名詞' },
    { id: 'n-688', kana: 'じょうとう', kanji: '上等', meaning: '上等/高級', type: '名詞' },
    { id: 'n-689', kana: 'しょうねん', kanji: '少年', meaning: '少年', type: '名詞' },
    { id: 'n-690', kana: 'しょうはい', kanji: '勝敗', meaning: '勝敗', type: '名詞' },
    { id: 'n-691', kana: 'しょうひん', kanji: '商品 / 賞品', meaning: '商品 / 獎品', type: '名詞' },
    { id: 'n-692', kana: 'しょうひぜい', kanji: '消費税', meaning: '消費稅', type: '名詞' },
    { id: 'n-693', kana: 'しょうぼう', kanji: '消防', meaning: '消防', type: '名詞' },
    { id: 'n-694', kana: 'しょうゆ', kanji: '醤油', meaning: '醬油', type: '名詞' },
    { id: 'n-695', kana: 'しょうらい', kanji: '将来', meaning: '將來', type: '名詞' },
    { id: 'n-696', kana: 'しょくたく', kanji: '食卓', meaning: '餐桌', type: '名詞' },
    { id: 'n-697', kana: 'しょくどう', kanji: '食堂', meaning: '餐廳', type: '名詞' },
    { id: 'n-698', kana: 'しょくぶつ', kanji: '植物', meaning: '植物', type: '名詞' },
    { id: 'n-699', kana: 'しょくもつ', kanji: '食物', meaning: '食物', type: '名詞' },
    { id: 'n-700', kana: 'しょくよく', kanji: '食欲', meaning: '食慾', type: '名詞' },
    { id: 'n-701', kana: 'しょくりょう', kanji: '食料', meaning: '食糧', type: '名詞' },
    { id: 'n-702', kana: 'しょくりょうひん', kanji: '食料品', meaning: '食品', type: '名詞' },
    { id: 'n-703', kana: 'じょし', kanji: '女子', meaning: '女子/助詞', type: '名詞' },
    { id: 'n-704', kana: 'じょじょに', kanji: '徐々に', meaning: '徐徐地/漸漸地 (副詞)', type: '名詞' },
    { id: 'n-705', kana: 'じょしゅ', kanji: '助手', meaning: '助手', type: '名詞' },
    { id: 'n-706', kana: 'じょせい', kanji: '女性', meaning: '女性', type: '名詞' },
    { id: 'n-707', kana: 'しょせき', kanji: '書籍', meaning: '書籍', type: '名詞' },
    { id: 'n-708', kana: 'しょっき', kanji: '食器', meaning: '餐具', type: '名詞' },
    { id: 'n-709', kana: 'ジョギング', kanji: 'Jogging', meaning: '慢跑', type: '名詞' },
    { id: 'n-710', kana: 'しり', kanji: '尻', meaning: '屁股', type: '名詞' },
    { id: 'n-711', kana: 'しりあい', kanji: '知り合い', meaning: '熟人', type: '名詞' },
    { id: 'n-712', kana: 'シリーズ', kanji: 'Series', meaning: '系列', type: '名詞' },
    { id: 'n-713', kana: 'しる', kanji: '汁', meaning: '湯汁', type: '名詞' },
    { id: 'n-714', kana: 'しろ', kanji: '城 / 白', meaning: '城堡 / 白色', type: '名詞' },
    { id: 'n-715', kana: 'しわくちゃ', kanji: '皺苦茶', meaning: '皺巴巴的', type: '名詞' },
    { id: 'n-716', kana: 'しん', kanji: '芯', meaning: '筆芯/核心', type: '名詞' },
    { id: 'n-717', kana: 'しんがっき', kanji: '新学期', meaning: '新學期', type: '名詞' },
    { id: 'n-718', kana: 'しんかんせん', kanji: '新幹線', meaning: '新幹線', type: '名詞' },
    { id: 'n-719', kana: 'しんごう', kanji: '信号', meaning: '紅綠燈/號誌', type: '名詞' },
    { id: 'n-720', kana: 'しんこん', kanji: '新婚', meaning: '新婚', type: '名詞' },
    { id: 'n-721', kana: 'じんこう', kanji: '人口', meaning: '人口', type: '名詞' },
    { id: 'n-722', kana: 'じんじゃ', kanji: '神社', meaning: '神社', type: '名詞' },
    { id: 'n-723', kana: 'しんしつ', kanji: '寝室', meaning: '臥室', type: '名詞' },
    { id: 'n-724', kana: 'しんぞう', kanji: '心臓', meaning: '心臟', type: '名詞' },
    { id: 'n-725', kana: 'しんたい', kanji: '身体', meaning: '身體', type: '名詞' },
    { id: 'n-726', kana: 'しんちょう', kanji: '身長', meaning: '身高', type: '名詞' },
    { id: 'n-727', kana: 'しんぶん', kanji: '新聞', meaning: '報紙', type: '名詞' },
    { id: 'n-728', kana: 'しんや', kanji: '深夜', meaning: '深夜', type: '名詞' },
    { id: 'n-729', kana: 'しんりん', kanji: '森林', meaning: '森林', type: '名詞' },
    { id: 'n-730', kana: 'しんるい', kanji: '親類', meaning: '親戚', type: '名詞' },
    { id: 'n-731', kana: 'じんるい', kanji: '人類', meaning: '人類', type: '名詞' },
    { id: 'n-732', kana: 'しょちゅう', kanji: '暑中', meaning: '盛夏', type: '名詞' },
    { id: 'n-733', kana: 'ショップ', kanji: 'Shop', meaning: '商店', type: '名詞' },
    { id: 'n-734', kana: 'しらが', kanji: '白髪', meaning: '白髮', type: '名詞' },
    { id: 'n-735', kana: 'シリーズ', kanji: 'Series', meaning: '系列', type: '名詞' },
    { id: 'n-736', kana: 'しりつ', kanji: '市立 / 私立', meaning: '市立 / 私立', type: '名詞' },
    { id: 'n-737', kana: 'しりょう', kanji: '資料', meaning: '資料', type: '名詞' },
    { id: 'n-738', kana: 'しる', kanji: '汁', meaning: '湯汁', type: '名詞' },
    { id: 'n-739', kana: 'しん', kanji: '芯', meaning: '筆芯', type: '名詞' },
    { id: 'n-740', kana: 'しんり', kanji: '心理', meaning: '心理', type: '名詞' },
    { id: 'n-741', kana: 'しんりじょうたい', kanji: '心理状態', meaning: '心理狀態', type: '名詞' },
    { id: 'n-742', kana: 'しんろ', kanji: '進路', meaning: '出路/前進方向', type: '名詞' },
    { id: 'n-743', kana: 'しんるい', kanji: '親類', meaning: '親戚 (圖中為親類)', type: '名詞' },
    { id: 'n-744', kana: 'しわ', kanji: '皺', meaning: '皺紋', type: '名詞' },
    { id: 'n-745', kana: 'しんさつけん', kanji: '診察券', meaning: '掛號證', type: '名詞' },
    { id: 'n-746', kana: 'しんさつじかん', kanji: '診察時間', meaning: '看診時間', type: '名詞' },
    { id: 'n-747', kana: 'しんしふく', kanji: '紳士服', meaning: '男裝', type: '名詞' },
    { id: 'n-748', kana: 'しんしゃ', kanji: '新車', meaning: '新車', type: '名詞' },
    { id: 'n-749', kana: 'しんせき', kanji: '親戚', meaning: '親戚', type: '名詞' },
    { id: 'n-750', kana: 'しんぞう', kanji: '心臓', meaning: '心臟', type: '名詞' },
    { id: 'n-751', kana: 'しんちょう', kanji: '身長', meaning: '身高', type: '名詞' },
    { id: 'n-752', kana: 'じ', kanji: '字', meaning: '字', type: '名詞' },
    { id: 'n-753', kana: 'じ', kanji: '時', meaning: '～點', type: '名詞' },
    { id: 'n-754', kana: 'しあい', kanji: '試合', meaning: '比賽', type: '名詞' },
    { id: 'n-755', kana: 'しあわせ', kanji: '幸せ', meaning: '幸福', type: '名詞' },
    { id: 'n-756', kana: 'ジーンズ / ジーパン', kanji: 'Jeans', meaning: '牛仔褲', type: '名詞' },
    { id: 'n-757', kana: 'ジェットき', kanji: 'ジェット機', meaning: '噴射機', type: '名詞' },
    { id: 'n-758', kana: 'しお', kanji: '塩', meaning: '鹽', type: '名詞' },
    { id: 'n-759', kana: 'しか', kanji: '鹿', meaning: '鹿', type: '名詞' },
    { id: 'n-760', kana: 'じかい', kanji: '次回', meaning: '下次', type: '名詞' },
    { id: 'n-761', kana: 'しかく', kanji: '四角 / 資格', meaning: '方形 / 資格', type: '名詞' },
    { id: 'n-762', kana: 'じかん', kanji: '時間', meaning: '時間', type: '名詞' },
    { id: 'n-763', kana: 'しき', kanji: '四季 / 式', meaning: '四季 / 儀式', type: '名詞' },
    { id: 'n-764', kana: 'じき', kanji: '時期 / 磁気', meaning: '時期 / 磁性', type: '名詞' },
    { id: 'n-765', kana: 'しけん', kanji: '試験', meaning: '考試', type: '名詞' },
    { id: 'n-766', kana: 'じけん', kanji: '事件', meaning: '事件', type: '名詞' },
    { id: 'n-767', kana: 'じけんげんば', kanji: '事件現場', meaning: '案發現場', type: '名詞' },
    { id: 'n-768', kana: 'じこ', kanji: '事故', meaning: '事故', type: '名詞' },
    { id: 'n-769', kana: 'じこく', kanji: '時刻', meaning: '時刻', type: '名詞' },
    { id: 'n-770', kana: 'じこくひょう', kanji: '時刻表', meaning: '時刻表', type: '名詞' },
    { id: 'n-771', kana: 'じさつ', kanji: '自殺', meaning: '自殺', type: '名詞' },
    { id: 'n-772', kana: 'じじつ', kanji: '事実', meaning: '事實', type: '名詞' },
    { id: 'n-773', kana: 'じしょ', kanji: '辞書', meaning: '辭典', type: '名詞' },
    { id: 'n-774', kana: 'しじょう', kanji: '市場', meaning: '市場', type: '名詞' },
    { id: 'n-775', kana: 'じしん', kanji: '自信 / 地震', meaning: '自信 / 地震', type: '名詞' },
    { id: 'n-776', kana: 'しずく', kanji: '雫', meaning: '水滴', type: '名詞' },
    { id: 'n-777', kana: 'しせい', kanji: '姿勢', meaning: '姿勢', type: '名詞' },
    { id: 'n-778', kana: 'しせつ', kanji: '施設', meaning: '設施', type: '名詞' },
    { id: 'n-779', kana: 'じぜん', kanji: '事前', meaning: '事前', type: '名詞' },
    { id: 'n-780', kana: 'じぞく', kanji: '持続', meaning: '持續', type: '名詞' },
    { id: 'n-781', kana: 'した', kanji: '下 / 舌', meaning: '下面 / 舌頭', type: '名詞' },
    { id: 'n-782', kana: 'じだい', kanji: '時代', meaning: '時代', type: '名詞' },
    { id: 'n-783', kana: 'したぎ', kanji: '下着', meaning: '內衣', type: '名詞' },
    { id: 'n-784', kana: 'じたく', kanji: '自宅', meaning: '自家', type: '名詞' },
    { id: 'n-785', kana: 'しつ', kanji: '質', meaning: '品質', type: '名詞' },
    { id: 'n-786', kana: 'しつ', kanji: '室', meaning: '室/房間', type: '名詞' },
    { id: 'n-787', kana: 'しっかく', kanji: '失格', meaning: '失去資格', type: '名詞' },
    { id: 'n-788', kana: 'じっか', kanji: '実家', meaning: '老家', type: '名詞' },
    { id: 'n-789', kana: 'しっかり', kanji: '-', meaning: '牢固地/振作 (副詞)', type: '名詞' },
    { id: 'n-790', kana: 'じっさい', kanji: '実際', meaning: '實際', type: '名詞' },
    { id: 'n-791', kana: 'じっし', kanji: '実施', meaning: '實施', type: '名詞' },
    { id: 'n-792', kana: 'しつど', kanji: '湿度', meaning: '濕度', type: '名詞' },
    { id: 'n-793', kana: 'しっぽ', kanji: '尻尾', meaning: '尾巴', type: '名詞' },
    { id: 'n-794', kana: 'しつない', kanji: '室内', meaning: '室內', type: '名詞' },
    { id: 'n-795', kana: 'しつれい', kanji: '失礼', meaning: '失禮/告辭', type: '名詞' },
    { id: 'n-796', kana: 'じつりょく', kanji: '実力', meaning: '實力', type: '名詞' },
    { id: 'n-797', kana: 'してん', kanji: '支店 / 視点', meaning: '分店 / 觀點', type: '名詞' },
    { id: 'n-798', kana: 'じどう', kanji: '自動 / 児童', meaning: '自動 / 兒童', type: '名詞' },
    { id: 'n-799', kana: 'じどうしゃ', kanji: '自動車', meaning: '汽車', type: '名詞' },
    { id: 'n-800', kana: 'じどうはんばいき', kanji: '自動販売機', meaning: '自動販賣機', type: '名詞' },
    { id: 'n-801', kana: 'しな', kanji: '品', meaning: '物品', type: '名詞' },
    { id: 'n-802', kana: 'しなもの', kanji: '品物', meaning: '物品', type: '名詞' },
    { id: 'n-803', kana: 'しばらく', kanji: '暫く', meaning: '暫時 (副詞)', type: '名詞' },
    { id: 'n-804', kana: 'じぶん', kanji: '自分', meaning: '自己', type: '名詞' },
    { id: 'n-805', kana: 'しへい', kanji: '紙幣', meaning: '紙鈔', type: '名詞' },
    { id: 'n-806', kana: 'しぼう', kanji: '死亡 / 脂肪', meaning: '死亡 / 脂肪', type: '名詞' },
    { id: 'n-807', kana: 'しま', kanji: '島 / 縞', meaning: '島嶼 / 條紋', type: '名詞' },
    { id: 'n-808', kana: 'しまい', kanji: '姉妹', meaning: '姊妹', type: '名詞' },
    { id: 'n-809', kana: 'じまく', kanji: '字幕', meaning: '字幕', type: '名詞' },
    { id: 'n-810', kana: 'しめい', kanji: '氏名', meaning: '姓名', type: '名詞' },
    { id: 'n-811', kana: 'しめん', kanji: '紙面', meaning: '版面/報刊版面', type: '名詞' },
    { id: 'n-812', kana: 'じむ', kanji: '事務', meaning: '事務/行政', type: '名詞' },
    { id: 'n-813', kana: 'しもん', kanji: '指紋', meaning: '指紋', type: '名詞' },
    { id: 'n-814', kana: 'しゃかい', kanji: '社会', meaning: '社會', type: '名詞' },
    { id: 'n-815', kana: 'しゃしん', kanji: '写真', meaning: '照片', type: '名詞' },
    { id: 'n-816', kana: 'しゃしょう', kanji: '車掌', meaning: '列車長', type: '名詞' },
    { id: 'n-817', kana: 'シャツ', kanji: 'Shirt', meaning: '襯衫', type: '名詞' },
    { id: 'n-818', kana: 'しゃちょう', kanji: '社長', meaning: '社長', type: '名詞' },
    { id: 'n-819', kana: 'シャッター', kanji: 'Shutter', meaning: '快門/鐵捲門', type: '名詞' },
    { id: 'n-820', kana: 'しゃりん', kanji: '車輪', meaning: '車輪', type: '名詞' },
    { id: 'n-821', kana: 'しゃれ', kanji: '洒落', meaning: '玩笑/時髦', type: '名詞' },
    { id: 'n-822', kana: 'シャワー', kanji: 'Shower', meaning: '淋浴', type: '名詞' },
    { id: 'n-823', kana: 'ジャンケン', kanji: 'Janken', meaning: '猜拳', type: '名詞' },
    { id: 'n-824', kana: 'シャンプー', kanji: 'Shampoo', meaning: '洗髮精', type: '名詞' },
    { id: 'n-825', kana: 'しゅう', kanji: '週', meaning: '週', type: '名詞' },
    { id: 'n-826', kana: 'じゅう', kanji: '十 / 銃', meaning: '十 / 槍', type: '名詞' },
    { id: 'n-827', kana: 'しゅうかん', kanji: '週間 / 習慣', meaning: '一週 / 習慣', type: '名詞' },
    { id: 'n-828', kana: 'じゅうしょ', kanji: '住所', meaning: '地址', type: '名詞' },
    { id: 'n-829', kana: 'ジュース', kanji: 'Juice', meaning: '果汁', type: '名詞' },
    { id: 'n-830', kana: 'じゅうどう', kanji: '柔道', meaning: '柔道', type: '名詞' },
    { id: 'n-831', kana: 'しゅみ', kanji: '趣味', meaning: '興趣', type: '名詞' },
    { id: 'n-832', kana: 'じゅみょう', kanji: '寿命', meaning: '壽命', type: '名詞' },
    { id: 'n-833', kana: 'しゅやく', kanji: '主役', meaning: '主角', type: '名詞' },
    { id: 'n-834', kana: 'しゅるい', kanji: '種類', meaning: '種類', type: '名詞' },
    { id: 'n-835', kana: 'じゅん', kanji: '順', meaning: '順序', type: '名詞' },
    { id: 'n-836', kana: 'じゅんばん', kanji: '順番', meaning: '輪流/順序', type: '名詞' },
    { id: 'n-837', kana: 'じゅんび', kanji: '準備', meaning: '準備', type: '名詞' },
    { id: 'n-838', kana: 'しょう', kanji: '賞', meaning: '獎賞', type: '名詞' },
    { id: 'n-839', kana: 'しょうがくきん', kanji: '奨学金', meaning: '獎學金', type: '名詞' },
    { id: 'n-840', kana: 'しょうがくせい', kanji: '小学生', meaning: '小學生', type: '名詞' },
    { id: 'n-841', kana: 'しょうがっこう', kanji: '小学校', meaning: '小學', type: '名詞' },
    { id: 'n-842', kana: 'しょうがつ', kanji: '正月', meaning: '新年', type: '名詞' },
    { id: 'n-843', kana: 'しょうがない', kanji: '仕様がない', meaning: '沒辦法 (慣用語)', type: '名詞' },
    { id: 'n-844', kana: 'しょうぎ', kanji: '将棋', meaning: '將棋', type: '名詞' },
    { id: 'n-845', kana: 'じょうきゃく', kanji: '乗客', meaning: '乘客', type: '名詞' },
    { id: 'n-846', kana: 'じょうきょう', kanji: '状況', meaning: '狀況', type: '名詞' },
    { id: 'n-847', kana: 'しょうぎょう', kanji: '商業', meaning: '商業', type: '名詞' },
    { id: 'n-848', kana: 'じょうくう', kanji: '上空', meaning: '上空', type: '名詞' },
    { id: 'n-849', kana: 'しょうこ', kanji: '証拠', meaning: '證據', type: '名詞' },
    { id: 'n-850', kana: 'しょうご', kanji: '正午', meaning: '正午', type: '名詞' },
    { id: 'n-851', kana: 'しょうじ', kanji: '障子', meaning: '紙拉門', type: '名詞' },
    { id: 'n-852', kana: 'しょうじょ', kanji: '少女', meaning: '少女', type: '名詞' },
    { id: 'n-853', kana: 'じょうし', kanji: '上司', meaning: '上司', type: '名詞' },
    { id: 'n-854', kana: 'しょうせつ', kanji: '小説', meaning: '小說', type: '名詞' },
    { id: 'n-855', kana: 'じょうたい', kanji: '状態', meaning: '狀態', type: '名詞' },
    { id: 'n-856', kana: 'しょうてんがい', kanji: '商店街', meaning: '商店街', type: '名詞' },
    { id: 'n-857', kana: 'じょうとう', kanji: '上等', meaning: '上等/高級', type: '名詞' },
    { id: 'n-858', kana: 'しょうねん', kanji: '少年', meaning: '少年', type: '名詞' },
    { id: 'n-859', kana: 'しょうはい', kanji: '勝敗', meaning: '勝敗', type: '名詞' },
    { id: 'n-860', kana: 'しょうひん', kanji: '商品 / 賞品', meaning: '商品 / 獎品', type: '名詞' },
    { id: 'n-861', kana: 'しょうひぜい', kanji: '消費税', meaning: '消費稅', type: '名詞' },
    { id: 'n-862', kana: 'しょうぼう', kanji: '消防', meaning: '消防', type: '名詞' },
    { id: 'n-863', kana: 'しょうゆ', kanji: '醤油', meaning: '醬油', type: '名詞' },
    { id: 'n-864', kana: 'しょうらい', kanji: '将来', meaning: '將來', type: '名詞' },
    { id: 'n-865', kana: 'しょくたく', kanji: '食卓', meaning: '餐桌', type: '名詞' },
    { id: 'n-866', kana: 'しょくどう', kanji: '食堂', meaning: '餐廳', type: '名詞' },
    { id: 'n-867', kana: 'しょくぶつ', kanji: '植物', meaning: '植物', type: '名詞' },
    { id: 'n-868', kana: 'しょくもつ', kanji: '食物', meaning: '食物', type: '名詞' },
    { id: 'n-869', kana: 'しょくよく', kanji: '食欲', meaning: '食慾', type: '名詞' },
    { id: 'n-870', kana: 'しょくりょう', kanji: '食料', meaning: '食糧', type: '名詞' },
    { id: 'n-871', kana: 'しょくりょうひん', kanji: '食料品', meaning: '食品', type: '名詞' },
    { id: 'n-872', kana: 'じょし', kanji: '女子', meaning: '女子/助詞', type: '名詞' },
    { id: 'n-873', kana: 'じょじょに', kanji: '徐々に', meaning: '徐徐地/漸漸地 (副詞)', type: '名詞' },
    { id: 'n-874', kana: 'じょしゅ', kanji: '助手', meaning: '助手', type: '名詞' },
    { id: 'n-875', kana: 'じょせい', kanji: '女性', meaning: '女性', type: '名詞' },
    { id: 'n-876', kana: 'しょせき', kanji: '書籍', meaning: '書籍', type: '名詞' },
    { id: 'n-877', kana: 'しょっき', kanji: '食器', meaning: '餐具', type: '名詞' },
    { id: 'n-878', kana: 'ジョギング', kanji: 'Jogging', meaning: '慢跑', type: '名詞' },
    { id: 'n-879', kana: 'しり', kanji: '尻', meaning: '屁股', type: '名詞' },
    { id: 'n-880', kana: 'しりあい', kanji: '知り合い', meaning: '熟人', type: '名詞' },
    { id: 'n-881', kana: 'シリーズ', kanji: 'Series', meaning: '系列', type: '名詞' },
    { id: 'n-882', kana: 'しる', kanji: '汁', meaning: '湯汁', type: '名詞' },
    { id: 'n-883', kana: 'しろ', kanji: '城 / 白', meaning: '城堡 / 白色', type: '名詞' },
    { id: 'n-884', kana: 'しわくちゃ', kanji: '皺苦茶', meaning: '皺巴巴的', type: '名詞' },
    { id: 'n-885', kana: 'しん', kanji: '芯', meaning: '筆芯/核心', type: '名詞' },
    { id: 'n-886', kana: 'しんがっき', kanji: '新学期', meaning: '新學期', type: '名詞' },
    { id: 'n-887', kana: 'しんかんせん', kanji: '新幹線', meaning: '新幹線', type: '名詞' },
    { id: 'n-888', kana: 'しんごう', kanji: '信号', meaning: '紅綠燈/號誌', type: '名詞' },
    { id: 'n-889', kana: 'しんこん', kanji: '新婚', meaning: '新婚', type: '名詞' },
    { id: 'n-890', kana: 'じんこう', kanji: '人口', meaning: '人口', type: '名詞' },
    { id: 'n-891', kana: 'じんじゃ', kanji: '神社', meaning: '神社', type: '名詞' },
    { id: 'n-892', kana: 'しんしつ', kanji: '寝室', meaning: '臥室', type: '名詞' },
    { id: 'n-893', kana: 'しんぞう', kanji: '心臓', meaning: '心臟', type: '名詞' },
    { id: 'n-894', kana: 'しんたい', kanji: '身体', meaning: '身體', type: '名詞' },
    { id: 'n-895', kana: 'しんちょう', kanji: '身長', meaning: '身高', type: '名詞' },
    { id: 'n-896', kana: 'しんぶん', kanji: '新聞', meaning: '報紙', type: '名詞' },
    { id: 'n-897', kana: 'しんや', kanji: '深夜', meaning: '深夜', type: '名詞' },
    { id: 'n-898', kana: 'しんりん', kanji: '森林', meaning: '森林', type: '名詞' },
    { id: 'n-899', kana: 'しんるい', kanji: '親類', meaning: '親戚', type: '名詞' },
    { id: 'n-900', kana: 'じんるい', kanji: '人類', meaning: '人類', type: '名詞' },
    { id: 'n-901', kana: 'す', kanji: '酢', meaning: '醋', type: '名詞' },
    { id: 'n-902', kana: 'すいえい', kanji: '水泳', meaning: '游泳', type: '名詞' },
    { id: 'n-903', kana: 'すいぞくかん', kanji: '水族館', meaning: '水族館', type: '名詞' },
    { id: 'n-904', kana: 'スイッチ', kanji: 'Switch', meaning: '開關', type: '名詞' },
    { id: 'n-905', kana: 'すいはんき', kanji: '炊飯器', meaning: '電鍋', type: '名詞' },
    { id: 'n-906', kana: 'すいぶん', kanji: '水分', meaning: '水分', type: '名詞' },
    { id: 'n-907', kana: 'すいみん', kanji: '睡眠', meaning: '睡眠', type: '名詞' },
    { id: 'n-908', kana: 'すいみんじかん', kanji: '睡眠時間', meaning: '睡眠時間', type: '名詞' },
    { id: 'n-909', kana: 'すいみんぶそく', kanji: '睡眠不足', meaning: '睡眠不足', type: '名詞' },
    { id: 'n-910', kana: 'すう', kanji: '数', meaning: '數字/幾...', type: '名詞' },
    { id: 'n-911', kana: 'すうかい', kanji: '数回', meaning: '數次', type: '名詞' },
    { id: 'n-912', kana: 'すうがく', kanji: '数学', meaning: '數學', type: '名詞' },
    { id: 'n-913', kana: 'すうじ', kanji: '数字', meaning: '數字', type: '名詞' },
    { id: 'n-914', kana: 'スーツケース', kanji: 'Suitcase', meaning: '行李箱', type: '名詞' },
    { id: 'n-915', kana: 'すうねん', kanji: '数年', meaning: '數年', type: '名詞' },
    { id: 'n-916', kana: 'すえっこ', kanji: '末っ子', meaning: '老么', type: '名詞' },
    { id: 'n-917', kana: 'スカーフ', kanji: 'Scarf', meaning: '圍巾/領巾', type: '名詞' },
    { id: 'n-918', kana: 'スカイツリー', kanji: 'Skytree', meaning: '晴空塔', type: '名詞' },
    { id: 'n-919', kana: 'すがた', kanji: '姿', meaning: '姿態/樣子', type: '名詞' },
    { id: 'n-920', kana: 'すこし', kanji: '少し', meaning: '一點點 (副詞/名詞)', type: '名詞' },
    { id: 'n-921', kana: 'すそ', kanji: '裾', meaning: '衣擺/褲管', type: '名詞' },
    { id: 'n-922', kana: 'すっかり', kanji: '-', meaning: '完全地 (副詞)', type: '名詞' },
    { id: 'n-923', kana: 'ずっと', kanji: '-', meaning: '一直 (副詞)', type: '名詞' },
    { id: 'n-924', kana: 'ステーキ', kanji: 'Steak', meaning: '牛排', type: '名詞' },
    { id: 'n-925', kana: 'ストレス', kanji: 'Stress', meaning: '壓力', type: '名詞' },
    { id: 'n-926', kana: 'すな', kanji: '砂', meaning: '沙子', type: '名詞' },
    { id: 'n-927', kana: 'スピード', kanji: 'Speed', meaning: '速度', type: '名詞' },
    { id: 'n-928', kana: 'スピードいはん', kanji: 'スピード違反', meaning: '超速', type: '名詞' },
    { id: 'n-929', kana: 'すべて', kanji: '全て', meaning: '全部', type: '名詞' },
    { id: 'n-930', kana: 'スポーツ', kanji: 'Sports', meaning: '運動', type: '名詞' },
    { id: 'n-931', kana: 'スポーツウェア', kanji: 'Sportswear', meaning: '運動服', type: '名詞' },
    { id: 'n-932', kana: 'すまい', kanji: '住まい', meaning: '住所', type: '名詞' },
    { id: 'n-933', kana: 'スマイル', kanji: 'Smile', meaning: '微笑', type: '名詞' },
    { id: 'n-934', kana: 'すみません', kanji: '済みません', meaning: '對不起/不好意思', type: '名詞' },
    { id: 'n-935', kana: 'スリ', kanji: '-', meaning: '扒手', type: '名詞' },
    { id: 'n-936', kana: 'せい', kanji: '背', meaning: '身高/背部', type: '名詞' },
    { id: 'n-937', kana: 'せいかく', kanji: '性格', meaning: '性格', type: '名詞' },
    { id: 'n-938', kana: 'せいかつ', kanji: '生活', meaning: '生活', type: '名詞' },
    { id: 'n-939', kana: 'せいかつひ', kanji: '生活費', meaning: '生活費', type: '名詞' },
    { id: 'n-940', kana: 'せいきゅうしょ', kanji: '請求書', meaning: '請款單', type: '名詞' },
    { id: 'n-941', kana: 'ぜいきん', kanji: '税金', meaning: '稅金', type: '名詞' },
    { id: 'n-942', kana: 'せいじ', kanji: '政治', meaning: '政治', type: '名詞' },
    { id: 'n-943', kana: 'せいじか', kanji: '政治家', meaning: '政治家', type: '名詞' },
    { id: 'n-944', kana: 'せいしん', kanji: '精神', meaning: '精神', type: '名詞' },
    { id: 'n-945', kana: 'せいじん', kanji: '成人', meaning: '成人', type: '名詞' },
    { id: 'n-946', kana: 'せいじんのひ', kanji: '成人の日', meaning: '成人之日', type: '名詞' },
    { id: 'n-947', kana: 'せいせき', kanji: '成績', meaning: '成績', type: '名詞' },
    { id: 'n-948', kana: 'せいと', kanji: '生徒', meaning: '學生 (國高中)', type: '名詞' },
    { id: 'n-949', kana: 'せいねん', kanji: '青年 / 成年', meaning: '青年 / 成年', type: '名詞' },
    { id: 'n-950', kana: 'せいふ', kanji: '政府', meaning: '政府', type: '名詞' },
    { id: 'n-951', kana: 'せいふく', kanji: '制服', meaning: '制服', type: '名詞' },
    { id: 'n-952', kana: 'せいぶつ', kanji: '生物', meaning: '生物', type: '名詞' },
    { id: 'n-953', kana: 'せいめいほけん', kanji: '生命保険', meaning: '人壽保險', type: '名詞' },
    { id: 'n-954', kana: 'せいれき', kanji: '西暦', meaning: '西元', type: '名詞' },
    { id: 'n-955', kana: 'せいり', kanji: '整理 / 生理', meaning: '整理 / 生理', type: '名詞' },
    { id: 'n-956', kana: 'せき', kanji: '席 / 咳', meaning: '座位 / 咳嗽', type: '名詞' },
    { id: 'n-957', kana: 'せきにん', kanji: '責任', meaning: '責任', type: '名詞' },
    { id: 'n-958', kana: 'セット', kanji: 'Set', meaning: '套餐/組', type: '名詞' },
    { id: 'n-959', kana: 'ぜったい', kanji: '絶対', meaning: '絕對', type: '名詞' },
    { id: 'n-960', kana: 'ぜったいに', kanji: '絶対に', meaning: '絕對 (副詞)', type: '名詞' },
    { id: 'n-961', kana: 'ゼミ', kanji: 'Seminar', meaning: '研討會/專題討論', type: '名詞' },
    { id: 'n-962', kana: 'ぜひ', kanji: '是非', meaning: '務必 (副詞)', type: '名詞' },
    { id: 'n-963', kana: 'ぜん', kanji: '善 / 全', meaning: '善 / 全', type: '名詞' },
    { id: 'n-964', kana: 'ぜんいん', kanji: '全員', meaning: '全員', type: '名詞' },
    { id: 'n-965', kana: 'ぜんこく', kanji: '全国', meaning: '全國', type: '名詞' },
    { id: 'n-966', kana: 'ぜんご', kanji: '前後', meaning: '前後', type: '名詞' },
    { id: 'n-967', kana: 'ぜんじつ', kanji: '前日', meaning: '前一天', type: '名詞' },
    { id: 'n-968', kana: 'ぜんしん', kanji: '全身', meaning: '全身', type: '名詞' },
    { id: 'n-969', kana: 'せんせい', kanji: '先生', meaning: '老師/醫生', type: '名詞' },
    { id: 'n-970', kana: 'ぜんぜん', kanji: '全然', meaning: '完全(不) (副詞)', type: '名詞' },
    { id: 'n-971', kana: 'せんたくき', kanji: '洗濯機', meaning: '洗衣機', type: '名詞' },
    { id: 'n-972', kana: 'せんたくもの', kanji: '洗濯物', meaning: '洗好的衣服', type: '名詞' },
    { id: 'n-973', kana: 'センチ', kanji: 'Centimeter', meaning: '公分', type: '名詞' },
    { id: 'n-974', kana: 'ぜんたい', kanji: '全体', meaning: '全體', type: '名詞' },
    { id: 'n-975', kana: 'せんぱい', kanji: '先輩', meaning: '前輩', type: '名詞' },
    { id: 'n-976', kana: 'ぜんぶ', kanji: '全部', meaning: '全部', type: '名詞' },
    { id: 'n-977', kana: 'せんもん', kanji: '専門', meaning: '專業', type: '名詞' },
    { id: 'n-978', kana: 'せんもんか', kanji: '専門家', meaning: '專家', type: '名詞' },
    { id: 'n-979', kana: 'せんよう', kanji: '専用', meaning: '專用', type: '名詞' },
    { id: 'n-980', kana: 'せんろ', kanji: '線路', meaning: '鐵軌', type: '名詞' },
    { id: 'n-981', kana: 'せん', kanji: '千', meaning: '千', type: '名詞' },
    { id: 'n-982', kana: 'そう', kanji: '象', meaning: '大象', type: '名詞' },
    { id: 'n-983', kana: 'ぞうきん', kanji: '雑巾', meaning: '抹布', type: '名詞' },
    { id: 'n-984', kana: 'そうこ', kanji: '倉庫', meaning: '倉庫', type: '名詞' },
    { id: 'n-985', kana: 'そうじ', kanji: '掃除', meaning: '打掃', type: '名詞' },
    { id: 'n-986', kana: 'そうじき', kanji: '掃除機', meaning: '吸塵器', type: '名詞' },
    { id: 'n-987', kana: 'そうしき', kanji: '葬式', meaning: '葬禮', type: '名詞' },
    { id: 'n-988', kana: 'そうしん', kanji: '送信', meaning: '寄信/發送', type: '名詞' },
    { id: 'n-989', kana: 'そうたい', kanji: '早退', meaning: '早退', type: '名詞' },
    { id: 'n-990', kana: 'そうだん', kanji: '相談', meaning: '商量', type: '名詞' },
    { id: 'n-991', kana: 'そうりだいじん', kanji: '総理大臣', meaning: '總理大臣', type: '名詞' },
    { id: 'n-992', kana: 'そうりょう', kanji: '送料', meaning: '運費', type: '名詞' },
    { id: 'n-993', kana: 'そくたつ', kanji: '速達', meaning: '限時信', type: '名詞' },
    { id: 'n-994', kana: 'そくど', kanji: '速度', meaning: '速度', type: '名詞' },
    { id: 'n-995', kana: 'そこ', kanji: '底', meaning: '底部', type: '名詞' },
    { id: 'n-996', kana: 'そちら', kanji: '-', meaning: '那邊 (敬語)', type: '名詞' },
    { id: 'n-997', kana: 'そっち', kanji: '-', meaning: '那邊', type: '名詞' },
    { id: 'n-998', kana: 'そと', kanji: '外', meaning: '外面', type: '名詞' },
    { id: 'n-999', kana: 'そとがわ', kanji: '外側', meaning: '外側', type: '名詞' },
    { id: 'n-1000', kana: 'そのた / そのほか', kanji: 'その他', meaning: '其他', type: '名詞' },
    { id: 'n-1001', kana: 'そば', kanji: '側 / 蕎麦', meaning: '旁邊 / 蕎麥麵', type: '名詞' },
    { id: 'n-1002', kana: 'そふ', kanji: '祖父', meaning: '祖父', type: '名詞' },
    { id: 'n-1003', kana: 'そぼ', kanji: '祖母', meaning: '祖母', type: '名詞' },
    { id: 'n-1004', kana: 'そら', kanji: '空', meaning: '天空', type: '名詞' },
    { id: 'n-1005', kana: 'それ', kanji: '-', meaning: '那個', type: '名詞' },
    { id: 'n-1006', kana: 'それから', kanji: '-', meaning: '然後', type: '名詞' },
    { id: 'n-1007', kana: 'それぞれ', kanji: '-', meaning: '各個/分別', type: '名詞' },
    { id: 'n-1008', kana: 'そろばん', kanji: '算盤', meaning: '算盤', type: '名詞' },
    { id: 'n-1009', kana: 'そん', kanji: '損', meaning: '損失', type: '名詞' },
    { id: 'n-1010', kana: 'そんけい', kanji: '尊敬', meaning: '尊敬', type: '名詞' },
    { id: 'n-1011', kana: 'だい', kanji: '題 / 台', meaning: '題目 / 台 (量詞)', type: '名詞' },
    { id: 'n-1012', kana: 'たいいく', kanji: '体育', meaning: '體育', type: '名詞' },
    { id: 'n-1013', kana: 'だいいち', kanji: '第一', meaning: '第一', type: '名詞' },
    { id: 'n-1014', kana: 'たいオンけい', kanji: '体温計', meaning: '體溫計', type: '名詞' },
    { id: 'n-1015', kana: 'たいかい', kanji: '大会', meaning: '大會', type: '名詞' },
    { id: 'n-1016', kana: 'たいがく', kanji: '退学', meaning: '退學', type: '名詞' },
    { id: 'n-1017', kana: 'だいがく', kanji: '大学', meaning: '大學', type: '名詞' },
    { id: 'n-1018', kana: 'だいがくいん', kanji: '大学院', meaning: '研究所', type: '名詞' },
    { id: 'n-1019', kana: 'だいがくせい', kanji: '大学生', meaning: '大學生', type: '名詞' },
    { id: 'n-1020', kana: 'たいきん', kanji: '大金', meaning: '鉅款', type: '名詞' },
    { id: 'n-1021', kana: 'だいく', kanji: '大工', meaning: '木匠', type: '名詞' },
    { id: 'n-1022', kana: 'たいぐう', kanji: '待遇', meaning: '待遇', type: '名詞' },
    { id: 'n-1023', kana: 'たいけん', kanji: '体験', meaning: '體驗', type: '名詞' },
    { id: 'n-1024', kana: 'たいこ', kanji: '太鼓', meaning: '太鼓', type: '名詞' },
    { id: 'n-1025', kana: 'たいザイ', kanji: '滞在', meaning: '逗留', type: '名詞' },
    { id: 'n-1026', kana: 'たいしかん', kanji: '大使館', meaning: '大使館', type: '名詞' },
    { id: 'n-1027', kana: 'たいした', kanji: '-', meaning: '了不起的 (連體詞)', type: '名詞' },
    { id: 'n-1028', kana: 'だいじょうぶ', kanji: '大丈夫', meaning: '沒問題', type: '名詞' },
    { id: 'n-1029', kana: 'たいじゅう', kanji: '体重', meaning: '體重', type: '名詞' },
    { id: 'n-1030', kana: 'たいじゅうけい', kanji: '体重計', meaning: '體重計', type: '名詞' },
    { id: 'n-1031', kana: 'たいしょう', kanji: '対象', meaning: '對象', type: '名詞' },
    { id: 'n-1032', kana: 'だいじょ', kanji: '解除', meaning: '解除 (可能是だいじょ？圖不清，依前後文推測)', type: '名詞' },
    { id: 'n-1033', kana: 'だいず', kanji: '大豆', meaning: '大豆', type: '名詞' },
    { id: 'n-1034', kana: 'たいせき', kanji: '体積', meaning: '體積', type: '名詞' },
    { id: 'n-1035', kana: 'たいそう', kanji: '体操', meaning: '體操', type: '名詞' },
    { id: 'n-1036', kana: 'だいたい', kanji: '大体', meaning: '大致上', type: '名詞' },
    { id: 'n-1037', kana: 'だいどころ', kanji: '台所', meaning: '廚房', type: '名詞' },
    { id: 'n-1038', kana: 'たいのう', kanji: '滞納', meaning: '滯納', type: '名詞' },
    { id: 'n-1039', kana: 'だいひょう', kanji: '代表', meaning: '代表', type: '名詞' },
    { id: 'n-1040', kana: 'だいぶ', kanji: '大分', meaning: '相當 (副詞)', type: '名詞' },
    { id: 'n-1041', kana: 'たいふう', kanji: '台風', meaning: '颱風', type: '名詞' },
    { id: 'n-1042', kana: 'たいへいよう', kanji: '太平洋', meaning: '太平洋', type: '名詞' },
    { id: 'n-1043', kana: 'タイヤ', kanji: 'Tire', meaning: '輪胎', type: '名詞' },
    { id: 'n-1044', kana: 'たいよう', kanji: '太陽', meaning: '太陽', type: '名詞' },
    { id: 'n-1045', kana: 'たいら', kanji: '平ら', meaning: '平坦', type: '名詞' },
    { id: 'n-1046', kana: 'だいり', kanji: '代理', meaning: '代理', type: '名詞' },
    { id: 'n-1047', kana: 'タイル', kanji: 'Tile', meaning: '磁磚', type: '名詞' },
    { id: 'n-1048', kana: 'たうえ', kanji: '田植え', meaning: '插秧', type: '名詞' },
    { id: 'n-1049', kana: 'たおる', kanji: 'タオル', meaning: '毛巾', type: '名詞' },
    { id: 'n-1050', kana: 'たがい', kanji: '互い', meaning: '互相', type: '名詞' },
    { id: 'n-1051', kana: 'たから', kanji: '宝', meaning: '寶物', type: '名詞' },
    { id: 'n-1052', kana: 'たからくじ', kanji: '宝くじ', meaning: '彩券', type: '名詞' },
    { id: 'n-1053', kana: 'だから', kanji: '-', meaning: '所以 (接續詞)', type: '名詞' },
    { id: 'n-1054', kana: 'たくはいびん', kanji: '宅配便', meaning: '宅配', type: '名詞' },
    { id: 'n-1055', kana: 'たくあん', kanji: '-', meaning: '醃蘿蔔', type: '名詞' },
    { id: 'n-1056', kana: 'タクシー', kanji: 'Taxi', meaning: '計程車', type: '名詞' },
    { id: 'n-1057', kana: 'だけ', kanji: '-', meaning: '只有 (副助詞)', type: '名詞' },
    { id: 'n-1058', kana: 'たけ', kanji: '竹', meaning: '竹子', type: '名詞' },
    { id: 'n-1059', kana: 'たこ', kanji: '蛸 / 凧', meaning: '章魚 / 風箏', type: '名詞' },
    { id: 'n-1060', kana: 'たしか', kanji: '-', meaning: '好像是/大概 (副詞)', type: '名詞' },
    { id: 'n-1061', kana: 'たしょう', kanji: '多少', meaning: '多少', type: '名詞' },
    { id: 'n-1062', kana: 'だしん', kanji: '打診', meaning: '探詢', type: '名詞' },
    { id: 'n-1063', kana: 'たす', kanji: '多数', meaning: '多數', type: '名詞' },
    { id: 'n-1064', kana: 'たずねる', kanji: '訪ねる', meaning: '拜訪', type: '名詞' },
    { id: 'n-1065', kana: 'ただ', kanji: '只', meaning: '免費/普通', type: '名詞' },
    { id: 'n-1066', kana: 'ただいま', kanji: '-', meaning: '我回來了', type: '名詞' },
    { id: 'n-1067', kana: 'たたかい', kanji: '戦い', meaning: '戰鬥', type: '名詞' },
    { id: 'n-1068', kana: 'たたみ', kanji: '畳', meaning: '榻榻米', type: '名詞' },
    { id: 'n-1069', kana: 'たち', kanji: '達', meaning: '們 (複數)', type: '名詞' },
    { id: 'n-1070', kana: 'たちば', kanji: '立場', meaning: '立場', type: '名詞' },
    { id: 'n-1071', kana: 'たっきゅう', kanji: '卓球', meaning: '桌球', type: '名詞' },
    { id: 'n-1072', kana: 'だっしゅつ', kanji: '脱出', meaning: '逃出', type: '名詞' },
    { id: 'n-1073', kana: 'たて', kanji: '縦', meaning: '直/縱', type: '名詞' },
    { id: 'n-1074', kana: 'たてもの', kanji: '建物', meaning: '建築物', type: '名詞' },
    { id: 'n-1075', kana: 'たな', kanji: '棚', meaning: '架子', type: '名詞' },
    { id: 'n-1076', kana: 'たに', kanji: '谷', meaning: '山谷', type: '名詞' },
    { id: 'n-1077', kana: 'たにん', kanji: '他人', meaning: '他人/別人', type: '名詞' },
    { id: 'n-1078', kana: 'たね', kanji: '種', meaning: '種子', type: '名詞' },
    { id: 'n-1079', kana: 'たば', kanji: '束', meaning: '束/把', type: '名詞' },
    { id: 'n-1080', kana: 'たばこ', kanji: '煙草', meaning: '香菸', type: '名詞' },
    { id: 'n-1081', kana: 'たび', kanji: '旅', meaning: '旅行', type: '名詞' },
    { id: 'n-1082', kana: 'たびたび', kanji: '度々', meaning: '屢次 (副詞)', type: '名詞' },
    { id: 'n-1083', kana: 'たぶん', kanji: '多分', meaning: '大概 (副詞)', type: '名詞' },
    { id: 'n-1084', kana: 'たま', kanji: '玉 / 球', meaning: '球/彈珠', type: '名詞' },
    { id: 'n-1085', kana: 'たま', kanji: '偶', meaning: '偶爾', type: '名詞' },
    { id: 'n-1086', kana: 'たまご', kanji: '卵', meaning: '蛋', type: '名詞' },
    { id: 'n-1087', kana: 'たまねぎ', kanji: '玉ねぎ', meaning: '洋蔥', type: '名詞' },
    { id: 'n-1088', kana: 'たまたま', kanji: '偶々', meaning: '偶然 (副詞)', type: '名詞' },
    { id: 'n-1089', kana: 'たまに', kanji: '偶に', meaning: '偶爾 (副詞)', type: '名詞' },
    { id: 'n-1090', kana: 'ため', kanji: '為', meaning: '為了/原因', type: '名詞' },
    { id: 'n-1091', kana: 'だめ', kanji: '駄目', meaning: '不行/沒用', type: '名詞' },
    { id: 'n-1092', kana: 'ためいき', kanji: '溜息', meaning: '嘆氣', type: '名詞' },
    { id: 'n-1093', kana: 'たより', kanji: '便り', meaning: '信/消息', type: '名詞' },
    { id: 'n-1094', kana: 'たんい', kanji: '単位', meaning: '單位', type: '名詞' },
    { id: 'n-1095', kana: 'たんカー', kanji: 'Tanker', meaning: '油輪', type: '名詞' },
    { id: 'n-1096', kana: 'だんかい', kanji: '段階', meaning: '階段', type: '名詞' },
    { id: 'n-1097', kana: 'たんご', kanji: '単語', meaning: '單字', type: '名詞' },
    { id: 'n-1098', kana: 'たんさん', kanji: '炭酸', meaning: '碳酸', type: '名詞' },
    { id: 'n-1099', kana: 'だんし', kanji: '男子', meaning: '男子', type: '名詞' },
    { id: 'n-1100', kana: 'たんじょうび', kanji: '誕生日', meaning: '生日', type: '名詞' },
    { id: 'n-1101', kana: 'だんすい', kanji: '断水', meaning: '停水', type: '名詞' },
    { id: 'n-1102', kana: 'だんせい', kanji: '男性', meaning: '男性', type: '名詞' },
    { id: 'n-1103', kana: 'だんたい', kanji: '団体', meaning: '團體', type: '名詞' },
    { id: 'n-1104', kana: 'だんだん', kanji: '段々', meaning: '逐漸 (副詞)', type: '名詞' },
    { id: 'n-1105', kana: 'たんち', kanji: '探知', meaning: '探知', type: '名詞' },
    { id: 'n-1106', kana: 'だんち', kanji: '団地', meaning: '住宅區', type: '名詞' },
    { id: 'n-1107', kana: 'たんとう', kanji: '担当', meaning: '擔任/負責', type: '名詞' },
    { id: 'n-1108', kana: 'たんなる', kanji: '単なる', meaning: '單純的 (連體詞)', type: '名詞' },
    { id: 'n-1109', kana: 'だんボール', kanji: '段ボール', meaning: '紙箱', type: '名詞' },
    { id: 'n-1110', kana: 'ち', kanji: '血 / 地', meaning: '血 / 地', type: '名詞' },
    { id: 'n-1111', kana: 'ち', kanji: '知', meaning: '知識/智慧', type: '名詞' },
    { id: 'n-1112', kana: 'チーム', kanji: 'Team', meaning: '隊伍', type: '名詞' },
    { id: 'n-1113', kana: 'チームワーク', kanji: 'Teamwork', meaning: '團隊合作', type: '名詞' },
    { id: 'n-1114', kana: 'ちエ', kanji: '知恵', meaning: '智慧', type: '名詞' },
    { id: 'n-1115', kana: 'チェーン', kanji: 'Chain', meaning: '連鎖店/鏈條', type: '名詞' },
    { id: 'n-1116', kana: 'ちか', kanji: '地下', meaning: '地下', type: '名詞' },
    { id: 'n-1117', kana: 'ちかい', kanji: '誓い', meaning: '誓言', type: '名詞' },
    { id: 'n-1118', kana: 'ちかく', kanji: '近く', meaning: '附近', type: '名詞' },
    { id: 'n-1119', kana: 'ちかてつ', kanji: '地下鉄', meaning: '地下鐵', type: '名詞' },
    { id: 'n-1120', kana: 'ちから', kanji: '力', meaning: '力量', type: '名詞' },
    { id: 'n-1121', kana: 'ちキュウ', kanji: '地球', meaning: '地球', type: '名詞' },
    { id: 'n-1122', kana: 'ちク', kanji: '地区', meaning: '地區', type: '名詞' },
    { id: 'n-1123', kana: 'ちく', kanji: '知育', meaning: '智育', type: '名詞' },
    { id: 'n-1124', kana: 'ちこく', kanji: '遅刻', meaning: '遲到', type: '名詞' },
    { id: 'n-1125', kana: 'ちじ', kanji: '知事', meaning: '知事 (縣長)', type: '名詞' },
    { id: 'n-1126', kana: 'ちしき', kanji: '知識', meaning: '知識', type: '名詞' },
    { id: 'n-1127', kana: 'ちじん', kanji: '知人', meaning: '熟人', type: '名詞' },
    { id: 'n-1128', kana: 'ち図', kanji: '地図', meaning: '地圖', type: '名詞' },
    { id: 'n-1129', kana: 'ちチ', kanji: '父', meaning: '父親', type: '名詞' },
    { id: 'n-1130', kana: 'ちつじょ', kanji: '秩序', meaning: '秩序', type: '名詞' },
    { id: 'n-1131', kana: 'チップ', kanji: 'Tip', meaning: '小費', type: '名詞' },
    { id: 'n-1132', kana: 'ちのう', kanji: '知能', meaning: '智能', type: '名詞' },
    { id: 'n-1133', kana: 'ちへいせん', kanji: '地平線', meaning: '地平線', type: '名詞' },
    { id: 'n-1134', kana: 'ちほう', kanji: '地方', meaning: '地方', type: '名詞' },
    { id: 'n-1135', kana: 'ちゃ', kanji: '茶', meaning: '茶', type: '名詞' },
    { id: 'n-1136', kana: 'ちゃわん', kanji: '茶碗', meaning: '茶碗/碗', type: '名詞' },
    { id: 'n-1137', kana: 'チャンス', kanji: 'Chance', meaning: '機會', type: '名詞' },
    { id: 'n-1138', kana: 'ちゃんとした', kanji: '-', meaning: '規矩的/正經的', type: '名詞' },
    { id: 'n-1139', kana: 'ちゃんと', kanji: '-', meaning: '好好地 (副詞)', type: '名詞' },
    { id: 'n-1140', kana: 'ちゅう', kanji: '中', meaning: '裡面/正在...中', type: '名詞' },
    { id: 'n-1141', kana: 'ちゅうおう', kanji: '中央', meaning: '中央', type: '名詞' },
    { id: 'n-1142', kana: 'ちゅうがくせい', kanji: '中学生', meaning: '國中生', type: '名詞' },
    { id: 'n-1143', kana: 'ちゅうがっこう', kanji: '中学校', meaning: '國中', type: '名詞' },
    { id: 'n-1144', kana: 'ちゅうかん', kanji: '中間', meaning: '中間', type: '名詞' },
    { id: 'n-1145', kana: 'ちゅうきゅう', kanji: '中級', meaning: '中級', type: '名詞' },
    { id: 'n-1146', kana: 'ちゅうこ', kanji: '中古', meaning: '中古/二手', type: '名詞' },
    { id: 'n-1147', kana: 'ちゅうごく', kanji: '中国', meaning: '中國', type: '名詞' },
    { id: 'n-1148', kana: 'ちゅうしん', kanji: '中心', meaning: '中心', type: '名詞' },
    { id: 'n-1149', kana: 'ちゅうねん', kanji: '中年', meaning: '中年', type: '名詞' },
    { id: 'n-1150', kana: 'ちゅうもく', kanji: '注目', meaning: '注目', type: '名詞' },
    { id: 'n-1151', kana: 'ちョーク', kanji: 'Chalk', meaning: '粉筆', type: '名詞' },
    { id: 'n-1152', kana: 'ちょう', kanji: '町 / 腸', meaning: '城鎮 / 腸', type: '名詞' },
    { id: 'n-1153', kana: 'ちょう', kanji: '兆', meaning: '兆', type: '名詞' },
    { id: 'n-1154', kana: 'ちょう', kanji: '超', meaning: '超...', type: '名詞' },
    { id: 'n-1155', kana: 'ちょうかん', kanji: '朝刊', meaning: '早報', type: '名詞' },
    { id: 'n-1156', kana: 'ちょうき', kanji: '長期', meaning: '長期', type: '名詞' },
    { id: 'n-1157', kana: 'ちょうさ', kanji: '調査', meaning: '調查', type: '名詞' },
    { id: 'n-1158', kana: 'ちょうし', kanji: '調子', meaning: '狀況/語調', type: '名詞' },
    { id: 'n-1159', kana: 'ちょうしょ', kanji: '長所', meaning: '長處', type: '名詞' },
    { id: 'n-1160', kana: 'ちょうジョ', kanji: '長女', meaning: '長女', type: '名詞' },
    { id: 'n-1161', kana: 'ちょう食', kanji: '朝食', meaning: '早餐', type: '名詞' },
    { id: 'n-1162', kana: 'ちょうせつ', kanji: '調節', meaning: '調節', type: '名詞' },
    { id: 'n-1163', kana: 'ちょうせん', kanji: '挑戦', meaning: '挑戰', type: '名詞' },
    { id: 'n-1164', kana: 'ちょうてん', kanji: '頂点', meaning: '頂點', type: '名詞' },
    { id: 'n-1165', kana: 'ちょうど', kanji: '丁度', meaning: '剛好 (副詞)', type: '名詞' },
    { id: 'n-1166', kana: 'ちょうなん', kanji: '長男', meaning: '長男', type: '名詞' },
    { id: 'n-1167', kana: 'ちょうほうけい', kanji: '長方形', meaning: '長方形', type: '名詞' },
    { id: 'n-1168', kana: 'ちょうみりょう', kanji: '調味料', meaning: '調味料', type: '名詞' },
    { id: 'n-1169', kana: 'ちょきん', kanji: '貯金', meaning: '存款', type: '名詞' },
    { id: 'n-1170', kana: 'ちょくご', kanji: '直後', meaning: '之後立刻', type: '名詞' },
    { id: 'n-1171', kana: 'ちょくせつ', kanji: '直接', meaning: '直接', type: '名詞' },
    { id: 'n-1172', kana: 'ちょくぜん', kanji: '直前', meaning: '之前立刻', type: '名詞' },
    { id: 'n-1173', kana: 'チョコ', kanji: 'Choco', meaning: '巧克力', type: '名詞' },
    { id: 'n-1174', kana: 'ちょっと', kanji: '一寸', meaning: '稍微/一下 (副詞)', type: '名詞' },
    { id: 'n-1175', kana: 'ちり', kanji: '地理 / 塵', meaning: '地理 / 灰塵', type: '名詞' },
    { id: 'n-1176', kana: 'ちり紙', kanji: '塵紙', meaning: '衛生紙', type: '名詞' },
    { id: 'n-1177', kana: 'つい', kanji: '対', meaning: '一對', type: '名詞' },
    { id: 'n-1178', kana: 'つい', kanji: '-', meaning: '不知不覺 (副詞)', type: '名詞' },
    { id: 'n-1179', kana: 'ついたち', kanji: '一日', meaning: '一號 (日期)', type: '名詞' },
    { id: 'n-1180', kana: 'つうか', kanji: '通貨 / 通過', meaning: '貨幣 / 通過', type: '名詞' },
    { id: 'n-1181', kana: 'つうやく', kanji: '通訳', meaning: '口譯', type: '名詞' },
    { id: 'n-1182', kana: 'つか', kanji: '柄', meaning: '刀柄/把手', type: '名詞' },
    { id: 'n-1183', kana: 'つかい', kanji: '使い', meaning: '使用/差遣', type: '名詞' },
    { id: 'n-1184', kana: 'つき', kanji: '月', meaning: '月/月亮', type: '名詞' },
    { id: 'n-1185', kana: 'つきあたり', kanji: '突き当たり', meaning: '盡頭', type: '名詞' },
    { id: 'n-1186', kana: 'つぎ', kanji: '次', meaning: '下一個', type: '名詞' },
    { id: 'n-1187', kana: 'つくえ', kanji: '机', meaning: '桌子', type: '名詞' },
    { id: 'n-1188', kana: 'つごう', kanji: '都合', meaning: '方便/狀況', type: '名詞' },
    { id: 'n-1189', kana: 'つち', kanji: '土', meaning: '土', type: '名詞' },
    { id: 'n-1190', kana: 'つな', kanji: '綱', meaning: '繩子', type: '名詞' },
    { id: 'n-1191', kana: 'つなみ', kanji: '津波', meaning: '海嘯', type: '名詞' },
    { id: 'n-1192', kana: 'つねに', kanji: '常に', meaning: '總是 (副詞)', type: '名詞' },
    { id: 'n-1193', kana: 'つの', kanji: '角', meaning: '角', type: '名詞' },
    { id: 'n-1194', kana: 'つば', kanji: '唾', meaning: '口水', type: '名詞' },
    { id: 'n-1195', kana: 'つばさ', kanji: '翼', meaning: '翅膀', type: '名詞' },
    { id: 'n-1196', kana: 'つま', kanji: '妻', meaning: '妻子', type: '名詞' },
    { id: 'n-1197', kana: 'つまり', kanji: '詰まり', meaning: '也就是說 (接續詞)', type: '名詞' },
    { id: 'n-1198', kana: 'つみ', kanji: '罪', meaning: '罪', type: '名詞' },
    { id: 'n-1199', kana: 'つめ', kanji: '爪', meaning: '指甲', type: '名詞' },
    { id: 'n-1200', kana: 'つもり', kanji: '積もり', meaning: '打算', type: '名詞' },
    { id: 'n-1201', kana: 'つゆ', kanji: '梅雨', meaning: '梅雨', type: '名詞' },
    { id: 'n-1202', kana: 'つよみ', kanji: '強み', meaning: '強項/優點', type: '名詞' },
    { id: 'n-1203', kana: 'つり', kanji: '釣り', meaning: '釣魚', type: '名詞' },
    { id: 'n-1204', kana: 'つりかわ', kanji: '吊り革', meaning: '吊環 (電車等)', type: '名詞' },
    { id: 'n-1205', kana: 'とう', kanji: '十 / 塔', meaning: '十 / 塔', type: '名詞' },
    { id: 'n-1206', kana: 'とう', kanji: '党', meaning: '黨', type: '名詞' },
    { id: 'n-1207', kana: 'どうぐ', kanji: '道具', meaning: '道具/工具', type: '名詞' },
    { id: 'n-1208', kana: 'とうげ', kanji: '峠', meaning: '山頂/難關', type: '名詞' },
    { id: 'n-1209', kana: 'どうさ', kanji: '動作', meaning: '動作', type: '名詞' },
    { id: 'n-1210', kana: 'とうじ', kanji: '当時', meaning: '當時', type: '名詞' },
    { id: 'n-1211', kana: 'どうし', kanji: '動詞', meaning: '動詞', type: '名詞' },
    { id: 'n-1212', kana: 'どうじ', kanji: '同時', meaning: '同時', type: '名詞' },
    { id: 'n-1213', kana: 'どうして', kanji: '-', meaning: '為什麼 (副詞)', type: '名詞' },
    { id: 'n-1214', kana: 'とうじつ', kanji: '当日', meaning: '當日', type: '名詞' },
    { id: 'n-1215', kana: 'とうしょ', kanji: '投書', meaning: '投稿', type: '名詞' },
    { id: 'n-1216', kana: 'とうちゃく', kanji: '到着', meaning: '抵達', type: '名詞' },
    { id: 'n-1217', kana: 'どうぶつ', kanji: '動物', meaning: '動物', type: '名詞' },
    { id: 'n-1218', kana: 'どうぶつえん', kanji: '動物園', meaning: '動物園', type: '名詞' },
    { id: 'n-1219', kana: 'とうふ', kanji: '豆腐', meaning: '豆腐', type: '名詞' },
    { id: 'n-1220', kana: 'どうも', kanji: '-', meaning: '實在/非常/謝謝 (副詞)', type: '名詞' },
    { id: 'n-1221', kana: 'どうよう', kanji: '同様', meaning: '同樣', type: '名詞' },
    { id: 'n-1222', kana: 'どうりょう', kanji: '同僚', meaning: '同事', type: '名詞' },
    { id: 'n-1223', kana: 'どうろ', kanji: '道路', meaning: '道路', type: '名詞' },
    { id: 'n-1224', kana: 'とお', kanji: '十', meaning: '十', type: '名詞' },
    { id: 'n-1225', kana: 'とおく', kanji: '遠く', meaning: '遠處', type: '名詞' },
    { id: 'n-1226', kana: 'とおり', kanji: '通り', meaning: '街道/馬路', type: '名詞' },
    { id: 'n-1227', kana: 'とかい', kanji: '都会', meaning: '都會', type: '名詞' },
    { id: 'n-1228', kana: 'とき', kanji: '時', meaning: '時候', type: '名詞' },
    { id: 'n-1229', kana: 'どきどき', kanji: '-', meaning: '心跳加速 (擬聲詞)', type: '名詞' },
    { id: 'n-1230', kana: 'とく', kanji: '得', meaning: '划算/利益', type: '名詞' },
    { id: 'n-1231', kana: 'どく', kanji: '毒', meaning: '毒', type: '名詞' },
    { id: 'n-1232', kana: 'どク身', kanji: '独身', meaning: '單身', type: '名詞' },
    { id: 'n-1233', kana: 'とくちょう', kanji: '特徴', meaning: '特徵', type: '名詞' },
    { id: 'n-1234', kana: 'とくてい', kanji: '特定', meaning: '特定', type: '名詞' },
    { id: 'n-1235', kana: 'とくべつ', kanji: '特別', meaning: '特別', type: '名詞' },
    { id: 'n-1236', kana: 'とけい', kanji: '時計', meaning: '時鐘/手錶', type: '名詞' },
    { id: 'n-1237', kana: 'どこ', kanji: '-', meaning: '哪裡', type: '名詞' },
    { id: 'n-1238', kana: 'ところ', kanji: '所', meaning: '地方', type: '名詞' },
    { id: 'n-1239', kana: 'とし', kanji: '年 / 都市', meaning: '年 / 都市', type: '名詞' },
    { id: 'n-1240', kana: 'としより', kanji: '年寄り', meaning: '老人', type: '名詞' },
    { id: 'n-1241', kana: 'としょかん', kanji: '図書館', meaning: '圖書館', type: '名詞' },
    { id: 'n-1242', kana: 'とちゅう', kanji: '途中', meaning: '途中', type: '名詞' },
    { id: 'n-1243', kana: 'とっきゅう', kanji: '特急', meaning: '特急列車', type: '名詞' },
    { id: 'n-1244', kana: 'トップ', kanji: 'Top', meaning: '頂端/首位', type: '名詞' },
    { id: 'n-1245', kana: 'どなた', kanji: '何方', meaning: '哪位 (尊敬語)', type: '名詞' },
    { id: 'n-1246', kana: 'となり', kanji: '隣', meaning: '隔壁/鄰居', type: '名詞' },
    { id: 'n-1247', kana: 'どの', kanji: '-', meaning: '哪個 (連體詞)', type: '名詞' },
    { id: 'n-1248', kana: 'とばこ', kanji: '-', meaning: '(可能是たばこ的誤植?)', type: '名詞' },
    { id: 'n-1249', kana: 'とびら', kanji: '扉', meaning: '門扉', type: '名詞' },
    { id: 'n-1250', kana: 'トマト', kanji: 'Tomato', meaning: '番茄', type: '名詞' },
    { id: 'n-1251', kana: 'ともだち', kanji: '友達', meaning: '朋友', type: '名詞' },
    { id: 'n-1252', kana: 'どようび', kanji: '土曜日', meaning: '星期六', type: '名詞' },
    { id: 'n-1253', kana: 'とら', kanji: '虎', meaning: '老虎', type: '名詞' },
    { id: 'n-1254', kana: 'ドライクリーニング', kanji: 'Dry Cleaning', meaning: '乾洗', type: '名詞' },
    { id: 'n-1255', kana: 'ドラマ', kanji: 'Drama', meaning: '連續劇', type: '名詞' },
    { id: 'n-1256', kana: 'トランプ', kanji: 'Trump', meaning: '撲克牌', type: '名詞' },
    { id: 'n-1257', kana: 'トラック', kanji: 'Truck', meaning: '卡車', type: '名詞' },
    { id: 'n-1258', kana: 'トラブル', kanji: 'Trouble', meaning: '麻煩/糾紛', type: '名詞' },
    { id: 'n-1259', kana: 'とり', kanji: '鳥', meaning: '鳥', type: '名詞' },
    { id: 'n-1260', kana: 'とり肉', kanji: '鶏肉', meaning: '雞肉', type: '名詞' },
    { id: 'n-1261', kana: 'どれ', kanji: '-', meaning: '哪個', type: '名詞' },
    { id: 'n-1262', kana: 'ドレス', kanji: 'Dress', meaning: '禮服/洋裝', type: '名詞' },
    { id: 'n-1263', kana: '泥', kanji: '泥', meaning: '泥巴', type: '名詞' },
    { id: 'n-1264', kana: 'トンネル', kanji: 'Tunnel', meaning: '隧道', type: '名詞' },
    { id: 'n-1265', kana: 'どんぶり', kanji: '丼', meaning: '大碗/蓋飯', type: '名詞' },
    { id: 'n-1266', kana: 'ないか', kanji: '内科', meaning: '內科', type: '名詞' },
    { id: 'n-1267', kana: 'ないよう', kanji: '内容', meaning: '內容', type: '名詞' },
    { id: 'n-1268', kana: 'ナイフ', kanji: 'Knife', meaning: '刀子', type: '名詞' },
    { id: 'n-1269', kana: 'ナイロン', kanji: 'Nylon', meaning: '尼龍', type: '名詞' },
    { id: 'n-1270', kana: 'なか', kanji: '中 / 仲', meaning: '裡面 / 關係', type: '名詞' },
    { id: 'n-1271', kana: 'ながめ', kanji: '眺め', meaning: '景色/眺望', type: '名詞' },
    { id: 'n-1272', kana: 'なかみ', kanji: '中身', meaning: '內容物', type: '名詞' },
    { id: 'n-1273', kana: 'なかゆび', kanji: '中指', meaning: '中指', type: '名詞' },
    { id: 'n-1274', kana: 'ながれ', kanji: '流れ', meaning: '流動/流程', type: '名詞' },
    { id: 'n-1275', kana: 'なきごえ', kanji: '泣き声 / 鳴き声', meaning: '哭聲 / 叫聲', type: '名詞' },
    { id: 'n-1276', kana: 'なし', kanji: '梨 / 無し', meaning: '梨子 / 沒有', type: '名詞' },
    { id: 'n-1277', kana: 'なぞ', kanji: '謎', meaning: '謎題', type: '名詞' },
    { id: 'n-1278', kana: 'なつ', kanji: '夏', meaning: '夏天', type: '名詞' },
    { id: 'n-1279', kana: 'なっとう', kanji: '納豆', meaning: '納豆', type: '名詞' },
    { id: 'n-1280', kana: 'なな', kanji: '七', meaning: '七', type: '名詞' },
    { id: 'n-1281', kana: 'なに', kanji: '何', meaning: '什麼', type: '名詞' },
    { id: 'n-1282', kana: 'なべ', kanji: '鍋', meaning: '鍋子', type: '名詞' },
    { id: 'n-1283', kana: 'なまえ', kanji: '名前', meaning: '名字', type: '名詞' },
    { id: 'n-1284', kana: 'なみ', kanji: '波', meaning: '波浪', type: '名詞' },
    { id: 'n-1285', kana: 'なみだ', kanji: '涙', meaning: '眼淚', type: '名詞' },
    { id: 'n-1286', kana: 'なやみ', kanji: '悩み', meaning: '煩惱', type: '名詞' },
    { id: 'n-1287', kana: 'なわ', kanji: '縄', meaning: '繩子', type: '名詞' },
    { id: 'n-1288', kana: 'なん', kanji: '何', meaning: '什麼', type: '名詞' },
    { id: 'n-1289', kana: 'なんきょく', kanji: '南極', meaning: '南極', type: '名詞' },
    { id: 'n-1290', kana: 'ナンバー', kanji: 'Number', meaning: '號碼', type: '名詞' },
    { id: 'n-1291', kana: 'におい', kanji: '匂い / 臭い', meaning: '氣味', type: '名詞' },
    { id: 'n-1292', kana: 'にガツ', kanji: '二月', meaning: '二月', type: '名詞' },
    { id: 'n-1293', kana: 'にく', kanji: '肉', meaning: '肉', type: '名詞' },
    { id: 'n-1294', kana: 'にくや', kanji: '肉屋', meaning: '肉店', type: '名詞' },
    { id: 'n-1295', kana: 'にし', kanji: '西', meaning: '西方', type: '名詞' },
    { id: 'n-1296', kana: 'にち', kanji: '日', meaning: '日/天', type: '名詞' },
    { id: 'n-1297', kana: 'にちじ', kanji: '日時', meaning: '日期時間', type: '名詞' },
    { id: 'n-1298', kana: 'にちじょう', kanji: '日常', meaning: '日常', type: '名詞' },
    { id: 'n-1299', kana: 'にちようび', kanji: '日曜日', meaning: '星期日', type: '名詞' },
    { id: 'n-1300', kana: 'にっき', kanji: '日記', meaning: '日記', type: '名詞' },
    { id: 'n-1301', kana: 'にづくり', kanji: '荷造り', meaning: '打包行李', type: '名詞' },
    { id: 'n-1302', kana: 'にほん / にっぽん', kanji: '日本', meaning: '日本', type: '名詞' },
    { id: 'n-1303', kana: 'にもつ', kanji: '荷物', meaning: '行李', type: '名詞' },
    { id: 'n-1304', kana: 'ニュース', kanji: 'News', meaning: '新聞', type: '名詞' },
    { id: 'n-1305', kana: 'にわ', kanji: '庭', meaning: '庭院', type: '名詞' },
    { id: 'n-1306', kana: 'にん', kanji: '人', meaning: '人', type: '名詞' },
    { id: 'n-1307', kana: 'にんき', kanji: '人気', meaning: '人氣', type: '名詞' },
    { id: 'n-1308', kana: 'にんギョウ', kanji: '人形', meaning: '人偶/娃娃', type: '名詞' },
    { id: 'n-1309', kana: 'にんげん', kanji: '人間', meaning: '人類', type: '名詞' },
    { id: 'n-1310', kana: 'にんじん', kanji: '人参', meaning: '紅蘿蔔', type: '名詞' },
    { id: 'n-1311', kana: 'ぬの', kanji: '布', meaning: '布', type: '名詞' },
    { id: 'n-1312', kana: 'ね', kanji: '根 / 音', meaning: '根 / 聲音', type: '名詞' },
    { id: 'n-1313', kana: 'ね', kanji: '値', meaning: '價格', type: '名詞' },
    { id: 'n-1314', kana: 'ネクタイ', kanji: 'Necktie', meaning: '領帶', type: '名詞' },
    { id: 'n-1315', kana: 'ねコ', kanji: '猫', meaning: '貓', type: '名詞' },
    { id: 'n-1316', kana: 'ねズミ', kanji: '鼠', meaning: '老鼠', type: '名詞' },
    { id: 'n-1317', kana: 'ねだん', kanji: '値段', meaning: '價格', type: '名詞' },
    { id: 'n-1318', kana: 'ねつ', kanji: '熱', meaning: '發燒/熱度', type: '名詞' },
    { id: 'n-1319', kana: 'ネックレス', kanji: 'Necklace', meaning: '項鍊', type: '名詞' },
    { id: 'n-1320', kana: 'ね 年', kanji: '年', meaning: '年', type: '名詞' },
    { id: 'n-1321', kana: 'ねん', kanji: '念', meaning: '念頭/注意', type: '名詞' },
    { id: 'n-1322', kana: 'ねんがじょう', kanji: '年賀状', meaning: '賀年卡', type: '名詞' },
    { id: 'n-1323', kana: 'ねんれい', kanji: '年齢', meaning: '年齡', type: '名詞' },
    { id: 'n-1324', kana: 'の', kanji: '野', meaning: '原野', type: '名詞' },
    { id: 'n-1325', kana: 'のう', kanji: '脳', meaning: '腦', type: '名詞' },
    { id: 'n-1326', kana: 'のうか', kanji: '農家', meaning: '農家', type: '名詞' },
    { id: 'n-1327', kana: 'のうぎょう', kanji: '農業', meaning: '農業', type: '名詞' },
    { id: 'n-1328', kana: 'のうミン', kanji: '農民', meaning: '農民', type: '名詞' },
    { id: 'n-1329', kana: 'ノート', kanji: 'Note', meaning: '筆記本', type: '名詞' },
    { id: 'n-1330', kana: 'のど', kanji: '喉', meaning: '喉嚨', type: '名詞' },
    { id: 'n-1331', kana: 'のみもの', kanji: '飲み物', meaning: '飲料', type: '名詞' },
    { id: 'n-1332', kana: 'のり', kanji: '海苔 / 糊', meaning: '海苔 / 漿糊', type: '名詞' },
    { id: 'n-1333', kana: 'のりもの', kanji: '乗り物', meaning: '交通工具', type: '名詞' },
    { id: 'n-1334', kana: 'は', kanji: '歯 / 葉', meaning: '牙齒 / 葉子', type: '名詞' },
    { id: 'n-1335', kana: 'ば', kanji: '場', meaning: '場所', type: '名詞' },
    { id: 'n-1336', kana: 'パーティー', kanji: 'Party', meaning: '派對', type: '名詞' },
    { id: 'n-1337', kana: 'ばあい', kanji: '場合', meaning: '場合/情況', type: '名詞' },
    { id: 'n-1338', kana: 'バイオリン', kanji: 'Violin', meaning: '小提琴', type: '名詞' },
    { id: 'n-1339', kana: 'ハイキング', kanji: 'Hiking', meaning: '健行', type: '名詞' },
    { id: 'n-1340', kana: 'はいしゃ', kanji: '歯医者', meaning: '牙醫', type: '名詞' },
    { id: 'n-1341', kana: 'ばいてん', kanji: '売店', meaning: '小賣店', type: '名詞' },
    { id: 'n-1342', kana: 'はいゆう', kanji: '俳優', meaning: '演員', type: '名詞' },
    { id: 'n-1343', kana: 'はいざら', kanji: '灰皿', meaning: '菸灰缸', type: '名詞' },
    { id: 'n-1344', kana: 'はか', kanji: '墓', meaning: '墳墓', type: '名詞' },
    { id: 'n-1345', kana: 'はカセ', kanji: '博士', meaning: '博士', type: '名詞' },
    { id: 'n-1346', kana: 'ばかり', kanji: '-', meaning: '淨是/光是 (副助詞)', type: '名詞' },
    { id: 'n-1347', kana: 'はき', kanji: '破棄', meaning: '破棄/撤銷', type: '名詞' },
    { id: 'n-1348', kana: 'はコ', kanji: '箱', meaning: '箱子', type: '名詞' },
    { id: 'n-1349', kana: 'はさみ', kanji: '鋏', meaning: '剪刀', type: '名詞' },
    { id: 'n-1350', kana: 'はシ', kanji: '箸 / 橋 / 端', meaning: '筷子 / 橋 / 邊緣', type: '名詞' },
    { id: 'n-1351', kana: 'はじまり', kanji: '始まり', meaning: '開始 (名詞)', type: '名詞' },
    { id: 'n-1352', kana: 'はじめ', kanji: '初め', meaning: '起初', type: '名詞' },
    { id: 'n-1353', kana: 'はじめまして', kanji: '-', meaning: '初次見面', type: '名詞' },
    { id: 'n-1354', kana: 'ばしょ', kanji: '場所', meaning: '場所', type: '名詞' },
    { id: 'n-1355', kana: 'バス', kanji: 'Bus', meaning: '公車', type: '名詞' },
    { id: 'n-1356', kana: 'パスポート', kanji: 'Passport', meaning: '護照', type: '名詞' },
    { id: 'n-1357', kana: 'はた', kanji: '旗', meaning: '旗子', type: '名詞' },
    { id: 'n-1358', kana: 'はたけ', kanji: '畑', meaning: '田地', type: '名詞' },
    { id: 'n-1359', kana: 'はたち', kanji: '二十歳', meaning: '20歲', type: '名詞' },
    { id: 'n-1360', kana: 'はち', kanji: '八 / 蜂', meaning: '八 / 蜜蜂', type: '名詞' },
    { id: 'n-1361', kana: 'はつ', kanji: '初', meaning: '初次', type: '名詞' },
    { id: 'n-1362', kana: 'バック', kanji: 'Back', meaning: '後面/背景', type: '名詞' },
    { id: 'n-1363', kana: 'バッグ', kanji: 'Bag', meaning: '包包', type: '名詞' },
    { id: 'n-1364', kana: 'はな', kanji: '花 / 鼻', meaning: '花 / 鼻子', type: '名詞' },
    { id: 'n-1365', kana: 'はなし', kanji: '話', meaning: '話/故事', type: '名詞' },
    { id: 'n-1366', kana: 'はなび', kanji: '花火', meaning: '煙火', type: '名詞' },
    { id: 'n-1367', kana: 'はなみ', kanji: '花見', meaning: '賞花', type: '名詞' },
    { id: 'n-1368', kana: 'はは', kanji: '母', meaning: '母親', type: '名詞' },
    { id: 'n-1369', kana: 'はば', kanji: '幅', meaning: '寬度', type: '名詞' },
    { id: 'n-1370', kana: 'はブラシ', kanji: '歯ブラシ', meaning: '牙刷', type: '名詞' },
    { id: 'n-1371', kana: 'バレー', kanji: 'Volley', meaning: '排球', type: '名詞' },
    { id: 'n-1372', kana: 'パン', kanji: 'Bread', meaning: '麵包', type: '名詞' },
    { id: 'n-1373', kana: 'はん', kanji: '半 / 版', meaning: '一半 / 版', type: '名詞' },
    { id: 'n-1374', kana: 'ばん', kanji: '晩 / 番', meaning: '晚上 / 號碼', type: '名詞' },
    { id: 'n-1375', kana: 'はんイ', kanji: '範囲', meaning: '範圍', type: '名詞' },
    { id: 'n-1376', kana: 'はんカチ', kanji: 'ハンカチ', meaning: '手帕', type: '名詞' },
    { id: 'n-1377', kana: 'ばんぐみ', kanji: '番組', meaning: '節目', type: '名詞' },
    { id: 'n-1378', kana: 'ばんごう', kanji: '番号', meaning: '號碼', type: '名詞' },
    { id: 'n-1379', kana: 'はんしん', kanji: '半身', meaning: '半身', type: '名詞' },
    { id: 'n-1380', kana: 'はんせい', kanji: '反省', meaning: '反省', type: '名詞' },
    { id: 'n-1381', kana: 'ハンバーグ', kanji: 'Hamburg', meaning: '漢堡排', type: '名詞' },
    { id: 'n-1382', kana: 'はんバイ', kanji: '販売', meaning: '販賣', type: '名詞' },
    { id: 'n-1383', kana: 'はんぶん', kanji: '半分', meaning: '一半', type: '名詞' },
    { id: 'n-1384', kana: 'ひ', kanji: '日 / 火', meaning: '日子・太陽 / 火', type: '名詞' },
    { id: 'n-1385', kana: 'ピアノ', kanji: 'Piano', meaning: '鋼琴', type: '名詞' },
    { id: 'n-1386', kana: 'ビール', kanji: 'Beer', meaning: '啤酒', type: '名詞' },
    { id: 'n-1387', kana: 'ひがし', kanji: '東', meaning: '東方', type: '名詞' },
    { id: 'n-1388', kana: 'ひかり', kanji: '光', meaning: '光', type: '名詞' },
    { id: 'n-1389', kana: 'ひき', kanji: '匹', meaning: '匹 (量詞)', type: '名詞' },
    { id: 'n-1390', kana: 'ひげ', kanji: '髭', meaning: '鬍鬚', type: '名詞' },
    { id: 'n-1391', kana: 'ひザ', kanji: '膝', meaning: '膝蓋', type: '名詞' },
    { id: 'n-1392', kana: 'ひじ', kanji: '肘', meaning: '手肘', type: '名詞' },
    { id: 'n-1393', kana: 'びじゅつかん', kanji: '美術館', meaning: '美術館', type: '名詞' },
    { id: 'n-1394', kana: 'ひじょう', kanji: '非常', meaning: '非常/緊急', type: '名詞' },
    { id: 'n-1395', kana: 'ひじょうぐち', kanji: '非常口', meaning: '逃生口', type: '名詞' },
    { id: 'n-1396', kana: 'ひたい', kanji: '額', meaning: '額頭', type: '名詞' },
    { id: 'n-1397', kana: 'ひだり', kanji: '左', meaning: '左邊', type: '名詞' },
    { id: 'n-1398', kana: 'ひづけ', kanji: '日付', meaning: '日期', type: '名詞' },
    { id: 'n-1399', kana: 'ひっこし', kanji: '引っ越し', meaning: '搬家 (名詞)', type: '名詞' },
    { id: 'n-1400', kana: 'ひつじ', kanji: '羊', meaning: '羊', type: '名詞' },
    { id: 'n-1401', kana: 'ひと', kanji: '人', meaning: '人', type: '名詞' },
    { id: 'n-1402', kana: 'ひト', kanji: '一', meaning: '一', type: '名詞' },
    { id: 'n-1403', kana: 'ひとり', kanji: '一人', meaning: '一人/獨自', type: '名詞' },
    { id: 'n-1404', kana: 'ひとりごと', kanji: '独り言', meaning: '自言自語', type: '名詞' },
    { id: 'n-1405', kana: 'ひなまつり', kanji: '雛祭り', meaning: '女兒節', type: '名詞' },
    { id: 'n-1406', kana: 'ひにち', kanji: '日にち', meaning: '日期/日數', type: '名詞' },
    { id: 'n-1407', kana: 'ひねく', kanji: '皮肉', meaning: '諷刺 (圖中不清，推測)', type: '名詞' },
    { id: 'n-1408', kana: 'ひノー', kanji: '機能', meaning: '機能 (圖中不清，推測)', type: '名詞' },
    { id: 'n-1409', kana: 'ひビ', kanji: '日々', meaning: '日子/天天', type: '名詞' },
    { id: 'n-1410', kana: 'ひみつ', kanji: '秘密', meaning: '秘密', type: '名詞' },
    { id: 'n-1411', kana: 'ひめ', kanji: '姫', meaning: '公主', type: '名詞' },
    { id: 'n-1412', kana: 'ひも', kanji: '紐', meaning: '繩子', type: '名詞' },
    { id: 'n-1413', kana: 'ひゃく', kanji: '百', meaning: '百', type: '名詞' },
    { id: 'n-1414', kana: 'びよういん', kanji: '美容院', meaning: '美容院', type: '名詞' },
    { id: 'n-1415', kana: 'びょういん', kanji: '病院', meaning: '醫院', type: '名詞' },
    { id: 'n-1416', kana: 'びょうき', kanji: '病気', meaning: '生病', type: '名詞' },
    { id: 'n-1417', kana: 'ひらがな', kanji: '平仮名', meaning: '平假名', type: '名詞' },
    { id: 'n-1418', kana: 'ひる', kanji: '昼', meaning: '中午', type: '名詞' },
    { id: 'n-1419', kana: 'ひるま', kanji: '昼間', meaning: '白天', type: '名詞' },
    { id: 'n-1420', kana: 'ビル', kanji: 'Building', meaning: '大樓', type: '名詞' },
    { id: 'n-1421', kana: 'ひるごはん', kanji: '昼ご飯', meaning: '午餐', type: '名詞' },
    { id: 'n-1422', kana: 'ひるね', kanji: '昼寝', meaning: '午睡', type: '名詞' },
    { id: 'n-1423', kana: 'ひロバ', kanji: '広場', meaning: '廣場', type: '名詞' },
    { id: 'n-1424', kana: 'ピン', kanji: 'Pin', meaning: '別針/栓', type: '名詞' },
    { id: 'n-1425', kana: 'びん', kanji: '瓶', meaning: '瓶子', type: '名詞' },
    { id: 'n-1426', kana: 'ファイル', kanji: 'File', meaning: '檔案夾', type: '名詞' },
    { id: 'n-1427', kana: 'ファックス', kanji: 'Fax', meaning: '傳真', type: '名詞' },
    { id: 'n-1428', kana: 'ファッション', kanji: 'Fashion', meaning: '時尚', type: '名詞' },
    { id: 'n-1429', kana: 'プール', kanji: 'Pool', meaning: '游泳池', type: '名詞' },
    { id: 'n-1430', kana: 'フイルム', kanji: 'Film', meaning: '底片', type: '名詞' },
    { id: 'n-1431', kana: 'ブーツ', kanji: 'Boots', meaning: '靴子', type: '名詞' },
    { id: 'n-1432', kana: 'ふウ', kanji: '風', meaning: '風格/樣子', type: '名詞' },
    { id: 'n-1433', kana: 'ふうケイ', kanji: '風景', meaning: '風景', type: '名詞' },
    { id: 'n-1434', kana: 'ふうふ', kanji: '夫婦', meaning: '夫婦', type: '名詞' },
    { id: 'n-1435', kana: 'フエ', kanji: '笛', meaning: '笛子', type: '名詞' },
    { id: 'n-1436', kana: 'フォーク', kanji: 'Fork', meaning: '叉子', type: '名詞' },
    { id: 'n-1437', kana: 'ぶか', kanji: '部下', meaning: '部下', type: '名詞' },
    { id: 'n-1438', kana: 'ぶカ', kanji: '物価', meaning: '物價', type: '名詞' },
    { id: 'n-1439', kana: 'ふく', kanji: '服', meaning: '衣服', type: '名詞' },
    { id: 'n-1440', kana: 'ふくし', kanji: '副詞 / 福祉', meaning: '副詞 / 福祉', type: '名詞' },
    { id: 'n-1441', kana: 'ふくろ', kanji: '袋', meaning: '袋子', type: '名詞' },
    { id: 'n-1442', kana: 'ふごう', kanji: '符号', meaning: '符號', type: '名詞' },
    { id: 'n-1443', kana: 'ぶた', kanji: '豚', meaning: '豬', type: '名詞' },
    { id: 'n-1444', kana: 'ふた', kanji: '蓋', meaning: '蓋子', type: '名詞' },
    { id: 'n-1445', kana: 'ふたり', kanji: '二人', meaning: '兩個人', type: '名詞' },
    { id: 'n-1446', kana: 'ふつう', kanji: '普通', meaning: '普通', type: '名詞' },
    { id: 'n-1447', kana: 'ぶっしつ', kanji: '物質', meaning: '物質', type: '名詞' },
    { id: 'n-1448', kana: 'ぶつり', kanji: '物理', meaning: '物理', type: '名詞' },
    { id: 'n-1449', kana: 'ふで', kanji: '筆', meaning: '毛筆', type: '名詞' },
    { id: 'n-1450', kana: 'ふとん', kanji: '布団', meaning: '棉被', type: '名詞' },
    { id: 'n-1451', kana: 'ふな', kanji: '船', meaning: '船', type: '名詞' },
    { id: 'n-1452', kana: 'ぶぶん', kanji: '部分', meaning: '部分', type: '名詞' },
    { id: 'n-1453', kana: 'ふゆ', kanji: '冬', meaning: '冬天', type: '名詞' },
    { id: 'n-1454', kana: 'フライパン', kanji: 'Frypan', meaning: '平底鍋', type: '名詞' },
    { id: 'n-1455', kana: 'ブラウス', kanji: 'Blouse', meaning: '罩衫', type: '名詞' },
    { id: 'n-1456', kana: 'ブラシ', kanji: 'Brush', meaning: '刷子', type: '名詞' },
    { id: 'n-1457', kana: 'プラス', kanji: 'Plus', meaning: '加/正數', type: '名詞' },
    { id: 'n-1458', kana: 'プラットホーム', kanji: 'Platform', meaning: '月台', type: '名詞' },
    { id: 'n-1459', kana: 'プラン', kanji: 'Plan', meaning: '計畫', type: '名詞' },
    { id: 'n-1460', kana: 'フリー', kanji: 'Free', meaning: '自由/免費', type: '名詞' },
    { id: 'n-1461', kana: 'フリガナ', kanji: 'Furigana', meaning: '標音假名', type: '名詞' },
    { id: 'n-1462', kana: 'プリント', kanji: 'Print', meaning: '講義/列印', type: '名詞' },
    { id: 'n-1463', kana: 'プレゼント', kanji: 'Present', meaning: '禮物', type: '名詞' },
    { id: 'n-1464', kana: 'ふろ', kanji: '風呂', meaning: '澡堂/浴缸', type: '名詞' },
    { id: 'n-1465', kana: 'プロ', kanji: 'Pro', meaning: '專業', type: '名詞' },
    { id: 'n-1466', kana: 'ぶん', kanji: '文 / 分', meaning: '句子 / 分', type: '名詞' },
    { id: 'n-1467', kana: 'ふん', kanji: '分', meaning: '分 (時間/角度)', type: '名詞' },
    { id: 'n-1468', kana: 'ぶんか', kanji: '文化', meaning: '文化', type: '名詞' },
    { id: 'n-1469', kana: 'ぶんがく', kanji: '文学', meaning: '文學', type: '名詞' },
    { id: 'n-1470', kana: 'ぶんしょう', kanji: '文章', meaning: '文章', type: '名詞' },
    { id: 'n-1471', kana: 'ぶんぽう', kanji: '文法', meaning: '文法', type: '名詞' },
    { id: 'n-1472', kana: 'ぶんぼうぐ', kanji: '文房具', meaning: '文具', type: '名詞' },
    { id: 'n-1473', kana: 'ぶんや', kanji: '分野', meaning: '領域', type: '名詞' },
    { id: 'n-1474', kana: 'ふうとう', kanji: '封筒', meaning: '信封', type: '名詞' },
    { id: 'n-1475', kana: 'ふえ', kanji: '笛', meaning: '笛子', type: '名詞' },
    { id: 'n-1476', kana: 'フォーク', kanji: 'Fork', meaning: '叉子', type: '名詞' },
    { id: 'n-1477', kana: 'ぶか', kanji: '部下', meaning: '部下', type: '名詞' },
    { id: 'n-1478', kana: 'ふく', kanji: '服', meaning: '衣服', type: '名詞' },
    { id: 'n-1479', kana: 'ふくし', kanji: '副詞 / 福祉', meaning: '副詞 / 福祉', type: '名詞' },
    { id: 'n-1480', kana: 'ふくろ', kanji: '袋', meaning: '袋子', type: '名詞' },
    { id: 'n-1481', kana: 'ふごう', kanji: '符号', meaning: '符號', type: '名詞' },
    { id: 'n-1482', kana: 'ぶた', kanji: '豚', meaning: '豬', type: '名詞' },
    { id: 'n-1483', kana: 'ふた', kanji: '蓋', meaning: '蓋子', type: '名詞' },
    { id: 'n-1484', kana: 'ふたり', kanji: '二人', meaning: '兩個人', type: '名詞' },
    { id: 'n-1485', kana: 'ぶっしつ', kanji: '物質', meaning: '物質', type: '名詞' },
    { id: 'n-1486', kana: 'ぶつり', kanji: '物理', meaning: '物理', type: '名詞' },
    { id: 'n-1487', kana: 'ふで', kanji: '筆', meaning: '毛筆', type: '名詞' },
    { id: 'n-1488', kana: 'ふとん', kanji: '布団', meaning: '棉被', type: '名詞' },
    { id: 'n-1489', kana: 'ふな', kanji: '船', meaning: '船', type: '名詞' },
    { id: 'n-1490', kana: 'ぶぶん', kanji: '部分', meaning: '部分', type: '名詞' },
    { id: 'n-1491', kana: 'ふゆ', kanji: '冬', meaning: '冬天', type: '名詞' },
    { id: 'n-1492', kana: 'フライパン', kanji: 'Frypan', meaning: '平底鍋', type: '名詞' },
    { id: 'n-1493', kana: 'ブラウス', kanji: 'Blouse', meaning: '罩衫', type: '名詞' },
    { id: 'n-1494', kana: 'ブラシ', kanji: 'Brush', meaning: '刷子', type: '名詞' },
    { id: 'n-1495', kana: 'プラス', kanji: 'Plus', meaning: '加/正數', type: '名詞' },
    { id: 'n-1496', kana: 'プラットホーム', kanji: 'Platform', meaning: '月台', type: '名詞' },
    { id: 'n-1497', kana: 'フリーター', kanji: 'Freeter', meaning: '飛特族 (自由打工者)', type: '名詞' },
    { id: 'n-1498', kana: 'プリント', kanji: 'Print', meaning: '講義/列印', type: '名詞' },
    { id: 'n-1499', kana: 'プレゼント', kanji: 'Present', meaning: '禮物', type: '名詞' },
    { id: 'n-1500', kana: 'プロ', kanji: 'Pro', meaning: '專業', type: '名詞' },
    { id: 'n-1501', kana: 'ふろ', kanji: '風呂', meaning: '澡堂', type: '名詞' },
    { id: 'n-1502', kana: 'ぶん', kanji: '文', meaning: '句子', type: '名詞' },
    { id: 'n-1503', kana: 'ふん', kanji: '分', meaning: '分', type: '名詞' },
    { id: 'n-1504', kana: 'ぶんか', kanji: '文化', meaning: '文化', type: '名詞' },
    { id: 'n-1505', kana: 'ぶんがく', kanji: '文学', meaning: '文學', type: '名詞' },
    { id: 'n-1506', kana: 'ぶんしょう', kanji: '文章', meaning: '文章', type: '名詞' },
    { id: 'n-1507', kana: 'ぶんぽう', kanji: '文法', meaning: '文法', type: '名詞' },
    { id: 'n-1508', kana: 'ぶんぼうぐ', kanji: '文房具', meaning: '文具', type: '名詞' },
    { id: 'n-1509', kana: 'ぶんや', kanji: '分野', meaning: '領域', type: '名詞' },
    { id: 'n-1510', kana: 'へい', kanji: '塀', meaning: '圍牆', type: '名詞' },
    { id: 'n-1511', kana: 'へい', kanji: '兵', meaning: '士兵', type: '名詞' },
    { id: 'n-1512', kana: 'へいじつ', kanji: '平日', meaning: '平日', type: '名詞' },
    { id: 'n-1513', kana: 'へいわ', kanji: '平和', meaning: '和平', type: '名詞' },
    { id: 'n-1514', kana: 'ページ', kanji: 'Page', meaning: '頁', type: '名詞' },
    { id: 'n-1515', kana: 'ペット', kanji: 'Pet', meaning: '寵物', type: '名詞' },
    { id: 'n-1516', kana: 'ベッド', kanji: 'Bed', meaning: '床', type: '名詞' },
    { id: 'n-1517', kana: 'べつべつ', kanji: '別々', meaning: '個別/分開', type: '名詞' },
    { id: 'n-1518', kana: 'へや', kanji: '部屋', meaning: '房間', type: '名詞' },
    { id: 'n-1519', kana: 'ヘルパー', kanji: 'Helper', meaning: '看護/幫手', type: '名詞' },
    { id: 'n-1520', kana: 'ベルト', kanji: 'Belt', meaning: '皮帶', type: '名詞' },
    { id: 'n-1521', kana: 'ペン', kanji: 'Pen', meaning: '筆', type: '名詞' },
    { id: 'n-1522', kana: 'べんごし', kanji: '弁護士', meaning: '律師', type: '名詞' },
    { id: 'n-1523', kana: 'へんじ', kanji: '返事', meaning: '回覆', type: '名詞' },
    { id: 'n-1524', kana: 'ベンチ', kanji: 'Bench', meaning: '長椅', type: '名詞' },
    { id: 'n-1525', kana: 'べんとう', kanji: '弁当', meaning: '便當', type: '名詞' },
    { id: 'n-1526', kana: 'ほう', kanji: '方', meaning: '方面/方', type: '名詞' },
    { id: 'n-1527', kana: 'ぼうえき', kanji: '貿易', meaning: '貿易', type: '名詞' },
    { id: 'n-1528', kana: 'ぼうサ', kanji: '防災', meaning: '防災', type: '名詞' },
    { id: 'n-1529', kana: 'ぼうし', kanji: '帽子', meaning: '帽子', type: '名詞' },
    { id: 'n-1530', kana: 'ほうほう', kanji: '方法', meaning: '方法', type: '名詞' },
    { id: 'n-1531', kana: 'ほうりつ', kanji: '法律', meaning: '法律', type: '名詞' },
    { id: 'n-1532', kana: 'ほお / ほほ', kanji: '頬', meaning: '臉頰', type: '名詞' },
    { id: 'n-1533', kana: 'ほか', kanji: '他 / 外', meaning: '其他 / 外面', type: '名詞' },
    { id: 'n-1534', kana: 'ぼき', kanji: '簿記', meaning: '簿記', type: '名詞' },
    { id: 'n-1535', kana: 'ぼく', kanji: '僕', meaning: '我 (男性自稱)', type: '名詞' },
    { id: 'n-1536', kana: 'ポケット', kanji: 'Pocket', meaning: '口袋', type: '名詞' },
    { id: 'n-1537', kana: 'ほけん', kanji: '保険', meaning: '保險', type: '名詞' },
    { id: 'n-1538', kana: 'ほけんしょう', kanji: '保険証', meaning: '健保卡', type: '名詞' },
    { id: 'n-1539', kana: 'ほこり', kanji: '埃', meaning: '灰塵', type: '名詞' },
    { id: 'n-1540', kana: 'ほし', kanji: '星', meaning: '星星', type: '名詞' },
    { id: 'n-1541', kana: 'ほしょう', kanji: '保証 / 補償', meaning: '保證 / 補償', type: '名詞' },
    { id: 'n-1542', kana: 'ポスト', kanji: 'Post', meaning: '郵筒', type: '名詞' },
    { id: 'n-1543', kana: 'ほね', kanji: '骨', meaning: '骨頭', type: '名詞' },
    { id: 'n-1544', kana: 'ほのお', kanji: '炎', meaning: '火焰', type: '名詞' },
    { id: 'n-1545', kana: 'ボール', kanji: 'Ball', meaning: '球', type: '名詞' },
    { id: 'n-1546', kana: 'ボールペン', kanji: 'Ballpoint Pen', meaning: '原子筆', type: '名詞' },
    { id: 'n-1547', kana: 'ホール', kanji: 'Hall', meaning: '大廳', type: '名詞' },
    { id: 'n-1548', kana: 'ほんにん', kanji: '本人', meaning: '本人', type: '名詞' },
    { id: 'n-1549', kana: 'ほんばこ', kanji: '本箱', meaning: '書箱/書櫃', type: '名詞' },
    { id: 'n-1550', kana: 'ほんや', kanji: '本屋', meaning: '書店', type: '名詞' },
    { id: 'n-1551', kana: 'ほんやく', kanji: '翻訳', meaning: '翻譯', type: '名詞' },
    { id: 'n-1552', kana: 'まいあさ', kanji: '毎朝', meaning: '每天早上', type: '名詞' },
    { id: 'n-1553', kana: 'まいげつ / まいつき', kanji: '毎月', meaning: '每個月', type: '名詞' },
    { id: 'n-1554', kana: 'まいしゅう', kanji: '毎週', meaning: '每週', type: '名詞' },
    { id: 'n-1555', kana: 'まいとし / まいねん', kanji: '毎年', meaning: '每年', type: '名詞' },
    { id: 'n-1556', kana: 'まいにち', kanji: '毎日', meaning: '每天', type: '名詞' },
    { id: 'n-1557', kana: 'まいばん', kanji: '毎晩', meaning: '每天晚上', type: '名詞' },
    { id: 'n-1558', kana: 'まえ', kanji: '前', meaning: '前面/以前', type: '名詞' },
    { id: 'n-1559', kana: 'まガりかど', kanji: '曲がり角', meaning: '轉角', type: '名詞' },
    { id: 'n-1560', kana: 'まくら', kanji: '枕', meaning: '枕頭', type: '名詞' },
    { id: 'n-1561', kana: 'まぐろ', kanji: '鮪', meaning: '鮪魚', type: '名詞' },
    { id: 'n-1562', kana: 'まけ', kanji: '負け', meaning: '輸', type: '名詞' },
    { id: 'n-1563', kana: 'まゴ', kanji: '孫', meaning: '孫子', type: '名詞' },
    { id: 'n-1564', kana: 'まさか', kanji: '-', meaning: '該不會/沒想到 (副詞)', type: '名詞' },
    { id: 'n-1565', kana: 'まじょ', kanji: '魔女', meaning: '魔女', type: '名詞' },
    { id: 'n-1566', kana: 'マスク', kanji: 'Mask', meaning: '口罩/面具', type: '名詞' },
    { id: 'n-1567', kana: 'また', kanji: '-', meaning: '又/再 (副詞/接續詞)', type: '名詞' },
    { id: 'n-1568', kana: 'まだ', kanji: '-', meaning: '還/尚未 (副詞)', type: '名詞' },
    { id: 'n-1569', kana: 'まち', kanji: '町 / 街', meaning: '城鎮 / 街道', type: '名詞' },
    { id: 'n-1570', kana: 'まち', kanji: '待ち', meaning: '等待', type: '名詞' },
    { id: 'n-1571', kana: 'まちがい', kanji: '間違い', meaning: '錯誤', type: '名詞' },
    { id: 'n-1572', kana: 'まつ', kanji: '松', meaning: '松樹', type: '名詞' },
    { id: 'n-1573', kana: 'まっすぐ', kanji: '真っ直ぐ', meaning: '直直地 (副詞)', type: '名詞' },
    { id: 'n-1574', kana: 'マッチ', kanji: 'Match', meaning: '火柴/比賽', type: '名詞' },
    { id: 'n-1575', kana: 'まど', kanji: '窓', meaning: '窗戶', type: '名詞' },
    { id: 'n-1576', kana: 'まどぐち', kanji: '窓口', meaning: '窗口', type: '名詞' },
    { id: 'n-1577', kana: 'マナー', kanji: 'Manner', meaning: '禮儀', type: '名詞' },
    { id: 'n-1578', kana: 'マネージャー', kanji: 'Manager', meaning: '經理/經紀人', type: '名詞' },
    { id: 'n-1579', kana: 'まね', kanji: '真似', meaning: '模仿', type: '名詞' },
    { id: 'n-1580', kana: 'まぶた', kanji: '瞼', meaning: '眼皮', type: '名詞' },
    { id: 'n-1581', kana: 'マフラー', kanji: 'Muffler', meaning: '圍巾', type: '名詞' },
    { id: 'n-1582', kana: 'ママ', kanji: 'Mama', meaning: '媽媽', type: '名詞' },
    { id: 'n-1583', kana: 'まめ', kanji: '豆', meaning: '豆子', type: '名詞' },
    { id: 'n-1584', kana: 'まゆげ', kanji: '眉毛', meaning: '眉毛', type: '名詞' },
    { id: 'n-1585', kana: 'マリ', kanji: '毬', meaning: '球 (手鞠)', type: '名詞' },
    { id: 'n-1586', kana: 'まる', kanji: '丸', meaning: '圓圈', type: '名詞' },
    { id: 'n-1587', kana: 'まん', kanji: '万', meaning: '萬', type: '名詞' },
    { id: 'n-1588', kana: 'まんいん', kanji: '満員', meaning: '客滿', type: '名詞' },
    { id: 'n-1589', kana: 'まんガ', kanji: '漫画', meaning: '漫畫', type: '名詞' },
    { id: 'n-1590', kana: 'まんぞく', kanji: '満足', meaning: '滿足', type: '名詞' },
    { id: 'n-1591', kana: 'まんなか', kanji: '真ん中', meaning: '正中間', type: '名詞' },
    { id: 'n-1592', kana: 'まんねんひつ', kanji: '万年筆', meaning: '鋼筆', type: '名詞' },
    { id: 'n-1593', kana: 'まんプク', kanji: '満腹', meaning: '吃飽', type: '名詞' },
    { id: 'n-1594', kana: 'み', kanji: '実 / 身', meaning: '果實 / 身體', type: '名詞' },
    { id: 'n-1595', kana: 'みあか', kanji: '見方', meaning: '看法', type: '名詞' },
    { id: 'n-1596', kana: 'みかた', kanji: '味方', meaning: '同伴/自己人', type: '名詞' },
    { id: 'n-1597', kana: 'みず', kanji: '水', meaning: '水', type: '名詞' },
    { id: 'n-1598', kana: 'みずうみ', kanji: '湖', meaning: '湖泊', type: '名詞' },
    { id: 'n-1599', kana: 'みずぎ', kanji: '水着', meaning: '泳衣', type: '名詞' },
    { id: 'n-1600', kana: 'みセ', kanji: '店', meaning: '店', type: '名詞' },
    { id: 'n-1601', kana: 'みそ', kanji: '味噌', meaning: '味噌', type: '名詞' },
    { id: 'n-1602', kana: 'みち', kanji: '道', meaning: '道路', type: '名詞' },
    { id: 'n-1603', kana: 'みっか', kanji: '三日', meaning: '3號/3天', type: '名詞' },
    { id: 'n-1604', kana: 'みッツ', kanji: '三つ', meaning: '三個', type: '名詞' },
    { id: 'n-1605', kana: 'みどり', kanji: '緑', meaning: '綠色', type: '名詞' },
    { id: 'n-1606', kana: 'みな', kanji: '皆', meaning: '大家', type: '名詞' },
    { id: 'n-1607', kana: 'みなと', kanji: '港', meaning: '港口', type: '名詞' },
    { id: 'n-1608', kana: 'みなみ', kanji: '南', meaning: '南方', type: '名詞' },
    { id: 'n-1609', kana: 'みね', kanji: '峰', meaning: '山峰', type: '名詞' },
    { id: 'n-1610', kana: 'みみ', kanji: '耳', meaning: '耳朵', type: '名詞' },
    { id: 'n-1611', kana: 'みゃく', kanji: '脈', meaning: '脈搏', type: '名詞' },
    { id: 'n-1612', kana: 'みらい', kanji: '未来', meaning: '未來', type: '名詞' },
    { id: 'n-1613', kana: 'ミリ', kanji: 'Milli', meaning: '毫...', type: '名詞' },
    { id: 'n-1614', kana: 'ミルク', kanji: 'Milk', meaning: '牛奶', type: '名詞' },
    { id: 'n-1615', kana: 'みんぞく', kanji: '民族', meaning: '民族', type: '名詞' },
    { id: 'n-1616', kana: 'みんゾク', kanji: '民俗', meaning: '民俗', type: '名詞' },
    { id: 'n-1617', kana: 'むイカ', kanji: '六日', meaning: '6號/6天', type: '名詞' },
    { id: 'n-1618', kana: 'むカシ', kanji: '昔', meaning: '從前', type: '名詞' },
    { id: 'n-1619', kana: 'むギ', kanji: '麦', meaning: '麥', type: '名詞' },
    { id: 'n-1620', kana: 'むし', kanji: '虫', meaning: '蟲', type: '名詞' },
    { id: 'n-1621', kana: 'むしバ', kanji: '虫歯', meaning: '蛀牙', type: '名詞' },
    { id: 'n-1622', kana: 'むスコ', kanji: '息子', meaning: '兒子', type: '名詞' },
    { id: 'n-1623', kana: 'むスメ', kanji: '娘', meaning: '女兒', type: '名詞' },
    { id: 'n-1624', kana: 'むッツ', kanji: '六つ', meaning: '六個', type: '名詞' },
    { id: 'n-1625', kana: 'むね', kanji: '胸', meaning: '胸部', type: '名詞' },
    { id: 'n-1626', kana: 'むら', kanji: '村', meaning: '村莊', type: '名詞' },
    { id: 'n-1627', kana: 'むらさき', kanji: '紫', meaning: '紫色', type: '名詞' },
    { id: 'n-1628', kana: 'め', kanji: '目 / 芽', meaning: '眼睛 / 芽', type: '名詞' },
    { id: 'n-1629', kana: 'めい', kanji: '姪', meaning: '姪女/外甥女', type: '名詞' },
    { id: 'n-1630', kana: 'めいし', kanji: '名刺', meaning: '名片', type: '名詞' },
    { id: 'n-1631', kana: 'めいじん', kanji: '名人', meaning: '名人', type: '名詞' },
    { id: 'n-1632', kana: 'めイレイ', kanji: '命令', meaning: '命令', type: '名詞' },
    { id: 'n-1633', kana: 'めいわく', kanji: '迷惑', meaning: '麻煩/困擾', type: '名詞' },
    { id: 'n-1634', kana: 'メーカー', kanji: 'Maker', meaning: '製造商', type: '名詞' },
    { id: 'n-1635', kana: 'メーター', kanji: 'Meter', meaning: '公尺/儀表', type: '名詞' },
    { id: 'n-1636', kana: 'メガネ', kanji: '眼鏡', meaning: '眼鏡', type: '名詞' },
    { id: 'n-1637', kana: 'メモ', kanji: 'Memo', meaning: '筆記', type: '名詞' },
    { id: 'n-1638', kana: 'メロン', kanji: 'Melon', meaning: '哈密瓜', type: '名詞' },
    { id: 'n-1639', kana: 'めん', kanji: '面 / 綿', meaning: '面具・方面 / 棉', type: '名詞' },
    { id: 'n-1640', kana: 'メンバー', kanji: 'Member', meaning: '成員', type: '名詞' },
    { id: 'n-1641', kana: 'もう', kanji: '-', meaning: '已經/再 (副詞)', type: '名詞' },
    { id: 'n-1642', kana: 'もうふ', kanji: '毛布', meaning: '毛毯', type: '名詞' },
    { id: 'n-1643', kana: 'もく', kanji: '木', meaning: '樹/木頭', type: '名詞' },
    { id: 'n-1644', kana: 'もくじ', kanji: '目次', meaning: '目錄', type: '名詞' },
    { id: 'n-1645', kana: 'もくてき', kanji: '目的', meaning: '目的', type: '名詞' },
    { id: 'n-1646', kana: 'もくひょう', kanji: '目標', meaning: '目標', type: '名詞' },
    { id: 'n-1647', kana: 'もくようび', kanji: '木曜日', meaning: '星期四', type: '名詞' },
    { id: 'n-1648', kana: 'もじ', kanji: '文字', meaning: '文字', type: '名詞' },
    { id: 'n-1649', kana: 'もし', kanji: '-', meaning: '如果 (副詞)', type: '名詞' },
    { id: 'n-1650', kana: 'もしもし', kanji: '-', meaning: '喂 (電話)', type: '名詞' },
    { id: 'n-1651', kana: 'もちろん', kanji: '-', meaning: '當然 (副詞)', type: '名詞' },
    { id: 'n-1652', kana: 'もちもの', kanji: '持ち物', meaning: '攜帶物品', type: '名詞' },
    { id: 'n-1653', kana: 'モデル', kanji: 'Model', meaning: '模特兒/模型', type: '名詞' },
    { id: 'n-1654', kana: 'もと', kanji: '元 / 基', meaning: '原本 / 基礎', type: '名詞' },
    { id: 'n-1655', kana: 'もの', kanji: '物 / 者', meaning: '物品 / 人', type: '名詞' },
    { id: 'n-1656', kana: 'ものおき', kanji: '物置', meaning: '儲藏室', type: '名詞' },
    { id: 'n-1657', kana: 'ものごと', kanji: '物事', meaning: '事物', type: '名詞' },
    { id: 'n-1658', kana: 'ものまね', kanji: '物真似', meaning: '模仿', type: '名詞' },
    { id: 'n-1659', kana: 'もみじ', kanji: '紅葉', meaning: '紅葉/楓葉', type: '名詞' },
    { id: 'n-1660', kana: 'もめん', kanji: '木綿', meaning: '棉花', type: '名詞' },
    { id: 'n-1661', kana: 'もも', kanji: '桃 / 腿', meaning: '桃子 / 大腿', type: '名詞' },
    { id: 'n-1662', kana: 'もり', kanji: '森', meaning: '森林', type: '名詞' },
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
    { id: 'n-1688', kana: 'リビング', kanji: 'Living', meaning: '起居室/客廳', type: '名詞' },
    { id: 'n-1689', kana: 'りゅうこうしょく', kanji: '流行色', meaning: '流行色', type: '名詞' },
    { id: 'n-1690', kana: 'りょう', kanji: '寮', meaning: '宿舍', type: '名詞' },
    { id: 'n-1691', kana: 'りょう', kanji: '量', meaning: '量', type: '名詞' },
    { id: 'n-1692', kana: 'りょうほう', kanji: '両方', meaning: '兩方/雙方', type: '名詞' },
    { id: 'n-1693', kana: 'りょうしゅうしょ', kanji: '領収書', meaning: '收據', type: '名詞' },
    { id: 'n-1694', kana: 'りょうしん', kanji: '両親', meaning: '父母', type: '名詞' },
    { id: 'n-1695', kana: 'りょうり', kanji: '料理', meaning: '料理', type: '名詞' },
    { id: 'n-1696', kana: 'りょこう', kanji: '旅行', meaning: '旅行', type: '名詞' },
    { id: 'n-1697', kana: 'りんご', kanji: '林檎', meaning: '蘋果', type: '名詞' },
    { id: 'n-1698', kana: 'るすばんでんわ', kanji: '留守番電話', meaning: '電話答錄機', type: '名詞' },
    { id: 'n-1699', kana: 'れい', kanji: '例 / 礼 / 零', meaning: '例子 / 禮貌 / 零', type: '名詞' },
    { id: 'n-1700', kana: 'れいぞうこ', kanji: '冷蔵庫', meaning: '冰箱', type: '名詞' },
    { id: 'n-1701', kana: 'れいとうしょくひん', kanji: '冷凍食品', meaning: '冷凍食品', type: '名詞' },
    { id: 'n-1702', kana: 'れいぼう', kanji: '冷房', meaning: '冷氣', type: '名詞' },
    { id: 'n-1703', kana: 'れいぎ', kanji: '礼儀', meaning: '禮儀', type: '名詞' },
    { id: 'n-1704', kana: 'れきし', kanji: '歴史', meaning: '歷史', type: '名詞' },
    { id: 'n-1705', kana: 'レコード', kanji: 'Record', meaning: '唱片/紀錄', type: '名詞' },
    { id: 'n-1706', kana: 'レジ', kanji: 'Regi', meaning: '收銀台', type: '名詞' },
    { id: 'n-1707', kana: 'レシート', kanji: 'Receipt', meaning: '收據/發票', type: '名詞' },
    { id: 'n-1708', kana: 'れっしゃ', kanji: '列車', meaning: '列車', type: '名詞' },
    { id: 'n-1709', kana: 'レストラン', kanji: 'Restaurant', meaning: '餐廳', type: '名詞' },
    { id: 'n-1710', kana: 'レトルトしょくひん', kanji: 'レトルト食品', meaning: '即食包食品', type: '名詞' },
    { id: 'n-1711', kana: 'レディースウェア', kanji: 'Ladies Wear', meaning: '女裝', type: '名詞' },
    { id: 'n-1712', kana: 'レディース', kanji: 'Ladies', meaning: '女性/女裝', type: '名詞' },
    { id: 'n-1713', kana: 'れんきゅう', kanji: '連休', meaning: '連假', type: '名詞' },
    { id: 'n-1714', kana: 'れんあい', kanji: '恋愛', meaning: '戀愛', type: '名詞' },
    { id: 'n-1715', kana: 'れんあいけっこん', kanji: '恋愛結婚', meaning: '戀愛結婚', type: '名詞' },
    { id: 'n-1716', kana: 'れんあいたいしょう', kanji: '恋愛対象', meaning: '戀愛對象', type: '名詞' },
    { id: 'n-1717', kana: 'レンタル', kanji: 'Rental', meaning: '租賃', type: '名詞' },
    { id: 'n-1718', kana: 'レンタルビデオ', kanji: 'Rental Video', meaning: '租賃錄影帶', type: '名詞' },
    { id: 'n-1719', kana: 'ろうじん', kanji: '老人', meaning: '老人', type: '名詞' },
    { id: 'n-1720', kana: 'ろうじんホーム', kanji: '老人ホーム', meaning: '養老院', type: '名詞' },
    { id: 'n-1721', kana: 'ろうそく', kanji: '蝋燭', meaning: '蠟燭', type: '名詞' },
    { id: 'n-1722', kana: 'ろく', kanji: '六', meaning: '六', type: '名詞' },
    { id: 'n-1723', kana: 'ロケット', kanji: 'Rocket', meaning: '火箭', type: '名詞' },
    { id: 'n-1724', kana: 'ローマじ', kanji: 'ローマ字', meaning: '羅馬拼音', type: '名詞' },
    { id: 'n-1725', kana: 'ロビー', kanji: 'Lobby', meaning: '大廳', type: '名詞' },
    { id: 'n-1726', kana: 'ろんぶん', kanji: '論文', meaning: '論文', type: '名詞' },
    { id: 'n-1727', kana: 'わ', kanji: '輪 / 和', meaning: '圓圈 / 和諧', type: '名詞' },
    { id: 'n-1728', kana: 'ワイシャツ', kanji: 'Y-shirt', meaning: '襯衫', type: '名詞' },
    { id: 'n-1729', kana: 'わけ', kanji: '訳', meaning: '理由/道理', type: '名詞' },
    { id: 'n-1730', kana: 'わざ', kanji: '技', meaning: '技巧', type: '名詞' },
    { id: 'n-1731', kana: 'わざわざ', kanji: '-', meaning: '特意/費事 (副詞)', type: '名詞' },
    { id: 'n-1732', kana: 'わたし', kanji: '私', meaning: '我', type: '名詞' },
    { id: 'n-1733', kana: 'わたしたち', kanji: '私達', meaning: '我們', type: '名詞' },
    { id: 'n-1734', kana: 'わだい', kanji: '話題', meaning: '話題', type: '名詞' },
    { id: 'n-1735', kana: 'わび', kanji: '詫び', meaning: '道歉 (名詞)', type: '名詞' },
    { id: 'n-1736', kana: 'わふく', kanji: '和服', meaning: '和服', type: '名詞' },
    { id: 'n-1737', kana: 'わり', kanji: '割', meaning: '成/比例', type: '名詞' },
    { id: 'n-1738', kana: 'わりあい', kanji: '割合', meaning: '比例/比較(副詞)', type: '名詞' },
    { id: 'n-1739', kana: 'わりびき', kanji: '割引', meaning: '折扣', type: '名詞' },
    { id: 'n-1740', kana: 'わるぐち', kanji: '悪口', meaning: '壞話', type: '名詞' },
    { id: 'n-1741', kana: 'われわれ', kanji: '我々', meaning: '我們 (鄭重)', type: '名詞' },
    { id: 'n-1742', kana: 'わん', kanji: '碗', meaning: '碗', type: '名詞' },
    { id: 'n-1743', kana: 'ワンピース', kanji: 'One-piece', meaning: '洋裝/連身裙', type: '名詞' }

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
  
  // New: Calendar View State (Offset in weeks, 0 = current week)
  const [calendarWeekOffset, setCalendarWeekOffset] = useState(0);

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
    setView('quiz'); 
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
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };
  const isFuture = (date) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const target = new Date(date);
    target.setHours(0,0,0,0);
    return target > today;
  }

  // Generate Calendar Days
  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date();
    // Anchor point: Start from 2 days ago, then shift by weeks
    const startPoint = new Date(today);
    startPoint.setDate(today.getDate() - 2 + (calendarWeekOffset * 7));
    
    for (let i = 0; i < 5; i++) {
        const d = new Date(startPoint);
        d.setDate(startPoint.getDate() + i);
        days.push(d);
    }
    return days;
  }, [calendarWeekOffset]);

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
                 <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
                    <button onClick={() => setCalendarWeekOffset(prev => prev - 1)} className="p-1 hover:bg-white rounded-md transition text-stone-500"><ChevronLeft size={16}/></button>
                    <span className="text-xs font-mono text-stone-500 w-16 text-center">
                        {calendarWeekOffset === 0 ? '本週' : calendarWeekOffset === -1 ? '上週' : calendarWeekOffset > 0 ? '下週' : `${Math.abs(calendarWeekOffset)}週前`}
                    </span>
                    <button onClick={() => setCalendarWeekOffset(prev => prev + 1)} className="p-1 hover:bg-white rounded-md transition text-stone-500"><ChevronRight size={16}/></button>
                 </div>
              </div>
              
              {/* 日期選擇器 */}
              <div className="flex justify-between mb-4 gap-1">
                {calendarDays.map((d, i) => {
                  const isSelected = d.getDate() === selectedDate.getDate() && d.getMonth() === selectedDate.getMonth();
                  const isTodayDate = isToday(d);
                  
                  return (
                    <button 
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className={`flex flex-col items-center justify-center flex-1 py-2 rounded-xl transition-all ${
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
                className={`w-full py-4 rounded-xl font-bold shadow-lg active:scale-95 transition flex items-center justify-center gap-2 relative overflow-hidden group ${
                    isFuture(selectedDate) 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' // Future
                    : isToday(selectedDate)
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' // Today
                        : 'bg-stone-700 text-white' // Past
                }`}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition"></div>
                {isFuture(selectedDate) ? <Clock size={20} /> : <RefreshCw size={20} />}
                
                {isToday(selectedDate) 
                    ? '開始今日特訓' 
                    : isFuture(selectedDate)
                        ? `預習 ${selectedDate.getMonth()+1}/${selectedDate.getDate()} 的單字`
                        : `複習 ${selectedDate.getMonth()+1}/${selectedDate.getDate()} 的單字`
                }
                <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded ml-2">40字</span>
              </button>
            </div>

            {/* 🏆 總複習按鈕 */}
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
            label={isDailyMode ? `${selectedDate.getMonth()+1}/${selectedDate.getDate()} ${isFuture(selectedDate) ? '預習' : isToday(selectedDate) ? '今日特訓' : '複習'}` : CATEGORIES.find(c => c.key === activeCategory)?.label}
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


