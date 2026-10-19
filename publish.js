let imagesByPath = {};
let currentImageIndex = 0;
let currentPath = '';

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

function preloadAllImages() {
  const images = imagesByPath[currentPath] || [];
  images.forEach(image => {
    const imgElement = image.querySelector('img');
    const imageUrl = imgElement?.getAttribute('src') || imgElement?.getAttribute('data-src');
    if (imageUrl) {
      preloadImage(imageUrl);
    }
  });
}

function updateCurrentPath() {
  currentPath = publish.currentFilepath;
  if (!imagesByPath[currentPath]) {
    imagesByPath[currentPath] = [];
    preloadAllImages();
  }
}

const helixbyteBottomBannerId = 'lucas-bottom-banner';

function ensureBottomBanner() {
  if (!document.body) return;
  if (document.getElementById(helixbyteBottomBannerId)) return;

  const style = document.createElement('style');
  style.id = `${helixbyteBottomBannerId}-style`;
  style.textContent = `
    body {
      padding-bottom: 18px !important;
    }

    #${helixbyteBottomBannerId} {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 18px;
      border-top: 1px solid rgba(255,255,255,0.14);
      background: rgba(14, 16, 18, 0.96);
      color: #f3efe8;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      box-shadow: 0 -8px 24px rgba(0,0,0,0.16);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    #${helixbyteBottomBannerId} .brand {
      font-weight: 700;
      letter-spacing: 0.14em;
      white-space: nowrap;
    }

    #${helixbyteBottomBannerId} .links {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 14px;
    }

    #${helixbyteBottomBannerId} a {
      color: #f3efe8;
      opacity: 0.78;
      text-decoration: none;
      transition: opacity 0.2s ease;
    }

    #${helixbyteBottomBannerId} a:hover {
      opacity: 1;
    }

    @media (max-width: 640px) {
      #${helixbyteBottomBannerId} {
        padding: 8px 12px;
        gap: 8px;
        font-size: 10px;
        letter-spacing: 0.06em;
      }

      #${helixbyteBottomBannerId} .links {
        gap: 8px;
      }
    }
  `;
  document.head.appendChild(style);

  const banner = document.createElement('div');
  banner.id = helixbyteBottomBannerId;

  const brand = document.createElement('div');
  brand.className = 'brand';
  brand.textContent = 'helixbyte';

  const linksWrap = document.createElement('div');
  linksWrap.className = 'links';

  const links = [
    { label: 'Main Website', href: 'https://www.lucas-bonvin.com/' },
    { label: 'Wiki Home', href: 'https://www.luc-b.ch/wiki' },
    { label: 'Instagram', href: 'https://www.instagram.com/helixbyte/' }
  ];

  links.forEach((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = link.label;
    linksWrap.appendChild(a);
  });

  banner.appendChild(brand);
  banner.appendChild(linksWrap);
  document.body.appendChild(banner);
}

ensureBottomBanner();

publish.registerMarkdownPostProcessor(async (el, ctx) => {
  updateCurrentPath();

  const blockImages = Array.from(el.querySelectorAll('.internal-embed')).filter(span => /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(span.getAttribute('src')));
  blockImages.forEach((span) => {
    if (!span.classList.contains('processed')) {
      span.classList.add('processed');
      imagesByPath[currentPath].push(span);

      span.addEventListener('click', function () {
        currentImageIndex = imagesByPath[currentPath].indexOf(this);
        const lightboxDiv = document.createElement('div');
        lightboxDiv.classList.add('lightbox');
        const contentToMove = this.cloneNode(true);
        lightboxDiv.appendChild(contentToMove);
        document.body.appendChild(lightboxDiv);

        let startX;
        lightboxDiv.addEventListener('touchstart', e => {
          startX = e.touches[0].clientX;
        });

        lightboxDiv.addEventListener('touchend', e => {
          const endX = e.changedTouches[0].clientX;
          if (startX - endX > 50) {
            // Swipe left
            currentImageIndex = (currentImageIndex + 1) % imagesByPath[currentPath].length;
          } else if (startX - endX < -50) {
            // Swipe right
            currentImageIndex = (currentImageIndex - 1 + imagesByPath[currentPath].length) % imagesByPath[currentPath].length;
          }
          lightboxDiv.innerHTML = '';
          const newContent = imagesByPath[currentPath][currentImageIndex].cloneNode(true);
          lightboxDiv.appendChild(newContent);
        });

        const removeLightbox = () => {
          document.body.removeChild(lightboxDiv);
          document.removeEventListener('keydown', keyListener);
        };

        lightboxDiv.addEventListener('click', removeLightbox);

        const keyListener = (event) => {
          const images = imagesByPath[currentPath] || [];
          if (event.key === "Escape") {
            removeLightbox();
          } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            if (event.key === "ArrowRight") {
              currentImageIndex = (currentImageIndex + 1) % images.length;
            } else {
              currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            }
            lightboxDiv.innerHTML = '';
            const newContent = images[currentImageIndex].cloneNode(true);
            lightboxDiv.appendChild(newContent);
          }
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
          }
        };

        document.addEventListener('keydown', keyListener);
      });
    }
  });
});