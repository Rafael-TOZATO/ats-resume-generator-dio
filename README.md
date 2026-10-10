<p align="center">
  <img src="https://ats-resume-generator-dio.vercel.app/ats-resume-optimizer-banner.png" alt="ATS Resume Optimizer Pro Banner" width="100%">
</p>

<h1 align="center">🚀 ATS Resume Optimizer Pro</h1>

<p align="center">
  <b>Sistemas de Otimização de Currículos & Analisador de Compatibilidade ATS</b><br>
  <i>Projeto prático desenvolvido para o desafio técnico da plataforma DIO.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen?style=for-the-badge" alt="Status Concluído">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/DIO-Challenge-orange?style=for-the-badge" alt="DIO Challenge">
</p>

---

## 🔗 Links Oficiais do Projeto

- 🌐 **Aplicação Online (Deploy em Produção):** [https://ats-resume-generator-dio.vercel.app/](https://ats-resume-generator-dio.vercel.app/)
- 💻 **Repositório do Código:** [https://github.com/Rafael-TOZATO/ATS-Resume-Gerador-DIO](https://github.com/Rafael-TOZATO/ATS-Resume-Gerador-DIO)

## 📬 Contatos

- 💼 **LinkedIn:** [rafaeltozato81](https://www.linkedin.com/in/rafaeltozato81)
- 🐙 **GitHub:** [Rafael-TOZATO](https://github.com/Rafael-TOZATO)
- ✍️ **Medium:** [@ornelas.tozato](https://medium.com/@ornelas.tozato)
- 🌐 **Portfólio PWA:** [tozato-dev-hub.vercel.app](https://tozato-dev-hub.vercel.app)
- 🚀 **Aurora BI (Lovable):** [aurora-bi-dio.lovable.app](https://aurora-bi-dio.lovable.app)

---

## 🎯 Sobre o Projeto

O **ATS Resume Optimizer Pro** é uma aplicação web corporativa criada para resolver um dos maiores desafios de candidatos no mercado de trabalho atual: a aprovação em **Sistemas de Rastreamento de Candidatos (ATS - Applicant Tracking Systems)**.

### 💡 Principais Funcionalidades
1. **Dashboard Executivo de Performance:** Painel visual com indicadores consolidados (*Match Rate*, total de análises realizadas e densidade de palavras-chave).
2. **Analisador de Compatibilidade em Tempo Real:**
   - Comparador side-by-side de duas colunas (Descrição da Vaga vs. Currículo do Candidato).
   - Realce de termos-chave encontrados (destaque verde) e lacunas pendentes (destaque vermelho/âmbar).
3. **Gerador Dinâmico de `.docx`:** Exportação instantânea e formatada diretamente no navegador via biblioteca `docx`.
4. **Governança e Etica Profissional:** Mecanismos de alerta e orientação reforçando que a ferramenta otimiza a apresentação sem falsificar qualificações.

---

## 🛠️ Engenharia de Contorno & Troubleshooting (Narrativa Técnica)

Durante o desenvolvimento deste desafio, identificou-se um impedimento de cota/créditos na plataforma inicial prevista (Lovable).

Em alinhamento com a postura profissional e autônoma exigida na engenharia de software, aplicou-se a seguinte estratégia de resiliência:
1. **Mapeamento da Restrição:** Isolamento do gargalo na camada de infraestrutura/gerador, mantendo os requisitos da solução intactos.
2. **Migração Paritária:** Reexecução limpa do Mega Prompt na engine **v0.dev (Vercel)**, mantendo 100% da paridade técnica na stack (React, Tailwind CSS, `shadcn/ui` e TypeScript).
3. **Pipeline CI/CD Automático:** Sincronização direta com o ecossistema GitHub e deploy de produção de alta performance na Vercel.

---

## 📄 Mega Prompt Utilizado

```markdown
# Mega Prompt: Gerador de Currículos ATS-Friendly & Dashboard de Análise

## 🎯 Objetivo
Criar uma SPA corporativa em React, Tailwind CSS e componentes shadcn/ui para análise inteligente de currículos.

## 📱 Módulos
1. Header Executivo & Status do Motor.
2. Aba 1: Dashboard de Compatibilidade (KPIs, Taxa de Match e Total de Análises).
3. Aba 2: Editor & Otimizador ATS (Comparador 2 colunas, termos encontrados/pendentes, exportador .docx).
4. Aba 3: Sobre o Projeto & Resiliência.
