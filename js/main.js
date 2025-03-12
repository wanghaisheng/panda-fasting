document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });
    
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Pricing toggle
    const billingToggle = document.getElementById('billing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    
    billingToggle.addEventListener('change', () => {
        if (billingToggle.checked) {
            monthlyPrices.forEach(price => price.style.display = 'none');
            yearlyPrices.forEach(price => price.style.display = 'flex');
        } else {
            monthlyPrices.forEach(price => price.style.display = 'flex');
            yearlyPrices.forEach(price => price.style.display = 'none');
        }
    });

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentTestimonial = 0;
    const testimonialCount = testimonialSlides.length;
    
    function showTestimonial(index) {
        testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
        
        // Update active dot
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }
    
    // Initialize testimonial slider
    showTestimonial(0);
    
    // Navigate testimonials
    prevBtn.addEventListener('click', () => {
        showTestimonial((currentTestimonial - 1 + testimonialCount) % testimonialCount);
    });
    
    nextBtn.addEventListener('click', () => {
        showTestimonial((currentTestimonial + 1) % testimonialCount);
    });
    
    // Navigate testimonials with dots
    testimonialDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showTestimonial(i);
        });
    });

    // App preview carousel
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.carousel-dots .dot');
    
    let currentSlide = 0;
    const slideCount = carouselSlides.length;
    let carouselInterval;
    
    function showSlide(index) {
        carouselContainer.style.transform = `translateX(-${index * 100}%)`;
        
        // Update active dot
        carouselDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    // Initialize carousel
    showSlide(0);
    
    // Auto-advance carousel
    function startCarousel() {
        carouselInterval = setInterval(() => {
            showSlide((currentSlide + 1) % slideCount);
        }, 3000);
    }
    
    function stopCarousel() {
        clearInterval(carouselInterval);
    }
    
    startCarousel();
    
    // Navigate carousel with dots
    carouselDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            stopCarousel();
            startCarousel();
        });
    });
    
    // Pause carousel on hover
    carouselContainer.addEventListener('mouseenter', stopCarousel);
    carouselContainer.addEventListener('mouseleave', startCarousel);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .step, .pricing-plan, .testimonial-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animated elements
    document.querySelectorAll('.feature-card, .step, .pricing-plan, .testimonial-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});

