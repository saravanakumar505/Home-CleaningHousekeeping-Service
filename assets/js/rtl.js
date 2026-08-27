/**
 * PureNest RTL Management (rtl.js)
 * Persistent LTR / RTL Mode with DOM Direction Mirroring
 */
(function () {
  const RTL_KEY = 'purenest_direction';

  function getPreferredDir() {
    return localStorage.getItem(RTL_KEY) || 'ltr';
  }

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    if (dir === 'rtl') {
      document.documentElement.classList.add('rtl-active');
    } else {
      document.documentElement.classList.remove('rtl-active');
    }
    updateRTLButtons(dir);
    window.dispatchEvent(new CustomEvent('directionChanged', { detail: { dir } }));
  }

  function updateRTLButtons(dir) {
    const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
    rtlBtns.forEach(btn => {
      const label = btn.querySelector('.rtl-label');
      if (label) {
        label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
    });
  }

  // Initial immediate apply
  applyDir(getPreferredDir());

  document.addEventListener('DOMContentLoaded', () => {
    updateRTLButtons(getPreferredDir());

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        localStorage.setItem(RTL_KEY, nextDir);
        applyDir(nextDir);
      });
    });
  });
})();
