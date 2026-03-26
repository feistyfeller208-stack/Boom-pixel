// js/script.js - BOOM PIXEL Interactions

document.addEventListener('DOMContentLoaded', () => {
  // Staggered Gallery Item Animations
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    
    // Trigger animation on load
    setTimeout(() => {
      item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Hero Video Auto-Play Management
  const heroVideo = document.querySelector('.hero-background video');
  if (heroVideo) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroVideo.play();
        } else {
          heroVideo.pause();
        }
      });
    });
    observer.observe(heroVideo);
  }

  // Gallery Item Click - Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', openLightbox);
  });

  function openLightbox(e) {
    const media = e.currentTarget.querySelector('.gallery-item-media');
    const title = e.currentTarget.querySelector('.gallery-item-title')?.textContent || 'BOOM PIXEL';
    
    if (!media) return;

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close">&times;</button>
        <img src="${media.src}" alt="${title}" style="max-width: 90%; max-height: 90%; border-radius: 12px;">
        <p style="color: #ff4500; margin-top: 1rem; text-align: center; font-weight: 700;">${title}</p>
      </div>
    `;
    lightbox.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.95); z-index: 2000;
      display: flex; align-items: center; justify-content: center;
      animation: fadeIn 0.3s ease;
    `;

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      lightbox.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => document.body.removeChild(lightbox), 300);
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.click();
        lightbox.querySelector('.lightbox-close').click();
      }
    });

    document.body.appendChild(lightbox);
  }

  // Smooth Scroll for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Active Navigation Link
  window.addEventListener('scroll', updateActiveNav);
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const link = document.querySelector(`nav a[href="#${section.id}"]`);
      if (link) {
        if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
          link.style.color = 'var(--primary)';
        } else {
          link.style.color = 'var(--text-light)';
        }
      }
    });
  }
});

// Add Lightbox Animations to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);
