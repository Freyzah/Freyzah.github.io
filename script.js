// ============================================
// NAV — sticky background on scroll
// ============================================

const nav = document.getElementById('nav');

const handleScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
};

window.addEventListener('scroll', handleScroll, { passive: true });

// ============================================
// MOBILE MENU
// ============================================

const toggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ============================================
// SCROLL REVEAL
// ============================================

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// ACTIVE NAV LINK
// ============================================

const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach(section => sectionObserver.observe(section));

// ============================================
// CARD TILT EFFECT
// ============================================

document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'border-color 0.3s, box-shadow 0.4s';
  });

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = '';
    card.style.transform = '';
  });
});
