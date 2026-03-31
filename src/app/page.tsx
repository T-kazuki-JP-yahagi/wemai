import Link from 'next/link'
import { NavBar } from '@/components/ui/NavBar'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2744] to-[#1e3a5f] py-24 px-6 text-white">
        <div className="max-w-5xl mx-auto text-center animate-fade-slide-in">
          <div className="inline-block bg-orange-500/20 text-orange-300 text-sm font-semibold px-4 py-1 rounded-full mb-6">
            🌸 Claude Code 設定を5分でセットアップ
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            あなたの AI 環境を、<br />
            <span className="text-orange-400">あなた専用に</span> 設定する
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10">
            WeMAI は 7 つの質問に答えるだけで、Claude Code に最適な設定ファイル一式を自動生成します。
            もう手動設定は不要です。
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup" className="btn-primary text-base px-8 py-3">
              無料で始める →
            </Link>
            <Link href="/wizard" className="btn-secondary border-white text-white text-base px-8 py-3">
              デモを体験する
            </Link>
          </div>
          <p className="text-slate-400 text-sm mt-4">
            クレジットカード不要 · 5分でセットアップ完了
          </p>
        </div>

        {/* Terminal mockup */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-[#0f172a] rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1e293b]">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-slate-400 text-xs ml-2 font-mono">wemai_output/</span>
            </div>
            <div className="p-5 font-mono text-sm space-y-1">
              <p className="text-green-400">✓ CLAUDE.md を生成しました</p>
              <p className="text-green-400">✓ .claude/settings.json を生成しました</p>
              <p className="text-green-400">✓ .claude/mcp_config.json を生成しました</p>
              <p className="text-green-400">✓ .claude/slash_commands.md を生成しました</p>
              <p className="text-slate-500 mt-2">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
              <p className="text-slate-300">
                4ファイル生成完了{' '}
                <span className="text-orange-400">（2.1秒）</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#0f2744] mb-2">
            なぜ WeMAI？
          </h2>
          <p className="text-slate-500 text-center mb-12">
            Claude Code のセットアップに費やす時間をゼロにします
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🧙',
                title: '7問ウィザード',
                desc: 'プロジェクト特性・チーム規模・ツール構成を答えるだけ。難しい設定は一切不要です。',
              },
              {
                emoji: '⚡',
                title: '瞬時に生成',
                desc: '回答完了と同時に CLAUDE.md など 4 ファイルを自動生成。即ダウンロード可能。',
              },
              {
                emoji: '🔄',
                title: '何度でも再生成',
                desc: 'プロジェクトが変わったら再実行。過去の設定履歴もいつでも確認できます。',
              },
            ].map((f) => (
              <div key={f.title} className="text-center p-6">
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="font-bold text-[#0f2744] mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#0f2744] mb-2">
            シンプルな料金プラン
          </h2>
          <p className="text-slate-500 mb-12">まずは無料で試してみてください</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="plan-card">
              <div className="font-bold text-[#0f2744] mb-1">Free</div>
              <div className="text-3xl font-black text-[#0f2744] mb-1">¥0</div>
              <div className="text-slate-400 text-sm mb-5">ずっと無料</div>
              <Link href="/signup" className="block w-full btn-outline text-center">
                無料で始める
              </Link>
            </div>
            <div className="plan-card popular">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                おすすめ
              </div>
              <div className="font-bold text-[#0f2744] mb-1">Pro</div>
              <div className="text-3xl font-black text-[#0f2744] mb-1">
                ¥980<span className="text-base font-normal text-slate-400"> 買い切り</span>
              </div>
              <div className="text-orange-500 font-semibold text-sm mb-5">一度購入で永久利用</div>
              <Link href="/upgrade" className="block w-full btn-primary text-center">
                Pro を購入する
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f2744] text-slate-400 py-10 px-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-black text-xl mb-1">
              We<span className="text-orange-400">MAI</span>
            </div>
            <p className="text-xs">Welcome My AI — Claude Code 向け設定ウィザード</p>
            <p className="text-xs mt-1">
              Powered by{' '}
              <a
                href="https://claude.ai"
                className="text-orange-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Claude
              </a>{' '}
              (Anthropic)
            </p>
          </div>
          <div className="text-xs text-center md:text-right space-y-2">
            <div>
              <a
                href="https://x.com/yahagi_kongou"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                お問い合わせ（X）
              </a>
            </div>
            <p>© 2025 WeMAI. All rights reserved.</p>
            <p className="text-slate-500">
              Claude は Anthropic の商標です。本サービスは Anthropic が提供するものではありません。
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
