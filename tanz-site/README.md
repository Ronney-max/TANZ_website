# TANZ Hospitality

React website with a Node.js development/build toolchain and server routes (Vinext).

## Run

- `npm run dev`
- `npm run build`
- `npm run dev:api` starts the standalone Node.js backend on port 3001 (Node 22.13+). It exposes `/api/modules` and `/api/health`.

Pages: `/` (overview and eight modules), `/projects` (hospitality project), `/hospitality/pos` (dedicated POS landing page and interactive demo).

`GET /api/modules` returns the hospitality product catalogue.

The POS preview uses sample KES prices and local React state. It does not process payments or send orders. Module descriptions express the proposed product scope, not connected operational systems. Connect real project URLs, property services and approved company copy before using the website as a commercial product launch.

Production Sites hosting runs the server as a Cloudflare Worker. This is not a standalone Node.js production server.
