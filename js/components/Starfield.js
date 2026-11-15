// AstroVital AI - Interactive Dynamic Space Starfield & Galaxy Engine
// Canvas-based twinkling stars with cosmic nebulae and subtle orbital dust

class Starfield {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.nebulae = [];
    this.numStars = 220;
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
    this.createStars();
    this.createNebulae();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createStars();
      this.createNebulae();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  createStars() {
    this.stars = [];
    const colors = [
      '#FFFFFF', '#F7F7FF', '#B8A4FF', '#62DDF5', '#F2A6D8', '#A29BFE'
    ];

    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.7 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.08
      });
    }
  }

  createNebulae() {
    this.nebulae = [
      { x: this.width * 0.2, y: this.height * 0.25, r: 350, color: 'rgba(118, 87, 214, 0.07)' },
      { x: this.width * 0.85, y: this.height * 0.7, r: 400, color: 'rgba(98, 221, 245, 0.05)' },
      { x: this.width * 0.5, y: this.height * 0.85, r: 300, color: 'rgba(242, 166, 216, 0.04)' }
    ];
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw Subtle Nebulae
    this.nebulae.forEach(neb => {
      const grad = this.ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.r);
      grad.addColorStop(0, neb.color);
      grad.addColorStop(1, 'transparent');
      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(neb.x, neb.y, neb.r, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Draw and Update Stars
    const now = Date.now();
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];

      // Twinkle calculation
      s.twinklePhase += s.twinkleSpeed;
      s.alpha = s.baseAlpha + Math.sin(s.twinklePhase) * 0.35;
      s.alpha = Math.max(0.1, Math.min(1, s.alpha));

      // Subtle slow drift
      s.x += s.speedX;
      s.y += s.speedY;

      if (s.x < 0) s.x = this.width;
      if (s.x > this.width) s.x = 0;
      if (s.y < 0) s.y = this.height;
      if (s.y > this.height) s.y = 0;

      // Draw star
      this.ctx.save();
      this.ctx.globalAlpha = s.alpha;
      this.ctx.fillStyle = s.color;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // For larger stars, add a delicate glow halo
      if (s.radius > 1.2) {
        this.ctx.globalAlpha = s.alpha * 0.25;
        this.ctx.beginPath();
        this.ctx.arc(s.x, s.y, s.radius * 2.8, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}
