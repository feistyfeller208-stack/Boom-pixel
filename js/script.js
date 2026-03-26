// ===== GALLERY ITEM STAGGERED ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.gallery-item');
  
  items.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.08}s`;
  });

  // ===== LIGHTBOX FUNCTIONALITY =====
  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(5px);
          animation: fadeInUp 0.3s ease;
        `;

        const imgClone = img.cloneNode();
        imgClone.style.cssText = `
          max-width: 90%;
          max-height: 90%;
          border-radius: 8px;
          box-shadow: 0 10px 50px rgba(255, 107, 53, 0.5);
        `;

        lightbox.appendChild(imgClone);

        // Close on click
        lightbox.addEventListener('click', () => {
          document.body.removeChild(lightbox);
        });

        // Close on ESC key
        const closeOnEscape = (e) => {
          if (e.key === 'Escape') {
            document.body.removeChild(lightbox);
            document.removeEventListener('keydown', closeOnEscape);
          }
        };
        document.addEventListener('keydown', closeOnEscape);

        document.body.appendChild(lightbox);
      }
    });
  });

  // ===== LAZY LOAD IMAGES =====
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

  // ===== HERO VIDEO AUTO-PAUSE WHEN OUT OF VIEW =====
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

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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

  // ===== FORM SUBMISSION HANDLING (Optional) =====
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // Form will submit to Formspree or your backend
      // Add custom handling here if needed
      console.log('Form submitted');
    });
  }
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
