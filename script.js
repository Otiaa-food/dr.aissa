/* ============================================
   DR. AISSA — Multi-Page Controller
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Active Page Link ────────────────────────────
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });


    // ─── Language Switching ───────────────────────────
    const langButtons = document.querySelectorAll('.lang-btn');
    const langContentBlocks = document.querySelectorAll('.lang-content');

    // Storage for preferences
    let currentLang = localStorage.getItem('dr_aissa_lang') || 'fr';

    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('dr_aissa_lang', lang);

        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        langContentBlocks.forEach(block => {
            block.classList.toggle('active', block.classList.contains(`lang-${lang}`));
        });

        document.documentElement.lang = lang;
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });

    // Init
    switchLanguage(currentLang);


    // ─── Simple Form Success ──────────────────────────
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formWrap = contactForm.parentElement;
            formWrap.innerHTML = `
        <div class="form-success academic-p" style="text-align: center; padding: 60px 0;">
          <h2 class="section-title">Message Received</h2>
          <p>Thank you for your inquiry. Prof. Dr. Aissa Halidou will respond to your request shortly.</p>
        </div>
      `;
        });
    }

});
