document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check if at least one inquiry checkbox is checked
      const checkboxes = contactForm.querySelectorAll('input[name="inquiry"]');
      const isChecked = Array.from(checkboxes).some(cb => cb.checked);
      const checkboxGroup = contactForm.querySelector('.checkbox-group');

      if (!isChecked) {
        checkboxGroup.classList.add('invalid');
        // Add a temporary validation message if it doesn't exist
        if (!document.getElementById('checkbox-error')) {
          const errorMsg = document.createElement('p');
          errorMsg.id = 'checkbox-error';
          errorMsg.className = 'label-md';
          errorMsg.style.color = '#ff4444';
          errorMsg.style.fontSize = '0.75rem';
          errorMsg.style.marginTop = '0.5rem';
          errorMsg.textContent = 'Please select at least one inquiry type.';
          checkboxGroup.appendChild(errorMsg);
        }
        return;
      } else {
        checkboxGroup.classList.remove('invalid');
        const errorMsg = document.getElementById('checkbox-error');
        if (errorMsg) errorMsg.remove();
      }
      
      // Since the user said "just create the frontend now, i'll deal with the backend later",
      // we just simulate a successful form submission visually.
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        // Hide form and show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Form would typically be reset here if staying on the page
        // contactForm.reset();
      }, 800);
    });
  }
});
