// Mobile Form Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileEnquiryBtn = document.getElementById('mobile-enquiry-btn');
  const formModal = document.getElementById('form-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const body = document.body;
  
  function openFormModal() {
    formModal.classList.add('active');
    body.classList.add('modal-open');
    // Focus on first input for accessibility
    const firstInput = formModal.querySelector('.form-input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
  
  function closeFormModal() {
    formModal.classList.remove('active');
    body.classList.remove('modal-open');
  }
  
  // Open modal when Send Enquiry button is clicked
  if (mobileEnquiryBtn) {
    mobileEnquiryBtn.addEventListener('click', openFormModal);
  }
  
  // Close modal when overlay is clicked
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeFormModal);
  }
  
  // Close modal when close button is clicked
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeFormModal);
  }
  
  // Close modal on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && formModal.classList.contains('active')) {
      closeFormModal();
    }
  });
  
  // Close modal on window resize (if switching to desktop)
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeFormModal();
    }
  });
});
