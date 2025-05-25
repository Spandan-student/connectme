document.addEventListener('DOMContentLoaded', function() {
    // Initialize welcome popup with delay
    setTimeout(function() {
        const welcomePopup = document.getElementById('welcomePopup');
        if (welcomePopup) {
            welcomePopup.style.display = 'block';
            
            // Close popup when clicking X
            const closePopup = welcomePopup.querySelector('.close-popup');
            if (closePopup) {
                closePopup.addEventListener('click', function() {
                    welcomePopup.style.display = 'none';
                });
            }
        }
    }, 2000);

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const indicators = document.querySelectorAll('.indicator');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        
        // Set up the carousel
        function updateCarousel() {
            track.style.transform = `translateX(${-currentIndex * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Initialize
        updateCarousel();
        
        // Next button
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            });
        }
        
        // Previous button
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel();
            });
        }
        
        // Indicator buttons
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Auto-advance carousel every 5 seconds
        setInterval(function() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }, 5000);
    }

    // FAQ accordion
    // const faqItems = document.querySelectorAll('.faq-item');
    
    // faqItems.forEach(item => {
    //     const question = item.querySelector('.faq-question');
        
    //     if (question) {
    //         question.addEventListener('click', function() {
    //             // Close all other items
    //             console.log('FAQ item clicked');
    //             faqItems.forEach(otherItem => {
    //                 if (otherItem !== item) {
    //                     otherItem.classList.remove('active');
    //                 }
    //             });
                
    //             // Toggle this item
    //             item.classList.toggle('active');

    //             // Get the answer element
    //             const answer = faqItem.querySelector('.faq-answer');
                
    //             // Change icon
    //             const icon = question.querySelector('.faq-toggle i');
    //             if (icon) {
    //                 if (item.classList.contains('active')) {
    //                     icon.className = 'fas fa-minus';
    //                 } else {
    //                     icon.className = 'fas fa-plus';
    //                 }
    //             }
    //         });
    //     }
    // });
    
    // Authentication tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            authTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show the selected tab content
            const activeContent = document.getElementById(`${tabId}-tab-content`);
            if (activeContent) {
                activeContent.style.display = 'block';
            }
        });
    });
    
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            
            // Toggle icon
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .step, .testimonial, .university-logo');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Mock login form handler (extends auth.js functionality)
    const loginForm = document.getElementById('login');
    if (loginForm) {
        const originalLoginHandler = loginForm.onsubmit;
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the remember me checkbox
            const rememberMe = document.getElementById('remember').checked;
            
            // Pass to original handler or handle here
            if (originalLoginHandler) {
                originalLoginHandler(e);
            } else {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Validate university email
                if (!validateUniversityEmail(email)) {
                    showAlert('Please use a valid university email address (.edu)', 'error');
                    return;
                }
                
                // Simulate login with remember me option
                simulateLogin(email, password, rememberMe);
            }
        });
    }
    
    // Helper function to show alerts on the landing page
    function showAlert(message, type) {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `landing-alert landing-alert-${type}`;
        alertDiv.textContent = message;
        
        // Find where to insert the alert
        const form = document.querySelector('.popup-form');
        if (form) {
            form.parentNode.insertBefore(alertDiv, form);
            
            // Style the alert
            alertDiv.style.padding = '10px 15px';
            alertDiv.style.marginBottom = '20px';
            alertDiv.style.borderRadius = '4px';
            alertDiv.style.textAlign = 'center';
            
            if (type === 'success') {
                alertDiv.style.backgroundColor = '#d4edda';
                alertDiv.style.color = '#155724';
            } else if (type === 'error') {
                alertDiv.style.backgroundColor = '#f8d7da';
                alertDiv.style.color = '#721c24';
            }
            
            // Remove after 3 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
        }
    }
    
    // Validate university email (extending from auth.js)
    function validateUniversityEmail(email) {
        return email.toLowerCase().endsWith('.edu');
    }
    
    // Simulate login (extending from auth.js)
    function simulateLogin(email, password, rememberMe) {
        // Simulate server delay
        setTimeout(() => {
            // For demo purposes, any credentials will work
            localStorage.setItem('studentConnect_isLoggedIn', 'true');
            localStorage.setItem('studentConnect_userEmail', email);
            localStorage.setItem('studentConnect_userName', email.split('@')[0]);
            
            if (rememberMe) {
                localStorage.setItem('studentConnect_rememberMe', 'true');
            }
            
            // Redirect to profile page if first time, otherwise dashboard
            const hasProfile = localStorage.getItem('studentConnect_hasProfile');
            if (hasProfile) {
                window.location.href = 'dashboard.html';
            } else {
                window.location.href = 'profile.html';
            }
        }, 1000);
    }
});