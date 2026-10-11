# TANZ Website

The current React frontend and Node.js backend live in [tanz-hospitality](tanz-hospitality/).

- [Setup and deployment instructions](tanz-hospitality/README.md)
- [Frontend source](tanz-hospitality/frontend/)
- [Backend source](tanz-hospitality/server/)

Root Netlify and Render configurations select `tanz-hospitality` automatically. Set `VITE_API_URL` on Netlify to the actual Render API origin, and `ALLOWED_ORIGINS` on Render to the exact Netlify site origin.

`tanz-site` contains the earlier Sites-hosted implementation.
