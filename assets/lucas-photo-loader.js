(function(){
  function applyLucasPhoto(){
    var chunks=window.__lucasPhotoChunks||[];
    if(chunks.length<5||chunks.some(function(chunk){return !chunk;})) return;
    var source='data:image/webp;base64,'+chunks.join('');
    var image=document.querySelector('.hero-photo');
    var media=document.querySelector('.hero-media');
    if(!image||!media) return;
    image.onload=function(){media.classList.add('photo-ready');};
    image.src=source;
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyLucasPhoto,{once:true});
  }else{
    applyLucasPhoto();
  }
})();
