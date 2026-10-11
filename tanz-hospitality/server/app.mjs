import { createServer } from 'node:http';
import { modules } from '../lib/modules.mjs';
export const menu = [
  {id:'coffee',name:'House coffee',price:450,icon:'coffee'},
  {id:'sandwich',name:'Club sandwich',price:950,icon:'food'},
  {id:'juice',name:'Fresh juice',price:400,icon:'coffee'},
  {id:'salad',name:'Garden salad',price:750,icon:'food'},
];
export function createApi({allowedOrigins = [], production = false} = {}) {
  return createServer(async (request, response) => {
    const origin = request.headers.origin;
    response.setHeader('Content-Type','application/json; charset=utf-8');
    response.setHeader('X-Content-Type-Options','nosniff');
    response.setHeader('Vary','Origin');
    response.setHeader('Cache-Control','no-store');
    const send = (status, data) => { response.writeHead(status); response.end(JSON.stringify(data)); };
    const permitted = origin && (allowedOrigins.includes(origin) || (!production && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)));
    if (origin && !permitted) return send(403,{error:'Origin not allowed'});
    if (permitted) response.setHeader('Access-Control-Allow-Origin',origin);
    if (request.method === 'OPTIONS') {
      response.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');
      response.setHeader('Access-Control-Allow-Headers','Content-Type');
      response.writeHead(204);response.end();return;
    }
    const path = new URL(request.url,'http://localhost').pathname;
    if (request.method === 'GET' && path === '/api/health') return send(200,{status:'ok'});
    if (request.method === 'GET' && path === '/api/modules') return send(200,{brand:'TANZ',project:'Hospitality',modules});
    if (request.method === 'GET' && path === '/api/pos/menu') return send(200,{currency:'KES',items:menu});
    if (request.method === 'POST' && path === '/api/pos/preview') {
      if (!request.headers['content-type']?.startsWith('application/json')) return send(415,{error:'Use application/json'});
      try {
        let body = '';let bytes=0;
        for await (const chunk of request) {bytes+=chunk.length;if(bytes>16384)return send(413,{error:'Request too large'});body+=chunk.toString();}
        const order=JSON.parse(body);
        if (!Array.isArray(order.items) || order.items.length<1 || order.items.length>100 || typeof order.table!=='string' || !/^\d{1,3}$/.test(order.table)) return send(400,{error:'Provide a table and 1–100 items'});
        const lines=[];
        for (const line of order.items) {
          const item=menu.find(item=>item.id===line?.id);
          if (!item || !Number.isInteger(line.quantity) || line.quantity<1 || line.quantity>99) return send(400,{error:'Invalid item or quantity'});
          lines.push({id:item.id,name:item.name,quantity:line.quantity,unitPrice:item.price,total:item.price*line.quantity});
        }
        return send(200,{preview:true,table:order.table,currency:'KES',items:lines,total:lines.reduce((sum,line)=>sum+line.total,0)});
      } catch {return send(400,{error:'Invalid JSON request'});}
    }
    return send(404,{error:'Not found'});
  });
}
