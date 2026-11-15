// AstroVital AI - Camera-Based Movement & Biomechanical Analysis
// Computer Vision Pose Estimation Demonstration for Microgravity Exercise

const CameraAnalysisView = {
  activeExerciseId: 'ex-squat',
  isPlaying: true,
  animFrameId: null,
  simFrame: 0,

  render() {
    const exercises = AstroData.movementExercises;
    const currentEx = exercises.find(e => e.id === this.activeExerciseId) || exercises[0];

    return `
      <div class="camera-analysis-page container" style="padding: 32px 24px 80px;">
        
        <!-- PROTOTYPE DISCLAIMER BANNER -->
        <div class="glass-panel" style="padding: 16px 22px; margin-bottom: 24px; border-left: 4px solid var(--soft-lavender); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; background: rgba(16, 26, 58, 0.85);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="color: var(--soft-lavender);">${Icons.info('', 22)}</div>
            <div>
              <strong style="color: #ffffff; font-size: 0.95rem;">Computer Vision Pose Estimation Demonstration:</strong>
              <span style="color: var(--text-muted); font-size: 0.82rem; margin-left: 6px;">
                Demonstrates real-time biomechanical kinematic tracking designed to mitigate microgravity bone mineral density loss and muscular atrophy.
              </span>
            </div>
          </div>
          <span class="badge badge-pink" style="font-size: 0.7rem;">PROTOTYPE DEMO MODE</span>
        </div>

        <!-- EXERCISE SELECTION BAR -->
        <div class="glass-panel" style="padding: 18px 24px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;" class="mono">Select Countermeasure Exercise Protocol</span>
            <div style="display: flex; gap: 10px; margin-top: 6px; flex-wrap: wrap;">
              ${exercises.map(ex => `
                <button class="btn btn-sm ${ex.id === this.activeExerciseId ? 'btn-primary' : 'btn-outline'} exercise-select-btn" data-ex="${ex.id}">
                  ${ex.name}
                </button>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; gap: 12px; align-items: center;">
            <label class="btn btn-outline btn-sm" style="cursor: pointer;">
              ${Icons.video('', 16)} <span>Upload Video File</span>
              <input type="file" id="video-upload-input" accept="video/*" style="display: none;">
            </label>
            <button id="toggle-play-btn" class="btn btn-cyan btn-sm">
              ${this.isPlaying ? Icons.pause('', 16) : Icons.play('', 16)}
              <span>${this.isPlaying ? 'Pause Tracking' : 'Resume Tracking'}</span>
            </button>
          </div>
        </div>

        <!-- MAIN 2-COLUMN VIEWPORT & METRICS -->
        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 28px;" class="lg-grid-cols-1">
          
          <!-- LEFT: INTERACTIVE POSE ESTIMATION CANVAS VIEWPORT -->
          <div class="glass-panel" style="padding: 20px; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="pulse-dot pulse-dot-green"></span>
                <span style="font-size: 0.85rem; font-weight: 700; color: #ffffff;" class="mono">
                  OPTICAL CAM-02 • HAB GYM MODULE (ARED)
                </span>
              </div>
              <span class="badge badge-cyan mono" style="font-size: 0.7rem;">60 FPS • 12 KEYPOINTS</span>
            </div>

            <!-- Pose Viewport -->
            <div class="pose-viewport">
              <canvas id="pose-canvas" style="width: 100%; height: 100%; display: block;"></canvas>

              <!-- Futuristic HUD Overlays on Video -->
              <div style="position: absolute; top: 14px; left: 16px; background: rgba(8, 13, 36, 0.75); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 6px; font-size: 0.75rem;" class="mono">
                <span style="color: var(--text-dim);">PROTOCOL:</span> <strong style="color: var(--electric-cyan);">${currentEx.name}</strong>
              </div>

              <div style="position: absolute; bottom: 14px; left: 16px; background: rgba(8, 13, 36, 0.75); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 6px; font-size: 0.75rem;" class="mono">
                <span style="color: var(--text-dim);">FATIGUE INDEX:</span> <strong style="color: #2ed573;">${currentEx.fatigueIndexPct}% (NOMINAL)</strong>
              </div>

              <div style="position: absolute; bottom: 14px; right: 16px; background: rgba(8, 13, 36, 0.75); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 6px; font-size: 0.75rem;" class="mono">
                <span style="color: var(--text-dim);">REPS:</span> <strong style="color: #ffffff;">${currentEx.currentReps} / ${currentEx.targetReps}</strong>
              </div>
            </div>

            <!-- Form Feedback Banner -->
            <div style="margin-top: 14px; background: rgba(98, 221, 245, 0.1); border: 1px solid rgba(98, 221, 245, 0.3); border-radius: var(--radius-sm); padding: 12px 16px; display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
              <span style="color: var(--electric-cyan);">${Icons.sparkles('', 20)}</span>
              <div>
                <strong style="color: var(--electric-cyan);">AI Form Coach:</strong>
                <span style="color: var(--starlight-white); margin-left: 6px;">${currentEx.feedback}</span>
              </div>
            </div>
          </div>

          <!-- RIGHT: BIOMECHANICAL METRICS & PERFORMANCE GAUGES -->
          <div class="glass-panel" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                <h3 style="font-size: 1.25rem; font-weight: 700;">Biomechanical Kinematics</h3>
                <span class="badge badge-nasa">Ares V Standards</span>
              </div>

              <!-- Metric 1: Bilateral Symmetry -->
              <div style="margin-bottom: 18px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
                  <span style="color: var(--text-muted);">Bilateral Symmetry (L vs R):</span>
                  <strong style="color: var(--electric-cyan);" class="mono">${currentEx.symmetryScore}%</strong>
                </div>
                <div style="width: 100%; height: 8px; background: rgba(98, 221, 245, 0.15); border-radius: 4px; overflow: hidden;">
                  <div style="width: ${currentEx.symmetryScore}%; height: 100%; background: linear-gradient(90deg, var(--cosmic-purple), var(--electric-cyan));"></div>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;">${currentEx.symmetryStatus}</div>
              </div>

              <!-- Metric 2: Range of Motion (ROM) -->
              <div style="margin-bottom: 18px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
                  <span style="color: var(--text-muted);">Joint Range of Motion (Knee/Hip):</span>
                  <strong style="color: var(--soft-lavender);" class="mono">${currentEx.rangeOfMotionDeg}° <span style="font-size: 0.75rem; color: var(--text-dim);">(Target: ${currentEx.targetRomDeg}°)</span></strong>
                </div>
                <div style="width: 100%; height: 8px; background: rgba(184, 164, 255, 0.15); border-radius: 4px; overflow: hidden;">
                  <div style="width: ${Math.min(100, (currentEx.rangeOfMotionDeg / currentEx.targetRomDeg) * 100)}%; height: 100%; background: linear-gradient(90deg, var(--cosmic-purple), var(--soft-lavender));"></div>
                </div>
                <div style="font-size: 0.75rem; color: #2ed573; margin-top: 4px;">Target depth achieved without joint impingement.</div>
              </div>

              <!-- Metric 3: Spinal Alignment -->
              <div style="margin-bottom: 18px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
                  <span style="color: var(--text-muted);">Lumbar Spine Curvature:</span>
                  <strong style="color: #2ed573;" class="mono">Nominal</strong>
                </div>
                <div style="background: rgba(8, 13, 36, 0.6); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-size: 0.8rem; color: var(--text-muted);">
                  ${currentEx.spinalAlignment}
                </div>
              </div>

              <!-- Metric 4: Muscular Fatigue Index -->
              <div style="margin-bottom: 18px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
                  <span style="color: var(--text-muted);">Eccentric Velocity Degradation:</span>
                  <strong style="color: var(--elegant-pink);" class="mono">-${currentEx.velocityDropPct}%</strong>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-dim);">
                  Consistent barbell velocity indicates low acute neuromuscular exhaustion. Repetitions remain explosive.
                </div>
              </div>
            </div>

            <div style="padding-top: 16px; border-top: 1px solid var(--border-subtle);">
              <button class="btn btn-primary" id="save-movement-report-btn" style="width: 100%;">
                ${Icons.fileText('', 16)} <span>Log Movement Session to Astronaut Record</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  },

  initPoseAnimation() {
    const canvas = document.getElementById('pose-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
    };
    updateCanvasSize();

    const drawFrame = () => {
      if (!this.isPlaying) {
        this.animFrameId = requestAnimationFrame(drawFrame);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;
      this.simFrame++;

      ctx.clearRect(0, 0, w, h);

      // Draw subtle background microgravity grid
      ctx.strokeStyle = 'rgba(98, 221, 245, 0.06)';
      ctx.lineWidth = 1;
      const step = 30 * (window.devicePixelRatio || 1);
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Dynamic exercise squat animation calculation
      const cycle = Math.sin(this.simFrame * 0.045); // oscillates between -1 and 1
      const squatDip = (cycle + 1) / 2; // 0 to 1

      // Central body position
      const cx = w * 0.5;
      const cy = h * 0.35 + (squatDip * h * 0.16);

      // Skeleton Keypoints
      const head = { x: cx, y: cy - h * 0.18 };
      const neck = { x: cx, y: cy - h * 0.10 };
      const shoulderL = { x: cx - w * 0.09, y: cy - h * 0.08 };
      const shoulderR = { x: cx + w * 0.09, y: cy - h * 0.08 };
      const elbowL = { x: cx - w * 0.14, y: cy };
      const elbowR = { x: cx + w * 0.14, y: cy };
      const wristL = { x: cx - w * 0.12, y: cy - h * 0.06 };
      const wristR = { x: cx + w * 0.12, y: cy - h * 0.06 };

      const hipCenter = { x: cx, y: cy + h * 0.10 };
      const hipL = { x: cx - w * 0.06, y: cy + h * 0.10 };
      const hipR = { x: cx + w * 0.06, y: cy + h * 0.10 };

      // Knee flare out during squat
      const kneeK = squatDip * 0.04;
      const kneeL = { x: cx - w * (0.08 + kneeK), y: cy + h * (0.24 - squatDip * 0.04) };
      const kneeR = { x: cx + w * (0.08 + kneeK), y: cy + h * (0.24 - squatDip * 0.04) };

      // Fixed foot anchors
      const ankleL = { x: cx - w * 0.07, y: h * 0.84 };
      const ankleR = { x: cx + w * 0.07, y: h * 0.84 };

      // Connections
      const bones = [
        [neck, head],
        [shoulderL, shoulderR],
        [neck, hipCenter],
        [shoulderL, elbowL],
        [elbowL, wristL],
        [shoulderR, elbowR],
        [elbowR, wristR],
        [hipL, hipR],
        [hipL, kneeL],
        [kneeL, ankleL],
        [hipR, kneeR],
        [kneeR, ankleR]
      ];

      // Draw bones
      ctx.lineWidth = 3.5 * (window.devicePixelRatio || 1);
      ctx.strokeStyle = '#62DDF5';
      ctx.shadowColor = '#62DDF5';
      ctx.shadowBlur = 12;

      bones.forEach(([p1, p2]) => {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      // Draw keypoints
      const allPoints = [head, neck, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, hipL, hipR, kneeL, kneeR, ankleL, ankleR];
      allPoints.forEach((p, idx) => {
        ctx.fillStyle = idx === 0 ? '#F2A6D8' : '#FFFFFF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5 * (window.devicePixelRatio || 1), 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#7657D6';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw ARED Resistance Barbell Overlay
      const barY = cy - h * 0.08;
      ctx.strokeStyle = '#B8A4FF';
      ctx.lineWidth = 4 * (window.devicePixelRatio || 1);
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.22, barY);
      ctx.lineTo(cx + w * 0.22, barY);
      ctx.stroke();

      // Barbell weights
      ctx.fillStyle = '#7657D6';
      ctx.fillRect(cx - w * 0.23, barY - 14, 10, 28);
      ctx.fillRect(cx + w * 0.21, barY - 14, 10, 28);

      this.animFrameId = requestAnimationFrame(drawFrame);
    };

    drawFrame();
  },

  bindEvents(container) {
    this.initPoseAnimation();

    // Exercise switcher buttons
    container.querySelectorAll('.exercise-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundFX.playBlip();
        this.activeExerciseId = e.currentTarget.getAttribute('data-ex');
        store.notify({ type: 'RENDER_VIEW' });
      });
    });

    // Play/Pause button
    const playBtn = container.querySelector('#toggle-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        soundFX.playPulse();
        this.isPlaying = !this.isPlaying;
        store.notify({ type: 'RENDER_VIEW' });
      });
    }

    // Video file upload mock
    const fileInput = container.querySelector('#video-upload-input');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          soundFX.playTransmit();
          alert(`📹 Video "${e.target.files[0].name}" loaded into AstroVital AI Vision engine!\n\nSimulating 12-keypoint skeletal extraction and range-of-motion angle analysis.`);
        }
      });
    }

    // Save report button
    const saveBtn = container.querySelector('#save-movement-report-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        soundFX.playTransmit();
        store.createReport({
          subject: "Biomechanical Movement Analysis Session (ARED Squat)",
          symptoms: "Routine microgravity musculoskeletal tracking. Form nominal (96% symmetry, 112° knee flexion).",
          severity: "Low"
        });
        alert("✅ Biomechanical evaluation successfully logged to Dr. Elena Rostova's flight medical record!");
      });
    }
  }
};
