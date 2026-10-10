import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aurora BI — Financial Intelligence MVP',
  description: 'Artigo técnico sobre a construção do painel executivo Aurora BI para o desafio da DIO.',
}

export default function AuroraBILayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
