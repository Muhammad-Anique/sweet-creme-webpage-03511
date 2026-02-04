'use strict';

/**
 * Sweet Creme Webpage - Essential Interactivity
 * Focus: Mobile Navigation, Smooth Scrolling, and Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Navigation Toggle (Optional Component) ---
    // If a hamburger menu is added for tablet/mobile
    const createMobileNav = () => {
        const nav = document.querySelector('.nav-links');
        const header = document.querySelector('.navbar .container');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-toggle';
            toggle.innerHTML = '<span></span><span></span><span></span>';
            toggle.setAttribute('aria-label', 'Toggle Menu');
            
            header.insertBefore(toggle, nav);

            toggle.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
                toggle.classList.toggle('toggle-active');
            });

            // Close menu when a link is clicked
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('nav-active');
                    toggle.classList.remove('toggle-active');
                });
            });
        }
    };

    // --- 2. Smooth Scrolling for Anchor Links ---
    // Enhanced smooth scroll fallback for older browsers (or specific offset needs)
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Scroll Reveal Animations ---
    // Makes the flavor list and hero content pop as they enter the screen
    const revealOnScroll = () => {
        const elements = document.querySelectorAll('.flavor-card, .section-title, .hero-content');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(el => {
            // Initial state for animation
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(el);
        });
    };

    // --- 4. Navbar Background Change on Scroll ---
    const handleNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    };

    // Initialize
    revealOnScroll();
    createMobileNav();
    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('resize', createMobileNav);

    console.log("Sweet Creme: Joyfully loaded!");
});