'use client'

import { useMemo, useState } from 'react'
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from 'docx'
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Code2,
  Download,
  FileText,
  Gauge,
  Info,
  LayoutDashboard,
  Linkedin,
  Menu,
  Minus,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  UserRound,
  X,
  Zap,
} from 'lucide-react'

type Tab = 'dashboard' | 'optimizer' | 'about'

const keywords = [
  { label: 'React', found: true, type: 'Técnica' },
  { label: 'TypeScript', found: true, type: 'Técnica' },
  { label: 'Next.js', found: true, type: 'Técnica' },
  { label: 'Liderança', found: true, type: 'Comportamental' },
  { label: 'Agile / Scrum', found: true, type: 'Processo' },
  { label: 'AWS', found: false, type: 'Técnica' },
  { label: 'Testes automatizados', found: false, type: 'Técnica' },
  { label: 'CI/CD', found: false, type: 'Processo' },
]

const baseResume = `Mariana Costa\nEngenheira de Software Sênior\n\nPERFIL PROFISSIONAL\nEngenheira de software com 8+ anos de experiência construindo produtos digitais escaláveis e liderando times multidisciplinares. Especialista em React, TypeScript e Next.js, com foco em qualidade de código, experiência do usuário e entrega contínua.\n\nEXPERIÊNCIA PROFISSIONAL\nTechNova · São Paulo, SP\nEngenheira de Software Sênior · 2021 — Presente\n• Liderança técnica de um squad de produto com 6 pessoas.\n• Desenvolvimento de aplicações web com React, TypeScript e Next.js.\n• Colaboração com produto e design em ambiente Agile / Scrum.\n\nFORMAÇÃO\nBacharelado em Sistemas de Informação · FIAP`

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [jobDescription, setJobDescription] = useState('Buscamos uma pessoa Engenheira de Software Sênior para liderar o desenvolvimento de aplicações web escaláveis. Requisitos: React, TypeScript, Next.js, AWS, testes automatizados e CI/CD. Experiência com liderança técnica e metodologias Agile / Scrum.')
  const [resume, setResume] = useState(baseResume)
  const [analyzed, setAnalyzed] = useState(false)
  const [copied, setCopied] = useState(false)

  const match = useMemo(() => {
    const text = `${jobDescription} ${resume}`.toLowerCase()
    return Math.round((keywords.filter((item) => text.includes(item.label.toLowerCase())).length / keywords.length) * 100)
  }, [jobDescription, resume])

  const handleCopy = async () => {
    await navigator.clipboard?.writeText(resume)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard de Análise', icon: LayoutDashboard },
    { id: 'optimizer' as Tab, label: 'Editor & Otimizador ATS', icon: FileText },
    { id: 'about' as Tab, label: 'Sobre o Projeto', icon: Info },
  ]

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-[#152b3a]">
      <header className="border-b border-[#dfe6eb] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#153d4a] text-[#9be7cf]"><Gauge /></div>
            <div>
              <div className="flex items-center gap-2"><span className="text-[15px] font-bold tracking-tight">ATS RESUME OPTIMIZER</span><span className="hidden rounded-full bg-[#e9f7f2] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#16866f] sm:inline">PRO</span></div>
              <p className="text-[11px] font-medium text-[#84919a]">Portfólio Professional · v2.4.0</p>
            </div>
          </div>
          <div className="hidden items-center gap-5 sm:flex">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#566873]"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#32b997] opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-[#32b997]" /></span> Motor de Análise Ativo</div>
            <div className="flex size-9 items-center justify-center rounded-full border border-[#dfe6eb] bg-[#f8fafb] text-[#61727c]"><Settings2 /></div>
            <div className="flex size-9 items-center justify-center rounded-full bg-[#d9f4eb] text-sm font-bold text-[#187964]">MC</div>
          </div>
          <button className="sm:hidden" aria-label="Abrir menu"><Menu /></button>
        </div>
        <nav className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-5 lg:px-10" aria-label="Navegação principal">
          {tabs.map((tab) => { const Icon = tab.icon; return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-xs font-semibold transition-colors ${activeTab === tab.id ? 'border-[#1b947e] text-[#147d6c]' : 'border-transparent text-[#788892] hover:text-[#183d4b]'}`}><Icon />{tab.label}</button> })}
        </nav>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 py-7 lg:px-10 lg:py-9">
        {activeTab === 'dashboard' && <Dashboard onOpenOptimizer={() => setActiveTab('optimizer')} />}
        {activeTab === 'optimizer' && <Optimizer jobDescription={jobDescription} setJobDescription={setJobDescription} resume={resume} setResume={setResume} match={match} analyzed={analyzed} setAnalyzed={setAnalyzed} copied={copied} onCopy={handleCopy} onExport={() => exportDocx({ resume, jobDescription, match })} />}
        {activeTab === 'about' && <About />}
      </div>
      <footer className="mx-auto flex max-w-[1440px] items-center justify-between border-t border-[#e1e8ec] px-5 py-5 text-[11px] text-[#8a989f] lg:px-10"><span>© 2024 ATS Resume Optimizer. Ambiente seguro.</span><span className="hidden items-center gap-2 sm:flex"><ShieldCheck /> Seus dados não são armazenados</span></footer>
    </main>
  )
}

function PageTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) { return <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1b947e]">{eyebrow}</p><h1 className="text-2xl font-bold tracking-[-0.04em] text-[#163846] lg:text-[29px]">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#75858d]">{description}</p></div>{action}</div> }

function Dashboard({ onOpenOptimizer }: { onOpenOptimizer: () => void }) { return <><PageTitle eyebrow="Visão executiva" title="Olá, Mariana. Aqui está o seu panorama." description="Acompanhe a performance dos seus currículos e encontre oportunidades de melhoria para cada candidatura." action={<button onClick={onOpenOptimizer} className="flex items-center justify-center gap-2 rounded-lg bg-[#153d4a] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1b5661]"><Plus /> Nova análise</button>} />
  <section className="grid gap-4 md:grid-cols-3"><Metric title="Média de Match Geral" value="82%" change="+6,4%" icon={Target} tone="teal" detail="vs. período anterior" /><Metric title="Total de Análises" value="24" change="+4" icon={BarChart3} tone="blue" detail="nos últimos 30 dias" /><Metric title="Palavras-chave Mapeadas" value="186" change="+28" icon={Search} tone="amber" detail="em todas as vagas" /></section>
  <section className="mt-4 grid gap-4 lg:grid-cols-[1.45fr_1fr]"><div className="rounded-xl border border-[#dfe7eb] bg-white p-5 shadow-[0_2px_12px_rgba(31,59,72,0.03)]"><div className="mb-5 flex items-start justify-between"><div><h2 className="text-sm font-bold text-[#1a3a48]">Evolução do Match Score</h2><p className="mt-1 text-xs text-[#84929a]">Desempenho médio por análise</p></div><button className="flex items-center gap-1 text-xs font-semibold text-[#647680]">Últimos 30 dias <ChevronDown /></button></div><div className="relative h-52"><div className="absolute inset-0 flex flex-col justify-between text-[10px] text-[#a1adb3]"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="ml-8 flex h-full items-end justify-between gap-3 border-b border-l border-[#e8edef] px-3 pb-0 pt-2"><div className="chart-grid absolute inset-x-0 top-0 ml-8" /><svg className="absolute inset-0 ml-8 h-full w-[calc(100%-32px)] overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none" aria-label="Gráfico de evolução do Match Score"><path d="M0 128 C42 119,55 127,78 111 S128 101,148 106 S188 110,210 91 S251 83,276 89 S310 95,333 68 S375 61,395 71 S441 64,462 45 S516 40,535 51 S573 33,600 21" fill="none" stroke="#27ae92" strokeWidth="3" strokeLinecap="round" /><path d="M0 128 C42 119,55 127,78 111 S128 101,148 106 S188 110,210 91 S251 83,276 89 S310 95,333 68 S375 61,395 71 S441 64,462 45 S516 40,535 51 S573 33,600 21 V200 H0Z" fill="url(#fill)" opacity=".14" /><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#27ae92" /><stop offset="1" stopColor="#27ae92" stopOpacity="0" /></linearGradient></defs></svg><div className="flex w-full justify-between pt-2 text-[10px] text-[#9aa8ae]"><span>01 Jun</span><span>08 Jun</span><span>15 Jun</span><span>22 Jun</span><span>30 Jun</span></div></div></div></div><div className="rounded-xl border border-[#dfe7eb] bg-white p-5 shadow-[0_2px_12px_rgba(31,59,72,0.03)]"><div className="mb-5 flex items-start justify-between"><div><h2 className="text-sm font-bold text-[#1a3a48]">Distribuição de Competências</h2><p className="mt-1 text-xs text-[#84929a]">Por categoria</p></div><MoreHorizontal className="text-[#90a0a7]" /></div><div className="flex items-center gap-7"><div className="relative flex size-36 shrink-0 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#1b947e 0 42%, #4e9bc0 42% 75%, #edb84d 75% 89%, #dce6e9 89% 100%)' }}><div className="flex size-24 flex-col items-center justify-center rounded-full bg-white"><span className="text-2xl font-bold text-[#1b3e4b]">186</span><span className="text-[10px] text-[#829198]">mapeadas</span></div></div><div className="flex flex-col gap-3 text-xs text-[#657780]"><Legend color="bg-[#1b947e]" label="Técnicas" value="42%" /><Legend color="bg-[#4e9bc0]" label="Comportamentais" value="33%" /><Legend color="bg-[#edb84d]" label="Processos" value="14%" /><Legend color="bg-[#dce6e9]" label="Outras" value="11%" /></div></div></div></section>
  <section className="mt-4 grid gap-4 lg:grid-cols-[1.45fr_1fr]"><div className="rounded-xl border border-[#dfe7eb] bg-white p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-sm font-bold text-[#1a3a48]">Análises recentes</h2><p className="mt-1 text-xs text-[#84929a]">Suas últimas candidaturas otimizadas</p></div><button className="text-xs font-bold text-[#1a8b79]">Ver todas <ArrowUpRight /></button></div><div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left text-xs"><thead className="border-b border-[#e6ecef] text-[10px] uppercase tracking-wider text-[#99a6ac]"><tr><th className="pb-3 font-semibold">Cargo / Empresa</th><th className="pb-3 font-semibold">Match</th><th className="pb-3 font-semibold">Data</th><th className="pb-3" /></tr></thead><tbody>{[['Senior Frontend Engineer · Nubank','94%','Hoje'],['Product Engineer · iFood','86%','Ontem'],['Tech Lead · Stone','78%','18 Jun'],['Full Stack Developer · Loft','72%','14 Jun']].map(([name, score, date]) => <tr key={name} className="border-b border-[#eef2f4] last:border-0"><td className="py-3 font-semibold text-[#36515d]">{name}</td><td className="py-3"><span className={`rounded-full px-2 py-1 font-bold ${Number.parseInt(score) > 85 ? 'bg-[#e7f7f1] text-[#16866f]' : 'bg-[#fff4dc] text-[#ac7916]'}`}>{score}</span></td><td className="py-3 text-[#88979e]">{date}</td><td className="py-3 text-right"><MoreHorizontal className="ml-auto text-[#9aa8ae]" /></td></tr>)}</tbody></table></div></div><div className="rounded-xl border border-[#dfe7eb] bg-[#153d4a] p-5 text-white"><div className="mb-5 flex size-9 items-center justify-center rounded-lg bg-[#2d766e]"><Sparkles /></div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9be7cf]">Insight da semana</p><h2 className="text-lg font-bold leading-7">Currículos com verbos de ação têm 22% mais visualizações.</h2><p className="mt-3 text-xs leading-5 text-[#b5ced1]">Inclua resultados mensuráveis e verbos fortes para destacar seu impacto profissional.</p><button onClick={onOpenOptimizer} className="mt-5 flex items-center gap-2 text-xs font-bold text-[#9be7cf]">Aplicar no editor <ArrowUpRight /></button></div></section></> }

function Metric({ title, value, change, icon: Icon, tone, detail }: { title: string; value: string; change: string; icon: React.ElementType; tone: string; detail: string }) { return <div className="rounded-xl border border-[#dfe7eb] bg-white p-5 shadow-[0_2px_12px_rgba(31,59,72,0.03)]"><div className="flex items-center justify-between"><p className="text-xs font-semibold text-[#73838b]">{title}</p><span className={`flex size-8 items-center justify-center rounded-lg ${tone === 'teal' ? 'bg-[#e7f7f1] text-[#1a967e]' : tone === 'blue' ? 'bg-[#e8f2f8] text-[#4e91b3]' : 'bg-[#fff4dc] text-[#c08a21]'}`}><Icon /></span></div><div className="mt-4 flex items-end gap-3"><span className="text-3xl font-bold tracking-tight text-[#193b48]">{value}</span><span className="mb-1 flex items-center gap-1 text-xs font-bold text-[#199277]"><TrendingUp /> {change}</span></div><p className="mt-2 text-[11px] text-[#93a0a6]">{detail}</p></div> }
function Legend({ color, label, value }: { color: string; label: string; value: string }) { return <div className="flex items-center gap-2"><span className={`size-2 rounded-full ${color}`} /><span>{label}</span><strong className="ml-auto text-[#263f4a]">{value}</strong></div> }

async function exportDocx({ resume, jobDescription, match }: { resume: string; jobDescription: string; match: number }) {
  const found = keywords.filter((item) => `${jobDescription} ${resume}`.toLowerCase().includes(item.label.toLowerCase()))
  const missing = keywords.filter((item) => !found.includes(item))
  const resumeParagraphs = resume.split(/\r?\n/).map((line) => new Paragraph({ text: line || ' ' }))
  const document = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({ text: 'ATS Resume Optimizer', heading: HeadingLevel.TITLE }),
        new Paragraph({ text: 'Currículo otimizado e relatório de análise', heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ children: [new TextRun({ text: `Match Score: ${match}%`, bold: true })] }),
        new Paragraph({ text: 'Currículo otimizado', heading: HeadingLevel.HEADING_2 }),
        ...resumeParagraphs,
        new Paragraph({ text: 'Relatório de análise ATS', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: `Palavras-chave encontradas (${found.length})` }),
        ...found.map((item) => new Paragraph({ text: `• ${item.label} — ${item.type}` })),
        new Paragraph({ text: `Palavras-chave a desenvolver (${missing.length})` }),
        ...missing.map((item) => new Paragraph({ text: `• ${item.label} — ${item.type}` })),
        new Paragraph({ text: 'Descrição da vaga analisada', heading: HeadingLevel.HEADING_2 }),
        ...jobDescription.split(/\r?\n/).map((line) => new Paragraph({ text: line || ' ' })),
      ],
    }],
  })
  const blob = await Packer.toBlob(document)
  const url = URL.createObjectURL(blob)
  const link = window.document.createElement('a')
  link.href = url
  link.download = `curriculo-otimizado-ats-${new Date().toISOString().slice(0, 10)}.docx`
  link.click()
  URL.revokeObjectURL(url)
}

function Optimizer({ jobDescription, setJobDescription, resume, setResume, match, analyzed, setAnalyzed, copied, onCopy, onExport }: { jobDescription: string; setJobDescription: (v: string) => void; resume: string; setResume: (v: string) => void; match: number; analyzed: boolean; setAnalyzed: (v: boolean) => void; copied: boolean; onCopy: () => void; onExport: () => void }) { const found = keywords.filter((item) => item.found || `${jobDescription} ${resume}`.toLowerCase().includes(item.label.toLowerCase())); const missing = keywords.filter((item) => !found.includes(item)); return <><PageTitle eyebrow="Núcleo de otimização" title="Editor & Otimizador ATS" description="Compare seu currículo com a descrição da vaga e transforme insights em uma candidatura mais forte." action={<span className="flex items-center gap-2 rounded-full border border-[#cfe9e1] bg-[#f0fbf7] px-3 py-2 text-xs font-bold text-[#16866f]"><Zap /> Análise em tempo real</span>} /><div className="grid gap-5 xl:grid-cols-[1fr_1fr_310px]"><div className="space-y-5 xl:col-span-2"><EditorCard title="Descrição da vaga" label="JOB DESCRIPTION" value={jobDescription} onChange={setJobDescription} placeholder="Cole aqui a descrição da vaga..." /><EditorCard title="Currículo atual" label="SEU CURRÍCULO" value={resume} onChange={setResume} placeholder="Cole aqui o conteúdo do seu currículo..." /><div className="flex flex-wrap gap-3"><button onClick={() => setAnalyzed(true)} className="flex items-center gap-2 rounded-lg bg-[#153d4a] px-5 py-3 text-xs font-bold text-white hover:bg-[#1b5661]"><Play /> {analyzed ? 'Análise atualizada' : 'Executar análise'}</button><button className="flex items-center gap-2 rounded-lg border border-[#d8e2e6] bg-white px-4 py-3 text-xs font-bold text-[#526871]"><Upload /> Importar arquivo</button><button onClick={onExport} className="flex items-center gap-2 rounded-lg border border-[#b9ded3] bg-[#effaf6] px-4 py-3 text-xs font-bold text-[#167c69] transition hover:bg-[#dff5ed]"><Download /> Exportar em .docx</button></div></div><aside className="rounded-xl border border-[#dfe7eb] bg-white p-5 shadow-[0_2px_12px_rgba(31,59,72,0.03)]"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-widest text-[#8a989f]">Diagnóstico</p><h2 className="mt-1 text-sm font-bold text-[#183c49]">Compatibilidade ATS</h2></div><span className="text-xs font-bold text-[#1b947e]">{analyzed ? 'Atualizado' : 'Prévia'}</span></div><div className="my-6 flex items-center gap-4"><div className="relative flex size-24 items-center justify-center rounded-full" style={{ background: `conic-gradient(#1b947e ${match}%, #e8eff1 0)` }}><div className="flex size-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#193e4b]">{match}<span className="text-sm">%</span></div></div><div><p className="text-xs font-bold text-[#35525d]">Bom potencial</p><p className="mt-1 text-[11px] leading-4 text-[#84939a]">Seu currículo está acima da média.</p></div></div><div className="mb-5 h-1.5 overflow-hidden rounded-full bg-[#e9eff1]"><div className="h-full rounded-full bg-[#1b947e] transition-all" style={{ width: `${match}%` }} /></div><div className="border-t border-[#edf1f2] pt-5"><div className="mb-3 flex items-center justify-between"><h3 className="text-xs font-bold text-[#3d5963]">Encontradas <span className="ml-1 rounded-full bg-[#e7f7f1] px-1.5 py-0.5 text-[10px] text-[#16866f]">{found.length}</span></h3><CheckCircle2 className="text-[#1b947e]" /></div><div className="flex flex-wrap gap-2">{found.map((item) => <span key={item.label} className="rounded-md border border-[#cdebe2] bg-[#f0fbf7] px-2 py-1 text-[10px] font-semibold text-[#278875]">{item.label}</span>)}</div><div className="mb-3 mt-5 flex items-center justify-between"><h3 className="text-xs font-bold text-[#3d5963]">Oportunidades <span className="ml-1 rounded-full bg-[#fff3dc] px-1.5 py-0.5 text-[10px] text-[#b17b1b]">{missing.length}</span></h3><AlertTriangle className="text-[#d59b2b]" /></div><div className="flex flex-wrap gap-2">{missing.map((item) => <span key={item.label} className="rounded-md border border-[#f0dfb7] bg-[#fffaf0] px-2 py-1 text-[10px] font-semibold text-[#a87920]">{item.label}</span>)}</div></div></aside></div><div className="mt-5 rounded-xl border border-[#dfe7eb] bg-white p-5 shadow-[0_2px_12px_rgba(31,59,72,0.03)]"><div className="mb-4 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-widest text-[#1b947e]">Saída otimizada</p><h2 className="mt-1 text-base font-bold text-[#183c49]">Currículo pronto para triagem</h2></div><div className="flex gap-2"><button onClick={onCopy} className="flex items-center gap-2 rounded-lg border border-[#d8e2e6] px-3 py-2 text-xs font-bold text-[#526871] hover:bg-[#f7fafb]"><Clipboard />{copied ? 'Copiado' : 'Copiar texto'}</button><button className="flex items-center gap-2 rounded-lg border border-[#d8e2e6] px-3 py-2 text-xs font-bold text-[#526871]"><Download /> Exportar</button></div></div><div className="mb-4 flex gap-3 rounded-lg border border-[#f0dfb7] bg-[#fffaf0] p-3 text-xs leading-5 text-[#836322]"><AlertTriangle className="shrink-0 text-[#d59b2b]" /><p><strong>Aviso de Integridade:</strong> Esta ferramenta otimiza a apresentação profissional e a legibilidade para ATS, sendo estritamente proibida a invenção de experiências ou qualificações não comprovadas pelo candidato.</p></div><textarea aria-label="Currículo otimizado" value={resume} onChange={(e) => setResume(e.target.value)} className="min-h-72 w-full resize-y rounded-lg border border-[#e0e8eb] bg-[#fbfcfd] p-4 font-mono text-xs leading-6 text-[#526871] outline-none focus:border-[#52b9a2] focus:ring-2 focus:ring-[#d7f2ea]" /></div></> }
function EditorCard({ title, label, value, onChange, placeholder }: { title: string; label: string; value: string; onChange: (v: string) => void; placeholder: string }) { return <div className="rounded-xl border border-[#dfe7eb] bg-white p-5 shadow-[0_2px_12px_rgba(31,59,72,0.03)]"><div className="mb-3 flex items-center justify-between"><div><h2 className="text-sm font-bold text-[#183c49]">{title}</h2><p className="mt-1 text-[9px] font-bold tracking-[0.18em] text-[#a0adb2]">{label}</p></div><FileText className="text-[#8ba0a8]" /></div><textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="min-h-40 w-full resize-y rounded-lg border border-[#e0e8eb] bg-[#fbfcfd] p-4 text-xs leading-6 text-[#536a73] outline-none focus:border-[#52b9a2] focus:ring-2 focus:ring-[#d7f2ea]" /></div> }

function About() { return <><PageTitle eyebrow="Transparência & método" title="Sobre o projeto" description="Uma camada de inteligência para transformar candidaturas em decisões mais claras, consistentes e éticas." /><div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]"><div className="rounded-xl border border-[#dfe7eb] bg-white p-7"><div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-[#e7f7f1] text-[#1b947e]"><ShieldCheck /></div><h2 className="text-xl font-bold text-[#183c49]">Otimização sem comprometer a verdade.</h2><p className="mt-4 text-sm leading-7 text-[#657780]">O ATS Resume Optimizer foi criado para ajudar profissionais a comunicar melhor suas experiências reais. O motor identifica competências, padrões de linguagem e lacunas de palavras-chave — sem nunca inventar uma qualificação.</p><div className="mt-7 grid gap-4 sm:grid-cols-3">{[['Análise semântica','Mapeamento contextual de termos'],['Arquitetura limpa','Interface rápida e responsiva'],['Foco em SEO/GEO','Conteúdo claro e encontrável']].map(([title, desc]) => <div key={title} className="rounded-lg bg-[#f6f9fa] p-4"><Code2 className="mb-3 text-[#1b947e]" /><h3 className="text-xs font-bold text-[#284754]">{title}</h3><p className="mt-1 text-[11px] leading-5 text-[#829198]">{desc}</p></div>)}</div></div><div className="rounded-xl border border-[#dfe7eb] bg-[#153d4a] p-7 text-white"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9be7cf]">Princípios do sistema</p><div className="mt-6 flex flex-col gap-5">{[['01','Verdade acima de tudo'],['02','Clareza para cada decisão'],['03','Privacidade por padrão']].map(([n, text]) => <div key={n} className="flex items-center gap-4 border-b border-white/10 pb-5 last:border-0"><span className="text-xs font-bold text-[#76cdb7]">{n}</span><span className="text-sm font-semibold">{text}</span><Check className="ml-auto text-[#76cdb7]" /></div>)}</div><div className="mt-8 rounded-lg bg-white/10 p-4 text-xs leading-5 text-[#c0d9d9]">Seus dados são processados apenas para a análise atual e não são armazenados permanentemente.</div></div></div></> }
