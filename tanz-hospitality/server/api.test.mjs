import test from 'node:test';
import assert from 'node:assert/strict';
import { createApi } from './app.mjs';
test('catalogue, CORS and server-priced POS previews',async t=>{
 const server=createApi({production:true,allowedOrigins:['https://tanz.example']});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 t.after(()=>new Promise(resolve=>server.close(resolve)));
 const base=`http://127.0.0.1:${server.address().port}`;
 let result=await fetch(base+'/api/modules',{headers:{Origin:'https://tanz.example'}});
 assert.equal(result.headers.get('access-control-allow-origin'),'https://tanz.example');
 assert.equal((await result.json()).modules.length,8);
 result=await fetch(base+'/api/modules',{headers:{Origin:'https://untrusted.example'}});assert.equal(result.status,403);
 result=await fetch(base+'/api/pos/preview',{method:'OPTIONS',headers:{Origin:'https://tanz.example'}});assert.equal(result.status,204);
 const post=items=>fetch(base+'/api/pos/preview',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://tanz.example'},body:JSON.stringify({table:'08',items})});
 result=await post([{id:'coffee',quantity:2,price:1},{id:'sandwich',quantity:1}]);assert.equal(result.status,200);assert.equal((await result.json()).total,1850);
 result=await post([{id:'coffee',quantity:-1}]);assert.equal(result.status,400);
 result=await post([{id:'unknown',quantity:1}]);assert.equal(result.status,400);
 result=await post([]);assert.equal(result.status,400);
 result=await fetch(base+'/api/pos/menu');assert.equal((await result.json()).items.length,4);
 result=await fetch(base+'/api/health');assert.equal(result.status,200);
 result=await fetch(base+'/api/missing');assert.equal(result.status,404);
});

test('local frontend can use an alternate development port',async t=>{
 const server=createApi();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));t.after(()=>new Promise(resolve=>server.close(resolve)));
 const base=`http://127.0.0.1:${server.address().port}`;
 const result=await fetch(base+'/api/modules',{headers:{Origin:'http://127.0.0.1:5184'}});assert.equal(result.status,200);assert.equal(result.headers.get('access-control-allow-origin'),'http://127.0.0.1:5184');
});
