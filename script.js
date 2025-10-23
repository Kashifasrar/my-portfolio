// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Set dark theme as default
    document.body.setAttribute('data-theme', 'dark');
    
    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link Highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Scroll Event Listener
    window.addEventListener('scroll', updateActiveNavLink);

    // Typing Animation for Header
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing animation after loading screen
    setTimeout(() => {
        const typingElement = document.querySelector('.typing-text');
        const subtitleElement = document.querySelector('.typing-subtitle');
        const originalText = typingElement.textContent;
        const subtitleText = subtitleElement.textContent;
        
        // Clear subtitle text initially
        subtitleElement.textContent = '';
        
        // Type the main text first
        typeWriter(typingElement, originalText, 80);
        
        // Show and type the subtitle after main text is done
        setTimeout(() => {
            subtitleElement.style.opacity = '1';
            subtitleElement.style.visibility = 'visible';
            typeWriter(subtitleElement, subtitleText, 100);
        }, originalText.length * 80 + 500);
    }, 2500);

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                }
                
                if (entry.target.classList.contains('project-card')) {
                    const cards = document.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        if (card === entry.target) {
                            card.style.animationDelay = `${index * 0.2}s`;
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .education-item, .experience-item, .social-icon');
    animatedElements.forEach(el => observer.observe(el));

    // Skills Section Hover Effects
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project Cards Carousel Functionality
    const projectsCarousel = document.querySelector('.projects-carousel');
    let isScrolling = false;

    // Auto-scroll projects carousel
    function autoScrollProjects() {
        if (isScrolling) return;
        
        const scrollAmount = 380; // Width of one card + gap
        const maxScroll = projectsCarousel.scrollWidth - projectsCarousel.clientWidth;
        
        if (projectsCarousel.scrollLeft >= maxScroll - 10) {
            // Reset to beginning
            projectsCarousel.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            // Scroll to next card
            projectsCarousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    // Start auto-scroll after 3 seconds
    setTimeout(() => {
        setInterval(autoScrollProjects, 4000);
    }, 3000);

    // Pause auto-scroll on hover
    projectsCarousel.addEventListener('mouseenter', () => {
        isScrolling = true;
    });

    projectsCarousel.addEventListener('mouseleave', () => {
        isScrolling = false;
    });

    // Project Button Click Effects
    const projectButtons = document.querySelectorAll('.project-btn');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Social Icons Animation
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });

    // Parallax Effect for Header Background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const headerSection = document.querySelector('.header-section');
        
        if (headerSection) {
            const rate = scrolled * -0.5;
            headerSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Mobile Menu Toggle (for smaller screens)
    function createMobileMenu() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Insert mobile menu button
        navbar.querySelector('.nav-container').appendChild(mobileMenuBtn);
        
        // Mobile menu functionality
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    // Initialize mobile menu for screens smaller than 768px
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Window resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    });

    // Add CSS for mobile menu
    const mobileMenuCSS = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 10px;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .nav-links {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: var(--bg-secondary);
                flex-direction: column;
                justify-content: flex-start;
                padding: 20px;
                transition: left 0.3s ease;
                z-index: 998;
            }
            
            .nav-links.mobile-active {
                left: 0;
            }
            
            .nav-links .nav-link {
                padding: 15px 0;
                border-bottom: 1px solid var(--border-color);
                width: 100%;
                text-align: center;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = mobileMenuCSS;
    document.head.appendChild(style);

    // Add ripple effect CSS
    const rippleCSS = `
        .project-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = rippleCSS;
    document.head.appendChild(rippleStyle);

    // Global functions for action buttons
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.downloadResume = function() {
        // Use the actual resume filename
        const resumeUrl = 'kashif-resume.pdf';
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Mohamed_Kashif_Asraar_Resume.pdf';
        link.target = '_blank';
        
        // Add the link to the page and trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Performance optimization: Throttle scroll events
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(() => {
        updateActiveNavLink();
    }, 100);

    window.removeEventListener('scroll', updateActiveNavLink);
    window.addEventListener('scroll', throttledScrollHandler);

    // Initialize everything
    console.log('Portfolio website loaded successfully! 🚀');
});
