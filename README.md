# Northline Analytics

SaaS-style analytics dashboard UI. All commands run **from this directory**.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173 (default)
npm run build    # tsc + vite build
npm run lint
npm run preview  # serve ./dist
```

## Tech

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **react-router-dom** — `/overview`, `/analytics`, `/customers`, `/billing`, `/support`, `/settings`
- **Recharts** — line, bar, pie
- **lucide-react** — icons

## Source map

| Path | Role |
|------|------|
| `src/App.tsx` | Route table |
| `src/components/layout/` | App shell, sidebar, top bar, skip link |
| `src/components/dashboard/` | Analytics metrics, filters, charts |
| `src/pages/` | Other screens |
| `src/data/analytics.json` | Mock series + metrics by period |
| `src/navigation.ts` | Nav items, paths, `navIdFromPathname` |

## Notes

- Mock data only; no backend.
- Default route redirects to `/analytics`.
- Horizontal scroll on wide tables is scoped to the table region so the header does not grow past the viewport.
