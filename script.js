/* ============================================
   DR. AISSA — JavaScript Controller
   Language Switching · Navigation · Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Language Switching ───────────────────────────
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-fr]');
    const langContentBlocks = document.querySelectorAll('.lang-content');
    let currentLang = 'fr';

    function switchLanguage(lang) {
        currentLang = lang;

        // Update buttons
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Translate data-attribute elements
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                el.textContent = text;
            }
        });

        // Toggle lang-content blocks
        langContentBlocks.forEach(block => {
            block.classList.remove('active');
            if (block.classList.contains(`lang-${lang}`)) {
                block.classList.add('active');
            }
        });

        // Update document lang
        document.documentElement.lang = lang;

        // Update form success message if visible
        const successMsg = document.querySelector('.form-success');
        if (successMsg) {
            const h3 = successMsg.querySelector('h3');
            const p = successMsg.querySelector('p');
            if (h3 && p) {
                const messages = {
                    fr: { title: 'Message envoyé !', desc: 'Nous vous répondrons dans les plus brefs délais.' },
                    de: { title: 'Nachricht gesendet!', desc: 'Wir werden uns so schnell wie möglich bei Ihnen melden.' },
                    en: { title: 'Message sent!', desc: 'We will get back to you as soon as possible.' }
                };
                h3.textContent = messages[lang].title;
                p.textContent = messages[lang].desc;
            }
        }
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });


    // ─── Navbar Scroll Effect ────────────────────────
    const navbar = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section, .hero');

    function onScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Active section highlighting
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();


    // ─── Mobile Navigation ───────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleMobileNav() {
        const isOpen = navLinksContainer.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        overlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMobileNav() {
        navLinksContainer.classList.remove('open');
        hamburger.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMobileNav);
    overlay.addEventListener('click', closeMobileNav);

    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });


    // ─── Smooth Scroll for Anchors ───────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ─── Scroll Reveal Animations ────────────────────
    const animElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for grid items
                const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
                const siblingIndex = Array.from(siblings).indexOf(entry.target);
                const delay = siblingIndex * 150;

                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => observer.observe(el));


    // ─── Section Title Reveal ────────────────────────
    const sectionLabels = document.querySelectorAll('.section-label');
    const sectionTitles = document.querySelectorAll('.section-title');

    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    [...sectionLabels, ...sectionTitles].forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        titleObserver.observe(el);
    });


    // ─── Contact Form ────────────────────────────────
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simple validation visual feedback
        if (!name || !email || !message) return;

        // Simulate form submission
        const formWrap = contactForm.parentElement;

        const messages = {
            fr: { title: 'Message envoyé !', desc: 'Nous vous répondrons dans les plus brefs délais.' },
            de: { title: 'Nachricht gesendet!', desc: 'Wir werden uns so schnell wie möglich bei Ihnen melden.' },
            en: { title: 'Message sent!', desc: 'We will get back to you as soon as possible.' }
        };

        const msg = messages[currentLang];

        formWrap.innerHTML = `
      <div class="form-success">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h3>${msg.title}</h3>
        <p>${msg.desc}</p>
      </div>
    `;
    });


    // ─── Input Focus Animations ──────────────────────
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value) {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });


    // ─── Parallax Effect for Hero Background ─────────
    const heroMap = document.querySelector('.hero-africa-map');

    if (heroMap) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            if (scrollY < heroHeight) {
                const parallax = scrollY * 0.3;
                heroMap.style.transform = `translateY(${parallax}px) scale(${1 + scrollY * 0.0002})`;
            }
        }, { passive: true });
    }


    // ─── Preloader ───────────────────────────────────
    // Add preloader to DOM
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
    <div class="preloader-dot"></div>
    <div class="preloader-dot"></div>
    <div class="preloader-dot"></div>
  `;
    document.body.prepend(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 500);
        }, 600);
    });

});
