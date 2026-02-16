(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof initParticles === 'function') initParticles();
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
  });
})();
