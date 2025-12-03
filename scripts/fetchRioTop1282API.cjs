const https=require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const url='https://legendariosrio.com.br/wp-json/wp/v2/posts?slug=top-1282';
https.get(url,(res)=>{
  let data='';
  res.on('data',(chunk)=>{data+=chunk;});
  res.on('end',()=>{
    try{
      const posts=JSON.parse(data);
      if(posts.length>0){
        const content=posts[0].content.rendered;
        const imgMatches=[...content.matchAll(/<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi)];
        console.log('Imagens no conteúdo:');
        imgMatches.forEach((m,i)=>console.log(i+1+':',m[1]));
        const featuredMedia=posts[0].featured_media;
        if(featuredMedia){
          console.log('Featured media ID:',featuredMedia);
        }
      }
    }catch(e){
      console.log('Erro:',e.message);
    }
  });
});
