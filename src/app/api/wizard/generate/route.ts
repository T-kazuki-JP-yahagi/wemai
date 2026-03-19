import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { generateFiles } from '@/lib/wizard/generator'
import type { GeneratedFileKey } from '@/types'

// ===== バリデーションスキーマ =====
const AnswersSchema = z.object({
  q1_projectType: z.string().min(1),
  q2_language: z.string().min(1),
  q3_teamSize: z.string().min(1),
  q4_reviewStyle: z.string().min(1),
  q5_tools: z.array(z.string()),
  q6_instructionStyle: z.string().min(1),
  q7_files: z.array(z.enum(['CLAUDE.md', 'settings.json', 'mcp_config.json', 'slash_commands.md'])),
})

// Free プランで許可されるファイル
const FREE_ALLOWED_FILES: GeneratedFileKey[] = ['CLAUDE.md', 'settings.json']

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    const body = await req.json()
    const parsed = AnswersSchema.safeParse(body.answers)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: '入力データが不正です', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const answers = parsed.data

    // Free プランのゲーティング（未認証 or 後でプランチェック追加）
    let allowedFiles = answers.q7_files as GeneratedFileKey[]

    if (!userId) {
      // 未認証ユーザーは Free 制限（デモ目的で許容）
      allowedFiles = allowedFiles.filter((f) => FREE_ALLOWED_FILES.includes(f))
    }
    // TODO: userId があれば Supabase からプランを取得して pro チェック

    // ファイル生成
    const files = generateFiles(answers, allowedFiles)

    // TODO: Supabase に wizard_session を保存

    return NextResponse.json({
      success: true,
      files,
      sessionId: `sess_${Date.now()}`,
    })
  } catch (error) {
    console.error('[wizard/generate] error:', error)
    return NextResponse.json(
      { success: false, error: 'サーバーエラーが発生しました' },
      { status: 500 },
    )
  }
}
