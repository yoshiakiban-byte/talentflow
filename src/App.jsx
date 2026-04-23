import React, { useState, useMemo, useCallback } from "react";
import { Search, Users, Briefcase, Target, BookOpen, FileText, ChevronRight, ChevronDown, Star, TrendingUp, AlertCircle, CheckCircle, XCircle, Clock, Building2, MapPin, Monitor, Edit3, Plus, ArrowLeft, BarChart3, Settings, User, Home, List, MessageSquare, Sparkles, RefreshCw, Eye, Download, Filter, Zap, Award, GraduationCap, Calendar, Hash, ArrowUpRight, Shield, Layers, Brain, Send, Clipboard, X, Mail, Paperclip, Copy } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts";

// ============================================================
// DUMMY DATA - Comprehensive Japanese business data
// ============================================================

const CANDIDATES = [
  {
    id: "C-001", name: "田中 太郎", age: 32, gender: "男性", photo: "https://randomuser.me/api/portraits/men/32.jpg",
    skills: [
      { name: "AWS", level: 4, years: 5 }, { name: "Terraform", level: 3, years: 3 },
      { name: "Docker", level: 4, years: 4 }, { name: "Kubernetes", level: 3, years: 2 },
      { name: "Python", level: 3, years: 4 }, { name: "Linux", level: 4, years: 6 }
    ],
    totalYears: 8,
    careerHistory: [
      { period: "2022/04 - 現在", project: "大手EC基盤クラウド移行", role: "インフラリード", tech: ["AWS", "Terraform", "Docker", "Kubernetes"], detail: "オンプレミスからAWSへの全面移行を主導。マイクロサービス化とCI/CD構築を担当。", team: 8, phase: "設計・構築・運用" },
      { period: "2019/04 - 2022/03", project: "金融系システム基盤構築", role: "インフラエンジニア", tech: ["AWS", "Docker", "Ansible", "Linux"], detail: "ミッションクリティカルな金融システムのインフラ設計・構築。可用性99.99%を達成。", team: 5, phase: "設計・構築" },
      { period: "2017/04 - 2019/03", project: "社内システム運用保守", role: "運用エンジニア", tech: ["Linux", "Shell", "Zabbix"], detail: "社内基盤の運用保守・障害対応。自動化スクリプト開発。", team: 3, phase: "運用・保守" }
    ],
    certifications: ["AWS Solutions Architect Professional", "AWS DevOps Engineer Professional"],
    aspiration: "クラウドアーキテクトとして大規模システムの設計に携わりたい",
    wantToDo: "クラウドネイティブな設計、マイクロサービスアーキテクチャ",
    avoidToDo: "24時間オンコール体制、単純な運用監視のみの業務",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週3リモート希望",
    changeIntent: "良い案件があれば検討",
    unitPrice: 75,
    assignment: { project: "大手EC基盤クラウド移行", customer: "ABC商事", startDate: "2025/10/01", endDate: "2026/05/31" },
    assessments: { "AWS": 85, "インフラ設計": 80, "IaC": 75, "コンテナ": 78, "CI/CD": 72 },
    status: "配属済み"
  },
  {
    id: "C-002", name: "鈴木 花子", age: 27, gender: "女性", photo: "https://randomuser.me/api/portraits/women/44.jpg",
    skills: [
      { name: "Java", level: 3, years: 4 }, { name: "Spring Boot", level: 3, years: 3 },
      { name: "AWS", level: 2, years: 1 }, { name: "SQL", level: 3, years: 4 },
      { name: "React", level: 2, years: 1 }, { name: "Docker", level: 2, years: 1 }
    ],
    totalYears: 5,
    careerHistory: [
      { period: "2023/01 - 現在", project: "保険業務システムリプレース", role: "バックエンドエンジニア", tech: ["Java", "Spring Boot", "PostgreSQL", "AWS"], detail: "レガシーシステムからSpring Bootベースへの移行。API設計とDB設計を担当。", team: 6, phase: "設計・開発" },
      { period: "2021/04 - 2022/12", project: "ECサイト開発", role: "開発メンバー", tech: ["Java", "Spring Boot", "MySQL", "React"], detail: "ECサイトのバックエンド開発。注文管理・在庫管理機能を実装。", team: 4, phase: "開発・テスト" }
    ],
    certifications: ["AWS Solutions Architect Associate", "Java Silver"],
    aspiration: "フルスタックエンジニアを目指し、フロントエンドとクラウドの知見を広げたい",
    wantToDo: "新規開発、モダンな技術スタックでの開発",
    avoidToDo: "レガシーシステムの保守のみ",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "フルリモート希望",
    changeIntent: "積極的に検討中",
    unitPrice: 55,
    assessments: { "Java": 72, "Spring Boot": 70, "AWS": 45, "SQL": 68, "フロントエンド": 40 },
    status: "育成対象"
  },
  {
    id: "C-003", name: "山田 健一", age: 35, gender: "男性", photo: "https://randomuser.me/api/portraits/men/45.jpg",
    skills: [
      { name: "AWS", level: 4, years: 6 }, { name: "Azure", level: 3, years: 3 },
      { name: "Python", level: 4, years: 7 }, { name: "Terraform", level: 4, years: 4 },
      { name: "Kubernetes", level: 4, years: 3 }, { name: "Go", level: 2, years: 1 }
    ],
    totalYears: 10,
    careerHistory: [
      { period: "2021/01 - 現在", project: "マルチクラウド基盤設計", role: "クラウドアーキテクト", tech: ["AWS", "Azure", "Terraform", "Kubernetes"], detail: "大手製造業のマルチクラウド戦略策定と基盤設計。コスト最適化で年間30%削減を実現。", team: 12, phase: "要件定義・設計" },
      { period: "2018/01 - 2020/12", project: "SaaS基盤構築", role: "SRE", tech: ["AWS", "Kubernetes", "Python", "Prometheus"], detail: "SaaSプロダクトの信頼性エンジニアリング。SLO策定とオブザーバビリティ基盤構築。", team: 8, phase: "設計・構築・運用" },
      { period: "2015/04 - 2017/12", project: "Webサービス開発", role: "サーバーサイドエンジニア", tech: ["Python", "Django", "AWS", "MySQL"], detail: "BtoCサービスのバックエンド開発。日次100万PVのシステムを担当。", team: 6, phase: "開発・運用" }
    ],
    certifications: ["AWS Solutions Architect Professional", "CKA", "Azure Solutions Architect Expert"],
    aspiration: "技術顧問・CTOレベルでの技術戦略立案",
    wantToDo: "アーキテクチャ設計、技術選定、チームリード",
    avoidToDo: "客先常駐（フルタイム）、週5出社必須の案件",
    location: "東京都",
    remoteOk: true, onsiteOk: false,
    workCondition: "フルリモート必須、週1出社まで",
    changeIntent: "条件次第で検討",
    unitPrice: 95,
    assignment: { project: "マルチクラウド基盤設計", customer: "XYZ製造", startDate: "2025/07/01", endDate: "2026/06/30" },
    assessments: { "AWS": 92, "マルチクラウド": 85, "IaC": 88, "コンテナ": 82, "アーキテクチャ設計": 90 },
    status: "配属済み"
  },
  {
    id: "C-004", name: "佐藤 美咲", age: 24, gender: "女性", photo: "https://randomuser.me/api/portraits/women/17.jpg",
    skills: [
      { name: "Python", level: 2, years: 2 }, { name: "AWS", level: 1, years: 0.5 },
      { name: "Linux", level: 2, years: 2 }, { name: "SQL", level: 2, years: 2 },
      { name: "Shell", level: 2, years: 1 }, { name: "Docker", level: 1, years: 0.5 }
    ],
    totalYears: 2,
    careerHistory: [
      { period: "2024/04 - 現在", project: "社内インフラ運用", role: "運用メンバー", tech: ["Linux", "Shell", "AWS", "Zabbix"], detail: "社内サーバーの運用監視・障害対応。AWS環境の基本的な操作を習得中。", team: 4, phase: "運用" }
    ],
    certifications: ["AWS Cloud Practitioner", "LPIC-1"],
    aspiration: "インフラエンジニアとしてクラウド設計ができるようになりたい",
    wantToDo: "AWS環境の設計・構築、IaCの習得",
    avoidToDo: "なし（幅広く経験したい）",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "特に制限なし",
    unitPrice: 45,
    changeIntent: "積極的に検討中",
    assessments: { "AWS": 30, "Linux": 45, "インフラ設計": 20, "IaC": 15, "スクリプティング": 35 },
    status: "育成対象"
  },
  {
    id: "C-005", name: "中村 大輔", age: 38, gender: "男性", photo: "https://randomuser.me/api/portraits/men/67.jpg",
    skills: [
      { name: "PM", level: 4, years: 8 }, { name: "Java", level: 3, years: 10 },
      { name: "AWS", level: 2, years: 2 }, { name: "Agile", level: 4, years: 5 },
      { name: "SQL", level: 3, years: 8 }, { name: "要件定義", level: 4, years: 6 }
    ],
    totalYears: 14,
    careerHistory: [
      { period: "2020/01 - 現在", project: "DX推進PMO", role: "プロジェクトマネージャー", tech: ["Java", "AWS", "Agile", "JIRA"], detail: "大手流通企業のDX推進プログラムのPM。6チーム30名体制を管理。", team: 30, phase: "全工程" },
      { period: "2016/01 - 2019/12", project: "基幹系システム刷新", role: "サブPM", tech: ["Java", "Oracle", "Spring"], detail: "基幹系システムの大規模リプレースプロジェクト。要件定義からリリースまで一貫して従事。", team: 20, phase: "全工程" },
      { period: "2012/04 - 2015/12", project: "業務システム開発", role: "開発リーダー", tech: ["Java", "Spring", "MySQL"], detail: "複数の業務システム開発でチームリードを担当。", team: 8, phase: "設計・開発・テスト" }
    ],
    certifications: ["PMP", "AWS Cloud Practitioner", "情報処理安全確保支援士"],
    aspiration: "PMとしてDX案件を推進し、技術戦略にも関わりたい",
    wantToDo: "DX推進、アジャイル開発のPM、新規事業立ち上げ",
    avoidToDo: "保守運用のみの案件、技術的チャレンジのない案件",
    location: "神奈川県",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2出社可能",
    changeIntent: "良い案件があれば検討",
    unitPrice: 90,
    assignment: { project: "DX推進プロジェクト", customer: "DEF銀行", startDate: "2025/06/01", endDate: "2026/05/15" },
    assessments: { "PM": 88, "要件定義": 82, "Agile": 80, "AWS": 40, "リーダーシップ": 85 },
    status: "配属済み"
  },
  {
    id: "C-006", name: "高橋 翔太", age: 29, gender: "男性", photo: "https://randomuser.me/api/portraits/men/22.jpg",
    skills: [
      { name: "React", level: 4, years: 4 }, { name: "TypeScript", level: 4, years: 4 },
      { name: "Node.js", level: 3, years: 3 }, { name: "AWS", level: 2, years: 1 },
      { name: "GraphQL", level: 3, years: 2 }, { name: "Next.js", level: 3, years: 2 }
    ],
    totalYears: 6,
    careerHistory: [
      { period: "2022/01 - 現在", project: "SaaSプロダクト開発", role: "フロントエンドリード", tech: ["React", "TypeScript", "Next.js", "GraphQL"], detail: "BtoB SaaSのフロントエンド開発をリード。デザインシステム構築とパフォーマンス改善を主導。", team: 5, phase: "設計・開発" },
      { period: "2020/04 - 2021/12", project: "マーケティングプラットフォーム", role: "フロントエンドエンジニア", tech: ["React", "TypeScript", "Node.js", "AWS"], detail: "データ分析ダッシュボードの開発。リアルタイムデータの可視化を実装。", team: 4, phase: "開発" }
    ],
    certifications: [],
    aspiration: "フロントエンド領域のスペシャリストからテックリードへ",
    wantToDo: "モダンフロントエンド開発、UI/UX設計、技術的意思決定",
    avoidToDo: "インフラ運用メイン、レガシー環境での開発",
    location: "東京都",
    remoteOk: true, onsiteOk: false,
    workCondition: "フルリモート必須",
    changeIntent: "現在の案件に満足",
    unitPrice: 70,
    assignment: { project: "SaaS管理画面リニューアル", customer: "GHIテクノロジー", startDate: "2025/09/01", endDate: "2026/08/31" },
    assessments: { "React": 85, "TypeScript": 82, "UI設計": 78, "パフォーマンス": 75, "テスト": 70 },
    status: "配属済み"
  },
  {
    id: "C-007", name: "伊藤 さくら", age: 26, gender: "女性", photo: "https://randomuser.me/api/portraits/women/63.jpg",
    skills: [
      { name: "AWS", level: 2, years: 2 }, { name: "Python", level: 3, years: 3 },
      { name: "Linux", level: 3, years: 3 }, { name: "Ansible", level: 2, years: 1 },
      { name: "Docker", level: 2, years: 1 }, { name: "Terraform", level: 1, years: 0.5 }
    ],
    totalYears: 3,
    careerHistory: [
      { period: "2023/04 - 現在", project: "クラウド移行支援", role: "インフラエンジニア", tech: ["AWS", "Python", "Ansible", "Linux"], detail: "中規模企業のAWSクラウド移行を支援。サーバー30台のマイグレーションを完遂。", team: 4, phase: "設計・構築" },
      { period: "2022/04 - 2023/03", project: "開発環境構築", role: "ジュニアエンジニア", tech: ["Linux", "Docker", "Python"], detail: "開発チーム向けのDocker環境構築と自動化スクリプト開発。", team: 3, phase: "構築" }
    ],
    certifications: ["AWS Solutions Architect Associate", "LPIC-2"],
    aspiration: "クラウドエンジニアとしてIaCやコンテナ技術を極めたい",
    wantToDo: "Terraform/Kubernetes環境の設計構築、SRE",
    avoidToDo: "完全なレガシー環境での作業",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2リモート希望",
    changeIntent: "積極的に検討中",
    unitPrice: 50,
    assessments: { "AWS": 55, "Linux": 62, "IaC": 30, "コンテナ": 35, "自動化": 50 },
    status: "育成対象"
  },
  {
    id: "C-008", name: "渡辺 拓也", age: 42, gender: "男性", photo: "https://randomuser.me/api/portraits/men/75.jpg",
    skills: [
      { name: "Java", level: 5, years: 15 }, { name: "Oracle", level: 4, years: 12 },
      { name: "Spring", level: 4, years: 8 }, { name: "PM", level: 3, years: 5 },
      { name: "要件定義", level: 4, years: 8 }, { name: "AWS", level: 1, years: 0.5 }
    ],
    totalYears: 18,
    careerHistory: [
      { period: "2019/01 - 現在", project: "公共系大規模開発", role: "アーキテクト/PM", tech: ["Java", "Spring", "Oracle", "Linux"], detail: "自治体向け大規模システムのアーキテクトとPMを兼務。100名体制のプロジェクト。", team: 100, phase: "全工程" },
      { period: "2014/01 - 2018/12", project: "金融系システム開発", role: "テックリード", tech: ["Java", "Spring", "Oracle"], detail: "銀行向けシステムの技術リード。品質基準の策定と技術課題の解決を担当。", team: 30, phase: "設計・開発・テスト" }
    ],
    certifications: ["情報処理安全確保支援士", "データベーススペシャリスト", "PMP"],
    aspiration: "これまでの経験を活かしつつ新技術への対応力も高めたい",
    wantToDo: "大規模プロジェクトのアーキテクチャ設計、PMO",
    avoidToDo: "完全リモートの案件（対面でのコミュニケーションを重視）",
    location: "東京都",
    remoteOk: false, onsiteOk: true,
    workCondition: "出社必須でOK、リモート不要",
    changeIntent: "良い案件があれば検討",
    unitPrice: 100,
    assignment: { project: "基幹システム刷新", customer: "JKL保険", startDate: "2024/10/01", endDate: "2026/04/30" },
    assessments: { "Java": 95, "アーキテクチャ設計": 88, "PM": 82, "Oracle": 90, "AWS": 15 },
    status: "配属済み"
  },
  {
    id: "C-009", name: "小林 優子", age: 30, gender: "女性", photo: "https://randomuser.me/api/portraits/women/28.jpg",
    skills: [
      { name: "AWS", level: 3, years: 3 }, { name: "GCP", level: 2, years: 1 },
      { name: "Python", level: 3, years: 4 }, { name: "機械学習", level: 3, years: 3 },
      { name: "SQL", level: 3, years: 4 }, { name: "Docker", level: 2, years: 2 }
    ],
    totalYears: 6,
    careerHistory: [
      { period: "2022/04 - 現在", project: "AI/ML基盤構築", role: "MLエンジニア", tech: ["Python", "AWS SageMaker", "Docker", "SQL"], detail: "推薦システムのML基盤設計・構築。モデルのデプロイパイプラインを構築。", team: 5, phase: "設計・開発・運用" },
      { period: "2020/04 - 2022/03", project: "データ分析基盤", role: "データエンジニア", tech: ["Python", "AWS", "SQL", "Airflow"], detail: "全社データ基盤の設計・構築。ETLパイプラインとデータマートの構築を担当。", team: 4, phase: "設計・構築" }
    ],
    certifications: ["AWS Machine Learning Specialty", "AWS Solutions Architect Associate", "G検定"],
    aspiration: "MLエンジニアリングとクラウドの両軸で専門性を高めたい",
    wantToDo: "ML基盤の設計、データエンジニアリング、MLOps",
    avoidToDo: "純粋なインフラ運用のみ",
    location: "大阪府",
    remoteOk: true, onsiteOk: false,
    workCondition: "フルリモート必須（大阪在住のため）",
    changeIntent: "積極的に検討中",
    unitPrice: 65,
    assessments: { "AWS": 68, "Python": 72, "機械学習": 75, "データ基盤": 70, "MLOps": 60 },
    status: "候補"
  },
  {
    id: "C-010", name: "松本 健太", age: 28, gender: "男性", photo: "https://randomuser.me/api/portraits/men/36.jpg",
    skills: [
      { name: "AWS", level: 2, years: 2 }, { name: "Linux", level: 3, years: 4 },
      { name: "ネットワーク", level: 3, years: 4 }, { name: "セキュリティ", level: 2, years: 2 },
      { name: "Python", level: 2, years: 2 }, { name: "VMware", level: 3, years: 3 }
    ],
    totalYears: 5,
    careerHistory: [
      { period: "2023/01 - 現在", project: "ハイブリッドクラウド構築", role: "ネットワークエンジニア", tech: ["AWS", "VMware", "Cisco", "Linux"], detail: "オンプレミスとAWSのハイブリッド環境のネットワーク設計・構築。", team: 6, phase: "設計・構築" },
      { period: "2021/04 - 2022/12", project: "社内ネットワーク刷新", role: "ネットワークエンジニア", tech: ["Cisco", "Linux", "Zabbix", "Python"], detail: "全拠点のネットワーク機器リプレースとセキュリティ強化。", team: 4, phase: "設計・構築・運用" }
    ],
    certifications: ["AWS Solutions Architect Associate", "CCNP", "LPIC-2"],
    aspiration: "ネットワークの知見を活かしてクラウドセキュリティ分野に進みたい",
    wantToDo: "クラウドセキュリティ設計、ゼロトラスト導入",
    avoidToDo: "単純なNW運用監視のみ",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2出社可能",
    changeIntent: "良い案件があれば検討",
    unitPrice: 55,
    assessments: { "AWS": 48, "ネットワーク": 72, "セキュリティ": 50, "Linux": 60, "クラウド設計": 35 },
    status: "候補"
  },
  {
    id: "C-011", name: "藤田 雄大", age: 31, gender: "男性", photo: "https://randomuser.me/api/portraits/men/41.jpg",
    skills: [
      { name: "AWS", level: 4, years: 5 }, { name: "GCP", level: 3, years: 2 },
      { name: "Terraform", level: 4, years: 4 }, { name: "Ansible", level: 3, years: 3 },
      { name: "Python", level: 3, years: 4 }, { name: "Docker", level: 4, years: 4 }
    ],
    totalYears: 8,
    careerHistory: [
      { period: "2023/01 - 2026/03", project: "FinTech基盤クラウド化", role: "SRE", tech: ["AWS", "Terraform", "Docker", "Python"], detail: "FinTechサービスのインフラ設計・SRE業務。SLO策定とオブザーバビリティ導入。", team: 7, phase: "設計・構築・運用" },
      { period: "2020/04 - 2022/12", project: "ECプラットフォーム構築", role: "インフラエンジニア", tech: ["AWS", "Docker", "Ansible", "Linux"], detail: "大規模ECサイトのAWSインフラ設計・構築。ピーク時トラフィック対応。", team: 5, phase: "設計・構築" }
    ],
    certifications: ["AWS Solutions Architect Professional", "Google Cloud Professional Cloud Architect"],
    aspiration: "マルチクラウド環境のアーキテクチャ設計を専門にしたい",
    wantToDo: "クラウドアーキテクチャ、IaC推進、コスト最適化",
    avoidToDo: "オンプレのみの案件",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2出社可能",
    changeIntent: "積極的に検討中",
    unitPrice: 80,
    assessments: { "AWS": 88, "GCP": 72, "IaC": 85, "コンテナ": 80, "SRE": 78 },
    status: "提案可能"
  },
  {
    id: "C-012", name: "西村 あかり", age: 28, gender: "女性", photo: "https://randomuser.me/api/portraits/women/51.jpg",
    skills: [
      { name: "React", level: 4, years: 4 }, { name: "TypeScript", level: 4, years: 4 },
      { name: "Next.js", level: 3, years: 2 }, { name: "Node.js", level: 3, years: 3 },
      { name: "AWS", level: 2, years: 1 }, { name: "Figma", level: 3, years: 3 }
    ],
    totalYears: 6,
    careerHistory: [
      { period: "2022/04 - 2026/02", project: "BtoB SaaS開発", role: "フロントエンドリード", tech: ["React", "TypeScript", "Next.js", "Figma"], detail: "BtoB SaaSプロダクトのフロントエンド開発。デザインシステム構築とパフォーマンス改善。", team: 8, phase: "設計・開発" },
      { period: "2020/04 - 2022/03", project: "メディアサイトリニューアル", role: "フロントエンドエンジニア", tech: ["React", "TypeScript", "GraphQL"], detail: "メディアサイトのSPA化とCMS連携。Core Web Vitals改善。", team: 4, phase: "開発・テスト" }
    ],
    certifications: ["AWS Cloud Practitioner"],
    aspiration: "フロントエンドアーキテクトとしてプロダクト開発を牽引したい",
    wantToDo: "React/Next.js開発、デザインシステム構築、UI/UX改善",
    avoidToDo: "バックエンドのみの案件",
    location: "東京都",
    remoteOk: true, onsiteOk: false,
    workCondition: "フルリモート希望",
    changeIntent: "積極的に検討中",
    unitPrice: 70,
    assessments: { "React": 88, "TypeScript": 85, "Next.js": 75, "UI設計": 80, "パフォーマンス": 78 },
    status: "提案可能"
  },
  {
    id: "C-013", name: "木村 隆志", age: 40, gender: "男性", photo: "https://randomuser.me/api/portraits/men/55.jpg",
    skills: [
      { name: "PM", level: 5, years: 12 }, { name: "AWS", level: 3, years: 4 },
      { name: "Agile", level: 4, years: 6 }, { name: "要件定義", level: 5, years: 10 },
      { name: "データ分析", level: 3, years: 3 }, { name: "Python", level: 2, years: 2 }
    ],
    totalYears: 15,
    careerHistory: [
      { period: "2021/01 - 2026/03", project: "金融DX推進プログラム", role: "プログラムマネージャー", tech: ["AWS", "Agile", "JIRA", "Tableau"], detail: "メガバンクのDX推進プログラム全体管理。5チーム・40名規模をマネジメント。", team: 40, phase: "企画・要件定義・管理" },
      { period: "2016/04 - 2020/12", project: "保険業務システム刷新", role: "PM", tech: ["Java", "Oracle", "AWS"], detail: "基幹系システム刷新の全工程PM。予算15億円規模。", team: 25, phase: "全工程" }
    ],
    certifications: ["PMP", "AWS Solutions Architect Associate", "IPA プロジェクトマネージャ"],
    aspiration: "DX推進やデジタル戦略の上流工程で力を発揮したい",
    wantToDo: "DX戦略策定、大規模プロジェクトPMO、組織変革",
    avoidToDo: "小規模な保守案件、コーディング主体の業務",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週3出社可能",
    changeIntent: "良い案件があれば検討",
    unitPrice: 120,
    assessments: { "PM": 95, "要件定義": 90, "Agile": 82, "DX推進": 85, "リーダーシップ": 92 },
    status: "提案可能"
  },
  {
    id: "C-014", name: "吉田 真由", age: 26, gender: "女性", photo: "https://randomuser.me/api/portraits/women/33.jpg",
    skills: [
      { name: "Python", level: 3, years: 3 }, { name: "AWS", level: 3, years: 2 },
      { name: "Docker", level: 3, years: 2 }, { name: "Kubernetes", level: 2, years: 1 },
      { name: "Go", level: 2, years: 1 }, { name: "Linux", level: 3, years: 3 }
    ],
    totalYears: 4,
    careerHistory: [
      { period: "2023/04 - 2026/03", project: "IoTデータ基盤構築", role: "インフラエンジニア", tech: ["AWS", "Docker", "Kubernetes", "Python"], detail: "IoTデバイスからのデータ収集基盤をAWS上に構築。リアルタイム処理パイプライン。", team: 5, phase: "設計・構築" },
      { period: "2022/04 - 2023/03", project: "社内ツール開発", role: "開発エンジニア", tech: ["Python", "Go", "Docker", "Linux"], detail: "社内業務効率化ツールの設計・開発。CI/CDパイプライン構築も担当。", team: 3, phase: "開発・運用" }
    ],
    certifications: ["AWS Solutions Architect Associate", "CKA"],
    aspiration: "クラウドネイティブなインフラエンジニアとして成長したい",
    wantToDo: "Kubernetes運用、クラウドネイティブ開発、DevOps",
    avoidToDo: "レガシーインフラの運用のみ",
    location: "大阪府",
    remoteOk: true, onsiteOk: false,
    workCondition: "フルリモート必須（大阪在住）",
    changeIntent: "積極的に検討中",
    unitPrice: 60,
    assessments: { "AWS": 72, "コンテナ": 68, "Python": 70, "Linux": 72, "CI/CD": 65 },
    status: "提案可能"
  },
  {
    id: "C-015", name: "斎藤 翼", age: 33, gender: "男性", photo: "https://randomuser.me/api/portraits/men/18.jpg",
    skills: [
      { name: "Java", level: 4, years: 8 }, { name: "Spring Boot", level: 4, years: 6 },
      { name: "AWS", level: 3, years: 3 }, { name: "PostgreSQL", level: 4, years: 7 },
      { name: "Kafka", level: 3, years: 2 }, { name: "Docker", level: 3, years: 3 }
    ],
    totalYears: 10,
    careerHistory: [
      { period: "2022/01 - 2026/02", project: "決済システムリアーキテクチャ", role: "テックリード", tech: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "AWS"], detail: "モノリスからマイクロサービスへの移行を技術リードとして主導。決済処理の信頼性向上。", team: 10, phase: "設計・開発・テスト" },
      { period: "2018/04 - 2021/12", project: "在庫管理システム開発", role: "バックエンドエンジニア", tech: ["Java", "Spring Boot", "MySQL", "Docker"], detail: "リアルタイム在庫管理のバックエンド設計・開発。高トランザクション処理最適化。", team: 6, phase: "設計・開発" }
    ],
    certifications: ["AWS Solutions Architect Associate", "Java Gold", "Oracle Master Gold"],
    aspiration: "バックエンドアーキテクトとして分散システムの設計を極めたい",
    wantToDo: "マイクロサービス設計、イベント駆動アーキテクチャ、技術選定",
    avoidToDo: "フロントエンドのみ、単純なCRUD開発",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週2出社可能",
    changeIntent: "良い案件があれば検討",
    unitPrice: 85,
    assessments: { "Java": 90, "Spring Boot": 88, "分散システム": 80, "DB設計": 85, "AWS": 72 },
    status: "提案可能"
  },
  {
    id: "C-016", name: "上田 美穂", age: 29, gender: "女性", photo: "https://randomuser.me/api/portraits/women/72.jpg",
    skills: [
      { name: "Python", level: 4, years: 5 }, { name: "機械学習", level: 3, years: 3 },
      { name: "AWS", level: 3, years: 3 }, { name: "SQL", level: 4, years: 5 },
      { name: "Tableau", level: 3, years: 2 }, { name: "Spark", level: 2, years: 1 }
    ],
    totalYears: 7,
    careerHistory: [
      { period: "2022/06 - 2026/03", project: "需要予測AIシステム", role: "データサイエンティスト", tech: ["Python", "AWS SageMaker", "SQL", "Tableau"], detail: "小売業の需要予測モデル開発・運用。予測精度を従来比20%向上。", team: 5, phase: "分析・開発・運用" },
      { period: "2019/04 - 2022/05", project: "マーケティング分析基盤", role: "データアナリスト", tech: ["Python", "SQL", "Tableau", "BigQuery"], detail: "マーケティングデータの分析基盤構築とダッシュボード開発。", team: 4, phase: "分析・開発" }
    ],
    certifications: ["AWS Machine Learning Specialty", "統計検定2級", "G検定"],
    aspiration: "MLエンジニアリングとデータ基盤の両方をカバーできる人材になりたい",
    wantToDo: "ML基盤構築、データパイプライン設計、AI活用コンサルティング",
    avoidToDo: "定型レポート作成のみの業務",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週1出社可能",
    changeIntent: "積極的に検討中",
    unitPrice: 75,
    assessments: { "Python": 85, "機械学習": 78, "AWS": 70, "SQL": 82, "データ分析": 88 },
    status: "提案可能"
  },
  {
    id: "C-017", name: "岡本 拓海", age: 35, gender: "男性", photo: "https://randomuser.me/api/portraits/men/61.jpg",
    skills: [
      { name: "AWS", level: 4, years: 6 }, { name: "セキュリティ", level: 4, years: 5 },
      { name: "Linux", level: 4, years: 8 }, { name: "Python", level: 3, years: 4 },
      { name: "Terraform", level: 3, years: 3 }, { name: "ネットワーク", level: 3, years: 5 }
    ],
    totalYears: 12,
    careerHistory: [
      { period: "2021/07 - 2026/03", project: "ゼロトラストセキュリティ導入", role: "セキュリティアーキテクト", tech: ["AWS", "Okta", "CrowdStrike", "Terraform"], detail: "大手企業のゼロトラスト導入プロジェクト。設計からPoC、全社展開まで主導。", team: 8, phase: "企画・設計・構築" },
      { period: "2017/04 - 2021/06", project: "クラウドセキュリティ監査", role: "セキュリティエンジニア", tech: ["AWS", "Azure", "Python", "Linux"], detail: "クラウド環境のセキュリティ評価・監査。セキュリティポリシー策定。", team: 4, phase: "評価・改善" }
    ],
    certifications: ["AWS Security Specialty", "CISSP", "情報処理安全確保支援士"],
    aspiration: "クラウドセキュリティの第一人者として組織のセキュリティ戦略を主導したい",
    wantToDo: "ゼロトラスト設計、クラウドセキュリティ戦略、CSIRT構築支援",
    avoidToDo: "セキュリティ監視オペレーションのみ",
    location: "東京都",
    remoteOk: true, onsiteOk: true,
    workCondition: "週3出社可能",
    changeIntent: "良い案件があれば検討",
    unitPrice: 95,
    assessments: { "AWS": 82, "セキュリティ": 92, "ゼロトラスト": 88, "Linux": 78, "IaC": 72 },
    status: "提案可能"
  },
  {
    id: "C-018", name: "長谷川 瞳", age: 27, gender: "女性", photo: "https://randomuser.me/api/portraits/women/19.jpg",
    skills: [
      { name: "Flutter", level: 4, years: 3 }, { name: "Swift", level: 3, years: 3 },
      { name: "Kotlin", level: 3, years: 2 }, { name: "Firebase", level: 3, years: 3 },
      { name: "React", level: 2, years: 1 }, { name: "TypeScript", level: 2, years: 1 }
    ],
    totalYears: 5,
    careerHistory: [
      { period: "2023/01 - 2026/03", project: "ヘルスケアアプリ開発", role: "モバイルリード", tech: ["Flutter", "Firebase", "Swift", "Kotlin"], detail: "ヘルスケアアプリのクロスプラットフォーム開発リード。MAU 50万超のプロダクト。", team: 6, phase: "設計・開発・運用" },
      { period: "2021/04 - 2022/12", project: "配送管理アプリ開発", role: "モバイルエンジニア", tech: ["Flutter", "Firebase", "Google Maps API"], detail: "配送ドライバー向けアプリの開発。リアルタイム位置追跡と最適ルート表示。", team: 4, phase: "開発・テスト" }
    ],
    certifications: ["Google Associate Android Developer"],
    aspiration: "モバイルアーキテクトとしてクロスプラットフォーム開発を専門にしたい",
    wantToDo: "Flutter開発、モバイルアーキテクチャ設計、UX改善",
    avoidToDo: "Webバックエンドのみの案件",
    location: "福岡県",
    remoteOk: true, onsiteOk: false,
    workCondition: "フルリモート必須（福岡在住）",
    changeIntent: "積極的に検討中",
    unitPrice: 65,
    assessments: { "Flutter": 88, "Swift": 75, "Kotlin": 72, "Firebase": 78, "UI/UX": 80 },
    status: "提案可能"
  }
];

