// Scroll animations module
export const initScrollAnimations = () => {
    // Don't hide content by default - just enhance with animations for elements that need it
    setTimeout(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Create intersection observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Only animate elements that are not already visible
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Only apply animation to elements that are below the fold
            if (rect.top > window.innerHeight) {
                el.classList.add('animate-in');
                observer.observe(el);
            }
        });
    }, 200);

    // Add staggered animation delays for grid items
    const addStaggeredAnimations = () => {
        const gridContainers = document.querySelectorAll('.grid-2, .grid-3, .grid-4');
        
        gridContainers.forEach(container => {
            const items = container.children;
            Array.from(items).forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    };

    // Parallax effect for hero background
    const handleParallax = () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        }

        // Parallax for particles
        const particles = document.querySelector('.particles');
        if (particles) {
            const rate = scrolled * -0.3;
            particles.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    };

    // Throttle function for performance
    const throttle = (func, delay) => {
        let timeoutId;
        let lastExecTime = 0;
        return (...args) => {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    };

    // Add scroll event listeners
    window.addEventListener('scroll', throttle(handleParallax, 16)); // ~60fps

    // Initialize staggered animations after DOM is loaded
    setTimeout(addStaggeredAnimations, 100);

    // Add bounce-in animation for icons
    const animateIcons = () => {
        const icons = document.querySelectorAll('[data-lucide]');
        icons.forEach((icon, index) => {
            icon.style.animation = `iconBounce 0.6s ease-out ${index * 0.1}s both`;
        });
    };

    // Add icon animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes iconBounce {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.2) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(1) rotate(360deg);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Animate icons when page loads
    setTimeout(animateIcons, 500);

    // Reveal sections with custom timing - but don't override already visible content
    const revealSections = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            // Only add fade-in if it doesn't already have content
            if (!section.querySelector('.visible')) {
                section.classList.add('fade-in');
                section.style.transitionDelay = `${index * 0.2}s`;
            }
        });
    };

    // Don't run this immediately - let content load first
    setTimeout(revealSections, 500);
};
