// Cloudflare Turnstile Success Callback
window.onTurnstileSuccess = function () {
  const container = document.getElementById('turnstile-container');
  if (container) {
    // Smoothly fade out and collapse the widget once verified
    container.style.opacity = '0';
    container.style.height = '0px';
    container.style.marginTop = '0px';
    setTimeout(() => {
      container.style.display = 'none';
    }, 500);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  // Track when the page loaded for the time-trap spam protection
  const loadTime = Date.now();

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Spam Protection: Cloudflare Turnstile Check
      const turnstileFormData = new FormData(contactForm);
      const turnstileToken = turnstileFormData.get('cf-turnstile-response');
      if (!turnstileToken) {
        alert("Please wait for the security check to complete, or try again.");
        return;
      }

      // Spam Protection: Honeypot & Time-Trap Check
      const honeypot = document.getElementById('website_url');
      const timeElapsed = Date.now() - loadTime;
      const MIN_FILL_TIME = 4000; // 4 seconds minimum

      if ((honeypot && honeypot.value !== '') || timeElapsed < MIN_FILL_TIME) {
        // Silently block the submission but pretend it succeeded to fool bots
        console.warn('Spam submission detected and blocked.');
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        contactForm.reset();
        return;
      }

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