const COMPANIES = [
  { id: "CO-001", name: "株式会社ABC商事", industry: "総合商社", size: "5000名以上", culture: ["挑戦重視", "グローバル", "成果主義"], techStack: ["AWS", "Terraform", "Docker"], workStyle: "週2リモート可", location: "東京（大手町）", keywords: ["大規模", "セキュリティ", "金融"] },
  { id: "CO-002", name: "大和物流株式会社", industry: "物流", size: "3000名以上", culture: ["チームワーク", "改善文化", "DX推進"], techStack: ["AWS", "Agile", "データ分析"], workStyle: "週3リモート可", location: "東京（品川）", keywords: ["DX", "PM", "アジャイル"] },
  { id: "CO-003", name: "テックイノベーション株式会社", industry: "IT/SaaS", size: "300名", culture: ["技術志向", "フラット", "リモートファースト"], techStack: ["Python", "AWS", "Kubernetes", "React"], workStyle: "フルリモート可", location: "東京（渋谷）", keywords: ["AI", "ML", "スタートアップ"] },
  { id: "CO-004", name: "みらい銀行", industry: "金融", size: "8000名以上", culture: ["安定志向", "コンプライアンス重視", "堅実"], techStack: ["AWS", "Azure", "セキュリティ", "Java"], workStyle: "週1リモート可", location: "東京（丸の内）", keywords: ["金融", "セキュリティ", "ゼロトラスト"] },
  { id: "CO-005", name: "ヘルステック株式会社", industry: "ヘルスケア/IT", size: "150名", culture: ["社会貢献", "技術志向", "フラット"], techStack: ["Flutter", "Firebase", "React", "AWS"], workStyle: "フルリモート可", location: "東京（六本木）", keywords: ["モバイル", "ヘルスケア", "スタートアップ"] },
  { id: "CO-006", name: "グローバルメーカー株式会社", industry: "製造業", size: "10000名以上", culture: ["品質重視", "グローバル", "技術継承"], techStack: ["Azure", "IoT", "Python", "データ基盤"], workStyle: "週2出社", location: "名古屋", keywords: ["IoT", "製造", "データ分析"] },
  { id: "CO-007", name: "NEXTリテール株式会社", industry: "小売/EC", size: "1200名", culture: ["スピード重視", "顧客第一", "データドリブン"], techStack: ["AWS", "Java", "React", "Kafka"], workStyle: "週2リモート可", location: "東京（恵比寿）", keywords: ["EC", "マイクロサービス", "データ"] }
];

