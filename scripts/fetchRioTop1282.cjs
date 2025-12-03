const https=require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const url='https://legendariosrio.com.br/top-1282';
https.get(url,(res)=>{
  let data='';
  res.on('data',(chunk)=>{data+=chunk;});
  res.on('end',()=>{
    const imgMatches=[...data.matchAll(/<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi)];
    console.log('Todas as imagens encontradas:');
    imgMatches.forEach((m,i)=>{
      const src=m[1];
      if(src.match(/wp-content|uploads|top|1282|redencao|redem|rio/i)){
        console.log(i+1+':',src);
      }
    });
  });
});
