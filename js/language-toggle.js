// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    let currentLanguage = localStorage.getItem('language') || 'en';
    
    // Initialize language on page load
    setLanguage(currentLanguage);
    
    // Language toggle button event
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
            setLanguage(currentLanguage);
            localStorage.setItem('language', currentLanguage);
        });
    }
    
    function setLanguage(lang) {
        // Update current language display
        const currentLangSpan = document.getElementById('current-lang');
        if (currentLangSpan) {
            currentLangSpan.textContent = lang === 'en' ? 'EN' : 'हिं';
        }
        
        // Update all elements with data attributes
        const elements = document.querySelectorAll('[data-en][data-hi]');
        elements.forEach(element => {
            const text = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-hi');
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-placeholder-en][data-placeholder-hi]');
        placeholderElements.forEach(element => {
            const placeholder = lang === 'en' ? element.getAttribute('data-placeholder-en') : element.getAttribute('data-placeholder-hi');
            if (placeholder) {
                element.placeholder = placeholder;
            }
        });
        
        // Update select options
        updateSelectOptions(lang);
        
        // Update document language attribute
        document.documentElement.lang = lang;
        
        // Update page title
        updatePageTitle(lang);
    }
    
    function updateSelectOptions(lang) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            const options = serviceSelect.querySelectorAll('option');
            options.forEach(option => {
                const text = lang === 'en' ? option.getAttribute('data-en') : option.getAttribute('data-hi');
                if (text) {
                    option.textContent = text;
                }
            });
        }
    }
    
    function updatePageTitle(lang) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const titles = {
            'index.html': {
                'en': 'MaaBijashan Decoration - Premium Event Decoration Services',
                'hi': 'माँबिजासन डेकोरेशन - प्रीमियम इवेंट डेकोरेशन सेवाएं'
            },
            'about.html': {
                'en': 'About Us - MaaBijashan Decoration',
                'hi': 'हमारे बारे में - माँबिजासन डेकोरेशन'
            },
            'services.html': {
                'en': 'Our Services - MaaBijashan Decoration',
                'hi': 'हमारी सेवाएं - माँबिजासन डेकोरेशन'
            },
            'gallery.html': {
                'en': 'Gallery - MaaBijashan Decoration',
                'hi': 'गैलरी - माँबिजासन डेकोरेशन'
            },
            'contact.html': {
                'en': 'Contact Us - MaaBijashan Decoration',
                'hi': 'संपर्क करें - माँबिजासन डेकोरेशन'
            }
        };

        const pageTitle = titles[currentPage] || titles['index.html'];
        document.title = pageTitle[lang];
    }
    
    // Add smooth transition effect
    function addTransitionEffect() {
        const elements = document.querySelectorAll('[data-en][data-hi]');
        elements.forEach(element => {
            element.style.transition = 'opacity 0.3s ease';
        });
    }
    
    addTransitionEffect();
});