const DEALS = [
  {
    id: "SF-2026-001", name: "クラウド基盤構築支援", customer: "株式会社ABC商事", type: "インフラエンジニア", headcount: 3, startDate: "2026/07", status: "提案中", priority: "高", sales: "木村 拓哉", summary: "大手商社のオンプレミスからAWSへの全面移行プロジェクト。3名体制で設計から構築まで。",
    detail: { overview: "ABC商事の基幹システム（約50サーバー）をAWSに移行するプロジェクト。Phase1として主要業務システムの移行を2026年度内に完了させる。", requiredSkills: ["AWS", "Terraform", "Docker", "Linux"], preferredSkills: ["Kubernetes", "CI/CD", "Python"], location: "東京（大手町）", remote: "週2リモート可", period: "2026/07 - 2027/03", notes: "セキュリティ要件が厳しい。金融系の経験者が望ましい。" }
  },
  {
    id: "SF-2026-002", name: "DX推進PM支援", customer: "大和物流株式会社", type: "PM/PMO", headcount: 1, startDate: "2026/06", status: "商談中", priority: "高", sales: "佐々木 理恵", summary: "物流DX推進のプログラムマネジメント支援。複数チームの調整とアジャイル導入。",
    detail: { overview: "大和物流のDX推進プログラム全体のマネジメント支援。倉庫管理・配送最適化・顧客管理の3プロジェクトを統括するPMOが必要。", requiredSkills: ["PM", "Agile", "要件定義"], preferredSkills: ["AWS", "DX推進経験", "物流業界知識"], location: "東京（品川）", remote: "週3リモート可", period: "2026/06 - 2027/06", notes: "アジャイル開発の豊富な実績が必須。40名以上の体制経験者が望ましい。" }
  },
  {
    id: "SF-2026-003", name: "AI/ML基盤構築", customer: "テックイノベーション株式会社", type: "MLエンジニア", headcount: 2, startDate: "2026/08", status: "要件定義中", priority: "中", sales: "鈴木 一郎", summary: "自社プロダクトのAI/ML基盤の設計・構築。推薦エンジンとデータパイプラインの構築。",
    detail: { overview: "自社SaaSプロダクトにAI推薦機能を組み込むための基盤構築。AWS SageMakerを中心としたMLOps基盤と、リアルタイム推論パイプラインの構築。", requiredSkills: ["Python", "AWS", "機械学習", "Docker"], preferredSkills: ["SageMaker", "MLOps", "Kubernetes", "データ基盤"], location: "東京（渋谷）", remote: "フルリモート可", period: "2026/08 - 2027/02", notes: "ML基盤の設計経験が必須。推薦システムの実績があると尚良い。" }
  },
  {
    id: "SF-2026-004", name: "セキュリティ強化支援", customer: "みらい銀行", type: "セキュリティエンジニア", headcount: 2, startDate: "2026/09", status: "商談中", priority: "中", sales: "木村 拓哉", summary: "クラウド環境のセキュリティ強化。ゼロトラスト導入とセキュリティ監査対応。",
    detail: { overview: "みらい銀行のクラウド環境（AWS/Azure）のセキュリティ強化プロジェクト。ゼロトラストアーキテクチャの導入と、金融庁ガイドラインへの準拠を実現する。", requiredSkills: ["AWS", "セキュリティ", "ネットワーク"], preferredSkills: ["Azure", "ゼロトラスト", "金融業界経験", "CISSP"], location: "東京（丸の内）", remote: "週1リモート可", period: "2026/09 - 2027/03", notes: "金融系のセキュリティ経験必須。出社ベースの案件。" }
  },
  {
    id: "SF-2026-005", name: "Webアプリケーション開発", customer: "グローバルメディア株式会社", type: "フルスタックエンジニア", headcount: 4, startDate: "2026/07", status: "提案中", priority: "低", sales: "佐々木 理恵", summary: "メディアプラットフォームの新規開発。React + Node.js + AWSでの構築。",
    detail: { overview: "新しいメディアプラットフォームのフルスクラッチ開発。フロントエンドはReact/Next.js、バックエンドはNode.js、インフラはAWSの構成。", requiredSkills: ["React", "TypeScript", "Node.js", "AWS"], preferredSkills: ["Next.js", "GraphQL", "Docker", "CI/CD"], location: "東京（六本木）", remote: "フルリモート可", period: "2026/07 - 2027/06", notes: "フロントエンド主導で進めるため、React経験が豊富な人材が望ましい。" }
  }
];

const JDS = [
  {
    id: "JD-001", dealId: "SF-2026-001", title: "クラウドインフラエンジニア（AWS）",
    description: "大手商社のAWSクラウド移行プロジェクトにおいて、インフラの設計・構築を担当するエンジニアを募集します。",
    requiredSkills: ["AWS（3年以上）", "Terraform", "Linux", "Docker"],
    preferredSkills: ["Kubernetes", "CI/CD", "Python", "金融系経験"],
    experience: "5年以上", location: "東京（大手町）", remote: "週2リモート可",
    workStyle: "プロジェクト参画", period: "2026/07 - 2027/03",
    responsibilities: "AWSインフラの設計・構築、IaCによる環境構築の自動化、CI/CDパイプラインの整備、既存環境のアセスメントと移行計画策定"
  },
  {
    id: "JD-002", dealId: "SF-2026-002", title: "DX推進プロジェクトマネージャー",
    description: "大手物流企業のDX推進プログラムにおいて、複数プロジェクトの統括管理を行うPMを募集します。",
    requiredSkills: ["PM（5年以上）", "Agile/Scrum", "要件定義", "ステークホルダー管理"],
    preferredSkills: ["DX推進実績", "物流業界知識", "AWS基礎知識", "40名以上体制経験"],
    experience: "10年以上", location: "東京（品川）", remote: "週3リモート可",
    workStyle: "PM支援", period: "2026/06 - 2027/06",
    responsibilities: "プログラム全体のマネジメント、3プロジェクトの進捗・課題管理、アジャイル開発プラクティスの導入・推進、経営層への報告"
  },
  {
    id: "JD-003", dealId: "SF-2026-003", title: "ML基盤エンジニア",
    description: "自社SaaSプロダクトのAI/ML基盤を設計・構築するエンジニアを募集します。",
    requiredSkills: ["Python（3年以上）", "AWS", "機械学習", "Docker"],
    preferredSkills: ["SageMaker", "MLOps", "Kubernetes", "推薦システム経験"],
    experience: "3年以上", location: "東京（渋谷）", remote: "フルリモート可",
    workStyle: "プロジェクト参画", period: "2026/08 - 2027/02",
    responsibilities: "ML基盤のアーキテクチャ設計、SageMakerを用いたMLOpsパイプライン構築、推薦エンジンのモデルデプロイ基盤構築、データパイプラインの設計・実装"
  }
];

const WORKFORCE_PLANS = [
  {
    id: "WP-001", title: "クラウドエンジニア増強計画", targetRole: "クラウドエンジニア",
    headcount: 10, deadline: "2026/09", priority: "高",
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "Linux"],
    linkedJDs: ["JD-001"],
    candidates: [
      { id: "C-001", status: "提案可能", currentMatch: 88, trainedMatch: 92 },
      { id: "C-003", status: "提案可能", currentMatch: 92, trainedMatch: 95 },
      { id: "C-004", status: "育成対象", currentMatch: 32, trainedMatch: 65 },
      { id: "C-007", status: "育成対象", currentMatch: 55, trainedMatch: 78 },
      { id: "C-010", status: "候補", currentMatch: 45, trainedMatch: 68 }
    ],
    stats: { ready: 2, training: 2, candidate: 1 }
  },
  {
    id: "WP-002", title: "AI/ML人材育成計画", targetRole: "MLエンジニア",
    headcount: 5, deadline: "2027/01", priority: "中",
    skills: ["Python", "AWS", "機械学習", "Docker", "データ基盤"],
    linkedJDs: ["JD-003"],
    candidates: [
      { id: "C-009", status: "候補", currentMatch: 78, trainedMatch: 90 },
      { id: "C-002", status: "育成対象", currentMatch: 35, trainedMatch: 60 }
    ],
    stats: { ready: 0, training: 1, candidate: 1 }
  },
  {
    id: "WP-003", title: "PM/PMO人材確保計画", targetRole: "PM/PMO",
    headcount: 3, deadline: "2026/08", priority: "高",
    skills: ["PM", "Agile", "要件定義", "ステークホルダー管理"],
    linkedJDs: ["JD-002"],
    candidates: [
      { id: "C-005", status: "提案可能", currentMatch: 85, trainedMatch: 90 }
    ],
    stats: { ready: 1, training: 0, candidate: 0 }
  }
];

const TRAINING_PLANS = {
  "C-001": {
    candidateId: "C-001", targetJD: "JD-001", targetRole: "クラウドインフラエンジニア",
    currentMatch: 88, targetMatch: 92, estimatedPeriod: "1ヶ月",
    items: [
      { theme: "Kubernetes応用（マルチクラスタ運用）", priority: "高", order: 1, duration: "2週間", goal: "大規模K8s環境の設計・運用が可能", progress: 100, status: "完了" },
      { theme: "セキュリティアーキテクチャ設計", priority: "高", order: 2, duration: "2週間", goal: "Well-Architected Securityに準拠した設計", progress: 100, status: "完了" },
      { theme: "コスト最適化ワークショップ", priority: "中", order: 3, duration: "1週間", goal: "FinOpsの基本を実践的に理解", progress: 80, status: "進行中" }
    ]
  },
  "C-003": {
    candidateId: "C-003", targetJD: "JD-001", targetRole: "クラウドインフラエンジニア",
    currentMatch: 92, targetMatch: 95, estimatedPeriod: "2週間",
    items: [
      { theme: "AWS Well-Architectedレビュー実践", priority: "高", order: 1, duration: "1週間", goal: "自律的にW-Aレビューを実施可能", progress: 100, status: "完了" },
      { theme: "障害対応リーダーシップ演習", priority: "中", order: 2, duration: "1週間", goal: "インシデントコマンダーとして対応可能", progress: 100, status: "完了" }
    ]
  },
  "C-005": {
    candidateId: "C-005", targetJD: "JD-002", targetRole: "PM/PMO",
    currentMatch: 85, targetMatch: 90, estimatedPeriod: "1ヶ月",
    items: [
      { theme: "アジャイルコーチング実践", priority: "高", order: 1, duration: "2週間", goal: "チームのアジャイル導入を支援可能", progress: 100, status: "完了" },
      { theme: "大規模プロジェクト管理手法", priority: "高", order: 2, duration: "2週間", goal: "50人規模のプロジェクトをリード可能", progress: 70, status: "進行中" },
      { theme: "ステークホルダーマネジメント上級", priority: "中", order: 3, duration: "1週間", goal: "経営層へのレポーティングが可能", progress: 40, status: "進行中" }
    ]
  },
  "C-004": {
    candidateId: "C-004", targetJD: "JD-001", targetRole: "クラウドインフラエンジニア",
    currentMatch: 32, targetMatch: 65, estimatedPeriod: "3ヶ月",
    items: [
      { theme: "AWS基礎〜実践", priority: "高", order: 1, duration: "4週間", goal: "AWS SAA取得レベル", progress: 30, status: "進行中" },
      { theme: "Terraform入門〜実践", priority: "高", order: 2, duration: "3週間", goal: "基本的なIaC構築が可能", progress: 0, status: "未着手" },
      { theme: "Docker/コンテナ実践", priority: "中", order: 3, duration: "2週間", goal: "Dockerfileの作成と運用が可能", progress: 0, status: "未着手" },
      { theme: "CI/CD基礎", priority: "中", order: 4, duration: "2週間", goal: "GitHub Actions等でパイプライン構築可能", progress: 0, status: "未着手" },
      { theme: "実践プロジェクト演習", priority: "高", order: 5, duration: "2週間", goal: "模擬環境でのクラウド構築完遂", progress: 0, status: "未着手" }
    ]
  },
  "C-007": {
    candidateId: "C-007", targetJD: "JD-001", targetRole: "クラウドインフラエンジニア",
    currentMatch: 55, targetMatch: 78, estimatedPeriod: "2ヶ月",
    items: [
      { theme: "AWS設計パターン", priority: "高", order: 1, duration: "3週間", goal: "Well-Architectedに基づく設計が可能", progress: 40, status: "進行中" },
      { theme: "Terraform実践", priority: "高", order: 2, duration: "3週間", goal: "モジュール設計とstate管理が可能", progress: 10, status: "進行中" },
      { theme: "Kubernetes基礎", priority: "中", order: 3, duration: "3週間", goal: "基本的なK8sクラスタ運用が可能", progress: 0, status: "未着手" },
      { theme: "セキュリティベストプラクティス", priority: "中", order: 4, duration: "1週間", goal: "AWSセキュリティの基本設計が可能", progress: 0, status: "未着手" }
    ]
  },
  "C-002": {
    candidateId: "C-002", targetJD: "JD-003", targetRole: "MLエンジニア",
    currentMatch: 35, targetMatch: 60, estimatedPeriod: "4ヶ月",
    items: [
      { theme: "Python for Data Science", priority: "高", order: 1, duration: "3週間", goal: "pandas/numpy/scikit-learnの実践的活用", progress: 60, status: "進行中" },
      { theme: "AWS ML基礎", priority: "高", order: 2, duration: "3週間", goal: "SageMakerの基本操作と理解", progress: 20, status: "進行中" },
      { theme: "機械学習基礎", priority: "高", order: 3, duration: "4週間", goal: "主要アルゴリズムの理解と実装", progress: 0, status: "未着手" },
      { theme: "Docker for ML", priority: "中", order: 4, duration: "2週間", goal: "ML環境のコンテナ化が可能", progress: 0, status: "未着手" },
      { theme: "MLOps入門", priority: "中", order: 5, duration: "3週間", goal: "モデルデプロイの基本フローを構築可能", progress: 0, status: "未着手" }
    ]
  }
};

