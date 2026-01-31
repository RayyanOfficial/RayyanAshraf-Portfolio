document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Navbar Effect ---
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-glass', 'py-3');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.remove('nav-glass', 'py-3');
            navbar.classList.add('py-6');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.contains('open');
        if (isOpen) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        } else {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden'; // Disable scrolling
        }
    };

    mobileBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .reveal-up, .reveal-left, .reveal-right');
    animatedElements.forEach(el => observer.observe(el));

    // --- Parallax Effect for Hero ---
    const heroBg = document.querySelector('.parallax-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            if (scrollValue < window.innerHeight) {
                // Move background slower than scroll
                heroBg.style.transform = `translateY(${scrollValue * 0.4}px) scale(1.1)`;
            }
        });
    }

    // --- Smooth Scrolling for Anchor Links (with Header Offset) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Form Handling ---
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'SENT!';
            btn.style.backgroundColor = '#10B981'; // Green color for success
            btn.style.borderColor = '#10B981';

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                form.reset();
            }, 3000);
        });
    });

    // --- Typing Effect ---
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const words = ["Web Developer", "UI/UX Designer", "Full Stack Engineer", "Freelancer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }
});
