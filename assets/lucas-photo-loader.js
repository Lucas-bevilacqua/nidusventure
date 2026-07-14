(function () {
  function applyLucasPhoto() {
    var image = document.querySelector('.hero-photo');
    var media = document.querySelector('.hero-media');

    if (!image || !media) return;

    image.addEventListener('load', function () {
      media.classList.add('photo-ready');
    }, { once: true });

    image.addEventListener('error', function () {
      image.style.opacity = '1';
      image.alt = 'Não foi possível carregar a foto de Lucas Bevilacqua';
    }, { once: true });

    image.src = '/assets/lucas-foto-oficial.webp?v=20260714-6';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLucasPhoto, { once: true });
  } else {
    applyLucasPhoto();
  }
})();
