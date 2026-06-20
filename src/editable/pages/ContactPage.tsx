'use client'

import { FileText, Mail, Megaphone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: FileText, title: 'Editorial desk', body: 'Send story ideas, corrections, source material, and publication questions.' },
  { icon: Megaphone, title: 'Media partnerships', body: 'Discuss distribution, syndication, newsroom collaborations, and campaigns.' },
  { icon: Mail, title: 'General support', body: 'Reach the team for account, publishing, or site-related help.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[#111]">
        <section className="border-b border-black bg-white">
          <div className="mx-auto max-w-[1120px] px-4 py-9 sm:px-6 lg:px-8 lg:py-12">
            <p className="publication-kicker text-[#e87f24]">{pagesContent.contact.eyebrow}</p>
            <h1 className="editorial-serif mt-3 max-w-4xl text-4xl font-black leading-[.95] tracking-[-.05em] sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl border-l-4 border-[#e87f24] pl-5 text-base leading-7 text-black/65">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1120px] gap-7 px-4 py-8 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8 lg:py-10">
          <aside className="border-t-4 border-black bg-black text-white">
            {desks.map((desk, index) => (
              <div key={desk.title} className="border-b border-white/25 p-5 last:border-b-0">
                <div className="flex items-center justify-between"><desk.icon className="h-5 w-5 text-[#ffc81e]" /><span className="text-xs font-black text-white/45">0{index + 1}</span></div>
                <h2 className="editorial-serif mt-4 text-2xl font-black">{desk.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">{desk.body}</p>
              </div>
            ))}
          </aside>
          <div className="border border-black bg-[var(--slot4-surface-bg)] p-5 shadow-[8px_8px_0_#d8e7f0] sm:p-7">
            <p className="publication-kicker text-[#e87f24]">Send a message</p>
            <h2 className="editorial-serif mt-2 text-3xl font-black sm:text-4xl">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
