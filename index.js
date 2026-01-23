
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links ul');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('mobile-menu-active');
      
      // Create mobile menu if it doesn't exist
      let mobileMenu = document.querySelector('.mobile-menu');
      
      if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.classList.add('mobile-menu');
        
        const mobileNav = document.createElement('ul');
        const links = document.querySelectorAll('.nav-links ul li');
        
        links.forEach(link => {
          const clone = link.cloneNode(true);
          mobileNav.appendChild(clone);
        });
        
        mobileMenu.appendChild(mobileNav);
        document.querySelector('.navbar').after(mobileMenu);
      }
      
      mobileMenu.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking a link
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('nav-link')) {
      const mobileMenu = document.querySelector('.mobile-menu');
      const mobileMenuBtn = document.getElementById('mobile-menu-btn');
      
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('mobile-menu-active');
      }
    }
  });
  
  // Navbar scroll effects
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-testimonial');
  const nextBtn = document.querySelector('.next-testimonial');
  
  let currentSlide = 0;
  
  function showSlide(n) {
    testimonialSlides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    testimonialSlides[n].classList.add('active');
    dots[n].classList.add('active');
    currentSlide = n;
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
      showSlide(currentSlide);
    });
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showSlide(index);
    });
  });
  
  // Auto-rotate testimonials
  setInterval(function() {
    if (testimonialSlides.length > 0) {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    }
  }, 5000);
  
  // Gallery Lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightbox = document.querySelector('.close-lightbox');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').getAttribute('src');
      lightboxImg.setAttribute('src', imgSrc);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  if (closeLightbox) {
    closeLightbox.addEventListener('click', closeLightboxFunction);
  }
  
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === this) {
        closeLightboxFunction();
      }
    });
  }
  
  function closeLightboxFunction() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Form Submission
  const appointmentForm = document.getElementById('appointment-form');
  
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const service = document.getElementById('service').value;
      const date = document.getElementById('date').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send this data to a server
      // For this example, we'll just show an alert
      
      // Show toast message
const toast = document.getElementById('toast-message');
toast.textContent = `Thank you, ${name}! Your appointment for ${service} on ${date} has been booked.`;
toast.classList.add('show');

// Hide toast after 4 seconds
setTimeout(() => {
  toast.classList.remove('show');
}, 4000);

      
      // Reset the form
      appointmentForm.reset();
    });
  }
  
  // Add fade-in animation to sections
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.25
  };
  
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    section.classList.remove('fade-in');
    observer.observe(section);
  });
});
