# Calistenia Militar — Desafio de 28 Dias

Plataforma de curso estático para o **Desafio de 28 Dias de Calistenia Militar**. Exibe videoaulas organizadas em módulos semanais, com player de vídeo (YouTube embed), navegação entre aulas e suporte a instalação como PWA.

**Produção:** https://memberly-open.vercel.app/

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4, Motion (framer-motion) |
| Ícones | Lucide React |
| Linguagem | TypeScript |
| Deploy | Vercel |
| PWA | Web App Manifest + install prompt nativo |

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx              # Layout global (header, footer, WhatsApp CTA)
│   ├── page.tsx                # Home — hero banner + grid de módulos
│   ├── globals.css             # Tema dark (tokens Tailwind v4 inline)
│   ├── components/
│   │   ├── WhatsAppButton.tsx  # Botão flutuante de WhatsApp
│   │   └── InstallAppButton.tsx # Prompt de instalação PWA (iOS Safari/Chrome + Android)
│   └── lessons/
│       └── [id]/
│           └── page.tsx        # Página da aula — player, sidebar, navegação prev/next
├── data/
│   └── course.ts               # Dados do curso (módulos, aulas, videoIds)
public/
├── manifest.json               # Manifesto PWA
├── icon-*.png                  # Ícones do app
└── ios-install-tutorial*.gif   # Tutoriais de instalação iOS
```

## Camada de Dados

Não há banco de dados nem API. Todo o conteúdo do curso vive em `src/data/course.ts` como um objeto TypeScript exportado.

**Hierarquia:** `Course > Module[] > Lesson[]`

Cada `Lesson` contém um `videoId` do YouTube e metadados (título, duração, ordem). Para adicionar ou editar aulas, basta alterar esse arquivo.

**Helpers disponíveis:**
- `getAllLessons()` — retorna todas as aulas em ordem
- `getLessonById(id)` — busca aula por ID
- `getLessonNavigation(id)` — retorna aula anterior, atual e próxima

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Home — hero com banner do curso, descrição expansível e grid de módulos |
| `/lessons/[id]` | Página da aula — player YouTube, breadcrumb, sidebar com aulas do módulo, navegação prev/next |

## Rodando Localmente

```bash
npm install
npm run dev
```

O servidor inicia em `http://localhost:3000` com Turbopack.

## Build e Deploy

```bash
# Build de produção
npm run build

# Servir localmente o build
npm run start

# Deploy direto para Vercel
npx vercel --prod --yes
```

## Estilização

Tailwind CSS v4 com tema customizado definido inline em `globals.css` via `@theme inline`. Paleta dark inspirada na Netflix:

- **Primary:** `#e50914` (vermelho)
- **Background:** `#0A0A0A` → `#141414`
- **Surfaces:** `#1a1a1a` → `#2a2a2a`

Classes utilitárias customizadas: `.scrollbar-hide`, `.scrollbar-dark`.

## Imagens Remotas

Banners e imagens dos módulos estão hospedados no Supabase Storage. O domínio `*.supabase.co` está liberado em `next.config.ts` via `remotePatterns`.

## PWA

O app pode ser instalado como PWA em dispositivos móveis. O componente `InstallAppButton` detecta o ambiente (iOS Safari, iOS Chrome, Android) e exibe o prompt adequado — inclusive um modal com tutorial em GIF para iOS.

## Path Alias

`@/*` mapeia para `./src/*` (configurado em `tsconfig.json`).
