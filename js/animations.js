(function () {
  'use strict';

  // Scroll reveal
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything
      var els = document.querySelectorAll('.animate-on-scroll');
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = parseFloat(entry.target.getAttribute('data-delay') || 0);
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay * 1000);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    var elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Typing animation
  function initTypingAnimation() {
    var el = document.getElementById('typed-text');
    if (!el) return;

    var words = [
      'reinforcement learning',
      'large language models',
      'formal verification',
      'ASIC design automation'
    ];
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 80;
    var deleteSpeed = 40;
    var pauseTime = 2000;

    function type() {
      var currentWord = words[wordIndex];

      if (isDeleting) {
        el.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      var nextDelay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        nextDelay = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        nextDelay = 300;
      }

      setTimeout(type, nextDelay);
    }

    // Start after a short delay
    setTimeout(type, 1000);
  }

  function init() {
    initScrollReveal();
    initTypingAnimation();
  }

  window.initScrollAnimations = init;
})();
