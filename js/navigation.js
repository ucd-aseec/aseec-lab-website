(function () {
  'use strict';

  function init() {
    var navbar = document.getElementById('navbar');
    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    var links = document.querySelectorAll('.nav-links a');
    var sections = document.querySelectorAll('section[id]');

    // Scroll-based navbar background
    function onScroll() {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu toggle
    if (toggle) {
      toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        var expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
      });
    }

    // Close mobile menu on link click
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) {
          toggle.classList.remove('active');
          navLinks.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Active section tracking with IntersectionObserver
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            links.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
              }
            });
          }
        });
      }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      });

      sections.forEach(function (section) {
        observer.observe(section);
      });
    }
  }

  window.initNavigation = init;
})();
