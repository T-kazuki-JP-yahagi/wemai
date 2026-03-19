import Link from 'next/link'
import { NavBar } from '@/components/ui/NavBar'

const STRIPE_MONTHLY_LINK = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_LINK || '/signup'
const STRIPE_YEARLY_LINK = process.env.NEXT_PUBLIC_STRIPE_YEARLY_LINK || '/signup'

const features = {
  free: [
    '✓ CLAUDE.md の生成',
    '✓ settings.json の生成',
    '✓ 無制限の再生成',
    '✗ mcp_config.json（Pro のみ）',
    '✗ slash_commands.md（Pro のみ）',
    '✗ 生成履歴の保存（Pro のみ）',
  ],
  pro: [
    '✓ CLAUDE.md の生成',
    '✓ settings.json の生成',
    '✓ mcp_config.json の生成',
    '✓ slash_commands.md の生成',
    '✓ 生成履歴の保存・管理',
    '✓ 優先サポート',
  ],
}

export default function UpgradePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <NavBar backHref="/account" backLabel="マイページへ" />

      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 animate-fade-slide-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-orange-100 text-orange-600 text-sm font-bold px-4 py-1 rounded-full mb-4">
            ⭐ Pro にアップグレード
          </div>
          <h1 className="text-3xl font-black text-[#0f2744] mb-3">
            すべての設定ファイルを<br />
            <span className="text-orange-500">まるごと生成</span>しよう
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Pro プランなら MCP 設定・カスタムコマンドも自動生成。
            Claude Code を最大限に活用できます。
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Free */}
          <div className="plan-card">
            <div className="font-bold text-[#0f2744] mb-1 text-lg">Free</div>
            <div className="text-4xl font-black text-[#0f2744] mb-1">¥0</div>
            <div className="text-slate-400 text-sm mb-6">ずっと無料</div>
            <ul className="space-y-2 text-sm mb-8">
              {features.free.map((f) => (
                <li
                  key={f}
                  className={f.startsWith('✗') ? 'text-slate-300' : 'text-slate-600'}
                >
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="block w-full btn-outline text-center">
              無料で始める
            </Link>
          </div>

          {/* Pro Monthly */}
          <div className="plan-card popular">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
              人気
            </div>
            <div className="font-bold text-[#0f2744] mb-1 text-lg">Pro 月額</div>
            <div className="text-4xl font-black text-[#0f2744] mb-1">
              ¥500<span className="text-base font-normal text-slate-400">/月</span>
            </div>
            <div className="text-slate-400 text-sm mb-6">いつでも解約可能</div>
            <ul className="space-y-2 text-sm mb-8">
              {features.pro.map((f) => (
                <li key={f} className="text-slate-600 font-medium">
                  {f}
                </li>
              ))}
            </ul>
            <a href={STRIPE_MONTHLY_LINK} className="block w-full btn-primary text-center">
              月額 Pro を始める
            </a>
          </div>

          {/* Pro Yearly */}
          <div className="plan-card">
            <div className="font-bold text-[#0f2744] mb-1 text-lg">Pro 年額</div>
            <div className="text-4xl font-black text-[#0f2744] mb-1">
              ¥3,600<span className="text-base font-normal text-slate-400">/年</span>
            </div>
            <div className="text-orange-500 font-semibold text-sm mb-6">2ヶ月分お得（40%OFF）</div>
            <ul className="space-y-2 text-sm mb-8">
              {features.pro.map((f) => (
                <li key={f} className="text-slate-600 font-medium">
                  {f}
                </li>
              ))}
            </ul>
            <a href={STRIPE_YEARLY_LINK} className="block w-full btn-outline text-center">
              年額プランを選ぶ
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-2xl mx-auto">
          <h2 className="font-bold text-[#0f2744] mb-6 text-lg">よくある質問</h2>
          <dl className="space-y-5">
            {[
              {
                q: 'いつでも解約できますか？',
                a: 'はい。月額プランはいつでも解約可能で、次の更新日から課金が停止します。',
              },
              {
                q: '支払い方法は何が使えますか？',
                a: 'Stripe 経由でクレジットカード（Visa, Mastercard, AmEx, JCB）が利用できます。',
              },
              {
                q: 'Pro にアップグレードすると過去の設定は引き継がれますか？',
                a: 'はい。アカウントに紐付いた生成履歴はそのまま引き継がれます。',
              },
              {
                q: 'Free プランでも十分使えますか？',
                a: 'CLAUDE.md と settings.json の生成は Free プランでも無制限に利用できます。',
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold text-[#0f2744] mb-1">{q}</dt>
                <dd className="text-slate-500 text-sm">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
