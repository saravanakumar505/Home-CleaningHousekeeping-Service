/**
 * PureNest Form Validation (validation.js)
 * Live Validation, Toast Notifications, and Submission States
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
  });

  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate="true"]');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');

        requiredInputs.forEach(input => {
          if (!validateField(input)) {
            isValid = false;
          }
        });

        if (isValid) {
          handleFormSuccess(form);
        }
      });

      // Live validation on blur & input
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          if (input.hasAttribute('required') || input.value.trim() !== '') {
            validateField(input);
          }
        });
        input.addEventListener('input', () => {
          const formGroup = input.closest('.form-group') || input.parentElement;
          if (formGroup && formGroup.classList.contains('has-error')) {
            validateField(input);
          }
        });
      });
    });
  }

  function validateField(input) {
    const formGroup = input.closest('.form-group') || input.parentElement;
    let valid = true;
    let errorMsg = 'This field is required.';

    if (!input.value.trim()) {
      valid = false;
    } else if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        valid = false;
        errorMsg = 'Please enter a valid email address.';
      }
    } else if (input.type === 'tel') {
      const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
      if (!phoneRegex.test(input.value.trim())) {
        valid = false;
        errorMsg = 'Please enter a valid phone number.';
      }
    } else if (input.type === 'checkbox' && !input.checked) {
      valid = false;
      errorMsg = 'You must accept the terms.';
    }

    if (formGroup) {
      const errEl = formGroup.querySelector('.form-error-msg');
      if (!valid) {
        formGroup.classList.add('has-error');
        if (errEl) errEl.textContent = errorMsg;
      } else {
        formGroup.classList.remove('has-error');
      }
    }

    return valid;
  }

  function handleFormSuccess(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" style="width:18px;height:18px;display:inline-block;vertical-align:middle;margin-right:8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg> Processing...
      `;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }

      // Success feedback alert
      showToast('Action completed successfully! Our team will contact you shortly.', 'success');
      form.reset();
    }, 1200);
  }

  window.showToast = function(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      background:${type === 'success' ? '#1E6B56' : '#DC2626'};
      color:#FFFFFF;
      padding:14px 20px;
      border-radius:10px;
      font-size:0.9rem;
      font-weight:600;
      box-shadow:0 10px 30px rgba(0,0,0,0.2);
      display:flex;
      align-items:center;
      gap:10px;
      transform:translateY(20px);
      opacity:0;
      transition:all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events:auto;
    `;
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };
})();
