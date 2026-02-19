(function () {
  'use strict';

  var canvas, ctx, w, h;
  var particles = [];
  var mouse = { x: -9999, y: -9999 };
  var particleCount = 120;
  var connectionDistance = 150;
  var mouseRadius = 120;
  var rafId;

  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  Particle.prototype.update = function () {
    // Mouse repulsion
    var dx = this.x - mouse.x;
    var dy = this.y - mouse.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < mouseRadius && dist > 0) {
      var force = (mouseRadius - dist) / mouseRadius * 0.02;
      this.vx += (dx / dist) * force;
      this.vy += (dy / dist) * force;
    }

    // Damping
    this.vx *= 0.99;
    this.vy *= 0.99;

    // Clamp velocity
    var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > 1) {
      this.vx = (this.vx / speed) * 1;
      this.vy = (this.vy / speed) * 1;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Wrap edges
    if (this.x < 0) this.x = w;
    if (this.x > w) this.x = 0;
    if (this.y < 0) this.y = h;
    if (this.y > h) this.y = 0;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 240, 255, ' + this.opacity + ')';
    ctx.fill();
  };

  function drawConnections() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          var opacity = (1 - dist / connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(0, 240, 255, ' + opacity + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Mouse connections
    for (var k = 0; k < particles.length; k++) {
      var dx2 = particles[k].x - mouse.x;
      var dy2 = particles[k].y - mouse.y;
      var dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

      if (dist2 < mouseRadius) {
        var opacity2 = (1 - dist2 / mouseRadius) * 0.3;
        ctx.beginPath();
        ctx.moveTo(particles[k].x, particles[k].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(0, 240, 255, ' + opacity2 + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    drawConnections();
    rafId = requestAnimationFrame(animate);
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function init() {
    canvas = document.getElementById('particle-canvas');
    if (!canvas || !canvas.getContext) return;

    ctx = canvas.getContext('2d');
    resize();

    // Reduce particles on mobile
    if (window.innerWidth < 768) {
      particleCount = 60;
      connectionDistance = 120;
    }

    particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Enable pointer events on canvas for mouse tracking
    canvas.style.pointerEvents = 'auto';

    canvas.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    canvas.addEventListener('mouseleave', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    // Disable mouse interaction on touch devices
    if ('ontouchstart' in window) {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    window.addEventListener('resize', function () {
      resize();
      // Recalculate particle count on resize
      var newCount = window.innerWidth < 768 ? 60 : 120;
      if (newCount !== particleCount) {
        particleCount = newCount;
        particles = [];
        for (var j = 0; j < particleCount; j++) {
          particles.push(new Particle());
        }
      }
    });

    // Check reduced motion
    var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    animate();
  }

  window.initParticles = init;
})();
