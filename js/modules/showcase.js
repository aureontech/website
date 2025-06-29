// Portfolio section module
export const initShowcase = () => {
    setTimeout(() => {
        initPortfolioCarousel();
        initCompanyLogos();
        initTestimonials();
    }, 100);
};

const initPortfolioCarousel = () => {
    const carousel = document.querySelector('.showcase-carousel');
    if (!carousel) return;

    const container = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.showcase-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const indicators = carousel.querySelectorAll('.indicator');

    let currentSlide = 0;
    const totalSlides = slides.length;

    const updateCarousel = () => {
        const translateX = -currentSlide * 100;
        container.style.transform = `translateX(${translateX}%)`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });

        // Update slide counter if exists
        const counter = carousel.querySelector('.slide-counter');
        if (counter) {
            counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
        }
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };

    const goToSlide = (index) => {
        currentSlide = index;
        updateCarousel();
    };

    // Event listeners
    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (carousel.matches(':hover')) {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        }
    });

    // Touch support
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    });

    // Auto-play with pause on hover
    let autoPlay = setInterval(nextSlide, 4000);

    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
    });

    carousel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 4000);
    });

    updateCarousel();
};

const initCompanyLogos = () => {
    const logoContainer = document.querySelector('.company-logos');
    if (!logoContainer) return;

    const logos = logoContainer.querySelectorAll('.company-logo');
    
    // Add hover effects to company logos
    logos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.1) translateY(-5px)';
            logo.style.filter = 'brightness(1.2)';
        });

        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1) translateY(0)';
            logo.style.filter = 'brightness(1)';
        });
    });

    // Infinite scroll animation for logo strip
    const createInfiniteScroll = () => {
        const scrollContainer = document.querySelector('.logo-scroll');
        if (!scrollContainer) return;

        const scrollContent = scrollContainer.querySelector('.logo-scroll-content');
        const logos = scrollContent.children;

        // Clone logos for seamless loop
        Array.from(logos).forEach(logo => {
            const clone = logo.cloneNode(true);
            scrollContent.appendChild(clone);
        });

        // Add CSS for infinite scroll
        const style = document.createElement('style');
        style.textContent = `
            .logo-scroll {
                overflow: hidden;
                white-space: nowrap;
            }
            
            .logo-scroll-content {
                display: inline-flex;
                animation: logoScroll 30s linear infinite;
            }
            
            .logo-scroll:hover .logo-scroll-content {
                animation-play-state: paused;
            }
            
            @keyframes logoScroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
        `;
        document.head.appendChild(style);
    };

    createInfiniteScroll();
};

const initTestimonials = () => {
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonials.forEach((testimonial, index) => {
        // Add entrance animation with delay
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            testimonial.style.transition = 'all 0.6s ease';
            testimonial.style.opacity = '1';
            testimonial.style.transform = 'translateY(0)';
        }, index * 200);

        // Add hover effect
        testimonial.addEventListener('mouseenter', () => {
            testimonial.style.transform = 'translateY(-5px) scale(1.02)';
            testimonial.style.boxShadow = 'var(--shadow-glow)';
        });

        testimonial.addEventListener('mouseleave', () => {
            testimonial.style.transform = 'translateY(0) scale(1)';
            testimonial.style.boxShadow = 'var(--shadow-card)';
        });
    });
};

// Portfolio filter functionality
export const initPortfolioFilter = () => {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;

                if (shouldShow) {
                    item.style.display = 'block';
                    item.style.animation = `portfolioShow 0.6s ease ${index * 0.1}s both`;
                } else {
                    item.style.animation = 'portfolioHide 0.3s ease both';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Add portfolio animations
    const portfolioStyle = document.createElement('style');
    portfolioStyle.textContent = `
        @keyframes portfolioShow {
            from {
                opacity: 0;
                transform: scale(0.8) translateY(20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        @keyframes portfolioHide {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.8);
            }
        }
    `;
    document.head.appendChild(portfolioStyle);
};
