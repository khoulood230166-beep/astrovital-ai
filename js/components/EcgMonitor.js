// AstroVital AI - Real-Time Dynamic ECG Waveform Canvas Engine
// Simulates medical grade lead-II electrocardiogram with P-Q-R-S-T complexes

class EcgMonitor {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.points = [];
    this.maxPoints = 280;
    this.scanX = 0;
    this.phase = 0;
    this.init();
    this.animate();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * (window.devicePixelRatio || 1);
    this.canvas.height = rect.height * (window.devicePixelRatio || 1);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.points = new Array(Math.floor(this.width)).fill(this.height / 2);
  }

  calculateSample(bpm) {
    // Cardiac cycle period in frames (assuming 60fps)
    const framesPerBeat = Math.max(20, Math.floor((60 / bpm) * 60));
    const cycle = (this.phase % framesPerBeat) / framesPerBeat;
    const mid = this.height / 2;
    const amp = this.height * 0.42;

    let y = mid;

    // P Wave (atrial depolarization)
    if (cycle > 0.12 && cycle < 0.22) {
      y -= Math.sin((cycle - 0.12) / 0.10 * Math.PI) * (amp * 0.18);
    }
    // Q Dip
    else if (cycle >= 0.24 && cycle < 0.28) {
      y += (amp * 0.12);
    }
    // R Spike (ventricular depolarization)
    else if (cycle >= 0.28 && cycle < 0.34) {
      const rProgress = (cycle - 0.28) / 0.06;
      if (rProgress < 0.5) {
        y -= (rProgress * 2) * amp;
      } else {
        y -= (1 - (rProgress - 0.5) * 2) * amp;
      }
    }
    // S Dip
    else if (cycle >= 0.34 && cycle < 0.38) {
      y += (amp * 0.25);
    }
    // T Wave (ventricular repolarization)
    else if (cycle > 0.45 && cycle < 0.62) {
      y -= Math.sin((cycle - 0.45) / 0.17 * Math.PI) * (amp * 0.28);
    }

    return y;
  }

  animate() {
    if (!this.canvas || !this.ctx) return;
    const bpm = store.state.liveTelemetry.heartRate || 72;
    const sampleY = this.calculateSample(bpm);

    this.points[this.scanX] = sampleY;
    this.scanX = (this.scanX + 2) % Math.floor(this.width);
    this.phase++;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw background subtle grid lines
    this.ctx.strokeStyle = 'rgba(98, 221, 245, 0.08)';
    this.ctx.lineWidth = 1;
    const gridStep = 25 * (window.devicePixelRatio || 1);
    for (let x = 0; x < this.width; x += gridStep) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += gridStep) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

    // Draw ECG trace
    this.ctx.lineWidth = 2.4 * (window.devicePixelRatio || 1);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    const isCritical = bpm > 115 || bpm < 50;
    const strokeColor = isCritical ? '#ff4757' : (bpm > 95 ? '#ffab00' : '#62DDF5');
    this.ctx.strokeStyle = strokeColor;
    this.ctx.shadowColor = strokeColor;
    this.ctx.shadowBlur = 10;

    this.ctx.beginPath();
    let gap = 14;
    for (let x = 0; x < this.width; x++) {
      // Create empty erase gap ahead of the sweep
      if (Math.abs(x - this.scanX) < gap) continue;

      const y = this.points[x] || (this.height / 2);
      if (x === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // Draw scanning glow lead point
    const leadY = this.points[this.scanX] || (this.height / 2);
    this.ctx.fillStyle = strokeColor;
    this.ctx.beginPath();
    this.ctx.arc(this.scanX, leadY, 3.5 * (window.devicePixelRatio || 1), 0, Math.PI * 2);
    this.ctx.fill();

    requestAnimationFrame(() => this.animate());
  }
}
