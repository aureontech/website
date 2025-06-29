// Services section module
export const initServices = () => {
    setTimeout(() => {
        initServiceCards();
        initServiceFilters();
    }, 100);
};

const initServiceCards = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });

        // Add click interaction for mobile
        card.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                card.classList.toggle('flipped');
            }
        });

        // Add icon animation on hover
        const icon = card.querySelector('.service-icon');
        if (icon) {
            card.addEventListener('mouseenter', () => {
                icon.style.animation = 'iconPulse 0.6s ease-in-out';
            });

            card.addEventListener('mouseleave', () => {
                icon.style.animation = '';
            });
        }
    });

    // Add icon pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes iconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        .service-card.flipped .card-inner {
            transform: rotateY(180deg);
        }
        
        @media (max-width: 768px) {
            .service-card .card-inner {
                transition: transform 0.6s;
            }
        }
    `;
    document.head.appendChild(style);
};

const initServiceFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    if (filterButtons.length === 0) return;

    const filterServices = (category) => {
        serviceCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = category === 'all' || cardCategory === category;

            if (shouldShow) {
                card.style.display = 'block';
                card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
            } else {
                card.style.animation = 'fadeOut 0.3s ease both';
                setTimeout(() => {
                    if (card.style.animation.includes('fadeOut')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter services
            const category = button.getAttribute('data-filter');
            filterServices(category);
        });
    });

    // Add filter animations
    const filterStyle = document.createElement('style');
    filterStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.8);
            }
        }
        
        .filter-btn {
            background: var(--dark-card);
            border: 1px solid var(--dark-border);
            color: var(--text-secondary);
            padding: 0.5rem 1rem;
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: var(--transition);
            font-family: var(--font-family);
        }
        
        .filter-btn:hover,
        .filter-btn.active {
            background: var(--primary-color);
            color: var(--dark-bg);
            border-color: var(--primary-color);
        }
    `;
    document.head.appendChild(filterStyle);
};

// Service card interaction enhancements
export const enhanceServiceCards = () => {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
};