const ASSESSMENTS_TEMPLATES = [
  { id: "ASM-001", skill: "AWS", level: "中級", questions: [
    { q: "VPCのサブネット設計において、パブリックサブネットとプライベートサブネットの使い分けの基準を説明してください。", type: "記述", points: 20, criteria: "セキュリティ観点での適切な分離ができているか" },
    { q: "Auto Scalingグループの設定で考慮すべきパラメータを3つ挙げ、それぞれの役割を説明してください。", type: "記述", points: 20, criteria: "スケーラビリティの理解度" },
    { q: "S3のストレージクラスの使い分けについて、コストとアクセス頻度の観点から説明してください。", type: "記述", points: 15, criteria: "コスト最適化の理解" },
    { q: "以下のうち、RDSのMulti-AZ配置の主な目的として正しいものはどれですか？", type: "選択", points: 10, criteria: "可用性の理解", options: ["パフォーマンス向上", "可用性向上", "コスト削減", "セキュリティ強化"] },
    { q: "CloudFormationまたはTerraformを使ったインフラ構築の経験について、具体的なプロジェクトでの活用事例を説明してください。", type: "実務確認", points: 35, criteria: "IaCの実践経験と理解度" }
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
  const aspMatch = candidate.aspiration?.includes("クラウド") || candidate.aspiration?.includes("設計") ? 10 : 5;
  const workMatch = candidate.remoteOk ? 10 : (jd.remote?.includes("フルリモート") ? 3 : 8);
  const current = Math.min(Math.round(skillScore + prefScore + expScore + aspMatch + workMatch), 99);
  const trained = Math.min(current + Math.round(gap.length * 5 + Math.random() * 10), 99);
  const reasons = [];
  if (fit.length > 0) reasons.push(`${fit.join("・")}の実務経験あり`);
  if (candidate.totalYears >= 5) reasons.push(`${candidate.totalYears}年の豊富な経験`);
  if (prefFit.length > 0) reasons.push(`歓迎スキル${prefFit.join("・")}も保有`);
  return { current, trained, fit, gap, prefFit, reason: reasons.join("。") || "基本的なスキルセットを保有" };
};

const STATUS_STYLES = {
  "未確認": { bg: "bg-white", text: "text-[#62625b]", border: "border-[#e5e5e0]", dot: "bg-[#c8c8c1]" },
  "候補": { bg: "bg-white", text: "text-[#211922]/80", border: "border-[#e0e0d9]", dot: "bg-[#91918c]" },
  "育成対象": { bg: "bg-white", text: "text-[#211922]/80", border: "border-[#e0e0d9] border-dashed", dot: "bg-[#91918c]" },
  "提案可能": { bg: "bg-[#f6f6f3]", text: "text-[#211922]", border: "border-[#c8c8c1]", dot: "bg-[#62625b]" },
  "提案済み": { bg: "bg-[#f6f6f3]", text: "text-[#211922]", border: "border-[#c8c8c1]", dot: "bg-[#211922]" },
  "配属済み": { bg: "bg-[#211922]", text: "text-white", border: "border-[#211922]", dot: "bg-white" },
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
  const [role, setRole] = useState("sales");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1023px)");
  const [screen, setScreen] = useState("sales-dashboard");
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedJD, setSelectedJD] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchMode, setSearchMode] = useState("jd");
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
  const [showAIGenerate, setShowAIGenerate] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [resumeType, setResumeType] = useState("blind");
  const [assessmentSkill, setAssessmentSkill] = useState("AWS");
  const [assessmentLevel, setAssessmentLevel] = useState("中級");
  const [generatedAssessment, setGeneratedAssessment] = useState(null);
  const [trainingTarget, setTrainingTarget] = useState(null);
  const [candidateProfile, setCandidateProfile] = useState(CANDIDATES[3]); // C-004 as logged in candidate
  const [learningProgress, setLearningProgress] = useState({});
  const [workforcePlans, setWorkforcePlans] = useState(WORKFORCE_PLANS);
  const [screenHistory, setScreenHistory] = useState([]);

  // Navigation helpers
  const doNavigate = (s, data) => {
    setScreenHistory(prev => [...prev, screen]);
    setScreen(s);
    if (data?.deal) setSelectedDeal(data.deal);
    if (data?.jd) setSelectedJD(data.jd);
    if (data?.candidate) setSelectedCandidate(data.candidate);
    if (data?.plan) setSelectedPlan(data.plan);
  };

  const navigate = (s, data) => {
    // If leaving JD create screen with unsaved draft, show confirm
    if (screen === "jd-create" && unsavedJDRef.current && s !== "jd-create") {
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
      const defaultScreen = role === "sales" ? "sales-dashboard" : role === "candidate" ? "my-page" : role === "customer" ? "jd-list" : "dashboard";
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
        { id: "jd-list", label: "JD管理", icon: <List size={18}/> },
        { id: "search", label: "候補者検索", icon: <Search size={18}/> },
        { id: "favorites", label: "お気に入り一覧", icon: <Star size={18}/> }
      ],
      sales: [
        { id: "sales-dashboard", label: "ダッシュボード", icon: <Home size={18}/> },
        { id: "deals", label: "商談一覧", icon: <Briefcase size={18}/> },
        { id: "search", label: "候補者検索", icon: <Search size={18}/> },
        { id: "assignment-list", label: "担当案件の稼働状況", icon: <Monitor size={18}/> }
      ],
      admin: [
        { id: "dashboard", label: "ダッシュボード", icon: <Home size={18}/> },
        { id: "plans", label: "要員計画", icon: <Target size={18}/> },
        { id: "assessment-gen", label: "アセスメント生成", icon: <Award size={18}/> },
        { id: "training", label: "育成プラン管理", icon: <GraduationCap size={18}/> }
      ],
      candidate: [
        { id: "my-page", label: "マイページ", icon: <Home size={18}/> },
        { id: "my-profile", label: "プロフィール編集", icon: <User size={18}/> },
        { id: "my-career", label: "職歴管理", icon: <FileText size={18}/> },
        { id: "my-assessments", label: "アセスメント", icon: <Award size={18}/> },
        { id: "my-training", label: "育成プラン", icon: <GraduationCap size={18}/> },
        { id: "my-resume", label: "職務経歴書", icon: <FileText size={18}/> }
      ]
    };

    const handleRoleChange = (e) => {
      const newRole = e.target.value;
      const defaults = { admin: "dashboard", sales: "sales-dashboard", customer: "jd-list", candidate: "my-page" };
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
            <option value="customer">顧客モード</option>
            <option value="candidate">候補者モード</option>
          </select>
        </div>
        <nav className="flex-1 px-3 py-2">
          {navItems[role]?.map(item => {
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
        <div className="px-5 py-4 text-xs" style={{borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)", fontWeight: 400}}>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{background: MORPHY.green700}}></div>Salesforce連携中</div>
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
        <div className={`p-5 text-white ${onClick ? "cursor-pointer transition-all duration-200" : ""}`} style={{background: MORPHY.red, borderRadius: MORPHY.radius.lg}} onClick={onClick}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs" style={{color: "rgba(255,255,255,0.7)", fontWeight: 400}}>{label}</div>
            <div className="p-2" style={{background: "rgba(255,255,255,0.15)", borderRadius: MORPHY.radius.circle}}>{icon}</div>
          </div>
          <div className="text-3xl text-white" style={{fontWeight: 600}}>{value}</div>
          {sub && <div className="text-xs mt-1.5" style={{color: "rgba(255,255,255,0.6)", fontWeight: 400}}>{sub}</div>}
        </div>
      );
    }
    return (
      <Card className={`p-5 ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs" style={{color: MORPHY.oliveGray, fontWeight: 500}}>{label}</div>
          <div className="p-2" style={{background: MORPHY.warmWash, borderRadius: MORPHY.radius.circle}}>{React.cloneElement(icon, { style: { color: MORPHY.plumBlack } })}</div>
        </div>
        <div className="text-3xl" style={{color: MORPHY.plumBlack, fontWeight: 600}}>{value}</div>
        {sub && <div className="text-xs mt-1.5 flex items-center gap-1" style={{color: MORPHY.warmSilver, fontWeight: 400}}>{sub}</div>}
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
    const roles = ["SE","SE","PM","SE","PL","SE","SE","PM","SE","SE","PM","SE","PL","SE","SE","SE","PM","SE"];
    const positions = ["主任","主任","課長","一般","主任","一般","一般","課長","主任","一般","主任","一般","課長","一般","主任","一般","主任","一般"];
    const grades = ["E","E","D","F","E","F","F","D","E","F","E","F","D","F","E","F","E","F"];
    const transfers = ["現在のままが良い","異動を希望","条件次第で検討","現在のままが良い","異動を希望","現在のままが良い","条件次第で検討","現在のままが良い","異動を希望","現在のままが良い","条件次第で検討","異動を希望","現在のままが良い","条件次第で検討","現在のままが良い","異動を希望","現在のままが良い","条件次第で検討"];
    const careerSets = [["マネジメント志向","安定志向"],["マネジメント志向","挑戦志向"],["プレイヤー志向","新規事業開拓"],["安定志向","技術深耕"],["挑戦志向","マネジメント志向"],["プレイヤー志向","安定志向"],["新規事業開拓","挑戦志向"],["マネジメント志向","技術深耕"],["安定志向","プレイヤー志向"],["挑戦志向","技術深耕"],["マネジメント志向","新規事業開拓"],["プレイヤー志向","挑戦志向"],["安定志向","マネジメント志向"],["新規事業開拓","安定志向"],["技術深耕","挑戦志向"],["マネジメント志向","プレイヤー志向"],["安定志向","新規事業開拓"],["挑戦志向","安定志向"]];
    const behaviorSets = [["共創的リーダー","スピード重視"],["共創的リーダー","協調性"],["分析的思考","柔軟な対応力"],["スピード重視","共創的リーダー"],["柔軟な対応力","分析的思考"],["協調性","スピード重視"],["分析的思考","共創的リーダー"],["柔軟な対応力","協調性"],["共創的リーダー","分析的思考"],["スピード重視","柔軟な対応力"],["協調性","共創的リーダー"],["分析的思考","スピード重視"],["柔軟な対応力","協調性"],["共創的リーダー","柔軟な対応力"],["スピード重視","協調性"],["分析的思考","共創的リーダー"],["協調性","スピード重視"],["柔軟な対応力","分析的思考"]];
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
            <div className="text-sm" style={{color: MORPHY.plumBlack, fontWeight: 700}}>{isBlind ? `候補者 ${c.id}` : c.name}</div>
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
      setInquiryState("sent");
    };

    if (inquiryState === "sent") {
      return (
        <Card className="p-4 bg-[#f6f6f3]">
          <div className="text-center py-2">
            <CheckCircle size={28} className="mx-auto text-green-500 mb-2"/>
            <h3 className="text-sm font-medium text-green-800">お問い合わせを送信しました</h3>
            <p className="text-xs text-green-600 mt-1">担当者より1営業日以内にご連絡いたします</p>
            <p className="text-xs text-[#91918c] mt-2">受付番号: INQ-{candidateId}-{Date.now().toString().slice(-4)}</p>
          </div>
        </Card>
      );
    }

    if (inquiryState === "form") {
      return (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#211922] mb-3 flex items-center gap-2"><MessageSquare size={14} className="text-[#211922]/80"/>候補者 {candidateId} について問い合わせ</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#91918c] mb-1 block">お問い合わせ種別</label>
              <select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={inquiryType} onChange={e => setInquiryType(e.target.value)}>
                <option>詳細確認</option>
                <option>面談希望</option>
                <option>提案依頼</option>
                <option>条件交渉</option>
                <option>その他</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#91918c] mb-1 block">メッセージ（任意）</label>
              <textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 h-20 resize-none" placeholder="例：この候補者の詳細スキルシートを確認したい / 来週面談を設定したい" value={inquiryMessage} onChange={e => setInquiryMessage(e.target.value)}/>
            </div>
            <div className="flex gap-2">
              <button onClick={sendInquiry} className="flex-1 bg-[#e60023] text-white rounded-2xl transition-all duration-200 text-sm py-2.5 flex items-center justify-center gap-1.5"><MessageSquare size={14}/>送信する</button>
              <button onClick={() => setInquiryState("idle")} className="bg-[#e5e5e0]/50 hover:bg-[#f6f6f3] text-[#62625b] text-sm px-4 py-2.5 rounded-lg">キャンセル</button>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card className="p-4">
        <h3 className="text-sm font-medium text-[#211922] mb-2">この候補者について</h3>
        <p className="text-xs text-[#91918c] mb-3">詳細確認や面談の設定など、担当者にお問い合わせいただけます。</p>
        <button onClick={() => setInquiryState("form")} className="w-full bg-[#e60023] text-white rounded-2xl transition-all duration-200 text-sm py-2.5 flex items-center justify-center gap-2 font-medium"><MessageSquare size={15}/>担当者に問い合わせる</button>
        {matchScore >= 75 && <p className="text-xs text-green-600 mt-2 text-center flex items-center justify-center gap-1"><Zap size={12}/>マッチ度が高い候補者です。お早めにご検討ください。</p>}
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
        <PageHeader title="JD管理" subtitle={`${allJDs.length}件のジョブディスクリプション`} actions={
          <button onClick={() => { setEditingJD(null); navigate("jd-create"); }} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center gap-2 transition-colors hover:bg-[#cc001f]"><Plus size={15}/>新規JD作成</button>
        }/>
        {allJDs.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4" style={{background: MORPHY.warmWash}}><FileText size={28} style={{color: MORPHY.oliveGray}}/></div>
            <h3 className="text-lg font-medium text-[#211922] mb-2">保存済みJDがありません</h3>
            <p className="text-sm text-[#91918c] mb-4">JD作成画面でJDを作成・保存してください。</p>
            <button onClick={() => { setEditingJD(null); navigate("jd-create"); }} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white inline-flex items-center gap-2 transition-colors"><Plus size={15}/>JDを作成する</button>
          </Card>
        ) : (
          <div className="space-y-3 pb-20">
            {allJDs.map((jd, i) => (
              <Card key={jd._savedId || i} className="p-5 transition-all hover:translate-y-[-1px]">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => {
                    const jdForEdit = jd._source === "テンプレート"
                      ? { title: jd.title, dept: "", aiSummary: jd.description, role: jd.responsibilities || "", responsibility: "", expMust: jd.requiredSkills, expWant: [], skillMust: jd.requiredSkills, skillWant: jd.preferredSkills, requiredSkills: jd.requiredSkills, preferredSkills: jd.preferredSkills, experience: jd.experience, location: jd.location, remote: jd.remote, _savedId: jd._savedId }
                      : jd;
                    setEditingJD(jdForEdit);
                    navigate("jd-create");
                  }}>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-[#211922] truncate">{jd.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{background: jd._source === "作成済み" ? `${MORPHY.red}15` : MORPHY.sand, color: jd._source === "作成済み" ? MORPHY.red : MORPHY.oliveGray}}>{jd._source}</span>
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

  const JDCreateScreen = () => {
    const [draftJD, setDraftJD] = useState(editingJD || null);
    const [candidateCount, setCandidateCount] = useState(editingJD ? 6 : null);
    const [showCandidates, setShowCandidates] = useState(false);
    const [showAiChat, setShowAiChat] = useState(true);
    const [chatMessages, setChatMessages] = useState([
      { role: "ai", text: "こんにちは！JD作成をお手伝いします。\n\n以下のような情報を自由にお伝えください：\n・議事メモや商談概要の貼り付け\n・他社JDフォーマットの共有\n・「AWSができる人、東京勤務」などラフな要望\n\n何でもお気軽にどうぞ！" }
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
      title: "クラウドインフラエンジニア", dept: "テクノロジー本部 インフラ部",
      aiSummary: "クラウド環境の設計・構築を統括し、AWSを中心としたインフラ設計の経験を持ち、IaCやコンテナ技術にも対応できるエンジニア。高度な技術力と推進力を併せ持つ人材。",
      role: "AWSを中心としたクラウドインフラの設計・構築・運用を主導。社内外のリソースを統合し、セキュアで可用性の高い基盤を形成する。",
      responsibility: "技術的な意思決定を主導し、インフラ基盤の品質と安定性を確保。チーム育成とナレッジ共有を通じ、持続的な技術基盤を築く責任を負う。",
      expMust: ["3年以上のAWSインフラ設計・構築経験", "Linuxサーバの運用・チューニング実績"],
      expWant: ["マルチクラウド環境での設計経験", "大規模トラフィックの負荷分散設計経験"],
      skillMust: ["AWS（EC2, ECS, Lambda, CloudFormation）", "Linux / Docker", "ネットワーク設計（VPC, セキュリティグループ）"],
      skillWant: ["Terraform / Ansible", "Kubernetes", "CI/CD（GitHub Actions, CodePipeline）", "Python / Go"],
      requiredSkills: ["AWS（3年以上）", "Linux", "Docker"],
      preferredSkills: ["Terraform", "Kubernetes", "CI/CD", "Python"],
      experience: "3年以上", location: "東京", remote: "週2リモート可",
      responsibilities: "・AWSインフラの設計・構築\n・IaCによる環境構築の自動化\n・既存環境のアセスメント\n・セキュリティ設計",
      roleModel: { name: "田中 太郎", traits: ["インフラ志向", "設計重視"] }
    };

    const processChat = (userMsg) => {
      const lower = userMsg.toLowerCase();
      if (!draftJD) {
        return { text: "入力内容を分析しました。JDドラフトを生成しました。\n\n左のパネルでJDの全体像をご確認ください。各セクションを直接編集することも、チャットで「経験年数を緩めて」「リモート可にして」など指示いただくこともできます。", jd: fullJD, count: 6 };
      }
      if (lower.includes("緩") || lower.includes("減") || lower.includes("下げ") || lower.includes("年数")) {
        return { text: "条件を緩和しました。\n・経験年数: 3年以上 → 1年以上\n・Docker: 必須 → 歓迎に移動\n\n候補者が増える見込みです。", jdPatch: { requiredSkills: ["AWS（1年以上）", "Linux"], preferredSkills: ["Docker", "Terraform", "Kubernetes", "CI/CD", "Python"], experience: "1年以上", expMust: ["1年以上のAWSインフラ設計・構築経験", "Linuxサーバの運用実績"] }, count: 10 };
      }
      if (lower.includes("リモート") || lower.includes("remote") || lower.includes("在宅")) {
        return { text: "リモート条件を「フルリモート可」に変更しました。地方在住の優秀なエンジニアも候補に入ります。", jdPatch: { remote: "フルリモート可" }, count: 12 };
      }
      if (lower.includes("追加") || lower.includes("go") || lower.includes("スキル")) {
        const newPref = [...(draftJD.preferredSkills || [])];
        const newSW = [...(draftJD.skillWant || [])];
        if (lower.includes("go") && !newPref.includes("Go")) { newPref.push("Go"); newSW.push("Go"); }
        if (lower.includes("rust") && !newPref.includes("Rust")) { newPref.push("Rust"); newSW.push("Rust"); }
        return newPref.length > draftJD.preferredSkills.length
          ? { text: "スキル要件を更新しました。歓迎スキルに追加し、JDに反映しました。", jdPatch: { preferredSkills: newPref, skillWant: newSW }, count: null }
          : { text: "どのスキルを追加しますか？例：「Goを歓迎スキルに追加して」", jdPatch: null, count: null };
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
      { label: "Goを追加", msg: "歓迎スキルにGoを追加して" },
      { label: "役割を拡張", msg: "役割にメンタリングを追加して" },
    ] : [
      { label: "AWSエンジニア、東京、設計寄り", msg: "AWSができる人、東京、運用より設計寄り、3年以上の経験" },
      { label: "Python + ML、フルリモート", msg: "Python + ML経験者、フルリモート可で探している" },
      { label: "PM経験10年以上、DX推進", msg: "PM経験10年以上、DX推進プロジェクトのリード経験がある人" },
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
        <PageHeader title="ジョブディスクリプション" subtitle="内容の追加・編集を行うことで、ジョブディスクリプションの精度を向上させることができます" actions={
          <button onClick={() => setShowAiChat(prev => !prev)} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${showAiChat ? "bg-[#e60023] text-white" : "border"}`} style={showAiChat ? {} : {borderColor: MORPHY.oliveGray, color: MORPHY.plumBlack}}><Sparkles size={14}/>{showAiChat ? "AI編集を閉じる" : "AI編集"}</button>
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
                  {!showAiChat && <button onClick={() => setShowAiChat(true)} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white inline-flex items-center gap-2 transition-colors"><Sparkles size={15}/>AI編集を開始</button>}
                </div>
              </Card>
            ) : (
              <>
                {/* JD Title */}
                <Card className="p-6">
                  <div className="mb-1 text-xs text-[#91918c]">{draftJD.dept || "テクノロジー本部 インフラ部"}</div>
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
                  const ranked = CANDIDATES.filter(c => c.status !== "配属済み")
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
                            <CandidateCardBody candidate={c} matchScore={c.match.current} compact={showAiChat} isBlind={role === "customer"} favSource={{ source: "jd-create", sourceLabel: `JD作成：${draftJD?.title || jd?.title || "JD"}` }}/>
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
                    <button onClick={() => setShowCandidates(true)} className="px-6 py-3 rounded-lg text-sm font-medium bg-[#e60023] text-white inline-flex items-center gap-2 transition-colors"><Users size={15}/>候補者リストを表示</button>
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
                    <button onClick={() => setShowCandidates(true)} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center gap-2 transition-colors"><Users size={15}/>候補者リストを作成</button>
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
                <button onClick={sendMessage} disabled={!chatInput.trim() || aiTyping} className="bg-[#e60023] text-white rounded-2xl px-4 py-2 text-sm font-medium disabled:opacity-40 flex items-center gap-1.5 flex-shrink-0 transition-all duration-200">
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
              {role !== "sales" && <span className="ml-3 text-xs text-[#91918c]">育成後: <span className="font-medium text-[#62625b]">{match.trained}%</span></span>}
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
          {/* Profile Info */}
          <div>
            <h4 className="text-xs font-medium text-[#91918c] mb-2">プロフィール</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#62625b]"><MapPin size={12}/>{isBlind ? "首都圏" : c.location}</div>
              <div className="flex items-center gap-2 text-[#62625b]"><Monitor size={12}/>{c.workCondition}</div>
              <div className="flex items-center gap-2 text-[#62625b]"><RefreshCw size={12}/>案件変更: {c.changeIntent}</div>
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
      CANDIDATES.filter(c => c.status !== "配属済み").map(c => ({ ...c, match: calcMatchScore(c, jd) })).sort((a, b) => b.match.current - a.match.current).slice(0, 8)
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
                  <MessageSquare size={14}/>まとめて問い合わせ{checkedCount > 0 && `（${checkedCount}名）`}
                </button>
              </div>
            )
          }/>
          {favCandidates.length === 0 ? (
            <Card className="p-12 text-center">
              <Star size={36} style={{color: MORPHY.warmSilver, margin: "0 auto 16px"}}/>
              <p className="text-base font-medium text-[#211922] mb-2">お気に入りに登録された候補者はいません</p>
              <p className="text-sm text-[#91918c] mb-4">JD作成画面で候補者をお気に入り登録すると、ここに一覧表示されます。</p>
              <button onClick={() => navigate("jd-create")} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white transition-colors hover:bg-[#cc001f]">JD作成へ</button>
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
                        {(() => { const info = favoriteCandidatesRef.current.get(c.id); return info ? (
                          <div className="px-5 pb-3 -mt-1">
                            <div className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg" style={{background: MORPHY.warmLight, color: MORPHY.oliveGray}}>
                              {info.source === "jd-create" && <Edit3 size={11}/>}
                              {info.source === "candidate-list" && <Users size={11}/>}
                              {info.source === "search" && <Search size={11}/>}
                              {info.source === "detail" && <Eye size={11}/>}
                              {!["jd-create","candidate-list","search","detail"].includes(info.source) && <Star size={11}/>}
                              <span className="truncate">{info.sourceLabel}</span>
                            </div>
                          </div>
                        ) : null; })()}
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
                  <h3 className="text-base font-semibold text-green-800 mb-1">問い合わせを送信しました</h3>
                  <p className="text-sm text-green-600 mb-2">{checkedCount}名の候補者について、担当者より1営業日以内にご連絡いたします。</p>
                  <p className="text-xs text-[#91918c] mb-4">受付番号: BULK-INQ-{Date.now().toString().slice(-6)}</p>
                  <button onClick={() => { setBulkInquiry(null); setCheckedIds(new Set()); setInquiryType("詳細確認"); setInquiryMessage(""); }} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white transition-colors hover:bg-[#cc001f]">閉じる</button>
                </div>
              ) : (
                <>
                  <h3 className="text-base font-semibold text-[#211922] mb-1 flex items-center gap-2"><MessageSquare size={16} style={{color: "#e60023"}}/>まとめて問い合わせ</h3>
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
                      <label className="text-xs text-[#91918c] mb-1 block">お問い合わせ種別</label>
                      <select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={inquiryType} onChange={e => setInquiryType(e.target.value)}>
                        <option>詳細確認</option>
                        <option>面談希望</option>
                        <option>提案依頼</option>
                        <option>条件交渉</option>
                        <option>その他</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-[#91918c] mb-1 block">メッセージ（任意）</label>
                      <textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 h-24 resize-none" placeholder="例：選択した候補者の詳細スキルシートを確認したい / まとめて面談を設定したい" value={inquiryMessage} onChange={e => setInquiryMessage(e.target.value)}/>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => { setBulkInquiry(null); setInquiryType("詳細確認"); setInquiryMessage(""); }} className="px-4 py-2.5 rounded-lg text-sm text-[#62625b] hover:bg-[#f6f6f3] transition-colors">キャンセル</button>
                    <button onClick={() => setBulkInquiry("sent")} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center gap-2 transition-colors hover:bg-[#cc001f]"><MessageSquare size={14}/>送信する（{checkedCount}名）</button>
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
    if (!c) return <div className="text-center py-20"><p className="text-[#91918c] mb-4">候補者が選択されていません</p><button onClick={goBack} className="px-4 py-2 rounded-lg text-sm bg-[#e60023] text-white">戻る</button></div>;
    const jd = selectedJD || JDS[0];
    const match = calcMatchScore(c, jd);
    const isBlind = role === "customer";
    const radarData = Object.entries(c.assessments).map(([k, v]) => ({ skill: k, score: v, fullMark: 100 }));

    const careerTraitDetails = [
      { label: "マネジメント志向", color: MORPHY.primaryBlue, desc: "チームの成長を自身の成果と捉え、メンバーの強みを活かした組織づくりに意欲的。管理職やTLとしての経験を活かし、プロジェクト全体を俯瞰しながら推進するスタイル。" },
      { label: "技術深耕志向", color: MORPHY.accent2, desc: "特定の技術領域に深く精通することに喜びを感じ、専門性を武器にチームに貢献する。新技術のキャッチアップに積極的で、技術選定やアーキテクチャ設計において頼られる存在。" },
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
            <p className="text-xs text-[#211922] leading-relaxed">本候補者は、IT業界で{c.totalYears}年の経験を持つエンジニアです。{c.careerHistory[0]?.detail?.slice(0, 60)}...</p>
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
                <StatusBadge status={c.status}/>
              </div>
              <div className="text-sm text-[#91918c] mb-1">{c.id}</div>
              {!isBlind && <div className="text-sm text-[#91918c]">テクノロジー本部 → インフラ部 → クラウドグループ ・ 経験{c.totalYears}年 ・ {c.location}</div>}
              {isBlind && <div className="text-sm text-[#91918c]">経験{c.totalYears}年</div>}
              <div className="flex items-center gap-3 mt-2 text-xs text-[#91918c]">
                <span className="flex items-center gap-1"><MapPin size={12}/>{isBlind ? "首都圏" : c.location}</span>
                <span className="flex items-center gap-1"><Monitor size={12}/>{c.workCondition}</span>
                <span className="flex items-center gap-1"><RefreshCw size={12}/>案件変更: {c.changeIntent}</span>
              </div>
            </div>
            {/* Action buttons in header */}
            {!isBlind && (role === "admin" || role === "sales") && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <select className="text-sm border border-[#e5e5e0] rounded-lg px-3 py-2" value={candidateStatuses[c.id] || c.status} onChange={e => setCandidateStatuses({...candidateStatuses, [c.id]: e.target.value})}>
                  {(role === "admin" ? ["未確認","候補","育成対象","提案可能","提案済み","配属済み","見送り"] : ["未確認","候補","提案可能","提案済み","配属済み","見送り"]).map(s => <option key={s}>{s}</option>)}
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
                <div className="w-2.5 h-2.5 rounded-full" style={{background: MORPHY.plumBlack}}/>ジョブディスクリプションとのマッチ度
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-medium" style={{color: MORPHY.plumBlack}}>{match.current}</span>
                <span className="text-xl font-medium" style={{color: MORPHY.plumBlack}}>%</span>
                {role !== "sales" && <span className="ml-4 text-sm text-[#91918c]">育成後予測: <span className="font-medium text-[#62625b]">{match.trained}%</span></span>}
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
                    <span className="text-sm font-semibold" style={{color: totalProgress >= 80 ? "#16a34a" : totalProgress >= 40 ? "#d97706" : "#91918c"}}>{totalProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#e5e5e0]/50 rounded-full overflow-hidden mb-4">
                    <div className="h-full rounded-full transition-all" style={{width: `${totalProgress}%`, background: totalProgress >= 80 ? "#16a34a" : totalProgress >= 40 ? "#d97706" : "#e5e5e0"}}/>
                  </div>
                  <div className="space-y-2.5 mb-4">
                    {tp.items.map((item, i) => (
                      <div key={i}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{
                            background: item.progress >= 100 ? "#16a34a" : item.progress > 0 ? "#fef3c7" : "#f6f6f3",
                            border: item.progress >= 100 ? "none" : item.progress > 0 ? "1px solid #d97706" : "1px solid #e5e5e0"
                          }}>
                            {item.progress >= 100 && <CheckCircle size={10} style={{color: "#fff"}}/>}
                            {item.progress > 0 && item.progress < 100 && <div className="w-1.5 h-1.5 rounded-full" style={{background: "#d97706"}}/>}
                          </div>
                          <span className={`text-xs flex-1 ${item.progress >= 100 ? "text-[#16a34a]" : item.progress > 0 ? "text-[#211922] font-medium" : "text-[#91918c]"}`}>{item.theme}</span>
                          <span className="text-xs flex-shrink-0" style={{color: item.progress >= 100 ? "#16a34a" : item.progress > 0 ? "#d97706" : "#c8c8c1"}}>{item.progress}%</span>
                        </div>
                        <div className="ml-6 w-full h-1.5 bg-[#e5e5e0]/40 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{width: `${item.progress}%`, background: item.progress >= 100 ? "#16a34a" : item.progress > 0 ? "#d97706" : "transparent"}}/>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 tf-grid-3 gap-2 text-center pt-3" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                    <div>
                      <div className="text-base font-semibold" style={{color: "#16a34a"}}>{completedItems}</div>
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
            {isBlind && <CustomerInquiryCard candidateId={c.id} matchScore={match.current}/>}
            {!isBlind && role === "admin" && (
              <Card className="p-5 space-y-2.5">
                <h3 className="text-sm font-medium text-[#211922] mb-2">アクション</h3>
                <button onClick={() => { setTrainingTarget(c); navigate("training-detail"); }} className="w-full bg-white hover:bg-[#f6f6f3] rounded-lg text-[#211922] border border-[#e5e5e0] text-sm py-2.5 flex items-center justify-center gap-1.5"><GraduationCap size={14}/>育成プラン生成</button>
                <button onClick={() => navigate("admin-resume", { candidate: c })} className="w-full bg-[#e60023] text-white rounded-2xl transition-all duration-200 text-sm py-2.5 flex items-center justify-center gap-1.5"><FileText size={14}/>職務経歴書生成</button>
              </Card>
            )}
            {!isBlind && role === "sales" && (
              <Card className="p-5 space-y-2.5">
                <h3 className="text-sm font-medium text-[#211922] mb-2">アクション</h3>
                <button onClick={() => navigate("admin-resume", { candidate: c })} className="w-full bg-white hover:bg-[#f6f6f3] rounded-lg text-[#211922] border border-[#e5e5e0] text-sm py-2.5 flex items-center justify-center gap-1.5"><FileText size={14}/>職務経歴書生成</button>
                <button onClick={() => setCandidateProposalOpen(true)} className="w-full bg-[#e60023] text-white rounded-2xl transition-all duration-200 text-sm py-2.5 flex items-center justify-center gap-1.5"><Mail size={14}/>顧客に提案メール</button>
              </Card>
            )}
          </div>
        </div>

        {/* ====== Candidate Proposal Email Modal (Sales) ====== */}
        {candidateProposalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: "rgba(33,25,34,0.55)"}}>
            <div className="bg-white w-full max-h-[92vh] overflow-hidden flex flex-col" style={{maxWidth: cpStep === "select" ? "560px" : "960px", margin: "16px", borderRadius: MORPHY.radius.lg, boxShadow: MORPHY.shadow.modal, transition: "max-width 0.3s ease"}}>
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
    const activeDeals = DEALS.filter(d => d.status !== "完了");
    const totalHeadcount = DEALS.reduce((s, d) => s + d.headcount, 0);
    const proposable = CANDIDATES.filter(c => c.status === "提案可能").length;
    const stageData = [
      { name: "提案準備", value: DEALS.filter(d => d.status === "提案準備").length },
      { name: "提案中", value: DEALS.filter(d => d.status === "提案中").length },
      { name: "面談調整", value: DEALS.filter(d => d.status === "面談調整").length },
      { name: "内定・調整", value: DEALS.filter(d => d.status === "内定・調整").length },
      { name: "完了", value: DEALS.filter(d => d.status === "完了").length }
    ];

    const assigned = CANDIDATES.filter(c => c.status === "配属済み" && c.assignment);
    const now = new Date();
    const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    const endingSoon = assigned.filter(c => {
      const end = new Date(c.assignment.endDate.replace(/\//g, "-"));
      return end <= endOfNextMonth;
    }).sort((a, b) => new Date(a.assignment.endDate.replace(/\//g, "-")) - new Date(b.assignment.endDate.replace(/\//g, "-")));

    const getDaysLeft = (endDate) => {
      const end = new Date(endDate.replace(/\//g, "-"));
      const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
      return diff;
    };

    return (
      <div>
        <PageHeader title="営業ダッシュボード" subtitle="商談状況と候補者マッチングの概要"/>
        <div className="grid grid-cols-4 tf-grid-4 gap-5 mb-8">
          <StatCard featured icon={<Briefcase size={20} className="text-white"/>} label="アクティブ商談" value={activeDeals.length} sub={`全${DEALS.length}件中`} color="blue" onClick={() => navigate("deals")}/>
          <StatCard icon={<Users size={20} className="text-[#211922]/80"/>} label="提案可能人材" value={proposable} sub="即戦力" color="green" onClick={() => navigate("available-candidates")}/>
          <StatCard icon={<Monitor size={20} className="text-[#211922]"/>} label="稼働中" value={assigned.length} sub="名" color="blue" onClick={() => navigate("assignment-list")}/>
          <StatCard icon={<AlertCircle size={20} className="text-[#91918c]"/>} label="契約終了間近" value={endingSoon.length} sub="来月末まで" color="red" onClick={() => navigate("assignment-list")}/>
        </div>

        {endingSoon.length > 0 && (
          <Card className="p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2" style={{color: MORPHY.textPrimary}}><span className="p-1.5 bg-[#f6f6f3] rounded-lg"><AlertCircle size={16} className="text-[#91918c]"/></span>契約終了間近の稼働者</h3>
              <button onClick={() => navigate("assignment-list")} className="text-xs font-medium" style={{color: MORPHY.textSecondary}}>稼働状況一覧 →</button>
            </div>
            <div className="space-y-2">
              {endingSoon.map(c => {
                const days = getDaysLeft(c.assignment.endDate);
                return (
                  <div key={c.id} className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-[#f6f6f3] transition-all duration-200" style={{border: `1px solid ${MORPHY.cardBorder}`}} onClick={() => navigate("candidate-detail", { candidate: c })}>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium" style={{color: MORPHY.textPrimary}}>{c.name}（{c.id}）</span>
                      <span className="text-xs" style={{color: MORPHY.textMuted}}>{c.assignment.customer} / {c.assignment.project}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm" style={{color: MORPHY.textSecondary}}>契約終了: <b>{c.assignment.endDate}</b></span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${days <= 15 ? "bg-[#e5e5e0] text-[#91918c]" : days <= 45 ? "bg-[#e5e5e0] text-[#62625b]" : "bg-[#e5e5e0]/50 text-[#62625b]"}`}>
                        {days <= 0 ? "終了済み" : `残り${days}日`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 tf-grid-2 gap-6 mb-8">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#211922]">商談ステージ分布</h3>
              <button onClick={() => navigate("deals")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">商談一覧 →</button>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={stageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF2"/><XAxis type="number" tick={{ fontSize: 12 }}/><YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80}/>
                <Tooltip/><Bar dataKey="value" fill={MORPHY.plumBlack} radius={[0, 6, 6, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#211922]">優先度別商談</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={[
                  { name: "高", value: DEALS.filter(d => d.priority === "高").length },
                  { name: "中", value: DEALS.filter(d => d.priority === "中").length },
                  { name: "低", value: DEALS.filter(d => d.priority === "低").length }
                ]} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" label={({name, value}) => `${name}: ${value}件`}>
                  {[MORPHY.accent1, MORPHY.accent3, MORPHY.textMuted].map((c, i) => <Cell key={i} fill={c}/>)}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-2 tf-grid-2 gap-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#211922]">直近の商談</h3>
              <button onClick={() => navigate("deals")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">すべて見る →</button>
            </div>
            <div className="space-y-3">
              {DEALS.slice(0, 4).map(d => (
                <div key={d.id} className="flex items-center justify-between p-4 bg-[#f6f6f3]/60 rounded-lg cursor-pointer hover:bg-[#e5e5e0]/50/80 transition-all duration-200" onClick={() => navigate("deal-detail", { deal: d })}>
                  <div>
                    <div className="text-sm font-medium text-[#211922]">{d.name}</div>
                    <div className="text-xs text-[#91918c]">{d.customer} ・ {d.headcount}名 ・ {d.startDate}</div>
                  </div>
                  <Badge color={d.priority === "高" ? "red" : d.priority === "中" ? "amber" : "gray"}>{d.priority}</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#211922]">提案可能人材（空き要員）</h3>
              <button onClick={() => navigate("available-candidates")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">一覧を見る →</button>
            </div>
            {(() => {
              const available = CANDIDATES.filter(c => c.status === "提案可能").sort((a, b) => b.experience - a.experience);
              return available.length > 0 ? (
                <div className="space-y-3">
                  {available.slice(0, 5).map(c => (
                      <div key={c.id} className="flex items-center justify-between p-3.5 bg-[#f6f6f3]/60 border border-[#e5e5e0] rounded-lg cursor-pointer hover:bg-[#f6f6f3] hover: transition-all duration-200" onClick={() => navigate("candidate-detail", { candidate: c })}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium" style={{color: MORPHY.textPrimary}}>{c.name}</span>
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
    const assigned = CANDIDATES.filter(c => c.status === "配属済み" && c.assignment)
      .sort((a, b) => new Date(a.assignment.endDate.replace(/\//g, "-")) - new Date(b.assignment.endDate.replace(/\//g, "-")));
    const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    const endingSoonCount = assigned.filter(c => new Date(c.assignment.endDate.replace(/\//g, "-")) <= endOfNextMonth).length;

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

    return (
      <div>
        <PageHeader title="稼働状況一覧" subtitle={`稼働中 ${assigned.length}名 ・ 契約終了間近 ${endingSoonCount}名`} onBack={goBack}/>
        <div className="grid grid-cols-3 tf-grid-3 gap-5 mb-8">
          <StatCard icon={<Monitor size={20} className="text-[#211922]"/>} label="稼働中" value={assigned.length} sub="名" color="blue"/>
          <StatCard icon={<AlertCircle size={20} className="text-red-600"/>} label="契約終了間近" value={endingSoonCount} sub="来月末まで" color="red"/>
          <StatCard icon={<TrendingUp size={20} className="text-green-600"/>} label="月額売上" value={assigned.reduce((s, c) => s + c.unitPrice, 0)} sub="万円" color="green"/>
        </div>
        <Card className="p-0 overflow-hidden rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-3 text-xs font-medium text-[#91918c]">ID</th>
                <th className="px-4 py-3 text-xs font-medium text-[#91918c]">名前</th>
                <th className="px-4 py-3 text-xs font-medium text-[#91918c]">顧客</th>
                <th className="px-4 py-3 text-xs font-medium text-[#91918c]">プロジェクト</th>
                <th className="px-4 py-3 text-xs font-medium text-[#91918c]">単価</th>
                <th className="px-4 py-3 text-xs font-medium text-[#91918c]">契約期間</th>
                <th className="px-4 py-3 text-xs font-medium text-[#91918c]">残日数</th>
                <th className="px-4 py-3 text-xs font-medium text-[#91918c]"></th>
              </tr>
            </thead>
            <tbody>
              {assigned.map(c => {
                const days = getDaysLeft(c.assignment.endDate);
                return (
                  <tr key={c.id} className="border-b last:border-b-0 hover:bg-[#f6f6f3]/50 cursor-pointer transition-all duration-200" onClick={() => navigate("candidate-detail", { candidate: c })}>
                    <td className="px-4 py-4 text-sm text-[#91918c] font-mono">{c.id}</td>
                    <td className="px-4 py-4 text-sm font-medium text-[#211922]">{c.name}</td>
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
            </tbody>
          </table>
        </Card>
      </div>
    );
  };

  const DashboardScreen = () => {
    const planData = workforcePlans.map(p => ({
      name: p.targetRole,
      必要: p.headcount,
      確保済み: p.stats.ready + p.stats.assigned,
      育成中: p.stats.training,
      候補: p.stats.candidate
    }));
    const statusData = [
      { name: "提案可能", value: CANDIDATES.filter(c => c.status === "提案可能").length },
      { name: "育成対象", value: CANDIDATES.filter(c => c.status === "育成対象").length },
      { name: "候補", value: CANDIDATES.filter(c => c.status === "候補").length },
      { name: "配属済み", value: CANDIDATES.filter(c => c.status === "配属済み").length }
    ];

    return (
      <div>
        <PageHeader title="管理者ダッシュボード" subtitle="要員計画・育成・アセスメントの全体像"/>
        <div className="grid grid-cols-3 tf-grid-3 gap-5 mb-8">
          <StatCard featured icon={<Target size={20} className="text-white"/>} label="要員計画" value={workforcePlans.length} sub="進行中" color="purple" onClick={() => navigate("plans")}/>
          <StatCard icon={<GraduationCap size={20} className="text-[#62625b]"/>} label="育成中" value={CANDIDATES.filter(c => c.status === "育成対象").length} sub="スキルアップ中" color="amber" onClick={() => navigate("training")}/>
          <StatCard icon={<Award size={20} className="text-[#211922]"/>} label="アセスメント" value={CANDIDATES.length} sub="登録候補者" color="blue" onClick={() => navigate("assessment-gen")}/>
        </div>

        <div className="grid grid-cols-2 tf-grid-2 gap-6 mb-8">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#211922]">要員計画 進捗</h3>
              <button onClick={() => navigate("plans")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">要員計画一覧 →</button>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={planData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF2"/><XAxis dataKey="name" tick={{ fontSize: 12 }}/><YAxis tick={{ fontSize: 12 }}/>
                <Tooltip/><Bar dataKey="必要" fill={MORPHY.cardBorder}/><Bar dataKey="確保済み" fill={MORPHY.plumBlack}/><Bar dataKey="育成中" fill={MORPHY.sand}/><Bar dataKey="候補" fill={MORPHY.textMuted}/>
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#211922]">人材ステータス分布</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" label={({name, value}) => `${name}: ${value}名`}>
                  {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]}/>)}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-2 tf-grid-2 gap-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#211922]">要員計画サマリー</h3>
              <button onClick={() => navigate("plans")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">すべて見る →</button>
            </div>
            <div className="space-y-3">
              {workforcePlans.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 bg-[#f6f6f3]/60 rounded-lg cursor-pointer hover:bg-[#e5e5e0]/50/80 transition-all duration-200" onClick={() => navigate("plan-detail", { plan: p })}>
                  <div>
                    <div className="text-sm font-medium text-[#211922]">{p.targetRole}</div>
                    <div className="text-xs text-[#91918c]">必要{p.headcount}名 ・ 確保済み{p.stats.ready + p.stats.assigned}名</div>
                  </div>
                  <MatchBar value={Math.round(((p.stats.ready + p.stats.assigned) / p.headcount) * 100)} size="sm"/>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#211922]">育成ボトルネック</h3>
              <button onClick={() => navigate("training")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">詳細 →</button>
            </div>
            <div className="space-y-3">
              {Object.values(TRAINING_PLANS).map(tp => {
                const c = CANDIDATES.find(c => c.id === tp.candidateId);
                const overallProgress = Math.round(tp.items.reduce((s, i) => s + i.progress, 0) / tp.items.length);
                return (
                  <div key={tp.candidateId} className="p-4 bg-[#f6f6f3]/60 rounded-lg cursor-pointer hover:bg-[#e5e5e0]/50/80 transition-all duration-200" onClick={() => { setTrainingTarget(c); navigate("training-detail"); }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#211922]">{c?.name}（{tp.candidateId}）</span>
                      <span className="text-xs text-[#91918c]">{tp.targetRole}</span>
                    </div>
                    <MatchBar value={overallProgress} label="育成進捗" size="sm"/>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const DealsScreen = () => (
    <div>
      <PageHeader title="商談一覧" subtitle="Salesforce連携" actions={<div className="flex items-center gap-2 text-xs text-[#91918c]"><Building2 size={14}/>Salesforce同期: 2026/04/15 09:30</div>}/>
      <div className="space-y-3">
        {DEALS.map(d => (
          <Card key={d.id} className="p-4" onClick={() => navigate("deal-detail", { deal: d })}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#f6f6f3] rounded-lg flex items-center justify-center"><Briefcase size={18} className="text-[#211922]"/></div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-[#91918c] font-mono">{d.id}</span>
                    <span className="font-medium text-[#211922]">{d.name}</span>
                    <span className={`text-xs font-medium ${getPriorityColor(d.priority)}`}>●{d.priority}</span>
                  </div>
                  <div className="text-xs text-[#91918c]">{d.customer} ・ {d.type} ・ {d.headcount}名 ・ {d.startDate}〜</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-[#e5e5e0]/50 text-[#211922] px-2 py-1 rounded">{d.status}</span>
                <span className="text-xs text-[#91918c]">担当: {d.sales}</span>
                <ChevronRight size={18} className="text-[#91918c]"/>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const DealDetailScreen = () => {
    const d = selectedDeal;
    if (!d) return <div className="text-center py-20"><p className="text-[#91918c] mb-4">商談が選択されていません</p><button onClick={goBack} className="px-4 py-2 rounded-lg text-sm bg-[#e60023] text-white">戻る</button></div>;
    const linkedJD = JDS.find(j => j.dealId === d.id);
    const matchedCandidates = CANDIDATES.slice(0, 5).map(c => ({ ...c, match: calcMatchScore(c, linkedJD || JDS[0]) })).sort((a,b) => b.match.current - a.match.current);

    // --- Proposal email state ---
    const [proposalModal, setProposalModal] = useState(null); // { candidates: [...], mode: "single"|"bulk" }
    const [proposalStep, setProposalStep] = useState("edit"); // "edit" | "preview" | "sending" | "sent"
    const [proposalChecked, setProposalChecked] = useState(new Set());

    const generateEmailTemplate = (candidates) => {
      const isBlind = true; // 顧客向けはブラインド
      const candList = candidates.map((c, i) => {
        const topSkills = c.skills.slice(0, 4).map(s => s.name).join("、");
        const matchPct = c.match?.current || 80;
        return `【候補者${i + 1}】${isBlind ? `候補者ID: ${c.id}` : c.name}\n  経験年数: ${c.totalYears}年\n  主要スキル: ${topSkills}\n  マッチ度: ${matchPct}%\n  勤務条件: ${c.location} / ${c.workCondition}`;
      }).join("\n\n");

      return {
        to: `${d.customer} ご担当者様`,
        subject: `【人材ご提案】${d.name} - ${candidates.length}名のご紹介`,
        body: `${d.customer}\nご担当者様\n\nいつもお世話になっております。\nTalentFlow営業部の${d.sales}です。\n\nお打ち合わせさせていただきました「${d.name}」の件につきまして、\n下記の通り候補者をご提案させていただきます。\n\n${"─".repeat(40)}\n\n${candList}\n\n${"─".repeat(40)}\n\n各候補者の職務経歴書（ブラインドレジュメ）を添付しておりますので、\nご確認のうえ、面談をご希望される方がいらっしゃいましたらお知らせください。\n\n【ご提案概要】\n  商談名: ${d.name}\n  想定職種: ${d.type}\n  参画希望時期: ${d.startDate}\n  必要人数: ${d.headcount}名\n  勤務地: ${d.detail.location}\n  リモート: ${d.detail.remote}\n\nご不明な点やご要望がございましたら、お気軽にご連絡ください。\nどうぞよろしくお願いいたします。\n\n${"─".repeat(40)}\nTalentFlow株式会社\n営業部 ${d.sales}\nTEL: 03-XXXX-XXXX\nEmail: ${d.sales.replace(/\s/g, "").toLowerCase()}@talentflow.co.jp`,
        attachments: candidates.map(c => ({
          id: c.id,
          name: isBlind ? `職務経歴書_${c.id}_ブラインド.pdf` : `職務経歴書_${c.name}.pdf`,
          candidate: c,
          type: "blind"
        }))
      };
    };

    const openProposalSingle = (c, e) => {
      e.stopPropagation();
      const template = generateEmailTemplate([c]);
      setProposalModal({ candidates: [c], email: template });
      setProposalStep("edit");
    };

    const openProposalBulk = () => {
      const selected = matchedCandidates.filter(c => proposalChecked.has(c.id));
      if (selected.length === 0) return;
      const template = generateEmailTemplate(selected);
      setProposalModal({ candidates: selected, email: template });
      setProposalStep("edit");
    };

    const toggleProposalCheck = (cId, e) => {
      e.stopPropagation();
      setProposalChecked(prev => {
        const next = new Set(prev);
        if (next.has(cId)) next.delete(cId); else next.add(cId);
        return next;
      });
    };

    const [emailDraft, setEmailDraft] = useState(null);
    React.useEffect(() => {
      if (proposalModal) setEmailDraft({ ...proposalModal.email });
    }, [proposalModal]);

    const sendProposal = () => {
      setProposalStep("sending");
      setTimeout(() => setProposalStep("sent"), 1800);
    };

    // --- Resume preview sub-component ---
    const ResumePreview = ({ c, isBlind = true }) => {
      const jd = linkedJD || JDS[0];
      return (
        <div className="border rounded-lg p-5 bg-[#f6f6f3] space-y-4 text-sm">
          <div className="text-center border-b pb-3">
            <h3 className="text-base font-medium text-[#211922]">職 務 経 歴 書</h3>
            <p className="text-[#91918c] text-xs mt-1">{isBlind ? `候補者ID: ${c.id}` : c.name}</p>
          </div>
          <div>
            <h4 className="font-medium text-[#211922] border-b pb-1 mb-1.5 text-xs">職務要約</h4>
            <p className="text-xs text-[#211922] leading-relaxed">
              {isBlind ? "本候補者は" : `${c.name}は`}、IT業界で{c.totalYears}年の経験を持つエンジニアです。
              {c.careerHistory[0]?.detail?.slice(0, 60)}...
            </p>
          </div>
          <div>
            <h4 className="font-medium text-[#211922] border-b pb-1 mb-1.5 text-xs">保有スキル</h4>
            <div className="flex flex-wrap gap-1">
              {c.skills.sort((a, b) => b.level - a.level).map(s => {
                const isMatch = jd && jd.requiredSkills?.some(rs => rs.toLowerCase().includes(s.name.toLowerCase()));
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
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="font-medium">{isBlind ? `プロジェクト${i + 1}` : h.project}</span>
                  <span className="text-[#91918c]">{h.period}</span>
                </div>
                <p className="text-xs text-[#91918c]">【{h.role}】{h.phase}</p>
                <div className="flex gap-1 mt-0.5 flex-wrap">{h.tech.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 bg-white border border-[#e5e5e0] rounded">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div>
        <PageHeader title={d.name} subtitle={`${d.id} ・ ${d.customer}`} onBack={goBack}/>
        <div className="grid grid-cols-3 tf-grid-3 gap-6">
          <div className="col-span-2 space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4"><Building2 size={18} className="text-[#211922]/80"/><h3 className="font-medium text-[#211922]">商談概要</h3><span className="text-xs text-[#91918c] ml-auto">Salesforce ID: {d.id}</span></div>
              <div className="grid grid-cols-2 tf-grid-2 gap-4 text-sm">
                <div><span className="text-[#91918c] text-xs">顧客名</span><p className="text-[#211922] font-medium">{d.customer}</p></div>
                <div><span className="text-[#91918c] text-xs">ステータス</span><p className="text-[#211922]">{d.status}</p></div>
                <div><span className="text-[#91918c] text-xs">想定職種</span><p className="text-[#211922]">{d.type}</p></div>
                <div><span className="text-[#91918c] text-xs">必要人数</span><p className="text-[#211922]">{d.headcount}名</p></div>
                <div><span className="text-[#91918c] text-xs">参画希望時期</span><p className="text-[#211922]">{d.startDate}</p></div>
                <div><span className="text-[#91918c] text-xs">担当営業</span><p className="text-[#211922]">{d.sales}</p></div>
              </div>
              <div className="mt-4"><span className="text-[#91918c] text-xs">概要</span><p className="text-sm text-[#211922] mt-1">{d.detail.overview}</p></div>
            </Card>

            <Card className="p-6">
              <h3 className="font-medium text-[#211922] mb-4">要件詳細</h3>
              <div className="grid grid-cols-2 tf-grid-2 gap-4 text-sm">
                <div><span className="text-[#91918c] text-xs">必須スキル</span><div className="flex flex-wrap gap-1.5 mt-1">{d.detail.requiredSkills.map(s => <span key={s} className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full text-xs">{s}</span>)}</div></div>
                <div><span className="text-[#91918c] text-xs">歓迎スキル</span><div className="flex flex-wrap gap-1.5 mt-1">{d.detail.preferredSkills.map(s => <span key={s} className="bg-green-50 text-[#211922] border border-green-200 px-2 py-0.5 rounded-full text-xs">{s}</span>)}</div></div>
                <div><span className="text-[#91918c] text-xs">勤務地</span><p className="text-[#211922]">{d.detail.location}</p></div>
                <div><span className="text-[#91918c] text-xs">リモート</span><p className="text-[#211922]">{d.detail.remote}</p></div>
                <div><span className="text-[#91918c] text-xs">期間</span><p className="text-[#211922]">{d.detail.period}</p></div>
                <div><span className="text-[#91918c] text-xs">特記事項</span><p className="text-[#211922]">{d.detail.notes}</p></div>
              </div>
            </Card>

            {matchedCandidates.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h3 className="font-medium text-[#211922]">マッチング候補者</h3>
                  <div className="flex items-center gap-2">
                    {proposalChecked.size > 0 && (
                      <button onClick={openProposalBulk} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#e60023] text-white flex items-center gap-1.5 transition-colors hover:bg-[#cc001f]">
                        <Mail size={14}/>まとめて提案メール（{proposalChecked.size}名）
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 tf-grid-2 gap-4">
                  {matchedCandidates.slice(0, 4).map(c => {
                    const cStatus = candidateStatuses[c.id] || c.status;
                    const isChecked = proposalChecked.has(c.id);
                    return (
                      <Card key={c.id} className="p-0 cursor-pointer transition-all hover:translate-y-[-2px]" onClick={(e) => { if (e.target.closest("button") || e.target.closest("input[type='checkbox']")) return; navigate("candidate-detail", { candidate: c }); }}>
                        <div className="relative">
                          <div className="absolute top-3 left-3 z-10">
                            <input type="checkbox" checked={isChecked} onChange={(e) => toggleProposalCheck(c.id, e)}
                              className="w-4 h-4 rounded border-[#c8c8c1] cursor-pointer accent-[#e60023]"/>
                          </div>
                          <CandidateCardBody candidate={c} matchScore={c.match.current} compact/>
                        </div>
                        <div className="px-5 pb-3 -mt-1 flex items-center justify-between gap-2">
                          <StatusBadge status={cStatus}/>
                          <button onClick={(e) => openProposalSingle(c, e)}
                            className="text-xs font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#e5e5e0] hover:bg-[#f6f6f3] transition-colors text-[#211922]">
                            <Mail size={12}/>提案メール
                          </button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">ステータス</h3>
              <div className="text-center py-3"><span className={`px-4 py-2.5 rounded-lg text-sm font-medium ${d.priority === "高" ? "bg-red-50 text-red-700" : "bg-[#e5e5e0]/50"}`}>{d.status}</span></div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#91918c]">優先度</span><span className={`font-medium ${getPriorityColor(d.priority)}`}>{d.priority}</span></div>
                <div className="flex justify-between"><span className="text-[#91918c]">必要人数</span><span className="font-medium">{d.headcount}名</span></div>
              </div>
            </Card>
            {linkedJD && (
              <Card className="p-4">
                <h3 className="text-sm font-medium text-[#211922] mb-3">関連JD</h3>
                <div className="p-4 bg-[#f6f6f3] rounded-lg cursor-pointer" onClick={() => { setSelectedJD(linkedJD); navigate("search"); }}>
                  <span className="text-xs text-[#211922]/80">{linkedJD.id}</span>
                  <p className="text-sm font-medium text-[#211922]">{linkedJD.title}</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* ====== Proposal Email Modal ====== */}
        {proposalModal && emailDraft && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: "rgba(33,25,34,0.55)"}}>
            <div className="bg-white w-full max-h-[92vh] overflow-hidden flex flex-col" style={{maxWidth: "960px", margin: "16px", borderRadius: MORPHY.radius.lg, boxShadow: MORPHY.shadow.modal}}>
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4" style={{borderBottom: `1px solid ${MORPHY.cardBorder}`}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background: `${MORPHY.red}12`}}>
                    <Mail size={20} style={{color: MORPHY.red}}/>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-[#211922]">提案メール作成</h3>
                    <p className="text-xs text-[#91918c]">{proposalModal.candidates.length}名の候補者を{d.customer}様にご提案</p>
                  </div>
                </div>
                <button onClick={() => { setProposalModal(null); setProposalStep("edit"); }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f6f6f3] transition-colors"><X size={18} className="text-[#91918c]"/></button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto">
                {proposalStep === "edit" && (
                  <div className="flex tf-two-col" style={{minHeight: 0}}>
                    {/* Left: Email Form */}
                    <div className="w-1/2 p-6 border-r border-[#e5e5e0] overflow-y-auto" style={{maxHeight: "calc(92vh - 140px)"}}>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-[#91918c] mb-1 block">宛先</label>
                          <input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm bg-[#f6f6f3]" value={emailDraft.to} onChange={e => setEmailDraft(prev => ({...prev, to: e.target.value}))}/>
                        </div>
                        <div>
                          <label className="text-xs text-[#91918c] mb-1 block">件名</label>
                          <input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10" value={emailDraft.subject} onChange={e => setEmailDraft(prev => ({...prev, subject: e.target.value}))}/>
                        </div>
                        <div>
                          <label className="text-xs text-[#91918c] mb-1 block">本文</label>
                          <textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 resize-none font-mono leading-relaxed" style={{minHeight: "360px"}} value={emailDraft.body} onChange={e => setEmailDraft(prev => ({...prev, body: e.target.value}))}/>
                        </div>
                        {/* Attachments */}
                        <div>
                          <label className="text-xs text-[#91918c] mb-2 block flex items-center gap-1"><Paperclip size={12}/>添付ファイル（{emailDraft.attachments.length}件）</label>
                          <div className="space-y-2">
                            {emailDraft.attachments.map(att => (
                              <div key={att.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#f6f6f3] border border-[#e5e5e0]">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50"><FileText size={16} className="text-red-600"/></div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-[#211922] truncate">{att.name}</p>
                                  <p className="text-xs text-[#91918c]">PDF ・ ブラインドレジュメ</p>
                                </div>
                                <Eye size={14} className="text-[#91918c] cursor-pointer hover:text-[#211922] flex-shrink-0"/>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="pt-2">
                          <button onClick={() => {
                            const aiNote = `\n\n※ AIによる推薦コメント ※\n${proposalModal.candidates.map((c, i) => `候補者${i + 1}（${c.id}）: ${c.skills.slice(0, 3).map(s => s.name).join("・")}に強みを持ち、${c.totalYears}年の実務経験があります。${c.aspiration?.slice(0, 30) || ""}というキャリア志向をお持ちです。`).join("\n")}`;
                            setEmailDraft(prev => ({...prev, body: prev.body + aiNote}));
                          }} className="text-xs text-[#62625b] hover:text-[#211922] flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e5e5e0] hover:bg-[#f6f6f3] transition-colors">
                            <Sparkles size={13}/>AIで推薦文を追加
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right: Resume Preview */}
                    <div className="w-1/2 p-6 overflow-y-auto bg-[#fafaf8]" style={{maxHeight: "calc(92vh - 140px)"}}>
                      <div className="flex items-center gap-2 mb-4">
                        <Paperclip size={14} className="text-[#91918c]"/>
                        <h4 className="text-sm font-medium text-[#211922]">添付 職務経歴書プレビュー</h4>
                      </div>
                      <div className="space-y-4">
                        {proposalModal.candidates.map(c => (
                          <div key={c.id}>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-[#211922] bg-white border border-[#e5e5e0] px-2 py-0.5 rounded">{c.id}</span>
                              <span className="text-xs text-[#91918c]">ブラインドレジュメ</span>
                            </div>
                            <ResumePreview c={c} isBlind={true}/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {proposalStep === "preview" && (
                  <div className="p-6">
                    <div className="max-w-2xl mx-auto">
                      <div className="mb-4 flex items-center gap-2">
                        <CheckCircle size={16} style={{color: MORPHY.green700}}/>
                        <span className="text-sm font-medium text-[#211922]">送信内容の最終確認</span>
                      </div>
                      <Card className="p-5 mb-4">
                        <div className="space-y-3 text-sm">
                          <div className="flex"><span className="text-[#91918c] w-16 flex-shrink-0">宛先</span><span className="text-[#211922] font-medium">{emailDraft.to}</span></div>
                          <div className="flex"><span className="text-[#91918c] w-16 flex-shrink-0">件名</span><span className="text-[#211922] font-medium">{emailDraft.subject}</span></div>
                        </div>
                      </Card>
                      <Card className="p-5 mb-4">
                        <pre className="text-sm text-[#211922] whitespace-pre-wrap font-sans leading-relaxed">{emailDraft.body}</pre>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center gap-2 mb-3"><Paperclip size={14} className="text-[#91918c]"/><span className="text-sm font-medium text-[#211922]">添付ファイル</span></div>
                        <div className="space-y-2">
                          {emailDraft.attachments.map(att => (
                            <div key={att.id} className="flex items-center gap-3 p-2 rounded-lg bg-[#f6f6f3]">
                              <FileText size={14} className="text-red-600 flex-shrink-0"/>
                              <span className="text-sm text-[#211922]">{att.name}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {proposalStep === "sending" && (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#f6f6f3]">
                        <RefreshCw size={28} className="text-[#e60023] animate-spin"/>
                      </div>
                      <h3 className="text-lg font-medium text-[#211922] mb-2">提案メールを送信中...</h3>
                      <p className="text-sm text-[#91918c]">{d.customer}様へ{proposalModal.candidates.length}名の候補者情報を送信しています</p>
                    </div>
                  </div>
                )}

                {proposalStep === "sent" && (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background: `${MORPHY.green700}15`}}>
                        <CheckCircle size={32} style={{color: MORPHY.green700}}/>
                      </div>
                      <h3 className="text-lg font-medium text-[#211922] mb-2">提案メールを送信しました</h3>
                      <p className="text-sm text-[#91918c] mb-1">{d.customer}様宛に{proposalModal.candidates.length}名の候補者情報と職務経歴書を送信しました。</p>
                      <p className="text-xs text-[#91918c] mb-6">送信日時: {new Date().toLocaleString("ja-JP")}</p>
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => { setProposalModal(null); setProposalStep("edit"); setProposalChecked(new Set()); }} className="px-5 py-2.5 rounded-lg text-sm font-medium border border-[#e5e5e0] hover:bg-[#f6f6f3] text-[#211922] transition-colors">閉じる</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              {(proposalStep === "edit" || proposalStep === "preview") && (
                <div className="flex items-center justify-between px-6 py-4" style={{borderTop: `1px solid ${MORPHY.cardBorder}`}}>
                  <div className="flex items-center gap-2 text-xs text-[#91918c]">
                    <Paperclip size={12}/>{emailDraft.attachments.length}件の職務経歴書を添付
                  </div>
                  <div className="flex gap-3">
                    {proposalStep === "edit" && (
                      <>
                        <button onClick={() => { setProposalModal(null); setProposalStep("edit"); }} className="px-4 py-2.5 rounded-lg text-sm font-medium border border-[#e5e5e0] hover:bg-[#f6f6f3] text-[#62625b] transition-colors">キャンセル</button>
                        <button onClick={() => setProposalStep("preview")} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#211922] text-white hover:bg-[#2e2630] transition-colors flex items-center gap-1.5"><Eye size={14}/>プレビュー</button>
                      </>
                    )}
                    {proposalStep === "preview" && (
                      <>
                        <button onClick={() => setProposalStep("edit")} className="px-4 py-2.5 rounded-lg text-sm font-medium border border-[#e5e5e0] hover:bg-[#f6f6f3] text-[#62625b] transition-colors flex items-center gap-1.5"><Edit3 size={14}/>編集に戻る</button>
                        <button onClick={sendProposal} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#e60023] text-white hover:bg-[#cc001f] transition-colors flex items-center gap-1.5"><Send size={14}/>送信する</button>
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

  const PlansScreen = () => (
    <div>
      <PageHeader title="要員計画" subtitle="職種別の人材確保・育成計画" actions={
        <button onClick={() => navigate("plan-create")} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-4 py-2 text-sm font-medium flex items-center gap-2"><Plus size={16}/>新規計画を作成</button>
      }/>
      <div className="grid grid-cols-1 gap-4">
        {workforcePlans.map(p => {
          const achieveRate = Math.round(((p.stats.ready + p.stats.assigned) / p.headcount) * 100);
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
                    <div><span className="text-xs text-[#91918c]">確保済み</span><p className="font-medium text-green-600">{p.stats.ready + p.stats.assigned}名</p></div>
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
      { role: "ai", text: "要員計画のスキルセット設計をお手伝いします。目標職種や背景を教えていただければ、最適なスキルセットを提案します。" }
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
        if (lower.includes("クラウド") || lower.includes("aws") || lower.includes("インフラ")) {
          aiReply = `クラウド/インフラ領域のスキルセットですね。以下を提案します：\n\n【必須スキル】AWS, Terraform, Docker\n【推奨スキル】Kubernetes, Linux, CI/CD\n【あると尚良し】Python, 監視設計\n\n${form.targetRole ? `「${form.targetRole}」のポジションであれば、` : ""}特にIaCとコンテナ技術の組み合わせが市場価値が高いです。追加しますか？`;
          suggestedSkills = ["AWS", "Terraform", "Docker", "Kubernetes", "Linux", "CI/CD"];
        } else if (lower.includes("フロント") || lower.includes("react") || lower.includes("vue") || lower.includes("web")) {
          aiReply = `フロントエンド領域のスキルセットを提案します：\n\n【必須スキル】React, TypeScript, HTML/CSS\n【推奨スキル】Next.js, テスト設計, UI/UX\n【あると尚良し】GraphQL, パフォーマンス最適化\n\nモダンフロントエンドでは特にTypeScriptの重要度が上がっています。追加しますか？`;
          suggestedSkills = ["React", "TypeScript", "HTML/CSS", "Next.js", "UI/UX", "テスト設計"];
        } else if (lower.includes("pm") || lower.includes("マネ") || lower.includes("管理") || lower.includes("リード")) {
          aiReply = `PM/マネジメント領域のスキルセットですね：\n\n【必須スキル】Agile, スクラム, ステークホルダー管理\n【推奨スキル】リスク管理, 見積り, チームビルディング\n【あると尚良し】技術理解, データ分析\n\n技術理解のあるPMは希少で市場価値が高いです。追加しますか？`;
          suggestedSkills = ["Agile", "PM", "スクラム", "リスク管理", "チームビルディング"];
        } else if (lower.includes("java") || lower.includes("バックエンド") || lower.includes("サーバ") || lower.includes("api")) {
          aiReply = `バックエンド/サーバーサイド領域の提案です：\n\n【必須スキル】Java, Spring Boot, SQL\n【推奨スキル】API設計, Docker, CI/CD\n【あると尚良し】マイクロサービス, メッセージキュー\n\nエンタープライズ案件ではJava + Springの組み合わせが根強いです。追加しますか？`;
          suggestedSkills = ["Java", "Spring Boot", "SQL", "API設計", "Docker"];
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
            aiReply = "どの領域のスキルセットを検討していますか？例えば「クラウドインフラ」「フロントエンド」「PM」などのキーワードで相談できます。";
          }
        } else if (lower.includes("削除") || lower.includes("外") || lower.includes("除")) {
          aiReply = `現在のスキルセット: ${form.skills.length > 0 ? form.skills.join("、") : "（なし）"}\n\n外したいスキルがあれば、スキル名を教えてください。または左のスキルタグの「×」で直接削除できます。`;
        } else {
          aiReply = `「${userMsg}」に関連するスキルセットを考えてみましょう。\n\nもう少し具体的に教えていただけますか？例えば：\n・どのような技術領域ですか？（クラウド、Web開発、データ分析など）\n・チームの現状の課題は？\n・どのレベル感の人材を想定していますか？（ジュニア/ミドル/シニア）`;
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
            status: "候補",
            currentMatch: sc?.currentMatch || 50,
            trainedMatch: sc?.trainedMatch || 70
          };
        }),
        stats: { ready: 0, training: 0, candidate: selectedCandidates.length }
      };
      setWorkforcePlans(prev => [...prev, newPlan]);
      navigate("plan-detail", { plan: newPlan });
    };

    return (
      <div>
        <PageHeader title="要員計画の新規作成" subtitle={`ステップ ${step} / 3`} onBack={goBack}/>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {[{ n: 1, label: "基本情報" }, { n: 2, label: "候補者選定" }, { n: 3, label: "確認・作成" }].map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <button onClick={() => s.n < step + 1 && setStep(s.n)} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${step === s.n ? "bg-[#e60023] text-white" : step > s.n ? "bg-[#62625b] text-white" : "bg-[#e5e5e0]/50 text-[#91918c]"}`}>{step > s.n ? "✓" : s.n}</button>
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
                    <div><label className="text-xs text-[#91918c] mb-1 block">計画名</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" placeholder="例：クラウドエンジニア増強計画" value={form.title} onChange={e => { const v = e.target.value; setForm(f => ({...f, title: v})); }}/></div>
                    <div><label className="text-xs text-[#91918c] mb-1 block">目標職種 <span className="text-red-500">*</span></label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" placeholder="例：クラウドエンジニア" value={form.targetRole} onChange={e => { const v = e.target.value; setForm(f => ({...f, targetRole: v})); }}/></div>
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
                  <button onClick={() => setStep(2)} disabled={!form.targetRole} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-6 py-2.5 text-sm font-medium disabled:opacity-40 flex items-center gap-2">候補者を選定する<ChevronRight size={16}/></button>
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
                        {["クラウドインフラ向け", "フロントエンド向け", "バックエンド向け", "PM向け"].map(q => (
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
              <button onClick={() => setStep(3)} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-6 py-2.5 text-sm font-medium flex items-center gap-2">確認へ進む<ChevronRight size={16}/></button>
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
                  <button onClick={savePlan} className="bg-[#e60023] text-white px-8 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2"><CheckCircle size={16}/>要員計画を作成</button>
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
    if (!p) return <div className="text-center py-20"><p className="text-[#91918c] mb-4">プランが選択されていません</p><button onClick={goBack} className="px-4 py-2 rounded-lg text-sm bg-[#e60023] text-white">戻る</button></div>;

    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const [selectedToAdd, setSelectedToAdd] = useState(new Set());
    const [addedToast, setAddedToast] = useState(null);

    const existingIds = new Set(p.candidates.map(c => c.id));

    const searchCandidates = () => {
      setSearching(true);
      setTimeout(() => {
        const q = searchQuery.toLowerCase();
        const scored = CANDIDATES.filter(c => !existingIds.has(c.id)).map(c => {
          const skillMatch = p.skills.length > 0
            ? p.skills.filter(s => c.skills.some(cs => cs.name.toLowerCase().includes(s.toLowerCase()))).length / p.skills.length
            : 0.3;
          const queryMatch = q ? (c.skills.some(s => s.name.toLowerCase().includes(q)) || c.aspiration.toLowerCase().includes(q) || c.name.includes(searchQuery) ? 0.2 : 0) : 0;
          const currentMatch = Math.min(Math.round((skillMatch + queryMatch) * 60 + Math.min(c.totalYears / 10, 1) * 20 + (c.remoteOk ? 10 : 5) + Math.random() * 5), 99);
          const trainedMatch = Math.min(currentMatch + Math.round(10 + Math.random() * 15), 99);
          return { ...c, currentMatch, trainedMatch, skillMatchRate: Math.round(skillMatch * 100) };
        }).sort((a, b) => b.currentMatch - a.currentMatch);
        setSearchResults(scored);
        setSearching(false);
      }, 800);
    };

    const addCandidatesToPlan = () => {
      const newCandidates = [...selectedToAdd].map(cId => {
        const sr = searchResults?.find(c => c.id === cId);
        return { id: cId, status: "候補", currentMatch: sr?.currentMatch || 50, trainedMatch: sr?.trainedMatch || 70 };
      });
      const updated = { ...p, candidates: [...p.candidates, ...newCandidates] };
      setPlan(updated);
      setWorkforcePlans(prev => prev.map(wp => wp.id === p.id ? updated : wp));
      setAddedToast(`${newCandidates.length}名を候補に追加しました`);
      setTimeout(() => setAddedToast(null), 2500);
      setSelectedToAdd(new Set());
      setSearchResults(null);
      setSearchQuery("");
      setShowSearchPanel(false);
    };

    const readyCandidates = p.candidates.filter(pc => pc.status === "提案可能");
    const trainingCandidates = p.candidates.filter(pc => pc.status === "育成対象");
    const pendingCandidates = p.candidates.filter(pc => pc.status === "候補");

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
                    {tp && (
                      <div className="w-1/2 p-4 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-[#211922] flex items-center gap-1.5"><GraduationCap size={12} style={{color: "#d97706"}}/>育成進捗</span>
                          <span className="text-xs font-semibold" style={{color: totalProgress >= 50 ? "#16a34a" : totalProgress > 0 ? "#d97706" : "#91918c"}}>{totalProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#e5e5e0]/50 rounded-full overflow-hidden mb-3">
                          <div className="h-full rounded-full transition-all" style={{width: `${totalProgress}%`, background: totalProgress >= 50 ? "#16a34a" : totalProgress > 0 ? "#d97706" : "#e5e5e0"}}/>
                        </div>
                        <div className="space-y-1.5">
                          {tp.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0" style={{
                                background: item.progress >= 100 ? "#16a34a" : item.progress > 0 ? "#fef3c7" : "#f6f6f3",
                                border: item.progress >= 100 ? "none" : item.progress > 0 ? "1px solid #d97706" : "1px solid #e5e5e0"
                              }}>
                                {item.progress >= 100 && <CheckCircle size={10} style={{color: "#fff"}}/>}
                                {item.progress > 0 && item.progress < 100 && <div className="w-1.5 h-1.5 rounded-full" style={{background: "#d97706"}}/>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className={`text-xs truncate ${item.progress >= 100 ? "text-[#16a34a] line-through" : item.progress > 0 ? "text-[#211922] font-medium" : "text-[#91918c]"}`}>{item.theme}</span>
                                  <span className="text-xs ml-2 flex-shrink-0" style={{color: item.progress >= 100 ? "#16a34a" : item.progress > 0 ? "#d97706" : "#c8c8c1"}}>{item.progress}%</span>
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
                    )}
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

            <CandidateSection
              title="提案可能・育成中"
              color="#16a34a"
              bgColor="#dcfce7"
              candidates={[...readyCandidates, ...trainingCandidates]}
              emptyText="提案可能・育成中の候補者はいません"
            />

            <CandidateSection
              title="候補"
              color="#2563eb"
              bgColor="#dbeafe"
              candidates={pendingCandidates}
              emptyText="候補の候補者はいません"
            />

            {/* Add Candidates Section */}
            {!showSearchPanel ? (
              <Card className="p-5 border-dashed cursor-pointer hover:bg-[#fafaf8] transition-colors" style={{borderStyle: "dashed"}} onClick={() => setShowSearchPanel(true)}>
                <div className="flex items-center justify-center gap-2 text-sm text-[#91918c]">
                  <Plus size={16}/>
                  <span>候補者を検索して追加する</span>
                </div>
              </Card>
            ) : (
              <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-[#211922] flex items-center gap-2"><Search size={15} style={{color: "#e60023"}}/>候補者を検索・追加</h4>
                  <button onClick={() => { setShowSearchPanel(false); setSearchResults(null); setSearchQuery(""); setSelectedToAdd(new Set()); }} className="text-xs text-[#91918c] hover:text-[#211922]"><X size={16}/></button>
                </div>
                <div className="flex gap-2 mb-3">
                  <input className="flex-1 border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" placeholder="スキル・名前で検索、または空欄でスキルマッチ検索" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); searchCandidates(); } }}/>
                  <button onClick={searchCandidates} className="bg-[#e60023] text-white rounded-lg px-5 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-[#cc001f] transition-colors"><Search size={14}/>検索</button>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-xs text-[#91918c] mr-1">計画スキル:</span>
                  {p.skills.map(s => <span key={s} className="text-xs bg-[#f6f6f3] text-[#62625b] px-2 py-0.5 rounded-full border border-[#e5e5e0]">{s}</span>)}
                </div>

                {searching && <LoadingAI text="候補者をスキルマッチングで検索中..."/>}

                {searchResults && !searching && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-[#91918c]">{searchResults.length}名が見つかりました（既存候補者を除く）</span>
                      {selectedToAdd.size > 0 && (
                        <button onClick={addCandidatesToPlan} className="bg-[#e60023] text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-[#cc001f] transition-colors"><Plus size={14}/>{selectedToAdd.size}名を候補に追加</button>
                      )}
                    </div>
                    {searchResults.length === 0 ? (
                      <div className="text-center py-6 text-sm text-[#91918c]">条件に合う候補者が見つかりませんでした</div>
                    ) : (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {searchResults.map(c => {
                          const isSelected = selectedToAdd.has(c.id);
                          return (
                            <div key={c.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${isSelected ? "border-[#e60023]/40 bg-[#e60023]/5" : "border-[#e5e5e0] hover:bg-[#fafaf8]"}`}
                              onClick={() => setSelectedToAdd(prev => { const next = new Set(prev); if (next.has(c.id)) next.delete(c.id); else next.add(c.id); return next; })}>
                              <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0" style={{borderColor: isSelected ? "#e60023" : MORPHY.cardBorder, background: isSelected ? "#e60023" : "transparent"}}>
                                {isSelected && <CheckCircle size={12} style={{color: "#fff"}}/>}
                              </div>
                              <img src={c.photo} className="w-9 h-9 rounded-full object-cover flex-shrink-0" alt=""/>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-[#211922] truncate">{c.name}</span>
                                  <span className="text-xs text-[#91918c]">{c.id}</span>
                                  <span className="text-xs text-[#91918c]">経験{c.totalYears}年</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {c.skills.slice(0, 5).map(s => {
                                    const isMatch = p.skills.some(ps => s.name.toLowerCase().includes(ps.toLowerCase()));
                                    return <span key={s.name} className={`text-xs px-1.5 py-0.5 rounded-full ${isMatch ? "bg-[#dcfce7] text-[#16a34a] font-medium" : "bg-[#f6f6f3] text-[#91918c]"}`}>{s.name}</span>;
                                  })}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 flex-shrink-0">
                                <div className="text-right">
                                  <div className="text-xs text-[#91918c]">スキル一致</div>
                                  <div className="text-sm font-semibold" style={{color: c.skillMatchRate >= 60 ? "#16a34a" : c.skillMatchRate >= 30 ? "#d97706" : "#91918c"}}>{c.skillMatchRate}%</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-[#91918c]">マッチ</div>
                                  <div className="text-sm font-semibold text-[#211922]">{c.currentMatch}%</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-[#91918c]">育成後</div>
                                  <div className="text-sm font-semibold" style={{color: "#16a34a"}}>{c.trainedMatch}%</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            )}
          </div>
          <div className="space-y-4 sticky top-4" style={{alignSelf: "flex-start"}}>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-[#211922] mb-3">達成状況</h3>
              <div className="space-y-3">
                {[{ label: "提案可能", value: readyCandidates.length, color: "#16a34a" }, { label: "育成中", value: trainingCandidates.length, color: "#d97706" }, { label: "候補", value: pendingCandidates.length, color: "#2563eb" }].map(s => (
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
                <div className="absolute left-0 top-0 h-full rounded-full transition-all" style={{width: `${Math.min((readyCandidates.length / Math.max(p.headcount, 1)) * 100, 100)}%`, background: "#16a34a"}}/>
                <div className="absolute top-0 h-full rounded-full transition-all" style={{left: `${Math.min((readyCandidates.length / Math.max(p.headcount, 1)) * 100, 100)}%`, width: `${Math.min((trainingCandidates.length / Math.max(p.headcount, 1)) * 100, 100)}%`, background: "#d97706"}}/>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-[#91918c]">
                <span>提案可能 {readyCandidates.length}名</span>
                <span>目標 {p.headcount}名</span>
              </div>
            </Card>
          </div>
        </div>
        {addedToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#211922] text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm">
            <CheckCircle size={16} style={{color: "#4ade80"}}/>{addedToast}
          </div>
        )}
      </div>
    );
  };

  const SearchScreen = () => {
    const [localSearchMode, setLocalSearchMode] = useState(role === "sales" ? "deal" : searchMode);
    const [selectedSearchJD, setSelectedSearchJD] = useState(JDS[0]);
    const [selectedSearchDeal, setSelectedSearchDeal] = useState(DEALS[0]);
    const [selectedCompany, setSelectedCompany] = useState(COMPANIES[0]);
    const [freeQuery, setFreeQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [searchDone, setSearchDone] = useState(false);

    const doSearch = () => {
      const jd = localSearchMode === "jd" ? selectedSearchJD : localSearchMode === "deal" ? JDS.find(j => j.dealId === selectedSearchDeal.id) || JDS[0] : JDS[0];
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
        <PageHeader title="候補者探索" subtitle={role === "customer" ? "JD・AIに相談の2つのモードで候補者を探索" : role === "sales" ? "商談・企業・AIに相談の3つのモードで候補者を探索" : "JD・企業・AIに相談の3つのモードで候補者を探索"}/>
        <Card className="p-4 mb-6">
          <div className="inline-flex gap-1 p-1 bg-[#e5e5e0]/50 rounded-lg mb-4 tf-search-tabs flex-wrap">
            {[...(role !== "sales" ? [{ id: "jd", label: "JDから探す", icon: <FileText size={16}/> }] : []), ...(role === "sales" ? [{ id: "deal", label: "商談から探す", icon: <Briefcase size={16}/> }] : []), ...(role !== "customer" ? [{ id: "company", label: "企業特性から探す", icon: <Building2 size={16}/> }] : []), { id: "free", label: "AIに相談して探す", icon: <Brain size={16}/> }].map(m => (
              <button key={m.id} onClick={() => { setLocalSearchMode(m.id); setSearchDone(false); }} className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ${localSearchMode === m.id ? "bg-[#e60023] text-white" : "text-[#91918c] hover:text-[#211922] hover:bg-[#e5e5e0]/50"}`}>{m.icon}{m.label}</button>
            ))}
          </div>

          {localSearchMode === "jd" && (
            <div className="flex gap-3 items-end">
              <div className="flex-1"><label className="text-xs text-[#91918c] mb-1 block">JDを選択</label><select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={selectedSearchJD?.id} onChange={e => setSelectedSearchJD(JDS.find(j => j.id === e.target.value))}>{JDS.map(j => <option key={j.id} value={j.id}>{j.title}（{j.id}）</option>)}</select></div>
              <button onClick={doSearch} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-6 py-2 text-sm flex items-center gap-2"><Search size={16}/>検索</button>
            </div>
          )}
          {localSearchMode === "deal" && (
            <div className="flex gap-3 items-end">
              <div className="flex-1"><label className="text-xs text-[#91918c] mb-1 block">商談を選択</label><select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" value={selectedSearchDeal?.id} onChange={e => setSelectedSearchDeal(DEALS.find(d => d.id === e.target.value))}>{DEALS.map(d => <option key={d.id} value={d.id}>{d.name}（{d.customer}）</option>)}</select></div>
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
                <textarea className="flex-1 border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 resize-none h-16" placeholder="例：インフラ志向で東京勤務可能、AWSの基礎があり、設計に伸ばせそうな若手" value={freeQuery} onChange={e => setFreeQuery(e.target.value)}/>
                <button onClick={freeSearch} disabled={!freeQuery || freeSearching} className="bg-[#211922] hover:bg-[#2e2630] rounded-2xl text-white px-6 py-2 text-sm flex items-center gap-2 self-end disabled:opacity-50">
                  {freeSearching ? <RefreshCw size={16} className="animate-spin"/> : <Sparkles size={16}/>}AI検索
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                {["インフラ志向で東京勤務可、AWSの基礎あり、設計に伸ばせそうな若手", "PM経験豊富でDX推進ができる人", "モバイル開発ができるエンジニア"].map(ex => (
                  <button key={ex} onClick={() => setFreeQuery(ex)} className="text-xs bg-[#e5e5e0]/50 hover:bg-[#e5e5e0] text-[#62625b] px-3 py-1.5 rounded-full transition-colors truncate max-w-xs">{ex}</button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {freeSearching && <LoadingAI text="AIが条件を解析し候補者を検索中..."/>}
        {companySearching && <LoadingAI text="AIが企業特性を分析し候補者をマッチング中..."/>}

        {searchDone && searchResults && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-[#211922]">検索結果: {searchResults.length}名</h3>
                {localSearchMode === "free" && <AIBadge/>}
              </div>
              <div className="flex items-center gap-2 text-xs text-[#91918c]">
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#62625b] rounded-full"></div>即提案可能: {searchResults.filter(c => c.immediateProposal).length}名</span>
                {role !== "sales" && <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#91918c] rounded-full"></div>育成で提案可能: {searchResults.filter(c => c.trainableProposal).length}名</span>}
              </div>
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
          targetRole: targetJD?.title || "エンジニア",
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
                  <button onClick={() => navigate("my-training")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">詳細 →</button>
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
                <button onClick={() => navigate("my-profile")} className="text-xs font-medium text-[#91918c] hover:text-[#211922]">編集 →</button>
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
                <button onClick={() => navigate("my-profile")} className="w-full text-left text-sm p-4 rounded-lg hover:bg-[#f6f6f3] flex items-center gap-2.5 border border-[#e5e5e0]"><Edit3 size={14}/>プロフィール編集</button>
                <button onClick={() => navigate("my-assessments")} className="w-full text-left text-sm p-4 rounded-lg hover:bg-[#f6f6f3] flex items-center gap-2.5 border border-[#e5e5e0]"><Award size={14}/>アセスメント受験</button>
                <button onClick={() => navigate("my-resume")} className="w-full text-left text-sm p-4 rounded-lg hover:bg-[#f6f6f3] flex items-center gap-2.5 border border-[#e5e5e0]"><FileText size={14}/>職務経歴書確認</button>
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
              <div><label className="text-xs text-[#91918c] mb-1 block">キャリア志向</label><textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 h-20 resize-none" defaultValue={c.aspiration}/></div>
              <div><label className="text-xs text-[#91918c] mb-1 block">やりたい仕事</label><textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 h-16 resize-none" defaultValue={c.wantToDo}/></div>
              <div><label className="text-xs text-[#91918c] mb-1 block">避けたい仕事</label><textarea className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200 h-16 resize-none" defaultValue={c.avoidToDo}/></div>
              <div className="grid grid-cols-2 tf-grid-2 gap-4">
                <div><label className="text-xs text-[#91918c] mb-1 block">希望勤務地</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" defaultValue={c.location}/></div>
                <div><label className="text-xs text-[#91918c] mb-1 block">案件変更意向</label><select className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" defaultValue={c.changeIntent}><option>積極的に検討中</option><option>良い案件があれば検討</option><option>条件次第で検討</option><option>現在の案件に満足</option></select></div>
              </div>
              <div className="grid grid-cols-2 tf-grid-2 gap-4">
                <div><label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked={c.remoteOk} className="rounded border-[#e5e5e0] text-[#211922] focus:ring-slate-200"/>リモート勤務可</label></div>
                <div><label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked={c.onsiteOk} className="rounded border-[#e5e5e0] text-[#211922] focus:ring-slate-200"/>出社勤務可</label></div>
              </div>
              <div><label className="text-xs text-[#91918c] mb-1 block">稼働条件</label><input className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e60023]/10 focus:border-[#c8c8c1] transition-all duration-200" defaultValue={c.workCondition}/></div>
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
      { q: `${exam.skill}において、可用性を高めるために一般的に使用されるアーキテクチャパターンはどれですか？`, opts: ["シングルAZ構成", "マルチAZ構成", "オンプレミスのみ", "手動フェイルオーバー"], correct: 1 },
      { q: `${exam.skill}の${exam.level}レベルで求められるスキルとして最も適切なものはどれですか？`, opts: ["基本用語の理解のみ", "設計・構築・運用の実践力", "概念の暗記", "ドキュメント読解のみ"], correct: 1 },
      { q: `インフラ自動化において${exam.skill}と組み合わせて使われることが多いツールはどれですか？`, opts: ["Photoshop", "Terraform", "Excel", "PowerPoint"], correct: 1 },
      { q: `${exam.skill}環境でのセキュリティベストプラクティスとして正しいものはどれですか？`, opts: ["全ポート開放", "最小権限の原則", "パスワードの共有", "ログの無効化"], correct: 1 },
      { q: `${exam.skill}のコスト最適化アプローチとして適切なものはどれですか？`, opts: ["常に最大スペック", "リザーブドインスタンスの活用", "監視の停止", "手動スケーリングのみ"], correct: 1 },
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
          <button onClick={() => navigate("my-assessments")} className="bg-[#e60023] text-white rounded-2xl transition-all duration-200 px-6 py-2.5 text-sm font-medium">アセスメント一覧に戻る</button>
        </Card>
      </div>
    );
  };

  const MyAssessmentsScreen = () => {
    const c = candidateProfile;
    return (
      <div>
        <PageHeader title="スキルアセスメント" subtitle="スキルレベルを定量的に測定" onBack={goBack}/>
        <div className="grid grid-cols-2 tf-grid-2 gap-6">
          <Card className="p-5">
            <h3 className="font-medium text-[#211922] mb-4">アセスメント結果</h3>
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
            <h3 className="font-medium text-[#211922] mb-4">受験可能なアセスメント</h3>
            <div className="space-y-3">
              {[{ skill: "AWS", level: "中級", duration: "30分", status: "受験済み" }, { skill: "Terraform", level: "初級", duration: "20分", status: "未受験" }, { skill: "Docker", level: "初級", duration: "20分", status: "未受験" }, { skill: "Linux", level: "中級", duration: "25分", status: "受験済み" }].map((a, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#f6f6f3]/60 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-[#211922]">{a.skill} {a.level}</div>
                    <div className="text-xs text-[#91918c]">所要時間: {a.duration}</div>
                  </div>
                  <button onClick={() => navigate("assessment-take", { candidate: a })} className={`text-xs px-3 py-1.5 rounded-lg font-medium ${a.status === "受験済み" ? "bg-green-50 text-[#211922] border border-green-200 hover:bg-[#e5e5e0]" : "bg-[#e60023] text-white hover:bg-[#cc001f]"}`}>
                    {a.status === "受験済み" ? "再受験" : "受験する"}
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
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
              <button onClick={() => navigate("my-assessments")} className="w-full text-sm text-[#211922] hover:text-[#211922] flex items-center gap-2 justify-center p-2"><Award size={14}/>再アセスメントを受ける</button>
            </Card>
          </div>
        </div>
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
                  {rc.showName ? `${c.name}は` : "本候補者は"}、IT業界で{c.totalYears}年の経験を持つエンジニアです。
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
                <p className="text-[#211922] leading-relaxed">{c.name}は、IT業界で{c.totalYears}年の経験を持つエンジニアです。{c.careerHistory[0]?.detail} {c.aspiration}という志向を持ち、{c.wantToDo}に注力しています。</p>
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
  const renderScreen = () => {
    switch (screen) {
      // Customer
      case "jd-create": return <JDCreateScreen/>;
      case "jd-list": return <JDListScreen/>;
      case "candidate-list": return <CandidateListScreen/>;
      case "favorites": return <FavoritesListScreen/>;
      case "candidate-detail": return <CandidateDetailScreen/>;
      // Sales
      case "sales-dashboard": return <SalesDashboardScreen/>;
      case "available-candidates": return <AvailableCandidatesScreen/>;
      case "assignment-list": return <AssignmentListScreen/>;
      case "deals": return <DealsScreen/>;
      case "deal-detail": return <DealDetailScreen/>;
      case "search": return <SearchScreen/>;
      // Admin
      case "dashboard": return <DashboardScreen/>;
      case "plans": return <PlansScreen/>;
      case "plan-create": return <PlanCreateScreen/>;
      case "plan-detail": return <PlanDetailScreen/>;
      case "assessment-gen": return <AssessmentGenScreen/>;
      case "training": return <TrainingScreen/>;
      case "training-detail": return <TrainingDetailScreen/>;
      case "admin-resume": return <AdminResumeScreen/>;
      // Candidate
      case "my-page": return <MyPageScreen/>;
      case "my-profile": return <MyProfileScreen/>;
      case "my-career": return <MyCareerScreen/>;
      case "my-assessments": return <MyAssessmentsScreen/>;
      case "assessment-take": return <AssessmentTakeScreen/>;
      case "my-training": return <MyTrainingScreen/>;
      case "my-resume": return <MyResumeScreen/>;
      default: return role === "sales" ? <SalesDashboardScreen/> : role === "candidate" ? <MyPageScreen/> : role === "customer" ? <JDCreateScreen/> : <DashboardScreen/>;
    }
  };

  return (
    <div className="flex min-h-screen" style={{background: MORPHY.bg, fontFamily: MORPHY.font, color: MORPHY.textPrimary, WebkitFontSmoothing: "antialiased"}}>
      <ResponsiveStyles/>
      <SideNav/>
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Mobile header */}
        <div className="tf-mobile-header">
          <button onClick={() => setMobileMenuOpen(true)} className="p-1"><List size={22} className="text-white"/></button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center" style={{background: MORPHY.red, borderRadius: "8px"}}><Layers size={12} className="text-white"/></div>
            <span className="text-sm font-semibold text-white">TalentFlow</span>
          </div>
          <span className="text-xs ml-auto" style={{color: "rgba(255,255,255,0.5)"}}>{role === "sales" ? "営業" : role === "admin" ? "管理者" : role === "customer" ? "顧客" : "候補者"}</span>
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
              placeholder="例: クラウドエンジニア募集"
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