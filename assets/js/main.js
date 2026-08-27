/**
 * PureNest Main Script (main.js)
 * Navigation, Mobile Drawer, Before/After Slider, Accordions, Estimator, Lucide Icons
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    initLucideIcons();
    initNavbarScroll();
    initMobileNavigation();
    initActiveNavLinks();
    initBeforeAfterSliders();
    initBeforeAfterTabs();
    initAccordions();
    initQuickEstimator();
    initTabFilters();
    initImageReveal();
    initSmoothPageTransitions();
  });

  /* --------------------------------------------------------------------------
     0. IMAGE SCROLL REVEAL OBSERVER
     -------------------------------------------------------------------------- */
  function initImageReveal() {
    const revealImages = document.querySelectorAll('.reveal-img, img[loading="lazy"]');
    if (!('IntersectionObserver' in window)) {
      revealImages.forEach(img => img.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '50px 0px'
    });

    revealImages.forEach(img => observer.observe(img));
  }

  /* --------------------------------------------------------------------------
     0.1 SMOOTH PAGE TRANSITIONS
     -------------------------------------------------------------------------- */
  function initSmoothPageTransitions() {
    const internalLinks = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([href^="javascript:"])');
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href) return;
        // If clicking on same page or special control
        if (href.startsWith('#') || link.closest('.nav-dropdown')) return;

        // Subtle non-blocking fade
        document.body.classList.add('page-fading');
      });
    });
  }

  /* --------------------------------------------------------------------------
     1. LUCIDE ICONS SAFE INITIALIZER
     -------------------------------------------------------------------------- */
  function initLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons();
      } catch (err) {
        // Safe fallback - zero console disruptions
      }
    }
  }
  window.refreshIcons = initLucideIcons;

  /* --------------------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT
     -------------------------------------------------------------------------- */
  function initNavbarScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------------------------------------------------------
     3. MOBILE DRAWER & RESIZE FIX (>= 1024px AUTO-CLOSE)
     -------------------------------------------------------------------------- */
  function initMobileNavigation() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const closeBtn = document.querySelector('.mobile-drawer-close');
    const drawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.mobile-drawer-overlay');

    if (!toggleBtn || !drawer || !overlay) return;

    function openDrawer() {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (drawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // ESC key closes drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeDrawer();
      }
    });

    // Close on drawer link click
    const drawerLinks = drawer.querySelectorAll('a:not(.dropdown-toggle)');
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Mandatory Resize Fix: auto-close if viewport becomes >= 1024px
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth >= 1024 && drawer.classList.contains('active')) {
          closeDrawer();
        }
      }, 100);
    });
  }

  /* --------------------------------------------------------------------------
     4. ACTIVE NAVIGATION & FOOTER AUTO-DETECTION
     -------------------------------------------------------------------------- */
  function initActiveNavLinks() {
    const currentPath = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .footer-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('javascript:')) return;

      const cleanHref = href.toLowerCase().split('?')[0].split('#')[0];
      const isHome = (currentPath.endsWith('/') || currentPath.endsWith('index.html')) && (cleanHref === 'index.html' || cleanHref === './' || cleanHref === '../index.html');
      
      if (isHome || currentPath.includes(cleanHref.replace('../', '').replace('./', ''))) {
        link.classList.add('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. INTERACTIVE BEFORE & AFTER SLIDERS
     -------------------------------------------------------------------------- */
  function initBeforeAfterSliders() {
    const baContainers = document.querySelectorAll('.before-after-container');

    baContainers.forEach(container => {
      const overlay = container.querySelector('.ba-overlay');
      const handle = container.querySelector('.ba-slider-handle');
      if (!overlay || !handle) return;

      let isDragging = false;

      function updateSlider(xPos) {
        const rect = container.getBoundingClientRect();
        let position = ((xPos - rect.left) / rect.width) * 100;
        if (position < 0) position = 0;
        if (position > 100) position = 100;

        const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
        if (isRtl) {
          overlay.style.width = `${100 - position}%`;
          handle.style.left = `${position}%`;
        } else {
          overlay.style.width = `${position}%`;
          handle.style.left = `${position}%`;
        }
      }

      // Mouse events
      handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
      });
      window.addEventListener('mouseup', () => { isDragging = false; });
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX);
      });

      // Touch events
      handle.addEventListener('touchstart', (e) => {
        isDragging = true;
      }, { passive: true });
      window.addEventListener('touchend', () => { isDragging = false; });
      window.addEventListener('touchmove', (e) => {
        if (!isDragging || !e.touches[0]) return;
        updateSlider(e.touches[0].clientX);
      }, { passive: true });

      // Click anywhere on container to reposition
      container.addEventListener('click', (e) => {
        if (e.target === handle || handle.contains(e.target)) return;
        updateSlider(e.clientX);
      });
    });
  }

  /* --------------------------------------------------------------------------
     5.1 BEFORE & AFTER TAB SWITCHER (KITCHEN / BATH / LIVING)
     -------------------------------------------------------------------------- */
  function initBeforeAfterTabs() {
    const tabButtons = document.querySelectorAll('[data-ba-target]');
    const tabPanes = document.querySelectorAll('[data-ba-pane]');

    if (!tabButtons.length || !tabPanes.length) return;

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-ba-target');

        tabButtons.forEach(b => {
          b.classList.remove('btn-primary', 'active');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary', 'active');

        tabPanes.forEach(pane => {
          if (pane.getAttribute('data-ba-pane') === target) {
            pane.style.display = 'block';
            pane.classList.add('animate-fade-in');
          } else {
            pane.style.display = 'none';
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. ACCORDION SYSTEM (FAQ & CHECKLISTS)
     -------------------------------------------------------------------------- */
  function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      if (!header || !content) return;

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        const parent = item.closest('.accordion-group');

        // Close siblings if in group
        if (parent) {
          parent.querySelectorAll('.accordion-item').forEach(sibling => {
            sibling.classList.remove('active');
            const siblingContent = sibling.querySelector('.accordion-content');
            if (siblingContent) siblingContent.style.maxHeight = null;
          });
        }

        if (!isActive) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 30 + 'px';
        } else {
          item.classList.remove('active');
          content.style.maxHeight = null;
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. QUICK PRICE ESTIMATOR (HOMEPAGE & SERVICES)
     -------------------------------------------------------------------------- */
  function initQuickEstimator() {
    const estimator = document.querySelector('#quick-estimator-form');
    if (!estimator) return;

    const baseRates = {
      standard: 95,
      deep: 165,
      movein: 195,
      moveout: 195,
      postcon: 230
    };

    const bedRate = 25;
    const bathRate = 30;

    function calculate() {
      const typeSelect = estimator.querySelector('#est-service-type');
      const bedSelect = estimator.querySelector('#est-bedrooms');
      const bathSelect = estimator.querySelector('#est-bathrooms');
      const freqSelect = estimator.querySelector('#est-frequency');
      const priceDisplay = estimator.querySelector('#est-price-display');

      if (!priceDisplay) return;

      const type = typeSelect ? typeSelect.value : 'standard';
      const beds = parseInt(bedSelect ? bedSelect.value : '2', 10);
      const baths = parseInt(bathSelect ? bathSelect.value : '1', 10);
      const freq = freqSelect ? freqSelect.value : 'onetime';

      let total = (baseRates[type] || 95) + (beds * bedRate) + (baths * bathRate);

      // Frequency discounts
      if (freq === 'weekly') total *= 0.80; // 20% off
      else if (freq === 'biweekly') total *= 0.85; // 15% off
      else if (freq === 'monthly') total *= 0.90; // 10% off

      priceDisplay.textContent = `$${Math.round(total)}`;
    }

    estimator.querySelectorAll('select, input').forEach(input => {
      input.addEventListener('change', calculate);
    });

    calculate();
  }

  /* --------------------------------------------------------------------------
     8. TAB FILTERS (BLOG & SERVICES)
     -------------------------------------------------------------------------- */
  function initTabFilters() {
    const filterBtns = document.querySelectorAll('[data-filter-target]');
    const filterItems = document.querySelectorAll('[data-filter-category]');

    if (!filterBtns.length || !filterItems.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-filter-target');

        filterBtns.forEach(b => b.classList.remove('btn-primary', 'active'));
        btn.classList.add('btn-primary', 'active');

        filterItems.forEach(item => {
          const category = item.getAttribute('data-filter-category');
          if (target === 'all' || category === target) {
            item.style.display = '';
            item.classList.add('animate-fade-in');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

})();