// Comprehensive Translation data object for all pages
const translations = {
    en: {
        // Common Navigation & Footer
        home: "Home",
        about: "About",
        services: "Services",
        gallery: "Gallery",
        contact: "Contact",
        quickLinks: "Quick Links",
        ourServices: "Our Services",
        followUs: "Follow Us",
        copyright: "© 2023 MaaBijashan Decoration. All Rights Reserved.",

        // Common Buttons & CTAs
        learnMore: "Learn More",
        contactUs: "Contact Us",
        viewMore: "View More",
        sendMessage: "Send Message",
        startChat: "Start Chat",

        // Services
        weddingDecoration: "Wedding Decoration",
        haldiMehndi: "Haldi & Mehndi",
        babyShower: "Baby Shower",
        birthdayDecoration: "Birthday Decoration",

        // Contact Form
        yourName: "Your Name",
        yourEmail: "Your Email",
        phoneNumber: "Phone Number",
        serviceType: "Service Type",
        yourMessage: "Your Message",
        selectService: "Select Service",
        other: "Other",

        // Placeholders
        enterName: "Enter your name",
        enterEmail: "Enter your email",
        enterPhone: "Enter your phone",
        tellAboutEvent: "Tell us about your event...",

        // WhatsApp
        needHelp: "Need Help? Chat with Us!",
        availableForInquiries: "We're available for decoration inquiries",

        // Stats & Numbers
        happyClients: "Happy Clients",
        eventsDecorated: "Events Decorated",
        yearsExperience: "Years Experience",
        teamMembers: "Team Members",
        eventsCompleted: "Events Completed",
        averageRating: "Average Rating",
        rating: "Rating",

        // About Page Specific
        ourStory: "Our Story",
        ourMission: "Our Mission",
        ourVision: "Our Vision",
        meetOurTeam: "Meet Our Team",
        founderDirector: "Founder & Creative Director",
        seniorDecorator: "Senior Decorator",
        eventCoordinator: "Event Coordinator",
        themeSpecialist: "Theme Specialist",

        // Contact Page Specific
        getInTouch: "Get in Touch",
        ourLocation: "Our Location",
        emailAddress: "Email Address",
        workingHours: "Working Hours",
        sendUsMessage: "Send Us a Message",
        eventDate: "Event Date",
        findUs: "Find Us",
        frequentlyAskedQuestions: "Frequently Asked Questions",

        // Gallery Page Specific
        ourWork: "Our Work",
        viewFullGallery: "View Full Gallery",

        // Service Page Specific
        whatWeOffer: "What We Offer",
        allServices: "All Services",

        // Common Descriptions
        elegantRomantic: "Elegant & Romantic",
        sweetAdorable: "Sweet & Adorable",
        funColorful: "Fun & Colorful",
        traditionalVibrant: "Traditional & Vibrant"
    },

    hi: {
        // Common Navigation & Footer
        home: "होम",
        about: "हमारे बारे में",
        services: "सेवाएं",
        gallery: "गैलरी",
        contact: "संपर्क",
        quickLinks: "त्वरित लिंक",
        ourServices: "हमारी सेवाएं",
        followUs: "हमें फॉलो करें",
        copyright: "© 2023 माँबिजासन डेकोरेशन। सभी अधिकार सुरक्षित।",

        // Common Buttons & CTAs
        learnMore: "और जानें",
        contactUs: "संपर्क करें",
        viewMore: "और देखें",
        sendMessage: "संदेश भेजें",
        startChat: "चैट शुरू करें",

        // Services
        weddingDecoration: "शादी की सजावट",
        haldiMehndi: "हल्दी और मेहंदी",
        babyShower: "बेबी शावर",
        birthdayDecoration: "जन्मदिन की सजावट",

        // Contact Form
        yourName: "आपका नाम",
        yourEmail: "आपका ईमेल",
        phoneNumber: "फोन नंबर",
        serviceType: "सेवा का प्रकार",
        yourMessage: "आपका संदेश",
        selectService: "सेवा चुनें",
        other: "अन्य",

        // Placeholders
        enterName: "अपना नाम दर्ज करें",
        enterEmail: "अपना ईमेल दर्ज करें",
        enterPhone: "अपना फोन नंबर दर्ज करें",
        tellAboutEvent: "हमें अपने इवेंट के बारे में बताएं...",

        // WhatsApp
        needHelp: "मदद चाहिए? हमसे चैट करें!",
        availableForInquiries: "हम सजावट की पूछताछ के लिए उपलब्ध हैं",

        // Stats & Numbers
        happyClients: "खुश ग्राहक",
        eventsDecorated: "सजाए गए इवेंट",
        yearsExperience: "साल का अनुभव",
        teamMembers: "टीम सदस्य",
        eventsCompleted: "पूर्ण किए गए इवेंट",
        averageRating: "औसत रेटिंग",
        rating: "रेटिंग",

        // About Page Specific
        ourStory: "हमारी कहानी",
        ourMission: "हमारा मिशन",
        ourVision: "हमारी दृष्टि",
        meetOurTeam: "हमारी टीम से मिलें",
        founderDirector: "संस्थापक और रचनात्मक निदेशक",
        seniorDecorator: "वरिष्ठ सजावटकर्ता",
        eventCoordinator: "इवेंट समन्वयक",
        themeSpecialist: "थीम विशेषज्ञ",

        // Contact Page Specific
        getInTouch: "संपर्क में आएं",
        ourLocation: "हमारा स्थान",
        emailAddress: "ईमेल पता",
        workingHours: "कार्य समय",
        sendUsMessage: "हमें संदेश भेजें",
        eventDate: "इवेंट की तारीख",
        findUs: "हमें खोजें",
        frequentlyAskedQuestions: "अक्सर पूछे जाने वाले प्रश्न",

        // Gallery Page Specific
        ourWork: "हमारा काम",
        viewFullGallery: "पूरी गैलरी देखें",

        // Service Page Specific
        whatWeOffer: "हम क्या प्रदान करते हैं",
        allServices: "सभी सेवाएं",

        // Common Descriptions
        elegantRomantic: "सुंदर और रोमांटिक",
        sweetAdorable: "मीठा और प्यारा",
        funColorful: "मजेदार और रंगबिरंगा",
        traditionalVibrant: "पारंपरिक और जीवंत"
    }
};

// Function to update complex content
function updateComplexContent(lang) {
    const t = translations[lang];
    
    // Update services section
    const servicesHeaderBadge = document.querySelector('#services .inline-flex span');
    if (servicesHeaderBadge) servicesHeaderBadge.textContent = t.servicesHeader;
    
    const servicesTitle = document.querySelector('#services h2');
    if (servicesTitle) {
        servicesTitle.innerHTML = `${t.servicesTitle.split(' ').slice(0, -1).join(' ')} <span class="gradient-text">${t.servicesTitle.split(' ').slice(-1)[0]}</span>`;
    }
    
    const servicesSubtitle = document.querySelector('#services p');
    if (servicesSubtitle) servicesSubtitle.textContent = t.servicesSubtitle;
}
