import { createApi } from './app.mjs';
const port=Number(process.env.PORT || 3001);
const production=process.env.NODE_ENV==='production';
const allowedOrigins=(process.env.ALLOWED_ORIGINS || '').split(',').map(origin=>origin.trim()).filter(Boolean);
if (production && !allowedOrigins.length) throw new Error('Set ALLOWED_ORIGINS to your Netlify site origin');
const server=createApi({allowedOrigins,production});
server.listen(port,'0.0.0.0',()=>console.log(`TANZ API listening on port ${port}`));
for (const signal of ['SIGTERM','SIGINT']) process.on(signal,()=>server.close(()=>process.exit(0)));
