// Contact section module
export const initContact = () => {
    setTimeout(() => {
        initContactForm();
        initMap();
        initContactAnimations();
    }, 100);
};

const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const formFields = form.querySelectorAll('.form-input, .form-textarea');
    const submitBtn = form.querySelector('.submit-btn');

    // Form validation rules
    const validators = {
        name: (value) => value.length >= 2 ? null : 'Name must be at least 2 characters long',
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? null : 'Please enter a valid email address';
        },
        phone: (value) => {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            return phoneRegex.test(value) ? null : 'Please enter a valid phone number';
        },
        company: (value) => value.length >= 2 ? null : 'Company name must be at least 2 characters long',
        message: (value) => value.length >= 10 ? null : 'Message must be at least 10 characters long'
    };

    // Real-time validation
    const validateField = (field) => {
        const fieldName = field.name;
        const value = field.value.trim();
        const validator = validators[fieldName];
        
        if (!validator) return true;

        const error = validator(value);
        const errorElement = field.parentNode.querySelector('.form-error');
        
        if (error) {
            field.classList.add('error');
            if (errorElement) errorElement.textContent = error;
            return false;
        } else {
            field.classList.remove('error');
            if (errorElement) errorElement.textContent = '';
            return true;
        }
    };

    // Add input event listeners for real-time validation
    formFields.forEach(field => {
        field.addEventListener('input', () => validateField(field));
        field.addEventListener('blur', () => validateField(field));

        // Add focus animations
        field.addEventListener('focus', () => {
            field.parentNode.classList.add('focused');
        });

        field.addEventListener('blur', () => {
            if (!field.value) {
                field.parentNode.classList.remove('focused');
            }
        });
    });

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showNotification('Please fix the errors before submitting', 'error');
            return;
        }

        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        try {
            // Simulate form submission (replace with actual API call)
            await simulateFormSubmission(new FormData(form));
            
            // Success
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
            formFields.forEach(field => {
                field.parentNode.classList.remove('focused');
                field.classList.remove('error');
            });

        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    };

    form.addEventListener('submit', handleSubmit);

    // Add form styles
    const formStyle = document.createElement('style');
    formStyle.textContent = `
        .form-group {
            position: relative;
            margin-bottom: 1.5rem;
        }
        
        .form-group.focused .form-label {
            color: var(--primary-color);
            transform: translateY(-20px) scale(0.9);
        }
        
        .form-input.error,
        .form-textarea.error {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.2);
        }
        
        .form-error {
            color: var(--accent-color);
            font-size: 0.875rem;
            margin-top: 0.25rem;
            min-height: 1.2em;
        }
        
        .submit-btn.loading {
            position: relative;
            color: transparent;
        }
        
        .submit-btn.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid transparent;
            border-top-color: currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(formStyle);
};

const simulateFormSubmission = (formData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate successful submission (90% success rate)
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Submission failed'));
            }
        }, 2000);
    });
};

const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);

    // Add notification styles
    if (!document.querySelector('#notification-styles')) {
        const notificationStyle = document.createElement('style');
        notificationStyle.id = 'notification-styles';
        notificationStyle.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: var(--border-radius);
                color: white;
                font-weight: 500;
                z-index: 1000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 300px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                background: var(--gradient-primary);
            }
            
            .notification-error {
                background: var(--gradient-accent);
            }
            
            .notification-info {
                background: var(--dark-card);
                border: 1px solid var(--dark-border);
            }
        `;
        document.head.appendChild(notificationStyle);
    }
};

const initMap = () => {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;

    // Create map placeholder with interactive elements
    const mapPlaceholder = document.createElement('div');
    mapPlaceholder.className = 'map-placeholder';
    mapPlaceholder.innerHTML = `
        <div class="map-overlay">
            <div class="map-info">
                <h4>Visit Our Office</h4>
                <p>123 Tech Street, Innovation District<br>Digital City, DC 12345</p>
                <button class="btn-primary map-directions">
                    <i data-lucide="navigation"></i>
                    Get Directions
                </button>
            </div>
        </div>
        <div class="map-background">
            <i data-lucide="map-pin" class="map-icon"></i>
        </div>
    `;

    mapContainer.appendChild(mapPlaceholder);

    // Add map styles
    const mapStyle = document.createElement('style');
    mapStyle.textContent = `
        .map-placeholder {
            position: relative;
            height: 300px;
            background: var(--dark-card);
            border: 1px solid var(--dark-border);
            border-radius: var(--border-radius);
            overflow: hidden;
            cursor: pointer;
        }
        
        .map-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, var(--dark-bg) 0%, var(--dark-card) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .map-icon {
            width: 64px;
            height: 64px;
            color: var(--primary-color);
            opacity: 0.3;
        }
        
        .map-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .map-placeholder:hover .map-overlay {
            opacity: 1;
        }
        
        .map-info {
            text-align: center;
            color: white;
        }
        
        .map-info h4 {
            margin-bottom: 1rem;
            color: var(--primary-color);
        }
        
        .map-info p {
            margin-bottom: 1.5rem;
            color: var(--text-secondary);
        }
        
        .map-directions {
            padding: 0.75rem 1.5rem;
        }
    `;
    document.head.appendChild(mapStyle);

    // Add click handler for directions
    const directionsBtn = mapPlaceholder.querySelector('.map-directions');
    directionsBtn?.addEventListener('click', () => {
        const address = '123 Tech Street, Innovation District, Digital City, DC 12345';
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(mapsUrl, '_blank');
    });

    // Re-initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
};

const initContactAnimations = () => {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);

        // Add hover animations
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
};
