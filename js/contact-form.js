// Contact Form Handler with Direct Email Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const eventDate = formData.get('event-date');
            const message = formData.get('message');

            // Get current language
            const currentLang = localStorage.getItem('language') || 'en';

            // Show loading state
            showLoadingState();

            // Create email content and submit
            submitFormDirectly(name, email, phone, service, eventDate, message, currentLang);
        });
    }

    function submitFormDirectly(name, email, phone, service, eventDate, message, lang) {
        try {
            // Create email content
            const emailContent = createEmailContent(name, email, phone, service, eventDate, message, lang);

            // Create subject
            const subject = lang === 'hi' ?
                'नई संपर्क पूछताछ - माँबिजासन डेकोरेशन' :
                'New Contact Inquiry - MaaBijashan Decoration';

            // Create mailto URL
            const mailtoUrl = `mailto:maabijashandecoration@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;

            // Open email client
            window.location.href = mailtoUrl;

            // Show success message
            setTimeout(() => {
                showSuccessMessage(lang);
                contactForm.reset();

                // Track successful submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'event_category': 'Contact',
                        'event_label': 'Direct Submit',
                        'value': 1
                    });
                }
            }, 1000);

        } catch (error) {
            console.error('Error submitting form:', error);
            showErrorMessage(lang);
        }
    }

    function createEmailContent(name, email, phone, service, eventDate, message, lang) {
        if (lang === 'hi') {
            return `नमस्ते,

मुझे माँबिजासन डेकोरेशन की सेवाओं में रुचि है।

व्यक्तिगत विवरण:
नाम: ${name}
ईमेल: ${email}
फोन: ${phone}

सेवा विवरण:
सेवा का प्रकार: ${getServiceName(service, lang)}
इवेंट की तारीख: ${eventDate || 'निर्दिष्ट नहीं'}

संदेश:
${message}

कृपया मुझसे जल्द से जल्द संपर्क करें।

धन्यवाद,
${name}`;
        } else {
            return `Hello,

I am interested in MaaBijashan Decoration services.

Personal Details:
Name: ${name}
Email: ${email}
Phone: ${phone}

Service Details:
Service Type: ${getServiceName(service, lang)}
Event Date: ${eventDate || 'Not specified'}

Message:
${message}

Please contact me at your earliest convenience.

Thank you,
${name}`;
        }
    }

    function getServiceName(service, lang) {
        const serviceNames = {
            'wedding': {
                'en': 'Wedding Decoration',
                'hi': 'शादी की सजावट'
            },
            'haldi-mehndi': {
                'en': 'Haldi & Mehndi',
                'hi': 'हल्दी और मेहंदी'
            },
            'baby-shower': {
                'en': 'Baby Shower',
                'hi': 'बेबी शावर'
            },
            'birthday': {
                'en': 'Birthday Decoration',
                'hi': 'जन्मदिन की सजावट'
            },
            'other': {
                'en': 'Other',
                'hi': 'अन्य'
            }
        };

        return serviceNames[service] ? serviceNames[service][lang] : service;
    }

    function showLoadingState() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const currentLang = localStorage.getItem('language') || 'en';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = currentLang === 'hi' ?
                '<i class="fas fa-spinner fa-spin"></i> भेजा जा रहा है...' :
                '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
    }

    function showSuccessMessage(lang) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Reset button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = lang === 'hi' ?
                '<i class="fas fa-paper-plane"></i> संदेश भेजें' :
                '<i class="fas fa-paper-plane"></i> Send Message';
        }

        // Show success notification
        const notification = createNotification(lang);
        document.body.appendChild(notification);

        // Auto remove notification after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    function createNotification(lang) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        // CSS classes are defined in style.css

        const message = lang === 'hi' ?
            '✅ संदेश सफलतापूर्वक भेज दिया गया! हम जल्द ही आपसे संपर्क करेंगे।' :
            '✅ Message sent successfully! We will contact you soon.';

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
                <button onclick="this.parentNode.parentNode.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-left: 10px;">&times;</button>
            </div>
        `;

        return notification;
    }

    function showErrorMessage(lang) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Reset button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = lang === 'hi' ?
                '<i class="fas fa-paper-plane"></i> संदेश भेजें' :
                '<i class="fas fa-paper-plane"></i> Send Message';
        }

        // Show error notification
        const notification = createErrorNotification(lang);
        document.body.appendChild(notification);

        // Auto remove notification after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    function createErrorNotification(lang) {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        // CSS classes are defined in style.css

        const message = lang === 'hi' ?
            '❌ संदेश भेजने में समस्या। कृपया सीधे maabijashandecoration@gmail.com पर ईमेल करें।' :
            '❌ Error sending message. Please email maabijashandecoration@gmail.com directly.';

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button onclick="this.parentNode.parentNode.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-left: 10px;">&times;</button>
            </div>
        `;

        return notification;
    }

    // CSS styles are now in style.css file
    // No need to add inline styles
});

// Alternative Email Integration Methods
class EmailService {
    // Method 1: EmailJS Integration (Recommended for production)
    static initEmailJS() {
        // Add EmailJS script to head if not already present
        if (!document.querySelector('script[src*="emailjs"]')) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => {
                // Initialize EmailJS with your public key
                // emailjs.init("YOUR_PUBLIC_KEY");
                console.log('EmailJS loaded - Configure with your credentials');
            };
            document.head.appendChild(script);
        }
    }

    // Method 2: Send via EmailJS
    static async sendViaEmailJS(formData) {
        try {
            const result = await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    event_date: formData.eventDate,
                    message: formData.message
                }
            );
            return { success: true, result };
        } catch (error) {
            return { success: false, error };
        }
    }

    // Method 3: Send to backend API
    static async sendViaAPI(formData) {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            return { success: response.ok, result };
        } catch (error) {
            return { success: false, error };
        }
    }
}

// Initialize EmailJS on page load
EmailService.initEmailJS();