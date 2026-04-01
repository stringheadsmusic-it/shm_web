document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check if at least one inquiry checkbox is checked
      const checkboxes = contactForm.querySelectorAll('input[name="entry.1742913900"]');
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

      // Handle actual form submission to Google Forms
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      })
        .then(() => {
          // Success state UI
          contactForm.style.display = 'none';
          formSuccess.style.display = 'block';
          contactForm.reset();
        })
        .catch((error) => {
          console.error('Form submission failed:', error);
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          alert('Something went wrong. Please try again later.');
        });
    });
  }
});
