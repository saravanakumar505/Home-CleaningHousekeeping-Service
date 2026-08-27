/**
 * PureNest Animations System (animations.js)
 * IntersectionObserver Scroll Animations & Animated Counters
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initCounterAnimations();
  });

  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.animate-fade-up, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale'
    );

    if (!animatedElements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
  }

  function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter-target]');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counterEl = entry.target;
          animateCount(counterEl);
          obs.unobserve(counterEl);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(el => counterObserver.observe(el));
  }

  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-counter-target')) || 0;
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quintic
      const ease = 1 - Math.pow(1 - progress, 4);
      const currentVal = ease * target;

      if (isDecimal) {
        el.textContent = `${prefix}${currentVal.toFixed(1)}${suffix}`;
      } else {
        el.textContent = `${prefix}${Math.floor(currentVal).toLocaleString()}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (isDecimal) {
          el.textContent = `${prefix}${target.toFixed(1)}${suffix}`;
        } else {
          el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        }
      }
    }

    requestAnimationFrame(update);
  }
})();
