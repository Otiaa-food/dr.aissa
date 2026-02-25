/* ============================================
   DR. AISSA — Multi-Page Controller
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Active Navigation Link ───────────────────────
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });


    // ─── Navbar Scroll Effect ────────────────────────
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScroll = scrollY;
        }, { passive: true });
    }


    // ─── Mobile Hamburger Menu ───────────────────────
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.classList.add('nav-overlay');
        document.body.appendChild(overlay);

        const toggleMenu = () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
            overlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        };

        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) toggleMenu();
            });
        });
    }


    // ─── Language Switching (with Flags) ──────────────
    const langButtons = document.querySelectorAll('.lang-btn');
    const langContentBlocks = document.querySelectorAll('.lang-content');
    const translatableElements = document.querySelectorAll('[data-fr]');

    let currentLang = localStorage.getItem('dr_aissa_lang') || 'fr';

    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('dr_aissa_lang', lang);

        // Update buttons
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update content blocks
        langContentBlocks.forEach(block => {
            block.classList.toggle('active', block.classList.contains(`lang-${lang}`));
        });

        // Update data attributes
        translatableElements.forEach(el => {
            const translation = el.dataset[lang];
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else if (el.tagName === 'BUTTON') {
                    // Keep flag icon, update text
                    const span = el.querySelector('span:not(.flag-icon)');
                    if (span) {
                        span.textContent = translation;
                    } else {
                        el.textContent = translation;
                    }
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });

    // Init language
    switchLanguage(currentLang);


    // ─── Scroll Animations ────────────────────────────
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('in-view');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        animatedElements.forEach(el => observer.observe(el));
    }


    // ─── Expertise Accordion ─────────────────────────
    const accordionHeaders = document.querySelectorAll('.cv-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.cv-accordion-item');
            const isOpen = item.classList.contains('open');

            // Close all items (accordion principle)
            document.querySelectorAll('.cv-accordion-item.open').forEach(openItem => {
                openItem.classList.remove('open');
            });

            // Open clicked item if it wasn't already open
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });


    // ─── Contact Form Handler ────────────────────────
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const wrap = contactForm.closest('.contact-form-wrap');
            if (wrap) {
                const messages = {
                    fr: { title: 'Message envoyé', text: 'Merci pour votre demande. Prof. Dr. Aissa Halidou vous répondra dans les plus brefs délais.' },
                    de: { title: 'Nachricht gesendet', text: 'Vielen Dank für Ihre Anfrage. Prof. Dr. Aissa Halidou wird sich in Kürze bei Ihnen melden.' },
                    en: { title: 'Message Sent', text: 'Thank you for your inquiry. Prof. Dr. Aissa Halidou will respond to your request shortly.' }
                };
                const msg = messages[currentLang] || messages.fr;
                wrap.innerHTML = `
          <div class="form-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3>${msg.title}</h3>
            <p>${msg.text}</p>
          </div>
        `;
            }
        });
    }

});
