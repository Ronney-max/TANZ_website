import { createServer } from 'node:http';
import { modules } from '../lib/modules.ts';
const port = Number(process.env.PORT || 3001);
const server = createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (request.method === 'GET' && request.url === '/api/modules') {
    response.writeHead(200);
    response.end(JSON.stringify({brand:'TANZ', project:'Hospitality', modules}));
    return;
  }
  if (request.method === 'GET' && request.url === '/api/health') {
    response.writeHead(200);
    response.end(JSON.stringify({status:'ok'}));
    return;
  }
  response.writeHead(404);
  response.end(JSON.stringify({error:'Not found'}));
});
server.listen(port, '127.0.0.1', () => console.log(`TANZ Node API listening on http://127.0.0.1:${port}`));
