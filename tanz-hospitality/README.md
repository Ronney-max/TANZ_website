# TANZ Hospitality

A public-facing React website for TANZ, with a standalone Node.js API. Warm brown, cream and jungle-green design with café photography.

## Local preview

Use Node 22.19+.

```sh
npm ci
npm run dev:api
```

In another terminal:

```sh
npm run dev -- --open
```

Vite forwards `/api` requests to the local backend on port 3001. If that port is already occupied, start the API with `PORT=3101 npm start` and the frontend with `API_PROXY_TARGET=http://127.0.0.1:3101 npm run dev -- --open`. Do not copy the example production URLs into your local environment. The browser opens automatically with `--open`.

```sh
npm test
npm run build
```

## Create the GitHub repository

The folder is ready to become a new repository named `tanz-hospitality`. Create an empty repository in your GitHub account, then add its actual URL as the origin and push `main`. Do not initialise the remote with a separate README.

```sh
git remote add origin https://github.com/YOUR-ACCOUNT/tanz-hospitality.git
git push -u origin main
```

If you have the authenticated GitHub CLI, use `gh repo create tanz-hospitality --private --source=. --remote=origin --push` instead.

## Deploy Netlify and Render

1. Create a Netlify project from the GitHub repository. The root `netlify.toml` supplies build command `npm run build` and publish directory `dist-netlify`. This produces a normal website URL that visitors can open without ChatGPT.
2. On Render, create a Blueprint from the same repository. `render.yaml` defines a free Node.js web service, `npm ci` build, `npm start`, and health check `/api/health`. Set `ALLOWED_ORIGINS` to the exact Netlify origin, for example `https://your-site.netlify.app`, without a trailing slash. Multiple explicit origins may be comma-separated.
3. Copy the actual Render service origin. In Netlify, add build environment variable `VITE_API_URL` with this origin, for example `https://your-api.onrender.com`. Redeploy Netlify after setting it.
4. Open the Netlify URL. Check that all eight solution cards load, visit `/hospitality/pos`, add menu items, and send a preview. Refresh `/projects` and `/hospitality/pos` directly to check routing.

Netlify handles page loads; the browser requests catalogue/menu data from Render and posts preview orders there. Render calculates totals from its menu prices and validates quantities. CORS permits your explicitly configured frontend origin. No wildcard origins or secrets are bundled into the frontend.

Connected Git deployments update automatically when commits are pushed. If you configure a custom Netlify domain, update `ALLOWED_ORIGINS` to include it. Netlify deploy-preview origins are not allowed automatically.

Production deployment needs authenticated GitHub, Netlify and Render accounts. Configuration files alone do not provision accounts or publish a website. Free Render services can take time to wake; the frontend waits up to 60 seconds and provides retry messages.

## API

- `GET /api/health`
- `GET /api/modules`
- `GET /api/pos/menu`
- `POST /api/pos/preview` with `{"table":"08","items":[{"id":"coffee","quantity":2}]}`

The POS remains a sample preview. Orders are not persisted, payments are not processed, and kitchen orders are not sent. Durable hotel/guest/order storage and actual property integrations are separate work.

## Interface

Responsive pages at `/`, `/projects`, and `/hospitality/pos`. Sticky navigation, mobile menu with Escape-to-close, keyboard skip link, generous touch targets, clear empty cart, remove/clear controls, request loading states and retry feedback.

## References

- [Netlify Vite deployment](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/)
- [Render web services](https://render.com/docs/web-services)
- [Render Blueprint configuration](https://render.com/docs/blueprint-spec)
