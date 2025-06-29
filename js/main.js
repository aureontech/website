// Main application entry point
import { initNavbar } from './modules/navbar.js';
import { initScrollAnimations } from './modules/scroll.js';
import { initAbout } from './modules/about.js';
import { initServices } from './modules/services.js';
import { initShowcase } from './modules/showcase.js';
import { initContact } from './modules/contact.js';

// Initialize Lucide icons
const initIcons = () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
};

// Load component HTML
const loadComponent = async (componentPath, targetId) => {
    try {
        const response = await fetch(componentPath);
        
        if (response.ok) {
            const html = await response.text();
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.innerHTML = html;
                // Re-initialize icons after loading new content
                initIcons();
            }
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
};

// Initialize all components
const initComponents = async () => {
    // Load all component HTML files
    await Promise.all([
        loadComponent('components/about.html', 'about-content'),
        loadComponent('components/services.html', 'services-content'),
        loadComponent('components/showcase.html', 'portfolio-content'),
        loadComponent('components/contact.html', 'contact-content'),
        loadComponent('components/footer.html', 'footer-content')
    ]);

    // Initialize all modules
    initNavbar();
    initScrollAnimations();
    initAbout();
    initServices();
    initShowcase();
    initContact();
    
    // Make hero section visible immediately
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#hero .fade-in, #hero .slide-in-left, #hero .slide-in-right');
        heroElements.forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
};

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize icons first
    initIcons();
    
    // Initialize components
    initComponents();

    // Add smooth scrolling to CTA buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.hero-cta .btn-primary')) {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }

        if (e.target.closest('.cta-section .btn-primary')) {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Add glitch effect to hero title
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        glitchText.setAttribute('data-text', glitchText.textContent);
    }

    // Particle animation for hero background
    createParticles();
});

// Create floating particles
const createParticles = () => {
    const particles = document.querySelector('.particles');
    if (!particles) return;

    // Create additional animated particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: ${Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
            opacity: ${0.3 + Math.random() * 0.7};
        `;
        particles.appendChild(particle);
    }
};

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
