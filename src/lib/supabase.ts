import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// クライアントサイド用（匿名キー）
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// サーバーサイド用（Service Role Key）
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// ===== 型定義 =====
export interface WizardSessionRow {
  id: string
  user_id: string
  answers: Record<string, unknown>
  file_keys: string[]
  created_at: string
}

// ===== ヘルパー関数 =====

/** ユーザーのウィザードセッション履歴を取得 */
export async function getWizardSessions(userId: string): Promise<WizardSessionRow[]> {
  const { data, error } = await supabase
    .from('wizard_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('[supabase] getWizardSessions error:', error)
    return []
  }
  return data ?? []
}

/** ウィザードセッションを保存 */
export async function saveWizardSession(
  userId: string,
  answers: Record<string, unknown>,
  fileKeys: string[],
): Promise<string | null> {
  const server = createServerClient()
  const { data, error } = await server
    .from('wizard_sessions')
    .insert({
      user_id: userId,
      answers,
      file_keys: fileKeys,
    })
    .select('id')
    .single()

  if (error) {
    console.error('[supabase] saveWizardSession error:', error)
    return null
  }
  return data?.id ?? null
}
