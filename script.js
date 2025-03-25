// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle functionality
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
            
            // Change menu icon
            const menuIcon = menuBtn.querySelector('.menu-icon');
            if (menuIcon) {
                menuIcon.textContent = menuIcon.textContent === '☰' ? '✕' : '☰';
            }
        });
    }
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            
            // Reset menu icon
            const menuIcon = menuBtn.querySelector('.menu-icon');
            if (menuIcon) {
                menuIcon.textContent = '☰';
            }
        });
    });
    
    // Sticky navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 20) {
                navbar.style.padding = '10px 0';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.padding = '15px 0';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        }
    });
    
    // Smooth scrolling for navbar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || subject === '' || message === '') {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showAlert('Your message has been sent successfully!', 'success');
            contactForm.reset();
            
            // In a real application, you would send data to a server here
            // Example with fetch API:
            /*
            fetch('your-server-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message
                })
            })
            .then(response => response.json())
            .then(data => {
                showAlert('Your message has been sent successfully!', 'success');
                contactForm.reset();
            })
            .catch(error => {
                showAlert('There was an error sending your message', 'error');
                console.error('Error:', error);
            });
            */
        });
    }
    
    // Alert function
    function showAlert(message, type) {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.textContent = message;
        
        // Add alert to the page
        document.body.appendChild(alertDiv);
        
        // Style the alert
        alertDiv.style.position = 'fixed';
        alertDiv.style.bottom = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.padding = '15px 20px';
        alertDiv.style.borderRadius = '5px';
        alertDiv.style.fontFamily = "'Poppins', sans-serif";
        alertDiv.style.fontSize = '0.9rem';
        alertDiv.style.zIndex = '9999';
        alertDiv.style.transform = 'translateY(100px)';
        alertDiv.style.opacity = '0';
        alertDiv.style.transition = 'all 0.3s ease';
        
        if (type === 'success') {
            alertDiv.style.backgroundColor = '#5651e5';
            alertDiv.style.color = '#fff';
        } else if (type === 'error') {
            alertDiv.style.backgroundColor = '#ff5252';
            alertDiv.style.color = '#fff';
        }
        
        // Show the alert
        setTimeout(() => {
            alertDiv.style.transform = 'translateY(0)';
            alertDiv.style.opacity = '1';
        }, 10);
        
        // Remove the alert after 3 seconds
        setTimeout(() => {
            alertDiv.style.transform = 'translateY(100px)';
            alertDiv.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 300);
        }, 3000);
    }
    
    // Typing effect for the hero section
    function typeEffect() {
        const element = document.querySelector('.home-content h1:nth-child(3)');
        if (element) {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 100);
        }
    }
    
    // Call typing effect after a short delay
    setTimeout(typeEffect, 1000);
    
    // Fade-in animation for sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    document.querySelector('.home').style.opacity = '1';
    document.querySelector('.home').style.transform = 'translateY(0)';
    
    // Add fade-in class
    document.documentElement.style.setProperty('--fade-in-opacity', '1');
    document.documentElement.style.setProperty('--fade-in-transform', 'translateY(0)');
    
    // Set dynamic copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    } else {
        // If the span with id="current-year" doesn't exist, find the copyright text and update it
        const footerText = document.querySelector('.footer-content p');
        if (footerText) {
            const currentYear = new Date().getFullYear();
            footerText.innerHTML = footerText.innerHTML.replace(/\d{4}/, currentYear);
        }
    }
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style); 