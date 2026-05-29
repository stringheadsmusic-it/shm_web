// Google Apps Script Web App URL
// REPLACE THIS with your deployed Web App URL from Google Sheets
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwo163-jBcvO3Eq1icHr19cNzf29mg8R2SxRkhWC75NmBYJzpI3ShvrZbRcKItzs6rD/exec";

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

      // Handle actual form submission to Google Apps Script proxy
      if (APPS_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
        alert("Developer configuration required: Please deploy the Google Apps Script and update APPS_SCRIPT_URL in script.js.");
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      // Gather checked inquiries
      const selectedInquiries = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value)
        .join(', ');

      const payload = {
        'cf-turnstile-response': turnstileToken,
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        inquiries: selectedInquiries,
        message: document.getElementById('message').value
      };

      fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8' // Send as text/plain to easily avoid preflight CORS blocks
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            // Success state UI
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            contactForm.reset();
          } else {
            throw new Error(data.error || 'Verification failed.');
          }
        })
        .catch((error) => {
          console.error('Form submission failed:', error);
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';

          // Reset Turnstile widget to allow another attempt
          if (typeof turnstile !== 'undefined') {
            turnstile.reset();
            const container = document.getElementById('turnstile-container');
            if (container) {
              container.style.display = 'block';
              container.style.opacity = '1';
              container.style.height = 'auto';
              container.style.marginTop = '0.5rem';
            }
          }

          alert(`Submission failed: ${error.message || 'Please try again later.'}`);
        });
    });
  }
});
