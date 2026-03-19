# WeMAI — Welcome My AI

Claude Code 向け設定ファイル自動生成 Web サービス

## 概要

WeMAI は 7 つの質問に答えるだけで、Claude Code に最適な設定ファイル一式を自動生成する SaaS です。

**生成されるファイル**
- `CLAUDE.md` — プロジェクト概要・開発ガイドライン（Free / Pro）
- `.claude/settings.json` — Claude Code 設定（Free / Pro）
- `.claude/mcp_config.json` — MCP サーバー設定（Pro のみ）
- `.claude/slash_commands.md` — カスタムコマンド（Pro のみ）

## 技術スタック

| カテゴリ | 技術 |
|----------|------|
| フレームワーク | Next.js 14 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| 認証 | Clerk |
| 決済 | Stripe（Payment Links） |
| データベース | Supabase (PostgreSQL) |
| バリデーション | Zod |
| ZIP生成 | JSZip（クライアントサイド） |

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

```bash
cp .env.local.example .env.local
```

`.env.local` を開いて各変数を設定してください。

#### Clerk
- https://dashboard.clerk.com でアプリを作成
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` と `CLERK_SECRET_KEY` をコピー

#### Stripe
- https://dashboard.stripe.com で Payment Links を 3 つ作成
  - Pro 月額（¥500/月）
  - Pro 年額（¥3,600/年）
- `STRIPE_SECRET_KEY` と `STRIPE_WEBHOOK_SECRET` を設定
- Webhook エンドポイント: `https://your-domain.com/api/stripe/webhook`

#### Supabase
- https://supabase.com でプロジェクトを作成
- `supabase/schema.sql` を SQL エディタで実行
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` を設定

### 3. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 で確認できます。

## プロジェクト構成

```
src/
├── app/
│   ├── page.tsx              # ランディングページ
│   ├── layout.tsx            # ルートレイアウト (ClerkProvider)
│   ├── globals.css           # グローバルスタイル
│   ├── signup/page.tsx       # サインアップ
│   ├── login/page.tsx        # ログイン
│   ├── wizard/
│   │   ├── page.tsx          # 7問ウィザード
│   │   └── preview/page.tsx  # 生成結果プレビュー・DL
│   ├── account/page.tsx      # マイページ
│   ├── upgrade/page.tsx      # プラン・アップグレード
│   └── api/
│       ├── wizard/generate/route.ts   # ファイル生成 API
│       └── stripe/webhook/route.ts    # Stripe Webhook
├── components/ui/
│   ├── NavBar.tsx            # ナビゲーションバー
│   ├── Button.tsx            # ボタンコンポーネント
│   └── SakuraIcon.tsx        # 桜アイコン SVG
├── lib/
│   ├── supabase.ts           # Supabase クライアント
│   └── wizard/
│       ├── questions.ts      # 7問の定義
│       └── generator.ts      # ファイル生成エンジン
├── types/index.ts            # TypeScript 型定義
└── middleware.ts             # Clerk 認証ミドルウェア
```

## デプロイ

Vercel へのデプロイを推奨します。

```bash
vercel deploy
```

Environment Variables を Vercel Dashboard で設定してください。

## ライセンス

MIT

---

*Powered by [Claude](https://claude.ai) (Anthropic)*
