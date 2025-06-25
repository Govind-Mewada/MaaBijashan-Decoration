/*
   MaaBijashan Decoration - WhatsApp Button JavaScript
   Author: Augment Agent
   Version: 1.0
*/

document.addEventListener('DOMContentLoaded', function() {
    // Get WhatsApp elements
    const whatsappPanel = document.querySelector('.whatsapp-panel');
    const whatsappButton = document.querySelector('.whatsapp-button');
    const whatsappContent = document.querySelector('.whatsapp-content');
    const whatsappCta = document.querySelector('.whatsapp-cta');

    if (!whatsappPanel || !whatsappButton) return;

    // Add click event to WhatsApp button
    whatsappButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling

        // Toggle expanded class
        whatsappPanel.classList.toggle('expanded');

        // If panel is expanded, add event listener to close when clicking outside
        if (whatsappPanel.classList.contains('expanded')) {
            setTimeout(() => {
                document.addEventListener('click', closeWhatsappPanel);
            }, 10);
        } else {
            document.removeEventListener('click', closeWhatsappPanel);
        }
    });

    // Prevent closing when clicking inside the content
    if (whatsappContent) {
        whatsappContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Function to close WhatsApp panel
    function closeWhatsappPanel(e) {
        if (!whatsappPanel.contains(e.target)) {
            whatsappPanel.classList.remove('expanded');
            document.removeEventListener('click', closeWhatsappPanel);
        }
    }

    // Add direct WhatsApp link to CTA button
    if (whatsappCta) {
        whatsappCta.addEventListener('click', function(e) {
            // Get the phone number from the page
            const phoneNumber = document.querySelector('.whatsapp-number').textContent.trim().replace(/\+|\s/g, '');

            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}`;

            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    // Add animation to WhatsApp button
    function animateWhatsappButton() {
        gsap.to(whatsappButton, {
            scale: 1.1,
            duration: 0.8,
            repeat: 1,
            yoyo: true,
            ease: "power1.inOut",
            onComplete: function() {
                // Wait for a while before starting the animation again
                setTimeout(animateWhatsappButton, 5000);
            }
        });
    }

    // Start animation after a delay
    setTimeout(animateWhatsappButton, 3000);

    // Add CSS class for expanded state
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-panel.expanded .whatsapp-content {
            max-width: 300px;
            opacity: 1;
            margin-left: 10px;
        }

        @media (max-width: 767.98px) {
            .whatsapp-panel {
                bottom: 20px;
                left: 20px;
            }

            .whatsapp-button {
                width: 50px;
                height: 50px;
            }

            .whatsapp-button i {
                font-size: 25px;
            }

            .whatsapp-content {
                padding: 10px 15px;
            }

            .whatsapp-title {
                font-size: 14px;
            }

            .whatsapp-subtitle,
            .whatsapp-number {
                font-size: 12px;
            }

            .whatsapp-cta {
                padding: 6px 12px;
                font-size: 12px;
            }
        }
    `;
    document.head.appendChild(style);
});
