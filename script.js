/* =================================================================
   QUIET REWIRE — SCRIPT.JS
   Handles: fade-in on scroll, sticky nav visibility, FAQ accordion.
   Smooth scroll between anchor links is handled via CSS (scroll-behavior).
   ================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------
     1. FADE-IN SECTIONS ON SCROLL
     --------------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach((el) => fadeObserver.observe(el));

  /* ---------------------------------------------------------------
     2. STICKY NAV — appears once the hero CTA scrolls out of view
     --------------------------------------------------------------- */
  const nav = document.getElementById('site-nav');
  const heroCta = document.querySelector('#hero [data-cta]');

  if (nav && heroCta) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Show sticky nav once the hero CTA is no longer visible;
        // hide it again while the hero CTA is in view.
        nav.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });

    navObserver.observe(heroCta);
  }

  /* ---------------------------------------------------------------
     3. FAQ ACCORDION — only one panel open at a time
     --------------------------------------------------------------- */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-item__trigger');
    const panel = item.querySelector('.accordion-item__panel');

    trigger.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';

      // Close every other item first
      accordionItems.forEach((other) => {
        if (other !== item) {
          other.setAttribute('data-open', 'false');
          other.querySelector('.accordion-item__trigger').setAttribute('aria-expanded', 'false');
          other.querySelector('.accordion-item__panel').style.maxHeight = null;
        }
      });

      // Toggle the clicked item
      const nextState = !isOpen;
      item.setAttribute('data-open', String(nextState));
      trigger.setAttribute('aria-expanded', String(nextState));
      panel.style.maxHeight = nextState ? panel.scrollHeight + 'px' : null;
    });
  });

});
