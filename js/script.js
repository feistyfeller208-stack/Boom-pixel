// ===== CAR GALLERY DATA =====
const carGalleries = {
  'car-1': {
    name: 'Sunset Cruise',
    images: [
      'assets/images/cars/car-1/photo-1.jpg',
      'assets/images/cars/car-1/photo-2.jpg',
      'assets/images/cars/car-1/photo-3.jpg',
      'assets/images/cars/car-1/photo-4.jpg',
      'assets/images/cars/car-1/photo-5.jpg'
    ]
  },
  'car-2': {
    name: 'Urban Motion',
    images: [
      'assets/images/cars/car-2/photo-1.jpg',
      'assets/images/cars/car-2/photo-2.jpg',
      'assets/images/cars/car-2/photo-3.jpg',
      'assets/images/cars/car-2/photo-4.jpg'
    ]
  },
  'car-3': {
    name: 'Street Performance',
    images: [
      'assets/images/cars/car-3/photo-1.jpg',
      'assets/images/cars/car-3/photo-2.jpg',
      'assets/images/cars/car-3/photo-3.jpg',
      'assets/images/cars/car-3/photo-4.jpg',
      'assets/images/cars/car-3/photo-5.jpg',
      'assets/images/cars/car-3/photo-6.jpg'
    ]
  },
  'car-4': {
    name: 'Night Drive',
    images: [
      'assets/images/cars/car-4/photo-1.jpg',
      'assets/images/cars/car-4/photo-2.jpg',
      'assets/images/cars/car-4/photo-3.jpg',
      'assets/images/cars/car-4/photo-4.jpg',
      'assets/images/cars/car-4/photo-5.jpg',
      'assets/images/cars/car-4/photo-6.jpg',
      'assets/images/cars/car-4/photo-7.jpg'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // ===== STAGGERED GALLERY ANIMATION =====
  const items = document.querySelectorAll('.gallery-item');
  items.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.08}s`;
  });

  // ===== MULTI-IMAGE LIGHTBOX =====
  let currentCarId = null;
  let currentImageIndex = 0;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const carId = item.getAttribute('data-car-id');
      if (carId && carGalleries[carId]) {
        currentCarId = carId;
        currentImageIndex = 0;
        openLightbox();
      }
    });
  });

  function openLightbox() {
    const carData = carGalleries[currentCarId];
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.id = 'lightbox-modal';

    const imageUrl = carData.images[currentImageIndex];

    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" onclick="closeLightbox()">✕</button>
        <button class="lightbox-nav prev" onclick="prevImage()">❮</button>
        <img src="${imageUrl}" alt="${carData.name} - Photo ${currentImageIndex + 1}" class="lightbox-image">
        <button class="lightbox-nav next" onclick="nextImage()">❯</button>
        <div class="lightbox-counter">${currentImageIndex + 1} / ${carData.images.length}</div>
      </div>
    `;

    document.body.appendChild(lightbox);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on ESC key
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
        document.removeEventListener('keydown', closeOnEscape);
      }
    };
    document.addEventListener('keydown', closeOnEscape);

    // Keyboard navigation
    const navigateOnArrows = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    document.addEventListener('keydown', navigateOnArrows);
  }

  // Make functions global so buttons can call them
  window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox) {
      lightbox.style.animation = 'fadeOutDown 0.3s ease forwards';
      setTimeout(() => {
        if (lightbox.parentNode) {
          document.body.removeChild(lightbox);
        }
      }, 300);
    }
  };

  window.nextImage = function() {
    const carData = carGalleries[currentCarId];
    currentImageIndex = (currentImageIndex + 1) % carData.images.length;
    updateLightboxImage();
  };

  window.prevImage = function() {
    const carData = carGalleries[currentCarId];
    currentImageIndex = (currentImageIndex - 1 + carData.images.length) % carData.images.length;
    updateLightboxImage();
  };

  function updateLightboxImage() {
    const carData = carGalleries[currentCarId];
    const imageUrl = carData.images[currentImageIndex];
    const lightboxImage = document.querySelector('.lightbox-image');
    const counter = document.querySelector('.lightbox-counter');

    if (lightboxImage) {
      lightboxImage.style.opacity = '0';
      setTimeout(() => {
        lightboxImage.src = imageUrl;
        lightboxImage.style.opacity = '1';
        counter.textContent = `${currentImageIndex + 1} / ${carData.images.length}`;
      }, 150);
      lightboxImage.style.transition = 'opacity 0.3s ease';
    }
  }

  // ===== LAZY LOADING =====
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '1';
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      imageObserver.observe(img);
    });
  }

  // ===== HERO VIDEO AUTO-PAUSE =====
  const heroVideo = document.querySelector('.hero video');
  if (heroVideo) {
    let ticking = false;
    
    function updateVideo() {
      const rect = document.querySelector('.hero').getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        heroVideo.pause();
      } else {
        heroVideo.play();
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateVideo);
        ticking = true;
      }
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// ===== SCROLL EFFECT FOR NAV =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
