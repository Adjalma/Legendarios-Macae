const https=require('https');
const fs=require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const url='https://legendariosrio.com.br/top-1282';
https.get(url,(res)=>{
  let data='';
  res.on('data',(chunk)=>{data+=chunk;});
  res.on('end',()=>{
    fs.writeFileSync('top1282.html',data);
    const imgMatches=[...data.matchAll(/<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi)];
    console.log('Imagens encontradas:',imgMatches.length);
    imgMatches.forEach((m,i)=>{
      const src=m[1];
      if(src.match(/wp-content|uploads|top|1282|redencao|redem|rio|jpg|png|webp/i)){
        console.log(i+1+':',src);
      }
    });
  });
});
