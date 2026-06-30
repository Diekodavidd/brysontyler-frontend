# BrysonTyler — Vite + React SPA

A pure client-side React single-page app (Vite + TypeScript). Converted from the
original Next.js App Router project. It talks **directly** to your existing
Express/Render backend using `Authorization: Bearer <token>` — there is no
server/BFF layer, so the build is fully static and deploys anywhere.

## Quick start

```bash
npm install                  # .npmrc sets legacy-peer-deps for React 19
cp .env.example .env         # then edit it
npm run dev                  # http://localhost:5173
```

Set your backend URL in `.env`:

```
VITE_API_URL=https://your-backend.onrender.com
```

This is the same value the Next app called `NEXT_PUBLIC_SITE_URL` (it's the API
base). No trailing slash. The app calls `${VITE_API_URL}/auth/login`,
`/auth/me`, `/auth/register`, `/kyc/start`, etc.

## Scripts

| command            | what it does                                 |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Start the dev server (HMR)                   |
| `npm run build`    | Production build to `dist/`                  |
| `npm run preview`  | Serve the production build locally           |
| `npm run typecheck`| `tsc --noEmit` type check                    |

## What changed from the Next version

- **Routing** — Next App Router file routing is now `react-router-dom` v7,
  defined in `src/App.tsx`. Route groups, layouts, and dynamic segments
  (`[id]` → `:id`) are preserved. Pages live under `src/pages/`, layouts under
  `src/layouts/`.
- **Auth** — the backend is Bearer-token based. The old API routes only wrapped
  that token in an httpOnly cookie; those are gone. The token is now stored in
  `localStorage` (`src/lib/token.ts`) and attached to every request by
  `src/lib/api.ts`. A 401 clears the token and redirects to `/login`.
  - `src/store/useAuthStore.tsx` (Zustand, persisted) still holds the user.
  - Logout is pure client-side (clears the token); there was no backend logout.
- **Middleware → route guards** — `src/guards/ProtectedRoute.tsx` protects
  `/admin` and `/dashboard`; `src/guards/AuthRoute.tsx` bounces signed-in users
  off `/login`, `/signup`, `/verify-email`, `/forgot-password`.
- **Next API shims** — `src/compat/` provides small drop-in replacements so the
  page/component code didn't need rewriting: `Link` (maps `href`→`to`), `Image`
  (renders `<img>`), and `navigation` (`useRouter`/`usePathname`/`useParams`/
  `useSearchParams`).
- **Styling** — Tailwind v4 via `@tailwindcss/vite`. Global styles are in
  `src/index.css` (ported from `globals.css`). Fonts load via Google Fonts in
  `index.html`.

## Libraries wired in and ready

framer-motion, react-icons, react-hook-form (+ @hookform/resolvers, zod),
react-toastify, react-parallax, react-countup, swiper, react-player,
socket.io-client, lottie-react, gsap — plus @tanstack/react-query and zustand
(used by the existing auth/data layer).

## Deployment

It's a static SPA. Because it uses `BrowserRouter`, the host must serve
`index.html` for unknown paths (deep-link/refresh support):

- **Netlify / Cloudflare Pages** — `public/_redirects` is included.
- **Vercel** — `vercel.json` rewrite is included.
- **GitHub Pages** — no SPA fallback; either switch `BrowserRouter` to
  `HashRouter` in `src/main.tsx`, or add a `404.html` that mirrors `index.html`.

## Notes

- The profile sidebar links to `/profile/creator`, which has no page in the
  original project — it falls through to the 404 route. Left as-is.
- `/onboarding` was an empty stub in the original; it now renders a placeholder.
- The JS bundle is a single chunk (~740 kB). To code-split, convert the page
  imports in `src/App.tsx` to `React.lazy(() => import(...))` — the `<Suspense>`
  boundary in `src/main.tsx` is already there to support it.
