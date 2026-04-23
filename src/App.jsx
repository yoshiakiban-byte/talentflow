import React, { useState, useMemo, useCallback } from "react";
import { Search, Users, Briefcase, Target, BookOpen, FileText, ChevronRight, ChevronDown, Star, TrendingUp, AlertCircle, CheckCircle, XCircle, Clock, Building2, MapPin, Monitor, Edit3, Plus, ArrowLeft, BarChart3, Settings, User, Home, List, MessageSquare, Sparkles, RefreshCw, Eye, Download, Filter, Zap, Award, GraduationCap, Calendar, Hash, ArrowUpRight, Shield, Layers, Brain, Send, Clipboard, X, Mail, Paperclip, Copy, UserX, ClipboardList, Bell, Lock, LogIn, CheckSquare, FileCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts";

// ============================================================
// DUMMY DATA - Comprehensive Japanese business data
// ============================================================

let CANDIDATES = [
  {
    id: "C-001", name: "田中 太郎", age: 32, gender: "男性", employmentType: "正社員", currentRole: "経理主任", photo: "https://randomuser.me/api/portraits/men/32.jpg",
    skills: [
      { name: "Excel", level: 4, years: 8 }, { name: "Word", level: 3, years: 8 },
      { name: "簿記", level: 4, years: 6 }, { name: "給与計算", level: 4, years: 5 },
      { name: "SAP", level: 3, years: 4 }, { name: "PowerPoint", level: 2, years: 3 }
    ],
    totalYears: 10,
    careerHistory: [
      { period: "2023/04 - 現在", project: "大手製造企業 経理部", role: "経理主任", tech: ["Excel", "SAP", "給与計算"], detail: "月次決算業務、給与計算・年末調整の全般を担当。月間100件以上の仕訳処理を管理。", team: 5, phase: "運用・管理" },
      { period: "2020/01 - 2023/03", project: "金融系企業 経理課", role: "経理スタッフ", tech: ["Excel", "簿記", "Oracle EBS"], detail: "決算業務補助、伝票整理、ファイリング管理を実施。", team: 8, phase: "支援・運用" },
      { period: "2018/04 - 2019/12", project: "不動産企業 一般事務", role: "事務スタッフ", tech: ["Word", "Excel"], detail: "請求書作成、メール対応、電話応対。基本的な事務スキルを習得。", team: 3, phase: "実務経験" }
    ],
    certifications: ["日商簿記2級", "Excel表計算処理技能認定"],
    aspiration: "経理実務を深掘りして、経営数字を作る側に携わりたい",
    wantToDo: "月次決算、経理業務全般、給与・勤怠管理",
    avoidToDo: "単純なデータ入力のみ",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2リモート希望",
    changeIntent: "良い派遣先があれば検討",
    unitPrice: 35,
    assignment: { project: "大手製造企業 経理部", customer: "ABC製造", startDate: "2025/10/01", endDate: "2026/05/31" },
    assessments: { "簿記": 82, "給与計算": 78, "Excel": 85, "経理実務": 80, "決算業務": 75 },
    status: "就業中"
  },
  {
    id: "C-002", name: "鈴木 花子", age: 27, gender: "女性", employmentType: "正社員", currentRole: "一般事務", photo: "https://randomuser.me/api/portraits/women/44.jpg",
    skills: [
      { name: "電話対応", level: 4, years: 4 }, { name: "データ入力", level: 4, years: 4 },
      { name: "ビジネスマナー", level: 3, years: 4 }, { name: "Excel", level: 3, years: 3 },
      { name: "Word", level: 3, years: 3 }, { name: "来客対応", level: 3, years: 3 }
    ],
    totalYears: 5,
    careerHistory: [
      { period: "2023/01 - 現在", project: "大手流通企業 事務部", role: "一般事務", tech: ["Excel", "Word"], detail: "営業事務補助、見積作成、請求書処理を実施。月間300件以上の処理。", team: 6, phase: "実務運用" },
      { period: "2021/04 - 2022/12", project: "保険企業 カスタマーサービス", role: "事務スタッフ", tech: ["CRM", "Word", "Excel"], detail: "顧客問い合わせ対応、書類作成。多数の顧客対応経験あり。", team: 4, phase: "顧客対応" }
    ],
    certifications: ["秘書検定2級", "MOS Word"],
    aspiration: "事務スキルを磨いて営業事務へキャリアアップしたい",
    wantToDo: "営業事務、データ整理、顧客対応",
    avoidToDo: "夜間シフト、外出が多い案件",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "フルリモート希望",
    changeIntent: "積極的に検討中",
    unitPrice: 25,
    assessments: { "電話対応": 80, "データ入力": 82, "Excel": 70, "ビジネスマナー": 75, "事務処理": 78 },
    status: "育成対象"
  },
  {
    id: "C-003", name: "山田 健一", age: 38, gender: "男性", employmentType: "フリーランス", currentRole: "労務コンサルタント", photo: "https://randomuser.me/api/portraits/men/45.jpg",
    skills: [
      { name: "社会保険手続き", level: 4, years: 8 }, { name: "労務管理", level: 4, years: 8 },
      { name: "給与計算", level: 4, years: 7 }, { name: "Excel", level: 3, years: 8 },
      { name: "年末調整", level: 4, years: 6 }, { name: "勤怠管理", level: 3, years: 5 }
    ],
    totalYears: 12,
    careerHistory: [
      { period: "2021/01 - 現在", project: "複数企業 労務アウトソーシング", role: "労務コンサルタント", tech: ["Excel", "給与計算"], detail: "5社以上の労務業務を兼任。社会保険手続き、給与計算、年末調整の全般を管理。", team: 15, phase: "管理・指導" },
      { period: "2018/01 - 2020/12", project: "大手企業 人事部", role: "労務スタッフ", tech: ["Excel", "社会保険システム"], detail: "入退社手続き、給与計算、人事労務の日常業務。300名規模の管理経験。", team: 8, phase: "運用・管理" },
      { period: "2015/04 - 2017/12", project: "商社 人事課", role: "事務スタッフ", tech: ["Word", "Excel"], detail: "基本的な人事事務を実施。", team: 4, phase: "実務経験" }
    ],
    certifications: ["社会保険労務士", "給与計算実務能力検定"],
    aspiration: "労務管理のスペシャリストとして経営層の経営判断を支援したい",
    wantToDo: "労務管理全般、給与システム導入支援、就業規則策定",
    avoidToDo: "客先常駐（週5）",
    location: "東京都",
    remoteOk: true, onsiteOk: false,
    workCondition: "フルリモート必須、週1出社まで",
    changeIntent: "条件次第で検討",
    unitPrice: 45,
    assignment: { project: "複数企業アウトソーシング", customer: "複数", startDate: "2025/07/01", endDate: "2026/06/30" },
    assessments: { "労務管理": 90, "給与計算": 88, "社会保険": 92, "Excel": 75, "年末調整": 90 },
    status: "就業中"
  },
  {
    id: "C-004", name: "佐藤 美咲", age: 24, gender: "女性", employmentType: "正社員", currentRole: "事務スタッフ", photo: "https://randomuser.me/api/portraits/women/17.jpg",
    skills: [
      { name: "Excel", level: 2, years: 1.5 }, { name: "データ入力", level: 3, years: 1.5 },
      { name: "タイピング", level: 3, years: 2 }, { name: "Word", level: 2, years: 1 },
      { name: "PowerPoint", level: 1, years: 0.5 }, { name: "電話対応", level: 2, years: 1.5 }
    ],
    totalYears: 2,
    careerHistory: [
      { period: "2024/04 - 現在", project: "IT企業 一般事務部", role: "事務スタッフ", tech: ["Excel", "Word"], detail: "データ入力、メール対応、書類整理。事務スキルの基本を習得中。", team: 4, phase: "育成" }
    ],
    certifications: ["MOS Word", "秘書検定3級"],
    aspiration: "OA事務スキルを磨いて、より難度の高い事務業務に挑戦したい",
    wantToDo: "Excel実務、事務処理、顧客対応",
    avoidToDo: "なし（幅広く経験したい）",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "特に制限なし",
    unitPrice: 22,
    changeIntent: "積極的に検討中",
    assessments: { "Excel": 35, "データ入力": 60, "ビジネスマナー": 50, "電話対応": 45, "Word": 40 },
    status: "育成対象"
  },
  {
    id: "C-005", name: "中村 大輔", age: 42, gender: "男性", employmentType: "フリーランス", currentRole: "営業事務リーダー", photo: "https://randomuser.me/api/portraits/men/67.jpg",
    skills: [
      { name: "営業事務", level: 4, years: 10 }, { name: "営業サポート", level: 4, years: 10 },
      { name: "Excel", level: 3, years: 10 }, { name: "顧客管理", level: 4, years: 8 },
      { name: "提案資料作成", level: 3, years: 8 }, { name: "見積作成", level: 4, years: 9 }
    ],
    totalYears: 16,
    careerHistory: [
      { period: "2020/01 - 現在", project: "複数企業 営業事務支援", role: "営業事務マネージャー", tech: ["Excel", "SFA", "提案ツール"], detail: "5つの営業部門の事務業務を統括。月間1000件以上の営業サポート。", team: 20, phase: "管理・支援" },
      { period: "2016/01 - 2019/12", project: "建設企業 営業部", role: "営業事務", tech: ["Excel", "Word", "顧客管理"], detail: "営業チーム（20名）の事務業務全般を担当。見積・請求・進捗管理。", team: 20, phase: "運用" },
      { period: "2012/04 - 2015/12", project: "流通企業 営業課", role: "営業補助", tech: ["Word", "Excel"], detail: "営業基本を学ぶ。", team: 8, phase: "実務経験" }
    ],
    certifications: ["Excel表計算処理技能認定1級", "秘書検定準1級"],
    aspiration: "営業事務のスペシャリストとして、営業部門の成果を最大化したい",
    wantToDo: "営業サポート、提案資料作成、受注管理、マネジメント",
    avoidToDo: "単調な入力業務のみ",
    location: "神奈川県",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2出社可能",
    changeIntent: "良い派遣先があれば検討",
    unitPrice: 40,
    assignment: { project: "複数企業営業支援", customer: "複数", startDate: "2025/06/01", endDate: "2026/05/15" },
    assessments: { "営業事務": 88, "提案資料": 82, "Excel": 78, "顧客管理": 85, "見積作成": 88 },
    status: "就業中"
  },
  {
    id: "C-006", name: "高橋 翔太", age: 29, gender: "男性", employmentType: "正社員", currentRole: "ITヘルプデスク", photo: "https://randomuser.me/api/portraits/men/22.jpg",
    skills: [
      { name: "HTML/CSS", level: 3, years: 3 }, { name: "JavaScript", level: 3, years: 3 },
      { name: "Excel", level: 2, years: 2 }, { name: "Salesforce", level: 2, years: 1 },
      { name: "ビジネスマナー", level: 2, years: 3 }, { name: "チームコミュニケーション", level: 3, years: 2 }
    ],
    totalYears: 5,
    careerHistory: [
      { period: "2022/01 - 現在", project: "金融企業 IT部", role: "ITサポート", tech: ["HTML/CSS", "JavaScript", "Excel"], detail: "基幹システム保守、ユーザーサポート。月間50件以上のチケット対応。", team: 8, phase: "保守・サポート" },
      { period: "2020/04 - 2021/12", project: "流通企業 システム部", role: "IT事務", tech: ["Excel", "Word"], detail: "システム開発チームの事務支援、ドキュメント作成。", team: 5, phase: "支援" }
    ],
    certifications: ["ITパスポート", "CompTIA A+"],
    aspiration: "ITサポートスキルを磨いて、ヘルプデスク責任者へキャリアアップしたい",
    wantToDo: "ユーザーサポート、システム保守、トラブルシューティング",
    avoidToDo: "ネットワーク設定のみの案件",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週3リモート可",
    changeIntent: "積極的に検討中",
    unitPrice: 30,
    assessments: { "ユーザーサポート": 72, "HTML/CSS": 68, "Excel": 65, "トラブル対応": 70, "コミュニケーション": 75 },
    status: "提案可能"
  },
  {
    id: "C-007", name: "小林 由紀", age: 31, gender: "女性", employmentType: "フリーランス", currentRole: "コールセンターSV", photo: "https://randomuser.me/api/portraits/women/22.jpg",
    skills: [
      { name: "コールセンター運用", level: 4, years: 6 }, { name: "電話対応", level: 4, years: 8 },
      { name: "顧客対応", level: 4, years: 8 }, { name: "クレーム対応", level: 4, years: 6 },
      { name: "データ入力", level: 3, years: 5 }, { name: "Excel", level: 2, years: 3 }
    ],
    totalYears: 10,
    careerHistory: [
      { period: "2021/06 - 現在", project: "複数コールセンター 管理者", role: "コールセンターSV", tech: ["CRM", "Excel"], detail: "3つのコールセンター（100名規模）を統括。KPI管理、オペレータ育成。", team: 100, phase: "管理・育成" },
      { period: "2018/01 - 2021/05", project: "大手通信企業 カスタマーセンター", role: "コールセンターリーダー", tech: ["CRM", "Excel"], detail: "顧客問い合わせ対応チーム（20名）をリード。品質管理、新人育成。", team: 20, phase: "運用・育成" },
      { period: "2015/04 - 2017/12", project: "保険企業 カスタマーサービス", role: "CSO", tech: ["CRM"], detail: "顧客問い合わせ対応、事務処理。", team: 10, phase: "実務" }
    ],
    certifications: ["コールセンター検定", "ビジネス電話検定"],
    aspiration: "カスタマーサービスの質の向上とオペレータ育成に尽力したい",
    wantToDo: "カスタマーサービス運用、クレーム対応、チーム育成",
    avoidToDo: "設定作業のみ",
    location: "福岡県",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2出社可能",
    changeIntent: "良い派遣先があれば検討",
    unitPrice: 38,
    assessments: { "顧客対応": 90, "クレーム対応": 88, "電話対応": 92, "マネジメント": 85, "Excel": 55 },
    status: "提案可能"
  },
  {
    id: "C-008", name: "吉田 まり", age: 26, gender: "女性", employmentType: "正社員", currentRole: "医療事務リーダー", photo: "https://randomuser.me/api/portraits/women/27.jpg",
    skills: [
      { name: "医療事務", level: 3, years: 3 }, { name: "レセプト処理", level: 3, years: 3 },
      { name: "患者対応", level: 3, years: 3 }, { name: "医療用語", level: 2, years: 3 },
      { name: "Excel", level: 2, years: 2 }, { name: "電話対応", level: 3, years: 3 }
    ],
    totalYears: 4,
    careerHistory: [
      { period: "2023/01 - 現在", project: "病院 事務部", role: "医療事務", tech: ["医療専用システム", "Excel"], detail: "患者対応、カルテ整理、レセプト処理。月間500件以上の処理。", team: 8, phase: "運用" },
      { period: "2021/04 - 2022/12", project: "診療所 受付", role: "医療事務補助", tech: ["医療システム"], detail: "受付業務、電話対応、患者管理。", team: 3, phase: "実務経験" }
    ],
    certifications: ["医療事務認定実務者", "秘書検定2級"],
    aspiration: "医療現場での事務スキルを深掘りして、診療報酬アドバイザーになりたい",
    wantToDo: "医療事務、レセプト処理、患者対応",
    avoidToDo: "単純なデータ入力のみ",
    location: "大阪府",
    remoteOk: false, onsiteOk: true,
    workCondition: "現場常駐希望",
    changeIntent: "良い派遣先があれば検討",
    unitPrice: 28,
    assessments: { "医療事務": 75, "レセプト": 72, "患者対応": 78, "Excel": 60, "医療用語": 70 },
    status: "育成対象"
  },
  {
    id: "C-009", name: "加藤 健太", age: 35, gender: "男性", employmentType: "フリーランス", currentRole: "製造管理スタッフ", photo: "https://randomuser.me/api/portraits/men/55.jpg",
    skills: [
      { name: "製造管理", level: 4, years: 8 }, { name: "品質管理", level: 4, years: 8 },
      { name: "在庫管理", level: 3, years: 7 }, { name: "生産計画", level: 3, years: 6 },
      { name: "Excel", level: 3, years: 8 }, { name: "フォークリフト", level: 3, years: 6 }
    ],
    totalYears: 12,
    careerHistory: [
      { period: "2020/01 - 現在", project: "複数製造企業 管理兼務", role: "生産管理マネージャー", tech: ["ERP", "Excel"], detail: "3つの工場（500名規模）の生産計画・品質管理を統括。生産効率15%向上を実現。", team: 500, phase: "管理・改善" },
      { period: "2016/01 - 2019/12", project: "自動車部品企業 製造課", role: "製造リーダー", tech: ["Excel", "QC"], detail: "100名の製造チームをリード。品質改善活動を主導。", team: 100, phase: "運用・改善" },
      { period: "2013/04 - 2015/12", project: "食品工場 製造部", role: "製造スタッフ", tech: ["基本的な製造"], detail: "ライン作業を実施。", team: 50, phase: "実務経験" }
    ],
    certifications: ["フォークリフト運転技能講習", "QC検定2級"],
    aspiration: "製造管理のスペシャリストとして、業界全体の効率化に貢献したい",
    wantToDo: "生産計画、品質管理、チーム育成",
    avoidToDo: "完全リモート案件",
    location: "愛知県",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2出社可能",
    changeIntent: "条件次第で検討",
    unitPrice: 42,
    assignment: { project: "複数製造企業管理", customer: "複数", startDate: "2025/05/01", endDate: "2026/04/30" },
    assessments: { "製造管理": 88, "品質管理": 85, "生産計画": 80, "Excel": 75, "リーダーシップ": 82 },
    status: "就業中"
  },
  {
    id: "C-010", name: "田中 由美", age: 28, gender: "女性", employmentType: "正社員", currentRole: "受付・秘書", photo: "https://randomuser.me/api/portraits/women/35.jpg",
    skills: [
      { name: "受付業務", level: 4, years: 4 }, { name: "秘書業務", level: 4, years: 4 },
      { name: "来客対応", level: 4, years: 4 }, { name: "ビジネスマナー", level: 4, years: 4 },
      { name: "スケジュール管理", level: 3, years: 3 }, { name: "Excel", level: 2, years: 2 }
    ],
    totalYears: 6,
    careerHistory: [
      { period: "2022/01 - 現在", project: "大手企業 受付・秘書課", role: "受付秘書", tech: ["会議室管理システム", "Excel"], detail: "役員秘書、来客対応、スケジュール管理。月間200件以上のゲスト対応。", team: 6, phase: "運用" },
      { period: "2019/04 - 2021/12", project: "オフィス企業 受付", role: "受付スタッフ", tech: ["来客管理"], detail: "ビル全体の来客対応、電話応対。", team: 8, phase: "実務経験" }
    ],
    certifications: ["秘書検定1級", "ビジネスマナー検定1級"],
    aspiration: "秘書としてのスキルを深掘りして、経営層の最高の秘書になりたい",
    wantToDo: "秘書業務、受付対応、スケジュール管理",
    avoidToDo: "事務処理のみ",
    location: "東京都",
    remoteOk: false, onsiteOk: true,
    workCondition: "現場常駐必須",
    changeIntent: "積極的に検討中",
    unitPrice: 32,
    assessments: { "秘書業務": 85, "来客対応": 88, "ビジネスマナー": 90, "スケジュール": 82, "Excel": 55 },
    status: "提案可能"
  },
  {
    id: "C-011", name: "佐々木 太郎", age: 33, gender: "男性", employmentType: "フリーランス", currentRole: "営業アシスタント", photo: "https://randomuser.me/api/portraits/men/48.jpg",
    skills: [
      { name: "営業スキル", level: 4, years: 9 }, { name: "営業企画", level: 3, years: 6 },
      { name: "顧客開拓", level: 4, years: 8 }, { name: "プレゼンテーション", level: 3, years: 7 },
      { name: "Excel", level: 3, years: 8 }, { name: "見積作成", level: 3, years: 7 }
    ],
    totalYears: 11,
    careerHistory: [
      { period: "2020/01 - 現在", project: "複数企業 営業サポート", role: "営業コンサルタント", tech: ["SFA", "Excel"], detail: "5社の営業部門を支援。売上向上戦略立案、営業チーム育成。年間成約率20%向上。", team: 50, phase: "戦略・支援" },
      { period: "2016/01 - 2019/12", project: "建設企業 営業部", role: "営業マン", tech: ["顧客管理", "Excel"], detail: "BtoB営業として5,000万円以上の売上を達成。新規顧客開拓を主導。", team: 20, phase: "営業・開拓" },
      { period: "2013/04 - 2015/12", project: "流通企業 営業課", role: "営業アシスタント", tech: ["Word", "Excel"], detail: "営業基本を学ぶ。", team: 15, phase: "実務経験" }
    ],
    certifications: ["営業力強化コース修了", "Excel表計算処理技能認定"],
    aspiration: "営業と事務を両立した営業企画の専門家になりたい",
    wantToDo: "営業支援、営業企画、顧客開拓戦略",
    avoidToDo: "完全リモート案件",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2出社可能",
    changeIntent: "良い派遣先があれば検討",
    unitPrice: 44,
    assignment: { project: "複数企業営業支援", customer: "複数", startDate: "2025/04/01", endDate: "2026/03/31" },
    assessments: { "営業スキル": 88, "営業企画": 80, "顧客開拓": 85, "Excel": 78, "プレゼン": 82 },
    status: "就業中"
  },
  {
    id: "C-012", name: "鈴木 美咲", age: 30, gender: "女性", employmentType: "正社員", currentRole: "一般事務", photo: "https://randomuser.me/api/portraits/women/52.jpg",
    skills: [
      { name: "一般事務", level: 4, years: 6 }, { name: "Excel", level: 3, years: 6 },
      { name: "Word", level: 3, years: 6 }, { name: "PowerPoint", level: 2, years: 3 },
      { name: "データ入力", level: 4, years: 6 }, { name: "電話対応", level: 3, years: 5 }
    ],
    totalYears: 8,
    careerHistory: [
      { period: "2021/04 - 現在", project: "大手企業 総務部", role: "一般事務", tech: ["Excel", "Word"], detail: "部門全体の事務業務を統括。月間500件以上の書類処理。", team: 12, phase: "運用・管理" },
      { period: "2019/01 - 2021/03", project: "IT企業 一般事務", role: "事務スタッフ", tech: ["Excel", "Word"], detail: "事務全般、データ入力、ファイリング。", team: 8, phase: "実務経験" }
    ],
    certifications: ["MOS Excel", "MOS Word"],
    aspiration: "事務スキルを極めて、更に難度の高い業務にチャレンジしたい",
    wantToDo: "総務事務、データ管理、ドキュメント作成",
    avoidToDo: "単純な入力業務のみ",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2リモート可",
    changeIntent: "積極的に検討中",
    unitPrice: 33,
    assessments: { "一般事務": 82, "Excel": 75, "Word": 78, "データ入力": 85, "電話対応": 70 },
    status: "提案可能"
  },
  {
    id: "C-013", name: "伊藤 健司", age: 40, gender: "男性", employmentType: "フリーランス", currentRole: "物流管理リーダー", photo: "https://randomuser.me/api/portraits/men/72.jpg",
    skills: [
      { name: "物流管理", level: 4, years: 12 }, { name: "在庫管理", level: 4, years: 12 },
      { name: "ルート最適化", level: 3, years: 8 }, { name: "供給チェーン", level: 4, years: 10 },
      { name: "Excel", level: 3, years: 12 }, { name: "WMS", level: 3, years: 6 }
    ],
    totalYears: 15,
    careerHistory: [
      { period: "2019/01 - 現在", project: "複数物流企業 管理者", role: "物流管理マネージャー", tech: ["WMS", "Excel"], detail: "3つの倉庫（200名規模）を統括。在庫回転率30%向上、配送効率20%改善を実現。", team: 200, phase: "管理・改善" },
      { period: "2015/01 - 2018/12", project: "大手流通企業 物流課", role: "物流リーダー", tech: ["WMS", "Excel"], detail: "倉庫チーム（50名）をリード。配送計画、在庫管理を推進。", team: 50, phase: "運用・改善" },
      { period: "2012/04 - 2014/12", project: "運送企業 物流部", role: "フォークリフター", tech: ["基本的な物流"], detail: "荷役作業を実施。", team: 30, phase: "実務経験" }
    ],
    certifications: ["フォークリフト運転技能講習", "危険物輸送従事者講習"],
    aspiration: "物流業界全体の効率化と人材育成に貢献したい",
    wantToDo: "物流管理、在庫最適化、ネットワーク設計",
    avoidToDo: "現場作業のみ",
    location: "神奈川県",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2出社可能",
    changeIntent: "条件次第で検討",
    unitPrice: 48,
    assignment: { project: "複数物流企業管理", customer: "複数", startDate: "2025/03/01", endDate: "2026/02/28" },
    assessments: { "物流管理": 92, "在庫管理": 90, "供給チェーン": 88, "Excel": 78, "リーダーシップ": 85 },
    status: "就業中"
  },
  {
    id: "C-014", name: "山本 由衣", age: 26, gender: "女性", employmentType: "正社員", currentRole: "マーケティング事務", photo: "https://randomuser.me/api/portraits/women/62.jpg",
    skills: [
      { name: "マーケティング", level: 3, years: 3 }, { name: "データ分析", level: 2, years: 2 },
      { name: "Excel", level: 3, years: 3 }, { name: "SNS運用", level: 3, years: 3 },
      { name: "PowerPoint", level: 3, years: 3 }, { name: "Tableau", level: 1, years: 0.5 }
    ],
    totalYears: 4,
    careerHistory: [
      { period: "2022/04 - 現在", project: "大手企業 マーケティング部", role: "マーケティング担当", tech: ["Excel", "PowerPoint", "SNS"], detail: "キャンペーン企画、データ分析、SNS運用。月間100万PVの施策を実施。", team: 8, phase: "企画・運用" },
      { period: "2021/04 - 2022/03", project: "スタートアップ 事務兼務", role: "マーケティング補助", tech: ["Excel"], detail: "マーケティング基礎を習得。", team: 3, phase: "実務経験" }
    ],
    certifications: ["Google Analytics認定資格", "マーケティング基礎講座修了"],
    aspiration: "データドリブンなマーケティング戦略を立案して、ビジネス成長に貢献したい",
    wantToDo: "マーケティング企画、データ分析、キャンペーン運用",
    avoidToDo: "単純なデータ入力のみ",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2リモート可",
    changeIntent: "積極的に検討中",
    unitPrice: 36,
    assessments: { "マーケティング": 72, "データ分析": 65, "Excel": 75, "企画力": 70, "SNS運用": 78 },
    status: "提案可能"
  },
  {
    id: "C-015", name: "鈴木 拓也", age: 32, gender: "男性", employmentType: "フリーランス", currentRole: "経理スタッフ", photo: "https://randomuser.me/api/portraits/men/18.jpg",
    skills: [
      { name: "給与計算", level: 4, years: 7 }, { name: "簿記", level: 3, years: 6 },
      { name: "Excel", level: 4, years: 8 }, { name: "経理実務", level: 4, years: 7 },
      { name: "勤怠管理", level: 3, years: 6 }, { name: "決算業務", level: 3, years: 5 }
    ],
    totalYears: 9,
    careerHistory: [
      { period: "2020/01 - 現在", project: "複数企業 経理・給与アウトソーシング", role: "経理・給与コンサルタント", tech: ["Excel", "給与計算"], detail: "8社以上の経理・給与業務を兼任。月間1000件以上の仕訳処理、給与計算。", team: 20, phase: "運用・管理" },
      { period: "2017/01 - 2019/12", project: "中堅企業 経理部", role: "経理スタッフ", tech: ["Excel", "簿記"], detail: "月次決算、給与計算、請求管理を実施。", team: 6, phase: "運用・管理" },
      { period: "2015/04 - 2016/12", project: "商社 事務", role: "事務スタッフ", tech: ["Word", "Excel"], detail: "基本的な経理事務を習得。", team: 4, phase: "実務経験" }
    ],
    certifications: ["日商簿記2級", "給与計算実務能力検定"],
    aspiration: "経理業務全般を深掘りして、経理責任者レベルの知識を身につけたい",
    wantToDo: "給与計算、決算業務、経理管理全般",
    avoidToDo: "単純なデータ入力のみ",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週1出社可能",
    changeIntent: "良い派遣先があれば検討",
    unitPrice: 41,
    assignment: { project: "複数企業経理・給与支援", customer: "複数", startDate: "2025/05/01", endDate: "2026/04/30" },
    assessments: { "給与計算": 85, "簿記": 78, "Excel": 88, "経理実務": 82, "決算業務": 75 },
    status: "提案可能"
  },
  {
    id: "C-016", name: "佐藤 優希", age: 29, gender: "女性", employmentType: "正社員", currentRole: "一般事務スタッフ", photo: "https://randomuser.me/api/portraits/women/72.jpg",
    skills: [
      { name: "一般事務", level: 3, years: 4 }, { name: "Excel", level: 3, years: 4 },
      { name: "Word", level: 3, years: 4 }, { name: "顧客対応", level: 3, years: 4 },
      { name: "電話対応", level: 3, years: 4 }, { name: "PowerPoint", level: 2, years: 2 }
    ],
    totalYears: 5,
    careerHistory: [
      { period: "2021/04 - 現在", project: "金融企業 事務部", role: "一般事務", tech: ["Excel", "Word"], detail: "顧客対応、書類処理、ファイリング。月間300件以上の書類処理。", team: 10, phase: "運用" },
      { period: "2019/10 - 2021/03", project: "保険企業 事務", role: "事務スタッフ", tech: ["Word", "Excel"], detail: "事務全般を実施。", team: 6, phase: "実務経験" }
    ],
    certifications: ["MOS Excel", "秘書検定2級"],
    aspiration: "事務スキルを極めて、マネジメント職へステップアップしたい",
    wantToDo: "一般事務、顧客対応、データ管理",
    avoidToDo: "夜間シフト",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2リモート可",
    changeIntent: "積極的に検討中",
    unitPrice: 29,
    assessments: { "一般事務": 75, "Excel": 72, "Word": 75, "顧客対応": 78, "電話対応": 80 },
    status: "提案可能"
  },
  {
    id: "C-017", name: "松本 健太", age: 37, gender: "男性", employmentType: "フリーランス", currentRole: "営業管理リーダー", photo: "https://randomuser.me/api/portraits/men/61.jpg",
    skills: [
      { name: "営業事務", level: 4, years: 8 }, { name: "営業管理", level: 4, years: 6 },
      { name: "提案資料作成", level: 3, years: 7 }, { name: "Excel", level: 4, years: 8 },
      { name: "見積作成", level: 4, years: 8 }, { name: "受注管理", level: 3, years: 6 }
    ],
    totalYears: 11,
    careerHistory: [
      { period: "2019/01 - 現在", project: "複数企業 営業事務マネージャー", role: "営業管理リーダー", tech: ["SFA", "Excel"], detail: "4つの営業部門を支援。営業効率化で成約率25%向上を実現。", team: 50, phase: "管理・支援" },
      { period: "2015/01 - 2018/12", project: "建設企業 営業部", role: "営業事務", tech: ["Excel", "Word"], detail: "営業チーム（15名）の事務業務全般を担当。", team: 15, phase: "運用" },
      { period: "2013/04 - 2014/12", project: "流通企業 営業課", role: "営業補助", tech: ["Word", "Excel"], detail: "営業基本を学ぶ。", team: 10, phase: "実務経験" }
    ],
    certifications: ["Excel表計算処理技能認定1級", "営業力強化コース修了"],
    aspiration: "営業事務の全体的なマネジメントを担当できる専門家になりたい",
    wantToDo: "営業管理、提案資料作成、受注管理全般",
    avoidToDo: "単調な入力業務のみ",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2出社可能",
    changeIntent: "条件次第で検討",
    unitPrice: 43,
    assignment: { project: "複数企業営業管理", customer: "複数", startDate: "2025/04/01", endDate: "2026/03/31" },
    assessments: { "営業管理": 85, "提案資料": 80, "Excel": 85, "見積作成": 82, "受注管理": 78 },
    status: "就業中"
  },
  {
    id: "C-018", name: "田中 由美子", age: 34, gender: "女性", employmentType: "正社員", currentRole: "人事・採用事務", photo: "https://randomuser.me/api/portraits/women/19.jpg",
    skills: [
      { name: "人事事務", level: 4, years: 7 }, { name: "採用業務", level: 3, years: 5 },
      { name: "給与計算", level: 3, years: 5 }, { name: "Excel", level: 3, years: 7 },
      { name: "勤怠管理", level: 3, years: 6 }, { name: "社員研修", level: 2, years: 3 }
    ],
    totalYears: 9,
    careerHistory: [
      { period: "2021/01 - 現在", project: "大手企業 人事部", role: "人事担当", tech: ["Excel", "人事管理システム"], detail: "採用業務、給与計算、人事評価。500名規模の人事業務を支援。", team: 8, phase: "運用・管理" },
      { period: "2018/01 - 2020/12", project: "中堅企業 人事課", role: "人事事務", tech: ["Excel", "Word"], detail: "人事事務全般、採用補助、給与管理。", team: 5, phase: "運用" },
      { period: "2016/04 - 2017/12", project: "企業 事務部", role: "事務スタッフ", tech: ["Word", "Excel"], detail: "基本的な事務を習得。", team: 4, phase: "実務経験" }
    ],
    certifications: ["人事総務検定2級", "MOS Excel"],
    aspiration: "人事業務全般に精通して、タレントマネジメント専門家になりたい",
    wantToDo: "採用業務、人事評価、給与管理、研修企画",
    avoidToDo: "単純なファイリングのみ",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2リモート可",
    changeIntent: "良い派遣先があれば検討",
    unitPrice: 37,
    assessments: { "人事事務": 80, "採用業務": 75, "給与計算": 72, "Excel": 78, "勤怠管理": 75 },
    status: "提案可能"
  }
];

const COMPANIES = [
  { id: "CO-001", name: "三菱商事グループ", industry: "総合商社", size: "5000名以上", culture: ["安定志向", "事業多角化", "グローバル"], techStack: ["SAP", "Oracle EBS", "Excel"], workStyle: "週2リモート可", location: "東京（大丸ビル）", keywords: ["大規模", "経理", "総務"] },
  { id: "CO-002", name: "佐川急便大阪支店", industry: "物流", size: "3000名以上", culture: ["チームワーク", "効率重視", "DX推進"], techStack: ["WMS", "Excel", "勤怠システム"], workStyle: "現場常駐", location: "大阪（此花区）", keywords: ["物流", "在庫管理", "配送"] },
  { id: "CO-003", name: "野村総合研究所", industry: "コンサルティング/IT", size: "1500名", culture: ["提案力重視", "コンサル志向", "教育充実"], techStack: ["Excel", "PowerPoint", "Salesforce"], workStyle: "週3リモート可", location: "東京（丸の内）", keywords: ["コンサル", "営業事務", "企画"] },
  { id: "CO-004", name: "みずほフィナンシャルグループ", industry: "金融", size: "8000名以上", culture: ["堅実志向", "コンプライアンス重視", "規制対応"], techStack: ["Oracle", "SAP", "社会保険システム"], workStyle: "週1リモート可", location: "東京（丸の内）", keywords: ["金融", "経理", "コンプライアンス"] },
  { id: "CO-005", name: "トヨタ自動車関連部品企業", industry: "製造業", size: "2000名", culture: ["品質重視", "改善文化", "技術継承"], techStack: ["ERP", "生産管理", "Excel"], workStyle: "現場常駐", location: "愛知（豊田市）", keywords: ["製造", "品質", "生産管理"] },
  { id: "CO-006", name: "ユニクロ首都圏地域", industry: "小売", size: "500名", culture: ["顧客第一", "スピード重視", "シンプル"], techStack: ["POS", "Excel", "顧客管理"], workStyle: "シフト制", location: "東京（渋谷）", keywords: ["小売", "店舗事務", "顧客対応"] },
  { id: "CO-007", name: "NTTドコモ関東支社", industry: "通信", size: "4000名", culture: ["安定志向", "カスタマーサービス重視", "ユーザーサポート"], techStack: ["CRM", "Excel", "チケッティング"], workStyle: "週2リモート可", location: "東京（品川）", keywords: ["通信", "カスタマーサービス", "サポート"] }
];

const DEALS = [
  {
    id: "SF-2026-001", name: "経理人材派遣", customer: "三菱商事グループ", type: "経理・財務", headcount: 4, startDate: "2026/07", status: "提案中", priority: "高", sales: "木村 拓哉", summary: "大手商社の経理部門補強。給与計算、決算補助スタッフを常時配置。",
    detail: { overview: "三菱商事グループの経理部門における繁忙期対応。給与計算、月次決算補助、請求管理を担当する派遣スタッフを4名配置。", requiredSkills: ["簿記", "給与計算", "Excel", "経理実務"], preferredSkills: ["SAP操作", "決算業務", "年末調整"], location: "東京（大丸ビル）", remote: "週2リモート可", period: "2026/07 - 2027/06", notes: "大手企業向けのため、セキュリティチェック必須。簿記2級以上推奨。" }
  },
  {
    id: "SF-2026-002", name: "コールセンター拡張", customer: "NTTドコモ関東支社", type: "カスタマーサポート", headcount: 15, startDate: "2026/06", status: "商談中", priority: "高", sales: "佐々木 理恵", summary: "通信キャリアのカスタマーセンター拡張。新規事業立ち上げに伴う人員増強。",
    detail: { overview: "NTTドコモのカスタマーセンター拡張に伴い、オペレータとSV級人材を15名派遣。高品質なカスタマーサービスを提供する体制構築。", requiredSkills: ["電話対応", "顧客対応", "データ入力", "ビジネスマナー"], preferredSkills: ["通信業界知識", "クレーム対応", "リーダー経験"], location: "東京（品川）", remote: "現場常駐", period: "2026/06 - 2027/12", notes: "SV経験者を3名含む必須。未経験者向けの研修も提供。" }
  },
  {
    id: "SF-2026-003", name: "営業事務チーム派遣", customer: "野村総合研究所", type: "営業事務・支援", headcount: 6, startDate: "2026/08", status: "要件定義中", priority: "中", sales: "鈴木 一郎", summary: "コンサルティング企業の営業事務チーム。営業アシスト、提案資料作成。",
    detail: { overview: "野村総合研究所の営業部門をサポートする事務チーム派遣。提案資料作成、顧客管理、見積作成を担当。営業部門の売上向上に直結する業務。", requiredSkills: ["営業事務", "Excel", "提案資料作成", "顧客管理"], preferredSkills: ["PowerPoint", "Salesforce", "コンサル基礎知識"], location: "東京（丸の内）", remote: "週3リモート可", period: "2026/08 - 2027/08", notes: "営業事務経験3年以上必須。コンサル業界への理解がある人材が望ましい。" }
  },
  {
    id: "SF-2026-004", name: "製造現場管理人材", customer: "トヨタ自動車関連部品企業", type: "製造・生産管理", headcount: 8, startDate: "2026/09", status: "商談中", priority: "中", sales: "木村 拓哉", summary: "自動車部品製造工場の生産管理人材。QC、生産計画、チーム管理。",
    detail: { overview: "愛知県の自動車部品製造工場における生産管理人材派遣。品質管理、生産計画、ラインマネジメントを担当。", requiredSkills: ["製造管理", "品質管理", "Excel", "生産計画"], preferredSkills: ["QC検定", "フォークリフト", "ISO認識"], location: "愛知（豊田市）", remote: "現場常駐", period: "2026/09 - 2027/09", notes: "QC検定保有者を最低3名含む必須。現場適応力が重要。" }
  },
  {
    id: "SF-2026-005", name: "人事・給与計算支援", customer: "みずほフィナンシャルグループ", type: "人事・総務", headcount: 3, startDate: "2026/07", status: "提案中", priority: "低", sales: "佐々木 理恵", summary: "金融機関の人事部における給与計算・人事事務。年末調整対応含む。",
    detail: { overview: "みずほFGの人事部における給与計算、人事事務サポート。特に年末調整繁忙期の人員補強。セキュリティ水準が高い。", requiredSkills: ["給与計算", "人事事務", "Excel", "社会保険手続き"], preferredSkills: ["年末調整", "人事管理システム", "コンプライアンス"], location: "東京（丸の内）", remote: "週1リモート可", period: "2026/07 - 2027/06", notes: "金融機関向けのため、セキュリティチェック厳格。給与計算実務3年以上必須。" }
  }
];

const JDS = [
  {
    id: "JD-001", dealId: "SF-2026-001", title: "経理スタッフ（給与計算・決算補助）",
    description: "大手商社の経理部門において、給与計算・月次決算補助を担当するスタッフを募集します。",
    requiredSkills: ["簿記（2級以上）", "給与計算実務", "Excel実務", "経理実務"],
    preferredSkills: ["SAP操作", "決算業務経験", "年末調整", "社会保険知識"],
    experience: "3年以上", location: "東京（大丸ビル）", remote: "週2リモート可",
    workStyle: "派遣就業", period: "2026/07 - 2027/06",
    responsibilities: "月次給与計算、給与データ入力・チェック、決算補助業務、年末調整準備、帳簿整理、請求書処理"
  },
  {
    id: "JD-002", dealId: "SF-2026-002", title: "コールセンター管理職（SV）",
    description: "通信キャリアのカスタマーセンター拡張に伴い、スーパーバイザー級の管理職を募集します。",
    requiredSkills: ["電話対応（5年以上）", "顧客対応", "チームマネジメント", "クレーム対応"],
    preferredSkills: ["CS統計知識", "QA経験", "通信業界知識", "50名以上マネジメント"],
    experience: "5年以上", location: "東京（品川）", remote: "現場常駐",
    workStyle: "派遣就業", period: "2026/06 - 2027/12",
    responsibilities: "オペレータ管理、品質品証、研修企画、スケジュール管理、顧客満足度向上施策、報告・分析業務"
  },
  {
    id: "JD-003", dealId: "SF-2026-003", title: "営業事務スペシャリスト",
    description: "コンサルティング企業の営業部門をサポートする営業事務スペシャリストを募集します。",
    requiredSkills: ["営業事務（3年以上）", "Excel高度利用", "提案資料作成", "顧客管理"],
    preferredSkills: ["PowerPoint実務", "Salesforce操作", "コンサル業界知識", "営業戦略理解"],
    experience: "5年以上", location: "東京（丸の内）", remote: "週3リモート可",
    workStyle: "派遣就業", period: "2026/08 - 2027/08",
    responsibilities: "営業活動サポート、提案資料作成、見積書作成、顧客管理、契約書管理、売上報告分析"
  }
];

const WORKFORCE_PLANS = [
  {
    id: "WP-001", title: "経理人材増強計画", targetRole: "経理スタッフ",
    headcount: 10, deadline: "2026/09", priority: "高",
    skills: ["簿記", "給与計算", "Excel", "経理実務", "SAP"],
    linkedJDs: ["JD-001"],
    candidates: [
      { id: "C-001", status: "提案可能", currentMatch: 88, trainedMatch: 92 },
      { id: "C-003", status: "提案可能", currentMatch: 92, trainedMatch: 95 },
      { id: "C-015", status: "提案可能", currentMatch: 85, trainedMatch: 90 },
      { id: "C-004", status: "育成対象", currentMatch: 32, trainedMatch: 65 },
      { id: "C-005", status: "育成対象", currentMatch: 45, trainedMatch: 68 }
    ],
    stats: { ready: 3, training: 2 }
  },
  {
    id: "WP-002", title: "コールセンター人材育成計画", targetRole: "CSO/SV",
    headcount: 20, deadline: "2027/06", priority: "高",
    skills: ["電話対応", "顧客対応", "クレーム対応", "マネジメント", "データ入力"],
    linkedJDs: ["JD-002"],
    candidates: [
      { id: "C-007", status: "提案可能", currentMatch: 92, trainedMatch: 95 },
      { id: "C-002", status: "育成対象", currentMatch: 78, trainedMatch: 90 },
      { id: "C-010", status: "育成対象", currentMatch: 65, trainedMatch: 82 }
    ],
    stats: { ready: 1, training: 2 }
  },
  {
    id: "WP-003", title: "営業事務人材確保計画", targetRole: "営業事務",
    headcount: 12, deadline: "2026/08", priority: "中",
    skills: ["営業事務", "提案資料作成", "Excel", "顧客管理", "見積作成"],
    linkedJDs: ["JD-003"],
    candidates: [
      { id: "C-005", status: "提案可能", currentMatch: 85, trainedMatch: 90 },
      { id: "C-011", status: "提案可能", currentMatch: 82, trainedMatch: 88 },
      { id: "C-017", status: "提案可能", currentMatch: 90, trainedMatch: 95 }
    ],
    stats: { ready: 3, training: 0 }
  }
];

// ============================================================
// TRAINING MASTER (研修マスタ)
// ============================================================
const TRAINING_MASTER = [
  // 社内研修（ビジネス基礎）
  { id: "TR-001", title: "Excel実務研修", category: "社内技術", provider: "社内", duration: "3日間（24h）", format: "集合研修", level: "初級〜中級",
    description: "Excel基本から実務応用まで。ピボットテーブル、グラフ作成、関数活用を習得します。",
    targetSkills: ["Excel", "OAスキル"], prerequisites: "基本的なPC操作", maxParticipants: 20, cost: 0,
    schedule: "毎月第2週", nextDate: "2026/05/11", status: "公開中" },
  { id: "TR-002", title: "ビジネスマナー研修", category: "社内ビジネス", provider: "社内", duration: "1日間（8h）", format: "ワークショップ", level: "初級",
    description: "敬語、電話対応、来客対応、メール作成など、ビジネスの基本マナーを習得します。",
    targetSkills: ["ビジネスマナー", "電話対応"], prerequisites: "なし", maxParticipants: 25, cost: 0,
    schedule: "毎月開催", nextDate: "2026/05/15", status: "公開中" },
  { id: "TR-003", title: "経理基礎研修", category: "社内技術", provider: "社内", duration: "5日間（40h）", format: "ハンズオン", level: "初級",
    description: "簿記基礎、給与計算、年末調整の基本を習得します。経理未経験者向け。",
    targetSkills: ["経理実務", "給与計算", "簿記"], prerequisites: "なし", maxParticipants: 15, cost: 0,
    schedule: "四半期ごと", nextDate: "2026/07/06", status: "公開中" },
  { id: "TR-004", title: "電話応対スキルアップ研修", category: "社内ビジネス", provider: "社内", duration: "2日間（16h）", format: "ワークショップ", level: "初級〜中級",
    description: "顧客対応、クレーム対応、電話マナーを実践的に習得。ロールプレイ中心。",
    targetSkills: ["電話対応", "顧客対応", "クレーム対応"], prerequisites: "なし", maxParticipants: 12, cost: 0,
    schedule: "隔月開催", nextDate: "2026/05/25", status: "公開中" },
  { id: "TR-005", title: "リーダーシップ研修", category: "社内ビジネス", provider: "社内", duration: "2日間（16h）", format: "ワークショップ", level: "中級",
    description: "チームリーダーとしてのコーチング、モチベーション管理、コンフリクト解決スキルを学びます。",
    targetSkills: ["リーダーシップ", "チーム管理", "マネジメント"], prerequisites: "リーダー経験1年以上推奨", maxParticipants: 15, cost: 0,
    schedule: "半期ごと", nextDate: "2026/09/14", status: "公開中" },
  { id: "TR-006", title: "個人情報保護研修", category: "社内ビジネス", provider: "社内", duration: "2時間", format: "eラーニング", level: "初級",
    description: "個人情報保護法、GDPR、機密情報管理の基本を習得します。全員必須。",
    targetSkills: ["コンプライアンス", "情報管理"], prerequisites: "なし", maxParticipants: 1000, cost: 0,
    schedule: "随時申込", nextDate: "2026/05/01", status: "公開中" },
  { id: "TR-007", title: "コンプライアンス研修", category: "社内ビジネス", provider: "社内", duration: "4時間", format: "eラーニング", level: "初級",
    description: "企業コンプライアンス、ハラスメント対策、法令遵守を学びます。年1回必須。",
    targetSkills: ["コンプライアンス", "ハラスメント対策"], prerequisites: "なし", maxParticipants: 1000, cost: 0,
    schedule: "年1回", nextDate: "2026/06/01", status: "公開中" },
  // 外部資格講座
  { id: "TR-008", title: "日商簿記2級講座", category: "外部資格", provider: "商工会議所", duration: "3ヶ月（48h）", format: "オンライン講座", level: "中級",
    description: "日商簿記2級試験合格を目指す講座。毎月試験対応。",
    targetSkills: ["簿記", "経理実務"], prerequisites: "簿記3級取得済み", maxParticipants: null, cost: 45000,
    schedule: "随時申込", nextDate: "2026/06/01", status: "公開中" },
  { id: "TR-009", title: "MOS Excel Expert講座", category: "外部資格", provider: "Odyssey Communications", duration: "1ヶ月（20h）", format: "オンライン講座", level: "中級",
    description: "Microsoft Office Specialist Excel Expert 資格取得講座。",
    targetSkills: ["Excel", "OAスキル"], prerequisites: "MOS Excel Associate取得済み", maxParticipants: null, cost: 35000,
    schedule: "随時申込", nextDate: null, status: "公開中" },
  { id: "TR-010", title: "TOEIC対策講座", category: "外部資格", provider: "TOEIC対策専門", duration: "3ヶ月（36h）", format: "ハイブリッド", level: "中級",
    description: "TOEIC 600点突破を目指す集中講座。ビジネス英語も習得。",
    targetSkills: ["英語力", "ビジネス英語"], prerequisites: "基本的な英語知識", maxParticipants: 20, cost: 60000,
    schedule: "随時申込", nextDate: "2026/07/01", status: "公開中" },
  { id: "TR-011", title: "秘書検定対策講座", category: "外部資格", provider: "秘書検定対策センター", duration: "6週間（16h）", format: "集合研修", level: "初級〜中級",
    description: "秘書検定2級・準1級合格を目指す講座。ビジネスマナーも強化。",
    targetSkills: ["秘書業務", "ビジネスマナー"], prerequisites: "なし", maxParticipants: 15, cost: 25000,
    schedule: "随時申込", nextDate: "2026/08/01", status: "公開中" },
  // eラーニング
  { id: "TR-012", title: "Excel関数マスター", category: "eラーニング", provider: "オンラインプラットフォーム", duration: "自習（約20h）", format: "動画学習", level: "中級",
    description: "VLOOKUP、INDEX、MATCH等の関数を徹底習得。実務レベル。",
    targetSkills: ["Excel", "OAスキル"], prerequisites: "Excel基本操作可能", maxParticipants: 1000, cost: 0,
    schedule: "随時申込", nextDate: null, status: "公開中" },
  { id: "TR-013", title: "ビジネス文書作成", category: "eラーニング", provider: "オンラインプラットフォーム", duration: "自習（約15h）", format: "動画学習", level: "初級",
    description: "報告書、提案書、メール等の正しい作成方法を習得。",
    targetSkills: ["Word", "ビジネスマナー"], prerequisites: "Word基本操作可能", maxParticipants: 1000, cost: 0,
    schedule: "随時申込", nextDate: null, status: "公開中" },
  { id: "TR-014", title: "社会保険実務入門", category: "eラーニング", provider: "オンラインプラットフォーム", duration: "自習（約18h）", format: "動画学習", level: "初級",
    description: "社会保険、労働保険、年末調整の基本を習得。人事・給与担当者向け。",
    targetSkills: ["労務管理", "給与計算"], prerequisites: "なし", maxParticipants: 1000, cost: 0,
    schedule: "随時申込", nextDate: null, status: "公開中" }
];

// 候補者ごとの研修受講状況
const INITIAL_candidateTrainings = [
  { candidateId: "C-001", trainingId: "TR-001", status: "完了", completedDate: "2025/11/15", progress: 100 },
  { candidateId: "C-001", trainingId: "TR-002", status: "完了", completedDate: "2025/10/20", progress: 100 },
  { candidateId: "C-001", trainingId: "TR-008", status: "確認テスト待ち", startDate: "2026/04/15", progress: 100 },
  { candidateId: "C-001", trainingId: "TR-003", status: "受講中", startDate: "2026/04/20", progress: 45 },
  { candidateId: "C-002", trainingId: "TR-002", status: "完了", completedDate: "2025/12/10", progress: 100 },
  { candidateId: "C-002", trainingId: "TR-004", status: "完了", completedDate: "2026/01/30", progress: 100 },
  { candidateId: "C-002", trainingId: "TR-009", status: "未着手", progress: 0 },
  { candidateId: "C-003", trainingId: "TR-001", status: "完了", completedDate: "2025/09/20", progress: 100 },
  { candidateId: "C-003", trainingId: "TR-005", status: "完了", completedDate: "2026/02/28", progress: 100 },
  { candidateId: "C-003", trainingId: "TR-008", status: "受講中", startDate: "2026/03/01", progress: 75 },
  { candidateId: "C-004", trainingId: "TR-002", status: "受講中", startDate: "2026/05/01", progress: 40 },
  { candidateId: "C-004", trainingId: "TR-003", status: "未着手", progress: 0 },
  { candidateId: "C-005", trainingId: "TR-001", status: "完了", completedDate: "2025/08/15", progress: 100 },
  { candidateId: "C-005", trainingId: "TR-005", status: "受講中", startDate: "2026/03/15", progress: 50 },
  { candidateId: "C-007", trainingId: "TR-004", status: "完了", completedDate: "2025/11/30", progress: 100 },
  { candidateId: "C-007", trainingId: "TR-005", status: "受講中", startDate: "2026/03/01", progress: 80 },
  { candidateId: "C-015", trainingId: "TR-008", status: "完了", completedDate: "2025/12/31", progress: 100 }
];

const TRAINING_PLANS = {
  "C-001": {
    candidateId: "C-001", targetJD: "JD-001", targetRole: "経理主任",
    currentMatch: 72, targetMatch: 88, estimatedPeriod: "4ヶ月",
    items: [
      { theme: "Excel実務研修（関数・ピボット）", priority: "高", order: 1, duration: "2週間", goal: "Excel上級操作を習得し、業務効率を向上", progress: 100, status: "完了", trainingId: "TR-001" },
      { theme: "ビジネスマナー研修", priority: "中", order: 2, duration: "1日", goal: "派遣先での円滑なコミュニケーション力強化", progress: 100, status: "完了", trainingId: "TR-002" },
      { theme: "簿記2級対策講座", priority: "高", order: 3, duration: "3ヶ月", goal: "日商簿記2級取得で経理スキルを証明", progress: 60, status: "進行中", trainingId: "TR-008" },
      { theme: "決算業務OJT演習", priority: "高", order: 4, duration: "3週間", goal: "月次・年次決算の実務フローを習得", progress: 0, status: "未着手" }
    ]
  },
  "C-002": {
    candidateId: "C-002", targetJD: "JD-002", targetRole: "営業事務リーダー",
    currentMatch: 65, targetMatch: 85, estimatedPeriod: "3ヶ月",
    items: [
      { theme: "ビジネスマナー研修", priority: "中", order: 1, duration: "1日", goal: "来客対応・電話応対のスキル向上", progress: 100, status: "完了", trainingId: "TR-002" },
      { theme: "MOS Excel対策", priority: "高", order: 2, duration: "2週間", goal: "MOS Excel資格を取得しOAスキルを証明", progress: 100, status: "完了", trainingId: "TR-009" },
      { theme: "TOEIC対策講座", priority: "中", order: 3, duration: "2ヶ月", goal: "TOEIC 600点以上で英語対応力を証明", progress: 0, status: "未着手", trainingId: "TR-010" }
    ]
  },
  "C-003": {
    candidateId: "C-003", targetJD: "JD-001", targetRole: "労務管理スペシャリスト",
    currentMatch: 78, targetMatch: 92, estimatedPeriod: "3ヶ月",
    items: [
      { theme: "Excel実務研修（関数・ピボット）", priority: "高", order: 1, duration: "2週間", goal: "Excel活用で労務データ管理を効率化", progress: 100, status: "完了", trainingId: "TR-001" },
      { theme: "社会保険実務研修", priority: "高", order: 2, duration: "3日間", goal: "社会保険手続きの実務フローを完全習得", progress: 100, status: "完了", trainingId: "TR-014" },
      { theme: "簿記2級対策講座", priority: "中", order: 3, duration: "3ヶ月", goal: "経理知識を補強し労務・経理の連携力向上", progress: 100, status: "完了", trainingId: "TR-008" }
    ]
  },
  "C-004": {
    candidateId: "C-004", targetJD: "JD-002", targetRole: "一般事務（即戦力）",
    currentMatch: 58, targetMatch: 80, estimatedPeriod: "4ヶ月",
    items: [
      { theme: "ビジネスマナー研修", priority: "中", order: 1, duration: "1日", goal: "ビジネスマナーの基礎を確認・強化", progress: 100, status: "完了", trainingId: "TR-002" },
      { theme: "経理基礎研修", priority: "高", order: 2, duration: "3日間", goal: "経理の基本知識を習得し業務範囲を拡大", progress: 0, status: "未着手", trainingId: "TR-003" },
      { theme: "コンプライアンス研修", priority: "中", order: 3, duration: "半日", goal: "派遣業務に必要なコンプライアンス知識を習得", progress: 0, status: "未着手", trainingId: "TR-007" }
    ]
  },
  "C-005": {
    candidateId: "C-005", targetJD: "JD-003", targetRole: "営業事務エキスパート",
    currentMatch: 70, targetMatch: 88, estimatedPeriod: "2ヶ月",
    items: [
      { theme: "Excel実務研修（関数・ピボット）", priority: "高", order: 1, duration: "2週間", goal: "見積作成・データ分析のExcelスキル向上", progress: 100, status: "完了", trainingId: "TR-001" },
      { theme: "社会保険実務研修", priority: "中", order: 2, duration: "3日間", goal: "労務知識を補強し業務対応範囲を拡大", progress: 100, status: "完了", trainingId: "TR-014" }
    ]
  },
  "C-007": {
    candidateId: "C-007", targetJD: "JD-001", targetRole: "コールセンターSV",
    currentMatch: 62, targetMatch: 82, estimatedPeriod: "3ヶ月",
    items: [
      { theme: "MOS Excel対策", priority: "高", order: 1, duration: "2週間", goal: "データ集計・レポート作成のExcelスキル取得", progress: 100, status: "完了", trainingId: "TR-009" },
      { theme: "社会保険実務研修", priority: "中", order: 2, duration: "3日間", goal: "顧客問い合わせ対応に必要な知識を補強", progress: 80, status: "進行中", trainingId: "TR-014" }
    ]
  }
};

const ASSESSMENTS_TEMPLATES = [
  { id: "ASM-001", skill: "OAスキル", level: "中級", questions: [
    { q: "VLOOKUP関数を使って別シートからデータを参照する方法を説明してください。", type: "記述", points: 20, criteria: "関数の理解と実務活用力" },
    { q: "ピボットテーブルを使ってデータを集計する手順と活用シーンを説明してください。", type: "記述", points: 20, criteria: "データ分析力" },
    { q: "IF関数とCOUNTIF関数の違いと、それぞれの活用場面を説明してください。", type: "記述", points: 15, criteria: "関数の使い分け" },
    { q: "以下のうち、データの重複を除去する正しい手順はどれですか？", type: "選択", points: 10, criteria: "Excel操作の理解", options: ["フィルタ機能", "重複の削除", "並べ替え", "条件付き書式"] },
    { q: "日常業務でExcelをどのように活用しているか、具体的な事例を3つ挙げてください。", type: "実務確認", points: 35, criteria: "実務経験と応用力" }
  ]}
];

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
const calcMatchScore = (candidate, jd) => {
  if (!jd) return { current: 0, trained: 0, fit: [], gap: [], reason: "" };
  const cSkills = candidate.skills.map(s => s.name.toLowerCase());
  const reqSkills = (jd.requiredSkills || []).map(s => s.split("（")[0].toLowerCase());
  const prefSkills = (jd.preferredSkills || []).map(s => s.split("（")[0].toLowerCase());
  const fit = reqSkills.filter(s => cSkills.includes(s));
  const gap = reqSkills.filter(s => !cSkills.includes(s));
  const prefFit = prefSkills.filter(s => cSkills.includes(s));
  const skillScore = (fit.length / Math.max(reqSkills.length, 1)) * 50;
  const prefScore = (prefFit.length / Math.max(prefSkills.length, 1)) * 15;
  const expScore = Math.min(candidate.totalYears / 10, 1) * 15;
  const aspMatch = candidate.aspiration?.includes("事務") || candidate.aspiration?.includes("経理") || candidate.aspiration?.includes("営業") || candidate.aspiration?.includes("管理") ? 10 : 5;
  const workMatch = candidate.remoteOk ? 10 : (jd.remote?.includes("フルリモート") ? 3 : 8);
  const current = Math.min(Math.round(skillScore + prefScore + expScore + aspMatch + workMatch), 99);
  const trained = Math.min(current + Math.round(gap.length * 5 + Math.random() * 10), 99);
  const reasons = [];
  if (fit.length > 0) reasons.push(`${fit.join("・")}の実務経験あり`);
  if (candidate.totalYears >= 5) reasons.push(`${candidate.totalYears}年の豊富な経験`);
  if (prefFit.length > 0) reasons.push(`歓迎スキル${prefFit.join("・")}も保有`);
  return { current, trained, fit, gap, prefFit, reason: reasons.join("。") || "基本的なスキルセットを保有" };
};

const JOB_CATEGORIES = [
  {
    id: "JC-001", name: "一般事務・OA事務", description: "データ入力、書類作成、顧客対応などの一般事務業務を担当",
    skills: ["Excel", "Word", "データ入力", "ビジネスマナー", "電話対応"],
    jd: { title: "一般事務スタッフ", requiredSkills: ["Excel", "Word", "データ入力"], preferredSkills: ["PowerPoint", "タイピング速度"], experience: "1年以上", description: "企業の事務部門における基本的な事務業務を担当。データ入力、書類作成、電話対応などを実施します。" },
    assessment: { passScore: 65, questions: 20, duration: "40分", areas: ["Excel基本", "Word実務", "データ入力速度", "ビジネスマナー"] },
    certifiedCandidates: ["C-002", "C-004", "C-012", "C-016"]
  },
  {
    id: "JC-002", name: "経理・財務", description: "給与計算、決算業務、経理管理を担当",
    skills: ["簿記", "給与計算", "Excel", "経理実務", "SAP"],
    jd: { title: "経理スタッフ", requiredSkills: ["簿記2級", "給与計算", "Excel実務"], preferredSkills: ["SAP操作", "決算業務", "年末調整"], experience: "3年以上", description: "企業の経理部門における給与計算、月次決算、請求管理などを担当。財務管理の実務経験を活かします。" },
    assessment: { passScore: 70, questions: 25, duration: "45分", areas: ["簿記知識", "給与計算", "Excel実務", "決算業務", "社会保険"] },
    certifiedCandidates: ["C-001", "C-003", "C-015"]
  },
  {
    id: "JC-003", name: "営業事務・営業サポート", description: "営業活動支援、提案資料作成、見積作成を担当",
    skills: ["営業事務", "Excel", "提案資料", "顧客管理", "見積作成"],
    jd: { title: "営業事務スペシャリスト", requiredSkills: ["営業事務", "Excel", "提案資料作成"], preferredSkills: ["PowerPoint", "Salesforce", "営業戦略理解"], experience: "3年以上", description: "営業部門をサポートする事務職。営業資料作成、顧客管理、見積対応などを通じて営業部門の売上向上に貢献します。" },
    assessment: { passScore: 70, questions: 20, duration: "35分", areas: ["営業事務実務", "Excel応用", "提案資料作成", "顧客管理"] },
    certifiedCandidates: ["C-005", "C-011", "C-017"]
  },
  {
    id: "JC-004", name: "コールセンター・カスタマーサポート", description: "顧客問い合わせ対応、品質管理、チーム運営を担当",
    skills: ["電話対応", "顧客対応", "クレーム対応", "データ入力", "マネジメント"],
    jd: { title: "カスタマーサポート", requiredSkills: ["電話対応", "顧客対応", "ビジネスマナー"], preferredSkills: ["クレーム対応", "SV経験", "業界知識"], experience: "2年以上", description: "コールセンターやカスタマーサービス部門における顧客対応。電話対応、メール対応、問題解決を通じて顧客満足度向上に貢献します。" },
    assessment: { passScore: 65, questions: 18, duration: "30分", areas: ["電話対応", "顧客対応", "クレーム対応", "データ入力", "ビジネスマナー"] },
    certifiedCandidates: ["C-002", "C-007", "C-010"]
  },
  {
    id: "JC-005", name: "製造・物流・軽作業", description: "生産管理、在庫管理、品質管理を担当",
    skills: ["製造管理", "品質管理", "在庫管理", "生産計画", "Excel"],
    jd: { title: "製造管理スタッフ", requiredSkills: ["製造管理", "品質管理", "Excel"], preferredSkills: ["QC検定", "フォークリフト", "生産計画"], experience: "3年以上", description: "製造工場における生産管理、品質管理を担当。効率化と品質向上を通じて工場運営を支援します。" },
    assessment: { passScore: 70, questions: 22, duration: "40分", areas: ["製造管理", "品質管理", "生産計画", "在庫管理"] },
    certifiedCandidates: ["C-009", "C-013"]
  }
];

const SKILL_MASTER = [
  { id: "SK-001", name: "OAスキル（Excel上級）", category: "事務", description: "Excel関数、ピボットテーブル、マクロを活用した高度なデータ分析・資料作成能力", requiredCerts: ["MOS Excel Expert"], prerequisiteTrainings: ["TR-001"], assessment: { passScore: 70, questions: 20, duration: "30分", areas: ["Excel関数", "ピボットテーブル", "データ分析", "グラフ作成"] }, certifiedCandidates: ["C-001", "C-005", "C-012", "C-015", "C-017"] },
  { id: "SK-002", name: "経理実務", category: "経理", description: "給与計算、決算業務、社会保険手続きなど経理全般の実務能力", requiredCerts: ["日商簿記2級"], prerequisiteTrainings: ["TR-003", "TR-008"], assessment: { passScore: 75, questions: 25, duration: "40分", areas: ["簿記知識", "給与計算", "決算業務", "社会保険", "税務"] }, certifiedCandidates: ["C-001", "C-003", "C-015"] },
  { id: "SK-003", name: "英語力（ビジネス）", category: "言語", description: "ビジネス英語でのメール、電話対応、簡単な会議参加能力", requiredCerts: ["TOEIC 600点以上"], prerequisiteTrainings: ["TR-010"], assessment: { passScore: 65, questions: 15, duration: "25分", areas: ["ビジネス英語", "メール作成", "会議参加", "電話対応"] }, certifiedCandidates: [] },
  { id: "SK-004", name: "ITリテラシー", category: "IT", description: "基本的なPC操作、HTML/CSS、JavaScript理解度、トラブルシューティング能力", requiredCerts: ["ITパスポート"], prerequisiteTrainings: [], assessment: { passScore: 65, questions: 18, duration: "30分", areas: ["PC基本操作", "HTML/CSS", "JavaScript", "トラブル対応"] }, certifiedCandidates: ["C-006"] },
  { id: "SK-005", name: "ビジネスマナー・電話対応", category: "ビジネススキル", description: "敬語、来客対応、電話対応などのビジネスマナーとコミュニケーション能力", requiredCerts: ["秘書検定2級"], prerequisiteTrainings: ["TR-002", "TR-004"], assessment: { passScore: 70, questions: 16, duration: "25分", areas: ["敬語", "来客対応", "電話対応", "メール作成"] }, certifiedCandidates: ["C-002", "C-010"] },
  { id: "SK-006", name: "労務管理", category: "人事", description: "社会保険手続き、給与計算、勤怠管理、年末調整などの労務全般能力", requiredCerts: ["社会保険労務士"], prerequisiteTrainings: ["TR-003", "TR-005"], assessment: { passScore: 75, questions: 20, duration: "35分", areas: ["社会保険", "給与計算", "年末調整", "勤怠管理"] }, certifiedCandidates: ["C-003"] },
  { id: "SK-007", name: "営業事務スキル", category: "営業", description: "見積作成、提案資料作成、顧客管理、受注管理などの営業事務総合能力", requiredCerts: [], prerequisiteTrainings: ["TR-001"], assessment: { passScore: 70, questions: 18, duration: "30分", areas: ["見積作成", "提案資料", "顧客管理", "受注管理"] }, certifiedCandidates: ["C-005", "C-011", "C-017"] }
];

const STATUS_STYLES = {
  "未確認": { bg: "bg-white", text: "text-[#62625b]", border: "border-[#e5e5e0]", dot: "bg-[#c8c8c1]" },
  "候補": { bg: "bg-white", text: "text-[#211922]/80", border: "border-[#e0e0d9]", dot: "bg-[#91918c]" },
  "育成対象": { bg: "bg-white", text: "text-[#211922]/80", border: "border-[#e0e0d9] border-dashed", dot: "bg-[#91918c]" },
  "提案可能": { bg: "bg-[#f6f6f3]", text: "text-[#211922]", border: "border-[#c8c8c1]", dot: "bg-[#62625b]" },
  "提案済み": { bg: "bg-[#f6f6f3]", text: "text-[#211922]", border: "border-[#c8c8c1]", dot: "bg-[#211922]" },
  "就業中": { bg: "bg-[#211922]", text: "text-white", border: "border-[#211922]", dot: "bg-white" },
  "見送り": { bg: "bg-white", text: "text-[#91918c]", border: "border-[#e5e5e0]", dot: "bg-[#e0e0d9]" }
};
const getStatusColor = (status) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES["未確認"];
  return `${s.bg} ${s.text} border ${s.border}`;
};
const getStatusDot = (status) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES["未確認"];
  return s.dot;
};

const getPriorityColor = (p) => {
  const c = { "高": "text-[#211922] font-medium", "中": "text-[#62625b]", "低": "text-[#91918c]" };
  return c[p] || "text-[#91918c]";
};

const COLORS = ["#e60023", "#211922", "#62625b", "#91918c", "#e5e5e0", "#c8c8c1", "#33332e"];
const MORPHY = {
  // Pinterest DS - Warm palette
  primary: "#e60023", primaryBlue: "#e60023", primaryHover: "#cc001f", primaryLight: "#fff0f0",
  accent1: "#e60023", accent2: "#103c25", accent3: "#62625b", purple: "#6845ab", cyan: "#435ee5", pink: "#e60023",
  bg: "#ffffff", surface: "#ffffff", cardBorder: "#e5e5e0", textPrimary: "#211922", textSecondary: "#62625b", textMuted: "#91918c",
  sidebar: "#211922", sidebarHover: "#2e2630", sidebarActive: "#3d2f42",
  shadow: { card: "none", float: "0 2px 10px rgba(33,25,34,0.08)", dropdown: "0 4px 20px rgba(33,25,34,0.12)", modal: "0 8px 32px rgba(33,25,34,0.18)" },
  // Pinterest DS extras
  sand: "#e5e5e0", sandHover: "#d5d5d0", warmLight: "#e0e0d9", fog: "#f6f6f3", warmWash: "hsla(60,20%,98%,.5)",
  darkSurface: "#33332e", borderDisabled: "#c8c8c1", hoverGray: "#bcbcb3",
  red: "#e60023", green700: "#103c25", plumBlack: "#211922", oliveGray: "#62625b", warmSilver: "#91918c",
  radius: { sm: "12px", md: "16px", lg: "20px", xl: "28px", xxl: "32px", hero: "40px", circle: "50%" },
  font: "'Pin Sans', -apple-system, system-ui, 'Segoe UI', Roboto, 'Hiragino Sans', 'Noto Sans JP', Meiryo, sans-serif",
  status: { success: "#15803d", successBg: "#f0fdf4", successBorder: "#bbf7d0", danger: "#dc2626", dangerBg: "#fef2f2", dangerBorder: "#fecaca", warning: "#d97706", warningBg: "#fffbeb", warningBorder: "#fde68a", info: "#7c3aed", infoBg: "#f5f3ff", infoBorder: "#ddd6fe" },
};

// ============================================================
// RESPONSIVE HELPERS
// ============================================================
const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 };

function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(() => typeof window !== "undefined" ? window.matchMedia(query).matches : false);
  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

const ResponsiveStyles = () => (
  <style>{`
    @media (max-width: 767px) {
      .tf-grid-4 { grid-template-columns: repeat(1, 1fr) !important; }
      .tf-grid-3 { grid-template-columns: repeat(1, 1fr) !important; }
      .tf-grid-2 { grid-template-columns: repeat(1, 1fr) !important; }
      .tf-grid-5 { grid-template-columns: repeat(1, 1fr) !important; }
      .tf-main-padding { padding: 16px !important; }
      .tf-page-header { flex-direction: column; align-items: flex-start !important; gap: 12px; }
      .tf-page-header h1 { font-size: 18px !important; }
      .tf-two-col { flex-direction: column !important; }
      .tf-two-col > div { width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; }
      .tf-two-col > div.tf-panel-sticky { position: relative !important; height: auto !important; max-height: 70vh; }
      .tf-sidebar-desktop { display: none !important; }
      .tf-mobile-header { display: flex !important; }
      .tf-mobile-overlay { display: block !important; }
      .tf-plan-create-layout { flex-direction: column !important; }
      .tf-plan-create-layout > div { width: 100% !important; min-width: 0 !important; }
      .tf-candidate-train-row { flex-direction: column !important; }
      .tf-candidate-train-row > div { width: 100% !important; border-right: none !important; border-bottom: 1px solid #e5e5e0; }
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      .tf-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
      .tf-grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
      .tf-grid-5 { grid-template-columns: repeat(2, 1fr) !important; }
      .tf-main-padding { padding: 24px !important; }
      .tf-sidebar-desktop { width: 200px !important; }
      .tf-mobile-header { display: none !important; }
    }
    @media (min-width: 1024px) {
      .tf-mobile-header { display: none !important; }
      .tf-mobile-overlay { display: none !important; }
    }
    .tf-mobile-header { display: none; position: sticky; top: 0; z-index: 40; align-items: center; gap: 12px; padding: 12px 16px; background: #211922; color: #fff; }
    .tf-mobile-overlay { display: none; }
    .tf-sidebar-mobile { transform: translateX(-100%); transition: transform 0.25s ease; }
    .tf-sidebar-mobile.tf-sidebar-open { transform: translateX(0); }
    @media (max-width: 767px) {
      .tf-stats-row { flex-direction: column !important; }
      .tf-stat-card { min-width: 0 !important; }
      table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .tf-profile-header { flex-direction: column !important; align-items: flex-start !important; }
      .tf-profile-header > div:last-child { width: 100% !important; }
      .tf-search-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; flex-wrap: nowrap !important; }
      .tf-search-tabs::-webkit-scrollbar { display: none; }
    }
    @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  `}</style>
);

// ============================================================
// ERROR BOUNDARY
// ============================================================
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("Screen Error:", error, info); }
  componentDidUpdate(prevProps) { if (prevProps.screenKey !== this.props.screenKey) this.setState({ hasError: false, error: null }); }
  render() {
    if (this.state.hasError) return (
      <div style={{padding: 40, textAlign: "center"}}>
        <h2 style={{color: "#211922", marginBottom: 12, fontWeight: 700}}>画面の表示中にエラーが発生しました</h2>
        <p style={{color: "#62625b", marginBottom: 16, fontSize: 14}}>{String(this.state.error)}</p>
        <button onClick={() => this.setState({ hasError: false, error: null })} style={{background: "#e60023", color: "#000", border: "none", borderRadius: "16px", padding: "10px 24px", cursor: "pointer", fontSize: 14, fontWeight: 500}}>再試行</button>
      </div>
    );
    return this.props.children;
  }
}

// ============================================================
// MAIN APP COMPONENT
// ============================================================
export default function App() {
  // === Toast notification system ===
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);
  const ToastContainer = () => toasts.length === 0 ? null : (
    <div style={{position: "fixed", top: 16, right: 16, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8, maxWidth: 360}}>
      {toasts.map(t => (
        <div key={t.id} style={{padding: "12px 16px", borderRadius: MORPHY.radius.lg, background: t.type === "success" ? MORPHY.status.successBg : t.type === "error" ? MORPHY.status.dangerBg : MORPHY.status.infoBg, border: `1px solid ${t.type === "success" ? MORPHY.status.successBorder : t.type === "error" ? MORPHY.status.dangerBorder : MORPHY.status.infoBorder}`, display: "flex", alignItems: "center", gap: 8, boxShadow: MORPHY.shadow.dropdown, animation: "slideIn 0.3s ease"}}>
          {t.type === "success" ? <CheckCircle size={16} style={{color: MORPHY.status.success, flexShrink: 0}}/> : t.type === "error" ? <XCircle size={16} style={{color: MORPHY.status.danger, flexShrink: 0}}/> : <AlertCircle size={16} style={{color: MORPHY.status.info, flexShrink: 0}}/>}
          <span style={{fontSize: 13, fontWeight: 500, color: t.type === "success" ? MORPHY.status.success : t.type === "error" ? MORPHY.status.danger : MORPHY.status.info}}>{t.message}</span>
        </div>
      ))}
    </div>
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "", role: "admin" });
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [role, setRole] = useState("sales");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1023px)");
  const [screen, setScreen] = useState("sales-dashboard");
  const [selectedJD, setSelectedJD] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchMode, setSearchMode] = useState("jd");
  const [defaultFilter, setDefaultFilter] = useState(null); // pass filter context between screens
  const [freeSearchQuery, setFreeSearchQuery] = useState("");
  const [jdDraftInput, setJdDraftInput] = useState("");
  const [editingJD, setEditingJD] = useState(null);
  const [savedJDs, setSavedJDs] = useState([]);
  const [jdSaveToast, setJdSaveToast] = useState(null);
  const [jdLeaveNameModal, setJdLeaveNameModal] = useState(null); // { name: string }
  const unsavedJDRef = React.useRef(null); // tracks current draft in JD screen (ref to avoid re-render)
  const [jdLeaveConfirm, setJdLeaveConfirm] = useState(null); // { target, data } pending navigation
  const [candidateStatuses, setCandidateStatuses] = useState({});
  const favoriteCandidatesRef = React.useRef(new Map()); // id -> { source: "jd-create"|"candidate-list"|"search"|"detail", sourceLabel: string }
  const [interviewRequestedCandidates, setInterviewRequestedCandidates] = useState(new Set()); // ids of candidates with interview requests
  const [jdCandidateAdditions, setJdCandidateAdditions] = useState({}); // JD ID → Set of candidate IDs added by customer from search
  const [jdStatuses, setJdStatuses] = useState({}); // JD ID → "募集中" | "クローズ"

  // Interview requests: customer → sales (面談リクエスト)
  const [interviewRequests, setInterviewRequests] = useState([
    { id: "IR-001", jdId: "JD-001", candidateId: "C-003", customerName: "株式会社ABC商事", date: "2026/04/18 14:30", status: "未対応", source: "customer-found" },
    { id: "IR-002", jdId: "JD-001", candidateId: "C-007", customerName: "株式会社ABC商事", date: "2026/04/19 10:15", status: "回答メール送信済", source: "customer-found" },
    { id: "IR-003", jdId: "JD-002", candidateId: "C-005", customerName: "大和物流株式会社", date: "2026/04/20 09:00", status: "回答メール送信済", source: "sales-proposed" },
  ]);
  const addInterviewRequest = (jdId, candidateId, customerName, source = "customer-found") => {
    const newId = `IR-${String(interviewRequests.length + 1).padStart(3, "0")}`;
    const now = new Date();
    const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,"0")}/${String(now.getDate()).padStart(2,"0")} ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    setInterviewRequests(prev => [{ id: newId, jdId, candidateId, customerName: customerName || "顧客", date: dateStr, status: "未対応", source }, ...prev]);
    setInterviewRequestedCandidates(prev => new Set([...prev, candidateId]));
  };
  const updateInterviewRequestStatus = (irId, status) => {
    setInterviewRequests(prev => prev.map(ir => ir.id === irId ? { ...ir, status } : ir));
  };

  // Assessment requests: sales → candidate (アセスメント受験依頼)
  const [assessmentRequests, setAssessmentRequests] = useState([
    { id: "AR-001", jdId: "JD-001", candidateId: "C-001", date: "2026/04/17 10:00", deadline: "2026/04/24", status: "完了", score: 82, title: "React/TypeScriptスキルアセスメント" },
    { id: "AR-002", jdId: "JD-001", candidateId: "C-003", date: "2026/04/19 15:00", deadline: "2026/04/30", status: "未受験", score: null, title: "React/TypeScriptスキルアセスメント" },
    { id: "AR-003", jdId: "JD-002", candidateId: "C-005", date: "2026/04/20 11:00", deadline: "2026/05/05", status: "完了", score: 75, title: "物流システム開発アセスメント" },
  ]);
  const [assessmentDeadlineModal, setAssessmentDeadlineModal] = useState(null); // { jdId, candidateId, title }
  const [assessmentDeadlineValue, setAssessmentDeadlineValue] = useState("");
  const addAssessmentRequest = (jdId, candidateId, title, deadline) => {
    const newId = `AR-${String(assessmentRequests.length + 1).padStart(3, "0")}`;
    const now = new Date();
    const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,"0")}/${String(now.getDate()).padStart(2,"0")} ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    setAssessmentRequests(prev => [...prev, { id: newId, jdId, candidateId, date: dateStr, deadline: deadline || null, status: "未受験", score: null, title: title || "スキルアセスメント" }]);
  };
  const openAssessmentDeadlineModal = (jdId, candidateId, title) => {
    const d = new Date(); d.setDate(d.getDate() + 7);
    setAssessmentDeadlineValue(d.toISOString().split("T")[0].replace(/-/g, "/"));
    setAssessmentDeadlineModal({ jdId, candidateId, title });
  };
  const completeAssessment = (arId, score) => {
    setAssessmentRequests(prev => {
      const updated = prev.map(ar => ar.id === arId ? { ...ar, status: "完了", score } : ar);
      // Sync to jdAssessments so admin sees the result
      const ar = updated.find(a => a.id === arId);
      if (ar) {
        setJdAssessments(prevJda => {
          const jda = { ...prevJda };
          if (jda[ar.jdId]) {
            jda[ar.jdId] = { ...jda[ar.jdId], results: { ...jda[ar.jdId].results, [ar.candidateId]: { score, passed: score >= (jda[ar.jdId].passScore || 70), date: ar.date.split(" ")[0], detail: {} } } };
          }
          return jda;
        });
      }
      return updated;
    });
    showToast(`アセスメント完了（${score}点）`);
  };

  // JD customer mapping (which customer owns which JD)
  const jdCustomerMap = {
    "JD-001": "株式会社ABC商事", "JD-002": "大和物流株式会社", "JD-003": "テックイノベーション株式会社"
  };
  const [aiGenerating, setAiGenerating] = useState(false);
  const [trainingTarget, setTrainingTarget] = useState(null);
  const [candidateProfile, setCandidateProfile] = useState({...CANDIDATES[0]}); // C-001 as logged in candidate
  const [candidateTrainings, setCandidateTrainings] = useState([...INITIAL_candidateTrainings]);
  const [learningProgress, setLearningProgress] = useState({});
  const [workforcePlans, setWorkforcePlans] = useState(WORKFORCE_PLANS);
  const [jobCategories, setJobCategories] = useState(JOB_CATEGORIES);
  const [selectedJobCategory, setSelectedJobCategory] = useState(null);
  const [skillMaster, setSkillMaster] = useState(SKILL_MASTER);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [screenHistory, setScreenHistory] = useState([]);

  // JD Assessments: auto-generated per JD, with candidate results
  const [jdAssessments, setJdAssessments] = useState({
    "JD-001": {
      title: "経理スタッフ適性アセスメント",
      areas: ["簿記知識", "Excel実務", "給与計算", "決算業務", "税務基礎"],
      questions: 20, duration: "30分", passScore: 70,
      results: {
        "C-001": { score: 88, passed: true, date: "2026/04/10", detail: { "簿記知識": 92, "Excel実務": 85, "給与計算": 90, "決算業務": 80, "税務基礎": 88 } },
        "C-003": { score: 92, passed: true, date: "2026/04/08", detail: { "簿記知識": 95, "Excel実務": 90, "給与計算": 88, "決算業務": 95, "税務基礎": 90 } },
        "C-004": { score: 55, passed: false, date: "2026/04/12", detail: { "簿記知識": 50, "Excel実務": 70, "給与計算": 40, "決算業務": 55, "税務基礎": 60 } },
        "C-015": { score: 82, passed: true, date: "2026/04/14", detail: { "簿記知識": 85, "Excel実務": 80, "給与計算": 85, "決算業務": 75, "税務基礎": 82 } }
      }
    },
    "JD-002": {
      title: "一般事務スタッフ適性アセスメント",
      areas: ["Excel基本操作", "Word文書作成", "電話対応", "データ入力速度", "ビジネスマナー"],
      questions: 18, duration: "25分", passScore: 70,
      results: {
        "C-002": { score: 82, passed: true, date: "2026/04/09", detail: { "Excel基本操作": 80, "Word文書作成": 85, "電話対応": 88, "データ入力速度": 78, "ビジネスマナー": 82 } },
        "C-005": { score: 90, passed: true, date: "2026/04/10", detail: { "Excel基本操作": 92, "Word文書作成": 88, "電話対応": 90, "データ入力速度": 85, "ビジネスマナー": 95 } },
        "C-012": { score: 78, passed: true, date: "2026/04/13", detail: { "Excel基本操作": 80, "Word文書作成": 75, "電話対応": 78, "データ入力速度": 82, "ビジネスマナー": 75 } }
      }
    },
    "JD-003": {
      title: "営業事務スタッフ適性アセスメント",
      areas: ["Excel応用", "見積作成", "顧客対応", "PowerPoint", "Salesforce"],
      questions: 15, duration: "25分", passScore: 70,
      results: {
        "C-005": { score: 94, passed: true, date: "2026/04/07", detail: { "Excel応用": 95, "見積作成": 92, "顧客対応": 98, "PowerPoint": 90, "Salesforce": 95 } },
        "C-011": { score: 80, passed: true, date: "2026/04/11", detail: { "Excel応用": 82, "見積作成": 78, "顧客対応": 85, "PowerPoint": 75, "Salesforce": 80 } }
      }
    }
  });

  const generateJdAssessment = (jd) => {
    const skills = [...(jd.requiredSkills || jd.skillMust || []), ...(jd.preferredSkills || jd.skillWant || [])].slice(0, 5);
    const areas = skills.length > 0 ? skills.map(s => typeof s === "string" ? s.replace(/（.*?）/g, "").trim() : s) : [jd.title + "基礎", "実務スキル", "応用力"];
    return {
      title: `${jd.title}適性アセスメント`,
      areas: areas.slice(0, 5),
      questions: Math.max(10, areas.length * 4),
      duration: `${Math.max(20, areas.length * 5)}分`,
      passScore: 70,
      results: {}
    };
  };

  // Navigation helpers
  const doNavigate = (s, data) => {
    setScreenHistory(prev => [...prev, screen]);
    setScreen(s);
    if (data?.jd) setSelectedJD(data.jd);
    if (data?.candidate) setSelectedCandidate(data.candidate);
    if (data?.plan) setSelectedPlan(data.plan);
  };

  const navigate = (s, data) => {
    // If leaving JD create screen with unsaved draft, show confirm
    // Allow candidate-detail navigation without confirmation (user can go back)
    if (screen === "jd-create" && unsavedJDRef.current && s !== "jd-create" && s !== "candidate-detail") {
      const draft = unsavedJDRef.current;
      setEditingJD(draft); // preserve draft across re-mount
      setJdLeaveConfirm({ target: s, data, isBack: false, draft });
      return;
    }
    doNavigate(s, data);
  };

  const doGoBack = () => {
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setScreenHistory(h => h.slice(0, -1));
      setScreen(prev);
    } else {
      const defaultScreen = role === "sales" ? "sales-dashboard" : role === "candidate" ? "candidate-dashboard" : role === "customer" ? "jd-list" : "dashboard";
      setScreen(defaultScreen);
    }
  };

  const goBack = () => {
    if (screen === "jd-create" && unsavedJDRef.current) {
      const draft = unsavedJDRef.current;
      setEditingJD(draft);
      setJdLeaveConfirm({ target: null, data: null, isBack: true, draft });
      return;
    }
    doGoBack();
  };

  const doSaveJDAndLeave = (jdName) => {
    const pending = jdLeaveConfirm;
    const draft = pending?.draft || unsavedJDRef.current;
    if (draft) {
      const toSave = jdName ? {...draft, title: jdName} : draft;
      const now = new Date();
      const ts = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,"0")}/${String(now.getDate()).padStart(2,"0")} ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
      const existingIdx = savedJDs.findIndex(j => j.id === toSave._savedId);
      if (existingIdx >= 0) {
        setSavedJDs(prev => prev.map((j, i) => i === existingIdx ? {...toSave, _savedId: j.id, _savedAt: ts, _savedBy: role, _customerName: role === "customer" ? "テックイノベーション株式会社" : j._customerName} : j));
      } else {
        const newId = `JD-S${String(savedJDs.length + 1).padStart(3, "0")}`;
        setSavedJDs(prev => [...prev, {...toSave, _savedId: newId, _savedAt: ts, _savedBy: role, _customerName: role === "customer" ? "テックイノベーション株式会社" : null}]);
        if (!jdAssessments[newId]) setJdAssessments(prev => ({...prev, [newId]: generateJdAssessment(toSave)}));
      }
      setJdSaveToast("保存しました");
      setTimeout(() => setJdSaveToast(null), 2500);
    }
    unsavedJDRef.current = null;
    setEditingJD(null);
    setJdLeaveConfirm(null);
    setJdLeaveNameModal(null);
    if (pending?.newRole) setRole(pending.newRole);
    setScreenHistory([]);
    setScreen("jd-list");
  };
  const saveJDAndLeave = () => {
    if (role === "customer") {
      const draft = jdLeaveConfirm?.draft || unsavedJDRef.current;
      setJdLeaveNameModal({ name: draft?.title || "" });
    } else {
      doSaveJDAndLeave(null);
    }
  };

  const discardJDAndLeave = () => {
    const pending = jdLeaveConfirm;
    unsavedJDRef.current = null;
    setEditingJD(null);
    setJdLeaveConfirm(null);
    if (pending?.newRole) setRole(pending.newRole);
    if (pending?.isBack) doGoBack();
    else if (pending?.clearHistory) { setScreenHistory([]); setScreen(pending.target); }
    else if (pending?.target) doNavigate(pending.target, pending.data);
  };

  // Simulated AI generation
  const simulateAI = (callback, delay = 1500) => {
    setAiGenerating(true);
    setTimeout(() => { setAiGenerating(false); callback(); }, delay);
  };

  // ============================================================
  // SIDEBAR NAVIGATION
  // ============================================================
  const SideNav = () => {
    const navItems = {
      customer: [
        { id: "jd-list", label: "募集管理", icon: <List size={18}/> },
        { id: "search", label: "スタッフ検索", icon: <Search size={18}/> },
        { id: "favorites", label: "お気に入り一覧", icon: <Star size={18}/> }
      ],
      sales: [
        { id: "sales-dashboard", label: "ダッシュボード", icon: <Home size={18}/> },
        { id: "sales-jd-list", label: "募集一覧", icon: <List size={18}/> },
        { id: "search", label: "スタッフ検索", icon: <Search size={18}/> },
        { id: "assignment-list", label: "スタッフ就業状況", icon: <Monitor size={18}/> }
      ],
      admin: [
        { id: "dashboard", label: "ダッシュボード", icon: <Home size={18}/> },
        { group: "運用管理" },
        { id: "plans", label: "育成計画", icon: <Target size={18}/> },
        { id: "assignment-list", label: "スタッフ就業状況", icon: <Monitor size={18}/> },
        { id: "search", label: "スタッフ検索", icon: <Search size={18}/> },
        { group: "マスタ管理" },
        { id: "job-categories", label: "職種マスタ", icon: <Layers size={18}/> },
        { id: "skill-master", label: "スキルマスタ", icon: <Zap size={18}/> },
        { id: "training-master", label: "研修マスタ", icon: <BookOpen size={18}/> }
      ],
      candidate: [
        { id: "candidate-dashboard", label: "マイページ", icon: <Home size={18}/> },
        { id: "candidate-assessments", label: "アセスメント", icon: <Award size={18}/> },
        { id: "candidate-training-list", label: "研修一覧", icon: <BookOpen size={18}/> }
      ]
    };

    const handleRoleChange = (e) => {
      const newRole = e.target.value;
      const defaults = { admin: "dashboard", sales: "sales-dashboard", customer: "jd-list", candidate: "candidate-dashboard" };
      const target = defaults[newRole] || "dashboard";
      if (screen === "jd-create" && unsavedJDRef.current) {
        const draft = unsavedJDRef.current;
        setEditingJD(draft);
        setJdLeaveConfirm({ target, data: null, isBack: false, clearHistory: true, newRole, draft });
        return;
      }
      setRole(newRole); setScreenHistory([]); setScreen(target);
      setMobileMenuOpen(false);
    };

    const handleNavClick = (itemId) => {
      if (screen === "jd-create" && unsavedJDRef.current && itemId !== "jd-create") {
        const draft = unsavedJDRef.current;
        setEditingJD(draft);
        setJdLeaveConfirm({ target: itemId, data: null, isBack: false, clearHistory: true, draft });
        return;
      }
      setScreenHistory([]); setScreen(itemId);
      setMobileMenuOpen(false);
    };

    const sidebarContent = (
      <>
        <div className="p-5 mb-1" style={{borderBottom: "1px solid rgba(255,255,255,0.08)"}}>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 flex items-center justify-center" style={{background: MORPHY.red, borderRadius: MORPHY.radius.sm}}><Layers size={16} className="text-white"/></div>
            <div>
              <div className="text-sm text-white" style={{fontWeight: 600}}>TalentFlow</div>
              <div className="text-xs" style={{color: "rgba(255,255,255,0.4)", fontWeight: 400}}>人材需給最適化</div>
            </div>
            {isMobile && <button onClick={() => setMobileMenuOpen(false)} className="ml-auto p-1"><X size={18} style={{color: "rgba(255,255,255,0.6)"}}/></button>}
          </div>
          <select value={role} onChange={handleRoleChange} className="w-full text-white text-xs px-3 py-2" style={{background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: MORPHY.radius.md, fontWeight: 400}}>
            <option value="sales">営業モード</option>
            <option value="admin">管理者モード</option>
            <option value="customer">派遣先企業モード</option>
            <option value="candidate">スタッフモード</option>
          </select>
        </div>
        <nav className="flex-1 px-3 py-2">
          {navItems[role]?.map((item, idx) => {
            if (item.group) {
              return (
                <div key={`group-${idx}`} className="px-3 pt-4 pb-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{color: "rgba(255,255,255,0.3)"}}>{item.group}</span>
                </div>
              );
            }
            const active = screen === item.id || screen.startsWith(item.id);
            return (
              <button key={item.id} onClick={() => handleNavClick(item.id)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm mb-0.5 transition-all duration-200"
                style={{
                  borderRadius: MORPHY.radius.md,
                  background: active ? "rgba(255,255,255,0.1)" : "transparent",
                  color: active ? "#fff" : "rgba(255,255,255,0.5)",
                  fontWeight: active ? 600 : 400,
                }}>
                {item.icon}<span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="px-3 py-3" style={{borderTop: "1px solid rgba(255,255,255,0.06)"}}>
          <button onClick={() => handleNavClick("about")} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-all duration-200" style={{borderRadius: MORPHY.radius.md, background: screen === "about" ? "rgba(255,255,255,0.1)" : "transparent", color: screen === "about" ? "#fff" : "rgba(255,255,255,0.45)", fontWeight: 400}}>
            <Sparkles size={18}/><span>本サービスについて</span>
          </button>
        </div>
      </>
    );

    return (
      <>
        {/* Desktop sidebar */}
        <div className="tf-sidebar-desktop w-56 flex-shrink-0 flex flex-col h-screen sticky top-0" style={{background: MORPHY.plumBlack, color: "#fff"}}>
          {sidebarContent}
        </div>
        {/* Mobile overlay + drawer */}
        {isMobile && (
          <>
            {mobileMenuOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}/>}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col tf-sidebar-mobile ${mobileMenuOpen ? "tf-sidebar-open" : ""}`} style={{background: MORPHY.plumBlack, color: "#fff"}}>
              {sidebarContent}
            </div>
          </>
        )}
      </>
    );
  };

  // ============================================================
  // SHARED COMPONENTS
  // ============================================================
  const PageHeader = ({ title, subtitle, actions, onBack }) => (
    <div className="flex items-center justify-between mb-8 tf-page-header flex-wrap gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {onBack && <button onClick={onBack} className="w-9 h-9 flex-shrink-0 flex items-center justify-center transition-all duration-200" style={{background: MORPHY.warmLight, borderRadius: MORPHY.radius.circle}}><ArrowLeft size={16} style={{color: MORPHY.plumBlack}}/></button>}
        <div className="min-w-0">
          <h1 className="text-xl truncate" style={{color: MORPHY.plumBlack, fontWeight: 700, letterSpacing: "-1.2px"}}>{title}</h1>
          {subtitle && <p className="text-sm mt-0.5 truncate" style={{color: MORPHY.oliveGray, fontWeight: 400}}>{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}
    </div>
  );

  const Badge = ({ children, color = "blue" }) => {
    const isRed = color === "red";
    return <span className="inline-flex items-center px-3 py-1 text-xs" style={{
      borderRadius: MORPHY.radius.md,
      background: isRed ? MORPHY.red : MORPHY.sand,
      color: isRed ? "#fff" : MORPHY.plumBlack,
      fontWeight: 500
    }}>{children}</span>;
  };

  const MatchBar = ({ value, label, size = "md" }) => {
    const h = size === "sm" ? "h-1.5" : "h-2";
    return (
      <div className="w-full">
        {label && <div className="flex justify-between text-xs mb-1.5"><span style={{color: MORPHY.oliveGray, fontWeight: 400}}>{label}</span><span style={{color: MORPHY.plumBlack, fontWeight: 700}}>{value}%</span></div>}
        <div className={`w-full ${h}`} style={{background: MORPHY.sand, borderRadius: MORPHY.radius.md}}><div className={`${h} transition-all`} style={{ width: `${value}%`, background: value >= 80 ? MORPHY.green700 : value >= 60 ? MORPHY.plumBlack : value >= 40 ? MORPHY.oliveGray : MORPHY.warmSilver, borderRadius: MORPHY.radius.md }}></div></div>
      </div>
    );
  };

  const Card = ({ children, className = "", onClick }) => (
    <div className={`bg-white ${onClick ? "cursor-pointer transition-all duration-200" : ""} ${className}`} style={{border: `1px solid ${MORPHY.cardBorder}`, borderRadius: MORPHY.radius.md, boxShadow: MORPHY.shadow.card}} onMouseEnter={onClick ? (e) => { e.currentTarget.style.boxShadow = MORPHY.shadow.float; } : undefined} onMouseLeave={onClick ? (e) => { e.currentTarget.style.boxShadow = "none"; } : undefined} onClick={onClick}>{children}</div>
  );

  const StatCard = ({ icon, label, value, sub, color = "blue", onClick, featured = false }) => {
    if (featured) {
      return (
        <div className={`px-4 py-3 text-white ${onClick ? "cursor-pointer transition-all duration-200" : ""}`} style={{background: MORPHY.red, borderRadius: MORPHY.radius.lg}} onClick={onClick}>
          <div className="flex items-center justify-between mb-1">
            <div style={{fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 400}}>{label}</div>
            <div className="p-1.5" style={{background: "rgba(255,255,255,0.15)", borderRadius: MORPHY.radius.circle}}>{React.cloneElement(icon, { size: 14 })}</div>
          </div>
          <div className="text-2xl text-white" style={{fontWeight: 600}}>{value}</div>
          {sub && <div style={{fontSize: "10px", marginTop: "2px", color: "rgba(255,255,255,0.6)", fontWeight: 400}}>{sub}</div>}
        </div>
      );
    }
    return (
      <Card className={`px-4 py-3 ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
        <div className="flex items-center justify-between mb-1">
          <div style={{fontSize: "11px", color: MORPHY.oliveGray, fontWeight: 500}}>{label}</div>
          <div className="p-1.5" style={{background: MORPHY.warmWash, borderRadius: MORPHY.radius.circle}}>{React.cloneElement(icon, { size: 14, style: { color: MORPHY.plumBlack } })}</div>
        </div>
        <div className="text-2xl" style={{color: MORPHY.plumBlack, fontWeight: 600}}>{value}</div>
        {sub && <div className="flex items-center gap-1" style={{fontSize: "10px", marginTop: "2px", color: MORPHY.warmSilver, fontWeight: 400}}>{sub}</div>}
      </Card>
    );
  };

  const AIBadge = () => <span className="inline-flex items-center gap-1 px-3 py-1 text-xs" style={{background: MORPHY.plumBlack, color: "#fff", borderRadius: MORPHY.radius.md, fontWeight: 500}}><Sparkles size={11}/>AI</span>;

  const CandidateAvatar = ({ candidate, size = "md" }) => {
    const sizes = { sm: "w-10 h-10 text-xs", md: "w-11 h-11 text-sm", lg: "w-16 h-16 text-lg" };
    const sizeClass = sizes[size] || sizes.md;
    const [imgError, setImgError] = React.useState(false);
    return candidate.photo && !imgError
      ? <img src={candidate.photo} alt={candidate.name} className={`${sizeClass} rounded-full object-cover flex-shrink-0`} onError={() => setImgError(true)}/>
      : <div className={`${sizeClass} rounded-full flex items-center justify-center text-white flex-shrink-0`} style={{background: MORPHY.plumBlack, fontWeight: 600}}>{candidate.id.split("-")[1]}</div>;
  };

  // Shared candidate metadata helper
  const CAND_META = (() => {
    const jobTypes = ["中途","新卒","中途","新卒","中途","中途","新卒","中途","新卒","中途","中途","新卒","中途","新卒","中途","新卒","中途","新卒"];
    const roles = ["経理","事務","労務","事務","営業事務","IT","CS","医療事務","製造","受付","営業","事務","物流","マーケ","経理","事務","営業管理","人事"];
    const positions = ["主任","一般","課長","一般","主任","一般","課長","一般","主任","主任","一般","一般","課長","一般","主任","一般","主任","一般"];
    const grades = ["E","F","D","F","E","F","D","F","E","E","F","F","D","F","E","F","E","F"];
    const transfers = ["現在のままが良い","異動を希望","条件次第で検討","異動を希望","現在のままが良い","条件次第で検討","現在のままが良い","現在のままが良い","異動を希望","条件次第で検討","現在のままが良い","異動を希望","条件次第で検討","異動を希望","現在のままが良い","条件次第で検討","現在のままが良い","異動を希望"];
    const careerSets = [["マネジメント志向","事務深耕"],["プレイヤー志向","安定志向"],["マネジメント志向","技術継承"],["安定志向","スキル向上"],["営業支援志向","管理志向"],["IT志向","サポート"],["顧客対応志向","管理志向"],["医療志向","安定志向"],["製造管理志向","品質改善"],["秘書志向","管理補助"],["営業支援志向","マネジメント志向"],["事務多角化","安定志向"],["物流管理志向","効率化"],["企画志向","分析志向"],["経理専門化","管理志向"],["事務スキル向上","キャリアアップ"],["営業管理志向","効率化"],["人事専門化","育成志向"]];
    const behaviorSets = [["論理的思考","正確性"],["協調性","対応力"],["管理能力","継続性"],["丁寧さ","確実性"],["営業意識","協調性"],["技術志向","学習意欲"],["顧客対応力","共感力"],["細心","正確性"],["改善意識","判断力"],["細心","礼儀正しさ"],["営業支援","計画性"],["効率性","協調性"],["管理能力","課題解決"],["分析的","創造性"],["論理的思考","正確性"],["対応力","学習意欲"],["管理能力","営業支援"],["人材育成","計画性"]];
    const map = {};
    CANDIDATES.forEach((c, i) => {
      map[c.id] = { jobType: jobTypes[i], role: roles[i], position: positions[i], grade: grades[i], transfer: transfers[i], career: careerSets[i], behavior: behaviorSets[i] };
    });
    return map;
  })();

  const TransferTag = ({ value }) => {
    const isStay = value === "現在のままが良い";
    const isWant = value === "異動を希望";
    return <span className="text-xs px-3 py-1" style={{
      borderRadius: MORPHY.radius.md,
      background: isWant ? MORPHY.red : isStay ? MORPHY.sand : MORPHY.warmLight,
      color: isWant ? "#fff" : MORPHY.plumBlack,
      fontWeight: 500
    }}>{value}</span>;
  };

  const CandidateCardBody = ({ candidate: c, matchScore, showMatch = true, showClose = true, compact = false, isBlind = false, favSource = null }) => {
    const meta = CAND_META[c.id] || CAND_META["C-001"];
    const [isFav, setIsFav] = useState(favoriteCandidatesRef.current.has(c.id));
    return (
      <>
        {/* Top Icons */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0">
          <Clipboard size={16} style={{color: MORPHY.warmSilver}}/>
          <div className="flex items-center gap-2">
            {isBlind && (
              <button onClick={e => { e.stopPropagation(); const next = new Map(favoriteCandidatesRef.current); if (next.has(c.id)) next.delete(c.id); else next.set(c.id, favSource || { source: "unknown", sourceLabel: "不明" }); favoriteCandidatesRef.current = next; setIsFav(!isFav); }} className="hover:opacity-70 transition-opacity">
                <Star size={16} style={{color: isFav ? "#f5a623" : MORPHY.warmSilver, fill: isFav ? "#f5a623" : "none"}}/>
              </button>
            )}
            {showClose && <button onClick={e => e.stopPropagation()} style={{color: MORPHY.warmSilver}} className="hover:opacity-60 transition-opacity"><X size={16}/></button>}
          </div>
        </div>
        {/* Department Badge */}
        {!isBlind && <div className="px-5 pt-2 pb-3">
          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1" style={{background: MORPHY.warmWash, border: `1px solid ${MORPHY.cardBorder}`, borderRadius: MORPHY.radius.md, color: MORPHY.plumBlack, fontWeight: 500}}>
            <Users size={12}/>自部門
          </span>
        </div>}
        {isBlind && <div className="px-5 pt-2 pb-3">
          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1" style={{background: MORPHY.warmWash, border: `1px solid ${MORPHY.cardBorder}`, borderRadius: MORPHY.radius.md, color: MORPHY.plumBlack, fontWeight: 500}}>
            <Shield size={12}/>ブラインド
          </span>
        </div>}
        {/* Profile Row */}
        <div className="flex items-center gap-3 px-5 mb-4">
          <CandidateAvatar candidate={c} size="md"/>
          <div className="min-w-0">
            <div className="flex items-center gap-2"><span className="text-sm" style={{color: MORPHY.plumBlack, fontWeight: 700}}>{isBlind ? `候補者 ${c.id}` : c.name}</span>{!isBlind && <EmploymentBadge type={c.employmentType}/>}</div>
            <div className="text-xs flex items-center gap-0.5 flex-wrap mt-0.5" style={{color: MORPHY.warmSilver}}>
              {!isBlind && <><span>{c.id.replace("C-","")}</span>
              <span className="mx-0.5">|</span><span>{c.gender}</span>
              <span className="mx-0.5">|</span></>}
              <span>{meta.jobType}</span>
              <span className="mx-0.5">|</span><span>{c.age}歳</span>
              <span className="mx-0.5">|</span><span>{meta.role}</span>
              {!isBlind && <><span className="mx-0.5">|</span><span>{meta.position}</span>
              <span className="mx-0.5">|</span><span>等級{meta.grade}</span></>}
            </div>
          </div>
        </div>
        {/* Transfer Preference - hide from customers */}
        {!isBlind && <div className="px-5 mb-3">
          <div className="text-xs mb-1.5" style={{color: MORPHY.oliveGray, fontWeight: 500}}>本人の異動希望</div>
          <TransferTag value={meta.transfer}/>
        </div>}
        {/* Career Orientation - hide from customers */}
        {!isBlind && <div className="px-5 mb-3">
          <div className="text-xs mb-1.5" style={{color: MORPHY.oliveGray, fontWeight: 500}}>キャリア志向性</div>
          <div className="flex flex-wrap gap-1.5">
            {meta.career.map(t => <span key={t} className="text-xs px-3 py-1" style={{background: MORPHY.sand, borderRadius: MORPHY.radius.sm, color: MORPHY.plumBlack, fontWeight: 400}}>{t}</span>)}
          </div>
        </div>}
        {/* Skills summary for blind mode */}
        {isBlind && <div className="px-5 mb-3">
          <div className="text-xs mb-1.5" style={{color: MORPHY.oliveGray, fontWeight: 500}}>スキルセット</div>
          <div className="flex flex-wrap gap-1.5">
            {c.skills.slice(0, 5).map(s => <span key={s.name} className="text-xs px-3 py-1" style={{background: MORPHY.sand, borderRadius: MORPHY.radius.sm, color: MORPHY.plumBlack, fontWeight: 400}}>{s.name}</span>)}
          </div>
        </div>}
        {/* Assessment badges for customer/blind mode */}
        {isBlind && (() => {
          const candAssessments = Object.entries(jdAssessments).filter(([, a]) => a.results?.[c.id]).map(([jdId, a]) => ({ jdId, ...a.results[c.id], passScore: a.passScore }));
          const passed = candAssessments.filter(a => a.passed);
          if (passed.length === 0) return null;
          return (
            <div className="px-5 mb-3">
              <div className="flex flex-wrap gap-1.5">
                {passed.map(a => (
                  <span key={a.jdId} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium" style={{backgroundColor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0"}}>
                    <Award size={10}/>{a.score}点合格
                  </span>
                ))}
              </div>
            </div>
          );
        })()}
        {!compact && !isBlind && <>
          {/* Behavior Traits */}
          <div className="px-5 mb-4">
            <div className="text-xs mb-1.5" style={{color: MORPHY.oliveGray, fontWeight: 500}}>代表的な行動特性</div>
            <div className="flex flex-wrap gap-1.5">
              {meta.behavior.map(t => <span key={t} className="text-xs px-3 py-1" style={{background: MORPHY.sand, borderRadius: MORPHY.radius.sm, color: MORPHY.plumBlack, fontWeight: 400}}>{t}</span>)}
            </div>
          </div>
        </>}
        {/* Match Score */}
        {showMatch && (
          <div className="px-5 pb-5 pt-4" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
            <div className="text-xs mb-1" style={{color: MORPHY.oliveGray, fontWeight: 500}}>JDマッチ度</div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-4xl" style={{color: MORPHY.red, fontWeight: 600}}>{matchScore || 0}</span>
              <span className="text-xl" style={{color: MORPHY.red, fontWeight: 400, opacity: 0.6}}>%</span>
            </div>
          </div>
        )}
      </>
    );
  };

  const StatusBadge = ({ status }) => {
    const s = STATUS_STYLES[status] || STATUS_STYLES["未確認"];
    return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${s.bg} ${s.text} ${s.border}`}><span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>{status}</span>;
  };

  const EmploymentBadge = ({ type }) => {
    if (!type) return null;
    const isEmployee = type === "正社員";
    return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${isEmployee ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>{isEmployee ? "正社員" : "FL"}</span>;
  };

  const LoadingAI = ({ text = "AIが生成中..." }) => (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 mx-auto mb-4" style={{borderWidth: 3, borderStyle: "solid", borderColor: `${MORPHY.cardBorder}`, borderTopColor: MORPHY.plumBlack}}></div>
        <p className="text-sm flex items-center gap-2 justify-center" style={{color: MORPHY.textSecondary}}><Sparkles size={14} style={{color: MORPHY.purple}}/>{text}</p>
      </div>
    </div>
  );

  const CustomerInquiryCard = ({ candidateId, matchScore }) => {
    const [inquiryState, setInquiryState] = useState("idle"); // "idle" | "form" | "sent"
    const [inquiryType, setInquiryType] = useState("詳細確認");
    const [inquiryMessage, setInquiryMessage] = useState("");

    const sendInquiry = () => {
      addInterviewRequest(null, candidateId, "顧客");
      setInquiryState("sent");
    };

    if (inquiryState === "sent") {
      return (
        <Card className="p-4 bg-[#f6f6f3]">
          <div className="text-center py-2">
            <CheckCircle size={28} className="mx-auto text-green-500 mb-2"/>
            <h3 className="text-sm font-medium text-green-800">面談リクエストを送信しました</h3>
            <p className="text-xs text-green-600 mt-1">営業担当が確認次第、対応状況をお知らせします</p>
            <p className="text-xs text-[#91918c] mt-2">受付番号: INQ-{candidateId}-{Date.now().toString().slice(-4)}</p>
          </div>
        </Card>
      );
    }

    if (inquiryState === "form") {
      return (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#211922] mb-3 flex items-center gap-2"><Send size={14} className="text-[#211922]/80"/>候補者 {candidateId} に興味あり</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#91918c] mb-1 block">依頼種別</label>
              <select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={inquiryType} onChange={e => setInquiryType(e.target.value)}>
                <option>面談希望</option>
                <option>詳細確認</option>
                <option>提案依頼</option>
                <option>条件交渉</option>
                <option>その他</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#91918c] mb-1 block">メッセージ（任意）</label>
              <textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 h-20 resize-none" placeholder="例：この候補者に興味があります。詳細を教えてください" value={inquiryMessage} onChange={e => setInquiryMessage(e.target.value)}/>
            </div>
            <div className="flex gap-2">
              <button onClick={sendInquiry} className="flex-1 bg-[#e60023] text-white rounded-2xl transition-all duration-200 text-sm py-2.5 flex items-center justify-center gap-1.5 hover:bg-[#cc001f]"><Send size={14}/>面談リクエストを送信</button>
              <button onClick={() => setInquiryState("idle")} className="bg-[#e5e5e0]/50 hover:bg-[#f6f6f3] text-[#62625b] text-sm px-4 py-2.5 rounded-lg">キャンセル</button>
            </div>
          </div>
        </Card>
      );
    }

    // Check scout request status for this candidate
    const existingIR = interviewRequests.find(sr => sr.candidateId === candidateId);

    return (
      <Card className="p-4">
        <h3 className="text-sm font-medium text-[#211922] mb-2">この候補者との面談を希望しますか？</h3>
        <p className="text-xs text-[#91918c] mb-3">面談リクエストを送ると、営業担当が候補者の職務経歴書と共に回答します。</p>
        {existingIR ? (
          <div>
            <div className="flex items-center gap-2 p-3 rounded-lg mb-2" style={{background: existingIR.status === "回答メール送信済" ? "#f0fdf4" : existingIR.feedback ? "#f0f9ff" : "#fef2f2", border: `1px solid ${existingIR.status === "回答メール送信済" ? "#bbf7d0" : existingIR.feedback ? "#bfdbfe" : "#fecaca"}`}}>
              <CheckCircle size={14} style={{color: existingIR.status === "回答メール送信済" ? "#15803d" : "#dc2626"}}/>
              <div className="flex-1">
                <span className="text-xs font-medium" style={{color: existingIR.status === "回答メール送信済" ? "#15803d" : "#dc2626"}}>
                  {existingIR.feedback ? `フィードバック済み（${existingIR.feedback.result === "採用希望" ? "採用希望" : existingIR.feedback.result === "見送り" ? "見送り" : "検討中"}）` : existingIR.status === "回答メール送信済" ? "回答済み — 職務経歴書をご確認ください" : "面談リクエスト送信済み — 営業が対応中です"}
                </span>
              </div>
            </div>
            {existingIR.status === "回答メール送信済" && !existingIR.feedback && (
              <div className="mt-3 p-3 rounded-lg bg-[#f6f6f3] border border-[#e5e5e0]">
                <p className="text-xs font-medium text-[#211922] mb-2">この候補者のフィードバックをお願いします</p>
                <div className="flex gap-2 mb-2">
                  {["採用希望", "検討中", "見送り"].map(opt => (
                    <button key={opt} onClick={() => {
                      setInterviewRequests(prev => prev.map(ir => ir.id === existingIR.id ? { ...ir, feedback: { result: opt, comment: "", date: new Date().toISOString().slice(0,16).replace("T"," ") } } : ir));
                    }} className={`flex-1 text-xs py-2 rounded-lg font-medium transition-colors ${opt === "採用希望" ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100" : opt === "見送り" ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100" : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"}`}>{opt}</button>
                  ))}
                </div>
              </div>
            )}
            {existingIR.feedback && (
              <div className="mt-2 text-xs text-[#91918c]">フィードバック日: {existingIR.feedback.date}</div>
            )}
            <p className="text-xs text-[#91918c] mt-1">リクエスト日: {existingIR.date}</p>
          </div>
        ) : (
          <button onClick={() => setInquiryState("form")} className="w-full bg-[#e60023] text-white rounded-2xl transition-all duration-200 text-sm py-2.5 flex items-center justify-center gap-2 font-medium hover:bg-[#cc001f]"><MessageSquare size={15}/>面談リクエストを送る</button>
        )}
        {!existingIR && matchScore >= 75 && <p className="text-xs text-green-600 mt-2 text-center flex items-center justify-center gap-1"><Zap size={12}/>マッチ度が高い候補者です。お早めにご検討ください。</p>}
      </Card>
    );
  };

  // ============================================================
  // CUSTOMER SCREENS
  // ============================================================

  const JDListScreen = () => {
    const allJDs = [
      ...JDS.map(j => ({...j, _savedId: j.id, _savedAt: "2026/04/01 10:00", _source: "テンプレート"})),
      ...savedJDs.map(j => ({...j, _source: "作成済み"}))
    ];
    return (
      <div>
        <PageHeader title="募集管理" subtitle={`${allJDs.length}件の募集`} actions={
          <button onClick={() => { setEditingJD(null); navigate("jd-create"); }} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center gap-2 transition-colors hover:bg-[#cc001f]"><Plus size={15}/>新規募集追加</button>
        }/>
        {allJDs.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4" style={{background: MORPHY.warmWash}}><FileText size={28} style={{color: MORPHY.oliveGray}}/></div>
            <h3 className="text-lg font-medium text-[#211922] mb-2">保存済みJDがありません</h3>
            <p className="text-sm text-[#91918c] mb-4">募集登録画面で募集を作成・保存してください。</p>
            <button onClick={() => { setEditingJD(null); navigate("jd-create"); }} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white inline-flex items-center gap-2 transition-colors hover:bg-[#cc001f]"><Plus size={15}/>募集を作成する</button>
          </Card>
        ) : (
          <div className="space-y-3 pb-20">
            {allJDs.map((jd, i) => (
              <Card key={jd._savedId || i} className="p-5 transition-all hover:translate-y-[-1px]">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => {
                    const jdForEdit = jd._source === "テンプレート"
                      ? { ...jd, title: jd.title, dept: "", aiSummary: jd.description, role: jd.responsibilities || "", responsibility: "", expMust: jd.requiredSkills, expWant: [], skillMust: jd.requiredSkills, skillWant: jd.preferredSkills, requiredSkills: jd.requiredSkills, preferredSkills: jd.preferredSkills, experience: jd.experience, location: jd.location, remote: jd.remote, _savedId: jd._savedId }
                      : jd;
                    setEditingJD(jdForEdit);
                    if (role === "customer") {
                      navigate("jd-detail");
                    } else {
                      navigate("jd-create");
                    }
                  }}>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-[#211922] truncate">{jd.title}</h3>
                      {(() => { const st = jdStatuses[jd.id] || jdStatuses[jd._savedId] || "募集中"; return (
                        <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium" style={{background: st === "募集中" ? "#f0fdf4" : "#f3f4f6", color: st === "募集中" ? "#15803d" : "#6b7280", border: `1px solid ${st === "募集中" ? "#bbf7d0" : "#d1d5db"}`}}>{st}</span>
                      ); })()}
                      <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{background: jd._source === "作成済み" ? `${MORPHY.red}15` : MORPHY.sand, color: jd._source === "作成済み" ? MORPHY.red : MORPHY.oliveGray}}>{jd._source}</span>
                      {(() => {
                        const assmt = jdAssessments[jd.id] || jdAssessments[jd._savedId];
                        const resultCount = assmt ? Object.keys(assmt.results).length : 0;
                        return assmt ? (
                          <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1" style={{background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d"}}>
                            <Award size={10}/>アセスメント{resultCount > 0 ? `（${resultCount}名受験）` : ""}
                          </span>
                        ) : null;
                      })()}
                      {role === "sales" && jd._customerName && (
                        <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1" style={{background: MORPHY.fog, border: `1px solid ${MORPHY.cardBorder}`, color: MORPHY.plumBlack}}>
                          <Building2 size={10}/>{jd._customerName}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#91918c] line-clamp-2 mb-2">{jd.aiSummary || jd.description}</p>
                    <div className="flex items-center gap-3 text-xs text-[#91918c]">
                      <span className="flex items-center gap-1"><MapPin size={12}/>{jd.location}</span>
                      <span className="flex items-center gap-1"><Monitor size={12}/>{jd.remote}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/>{jd.experience}</span>
                      {jd._candidateCount && <span className="flex items-center gap-1"><Users size={12}/>{jd._candidateCount}名マッチ</span>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4 flex-shrink-0">
                    <span className="text-xs text-[#91918c]">{jd._savedAt}</span>
                    {jd._source === "作成済み" && (
                      <button onClick={(e) => { e.stopPropagation(); setSavedJDs(prev => prev.filter(j => j._savedId !== jd._savedId)); }} className="text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors hover:bg-red-50" style={{color: MORPHY.warmSilver}}>
                        <X size={12}/>削除
                      </button>
                    )}
                    <ChevronRight size={16} style={{color: MORPHY.warmSilver}}/>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ======== JD Detail Screen (Customer mode) ========
  const JDDetailScreen = () => {
    const jd = editingJD;
    if (!jd) return <div className="text-center py-20"><p className="text-[#91918c] mb-4">募集が選択されていません</p><button onClick={goBack} className="px-4 py-2 rounded-lg text-sm bg-[#e60023] text-white hover:bg-[#cc001f]">戻る</button></div>;
    const assmt = jdAssessments[jd.id] || jdAssessments[jd._savedId];
    const resultEntries = assmt ? Object.entries(assmt.results).map(([cId, r]) => ({ cId, ...r, candidate: CANDIDATES.find(c => c.id === cId) })).filter(e => e.candidate) : [];
    const passedCount = resultEntries.filter(e => e.passed).length;

    // Candidate list for this JD — mix of sales-proposed and customer-found
    const jdKey = jd.id || jd._savedId;
    const customerAddedIds = jdCandidateAdditions[jdKey] || new Set();
    const rankedCandidates = useMemo(() => {
      const salesBase = CANDIDATES.filter(c => c.status !== "就業中" && !customerAddedIds.has(c.id)).map(c => ({ ...c, match: calcMatchScore(c, jd) })).sort((a, b) => b.match.current - a.match.current).slice(0, 5);
      const salesComments = [
        "実務経験が豊富で、即戦力として業務に貢献できます。正確な事務処理能力とリーダーシップを兼ね備えた人材です。",
        "幅広い業務経験に加えて、コミュニケーション能力が高く柔軟な対応力が魅力です。",
        "前職での業務改善・効率化の実績があり、貴社の要件に最適と考えます。",
        "コミュニケーション能力が高く、派遣先での人間関係構築も得意です。実務力と人間力を兼ね備えた人材です。",
        "新しい業務の習得が早く、これまでの多様な実務経験が募集要件に合致しています。"
      ];
      const salesCandidates = salesBase.map((c, i) => ({ ...c, source: "sales", salesComment: salesComments[i] || null }));
      // Customer-added candidates from search
      const customerCandidates = CANDIDATES.filter(c => customerAddedIds.has(c.id)).map(c => ({ ...c, match: calcMatchScore(c, jd), source: "customer", salesComment: null }));
      return [...salesCandidates, ...customerCandidates];
    }, [jd, customerAddedIds]);

    return (
      <div>
        <PageHeader title={jd.title} subtitle={jd.aiSummary || jd.description || ""} onBack={goBack} actions={
          <button onClick={() => { navigate("jd-create"); }} className="px-4 py-2 rounded-lg text-sm font-medium border flex items-center gap-2 transition-colors hover:bg-[#f6f6f3]" style={{borderColor: MORPHY.cardBorder, color: MORPHY.plumBlack}}><Edit3 size={14}/>編集</button>
        }/>
        <div className="grid grid-cols-3 tf-grid-3 gap-6">
          <div className="col-span-2 space-y-5">
            {/* JD Overview */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4"><FileText size={16} style={{color: MORPHY.red}}/><h3 className="font-medium text-[#211922]">募集要項</h3></div>
              {jd.role && <div className="mb-4"><span className="text-xs text-[#91918c]">役割</span><p className="text-sm text-[#211922] leading-relaxed mt-1">{jd.role}</p></div>}
              {jd.responsibility && <div className="mb-4"><span className="text-xs text-[#91918c]">責任</span><p className="text-sm text-[#211922] leading-relaxed mt-1">{jd.responsibility}</p></div>}
              <div className="grid grid-cols-2 tf-grid-2 gap-4 mb-4">
                <div>
                  <span className="text-xs text-[#91918c]">必須スキル</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(jd.requiredSkills || jd.skillMust || []).map(s => <span key={s} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">{s}</span>)}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-[#91918c]">歓迎スキル</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(jd.preferredSkills || jd.skillWant || []).map(s => <span key={s} className="text-xs bg-[#f6f6f3] text-[#62625b] px-2 py-0.5 rounded-full">{s}</span>)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 tf-grid-3 gap-4 text-sm">
                <div><span className="text-xs text-[#91918c]">経験年数</span><p className="font-medium mt-0.5">{jd.experience}</p></div>
                <div><span className="text-xs text-[#91918c]">勤務地</span><p className="font-medium mt-0.5">{jd.location}</p></div>
                <div><span className="text-xs text-[#91918c]">リモート</span><p className="font-medium mt-0.5">{jd.remote}</p></div>
              </div>
            </Card>

            {/* Proposed Candidates */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users size={16} style={{color: MORPHY.plumBlack}}/>
                  <h3 className="font-medium text-[#211922]">候補者一覧</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{background: MORPHY.warmWash, color: MORPHY.plumBlack, border: `1px solid ${MORPHY.cardBorder}`}}>{rankedCandidates.length}名</span>
                </div>
                <button onClick={() => { setSelectedJD(jd); setSearchMode("jd"); navigate("search"); }} className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 text-white transition-colors hover:opacity-90" style={{backgroundColor: MORPHY.red}}>
                  <Search size={14}/>候補者を探す
                </button>
              </div>
              <div className="space-y-3">
                {rankedCandidates.slice(0, 8).map(c => {
                  const cAssmt = assmt?.results?.[c.id];
                  const hasIR = c.source === "customer" || interviewRequestedCandidates.has(c.id);
                  return (
                    <div key={c.id} className="rounded-xl cursor-pointer hover:shadow-md transition-all" style={{backgroundColor: MORPHY.fog, border: `1px solid ${MORPHY.cardBorder}`}}
                      onClick={() => navigate("candidate-detail", { candidate: c })}>
                      <div className="flex items-center gap-4 p-4">
                        <CandidateAvatar candidate={c} size="md"/>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-[#211922]">候補者 {c.id}</span>
                            <EmploymentBadge type={c.employmentType}/>
                            <span className="text-xs text-[#91918c]">経験{c.totalYears}年</span>
                            {c.source === "sales" ? (
                              <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe"}}>営業提案</span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{background: "#f5f3ff", color: "#6d28d9", border: "1px solid #ddd6fe"}}>自己検索</span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {c.skills.slice(0, 4).map(s => (
                              <span key={s.name} className="text-xs px-2 py-0.5 rounded-full bg-white border border-[#e5e5e0] text-[#62625b]">{s.name}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {cAssmt ? (
                            <div className="text-center p-2 rounded-lg" style={{backgroundColor: cAssmt.passed ? "#f0fdf4" : "#fef2f2", border: `1px solid ${cAssmt.passed ? "#bbf7d0" : "#fecaca"}`, minWidth: "80px"}}>
                              <div className="text-lg font-bold" style={{color: cAssmt.passed ? "#15803d" : "#dc2626"}}>{cAssmt.score}<span className="text-xs font-normal">点</span></div>
                              <span className={`text-xs font-medium ${cAssmt.passed ? "text-green-600" : "text-red-600"}`}>{cAssmt.passed ? "合格" : "不合格"}</span>
                            </div>
                          ) : (
                            <div className="text-center p-2 rounded-lg bg-[#f6f6f3] border border-[#e5e5e0]" style={{minWidth: "80px"}}>
                              <div className="text-xs text-[#91918c]">未受験</div>
                            </div>
                          )}
                          <div className="text-right">
                            <div className="text-xs text-[#91918c]">マッチ度</div>
                            <span className="text-lg font-bold" style={{color: MORPHY.red}}>{c.match.current}%</span>
                          </div>
                          {!hasIR ? (
                            <button onClick={(e) => { e.stopPropagation(); addInterviewRequest(jdKey, c.id, jdCustomerMap[jdKey] || "顧客", c.source === "sales" ? "sales-proposed" : "customer-found"); const key = jdKey; if (c.source !== "sales") { setJdCandidateAdditions(prev => { const curr = new Set(prev[key] || []); curr.add(c.id); return { ...prev, [key]: curr }; }); } }} className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 text-white transition-colors hover:opacity-90" style={{backgroundColor: MORPHY.red}}>
                              <MessageSquare size={12}/>面談リクエスト
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium" style={{background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe"}}>
                              <CheckCircle size={12}/>リクエスト済み
                            </div>
                          )}
                          <ChevronRight size={16} className="text-[#91918c]"/>
                        </div>
                      </div>
                      {/* Sales recommendation comment */}
                      {c.source === "sales" && c.salesComment && (
                        <div className="px-4 pb-4 -mt-1">
                          <div className="flex items-start gap-2 p-3 rounded-lg" style={{backgroundColor: "#eff6ff", border: "1px solid #bfdbfe"}}>
                            <MessageSquare size={13} className="mt-0.5 flex-shrink-0" style={{color: "#1d4ed8"}}/>
                            <div>
                              <span className="text-xs font-medium" style={{color: "#1d4ed8"}}>営業からの推薦コメント</span>
                              <p className="text-xs text-[#374151] mt-0.5 leading-relaxed">{c.salesComment}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">募集ステータス</h3>
              {(() => {
                const currentStatus = jdStatuses[jdKey] || "募集中";
                return (
                  <div className="flex gap-2 mb-3">
                    {["募集中", "クローズ"].map(st => (
                      <button key={st} onClick={() => setJdStatuses(prev => ({...prev, [jdKey]: st}))}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${currentStatus === st ? "" : "opacity-50 hover:opacity-75"}`}
                        style={currentStatus === st
                          ? st === "募集中" ? {background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0"} : {background: "#f3f4f6", color: "#6b7280", border: "1px solid #d1d5db"}
                          : {background: "transparent", color: "#91918c", border: "1px solid #e5e5e0"}
                        }>{st}</button>
                    ))}
                  </div>
                );
              })()}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#91918c]">作成日</span><span className="font-medium">{jd._savedAt || "2026/04/01"}</span></div>
                <div className="flex justify-between"><span className="text-[#91918c]">勤務地</span><span className="font-medium">{jd.location}</span></div>
                <div className="flex justify-between"><span className="text-[#91918c]">リモート</span><span className="font-medium">{jd.remote}</span></div>
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3 flex items-center gap-1.5"><Users size={14} style={{color: MORPHY.plumBlack}}/>候補者状況</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#91918c]">候補者数</span>
                  <span className="text-sm font-medium">{rankedCandidates.length}名</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#91918c]">営業提案</span>
                  <span className="text-sm font-medium" style={{color: "#1d4ed8"}}>{rankedCandidates.filter(c => c.source === "sales").length}名</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#91918c]">自己検索</span>
                  <span className="text-sm font-medium" style={{color: "#6d28d9"}}>{rankedCandidates.filter(c => c.source === "customer").length}名</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#91918c]">面談リクエスト済み</span>
                  <span className="text-sm font-medium" style={{color: "#1d4ed8"}}>{rankedCandidates.filter(c => c.source === "customer" || interviewRequestedCandidates.has(c.id)).length}名</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const JDCreateScreen = () => {
    const [draftJD, setDraftJD] = useState(editingJD || null);
    const [candidateCount, setCandidateCount] = useState(editingJD ? 6 : null);
    const [showCandidates, setShowCandidates] = useState(false);
    const [showAiChat, setShowAiChat] = useState(true);
    const [chatMessages, setChatMessages] = useState([
      { role: "ai", text: "こんにちは！募集登録をお手伝いします。\n\n以下のような情報を自由にお伝えください：\n・議事メモや商談概要の貼り付け\n・他社募集要項の共有\n・「AWSができる人、東京勤務」などラフな要望\n\n何でもお気軽にどうぞ！" }
    ]);
    const [chatInput, setChatInput] = useState("");
    const [aiTyping, setAiTyping] = useState(false);
    const [jdSteps, setJdSteps] = useState({ data: false, detail: false, roleModel: false });
    const [jdNameModal, setJdNameModal] = useState(null); // null | { name: string, callback: function }
    const chatEndRef = React.useRef(null);

    // Sync unsaved draft to parent ref for leave-confirmation (no re-render)
    React.useEffect(() => { unsavedJDRef.current = draftJD; return () => { unsavedJDRef.current = null; }; }, [draftJD]);

    React.useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages, aiTyping]);

    const fullJD = {
      title: "経理事務スタッフ", dept: "管理本部 経理部",
      aiSummary: "月次決算・給与計算を中心とした経理業務を担当し、Excelを活用した正確なデータ処理と業務効率化ができるスタッフ。経理実務の経験と簿記知識を持つ即戦力人材。",
      role: "月次決算・仕訳入力・給与計算を中心とした経理業務全般を担当。社内関連部署と連携し、正確かつ効率的な経理運営を支援する。",
      responsibility: "経理データの正確性を確保し、決算スケジュールの厳守と業務品質の維持を担う。後輩指導や業務マニュアル整備を通じて、チーム全体の業務水準向上に貢献する。",
      expMust: ["2年以上の経理実務経験", "月次決算業務の経験"],
      expWant: ["年次決算の補助経験", "給与計算・社会保険手続きの経験"],
      skillMust: ["Excel（VLOOKUP・ピボットテーブル）", "日商簿記2級以上", "仕訳入力・伝票処理"],
      skillWant: ["SAP / 勘定奉行等の会計ソフト", "給与計算", "年末調整", "PowerPoint"],
      requiredSkills: ["Excel（2年以上）", "簿記2級", "経理実務"],
      preferredSkills: ["SAP", "給与計算", "年末調整", "PowerPoint"],
      experience: "2年以上", location: "東京", remote: "週2リモート可",
      responsibilities: "・月次決算業務（仕訳入力、勘定残高確認）\n・給与計算・年末調整の補助\n・請求書・支払管理\n・経費精算チェック",
      roleModel: { name: "田中 太郎", traits: ["正確性重視", "経理志向"] }
    };

    const processChat = (userMsg) => {
      const lower = userMsg.toLowerCase();
      if (!draftJD) {
        return { text: "入力内容を分析しました。JDドラフトを生成しました。\n\n左のパネルでJDの全体像をご確認ください。各セクションを直接編集することも、チャットで「経験年数を緩めて」「リモート可にして」など指示いただくこともできます。", jd: fullJD, count: 6 };
      }
      if (lower.includes("緩") || lower.includes("減") || lower.includes("下げ") || lower.includes("年数")) {
        return { text: "条件を緩和しました。\n・経験年数: 2年以上 → 半年以上\n・給与計算: 必須 → 歓迎に移動\n\n候補者が増える見込みです。", jdPatch: { requiredSkills: ["Excel", "簿記3級以上"], preferredSkills: ["SAP", "給与計算", "年末調整", "PowerPoint", "経理実務"], experience: "半年以上", expMust: ["半年以上の事務経験", "基本的なPC操作スキル"] }, count: 10 };
      }
      if (lower.includes("リモート") || lower.includes("remote") || lower.includes("在宅")) {
        return { text: "リモート条件を「フルリモート可」に変更しました。地方在住の優秀なスタッフも候補に入ります。", jdPatch: { remote: "フルリモート可" }, count: 12 };
      }
      if (lower.includes("追加") || lower.includes("英語") || lower.includes("スキル")) {
        const newPref = [...(draftJD.preferredSkills || [])];
        const newSW = [...(draftJD.skillWant || [])];
        if (lower.includes("英語") && !newPref.includes("英語")) { newPref.push("英語（TOEIC600以上）"); newSW.push("英語（TOEIC600以上）"); }
        if (lower.includes("access") && !newPref.includes("Access")) { newPref.push("Access"); newSW.push("Access"); }
        return newPref.length > draftJD.preferredSkills.length
          ? { text: "スキル要件を更新しました。歓迎スキルに追加し、JDに反映しました。", jdPatch: { preferredSkills: newPref, skillWant: newSW }, count: null }
          : { text: "どのスキルを追加しますか？例：「英語を歓迎スキルに追加して」", jdPatch: null, count: null };
      }
      if (lower.includes("役割") || lower.includes("ロール")) {
        return { text: "役割セクションを更新しました。他にも調整したい点があればお伝えください。", jdPatch: { role: draftJD.role + "また、チームのメンタリングも担当する。" }, count: null };
      }
      return { text: "承知しました。ご要望をJDに反映しました。他に調整したい点はありますか？\n\n例：\n・「もっとスキル要件を緩めて」\n・「リモート可にして」\n・「役割にメンタリングを追加して」\n・「責任範囲を広げて」", jdPatch: null, count: null };
    };

    const sendMessage = () => {
      if (!chatInput.trim() || aiTyping) return;
      const userMsg = chatInput.trim();
      setChatInput("");
      setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
      setAiTyping(true);
      setTimeout(() => {
        const result = processChat(userMsg);
        if (result.jd) { setDraftJD(result.jd); setCandidateCount(result.count); setJdSteps({ data: true, detail: true, roleModel: true }); setShowCandidates(true); }
        else if (result.jdPatch) {
          setDraftJD(prev => ({ ...prev, ...result.jdPatch }));
          if (result.count) setCandidateCount(result.count);
        }
        setChatMessages(prev => [...prev, { role: "ai", text: result.text }]);
        setAiTyping(false);
      }, 1200);
    };

    const quickActions = draftJD ? [
      { label: "条件を緩和して", msg: "スキル条件を緩めて候補者を増やしたい" },
      { label: "フルリモート可にして", msg: "リモート条件をフルリモート可に変更して" },
      { label: "簿記2級を追加", msg: "歓迎スキルに簿記2級を追加して" },
      { label: "役割を拡張", msg: "役割に後輩指導・OJT担当を追加して" },
    ] : [
      { label: "経理スタッフ、東京、簿記2級", msg: "経理経験者、東京勤務、簿記2級以上、給与計算の経験3年以上" },
      { label: "一般事務、Excel上級、フルタイム", msg: "Excel上級スキル、データ集計が得意な一般事務スタッフを探している" },
      { label: "営業事務、受発注経験、SAP", msg: "営業事務経験5年以上、受発注管理とSAP操作ができる人材" },
    ];

    const SectionHeader = ({ icon, title, color = MORPHY.primaryBlue }) => (
      <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full" style={{background: color}}/><h3 className="text-sm font-medium text-[#211922]">{title}</h3></div>
    );

    return (
      <div>
        {/* Save Toast */}
        {jdSaveToast && (
          <div className="fixed top-6 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium text-white animate-pulse" style={{background: MORPHY.plumBlack, boxShadow: MORPHY.shadow.float}}>
            <CheckCircle size={16}/>{jdSaveToast}
          </div>
        )}
        <PageHeader title="新規募集登録" subtitle="内容の追加・編集を行うことで、募集要項の精度を向上させることができます" actions={
          <button onClick={() => setShowAiChat(prev => !prev)} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${showAiChat ? "bg-[#e60023] text-white hover:bg-[#cc001f]" : "border"}`} style={showAiChat ? {} : {borderColor: MORPHY.oliveGray, color: MORPHY.plumBlack}}><Sparkles size={14}/>{showAiChat ? "AI編集を閉じる" : "AI編集"}</button>
        }/>
        <div className={`grid ${showAiChat ? "grid-cols-5 tf-grid-5" : "grid-cols-1"} gap-6 tf-plan-create-layout`} style={{minHeight: "calc(100vh - 160px)"}}>
          {/* Left: JD Content */}
          <div className={`${showAiChat ? "col-span-3" : "col-span-1"} overflow-y-auto pr-2 space-y-4 pb-20`}>
            {!draftJD ? (
              <Card className="p-8">
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4" style={{background: MORPHY.warmWash}}><FileText size={28} style={{color: MORPHY.primaryBlue}}/></div>
                  <h2 className="text-lg font-medium text-[#211922] mb-2">JDがまだ作成されていません</h2>
                  <p className="text-sm text-[#91918c] mb-4">{showAiChat ? "右のチャットで要望を伝えるとAIがJDを自動生成します。" : "「AI編集」ボタンを押してAIアシスタントを起動してください。"}<br/>議事メモ、他社JD、ラフな要望など何でもOKです。</p>
                  {!showAiChat && <button onClick={() => setShowAiChat(true)} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white inline-flex items-center gap-2 transition-colors hover:bg-[#cc001f]"><Sparkles size={15}/>AI編集を開始</button>}
                </div>
              </Card>
            ) : (
              <>
                {/* JD Title */}
                <Card className="p-6">
                  <div className="mb-1 text-xs text-[#91918c]">{draftJD.dept || "管理本部 経理部"}</div>
                  <input className="text-xl font-medium text-[#211922] w-full bg-transparent border-0 p-0 focus:outline-none focus:ring-0" value={draftJD.title} onChange={e => setDraftJD({...draftJD, title: e.target.value})}/>
                </Card>

                {/* AI Summary */}
                <Card className="p-6">
                  <SectionHeader icon={<Sparkles size={14}/>} title="AIによるサマリー" color={MORPHY.oliveGray}/>
                  <p className="text-sm text-[#211922] leading-relaxed">{draftJD.aiSummary}</p>
                </Card>

                {/* Role */}
                <Card className="p-6">
                  <SectionHeader title="役割"/>
                  <textarea className="w-full text-sm text-[#211922] leading-relaxed bg-transparent border-0 p-0 focus:outline-none focus:ring-0 resize-none" rows={3} value={draftJD.role} onChange={e => setDraftJD({...draftJD, role: e.target.value})}/>
                </Card>

                {/* Responsibility */}
                <Card className="p-6">
                  <SectionHeader title="責任"/>
                  <textarea className="w-full text-sm text-[#211922] leading-relaxed bg-transparent border-0 p-0 focus:outline-none focus:ring-0 resize-none" rows={3} value={draftJD.responsibility} onChange={e => setDraftJD({...draftJD, responsibility: e.target.value})}/>
                </Card>

                {/* Experience Must / Want */}
                <div className="grid grid-cols-2 tf-grid-2 gap-4">
                  <Card className="p-6">
                    <SectionHeader title="経験（Must）" color={MORPHY.plumBlack}/>
                    <ul className="space-y-2">
                      {(draftJD.expMust || []).map((e, i) => <li key={i} className="text-sm text-[#211922] flex items-start gap-2"><span className="text-[#91918c] mt-0.5">・</span>{e}</li>)}
                    </ul>
                  </Card>
                  <Card className="p-6">
                    <SectionHeader title="経験（Want）" color={MORPHY.primaryBlue}/>
                    <ul className="space-y-2">
                      {(draftJD.expWant || []).map((e, i) => <li key={i} className="text-sm text-[#211922] flex items-start gap-2"><span className="text-[#91918c] mt-0.5">・</span>{e}</li>)}
                    </ul>
                  </Card>
                </div>

                {/* Skill Must / Want */}
                <div className="grid grid-cols-2 tf-grid-2 gap-4">
                  <Card className="p-6">
                    <SectionHeader title="スキル（Must）" color={MORPHY.plumBlack}/>
                    <ul className="space-y-2">
                      {(draftJD.skillMust || []).map((s, i) => <li key={i} className="text-sm text-[#211922] flex items-start gap-2"><span className="text-[#91918c] mt-0.5">・</span>{s}</li>)}
                    </ul>
                  </Card>
                  <Card className="p-6">
                    <SectionHeader title="スキル（Want）" color={MORPHY.primaryBlue}/>
                    <ul className="space-y-2">
                      {(draftJD.skillWant || []).map((s, i) => <li key={i} className="text-sm text-[#211922] flex items-start gap-2"><span className="text-[#91918c] mt-0.5">・</span>{s}</li>)}
                    </ul>
                  </Card>
                </div>

                {/* Conditions */}
                <Card className="p-6">
                  <SectionHeader title="勤務条件"/>
                  <div className="grid grid-cols-3 tf-grid-3 gap-4 text-sm">
                    <div><span className="text-xs text-[#91918c]">経験年数</span><p className="text-[#211922] font-medium mt-0.5">{draftJD.experience}</p></div>
                    <div><span className="text-xs text-[#91918c]">勤務地</span><p className="text-[#211922] font-medium mt-0.5">{draftJD.location}</p></div>
                    <div><span className="text-xs text-[#91918c]">リモート</span><p className="text-[#211922] font-medium mt-0.5">{draftJD.remote}</p></div>
                  </div>
                </Card>

                {/* Candidate List Section */}
                {showCandidates && (() => {
                  const jd = {...JDS[0], ...draftJD};
                  const ranked = CANDIDATES.filter(c => c.status !== "就業中")
                    .map(c => {
                      const match = calcMatchScore(c, jd);
                      return {...c, match, matchReasons: [
                        match.fit.length > 0 ? `必須スキル一致: ${match.fit.join("・")}` : null,
                        match.prefFit && match.prefFit.length > 0 ? `歓迎スキル一致: ${match.prefFit.join("・")}` : null,
                        c.totalYears >= 5 ? `実務経験${c.totalYears}年` : null,
                        c.remoteOk && jd.remote?.includes("リモート") ? "リモート勤務対応可" : null,
                        match.gap.length > 0 ? `不足スキル: ${match.gap.join("・")}` : null,
                      ].filter(Boolean)};
                    })
                    .sort((a, b) => b.match.current - a.match.current)
                    .slice(0, 6);
                  return (
                    <div className="mt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-medium" style={{color: MORPHY.plumBlack}}>●</span>
                        <h3 className="font-medium text-[#211922]">候補者リスト</h3>
                        <span className="text-xs text-[#91918c] ml-2">{ranked.length}名がマッチ</span>
                      </div>
                      <div className={`grid ${showAiChat ? "grid-cols-2 tf-grid-2" : "grid-cols-3 tf-grid-3"} gap-4`}>
                        {ranked.map(c => (
                          <Card key={c.id} className="p-0 cursor-pointer transition-all hover:translate-y-[-2px]" onClick={(e) => { if (e.target.closest("button")) return; setSelectedJD(jd); navigate("candidate-detail", {candidate: c}); }}>
                            <CandidateCardBody candidate={c} matchScore={c.match.current} compact={showAiChat} isBlind={role === "customer"} favSource={{ source: "jd-create", sourceLabel: `募集登録：${draftJD?.title || jd?.title || "募集"}` }}/>
                            {c.matchReasons.length > 0 && (
                              <div className="px-5 pb-4">
                                <div className="text-xs mb-1.5" style={{color: MORPHY.oliveGray, fontWeight: 500}}>マッチ理由</div>
                                <div className="space-y-1">
                                  {c.matchReasons.slice(0, 3).map((r, i) => (
                                    <div key={i} className="flex items-start gap-1.5 text-xs" style={{color: r.includes("不足") ? MORPHY.warmSilver : MORPHY.plumBlack}}>
                                      <span className="mt-0.5 flex-shrink-0">{r.includes("不足") ? <AlertCircle size={11} style={{color: MORPHY.warmSilver}}/> : <CheckCircle size={11} style={{color: MORPHY.green700}}/>}</span>
                                      <span>{r}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {!showCandidates && draftJD && (
                  <div className="mt-6 text-center">
                    <button onClick={() => setShowCandidates(true)} className="px-6 py-3 rounded-lg text-sm font-medium bg-[#e60023] text-white inline-flex items-center gap-2 transition-colors hover:bg-[#cc001f]"><Users size={15}/>候補者リストを表示</button>
                  </div>
                )}

                {/* Bottom Action Bar */}
                <div className="fixed bottom-0 left-56 right-0 bg-white py-3 px-8 flex items-center justify-center gap-4 z-30" style={{borderTop: `1px solid ${MORPHY.cardBorder}`, boxShadow: "0 -2px 8px rgba(0,0,0,0.06)"}}>
                  <button onClick={() => {
                    if (!draftJD) return;
                    const doSave = (jdName) => {
                      const now = new Date();
                      const ts = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,"0")}/${String(now.getDate()).padStart(2,"0")} ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
                      const toSave = jdName ? {...draftJD, title: jdName} : draftJD;
                      const existingIdx = savedJDs.findIndex(j => j.id === toSave._savedId);
                      if (existingIdx >= 0) {
                        setSavedJDs(prev => prev.map((j, i) => i === existingIdx ? {...toSave, _savedId: j.id, _savedAt: ts, _savedBy: role, _customerName: role === "customer" ? "テックイノベーション株式会社" : j._customerName, _candidateCount: candidateCount} : j));
                      } else {
                        const newId = `JD-S${String(savedJDs.length + 1).padStart(3, "0")}`;
                        const saved = {...toSave, _savedId: newId, _savedAt: ts, _savedBy: role, _customerName: role === "customer" ? "テックイノベーション株式会社" : null, _candidateCount: candidateCount};
                        setSavedJDs(prev => [...prev, saved]);
                        setDraftJD(prev => ({...prev, _savedId: newId}));
                        if (!jdAssessments[newId]) setJdAssessments(prev => ({...prev, [newId]: generateJdAssessment(toSave)}));
                      }
                      unsavedJDRef.current = null;
                      setEditingJD(null);
                      setJdSaveToast("保存しました");
                      setTimeout(() => { setJdSaveToast(null); doNavigate("jd-list"); }, 800);
                    };
                    if (role === "customer") {
                      setJdNameModal({ name: draftJD.title || "", callback: doSave });
                    } else {
                      doSave(null);
                    }
                  }} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center gap-2 transition-colors hover:bg-[#cc001f]"><CheckCircle size={15}/>JDを保存</button>
                  {!showCandidates && (
                    <button onClick={() => setShowCandidates(true)} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center gap-2 transition-colors hover:bg-[#cc001f]"><Users size={15}/>候補者リストを作成</button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right: AI Chat Panel */}
          {showAiChat && <div className="col-span-2 flex flex-col" style={{height: "calc(100vh - 160px)"}}>
            <Card className="flex-1 flex flex-col p-0 overflow-hidden">
              <div className="px-4 py-3 flex items-center gap-2" style={{borderBottom: `1px solid ${MORPHY.cardBorder}`}}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{background: MORPHY.plumBlack}}><Sparkles size={14} className="text-white"/></div>
                <div>
                  <div className="text-sm font-medium text-[#211922]">JDアシスタント</div>
                  <div className="text-xs text-[#91918c]">AIエージェント</div>
                </div>
                {draftJD && <div className="ml-auto flex items-center gap-2"><Users size={14} style={{color: MORPHY.oliveGray}}/><span className="text-sm font-medium" style={{color: MORPHY.plumBlack}}>{candidateCount || 0}</span><span className="text-xs text-[#91918c]">マッチ候補</span></div>}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{background: MORPHY.bg}}>
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "ai" && <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1" style={{background: MORPHY.plumBlack}}><Sparkles size={10} className="text-white"/></div>}
                    <div className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-[#211922] text-white" : "bg-white text-[#211922]"}`} style={msg.role === "ai" ? {boxShadow: MORPHY.shadow.card} : {}}>
                      {msg.text.split("\n").map((line, j) => <p key={j} className={j > 0 ? "mt-1.5" : ""}>{line}</p>)}
                    </div>
                  </div>
                ))}
                {aiTyping && (
                  <div className="flex justify-start">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1" style={{background: MORPHY.plumBlack}}><Sparkles size={10} className="text-white"/></div>
                    <div className="bg-white rounded-lg px-4 py-3 text-sm text-[#91918c] flex items-center gap-2" style={{boxShadow: MORPHY.shadow.card}}>
                      <RefreshCw size={14} className="animate-spin" style={{color: MORPHY.plumBlack}}/>考え中...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef}/>
              </div>

              <div className="px-4 py-2 flex gap-2 flex-wrap" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                {quickActions.map((qa, i) => (
                  <button key={i} onClick={() => { setChatInput(qa.msg); }} className="text-xs bg-[#e5e5e0]/50 hover:bg-[#e5e5e0] text-[#62625b] px-3 py-1.5 rounded-full transition-colors">{qa.label}</button>
                ))}
              </div>

              <div className="px-4 py-3 flex gap-2" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                <textarea
                  className="flex-1 border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] resize-none h-10 max-h-24"
                  style={{minHeight: "40px"}}
                  placeholder="議事メモ貼付、要望入力、条件変更など..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                />
                <button onClick={sendMessage} disabled={!chatInput.trim() || aiTyping} className="bg-[#e60023] text-white rounded-2xl px-4 py-2 text-sm font-medium disabled:opacity-40 flex items-center gap-1.5 flex-shrink-0 transition-all duration-200 hover:bg-[#cc001f]">
                  <Send size={14}/>送信
                </button>
              </div>
            </Card>
          </div>}
        </div>
        {/* JD Name Modal (Customer Mode) */}
        {jdNameModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: "rgba(33,25,34,0.5)"}}>
            <div className="bg-white p-6 max-w-md w-full mx-4" style={{borderRadius: MORPHY.radius.md, boxShadow: MORPHY.shadow.float}}>
              <h3 className="text-base font-semibold text-[#211922] mb-1 flex items-center gap-2"><FileText size={16} style={{color: "#e60023"}}/>JD名を入力</h3>
              <p className="text-sm text-[#91918c] mb-4">保存するJDの名前を入力してください。後から変更することもできます。</p>
              <input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 mb-4" placeholder="例：クラウドエンジニア採用JD" value={jdNameModal.name} onChange={e => setJdNameModal(prev => ({...prev, name: e.target.value}))} onKeyDown={e => { if (e.key === "Enter" && jdNameModal.name.trim()) { const cb = jdNameModal.callback; setJdNameModal(null); cb(jdNameModal.name.trim()); } }} autoFocus/>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setJdNameModal(null)} className="px-4 py-2.5 rounded-lg text-sm text-[#62625b] hover:bg-[#f6f6f3] transition-colors">キャンセル</button>
                <button onClick={() => { if (!jdNameModal.name.trim()) return; const cb = jdNameModal.callback; const name = jdNameModal.name.trim(); setJdNameModal(null); cb(name); }} disabled={!jdNameModal.name.trim()} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center gap-2 transition-colors hover:bg-[#cc001f] disabled:opacity-40"><CheckCircle size={14}/>保存する</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CandidateDetailPanel = ({ candidate: c, jd, onClose }) => {
    const match = calcMatchScore(c, jd);
    const isBlind = role === "customer";
    const radarData = Object.entries(c.assessments).map(([k, v]) => ({ skill: k, score: v, fullMark: 100 }));
    return (
      <div className="h-full flex flex-col">
        {/* Panel Header */}
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{borderBottom: `1px solid ${MORPHY.cardBorder}`}}>
          <div className="flex items-center gap-3 min-w-0">
            <CandidateAvatar candidate={c} size="md"/>
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-[#211922] truncate">{isBlind ? `候補者 ${c.id}` : c.name}</h3>
              <div className="text-xs text-[#91918c]">{isBlind ? `経験${c.totalYears}年` : `${c.id} ・ 経験${c.totalYears}年`}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <DetailFavButton candidateId={c.id} isBlind={isBlind}/>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#f6f6f3] transition-colors" style={{color: MORPHY.warmSilver}}><X size={18}/></button>
          </div>
        </div>
        {/* Panel Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Match Score */}
          <div className="p-4 rounded-lg" style={{background: MORPHY.fog, border: `1px solid ${MORPHY.cardBorder}`}}>
            <div className="text-xs text-[#91918c] mb-1">JDマッチ度</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-medium" style={{color: MORPHY.plumBlack}}>{match.current}</span>
              <span className="text-lg" style={{color: MORPHY.plumBlack}}>%</span>
              {role !== "sales" && role !== "customer" && <span className="ml-3 text-xs text-[#91918c]">育成後: <span className="font-medium text-[#62625b]">{match.trained}%</span></span>}
            </div>
            <p className="text-xs text-[#62625b] mt-2">{match.reason || "基本的なスキルセットを保有しています。"}</p>
          </div>
          {/* Fit & Gap */}
          <div>
            <h4 className="text-xs font-medium text-[#91918c] mb-2">Fit & Gap</h4>
            <div className="grid grid-cols-2 tf-grid-2 gap-3">
              <div className="space-y-1.5">
                {match.fit.map(f => <div key={f} className="flex items-center gap-1.5 text-xs"><CheckCircle size={11} style={{color: MORPHY.green700}}/><span className="text-[#211922]">{f}</span></div>)}
                {match.prefFit?.map(f => <div key={f} className="flex items-center gap-1.5 text-xs"><CheckCircle size={11} style={{color: MORPHY.oliveGray}}/><span className="text-[#62625b]">{f}（歓迎）</span></div>)}
              </div>
              <div className="space-y-1.5">
                {match.gap.length > 0 ? match.gap.map(g => <div key={g} className="flex items-center gap-1.5 text-xs"><AlertCircle size={11} style={{color: MORPHY.warmSilver}}/><span className="text-[#91918c]">{g}</span></div>) : <div className="text-xs text-[#91918c]">重大なGapなし</div>}
              </div>
            </div>
          </div>
          {/* Skills */}
          <div>
            <h4 className="text-xs font-medium text-[#91918c] mb-2">スキル</h4>
            <div className="space-y-2">
              {c.skills.map(s => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="text-xs w-24 text-[#211922]">{s.name}</span>
                  <div className="flex gap-0.5 flex-1">{[1,2,3,4,5].map(l => <div key={l} className="w-4 h-1.5 rounded" style={{background: l <= s.level ? MORPHY.plumBlack : MORPHY.sand}}></div>)}</div>
                  <span className="text-xs text-[#91918c]">{s.years}y</span>
                </div>
              ))}
            </div>
          </div>
          {/* Assessment Radar */}
          <div>
            <h4 className="text-xs font-medium text-[#91918c] mb-2">アセスメント</h4>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={radarData}>
                <PolarGrid/><PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }}/><PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }}/>
                <Radar dataKey="score" stroke={MORPHY.plumBlack} fill={MORPHY.plumBlack} fillOpacity={0.3}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
          {/* JD Assessment Results (merged from jdAssessments + assessmentRequests) */}
          {(() => {
            const jdaEntries = Object.entries(jdAssessments).filter(([, a]) => a.results?.[c.id]).map(([jdId, a]) => ({ jdId, title: a.title, passScore: a.passScore, ...a.results[c.id], source: "jda" }));
            const arEntries = assessmentRequests.filter(ar => ar.candidateId === c.id && ar.status === "完了" && !jdaEntries.some(j => j.jdId === ar.jdId)).map(ar => ({ jdId: ar.jdId, title: ar.title, score: ar.score, passed: ar.score >= 70, date: ar.date.split(" ")[0], source: "ar" }));
            const candAssessments = [...jdaEntries, ...arEntries];
            // Also show pending assessment requests
            const pendingArs = assessmentRequests.filter(ar => ar.candidateId === c.id && ar.status === "未受験");
            if (candAssessments.length === 0 && pendingArs.length === 0) return null;
            return (
              <div>
                <h4 className="text-xs font-medium text-[#91918c] mb-2 flex items-center gap-1"><Award size={11}/>募集アセスメント</h4>
                <div className="space-y-2">
                  {candAssessments.map(a => (
                    <div key={a.jdId + a.source} className="p-3 rounded-lg" style={{backgroundColor: a.passed ? "#f0fdf4" : "#fef2f2", border: `1px solid ${a.passed ? "#bbf7d0" : "#fecaca"}`}}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-[#211922] truncate flex-1 mr-2" title={a.title}>{a.title}</span>
                        <span className="text-sm font-bold flex-shrink-0" style={{color: a.passed ? "#15803d" : "#dc2626"}}>{a.score}点</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#91918c]">{a.date}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${a.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{a.passed ? "合格" : "不合格"}</span>
                      </div>
                    </div>
                  ))}
                  {pendingArs.map(ar => (
                    <div key={ar.id} className="p-3 rounded-lg" style={{backgroundColor: "#fffbeb", border: "1px solid #fde68a"}}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-[#211922] truncate flex-1 mr-2">{ar.title}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">未受験</span>
                      </div>
                      <span className="text-xs text-[#91918c]">依頼日: {ar.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
          {/* Profile Info */}
          <div>
            <h4 className="text-xs font-medium text-[#91918c] mb-2">プロフィール</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#62625b]"><MapPin size={12}/>{isBlind ? "首都圏" : c.location}</div>
              <div className="flex items-center gap-2 text-[#62625b]"><Monitor size={12}/>{c.workCondition}</div>
              <div className="flex items-center gap-2 text-[#62625b]"><RefreshCw size={12}/>派遣先変更: {c.changeIntent}</div>
            </div>
          </div>
          {/* Career History */}
          <div>
            <h4 className="text-xs font-medium text-[#91918c] mb-2">職歴サマリ</h4>
            <div className="space-y-3">
              {c.careerHistory.map((h, i) => (
                <div key={i} className="border-l-2 pl-3 ml-1" style={{borderColor: MORPHY.primaryBlue}}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-[#91918c]">{h.period}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full" style={{background: `${MORPHY.primaryBlue}15`, color: MORPHY.primaryBlue}}>{h.role}</span>
                  </div>
                  <h4 className="text-xs font-medium text-[#211922]">{isBlind ? `プロジェクト${i + 1}` : h.project}</h4>
                  <p className="text-xs text-[#91918c] mt-0.5">{h.detail}</p>
                  <div className="flex flex-wrap gap-1 mt-1">{h.tech.map(t => <span key={t} className="bg-[#e5e5e0]/50 text-[#62625b] px-1.5 py-0.5 rounded-full text-xs">{t}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Certifications */}
          {c.certifications.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-[#91918c] mb-2">資格・認定</h4>
              <div className="space-y-1.5">{c.certifications.map((cert, i) => <div key={i} className="text-xs text-[#62625b] flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full" style={{background: MORPHY.accent3}}/>{cert}</div>)}</div>
            </div>
          )}
          {/* Customer Inquiry */}
          {isBlind && <CustomerInquiryCard candidateId={c.id} matchScore={match.current}/>}
        </div>
      </div>
    );
  };

  const CandidateListScreen = () => {
    const jd = selectedJD || JDS[0];
    const [showFavOnly, setShowFavOnly] = useState(false);
    const [panelCandidate, setPanelCandidate] = useState(null);
    const rankedCandidates = useMemo(() =>
      CANDIDATES.filter(c => c.status !== "就業中").map(c => ({ ...c, match: calcMatchScore(c, jd) })).sort((a, b) => b.match.current - a.match.current).slice(0, 8)
    , [jd]);
    const displayCandidates = showFavOnly ? rankedCandidates.filter(c => favoriteCandidatesRef.current.has(c.id)) : rankedCandidates;
    const favCount = rankedCandidates.filter(c => favoriteCandidatesRef.current.has(c.id)).length;

    return (
      <div className="flex gap-0 tf-two-col" style={{minHeight: "calc(100vh - 100px)"}}>
        {/* Left: Card List */}
        <div className={`${panelCandidate ? "w-1/2 pr-3" : "w-full"} transition-all duration-300`}>
          <PageHeader title="候補者一覧" subtitle={`${jd.title} に対するマッチング結果`} onBack={goBack} actions={
            <div className="flex items-center gap-2">
              {role === "customer" && favCount > 0 && (
                <button onClick={() => setShowFavOnly(prev => !prev)}
                  className="px-4 py-2 rounded-lg text-sm font-medium border flex items-center gap-2 transition-colors"
                  style={{borderColor: showFavOnly ? "#f5a623" : MORPHY.cardBorder, color: showFavOnly ? "#f5a623" : MORPHY.plumBlack, background: showFavOnly ? "#f5a62310" : "transparent"}}>
                  <Star size={14} style={{fill: showFavOnly ? "#f5a623" : "none", color: showFavOnly ? "#f5a623" : MORPHY.plumBlack}}/>お気に入り（{favCount}）
                </button>
              )}
            </div>
          }/>
          {displayCandidates.length === 0 ? (
            <Card className="p-8 text-center">
              <Star size={28} style={{color: MORPHY.warmSilver, margin: "0 auto 12px"}}/>
              <p className="text-sm text-[#91918c]">お気に入りに登録された候補者はいません</p>
              <button onClick={() => setShowFavOnly(false)} className="mt-3 text-sm text-[#e60023] hover:underline">すべての候補者を表示</button>
            </Card>
          ) : (
            <div className={`grid ${panelCandidate ? "grid-cols-2 tf-grid-2" : "grid-cols-3 tf-grid-3"} gap-3 pb-20`}>
              {displayCandidates.map(c => (
                <Card key={c.id} className={`p-0 cursor-pointer transition-all hover:translate-y-[-2px] ${panelCandidate?.id === c.id ? "ring-2 ring-[#e60023]" : ""}`}
                  onClick={(e) => { if (e.target.closest("button")) return; setPanelCandidate(c); }}>
                  <CandidateCardBody candidate={c} matchScore={c.match.current} isBlind={role === "customer"} compact={!!panelCandidate} favSource={{ source: "candidate-list", sourceLabel: `候補者一覧：${jd.title}` }}/>
                </Card>
              ))}
            </div>
          )}
        </div>
        {/* Right: Detail Panel */}
        {panelCandidate && (
          <div className="w-1/2 pl-3 sticky top-0 tf-panel-sticky" style={{height: "calc(100vh - 100px)"}}>
            <div className="h-full bg-white overflow-hidden" style={{border: `1px solid ${MORPHY.cardBorder}`, borderRadius: MORPHY.radius.md, boxShadow: MORPHY.shadow.float}}>
              <CandidateDetailPanel candidate={panelCandidate} jd={jd} onClose={() => setPanelCandidate(null)}/>
            </div>
          </div>
        )}
      </div>
    );
  };

  const FavoritesListScreen = () => {
    const jd = selectedJD || JDS[0];
    const [panelCandidate, setPanelCandidate] = useState(null);
    const [checkedIds, setCheckedIds] = useState(new Set());
    const [bulkInquiry, setBulkInquiry] = useState(null); // null | "form" | "sent"
    const [inquiryType, setInquiryType] = useState("詳細確認");
    const [inquiryMessage, setInquiryMessage] = useState("");
    const [, forceUpdate] = useState(0);
    const favCandidates = useMemo(() =>
      CANDIDATES.filter(c => favoriteCandidatesRef.current.has(c.id)).map(c => ({ ...c, match: calcMatchScore(c, jd) })).sort((a, b) => b.match.current - a.match.current)
    , [jd, forceUpdate]);

    const toggleCheck = (id) => {
      setCheckedIds(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
    };
    const toggleAll = () => {
      if (checkedIds.size === favCandidates.length) setCheckedIds(new Set());
      else setCheckedIds(new Set(favCandidates.map(c => c.id)));
    };
    const checkedCount = checkedIds.size;

    return (
      <div className="flex gap-0" style={{minHeight: "calc(100vh - 100px)"}}>
        <div className={`${panelCandidate ? "w-1/2 pr-3" : "w-full"} transition-all duration-300`}>
          <PageHeader title="お気に入り一覧" subtitle={`${favCandidates.length}名の候補者をお気に入り登録中`} actions={
            favCandidates.length > 0 && (
              <div className="flex items-center gap-3">
                <button onClick={toggleAll} className="px-4 py-2 rounded-lg text-sm font-medium border flex items-center gap-2 transition-colors" style={{borderColor: MORPHY.cardBorder, color: MORPHY.plumBlack}}>
                  <div className="w-4 h-4 rounded border flex items-center justify-center" style={{borderColor: checkedIds.size === favCandidates.length ? "#e60023" : MORPHY.cardBorder, background: checkedIds.size === favCandidates.length ? "#e60023" : "transparent"}}>
                    {checkedIds.size === favCandidates.length && <CheckCircle size={10} style={{color: "#fff"}}/>}
                  </div>
                  {checkedIds.size === favCandidates.length ? "すべて解除" : "すべて選択"}
                </button>
                <button onClick={() => { if (checkedCount > 0) setBulkInquiry("form"); }}
                  className={`px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${checkedCount > 0 ? "bg-[#e60023] text-white hover:bg-[#cc001f]" : "bg-[#e5e5e0] text-[#91918c] cursor-not-allowed"}`}
                  disabled={checkedCount === 0}>
                  <Send size={14}/>まとめて面談リクエスト{checkedCount > 0 && `（${checkedCount}名）`}
                </button>
              </div>
            )
          }/>
          {favCandidates.length === 0 ? (
            <Card className="p-12 text-center">
              <Star size={36} style={{color: MORPHY.warmSilver, margin: "0 auto 16px"}}/>
              <p className="text-base font-medium text-[#211922] mb-2">お気に入りに登録された候補者はいません</p>
              <p className="text-sm text-[#91918c] mb-4">募集登録画面で候補者をお気に入り登録すると、ここに一覧表示されます。</p>
              <button onClick={() => navigate("jd-create")} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white transition-colors hover:bg-[#cc001f]">募集登録へ</button>
            </Card>
          ) : (
            <div className={`grid ${panelCandidate ? "grid-cols-2 tf-grid-2" : "grid-cols-3 tf-grid-3"} gap-3 pb-20`}>
              {favCandidates.map(c => {
                const isChecked = checkedIds.has(c.id);
                return (
                  <Card key={c.id} className={`p-0 cursor-pointer transition-all hover:translate-y-[-2px] ${panelCandidate?.id === c.id ? "ring-2 ring-[#e60023]" : ""} ${isChecked ? "ring-2 ring-[#e60023]/40" : ""}`}
                    onClick={(e) => { if (e.target.closest("button") || e.target.closest("[data-check]")) return; setPanelCandidate(c); }}>
                    <div className="flex items-center gap-0">
                      <div data-check="true" className="pl-4 pt-4 pb-0 cursor-pointer" onClick={(e) => { e.stopPropagation(); toggleCheck(c.id); }}>
                        <div className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all" style={{borderColor: isChecked ? "#e60023" : MORPHY.cardBorder, background: isChecked ? "#e60023" : "transparent"}}>
                          {isChecked && <CheckCircle size={12} style={{color: "#fff"}}/>}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <CandidateCardBody candidate={c} matchScore={c.match.current} isBlind={true} compact={!!panelCandidate} favSource={{ source: "favorites", sourceLabel: "お気に入り一覧" }}/>
                        <div className="px-5 pb-3 -mt-1 flex items-center gap-2 flex-wrap">
                          {interviewRequestedCandidates.has(c.id) && (
                            <div className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg font-medium" style={{background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe"}}>
                              <CheckCircle size={11}/>面談リクエスト済み
                            </div>
                          )}
                          {(() => { const info = favoriteCandidatesRef.current.get(c.id); return info ? (
                            <div className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg" style={{background: MORPHY.warmLight, color: MORPHY.oliveGray}}>
                              {info.source === "jd-create" && <Edit3 size={11}/>}
                              {info.source === "candidate-list" && <Users size={11}/>}
                              {info.source === "search" && <Search size={11}/>}
                              {info.source === "detail" && <Eye size={11}/>}
                              {!["jd-create","candidate-list","search","detail","jd-detail"].includes(info.source) && <Star size={11}/>}
                              {info.source === "jd-detail" && <FileText size={11}/>}
                              <span className="truncate">{info.sourceLabel}</span>
                            </div>
                          ) : null; })()}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
        {panelCandidate && (
          <div className="w-1/2 pl-3 sticky top-0 tf-panel-sticky" style={{height: "calc(100vh - 100px)"}}>
            <div className="h-full bg-white overflow-hidden" style={{border: `1px solid ${MORPHY.cardBorder}`, borderRadius: MORPHY.radius.md, boxShadow: MORPHY.shadow.float}}>
              <CandidateDetailPanel candidate={panelCandidate} jd={jd} onClose={() => setPanelCandidate(null)}/>
            </div>
          </div>
        )}
        {/* Bulk Inquiry Modal */}
        {bulkInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: "rgba(33,25,34,0.5)"}}>
            <div className="bg-white p-6 max-w-lg w-full mx-4" style={{borderRadius: MORPHY.radius.md, boxShadow: MORPHY.shadow.float}}>
              {bulkInquiry === "sent" ? (
                <div className="text-center py-4">
                  <CheckCircle size={40} className="mx-auto text-green-500 mb-3"/>
                  <h3 className="text-base font-semibold text-green-800 mb-1">面談リクエストを送信しました</h3>
                  <p className="text-sm text-green-600 mb-2">{checkedCount}名の候補者について面談リクエストを送信しました。対応状況は随時更新されます。</p>
                  <p className="text-xs text-[#91918c] mb-4">受付番号: SCT-{Date.now().toString().slice(-6)}</p>
                  <button onClick={() => { setBulkInquiry(null); setCheckedIds(new Set()); setInquiryType("詳細確認"); setInquiryMessage(""); }} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white transition-colors hover:bg-[#cc001f]">閉じる</button>
                </div>
              ) : (
                <>
                  <h3 className="text-base font-semibold text-[#211922] mb-1 flex items-center gap-2"><Send size={16} style={{color: "#e60023"}}/>まとめて面談リクエスト</h3>
                  <p className="text-sm text-[#91918c] mb-4">{checkedCount}名の候補者を選択中</p>
                  <div className="flex flex-wrap gap-1.5 mb-4 max-h-20 overflow-y-auto">
                    {favCandidates.filter(c => checkedIds.has(c.id)).map(c => (
                      <span key={c.id} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{background: `${MORPHY.primaryBlue}10`, color: MORPHY.primaryBlue}}>
                        <User size={10}/>{c.id}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-3 mb-5">
                    <div>
                      <label className="text-xs text-[#91918c] mb-1 block">依頼種別</label>
                      <select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={inquiryType} onChange={e => setInquiryType(e.target.value)}>
                        <option>面談希望</option>
                        <option>詳細確認</option>
                        <option>提案依頼</option>
                        <option>条件交渉</option>
                        <option>その他</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-[#91918c] mb-1 block">メッセージ（任意）</label>
                      <textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 h-24 resize-none" placeholder="例：選択した候補者に興味があります。まとめて面談を設定したい" value={inquiryMessage} onChange={e => setInquiryMessage(e.target.value)}/>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => { setBulkInquiry(null); setInquiryType("詳細確認"); setInquiryMessage(""); }} className="px-4 py-2.5 rounded-lg text-sm text-[#62625b] hover:bg-[#f6f6f3] transition-colors">キャンセル</button>
                    <button onClick={() => { checkedIds.forEach(id => addInterviewRequest(null, id, "顧客")); setBulkInquiry("sent"); }} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center gap-2 transition-colors hover:bg-[#cc001f]"><Send size={14}/>面談リクエスト送信（{checkedCount}名）</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const DetailFavButton = ({ candidateId, isBlind, favSource = null }) => {
    const [isFav, setIsFav] = useState(favoriteCandidatesRef.current.has(candidateId));
    if (!isBlind) return <button className="px-4 py-2 rounded-lg text-sm font-medium border flex items-center gap-2" style={{borderColor: MORPHY.cardBorder, color: MORPHY.plumBlack}}><Sparkles size={14}/>AI編集</button>;
    return (
      <div className="flex items-center gap-2">
        <button onClick={() => { const next = new Map(favoriteCandidatesRef.current); if (next.has(candidateId)) next.delete(candidateId); else next.set(candidateId, favSource || { source: "detail", sourceLabel: "候補者詳細" }); favoriteCandidatesRef.current = next; setIsFav(!isFav); }}
          className="px-4 py-2 rounded-lg text-sm font-medium border flex items-center gap-2 transition-colors"
          style={{borderColor: isFav ? "#f5a623" : MORPHY.cardBorder, color: isFav ? "#f5a623" : MORPHY.plumBlack, background: isFav ? "#f5a62310" : "transparent"}}>
          <Star size={14} style={{fill: isFav ? "#f5a623" : "none"}}/>{isFav ? "お気に入り済み" : "お気に入り"}
        </button>
      </div>
    );
  };

  const CandidateDetailScreen = () => {
    const c = selectedCandidate;
    if (!c) return <div className="text-center py-20"><p className="text-[#91918c] mb-4">候補者が選択されていません</p><button onClick={goBack} className="px-4 py-2 rounded-lg text-sm bg-[#e60023] text-white hover:bg-[#cc001f]">戻る</button></div>;
    const jd = selectedJD || JDS[0];
    const match = calcMatchScore(c, jd);
    const isBlind = role === "customer";
    const radarData = Object.entries(c.assessments).map(([k, v]) => ({ skill: k, score: v, fullMark: 100 }));

    const careerTraitDetails = [
      { label: "マネジメント志向", color: MORPHY.primaryBlue, desc: "チームの成長を自身の成果と捉え、メンバーの強みを活かした組織づくりに意欲的。管理職やTLとしての経験を活かし、プロジェクト全体を俯瞰しながら推進するスタイル。" },
      { label: "専門深耕志向", color: MORPHY.accent2, desc: "特定の業務領域に深く精通することに喜びを感じ、専門性を武器にチームに貢献する。新しい知識の習得に積極的で、業務改善や効率化の提案において頼られる存在。" },
      { label: "課題解決志向", color: MORPHY.accent3, desc: "複雑な課題に対して構造的にアプローチし、根本原因を特定して解決策を導く力がある。困難な状況でも冷静に対処し、チームの問題解決をリードする。" }
    ];
    const behaviorSubTraits = [
      { label: "共感性", icon: "♡", desc: "他者の感情や状況を敏感に察知し、相手の立場に立って考える力。チームメンバーの悩みや要望を汲み取り、適切なサポートを提供する。" },
      { label: "個別化", icon: "◆", desc: "一人ひとりの個性や強みを見極め、それぞれに合ったアプローチで接する力。画一的ではなく、メンバーの特性に応じた育成や役割分担を行う。" },
      { label: "調和性", icon: "○", desc: "チーム内の意見の対立を調整し、合意形成を図る力。異なる視点を統合し、全員が納得できる方向性を見出すことで、チームの一体感を醸成する。" },
      { label: "成長促進", icon: "▲", desc: "メンバーの成長ポテンシャルを見抜き、適切な機会やフィードバックを提供する力。長期的な視点でチーム全体のスキルアップを促進する。" }
    ];

    // --- Sales proposal email from candidate detail ---
    const [candidateProposalOpen, setCandidateProposalOpen] = useState(false);
    const [cpSelectedDeal, setCpSelectedDeal] = useState("");
    const [cpStep, setCpStep] = useState("select"); // "select" | "edit" | "preview" | "sending" | "sent"
    const [cpEmailDraft, setCpEmailDraft] = useState(null);

    const uniqueCustomers = [...new Set(DEALS.map(dl => dl.customer))];

    const cpGenerateEmail = (deal) => {
      const topSkills = c.skills.slice(0, 4).map(s => s.name).join("、");
      const matchPct = deal ? calcMatchScore(c, JDS.find(j => j.dealId === deal.id) || JDS[0]).current : (match?.current || 80);
      const customerName = deal ? deal.customer : "（顧客名）";
      const dealName = deal ? deal.name : "（案件名）";
      const salesName = deal ? deal.sales : "営業担当";

      return {
        to: `${customerName} ご担当者様`,
        subject: `【人材ご提案】${dealName} - 候補者のご紹介`,
        body: `${customerName}\nご担当者様\n\nいつもお世話になっております。\nTalentFlow営業部の${salesName}です。\n\n${deal ? `お打ち合わせさせていただきました「${dealName}」の件につきまして、` : "下記の通り"}候補者をご提案させていただきます。\n\n${"─".repeat(40)}\n\n【候補者情報】候補者ID: ${c.id}\n  経験年数: ${c.totalYears}年\n  主要スキル: ${topSkills}\n  マッチ度: ${matchPct}%\n  勤務条件: ${c.location} / ${c.workCondition}\n  資格: ${c.certifications.slice(0, 3).join("、") || "なし"}\n\n【推薦コメント】\n${c.skills.slice(0, 3).map(s => s.name).join("・")}に強みを持ち、${c.totalYears}年の実務経験があります。\n${c.careerHistory[0]?.detail?.slice(0, 80) || ""}${deal ? `\n特に${deal.detail.requiredSkills.slice(0, 2).join("・")}の領域で即戦力が期待できます。` : ""}\n\n${"─".repeat(40)}\n\n職務経歴書（ブラインドレジュメ）を添付しておりますので、\nご確認のうえ、面談をご希望でしたらお知らせください。\n${deal ? `\n【商談情報】\n  商談名: ${deal.name}\n  想定職種: ${deal.type}\n  参画希望時期: ${deal.startDate}\n  勤務地: ${deal.detail.location}\n  リモート: ${deal.detail.remote}\n` : ""}\nご不明な点やご要望がございましたら、お気軽にご連絡ください。\nどうぞよろしくお願いいたします。\n\n${"─".repeat(40)}\nTalentFlow株式会社\n営業部 ${salesName}\nTEL: 03-XXXX-XXXX\nEmail: ${salesName.replace(/\s/g, "").toLowerCase()}@talentflow.co.jp`,
        attachments: [{ id: c.id, name: `職務経歴書_${c.id}_ブラインド.pdf`, candidate: c, type: "blind" }]
      };
    };

    const cpProceedToEdit = () => {
      const deal = cpSelectedDeal ? DEALS.find(dl => dl.id === cpSelectedDeal) : null;
      setCpEmailDraft(cpGenerateEmail(deal));
      setCpStep("edit");
    };

    const cpSend = () => {
      setCpStep("sending");
      setTimeout(() => setCpStep("sent"), 1800);
    };

    const cpClose = () => {
      setCandidateProposalOpen(false);
      setCpStep("select");
      setCpSelectedDeal("");
      setCpEmailDraft(null);
    };

    // Resume preview for candidate proposal
    const CpResumePreview = () => {
      const targetJD = cpSelectedDeal ? JDS.find(j => j.dealId === cpSelectedDeal) : jd;
      return (
        <div className="border rounded-lg p-5 bg-[#f6f6f3] space-y-4 text-sm">
          <div className="text-center border-b pb-3">
            <h3 className="text-base font-medium text-[#211922]">職 務 経 歴 書</h3>
            <p className="text-[#91918c] text-xs mt-1">候補者ID: {c.id}</p>
          </div>
          <div>
            <h4 className="font-medium text-[#211922] border-b pb-1 mb-1.5 text-xs">職務要約</h4>
            <p className="text-xs text-[#211922] leading-relaxed">本候補者は、{c.totalYears}年の実務経験を持つスタッフです。{c.careerHistory[0]?.detail?.slice(0, 60)}...</p>
          </div>
          <div>
            <h4 className="font-medium text-[#211922] border-b pb-1 mb-1.5 text-xs">保有スキル</h4>
            <div className="flex flex-wrap gap-1">
              {c.skills.sort((a, b) => b.level - a.level).map(s => {
                const isMatch = targetJD?.requiredSkills?.some(rs => rs.toLowerCase().includes(s.name.toLowerCase()));
                return <span key={s.name} className={`text-xs px-2 py-0.5 rounded-full ${isMatch ? "bg-[#e5e5e0] font-medium text-[#211922]" : "bg-white border border-[#e5e5e0] text-[#62625b]"}`}>{s.name} Lv{s.level}{isMatch ? " ★" : ""}</span>;
              })}
            </div>
          </div>
          {c.certifications.length > 0 && (
            <div>
              <h4 className="font-medium text-[#211922] border-b pb-1 mb-1.5 text-xs">資格</h4>
              <p className="text-xs text-[#62625b]">{c.certifications.join(" / ")}</p>
            </div>
          )}
          <div>
            <h4 className="font-medium text-[#211922] border-b pb-1 mb-1.5 text-xs">職務経歴（直近）</h4>
            {c.careerHistory.slice(0, 2).map((h, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-xs mb-0.5"><span className="font-medium">プロジェクト{i + 1}</span><span className="text-[#91918c]">{h.period}</span></div>
                <p className="text-xs text-[#91918c]">【{h.role}】{h.phase}</p>
                <div className="flex gap-1 mt-0.5 flex-wrap">{h.tech.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 bg-white border border-[#e5e5e0] rounded">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="pb-20">
        {/* Header */}
        <PageHeader title={isBlind ? `候補者 ${c.id}` : `${c.name}（${c.id}）`} subtitle={isBlind ? "ブラインドレジュメ" : "候補者詳細情報"} onBack={goBack} actions={
          <DetailFavButton candidateId={c.id} isBlind={isBlind}/>
        }/>

        {/* Profile Header Card */}
        <Card className="p-6 mb-4">
          <div className="flex items-start gap-5 tf-profile-header">
            <CandidateAvatar candidate={c} size="lg"/>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h2 className="text-xl font-medium text-[#211922]">{isBlind ? `候補者 ${c.id}` : c.name}</h2>
                {!isBlind && <EmploymentBadge type={c.employmentType}/>}
                {!isBlind && <StatusBadge status={c.status}/>}
              </div>
              <div className="text-sm text-[#91918c] mb-1">{c.id}</div>
              {!isBlind && <div className="text-sm text-[#91918c]">管理本部 → 経理部 → 派遣スタッフグループ ・ 経験{c.totalYears}年 ・ {c.location}</div>}
              {isBlind && <div className="text-sm text-[#91918c]">経験{c.totalYears}年</div>}
              <div className="flex items-center gap-3 mt-2 text-xs text-[#91918c]">
                <span className="flex items-center gap-1"><MapPin size={12}/>{isBlind ? "首都圏" : c.location}</span>
                <span className="flex items-center gap-1"><Monitor size={12}/>{c.workCondition}</span>
                {!isBlind && <span className="flex items-center gap-1"><RefreshCw size={12}/>派遣先変更: {c.changeIntent}</span>}
              </div>
              {(() => {
                const myCategories = jobCategories.filter(jc => jc.certifiedCandidates.includes(c.id));
                const mySkills = skillMaster.filter(sk => sk.certifiedCandidates.includes(c.id));
                return (myCategories.length > 0 || mySkills.length > 0) && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {myCategories.map(jc => (
                      <span key={jc.id} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium" style={{backgroundColor: MORPHY.plumBlack, color: "#fff"}}>
                        <Layers size={10}/>{jc.name}
                      </span>
                    ))}
                    {mySkills.map(sk => (
                      <span key={sk.id} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium border" style={{backgroundColor: MORPHY.warmWash, color: MORPHY.plumBlack, borderColor: MORPHY.cardBorder}}>
                        <Zap size={10}/>{sk.name}
                      </span>
                    ))}
                  </div>
                );
              })()}
            </div>
            {/* Action buttons in header */}
            {!isBlind && (role === "admin" || role === "sales") && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <select className="text-sm border border-[#e5e5e0] rounded-lg px-3 py-2" value={candidateStatuses[c.id] || c.status} onChange={e => setCandidateStatuses({...candidateStatuses, [c.id]: e.target.value})}>
                  {(role === "admin" ? ["未確認","候補","育成対象","提案可能","提案済み","就業中","見送り"] : ["未確認","候補","提案可能","提案済み","就業中","見送り"]).map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-3 tf-grid-3 gap-5">
          {/* Main Content - Left 2 cols */}
          <div className="col-span-2 space-y-5">

            {/* Match Score Section */}
            <Card className="p-6" style={{borderLeft: `3px solid ${MORPHY.primaryBlue}`}}>
              <div className="flex items-center gap-2 text-sm text-[#91918c] mb-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{background: MORPHY.plumBlack}}/>募集要項とのマッチ度
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-medium" style={{color: MORPHY.plumBlack}}>{match.current}</span>
                <span className="text-xl font-medium" style={{color: MORPHY.plumBlack}}>%</span>
                {role !== "sales" && role !== "customer" && <span className="ml-4 text-sm text-[#91918c]">育成後予測: <span className="font-medium text-[#62625b]">{match.trained}%</span></span>}
              </div>
              <div className="mt-3 p-3 bg-[#f6f6f3] rounded-lg">
                <p className="text-sm text-[#211922] flex items-center gap-2"><AIBadge/></p>
                <p className="text-sm text-[#211922] mt-1">{match.reason || "基本的なスキルセットを保有しています。"}</p>
              </div>
            </Card>

            {/* Fit & Gap Section */}
            <Card className="p-6" style={{borderLeft: `3px solid ${MORPHY.primaryBlue}`}}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-medium" style={{color: MORPHY.plumBlack}}>●</span>
                <h3 className="font-medium text-[#211922]">Fit & Gap 分析</h3>
              </div>
              <div className="grid grid-cols-2 tf-grid-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-[#211922] mb-3 flex items-center gap-1.5"><CheckCircle size={14} style={{color: MORPHY.accent2}}/>Fit（合致）</h4>
                  <div className="space-y-2">
                    {match.fit.length > 0 ? match.fit.map(f => <div key={f} className="flex items-center gap-2 text-sm"><div className="w-2 h-2 rounded-full" style={{background: MORPHY.green700}}/>{f}</div>) : <p className="text-sm text-[#91918c]">該当なし</p>}
                    {match.prefFit?.map(f => <div key={f} className="flex items-center gap-2 text-sm" style={{color: MORPHY.accent2}}><div className="w-2 h-2 rounded-full" style={{background: MORPHY.accent2, opacity: 0.5}}/>{f}（歓迎）</div>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#211922] mb-3 flex items-center gap-1.5"><AlertCircle size={14} style={{color: MORPHY.plumBlack}}/>Gap（不足）</h4>
                  <div className="space-y-2">
                    {match.gap.length > 0 ? match.gap.map(g => <div key={g} className="flex items-center gap-2 text-sm"><div className="w-2 h-2 rounded-full" style={{background: MORPHY.plumBlack}}/>{g}</div>) : <p className="text-sm text-[#91918c]">重大なGapなし</p>}
                  </div>
                </div>
              </div>
            </Card>

            {/* Skills Assessment Section */}
            <Card className="p-6" style={{borderLeft: `3px solid ${MORPHY.primaryBlue}`}}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-medium" style={{color: MORPHY.plumBlack}}>●</span>
                <h3 className="font-medium text-[#211922]">スキルアセスメント</h3>
              </div>
              <div className="grid grid-cols-2 tf-grid-2 gap-6">
                <div>
                  <h4 className="text-xs font-medium text-[#91918c] mb-3">保有スキル</h4>
                  <div className="space-y-2.5">
                    {c.skills.map(s => (
                      <div key={s.name} className="flex items-center gap-2">
                        <span className="text-sm w-28 text-[#211922]">{s.name}</span>
                        <div className="flex gap-0.5">{[1,2,3,4,5].map(l => <div key={l} className="w-5 h-2 rounded" style={{background: l <= s.level ? MORPHY.plumBlack : MORPHY.sand}}></div>)}</div>
                        <span className="text-xs text-[#91918c]">{s.years}年</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-[#91918c] mb-3">アセスメント結果</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={radarData}>
                      <PolarGrid/><PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }}/><PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }}/>
                      <Radar dataKey="score" stroke={MORPHY.plumBlack} fill={MORPHY.plumBlack} fillOpacity={0.3}/>
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* JD Assessment Results (visible to all, especially customer mode) */}
            {(() => {
              const candidateAssessments = Object.entries(jdAssessments)
                .filter(([, assmt]) => assmt.results?.[c.id])
                .map(([jdId, assmt]) => ({ jdId, ...assmt, result: assmt.results[c.id] }));
              if (candidateAssessments.length === 0) return null;
              return (
                <Card className="p-6" style={{borderLeft: "3px solid #15803d"}}>
                  <div className="flex items-center gap-2 mb-4">
                    <Award size={18} style={{color: "#15803d"}}/>
                    <h3 className="font-medium text-[#211922]">募集アセスメント結果</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0"}}>{candidateAssessments.length}件</span>
                  </div>
                  <div className="space-y-4">
                    {candidateAssessments.map(assmt => (
                      <div key={assmt.jdId} className="rounded-xl p-4" style={{backgroundColor: assmt.result.passed ? "#f0fdf4" : "#fef2f2", border: `1px solid ${assmt.result.passed ? "#bbf7d0" : "#fecaca"}`}}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-sm font-medium text-[#211922]">{assmt.title}</h4>
                            <p className="text-xs text-[#91918c]">受験日: {assmt.result.date} ・ {assmt.questions}問 / {assmt.duration}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold" style={{color: assmt.result.passed ? "#15803d" : "#dc2626"}}>{assmt.result.score}<span className="text-sm font-normal text-[#91918c]">点</span></div>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${assmt.result.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                              {assmt.result.passed ? "合格" : "不合格"}（合格ライン: {assmt.passScore}点）
                            </span>
                          </div>
                        </div>
                        {assmt.result.detail && (
                          <div className="grid grid-cols-5 tf-grid-5 gap-2">
                            {Object.entries(assmt.result.detail).map(([area, score]) => (
                              <div key={area} className="text-center p-2 rounded-lg bg-white/60">
                                <div className="text-xs text-[#91918c] mb-1 truncate" title={area}>{area}</div>
                                <div className="text-sm font-bold" style={{color: score >= assmt.passScore ? "#15803d" : score >= assmt.passScore - 10 ? "#d97706" : "#dc2626"}}>{score}</div>
                                <div className="w-full h-1.5 rounded-full bg-white mt-1">
                                  <div className="h-full rounded-full transition-all" style={{width: `${score}%`, backgroundColor: score >= assmt.passScore ? "#15803d" : score >= assmt.passScore - 10 ? "#d97706" : "#dc2626"}}/>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })()}

            {/* Career Orientation Section */}
            <Card className="p-6" style={{borderLeft: `3px solid ${MORPHY.primaryBlue}`}}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-medium" style={{color: MORPHY.plumBlack}}>●</span>
                <h3 className="font-medium text-[#211922]">キャリア志向</h3>
              </div>
              <div className="grid grid-cols-3 tf-grid-3 gap-4">
                {careerTraitDetails.map((trait, i) => (
                  <div key={i} className="rounded-lg p-4" style={{background: MORPHY.bg, border: `1px solid ${MORPHY.cardBorder}`}}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{background: trait.color}}/>
                      <span className="text-sm font-medium text-[#211922]">{trait.label}</span>
                    </div>
                    <p className="text-xs text-[#91918c] leading-relaxed">{trait.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                <div className="grid grid-cols-2 tf-grid-2 gap-4">
                  <div>
                    <span className="text-xs text-[#91918c]">やりたい仕事</span>
                    <p className="text-sm text-[#211922] mt-0.5">{c.wantToDo}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#91918c]">避けたい仕事</span>
                    <p className="text-sm text-[#211922] mt-0.5">{c.avoidToDo}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Behavior Traits Section */}
            <Card className="p-6" style={{borderLeft: `3px solid ${MORPHY.primaryBlue}`}}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-medium" style={{color: MORPHY.plumBlack}}>●</span>
                <h3 className="font-medium text-[#211922]">行動特性詳細</h3>
              </div>
              <div className="mb-4 px-4 py-3 rounded-lg" style={{background: MORPHY.bg, border: `1px solid ${MORPHY.cardBorder}`}}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#211922]">共創的リーダー</span>
                  <span className="text-xs px-2 py-0.5 rounded-full border" style={{borderColor: MORPHY.cardBorder, color: MORPHY.plumBlack}}>代表特性</span>
                </div>
                <p className="text-xs text-[#91918c]">メンバーの強みを引き出しながら、チーム全体で成果を最大化するリーダーシップスタイル。指示型ではなく、対話と信頼をベースにチームを導く。</p>
              </div>
              <div className="grid grid-cols-2 tf-grid-2 gap-4">
                {behaviorSubTraits.map((sub, i) => (
                  <div key={i} className="rounded-lg p-4" style={{background: MORPHY.bg, border: `1px solid ${MORPHY.cardBorder}`}}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base" style={{color: MORPHY.primaryBlue}}>{sub.icon}</span>
                      <span className="text-sm font-medium text-[#211922]">{sub.label}</span>
                    </div>
                    <p className="text-xs text-[#91918c] leading-relaxed">{sub.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Career History */}
            <Card className="p-6" style={{borderLeft: `3px solid ${MORPHY.primaryBlue}`}}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-medium" style={{color: MORPHY.plumBlack}}>●</span>
                <h3 className="font-medium text-[#211922]">職歴サマリ</h3>
              </div>
              <div className="space-y-4">
                {c.careerHistory.map((h, i) => (
                  <div key={i} className="border-l-2 pl-4 ml-2" style={{borderColor: MORPHY.primaryBlue}}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[#91918c]">{h.period}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{background: `${MORPHY.primaryBlue}15`, color: MORPHY.primaryBlue}}>{h.role}</span>
                    </div>
                    <h4 className="text-sm font-medium text-[#211922]">{isBlind ? `プロジェクト${i + 1}` : h.project}</h4>
                    <p className="text-xs text-[#91918c] mt-1">{h.detail}</p>
                    <div className="flex flex-wrap gap-1 mt-2">{h.tech.map(t => <span key={t} className="bg-[#e5e5e0]/50 text-[#62625b] px-1.5 py-0.5 rounded-full text-xs">{t}</span>)}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {c.certifications.length > 0 && (
              <Card className="p-5">
                <h3 className="text-sm font-medium text-[#211922] mb-3 flex items-center gap-2"><Award size={15} style={{color: MORPHY.accent3}}/>資格・認定</h3>
                <div className="space-y-2">{c.certifications.map((cert, i) => <div key={i} className="text-sm text-[#62625b] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{background: MORPHY.accent3}}/>{cert}</div>)}</div>
              </Card>
            )}
            {/* Training Progress */}
            {!isBlind && (() => {
              const tp = TRAINING_PLANS[c.id];
              if (!tp) return null;
              const totalProgress = Math.round(tp.items.reduce((sum, it) => sum + it.progress, 0) / tp.items.length);
              const completedItems = tp.items.filter(it => it.progress >= 100).length;
              const inProgressItems = tp.items.filter(it => it.progress > 0 && it.progress < 100).length;
              const notStartedItems = tp.items.filter(it => it.progress === 0).length;
              return (
                <Card className="p-5">
                  <h3 className="text-sm font-medium text-[#211922] mb-3 flex items-center gap-2"><GraduationCap size={15} style={{color: "#d97706"}}/>育成進捗</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#91918c]">目標: {tp.targetRole}</span>
                    <span className="text-sm font-semibold" style={{color: totalProgress >= 80 ? "#15803d" : totalProgress >= 40 ? "#d97706" : "#91918c"}}>{totalProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#e5e5e0]/50 rounded-full overflow-hidden mb-4">
                    <div className="h-full rounded-full transition-all" style={{width: `${totalProgress}%`, background: totalProgress >= 80 ? "#15803d" : totalProgress >= 40 ? "#d97706" : "#e5e5e0"}}/>
                  </div>
                  <div className="space-y-2.5 mb-4">
                    {tp.items.map((item, i) => (
                      <div key={i}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{
                            background: item.progress >= 100 ? "#15803d" : item.progress > 0 ? "#fef3c7" : "#f6f6f3",
                            border: item.progress >= 100 ? "none" : item.progress > 0 ? "1px solid #d97706" : "1px solid #e5e5e0"
                          }}>
                            {item.progress >= 100 && <CheckCircle size={10} style={{color: "#fff"}}/>}
                            {item.progress > 0 && item.progress < 100 && <div className="w-1.5 h-1.5 rounded-full" style={{background: "#d97706"}}/>}
                          </div>
                          <span className={`text-xs flex-1 ${item.progress >= 100 ? "text-[#15803d]" : item.progress > 0 ? "text-[#211922] font-medium" : "text-[#91918c]"}`}>{item.theme}</span>
                          <span className="text-xs flex-shrink-0" style={{color: item.progress >= 100 ? "#15803d" : item.progress > 0 ? "#d97706" : "#c8c8c1"}}>{item.progress}%</span>
                        </div>
                        <div className="ml-6 w-full h-1.5 bg-[#e5e5e0]/40 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{width: `${item.progress}%`, background: item.progress >= 100 ? "#15803d" : item.progress > 0 ? "#d97706" : "transparent"}}/>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 tf-grid-3 gap-2 text-center pt-3" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                    <div>
                      <div className="text-base font-semibold" style={{color: "#15803d"}}>{completedItems}</div>
                      <div className="text-xs text-[#91918c]">完了</div>
                    </div>
                    <div>
                      <div className="text-base font-semibold" style={{color: "#d97706"}}>{inProgressItems}</div>
                      <div className="text-xs text-[#91918c]">進行中</div>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-[#91918c]">{notStartedItems}</div>
                      <div className="text-xs text-[#91918c]">未着手</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 text-xs text-[#91918c]" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                    <span>想定期間: {tp.estimatedPeriod}</span>
                    <span>目標マッチ: {tp.targetMatch}%</span>
                  </div>
                </Card>
              );
            })()}
            {/* Training Progress (正社員) or Skill Summary (フリーランス) — visible to admin & sales */}
            {!isBlind && c.employmentType === "フリーランス" && (
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3"><Target size={15} style={{color: "#059669"}}/><h3 className="text-sm font-medium text-[#211922]">スキルマッチ情報</h3></div>
                <div className="p-3 rounded-lg" style={{backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0"}}>
                  <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                    <div><span className="text-[#91918c]">経験年数</span><p className="font-medium text-[#211922]">{c.totalYears}年</p></div>
                    <div><span className="text-[#91918c]">希望単価</span><p className="font-medium text-[#211922]">{c.unitPrice}万円/月</p></div>
                    <div><span className="text-[#91918c]">リモート</span><p className="font-medium text-[#211922]">{c.remoteOk ? "対応可" : "出社のみ"}</p></div>
                    <div><span className="text-[#91918c]">就業条件</span><p className="font-medium text-[#211922]">{c.workCondition}</p></div>
                  </div>
                  <div className="pt-2 border-t border-green-200">
                    <span className="text-[10px] text-emerald-600 font-medium">即戦力スキル:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {c.skills.filter(s => s.level >= 3).map(s => (
                        <span key={s.name} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{s.name} Lv{s.level}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}
            {!isBlind && c.employmentType !== "フリーランス" && (() => {
              const cTrainings = candidateTrainings.filter(ct => ct.candidateId === c.id);
              if (cTrainings.length === 0) return null;
              const completed = cTrainings.filter(ct => ct.status === "完了").length;
              const inProgress = cTrainings.filter(ct => ct.status === "受講中").length;
              const notStarted = cTrainings.filter(ct => ct.status === "未着手").length;
              return (
                <Card className="p-5">
                  <div className="flex items-center gap-2 mb-3"><GraduationCap size={15} style={{color: MORPHY.red}}/><h3 className="text-sm font-medium text-[#211922]">研修進捗</h3></div>
                  <div className="flex items-center gap-4 mb-3 text-xs">
                    <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">完了 {completed}</span>
                    <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">受講中 {inProgress}</span>
                    <span className="px-2 py-1 rounded-full bg-[#f6f6f3] text-[#62625b] border border-[#e5e5e0]">未着手 {notStarted}</span>
                  </div>
                  <div className="space-y-2">
                    {cTrainings.slice(0, 5).map(ct => {
                      const tr = TRAINING_MASTER.find(t => t.id === ct.trainingId);
                      return (
                        <div key={ct.trainingId} className="flex items-center gap-3 text-xs">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ct.status === "完了" ? "bg-green-500" : ct.status === "受講中" ? "bg-blue-500" : "bg-gray-300"}`}/>
                          <span className="flex-1 truncate text-[#211922]">{tr?.title || ct.trainingId}</span>
                          <div className="w-16 h-1.5 rounded-full bg-[#e5e5e0] overflow-hidden"><div className="h-full rounded-full" style={{width: `${ct.progress}%`, background: ct.status === "完了" ? "#15803d" : MORPHY.red}}/></div>
                          <span className="text-[#91918c] w-8 text-right">{ct.progress}%</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })()}
            {isBlind && <CustomerInquiryCard candidateId={c.id} matchScore={match.current}/>}
            {!isBlind && role === "admin" && (
              <Card className="p-5 space-y-2.5">
                <h3 className="text-sm font-medium text-[#211922] mb-2">アクション</h3>
                {c.employmentType !== "フリーランス" && (
                  <button onClick={() => { setTrainingTarget(c); navigate("training-detail"); }} className="w-full bg-white hover:bg-[#f6f6f3] rounded-lg text-[#211922] border border-[#e5e5e0] text-sm py-2.5 flex items-center justify-center gap-1.5"><GraduationCap size={14}/>育成プラン生成</button>
                )}
                <button onClick={() => navigate("admin-resume", { candidate: c })} className="w-full bg-[#e60023] text-white rounded-2xl transition-all duration-200 text-sm py-2.5 flex items-center justify-center gap-1.5 hover:bg-[#cc001f]"><FileText size={14}/>職務経歴書生成</button>
              </Card>
            )}
            {!isBlind && role === "sales" && (
              <Card className="p-5 space-y-2.5">
                <h3 className="text-sm font-medium text-[#211922] mb-2">アクション</h3>
                <button onClick={() => navigate("admin-resume", { candidate: c })} className="w-full bg-white hover:bg-[#f6f6f3] rounded-lg text-[#211922] border border-[#e5e5e0] text-sm py-2.5 flex items-center justify-center gap-1.5"><FileText size={14}/>職務経歴書生成</button>
                <button onClick={() => setCandidateProposalOpen(true)} className="w-full bg-[#e60023] text-white rounded-2xl transition-all duration-200 text-sm py-2.5 flex items-center justify-center gap-1.5 hover:bg-[#cc001f]"><Mail size={14}/>顧客に提案メール</button>
              </Card>
            )}
          </div>
        </div>

        {/* ====== Candidate Proposal Email Modal (Sales) ====== */}
        {candidateProposalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: "rgba(33,25,34,0.55)"}}>
            <div className="bg-white w-full max-h-[92vh] overflow-hidden flex flex-col" style={{maxWidth: cpStep === "select" ? "560px" : "960px", width: "calc(100% - 32px)", margin: "16px", borderRadius: MORPHY.radius.lg, boxShadow: MORPHY.shadow.modal, transition: "max-width 0.3s ease"}}>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4" style={{borderBottom: `1px solid ${MORPHY.cardBorder}`}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background: `${MORPHY.red}12`}}>
                    <Mail size={20} style={{color: MORPHY.red}}/>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-[#211922]">提案メール作成</h3>
                    <p className="text-xs text-[#91918c]">{c.id}（{c.name}）を顧客にご提案</p>
                  </div>
                </div>
                <button onClick={cpClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f6f6f3] transition-colors"><X size={18} className="text-[#91918c]"/></button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto">
                {/* Step: Select deal/customer */}
                {cpStep === "select" && (
                  <div className="p-6">
                    <p className="text-sm text-[#62625b] mb-5">提案先の商談を選択してください。商談を指定すると、案件情報に合わせたメールが自動生成されます。</p>

                    <div className="space-y-2 mb-6">
                      <label className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all" style={{borderColor: cpSelectedDeal === "" ? MORPHY.red : MORPHY.cardBorder, background: cpSelectedDeal === "" ? `${MORPHY.red}06` : "transparent"}} onClick={() => setCpSelectedDeal("")}>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${cpSelectedDeal === "" ? "border-[#e60023]" : "border-[#c8c8c1]"}`}>
                          {cpSelectedDeal === "" && <div className="w-2 h-2 rounded-full bg-[#e60023]"/>}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-[#211922]">商談を指定せずに提案</span>
                          <p className="text-xs text-[#91918c] mt-0.5">汎用テンプレートでメールを作成します</p>
                        </div>
                      </label>
                      {DEALS.map(dl => (
                        <label key={dl.id} className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all" style={{borderColor: cpSelectedDeal === dl.id ? MORPHY.red : MORPHY.cardBorder, background: cpSelectedDeal === dl.id ? `${MORPHY.red}06` : "transparent"}} onClick={() => setCpSelectedDeal(dl.id)}>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${cpSelectedDeal === dl.id ? "border-[#e60023]" : "border-[#c8c8c1]"}`}>
                            {cpSelectedDeal === dl.id && <div className="w-2 h-2 rounded-full bg-[#e60023]"/>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-[#211922]">{dl.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${dl.priority === "高" ? "bg-red-50 text-red-700" : dl.priority === "中" ? "bg-yellow-50 text-yellow-700" : "bg-[#e5e5e0]/50 text-[#62625b]"}`}>{dl.priority}</span>
                            </div>
                            <p className="text-xs text-[#91918c] mt-0.5">{dl.customer} ・ {dl.type} ・ {dl.headcount}名 ・ {dl.startDate}〜</p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded bg-[#f6f6f3] text-[#62625b] flex-shrink-0">{dl.status}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step: Edit email */}
                {cpStep === "edit" && cpEmailDraft && (
                  <div className="flex tf-two-col" style={{minHeight: 0}}>
                    <div className="w-1/2 p-6 border-r border-[#e5e5e0] overflow-y-auto" style={{maxHeight: "calc(92vh - 140px)"}}>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-[#91918c] mb-1 block">宛先</label>
                          <input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm bg-[#f6f6f3]" value={cpEmailDraft.to} onChange={e => setCpEmailDraft(prev => ({...prev, to: e.target.value}))}/>
                        </div>
                        <div>
                          <label className="text-xs text-[#91918c] mb-1 block">件名</label>
                          <input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10" value={cpEmailDraft.subject} onChange={e => setCpEmailDraft(prev => ({...prev, subject: e.target.value}))}/>
                        </div>
                        <div>
                          <label className="text-xs text-[#91918c] mb-1 block">本文</label>
                          <textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 resize-none font-mono leading-relaxed" style={{minHeight: "320px"}} value={cpEmailDraft.body} onChange={e => setCpEmailDraft(prev => ({...prev, body: e.target.value}))}/>
                        </div>
                        <div>
                          <label className="text-xs text-[#91918c] mb-2 block flex items-center gap-1"><Paperclip size={12}/>添付ファイル</label>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f6f6f3] border border-[#e5e5e0]">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50"><FileText size={16} className="text-red-600"/></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-[#211922] truncate">{cpEmailDraft.attachments[0]?.name}</p>
                              <p className="text-xs text-[#91918c]">PDF ・ ブラインドレジュメ</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 p-6 overflow-y-auto bg-[#fafaf8]" style={{maxHeight: "calc(92vh - 140px)"}}>
                      <div className="flex items-center gap-2 mb-4">
                        <Paperclip size={14} className="text-[#91918c]"/>
                        <h4 className="text-sm font-medium text-[#211922]">添付 職務経歴書プレビュー</h4>
                      </div>
                      <CpResumePreview/>
                    </div>
                  </div>
                )}

                {/* Step: Preview */}
                {cpStep === "preview" && cpEmailDraft && (
                  <div className="p-6">
                    <div className="max-w-2xl mx-auto">
                      <div className="mb-4 flex items-center gap-2">
                        <CheckCircle size={16} style={{color: MORPHY.green700}}/>
                        <span className="text-sm font-medium text-[#211922]">送信内容の最終確認</span>
                      </div>
                      <Card className="p-5 mb-4">
                        <div className="space-y-3 text-sm">
                          <div className="flex"><span className="text-[#91918c] w-16 flex-shrink-0">宛先</span><span className="text-[#211922] font-medium">{cpEmailDraft.to}</span></div>
                          <div className="flex"><span className="text-[#91918c] w-16 flex-shrink-0">件名</span><span className="text-[#211922] font-medium">{cpEmailDraft.subject}</span></div>
                        </div>
                      </Card>
                      <Card className="p-5 mb-4">
                        <pre className="text-sm text-[#211922] whitespace-pre-wrap font-sans leading-relaxed">{cpEmailDraft.body}</pre>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-[#f6f6f3]">
                          <FileText size={14} className="text-red-600 flex-shrink-0"/>
                          <span className="text-sm text-[#211922]">{cpEmailDraft.attachments[0]?.name}</span>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Step: Sending */}
                {cpStep === "sending" && (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#f6f6f3]"><RefreshCw size={28} className="text-[#e60023] animate-spin"/></div>
                      <h3 className="text-lg font-medium text-[#211922] mb-2">提案メールを送信中...</h3>
                      <p className="text-sm text-[#91918c]">{c.name}（{c.id}）の提案メールを送信しています</p>
                    </div>
                  </div>
                )}

                {/* Step: Sent */}
                {cpStep === "sent" && (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background: `${MORPHY.green700}15`}}>
                        <CheckCircle size={32} style={{color: MORPHY.green700}}/>
                      </div>
                      <h3 className="text-lg font-medium text-[#211922] mb-2">提案メールを送信しました</h3>
                      <p className="text-sm text-[#91918c] mb-1">候補者{c.id}の職務経歴書を添付して送信しました。</p>
                      <p className="text-xs text-[#91918c] mb-6">送信日時: {new Date().toLocaleString("ja-JP")}</p>
                      <button onClick={cpClose} className="px-5 py-2.5 rounded-lg text-sm font-medium border border-[#e5e5e0] hover:bg-[#f6f6f3] text-[#211922] transition-colors">閉じる</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {(cpStep === "select" || cpStep === "edit" || cpStep === "preview") && (
                <div className="flex items-center justify-between px-6 py-4" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                  <div className="text-xs text-[#91918c]">
                    {cpStep === "select" && "提案先を選択してください"}
                    {cpStep === "edit" && <span className="flex items-center gap-1"><Paperclip size={12}/>職務経歴書（ブラインド）を添付</span>}
                    {cpStep === "preview" && "内容を確認して送信してください"}
                  </div>
                  <div className="flex gap-3">
                    {cpStep === "select" && (
                      <>
                        <button onClick={cpClose} className="px-4 py-2.5 rounded-lg text-sm font-medium border border-[#e5e5e0] hover:bg-[#f6f6f3] text-[#62625b] transition-colors">キャンセル</button>
                        <button onClick={cpProceedToEdit} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#211922] text-white hover:bg-[#2e2630] transition-colors flex items-center gap-1.5"><Mail size={14}/>メールを作成</button>
                      </>
                    )}
                    {cpStep === "edit" && (
                      <>
                        <button onClick={() => setCpStep("select")} className="px-4 py-2.5 rounded-lg text-sm font-medium border border-[#e5e5e0] hover:bg-[#f6f6f3] text-[#62625b] transition-colors flex items-center gap-1.5"><ArrowLeft size={14}/>提案先を変更</button>
                        <button onClick={() => setCpStep("preview")} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#211922] text-white hover:bg-[#2e2630] transition-colors flex items-center gap-1.5"><Eye size={14}/>プレビュー</button>
                      </>
                    )}
                    {cpStep === "preview" && (
                      <>
                        <button onClick={() => setCpStep("edit")} className="px-4 py-2.5 rounded-lg text-sm font-medium border border-[#e5e5e0] hover:bg-[#f6f6f3] text-[#62625b] transition-colors flex items-center gap-1.5"><Edit3 size={14}/>編集に戻る</button>
                        <button onClick={cpSend} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white hover:bg-[#cc001f] transition-colors flex items-center gap-1.5"><Send size={14}/>送信する</button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================================
  // ADMIN SCREENS
  // ============================================================
  // ============================================================
  // SALES DASHBOARD
  // ============================================================
  const SalesDashboardScreen = () => {
    const allJDs = [...JDS.map(j => ({...j, _savedId: j.id, _customerName: jdCustomerMap[j.id] || "未割当"})), ...savedJDs.map(j => ({...j, _customerName: jdCustomerMap[j.id] || jdCustomerMap[j._savedId] || "顧客作成"}))];
    const activeJDs = allJDs.filter(j => (jdStatuses[j.id] || jdStatuses[j._savedId] || "募集中") === "募集中");
    const pendingIRCount = interviewRequests.filter(sr => sr.status === "未対応").length;

    const assigned = CANDIDATES.filter(c => c.status === "就業中" && c.assignment);
    const now = new Date();
    const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    const endingSoon = assigned.filter(c => {
      const end = new Date(c.assignment.endDate.replace(/\//g, "-"));
      return end <= endOfNextMonth;
    }).sort((a, b) => new Date(a.assignment.endDate.replace(/\//g, "-")) - new Date(b.assignment.endDate.replace(/\//g, "-")));

    const getDaysLeft = (endDate) => {
      const end = new Date(endDate.replace(/\//g, "-"));
      return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    };

    return (
      <div>
        <PageHeader title="営業ダッシュボード" subtitle="募集状況と顧客アクティビティの概要"/>
        <div className="grid grid-cols-4 tf-grid-4 gap-4 mb-6">
          <StatCard featured icon={<List size={20} className="text-white"/>} label="対応中の募集" value={activeJDs.length} sub={`全${allJDs.length}件中`} color="blue" onClick={() => { setDefaultFilter("active"); navigate("sales-jd-list"); }}/>
          <StatCard icon={<AlertCircle size={20} className="text-[#dc2626]"/>} label="未対応リクエスト" value={pendingIRCount} sub="件" color="red" onClick={() => { setDefaultFilter("pending-ir"); navigate("sales-jd-list"); }}/>
          <StatCard icon={<Monitor size={20} className="text-[#211922]"/>} label="就業中" value={assigned.length} sub="名" color="blue" onClick={() => { setDefaultFilter("active"); navigate("assignment-list"); }}/>
          <StatCard icon={<Clock size={20} className="text-[#91918c]"/>} label="契約終了間近" value={endingSoon.length} sub="来月末まで" color="red" onClick={() => { setDefaultFilter("ending"); navigate("assignment-list"); }}/>
        </div>

        {/* Two-column: Alerts + Activity */}
        <div className="grid grid-cols-2 tf-grid-2 gap-5 mb-6">
          {/* Left: Interview requests + Customer JDs */}
          <div className="space-y-4">
            {interviewRequests.filter(sr => sr.status === "未対応").length > 0 && (
              <Card className="p-4" style={{border: "1px solid #fecaca", background: "#fef2f2"}}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium flex items-center gap-2 text-[#211922]"><MessageSquare size={14} className="text-[#dc2626]"/>未対応の面談リクエスト</h3>
                  <button onClick={() => navigate("sales-jd-list")} className="text-xs text-[#dc2626]">すべて →</button>
                </div>
                <div className="space-y-1.5">
                  {interviewRequests.filter(sr => sr.status === "未対応").slice(0, 3).map(sr => {
                    const cand = CANDIDATES.find(c => c.id === sr.candidateId);
                    const jd = JDS.find(j => j.id === sr.jdId);
                    return (
                      <div key={sr.id} className="flex items-center gap-2 p-2 rounded-lg bg-white cursor-pointer hover:shadow-sm transition-all" style={{border: `1px solid ${MORPHY.cardBorder}`}}
                        onClick={() => { setEditingJD(jd || JDS[0]); navigate("sales-jd-detail"); }}>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-[#211922] truncate">{sr.customerName} → {cand?.name || sr.candidateId}</div>
                          {jd && <div className="text-xs text-[#91918c] truncate">{jd.title}</div>}
                        </div>
                        <span className="text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0" style={{background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", fontSize: "10px"}}>未対応</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
            {savedJDs.filter(j => j._savedBy === "customer").length > 0 && (
              <Card className="p-4" style={{border: "1px solid #ddd6fe", background: "#faf5ff"}}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium flex items-center gap-2 text-[#211922]"><FileText size={14} className="text-purple-600"/>顧客が作成した募集</h3>
                  <button onClick={() => navigate("sales-jd-list")} className="text-xs text-purple-600">すべて →</button>
                </div>
                <div className="space-y-1.5">
                  {savedJDs.filter(j => j._savedBy === "customer").slice(0, 3).map(j => (
                    <div key={j._savedId} className="flex items-center gap-2 p-2 rounded-lg bg-white cursor-pointer hover:shadow-sm transition-all" style={{border: "1px solid #e5e5e0"}}
                      onClick={() => { setEditingJD(j); navigate("sales-jd-detail"); }}>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-[#211922] truncate">{j._customerName || "顧客"} が「{j.title}」を作成</div>
                      </div>
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-medium bg-purple-50 text-purple-700 border border-purple-200 flex-shrink-0" style={{fontSize: "10px"}}>新規</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
          {/* Right: Contract ending + quick stats */}
          <div className="space-y-4">
            {endingSoon.length > 0 && (
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium flex items-center gap-2" style={{color: MORPHY.textPrimary}}><AlertCircle size={14} className="text-[#91918c]"/>契約終了間近</h3>
                  <button onClick={() => navigate("assignment-list")} className="text-xs" style={{color: MORPHY.textSecondary}}>一覧 →</button>
                </div>
                <div className="space-y-1.5">
                  {endingSoon.slice(0, 4).map(c => {
                    const days = getDaysLeft(c.assignment.endDate);
                    return (
                      <div key={c.id} className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-[#f6f6f3] transition-all" style={{border: `1px solid ${MORPHY.cardBorder}`}} onClick={() => navigate("candidate-detail", { candidate: c })}>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-[#211922] truncate">{c.name}</div>
                          <div className="text-xs text-[#91918c] truncate">{c.assignment.customer}</div>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${days <= 15 ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>{days <= 0 ? "終了済" : `残${days}日`}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Two-column: Recruitments + Available Staff */}
        <div className="grid grid-cols-2 tf-grid-2 gap-5">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#211922]">直近の募集</h3>
              <button onClick={() => navigate("sales-jd-list")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">すべて見る →</button>
            </div>
            <div className="space-y-3">
              {allJDs.slice(0, 4).map(j => {
                const pending = interviewRequests.filter(sr => sr.jdId === (j.id || j._savedId) && sr.status === "未対応").length;
                return (
                  <div key={j.id || j._savedId} className="flex items-center justify-between p-4 bg-[#f6f6f3]/60 rounded-lg cursor-pointer hover:bg-[#e5e5e0]/50 transition-all duration-200" onClick={() => { setEditingJD(j); navigate("sales-jd-detail"); }}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#211922]">{j.title}</span>
                        {pending > 0 && <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{background: "#fef2f2", color: "#dc2626"}}>{pending}件</span>}
                      </div>
                      <div className="text-xs text-[#91918c]">{j._customerName} ・ {j.location}</div>
                    </div>
                    <ChevronRight size={16} className="text-[#c8c8c1]"/>
                  </div>
                );
              })}
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#211922]">提案可能スタッフ</h3>
              <button onClick={() => navigate("available-candidates")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">一覧を見る →</button>
            </div>
            {(() => {
              const available = CANDIDATES.filter(c => c.status === "提案可能").sort((a, b) => b.experience - a.experience);
              return available.length > 0 ? (
                <div className="space-y-3">
                  {available.slice(0, 5).map(c => (
                    <div key={c.id} className="flex items-center justify-between p-3.5 bg-[#f6f6f3]/60 border border-[#e5e5e0] rounded-lg cursor-pointer hover:bg-[#f6f6f3] transition-all duration-200" onClick={() => navigate("candidate-detail", { candidate: c })}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{color: MORPHY.textPrimary}}>{c.name}</span>
                          <EmploymentBadge type={c.employmentType}/>
                          <span className="text-xs bg-[#e5e5e0] text-[#211922]/80 px-2 py-0.5 rounded-full font-medium">提案可能</span>
                        </div>
                        <div className="text-xs mt-1" style={{color: MORPHY.textMuted}}>{c.unitPrice}万円/月 ・ {c.age}歳 ・ {c.location}</div>
                        <div className="flex gap-1 mt-1.5">{c.skills.slice(0, 3).map(sk => <span key={sk.name} className="text-xs bg-white border border-[#e5e5e0] px-2 py-0.5 rounded-full">{sk.name}</span>)}</div>
                      </div>
                      <ChevronRight size={16} className="text-[#c8c8c1] ml-3"/>
                    </div>
                  ))}
                  {available.length > 5 && <div className="text-center text-xs text-[#91918c] pt-1">他 {available.length - 5}名</div>}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 text-sm text-[#91918c]">現在提案可能な人材はいません</div>
              );
            })()}
          </Card>
        </div>
      </div>
    );
  };

  const AvailableCandidatesScreen = () => {
    const [skillFilter, setSkillFilter] = useState("");
    const allAvailable = CANDIDATES.filter(c => c.status === "提案可能");
    const allSkills = [...new Set(allAvailable.flatMap(c => c.skills.map(sk => sk.name)))].sort();
    const selectedSkills = skillFilter ? skillFilter.split(",").map(s => s.trim()).filter(Boolean) : [];
    const filtered = selectedSkills.length > 0
      ? allAvailable.filter(c => selectedSkills.every(fs => c.skills.some(sk => sk.name.toLowerCase().includes(fs.toLowerCase()))))
      : allAvailable;
    const available = filtered.sort((a, b) => b.experience - a.experience);

    return (
      <div>
        <PageHeader title="提案可能人材一覧" subtitle={`現在 ${allAvailable.length}名が提案可能です`} onBack={goBack}/>
        <div className="mb-6">
          <StatCard icon={<Users size={20} className="text-green-600"/>} label="提案可能" value={allAvailable.length} sub="名" color="green"/>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <Search size={16} className="text-[#91918c]"/>
            <h3 className="text-sm font-medium text-[#211922]">スキルで絞り込み</h3>
            {selectedSkills.length > 0 && <span className="text-xs text-[#211922]">{available.length}名がヒット</span>}
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {allSkills.map(sk => {
              const isActive = selectedSkills.some(fs => sk.toLowerCase().includes(fs.toLowerCase()));
              return (
                <button key={sk} onClick={() => {
                  if (isActive) {
                    setSkillFilter(selectedSkills.filter(fs => !sk.toLowerCase().includes(fs.toLowerCase())).join(", "));
                  } else {
                    setSkillFilter(selectedSkills.length > 0 ? [...selectedSkills, sk].join(", ") : sk);
                  }
                }} className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${isActive ? "bg-[#e60023] text-white border-black" : "bg-white text-[#62625b] border-[#e5e5e0] hover:border-[#c8c8c1] hover:text-[#211922]"}`}>
                  {sk}
                </button>
              );
            })}
          </div>
          {selectedSkills.length > 0 && (
            <button onClick={() => setSkillFilter("")} className="text-xs text-[#91918c] hover:text-[#62625b]">絞り込みをクリア</button>
          )}
        </Card>

        {available.length > 0 ? (
          <div className="grid grid-cols-3 tf-grid-3 gap-4">
            {available.map(c => (
              <Card key={c.id} className="p-0 cursor-pointer transition-all hover:translate-y-[-2px]" onClick={() => navigate("candidate-detail", { candidate: c })}>
                <CandidateCardBody candidate={c} showMatch={false}/>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center text-sm text-[#91918c]">該当するスキルを持つ提案可能人材が見つかりません</Card>
        )}
      </div>
    );
  };

  const AssignmentListScreen = () => {
    const now = new Date();
    const initTab = defaultFilter === "ending" ? "ending" : "active";
    const [assignTab, setAssignTab] = useState(initTab);
    const [empTypeFilter, setEmpTypeFilter] = useState("all");
    React.useEffect(() => { if (defaultFilter) { setAssignTab(defaultFilter === "ending" ? "ending" : "active"); setDefaultFilter(null); } }, [defaultFilter]);

    const applyEmpFilter = (list) => empTypeFilter === "all" ? list : list.filter(c => c.employmentType === empTypeFilter);
    const assigned = CANDIDATES.filter(c => c.status === "就業中" && c.assignment)
      .sort((a, b) => new Date(a.assignment.endDate.replace(/\//g, "-")) - new Date(b.assignment.endDate.replace(/\//g, "-")));
    const notAssigned = CANDIDATES.filter(c => c.status !== "就業中")
      .sort((a, b) => a.name.localeCompare(b.name, "ja"));
    const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    const endingSoon = assigned.filter(c => new Date(c.assignment.endDate.replace(/\//g, "-")) <= endOfNextMonth);
    const activeOnly = assigned.filter(c => !endingSoon.includes(c));

    const getDaysLeft = (endDate) => {
      const end = new Date(endDate.replace(/\//g, "-"));
      return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    };

    const getUrgencyStyle = (days) => {
      if (days <= 0) return "bg-[#e5e5e0]/50 text-[#62625b]";
      if (days <= 15) return "bg-red-100 text-red-700";
      if (days <= 45) return "bg-[#e5e5e0] text-[#62625b]";
      if (days <= 90) return "bg-yellow-50 text-yellow-700";
      return "bg-green-50 text-[#211922]";
    };

    const getStatusLabel = (status) => {
      const map = { "提案可能": { bg: "bg-blue-50 text-blue-700", label: "提案可能" }, "育成対象": { bg: "bg-amber-50 text-amber-700", label: "育成中" }, "候補": { bg: "bg-[#f6f6f3] text-[#62625b]", label: "候補" } };
      return map[status] || { bg: "bg-[#f6f6f3] text-[#62625b]", label: status };
    };

    const tabs = [
      { id: "active", label: "就業中", count: assigned.length, icon: <Monitor size={15}/> },
      { id: "inactive", label: "未就業", count: notAssigned.length, icon: <UserX size={15}/> },
      { id: "ending", label: "契約終了間近", count: endingSoon.length, icon: <AlertCircle size={15}/> }
    ];

    const displayList = applyEmpFilter(assignTab === "active" ? assigned : assignTab === "ending" ? endingSoon : notAssigned);

    return (
      <div>
        <PageHeader title="就業状況一覧" subtitle={`就業中 ${assigned.length}名 ・ 未就業 ${notAssigned.length}名 ・ 契約終了間近 ${endingSoon.length}名`} onBack={goBack}/>
        <div className="grid grid-cols-3 tf-grid-3 gap-5 mb-8">
          <StatCard icon={<Monitor size={20} className="text-[#211922]"/>} label="就業中" value={assigned.length} sub={`就業率 ${Math.round(assigned.length / CANDIDATES.length * 100)}%`} color="blue" onClick={() => setAssignTab("active")}/>
          <StatCard icon={<UserX size={20} className="text-[#91918c]"/>} label="未就業" value={notAssigned.length} sub="派遣先未定" color="amber" onClick={() => setAssignTab("inactive")}/>
          <StatCard icon={<AlertCircle size={20} className="text-red-600"/>} label="契約終了間近" value={endingSoon.length} sub="来月末まで" color="red" onClick={() => setAssignTab("ending")}/>
        </div>

        <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{backgroundColor: MORPHY.bgSubtle}}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setAssignTab(t.id)} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${assignTab === t.id ? "bg-white shadow-sm text-[#211922]" : "text-[#91918c] hover:text-[#62625b]"}`}>
              {t.icon}
              <span>{t.label}</span>
              <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${assignTab === t.id ? "bg-[#211922] text-white" : "bg-[#e5e5e0] text-[#62625b]"}`}>{t.count}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs text-[#91918c]">区分:</span>
          {[{ id: "all", label: "すべて" }, { id: "正社員", label: "正社員" }, { id: "フリーランス", label: "フリーランス" }].map(f => (
            <button key={f.id} onClick={() => setEmpTypeFilter(f.id)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${empTypeFilter === f.id ? "bg-[#211922] text-white" : "bg-[#f6f6f3] text-[#62625b] hover:bg-[#e5e5e0]"}`}>{f.label}</button>
          ))}
          {empTypeFilter !== "all" && <span className="text-xs text-[#91918c]">({displayList.length}名)</span>}
        </div>

        {(assignTab === "active" || assignTab === "ending") && (
          <Card className="p-0 overflow-hidden rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">ID</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">名前</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">区分</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">派遣先</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">プロジェクト</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">単価</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">契約期間</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">残日数</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]"></th>
                </tr>
              </thead>
              <tbody>
                {displayList.map(c => {
                  const days = getDaysLeft(c.assignment.endDate);
                  return (
                    <tr key={c.id} className="border-b last:border-b-0 hover:bg-[#f6f6f3]/50 cursor-pointer transition-all duration-200" onClick={() => navigate("candidate-detail", { candidate: c })}>
                      <td className="px-4 py-4 text-sm text-[#91918c] font-mono">{c.id}</td>
                      <td className="px-4 py-4 text-sm font-medium text-[#211922]">{c.name}</td>
                      <td className="px-4 py-4"><EmploymentBadge type={c.employmentType}/></td>
                      <td className="px-4 py-4 text-sm text-[#62625b]">{c.assignment.customer}</td>
                      <td className="px-4 py-4 text-sm text-[#62625b]">{c.assignment.project}</td>
                      <td className="px-4 py-4 text-sm font-medium text-[#211922]">{c.unitPrice}万</td>
                      <td className="px-4 py-3 text-xs text-[#91918c]">{c.assignment.startDate} 〜 {c.assignment.endDate}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getUrgencyStyle(days)}`}>
                          {days <= 0 ? "終了済み" : `残り${days}日`}
                        </span>
                      </td>
                      <td className="px-4 py-3"><ChevronRight size={16} className="text-[#91918c]"/></td>
                    </tr>
                  );
                })}
                {displayList.length === 0 && (
                  <tr><td colSpan={9} className="px-4 py-12 text-center text-sm text-[#91918c]">{assignTab === "ending" ? "契約終了間近のメンバーはいません" : "就業中のメンバーはいません"}</td></tr>
                )}
              </tbody>
            </table>
          </Card>
        )}

        {assignTab === "inactive" && (
          <Card className="p-0 overflow-hidden rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">ID</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">名前</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">区分</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">ステータス</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">スキル</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">経験年数</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]">希望単価</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#91918c]"></th>
                </tr>
              </thead>
              <tbody>
                {notAssigned.map(c => {
                  const sl = getStatusLabel(c.status);
                  return (
                    <tr key={c.id} className="border-b last:border-b-0 hover:bg-[#f6f6f3]/50 cursor-pointer transition-all duration-200" onClick={() => navigate("candidate-detail", { candidate: c })}>
                      <td className="px-4 py-4 text-sm text-[#91918c] font-mono">{c.id}</td>
                      <td className="px-4 py-4 text-sm font-medium text-[#211922]">{c.name}</td>
                      <td className="px-4 py-4"><EmploymentBadge type={c.employmentType}/></td>
                      <td className="px-4 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${sl.bg}`}>{sl.label}</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#62625b]">{c.skills?.slice(0, 3).join(", ")}{c.skills?.length > 3 ? " ..." : ""}</td>
                      <td className="px-4 py-4 text-sm text-[#62625b]">{c.experience}年</td>
                      <td className="px-4 py-4 text-sm font-medium text-[#211922]">{c.unitPrice}万</td>
                      <td className="px-4 py-3"><ChevronRight size={16} className="text-[#91918c]"/></td>
                    </tr>
                  );
                })}
                {notAssigned.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-12 text-center text-sm text-[#91918c]">未就業のメンバーはいません</td></tr>
                )}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    );
  };

  const DashboardScreen = () => {
    const activeCount = CANDIDATES.filter(c => c.status === "就業中").length;
    const availableCount = CANDIDATES.filter(c => c.status === "提案可能" || c.status === "候補").length;
    const trainingCount = CANDIDATES.filter(c => c.status === "育成対象").length;
    const employeeCount = CANDIDATES.filter(c => c.employmentType === "正社員").length;
    const freelanceCount = CANDIDATES.filter(c => c.employmentType === "フリーランス").length;
    const statusData = [
      { name: "就業中", value: activeCount, fill: "#211922" },
      { name: "提案可能（未就業）", value: availableCount, fill: "#e60023" },
      { name: "育成中", value: trainingCount, fill: "#c8c8c1" }
    ];
    const totalMembers = activeCount + availableCount + trainingCount;

    return (
      <div>
        <PageHeader title="管理者ダッシュボード" subtitle="職種マスタ・育成計画・就業状況の全体像"/>
        <div className="grid grid-cols-4 tf-grid-4 gap-4 mb-6">
          <StatCard featured icon={<Users size={20} className="text-white"/>} label="全スタッフ" value={CANDIDATES.length} sub={`正社員${employeeCount} ・ FL${freelanceCount}`} color="blue" onClick={() => navigate("assignment-list")}/>
          <StatCard icon={<Target size={20} className="text-[#62625b]"/>} label="育成計画" value={workforcePlans.length} sub="進行中" color="purple" onClick={() => navigate("plans")}/>
          <StatCard icon={<GraduationCap size={20} className="text-[#62625b]"/>} label="育成中" value={trainingCount} sub="正社員スキルアップ" color="amber" onClick={() => navigate("training")}/>
          <StatCard icon={<Monitor size={20} className="text-[#211922]"/>} label="就業率" value={`${Math.round((activeCount / CANDIDATES.length) * 100)}%`} sub={`${activeCount}名 / ${CANDIDATES.length}名`} color="blue" onClick={() => navigate("assignment-list")}/>
        </div>

        <div className="grid grid-cols-2 tf-grid-2 gap-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#211922]">育成計画 進捗</h3>
              <button onClick={() => navigate("plans")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">育成計画一覧 →</button>
            </div>
            <div className="space-y-4">
              {workforcePlans.map(p => {
                const secured = p.stats.ready + (p.stats.assigned || 0);
                const securedPct = Math.round((secured / p.headcount) * 100);
                const trainingPct = Math.round((p.stats.training / p.headcount) * 100);
                return (
                  <div key={p.id} className="p-4 rounded-lg cursor-pointer hover:bg-[#f6f6f3]/80 transition-all duration-200" style={{backgroundColor: `${MORPHY.warmWash}`}} onClick={() => navigate("plan-detail", { plan: p })}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-sm font-medium text-[#211922]">{p.targetRole}</span>
                        <span className="text-xs text-[#91918c] ml-2">目標 {p.headcount}名</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.priority === "高" ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"}`}>{p.priority}</span>
                    </div>
                    <div className="w-full h-5 rounded-full overflow-hidden flex" style={{backgroundColor: MORPHY.cardBorder}}>
                      {secured > 0 && <div className="h-full flex items-center justify-center text-[10px] text-white font-medium" style={{width: `${Math.min(securedPct, 100)}%`, backgroundColor: MORPHY.plumBlack}}>{secured}</div>}
                      {(p.stats.training || 0) > 0 && <div className="h-full flex items-center justify-center text-[10px] text-[#211922] font-medium" style={{width: `${Math.min(trainingPct, 100 - Math.min(securedPct, 100))}%`, backgroundColor: "#c8c8c1"}}>{p.stats.training}</div>}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-[#91918c]">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{backgroundColor: MORPHY.plumBlack}}/>確保済み {secured}</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{backgroundColor: "#c8c8c1"}}/>育成中 {p.stats.training || 0}</span>
                      <span className="ml-auto font-medium" style={{color: securedPct >= 80 ? "#15803d" : securedPct >= 50 ? "#ca8a04" : "#e60023"}}>{securedPct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#211922]">人材ステータス分布</h3>
              <span className="text-xs text-[#91918c]">全{totalMembers}名</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" label={({name, value}) => `${value}名`} labelLine={false}>
                  {statusData.map((entry, i) => <Cell key={i} fill={entry.fill}/>)}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}名（${Math.round(value / totalMembers * 100)}%）`, name]}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-5 mt-2">
              {statusData.map((d, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-[#62625b]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: d.fill}}/>
                  <span>{d.name}</span>
                  <span className="font-medium text-[#211922]">{d.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Job Categories - compact inline */}
        <Card className="p-4 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[#211922] flex items-center gap-2"><Layers size={14} style={{color: MORPHY.red}}/>職種別 認定スタッフ数</h3>
            <button onClick={() => navigate("job-categories")} className="text-xs text-[#91918c] hover:text-[#211922]">職種マスタ →</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {jobCategories.map(jc => {
              const certCount = jc.certifiedCandidates.length;
              return (
                <div key={jc.id} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:shadow-sm transition-all" style={{backgroundColor: MORPHY.warmWash, border: `1px solid ${MORPHY.cardBorder}`}} onClick={() => { setSelectedJobCategory(jc); navigate("job-category-detail"); }}>
                  <span className="text-xs font-medium text-[#211922]">{jc.name}</span>
                  <span className="text-sm font-semibold text-[#211922]">{certCount}<span className="text-[10px] font-normal text-[#91918c]">名</span></span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Two-column: Skills + Certifications */}
        <div className="grid grid-cols-2 tf-grid-2 gap-5 mt-5">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#211922] flex items-center gap-2"><Zap size={14} style={{color: MORPHY.red}}/>スキル別 認定数</h3>
              <button onClick={() => navigate("skill-master")} className="text-xs text-[#91918c] hover:text-[#211922]">マスタ →</button>
            </div>
            <div className="space-y-2">
              {skillMaster.map((sk, i) => (
                <div key={sk.id} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => { setSelectedSkill(sk); navigate("skill-master-detail"); }}>
                  <span className="text-xs text-[#91918c] w-24 truncate text-right flex-shrink-0" title={sk.name}>{sk.name}</span>
                  <div className="flex-1 h-5 rounded overflow-hidden" style={{backgroundColor: MORPHY.warmWash}}>
                    <div className="h-full rounded flex items-center px-2 transition-all duration-500" style={{width: `${Math.max((sk.certifiedCandidates.length / Math.max(...skillMaster.map(s => s.certifiedCandidates.length), 1)) * 100, 18)}%`, backgroundColor: i < 2 ? MORPHY.plumBlack : i < 4 ? "#62625b" : "#91918c"}}>
                      <span style={{fontSize: "10px"}} className="font-medium text-white">{sk.certifiedCandidates.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#211922] flex items-center gap-2"><Award size={14} style={{color: MORPHY.red}}/>保有資格 上位</h3>
              <span className="text-xs text-[#91918c]">上位8資格</span>
            </div>
            {(() => {
              const certMap = {};
              CANDIDATES.forEach(c => {
                (c.certifications || []).forEach(cert => {
                  const short = cert.replace("AWS Solutions Architect", "AWS SA").replace("AWS Cloud Practitioner", "AWS CP").replace("AWS DevOps Engineer", "AWS DevOps").replace("AWS Machine Learning", "AWS ML").replace("AWS Security", "AWS Security").replace("Professional", "Pro").replace("Associate", "Assoc").replace("Google Cloud Professional Cloud Architect", "GCP Architect").replace("Google Associate Android Developer", "Android Dev").replace("情報処理安全確保支援士", "情報安全確保支援士").replace("データベーススペシャリスト", "DBスペシャリスト").replace("IPA プロジェクトマネージャ", "IPA PM");
                  certMap[short] = (certMap[short] || 0) + 1;
                });
              });
              const certData = Object.entries(certMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 8);
              return (
                <div className="space-y-2">
                  {certData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <span className="text-xs text-[#91918c] w-24 truncate text-right flex-shrink-0" title={d.name}>{d.name}</span>
                      <div className="flex-1 h-5 rounded overflow-hidden" style={{backgroundColor: MORPHY.warmWash}}>
                        <div className="h-full rounded flex items-center px-2 transition-all duration-500" style={{width: `${Math.max((d.count / certData[0].count) * 100, 15)}%`, backgroundColor: i === 0 ? MORPHY.red : i < 3 ? MORPHY.plumBlack : i < 5 ? "#62625b" : "#91918c"}}>
                          <span style={{fontSize: "10px"}} className="font-medium text-white">{d.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </Card>
        </div>
      </div>
    );
  };

  // ============================================================
  // PLAN ADD MEMBER (Admin) - dedicated screen
  // ============================================================
  const PlanAddMemberScreen = () => {
    const p = selectedPlan;
    if (!p) return <div className="text-center py-20"><p className="text-[#91918c] mb-4">プランが選択されていません</p><button onClick={goBack} className="px-4 py-2 rounded-lg text-sm bg-[#e60023] text-white hover:bg-[#cc001f]">戻る</button></div>;

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const [selectedToAdd, setSelectedToAdd] = useState(new Set());
    const existingIds = new Set(p.candidates.map(c => c.id));

    const searchCandidates = () => {
      setSearching(true);
      setTimeout(() => {
        const q = searchQuery.toLowerCase();
        const scored = CANDIDATES.filter(c => !existingIds.has(c.id)).map(c => {
          const skillMatch = p.skills.length > 0 ? p.skills.filter(s => c.skills.some(cs => cs.name.toLowerCase().includes(s.toLowerCase()))).length / p.skills.length : 0.3;
          const queryMatch = q ? (c.skills.some(s => s.name.toLowerCase().includes(q)) || c.aspiration.toLowerCase().includes(q) || c.name.includes(searchQuery) ? 0.2 : 0) : 0;
          const currentMatch = Math.min(Math.round((skillMatch + queryMatch) * 60 + Math.min(c.totalYears / 10, 1) * 20 + (c.remoteOk ? 10 : 5) + Math.random() * 5), 99);
          const trainedMatch = Math.min(currentMatch + Math.round(10 + Math.random() * 15), 99);
          return { ...c, currentMatch, trainedMatch, skillMatchRate: Math.round(skillMatch * 100) };
        }).sort((a, b) => b.currentMatch - a.currentMatch);
        setSearchResults(scored);
        setSearching(false);
      }, 800);
    };

    const addMembers = () => {
      const newCandidates = [...selectedToAdd].map(cId => {
        const sr = searchResults?.find(c => c.id === cId);
        return { id: cId, status: "育成対象", currentMatch: sr?.currentMatch || 50, trainedMatch: sr?.trainedMatch || 70 };
      });
      const updated = { ...p, candidates: [...p.candidates, ...newCandidates] };
      setSelectedPlan(updated);
      setWorkforcePlans(prev => prev.map(wp => wp.id === p.id ? updated : wp));
      showToast(`${newCandidates.length}名を育成要員に追加しました`);
      navigate("plan-detail", { plan: updated });
    };

    // Auto-search on mount
    React.useEffect(() => { searchCandidates(); }, []);

    return (
      <div>
        <PageHeader title="育成要員を追加" subtitle={`${p.title} ・ ${p.targetRole}`} onBack={goBack}
          actions={selectedToAdd.size > 0 ? <button onClick={addMembers} className="px-5 py-2.5 rounded-lg text-sm font-medium text-white flex items-center gap-2 hover:bg-[#cc001f] transition-colors" style={{background: "#e60023"}}><Plus size={14}/>{selectedToAdd.size}名を追加</button> : null}
        />

        {/* Search bar */}
        <Card className="p-4 mb-5">
          <div className="flex gap-2 mb-3">
            <input className="flex-1 border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all" placeholder="スキル・名前で検索、または空欄でスキルマッチ検索" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); searchCandidates(); } }}/>
            <button onClick={searchCandidates} className="bg-[#e60023] text-white rounded-lg px-5 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-[#cc001f] transition-colors"><Search size={14}/>検索</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs text-[#91918c] mr-1">計画スキル:</span>
            {p.skills.map(s => <span key={s} className="text-xs bg-[#f6f6f3] text-[#62625b] px-2 py-0.5 rounded-full border border-[#e5e5e0]">{s}</span>)}
            <span className="text-xs text-[#91918c] ml-3">既存メンバー: {p.candidates.length}名</span>
          </div>
        </Card>

        {searching && <LoadingAI text="候補者をスキルマッチングで検索中..."/>}

        {searchResults && !searching && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#91918c]">{searchResults.length}名が見つかりました（既存メンバーを除く）</span>
              {selectedToAdd.size > 0 && <span className="text-sm font-medium" style={{color: "#e60023"}}>{selectedToAdd.size}名選択中</span>}
            </div>
            {searchResults.length === 0 ? (
              <Card className="p-10 text-center"><p className="text-sm text-[#91918c]">条件に合う候補者が見つかりませんでした</p></Card>
            ) : (
              <div className="space-y-2">
                {searchResults.map(c => {
                  const isSelected = selectedToAdd.has(c.id);
                  return (
                    <Card key={c.id} className={`p-4 cursor-pointer transition-all ${isSelected ? "ring-2 ring-[#e60023]/30" : "hover:shadow-md"}`}
                      onClick={() => setSelectedToAdd(prev => { const next = new Set(prev); if (next.has(c.id)) next.delete(c.id); else next.add(c.id); return next; })}>
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0" style={{borderColor: isSelected ? "#e60023" : MORPHY.cardBorder, background: isSelected ? "#e60023" : "transparent"}}>
                          {isSelected && <CheckCircle size={14} style={{color: "#fff"}}/>}
                        </div>
                        <CandidateAvatar candidate={c} size="md"/>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-[#211922]">{c.name}</span>
                            <EmploymentBadge type={c.employmentType}/>
                            <span className="text-xs text-[#91918c]">{c.id} ・ 経験{c.totalYears}年 ・ {c.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {c.skills.slice(0, 6).map(s => {
                              const isMatch = p.skills.some(ps => s.name.toLowerCase().includes(ps.toLowerCase()));
                              return <span key={s.name} className={`text-xs px-2 py-0.5 rounded-full ${isMatch ? "bg-[#dcfce7] text-[#15803d] font-medium border border-[#bbf7d0]" : "bg-[#f6f6f3] text-[#91918c] border border-[#e5e5e0]"}`}>{s.name}</span>;
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-5 flex-shrink-0">
                          <div className="text-center">
                            <div className="text-[10px] text-[#91918c]">スキル一致</div>
                            <div className="text-base font-semibold" style={{color: c.skillMatchRate >= 60 ? "#15803d" : c.skillMatchRate >= 30 ? "#d97706" : "#91918c"}}>{c.skillMatchRate}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-[10px] text-[#91918c]">現在</div>
                            <div className="text-base font-semibold text-[#211922]">{c.currentMatch}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-[10px] text-[#91918c]">育成後</div>
                            <div className="text-base font-semibold" style={{color: "#15803d"}}>{c.trainedMatch}%</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Fixed bottom bar when items selected */}
        {selectedToAdd.size > 0 && (
          <div className="fixed bottom-0 left-56 right-0 p-4 bg-white border-t border-[#e5e5e0] flex items-center justify-between" style={{zIndex: 30, boxShadow: "0 -2px 8px rgba(0,0,0,0.06)"}}>
            <span className="text-sm text-[#62625b]">{selectedToAdd.size}名を選択中</span>
            <div className="flex gap-3">
              <button onClick={() => setSelectedToAdd(new Set())} className="px-4 py-2 rounded-lg text-sm border border-[#e5e5e0] text-[#62625b] hover:bg-[#f6f6f3]">選択をクリア</button>
              <button onClick={addMembers} className="px-5 py-2.5 rounded-lg text-sm font-medium text-white flex items-center gap-2 hover:bg-[#cc001f] transition-colors" style={{background: "#e60023"}}><Plus size={14}/>育成要員に追加</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================================
  // JOB CATEGORIES (Admin)
  // ============================================================
  const JobCategoriesScreen = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [chatStep, setChatStep] = useState(0);
    const [chatData, setChatData] = useState({ name: "", description: "", skills: [], experience: "3年以上", passScore: 70, duration: "30分", additionalReqs: [] });
    const [aiTyping, setAiTyping] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [aiGenerating, setAiGenerating] = useState(false);
    const chatEndRef = React.useRef(null);

    React.useEffect(() => {
      if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages, aiTyping]);

    const openAddModal = () => {
      setShowAddModal(true);
      setChatMessages([]);
      setChatStep(0);
      setChatData({ name: "", description: "", skills: [], experience: "3年以上", passScore: 70, duration: "30分", additionalReqs: [] });
      setShowConfirm(false);
      setAiGenerating(false);
      setTimeout(() => {
        addAiMessage("こんにちは！新しい職種の作成をお手伝いします。\n\nまず、作成したい職種名を教えてください。\n例：経理事務、営業事務、コールセンターSV");
        setChatStep(1);
      }, 400);
    };

    const addAiMessage = (text, extras) => {
      setChatMessages(prev => [...prev, { role: "ai", text, ...extras }]);
    };
    const addUserMessage = (text) => {
      setChatMessages(prev => [...prev, { role: "user", text }]);
    };

    const suggestSkillsForCategory = (catName) => {
      const nameL = catName.toLowerCase();
      const suggestions = [];
      skillMaster.forEach(sk => {
        const skL = (sk.name + sk.category + sk.description).toLowerCase();
        if (skL.includes(nameL) || nameL.includes(sk.category.toLowerCase()) || nameL.includes(sk.name.substring(0, 3).toLowerCase())) {
          suggestions.push(sk);
        }
      });
      if (nameL.includes("事務") || nameL.includes("oa") || nameL.includes("excel")) {
        skillMaster.filter(s => ["事務", "ビジネススキル"].includes(s.category)).forEach(s => { if (!suggestions.find(x => x.id === s.id)) suggestions.push(s); });
      }
      if (nameL.includes("経理") || nameL.includes("簿記") || nameL.includes("財務")) {
        skillMaster.filter(s => s.category === "経理").forEach(s => { if (!suggestions.find(x => x.id === s.id)) suggestions.push(s); });
      }
      if (nameL.includes("英語") || nameL.includes("toeic") || nameL.includes("語学")) {
        skillMaster.filter(s => s.category === "言語").forEach(s => { if (!suggestions.find(x => x.id === s.id)) suggestions.push(s); });
      }
      if (nameL.includes("it") || nameL.includes("ヘルプデスク") || nameL.includes("システム")) {
        skillMaster.filter(s => s.category === "IT").forEach(s => { if (!suggestions.find(x => x.id === s.id)) suggestions.push(s); });
      }
      if (nameL.includes("営業") || nameL.includes("提案") || nameL.includes("サポート")) {
        skillMaster.filter(s => ["営業", "ビジネススキル"].includes(s.category)).forEach(s => { if (!suggestions.find(x => x.id === s.id)) suggestions.push(s); });
      }
      if (nameL.includes("人事") || nameL.includes("労務") || nameL.includes("給与")) {
        skillMaster.filter(s => ["人事", "経理"].includes(s.category)).forEach(s => { if (!suggestions.find(x => x.id === s.id)) suggestions.push(s); });
      }
      if (suggestions.length === 0) return skillMaster.slice(0, 3);
      return suggestions.slice(0, 5);
    };

    const processChat = (userText) => {
      if (!userText.trim()) return;
      addUserMessage(userText);
      setChatInput("");
      setAiTyping(true);

      setTimeout(() => {
        setAiTyping(false);
        if (chatStep === 1) {
          setChatData(prev => ({ ...prev, name: userText.trim() }));
          addAiMessage(`「${userText.trim()}」ですね。\n\nこの職種の概要・役割を簡単に教えてください。\n例：クラウド基盤の設計・構築・運用を担当し、コスト最適化やセキュリティ対策も行う`);
          setChatStep(2);
        } else if (chatStep === 2) {
          setChatData(prev => ({ ...prev, description: userText.trim() }));
          const suggestions = suggestSkillsForCategory(chatData.name || userText);
          const suggestText = suggestions.length > 0
            ? `なるほど、よく理解できました。\n\nスキルマスタから、この職種に関連しそうなスキルをピックアップしました：\n\n${suggestions.map((s, i) => `${i + 1}. ${s.name}（${s.category}）- ${s.description}`).join("\n")}\n\n上記から必要なスキルの番号を選んでください（複数可：例「1, 3, 5」）。\nまた、上記にないスキルがあれば自由に入力してください。`
            : `なるほど、よく理解できました。\n\nスキルマスタに直接関連するスキルが見つかりませんでした。\nこの職種に必要なスキルを自由に入力してください（カンマ区切り）。\n例：Excel, 電話対応, 簿記, データ入力`;
          addAiMessage(suggestText, { skillSuggestions: suggestions });
          setChatStep(3);
        } else if (chatStep === 3) {
          const lastAiMsg = chatMessages.filter(m => m.role === "ai").pop();
          const suggestions = lastAiMsg?.skillSuggestions || [];
          const selectedSkills = [];
          const nums = userText.match(/\d+/g);
          if (nums) {
            nums.forEach(n => {
              const idx = parseInt(n) - 1;
              if (idx >= 0 && idx < suggestions.length) selectedSkills.push(suggestions[idx].name);
            });
          }
          const freeText = userText.replace(/\d+/g, "").replace(/[,、，\s]+/g, ",").split(",").map(s => s.trim()).filter(s => s.length > 0);
          freeText.forEach(t => { if (!selectedSkills.includes(t)) selectedSkills.push(t); });
          if (selectedSkills.length === 0) selectedSkills.push(userText.trim());
          setChatData(prev => ({ ...prev, skills: [...prev.skills, ...selectedSkills] }));
          addAiMessage(`以下のスキルを追加しました：\n${selectedSkills.map(s => `・${s}`).join("\n")}\n\nその他に追加したい要件はありますか？\n例えば：\n・必要経験年数（デフォルト：3年以上）\n・特定の資格要件\n・業務上の特記事項\n\n特になければ「なし」と入力してください。`);
          setChatStep(4);
        } else if (chatStep === 4) {
          const lower = userText.toLowerCase();
          if (lower === "なし" || lower === "特になし" || lower === "ない" || lower === "no" || lower === "ok") {
            // No additional reqs
          } else {
            const expMatch = userText.match(/(\d+)年/);
            if (expMatch) setChatData(prev => ({ ...prev, experience: `${expMatch[1]}年以上` }));
            setChatData(prev => ({ ...prev, additionalReqs: [...prev.additionalReqs, userText.trim()] }));
          }
          addAiMessage("ありがとうございます。さらに追加の要件やスキルはありますか？\n\n追加がなければ「完了」と入力してください。内容を確認します。");
          setChatStep(5);
        } else if (chatStep === 5) {
          const lower = userText.toLowerCase();
          if (lower === "完了" || lower === "done" || lower === "ok" || lower === "なし" || lower === "特になし" || lower === "ない") {
            setShowConfirm(true);
            addAiMessage("以下の内容で職種を作成します。確認してください。", { showConfirm: true });
            setChatStep(6);
          } else {
            const expMatch = userText.match(/(\d+)年/);
            if (expMatch) setChatData(prev => ({ ...prev, experience: `${expMatch[1]}年以上` }));
            const newSkillParts = userText.replace(/[,、，]+/g, ",").split(",").map(s => s.trim()).filter(s => s.length > 0);
            const skillsToAdd = newSkillParts.filter(s => !s.match(/^\d+年/) && s.length > 1);
            if (skillsToAdd.length > 0) {
              setChatData(prev => ({ ...prev, skills: [...prev.skills, ...skillsToAdd] }));
            } else {
              setChatData(prev => ({ ...prev, additionalReqs: [...prev.additionalReqs, userText.trim()] }));
            }
            addAiMessage(`追加しました。さらに追加の要件やスキルはありますか？\n\n追加がなければ「完了」と入力してください。`);
          }
        } else if (chatStep === 6) {
          addAiMessage("下の「この内容でJD・アセスメントを生成」ボタンを押してください。\n修正が必要な場合はお知らせください。");
        }
      }, 800 + Math.random() * 600);
    };

    const handleSkillChipClick = (skillName) => {
      if (!chatData.skills.includes(skillName)) {
        setChatData(prev => ({ ...prev, skills: [...prev.skills, skillName] }));
        addUserMessage(skillName);
        setAiTyping(true);
        setTimeout(() => {
          setAiTyping(false);
          addAiMessage(`「${skillName}」を追加しました。他にも選択したいスキルがあればクリックするか、自由入力してください。\n\n選択が完了したら次へ進みます。`);
        }, 500);
      }
    };

    const finalizeCategory = () => {
      setAiGenerating(true);
      addAiMessage("JDとアセスメントをAIで自動生成しています...", { generating: true });
      setTimeout(() => {
        const id = `JC-${String(jobCategories.length + 1).padStart(3, "0")}`;
        const allSkills = [...new Set(chatData.skills)];
        const areas = allSkills.length > 0 ? allSkills.slice(0, 6) : [chatData.name + "基礎", "実務スキル", "応用力"];
        const addlDesc = chatData.additionalReqs.length > 0 ? `\n\n【追加要件】\n${chatData.additionalReqs.join("\n")}` : "";
        const created = {
          id, name: chatData.name, description: chatData.description || `${chatData.name}の業務全般を担当`,
          skills: allSkills.length > 0 ? allSkills : [chatData.name],
          jd: {
            title: chatData.name,
            requiredSkills: allSkills.slice(0, 4),
            preferredSkills: allSkills.slice(4),
            experience: chatData.experience,
            description: `${chatData.name}として、${chatData.description || "プロジェクトの推進を担当"}します。${addlDesc}\n\n【求める人材像】\n${allSkills.slice(0, 3).join("・")}の実務経験を有し、チームと協調しながら業務を推進できる方。`
          },
          assessment: { passScore: chatData.passScore, questions: Math.max(10, Math.round(allSkills.length * 3 + 8)), duration: chatData.duration, areas },
          certifiedCandidates: []
        };
        setJobCategories(prev => [...prev, created]);
        setAiGenerating(false);
        setShowAddModal(false);
        setChatMessages([]);
        setChatStep(0);
        setSelectedJobCategory(created);
        navigate("job-category-detail");
      }, 2000);
    };

    return (
      <div>
        <PageHeader title="職種マスタ" subtitle={`${jobCategories.length}件の職種を管理`} actions={
          <button onClick={openAddModal} className="bg-[#e60023] text-white rounded-2xl px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-[#cc001f]"><Plus size={16}/>新規職種を追加</button>
        }/>
        <div className="grid grid-cols-1 gap-4">
          {jobCategories.map(jc => {
            const certified = jc.certifiedCandidates.length;
            const candidatesDetail = jc.certifiedCandidates.map(id => CANDIDATES.find(c => c.id === id)).filter(Boolean);
            return (
              <Card key={jc.id} className="p-5 cursor-pointer hover:shadow-md transition-all" onClick={() => { setSelectedJobCategory(jc); navigate("job-category-detail"); }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-medium" style={{backgroundColor: MORPHY.plumBlack}}>
                        <Layers size={18}/>
                      </span>
                      <div>
                        <h3 className="font-medium text-[#211922]">{jc.name}</h3>
                        <p className="text-xs text-[#91918c]">{jc.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {jc.skills.map(s => <span key={s} className="text-xs bg-[#f6f6f3] text-[#62625b] px-2 py-0.5 rounded-full border border-[#e5e5e0]">{s}</span>)}
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div><span className="text-xs text-[#91918c]">認定要員</span><p className="font-medium text-[#211922]">{certified}名</p></div>
                      <div><span className="text-xs text-[#91918c]">アセスメント</span><p className="font-medium text-[#211922]">{jc.assessment.questions}問 / {jc.assessment.duration}</p></div>
                      <div><span className="text-xs text-[#91918c]">合格ライン</span><p className="font-medium text-[#211922]">{jc.assessment.passScore}点以上</p></div>
                    </div>
                    {candidatesDetail.length > 0 && (
                      <div className="flex items-center gap-1 mt-3">
                        {candidatesDetail.slice(0, 5).map(c => <img key={c.id} src={c.photo} className="w-7 h-7 rounded-full object-cover border-2 border-white -ml-1 first:ml-0" alt=""/>)}
                        {candidatesDetail.length > 5 && <span className="text-xs text-[#91918c] ml-2">+{candidatesDetail.length - 5}名</span>}
                      </div>
                    )}
                  </div>
                  <ChevronRight size={20} className="text-[#91918c] mt-2"/>
                </div>
              </Card>
            );
          })}
        </div>

        {/* AI Chat Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col" style={{maxHeight: "85vh"}} onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{borderBottom: `1px solid ${MORPHY.cardBorder}`}}>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: MORPHY.warmWash}}>
                    <Sparkles size={16} style={{color: MORPHY.red}}/>
                  </span>
                  <div>
                    <h3 className="font-medium text-[#211922] text-sm">AIアシスタントで職種を作成</h3>
                    <p className="text-xs text-[#91918c]">会話しながら職種要件を定義できます</p>
                  </div>
                </div>
                <button onClick={() => setShowAddModal(false)} className="text-[#91918c] hover:text-[#211922] p-1"><X size={18}/></button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4" style={{minHeight: "300px"}}>
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "ai" && (
                      <div className="flex items-start gap-2.5 max-w-[85%]">
                        <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{backgroundColor: MORPHY.plumBlack}}>
                          <Sparkles size={12} className="text-white"/>
                        </span>
                        <div>
                          <div className="bg-[#f6f6f3] rounded-2xl rounded-tl-md px-4 py-3 text-sm text-[#211922] leading-relaxed whitespace-pre-line">
                            {msg.generating ? (
                              <span className="flex items-center gap-2"><RefreshCw size={14} className="animate-spin" style={{color: MORPHY.red}}/>{msg.text}</span>
                            ) : msg.text}
                          </div>
                          {msg.skillSuggestions && msg.skillSuggestions.length > 0 && chatStep === 3 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {msg.skillSuggestions.map(sk => (
                                <button key={sk.id} onClick={() => handleSkillChipClick(sk.name)}
                                  className={`inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full border transition-all ${chatData.skills.includes(sk.name) ? "bg-[#211922] text-white border-[#211922]" : "bg-white text-[#211922] border-[#e5e5e0] hover:border-[#211922] hover:bg-[#f6f6f3]"}`}>
                                  <Zap size={10}/>{sk.name}
                                  {chatData.skills.includes(sk.name) && <CheckCircle size={10}/>}
                                </button>
                              ))}
                            </div>
                          )}
                          {msg.showConfirm && (
                            <Card className="mt-3 p-4">
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <Layers size={14} style={{color: MORPHY.red}}/><span className="font-medium text-sm text-[#211922]">作成内容の確認</span>
                                </div>
                                <div className="text-sm space-y-2">
                                  <div><span className="text-xs text-[#91918c]">職種名</span><p className="font-medium">{chatData.name}</p></div>
                                  <div><span className="text-xs text-[#91918c]">説明</span><p>{chatData.description || "（未設定）"}</p></div>
                                  <div>
                                    <span className="text-xs text-[#91918c]">必要スキル</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {chatData.skills.map(s => <span key={s} className="text-xs bg-[#f6f6f3] text-[#211922] px-2 py-0.5 rounded-full border border-[#e5e5e0]">{s}</span>)}
                                      {chatData.skills.length === 0 && <span className="text-xs text-[#91918c]">（未設定）</span>}
                                    </div>
                                  </div>
                                  <div className="flex gap-4">
                                    <div><span className="text-xs text-[#91918c]">経験年数</span><p className="text-sm">{chatData.experience}</p></div>
                                    <div><span className="text-xs text-[#91918c]">合格ライン</span><p className="text-sm">{chatData.passScore}点</p></div>
                                    <div><span className="text-xs text-[#91918c]">試験時間</span><p className="text-sm">{chatData.duration}</p></div>
                                  </div>
                                  {chatData.additionalReqs.length > 0 && (
                                    <div><span className="text-xs text-[#91918c]">追加要件</span>{chatData.additionalReqs.map((r, ri) => <p key={ri} className="text-sm">・{r}</p>)}</div>
                                  )}
                                </div>
                                <button onClick={finalizeCategory} disabled={aiGenerating}
                                  className="w-full mt-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#e60023] text-white hover:bg-[#cc001f] disabled:opacity-50 flex items-center justify-center gap-2 transition-colors">
                                  {aiGenerating ? <><RefreshCw size={14} className="animate-spin"/>JD・アセスメントを生成中...</> : <><Sparkles size={14}/>この内容でJD・アセスメントを生成</>}
                                </button>
                              </div>
                            </Card>
                          )}
                        </div>
                      </div>
                    )}
                    {msg.role === "user" && (
                      <div className="max-w-[75%]">
                        <div className="rounded-2xl rounded-tr-md px-4 py-3 text-sm text-white leading-relaxed" style={{backgroundColor: MORPHY.plumBlack}}>
                          {msg.text}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {aiTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2.5">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: MORPHY.plumBlack}}>
                        <Sparkles size={12} className="text-white"/>
                      </span>
                      <div className="bg-[#f6f6f3] rounded-2xl rounded-tl-md px-4 py-3">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#91918c] animate-bounce" style={{animationDelay: "0ms"}}/>
                          <span className="w-2 h-2 rounded-full bg-[#91918c] animate-bounce" style={{animationDelay: "150ms"}}/>
                          <span className="w-2 h-2 rounded-full bg-[#91918c] animate-bounce" style={{animationDelay: "300ms"}}/>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef}/>
              </div>

              {/* Selected Skills Preview */}
              {chatData.skills.length > 0 && !showConfirm && (
                <div className="px-6 py-2 flex-shrink-0" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-[#91918c] flex-shrink-0">選択済みスキル:</span>
                    {chatData.skills.map(s => (
                      <span key={s} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border" style={{backgroundColor: MORPHY.warmWash, borderColor: MORPHY.cardBorder, color: MORPHY.plumBlack}}>
                        {s}
                        <button onClick={() => setChatData(prev => ({...prev, skills: prev.skills.filter(x => x !== s)}))} className="text-[#91918c] hover:text-[#211922]"><X size={9}/></button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              {chatStep > 0 && chatStep < 7 && !aiGenerating && (
                <div className="px-6 py-4 flex-shrink-0" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                  <div className="flex gap-2">
                    <input className="flex-1 border border-[#e5e5e0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1]"
                      placeholder={chatStep === 1 ? "職種名を入力..." : chatStep === 2 ? "職種の概要を入力..." : chatStep === 3 ? "番号またはスキル名を入力..." : "入力してください..."}
                      value={chatInput} onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && !aiTyping) { e.preventDefault(); processChat(chatInput); } }}
                      disabled={aiTyping}/>
                    <button onClick={() => processChat(chatInput)} disabled={!chatInput.trim() || aiTyping}
                      className="px-4 py-2.5 rounded-xl text-white flex items-center gap-1.5 text-sm font-medium disabled:opacity-40 transition-colors" style={{backgroundColor: MORPHY.plumBlack}}>
                      <Send size={14}/>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const JobCategoryDetailScreen = () => {
    const jc = selectedJobCategory;
    if (!jc) return <div className="text-center py-20"><p className="text-[#91918c] mb-4">職種が選択されていません</p><button onClick={goBack} className="px-4 py-2 rounded-lg text-sm bg-[#e60023] text-white hover:bg-[#cc001f]">戻る</button></div>;
    const certifiedCands = jc.certifiedCandidates.map(id => CANDIDATES.find(c => c.id === id)).filter(Boolean);
    const potentialCands = CANDIDATES.filter(c => !jc.certifiedCandidates.includes(c.id) && jc.skills.some(s => c.skills.some(cs => cs.name.toLowerCase().includes(s.toLowerCase())))).slice(0, 6);

    return (
      <div>
        <PageHeader title={jc.name} subtitle={`${jc.id} ・ ${jc.description}`} onBack={goBack}/>
        <div className="grid grid-cols-3 tf-grid-3 gap-6">
          <div className="col-span-2 space-y-5">
            {/* JD Section */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={16} style={{color: MORPHY.red}}/>
                <h3 className="font-medium text-[#211922]">職種JD（ジョブディスクリプション）</h3>
              </div>
              <div className="grid grid-cols-3 tf-grid-3 gap-4 text-sm mb-4">
                <div><span className="text-[#91918c] text-xs">必要経験</span><p className="font-medium">{jc.jd.experience}</p></div>
                <div><span className="text-[#91918c] text-xs">必須スキル</span><div className="flex flex-wrap gap-1 mt-1">{jc.jd.requiredSkills.map(s => <span key={s} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">{s}</span>)}</div></div>
                <div><span className="text-[#91918c] text-xs">歓迎スキル</span><div className="flex flex-wrap gap-1 mt-1">{jc.jd.preferredSkills.map(s => <span key={s} className="text-xs bg-[#f6f6f3] text-[#62625b] px-2 py-0.5 rounded-full">{s}</span>)}</div></div>
              </div>
              <div className="p-4 bg-[#f6f6f3]/60 rounded-lg text-sm text-[#62625b] leading-relaxed">{jc.jd.description}</div>
            </Card>

            {/* Assessment Section */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award size={16} style={{color: "#d97706"}}/>
                <h3 className="font-medium text-[#211922]">自動生成アセスメント</h3>
                <AIBadge/>
              </div>
              <div className="grid grid-cols-4 tf-grid-4 gap-4 text-sm mb-4">
                <div className="p-3 rounded-lg" style={{backgroundColor: MORPHY.warmWash}}><span className="text-[#91918c] text-xs">問題数</span><p className="font-medium text-[#211922]">{jc.assessment.questions}問</p></div>
                <div className="p-3 rounded-lg" style={{backgroundColor: MORPHY.warmWash}}><span className="text-[#91918c] text-xs">所要時間</span><p className="font-medium text-[#211922]">{jc.assessment.duration}</p></div>
                <div className="p-3 rounded-lg" style={{backgroundColor: MORPHY.warmWash}}><span className="text-[#91918c] text-xs">合格ライン</span><p className="font-medium text-[#211922]">{jc.assessment.passScore}点</p></div>
                <div className="p-3 rounded-lg" style={{backgroundColor: MORPHY.warmWash}}><span className="text-[#91918c] text-xs">合格者数</span><p className="font-medium text-green-600">{certifiedCands.length}名</p></div>
              </div>
              <div>
                <span className="text-xs text-[#91918c] mb-2 block">出題分野</span>
                <div className="flex flex-wrap gap-2">
                  {jc.assessment.areas.map(a => (
                    <span key={a} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{backgroundColor: MORPHY.warmWash, color: MORPHY.plumBlack, border: `1px solid ${MORPHY.cardBorder}`}}>{a}</span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Certified Candidates */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500"/>
                <h4 className="text-sm font-medium text-[#211922]">認定済み要員</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">{certifiedCands.length}名</span>
              </div>
              {certifiedCands.length === 0 ? (
                <Card className="p-4"><p className="text-sm text-[#91918c] text-center">認定済みの要員はいません</p></Card>
              ) : (
                <div className="space-y-2">
                  {certifiedCands.map(c => (
                    <Card key={c.id} className="p-4 cursor-pointer hover:shadow-sm transition-all" onClick={() => navigate("candidate-detail", { candidate: c })}>
                      <div className="flex items-center gap-3">
                        <CandidateAvatar candidate={c} size="sm"/>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[#211922]">{c.name}</div>
                          <div className="text-xs text-[#91918c]">{c.id} ・ 経験{c.totalYears}年 ・ {c.skills.slice(0, 3).map(s => s.name).join(", ")}</div>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-600 font-medium flex items-center gap-1"><CheckCircle size={12}/>認定</span>
                        <ChevronRight size={16} className="text-[#91918c]"/>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Potential Candidates */}
            {potentialCands.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: "#d97706"}}/>
                  <h4 className="text-sm font-medium text-[#211922]">受験候補（スキルマッチ）</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-medium">{potentialCands.length}名</span>
                </div>
                <div className="space-y-2">
                  {potentialCands.map(c => {
                    const matchedSkills = jc.skills.filter(s => c.skills.some(cs => cs.name.toLowerCase().includes(s.toLowerCase())));
                    return (
                      <Card key={c.id} className="p-4 cursor-pointer hover:shadow-sm transition-all" onClick={() => navigate("candidate-detail", { candidate: c })}>
                        <div className="flex items-center gap-3">
                          <CandidateAvatar candidate={c} size="sm"/>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-[#211922]">{c.name}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {matchedSkills.map(s => <span key={s} className="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full">{s}</span>)}
                            </div>
                          </div>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 font-medium">未受験</span>
                          <ChevronRight size={16} className="text-[#91918c]"/>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sticky top-4" style={{alignSelf: "flex-start"}}>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">職種概要</h3>
              <div className="space-y-3">
                {[{ label: "認定要員", value: certifiedCands.length, color: "#15803d" }, { label: "受験候補", value: potentialCands.length, color: "#d97706" }].map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-sm text-[#62625b] flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{background: s.color}}/>{s.label}</span>
                    <span className="font-medium" style={{color: s.color}}>{s.value}名</span>
                  </div>
                ))}
                <hr className="my-2 border-[#e5e5e0]"/>
                <div className="text-xs text-[#91918c]">
                  要員のマイページのアセスメント画面からこの職種のアセスメントを受験できます。合格すると自動的に職種タグが付与されます。
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">必要スキルセット</h3>
              <div className="space-y-2">
                {jc.skills.map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <CheckCircle size={12} style={{color: "#15803d"}}/>
                    <span className="text-sm text-[#211922]">{s}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // SKILL MASTER (Admin)
  // ============================================================
  const SkillMasterScreen = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [newSk, setNewSk] = useState({ name: "", category: "クラウド", description: "", passScore: 70, duration: "25分" });
    const [certInput, setCertInput] = useState("");
    const [certTags, setCertTags] = useState([]);
    const [aiGen, setAiGen] = useState(false);

    const addCertTag = () => { if (certInput.trim() && !certTags.includes(certInput.trim())) { setCertTags(prev => [...prev, certInput.trim()]); setCertInput(""); } };

    const saveSkill = () => {
      if (!newSk.name.trim()) return;
      setAiGen(true);
      setTimeout(() => {
        const id = `SK-${String(skillMaster.length + 1).padStart(3, "0")}`;
        const created = {
          id, name: newSk.name, category: newSk.category, description: newSk.description || `${newSk.name}に関する専門能力`,
          requiredCerts: certTags, assessment: { passScore: Number(newSk.passScore), questions: 12 + Math.round(Math.random() * 6), duration: newSk.duration, areas: [newSk.name + "基礎", "応用", "実践"] },
          certifiedCandidates: []
        };
        setSkillMaster(prev => [...prev, created]);
        setAiGen(false); setShowAddModal(false);
        setNewSk({ name: "", category: "クラウド", description: "", passScore: 70, duration: "25分" }); setCertTags([]);
        setSelectedSkill(created); navigate("skill-master-detail");
      }, 1200);
    };

    const categories = [...new Set(skillMaster.map(s => s.category))];

    return (
      <div>
        <PageHeader title="スキルマスタ" subtitle={`${skillMaster.length}件のスキルを管理`} actions={
          <button onClick={() => setShowAddModal(true)} className="bg-[#e60023] text-white rounded-2xl px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-[#cc001f]"><Plus size={16}/>新規スキルを追加</button>
        }/>
        {categories.map(cat => (
          <div key={cat} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} style={{color: MORPHY.red}}/>
              <h3 className="text-sm font-medium text-[#211922]">{cat}</h3>
              <span className="text-xs text-[#91918c]">{skillMaster.filter(s => s.category === cat).length}件</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {skillMaster.filter(s => s.category === cat).map(sk => {
                const certCands = sk.certifiedCandidates.map(id => CANDIDATES.find(c => c.id === id)).filter(Boolean);
                return (
                  <Card key={sk.id} className="p-4 cursor-pointer hover:shadow-md transition-all" onClick={() => { setSelectedSkill(sk); navigate("skill-master-detail"); }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="w-9 h-9 rounded-lg flex items-center justify-center" style={{backgroundColor: MORPHY.warmWash, border: `1px solid ${MORPHY.cardBorder}`}}><Zap size={16} style={{color: MORPHY.plumBlack}}/></span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[#211922]">{sk.name}</div>
                          <div className="text-xs text-[#91918c]">{sk.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 flex-shrink-0">
                        <div className="text-center"><div className="text-xs text-[#91918c]">認定者</div><div className="text-sm font-medium text-[#211922]">{sk.certifiedCandidates.length}名</div></div>
                        <div className="text-center"><div className="text-xs text-[#91918c]">必要資格</div><div className="text-sm font-medium text-[#211922]">{sk.requiredCerts.length}件</div></div>
                        <div className="text-center"><div className="text-xs text-[#91918c]">合格ライン</div><div className="text-sm font-medium text-[#211922]">{sk.assessment.passScore}点</div></div>
                        {certCands.length > 0 && (
                          <div className="flex items-center -space-x-1">
                            {certCands.slice(0, 3).map(c => <img key={c.id} src={c.photo} className="w-6 h-6 rounded-full object-cover border-2 border-white" alt=""/>)}
                            {certCands.length > 3 && <span className="text-xs text-[#91918c] ml-2">+{certCands.length - 3}</span>}
                          </div>
                        )}
                        <ChevronRight size={16} className="text-[#91918c]"/>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4" style={{borderBottom: `1px solid ${MORPHY.cardBorder}`}}>
                <h3 className="font-medium text-[#211922] flex items-center gap-2"><Zap size={16} style={{color: MORPHY.red}}/>新規スキルを追加</h3>
                <button onClick={() => setShowAddModal(false)} className="text-[#91918c] hover:text-[#211922]"><X size={18}/></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-[#91918c] mb-1 block">スキル名 *</label>
                    <input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1]" placeholder="例：Terraform" value={newSk.name} onChange={e => setNewSk({...newSk, name: e.target.value})}/></div>
                  <div><label className="text-xs font-medium text-[#91918c] mb-1 block">カテゴリ</label>
                    <select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm" value={newSk.category} onChange={e => setNewSk({...newSk, category: e.target.value})}>
                      {["事務", "経理", "言語", "IT", "ビジネススキル", "人事", "営業", "製造・物流", "その他"].map(c => <option key={c}>{c}</option>)}
                    </select></div>
                </div>
                <div><label className="text-xs font-medium text-[#91918c] mb-1 block">説明</label>
                  <input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1]" placeholder="スキルの概要" value={newSk.description} onChange={e => setNewSk({...newSk, description: e.target.value})}/></div>
                <div>
                  <label className="text-xs font-medium text-[#91918c] mb-1 block">必要資格（この資格を持つ要員が受験可能）</label>
                  <div className="flex gap-2 mb-2">
                    <input className="flex-1 border border-[#e5e5e0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1]" placeholder="資格名を入力してEnter" value={certInput} onChange={e => setCertInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addCertTag(); } }}/>
                    <button onClick={addCertTag} className="px-3 py-2 rounded-lg text-sm border border-[#e5e5e0] hover:bg-[#f6f6f3]"><Plus size={14}/></button>
                  </div>
                  {certTags.length > 0 && <div className="flex flex-wrap gap-1.5">{certTags.map(t => (
                    <span key={t} className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200">{t}<button onClick={() => setCertTags(prev => prev.filter(x => x !== t))} className="hover:text-amber-900"><X size={10}/></button></span>
                  ))}</div>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-[#91918c] mb-1 block">合格ライン</label>
                    <select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm" value={newSk.passScore} onChange={e => setNewSk({...newSk, passScore: e.target.value})}>{[60,65,70,75,80].map(v => <option key={v} value={v}>{v}点</option>)}</select></div>
                  <div><label className="text-xs font-medium text-[#91918c] mb-1 block">試験時間</label>
                    <select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm" value={newSk.duration} onChange={e => setNewSk({...newSk, duration: e.target.value})}>{["15分","20分","25分","30分","40分"].map(v => <option key={v}>{v}</option>)}</select></div>
                </div>
                <div className="p-3 rounded-lg flex items-start gap-2" style={{backgroundColor: MORPHY.warmWash}}>
                  <Sparkles size={14} className="flex-shrink-0 mt-0.5" style={{color: "#d97706"}}/>
                  <p className="text-xs text-[#62625b]">保存すると、スキル要件と必要資格を基にアセスメントがAIにより自動生成されます。必要資格を保有する要員がアセスメント画面から受験できます。</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 px-6 py-4" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2.5 rounded-lg text-sm font-medium border border-[#e5e5e0] hover:bg-[#f6f6f3] text-[#62625b]">キャンセル</button>
                <button onClick={saveSkill} disabled={!newSk.name.trim() || aiGen} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white hover:bg-[#cc001f] disabled:opacity-50 flex items-center gap-2">
                  {aiGen ? <><RefreshCw size={14} className="animate-spin"/>生成中...</> : <><Sparkles size={14}/>アセスメントを自動生成して保存</>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SkillMasterDetailScreen = () => {
    const sk = selectedSkill;
    if (!sk) return <div className="text-center py-20"><p className="text-[#91918c] mb-4">スキルが選択されていません</p><button onClick={goBack} className="px-4 py-2 rounded-lg text-sm bg-[#e60023] text-white hover:bg-[#cc001f]">戻る</button></div>;
    const certifiedCands = sk.certifiedCandidates.map(id => CANDIDATES.find(c => c.id === id)).filter(Boolean);
    const eligibleCands = CANDIDATES.filter(c => !sk.certifiedCandidates.includes(c.id) && sk.requiredCerts.some(rc => (c.certifications || []).some(cc => cc.includes(rc.replace(/ (Professional|Associate|Specialty)/, "")))));

    return (
      <div>
        <PageHeader title={sk.name} subtitle={`${sk.id} ・ ${sk.category} ・ ${sk.description}`} onBack={goBack}/>
        <div className="grid grid-cols-3 tf-grid-3 gap-6">
          <div className="col-span-2 space-y-5">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4"><FileText size={16} style={{color: MORPHY.red}}/><h3 className="font-medium text-[#211922]">スキル要件</h3></div>
              <p className="text-sm text-[#62625b] mb-4">{sk.description}</p>
              <div><span className="text-xs text-[#91918c] mb-2 block">必要資格（いずれかを保有で受験可能）</span>
                <div className="flex flex-wrap gap-2">{sk.requiredCerts.map(c => <span key={c} className="text-xs px-3 py-1.5 rounded-lg font-medium bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1"><Award size={11}/>{c}</span>)}</div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4"><Award size={16} style={{color: "#d97706"}}/><h3 className="font-medium text-[#211922]">自動生成アセスメント</h3><AIBadge/></div>
              <div className="grid grid-cols-4 tf-grid-4 gap-4 text-sm mb-4">
                <div className="p-3 rounded-lg" style={{backgroundColor: MORPHY.warmWash}}><span className="text-[#91918c] text-xs">問題数</span><p className="font-medium text-[#211922]">{sk.assessment.questions}問</p></div>
                <div className="p-3 rounded-lg" style={{backgroundColor: MORPHY.warmWash}}><span className="text-[#91918c] text-xs">所要時間</span><p className="font-medium text-[#211922]">{sk.assessment.duration}</p></div>
                <div className="p-3 rounded-lg" style={{backgroundColor: MORPHY.warmWash}}><span className="text-[#91918c] text-xs">合格ライン</span><p className="font-medium text-[#211922]">{sk.assessment.passScore}点</p></div>
                <div className="p-3 rounded-lg" style={{backgroundColor: MORPHY.warmWash}}><span className="text-[#91918c] text-xs">合格者数</span><p className="font-medium text-green-600">{certifiedCands.length}名</p></div>
              </div>
              <div><span className="text-xs text-[#91918c] mb-2 block">出題分野</span>
                <div className="flex flex-wrap gap-2">{sk.assessment.areas.map(a => <span key={a} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{backgroundColor: MORPHY.warmWash, color: MORPHY.plumBlack, border: `1px solid ${MORPHY.cardBorder}`}}>{a}</span>)}</div>
              </div>
            </Card>
            <div>
              <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full bg-green-500"/><h4 className="text-sm font-medium text-[#211922]">認定済み要員</h4><span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">{certifiedCands.length}名</span></div>
              {certifiedCands.length === 0 ? <Card className="p-4"><p className="text-sm text-[#91918c] text-center">認定済みの要員はいません</p></Card> : (
                <div className="space-y-2">{certifiedCands.map(c => (
                  <Card key={c.id} className="p-4 cursor-pointer hover:shadow-sm transition-all" onClick={() => navigate("candidate-detail", { candidate: c })}>
                    <div className="flex items-center gap-3"><CandidateAvatar candidate={c} size="sm"/>
                      <div className="flex-1 min-w-0"><div className="text-sm font-medium text-[#211922]">{c.name}</div><div className="text-xs text-[#91918c]">{c.id} ・ 経験{c.totalYears}年</div></div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-600 font-medium flex items-center gap-1"><CheckCircle size={12}/>認定</span><ChevronRight size={16} className="text-[#91918c]"/>
                    </div>
                  </Card>
                ))}</div>
              )}
            </div>
            {eligibleCands.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full" style={{backgroundColor: "#d97706"}}/><h4 className="text-sm font-medium text-[#211922]">受験資格あり（未受験）</h4><span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-medium">{eligibleCands.length}名</span></div>
                <div className="space-y-2">{eligibleCands.map(c => {
                  const matchedCerts = sk.requiredCerts.filter(rc => (c.certifications || []).some(cc => cc.includes(rc.replace(/ (Professional|Associate|Specialty)/, ""))));
                  return (
                    <Card key={c.id} className="p-4 cursor-pointer hover:shadow-sm transition-all" onClick={() => navigate("candidate-detail", { candidate: c })}>
                      <div className="flex items-center gap-3"><CandidateAvatar candidate={c} size="sm"/>
                        <div className="flex-1 min-w-0"><div className="text-sm font-medium text-[#211922]">{c.name}</div>
                          <div className="flex flex-wrap gap-1 mt-1">{matchedCerts.map(cert => <span key={cert} className="text-xs bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full">{cert}</span>)}</div>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 font-medium">未受験</span><ChevronRight size={16} className="text-[#91918c]"/>
                      </div>
                    </Card>
                  );
                })}</div>
              </div>
            )}
          </div>
          <div className="space-y-4 sticky top-4" style={{alignSelf: "flex-start"}}>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">概要</h3>
              <div className="space-y-3">
                {[{ label: "認定者", value: certifiedCands.length, color: "#15803d" }, { label: "受験可能（未受験）", value: eligibleCands.length, color: "#d97706" }].map(s => (
                  <div key={s.label} className="flex items-center justify-between"><span className="text-sm text-[#62625b] flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{background: s.color}}/>{s.label}</span><span className="font-medium" style={{color: s.color}}>{s.value}名</span></div>
                ))}
                <hr className="my-2 border-[#e5e5e0]"/>
                <div className="text-xs text-[#91918c]">必要資格を保有する要員が、要員のマイページのアセスメント画面からこのスキルアセスメントを受験できます。合格するとスキルタグが付与されます。</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // ======== Sales JD List Screen (replaces DealsScreen) ========
  const SalesJDListScreen = () => {
    const [customerFilter, setCustomerFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState(defaultFilter === "pending-ir" ? "pending-ir" : defaultFilter === "active" ? "active" : "all");
    React.useEffect(() => { if (defaultFilter) { setStatusFilter(defaultFilter === "pending-ir" ? "pending-ir" : defaultFilter === "active" ? "active" : "all"); setDefaultFilter(null); } }, [defaultFilter]);
    const allJDs = [
      ...JDS.map(j => ({...j, _savedId: j.id, _savedAt: "2026/04/01 10:00", _customerName: jdCustomerMap[j.id] || "未割当"})),
      ...savedJDs.map(j => ({...j, _customerName: jdCustomerMap[j.id] || jdCustomerMap[j._savedId] || "顧客作成"}))
    ];
    const customers = [...new Set(allJDs.map(j => j._customerName))];
    const pendingIRs = (jdId) => interviewRequests.filter(sr => sr.jdId === jdId && sr.status === "未対応").length;
    const filtered = allJDs.filter(j => {
      if (customerFilter !== "all" && j._customerName !== customerFilter) return false;
      if (statusFilter === "active" && (jdStatuses[j.id] || jdStatuses[j._savedId] || "募集中") !== "募集中") return false;
      if (statusFilter === "pending-ir" && !(pendingIRs(j.id) > 0 || pendingIRs(j._savedId) > 0)) return false;
      return true;
    });

    const statusTabs = [
      { id: "all", label: "すべて", count: allJDs.length },
      { id: "active", label: "募集中", count: allJDs.filter(j => (jdStatuses[j.id] || jdStatuses[j._savedId] || "募集中") === "募集中").length },
      { id: "pending-ir", label: "未対応リクエストあり", count: allJDs.filter(j => pendingIRs(j.id) > 0 || pendingIRs(j._savedId) > 0).length }
    ];

    return (
      <div>
        <PageHeader title="募集一覧" subtitle={`全${allJDs.length}件の募集（${customers.length}社）`}/>
        <Card className="p-4 mb-5">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {statusTabs.map(t => (
              <button key={t.id} onClick={() => setStatusFilter(t.id)} className={`text-xs px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${statusFilter === t.id ? "bg-[#e60023] text-white hover:bg-[#cc001f]" : "bg-[#f6f6f3] text-[#62625b] hover:bg-[#e5e5e0]"}`}>{t.label}<span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusFilter === t.id ? "bg-white/20" : "bg-[#e5e5e0]"}`}>{t.count}</span></button>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-[#91918c]">顧客:</span>
            <button onClick={() => setCustomerFilter("all")} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${customerFilter === "all" ? "bg-[#211922] text-white" : "bg-[#f6f6f3] text-[#62625b] hover:bg-[#e5e5e0]"}`}>すべて</button>
            {customers.map(c => (
              <button key={c} onClick={() => setCustomerFilter(c)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${customerFilter === c ? "bg-[#211922] text-white" : "bg-[#f6f6f3] text-[#62625b] hover:bg-[#e5e5e0]"}`}>{c}</button>
            ))}
          </div>
        </Card>
        <div className="space-y-3 pb-20">
          {filtered.map((jd, i) => {
            const st = jdStatuses[jd.id] || jdStatuses[jd._savedId] || "募集中";
            const pending = pendingIRs(jd.id) || pendingIRs(jd._savedId);
            return (
              <Card key={jd._savedId || i} className="p-5 cursor-pointer transition-all hover:translate-y-[-1px]" onClick={() => { setEditingJD(jd); navigate("sales-jd-detail"); }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-[#211922] truncate">{jd.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{background: st === "募集中" ? "#f0fdf4" : "#f3f4f6", color: st === "募集中" ? "#15803d" : "#6b7280", border: `1px solid ${st === "募集中" ? "#bbf7d0" : "#d1d5db"}`}}>{st}</span>
                      {pending > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1" style={{background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca"}}>
                          <AlertCircle size={10}/>未対応 {pending}件
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{background: MORPHY.fog, border: `1px solid ${MORPHY.cardBorder}`, color: MORPHY.plumBlack}}>
                        <Building2 size={10}/>{jd._customerName}
                      </span>
                    </div>
                    <p className="text-xs text-[#91918c] line-clamp-1 mb-1.5">{jd.aiSummary || jd.description}</p>
                    <div className="flex items-center gap-3 text-xs text-[#91918c]">
                      <span className="flex items-center gap-1"><MapPin size={12}/>{jd.location}</span>
                      <span className="flex items-center gap-1"><Monitor size={12}/>{jd.remote}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/>{jd.experience}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <ChevronRight size={16} style={{color: MORPHY.warmSilver}}/>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // ======== Sales JD Detail Screen (replaces DealDetailScreen) ========
  const SalesJDDetailScreen = () => {
    const jd = editingJD;
    if (!jd) return <div className="text-center py-20"><p className="text-[#91918c] mb-4">募集が選択されていません</p><button onClick={goBack} className="px-4 py-2 rounded-lg text-sm bg-[#e60023] text-white hover:bg-[#cc001f]">戻る</button></div>;
    const jdKey = jd.id || jd._savedId;
    const customerName = jdCustomerMap[jdKey] || jd._customerName || "顧客";
    const st = jdStatuses[jdKey] || "募集中";
    const assmt = jdAssessments[jd.id] || jdAssessments[jd._savedId];

    // Scout requests for this JD
    const jdIRs = interviewRequests.filter(sr => sr.jdId === jdKey);
    const pendingIRs = jdIRs.filter(sr => sr.status === "未対応");

    // Candidates: sales-proposed + customer-added
    const customerAddedIds = jdCandidateAdditions[jdKey] || new Set();
    const salesCandidates = CANDIDATES.filter(c => c.status !== "就業中" && !customerAddedIds.has(c.id)).map(c => ({ ...c, match: calcMatchScore(c, jd) })).sort((a, b) => b.match.current - a.match.current).slice(0, 5);
    const customerCandidates = CANDIDATES.filter(c => customerAddedIds.has(c.id)).map(c => ({ ...c, match: calcMatchScore(c, jd) }));

    const [candidateTab, setCandidateTab] = useState("sales");
    const [recommendComment, setRecommendComment] = useState({});

    // Proposal email state
    const [proposalModal, setProposalModal] = useState(null);
    const [proposalStep, setProposalStep] = useState("edit");
    const [emailDraft, setEmailDraft] = useState(null);

    // Response email for interview requests (回答メール)
    const [responseEmailTarget, setResponseEmailTarget] = useState(null); // interview request being responded to
    const [responseEmailDraft, setResponseEmailDraft] = useState(null);
    const [responseEmailStep, setResponseEmailStep] = useState("edit"); // "edit" | "sending" | "sent"

    const sendResponseEmail = () => {
      setResponseEmailStep("sending");
      setTimeout(() => {
        setResponseEmailStep("sent");
        if (responseEmailTarget) updateInterviewRequestStatus(responseEmailTarget.id, "回答メール送信済");
        showToast("メールを送信しました");
      }, 1500);
    };

    const generateEmailTemplate = (candidates) => {
      const candList = candidates.map((c, i) => {
        const topSkills = c.skills.slice(0, 4).map(s => s.name).join("、");
        const matchPct = c.match?.current || 80;
        return `【候補者${i + 1}】候補者ID: ${c.id}\n  経験年数: ${c.totalYears}年\n  主要スキル: ${topSkills}\n  マッチ度: ${matchPct}%\n  勤務条件: ${c.location} / ${c.workCondition}`;
      }).join("\n\n");
      return {
        to: `${customerName} ご担当者様`,
        subject: `【人材ご提案】${jd.title} - ${candidates.length}名のご紹介`,
        body: `${customerName}\nご担当者様\n\nいつもお世話になっております。\nTalentFlow営業部です。\n\n「${jd.title}」の件につきまして、下記の通り候補者をご提案させていただきます。\n\n${"─".repeat(40)}\n\n${candList}\n\n${"─".repeat(40)}\n\n各候補者の職務経歴書（ブラインドレジュメ）を添付しておりますので、\nご確認のうえ、面談をご希望される方がいらっしゃいましたらお知らせください。\n\nどうぞよろしくお願いいたします。`,
        attachments: candidates.map(c => ({ id: c.id, name: `職務経歴書_${c.id}_ブラインド.pdf`, candidate: c, type: "blind" }))
      };
    };

    const openProposalBulk = () => {
      const tpl = generateEmailTemplate(salesCandidates);
      setProposalModal({ candidates: salesCandidates, email: tpl });
      setEmailDraft(tpl);
      setProposalStep("edit");
    };

    const sendProposal = () => {
      setProposalStep("sending");
      setTimeout(() => setProposalStep("sent"), 1800);
    };

    return (
      <div>
        <PageHeader title={jd.title} subtitle={`${customerName} ・ ${jdKey}`} onBack={goBack} actions={
          <button onClick={() => { setSelectedJD(jd); setSearchMode("jd"); navigate("search"); }} className="px-4 py-2 rounded-lg text-sm font-medium border flex items-center gap-2 transition-colors hover:bg-[#f6f6f3]" style={{borderColor: MORPHY.cardBorder, color: MORPHY.plumBlack}}><Search size={14}/>候補者を探す</button>
        }/>
        <div className="grid grid-cols-3 tf-grid-3 gap-6">
          <div className="col-span-2 space-y-5">
            {/* JD Overview */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4"><FileText size={16} style={{color: MORPHY.red}}/><h3 className="font-medium text-[#211922]">募集要項</h3></div>
              <div className="grid grid-cols-2 tf-grid-2 gap-4 mb-4">
                <div><span className="text-xs text-[#91918c]">必須スキル</span><div className="flex flex-wrap gap-1 mt-1">{(jd.requiredSkills || jd.skillMust || []).map(s => <span key={s} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">{s}</span>)}</div></div>
                <div><span className="text-xs text-[#91918c]">歓迎スキル</span><div className="flex flex-wrap gap-1 mt-1">{(jd.preferredSkills || jd.skillWant || []).map(s => <span key={s} className="text-xs bg-[#f6f6f3] text-[#62625b] px-2 py-0.5 rounded-full">{s}</span>)}</div></div>
              </div>
              <div className="grid grid-cols-3 tf-grid-3 gap-4 text-sm">
                <div><span className="text-xs text-[#91918c]">経験年数</span><p className="font-medium mt-0.5">{jd.experience}</p></div>
                <div><span className="text-xs text-[#91918c]">勤務地</span><p className="font-medium mt-0.5">{jd.location}</p></div>
                <div><span className="text-xs text-[#91918c]">リモート</span><p className="font-medium mt-0.5">{jd.remote}</p></div>
              </div>
            </Card>

            {/* Interview Requests from Customer (面談リクエスト) */}
            {jdIRs.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle size={16} style={{color: pendingIRs.length > 0 ? "#dc2626" : MORPHY.plumBlack}}/>
                  <h3 className="font-medium text-[#211922]">面談リクエスト</h3>
                  {pendingIRs.length > 0 && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca"}}>{pendingIRs.length}件未対応</span>}
                </div>
                <div className="space-y-3">
                  {jdIRs.map(sr => {
                    const cand = CANDIDATES.find(c => c.id === sr.candidateId);
                    const arForCand = assessmentRequests.find(ar => ar.jdId === jdKey && ar.candidateId === sr.candidateId);
                    return (
                      <div key={sr.id} className="p-4 rounded-xl" style={{backgroundColor: sr.status === "未対応" ? "#fef2f2" : "#f0fdf4", border: `1px solid ${sr.status === "未対応" ? "#fecaca" : "#bbf7d0"}`}}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[#211922]">{cand?.name || sr.candidateId}</span>
                            {cand && <span className="text-xs text-[#91918c]">経験{cand.totalYears}年 ・ {cand.skills.slice(0,2).map(s=>s.name).join("・")}</span>}
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{background: sr.source === "sales-proposed" ? "#eff6ff" : "#f6f6f3", color: sr.source === "sales-proposed" ? "#1d4ed8" : "#62625b", border: `1px solid ${sr.source === "sales-proposed" ? "#bfdbfe" : "#e5e5e0"}`}}>{sr.source === "sales-proposed" ? "営業提案" : "顧客発見"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${sr.status === "未対応" ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>{sr.status}</span>
                          {sr.status === "未対応" && (
                            <button onClick={() => { setResponseEmailTarget(sr); setResponseEmailDraft({ to: `${sr.customerName} ご担当者様`, subject: `【面談候補者ご紹介】${jd.title} - ${cand?.name || sr.candidateId}`, body: `${sr.customerName}\nご担当者様\n\nいつもお世話になっております。\nTalentFlow営業部です。\n\n「${jd.title}」に関する面談リクエストの件、ありがとうございます。\n\n下記候補者の職務経歴書をお送りいたします。\n\n${"─".repeat(30)}\n候補者: ${cand?.name || sr.candidateId}\n経験年数: ${cand?.totalYears || "-"}年\n主要スキル: ${cand?.skills.slice(0,4).map(s=>s.name).join("、") || "-"}\n勤務条件: ${cand?.location || "-"} / ${cand?.workCondition || "-"}\n${"─".repeat(30)}\n\n面談日程の調整等、ご希望がございましたらお知らせください。\nどうぞよろしくお願いいたします。`, attachResume: true }); }} className="text-xs px-3 py-1.5 rounded-full bg-[#e60023] text-white flex items-center gap-1 hover:bg-[#cc001f] transition-colors"><Mail size={11}/>回答メールを送信</button>
                          )}
                          {sr.feedback && (
                            <span className={`text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1 ${sr.feedback.result === "採用希望" ? "bg-green-50 text-green-700 border border-green-200" : sr.feedback.result === "見送り" ? "bg-red-50 text-red-700 border border-red-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                              <MessageSquare size={11}/>顧客FB: {sr.feedback.result}
                            </span>
                          )}
                          {!arForCand && (
                            <button onClick={() => openAssessmentDeadlineModal(jdKey, sr.candidateId, `${jd.title}アセスメント`)} className="text-xs px-3 py-1.5 rounded-full border border-purple-200 text-purple-700 bg-purple-50 flex items-center gap-1 hover:bg-purple-100 transition-colors"><ClipboardList size={11}/>アセスメント依頼</button>
                          )}
                          {arForCand && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200">アセスメント{arForCand.status === "完了" ? `済(${arForCand.score}点)` : "依頼済"}</span>}
                          <button onClick={() => navigate("candidate-detail", { candidate: cand })} className="text-xs px-3 py-1.5 rounded-full text-[#62625b] border border-[#e5e5e0] hover:bg-[#f6f6f3] ml-auto flex items-center gap-1"><Eye size={11}/>詳細</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* Candidate Tabs: Sales Proposed / Customer Added */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 p-1 bg-[#e5e5e0]/50 rounded-lg">
                  <button onClick={() => setCandidateTab("sales")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${candidateTab === "sales" ? "bg-white shadow-sm text-[#211922]" : "text-[#91918c]"}`}>営業提案 ({salesCandidates.length})</button>
                  <button onClick={() => setCandidateTab("customer")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${candidateTab === "customer" ? "bg-white shadow-sm text-[#211922]" : "text-[#91918c]"}`}>
                    顧客追加 ({customerCandidates.length})
                    {customerCandidates.length > 0 && <span className="ml-1 w-2 h-2 rounded-full inline-block" style={{background: "#6d28d9"}}/>}
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {(candidateTab === "sales" ? salesCandidates : customerCandidates).map(c => {
                  const cAssmt = assmt?.results?.[c.id];
                  return (
                    <div key={c.id} className="p-4 rounded-xl cursor-pointer hover:shadow-md transition-all" style={{backgroundColor: MORPHY.fog, border: `1px solid ${MORPHY.cardBorder}`}} onClick={() => navigate("candidate-detail", { candidate: c })}>
                      <div className="flex items-center gap-4">
                        <CandidateAvatar candidate={c} size="md"/>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-[#211922]">{c.name}（{c.id}）</span>
                            <EmploymentBadge type={c.employmentType}/>
                            <span className="text-xs text-[#91918c]">経験{c.totalYears}年</span>
                            <StatusBadge status={candidateStatuses[c.id] || c.status}/>
                          </div>
                          <div className="flex flex-wrap gap-1">{c.skills.slice(0, 4).map(s => <span key={s.name} className="text-xs px-2 py-0.5 rounded-full bg-white border border-[#e5e5e0] text-[#62625b]">{s.name}</span>)}</div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {(() => { const arForC = assessmentRequests.find(ar => ar.jdId === jdKey && ar.candidateId === c.id); return arForC ? (
                            <div className="text-center p-2 rounded-lg" style={{backgroundColor: arForC.status === "完了" ? (arForC.score >= 70 ? "#f0fdf4" : "#fef2f2") : "#f5f3ff", border: `1px solid ${arForC.status === "完了" ? (arForC.score >= 70 ? "#bbf7d0" : "#fecaca") : "#ddd6fe"}`, minWidth: "70px"}}>
                              {arForC.status === "完了" ? <div className="text-lg font-bold" style={{color: arForC.score >= 70 ? "#15803d" : "#dc2626"}}>{arForC.score}<span className="text-xs font-normal">点</span></div> : <div className="text-xs text-purple-600 font-medium">依頼済み</div>}
                            </div>
                          ) : (
                            <button onClick={e => { e.stopPropagation(); openAssessmentDeadlineModal(jdKey, c.id, `${jd.title}アセスメント`); }} className="text-xs px-3 py-1.5 rounded-lg border border-purple-200 text-purple-700 bg-purple-50 flex items-center gap-1 hover:bg-purple-100 transition-colors"><ClipboardList size={11}/>アセスメント依頼</button>
                          ); })()}
                          <div className="text-right">
                            <div className="text-xs text-[#91918c]">マッチ度</div>
                            <span className="text-lg font-bold" style={{color: MORPHY.red}}>{c.match.current}%</span>
                          </div>
                          <ChevronRight size={16} className="text-[#91918c]"/>
                        </div>
                      </div>
                      {/* Recommendation comment input for sales-proposed candidates */}
                      {candidateTab === "sales" && (
                        <div className="mt-3 flex items-start gap-2" onClick={e => e.stopPropagation()}>
                          <MessageSquare size={13} className="mt-2 flex-shrink-0" style={{color: "#1d4ed8"}}/>
                          <input type="text" placeholder="推薦コメントを入力..." value={recommendComment[c.id] || ""} onChange={e => setRecommendComment(prev => ({...prev, [c.id]: e.target.value}))}
                            className="flex-1 text-xs border border-[#e5e5e0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1]" />
                        </div>
                      )}
                    </div>
                  );
                })}
                {(candidateTab === "sales" ? salesCandidates : customerCandidates).length === 0 && (
                  <div className="text-center py-8 text-sm text-[#91918c]">{candidateTab === "sales" ? "まだ候補者を提案していません" : "顧客からの追加候補者はありません"}</div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">募集ステータス</h3>
              <div className="text-center py-2"><span className="px-4 py-2 rounded-lg text-sm font-medium" style={{background: st === "募集中" ? "#f0fdf4" : "#f3f4f6", color: st === "募集中" ? "#15803d" : "#6b7280"}}>{st}</span></div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#91918c]">顧客</span><span className="font-medium">{customerName}</span></div>
                <div className="flex justify-between"><span className="text-[#91918c]">勤務地</span><span className="font-medium">{jd.location}</span></div>
                <div className="flex justify-between"><span className="text-[#91918c]">リモート</span><span className="font-medium">{jd.remote}</span></div>
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3 flex items-center gap-1.5"><Users size={14}/>候補者状況</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#91918c]">営業提案</span><span className="font-medium" style={{color: "#1d4ed8"}}>{salesCandidates.length}名</span></div>
                <div className="flex justify-between"><span className="text-[#91918c]">顧客追加</span><span className="font-medium" style={{color: "#6d28d9"}}>{customerCandidates.length}名</span></div>
                <div className="flex justify-between"><span className="text-[#91918c]">面談リクエスト（未対応）</span><span className="font-medium" style={{color: pendingIRs.length > 0 ? "#dc2626" : "#91918c"}}>{pendingIRs.length}件</span></div>
                {jdIRs.filter(ir => ir.feedback).length > 0 && (
                  <div className="flex justify-between"><span className="text-[#91918c]">顧客フィードバック</span><span className="font-medium" style={{color: "#15803d"}}>{jdIRs.filter(ir => ir.feedback).length}件</span></div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Simplified Proposal Email Modal */}
        {/* Proposal email modal */}
        {proposalModal && emailDraft && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: "rgba(33,25,34,0.55)"}}>
            <div className="bg-white w-full max-h-[92vh] overflow-hidden flex flex-col" style={{maxWidth: "800px", width: "calc(100% - 32px)", margin: "16px", borderRadius: MORPHY.radius.lg, boxShadow: MORPHY.shadow.modal}}>
              <div className="flex items-center justify-between px-6 py-4" style={{borderBottom: `1px solid ${MORPHY.cardBorder}`}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background: `${MORPHY.red}12`}}><Mail size={20} style={{color: MORPHY.red}}/></div>
                  <div><h3 className="text-base font-medium text-[#211922]">提案メール作成</h3><p className="text-xs text-[#91918c]">{proposalModal.candidates.length}名を{customerName}様にご提案</p></div>
                </div>
                <button onClick={() => { setProposalModal(null); setProposalStep("edit"); }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f6f6f3]"><X size={18} className="text-[#91918c]"/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {proposalStep === "edit" && (
                  <div className="space-y-4">
                    <div><label className="text-xs text-[#91918c] mb-1 block">宛先</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm bg-[#f6f6f3]" value={emailDraft.to} onChange={e => setEmailDraft(prev => ({...prev, to: e.target.value}))}/></div>
                    <div><label className="text-xs text-[#91918c] mb-1 block">件名</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm" value={emailDraft.subject} onChange={e => setEmailDraft(prev => ({...prev, subject: e.target.value}))}/></div>
                    <div><label className="text-xs text-[#91918c] mb-1 block">本文</label><textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm resize-none font-mono leading-relaxed" style={{minHeight: "300px"}} value={emailDraft.body} onChange={e => setEmailDraft(prev => ({...prev, body: e.target.value}))}/></div>
                  </div>
                )}
                {proposalStep === "sending" && <div className="text-center py-16"><RefreshCw size={28} className="text-[#e60023] animate-spin mx-auto mb-4"/><h3 className="text-lg font-medium text-[#211922]">送信中...</h3></div>}
                {proposalStep === "sent" && <div className="text-center py-16"><CheckCircle size={32} style={{color: MORPHY.green700}} className="mx-auto mb-4"/><h3 className="text-lg font-medium text-[#211922] mb-2">送信しました</h3><p className="text-sm text-[#91918c] mb-6">{customerName}様に提案メールを送信しました</p><button onClick={() => { setProposalModal(null); setProposalStep("edit"); }} className="px-5 py-2.5 rounded-lg text-sm font-medium border border-[#e5e5e0] hover:bg-[#f6f6f3] text-[#211922]">閉じる</button></div>}
              </div>
              {proposalStep === "edit" && (
                <div className="flex justify-end gap-3 px-6 py-4" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                  <button onClick={() => { setProposalModal(null); setProposalStep("edit"); }} className="px-4 py-2.5 rounded-lg text-sm border border-[#e5e5e0] text-[#62625b]">キャンセル</button>
                  <button onClick={sendProposal} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center gap-1.5 hover:bg-[#cc001f]"><Send size={14}/>送信する</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Assessment deadline modal (期限設定モーダル) */}
        {assessmentDeadlineModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: "rgba(33,25,34,0.55)"}}>
            <div className="bg-white w-full" style={{maxWidth: "440px", margin: "16px", borderRadius: MORPHY.radius.lg, boxShadow: MORPHY.shadow.modal}}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold text-[#211922] flex items-center gap-2"><ClipboardList size={18} className="text-purple-600"/>アセスメント受験依頼</h3>
                  <button onClick={() => setAssessmentDeadlineModal(null)} className="p-1 hover:bg-[#f6f6f3] rounded-lg"><X size={18} className="text-[#91918c]"/></button>
                </div>
                <div className="mb-4 p-3 rounded-lg" style={{background: MORPHY.fog, border: `1px solid ${MORPHY.cardBorder}`}}>
                  <div className="text-xs text-[#91918c] mb-1">対象アセスメント</div>
                  <div className="text-sm font-medium text-[#211922]">{assessmentDeadlineModal.title}</div>
                  <div className="text-xs text-[#91918c] mt-1">候補者: {CANDIDATES.find(cc => cc.id === assessmentDeadlineModal.candidateId)?.name || assessmentDeadlineModal.candidateId}</div>
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-[#211922] mb-2">受験期限 <span className="text-red-500">*</span></label>
                  <input type="date" value={assessmentDeadlineValue.replace(/\//g, "-")} onChange={e => setAssessmentDeadlineValue(e.target.value.replace(/-/g, "/"))} className="w-full px-3 py-2.5 rounded-lg text-sm" style={{border: `1px solid ${MORPHY.cardBorder}`, outline: "none"}} min={new Date().toISOString().split("T")[0]}/>
                  <div className="flex gap-2 mt-2">
                    {[3, 7, 14, 30].map(d => { const dt = new Date(); dt.setDate(dt.getDate() + d); const v = dt.toISOString().split("T")[0].replace(/-/g, "/"); return (
                      <button key={d} onClick={() => setAssessmentDeadlineValue(v)} className="text-xs px-2.5 py-1 rounded-full transition-colors" style={{border: `1px solid ${assessmentDeadlineValue === v ? "#7c3aed" : MORPHY.cardBorder}`, background: assessmentDeadlineValue === v ? "#f5f3ff" : "white", color: assessmentDeadlineValue === v ? "#7c3aed" : "#62625b"}}>{d}日後</button>
                    ); })}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setAssessmentDeadlineModal(null)} className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-[#62625b] border" style={{borderColor: MORPHY.cardBorder}}>キャンセル</button>
                  <button onClick={() => { addAssessmentRequest(assessmentDeadlineModal.jdId, assessmentDeadlineModal.candidateId, assessmentDeadlineModal.title, assessmentDeadlineValue); setAssessmentDeadlineModal(null); showToast("アセスメント受験依頼を送信しました"); }} className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white" style={{background: "#7c3aed"}}>依頼を送信</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Response email modal (回答メール for interview requests) */}
        {responseEmailTarget && responseEmailDraft && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: "rgba(33,25,34,0.55)"}}>
            <div className="bg-white w-full max-h-[92vh] overflow-hidden flex flex-col" style={{maxWidth: "800px", width: "calc(100% - 32px)", margin: "16px", borderRadius: MORPHY.radius.lg, boxShadow: MORPHY.shadow.modal}}>
              <div className="flex items-center justify-between px-6 py-4" style={{borderBottom: `1px solid ${MORPHY.cardBorder}`}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background: "#eff6ff"}}><Mail size={20} style={{color: "#1d4ed8"}}/></div>
                  <div><h3 className="text-base font-medium text-[#211922]">面談リクエスト回答メール</h3><p className="text-xs text-[#91918c]">候補者 {responseEmailTarget.candidateId} について {responseEmailTarget.customerName} 様に回答</p></div>
                </div>
                <button onClick={() => { setResponseEmailTarget(null); setResponseEmailStep("edit"); }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f6f6f3]"><X size={18} className="text-[#91918c]"/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {responseEmailStep === "edit" && (
                  <div className="space-y-4">
                    <div><label className="text-xs text-[#91918c] mb-1 block">宛先</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm bg-[#f6f6f3]" value={responseEmailDraft.to} onChange={e => setResponseEmailDraft(prev => ({...prev, to: e.target.value}))}/></div>
                    <div><label className="text-xs text-[#91918c] mb-1 block">件名</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm" value={responseEmailDraft.subject} onChange={e => setResponseEmailDraft(prev => ({...prev, subject: e.target.value}))}/></div>
                    <div><label className="text-xs text-[#91918c] mb-1 block">本文</label><textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm resize-none font-mono leading-relaxed" style={{minHeight: "250px"}} value={responseEmailDraft.body} onChange={e => setResponseEmailDraft(prev => ({...prev, body: e.target.value}))}/></div>
                    <div className="p-4 rounded-xl bg-[#f6f6f3] border border-[#e5e5e0]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#211922] flex items-center gap-2"><Paperclip size={14}/>添付ファイル</span>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={responseEmailDraft.attachResume} onChange={e => setResponseEmailDraft(prev => ({...prev, attachResume: e.target.checked}))} className="rounded"/>
                          <span className="text-xs text-[#62625b]">職務経歴書を添付</span>
                        </label>
                      </div>
                      {responseEmailDraft.attachResume && (
                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#e5e5e0]">
                          <FileText size={14} className="text-[#e60023]"/>
                          <span className="text-xs text-[#211922]">職務経歴書_{responseEmailTarget.candidateId}_ブラインド.pdf</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {responseEmailStep === "sending" && <div className="text-center py-16"><RefreshCw size={28} className="text-[#1d4ed8] animate-spin mx-auto mb-4"/><h3 className="text-lg font-medium text-[#211922]">送信中...</h3></div>}
                {responseEmailStep === "sent" && <div className="text-center py-16"><CheckCircle size={32} className="text-green-600 mx-auto mb-4"/><h3 className="text-lg font-medium text-[#211922] mb-2">回答メールを送信しました</h3><p className="text-sm text-[#91918c] mb-6">{responseEmailTarget.customerName}様に回答メール{responseEmailDraft.attachResume ? "（職務経歴書添付）" : ""}を送信しました</p><button onClick={() => { setResponseEmailTarget(null); setResponseEmailStep("edit"); }} className="px-5 py-2.5 rounded-lg text-sm font-medium border border-[#e5e5e0] hover:bg-[#f6f6f3] text-[#211922]">閉じる</button></div>}
              </div>
              {responseEmailStep === "edit" && (
                <div className="flex justify-end gap-3 px-6 py-4" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                  <button onClick={() => { setResponseEmailTarget(null); setResponseEmailStep("edit"); }} className="px-4 py-2.5 rounded-lg text-sm border border-[#e5e5e0] text-[#62625b]">キャンセル</button>
                  <button onClick={sendResponseEmail} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#1d4ed8] text-white flex items-center gap-1.5"><Send size={14}/>回答メールを送信</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const PlansScreen = () => (
    <div>
      <PageHeader title="育成計画" subtitle="職種別の人材育成計画" actions={
        <button onClick={() => navigate("plan-create")} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-[#cc001f]"><Plus size={16}/>新規計画を作成</button>
      }/>
      <div className="grid grid-cols-1 gap-4">
        {workforcePlans.map(p => {
          const achieveRate = Math.round(((p.stats.ready + (p.stats.assigned || 0)) / p.headcount) * 100);
          return (
            <Card key={p.id} className="p-5" onClick={() => navigate("plan-detail", { plan: p })}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-[#211922]">{p.title}</h3>
                    <span className={`text-xs font-medium ${getPriorityColor(p.priority)}`}>●{p.priority}</span>
                  </div>
                  <div className="grid grid-cols-5 tf-grid-5 gap-4 text-sm mb-3">
                    <div><span className="text-xs text-[#91918c]">目標職種</span><p className="font-medium">{p.targetRole}</p></div>
                    <div><span className="text-xs text-[#91918c]">必要人数</span><p className="font-medium">{p.headcount}名</p></div>
                    <div><span className="text-xs text-[#91918c]">期限</span><p className="font-medium">{p.deadline}</p></div>
                    <div><span className="text-xs text-[#91918c]">確保済み</span><p className="font-medium text-green-600">{p.stats.ready + (p.stats.assigned || 0)}名</p></div>
                    <div><span className="text-xs text-[#91918c]">育成中</span><p className="font-medium text-[#62625b]">{p.stats.training}名</p></div>
                  </div>
                  <MatchBar value={achieveRate} label={`達成率`} size="sm"/>
                </div>
                <ChevronRight size={20} className="text-[#91918c] mt-2"/>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const PlanCreateScreen = () => {
    const [form, setForm] = useState({
      title: "", targetRole: "", headcount: 1, deadline: "2026/09",
      priority: "中", skills: [], linkedJD: ""
    });
    const [skillInput, setSkillInput] = useState("");
    const [step, setStep] = useState(1); // 1=基本情報, 2=候補者選定, 3=確認
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [aiSuggesting, setAiSuggesting] = useState(false);
    const [suggestedCandidates, setSuggestedCandidates] = useState(null);
    const [showSkillChat, setShowSkillChat] = useState(true);
    const [skillChatMessages, setSkillChatMessages] = useState([
      { role: "ai", text: "育成計画のスキルセット設計をお手伝いします。目標職種や背景を教えていただければ、最適なスキルセットを提案します。" }
    ]);
    const [skillChatInput, setSkillChatInput] = useState("");
    const skillChatRef = React.useRef(null);

    const sendSkillChat = () => {
      if (!skillChatInput.trim()) return;
      const userMsg = skillChatInput.trim();
      setSkillChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
      setSkillChatInput("");
      setTimeout(() => {
        let aiReply = "";
        let suggestedSkills = [];
        const lower = userMsg.toLowerCase();
        if (lower.includes("経理") || lower.includes("簿記") || lower.includes("会計")) {
          aiReply = `経理・会計領域のスキルセットですね。以下を提案します：\n\n【必須スキル】簿記2級, 給与計算, Excel関数\n【推奨スキル】決算業務, 社会保険手続き, 年末調整\n【あると尚良し】SAP, 管理会計\n\n${form.targetRole ? `「${form.targetRole}」のポジションであれば、` : ""}特に給与計算と決算業務の実務経験が重視されます。追加しますか？`;
          suggestedSkills = ["簿記2級", "給与計算", "Excel関数", "決算業務", "社会保険手続き", "年末調整"];
        } else if (lower.includes("事務") || lower.includes("oa") || lower.includes("excel") || lower.includes("word")) {
          aiReply = `一般事務・OA領域のスキルセットを提案します：\n\n【必須スキル】Excel上級, Word, ビジネスメール\n【推奨スキル】PowerPoint, データ入力, 電話対応\n【あると尚良し】Access, マクロ/VBA\n\nOAスキルではExcelの関数・ピボットテーブルが特に需要が高いです。追加しますか？`;
          suggestedSkills = ["Excel上級", "Word", "ビジネスメール", "PowerPoint", "データ入力", "電話対応"];
        } else if (lower.includes("営業") || lower.includes("受発注") || lower.includes("見積")) {
          aiReply = `営業事務領域のスキルセットですね：\n\n【必須スキル】受発注管理, 見積作成, Excel\n【推奨スキル】Salesforce, 顧客管理, 提案資料作成\n【あると尚良し】SAP, 英語対応\n\n受発注管理とCRM操作経験のある人材は派遣先から高い評価を受けています。追加しますか？`;
          suggestedSkills = ["受発注管理", "見積作成", "Excel", "Salesforce", "顧客管理", "提案資料作成"];
        } else if (lower.includes("人事") || lower.includes("労務") || lower.includes("社保") || lower.includes("給与")) {
          aiReply = `人事・労務領域の提案です：\n\n【必須スキル】社会保険手続き, 給与計算, 勤怠管理\n【推奨スキル】年末調整, 労働法知識, 入退社手続き\n【あると尚良し】社労士資格, 人事システム操作\n\n社会保険手続きと給与計算のセットスキルは常に高い需要があります。追加しますか？`;
          suggestedSkills = ["社会保険手続き", "給与計算", "勤怠管理", "年末調整", "労働法知識", "入退社手続き"];
        } else if (lower.includes("追加") || lower.includes("はい") || lower.includes("お願い") || lower.includes("yes")) {
          const prev = skillChatMessages.filter(m => m.role === "ai").pop();
          const prevSkills = prev?._suggestedSkills || [];
          if (prevSkills.length > 0) {
            const newSkills = prevSkills.filter(s => !form.skills.includes(s));
            if (newSkills.length > 0) {
              setForm(f => ({ ...f, skills: [...f.skills, ...newSkills] }));
              aiReply = `${newSkills.join("、")} を追加しました！現在のスキルセット: ${[...form.skills, ...newSkills].join("、")}\n\n他に追加したいスキルや、調整したい点はありますか？`;
            } else {
              aiReply = "提案したスキルはすべて追加済みです。他の領域のスキルも検討しますか？";
            }
          } else {
            aiReply = "どの領域のスキルセットを検討していますか？例えば「経理・会計」「一般事務」「営業事務」などのキーワードで相談できます。";
          }
        } else if (lower.includes("削除") || lower.includes("外") || lower.includes("除")) {
          aiReply = `現在のスキルセット: ${form.skills.length > 0 ? form.skills.join("、") : "（なし）"}\n\n外したいスキルがあれば、スキル名を教えてください。または左のスキルタグの「×」で直接削除できます。`;
        } else {
          aiReply = `「${userMsg}」に関連するスキルセットを考えてみましょう。\n\nもう少し具体的に教えていただけますか？例えば：\n・どのような業務領域ですか？（経理、一般事務、営業事務など）\n・派遣先の現状の課題は？\n・どのレベル感の人材を想定していますか？（未経験可/実務経験者/管理職経験者）`;
        }
        setSkillChatMessages(prev => [...prev, { role: "ai", text: aiReply, _suggestedSkills: suggestedSkills }]);
        setTimeout(() => { if (skillChatRef.current) skillChatRef.current.scrollTop = skillChatRef.current.scrollHeight; }, 50);
      }, 800);
    };

    const addSkill = () => {
      if (skillInput.trim()) {
        setForm(f => f.skills.includes(skillInput.trim()) ? f : { ...f, skills: [...f.skills, skillInput.trim()] });
        setSkillInput("");
      }
    };

    const removeSkill = (s) => setForm(f => ({ ...f, skills: f.skills.filter(sk => sk !== s) }));

    const suggestCandidates = () => {
      setAiSuggesting(true);
      setTimeout(() => {
        const jd = form.linkedJD ? JDS.find(j => j.id === form.linkedJD) : null;
        const scored = CANDIDATES.map(c => {
          const skillMatch = form.skills.length > 0
            ? form.skills.filter(s => c.skills.some(cs => cs.name.toLowerCase().includes(s.toLowerCase()))).length / form.skills.length
            : 0.3;
          const currentMatch = Math.min(Math.round(skillMatch * 60 + Math.min(c.totalYears / 10, 1) * 20 + (c.remoteOk ? 10 : 5) + Math.random() * 10), 99);
          const trainedMatch = Math.min(currentMatch + Math.round(10 + Math.random() * 15), 99);
          return { ...c, currentMatch, trainedMatch };
        }).sort((a, b) => b.currentMatch - a.currentMatch);
        setSuggestedCandidates(scored);
        setAiSuggesting(false);
      }, 1200);
    };

    const toggleCandidate = (cId) => {
      setSelectedCandidates(prev =>
        prev.includes(cId) ? prev.filter(id => id !== cId) : [...prev, cId]
      );
    };

    const savePlan = () => {
      const newPlan = {
        id: `WP-${String(workforcePlans.length + 1).padStart(3, "0")}`,
        title: form.title || `${form.targetRole}確保計画`,
        targetRole: form.targetRole,
        headcount: Number(form.headcount),
        deadline: form.deadline,
        priority: form.priority,
        skills: form.skills,
        linkedJDs: form.linkedJD ? [form.linkedJD] : [],
        candidates: selectedCandidates.map(cId => {
          const sc = suggestedCandidates?.find(c => c.id === cId);
          return {
            id: cId,
            status: "育成対象",
            currentMatch: sc?.currentMatch || 50,
            trainedMatch: sc?.trainedMatch || 70
          };
        }),
        stats: { ready: 0, training: selectedCandidates.length }
      };
      setWorkforcePlans(prev => [...prev, newPlan]);
      navigate("plan-detail", { plan: newPlan });
    };

    return (
      <div>
        <PageHeader title="育成計画の新規作成" subtitle={`ステップ ${step} / 3`} onBack={goBack}/>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {[{ n: 1, label: "基本情報" }, { n: 2, label: "候補者選定" }, { n: 3, label: "確認・作成" }].map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <button onClick={() => s.n < step + 1 && setStep(s.n)} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${step === s.n ? "bg-[#e60023] text-white hover:bg-[#cc001f]" : step > s.n ? "bg-[#62625b] text-white" : "bg-[#e5e5e0]/50 text-[#91918c]"}`}>{step > s.n ? "✓" : s.n}</button>
              <span className={`text-sm ${step === s.n ? "font-medium text-[#211922]" : "text-[#91918c]"}`}>{s.label}</span>
              {i < 2 && <div className={`w-16 h-0.5 ${step > s.n ? "bg-[#62625b]" : "bg-[#e5e5e0]"}`}></div>}
            </div>
          ))}
        </div>

        {/* Step 1: 基本情報 */}
        {step === 1 && (
          <div className="flex gap-6 tf-plan-create-layout" style={{alignItems: "flex-start"}}>
            <div className="flex-1 min-w-0">
              <Card className="p-6">
                <h3 className="font-medium text-[#211922] mb-4">計画の基本情報</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 tf-grid-2 gap-4">
                    <div><label className="text-xs text-[#91918c] mb-1 block">計画名</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" placeholder="例：経理スタッフ増強計画" value={form.title} onChange={e => { const v = e.target.value; setForm(f => ({...f, title: v})); }}/></div>
                    <div><label className="text-xs text-[#91918c] mb-1 block">目標職種 <span className="text-red-500">*</span></label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" placeholder="例：経理事務スタッフ" value={form.targetRole} onChange={e => { const v = e.target.value; setForm(f => ({...f, targetRole: v})); }}/></div>
                  </div>
                  <div className="grid grid-cols-3 tf-grid-3 gap-4">
                    <div><label className="text-xs text-[#91918c] mb-1 block">必要人数 <span className="text-red-500">*</span></label><input type="number" min="1" className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={form.headcount} onChange={e => { const v = e.target.value; setForm(f => ({...f, headcount: v})); }}/></div>
                    <div><label className="text-xs text-[#91918c] mb-1 block">必要時期 <span className="text-red-500">*</span></label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" placeholder="2026/09" value={form.deadline} onChange={e => { const v = e.target.value; setForm(f => ({...f, deadline: v})); }}/></div>
                    <div><label className="text-xs text-[#91918c] mb-1 block">優先度</label><select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={form.priority} onChange={e => { const v = e.target.value; setForm(f => ({...f, priority: v})); }}><option>高</option><option>中</option><option>低</option></select></div>
                  </div>
                  <div>
                    <label className="text-xs text-[#91918c] mb-1 block">期待スキルセット</label>
                    <div className="flex gap-2">
                      <input className="flex-1 border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" placeholder="スキルを入力してEnterまたは追加" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())}/>
                      <button onClick={addSkill} className="bg-[#e5e5e0]/50 hover:bg-[#f6f6f3] text-[#211922] px-4 py-2.5 rounded-lg text-sm">追加</button>
                    </div>
                    {form.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {form.skills.map(s => (
                          <span key={s} className="bg-[#e5e5e0]/50 text-[#211922] border border-[#e5e5e0] px-3 py-1 rounded-full text-xs flex items-center gap-1.5">{s}<button onClick={() => removeSkill(s)} className="hover:text-[#211922] font-medium">×</button></span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-1.5 mt-2">
                      {["AWS", "Terraform", "Docker", "Kubernetes", "Python", "Java", "PM", "Agile"].filter(s => !form.skills.includes(s)).slice(0, 5).map(s => (
                        <button key={s} onClick={() => setForm(f => ({ ...f, skills: [...f.skills, s] }))} className="text-xs bg-[#e5e5e0]/50 hover:bg-[#f6f6f3] text-[#91918c] px-2 py-1 rounded-full">+ {s}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#91918c] mb-1 block">関連JD（任意）</label>
                    <select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={form.linkedJD} onChange={e => { const v = e.target.value; setForm(f => ({...f, linkedJD: v})); }}>
                      <option value="">なし</option>
                      {JDS.map(j => <option key={j.id} value={j.id}>{j.title}（{j.id}）</option>)}
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => setStep(2)} disabled={!form.targetRole} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-6 py-2.5 text-sm font-medium disabled:opacity-40 flex items-center gap-2 hover:bg-[#cc001f]">候補者を選定する<ChevronRight size={16}/></button>
                </div>
              </Card>
            </div>
            <div className="w-80 flex-shrink-0 sticky top-4" style={{minWidth: 0}}>
              <Card className="p-0 overflow-hidden" style={{maxHeight: "calc(100vh - 220px)", display: "flex", flexDirection: "column"}}>
                <div className="flex items-center justify-between px-4 py-3" style={{background: MORPHY.plumBlack, color: "#fff"}}>
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} style={{color: MORPHY.accent3}}/>
                    <span className="text-sm font-medium">AIスキルセット相談</span>
                  </div>
                  <button onClick={() => setShowSkillChat(prev => !prev)} className="text-xs opacity-70 hover:opacity-100">{showSkillChat ? "閉じる" : "開く"}</button>
                </div>
                {showSkillChat && (
                  <>
                    <div ref={skillChatRef} className="flex-1 overflow-y-auto p-4 space-y-3" style={{background: "#fafaf8"}}>
                      {skillChatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-line ${msg.role === "user" ? "bg-[#e60023] text-white" : "bg-white border border-[#e5e5e0] text-[#211922]"}`} style={{borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px"}}>
                            {msg.text}
                            {msg.role === "ai" && msg._suggestedSkills && msg._suggestedSkills.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-[#e5e5e0]">
                                {msg._suggestedSkills.map(s => (
                                  <button key={s} onClick={() => { if (!form.skills.includes(s)) setForm(f => ({ ...f, skills: [...f.skills, s] })); }}
                                    className={`text-xs px-2 py-0.5 rounded-full transition-colors ${form.skills.includes(s) ? "bg-[#e60023]/10 text-[#e60023] border border-[#e60023]/30" : "bg-[#e5e5e0]/60 text-[#62625b] hover:bg-[#e5e5e0] border border-transparent"}`}>
                                    {form.skills.includes(s) ? "✓ " : "+ "}{s}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-[#e5e5e0] bg-white">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {["経理・会計向け", "一般事務向け", "営業事務向け", "人事・労務向け"].map(q => (
                          <button key={q} onClick={() => { setSkillChatInput(q); }} className="text-xs bg-[#e5e5e0]/50 hover:bg-[#e5e5e0] text-[#62625b] px-2 py-1 rounded-full transition-colors">{q}</button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input className="flex-1 border border-[#e5e5e0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" placeholder="スキルセットについて相談..." value={skillChatInput} onChange={e => setSkillChatInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendSkillChat(); } }}/>
                        <button onClick={sendSkillChat} className="bg-[#e60023] text-white rounded-lg px-3 py-2 hover:bg-[#cc001f] transition-colors"><Send size={16}/></button>
                      </div>
                    </div>
                  </>
                )}
                {!showSkillChat && (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center" style={{background: "#fafaf8"}}>
                    <Brain size={32} style={{color: MORPHY.warmSilver, marginBottom: 12}}/>
                    <p className="text-sm text-[#91918c] mb-3">AIに相談しながら最適なスキルセットを設計できます</p>
                    <button onClick={() => setShowSkillChat(true)} className="text-sm text-[#e60023] hover:underline">チャットを開く</button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: 候補者選定 */}
        {step === 2 && (
          <div>
            <Card className="p-5 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-[#211922]">候補者を選定</h3>
                  <p className="text-sm text-[#91918c] mt-0.5">「{form.targetRole}」（{form.skills.join("・") || "スキル指定なし"}）に適した候補者をAIが提案します</p>
                </div>
                {!suggestedCandidates && !aiSuggesting && (
                  <button onClick={suggestCandidates} className="bg-[#211922] hover:bg-[#2e2630] rounded-2xl text-white px-5 py-2 text-sm font-medium flex items-center gap-2"><Sparkles size={16}/>AIで候補者を提案</button>
                )}
                {suggestedCandidates && (
                  <span className="text-sm text-[#91918c]">{selectedCandidates.length}名 選択中</span>
                )}
              </div>
            </Card>

            {aiSuggesting && <LoadingAI text="AIがスキルマッチする候補者をスコアリング中..."/>}

            {suggestedCandidates && (
              <div className="grid grid-cols-3 tf-grid-3 gap-4">
                {suggestedCandidates.map(c => {
                  const isSelected = selectedCandidates.includes(c.id);
                  return (
                    <Card key={c.id} className={`p-0 transition-all duration-200 cursor-pointer hover:translate-y-[-2px] relative ${isSelected ? "ring-2 ring-slate-400" : ""}`} onClick={() => toggleCandidate(c.id)}>
                      {/* Selection checkbox overlay */}
                      <div className="absolute top-4 right-12 z-10">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${isSelected ? "bg-[#e60023] border-[#e60023] text-white" : "border-[#e5e5e0] bg-white"}`}>
                          {isSelected && <CheckCircle size={14}/>}
                        </div>
                      </div>
                      <CandidateCardBody candidate={c} matchScore={c.currentMatch}/>
                    </Card>
                  );
                })}
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(1)} className="bg-[#e5e5e0]/50 hover:bg-[#f6f6f3] text-[#211922] px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"><ArrowLeft size={16}/>戻る</button>
              <button onClick={() => setStep(3)} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-6 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-[#cc001f]">確認へ進む<ChevronRight size={16}/></button>
            </div>
          </div>
        )}

        {/* Step 3: 確認・作成 */}
        {step === 3 && (
          <div className="grid grid-cols-3 tf-grid-3 gap-6">
            <div className="col-span-2">
              <Card className="p-6">
                <h3 className="font-medium text-[#211922] mb-4">作成内容の確認</h3>
                <div className="grid grid-cols-2 tf-grid-2 gap-4 text-sm mb-4">
                  <div><span className="text-[#91918c] text-xs">計画名</span><p className="font-medium">{form.title || `${form.targetRole}確保計画`}</p></div>
                  <div><span className="text-[#91918c] text-xs">目標職種</span><p className="font-medium">{form.targetRole}</p></div>
                  <div><span className="text-[#91918c] text-xs">必要人数</span><p className="font-medium">{form.headcount}名</p></div>
                  <div><span className="text-[#91918c] text-xs">必要時期</span><p className="font-medium">{form.deadline}</p></div>
                  <div><span className="text-[#91918c] text-xs">優先度</span><p className={`font-medium ${getPriorityColor(form.priority)}`}>{form.priority}</p></div>
                  <div><span className="text-[#91918c] text-xs">関連JD</span><p className="font-medium">{form.linkedJD ? JDS.find(j => j.id === form.linkedJD)?.title || "なし" : "なし"}</p></div>
                </div>
                <div className="mb-4">
                  <span className="text-[#91918c] text-xs">期待スキルセット</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">{form.skills.length > 0 ? form.skills.map(s => <span key={s} className="bg-[#f6f6f3] text-[#211922] px-2 py-0.5 rounded-full text-xs border border-[#e5e5e0]">{s}</span>) : <span className="text-sm text-[#91918c]">未指定</span>}</div>
                </div>
                {selectedCandidates.length > 0 && (
                  <div>
                    <span className="text-[#91918c] text-xs">選定候補者（{selectedCandidates.length}名）</span>
                    <div className="mt-2 space-y-1.5">
                      {selectedCandidates.map(cId => {
                        const c = CANDIDATES.find(c => c.id === cId);
                        const sc = suggestedCandidates?.find(c => c.id === cId);
                        return (
                          <div key={cId} className="flex items-center justify-between p-3 bg-[#f6f6f3]/60 rounded-lg text-sm">
                            <span className="font-medium">{c?.name}（{cId}）</span>
                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-[#91918c]">現在: <b>{sc?.currentMatch || "—"}%</b></span>
                              <span className="text-[#211922]">育成後: <b>{sc?.trainedMatch || "—"}%</b></span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="mt-6 flex justify-between">
                  <button onClick={() => setStep(2)} className="bg-[#e5e5e0]/50 hover:bg-[#f6f6f3] text-[#211922] px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"><ArrowLeft size={16}/>戻る</button>
                  <button onClick={savePlan} className="bg-[#e60023] text-white px-8 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 hover:bg-[#cc001f]"><CheckCircle size={16}/>育成計画を作成</button>
                </div>
              </Card>
            </div>
            <div>
              <Card className="p-4">
                <h4 className="text-sm font-medium text-[#211922] mb-2">サマリ</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-[#91918c]">目標人数</span><span className="font-medium">{form.headcount}名</span></div>
                  <div className="flex justify-between"><span className="text-[#91918c]">候補者</span><span className="font-medium">{selectedCandidates.length}名</span></div>
                  <div className="flex justify-between"><span className="text-[#91918c]">充足率</span><span className="font-medium text-[#211922]">{Math.round((selectedCandidates.length / Math.max(Number(form.headcount), 1)) * 100)}%</span></div>
                  <hr/>
                  <p className="text-xs text-[#91918c]">作成後、候補者のステータス管理・育成プラン生成が可能になります。</p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    );
  };

  const PlanDetailScreen = () => {
    const [plan, setPlan] = useState(selectedPlan);
    const p = plan;
    if (!p) return <div className="text-center py-20"><p className="text-[#91918c] mb-4">プランが選択されていません</p><button onClick={goBack} className="px-4 py-2 rounded-lg text-sm bg-[#e60023] text-white hover:bg-[#cc001f]">戻る</button></div>;

    const readyCandidates = p.candidates.filter(pc => pc.status === "提案可能");
    const trainingCandidates = p.candidates.filter(pc => pc.status === "育成対象" || pc.status === "候補");

    const CandidateSection = ({ title, icon, color, bgColor, candidates: cands, emptyText }) => (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full" style={{background: color}}/>
          <h4 className="text-sm font-medium text-[#211922]">{title}</h4>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{background: bgColor, color}}>{cands.length}名</span>
        </div>
        {cands.length === 0 ? (
          <Card className="p-4 mb-4"><p className="text-sm text-[#91918c] text-center">{emptyText}</p></Card>
        ) : (
          <div className="space-y-3 mb-6">
            {cands.map(pc => {
              const c = CANDIDATES.find(c => c.id === pc.id);
              if (!c) return null;
              const tp = TRAINING_PLANS[pc.id];
              const totalProgress = tp ? Math.round(tp.items.reduce((sum, it) => sum + it.progress, 0) / tp.items.length) : null;
              const completedItems = tp ? tp.items.filter(it => it.progress >= 100).length : 0;
              const inProgressItems = tp ? tp.items.filter(it => it.progress > 0 && it.progress < 100).length : 0;
              return (
                <Card key={pc.id} className="p-0 cursor-pointer transition-all hover:translate-y-[-2px]" onClick={() => navigate("candidate-detail", { candidate: c })}>
                  <div className="flex tf-candidate-train-row">
                    <div className={tp ? "w-1/2 border-r border-[#e5e5e0]" : "w-full"}>
                      <CandidateCardBody candidate={c} matchScore={pc.currentMatch} compact/>
                      <div className="px-5 pb-3 -mt-1 flex items-center gap-3 text-xs">
                        <span className="text-[#91918c]">現在: <b className="text-[#211922]">{pc.currentMatch}%</b></span>
                        <span className="text-[#91918c]">育成後: <b style={{color}}>{pc.trainedMatch}%</b></span>
                      </div>
                    </div>
                    {tp && (() => {
                      // Generate progress commentary
                      const notStartedItems = tp.items.filter(it => it.progress === 0).length;
                      const completedThemes = tp.items.filter(it => it.progress >= 100).map(it => it.theme.replace(/（.*）/, ""));
                      const activeThemes = tp.items.filter(it => it.progress > 0 && it.progress < 100);
                      const highPriorityPending = tp.items.filter(it => it.progress === 0 && it.priority === "高");
                      let commentary = "";
                      if (totalProgress >= 90) {
                        commentary = `育成プランはほぼ完了。${completedThemes.slice(0, 2).join("・")}を修了し、${tp.targetRole}として即戦力が期待できます。`;
                      } else if (totalProgress >= 60) {
                        commentary = `順調に進捗中。${completedThemes.length > 0 ? completedThemes.slice(0, 2).join("・") + "を修了済み。" : ""}${activeThemes.length > 0 ? "現在「" + activeThemes[0].theme.replace(/（.*）/, "") + "」に取り組んでおり、" : ""}残り${notStartedItems > 0 ? notStartedItems + "項目で" : ""}目標達成の見込みです。`;
                      } else if (totalProgress >= 30) {
                        commentary = `${activeThemes.length > 0 ? "「" + activeThemes[0].theme.replace(/（.*）/, "") + "」を中心に学習中。" : ""}${highPriorityPending.length > 0 ? "優先度の高い「" + highPriorityPending[0].theme.replace(/（.*）/, "") + "」が未着手のため、スケジュール管理に注意が必要です。" : "このペースで進めれば期限内の完了が見込めます。"}`;
                      } else if (totalProgress > 0) {
                        commentary = `育成開始直後の段階。${activeThemes.length > 0 ? "「" + activeThemes[0].theme.replace(/（.*）/, "") + "」に着手していますが、" : ""}残り${notStartedItems}項目が未着手のため、計画的な学習スケジュールの策定を推奨します。`;
                      } else {
                        commentary = `育成プランが未着手です。${tp.items.length}項目の学習が必要で、想定期間は${tp.estimatedPeriod}です。早期の着手を推奨します。`;
                      }
                      return (
                      <div className="w-1/2 p-4 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-[#211922] flex items-center gap-1.5"><GraduationCap size={12} style={{color: "#d97706"}}/>育成進捗</span>
                          <span className="text-xs font-semibold" style={{color: totalProgress >= 50 ? "#15803d" : totalProgress > 0 ? "#d97706" : "#91918c"}}>{totalProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#e5e5e0]/50 rounded-full overflow-hidden mb-2">
                          <div className="h-full rounded-full transition-all" style={{width: `${totalProgress}%`, background: totalProgress >= 50 ? "#15803d" : totalProgress > 0 ? "#d97706" : "#e5e5e0"}}/>
                        </div>
                        {/* AI Progress Commentary */}
                        <div className="mb-2.5 px-2.5 py-2 rounded-lg" style={{background: "#fafaf8", border: "1px solid #e5e5e0"}}>
                          <div className="flex items-start gap-1.5">
                            <Sparkles size={10} className="flex-shrink-0 mt-0.5" style={{color: "#d97706"}}/>
                            <p className="text-[10px] leading-relaxed text-[#62625b]">{commentary}</p>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          {tp.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0" style={{
                                background: item.progress >= 100 ? "#15803d" : item.progress > 0 ? "#fef3c7" : "#f6f6f3",
                                border: item.progress >= 100 ? "none" : item.progress > 0 ? "1px solid #d97706" : "1px solid #e5e5e0"
                              }}>
                                {item.progress >= 100 && <CheckCircle size={10} style={{color: "#fff"}}/>}
                                {item.progress > 0 && item.progress < 100 && <div className="w-1.5 h-1.5 rounded-full" style={{background: "#d97706"}}/>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className={`text-xs truncate ${item.progress >= 100 ? "text-[#15803d] line-through" : item.progress > 0 ? "text-[#211922] font-medium" : "text-[#91918c]"}`}>{item.theme}</span>
                                  <span className="text-xs ml-2 flex-shrink-0" style={{color: item.progress >= 100 ? "#15803d" : item.progress > 0 ? "#d97706" : "#c8c8c1"}}>{item.progress}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-[#e5e5e0] text-xs text-[#91918c]">
                          <span>期間: {tp.estimatedPeriod}</span>
                          <span>完了: {completedItems}/{tp.items.length}</span>
                          {inProgressItems > 0 && <span className="text-[#d97706]">進行中: {inProgressItems}</span>}
                        </div>
                      </div>
                      );
                    })()}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );

    return (
      <div>
        <PageHeader title={p.title} subtitle={`${p.id} ・ 期限: ${p.deadline}`} onBack={goBack}/>
        <div className="grid grid-cols-3 tf-grid-3 gap-6">
          <div className="col-span-2 space-y-4">
            <Card className="p-6">
              <h3 className="font-medium text-[#211922] mb-4">計画概要</h3>
              <div className="grid grid-cols-3 tf-grid-3 gap-4 text-sm mb-4">
                <div><span className="text-[#91918c] text-xs">目標職種</span><p className="font-medium">{p.targetRole}</p></div>
                <div><span className="text-[#91918c] text-xs">必要人数</span><p className="font-medium">{p.headcount}名</p></div>
                <div><span className="text-[#91918c] text-xs">期限</span><p className="font-medium">{p.deadline}</p></div>
              </div>
              <div><span className="text-[#91918c] text-xs">期待スキルセット</span><div className="flex flex-wrap gap-1.5 mt-1">{p.skills.map(s => <span key={s} className="bg-[#f6f6f3] text-[#211922] px-2 py-0.5 rounded-full text-xs">{s}</span>)}</div></div>
            </Card>

            {/* Add Training Candidates Button → navigates to dedicated screen */}
            <button className="w-full py-3 px-5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90" style={{background: MORPHY.plumBlack, color: "#fff"}} onClick={() => navigate("plan-add-member")}>
              <Plus size={16}/>育成要員を追加
            </button>

            <CandidateSection
              title="提案可能"
              color="#15803d"
              bgColor="#dcfce7"
              candidates={readyCandidates}
              emptyText="提案可能な要員はいません"
            />

            <CandidateSection
              title="育成中"
              color="#d97706"
              bgColor="#fef3c7"
              candidates={trainingCandidates}
              emptyText="育成中の要員はいません"
            />
          </div>
          <div className="space-y-4 sticky top-4" style={{alignSelf: "flex-start"}}>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">達成状況</h3>
              <div className="space-y-3">
                {[{ label: "提案可能", value: readyCandidates.length, color: "#15803d" }, { label: "育成中", value: trainingCandidates.length, color: "#d97706" }].map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-sm text-[#62625b] flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{background: s.color}}/>{s.label}</span>
                    <span className="font-medium" style={{color: s.color}}>{s.value}名</span>
                  </div>
                ))}
                <hr className="my-2 border-[#e5e5e0]"/>
                <div className="flex items-center justify-between"><span className="text-sm font-medium text-[#211922]">合計 / 目標</span><span className="font-medium">{p.candidates.length} / {p.headcount}名</span></div>
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">充足率</h3>
              <div className="relative w-full h-3 bg-[#e5e5e0]/50 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full rounded-full transition-all" style={{width: `${Math.min((readyCandidates.length / Math.max(p.headcount, 1)) * 100, 100)}%`, background: "#15803d"}}/>
                <div className="absolute top-0 h-full rounded-full transition-all" style={{left: `${Math.min((readyCandidates.length / Math.max(p.headcount, 1)) * 100, 100)}%`, width: `${Math.min((trainingCandidates.length / Math.max(p.headcount, 1)) * 100, 100)}%`, background: "#d97706"}}/>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-[#91918c]">
                <span>提案可能 {readyCandidates.length}名</span>
                <span>目標 {p.headcount}名</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const SearchScreen = () => {
    const allSearchJDs = [...JDS, ...savedJDs.filter(sj => !JDS.some(j => j.id === sj.id))];
    const initialJD = selectedJD && allSearchJDs.find(j => j.id === selectedJD.id || j.id === selectedJD._savedId) ? allSearchJDs.find(j => j.id === selectedJD.id || j.id === selectedJD._savedId) : (selectedJD || allSearchJDs[0]);
    const [localSearchMode, setLocalSearchMode] = useState(searchMode);
    const [selectedSearchJD, setSelectedSearchJD] = useState(initialJD);
    // Deal mode removed — unified to JD
    const [selectedCompany, setSelectedCompany] = useState(COMPANIES[0]);
    const [freeQuery, setFreeQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [searchDone, setSearchDone] = useState(false);
    const [autoSearched, setAutoSearched] = useState(false);

    const doSearch = () => {
      const jd = localSearchMode === "jd" ? selectedSearchJD : JDS[0];
      const results = CANDIDATES.map(c => {
        const match = calcMatchScore(c, jd);
        return {
          ...c, match,
          immediateProposal: match.current >= 70,
          trainableProposal: match.current < 70 && match.trained >= 60,
          matchReasons: [
            match.fit.length > 0 ? `必須スキル一致: ${match.fit.join("・")}` : null,
            match.prefFit && match.prefFit.length > 0 ? `歓迎スキル一致: ${match.prefFit.join("・")}` : null,
            c.totalYears >= 5 ? `実務経験${c.totalYears}年` : null,
            c.remoteOk && jd.remote?.includes("リモート") ? "リモート勤務対応可" : null,
            match.gap.length > 0 ? `不足スキル: ${match.gap.join("・")}` : null,
          ].filter(Boolean)
        };
      }).sort((a, b) => b.match.current - a.match.current);
      setSearchResults(results);
      setSearchDone(true);
    };

    // Auto-search when navigating from JDDetailScreen with a selected JD
    React.useEffect(() => {
      if (selectedJD && localSearchMode === "jd" && !autoSearched) {
        setAutoSearched(true);
        doSearch();
      }
    }, []);

    const [freeSearching, setFreeSearching] = useState(false);
    const [companySearching, setCompanySearching] = useState(false);

    const freeSearch = () => {
      setFreeSearching(true);
      const q = freeQuery.toLowerCase();
      setTimeout(() => {
        const results = CANDIDATES.filter(c => {
          return c.skills.some(s => s.name.toLowerCase().includes(q)) || c.aspiration.toLowerCase().includes(q) || c.location.includes(freeQuery) || c.wantToDo.toLowerCase().includes(q);
        }).map(c => {
          const matchedSkills = c.skills.filter(s => s.name.toLowerCase().includes(q)).map(s => s.name);
          const aspirationMatch = c.aspiration.toLowerCase().includes(q);
          const locationMatch = c.location.includes(freeQuery);
          const wantMatch = c.wantToDo.toLowerCase().includes(q);
          return {
            ...c, match: calcMatchScore(c, JDS[0]),
            immediateProposal: c.status === "提案可能",
            trainableProposal: c.status === "育成対象",
            matchReasons: [
              matchedSkills.length > 0 ? `スキル一致: ${matchedSkills.join("・")}` : null,
              aspirationMatch ? `キャリア志向が合致: 「${c.aspiration.slice(0, 30)}…」` : null,
              locationMatch ? `勤務地一致: ${c.location}` : null,
              wantMatch ? `希望業務が合致` : null,
              `実務経験${c.totalYears}年`,
            ].filter(Boolean)
          };
        });
        if (results.length === 0) {
          setSearchResults(CANDIDATES.slice(0, 5).map(c => ({ ...c, match: calcMatchScore(c, JDS[0]), immediateProposal: false, trainableProposal: true, matchReasons: ["条件に完全一致する候補者なし — 類似候補を表示"] })));
        } else {
          setSearchResults(results);
        }
        setSearchDone(true);
        setFreeSearching(false);
      }, 1500);
    };

    const companySearch = () => {
      setCompanySearching(true);
      setTimeout(() => {
        const co = selectedCompany;
        const results = CANDIDATES.map(c => {
          const cSkills = c.skills.map(s => s.name.toLowerCase());
          const techMatch = co.techStack.filter(t => cSkills.some(cs => cs.includes(t.toLowerCase()))).length;
          const techScore = Math.round((techMatch / Math.max(co.techStack.length, 1)) * 40);
          const workMatch = (co.workStyle.includes("フルリモート") && c.remoteOk) ? 15 : (c.remoteOk || c.onsiteOk) ? 10 : 5;
          const cultureScore = co.culture.some(cu => cu.includes("技術")) && c.aspiration.includes("技術") ? 15 :
            co.culture.some(cu => cu.includes("挑戦") || cu.includes("スピード")) && c.changeIntent.includes("積極") ? 15 :
            co.culture.some(cu => cu.includes("安定")) && c.changeIntent.includes("良い案件") ? 12 : 8;
          const keywordScore = co.keywords.filter(kw => {
            const kwl = kw.toLowerCase();
            return cSkills.some(cs => cs.includes(kwl)) || c.aspiration.toLowerCase().includes(kwl) || c.wantToDo.toLowerCase().includes(kwl);
          }).length * 8;
          const total = Math.min(techScore + workMatch + cultureScore + keywordScore + Math.min(c.totalYears, 10), 99);
          return { ...c, companyFit: total, immediateProposal: c.status === "提案可能", trainableProposal: c.status === "育成対象",
            fitReasons: [
              techMatch > 0 ? `技術スタック一致: ${co.techStack.filter(t => cSkills.some(cs => cs.includes(t.toLowerCase()))).join("・")}` : null,
              c.remoteOk && co.workStyle.includes("リモート") ? "働き方がマッチ" : null,
              keywordScore > 0 ? "業界・領域の親和性あり" : null
            ].filter(Boolean)
          };
        }).sort((a, b) => b.companyFit - a.companyFit);
        setSearchResults(results);
        setSearchDone(true);
        setCompanySearching(false);
      }, 1500);
    };

    return (
      <div>
        <PageHeader title={selectedJD && autoSearched ? `「${selectedJD.title}」の候補者探索` : "候補者探索"} subtitle={role === "customer" ? "JD・AIに相談の2つのモードで候補者を探索" : "JD・企業・AIに相談の3つのモードで候補者を探索"} onBack={selectedJD && autoSearched ? () => { setSelectedJD(null); goBack(); } : undefined}/>
        {!(selectedJD && autoSearched) && <Card className="p-4 mb-6">
          <div className="inline-flex gap-1 p-1 bg-[#e5e5e0]/50 rounded-lg mb-4 tf-search-tabs flex-wrap">
            {[{ id: "jd", label: "募集JDから探す", icon: <FileText size={16}/> }, ...(role !== "customer" ? [{ id: "company", label: "企業特性から探す", icon: <Building2 size={16}/> }] : []), { id: "free", label: "AIに相談して探す", icon: <Brain size={16}/> }].map(m => (
              <button key={m.id} onClick={() => { setLocalSearchMode(m.id); setSearchDone(false); }} className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ${localSearchMode === m.id ? "bg-[#e60023] text-white" : "text-[#91918c] hover:text-[#211922] hover:bg-[#e5e5e0]/50"}`}>{m.icon}{m.label}</button>
            ))}
          </div>

          {localSearchMode === "jd" && (
            <div className="flex gap-3 items-end">
              <div className="flex-1"><label className="text-xs text-[#91918c] mb-1 block">JDを選択</label><select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={selectedSearchJD?.id} onChange={e => setSelectedSearchJD(allSearchJDs.find(j => j.id === e.target.value))}>{allSearchJDs.map(j => <option key={j.id} value={j.id}>{j.title}（{j.id}）</option>)}</select></div>
              <button onClick={doSearch} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-6 py-2 text-sm flex items-center gap-2"><Search size={16}/>検索</button>
            </div>
          )}
          {localSearchMode === "company" && (
            <div>
              <div className="flex gap-3 items-end mb-4">
                <div className="flex-1">
                  <label className="text-xs text-[#91918c] mb-1 block">企業を選択</label>
                  <select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={selectedCompany?.id} onChange={e => setSelectedCompany(COMPANIES.find(co => co.id === e.target.value))}>
                    {COMPANIES.map(co => <option key={co.id} value={co.id}>{co.name}（{co.industry}）</option>)}
                  </select>
                </div>
                <button onClick={companySearch} disabled={companySearching} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-6 py-2 text-sm flex items-center gap-2 disabled:opacity-50">
                  {companySearching ? <RefreshCw size={16} className="animate-spin"/> : <Search size={16}/>}マッチング検索
                </button>
              </div>
              {selectedCompany && (
                <div className="bg-[#f6f6f3] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={16} className="text-[#211922]"/>
                    <span className="text-sm font-medium text-[#211922]">{selectedCompany.name}</span>
                    <span className="text-xs bg-[#f6f6f3] text-[#211922] px-2 py-0.5 rounded">{selectedCompany.industry}</span>
                    <span className="text-xs text-[#91918c]">規模: {selectedCompany.size}</span>
                  </div>
                  <div className="grid grid-cols-3 tf-grid-3 gap-4 text-xs">
                    <div>
                      <span className="text-[#91918c]">企業カルチャー</span>
                      <div className="flex flex-wrap gap-1 mt-1">{selectedCompany.culture.map(cu => <span key={cu} className="text-xs bg-[#f6f6f3]/60 text-[#211922] border border-[#e5e5e0] px-2 py-0.5 rounded-full">{cu}</span>)}</div>
                    </div>
                    <div>
                      <span className="text-[#91918c]">技術スタック</span>
                      <div className="flex flex-wrap gap-1 mt-1">{selectedCompany.techStack.map(t => <span key={t} className="bg-[#f6f6f3] text-[#211922] border border-[#e5e5e0] px-1.5 py-0.5 rounded">{t}</span>)}</div>
                    </div>
                    <div>
                      <span className="text-[#91918c]">働き方 / 勤務地</span>
                      <div className="mt-1 text-[#62625b]">{selectedCompany.workStyle} ・ {selectedCompany.location}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {localSearchMode === "free" && (
            <div>
              <label className="text-xs text-[#91918c] mb-1 block">探したい人材像を自由に記述</label>
              <div className="flex gap-3">
                <textarea className="flex-1 border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 resize-none h-16" placeholder="例：経理経験があり東京勤務可能、給与計算と決算補助ができる即戦力人材" value={freeQuery} onChange={e => setFreeQuery(e.target.value)}/>
                <button onClick={freeSearch} disabled={!freeQuery || freeSearching} className="bg-[#211922] hover:bg-[#2e2630] rounded-2xl text-white px-6 py-2 text-sm flex items-center gap-2 self-end disabled:opacity-50">
                  {freeSearching ? <RefreshCw size={16} className="animate-spin"/> : <Sparkles size={16}/>}AI検索
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                {["経理経験あり、東京勤務可、給与計算と決算補助ができる即戦力", "Excel上級で事務経験豊富、データ集計が得意な人材", "営業事務経験あり、受発注管理とSAP操作ができる人"].map(ex => (
                  <button key={ex} onClick={() => setFreeQuery(ex)} className="text-xs bg-[#e5e5e0]/50 hover:bg-[#e5e5e0] text-[#62625b] px-3 py-1.5 rounded-full transition-colors truncate max-w-xs">{ex}</button>
                ))}
              </div>
            </div>
          )}
        </Card>}

        {freeSearching && <LoadingAI text="AIが条件を解析し候補者を検索中..."/>}
        {companySearching && <LoadingAI text="AIが企業特性を分析し候補者をマッチング中..."/>}

        {searchDone && searchResults && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-[#211922]">検索結果: {searchResults.length}名</h3>
                {localSearchMode === "free" && <AIBadge/>}
              </div>
              {role !== "customer" && <div className="flex items-center gap-2 text-xs text-[#91918c] flex-wrap">
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#62625b] rounded-full"></div>即提案可能: {searchResults.filter(c => c.immediateProposal).length}名</span>
                {role !== "sales" && <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#91918c] rounded-full"></div>育成で提案可能: {searchResults.filter(c => c.trainableProposal).length}名</span>}
                <span className="flex items-center gap-1 ml-1 pl-2 border-l border-[#e5e5e0]">正社員: {searchResults.filter(c => c.employmentType === "正社員").length}</span>
                <span className="flex items-center gap-1">FL: {searchResults.filter(c => c.employmentType === "フリーランス").length}</span>
              </div>}
            </div>
            <div className="grid grid-cols-3 tf-grid-3 gap-4">
              {searchResults.map(c => (
                <Card key={c.id} className="p-0 cursor-pointer transition-all hover:translate-y-[-2px]" onClick={(e) => { if (e.target.closest("button")) return; navigate("candidate-detail", { candidate: c }); }}>
                  <CandidateCardBody candidate={c} matchScore={localSearchMode === "company" ? c.companyFit : c.match?.current} compact isBlind={role === "customer"} favSource={{ source: "search", sourceLabel: `候補者検索：${localSearchMode === "jd" ? (selectedSearchJD?.title || "JD検索") : localSearchMode === "free" ? "AIに相談" : "検索"}` }}/>
                  {/* Match Reasons */}
                  {(c.matchReasons || c.fitReasons) && (c.matchReasons || c.fitReasons).length > 0 && (
                    <div className="px-5 pb-4">
                      <div className="text-xs mb-1.5" style={{color: MORPHY.oliveGray, fontWeight: 500}}>マッチ理由</div>
                      <div className="space-y-1">
                        {(c.matchReasons || c.fitReasons).slice(0, 3).map((r, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs" style={{color: r.includes("不足") ? MORPHY.warmSilver : MORPHY.plumBlack}}>
                            <span className="mt-0.5 flex-shrink-0">{r.includes("不足") ? <AlertCircle size={11} style={{color: MORPHY.warmSilver}}/> : <CheckCircle size={11} style={{color: MORPHY.green700}}/>}</span>
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Action button — role-dependent */}
                  {selectedJD && autoSearched && (() => {
                    const jdKey = selectedJD.id || selectedJD._savedId;
                    const alreadyAdded = (jdCandidateAdditions[jdKey] || new Set()).has(c.id);
                    if (role === "sales") {
                      // Sales: "顧客に提案" — adds to proposed candidate list
                      return (
                        <div className="px-5 pb-4">
                          {alreadyAdded ? (
                            <div className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-medium" style={{background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe"}}>
                              <CheckCircle size={12}/>提案候補に追加済み
                            </div>
                          ) : (
                            <button onClick={(e) => { e.stopPropagation(); const key = selectedJD.id || selectedJD._savedId; setJdCandidateAdditions(prev => { const curr = new Set(prev[key] || []); curr.add(c.id); return { ...prev, [key]: curr }; }); }} className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90" style={{backgroundColor: MORPHY.red}}>
                              <Users size={13}/>顧客に提案
                            </button>
                          )}
                        </div>
                      );
                    }
                    // Customer: "面談リクエスト" — sends interview request to sales
                    return (
                      <div className="px-5 pb-4">
                        {alreadyAdded ? (
                          <div className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-medium" style={{background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe"}}>
                            <CheckCircle size={12}/>面談リクエスト済み
                          </div>
                        ) : (
                          <button onClick={(e) => { e.stopPropagation(); const key = selectedJD.id || selectedJD._savedId; setJdCandidateAdditions(prev => { const curr = new Set(prev[key] || []); curr.add(c.id); return { ...prev, [key]: curr }; }); addInterviewRequest(key, c.id, jdCustomerMap[key] || "顧客", "customer-found"); }} className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90" style={{backgroundColor: MORPHY.red}}>
                            <MessageSquare size={13}/>面談リクエスト
                          </button>
                        )}
                      </div>
                    );
                  })()}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const AssessmentGenScreen = () => {
    const [genResult, setGenResult] = useState(null);
    const [asmGenerating, setAsmGenerating] = useState(false);
    const [localSkill, setLocalSkill] = useState("AWS");
    const [localLevel, setLocalLevel] = useState("中級");

    const generateAssessment = () => {
      setAsmGenerating(true);
      setTimeout(() => {
        setGenResult(ASSESSMENTS_TEMPLATES[0]);
        setAsmGenerating(false);
      }, 1500);
    };

    return (
      <div>
        <PageHeader title="AIアセスメント自動生成" subtitle="スキル項目を入力し、AIがアセスメント問題を生成します"/>
        <div className="grid grid-cols-3 tf-grid-3 gap-6">
          <div className="col-span-1">
            <Card className="p-5">
              <h3 className="font-medium text-[#211922] mb-4">生成条件</h3>
              <div className="space-y-4">
                <div><label className="text-xs text-[#91918c] mb-1 block">スキル名</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={localSkill} onChange={e => setLocalSkill(e.target.value)}/></div>
                <div><label className="text-xs text-[#91918c] mb-1 block">レベル</label><select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={localLevel} onChange={e => setLocalLevel(e.target.value)}><option>初級</option><option>中級</option><option>上級</option></select></div>
                <div><label className="text-xs text-[#91918c] mb-1 block">区分</label><select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200"><option>必須</option><option>歓迎</option></select></div>
                <div><label className="text-xs text-[#91918c] mb-1 block">評価観点</label><textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 h-20 resize-none" placeholder="例：設計力、実務経験、トラブルシューティング能力" defaultValue="設計力、実務経験、問題解決能力"/></div>
                <button onClick={generateAssessment} disabled={asmGenerating} className="w-full bg-[#211922] hover:bg-[#2e2630] rounded-2xl text-white py-2.5 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50">
                  {asmGenerating ? <RefreshCw size={16} className="animate-spin"/> : <Sparkles size={16}/>}アセスメントを生成
                </button>
              </div>
            </Card>
          </div>
          <div className="col-span-2">
            {asmGenerating && <LoadingAI text="AIがアセスメントを生成中..."/>}
            {!asmGenerating && genResult && (
              <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-[#211922] flex items-center gap-2">{genResult.skill} {genResult.level}アセスメント <AIBadge/></h3>
                  <span className="text-xs text-[#91918c]">合計: {genResult.questions.reduce((s, q) => s + q.points, 0)}点</span>
                </div>
                <div className="space-y-4">
                  {genResult.questions.map((q, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-[#91918c]">Q{i + 1} ・ {q.type} ・ {q.points}点</span>
                        <button className="text-xs font-medium text-[#91918c] hover:text-[#211922]">編集</button>
                      </div>
                      <p className="text-sm text-[#211922] mb-2">{q.q}</p>
                      {q.options && (
                        <div className="ml-4 space-y-1">{q.options.map((o, j) => <label key={j} className="flex items-center gap-2 text-sm text-[#62625b]"><input type="radio" name={`q${i}`} disabled className="border-[#e5e5e0] text-[#211922] focus:ring-slate-200"/>{o}</label>)}</div>
                      )}
                      <div className="mt-2 text-xs text-[#91918c]">評価観点: {q.criteria}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            {!asmGenerating && !genResult && (
              <div className="flex items-center justify-center h-64 text-[#91918c] text-sm">左の条件を設定してアセスメントを生成してください</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const TrainingScreen = () => (
    <div>
      <PageHeader title="育成プラン管理" subtitle="候補者ごとの育成プランと進捗を管理"/>
      <div className="grid grid-cols-3 tf-grid-3 gap-4">
        {Object.values(TRAINING_PLANS).map(tp => {
          const c = CANDIDATES.find(c => c.id === tp.candidateId);
          if (!c) return null;
          const overallProgress = Math.round(tp.items.reduce((s, i) => s + i.progress, 0) / tp.items.length);
          return (
            <Card key={tp.candidateId} className="p-0 cursor-pointer transition-all hover:translate-y-[-2px]" onClick={() => { setTrainingTarget(c); navigate("training-detail"); }}>
              <CandidateCardBody candidate={c} matchScore={tp.currentMatch} showClose={false} compact/>
              {/* Training Progress overlay */}
              <div className="px-5 pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-[#f6f6f3] text-[#211922] px-2 py-0.5 rounded-full border border-[#e5e5e0]">目標: {tp.targetRole}</span>
                  <AIBadge/>
                </div>
                <div className="grid grid-cols-2 tf-grid-2 gap-3 text-xs mb-2">
                  <div><span className="text-[#91918c]">目標マッチ度</span><p className="font-medium text-sm" style={{color: MORPHY.primaryBlue}}>{tp.targetMatch}%</p></div>
                  <div><span className="text-[#91918c]">進捗</span><p className="font-medium text-sm">{overallProgress}%</p></div>
                </div>
                <MatchBar value={overallProgress} size="sm"/>
                <div className="flex flex-wrap gap-1.5 mt-2">{tp.items.map((item, i) => <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${item.progress > 0 ? "bg-[#f6f6f3] text-[#211922]" : "bg-[#e5e5e0]/50 text-[#91918c]"}`}>{item.theme}</span>)}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // ======== Admin: Training Master Screen ========
  const TrainingMasterScreen = () => {
    const categories = ["すべて", "社内技術", "社内ビジネス", "外部資格", "eラーニング"];
    const [catFilter, setCatFilter] = useState("すべて");
    const [searchQ, setSearchQ] = useState("");
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [assignModal, setAssignModal] = useState(null);
    const [assignToast, setAssignToast] = useState(null);

    const filtered = TRAINING_MASTER.filter(t =>
      (catFilter === "すべて" || t.category === catFilter) &&
      (searchQ === "" || t.title.toLowerCase().includes(searchQ.toLowerCase()) || t.targetSkills.some(s => s.toLowerCase().includes(searchQ.toLowerCase())))
    );

    const catIcon = (cat) => {
      switch(cat) {
        case "社内技術": return <Monitor size={14} className="text-blue-600"/>;
        case "社内ビジネス": return <Users size={14} className="text-purple-600"/>;
        case "外部資格": return <Award size={14} className="text-amber-600"/>;
        case "eラーニング": return <BookOpen size={14} className="text-green-600"/>;
        default: return <BookOpen size={14}/>;
      }
    };
    const catColor = (cat) => {
      switch(cat) {
        case "社内技術": return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" };
        case "社内ビジネス": return { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" };
        case "外部資格": return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" };
        case "eラーニング": return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" };
        default: return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };
      }
    };

    // Assign training to candidate
    const assignTraining = (trainingId, candidateId) => {
      setCandidateTrainings(prev => {
        if (prev.find(ct => ct.candidateId === candidateId && ct.trainingId === trainingId)) return prev;
        return [...prev, { candidateId, trainingId, status: "未着手", progress: 0, startDate: null, completedDate: null, score: null }];
      });
      setAssignModal(null);
      setAssignToast("受講指示を送信しました");
      setTimeout(() => setAssignToast(null), 3000);
    };

    // Detail view
    if (selectedTraining) {
      const t = selectedTraining;
      const cc = catColor(t.category);
      const enrolledCands = candidateTrainings.filter(ct => ct.trainingId === t.id).map(ct => ({ ...ct, candidate: CANDIDATES.find(c => c.id === ct.candidateId) })).filter(e => e.candidate);

      return (
        <div>
          <PageHeader title={t.title} subtitle="研修詳細" onBack={() => setSelectedTraining(null)}/>

          <div className="grid grid-cols-3 tf-grid-3 gap-6">
            <div className="col-span-2 space-y-5">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cc.bg} ${cc.text} border ${cc.border}`}>{t.category}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#f6f6f3] text-[#62625b] border border-[#e5e5e0]">{t.level}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#f6f6f3] text-[#62625b] border border-[#e5e5e0]">{t.format}</span>
                </div>
                <p className="text-sm text-[#62625b] leading-relaxed mb-4">{t.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#f6f6f3]"><span className="text-xs text-[#91918c] block mb-0.5">所要時間</span><span className="text-sm font-medium">{t.duration}</span></div>
                  <div className="p-3 rounded-lg bg-[#f6f6f3]"><span className="text-xs text-[#91918c] block mb-0.5">提供元</span><span className="text-sm font-medium">{t.provider}</span></div>
                  <div className="p-3 rounded-lg bg-[#f6f6f3]"><span className="text-xs text-[#91918c] block mb-0.5">前提条件</span><span className="text-sm font-medium">{t.prerequisites}</span></div>
                  <div className="p-3 rounded-lg bg-[#f6f6f3]"><span className="text-xs text-[#91918c] block mb-0.5">費用</span><span className="text-sm font-medium">{t.cost === 0 ? "無料" : `¥${t.cost.toLocaleString()}`}</span></div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-medium text-[#211922] mb-3 flex items-center gap-2"><Target size={16} style={{color: MORPHY.red}}/>対象スキル</h3>
                <div className="flex flex-wrap gap-2">
                  {t.targetSkills.map(s => <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#e5e5e0] text-[#211922] font-medium">{s}</span>)}
                </div>
              </Card>

              {/* Enrolled candidates */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-[#211922] flex items-center gap-2"><Users size={16} style={{color: MORPHY.plumBlack}}/>受講者一覧<span className="text-xs px-2 py-0.5 rounded-full bg-[#f6f6f3] text-[#62625b]">{enrolledCands.length}名</span></h3>
                  <button onClick={() => setAssignModal(t)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{background: MORPHY.red}}><Plus size={12}/>受講指示</button>
                </div>
                {enrolledCands.length === 0 ? (
                  <p className="text-sm text-[#91918c] text-center py-6">受講者はまだいません</p>
                ) : (
                  <div className="space-y-2">
                    {enrolledCands.map(ec => (
                      <div key={ec.candidateId} className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: MORPHY.fog, border: `1px solid ${MORPHY.cardBorder}`}}>
                        <div className="flex items-center gap-3">
                          <CandidateAvatar candidate={ec.candidate} size="sm"/>
                          <div>
                            <span className="text-sm font-medium text-[#211922]">{ec.candidate.name}</span>
                            <span className="text-xs text-[#91918c] ml-2">{ec.candidate.currentRole}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-[#e5e5e0] rounded-full h-1.5 overflow-hidden">
                            <div className="h-full rounded-full" style={{width: `${ec.progress}%`, backgroundColor: ec.status === "完了" ? "#15803d" : MORPHY.red}}/>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ec.status === "完了" ? "bg-green-50 text-green-700" : ec.status === "受講中" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"}`}>{ec.status}</span>
                          {ec.score && <span className="text-xs font-medium text-[#211922]">{ec.score}点</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="text-sm font-medium text-[#211922] mb-3">スケジュール</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-[#91918c]">開催頻度</span><span className="font-medium">{t.schedule}</span></div>
                  {t.nextDate && <div className="flex justify-between"><span className="text-[#91918c]">次回開催</span><span className="font-medium">{t.nextDate}</span></div>}
                  {t.maxParticipants && <div className="flex justify-between"><span className="text-[#91918c]">定員</span><span className="font-medium">{t.maxParticipants}名</span></div>}
                </div>
              </Card>
              <Card className="p-4">
                <h4 className="text-sm font-medium text-[#211922] mb-3">統計</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-[#91918c]">受講者数</span><span className="font-medium">{enrolledCands.length}名</span></div>
                  <div className="flex justify-between"><span className="text-[#91918c]">完了者数</span><span className="font-medium">{enrolledCands.filter(e => e.status === "完了").length}名</span></div>
                  {enrolledCands.filter(e => e.score).length > 0 && <div className="flex justify-between"><span className="text-[#91918c]">平均スコア</span><span className="font-medium">{Math.round(enrolledCands.filter(e => e.score).reduce((s, e) => s + e.score, 0) / enrolledCands.filter(e => e.score).length)}点</span></div>}
                </div>
              </Card>
            </div>
          </div>

          {/* Assign modal */}
          {assignModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" style={{backgroundColor: "rgba(0,0,0,0.3)"}}>
              <Card className="w-full max-w-md p-6 mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-[#211922]">受講指示を送信</h3>
                  <button onClick={() => setAssignModal(null)} className="p-1 rounded hover:bg-[#f6f6f3]"><X size={16}/></button>
                </div>
                <p className="text-xs text-[#91918c] mb-4">「{assignModal.title}」の受講を指示する要員を選択</p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {CANDIDATES.filter(c => !candidateTrainings.find(ct => ct.candidateId === c.id && ct.trainingId === assignModal.id)).slice(0, 10).map(c => (
                    <button key={c.id} onClick={() => assignTraining(assignModal.id, c.id)} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#f6f6f3] transition-colors text-left" style={{border: `1px solid ${MORPHY.cardBorder}`}}>
                      <CandidateAvatar candidate={c} size="sm"/>
                      <div>
                        <span className="text-sm font-medium text-[#211922]">{c.name}</span>
                        <span className="text-xs text-[#91918c] ml-2">{c.currentRole}</span>
                      </div>
                      <Send size={14} className="text-[#91918c] ml-auto"/>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      );
    }

    return (
      <div>
        <PageHeader title="研修マスタ" subtitle={`${TRAINING_MASTER.length}件の研修コース`}/>

        {/* Toast */}
        {assignToast && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#211922] text-white text-sm shadow-lg">
            <CheckCircle size={16} className="text-green-400"/>{assignToast}
          </div>
        )}

        {/* Search & Filter */}
        <Card className="p-4 mb-5">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#91918c]"/>
              <input className="w-full text-sm rounded-lg border border-[#e5e5e0] bg-white pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e60023]/20" placeholder="研修名・スキルで検索..." value={searchQ} onChange={e => setSearchQ(e.target.value)}/>
            </div>
            <div className="flex items-center gap-1.5">
              {categories.map(cat => {
                const count = cat === "すべて" ? TRAINING_MASTER.length : TRAINING_MASTER.filter(t => t.category === cat).length;
                return <button key={cat} onClick={() => setCatFilter(cat)} className={`text-xs px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${catFilter === cat ? "bg-[#211922] text-white" : "bg-[#f6f6f3] text-[#62625b] hover:bg-[#e5e5e0]"}`}>{cat}<span className={`text-[10px] px-1.5 py-0.5 rounded-full ${catFilter === cat ? "bg-white/20" : "bg-[#e5e5e0]"}`}>{count}</span></button>;
              })}
            </div>
          </div>
        </Card>

        {/* Training cards */}
        <div className="grid grid-cols-2 tf-grid-3 gap-4">
          {filtered.map(t => {
            const cc = catColor(t.category);
            const enrolled = candidateTrainings.filter(ct => ct.trainingId === t.id).length;
            return (
              <Card key={t.id} className="p-5 cursor-pointer hover:shadow-md transition-all" onClick={() => setSelectedTraining(t)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {catIcon(t.category)}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cc.bg} ${cc.text} border ${cc.border}`}>{t.category}</span>
                  </div>
                  <span className="text-xs text-[#91918c]">{t.level}</span>
                </div>
                <h4 className="text-sm font-medium text-[#211922] mb-2 line-clamp-2">{t.title}</h4>
                <p className="text-xs text-[#91918c] mb-3 line-clamp-2">{t.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {t.targetSkills.map(s => <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-[#f6f6f3] text-[#62625b]">{s}</span>)}
                </div>
                <div className="flex items-center justify-between text-xs text-[#91918c] pt-2" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                  <span>{t.duration} ・ {t.provider}</span>
                  <div className="flex items-center gap-2">
                    {enrolled > 0 && <span className="flex items-center gap-1"><Users size={11}/>{enrolled}名受講</span>}
                    <span>{t.cost === 0 ? "無料" : `¥${t.cost.toLocaleString()}`}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const TrainingDetailScreen = () => {
    const c = trainingTarget;
    if (!c) return <div className="text-center py-20"><p className="text-[#91918c] mb-4">育成対象が選択されていません</p><button onClick={goBack} className="px-4 py-2 rounded-lg text-sm bg-[#e60023] text-white">戻る</button></div>;
    const tp = TRAINING_PLANS[c.id];
    const overallProgress = tp ? Math.round(tp.items.reduce((s, i) => s + i.progress, 0) / tp.items.length) : 0;
    const [genState, setGenState] = useState("idle"); // "idle" | "form" | "generating" | "done"
    const [targetJDId, setTargetJDId] = useState(JDS[0]?.id || "");
    const [generatedPlan, setGeneratedPlan] = useState(null);

    const generateNewPlan = () => {
      setGenState("generating");
      const targetJD = JDS.find(j => j.id === targetJDId);
      setTimeout(() => {
        const gaps = (targetJD?.requiredSkills || ["AWS", "Docker", "Linux"]).filter(rs => {
          const skillName = rs.split("（")[0].toLowerCase();
          return !c.skills.some(s => s.name.toLowerCase().includes(skillName));
        });
        const gapItems = gaps.map((g, i) => ({
          theme: `${g.split("（")[0]} 基礎〜実践`, priority: i === 0 ? "高" : "中",
          order: i + 1, duration: `${2 + Math.floor(Math.random() * 2)}週間`,
          goal: `${g.split("（")[0]}の実務レベルの理解と基本操作が可能`, progress: 0, status: "未着手"
        }));
        const existingItems = c.skills.filter(s => s.level <= 2).slice(0, 2).map((s, i) => ({
          theme: `${s.name} スキルアップ`, priority: "中",
          order: gapItems.length + i + 1, duration: "2週間",
          goal: `${s.name}のレベルを${s.level}→${s.level + 1}に引き上げ`, progress: 0, status: "未着手"
        }));
        const allItems = [...gapItems, ...existingItems].slice(0, 6);
        if (allItems.length === 0) {
          allItems.push({ theme: "実践プロジェクト演習", priority: "高", order: 1, duration: "3週間", goal: "模擬環境での実務演習を通じた総合力強化", progress: 0, status: "未着手" });
        }
        const currentMatch = Math.round(30 + Math.random() * 30);
        setGeneratedPlan({
          candidateId: c.id, targetJD: targetJDId,
          targetRole: targetJD?.title || "事務スタッフ",
          currentMatch, targetMatch: Math.min(currentMatch + 25 + Math.round(Math.random() * 10), 90),
          estimatedPeriod: `${1 + allItems.length}ヶ月`,
          items: allItems
        });
        setGenState("done");
      }, 1800);
    };

    if (!tp && genState !== "done") {
      return (
        <div>
          <PageHeader title="育成プラン生成" subtitle={`${c.name}（${c.id}）の育成プラン`} onBack={goBack}/>

          {genState === "generating" && <LoadingAI text={`${c.name}のスキル・職歴・Gapを分析し育成プランを生成中...`}/>}

          {genState !== "generating" && (
            <div className="grid grid-cols-3 tf-grid-3 gap-6">
              <div className="col-span-2">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <CandidateAvatar candidate={c} size="md"/>
                    <div>
                      <h3 className="font-medium text-[#211922]">{c.name}（{c.id}）</h3>
                      <p className="text-sm text-[#91918c]">経験{c.totalYears}年 ・ {c.location}</p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h4 className="text-sm font-medium text-[#211922] mb-2">現在のスキル</h4>
                    <div className="flex flex-wrap gap-2">
                      {c.skills.map(s => (
                        <span key={s.name} className="bg-[#e5e5e0]/50 text-[#211922] px-2.5 py-1 rounded-full text-xs">{s.name} Lv{s.level}（{s.years}年）</span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="text-sm font-medium text-[#211922] mb-2 block">目標JD / 商談要件を選択</label>
                    <select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1]" value={targetJDId} onChange={e => setTargetJDId(e.target.value)}>
                      {JDS.map(j => <option key={j.id} value={j.id}>{j.title}（{j.id}）</option>)}
                    </select>
                    {targetJDId && (() => {
                      const tj = JDS.find(j => j.id === targetJDId);
                      if (!tj) return null;
                      const gaps = tj.requiredSkills.filter(rs => {
                        const sn = rs.split("（")[0].toLowerCase();
                        return !c.skills.some(s => s.name.toLowerCase().includes(sn));
                      });
                      const fits = tj.requiredSkills.filter(rs => {
                        const sn = rs.split("（")[0].toLowerCase();
                        return c.skills.some(s => s.name.toLowerCase().includes(sn));
                      });
                      return (
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <h5 className="text-xs font-medium text-[#211922] mb-1 flex items-center gap-1"><CheckCircle size={12}/>Fit（{fits.length}）</h5>
                            <div className="space-y-0.5">{fits.length > 0 ? fits.map(f => <div key={f} className="text-xs text-green-600">{f}</div>) : <div className="text-xs text-[#91918c]">なし</div>}</div>
                          </div>
                          <div className="p-3 bg-red-50 rounded-lg">
                            <h5 className="text-xs font-medium text-red-700 mb-1 flex items-center gap-1"><AlertCircle size={12}/>Gap（{gaps.length}）</h5>
                            <div className="space-y-0.5">{gaps.length > 0 ? gaps.map(g => <div key={g} className="text-xs text-red-600">{g}</div>) : <div className="text-xs text-[#91918c]">なし</div>}</div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <button onClick={generateNewPlan} className="w-full bg-[#211922] hover:bg-[#2e2630] rounded-2xl text-white py-3 text-sm font-medium flex items-center justify-center gap-2">
                    <Sparkles size={16}/>AIで育成プランを生成
                  </button>
                </Card>
              </div>
              <div className="space-y-4">
                <Card className="p-4">
                  <h4 className="text-sm font-medium text-[#211922] mb-2">候補者の志向</h4>
                  <p className="text-xs text-[#62625b]">{c.aspiration}</p>
                  <div className="mt-2"><span className="text-xs text-[#91918c]">やりたい仕事</span><p className="text-xs text-[#62625b]">{c.wantToDo}</p></div>
                </Card>
                <Card className="p-4 bg-[#f6f6f3]">
                  <h4 className="text-sm font-medium text-[#211922] mb-2 flex items-center gap-1"><Sparkles size={14}/>AI生成について</h4>
                  <p className="text-xs text-[#211922]">候補者のスキル・職歴・アセスメント結果と、選択したJDのGapを分析し、最適な育成プランを自動生成します。</p>
                </Card>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Show generated plan or existing plan
    const displayPlan = tp || generatedPlan;
    const displayProgress = tp ? overallProgress : 0;

    return (
      <div>
        <PageHeader title={`育成プラン: ${c.name}`} subtitle={`目標: ${displayPlan.targetRole} ・ 期間: ${displayPlan.estimatedPeriod}`} onBack={goBack}/>
        {!tp && <div className="mb-4 p-3 bg-[#f6f6f3] rounded-lg flex items-center gap-2 text-sm text-[#211922]" style={{border: `1px solid ${MORPHY.cardBorder}`}}><CheckCircle size={16}/>AIが育成プランを生成しました</div>}
        <div className="grid grid-cols-3 tf-grid-3 gap-6">
          <div className="col-span-2 space-y-4">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#211922] flex items-center gap-2">学習計画 <AIBadge/></h3>
                <span className="text-sm text-[#91918c]">全体進捗: {displayProgress}%</span>
              </div>
              <div className="space-y-3">
                {displayPlan.items.map((item, i) => (
                  <div key={i} className={`border border-[#e5e5e0] rounded-lg p-4 ${item.status === "進行中" ? "bg-[#f6f6f3]/30" : ""}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${item.progress === 100 ? "bg-[#e60023] text-white" : item.progress > 0 ? "bg-[#211922] text-white" : "bg-[#e5e5e0] text-[#91918c]"}`}>{item.order}</span>
                        <h4 className="font-medium text-sm text-[#211922]">{item.theme}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === "進行中" ? "bg-[#e5e5e0] text-[#211922]" : item.status === "完了" ? "bg-[#e5e5e0] text-[#211922]" : "bg-[#e5e5e0]/50 text-[#91918c]"}`}>{item.status}</span>
                        <span className={`text-xs ${getPriorityColor(item.priority)}`}>●{item.priority}</span>
                      </div>
                      <span className="text-xs text-[#91918c]">{item.duration}</span>
                    </div>
                    <p className="text-xs text-[#91918c] mb-2">到達目標: {item.goal}</p>
                    <MatchBar value={item.progress} size="sm"/>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">マッチ度推移</h3>
              <div className="space-y-3">
                <MatchBar value={displayPlan.currentMatch} label="現在"/>
                <div className="flex items-center justify-center py-2"><ArrowUpRight size={20} className="text-[#91918c]"/></div>
                <MatchBar value={displayPlan.targetMatch} label="育成後目標"/>
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">候補者情報</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-xs text-[#91918c]">名前</span><p>{c.name}</p></div>
                <div><span className="text-xs text-[#91918c]">経験年数</span><p>{c.totalYears}年</p></div>
                <div><span className="text-xs text-[#91918c]">志向</span><p className="text-xs text-[#62625b]">{c.aspiration}</p></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // CANDIDATE SCREENS
  // ============================================================
  const MyPageScreen = () => {
    const c = candidateProfile;
    const tp = TRAINING_PLANS[c.id];
    const trainingProgress = tp ? Math.round(tp.items.reduce((s, i) => s + i.progress, 0) / tp.items.length) : 0;

    return (
      <div>
        <PageHeader title={`こんにちは、${c.name.split(" ")[1]}さん`} subtitle="マイページ"/>
        <div className="grid grid-cols-3 tf-grid-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="grid grid-cols-3 tf-grid-3 gap-4">
              <StatCard icon={<Award size={20} className="text-[#211922]"/>} label="スキルスコア" value={Math.round(Object.values(c.assessments).reduce((s,v) => s+v, 0) / Object.keys(c.assessments).length)} sub="平均アセスメント" color="blue"/>
              <StatCard icon={<GraduationCap size={20} className="text-[#62625b]"/>} label="育成進捗" value={`${trainingProgress}%`} sub={tp ? tp.targetRole : "プランなし"} color="amber"/>
              <StatCard icon={<Target size={20} className="text-green-600"/>} label="マッチ案件" value="3" sub="候補案件数" color="green"/>
            </div>

            {tp && (
              <Card className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-[#211922]">現在の育成プラン</h3>
                  <button onClick={() => navigate("candidate-training")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">詳細 →</button>
                </div>
                <p className="text-sm text-[#91918c] mb-3">目標: {tp.targetRole} ・ 期間: {tp.estimatedPeriod}</p>
                <MatchBar value={trainingProgress} label="全体進捗"/>
                <div className="mt-3 space-y-1">
                  {tp.items.filter(i => i.status === "進行中").map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#211922] bg-[#f6f6f3] rounded-lg p-2">
                      <Clock size={14}/><span className="font-medium">{item.theme}</span><span className="ml-auto text-xs">{item.progress}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-[#211922]">スキルサマリ</h3>
                <button onClick={() => navigate("candidate-profile")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">編集 →</button>
              </div>
              <div className="grid grid-cols-2 tf-grid-2 gap-3">
                {c.skills.map(s => (
                  <div key={s.name} className="flex items-center gap-2">
                    <span className="text-sm w-24 text-[#211922]">{s.name}</span>
                    <div className="flex gap-0.5 flex-1">{[1,2,3,4,5].map(l => <div key={l} className={`flex-1 h-2 rounded ${l <= s.level ? "bg-[#211922]" : "bg-[#e5e5e0]"}`}></div>)}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">プロフィール</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><User size={14} className="text-[#91918c]"/>{c.name}</div>
                <div className="flex items-center gap-2"><MapPin size={14} className="text-[#91918c]"/>{c.location}</div>
                <div className="flex items-center gap-2"><Monitor size={14} className="text-[#91918c]"/>{c.workCondition}</div>
                <div className="flex items-center gap-2"><Briefcase size={14} className="text-[#91918c]"/>経験{c.totalYears}年</div>
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">クイックアクション</h3>
              <div className="space-y-2">
                <button onClick={() => navigate("candidate-profile")} className="w-full text-left text-sm p-4 rounded-lg hover:bg-[#f6f6f3] flex items-center gap-2.5 border border-[#e5e5e0]"><Edit3 size={14}/>プロフィール編集</button>
                <button onClick={() => navigate("candidate-assessments")} className="w-full text-left text-sm p-4 rounded-lg hover:bg-[#f6f6f3] flex items-center gap-2.5 border border-[#e5e5e0]"><Award size={14}/>アセスメント受験</button>
                <button onClick={() => navigate("candidate-resume")} className="w-full text-left text-sm p-4 rounded-lg hover:bg-[#f6f6f3] flex items-center gap-2.5 border border-[#e5e5e0]"><FileText size={14}/>職務経歴書確認</button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const MyProfileScreen = () => {
    const c = candidateProfile;
    return (
      <div>
        <PageHeader title="プロフィール編集" subtitle="スキル、志向、働き方条件を更新" onBack={goBack}/>
        <div className="grid grid-cols-2 tf-grid-2 gap-6">
          <Card className="p-6">
            <h3 className="font-medium text-[#211922] mb-4">基本情報・志向</h3>
            <div className="space-y-4">
              <div><label className="text-xs text-[#6b6b66] mb-1 block">キャリア志向</label><textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 h-20 resize-none" defaultValue={c.aspiration}/></div>
              <div><label className="text-xs text-[#6b6b66] mb-1 block">やりたい仕事</label><textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 h-16 resize-none" defaultValue={c.wantToDo}/></div>
              <div><label className="text-xs text-[#6b6b66] mb-1 block">避けたい仕事</label><textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 h-16 resize-none" defaultValue={c.avoidToDo}/></div>
              <div className="grid grid-cols-2 tf-grid-2 gap-4">
                <div><label className="text-xs text-[#6b6b66] mb-1 block">希望勤務地</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" defaultValue={c.location}/></div>
                <div><label className="text-xs text-[#6b6b66] mb-1 block">派遣先変更意向</label><select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" defaultValue={c.changeIntent}><option>積極的に検討中</option><option>良い派遣先があれば検討</option><option>条件次第で検討</option><option>現在の派遣先に満足</option></select></div>
              </div>
              <div className="grid grid-cols-2 tf-grid-2 gap-4">
                <div><label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked={c.remoteOk} className="rounded border-[#e5e5e0] text-[#211922] focus:ring-slate-200"/>リモート勤務可</label></div>
                <div><label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked={c.onsiteOk} className="rounded border-[#e5e5e0] text-[#211922] focus:ring-slate-200"/>出社勤務可</label></div>
              </div>
              <div><label className="text-xs text-[#6b6b66] mb-1 block">就業条件</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" defaultValue={c.workCondition}/></div>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-medium text-[#211922] mb-4">スキル・資格</h3>
            <div className="space-y-3">
              {c.skills.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-[#f6f6f3] rounded-lg">
                  <input className="border border-[#e5e5e0] rounded-lg px-2.5 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1]" defaultValue={s.name}/>
                  <select className="border border-[#e5e5e0] rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1]" defaultValue={s.level}>{[1,2,3,4,5].map(l => <option key={l} value={l}>Lv{l}</option>)}</select>
                  <input className="border border-[#e5e5e0] rounded-lg px-2.5 py-2 text-sm w-16 focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1]" defaultValue={s.years} type="number" step="0.5"/>
                  <span className="text-xs text-[#91918c]">年</span>
                </div>
              ))}
              <button className="text-sm text-[#62625b] hover:text-[#211922] flex items-center gap-1"><Plus size={14}/>スキルを追加</button>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-[#211922] mb-2">資格</h4>
              <div className="space-y-2">
                {c.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-[#f6f6f3] rounded-lg"><Award size={14} className="text-[#91918c]"/><input className="flex-1 border border-[#e5e5e0] rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1]" defaultValue={cert}/></div>
                ))}
                <button className="text-sm text-[#62625b] hover:text-[#211922] flex items-center gap-1"><Plus size={14}/>資格を追加</button>
              </div>
            </div>
            <button className="mt-6 w-full bg-[#e60023] text-white rounded-2xl transition-all duration-200 py-2.5 text-sm font-medium">保存する</button>
          </Card>
        </div>
      </div>
    );
  };

  const MyCareerScreen = () => {
    const c = candidateProfile;
    return (
      <div>
        <PageHeader title="職歴管理" subtitle="プロジェクト経験を構造化して管理" onBack={goBack}/>
        <div className="space-y-4">
          {c.careerHistory.map((h, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2"><Calendar size={16} className="text-[#91918c]"/><span className="text-sm font-medium text-[#62625b]">{h.period}</span></div>
                <button className="text-xs font-medium text-[#91918c] hover:text-[#211922]">編集</button>
              </div>
              <div className="grid grid-cols-2 tf-grid-2 gap-4">
                <div><label className="text-xs text-[#91918c]">プロジェクト名</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 mt-1" defaultValue={h.project}/></div>
                <div><label className="text-xs text-[#91918c]">役割</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 mt-1" defaultValue={h.role}/></div>
                <div className="col-span-2"><label className="text-xs text-[#91918c]">業務内容</label><textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 mt-1 h-16 resize-none" defaultValue={h.detail}/></div>
                <div><label className="text-xs text-[#91918c]">担当工程</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 mt-1" defaultValue={h.phase}/></div>
                <div><label className="text-xs text-[#91918c]">チーム規模</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 mt-1" defaultValue={`${h.team}名`}/></div>
                <div className="col-span-2"><label className="text-xs text-[#91918c]">使用技術</label><div className="flex flex-wrap gap-1.5 mt-1">{h.tech.map(t => <span key={t} className="bg-[#f6f6f3] text-[#211922] px-2 py-0.5 rounded-full text-xs">{t}</span>)}</div></div>
              </div>
            </Card>
          ))}
          <button className="w-full border-2 border-dashed border-[#e5e5e0] rounded-lg p-4 text-sm text-[#91918c] hover:border-[#c8c8c1] hover:text-[#211922] flex items-center justify-center gap-2"><Plus size={16}/>職歴を追加</button>
        </div>
      </div>
    );
  };

  const AssessmentTakeScreen = () => {
    const exam = selectedCandidate || { skill: "AWS", level: "中級", duration: "30分" };
    const [phase, setPhase] = useState("intro");
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const questions = [
      { q: `${exam.skill}において、業務効率を高めるために最も重要な取り組みはどれですか？`, opts: ["手作業による二重チェック", "業務フローの標準化と自動化", "個人の裁量に任せる", "残業で対応する"], correct: 1 },
      { q: `${exam.skill}の${exam.level}レベルで求められるスキルとして最も適切なものはどれですか？`, opts: ["基本用語の理解のみ", "実務での応用・改善提案力", "概念の暗記", "マニュアル読解のみ"], correct: 1 },
      { q: `${exam.skill}の実務において、正確性を担保するために重要なことはどれですか？`, opts: ["スピード最優先", "ダブルチェックと記録管理", "口頭報告のみ", "自己判断で完結"], correct: 1 },
      { q: `${exam.skill}に関連する業務で、コンプライアンス上正しい対応はどれですか？`, opts: ["個人情報を共有フォルダに保存", "規定に基づいた情報管理", "パスワードの使い回し", "ログの無効化"], correct: 1 },
      { q: `${exam.skill}の業務改善アプローチとして適切なものはどれですか？`, opts: ["現状維持を優先", "データに基づく業務分析と改善", "問題を報告しない", "手作業を増やして対応"], correct: 1 },
    ];
    const totalQ = questions.length;

    if (phase === "intro") return (
      <div>
        <PageHeader title={`${exam.skill} ${exam.level}アセスメント`} subtitle="スキルレベルを測定します" onBack={goBack}/>
        <Card className="p-8 max-w-lg mx-auto text-center">
          <Award size={48} className="text-[#211922] mx-auto mb-4"/>
          <h2 className="text-xl font-medium text-[#211922] mb-2">{exam.skill} {exam.level}アセスメント</h2>
          <p className="text-sm text-[#91918c] mb-1">問題数: {totalQ}問 ｜ 所要時間: {exam.duration || "20分"}</p>
          <p className="text-xs text-[#91918c] mb-6">制限時間内に全問回答してください。途中保存はできません。</p>
          <button onClick={() => setPhase("quiz")} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-8 py-3 font-medium">受験を開始する</button>
        </Card>
      </div>
    );

    if (phase === "quiz") return (
      <div>
        <PageHeader title={`${exam.skill} アセスメント`} subtitle={`問題 ${currentQ + 1} / ${totalQ}`} onBack={goBack}/>
        <Card className="p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-[#91918c]">進捗</span>
            <span className="text-xs text-[#211922] font-medium">{Math.round(((currentQ + (answers[currentQ] !== undefined ? 1 : 0)) / totalQ) * 100)}%</span>
          </div>
          <div className="w-full bg-[#e5e5e0]/50 rounded-full h-2 mb-6"><div className="h-2 rounded-full transition-all" style={{background: MORPHY.plumBlack, width: `${((currentQ) / totalQ) * 100}%`}}/></div>
          <h3 className="text-base font-medium text-[#211922] mb-6">Q{currentQ + 1}. {questions[currentQ].q}</h3>
          <div className="space-y-3">
            {questions[currentQ].opts.map((opt, oi) => (
              <button key={oi} onClick={() => setAnswers(prev => ({ ...prev, [currentQ]: oi }))}
                className={`w-full text-left p-4 rounded-lg border-2 text-sm transition-all ${answers[currentQ] === oi ? "bg-[#f6f6f3] text-[#211922]" : "border-[#e5e5e0] hover:border-[#e0e0d9] text-[#211922]"}`} style={answers[currentQ] === oi ? {borderColor: MORPHY.primaryBlue} : {}}>
                <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} className="text-sm text-[#91918c] hover:text-[#211922] disabled:opacity-30">← 前の問題</button>
            {currentQ < totalQ - 1 ? (
              <button onClick={() => setCurrentQ(currentQ + 1)} disabled={answers[currentQ] === undefined} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-6 py-2 text-sm font-medium disabled:opacity-50">次の問題 →</button>
            ) : (
              <button onClick={() => setPhase("result")} disabled={answers[currentQ] === undefined} className="bg-[#e60023] text-white px-6 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50">回答を提出</button>
            )}
          </div>
        </Card>
      </div>
    );

    const score = Math.round(Object.entries(answers).filter(([qi, ai]) => questions[parseInt(qi)].correct === ai).length / totalQ * 100);
    return (
      <div>
        <PageHeader title="アセスメント結果" subtitle={`${exam.skill} ${exam.level}`} onBack={goBack}/>
        <Card className="p-8 max-w-lg mx-auto text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${score >= 70 ? "bg-[#e5e5e0]" : "bg-[#e5e5e0]"}`}>
            <span className={`text-3xl font-medium ${score >= 70 ? "text-[#211922]" : "text-yellow-700"}`}>{score}</span>
          </div>
          <h2 className="text-lg font-medium text-[#211922] mb-1">{score >= 70 ? "合格" : "不合格"}</h2>
          <p className="text-sm text-[#91918c] mb-6">正答率: {score}% （合格ライン: 70%）</p>
          <div className="text-left space-y-2 mb-6">
            {questions.map((q, qi) => (
              <div key={qi} className="flex items-center gap-2 text-sm">
                {answers[qi] === q.correct ? <CheckCircle size={16} className="text-green-500"/> : <XCircle size={16} className="text-red-500"/>}
                <span className="text-[#211922]">Q{qi + 1}: {answers[qi] === q.correct ? "正解" : "不正解"}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("candidate-assessments")} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-6 py-2.5 text-sm font-medium">アセスメント一覧に戻る</button>
        </Card>
      </div>
    );
  };

  const MyAssessmentsScreen = () => {
    const c = candidateProfile;
    const myCertified = jobCategories.filter(jc => jc.certifiedCandidates.includes(c.id));
    const myUncertified = jobCategories.filter(jc => !jc.certifiedCandidates.includes(c.id));
    const mySkillCertified = skillMaster.filter(sk => sk.certifiedCandidates.includes(c.id));
    const mySkillEligible = skillMaster.filter(sk => !sk.certifiedCandidates.includes(c.id) && sk.requiredCerts.some(rc => (c.certifications || []).some(cc => cc.includes(rc.replace(/ (Professional|Associate|Specialty)/, "")))));
    const [takingAssessment, setTakingAssessment] = useState(null);
    const [assessProgress, setAssessProgress] = useState(0);
    const [assessResult, setAssessResult] = useState(null);
    const [assessType, setAssessType] = useState("job"); // "job" | "skill"

    const startAssessment = (item, type) => {
      setTakingAssessment(item);
      setAssessType(type);
      setAssessProgress(0);
      setAssessResult(null);
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 15 + 5;
        if (p >= 100) { p = 100; clearInterval(interval);
          const score = Math.round(50 + Math.random() * 45);
          const passed = score >= item.assessment.passScore;
          setAssessResult({ score, passed });
          if (passed) {
            if (type === "job") setJobCategories(prev => prev.map(j => j.id === item.id ? { ...j, certifiedCandidates: [...j.certifiedCandidates, c.id] } : j));
            else setSkillMaster(prev => prev.map(s => s.id === item.id ? { ...s, certifiedCandidates: [...s.certifiedCandidates, c.id] } : s));
          }
        }
        setAssessProgress(Math.min(p, 100));
      }, 300);
    };

    return (
      <div>
        <PageHeader title="スキルアセスメント" subtitle="職種・スキル別アセスメントに合格すると認定を取得できます" onBack={goBack}/>

        {/* Certified badges */}
        {(myCertified.length > 0 || mySkillCertified.length > 0) && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={16} style={{color: "#15803d"}}/>
              <h3 className="font-medium text-[#211922]">認定済み</h3>
            </div>
            <div className="grid grid-cols-3 tf-grid-3 gap-3">
              {myCertified.map(jc => (
                <Card key={jc.id} className="p-4" style={{borderLeft: "3px solid #15803d"}}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs" style={{backgroundColor: MORPHY.plumBlack}}><Layers size={14}/></span>
                    <div>
                      <div className="text-sm font-medium text-[#211922]">{jc.name}</div>
                      <div className="text-xs text-green-600 font-medium flex items-center gap-1"><CheckCircle size={10}/>職種認定</div>
                    </div>
                  </div>
                </Card>
              ))}
              {mySkillCertified.map(sk => (
                <Card key={sk.id} className="p-4" style={{borderLeft: "3px solid #15803d"}}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs" style={{backgroundColor: MORPHY.warmWash, border: `1px solid ${MORPHY.cardBorder}`}}><Zap size={14} style={{color: MORPHY.plumBlack}}/></span>
                    <div>
                      <div className="text-sm font-medium text-[#211922]">{sk.name}</div>
                      <div className="text-xs text-green-600 font-medium flex items-center gap-1"><CheckCircle size={10}/>スキル認定</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 tf-grid-2 gap-6 mb-6">
          <Card className="p-5">
            <h3 className="font-medium text-[#211922] mb-4">スキルレーダー</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={Object.entries(c.assessments).map(([k, v]) => ({ skill: k, score: v, fullMark: 100 }))}>
                <PolarGrid/><PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }}/><PolarRadiusAxis angle={30} domain={[0, 100]}/>
                <Radar dataKey="score" stroke={MORPHY.plumBlack} fill={MORPHY.plumBlack} fillOpacity={0.3}/>
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {Object.entries(c.assessments).map(([k, v]) => (
                <div key={k} className="flex items-center gap-3">
                  <span className="text-sm w-32 text-[#211922]">{k}</span>
                  <MatchBar value={v} size="sm"/>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="font-medium text-[#211922] mb-4 flex items-center gap-2"><Award size={16} style={{color: "#d97706"}}/>受験可能な職種アセスメント</h3>
            <div className="space-y-3">
              {myUncertified.map(jc => (
                <div key={jc.id} className="p-4 rounded-lg" style={{backgroundColor: MORPHY.warmWash, border: `1px solid ${MORPHY.cardBorder}`}}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm font-medium text-[#211922] flex items-center gap-2"><Layers size={13}/>{jc.name}</div>
                      <div className="text-xs text-[#91918c] mt-0.5">{jc.assessment.questions}問 ・ {jc.assessment.duration} ・ 合格{jc.assessment.passScore}点以上</div>
                    </div>
                    <button onClick={() => startAssessment(jc, "job")} className="text-xs px-3 py-1.5 rounded-lg font-medium bg-[#e60023] text-white hover:bg-[#cc001f] transition-colors">受験する</button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {jc.assessment.areas.map(a => <span key={a} className="text-xs bg-white text-[#62625b] px-1.5 py-0.5 rounded-full border border-[#e5e5e0]">{a}</span>)}
                  </div>
                </div>
              ))}
              {myUncertified.length === 0 && <p className="text-sm text-[#91918c] text-center py-4">全ての職種アセスメントに合格済みです！</p>}
            </div>
          </Card>
        </div>

        {/* Skill assessments */}
        {mySkillEligible.length > 0 && (
          <Card className="p-5 mt-6">
            <h3 className="font-medium text-[#211922] mb-4 flex items-center gap-2"><Zap size={16} style={{color: "#d97706"}}/>受験可能なスキルアセスメント</h3>
            <p className="text-xs text-[#91918c] mb-3">保有資格に基づき、以下のスキルアセスメントを受験できます</p>
            <div className="space-y-3">
              {mySkillEligible.map(sk => (
                <div key={sk.id} className="p-4 rounded-lg" style={{backgroundColor: MORPHY.warmWash, border: `1px solid ${MORPHY.cardBorder}`}}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm font-medium text-[#211922] flex items-center gap-2"><Zap size={13}/>{sk.name}<span className="text-xs text-[#91918c] font-normal">({sk.category})</span></div>
                      <div className="text-xs text-[#91918c] mt-0.5">{sk.assessment.questions}問 ・ {sk.assessment.duration} ・ 合格{sk.assessment.passScore}点以上</div>
                    </div>
                    <button onClick={() => startAssessment(sk, "skill")} className="text-xs px-3 py-1.5 rounded-lg font-medium bg-[#e60023] text-white hover:bg-[#cc001f] transition-colors">受験する</button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {sk.requiredCerts.filter(rc => (c.certifications || []).some(cc => cc.includes(rc.replace(/ (Professional|Associate|Specialty)/, "")))).map(cert => <span key={cert} className="text-xs bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-0.5"><Award size={9}/>{cert}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Assessment in progress modal */}
        {takingAssessment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => { if (assessResult) { setTakingAssessment(null); setAssessResult(null); } }}>
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: assessResult ? (assessResult.passed ? "#dcfce7" : "#fef2f2") : MORPHY.warmWash}}>
                  {assessResult ? (assessResult.passed ? <CheckCircle size={32} style={{color: "#15803d"}}/> : <XCircle size={32} style={{color: "#e60023"}}/>) : <Award size={32} style={{color: MORPHY.plumBlack}}/>}
                </div>
                <h3 className="text-lg font-medium text-[#211922] mb-1">{takingAssessment.name} アセスメント</h3>
                {!assessResult && (
                  <>
                    <p className="text-sm text-[#91918c] mb-6">受験中...</p>
                    <div className="w-full h-3 rounded-full overflow-hidden mb-2" style={{backgroundColor: MORPHY.cardBorder}}>
                      <div className="h-full rounded-full transition-all duration-300" style={{width: `${assessProgress}%`, backgroundColor: MORPHY.plumBlack}}/>
                    </div>
                    <p className="text-xs text-[#91918c]">{Math.round(assessProgress)}% 完了</p>
                  </>
                )}
                {assessResult && (
                  <>
                    <p className="text-3xl font-semibold mb-1" style={{color: assessResult.passed ? "#15803d" : "#e60023"}}>{assessResult.score}点</p>
                    <p className="text-sm mb-1 font-medium" style={{color: assessResult.passed ? "#15803d" : "#e60023"}}>{assessResult.passed ? "合格！" : "不合格"}</p>
                    <p className="text-xs text-[#91918c] mb-6">合格ライン: {takingAssessment.assessment.passScore}点</p>
                    {assessResult.passed && <p className="text-sm text-green-600 mb-4 flex items-center justify-center gap-1.5"><Layers size={14}/>「{takingAssessment.name}」の職種認定が付与されました</p>}
                    <button onClick={() => { setTakingAssessment(null); setAssessResult(null); }} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#211922] text-white hover:bg-[#2e2630] transition-colors">閉じる</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const MyTrainingScreen = () => {
    const c = candidateProfile;
    const tp = TRAINING_PLANS[c.id];
    if (!tp) return (
      <div>
        <PageHeader title="育成プラン" subtitle="現在割り当てられた育成プランはありません" onBack={goBack}/>
        <Card className="p-8 text-center"><GraduationCap size={48} className="mx-auto text-[#c8c8c1] mb-4"/><p className="text-[#91918c]">育成プランが割り当てられると、ここに表示されます。</p></Card>
      </div>
    );
    const overallProgress = Math.round(tp.items.reduce((s, i) => s + i.progress, 0) / tp.items.length);

    return (
      <div>
        <PageHeader title="育成プラン" subtitle={`目標: ${tp.targetRole} ・ 期間: ${tp.estimatedPeriod}`} onBack={goBack}/>
        <div className="grid grid-cols-3 tf-grid-3 gap-6">
          <div className="col-span-2 space-y-4">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#211922] flex items-center gap-2">学習タスク <AIBadge/></h3>
              </div>
              <MatchBar value={overallProgress} label="全体進捗" />
              <div className="mt-4 space-y-3">
                {tp.items.map((item, i) => (
                  <div key={i} className={`border border-[#e5e5e0] rounded-lg p-4 ${item.status === "進行中" ? "bg-[#f6f6f3]/30" : ""}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${item.progress === 100 ? "bg-[#e60023] text-white" : item.progress > 0 ? "bg-[#211922] text-white" : "bg-[#e5e5e0] text-[#91918c]"}`}>{item.order}</span>
                        <h4 className="font-medium text-sm text-[#211922]">{item.theme}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === "進行中" ? "bg-[#e5e5e0] text-[#211922]" : "bg-[#e5e5e0]/50 text-[#91918c]"}`}>{item.status}</span>
                      </div>
                      <span className="text-xs text-[#91918c]">{item.duration}</span>
                    </div>
                    <p className="text-xs text-[#91918c] mb-2">到達目標: {item.goal}</p>
                    {item.trainingId && (() => {
                      const tr = TRAINING_MASTER.find(t => t.id === item.trainingId);
                      if (!tr) return null;
                      return (
                        <div className="flex items-center gap-2 mb-2 p-2 rounded-lg bg-blue-50/50 border border-blue-100">
                          <BookOpen size={12} className="text-blue-600"/>
                          <span className="text-xs text-blue-700 font-medium">{tr.title}</span>
                          <span className="text-[10px] text-blue-500 ml-auto">{tr.format} ・ {tr.duration}</span>
                        </div>
                      );
                    })()}
                    <div className="flex items-center gap-3">
                      <div className="flex-1"><MatchBar value={item.progress} size="sm"/></div>
                      {item.status !== "未着手" && (
                        <input type="range" min="0" max="100" value={item.progress} onChange={e => {}} className="w-24 h-1"/>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">目標</h3>
              <div className="space-y-3">
                <MatchBar value={tp.currentMatch} label="現在のマッチ度"/>
                <MatchBar value={tp.targetMatch} label="目標マッチ度"/>
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-2">次のステップ</h3>
              {tp.items.filter(i => i.status === "進行中" || i.status === "未着手").slice(0, 2).map((item, i) => (
                <div key={i} className="p-2 bg-[#f6f6f3] rounded-lg mt-2 text-sm"><span className="font-medium">{item.theme}</span><p className="text-xs text-[#91918c] mt-0.5">{item.goal}</p></div>
              ))}
            </Card>
            <Card className="p-4">
              <button onClick={() => navigate("candidate-assessments")} className="w-full text-sm text-[#211922] hover:text-[#211922] flex items-center gap-2 justify-center p-2"><Award size={14}/>アセスメント一覧へ</button>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // ======== Candidate: Training List Screen (研修一覧・進捗管理) ========
  const CandidateTrainingListScreen = () => {
    const c = CURRENT_CANDIDATE;
    const myTrainings = candidateTrainings.filter(ct => ct.candidateId === c.id).map(ct => {
      const master = TRAINING_MASTER.find(t => t.id === ct.trainingId);
      return { ...ct, master };
    }).filter(ct => ct.master);

    const inProgress = myTrainings.filter(ct => ct.status === "受講中");
    const testWaiting = myTrainings.filter(ct => ct.status === "確認テスト待ち");
    const notStarted = myTrainings.filter(ct => ct.status === "未着手");
    const completed = myTrainings.filter(ct => ct.status === "完了");

    const [tab, setTab] = useState("all");
    const tabs = [
      { id: "all", label: "すべて", count: myTrainings.length },
      { id: "in-progress", label: "受講中", count: inProgress.length },
      { id: "test-waiting", label: "確認テスト待ち", count: testWaiting.length },
      { id: "not-started", label: "未着手", count: notStarted.length },
      { id: "completed", label: "完了", count: completed.length },
    ];
    const displayed = tab === "in-progress" ? inProgress : tab === "test-waiting" ? testWaiting : tab === "not-started" ? notStarted : tab === "completed" ? completed : myTrainings;

    const [progressUpdating, setProgressUpdating] = useState(null);
    const updateProgress = (ct, newProgress) => {
      setCandidateTrainings(prev => prev.map(x =>
        x.candidateId === ct.candidateId && x.trainingId === ct.trainingId
          ? { ...x, progress: newProgress, status: newProgress >= 100 ? "確認テスト待ち" : newProgress > 0 ? "受講中" : "未着手" }
          : x
      ));
      setProgressUpdating(ct.trainingId);
      setTimeout(() => setProgressUpdating(null), 500);
    };

    // Training assessment state
    const [examTraining, setExamTraining] = useState(null); // trainingId being examined
    const [examStep, setExamStep] = useState("intro"); // intro | q | submitting | result
    const [examQ, setExamQ] = useState(0);
    const [examAnswers, setExamAnswers] = useState({});

    const generateQuestions = (t) => [
      { id: 0, q: `「${t.title}」で学んだ内容のうち、最も重要な基礎知識はどれですか？`, opts: ["研修で扱っていない内容", t.description.slice(0, 20) + "に関する実務知識", "関連のない一般常識", "他分野の専門知識"], correct: 1 },
      { id: 1, q: `${t.title}の実務において、正確性を担保するために重要なことは？`, opts: ["スピード最優先で処理する", "ダブルチェックと記録管理の徹底", "自己判断のみで完結する", "確認工程を省略する"], correct: 1 },
      { id: 2, q: `${t.title}の研修内容を業務で活かす際、最も適切なアプローチは？`, opts: ["研修内容を無視して従来通り行う", "学んだ手順を実務に段階的に適用する", "全て暗記してから取り組む", "他の人に全て任せる"], correct: 1 },
    ];

    const startExam = (trainingId) => {
      setExamTraining(trainingId);
      setExamStep("intro");
      setExamQ(0);
      setExamAnswers({});
    };

    const submitExam = (ct, questions) => {
      setExamStep("submitting");
      setTimeout(() => {
        let correct = 0;
        questions.forEach((q, i) => { if (examAnswers[i] === q.correct) correct++; });
        const score = Math.round((correct / questions.length) * 100);
        const passed = score >= 70;
        if (passed) {
          setCandidateTrainings(prev => prev.map(x =>
            x.candidateId === ct.candidateId && x.trainingId === ct.trainingId
              ? { ...x, status: "完了", score, completedDate: new Date().toISOString().slice(0,10).replace(/-/g,"/") }
              : x
          ));
          showToast(`「${tr?.title || "研修"}」を完了しました`);
        }
        setExamStep("result");
        setExamAnswers(prev => ({ ...prev, _score: score, _passed: passed, _correct: correct, _total: questions.length }));
      }, 1200);
    };

    const catColor = (cat) => {
      switch(cat) {
        case "社内技術": return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" };
        case "社内ビジネス": return { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" };
        case "外部資格": return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" };
        case "eラーニング": return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" };
        default: return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };
      }
    };

    const statusStyle = (s) => s === "完了" ? "bg-green-50 text-green-700 border border-green-200" : s === "確認テスト待ち" ? "bg-orange-50 text-orange-700 border border-orange-200" : s === "受講中" ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-gray-100 text-gray-600 border border-gray-200";

    return (
      <div>
        <PageHeader title="研修一覧" subtitle={`${myTrainings.length}件の研修が割り当てられています`}/>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 tf-grid-4 gap-4 mb-6">
          <Card className="p-4 text-center cursor-pointer hover:shadow-sm transition-all" onClick={() => setTab("in-progress")}>
            <div className="text-2xl font-bold" style={{color: MORPHY.red}}>{inProgress.length}</div>
            <div className="text-xs text-[#91918c]">受講中</div>
          </Card>
          <Card className="p-4 text-center cursor-pointer hover:shadow-sm transition-all" onClick={() => setTab("test-waiting")} style={testWaiting.length > 0 ? {border: "1px solid #fb923c", background: "#fff7ed"} : {}}>
            <div className="text-2xl font-bold text-orange-600">{testWaiting.length}</div>
            <div className="text-xs text-[#91918c]">確認テスト待ち</div>
          </Card>
          <Card className="p-4 text-center cursor-pointer hover:shadow-sm transition-all" onClick={() => setTab("not-started")}>
            <div className="text-2xl font-bold text-amber-600">{notStarted.length}</div>
            <div className="text-xs text-[#91918c]">未着手</div>
          </Card>
          <Card className="p-4 text-center cursor-pointer hover:shadow-sm transition-all" onClick={() => setTab("completed")}>
            <div className="text-2xl font-bold text-green-600">{completed.length}</div>
            <div className="text-xs text-[#91918c]">完了</div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Card className="p-4 mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`text-xs px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${tab === t.id ? "bg-[#e60023] text-white" : "bg-[#f6f6f3] text-[#62625b] hover:bg-[#e5e5e0]"}`}>{t.label}<span className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab === t.id ? "bg-white/20" : "bg-[#e5e5e0]"}`}>{t.count}</span></button>
            ))}
          </div>
        </Card>

        {/* Training List */}
        {displayed.length === 0 ? (
          <Card className="p-12 text-center"><BookOpen size={32} className="text-[#91918c] mx-auto mb-4"/><h3 className="text-lg font-medium text-[#211922] mb-2">該当する研修はありません</h3></Card>
        ) : (
          <div className="space-y-3">
            {displayed.map(ct => {
              const t = ct.master;
              const cc = catColor(t.category);
              const isExamOpen = examTraining === ct.trainingId;
              const questions = isExamOpen ? generateQuestions(t) : [];

              return (
                <Card key={ct.trainingId} className="p-5 transition-all hover:shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cc.bg} ${cc.text} border ${cc.border}`}>{t.category}</span>
                        <span className="text-xs text-[#91918c]">{t.level}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle(ct.status)}`}>{ct.status}</span>
                      </div>
                      <h4 className="text-sm font-medium text-[#211922] mb-1">{t.title}</h4>
                      <p className="text-xs text-[#91918c] mb-2">{t.description}</p>
                      <div className="flex items-center gap-3 text-xs text-[#62625b]">
                        <span>{t.duration}</span>
                        <span>・</span>
                        <span>{t.provider}</span>
                        <span>・</span>
                        <span>{t.format}</span>
                      </div>
                    </div>
                    {ct.status === "完了" && ct.score != null && (
                      <div className="text-center ml-4">
                        <span className="text-2xl font-bold text-green-600">{ct.score}</span>
                        <div className="text-xs text-[#91918c]">点</div>
                      </div>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center gap-3 mt-3 pt-3" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                    <div className="flex-1 bg-[#e5e5e0] rounded-full h-2 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{width: `${ct.progress}%`, backgroundColor: ct.status === "完了" ? "#15803d" : ct.status === "確認テスト待ち" ? "#ea580c" : MORPHY.red}}/>
                    </div>
                    <span className="text-xs font-medium text-[#211922] w-10 text-right">{ct.progress}%</span>
                    {(ct.status === "受講中" || ct.status === "未着手") && (
                      <input type="range" min="0" max="100" step="10" value={ct.progress} onChange={e => updateProgress(ct, parseInt(e.target.value))} className="w-20 h-1 accent-[#e60023]"/>
                    )}
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#91918c]">
                    {ct.startDate && <span>開始: {ct.startDate}</span>}
                    {ct.completedDate && <span>完了: {ct.completedDate}</span>}
                  </div>

                  {/* Test waiting: CTA */}
                  {ct.status === "確認テスト待ち" && !isExamOpen && (
                    <div className="mt-3 p-3 rounded-lg" style={{background: "#fff7ed", border: "1px solid #fed7aa"}}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ClipboardList size={14} className="text-orange-600"/>
                          <span className="text-sm font-medium text-orange-800">習得確認テストを受験してください</span>
                        </div>
                        <button onClick={() => startExam(ct.trainingId)} className="px-4 py-2 rounded-lg text-sm font-medium bg-orange-600 text-white hover:bg-orange-700 transition-colors flex items-center gap-1.5"><Award size={14}/>確認テスト開始</button>
                      </div>
                      <p className="text-xs text-orange-600 mt-1">3問中70%以上で合格です。不合格の場合は再受験できます。</p>
                    </div>
                  )}

                  {/* Inline Exam */}
                  {isExamOpen && (
                    <div className="mt-3 p-4 rounded-lg border" style={{background: MORPHY.fog, borderColor: MORPHY.cardBorder}}>
                      {examStep === "intro" && (
                        <div className="text-center py-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{background: `${MORPHY.red}15`}}><Award size={24} style={{color: MORPHY.red}}/></div>
                          <h4 className="font-medium text-[#211922] mb-1">{t.title} 習得確認テスト</h4>
                          <p className="text-xs text-[#91918c] mb-3">全3問 ・ 合格ライン70% ・ 制限時間なし</p>
                          <div className="flex gap-2 justify-center">
                            <button onClick={() => setExamStep("q")} className="px-5 py-2 rounded-lg text-sm font-medium bg-[#e60023] text-white">受験開始</button>
                            <button onClick={() => setExamTraining(null)} className="px-5 py-2 rounded-lg text-sm font-medium border border-[#e5e5e0] text-[#62625b]">キャンセル</button>
                          </div>
                        </div>
                      )}
                      {examStep === "q" && (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-[#91918c]">問題 {examQ + 1} / {questions.length}</span>
                            <div className="flex gap-1">{questions.map((_, i) => <div key={i} className={`w-6 h-1.5 rounded-full ${i < examQ ? "bg-[#e60023]" : i === examQ ? "bg-[#211922]" : "bg-[#e5e5e0]"}`}/>)}</div>
                          </div>
                          <h4 className="text-sm font-medium text-[#211922] mb-3">{questions[examQ].q}</h4>
                          <div className="space-y-2">
                            {questions[examQ].opts.map((opt, oi) => (
                              <button key={oi} onClick={() => setExamAnswers(prev => ({...prev, [examQ]: oi}))} className={`w-full text-left p-3 rounded-lg text-sm transition-all border ${examAnswers[examQ] === oi ? "border-[#e60023] bg-red-50 text-[#211922] font-medium" : "border-[#e5e5e0] bg-white text-[#62625b] hover:border-[#c8c8c1]"}`}>{opt}</button>
                            ))}
                          </div>
                          <div className="flex justify-between mt-4">
                            <button onClick={() => setExamQ(q => Math.max(0, q - 1))} disabled={examQ === 0} className="text-xs text-[#91918c] disabled:opacity-30">← 前の問題</button>
                            {examQ < questions.length - 1 ? (
                              <button onClick={() => setExamQ(q => q + 1)} disabled={examAnswers[examQ] == null} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#211922] text-white disabled:opacity-30">次の問題 →</button>
                            ) : (
                              <button onClick={() => submitExam(ct, questions)} disabled={examAnswers[examQ] == null} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#e60023] text-white disabled:opacity-30">提出する</button>
                            )}
                          </div>
                        </div>
                      )}
                      {examStep === "submitting" && (
                        <div className="text-center py-8"><RefreshCw size={24} className="animate-spin mx-auto mb-2 text-[#91918c]"/><p className="text-sm text-[#91918c]">採点中...</p></div>
                      )}
                      {examStep === "result" && (
                        <div className="text-center py-4">
                          {examAnswers._passed ? (
                            <>
                              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3"><CheckCircle size={28} className="text-green-600"/></div>
                              <h4 className="text-lg font-bold text-green-700 mb-1">合格！</h4>
                              <p className="text-sm text-[#62625b]">{examAnswers._correct}/{examAnswers._total}問正解（{examAnswers._score}点）</p>
                              <p className="text-xs text-green-600 mt-1">この研修は完了しました。おめでとうございます！</p>
                              <button onClick={() => setExamTraining(null)} className="mt-3 px-5 py-2 rounded-lg text-sm font-medium bg-green-600 text-white">閉じる</button>
                            </>
                          ) : (
                            <>
                              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3"><X size={28} className="text-red-600"/></div>
                              <h4 className="text-lg font-bold text-red-700 mb-1">不合格</h4>
                              <p className="text-sm text-[#62625b]">{examAnswers._correct}/{examAnswers._total}問正解（{examAnswers._score}点）・合格ライン: 70点</p>
                              <p className="text-xs text-[#91918c] mt-1">研修内容を復習のうえ、再受験してください。</p>
                              <div className="flex gap-2 justify-center mt-3">
                                <button onClick={() => startExam(ct.trainingId)} className="px-5 py-2 rounded-lg text-sm font-medium bg-[#e60023] text-white">再受験する</button>
                                <button onClick={() => setExamTraining(null)} className="px-5 py-2 rounded-lg text-sm font-medium border border-[#e5e5e0] text-[#62625b]">閉じる</button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const AdminResumeScreen = () => {
    const c = selectedCandidate;
    if (!c) return null;
    const [localResumeType, setLocalResumeType] = useState("sales");
    const [resumeState, setResumeState] = useState("idle");
    const [selectedTargetJD, setSelectedTargetJD] = useState("");

    const generateResume = () => {
      setResumeState("generating");
      setTimeout(() => setResumeState("done"), 1500);
    };

    const resumeContent = {
      sales: { title: "職務経歴書（営業用詳細版）", showName: true, showAspiration: true },
      blind: { title: "職務経歴書（顧客提示用ブラインド版）", showName: false, showAspiration: false },
      self: { title: "職務経歴書（本人確認用）", showName: true, showAspiration: true }
    };
    const rc = resumeContent[localResumeType];
    const targetJD = selectedTargetJD ? JDS.find(j => j.id === selectedTargetJD) : null;

    return (
      <div>
        <PageHeader title={`職務経歴書生成: ${c.name}`} subtitle={`${c.id} ・ 経験${c.totalYears}年`} onBack={goBack}/>

        <Card className="p-4 mb-5">
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {[{ id: "sales", label: "営業用詳細版" }, { id: "blind", label: "ブラインド版" }, { id: "self", label: "本人確認用" }].map(t => (
                <button key={t.id} onClick={() => { setLocalResumeType(t.id); setResumeState("idle"); }} className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${localResumeType === t.id ? "bg-[#e60023] text-white" : "text-[#91918c] hover:text-[#211922] hover:bg-[#e5e5e0]/50"}`}>{t.label}</button>
              ))}
            </div>
            <div className="flex-1">
              <select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={selectedTargetJD} onChange={e => setSelectedTargetJD(e.target.value)}>
                <option value="">JD指定なし（汎用版）</option>
                {JDS.map(j => <option key={j.id} value={j.id}>{j.title}に最適化</option>)}
              </select>
            </div>
          </div>
        </Card>

        {resumeState === "idle" && (
          <Card className="p-8 text-center">
            <FileText size={48} className="mx-auto text-[#c8c8c1] mb-4"/>
            <h3 className="text-[#62625b] mb-2">{rc.title}を生成</h3>
            <p className="text-sm text-[#91918c] mb-2">{c.name}のスキル・職歴・アセスメント結果をもとにAIが生成します</p>
            {targetJD && <p className="text-sm text-[#211922] mb-4 flex items-center justify-center gap-1"><Target size={14}/> 「{targetJD.title}」に合わせて強調内容を最適化します</p>}
            <button onClick={generateResume} className="bg-[#211922] hover:bg-[#2e2630] rounded-2xl text-white px-6 py-2.5 text-sm font-medium flex items-center justify-center gap-2 mx-auto"><Sparkles size={16}/>生成する</button>
          </Card>
        )}

        {resumeState === "generating" && <LoadingAI text={`AIが${rc.title}を生成中...`}/>}

        {resumeState === "done" && (
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-[#211922] flex items-center gap-2">{rc.title} <AIBadge/></h2>
              <div className="flex gap-2">
                {targetJD && <Badge color="blue">{targetJD.title}向け</Badge>}
                <button className="text-sm text-[#62625b] hover:text-[#211922] flex items-center gap-1"><Download size={14}/>ダウンロード</button>
              </div>
            </div>
            <div className="border rounded-lg p-6 bg-[#f6f6f3] max-w-2xl mx-auto space-y-6 text-sm">
              <div className="text-center border-b pb-4">
                <h3 className="text-xl font-medium text-[#211922]">職 務 経 歴 書</h3>
                <p className="text-[#91918c] mt-1">{rc.showName ? c.name : `候補者ID: ${c.id}`}</p>
                {targetJD && <p className="text-xs text-[#211922]/80 mt-1">対象案件: {targetJD.title}</p>}
              </div>
              <div>
                <h4 className="font-medium text-[#211922] border-b pb-1 mb-2">職務要約</h4>
                <p className="text-[#211922] leading-relaxed">
                  {rc.showName ? `${c.name}は` : "本候補者は"}、{c.totalYears}年の実務経験を持つスタッフです。
                  {c.careerHistory[0]?.detail}{" "}
                  {targetJD
                    ? `特に${targetJD.requiredSkills.slice(0, 2).join("・")}の領域で実績があり、${targetJD.title}として即戦力が期待できます。`
                    : `${c.aspiration}という志向を持ち、${c.wantToDo}に注力しています。`}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-[#211922] border-b pb-1 mb-2">保有スキル</h4>
                <div className="grid grid-cols-3 tf-grid-3 gap-2">
                  {c.skills
                    .sort((a, b) => {
                      if (!targetJD) return b.level - a.level;
                      const aMatch = targetJD.requiredSkills.some(rs => rs.toLowerCase().includes(a.name.toLowerCase())) ? 1 : 0;
                      const bMatch = targetJD.requiredSkills.some(rs => rs.toLowerCase().includes(b.name.toLowerCase())) ? 1 : 0;
                      return bMatch - aMatch || b.level - a.level;
                    })
                    .map(s => {
                      const isHighlight = targetJD && targetJD.requiredSkills.some(rs => rs.toLowerCase().includes(s.name.toLowerCase()));
                      return (
                        <div key={s.name} className={`flex items-center justify-between ${isHighlight ? "font-medium text-[#211922]" : ""}`}>
                          <span>{s.name}{isHighlight && " ★"}</span>
                          <span className="text-[#91918c]">Lv{s.level}（{s.years}年）</span>
                        </div>
                      );
                    })}
                </div>
              </div>
              {c.certifications.length > 0 && (
                <div>
                  <h4 className="font-medium text-[#211922] border-b pb-1 mb-2">資格</h4>
                  <ul className="list-disc ml-5 space-y-1">{c.certifications.map((cert, i) => <li key={i}>{cert}</li>)}</ul>
                </div>
              )}
              <div>
                <h4 className="font-medium text-[#211922] border-b pb-1 mb-2">職務経歴</h4>
                {c.careerHistory
                  .sort((a, b) => {
                    if (!targetJD) return 0;
                    const aRel = targetJD.requiredSkills.filter(rs => a.tech.some(t => rs.toLowerCase().includes(t.toLowerCase()))).length;
                    const bRel = targetJD.requiredSkills.filter(rs => b.tech.some(t => rs.toLowerCase().includes(t.toLowerCase()))).length;
                    return bRel - aRel;
                  })
                  .map((h, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-medium">{rc.showName ? h.project : `プロジェクト${i + 1}`}</span>
                      <span className="text-[#91918c] text-xs">{h.period}</span>
                    </div>
                    <p className="text-[#91918c] text-xs mb-1">【{h.role}】チーム規模: {h.team}名 ・ 担当: {h.phase}</p>
                    <p className="text-[#211922]">{h.detail}</p>
                    <div className="flex gap-1 mt-1">{h.tech.map(t => {
                      const isHighlight = targetJD && targetJD.requiredSkills.some(rs => rs.toLowerCase().includes(t.toLowerCase()));
                      return <span key={t} className={`text-xs px-1.5 py-0.5 rounded-full ${isHighlight ? "bg-[#e5e5e0] text-[#211922] font-medium" : "bg-[#e5e5e0]"}`}>{t}</span>;
                    })}</div>
                  </div>
                ))}
              </div>
              {rc.showAspiration && (
                <div>
                  <h4 className="font-medium text-[#211922] border-b pb-1 mb-2">キャリア志向・希望</h4>
                  <p className="text-[#211922]">{c.aspiration}</p>
                  <p className="text-[#62625b] mt-1">希望する仕事: {c.wantToDo}</p>
                  <p className="text-[#62625b]">勤務条件: {c.location} ・ {c.workCondition}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    );
  };

  const MyResumeScreen = () => {
    const c = candidateProfile;
    const [resumeState, setResumeState] = useState("idle"); // "idle" | "generating" | "done"

    const generateResume = () => {
      setResumeState("generating");
      setTimeout(() => setResumeState("done"), 1500);
    };

    return (
      <div>
        <PageHeader title="AI職務経歴書（自己確認用）" subtitle="AIが経歴・スキル・志向を元に職務経歴書を自動生成します。提案時には営業担当が別途作成します。" onBack={goBack}/>

        {resumeState === "idle" && (
          <Card className="p-8 text-center">
            <FileText size={48} className="mx-auto text-[#c8c8c1] mb-4"/>
            <h3 className="text-[#62625b] mb-2">職務経歴書（自己確認用）を生成</h3>
            <p className="text-sm text-[#91918c] mb-4">スキル、職歴、アセスメント結果、志向をもとにAIが生成します</p>
            <p className="text-xs text-[#62625b] bg-[#f6f6f3] rounded-lg px-4 py-2 mb-4 inline-block" style={{border: `1px solid ${MORPHY.cardBorder}`}}>この経歴書はご自身の経歴確認用です。顧客への提出には使用されません。</p>
            <button onClick={generateResume} className="bg-[#211922] hover:bg-[#2e2630] rounded-2xl text-white px-6 py-2.5 text-sm font-medium flex items-center justify-center gap-2 mx-auto">
              <Sparkles size={16}/>生成する
            </button>
          </Card>
        )}

        {resumeState === "generating" && <LoadingAI text="AIが職務経歴書を生成中..."/>}

        {resumeState === "done" && (
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-[#211922] flex items-center gap-2">職務経歴書（自己確認用） <AIBadge/></h2>
              <button className="text-sm text-[#62625b] hover:text-[#211922] flex items-center gap-1"><Download size={14}/>ダウンロード</button>
            </div>
            <div className="border rounded-lg p-6 bg-[#f6f6f3] max-w-2xl mx-auto space-y-6 text-sm">
              <div className="text-center border-b pb-4">
                <h3 className="text-xl font-medium text-[#211922]">職 務 経 歴 書</h3>
                <p className="text-[#91918c] mt-1">{c.name}</p>
              </div>

              <div>
                <h4 className="font-medium text-[#211922] border-b pb-1 mb-2">職務要約</h4>
                <p className="text-[#211922] leading-relaxed">{c.name}は、{c.totalYears}年の実務経験を持つスタッフです。{c.careerHistory[0]?.detail} {c.aspiration}という志向を持ち、{c.wantToDo}に注力しています。</p>
              </div>

              <div>
                <h4 className="font-medium text-[#211922] border-b pb-1 mb-2">保有スキル</h4>
                <div className="grid grid-cols-3 tf-grid-3 gap-2">
                  {c.skills.map(s => <div key={s.name} className="flex items-center justify-between"><span>{s.name}</span><span className="text-[#91918c]">Lv{s.level}（{s.years}年）</span></div>)}
                </div>
              </div>

              {c.certifications.length > 0 && (
                <div>
                  <h4 className="font-medium text-[#211922] border-b pb-1 mb-2">資格</h4>
                  <ul className="list-disc ml-5 space-y-1">{c.certifications.map((cert, i) => <li key={i}>{cert}</li>)}</ul>
                </div>
              )}

              <div>
                <h4 className="font-medium text-[#211922] border-b pb-1 mb-2">職務経歴</h4>
                {c.careerHistory.map((h, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-baseline mb-1"><span className="font-medium">{h.project}</span><span className="text-[#91918c] text-xs">{h.period}</span></div>
                    <p className="text-[#91918c] text-xs mb-1">【{h.role}】チーム規模: {h.team}名 ・ 担当: {h.phase}</p>
                    <p className="text-[#211922]">{h.detail}</p>
                    <div className="flex gap-1 mt-1">{h.tech.map(t => <span key={t} className="text-xs bg-[#e5e5e0]/50 text-[#62625b] px-2 py-0.5 rounded-full border border-[#e5e5e0]">{t}</span>)}</div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-medium text-[#211922] border-b pb-1 mb-2">キャリア志向・希望</h4>
                <p className="text-[#211922]">{c.aspiration}</p>
                <p className="text-[#62625b] mt-1">希望する仕事: {c.wantToDo}</p>
                <p className="text-[#62625b]">勤務条件: {c.location} ・ {c.workCondition}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  };

  // ============================================================
  // RENDER
  // ============================================================
  // ============================================================
  // NEW CANDIDATE SCREENS (notification + assessment + cases + profile)
  // ============================================================
  const CURRENT_CANDIDATE = candidateProfile; // Demo: logged-in candidate is C-001

  const CandidateDashboardScreen = () => {
    const c = CURRENT_CANDIDATE;
    const myAssessments = assessmentRequests.filter(ar => ar.candidateId === c.id);
    const pendingAssessments = myAssessments.filter(ar => ar.status === "未受験");
    const completedAssessments = myAssessments.filter(ar => ar.status === "完了");

    // Build timeline events
    const myIRs = interviewRequests.filter(ir => ir.candidateId === c.id);
    const events = [
      ...pendingAssessments.map(ar => ({ type: "assessment-pending", date: ar.date, ar, jd: JDS.find(j => j.id === ar.jdId) })),
      ...myIRs.filter(ir => ir.status === "回答メール送信済").map(ir => ({ type: "ir-replied", date: ir.date, ir, jd: JDS.find(j => j.id === ir.jdId) })),
      ...completedAssessments.map(ar => ({ type: "assessment-done", date: ar.date, ar, jd: JDS.find(j => j.id === ar.jdId) })),
    ].sort((a, b) => b.date.localeCompare(a.date));

    return (
      <div>
        {/* Compact Header: Profile + Assignment (1-line) */}
        <div className="mb-5 flex items-center gap-3 cursor-pointer" onClick={() => navigate("candidate-profile")}>
          <CandidateAvatar candidate={c} size="md"/>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap"><span className="text-base font-bold text-[#211922]">{c.name}</span><EmploymentBadge type={c.employmentType}/><span className="text-xs text-[#91918c]">{c.currentRole}</span></div>
            {c.assignment && (() => { const days = Math.ceil((new Date(c.assignment.endDate.replace(/\//g,"-")) - new Date()) / 86400000); return (
              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#91918c]"><Monitor size={11}/><span>{c.assignment.project}</span><span>／</span><span>{c.assignment.customer}</span>
                <span className="px-1.5 py-0 rounded-full font-medium" style={{fontSize:"10px", color: days <= 30 ? "#dc2626" : days <= 60 ? "#d97706" : "#91918c", background: days <= 30 ? "#fef2f2" : days <= 60 ? "#fffbeb" : "transparent", border: days <= 60 ? `1px solid ${days <= 30 ? "#fecaca" : "#fde68a"}` : "none"}}>〜{c.assignment.endDate.slice(5)}{days <= 60 ? ` 残${days}日` : ""}</span>
              </div>
            ); })()}
          </div>
          <ChevronRight size={14} className="text-[#91918c] flex-shrink-0"/>
        </div>

        {/* KPI Cards */}
        {(() => {
          const myT = candidateTrainings.filter(ct => ct.candidateId === c.id);
          const tInProgress = myT.filter(ct => ct.status === "受講中").length;
          const tTestWaiting = myT.filter(ct => ct.status === "確認テスト待ち").length;
          const tNotStarted = myT.filter(ct => ct.status === "未着手").length;
          const tActive = tInProgress + tTestWaiting + tNotStarted;
          const myDoneTrainings = myT.filter(ct => ct.status === "完了").map(ct => ct.trainingId);
          const availableAsmCount = skillMaster.filter(sk => {
            const prereqs = sk.prerequisiteTrainings || [];
            const met = prereqs.length === 0 || prereqs.every(tid => myDoneTrainings.includes(tid));
            return met && !sk.certifiedCandidates.includes(c.id);
          }).length;
          const notifCount = events.length + tTestWaiting + availableAsmCount;
          const trainingSub = [tInProgress > 0 && `受講中${tInProgress}`, tTestWaiting > 0 && `確認テスト待ち${tTestWaiting}`, tNotStarted > 0 && `未着手${tNotStarted}`].filter(Boolean).join(" / ") || "なし";
          return (
            <div className="grid grid-cols-3 tf-grid-3 gap-3 mb-6">
              {(() => {
                const myDoneT = candidateTrainings.filter(ct => ct.candidateId === c.id && ct.status === "完了").map(ct => ct.trainingId);
                const availableAsm = skillMaster.filter(sk => {
                  const prereqs = sk.prerequisiteTrainings || [];
                  const met = prereqs.length === 0 || prereqs.every(tid => myDoneT.includes(tid));
                  return met && !sk.certifiedCandidates.includes(c.id);
                }).length;
                const passedAsm = skillMaster.filter(sk => sk.certifiedCandidates.includes(c.id)).length;
                return <StatCard featured={availableAsm > 0} icon={<Award size={20} className={availableAsm > 0 ? "text-white" : "text-[#62625b]"}/>} label="アセスメント" value={availableAsm > 0 ? availableAsm : passedAsm} sub={availableAsm > 0 ? "受験可能" : "合格済み"} color={availableAsm > 0 ? "red" : "blue"} onClick={() => navigate("candidate-assessments")}/>;
              })()}
              <StatCard featured={tTestWaiting > 0} icon={<BookOpen size={20} className={tTestWaiting > 0 ? "text-white" : "text-[#62625b]"}/>} label="研修" value={tActive} sub={trainingSub} color={tTestWaiting > 0 ? "red" : "amber"} onClick={() => navigate("candidate-training-list")}/>
              <StatCard icon={<Bell size={20} className="text-[#91918c]"/>} label="通知" value={notifCount} sub="件" color="gray" onClick={() => navigate("candidate-notifications")}/>
            </div>
          );
        })()}

        {/* 1. Todo List */}
        {(() => {
          const myT = candidateTrainings.filter(ct => ct.candidateId === c.id);
          const myDoneT = myT.filter(ct => ct.status === "完了").map(ct => ct.trainingId);
          const todos = [];
          // 1. 確認テスト待ちの研修
          myT.filter(ct => ct.status === "確認テスト待ち").forEach(ct => {
            const tr = TRAINING_MASTER.find(t => t.id === ct.trainingId);
            todos.push({ id: `todo-test-${ct.trainingId}`, type: "test", priority: 1, icon: <FileCheck size={14} className="text-amber-600"/>, label: `${tr?.name || ct.trainingId}の習得確認テストを受験`, sub: "研修完了に必要", color: "amber", action: () => navigate("candidate-training-list") });
          });
          // 2. 未受験アセスメント（期限順）
          pendingAssessments.sort((a, b) => (a.deadline || "9999").localeCompare(b.deadline || "9999")).forEach(ar => {
            const jd = JDS.find(j => j.id === ar.jdId);
            const dl = ar.deadline ? (() => { const d = new Date(ar.deadline.replace(/\//g, "-")); const diff = Math.ceil((d - new Date()) / 86400000); return diff; })() : null;
            todos.push({ id: `todo-ar-${ar.id}`, type: "assessment", priority: dl !== null && dl <= 3 ? 0 : 2, icon: <ClipboardList size={14} className="text-red-500"/>, label: `${ar.title}を受験`, sub: ar.deadline ? `期限: ${ar.deadline.slice(5).replace(/\//g, "/")}${dl !== null ? (dl <= 0 ? " (期限切れ!)" : ` (残${dl}日)`) : ""}` : jd ? jd.title : "", color: dl !== null && dl <= 3 ? "red" : "purple", action: () => navigate("candidate-assessment-take", { plan: ar }) });
          });
          // 3. 受験可能なスキルアセスメント
          skillMaster.filter(sk => {
            const prereqs = sk.prerequisiteTrainings || [];
            const met = prereqs.length === 0 || prereqs.every(tid => myDoneT.includes(tid));
            return met && !sk.certifiedCandidates.includes(c.id) && !pendingAssessments.some(ar => ar.title.includes(sk.name));
          }).forEach(sk => {
            todos.push({ id: `todo-sk-${sk.id}`, type: "skill", priority: 3, icon: <Award size={14} className="text-purple-500"/>, label: `${sk.name}アセスメントが受験可能`, sub: "スキル認定に必要", color: "purple", action: () => navigate("candidate-assessments") });
          });
          // 4. 受講中の研修
          myT.filter(ct => ct.status === "受講中").forEach(ct => {
            const tr = TRAINING_MASTER.find(t => t.id === ct.trainingId);
            todos.push({ id: `todo-train-${ct.trainingId}`, type: "training", priority: 4, icon: <BookOpen size={14} className="text-blue-500"/>, label: `${tr?.name || ct.trainingId}を受講中`, sub: `進捗 ${ct.progress || 0}%`, color: "blue", action: () => navigate("candidate-training-list") });
          });
          // Sort by priority
          todos.sort((a, b) => a.priority - b.priority);
          const colorMap = { red: { bg: "#fef2f2", border: "#fecaca", dot: "#dc2626" }, amber: { bg: "#fffbeb", border: "#fde68a", dot: "#d97706" }, purple: { bg: "#f5f3ff", border: "#ddd6fe", dot: "#7c3aed" }, blue: { bg: "#eff6ff", border: "#bfdbfe", dot: "#2563eb" } };
          return todos.length > 0 ? (
            <Card className="p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#211922] flex items-center gap-2"><span className="p-1.5 rounded-lg" style={{background: MORPHY.fog}}><CheckSquare size={16} style={{color: MORPHY.plumBlack}}/></span>やることリスト <span className="text-xs font-normal px-2 py-0.5 rounded-full" style={{background: MORPHY.red, color: "white"}}>{todos.length}</span></h3>
              </div>
              <div className="space-y-2">
                {todos.map((todo, i) => {
                  const cm = colorMap[todo.color] || colorMap.blue;
                  return (
                    <div key={todo.id} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-all" style={{background: cm.bg, border: `1px solid ${cm.border}`}} onClick={todo.action}>
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{borderColor: cm.dot}}/>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#211922]">{todo.label}</div>
                        {todo.sub && <div className="text-xs text-[#91918c] mt-0.5">{todo.sub}</div>}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {todo.icon}
                        <ChevronRight size={14} className="text-[#91918c]"/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ) : null;
        })()}

        {/* 2. Job Categories & Skills */}
        <Card className="p-5 mb-6">
          <div className="flex items-center gap-2 mb-4"><Zap size={16} style={{color: MORPHY.red}}/><h3 className="font-medium text-[#211922]">職種・スキル</h3></div>
          {(() => {
            const myCategories = jobCategories.filter(jc => jc.certifiedCandidates.includes(c.id));
            const mySkillMaster = skillMaster.filter(sk => sk.certifiedCandidates.includes(c.id));
            return (
              <div className="space-y-4">
                {myCategories.length > 0 && (
                  <div>
                    <span className="text-xs text-[#91918c] mb-2 block">認定職種</span>
                    <div className="flex flex-wrap gap-2">
                      {myCategories.map(jc => (
                        <span key={jc.id} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium" style={{backgroundColor: MORPHY.plumBlack, color: "#fff"}}>
                          <Layers size={12}/>{jc.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {mySkillMaster.length > 0 && (
                  <div>
                    <span className="text-xs text-[#91918c] mb-2 block">認定スキル</span>
                    <div className="flex flex-wrap gap-2">
                      {mySkillMaster.map(sk => (
                        <span key={sk.id} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-medium border" style={{backgroundColor: MORPHY.warmWash, color: MORPHY.plumBlack, borderColor: MORPHY.cardBorder}}>
                          <Zap size={10}/>{sk.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-xs text-[#91918c] mb-2 block">保有スキル</span>
                  <div className="flex flex-wrap gap-1.5">
                    {c.skills.sort((a, b) => b.level - a.level).slice(0, 12).map(s => (
                      <div key={s.name} className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-white border border-[#e5e5e0]">
                        <span className="text-[#211922] font-medium">{s.name}</span>
                        <span className="text-[10px] text-[#91918c]">Lv{s.level}</span>
                        <div className="w-10 h-1 rounded-full bg-[#e5e5e0] overflow-hidden"><div className="h-full rounded-full" style={{width: `${s.level * 20}%`, backgroundColor: s.level >= 4 ? MORPHY.red : s.level >= 3 ? "#d97706" : "#91918c"}}/></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </Card>

        {/* 3. Training Summary (研修状況) */}
        {(() => {
          const myTrainings = candidateTrainings.filter(ct => ct.candidateId === c.id).map(ct => {
            const master = TRAINING_MASTER.find(t => t.id === ct.trainingId);
            return { ...ct, master };
          }).filter(ct => ct.master);
          const inProgressList = myTrainings.filter(ct => ct.status === "受講中");
          const notStartedList = myTrainings.filter(ct => ct.status === "未着手");
          const completedList = myTrainings.filter(ct => ct.status === "完了");
          const statusColor = (s) => s === "受講中" ? { bg: "bg-red-50", text: "text-[#e60023]", dot: "bg-[#e60023]" } : s === "確認テスト待ち" ? { bg: "bg-orange-50", text: "text-orange-600", dot: "bg-orange-500" } : s === "未着手" ? { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500" } : { bg: "bg-green-50", text: "text-green-600", dot: "bg-green-500" };
          return (
            <Card className="p-5 mb-6">
              <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => navigate("candidate-training-list")}>
                <h3 className="font-medium text-[#211922] flex items-center gap-2"><BookOpen size={16} style={{color: MORPHY.red}}/>研修状況</h3>
                <ChevronRight size={16} className="text-[#91918c]"/>
              </div>
              {myTrainings.length > 0 ? (
                <div className="space-y-2">
                  {[...inProgressList, ...notStartedList, ...completedList].map(ct => {
                    const sc = statusColor(ct.status);
                    const statusIcon = ct.status === "受講中" ? "▶" : ct.status === "確認テスト待ち" ? "!" : ct.status === "未着手" ? "○" : "✓";
                    return (
                      <div key={ct.trainingId} className="flex items-center gap-3 p-2.5 rounded-lg" style={{backgroundColor: MORPHY.fog, border: `1px solid ${MORPHY.cardBorder}`}}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${sc.dot}`} style={{color: "white"}}>{statusIcon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[#211922] truncate">{ct.master.title}</div>
                          <div className="text-xs text-[#91918c]">{ct.master.format} ・ {ct.master.duration}</div>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${sc.bg} ${sc.text}`}>{ct.status}</span>
                        {ct.status === "受講中" && ct.progress != null && (
                          <div className="w-16 flex items-center gap-1 flex-shrink-0">
                            <div className="flex-1 bg-[#e5e5e0] rounded-full h-1.5 overflow-hidden"><div className="h-full rounded-full bg-[#e60023]" style={{width: `${ct.progress}%`}}/></div>
                            <span className="text-[10px] text-[#91918c]">{ct.progress}%</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-[#91918c]">現在割り当てられた研修はありません</p>
              )}
            </Card>
          );
        })()}

      </div>
    );
  };

  // ======== Candidate: Cases Screen ========
  const CandidateCasesScreen = () => {
    const c = CURRENT_CANDIDATE;
    const myIRs = interviewRequests.filter(ir => ir.candidateId === c.id);
    const myAssessments = assessmentRequests.filter(ar => ar.candidateId === c.id);
    const myCaseJdIds = [...new Set([...myIRs.map(ir => ir.jdId), ...myAssessments.map(ar => ar.jdId)])].filter(Boolean);

    return (
      <div>
        <PageHeader title="案件状況" subtitle={`${myCaseJdIds.length}件の案件に関与しています`}/>
        {myCaseJdIds.length === 0 ? (
          <Card className="p-12 text-center"><Briefcase size={32} className="text-[#91918c] mx-auto mb-4"/><h3 className="text-lg font-medium text-[#211922] mb-2">関与中の案件はありません</h3><p className="text-sm text-[#91918c]">営業からの提案があるとここに表示されます</p></Card>
        ) : (
          <div className="space-y-4">
            {myCaseJdIds.map(jdId => {
              const jd = JDS.find(j => j.id === jdId);
              if (!jd) return null;
              const ir = myIRs.find(r => r.jdId === jdId);
              const ar = myAssessments.find(a => a.jdId === jdId);
              const steps = [
                { done: true, label: "候補", detail: "営業が提案" },
                { done: !!ir, label: "面談リクエスト", detail: ir ? `${ir.customerName}が送信 (${ir.date})` : "未リクエスト" },
                { done: ir?.status === "回答メール送信済", label: "営業回答済", detail: ir?.status === "回答メール送信済" ? "職務経歴書を送付済み" : "回答待ち" },
                { done: !!ar, label: "アセスメント依頼", detail: ar ? `${ar.title} (${ar.date})` : "依頼なし" },
                { done: ar?.status === "完了", label: "アセスメント完了", detail: ar?.status === "完了" ? `${ar.score}点（${ar.score >= 70 ? "合格" : "不合格"}）` : "未受験" },
              ];
              const currentStep = steps.filter(s => s.done).length;

              return (
                <Card key={jdId} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-base font-medium text-[#211922] mb-1">{jd.title}</h3>
                      <p className="text-xs text-[#91918c]">{jd.location} ・ {jd.remote} ・ {jd.experience}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#91918c]">進捗</div>
                      <span className="text-lg font-bold" style={{color: MORPHY.red}}>{currentStep}/{steps.length}</span>
                    </div>
                  </div>
                  {/* Required skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(jd.requiredSkills || []).map(s => <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600">{s}</span>)}
                    {(jd.preferredSkills || []).slice(0, 3).map(s => <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-[#f6f6f3] text-[#62625b]">{s}</span>)}
                  </div>
                  {/* Progress Steps */}
                  <div className="space-y-0">
                    {steps.map((s, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? "bg-[#e60023]" : "bg-[#e5e5e0]"}`}>
                            {s.done ? <CheckCircle size={12} className="text-white"/> : <div className="w-2 h-2 rounded-full bg-[#91918c]"/>}
                          </div>
                          {i < steps.length - 1 && <div className={`w-0.5 h-6 ${s.done ? "bg-[#e60023]" : "bg-[#e5e5e0]"}`}/>}
                        </div>
                        <div className="pb-3">
                          <span className={`text-sm ${s.done ? "font-medium text-[#211922]" : "text-[#91918c]"}`}>{s.label}</span>
                          <p className="text-xs text-[#91918c]">{s.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Action buttons */}
                  <div className="flex gap-2 mt-2 pt-3" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                    {ar && ar.status === "未受験" && (
                      <button onClick={() => navigate("candidate-assessment-take", { plan: ar })} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center gap-2"><ClipboardList size={14}/>アセスメントを受験</button>
                    )}
                    {ar?.status === "完了" && <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 border border-green-200 flex items-center gap-1"><Award size={12}/>{ar.score}点で{ar.score >= 70 ? "合格" : "不合格"}</span>}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ======== Candidate: Notifications Screen (timeline) ========
  const CandidateNotificationsScreen = () => {
    const c = CURRENT_CANDIDATE;
    const myAssessments = assessmentRequests.filter(ar => ar.candidateId === c.id);
    const myIRs = interviewRequests.filter(ir => ir.candidateId === c.id);

    // Build timeline — natural message style
    const timeline = [
      ...myAssessments.filter(ar => ar.status === "未受験").map(ar => {
        const jd = JDS.find(j => j.id === ar.jdId);
        return { type: "assessment-request", date: ar.date, icon: <ClipboardList size={16} className="text-red-600"/>, bg: "bg-red-50", sender: "営業担当", title: `「${jd ? jd.title : "案件"}」のアセスメント受験依頼が届きました`, desc: `${ar.title}の受験をお願いします。所要時間は約10分です。`, jd, action: () => navigate("candidate-assessment-take", { plan: ar }), actionLabel: "受験する", urgent: true };
      }),
      ...myAssessments.filter(ar => ar.status === "完了").map(ar => {
        const jd = JDS.find(j => j.id === ar.jdId);
        return { type: "assessment-done", date: ar.date, icon: <Award size={16} className="text-green-600"/>, bg: "bg-green-50", sender: "システム", title: `「${jd ? jd.title : "案件"}」のアセスメント結果が出ました`, desc: `${ar.title} — スコア ${ar.score}点（${ar.score >= 70 ? "合格" : "不合格"}）`, jd, action: () => { setDefaultFilter("completed"); navigate("candidate-assessments"); }, actionLabel: "結果を見る" };
      }),
      ...myIRs.filter(ir => ir.status === "回答メール送信済").map(ir => {
        const jd = JDS.find(j => j.id === ir.jdId);
        return { type: "ir-replied", date: ir.date, icon: <Mail size={16} className="text-blue-600"/>, bg: "bg-blue-50", sender: "営業担当", title: `「${jd ? jd.title : "案件"}」の面談リクエストに回答がありました`, desc: `${ir.customerName}様への面談リクエストについて、営業から回答メールが送信されました。職務経歴書が添付されています。`, jd, action: () => navigate("candidate-cases"), actionLabel: "案件を見る" };
      }),
      ...myIRs.filter(ir => ir.status === "未対応").map(ir => {
        const jd = JDS.find(j => j.id === ir.jdId);
        return { type: "ir-pending", date: ir.date, icon: <Clock size={16} className="text-amber-600"/>, bg: "bg-amber-50", sender: "システム", title: `「${jd ? jd.title : "案件"}」の面談リクエストを受け付けました`, desc: `${ir.customerName}様からの面談リクエストについて、現在営業が対応中です。回答があり次第お知らせします。`, jd, action: () => navigate("candidate-cases"), actionLabel: "案件を見る" };
      }),
      // Training assignments
      ...candidateTrainings.filter(ct => ct.candidateId === c.id && ct.status === "未着手").map(ct => {
        const tr = TRAINING_MASTER.find(t => t.id === ct.trainingId);
        if (!tr) return null;
        return { type: "training-assigned", date: ct.startDate || "2026/04/20 09:00", icon: <BookOpen size={16} className="text-purple-600"/>, bg: "bg-purple-50", sender: "管理者", title: `研修「${tr.title}」の受講指示が届きました`, desc: `${tr.category} ・ ${tr.duration} ・ ${tr.format}。早めに受講を開始してください。`, action: () => navigate("candidate-training-list"), actionLabel: "研修一覧へ", urgent: true };
      }).filter(Boolean),
      ...candidateTrainings.filter(ct => ct.candidateId === c.id && ct.status === "受講中").map(ct => {
        const tr = TRAINING_MASTER.find(t => t.id === ct.trainingId);
        if (!tr) return null;
        return { type: "training-progress", date: ct.startDate || "2026/04/15 09:00", icon: <BookOpen size={16} className="text-blue-600"/>, bg: "bg-blue-50", sender: "システム", title: `研修「${tr.title}」を受講中です（${ct.progress}%）`, desc: `引き続き受講を進めてください。`, action: () => navigate("candidate-training-list"), actionLabel: "研修一覧へ" };
      }).filter(Boolean),
      // 確認テスト待ち
      ...candidateTrainings.filter(ct => ct.candidateId === c.id && ct.status === "確認テスト待ち").map(ct => {
        const tr = TRAINING_MASTER.find(t => t.id === ct.trainingId);
        if (!tr) return null;
        return { type: "test-waiting", date: new Date().toISOString().slice(0,10).replace(/-/g,"/"), icon: <ClipboardList size={16} className="text-orange-600"/>, bg: "bg-orange-50", sender: "システム", title: `研修「${tr.title}」の習得確認テストを受験してください`, desc: `研修の受講が完了しました。習得確認テストに合格すると研修完了となります。`, action: () => navigate("candidate-training-list"), actionLabel: "テストを受験", urgent: true };
      }).filter(Boolean),
      // 受験可能なスキルアセスメント
      ...(() => {
        const myDoneT = candidateTrainings.filter(ct => ct.candidateId === c.id && ct.status === "完了").map(ct => ct.trainingId);
        return skillMaster.filter(sk => {
          const prereqs = sk.prerequisiteTrainings || [];
          const met = prereqs.length === 0 || prereqs.every(tid => myDoneT.includes(tid));
          return met && !sk.certifiedCandidates.includes(c.id);
        }).map(sk => ({
          type: "assessment-available", date: new Date().toISOString().slice(0,10).replace(/-/g,"/"), icon: <Award size={16} className="text-[#e60023]"/>, bg: "bg-red-50", sender: "システム", title: `「${sk.name}」アセスメントが受験可能になりました`, desc: `前提研修を全て完了しました。アセスメントに合格するとスキル認定が付与されます。（${sk.assessment.questions}問 ・ ${sk.assessment.duration}）`, action: () => navigate("candidate-assessments"), actionLabel: "受験する", urgent: true
        }));
      })(),
    ].sort((a, b) => b.date.localeCompare(a.date));

    return (
      <div>
        <PageHeader title="通知" subtitle={`${timeline.length}件の通知`}/>
        {timeline.length === 0 ? (
          <Card className="p-12 text-center"><Bell size={32} className="text-[#91918c] mx-auto mb-4"/><h3 className="text-lg font-medium text-[#211922] mb-2">通知はありません</h3><p className="text-sm text-[#91918c]">新しい通知があるとここに表示されます</p></Card>
        ) : (
          <div className="space-y-3">
            {timeline.map((ev, i) => (
              <Card key={i} className="p-5 transition-all cursor-pointer hover:shadow-md" style={ev.urgent ? {border: "1px solid #fecaca"} : {}} onClick={ev.action}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${ev.bg}`}>{ev.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#f6f6f3] text-[#62625b] font-medium">{ev.sender}</span>
                      {ev.urgent && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-medium">要対応</span>}
                      <span className="text-[10px] text-[#91918c] ml-auto">{ev.date}</span>
                    </div>
                    <h4 className="text-sm font-medium text-[#211922] mb-1">{ev.title}</h4>
                    <p className="text-xs text-[#62625b] leading-relaxed">{ev.desc}</p>
                  </div>
                  {ev.action && (
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#e60023] text-white flex items-center gap-1 flex-shrink-0 mt-1">{ev.actionLabel || "詳細"}<ChevronRight size={12}/></button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ======== Candidate: Assessments Screen (with filter tabs) ========
  const CandidateAssessmentsScreen = () => {
    const c = CURRENT_CANDIDATE;
    const myCompletedTrainings = candidateTrainings.filter(ct => ct.candidateId === c.id && ct.status === "完了").map(ct => ct.trainingId);

    // Build skill assessment list: check prerequisites
    const skillAssessmentList = skillMaster.map(sk => {
      const prereqs = sk.prerequisiteTrainings || [];
      const completedPrereqs = prereqs.filter(tid => myCompletedTrainings.includes(tid));
      const allPrereqsMet = prereqs.length === 0 || completedPrereqs.length === prereqs.length;
      const alreadyCertified = sk.certifiedCandidates.includes(c.id);
      // Check if already passed via assessmentRequests
      const existingResult = assessmentRequests.find(ar => ar.candidateId === c.id && ar.skillId === sk.id && ar.status === "完了");
      const status = alreadyCertified || existingResult ? "合格済み" : allPrereqsMet ? "受験可能" : "前提未達";
      return { ...sk, status, completedPrereqs, totalPrereqs: prereqs.length, existingResult, prereqs };
    });

    const available = skillAssessmentList.filter(s => s.status === "受験可能");
    const passed = skillAssessmentList.filter(s => s.status === "合格済み");
    const locked = skillAssessmentList.filter(s => s.status === "前提未達");

    const [tab, setTab] = useState("all");
    const tabs = [
      { id: "all", label: "すべて", count: skillAssessmentList.length },
      { id: "available", label: "受験可能", count: available.length },
      { id: "passed", label: "合格済み", count: passed.length },
      { id: "locked", label: "前提未達", count: locked.length },
    ];
    const displayed = tab === "available" ? available : tab === "passed" ? passed : tab === "locked" ? locked : skillAssessmentList;

    // Inline exam state
    const [examSkill, setExamSkill] = useState(null);
    const [asmStep, setAsmStep] = useState("intro");
    const [asmQ, setAsmQ] = useState(0);
    const [asmAnswers, setAsmAnswers] = useState({});

    const generateSkillQuestions = (sk) => sk.assessment.areas.slice(0, 3).map((area, i) => ({
      id: i, q: `${sk.name}の「${area}」に関する問題：業務で最も重要な取り組みはどれですか？`,
      opts: ["関連しない作業を優先する", `${area}の実務手順に基づいて正確に処理する`, "自己流で対処する", "他者に全て任せる"], correct: 1
    }));

    const startSkillExam = (skId) => { setExamSkill(skId); setAsmStep("intro"); setAsmQ(0); setAsmAnswers({}); };

    const submitSkillExam = (sk, questions) => {
      setAsmStep("submitting");
      setTimeout(() => {
        let correct = 0;
        questions.forEach((q, i) => { if (asmAnswers[i] === q.correct) correct++; });
        const score = Math.round((correct / questions.length) * 100);
        const passed = score >= sk.assessment.passScore;
        if (passed) {
          setSkillMaster(prev => prev.map(s => s.id === sk.id ? { ...s, certifiedCandidates: [...s.certifiedCandidates, c.id] } : s));
          setAssessmentRequests(prev => [...prev, { id: `AR-SK-${sk.id}-${Date.now()}`, candidateId: c.id, skillId: sk.id, title: `${sk.name} スキルアセスメント`, date: new Date().toISOString().slice(0,10).replace(/-/g,"/"), status: "完了", score }]);
          showToast(`「${sk.name}」スキル認定を取得しました`);
        }
        setAsmStep("result");
        setAsmAnswers(prev => ({ ...prev, _score: score, _passed: passed, _correct: correct, _total: questions.length, _passScore: sk.assessment.passScore }));
      }, 1200);
    };

    return (
      <div>
        <PageHeader title="アセスメント" subtitle="前提研修を完了するとスキルアセスメントが受験可能になります"/>

        {/* Summary */}
        <div className="grid grid-cols-3 tf-grid-3 gap-4 mb-6">
          <Card className="p-4 text-center cursor-pointer hover:shadow-sm transition-all" onClick={() => setTab("available")} style={available.length > 0 ? {border: `1px solid ${MORPHY.red}30`, background: `${MORPHY.red}05`} : {}}>
            <div className="text-2xl font-bold" style={{color: MORPHY.red}}>{available.length}</div>
            <div className="text-xs text-[#91918c]">受験可能</div>
          </Card>
          <Card className="p-4 text-center cursor-pointer hover:shadow-sm transition-all" onClick={() => setTab("passed")}>
            <div className="text-2xl font-bold text-green-600">{passed.length}</div>
            <div className="text-xs text-[#91918c]">合格済み</div>
          </Card>
          <Card className="p-4 text-center cursor-pointer hover:shadow-sm transition-all" onClick={() => setTab("locked")}>
            <div className="text-2xl font-bold text-[#91918c]">{locked.length}</div>
            <div className="text-xs text-[#91918c]">前提未達</div>
          </Card>
        </div>

        {/* Tabs */}
        <Card className="p-4 mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`text-xs px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${tab === t.id ? "bg-[#e60023] text-white" : "bg-[#f6f6f3] text-[#62625b] hover:bg-[#e5e5e0]"}`}>{t.label}<span className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab === t.id ? "bg-white/20" : "bg-[#e5e5e0]"}`}>{t.count}</span></button>
            ))}
          </div>
        </Card>

        {/* List */}
        {displayed.length === 0 ? (
          <Card className="p-12 text-center"><ClipboardList size={32} className="text-[#91918c] mx-auto mb-4"/><h3 className="text-lg font-medium text-[#211922] mb-2">{tab === "available" ? "前提研修を完了するとアセスメントが受験可能になります" : tab === "passed" ? "まだ合格したアセスメントはありません" : "該当するアセスメントはありません"}</h3></Card>
        ) : (
          <div className="space-y-3">
            {displayed.map(sk => {
              const isExamOpen = examSkill === sk.id;
              const questions = isExamOpen ? generateSkillQuestions(sk) : [];
              return (
                <Card key={sk.id} className="p-5 transition-all hover:shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${sk.status === "受験可能" ? "bg-red-50 text-red-700 border-red-200" : sk.status === "合格済み" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}>{sk.status}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f6f6f3] text-[#62625b] border border-[#e5e5e0]">{sk.category}</span>
                      </div>
                      <h4 className="text-sm font-medium text-[#211922] mb-1">{sk.name}</h4>
                      <p className="text-xs text-[#91918c] mb-2">{sk.description}</p>
                      <div className="flex items-center gap-3 text-xs text-[#62625b]">
                        <span>{sk.assessment.questions}問</span><span>・</span>
                        <span>{sk.assessment.duration}</span><span>・</span>
                        <span>合格ライン: {sk.assessment.passScore}点</span>
                      </div>
                      {/* Prerequisites */}
                      {sk.prereqs.length > 0 && (
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] text-[#91918c]">前提研修:</span>
                          {sk.prereqs.map(tid => {
                            const tr = TRAINING_MASTER.find(t => t.id === tid);
                            const done = myCompletedTrainings.includes(tid);
                            return tr ? (
                              <span key={tid} className={`text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${done ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
                                {done && <CheckCircle size={8}/>}{tr.title}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {sk.status === "合格済み" && (
                        <div className="text-center">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-1"><Award size={18} className="text-green-600"/></div>
                          {sk.existingResult && <span className="text-sm font-bold text-green-600">{sk.existingResult.score}点</span>}
                        </div>
                      )}
                      {sk.status === "受験可能" && !isExamOpen && (
                        <button onClick={() => startSkillExam(sk.id)} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center gap-2 whitespace-nowrap"><ClipboardList size={14}/>受験する</button>
                      )}
                      {sk.status === "前提未達" && (
                        <div className="text-center">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><Lock size={18} className="text-gray-400"/></div>
                          <span className="text-[10px] text-[#91918c] mt-1 block">{sk.completedPrereqs.length}/{sk.totalPrereqs}</span>
                          <div className="text-[9px] text-[#91918c] mt-2 leading-tight max-w-[150px]">
                            未完了: {sk.prereqs.filter(tid => !myCompletedTrainings.includes(tid)).map(tid => TRAINING_MASTER.find(t => t.id === tid)?.title).filter(Boolean).join(", ")}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Inline Exam */}
                  {isExamOpen && (
                    <div className="mt-4 p-4 rounded-lg border" style={{background: MORPHY.fog, borderColor: MORPHY.cardBorder}}>
                      {asmStep === "intro" && (
                        <div className="text-center py-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{background: `${MORPHY.red}15`}}><Award size={24} style={{color: MORPHY.red}}/></div>
                          <h4 className="font-medium text-[#211922] mb-1">{sk.name} アセスメント</h4>
                          <p className="text-xs text-[#91918c] mb-1">{sk.assessment.areas.join("・")}</p>
                          <p className="text-xs text-[#91918c] mb-3">全{questions.length}問 ・ 合格ライン{sk.assessment.passScore}点 ・ 想定{sk.assessment.duration}</p>
                          <div className="flex gap-2 justify-center">
                            <button onClick={() => setAsmStep("q")} className="px-5 py-2 rounded-lg text-sm font-medium bg-[#e60023] text-white">受験開始</button>
                            <button onClick={() => setExamSkill(null)} className="px-5 py-2 rounded-lg text-sm font-medium border border-[#e5e5e0] text-[#62625b]">キャンセル</button>
                          </div>
                        </div>
                      )}
                      {asmStep === "q" && (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-[#91918c]">問題 {asmQ + 1} / {questions.length}</span>
                            <div className="flex gap-1">{questions.map((_, i) => <div key={i} className={`w-6 h-1.5 rounded-full ${i < asmQ ? "bg-[#e60023]" : i === asmQ ? "bg-[#211922]" : "bg-[#e5e5e0]"}`}/>)}</div>
                          </div>
                          <h4 className="text-sm font-medium text-[#211922] mb-3">{questions[asmQ].q}</h4>
                          <div className="space-y-2">
                            {questions[asmQ].opts.map((opt, oi) => (
                              <button key={oi} onClick={() => setAsmAnswers(prev => ({...prev, [asmQ]: oi}))} className={`w-full text-left p-3 rounded-lg text-sm transition-all border ${asmAnswers[asmQ] === oi ? "border-[#e60023] bg-red-50 text-[#211922] font-medium" : "border-[#e5e5e0] bg-white text-[#62625b] hover:border-[#c8c8c1]"}`}>{opt}</button>
                            ))}
                          </div>
                          <div className="flex justify-between mt-4">
                            <button onClick={() => setAsmQ(q => Math.max(0, q - 1))} disabled={asmQ === 0} className="text-xs text-[#91918c] disabled:opacity-30">← 前の問題</button>
                            {asmQ < questions.length - 1 ? (
                              <button onClick={() => setAsmQ(q => q + 1)} disabled={asmAnswers[asmQ] == null} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#211922] text-white disabled:opacity-30">次の問題 →</button>
                            ) : (
                              <button onClick={() => submitSkillExam(sk, questions)} disabled={asmAnswers[asmQ] == null} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#e60023] text-white disabled:opacity-30">提出する</button>
                            )}
                          </div>
                        </div>
                      )}
                      {asmStep === "submitting" && (
                        <div className="text-center py-8"><RefreshCw size={24} className="animate-spin mx-auto mb-2 text-[#91918c]"/><p className="text-sm text-[#91918c]">採点中...</p></div>
                      )}
                      {asmStep === "result" && (
                        <div className="text-center py-4">
                          {asmAnswers._passed ? (
                            <>
                              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3"><CheckCircle size={28} className="text-green-600"/></div>
                              <h4 className="text-lg font-bold text-green-700 mb-1">合格！</h4>
                              <p className="text-sm text-[#62625b]">{asmAnswers._correct}/{asmAnswers._total}問正解（{asmAnswers._score}点）</p>
                              <p className="text-xs text-green-600 mt-1">「{sk.name}」の認定スキルが付与されました！</p>
                              <button onClick={() => setExamSkill(null)} className="mt-3 px-5 py-2 rounded-lg text-sm font-medium bg-green-600 text-white">閉じる</button>
                            </>
                          ) : (
                            <>
                              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3"><X size={28} className="text-red-600"/></div>
                              <h4 className="text-lg font-bold text-red-700 mb-1">不合格</h4>
                              <p className="text-sm text-[#62625b]">{asmAnswers._correct}/{asmAnswers._total}問正解（{asmAnswers._score}点）・合格ライン: {asmAnswers._passScore}点</p>
                              <p className="text-xs text-[#91918c] mt-1">研修内容を復習のうえ、再受験してください。</p>
                              <div className="flex gap-2 justify-center mt-3">
                                <button onClick={() => startSkillExam(sk.id)} className="px-5 py-2 rounded-lg text-sm font-medium bg-[#e60023] text-white">再受験する</button>
                                <button onClick={() => setExamSkill(null)} className="px-5 py-2 rounded-lg text-sm font-medium border border-[#e5e5e0] text-[#62625b]">閉じる</button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ======== Candidate: Profile Screen ========
  const CandidateProfileScreen = () => {
    const c = CURRENT_CANDIDATE;
    const myAssessments = assessmentRequests.filter(ar => ar.candidateId === c.id && ar.status === "完了");
    const avgScore = myAssessments.length > 0 ? Math.round(myAssessments.reduce((s, ar) => s + ar.score, 0) / myAssessments.length) : null;

    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    const startEdit = () => { setDraft({ location: c.location, workCondition: c.workCondition, changeIntent: c.changeIntent, remoteOk: c.remoteOk, aspiration: c.aspiration, wantToDo: c.wantToDo, avoidToDo: c.avoidToDo || "", skills: c.skills.map(s => ({...s})), certifications: [...c.certifications] }); setEditing(true); };
    const cancelEdit = () => { setDraft(null); setEditing(false); };
    const saveProfile = () => {
      setSaving(true);
      setTimeout(() => {
        const updated = { ...candidateProfile, ...draft };
        setCandidateProfile(updated);
        // Sync back to CANDIDATES array so admin/sales screens see the latest data
        const idx = CANDIDATES.findIndex(cd => cd.id === updated.id);
        if (idx !== -1) CANDIDATES[idx] = { ...CANDIDATES[idx], ...draft };
        setSaving(false); setEditing(false); setDraft(null); showToast("プロフィールを更新しました");
        setToast("プロフィールを更新しました");
        setTimeout(() => setToast(null), 3000);
      }, 800);
    };
    const updateSkillLevel = (idx, newLevel) => { const s = [...draft.skills]; s[idx] = {...s[idx], level: Math.max(1, Math.min(5, newLevel))}; setDraft({...draft, skills: s}); };
    const addSkill = () => { setDraft({...draft, skills: [...draft.skills, {name: "", level: 1, years: 0}]}); };
    const removeSkill = (idx) => { setDraft({...draft, skills: draft.skills.filter((_, i) => i !== idx)}); };
    const updateSkillName = (idx, name) => { const s = [...draft.skills]; s[idx] = {...s[idx], name}; setDraft({...draft, skills: s}); };
    const addCert = () => { setDraft({...draft, certifications: [...draft.certifications, ""]}); };
    const removeCert = (idx) => { setDraft({...draft, certifications: draft.certifications.filter((_, i) => i !== idx)}); };
    const updateCert = (idx, val) => { const certs = [...draft.certifications]; certs[idx] = val; setDraft({...draft, certifications: certs}); };

    const inputCls = "w-full text-sm rounded-lg border border-[#e5e5e0] bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e60023]/20 focus:border-[#e60023] transition-colors";
    const labelCls = "text-xs text-[#6b6b66] block mb-1 font-medium";

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <PageHeader title="プロフィール" subtitle="あなたの情報"/>
          {!editing ? (
            <button onClick={startEdit} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:shadow-md" style={{background: MORPHY.red}}><Edit3 size={14}/>編集する</button>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={cancelEdit} className="px-4 py-2 rounded-xl text-sm font-medium text-[#62625b] bg-[#f6f6f3] hover:bg-[#e5e5e0] transition-colors">キャンセル</button>
              <button onClick={saveProfile} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:shadow-md disabled:opacity-50" style={{background: MORPHY.red}}>
                {saving ? <><RefreshCw size={14} className="animate-spin"/>保存中...</> : <><CheckCircle size={14}/>保存する</>}
              </button>
            </div>
          )}
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#211922] text-white text-sm shadow-lg animate-fade-in">
            <CheckCircle size={16} className="text-green-400"/>{toast}
          </div>
        )}

        <div className="grid grid-cols-3 tf-grid-3 gap-6">
          <div className="col-span-2 space-y-5">
            {/* Basic Info */}
            <Card className="p-6">
              <div className="flex items-center gap-5 mb-5">
                <CandidateAvatar candidate={c} size="lg"/>
                <div>
                  <h3 className="text-xl font-medium text-[#211922]">{c.name}</h3>
                  <p className="text-sm text-[#91918c]">{c.currentRole}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[#62625b]">
                    <span className="flex items-center gap-1"><MapPin size={12}/>{editing ? draft.location : c.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={12}/>経験{c.totalYears}年</span>
                    <span className="flex items-center gap-1"><Monitor size={12}/>{(editing ? draft.remoteOk : c.remoteOk) ? "リモート可" : "出社"}</span>
                  </div>
                </div>
              </div>
              {editing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelCls}>所在地</label><input className={inputCls} value={draft.location} onChange={e => setDraft({...draft, location: e.target.value})}/></div>
                    <div><label className={labelCls}>勤務条件</label><input className={inputCls} value={draft.workCondition} onChange={e => setDraft({...draft, workCondition: e.target.value})}/></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelCls}>転職意向</label>
                      <select className={inputCls} value={draft.changeIntent} onChange={e => setDraft({...draft, changeIntent: e.target.value})}>
                        <option>積極的に検討中</option><option>良い派遣先があれば検討</option><option>今は考えていない</option>
                      </select>
                    </div>
                    <div><label className={labelCls}>リモート可否</label>
                      <select className={inputCls} value={draft.remoteOk ? "yes" : "no"} onChange={e => setDraft({...draft, remoteOk: e.target.value === "yes"})}>
                        <option value="yes">リモート可</option><option value="no">出社のみ</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-[#f6f6f3]"><span className="text-xs text-[#91918c] block mb-0.5">勤務条件</span><span className="font-medium">{c.workCondition}</span></div>
                  <div className="p-3 rounded-lg bg-[#f6f6f3]"><span className="text-xs text-[#91918c] block mb-0.5">転職意向</span><span className="font-medium">{c.changeIntent}</span></div>
                </div>
              )}
            </Card>

            {/* Skills */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#211922] flex items-center gap-2"><Zap size={16} style={{color: MORPHY.red}}/>スキル一覧</h3>
                {editing && <button onClick={addSkill} className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#f6f6f3] transition-colors" style={{color: MORPHY.red}}><Plus size={12}/>スキル追加</button>}
              </div>
              {editing ? (
                <div className="space-y-2">
                  {draft.skills.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-[#f6f6f3]">
                      <input className="text-sm rounded-lg border border-[#e5e5e0] bg-white px-2 py-1.5 w-32 focus:outline-none focus:ring-2 focus:ring-[#e60023]/20" value={s.name} onChange={e => updateSkillName(i, e.target.value)} placeholder="スキル名"/>
                      <div className="flex items-center gap-1 flex-1">
                        {[1,2,3,4,5].map(lv => (
                          <button key={lv} onClick={() => updateSkillLevel(i, lv)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${s.level >= lv ? "text-white" : "bg-white border border-[#e5e5e0] text-[#91918c] hover:border-[#e60023]"}`} style={s.level >= lv ? {background: MORPHY.red} : {}}>{lv}</button>
                        ))}
                      </div>
                      <button onClick={() => removeSkill(i)} className="p-1.5 rounded-lg hover:bg-red-50 text-[#91918c] hover:text-red-500 transition-colors"><X size={14}/></button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {c.skills.sort((a,b) => b.level - a.level).map(s => (
                    <div key={s.name} className="flex items-center gap-3">
                      <span className="text-sm text-[#211922] w-32 flex-shrink-0">{s.name}</span>
                      <div className="flex-1 bg-[#e5e5e0] rounded-full h-2 overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{width: `${s.level * 20}%`, backgroundColor: s.level >= 4 ? MORPHY.red : s.level >= 3 ? "#f59e0b" : "#91918c"}}/>
                      </div>
                      <span className="text-xs font-medium text-[#62625b] w-12 text-right">Lv {s.level}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Career History */}
            <Card className="p-6">
              <h3 className="font-medium text-[#211922] mb-4 flex items-center gap-2"><FileText size={16} style={{color: MORPHY.plumBlack}}/>職務経歴</h3>
              <div className="space-y-4">
                {c.careerHistory.map((h, i) => (
                  <div key={i} className="p-4 rounded-xl" style={{backgroundColor: MORPHY.fog, border: `1px solid ${MORPHY.cardBorder}`}}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-sm font-medium text-[#211922]">{h.project}</h4>
                        <p className="text-xs text-[#91918c]">{h.role} ・ {h.phase}</p>
                      </div>
                      <span className="text-xs text-[#91918c] flex-shrink-0">{h.period}</span>
                    </div>
                    <p className="text-xs text-[#62625b] mb-2">{h.detail}</p>
                    <div className="flex flex-wrap gap-1">
                      {h.tech.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#e5e5e0] text-[#62625b]">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Aspirations */}
            <Card className="p-6">
              <h3 className="font-medium text-[#211922] mb-3 flex items-center gap-2"><Target size={16} style={{color: MORPHY.plumBlack}}/>キャリア志向</h3>
              {editing ? (
                <div className="space-y-4">
                  <div><label className={labelCls}>キャリアの方向性</label><textarea className={inputCls + " resize-none"} rows={3} value={draft.aspiration} onChange={e => setDraft({...draft, aspiration: e.target.value})}/></div>
                  <div><label className={labelCls}>やりたいこと</label><input className={inputCls} value={draft.wantToDo} onChange={e => setDraft({...draft, wantToDo: e.target.value})}/></div>
                  <div><label className={labelCls}>避けたいこと</label><input className={inputCls} value={draft.avoidToDo} onChange={e => setDraft({...draft, avoidToDo: e.target.value})}/></div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-[#62625b] leading-relaxed mb-3">{c.aspiration}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-[#f6f6f3]">
                      <span className="text-xs text-[#91918c] block mb-0.5">やりたいこと</span>
                      <span className="text-sm text-[#211922]">{c.wantToDo}</span>
                    </div>
                    {c.avoidToDo && (
                      <div className="p-3 rounded-lg bg-[#f6f6f3]">
                        <span className="text-xs text-[#91918c] block mb-0.5">避けたいこと</span>
                        <span className="text-sm text-[#211922]">{c.avoidToDo}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Assessment Summary */}
            <Card className="p-4">
              <h4 className="text-sm font-medium text-[#211922] mb-3 flex items-center gap-2"><Award size={14} style={{color: MORPHY.red}}/>アセスメント成績</h4>
              {avgScore ? (
                <div>
                  <div className="text-center mb-3">
                    <span className="text-3xl font-bold" style={{color: avgScore >= 70 ? "#15803d" : "#dc2626"}}>{avgScore}</span>
                    <span className="text-sm text-[#91918c]">点（平均）</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {myAssessments.map(ar => (
                      <div key={ar.id} className="flex items-center justify-between">
                        <span className="text-[#62625b] truncate flex-1">{ar.title}</span>
                        <span className="font-medium ml-2" style={{color: ar.score >= 70 ? "#15803d" : "#dc2626"}}>{ar.score}点</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#91918c] text-center py-4">受験済みのアセスメントはありません</p>
              )}
            </Card>

            {/* Certifications */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-[#211922] flex items-center gap-2"><Shield size={14} style={{color: MORPHY.plumBlack}}/>保有資格</h4>
                {editing && <button onClick={addCert} className="text-[10px] font-medium px-2 py-1 rounded-lg hover:bg-[#f6f6f3] transition-colors" style={{color: MORPHY.red}}>+ 追加</button>}
              </div>
              {editing ? (
                <div className="space-y-2">
                  {draft.certifications.map((cert, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input className="flex-1 text-xs rounded-lg border border-[#e5e5e0] bg-white px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#e60023]/20" value={cert} onChange={e => updateCert(i, e.target.value)} placeholder="資格名"/>
                      <button onClick={() => removeCert(i)} className="p-1 rounded hover:bg-red-50 text-[#91918c] hover:text-red-500"><X size={12}/></button>
                    </div>
                  ))}
                  {draft.certifications.length === 0 && <p className="text-xs text-[#91918c] text-center py-2">資格を追加してください</p>}
                </div>
              ) : (
                c.certifications.length > 0 ? (
                  <div className="space-y-1.5">
                    {c.certifications.map(cert => (
                      <div key={cert} className="flex items-center gap-2 text-xs text-[#62625b]">
                        <CheckCircle size={12} className="text-green-600 flex-shrink-0"/>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-xs text-[#91918c] text-center py-2">登録された資格はありません</p>
              )}
            </Card>

            {/* Quick Stats */}
            <Card className="p-4">
              <h4 className="text-sm font-medium text-[#211922] mb-3">概要</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#91918c]">スキル数</span><span className="font-medium">{(editing ? draft.skills : c.skills).length}</span></div>
                <div className="flex justify-between"><span className="text-[#91918c]">プロジェクト数</span><span className="font-medium">{c.careerHistory.length}</span></div>
                <div className="flex justify-between"><span className="text-[#91918c]">資格数</span><span className="font-medium">{(editing ? draft.certifications : c.certifications).length}</span></div>
                <div className="flex justify-between"><span className="text-[#91918c]">経験年数</span><span className="font-medium">{c.totalYears}年</span></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // Assessment taking screen (simple demo)
  const CandidateAssessmentTakeScreen = () => {
    const ar = selectedPlan; // Reuse selectedPlan to pass assessment request data
    const [step, setStep] = useState("intro"); // "intro" | "q1" | "q2" | "q3" | "submitting" | "result"
    const [answers, setAnswers] = useState({});
    const jd = ar ? JDS.find(j => j.id === ar.jdId) : null;

    const questions = [
      { id: "q1", text: jd ? `「${jd.title}」で必要とされる主要なスキルとして最も適切なものは？` : "プロジェクトで最も重要なスキルは？", options: [
        { id: "a", text: jd?.requiredSkills?.[0] || "React", correct: true },
        { id: "b", text: "Excel VBA", correct: false },
        { id: "c", text: "COBOL", correct: false },
        { id: "d", text: jd?.requiredSkills?.[1] || "TypeScript", correct: true }
      ]},
      { id: "q2", text: "派遣先での業務引き継ぎにおいて、最も重要なことは？", options: [
        { id: "a", text: "口頭説明のみで済ませる", correct: false },
        { id: "b", text: "業務マニュアルの整備と実地での確認を行う", correct: true },
        { id: "c", text: "前任者に全て任せる", correct: false },
        { id: "d", text: "問題が起きてから対処する", correct: false }
      ]},
      { id: "q3", text: "複数の派遣スタッフが関わる業務で最も重要な取り組みは？", options: [
        { id: "a", text: "各メンバーが独立して作業する", correct: false },
        { id: "b", text: "業務フローの共有とダブルチェック体制の構築", correct: true },
        { id: "c", text: "報告書を最小限にする", correct: false },
        { id: "d", text: "業務量を減らして安定性を重視する", correct: false }
      ]}
    ];

    const calcScore = () => {
      let correct = 0;
      questions.forEach(q => {
        const selected = answers[q.id];
        if (selected) {
          const opt = q.options.find(o => o.id === selected);
          if (opt?.correct) correct++;
        }
      });
      // Demo: add some base score + per-question score
      return Math.min(Math.round(50 + (correct / questions.length) * 50 + Math.random() * 10), 100);
    };

    if (!ar) return <div className="text-center py-20"><p className="text-[#91918c] mb-4">アセスメントが選択されていません</p><button onClick={goBack} className="px-4 py-2 rounded-lg text-sm bg-[#e60023] text-white">戻る</button></div>;

    return (
      <div>
        <PageHeader title={ar.title} subtitle={jd ? `募集: ${jd.title}` : ""} onBack={goBack}/>
        {step === "intro" && (
          <Card className="p-8 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4"><ClipboardList size={28} className="text-purple-600"/></div>
            <h3 className="text-xl font-medium text-[#211922] mb-2">{ar.title}</h3>
            <p className="text-sm text-[#91918c] mb-6">全{questions.length}問のスキルアセスメントです。<br/>所要時間は約5〜10分です。</p>
            <div className="space-y-2 text-left mb-6 p-4 rounded-lg bg-[#f6f6f3]">
              <div className="flex justify-between text-sm"><span className="text-[#91918c]">問題数</span><span className="font-medium">{questions.length}問</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#91918c]">合格基準</span><span className="font-medium">70点以上</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#91918c]">依頼日</span><span className="font-medium">{ar.date}</span></div>
            </div>
            <button onClick={() => setStep("q1")} className="w-full py-3 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center justify-center gap-2"><ClipboardList size={16}/>受験を開始する</button>
          </Card>
        )}

        {questions.map((q, idx) => step === q.id && (
          <Card key={q.id} className="p-6 max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-[#91918c]">問題 {idx + 1} / {questions.length}</span>
              <div className="flex gap-1">{questions.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i <= idx ? "bg-[#e60023]" : "bg-[#e5e5e0]"}`}/>)}</div>
            </div>
            <h3 className="text-base font-medium text-[#211922] mb-4">{q.text}</h3>
            <div className="space-y-2 mb-6">
              {q.options.map(opt => (
                <label key={opt.id} className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${answers[q.id] === opt.id ? "border-[#e60023] bg-red-50/30" : "border-[#e5e5e0] hover:border-[#c8c8c1]"}`} onClick={() => setAnswers(prev => ({...prev, [q.id]: opt.id}))}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${answers[q.id] === opt.id ? "border-[#e60023]" : "border-[#c8c8c1]"}`}>
                    {answers[q.id] === opt.id && <div className="w-3 h-3 rounded-full bg-[#e60023]"/>}
                  </div>
                  <span className="text-sm text-[#211922]">{opt.text}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between">
              {idx > 0 ? <button onClick={() => setStep(questions[idx - 1].id)} className="px-4 py-2.5 rounded-lg text-sm border border-[#e5e5e0] text-[#62625b]">前の問題</button> : <div/>}
              {idx < questions.length - 1 ? (
                <button onClick={() => setStep(questions[idx + 1].id)} disabled={!answers[q.id]} className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white ${answers[q.id] ? "bg-[#e60023] hover:bg-[#cc001f]" : "bg-[#c8c8c1] cursor-not-allowed"}`}>次の問題</button>
              ) : (
                <button onClick={() => { setStep("submitting"); const score = calcScore(); setTimeout(() => { completeAssessment(ar.id, score); setStep("result"); setAnswers(prev => ({...prev, _score: score})); }, 2000); }} disabled={!answers[q.id]} className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white flex items-center gap-2 ${answers[q.id] ? "bg-[#e60023] hover:bg-[#cc001f]" : "bg-[#c8c8c1] cursor-not-allowed"}`}><Send size={14}/>提出する</button>
              )}
            </div>
          </Card>
        ))}

        {step === "submitting" && (
          <Card className="p-12 text-center max-w-lg mx-auto">
            <RefreshCw size={32} className="text-[#e60023] animate-spin mx-auto mb-4"/>
            <h3 className="text-lg font-medium text-[#211922]">採点中...</h3>
            <p className="text-sm text-[#91918c] mt-2">回答を分析しています</p>
          </Card>
        )}

        {step === "result" && (
          <Card className="p-8 text-center max-w-lg mx-auto">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${answers._score >= 70 ? "bg-green-50" : "bg-red-50"}`}>
              {answers._score >= 70 ? <Award size={36} className="text-green-600"/> : <XCircle size={36} className="text-red-600"/>}
            </div>
            <h3 className="text-xl font-medium text-[#211922] mb-1">{answers._score >= 70 ? "合格おめでとうございます！" : "残念ながら不合格です"}</h3>
            <div className="my-4">
              <span className="text-5xl font-bold" style={{color: answers._score >= 70 ? "#15803d" : "#dc2626"}}>{answers._score}</span>
              <span className="text-lg text-[#91918c]"> / 100点</span>
            </div>
            <p className="text-sm text-[#91918c] mb-6">{answers._score >= 70 ? "スキルが十分に確認されました。営業担当に結果が通知されます。" : "再受験が可能です。スキルの向上に取り組んでみてください。"}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => navigate("candidate-assessments")} className="px-5 py-2.5 rounded-lg text-sm font-medium border border-[#e5e5e0] hover:bg-[#f6f6f3] text-[#211922]">アセスメント一覧に戻る</button>
              <button onClick={() => navigate("candidate-dashboard")} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white">マイページに戻る</button>
            </div>
          </Card>
        )}
      </div>
    );
  };

  // ============================================================
  // ABOUT SCREEN — 本サービスについて
  // ============================================================
  const AboutScreen = () => {
    const W = ({ children, bg, py = 80 }) => <div style={{background: bg, padding: `${py}px 0`}}><div style={{maxWidth: 840, margin: "0 auto", padding: "0 32px"}}>{children}</div></div>;
    const SectionLabel = ({ text, color }) => <div className="text-xs font-semibold tracking-wider mb-3" style={{color: color || MORPHY.red}}>{text}</div>;

    return (
      <div style={{marginLeft: -24, marginRight: -24, marginTop: -24, background: "#fff"}}>

        {/* ═══════ HERO ═══════ */}
        <div className="relative overflow-hidden" style={{background: `linear-gradient(160deg, ${MORPHY.plumBlack} 0%, #3a2540 50%, #4d3555 100%)`, padding: "96px 0 88px"}}>
          <div className="absolute" style={{top: -150, right: -100, width: 600, height: 600, borderRadius: "50%", background: `${MORPHY.red}0c`}}/>
          <div style={{maxWidth: 840, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1}}>
            <div className="flex items-center gap-2.5 mb-10">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background: MORPHY.red}}><Layers size={18} className="text-white"/></div>
              <span className="text-white font-bold">TalentFlow</span>
            </div>
            <h1 className="font-bold text-white" style={{fontSize: 42, lineHeight: 1.25, letterSpacing: "-1.5px", marginBottom: 20}}>
              派遣スタッフの<br/>可能性を、最大化する。
            </h1>
            <p className="text-base" style={{color: "rgba(255,255,255,0.5)", lineHeight: 1.9, maxWidth: 480, marginBottom: 40}}>
              育成・スキル認定・最適配置をワンストップで実現する、人材派遣DXプラットフォーム。
            </p>
            <div className="flex gap-8">
              {[{ n: "60%", l: "マッチング精度向上" }, { n: "3x", l: "提案スピード" }, { n: "80%", l: "管理工数削減" }].map(s => (
                <div key={s.n}><div className="text-2xl font-bold" style={{color: MORPHY.red}}>{s.n}</div><div className="text-xs" style={{color: "rgba(255,255,255,0.35)", marginTop: 2}}>{s.l}</div></div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ LEAD COPY ═══════ */}
        <W bg="#fff" py={72}>
          <p className="text-center text-lg text-[#62625b]" style={{lineHeight: 2.2}}>
            スキルが見えないから、合わない人を提案してしまう。<br/>
            育成状況が分からないから、誰に何を任せられるか判断できない。<br/>
            TalentFlowは、この構造的な課題にテクノロジーで向き合います。
          </p>
        </W>

        {/* ═══════ CHALLENGES ═══════ */}
        <W bg={MORPHY.warmWash} py={72}>
          <div className="flex gap-10 items-start">
            <div className="flex-shrink-0" style={{width: 260}}>
              <SectionLabel text="CHALLENGES"/>
              <h2 className="text-xl font-bold text-[#211922] mb-3" style={{lineHeight: 1.4}}>業界が抱える<br/>3つの構造課題</h2>
              <p className="text-xs text-[#91918c]" style={{lineHeight: 1.9}}>多くの派遣会社が共通して直面する課題。TalentFlowはこれらを根本から解決します。</p>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { title: "スキルの見える化不足", desc: "属人的なスキル管理で、経験年数だけでは派遣先要件を満たせずミスマッチが頻発。", icon: <Users size={16} style={{color: MORPHY.red}}/> },
                { title: "育成プロセスの非効率", desc: "研修進捗がExcel等に分散。誰がどの研修を完了したかリアルタイムで把握できない。", icon: <GraduationCap size={16} style={{color: "#D97706"}}/> },
                { title: "配置のミスマッチ", desc: "スキルと要件の照合が手動で、提案に時間がかかり、適切なアサインが実現しない。", icon: <Target size={16} style={{color: "#7C3AED"}}/> },
              ].map((c, i) => (
                <div key={i} className="bg-white p-4 rounded-xl flex gap-3" style={{border: `1px solid ${MORPHY.cardBorder}`}}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: MORPHY.warmWash}}>{c.icon}</div>
                  <div><h3 className="text-sm font-bold text-[#211922] mb-0.5">{c.title}</h3><p className="text-xs text-[#91918c]" style={{lineHeight: 1.7}}>{c.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </W>

        {/* ═══════ SOLUTION — ジグザグ ═══════ */}
        <W bg="#fff" py={72}>
          <div className="text-center mb-12">
            <SectionLabel text="SOLUTION"/>
            <h2 className="text-2xl font-bold text-[#211922]" style={{letterSpacing: "-0.5px"}}>TalentFlowが実現すること</h2>
          </div>
          <div className="space-y-8">
            {[
              { icon: <BarChart3 size={22} className="text-white"/>, color: MORPHY.red, title: "スキルの完全可視化", desc: "全スタッフのスキル・資格・研修履歴をデータベース化。定量的なスキルマッチングで、経験や勘に頼らない人材提案を実現します。", reverse: false },
              { icon: <GraduationCap size={22} className="text-white"/>, color: "#D97706", title: "育成の自動化・計画化", desc: "研修受講→習得確認テスト→スキル認定のフローをシステム管理。育成計画のPDCAを自動で回し、進捗をリアルタイム共有。", reverse: true },
              { icon: <Sparkles size={22} className="text-white"/>, color: "#7C3AED", title: "AI活用の次世代マッチング", desc: "AIがスキルデータに基づく候補者提案を自動実行。派遣先企業はAIチャットで募集要件を対話的に整理できます。", reverse: false },
            ].map((v, i) => (
              <div key={i} className="flex items-center gap-8" style={{flexDirection: v.reverse ? "row-reverse" : "row"}}>
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center" style={{background: v.color}}>{v.icon}</div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#211922] mb-1.5">{v.title}</h3>
                  <p className="text-sm text-[#91918c]" style={{lineHeight: 1.8}}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </W>

        {/* ═══════ TRAINING FLOW ═══════ */}
        <W bg={MORPHY.plumBlack} py={72}>
          <div className="text-center mb-10">
            <SectionLabel text="TRAINING FLOW" color="rgba(255,255,255,0.3)"/>
            <h2 className="text-2xl font-bold text-white mb-3" style={{letterSpacing: "-0.5px"}}>研修からスキル認定まで、一気通貫</h2>
            <p className="text-sm" style={{color: "rgba(255,255,255,0.35)"}}>合格したスタッフは即座に配置候補に加わります</p>
          </div>
          <div className="flex gap-3">
            {[
              { title: "研修受講", desc: "集合研修・eラーニング\nOJT等を受講", color: "rgba(255,255,255,0.5)" },
              { title: "習得確認テスト", desc: "オンラインテストで\n理解度を確認", color: "#D97706" },
              { title: "スキルアセスメント", desc: "前提研修完了で\n自動開放・受験", color: MORPHY.red },
              { title: "スキル認定", desc: "合格で認定取得\n即座に提案候補へ", color: "#15803D" },
            ].map((s, i) => (
              <div key={i} className="flex-1 flex items-stretch">
                <div className="flex-1 p-4 rounded-xl" style={{background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)"}}>
                  <div className="w-2.5 h-2.5 rounded-full mb-3" style={{background: s.color}}/>
                  <h3 className="text-sm font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-xs whitespace-pre-line" style={{color: "rgba(255,255,255,0.35)", lineHeight: 1.7}}>{s.desc}</p>
                </div>
                {i < 3 && <div className="flex items-center px-1"><ChevronRight size={12} style={{color: "rgba(255,255,255,0.15)"}}/></div>}
              </div>
            ))}
          </div>
        </W>

        {/* ═══════ 4 ROLES ═══════ */}
        <W bg="#fff" py={72}>
          <div className="text-center mb-10">
            <SectionLabel text="4 ROLES"/>
            <h2 className="text-2xl font-bold text-[#211922]" style={{letterSpacing: "-0.5px"}}>すべてのステークホルダーを繋ぐ</h2>
          </div>
          <div className="grid grid-cols-2 tf-grid-2 gap-4">
            {[
              { role: "管理者", color: MORPHY.plumBlack, icon: <Settings size={16} className="text-white"/>,
                features: ["育成計画の策定・進捗管理", "スキル・職種マスタの一元管理", "研修マスタ管理", "就業状況のモニタリング"] },
              { role: "営業", color: MORPHY.red, icon: <Briefcase size={16} className="text-white"/>,
                features: ["スキルマッチによる候補者提案", "期限付きアセスメント受験依頼", "面談リクエストへのメール回答", "スタッフ就業状況・契約管理"] },
              { role: "派遣先企業", color: "#7C3AED", icon: <Building2 size={16} className="text-white"/>,
                features: ["AIチャットによる募集要件作成", "候補者のブラインド閲覧・検索", "面談リクエスト", "フィードバックの提供"] },
              { role: "スタッフ", color: "#15803D", icon: <User size={16} className="text-white"/>,
                features: ["やることリスト（自動集約）", "研修受講・習得確認テスト", "スキルアセスメント受験", "プロフィール・スキル管理"] },
            ].map((r, i) => (
              <div key={i} className="p-5 rounded-xl" style={{background: MORPHY.warmWash, border: `1px solid ${MORPHY.cardBorder}`}}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{background: r.color}}>{r.icon}</div>
                  <div className="text-sm font-bold text-[#211922]">{r.role}</div>
                </div>
                <div className="space-y-1.5">
                  {r.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2"><CheckCircle size={11} style={{color: r.color}}/><span className="text-xs text-[#62625b]">{f}</span></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </W>

        {/* ═══════ SECURITY ═══════ */}
        <W bg={MORPHY.warmWash} py={72}>
          <div className="flex gap-10 items-start">
            <div className="flex-shrink-0" style={{width: 260}}>
              <SectionLabel text="SECURITY"/>
              <h2 className="text-xl font-bold text-[#211922] mb-3" style={{lineHeight: 1.4}}>セキュリティ<br/>アーキテクチャ</h2>
              <p className="text-lg font-bold mb-3" style={{color: MORPHY.red, lineHeight: 1.5}}>AIエンジンに<br/>個人情報は一切<br/>到達しません。</p>
              <p className="text-xs text-[#91918c]" style={{lineHeight: 1.9}}>NECとの協業により、エンタープライズ水準のセキュリティ基盤で運用しています。</p>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { icon: <Shield size={16} style={{color: MORPHY.red}}/>, title: "個人情報マスキング", desc: "データ取込時に氏名・社員番号等を自動マスキング。AIプロンプトに個人情報は含まれません。" },
                { icon: <Lock size={16} style={{color: MORPHY.red}}/>, title: "組織権限連動フィルタ", desc: "操作者の所属・権限に基づき、AIへのインプットと参照範囲を自動フィルタリング。" },
                { icon: <Building2 size={16} style={{color: MORPHY.red}}/>, title: "NECエンタープライズ基盤", desc: "大企業のセキュリティ要件を満たすインフラ基盤。調達審査・情シス審査にも対応。" },
              ].map((s, i) => (
                <div key={i} className="bg-white p-4 rounded-xl flex gap-3" style={{border: `1px solid ${MORPHY.cardBorder}`}}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: `${MORPHY.red}08`}}>{s.icon}</div>
                  <div><h3 className="text-sm font-bold text-[#211922] mb-0.5">{s.title}</h3><p className="text-xs text-[#91918c]" style={{lineHeight: 1.7}}>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </W>

        {/* ═══════ IMPACT ═══════ */}
        <W bg="#fff" py={72}>
          <div className="text-center mb-10">
            <SectionLabel text="EXPECTED IMPACT"/>
            <h2 className="text-2xl font-bold text-[#211922]" style={{letterSpacing: "-0.5px"}}>導入による期待効果</h2>
          </div>
          <div className="flex justify-between">
            {[
              { num: "60%", label: "マッチング精度向上", color: MORPHY.red },
              { num: "40%", label: "育成期間短縮", color: "#D97706" },
              { num: "3x", label: "提案スピード", color: "#7C3AED" },
              { num: "80%", label: "管理工数削減", color: "#15803D" },
            ].map((imp, i) => (
              <div key={i} className="text-center flex-1">
                <div className="font-bold" style={{fontSize: 44, color: imp.color, letterSpacing: "-2px", lineHeight: 1}}>{imp.num}</div>
                <div className="text-xs text-[#91918c] mt-2">{imp.label}</div>
              </div>
            ))}
          </div>
        </W>

        {/* ═══════ CTA ═══════ */}
        <div className="text-center" style={{background: MORPHY.plumBlack, padding: "56px 32px"}}>
          <h2 className="text-xl font-bold text-white mb-3">まずはデモをご覧ください</h2>
          <p className="text-sm mb-6" style={{color: "rgba(255,255,255,0.4)"}}>4つのロールを実際に操作いただけます</p>
          <button onClick={() => navigate(role === "sales" ? "sales-dashboard" : role === "admin" ? "dashboard" : role === "customer" ? "jd-list" : "candidate-dashboard")} className="px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{background: MORPHY.red}}>ダッシュボードへ</button>
        </div>

        {/* ═══════ FOOTER ═══════ */}
        <div className="flex items-center justify-between px-8 py-5" style={{background: MORPHY.plumBlack, borderTop: "1px solid rgba(255,255,255,0.06)"}}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{background: MORPHY.red}}><Layers size={12} className="text-white"/></div>
            <span className="text-xs font-semibold text-white">TalentFlow</span>
          </div>
          <span className="text-xs" style={{color: "rgba(255,255,255,0.25)"}}>Confidential  |  2026</span>
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    switch (screen) {
      // Customer
      case "jd-create": return <JDCreateScreen/>;
      case "jd-detail": return <JDDetailScreen/>;
      case "jd-list": return <JDListScreen/>;
      case "candidate-list": return <CandidateListScreen/>;
      case "favorites": return <FavoritesListScreen/>;
      case "candidate-detail": return <CandidateDetailScreen/>;
      // Sales
      case "sales-dashboard": return <SalesDashboardScreen/>;
      case "available-candidates": return <AvailableCandidatesScreen/>;
      case "assignment-list": return <AssignmentListScreen/>;
      case "sales-jd-list": return <SalesJDListScreen/>;
      case "sales-jd-detail": return <SalesJDDetailScreen/>;
      case "search": return <SearchScreen/>;
      // Admin
      case "dashboard": return <DashboardScreen/>;
      case "plans": return <PlansScreen/>;
      case "plan-create": return <PlanCreateScreen/>;
      case "plan-detail": return <PlanDetailScreen/>;
      case "plan-add-member": return <PlanAddMemberScreen/>;
      case "job-categories": return <JobCategoriesScreen/>;
      case "job-category-detail": return <JobCategoryDetailScreen/>;
      case "skill-master": return <SkillMasterScreen/>;
      case "skill-master-detail": return <SkillMasterDetailScreen/>;
      case "assessment-gen": return <AssessmentGenScreen/>;
      case "training": return <TrainingScreen/>;
      case "training-detail": return <TrainingDetailScreen/>;
      case "training-master": return <TrainingMasterScreen/>;
      case "admin-resume": return <AdminResumeScreen/>;
      // Candidate (new)
      case "candidate-dashboard": return <CandidateDashboardScreen/>;
      case "candidate-notifications": return <CandidateNotificationsScreen/>;
      case "candidate-assessments": return <CandidateAssessmentsScreen/>;
      case "candidate-cases": return <CandidateCasesScreen/>;
      case "candidate-profile": return <CandidateProfileScreen/>;
      case "candidate-training": return <MyTrainingScreen/>;
      case "candidate-training-list": return <CandidateTrainingListScreen/>;
      case "candidate-resume": return <MyResumeScreen/>;
      case "candidate-assessment-take": return <CandidateAssessmentTakeScreen/>;
      // About
      case "about": return <AboutScreen/>;
      default: return role === "sales" ? <SalesDashboardScreen/> : role === "candidate" ? <CandidateDashboardScreen/> : role === "customer" ? <JDCreateScreen/> : <DashboardScreen/>;
    }
  };

  // ============================================================
  // LOGIN HANDLER
  // ============================================================
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError(null);
    if (!loginForm.email || !loginForm.password) {
      setLoginError("メールアドレスとパスワードを入力してください");
      return;
    }
    setLoginLoading(true);
    setTimeout(() => {
      const defaults = { admin: "dashboard", sales: "sales-dashboard", customer: "jd-list", candidate: "candidate-dashboard" };
      setRole(loginForm.role);
      setScreen(defaults[loginForm.role]);
      setScreenHistory([]);
      setIsLoggedIn(true);
      setLoginLoading(false);
    }, 800);
  };

  // Demo accounts for quick login
  const demoAccounts = [
    { role: "admin", label: "管理者", email: "admin@talentflow.co.jp", icon: <Settings size={18}/>, desc: "スタッフ管理・育成計画・マスタ管理", color: MORPHY.plumBlack },
    { role: "sales", label: "営業", email: "sales@talentflow.co.jp", icon: <Briefcase size={18}/>, desc: "募集対応・スタッフ提案・派遣先折衝", color: "#1d4ed8" },
    { role: "customer", label: "派遣先企業", email: "customer@example.com", icon: <Building2 size={18}/>, desc: "募集作成・候補者閲覧・面談リクエスト", color: "#7c3aed" },
    { role: "candidate", label: "スタッフ", email: "tanaka@talentflow.co.jp", icon: <User size={18}/>, desc: "プロフィール・研修・アセスメント", color: MORPHY.red },
  ];

  // ============================================================
  // LOGIN SCREEN
  // ============================================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex" style={{fontFamily: MORPHY.font, WebkitFontSmoothing: "antialiased"}}>
        <ResponsiveStyles/>
        {/* Left: Brand Panel */}
        <div className="hidden lg:flex w-[480px] flex-shrink-0 flex-col justify-between p-12" style={{background: `linear-gradient(135deg, ${MORPHY.plumBlack} 0%, #3d2b3e 100%)`}}>
          <div>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-10 h-10 flex items-center justify-center" style={{background: MORPHY.red, borderRadius: "12px"}}><Layers size={20} className="text-white"/></div>
              <span className="text-xl font-bold text-white tracking-tight">TalentFlow</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">人材の力を、<br/>最大限に引き出す。</h1>
            <p className="text-base leading-relaxed" style={{color: "rgba(255,255,255,0.6)"}}>人材派遣事業におけるスタッフ管理・育成・マッチングを一元化。管理者・営業・顧客・候補者がシームレスに連携するプラットフォームです。</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{background: "rgba(255,255,255,0.08)"}}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: "rgba(255,255,255,0.12)"}}><Target size={16} className="text-white"/></div>
              <div><p className="text-sm font-medium text-white">スキルベースマッチング</p><p className="text-xs" style={{color: "rgba(255,255,255,0.5)"}}>AIが最適な候補者を自動提案</p></div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{background: "rgba(255,255,255,0.08)"}}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: "rgba(255,255,255,0.12)"}}><GraduationCap size={16} className="text-white"/></div>
              <div><p className="text-sm font-medium text-white">育成プラン管理</p><p className="text-xs" style={{color: "rgba(255,255,255,0.5)"}}>研修・資格取得をトラッキング</p></div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{background: "rgba(255,255,255,0.08)"}}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: "rgba(255,255,255,0.12)"}}><Users size={16} className="text-white"/></div>
              <div><p className="text-sm font-medium text-white">マルチロール対応</p><p className="text-xs" style={{color: "rgba(255,255,255,0.5)"}}>4つのロールで業務をカバー</p></div>
            </div>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12" style={{background: MORPHY.bg}}>
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
              <div className="w-10 h-10 flex items-center justify-center" style={{background: MORPHY.red, borderRadius: "12px"}}><Layers size={20} className="text-white"/></div>
              <span className="text-xl font-bold tracking-tight" style={{color: MORPHY.plumBlack}}>TalentFlow</span>
            </div>

            <h2 className="text-2xl font-bold mb-1" style={{color: MORPHY.plumBlack}}>ログイン</h2>
            <p className="text-sm mb-8" style={{color: MORPHY.textMuted}}>アカウントにサインインしてください</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-xs font-medium text-[#62625b] mb-1.5 block">メールアドレス</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#91918c]"/>
                  <input type="email" placeholder="name@company.com" value={loginForm.email}
                    onChange={e => setLoginForm(prev => ({...prev, email: e.target.value}))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-[#e5e5e0] bg-white focus:outline-none focus:ring-2 focus:ring-[#e60023]/15 focus:border-[#c8c8c1] transition-all" style={{color: MORPHY.plumBlack}}/>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[#62625b] mb-1.5 block">パスワード</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#91918c]"/>
                  <input type="password" placeholder="••••••••" value={loginForm.password}
                    onChange={e => setLoginForm(prev => ({...prev, password: e.target.value}))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-[#e5e5e0] bg-white focus:outline-none focus:ring-2 focus:ring-[#e60023]/15 focus:border-[#c8c8c1] transition-all" style={{color: MORPHY.plumBlack}}/>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="text-xs font-medium text-[#62625b] mb-2 block">ログインするロール</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {demoAccounts.map(da => (
                    <button type="button" key={da.role} onClick={() => setLoginForm(prev => ({...prev, role: da.role, email: da.email, password: "demo1234"}))}
                      className={`p-3 rounded-xl text-left transition-all border-2 ${loginForm.role === da.role ? "shadow-sm" : "border-transparent hover:border-[#e5e5e0]"}`}
                      style={{
                        backgroundColor: loginForm.role === da.role ? `${da.color}08` : "white",
                        borderColor: loginForm.role === da.role ? da.color : undefined,
                      }}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{background: loginForm.role === da.role ? `${da.color}15` : "#f6f6f3", color: da.color}}>{da.icon}</div>
                        <span className="text-sm font-medium" style={{color: loginForm.role === da.role ? da.color : MORPHY.plumBlack}}>{da.label}</span>
                      </div>
                      <p className="text-[10px] leading-snug" style={{color: MORPHY.textMuted}}>{da.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2"><AlertCircle size={14}/>{loginError}</div>
              )}

              <button type="submit" disabled={loginLoading}
                className="w-full py-3 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                style={{background: MORPHY.red}}>
                {loginLoading ? <><RefreshCw size={16} className="animate-spin"/>ログイン中...</> : <><LogIn size={16}/>ログイン</>}
              </button>
            </form>

            <div className="mt-6 p-4 rounded-xl" style={{background: MORPHY.warmWash, border: `1px solid ${MORPHY.cardBorder}`}}>
              <p className="text-xs font-medium text-[#62625b] mb-1">デモモード</p>
              <p className="text-[11px] leading-relaxed" style={{color: MORPHY.textMuted}}>上のロールカードを選択すると、デモ用のメールアドレスとパスワードが自動入力されます。そのままログインボタンを押してお試しください。</p>
            </div>

            <div className="text-center mt-6">
              <button onClick={() => { setIsLoggedIn(true); setRole("admin"); setScreen("about"); }} className="text-xs font-medium hover:underline transition-colors" style={{color: MORPHY.red}}>
                <Sparkles size={12} className="inline mr-1" style={{verticalAlign: "-1px"}}/>本サービスについて
              </button>
            </div>
            <p className="text-center text-xs mt-3" style={{color: MORPHY.textMuted}}>© 2026 TalentFlow Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{background: MORPHY.bg, fontFamily: MORPHY.font, color: MORPHY.textPrimary, WebkitFontSmoothing: "antialiased"}}>
      <ResponsiveStyles/>
      <ToastContainer/>
      <SideNav/>
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Mobile header */}
        <div className="tf-mobile-header">
          <button onClick={() => setMobileMenuOpen(true)} className="p-1"><List size={22} className="text-white"/></button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center" style={{background: MORPHY.red, borderRadius: "8px"}}><Layers size={12} className="text-white"/></div>
            <span className="text-sm font-semibold text-white">TalentFlow</span>
          </div>
          <span className="text-xs ml-auto" style={{color: "rgba(255,255,255,0.5)"}}>{role === "sales" ? "営業" : role === "admin" ? "管理者" : role === "customer" ? "派遣先企業" : "スタッフ"}</span>
        </div>
        <div className="tf-main-padding p-8 max-w-6xl mx-auto w-full flex-1">
          <ErrorBoundary screenKey={screen}>
            {renderScreen()}
          </ErrorBoundary>
        </div>
      </div>

      {/* JD unsaved leave confirmation modal */}
      {jdLeaveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: "rgba(33,25,34,0.5)"}}>
          <div className="bg-white p-6 max-w-md w-full mx-4" style={{borderRadius: MORPHY.radius.lg, boxShadow: MORPHY.shadow.modal}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background: `${MORPHY.red}15`}}>
                <AlertCircle size={20} style={{color: MORPHY.red}}/>
              </div>
              <h3 className="text-base font-medium text-[#211922]">作成したJDを保存しますか？</h3>
            </div>
            <p className="text-sm text-[#62625b] mb-6">保存せずに画面を離れると、作成中のJDの内容が失われます。</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setJdLeaveConfirm(null)} className="px-4 py-2 rounded-lg text-sm font-medium border border-[#e5e5e0] bg-white hover:bg-[#f6f6f3] text-[#211922] transition-colors">キャンセル</button>
              <button onClick={discardJDAndLeave} className="px-4 py-2 rounded-lg text-sm font-medium border border-[#e5e5e0] bg-white hover:bg-[#f6f6f3] text-[#62625b] transition-colors">保存しない</button>
              <button onClick={saveJDAndLeave} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#e60023] text-white hover:bg-[#cc001f] transition-colors flex items-center gap-1.5"><CheckCircle size={14}/>保存する</button>
            </div>
          </div>
        </div>
      )}

      {/* JD leave name input modal (customer mode) */}
      {jdLeaveNameModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{background: "rgba(33,25,34,0.5)"}}>
          <div className="bg-white p-6 max-w-md w-full mx-4" style={{borderRadius: MORPHY.radius.lg, boxShadow: MORPHY.shadow.modal}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background: `${MORPHY.red}15`}}>
                <FileText size={20} style={{color: MORPHY.red}}/>
              </div>
              <h3 className="text-base font-medium text-[#211922]">JD名を入力してください</h3>
            </div>
            <p className="text-sm text-[#62625b] mb-4">保存するJDの名称を入力してください。</p>
            <input
              type="text"
              value={jdLeaveNameModal.name}
              onChange={e => setJdLeaveNameModal(prev => ({...prev, name: e.target.value}))}
              placeholder="例: 経理事務スタッフ募集"
              className="w-full px-3 py-2 rounded-lg border border-[#e5e5e0] text-sm mb-4 focus:outline-none focus:ring-2"
              style={{borderColor: MORPHY.cardBorder}}
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => { setJdLeaveNameModal(null); }} className="px-4 py-2 rounded-lg text-sm font-medium border border-[#e5e5e0] bg-white hover:bg-[#f6f6f3] text-[#62625b] transition-colors">キャンセル</button>
              <button
                onClick={() => { if (jdLeaveNameModal.name.trim()) doSaveJDAndLeave(jdLeaveNameModal.name.trim()); }}
                disabled={!jdLeaveNameModal.name.trim()}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-1.5 disabled:opacity-40"
                style={{background: MORPHY.red}}
              ><CheckCircle size={14}/>保存する</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}