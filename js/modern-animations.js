// Modern Animations with GSAP and Tailwind
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Initialize animations
    initHeroAnimations();
    initScrollAnimations();
    initCounterAnimations();
    initServiceCardAnimations();
    initFloatingElements();

    // Hero Section Animations
    function initHeroAnimations() {
        const tl = gsap.timeline();

        // Animate hero badge
        tl.from("#hero-badge", {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
        
        // Animate main title
        .from("#hero-title", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.5")
        
        // Animate subtitle
        .from("#hero-subtitle", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8")
        
        // Animate buttons
        .from("#hero-buttons", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        
        // Animate stats
        .from("#hero-stats > div", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4");

        // Typing effect for main title
        gsap.to("#hero-title span", {
            text: "Special Moments",
            duration: 2,
            ease: "none",
            delay: 1.5
        });
    }

    // Counter Animation
    function initCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            
            ScrollTrigger.create({
                trigger: counter,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(counter, {
                        innerText: target,
                        duration: 2,
                        snap: { innerText: 1 },
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    // Service Cards Animation
    function initServiceCardAnimations() {
        const serviceCards = document.querySelectorAll('#services-grid > div');
        
        gsap.from(serviceCards, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#services-grid",
                start: "top 80%",
                end: "bottom 20%"
            }
        });

        // Hover animations for service cards
        serviceCards.forEach(card => {
            const icon = card.querySelector('.fa-heart, .fa-spa, .fa-baby, .fa-birthday-cake');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    rotation: 360,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });
        });
    }

    // Floating Elements Animation
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.animate-float');
        
        floatingElements.forEach(element => {
            gsap.to(element, {
                y: -20,
                duration: 3,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1
            });
        });
    }

    // Scroll-triggered animations
    function initScrollAnimations() {
        // Services header animation
        gsap.from("#services-header", {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#services-header",
                start: "top 80%"
            }
        });

        // Parallax effect for background elements
        gsap.to(".hero-bg", {
            backgroundPosition: "50% 100%",
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-bg",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: target,
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in
    document.querySelectorAll('.card-hover').forEach(el => {
        observer.observe(el);
    });

    // Add custom CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Loading animation
    window.addEventListener('load', () => {
        gsap.to('.preloader', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                document.querySelector('.preloader')?.remove();
            }
        });
    });
});

// Utility function for random animations
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// Add sparkle effect on click
document.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'fixed pointer-events-none z-50';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.innerHTML = '✨';
    document.body.appendChild(sparkle);
    
    gsap.to(sparkle, {
        y: -50,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => sparkle.remove()
    });
}
