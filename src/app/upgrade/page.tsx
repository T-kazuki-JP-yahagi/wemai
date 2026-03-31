import Link from 'next/link'
import { NavBar } from '@/components/ui/NavBar'

const STRIPE_PRO_LINK = process.env.NEXT_PUBLIC_STRIPE_PRO_LINK || '/signup'

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

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-16 animate-fade-slide-in">
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
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
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

          {/* Pro 買い切り */}
          <div className="plan-card popular">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
              おすすめ
            </div>
            <div className="font-bold text-[#0f2744] mb-1 text-lg">Pro</div>
            <div className="text-4xl font-black text-[#0f2744] mb-1">
              ¥980<span className="text-base font-normal text-slate-400"> 買い切り</span>
            </div>
            <div className="text-orange-500 font-semibold text-sm mb-6">一度購入で永久利用</div>
            <ul className="space-y-2 text-sm mb-8">
              {features.pro.map((f) => (
                <li key={f} className="text-slate-600 font-medium">
                  {f}
                </li>
              ))}
            </ul>
            <a href={STRIPE_PRO_LINK} className="block w-full btn-primary text-center">
              Pro を購入する
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-2xl mx-auto">
          <h2 className="font-bold text-[#0f2744] mb-6 text-lg">よくある質問</h2>
          <dl className="space-y-5">
            {[
              {
                q: '買い切りとはどういう意味ですか？',
                a: '一度購入すると、以降は追加料金なしで Pro のすべての機能を永久にご利用いただけます。サブスクリプションではないので毎月の請求はありません。',
              },
              {
                q: '支払い方法は何が使えますか？',
                a: 'Stripe 経由でクレジットカード（Visa, Mastercard, AmEx, JCB）が利用できます。',
              },
              {
                q: 'Pro を購入すると過去の設定は引き継がれますか？',
                a: 'はい。アカウントに紐付いた生成履歴はそのまま引き継がれます。',
              },
              {
                q: 'Free プランでも十分使えますか？',
                a: 'CLAUDE.md と settings.json の生成は Free プランでも無制限に利用できます。より高度な MCP 設定やカスタムコマンドが必要な方は Pro をご検討ください。',
              },
              {
                q: 'お問い合わせはどこからできますか？',
                a: 'X（旧Twitter）アカウント @yahagi_kongou までお気軽にご連絡ください。',
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold text-[#0f2744] mb-1">{q}</dt>
                <dd className="text-slate-500 text-sm">{a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <a
              href="https://x.com/yahagi_kongou"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0f2744] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @yahagi_kongou にお問い合わせ
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
