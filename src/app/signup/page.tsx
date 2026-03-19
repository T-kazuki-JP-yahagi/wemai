'use client'

import { SignUp } from '@clerk/nextjs'
import { SakuraIcon } from '@/components/ui/SakuraIcon'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f2744] to-[#1e3a5f]">
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-white font-black text-3xl">
                We<span className="text-orange-400">MAI</span>
              </span>
              <SakuraIcon size={36} />
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-2">
            <SignUp
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none border-0 w-full',
                  headerTitle: 'text-[#0f2744] font-black',
                  headerSubtitle: 'text-slate-500',
                  formButtonPrimary:
                    'bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors',
                  footerActionLink: 'text-orange-500 hover:text-orange-600 font-semibold',
                },
              }}
              redirectUrl="/account"
              signInUrl="/login"
            />
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center py-4 text-slate-400 text-xs">
        <p>
          Powered by{' '}
          <a href="https://claude.ai" className="text-orange-400 underline" target="_blank" rel="noopener noreferrer">
            Claude
          </a>{' '}
          (Anthropic)
        </p>
      </div>
    </div>
  )
}
