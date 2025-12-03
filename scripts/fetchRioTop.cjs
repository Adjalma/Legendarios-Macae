const https=require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const url='https://legendariosrio.com.br/top-1282';
https.get(url,(res)=>{
  let data='';
  res.on('data',(chunk)=>{data+=chunk;});
  res.on('end',()=>{
    const imgMatches=[...data.matchAll(/<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi)];
    const topImages=imgMatches.filter(m=>m[1].match(/top|1282|redencao|redem/i));
    console.log('Imagens encontradas:');
    topImages.forEach((m,i)=>console.log(i+1+':',m[1]));
  });
});
