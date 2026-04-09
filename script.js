// Initialize Lucide Icons
lucide.createIcons();

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Nav Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    const closeMenu = () => {
        navLinks.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    menuToggle.setAttribute('aria-expanded', 'false');

    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    });
}

// Ticker Loop Logic
const ticker = document.querySelector('.ticker');
if (ticker) {
    ticker.innerHTML += ticker.innerHTML; // Duplicate for smooth looping
}

// Stats Counter Logic
const stats = document.querySelectorAll('.stat-count');
const speed = 200;

const startCounters = () => {
    stats.forEach(counter => {
        if (counter.classList.contains('counted')) return;
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
                counter.classList.add('counted');
            }
        };
        updateCount();
    });
};

// ScrollReveal Animations
const sr = ScrollReveal({
    distance: '40px',
    duration: 1200,
    delay: 100,
    reset: false,
    viewFactor: 0.1,
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
});

document.documentElement.classList.add('sr');

sr.reveal('.reveal-up', { origin: 'bottom', interval: 100 });
sr.reveal('.reveal-left', { origin: 'left', distance: '80px' });
sr.reveal('.reveal-right', { origin: 'right', distance: '80px' });

// Special Trigger for Stats
sr.reveal('.stats-banner', {
    afterReveal: () => startCounters()
});

// Tilt Effect (Reliable)
const cards = document.querySelectorAll('.glass-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});

// Final Visibility Fallback
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.visibility = 'visible';
        });
    }, 1500);
});

// Active Nav Highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
});
