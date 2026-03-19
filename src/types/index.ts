// ===== ユーザープラン =====
export type Plan = 'free' | 'pro_monthly' | 'pro_annual' | 'team'

// ===== ウィザード回答 =====
export interface WizardAnswers {
  q1_projectType: string      // Webアプリ / モバイル / CLI / データ・ML / その他
  q2_language: string         // TypeScript / JavaScript / Python / Go / その他
  q3_teamSize: string         // ソロ / 2-5人 / 6-15人 / 16人以上
  q4_reviewStyle: string      // 厳格 / 標準 / スピード優先
  q5_tools: string[]          // GitHub / Jira / Slack / Figma / Notion / AWS など（複数選択）
  q6_instructionStyle: string // 詳細・丁寧 / バランス / コンパクト
  q7_files: GeneratedFileKey[]// 生成するファイル種類（複数選択）
}

// ===== 生成ファイル =====
export type GeneratedFileKey =
  | 'CLAUDE.md'
  | 'settings.json'
  | 'mcp_config.json'
  | 'slash_commands.md'

export interface GeneratedFile {
  key: GeneratedFileKey
  filename: string
  content: string
  isPro: boolean
}

// ===== ウィザードセッション（DB） =====
export interface WizardSession {
  id: string
  userId: string
  answers: WizardAnswers
  generatedFiles: GeneratedFile[]
  createdAt: string
  updatedAt: string
}

// ===== API レスポンス =====
export interface GenerateResponse {
  success: boolean
  files?: GeneratedFile[]
  sessionId?: string
  error?: string
}

// ===== ウィザード UI 定義 =====
export type SelectionMode = 'single' | 'multi'

export interface WizardOption {
  value: string
  label: string
  emoji?: string
  description?: string
  proOnly?: boolean
}

export interface WizardQuestion {
  id: keyof WizardAnswers
  step: number
  title: string
  subtitle: string
  mode: SelectionMode
  options: WizardOption[]
}
