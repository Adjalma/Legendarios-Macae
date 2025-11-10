# Legendários Macaé — Plataforma Web

Projeto em React + Vite para o movimento Legendários Macaé, com integrações automáticas aos portais oficiais Legendários Global e Legendários Rio.

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Axios + React Query (sincronização de dados externos)
- React Router DOM 6

## Scripts

> Antes de instalar dependências, garanta acesso ao registry do npm (`strict-ssl=false`).

- `npm install` — instala dependências
- `npm run dev` — inicia servidor de desenvolvimento (porta 5173)
- `npm run build` — gera build de produção
- `npm run preview` — pré-visualiza build
- `npm run lint` — executa linting

## Estrutura

- `src/layouts` — layout principal com navbar e rodapé
- `src/pages` — páginas Início, TOPs RJ, Histórias, Mídia e Sobre
- `src/services` — integrações com legendarios.org.br e legendariosrio.com.br
- `src/hooks` — hooks com React Query
- `src/components` — componentes reutilizáveis (navegação, UI)

## Integrações

1. `legendariosGlobal`: captura contadores globais (total de Legendários por país) via WordPress REST.
2. `legendariosRio`: mapeia posts e páginas do site do Rio, extraindo links de inscrição, “O que levar” e “Preparação”.

Ambos os serviços usam `React Query` para cache e revalidação periódica.

## Próximos passos

- Desbloquear instalação dos pacotes (`npm install`).
- Ajustar parsing dos contadores conforme estrutura final do conteúdo WordPress.
- Incorporar mídia e testemunhos reais fornecidos pelos líderes regionais.

