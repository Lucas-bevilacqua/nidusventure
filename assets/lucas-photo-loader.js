(function(){
  function applyLucasPhoto(){
    var chunks=window.__lucasPhotoChunks||[];
    if(chunks.length<5||chunks.some(function(chunk){return !chunk;})) return;
    var source='data:image/webp;base64,'+chunks.join('');
    var images=document.querySelectorAll('.hero-photo,.authority-photo');
    var media=document.querySelector('.hero-media');
    if(!images.length||!media) return;
    images.forEach(function(image){
      image.onload=function(){
        image.classList.add('photo-ready');
        if(image.classList.contains('hero-photo')) media.classList.add('photo-ready');
      };
      image.src=source;
    });
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyLucasPhoto,{once:true});
  }else{
    applyLucasPhoto();
  }
})();
