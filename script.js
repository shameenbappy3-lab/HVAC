// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-in-out'
});

// ── Sticky header ──────────────────────────────────────────────
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mobile menu toggle ─────────────────────────────────────────
const hamburger  = document.getElementById('hamburgerBtn');
const navBar     = document.getElementById('navBar');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  navBar.classList.add('active');
  navOverlay.classList.add('active');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  navBar.classList.remove('active');
  navOverlay.classList.remove('active');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

hamburger.addEventListener('click', () => {
  navBar.classList.contains('active') ? closeMenu() : openMenu();
});

// Close menu when overlay is clicked
navOverlay.addEventListener('click', closeMenu);

// Close menu on nav link click
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navBar.classList.contains('active')) {
    closeMenu();
  }
});

// ── Smooth scroll for anchor links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  });
});

// ── Contact form submission ────────────────────────────────────
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;

    // Simulate network delay (replace with EmailJS or backend call)
    setTimeout(() => {
      contactForm.innerHTML = `
        <div class="form-success" role="alert">
          <div class="form-success-icon"><i class="fas fa-check"></i></div>
          <h3>Request received!</h3>
          <p>Thanks for reaching out. We'll call you back within a few hours.</p>
        </div>`;
    }, 1400);
  });
}

// ── Newsletter form ────────────────────────────────────────────
const newsletterForm = document.querySelector('.footer-newsletter form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (!input.value) return;
    newsletterForm.innerHTML = '<p style="color:#FFB200;font-size:0.88rem;padding:10px 0">✓ You\'re subscribed!</p>';
  });
}

// ── Active nav highlight on scroll ────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + header.offsetHeight + 80;
  let current = '';

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
