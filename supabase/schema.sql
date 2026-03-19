-- WeMAI Supabase Schema

-- ユーザーのプラン情報
CREATE TABLE IF NOT EXISTS user_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL DEFAULT 'free', -- 'free' | 'pro_monthly' | 'pro_yearly'
  status TEXT NOT NULL DEFAULT 'active', -- 'active' | 'cancelled' | 'past_due'
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ウィザードセッション履歴
CREATE TABLE IF NOT EXISTS wizard_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL, -- Clerk user ID
  answers JSONB NOT NULL,
  file_keys TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_wizard_sessions_user_id ON wizard_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_plans_clerk_user_id ON user_plans(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_user_plans_stripe_customer_id ON user_plans(stripe_customer_id);

-- RLS 設定（Supabase Row Level Security）
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE wizard_sessions ENABLE ROW LEVEL SECURITY;

-- Service Role はすべてにアクセス可能
CREATE POLICY "service_role_all_user_plans" ON user_plans
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all_wizard_sessions" ON wizard_sessions
  FOR ALL TO service_role USING (true) WITH CHECK (true);
