# V-League Next.js (Lab 6)

## Setup
1. Copy `.env.local` and set DB_PASSWORD, ADMIN_API_KEY.
2. Ensure MySQL schema is created on PHAMHUNG (127.0.0.1:3306, DB `vleague`).
3. Install deps: `npm install`.
4. Run dev: `npm run dev`.

## Routes
- `/` news list (ISR 5m)
- `/news/[slug]` news detail (ISR 5m, prebuild latest 20)
- `/clubs/[id]` club detail (SSR)
- `/clubs` club listing (ISR)
- `/dashboard` standings (Server Component) + client filter + recent matches
- `/api/admin/matches` protected by `x-api-key` (GET list, POST create + revalidate)
- `/api/admin/revalidate` on-demand revalidate (POST path)
- `/api/health` basic health check
- `/ai` docs + server action form + streaming widget
- `/api/ai/ask` streaming text answer (rate limited), nguồn dữ liệu từ MySQL news + docs tĩnh

## Mini add-on: Ask widget (lightweight QA)
- `AskWidget`/`AskClient` gắn trên trang chủ và trang /ai, stream chunked text.

## Notes
- DB access only in server components/route handlers via `mysql2/promise` pool.
- next/image used for club logos when available.
- Metadata set in `app/layout.tsx`.
