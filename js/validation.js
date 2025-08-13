
document.addEventListener('DOMContentLoaded', function () {

  // ---- Helper functions ----
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMsg = document.getElementById(input.name + '-error');
    
    // For mobile form, check if it's in modal
    if (!errorMsg && input.closest('.mobile-form')) {
      const mobileErrorId = 'mobile-' + input.name + '-error';
      const mobileErrorMsg = document.getElementById(mobileErrorId);
      if (mobileErrorMsg) {
        mobileErrorMsg.textContent = message || '';
        mobileErrorMsg.classList.toggle('show', !!message);
      }
    }

    // Style for error/success
    formGroup.classList.toggle('has-error', !!message);
    formGroup.classList.toggle('has-success', !message);
    input.classList.toggle('error', !!message);
    input.classList.toggle('valid', !message);

    // Show or hide error text
    if (errorMsg) {
      errorMsg.textContent = message || '';
      errorMsg.classList.toggle('show', !!message);
    }
  }

  function isRequired(value) {
    return value.trim() !== '';
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isPhone(value) {
    return /^\+?[0-9\s\-()]{10,15}$/.test(value);
  }

  // ---- Form validation ----
  function validateForm(form) {
    let isValid = true;

    // Name
    const nameInput = form.querySelector('[name="name"]');
    if (!isRequired(nameInput.value)) {
      showError(nameInput, 'This field is required');
      isValid = false;
    } else {
      showError(nameInput, '');
    }

    // Email
    const emailInput = form.querySelector('[name="email"]');
    if (!isRequired(emailInput.value) || !isEmail(emailInput.value)) {
      showError(emailInput, 'Enter a valid email');
      isValid = false;
    } else {
      showError(emailInput, '');
    }

    // Phone
    const phoneInput = form.querySelector('[name="phone"]');
    if (!isRequired(phoneInput.value) || !isPhone(phoneInput.value)) {
      showError(phoneInput, 'Enter a valid phone');
      isValid = false;
    } else {
      showError(phoneInput, '');
    }

    // Category
    const catInput = form.querySelector('[name="category"]');
    if (!isRequired(catInput.value)) {
      showError(catInput, 'This field is required');
      isValid = false;
    } else {
      showError(catInput, '');
    }

    // Project
    const projectInput = form.querySelector('[name="project"]');
    if (!isRequired(projectInput.value)) {
      showError(projectInput, 'This field is required');
      isValid = false;
    } else {
      showError(projectInput, '');
    }

    return isValid;
  }

  // ---- Custom select dropdown ----
  function setupCustomSelect() {
    document.addEventListener('click', function (e) {
      const box = e.target.closest('.custom-select');

      // Close if clicked outside
      if (!box) {
        document.querySelectorAll('.custom-select.open').forEach(b => b.classList.remove('open'));
        return;
      }

      // Click on trigger
      if (e.target.classList.contains('cs-trigger')) {
        document.querySelectorAll('.custom-select.open').forEach(b => {
          if (b !== box) b.classList.remove('open');
        });
        box.classList.toggle('open');
        return;
      }

      // Click on option
      const option = e.target.closest('.cs-option');
      if (option) {
        box.querySelectorAll('.cs-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');

        const hiddenInput = box.querySelector('input[type="hidden"]');
        const trigger = box.querySelector('.cs-trigger');
        if (hiddenInput) hiddenInput.value = option.dataset.value || '';
        if (trigger) trigger.textContent = option.textContent.trim();

        box.classList.remove('open');
      }
    });
  }

  // ---- Form submission handler ----
  function handleFormSubmit(form, e) {
    e.preventDefault();

    if (!validateForm(form)) return;

    const btn = form.querySelector('.submit-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');

    // Show loading state
    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';

    // form success
    setTimeout(function () {
      btn.disabled = false;
      btnText.style.display = 'block';
      btnLoading.style.display = 'none';

      // Hide form and show success message
      form.style.display = 'none';
      
      // Show success message
      let successMsg;
      if (form.classList.contains('mobile-form')) {
        successMsg = document.getElementById('mobile-form-success');
      } else {
        successMsg = document.getElementById('form-success');
      }
      
      if (successMsg) {
        successMsg.style.display = 'block';
        
        // For mobile form, close modal after success
        if (form.classList.contains('mobile-form')) {
          setTimeout(() => {
            const formModal = document.getElementById('form-modal');
            if (formModal) {
              formModal.classList.remove('active');
              document.body.classList.remove('modal-open');
            }
          }, 2000);
        }
      }
    }, 1000);
  }

  // ---- Main ----
  setupCustomSelect();

  // Handle desktop form
  const desktopForm = document.querySelector('.desktop-form');
  if (desktopForm) {
    desktopForm.addEventListener('submit', function (e) {
      handleFormSubmit(desktopForm, e);
    });
  }

  // Handle mobile form
  const mobileForm = document.querySelector('.mobile-form');
  if (mobileForm) {
    mobileForm.addEventListener('submit', function (e) {
      handleFormSubmit(mobileForm, e);
    });
  }

  const legacyForm = document.querySelector('.enquiry-form:not(.desktop-form):not(.mobile-form)');
  if (legacyForm) {
    legacyForm.addEventListener('submit', function (e) {
      handleFormSubmit(legacyForm, e);
    });
  }

});
