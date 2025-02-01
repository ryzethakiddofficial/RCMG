document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const effectsSlider = document.getElementById('toggleEffects');

    if (!effectsSlider) return; // Exit if the slider doesn't exist

    let effectsEnabled = localStorage.getItem('effectsEnabled') === 'true';
    effectsSlider.checked = effectsEnabled;

    const updateEffects = () => {
        navLinks.forEach((link) => {
            link.classList.toggle('rainbowBorder', effectsEnabled);
            link.classList.toggle('shineEffect', effectsEnabled);
        });

        document.body.classList.toggle('disable-effects', !effectsEnabled);
    };

    effectsSlider.addEventListener('change', (event) => {
        effectsEnabled = event.target.checked;
        localStorage.setItem('effectsEnabled', effectsEnabled);
        updateEffects();
    });

    updateEffects(); // Initial effects update on page load

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = document.querySelector(event.target.getAttribute('href'));

            navLinksContainer.classList.remove('open');
            mobileMenu.classList.remove('active');
            document.body.offsetHeight; // Force reflow

            setTimeout(() => {
                if (target) {
                    event.preventDefault();
                    window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
                }
            }, 50); // Delay to ensure smooth scroll after closing the menu
        });
    });

    menuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
        mobileMenu.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!navLinksContainer.contains(event.target) && !menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            navLinksContainer.classList.remove('open');
            mobileMenu.classList.remove('active');
        }
    });

    const handleScroll = () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    let lastKnownScrollPosition = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastKnownScrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const toggleMenu = () => {
        navLinksContainer.classList.toggle('open');
        mobileMenu.classList.toggle('active');
    };

    const toggleSettingsMenu = (event) => {
        event.stopPropagation();
        const menu = document.querySelector('.dropdown-menu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    };

    const toggleLegalMenu = (event) => {
        event.stopPropagation();
        const menu = document.querySelector('.legal-dropdown .dropdown-menu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    };

    document.addEventListener('click', (event) => {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach((dropdown) => {
            if (!dropdown.contains(event.target) && dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        });
    });

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.remove('open');
            mobileMenu.classList.remove('active');
        });
    }

    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
});
