// California Window Cleaning - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            // Toggle hamburger menu animation
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileMenuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
    
    // Before/After Image Slider
    const sliders = document.querySelectorAll('.before-after-container');
    
    if (sliders.length > 0) {
        sliders.forEach(slider => {
            const beforeImage = slider.querySelector('.before-image');
            const sliderHandle = slider.querySelector('.slider-handle');
            let isResizing = false;
            
            // Initial position
            beforeImage.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
            sliderHandle.style.left = '50%';
            
            // Mouse events
            sliderHandle.addEventListener('mousedown', startResize);
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
            
            // Touch events for mobile
            sliderHandle.addEventListener('touchstart', startResize);
            window.addEventListener('touchmove', resize);
            window.addEventListener('touchend', stopResize);
            
            function startResize(e) {
                e.preventDefault();
                isResizing = true;
            }
            
            function resize(e) {
                if (!isResizing) return;
                
                let clientX;
                if (e.type === 'touchmove') {
                    clientX = e.touches[0].clientX;
                } else {
                    clientX = e.clientX;
                }
                
                const rect = slider.getBoundingClientRect();
                const position = (clientX - rect.left) / rect.width * 100;
                
                // Limit position between 0% and 100%
                const limitedPosition = Math.min(Math.max(position, 0), 100);
                
                // Update clip path and handle position
                beforeImage.style.clipPath = `polygon(0 0, ${limitedPosition}% 0, ${limitedPosition}% 100%, 0 100%)`;
                sliderHandle.style.left = `${limitedPosition}%`;
            }
            
            function stopResize() {
                isResizing = false;
            }
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if the href is not just "#"
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (mobileNav && mobileNav.classList.contains('active')) {
                        mobileMenuToggle.click();
                    }
                    
                    // Scroll to target
                    const headerHeight = document.querySelector('.sticky-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form Validation
    const quoteForm = document.querySelector('.quote-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = quoteForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Email validation
            const emailField = quoteForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = 'red';
                }
            }
            
            // If valid, show success message (in a real site, this would submit the form)
            if (isValid) {
                const formSubmit = quoteForm.querySelector('.form-submit');
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<p>Thank you! Your quote request has been submitted. We will contact you shortly.</p>';
                successMessage.style.color = '#00CE89';
                successMessage.style.padding = '15px';
                successMessage.style.marginTop = '20px';
                successMessage.style.textAlign = 'center';
                successMessage.style.fontWeight = 'bold';
                
                // Replace submit button with success message
                formSubmit.innerHTML = '';
                formSubmit.appendChild(successMessage);
                
                // Reset form
                quoteForm.reset();
            }
        });
    }
    
    // Sticky Header Effect
    const stickyHeader = document.querySelector('.sticky-header');
    
    if (stickyHeader) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                stickyHeader.style.padding = '10px 0';
                stickyHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                stickyHeader.style.padding = '15px 0';
                stickyHeader.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });
    }
});
