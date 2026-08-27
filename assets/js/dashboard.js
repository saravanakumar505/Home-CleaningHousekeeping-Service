/**
 * PureNest Dashboard & Admin Engine (dashboard.js)
 * Multi-Step Booking Wizard, Live GPS Simulation, Charts & Table Filters
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    initMultiStepBooking();
    initCleanerTracker();
    initTableSearchAndFilter();
    initStarRating();
  });

  /* --------------------------------------------------------------------------
     1. MULTI-STEP BOOKING WIZARD
     -------------------------------------------------------------------------- */
  function initMultiStepBooking() {
    const wizard = document.querySelector('#booking-wizard-container');
    if (!wizard) return;

    let currentStep = 1;
    const totalSteps = 7;

    const steps = wizard.querySelectorAll('.wizard-step');
    const progressFill = wizard.querySelector('#wizard-progress-bar');
    const stepIndicators = wizard.querySelectorAll('.step-indicator-node');
    const prevBtn = wizard.querySelector('#wizard-prev-btn');
    const nextBtn = wizard.querySelector('#wizard-next-btn');
    const priceDisplay = wizard.querySelector('#wizard-total-price');

    let bookingData = {
      service: 'deep',
      serviceName: 'Deep Cleaning',
      bedrooms: 2,
      bathrooms: 2,
      sqft: '1500-2000',
      date: '2026-08-30',
      time: '09:00 AM',
      frequency: 'biweekly',
      extras: ['fridge', 'oven'],
      notes: ''
    };

    function calculateTotal() {
      let base = 120;
      if (bookingData.service === 'deep') base = 180;
      if (bookingData.service === 'movein' || bookingData.service === 'moveout') base = 210;
      if (bookingData.service === 'postcon') base = 260;

      let roomCost = (bookingData.bedrooms * 25) + (bookingData.bathrooms * 30);
      let extrasCost = (bookingData.extras.length * 25);
      let subtotal = base + roomCost + extrasCost;

      if (bookingData.frequency === 'weekly') subtotal *= 0.80;
      else if (bookingData.frequency === 'biweekly') subtotal *= 0.85;
      else if (bookingData.frequency === 'monthly') subtotal *= 0.90;

      if (priceDisplay) {
        priceDisplay.textContent = `$${Math.round(subtotal)}`;
      }

      // Update summary fields if on step 6
      const summaryService = wizard.querySelector('#summary-service');
      const summaryRooms = wizard.querySelector('#summary-rooms');
      const summarySchedule = wizard.querySelector('#summary-schedule');
      const summaryExtras = wizard.querySelector('#summary-extras');

      if (summaryService) summaryService.textContent = bookingData.serviceName;
      if (summaryRooms) summaryRooms.textContent = `${bookingData.bedrooms} Bed, ${bookingData.bathrooms} Bath`;
      if (summarySchedule) summarySchedule.textContent = `${bookingData.date} at ${bookingData.time} (${bookingData.frequency})`;
      if (summaryExtras) summaryExtras.textContent = bookingData.extras.length ? bookingData.extras.join(', ') : 'None';
    }

    function showStep(step) {
      steps.forEach((el, index) => {
        el.style.display = (index + 1 === step) ? 'block' : 'none';
      });

      if (progressFill) {
        const percent = ((step - 1) / (totalSteps - 1)) * 100;
        progressFill.style.width = `${percent}%`;
      }

      stepIndicators.forEach((node, idx) => {
        if (idx + 1 < step) {
          node.classList.add('bg-primary', 'text-white', 'border-primary');
          node.classList.remove('bg-surface', 'border-border');
        } else if (idx + 1 === step) {
          node.classList.add('bg-secondary', 'text-text-main', 'border-secondary', 'font-bold');
        } else {
          node.classList.remove('bg-primary', 'bg-secondary', 'text-white');
          node.classList.add('bg-surface', 'border-border');
        }
      });

      if (prevBtn) {
        prevBtn.style.visibility = (step === 1 || step === totalSteps) ? 'hidden' : 'visible';
      }

      if (nextBtn) {
        if (step === totalSteps - 1) {
          nextBtn.textContent = 'Confirm & Pay Now';
        } else if (step === totalSteps) {
          nextBtn.style.display = 'none';
        } else {
          nextBtn.textContent = 'Continue to Next Step';
          nextBtn.style.display = 'inline-flex';
        }
      }

      calculateTotal();
      if (window.refreshIcons) window.refreshIcons();
    }

    // Step navigation
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          currentStep++;
          showStep(currentStep);
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          showStep(currentStep);
        }
      });
    }

    // Service card selections
    const serviceCards = wizard.querySelectorAll('.booking-service-opt');
    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        serviceCards.forEach(c => c.classList.remove('border-primary', 'bg-primary-light'));
        card.classList.add('border-primary', 'bg-primary-light');
        bookingData.service = card.getAttribute('data-service') || 'deep';
        bookingData.serviceName = card.querySelector('.service-title')?.textContent || 'Deep Clean';
        calculateTotal();
      });
    });

    // Extras toggle
    const extraCheckboxes = wizard.querySelectorAll('.extra-addon-checkbox');
    extraCheckboxes.forEach(chk => {
      chk.addEventListener('change', () => {
        const val = chk.value;
        if (chk.checked) {
          if (!bookingData.extras.includes(val)) bookingData.extras.push(val);
        } else {
          bookingData.extras = bookingData.extras.filter(item => item !== val);
        }
        calculateTotal();
      });
    });

    // Room quantity controls
    wizard.querySelectorAll('.counter-btn-inc').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = wizard.querySelector(`#${targetId}`);
        if (input) {
          let val = parseInt(input.value || 0, 10) + 1;
          input.value = val;
          if (targetId === 'bed-count') bookingData.bedrooms = val;
          if (targetId === 'bath-count') bookingData.bathrooms = val;
          calculateTotal();
        }
      });
    });

    wizard.querySelectorAll('.counter-btn-dec').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = wizard.querySelector(`#${targetId}`);
        if (input) {
          let val = Math.max(1, parseInt(input.value || 0, 10) - 1);
          input.value = val;
          if (targetId === 'bed-count') bookingData.bedrooms = val;
          if (targetId === 'bath-count') bookingData.bathrooms = val;
          calculateTotal();
        }
      });
    });

    showStep(currentStep);
  }

  /* --------------------------------------------------------------------------
     2. CLEANER LIVE GPS TRACKER
     -------------------------------------------------------------------------- */
  function initCleanerTracker() {
    const trackerContainer = document.querySelector('#cleaner-live-tracker');
    if (!trackerContainer) return;

    const stages = ['assigned', 'on_way', 'nearby', 'arrived', 'cleaning', 'completed'];
    let currentStageIndex = 1; // "On Way"

    const stepNodes = trackerContainer.querySelectorAll('.tracking-stage-node');
    const etaText = trackerContainer.querySelector('#tracker-eta-text');
    const statusPill = trackerContainer.querySelector('#tracker-status-pill');

    function updateTrackerDisplay() {
      stepNodes.forEach((node, idx) => {
        const marker = node.querySelector('.stage-marker');
        const title = node.querySelector('.stage-title');

        if (idx < currentStageIndex) {
          if (marker) {
            marker.classList.add('bg-primary', 'text-white', 'border-primary');
            marker.classList.remove('bg-surface', 'border-border', 'pulse-indicator');
          }
          if (title) title.classList.add('text-primary');
        } else if (idx === currentStageIndex) {
          if (marker) {
            marker.classList.add('bg-secondary', 'text-text-main', 'border-secondary', 'pulse-indicator');
            marker.classList.remove('bg-surface', 'border-border');
          }
          if (title) title.classList.add('font-bold', 'text-text-main');
        } else {
          if (marker) {
            marker.classList.remove('bg-primary', 'bg-secondary', 'pulse-indicator', 'text-white');
            marker.classList.add('bg-surface', 'border-border', 'text-muted');
          }
          if (title) title.classList.remove('text-primary', 'font-bold');
        }
      });

      if (etaText) {
        const etas = ['18 mins', '12 mins', '4 mins', 'Arrived', 'In Progress (1h 15m remaining)', 'Completed'];
        etaText.textContent = etas[currentStageIndex];
      }

      if (statusPill) {
        const labels = ['Assigned', 'En Route (0.8 mi)', 'Nearby & Approaching', 'At Doorstep', 'Cleaning in Progress', 'Job Finished'];
        statusPill.textContent = labels[currentStageIndex];
      }
    }

    // Demo simulation buttons
    const advanceBtn = trackerContainer.querySelector('#btn-advance-tracker');
    if (advanceBtn) {
      advanceBtn.addEventListener('click', () => {
        currentStageIndex = (currentStageIndex + 1) % stages.length;
        updateTrackerDisplay();
        if (window.showToast) {
          window.showToast(`Tracking status updated to: ${stages[currentStageIndex].replace('_', ' ').toUpperCase()}`, 'info');
        }
      });
    }

    updateTrackerDisplay();
  }

  /* --------------------------------------------------------------------------
     3. TABLE SEARCH AND FILTER
     -------------------------------------------------------------------------- */
  function initTableSearchAndFilter() {
    const searchInputs = document.querySelectorAll('[data-table-search]');

    searchInputs.forEach(input => {
      const tableId = input.getAttribute('data-table-search');
      const table = document.querySelector(`#${tableId}`);
      if (!table) return;

      input.addEventListener('input', () => {
        const query = input.value.toLowerCase().trim();
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? '' : 'none';
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. STAR RATING PICKER
     -------------------------------------------------------------------------- */
  function initStarRating() {
    const starContainers = document.querySelectorAll('.star-rating-picker');

    starContainers.forEach(container => {
      const stars = container.querySelectorAll('.star-item');
      const input = container.querySelector('input[type="hidden"]');

      stars.forEach((star, index) => {
        star.addEventListener('click', () => {
          const rating = index + 1;
          if (input) input.value = rating;

          stars.forEach((s, i) => {
            if (i < rating) {
              s.classList.add('text-secondary', 'fill-secondary');
              s.classList.remove('text-border');
            } else {
              s.classList.remove('text-secondary', 'fill-secondary');
              s.classList.add('text-border');
            }
          });
        });
      });
    });
  }

})();
