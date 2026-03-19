import type { WizardQuestion } from '@/types'

export const WIZARD_QUESTIONS: WizardQuestion[] = [
  {
    id: 'q1_projectType',
    step: 1,
    title: 'プロジェクトタイプを教えてください',
    subtitle: '最も近いものを選んでください（単一選択）',
    mode: 'single',
    options: [
      { value: 'web', label: 'Web アプリ', emoji: '🌐' },
      { value: 'mobile', label: 'モバイルアプリ', emoji: '📱' },
      { value: 'cli', label: 'CLI / バックエンド', emoji: '⚙️' },
      { value: 'data', label: 'データ / ML', emoji: '📊' },
    ],
  },
  {
    id: 'q2_language',
    step: 2,
    title: '主な開発言語を教えてください',
    subtitle: 'メインで使用する言語を選んでください',
    mode: 'single',
    options: [
      { value: 'typescript', label: 'TypeScript', emoji: 'TS' },
      { value: 'javascript', label: 'JavaScript', emoji: 'JS' },
      { value: 'python', label: 'Python', emoji: 'Py' },
      { value: 'go', label: 'Go', emoji: 'Go' },
    ],
  },
  {
    id: 'q3_teamSize',
    step: 3,
    title: 'チームサイズを教えてください',
    subtitle: '開発に関わる人数を選んでください',
    mode: 'single',
    options: [
      { value: 'solo', label: '個人（ソロ開発）', emoji: '👤' },
      { value: 'small', label: '小規模（2〜5人）', emoji: '👥' },
      { value: 'mid', label: '中規模（6〜15人）', emoji: '🏢' },
      { value: 'large', label: '大規模（16人以上）', emoji: '🏭' },
    ],
  },
  {
    id: 'q4_reviewStyle',
    step: 4,
    title: 'コードレビューのスタイルは？',
    subtitle: 'Claude Code の提案精度を最適化します',
    mode: 'single',
    options: [
      {
        value: 'strict',
        label: '厳格モード',
        emoji: '🔒',
        description: '型安全・テストカバレッジ・Lint 準拠を最優先',
      },
      {
        value: 'standard',
        label: '標準モード',
        emoji: '⚖️',
        description: '品質と開発速度のバランスを重視',
      },
      {
        value: 'speed',
        label: 'スピード優先',
        emoji: '🚀',
        description: 'プロトタイプ・スタートアップ向けに速度最優先',
      },
    ],
  },
  {
    id: 'q5_tools',
    step: 5,
    title: '使用しているツールを選んでください',
    subtitle: '複数選択可 — MCP 設定を自動最適化します',
    mode: 'multi',
    options: [
      { value: 'github', label: 'GitHub', emoji: '🐙' },
      { value: 'jira', label: 'Jira', emoji: '📋' },
      { value: 'slack', label: 'Slack', emoji: '💬' },
      { value: 'figma', label: 'Figma', emoji: '🎨' },
      { value: 'notion', label: 'Notion', emoji: '📝' },
      { value: 'aws', label: 'AWS / GCP', emoji: '☁️' },
    ],
  },
  {
    id: 'q6_instructionStyle',
    step: 6,
    title: 'AI への指示スタイルを選んでください',
    subtitle: 'CLAUDE.md の詳細度に影響します',
    mode: 'single',
    options: [
      {
        value: 'detailed',
        label: '詳細・丁寧',
        emoji: '📖',
        description: '全てのルールを明文化。大規模チーム・厳格な品質管理向け',
      },
      {
        value: 'balanced',
        label: 'バランス型',
        emoji: '⚖️',
        description: '必要な情報を簡潔にまとめた標準スタイル',
      },
      {
        value: 'compact',
        label: 'コンパクト',
        emoji: '⚡',
        description: '最小限の指示でシンプルに。個人・小規模向け',
      },
    ],
  },
  {
    id: 'q7_files',
    step: 7,
    title: '生成するファイルを選んでください',
    subtitle: '複数選択可',
    mode: 'multi',
    options: [
      {
        value: 'CLAUDE.md',
        label: 'CLAUDE.md',
        emoji: '📄',
        description: 'AI への基本指示・プロジェクトコンテキスト',
      },
      {
        value: 'settings.json',
        label: 'settings.json',
        emoji: '⚙️',
        description: 'Claude Code の動作設定・権限管理',
      },
      {
        value: 'mcp_config.json',
        label: 'mcp_config.json',
        emoji: '🔌',
        description: 'MCP サーバー接続設定',
        proOnly: true,
      },
      {
        value: 'slash_commands.md',
        label: 'slash_commands.md',
        emoji: '📚',
        description: 'カスタムスラッシュコマンド一覧',
        proOnly: true,
      },
    ],
  },
]

export const TOTAL_STEPS = WIZARD_QUESTIONS.length
