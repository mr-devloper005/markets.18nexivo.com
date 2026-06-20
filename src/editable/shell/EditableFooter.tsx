'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-black bg-black text-white">
      <div className="mx-auto max-w-[1800px] px-5 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.45fr_.75fr_.75fr_.75fr]">
          <div>
            <Link href="/" className="editorial-brand text-5xl font-black text-[#ffc81e] sm:text-6xl">{SITE_CONFIG.name}</Link>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65">{globalContent.footer?.description || SITE_CONFIG.description}</p>
            <form action="/signup" className="mt-8 flex max-w-xl border border-white/35">
              <input name="email" type="email" placeholder="Email for monthly notes" className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm outline-none placeholder:text-white/40" />
              <button className="bg-[#e87f24] px-5 text-xs font-black uppercase tracking-[.14em]">Subscribe</button>
            </form>
          </div>
          <FooterColumn title="Explore"><Link href="/" className="footer-link">Latest stories</Link><Link href="/search" className="footer-link">Archive</Link></FooterColumn>
          <FooterColumn title="Publication"><Link href="/about" className="footer-link">About</Link><Link href="/contact" className="footer-link">Contact</Link>{session ? <button onClick={logout} className="footer-link text-left">Logout</button> : <><Link href="/login" className="footer-link">Log in</Link><Link href="/signup" className="footer-link">Subscribe</Link></>}</FooterColumn>
          <div><h3 className="border-b border-white/25 pb-3 text-sm font-bold">Stay in touch</h3><p className="mt-4 text-sm leading-7 text-white/60">Receive one concise note when there is something genuinely useful to share.</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 border-b border-[#ffc81e] pb-1 text-sm font-bold text-[#ffc81e]">Contact the desk <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </div>
      <div className="border-t border-white/20 px-4 py-5 text-center text-[10px] font-black uppercase tracking-[.18em] text-white/45">© {year} {SITE_CONFIG.name}. Independent media and public information.</div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return <div><h3 className="border-b border-white/25 pb-3 text-sm font-bold">{title}</h3><div className="mt-4 grid gap-3">{children}</div></div>
}
