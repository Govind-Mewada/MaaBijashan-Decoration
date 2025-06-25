/*
   MaaBijashan Decoration - Enhanced Main JavaScript
   Author: Augment Agent
   Version: 2.0
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.backgroundColor = '#fff';
    loadingScreen.style.zIndex = '9999';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.transition = 'opacity 0.5s ease-out';

    // Create loading animation
    const loadingAnimation = document.createElement('div');
    loadingAnimation.className = 'loading-animation';
    loadingAnimation.innerHTML = `
        <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#2563eb" stroke-width="8" fill="none" stroke-dasharray="251" stroke-dashoffset="251">
                <animate attributeName="stroke-dashoffset" from="251" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
        </svg>
        <h2 style="margin-top: 20px; color: #2563eb; font-family: 'Poppins', sans-serif;">MaaBijashan Decoration</h2>
    `;

    //
    // 
    loadingScreen.appendChild(loadingAnimation);
    document.body.appendChild(loadingScreen);

    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });

    // Initialize Locomotive Scroll with optimized settings
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.05, // Lower value for faster scrolling (default is 0.1)
        multiplier: 1.5, // Higher value for faster scrolling
        smartphone: {
            smooth: false, // Disable smooth scrolling on mobile for better performance
            lerp: 0.05,
            multiplier: 1.5
        },
        tablet: {
            smooth: true,
            lerp: 0.05,
            multiplier: 1.5
        },
        reloadOnContextChange: true,
        gestureDirection: 'vertical',
        touchMultiplier: 2.5, // Faster touch scrolling
        smoothMobile: false // Disable smooth scrolling on mobile
    });

    // Update scroll on page refresh
    scroll.update();

    // Debounce scroll events for better performance
    let scrollTimeout;
    scroll.on('scroll', (instance) => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            ScrollTrigger.update();
        }, 50); // 50ms debounce
    });

    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
    });

    // Optimized preloader with progress indicator
    // Start hiding preloader as soon as DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        const preloader = document.querySelector('.preloader');
        const progressBar = document.querySelector('.progress-bar');

        // Create a progress counter
        let progress = 0;
        const totalResources = document.querySelectorAll('img, script, link[rel="stylesheet"]').length;
        let loadedResources = 0;

        // Update progress bar
        function updateProgress() {
            loadedResources++;
            progress = Math.min(100, Math.round((loadedResources / totalResources) * 100));

            if (progressBar) {
                progressBar.style.width = progress + '%';
            }

            // Start hiding preloader when we reach 100%
            if (progress >= 100) {
                hidePreloader();
            }
        }

        // Hide preloader with animation
        function hidePreloader() {
            if (preloader) {
                preloader.classList.add('fade-out');
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }
        }

        // Track resource loading
        const resources = document.querySelectorAll('img, script, link[rel="stylesheet"]');
        resources.forEach(resource => {
            // If already loaded
            if (resource.complete || resource.readyState === 'complete') {
                updateProgress();
            } else {
                // Wait for load
                resource.addEventListener('load', updateProgress);
                resource.addEventListener('error', updateProgress); // Count errors as loaded
            }
        });

        // Fallback - hide preloader after 3 seconds even if not all resources loaded
        setTimeout(hidePreloader, 3000);
    });

    // Also hide preloader on window load as a backup
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Header scroll effect with optimized event handling
    // Use requestAnimationFrame for better performance
    let lastScrollPosition = 0;
    let ticking = false;

    function handleHeaderScroll() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        lastScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleHeaderScroll();
            });
            ticking = true;
        }
    }, { passive: true }); // passive: true improves scroll performance

    // Mobile navigation with optimized event handling
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Function to toggle mobile menu with performance optimizations
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Prevent background scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    if (hamburger) {
        // Use touchstart for faster mobile response
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on a link - event delegation for better performance
    if (navLinks) {
        navLinks.addEventListener('click', function(e) {
            // Check if the clicked element is a link
            if (e.target.tagName === 'A') {
                if (hamburger.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (hamburger && hamburger.classList.contains('active')) {
            // Check if click is outside the menu and hamburger
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMobileMenu();
            }
        }
    });

    // Optimized testimonials slider with better performance
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        // Use IntersectionObserver to only activate slider when visible
        const sliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeSlider(testimonialSlider);
                    // Unobserve after initialization
                    sliderObserver.unobserve(testimonialSlider);
                }
            });
        }, {
            threshold: 0.1
        });

        sliderObserver.observe(testimonialSlider);

        function initializeSlider(slider) {
            let isDown = false;
            let startX;
            let scrollLeft;
            let autoScrollInterval;
            let isAutoScrolling = true;

            // Touch events for mobile
            slider.addEventListener('touchstart', (e) => {
                handleDragStart(e.touches[0].pageX);
                stopAutoScroll();
            }, { passive: true });

            slider.addEventListener('touchend', () => {
                handleDragEnd();
                startAutoScrollAfterDelay();
            }, { passive: true });

            slider.addEventListener('touchmove', (e) => {
                if (!isDown) return;
                const x = e.touches[0].pageX;
                handleDrag(x);
            }, { passive: true });

            // Mouse events for desktop
            slider.addEventListener('mousedown', (e) => {
                handleDragStart(e.pageX);
                stopAutoScroll();
            });

            slider.addEventListener('mouseleave', () => {
                handleDragEnd();
                startAutoScrollAfterDelay();
            });

            slider.addEventListener('mouseup', () => {
                handleDragEnd();
                startAutoScrollAfterDelay();
            });

            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                handleDrag(e.pageX);
            });

            // Helper functions for cleaner code
            function handleDragStart(pageX) {
                isDown = true;
                slider.classList.add('active');
                startX = pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            }

            function handleDragEnd() {
                isDown = false;
                slider.classList.remove('active');
            }

            function handleDrag(pageX) {
                const x = pageX - slider.offsetLeft;
                const walk = (x - startX) * 1.5; // Reduced multiplier for smoother scrolling
                slider.scrollLeft = scrollLeft - walk;
            }

            function stopAutoScroll() {
                isAutoScrolling = false;
                clearTimeout(autoScrollInterval);
            }

            function startAutoScrollAfterDelay() {
                clearTimeout(autoScrollInterval);
                autoScrollInterval = setTimeout(() => {
                    isAutoScrolling = true;
                    autoScroll();
                }, 3000); // Longer delay before resuming auto-scroll
            }

            // Improved auto scroll with requestAnimationFrame for better performance
            function autoScroll() {
                if (!isAutoScrolling) return;

                if (!slider.matches(':hover')) {
                    // Use smoother animation with requestAnimationFrame
                    const maxScroll = slider.scrollWidth - slider.clientWidth;

                    if (slider.scrollLeft >= maxScroll) {
                        // Smooth reset to beginning
                        const startTime = performance.now();
                        const startScroll = slider.scrollLeft;

                        function smoothScrollToStart(timestamp) {
                            const elapsed = timestamp - startTime;
                            const progress = Math.min(elapsed / 500, 1); // 500ms duration

                            slider.scrollLeft = startScroll - (startScroll * progress);

                            if (progress < 1) {
                                requestAnimationFrame(smoothScrollToStart);
                            } else {
                                // Continue auto-scrolling after reset
                                requestAnimationFrame(continuousScroll);
                            }
                        }

                        requestAnimationFrame(smoothScrollToStart);
                    } else {
                        requestAnimationFrame(continuousScroll);
                    }
                } else {
                    // If hovering, check again after a delay
                    autoScrollInterval = setTimeout(autoScroll, 1000);
                }
            }

            function continuousScroll() {
                if (!isAutoScrolling) return;

                slider.scrollLeft += 0.5; // Slower, smoother scroll

                // Continue scrolling with requestAnimationFrame for smoother animation
                if (isAutoScrolling) {
                    autoScrollInterval = setTimeout(() => {
                        requestAnimationFrame(continuousScroll);
                    }, 16); // ~60fps
                }
            }

            // Start auto scroll after a delay
            startAutoScrollAfterDelay();
        }
    }

    // Gallery and Services Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get filter value
                const filterValue = this.getAttribute('data-filter');

                // Filter gallery or service items
                const items = document.querySelectorAll('.gallery-item, [data-category]');

                items.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 300);
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                            }, 300);
                        } else {
                            item.style.opacity = '0';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });

                // Update Locomotive Scroll
                setTimeout(() => {
                    scroll.update();
                }, 500);
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');

            question.addEventListener('click', function() {
                // Close all other answers
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                        otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current answer
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                    toggle.querySelector('i').className = 'fas fa-plus';
                    item.classList.remove('active');
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggle.querySelector('i').className = 'fas fa-minus';
                    item.classList.add('active');
                }

                // Update Locomotive Scroll
                setTimeout(() => {
                    scroll.update();
                }, 300);
            });
        });
    }

    // Lightbox configuration (if using lightbox)
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 300,
            'wrapAround': true,
            'albumLabel': 'Image %1 of %2',
            'fadeDuration': 300
        });
    }

    // Video Gallery Play Button
    const videoItems = document.querySelectorAll('.video-item');
    if (videoItems.length > 0) {
        videoItems.forEach(item => {
            const playButton = item.querySelector('.play-button');

            playButton.addEventListener('click', function() {
                // Here you would typically open a modal with the video
                // For now, we'll just show an alert
                alert('Video player would open here. This is a placeholder for actual video functionality.');
            });
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Here you would typically send the form data to a server
            // For now, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. We will contact you shortly.`);

            // Reset the form
            contactForm.reset();
        });
    }

    // Each time the window updates, we need to refresh ScrollTrigger and update LocomotiveScroll
    ScrollTrigger.addEventListener('refresh', () => scroll.update());
    ScrollTrigger.refresh();

    // Update scroll when window is resized
    window.addEventListener('resize', function() {
        setTimeout(() => {
            scroll.update();
            ScrollTrigger.refresh();
        }, 500);
    });
});
