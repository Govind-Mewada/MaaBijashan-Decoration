/*
   MaaBijashan Decoration - Enhanced Animations JavaScript
   Author: Augment Agent
   Version: 2.0
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins for advanced effects
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Create a more dynamic page loading animation
    const loadingAnimation = gsap.timeline();

    // Initial page reveal animation
    loadingAnimation
        .from('body', {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        })
        .from('header', {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.2)'
        })
        .from('.logo', {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)'
        }, "-=0.4");

    // Enhanced hero section animations with text splitting for character animation
    const heroText = document.querySelector('.hero h1');
    if (heroText) {
        // Split text into characters for more dynamic animation
        const chars = heroText.textContent.split('');
        heroText.innerHTML = '';
        chars.forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            heroText.appendChild(span);
        });
    }

    // Create a more advanced hero timeline
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero',
            scroller: '[data-scroll-container]',
            start: 'top 90%',
            once: true
        }
    });

    // Add more dynamic animations to the hero timeline
    heroTl
        .to('.hero h1 span', {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.02,
            ease: 'power2.out'
        })
        .to('.animate-text-delay', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, "-=0.3")
        .from('.hero-buttons .primary-btn', {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: 'back.out(1.7)'
        }, "-=0.4")
        .from('.hero-buttons .secondary-btn', {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: 'back.out(1.7)'
        }, "-=0.4")
        .from('.hero-image', {
            opacity: 0,
            scale: 0.9,
            rotationY: 15,
            duration: 1.2,
            ease: 'power3.out'
        }, "-=0.8")
        .fromTo('.hero-image img',
            { filter: 'brightness(0.8) saturate(0.8)' },
            {
                filter: 'brightness(1) saturate(1)',
                duration: 1.5,
                ease: 'power2.out'
            },
            "-=1"
        )
        .to('.hero::before', {
            opacity: 0.8,
            duration: 1.5,
            ease: 'power1.inOut'
        }, "-=1.5");

    // Enhanced section headers with reveal effect
    gsap.utils.toArray('.section-header').forEach(header => {
        // Split the heading text for character animation
        const heading = header.querySelector('h2');
        if (heading) {
            const originalText = heading.innerHTML;
            const hasSpan = originalText.includes('<span>');

            if (hasSpan) {
                // Handle text with span element
                const parts = originalText.split(/<span>|<\/span>/);
                if (parts.length === 3) {
                    const beforeSpan = parts[0];
                    const spanContent = parts[1];

                    heading.innerHTML = '';

                    // Add the text before span with letter animation
                    Array.from(beforeSpan).forEach(char => {
                        if (char.trim() !== '') {
                            const charSpan = document.createElement('span');
                            charSpan.textContent = char;
                            charSpan.className = 'char-animate';
                            heading.appendChild(charSpan);
                        } else {
                            heading.appendChild(document.createTextNode(' '));
                        }
                    });

                    // Add the span element
                    const spanElement = document.createElement('span');
                    Array.from(spanContent).forEach(char => {
                        if (char.trim() !== '') {
                            const charSpan = document.createElement('span');
                            charSpan.textContent = char;
                            charSpan.className = 'char-animate accent';
                            spanElement.appendChild(charSpan);
                        } else {
                            spanElement.appendChild(document.createTextNode(' '));
                        }
                    });
                    heading.appendChild(spanElement);
                }
            }
        }

        // Create a timeline for each section header
        const headerTl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                scroller: '[data-scroll-container]',
                start: 'top 85%',
                once: true
            }
        });

        headerTl
            .from(header.querySelectorAll('.char-animate'), {
                opacity: 0,
                y: 20,
                duration: 0.03,
                stagger: 0.02,
                ease: 'power2.out'
            })
            .from(header.querySelector('p'), {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: 'power2.out'
            }, "-=0.2");
    });

    // Enhanced service cards with 3D hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Initial animation when scrolling into view
        gsap.from(card, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.7,
            ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: card,
                scroller: '[data-scroll-container]',
                start: 'top 90%',
                once: true
            }
        });

        // Add 3D hover effect
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.03,
                boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });

            // Animate the icon
            const icon = card.querySelector('.service-icon');
            if (icon) {
                gsap.to(icon, {
                    rotateY: 180,
                    scale: 1.2,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                duration: 0.3,
                ease: 'power2.out'
            });

            // Reset the icon
            const icon = card.querySelector('.service-icon');
            if (icon) {
                gsap.to(icon, {
                    rotateY: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
            }
        });
    });

    // Enhanced about section with parallax and reveal effects
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-preview',
            scroller: '[data-scroll-container]',
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 1
        }
    });

    aboutTl
        .from('.about-text', {
            opacity: 0.5,
            x: -50,
            duration: 1,
            ease: 'power2.out'
        })
        .from('.about-image', {
            opacity: 0.5,
            x: 50,
            duration: 1,
            ease: 'power2.out'
        }, "<");

    // Add parallax effect to about image
    gsap.to('.about-image img', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.about-preview',
            scroller: '[data-scroll-container]',
            scrub: true,
            start: 'top bottom',
            end: 'bottom top'
        }
    });

    // Enhanced gallery items with staggered reveal and hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Create a staggered entrance animation
    gsap.set(galleryItems, { opacity: 0, y: 50 });

    const galleryTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.gallery-preview',
            scroller: '[data-scroll-container]',
            start: 'top 80%',
            once: true
        }
    });

    galleryTl.to(galleryItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: {
            each: 0.1,
            from: "center", // Animate from the center outward
            grid: "auto"
        },
        ease: 'power3.out'
    });

    // Add advanced hover effects to gallery items
    galleryItems.forEach(item => {
        const overlay = item.querySelector('.gallery-overlay');
        const img = item.querySelector('img');

        // Create hover animation
        item.addEventListener('mouseenter', () => {
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });

            gsap.to(img, {
                scale: 1.1,
                filter: 'brightness(0.8)',
                duration: 0.5,
                ease: 'power2.out'
            });

            // Animate overlay text
            const heading = overlay.querySelector('h3');
            if (heading) {
                gsap.fromTo(heading,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, delay: 0.1, ease: 'back.out(1.7)' }
                );
            }
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
            });

            gsap.to(img, {
                scale: 1,
                filter: 'brightness(1)',
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });

    // Add a "View All" button animation
    const galleryCta = document.querySelector('.gallery-cta .primary-btn');
    if (galleryCta) {
        gsap.from(galleryCta, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: galleryCta,
                scroller: '[data-scroll-container]',
                start: 'top 90%',
                once: true
            }
        });
    }

    // Enhanced testimonials with 3D card effect and auto-scroll
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialSlider = document.querySelector('.testimonials-slider');

    // Create a staggered entrance animation for testimonials
    gsap.set(testimonialCards, { opacity: 0, y: 30, rotationY: 5 });

    const testimonialsTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.testimonials',
            scroller: '[data-scroll-container]',
            start: 'top 80%',
            once: true
        }
    });

    testimonialsTl.to(testimonialCards, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Add 3D hover effect to testimonial cards
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                rotationY: 5,
                boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });

            // Animate the author image
            const authorImage = card.querySelector('.testimonial-author-image');
            if (authorImage) {
                gsap.to(authorImage, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                rotationY: 0,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                duration: 0.3,
                ease: 'power2.out'
            });

            // Reset the author image
            const authorImage = card.querySelector('.testimonial-author-image');
            if (authorImage) {
                gsap.to(authorImage, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });

    // Add auto-scroll animation to testimonials slider
    if (testimonialSlider && testimonialCards.length > 0) {
        // Calculate the total width of all cards plus gaps
        const cardWidth = testimonialCards[0].offsetWidth;
        const gap = 20; // Assuming 20px gap between cards
        const totalWidth = (cardWidth + gap) * testimonialCards.length;

        // Only create auto-scroll if there are enough cards to scroll
        if (totalWidth > testimonialSlider.offsetWidth) {
            gsap.to(testimonialSlider, {
                x: -(totalWidth - testimonialSlider.offsetWidth),
                duration: 15,
                ease: 'none',
                repeat: -1,
                yoyo: true,
                repeatDelay: 1
            });

            // Pause animation on hover
            testimonialSlider.addEventListener('mouseenter', () => {
                gsap.to(testimonialSlider, { timeScale: 0, duration: 0.5 });
            });

            testimonialSlider.addEventListener('mouseleave', () => {
                gsap.to(testimonialSlider, { timeScale: 1, duration: 0.5 });
            });
        }
    }

    // Enhanced contact section with form field animations
    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.contact-preview',
            scroller: '[data-scroll-container]',
            start: 'top 75%',
            once: true
        }
    });

    contactTl
        .from('.contact-text h2', {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: 'back.out(1.2)'
        })
        .from('.contact-text p', {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out'
        }, "-=0.3")
        .from('.contact-info .contact-item', {
            opacity: 0,
            x: -20,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }, "-=0.3")
        .from('.contact-form', {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: 'power3.out'
        }, "-=0.5");

    // Animate form fields when they come into view
    const formFields = document.querySelectorAll('.contact-form .form-group');
    formFields.forEach((field, index) => {
        gsap.from(field, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: 0.1 * index,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: field,
                scroller: '[data-scroll-container]',
                start: 'top 90%',
                once: true
            }
        });
    });

    // Add focus animations to form fields
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                boxShadow: '0 0 0 3px rgba(255, 107, 107, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                boxShadow: 'none',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Add button animation
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    if (submitButton) {
        gsap.from(submitButton, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: submitButton,
                scroller: '[data-scroll-container]',
                start: 'top 90%',
                once: true
            }
        });

        // Add hover animation
        submitButton.addEventListener('mouseenter', () => {
            gsap.to(submitButton, {
                scale: 1.05,
                backgroundColor: '#ff5252',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        submitButton.addEventListener('mouseleave', () => {
            gsap.to(submitButton, {
                scale: 1,
                backgroundColor: '#ff6b6b',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    // Enhanced footer with staggered animations and parallax
    const footerTl = gsap.timeline({
        scrollTrigger: {
            trigger: 'footer',
            scroller: '[data-scroll-container]',
            start: 'top 90%',
            once: true
        }
    });

    footerTl
        .from('footer .footer-logo', {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: 'back.out(1.2)'
        })
        .from('footer .footer-content > div:not(.footer-logo)', {
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out'
        }, "-=0.4")
        .from('footer .footer-bottom', {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out'
        }, "-=0.2");

    // Add hover animations to footer links
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                x: 5,
                color: '#ff6b6b',
                duration: 0.2,
                ease: 'power1.out'
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                x: 0,
                color: '',
                duration: 0.2,
                ease: 'power1.out'
            });
        });
    });

    // Add special animation to social icons
    const socialIcons = document.querySelectorAll('footer .social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                y: -5,
                scale: 1.2,
                color: '#ff6b6b',
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });

        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                y: 0,
                scale: 1,
                color: '',
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
    });

    // Add scroll-to-top button
    const createScrollTopButton = () => {
        const button = document.createElement('button');
        button.id = 'scroll-top';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.zIndex = '999';
        button.style.backgroundColor = 'var(--primary-color)';
        button.style.color = 'white';
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.borderRadius = '50%';
        button.style.border = 'none';
        button.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
        button.style.cursor = 'pointer';
        button.style.opacity = '0';
        button.style.transform = 'scale(0)';
        button.style.transition = 'opacity 0.3s, transform 0.3s';
        button.style.display = 'flex';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';

        document.body.appendChild(button);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            if (scrollY > 500) {
                button.style.opacity = '1';
                button.style.transform = 'scale(1)';
            } else {
                button.style.opacity = '0';
                button.style.transform = 'scale(0)';
            }
        });

        // Scroll to top when clicked
        button.addEventListener('click', () => {
            const scrollContainer = document.querySelector('[data-scroll-container]');
            if (scrollContainer) {
                gsap.to(scrollContainer, {
                    scrollTo: { y: 0 },
                    duration: 1.5,
                    ease: 'power3.inOut'
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });

        // Add hover effect
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                backgroundColor: '#ff5252',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                y: -3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                backgroundColor: '#ff6b6b',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    };

    // Create the scroll-to-top button
    createScrollTopButton();

    // Add page transition effects
    const links = document.querySelectorAll('a[href^="/"]:not([target]), a[href^="./"]:not([target]), a[href^="../"]:not([target]), a[href^="http://"]:not([target]), a[href^="https://"]:not([target])');

    links.forEach(link => {
        // Only apply to internal links
        if (link.hostname === window.location.hostname || link.hostname === '') {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Don't apply to links with #anchors
                if (href.indexOf('#') === 0) return;

                e.preventDefault();

                // Create page transition animation
                const transition = document.createElement('div');
                transition.style.position = 'fixed';
                transition.style.top = '0';
                transition.style.left = '0';
                transition.style.width = '100%';
                transition.style.height = '100%';
                transition.style.backgroundColor = 'var(--primary-color)';
                transition.style.zIndex = '9999';
                transition.style.transform = 'scaleY(0)';
                transition.style.transformOrigin = 'top';
                document.body.appendChild(transition);

                // Animate transition
                gsap.to(transition, {
                    scaleY: 1,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        window.location.href = href;
                    }
                });
            });
        }
    });

    // Add cursor effects for desktop
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.position = 'fixed';
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderRadius = '50%';
        cursor.style.border = '2px solid var(--primary-color)';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.transform = 'translate(-50%, -50%)';
        cursor.style.transition = 'width 0.3s, height 0.3s, background-color 0.3s';
        document.body.appendChild(cursor);

        // Add inner cursor
        const cursorInner = document.createElement('div');
        cursorInner.className = 'custom-cursor-inner';
        cursorInner.style.position = 'fixed';
        cursorInner.style.width = '5px';
        cursorInner.style.height = '5px';
        cursorInner.style.borderRadius = '50%';
        cursorInner.style.backgroundColor = 'var(--primary-color)';
        cursorInner.style.pointerEvents = 'none';
        cursorInner.style.zIndex = '10000';
        cursorInner.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(cursorInner);

        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power1.out'
            });

            gsap.to(cursorInner, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.03,
                ease: 'power1.out'
            });
        });

        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .gallery-item, .testimonial-card, input, textarea, select');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
                cursor.style.mixBlendMode = 'difference';

                cursorInner.style.width = '8px';
                cursorInner.style.height = '8px';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.mixBlendMode = 'normal';

                cursorInner.style.width = '5px';
                cursorInner.style.height = '5px';
            });
        });
    }

    // Add smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const scrollContainer = document.querySelector('[data-scroll-container]');
                if (scrollContainer) {
                    gsap.to(scrollContainer, {
                        scrollTo: { y: targetElement, offsetY: 80 },
                        duration: 1,
                        ease: 'power3.inOut'
                    });
                } else {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add parallax effects to background elements
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.2;

        gsap.to(element, {
            y: () => -speed * 100 + '%',
            ease: 'none',
            scrollTrigger: {
                trigger: element.parentElement,
                scroller: '[data-scroll-container]',
                scrub: true,
                start: 'top bottom',
                end: 'bottom top'
            }
        });
    });
});
