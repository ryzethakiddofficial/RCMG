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

    // Toggle the menu visibility
    const toggleMenu = () => {
        mobileMenu.classList.toggle('active');
        // Toggle visibility of the menu and close button
        closeMenuBtn.style.display = mobileMenu.classList.contains('active') ? 'block' : 'none';
        menuBtn.style.display = mobileMenu.classList.contains('active') ? 'none' : 'block';
    };

    // Open/close the menu when clicking the menu or close button
    menuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    // Close the menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target) && !closeMenuBtn.contains(event.target)) {
            mobileMenu.classList.remove('active');
            menuBtn.style.display = 'block'; // Show menu button when menu is closed
            closeMenuBtn.style.display = 'none'; // Hide close button when menu is closed
        }
    });

    // Scroll to top button logic
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
});