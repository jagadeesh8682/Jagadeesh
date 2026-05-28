/* ═══════════════════════════════════════════════
   main.js — Scroll, animations, navbar, counters
   ═══════════════════════════════════════════════ */

// ── Navbar scroll behaviour
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger (mobile)
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '70px';
  navLinks.style.left = 0;
  navLinks.style.right = 0;
  navLinks.style.background = 'rgba(8,12,20,.98)';
  navLinks.style.padding = '1.5rem 2rem';
  navLinks.style.borderBottom = '1px solid rgba(255,255,255,.07)';
  navLinks.style.backdropFilter = 'blur(20px)';
});

// ── AOS (scroll reveal)
const aosElements = document.querySelectorAll('[data-aos]');
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.aosDelay || 0;
      setTimeout(() => entry.target.classList.add('aos-animate'), Number(delay));
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
aosElements.forEach(el => aosObserver.observe(el));

// ── Animated counters
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

// ── Nav link open agent
document.getElementById('openAgentBtn')?.addEventListener('click', () => openAgentModal('chat'));

// ── Active nav highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--primary-light)' : '';
  });
});

// ── Profile image fallback
const profileImg = document.getElementById('profileImg');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    const fallback = document.createElement('div');
    fallback.style.cssText = `
      width:100%;height:100%;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;
      background:linear-gradient(135deg,#6366f1,#22d3ee);
      display:flex;align-items:center;justify-content:center;
      font-size:5rem;color:rgba(255,255,255,.3);font-weight:900;
    `;
    fallback.textContent = 'JS';
    profileImg.parentNode.appendChild(fallback);
  });
}

// ── Smooth scroll for nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinks.style.display === 'flex' && navLinks.style.flexDirection === 'column') {
        navLinks.style.display = 'none';
      }
    }
  });
});
