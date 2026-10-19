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

  el.querySelectorAll('table').forEach((table) => {
    if (table.dataset.searchReady === 'true') return;
    table.dataset.searchReady = 'true';

    const wrapper = document.createElement('div');
    wrapper.classList.add('table-filter-wrapper');

    const input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Search table...';
    input.className = 'table-filter-input';

    const rows = Array.from(table.querySelectorAll('tbody tr'));

    const applyFilter = () => {
      const query = input.value.trim().toLowerCase();
      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        const matches = !query || text.includes(query);
        row.style.display = matches ? '' : 'none';
      });
    };

    input.addEventListener('input', applyFilter);
    wrapper.appendChild(input);
    table.parentNode.insertBefore(wrapper, table);
  });

  el.querySelectorAll('.ev-loss-calculator').forEach((calculator) => {
    if (calculator.dataset.evReady === 'true') return;
    calculator.dataset.evReady = 'true';

    const focalInput = calculator.querySelector('[data-field="focal-length"]');
    const extensionInput = calculator.querySelector('[data-field="extension-length"]');
    const output = calculator.querySelector('[data-field="ev-output"]');

    if (!(focalInput instanceof HTMLInputElement) || !(extensionInput instanceof HTMLInputElement) || !(output instanceof HTMLElement)) {
      return;
    }

    const updateEvLoss = () => {
      const focal = Number(focalInput.value);
      const extension = Number(extensionInput.value);

      if (!Number.isFinite(focal) || !Number.isFinite(extension) || focal <= 0 || extension < 0) {
        output.textContent = 'Invalid input';
        return;
      }

      const evLoss = 2 * Math.log2(1 + (extension / focal));
      output.textContent = evLoss.toFixed(2);
    };

    focalInput.addEventListener('input', updateEvLoss);
    extensionInput.addEventListener('input', updateEvLoss);
    updateEvLoss();
  });

  el.querySelectorAll('.aov-calculator').forEach((calculator) => {
    if (calculator.dataset.aovReady === 'true') return;
    calculator.dataset.aovReady = 'true';

    const focalInput = calculator.querySelector('[data-field="focal-length"]');
    const filmFormatInput = calculator.querySelector('[data-field="film-format"]');
    const outputH = calculator.querySelector('[data-field="aov-output-h"]');
    const outputV = calculator.querySelector('[data-field="aov-output-v"]');
    const outputD = calculator.querySelector('[data-field="aov-output-d"]');

    if (!(focalInput instanceof HTMLInputElement) || !(filmFormatInput instanceof HTMLSelectElement) || !(outputH instanceof HTMLElement) || !(outputV instanceof HTMLElement) || !(outputD instanceof HTMLElement)) {
      return;
    }

    const setInvalidOutput = () => {
      outputH.textContent = 'Invalid input';
      outputV.textContent = 'Invalid input';
      outputD.textContent = 'Invalid input';
    };

    const updateAngleOfView = () => {
      const focal = Number(focalInput.value);
      const dimensions = filmFormatInput.value.split('x');
      const width = Number(dimensions[0]);
      const height = Number(dimensions[1]);

      if (!Number.isFinite(focal) || !Number.isFinite(width) || !Number.isFinite(height) || focal <= 0 || width <= 0 || height <= 0) {
        setInvalidOutput();
        return;
      }

      const diagonal = Math.hypot(width, height);
      const angleHorizontal = 2 * Math.atan(width / (2 * focal));
      const angleVertical = 2 * Math.atan(height / (2 * focal));
      const angleDiagonal = 2 * Math.atan(diagonal / (2 * focal));

      outputH.textContent = (angleHorizontal * (180 / Math.PI)).toFixed(2);
      outputV.textContent = (angleVertical * (180 / Math.PI)).toFixed(2);
      outputD.textContent = (angleDiagonal * (180 / Math.PI)).toFixed(2);
    };

    focalInput.addEventListener('input', updateAngleOfView);
    filmFormatInput.addEventListener('change', updateAngleOfView);
    updateAngleOfView();
  });

  el.querySelectorAll('.equiv-focal-calculator').forEach((calculator) => {
    if (calculator.dataset.equivFocalReady === 'true') return;
    calculator.dataset.equivFocalReady = 'true';

    const focalInput = calculator.querySelector('[data-field="original-focal-length"]');
    const originalFilmFormatInput = calculator.querySelector('[data-field="original-film-format"]');
    const equivalentFilmFormatInput = calculator.querySelector('[data-field="equivalent-film-format"]');
    const outputH = calculator.querySelector('[data-field="equiv-focal-output-h"]');
    const outputV = calculator.querySelector('[data-field="equiv-focal-output-v"]');
    const outputD = calculator.querySelector('[data-field="equiv-focal-output-d"]');

    if (!(focalInput instanceof HTMLInputElement) || !(originalFilmFormatInput instanceof HTMLSelectElement) || !(equivalentFilmFormatInput instanceof HTMLSelectElement) || !(outputH instanceof HTMLElement) || !(outputV instanceof HTMLElement) || !(outputD instanceof HTMLElement)) {
      return;
    }

    const setInvalidOutput = () => {
      outputH.textContent = 'Invalid input';
      outputV.textContent = 'Invalid input';
      outputD.textContent = 'Invalid input';
    };

    const updateEquivalentFocalLength = () => {
      const focal = Number(focalInput.value);
      const originalDimensions = originalFilmFormatInput.value.split('x');
      const equivalentDimensions = equivalentFilmFormatInput.value.split('x');
      const originalWidth = Number(originalDimensions[0]);
      const originalHeight = Number(originalDimensions[1]);
      const equivalentWidth = Number(equivalentDimensions[0]);
      const equivalentHeight = Number(equivalentDimensions[1]);

      if (!Number.isFinite(focal) || !Number.isFinite(originalWidth) || !Number.isFinite(originalHeight) || !Number.isFinite(equivalentWidth) || !Number.isFinite(equivalentHeight) || focal <= 0 || originalWidth <= 0 || originalHeight <= 0 || equivalentWidth <= 0 || equivalentHeight <= 0) {
        setInvalidOutput();
        return;
      }

      const originalDiagonal = Math.hypot(originalWidth, originalHeight);
      const equivalentDiagonal = Math.hypot(equivalentWidth, equivalentHeight);

      const equivH = focal * (equivalentWidth / originalWidth);
      const equivV = focal * (equivalentHeight / originalHeight);
      const equivD = focal * (equivalentDiagonal / originalDiagonal);

      outputH.textContent = equivH.toFixed(1);
      outputV.textContent = equivV.toFixed(1);
      outputD.textContent = equivD.toFixed(1);
    };

    focalInput.addEventListener('input', updateEquivalentFocalLength);
    originalFilmFormatInput.addEventListener('change', updateEquivalentFocalLength);
    equivalentFilmFormatInput.addEventListener('change', updateEquivalentFocalLength);
    updateEquivalentFocalLength();
  });

  el.querySelectorAll('.focus-distance-calculator').forEach((calculator) => {
    if (calculator.dataset.focusReady === 'true') return;
    calculator.dataset.focusReady = 'true';

    const focalInput = calculator.querySelector('[data-field="focal-length"]');
    const focusDistanceInput = calculator.querySelector('[data-field="focus-distance"]');
    const extensionInput = calculator.querySelector('[data-field="extension-length"]');
    const outputMm = calculator.querySelector('[data-field="focus-output-mm"]');
    const outputM = calculator.querySelector('[data-field="focus-output-m"]');

    if (!(focalInput instanceof HTMLInputElement) || !(focusDistanceInput instanceof HTMLInputElement) || !(extensionInput instanceof HTMLInputElement) || !(outputMm instanceof HTMLElement) || !(outputM instanceof HTMLElement)) {
      return;
    }

    const updateFocusDistance = () => {
      const focal = Number(focalInput.value);
      const focusDistance = Number(focusDistanceInput.value);
      const extension = Number(extensionInput.value);

      if (!Number.isFinite(focal) || !Number.isFinite(focusDistance) || !Number.isFinite(extension) || focal <= 0 || focusDistance <= 0 || extension < 0 || focusDistance <= focal) {
        outputMm.textContent = 'Invalid input';
        outputM.textContent = 'Invalid input';
        return;
      }

      const inverseDi = (1 / focal) - (1 / focusDistance);
      if (inverseDi <= 0) {
        outputMm.textContent = 'Invalid input';
        outputM.textContent = 'Invalid input';
        return;
      }

      const di = 1 / inverseDi;
      const diNew = di + extension;
      const inverseDoPrime = (1 / focal) - (1 / diNew);
      if (inverseDoPrime <= 0) {
        outputMm.textContent = 'Invalid input';
        outputM.textContent = 'Invalid input';
        return;
      }

      const doPrime = 1 / inverseDoPrime;
      outputMm.textContent = doPrime.toFixed(1);
      outputM.textContent = (doPrime / 1000).toFixed(3);
    };

    focalInput.addEventListener('input', updateFocusDistance);
    focusDistanceInput.addEventListener('input', updateFocusDistance);
    extensionInput.addEventListener('input', updateFocusDistance);
    updateFocusDistance();
  });

  el.querySelectorAll('.tele-aperture-calculator').forEach((calculator) => {
    if (calculator.dataset.teleApertureReady === 'true') return;
    calculator.dataset.teleApertureReady = 'true';

    const baseFnumberInput = calculator.querySelector('[data-field="base-fnumber"]');
    const ratioInput = calculator.querySelector('[data-field="tele-ratio"]');
    const output = calculator.querySelector('[data-field="aperture-output"]');

    if (!(baseFnumberInput instanceof HTMLInputElement) || !(ratioInput instanceof HTMLInputElement) || !(output instanceof HTMLElement)) {
      return;
    }

    const updateTeleAperture = () => {
      const baseFnumber = Number(baseFnumberInput.value);
      const ratio = Number(ratioInput.value);

      if (!Number.isFinite(baseFnumber) || !Number.isFinite(ratio) || baseFnumber <= 0 || ratio < 1) {
        output.textContent = 'Invalid input';
        return;
      }

      const reducedAperture = baseFnumber * ratio;
      output.textContent = `f/${reducedAperture.toFixed(1)}`;
    };

    baseFnumberInput.addEventListener('input', updateTeleAperture);
    ratioInput.addEventListener('input', updateTeleAperture);
    updateTeleAperture();
  });
});