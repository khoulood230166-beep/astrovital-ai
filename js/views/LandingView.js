// AstroVital AI - Futuristic Landing Page
// NASA Space Apps Challenge 2026 Presentation

const LandingView = {
  render() {
    return `
      <div class="landing-page" style="padding-bottom: 80px;">
        <!-- HERO SECTION -->
        <section style="position: relative; padding: 60px 0 90px; overflow: hidden;">
          <div class="container" style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 48px; align-items: center;" class="lg-grid-cols-1">
            
            <!-- Left Hero Content -->
            <div style="display: flex; flex-direction: column; gap: 24px;">
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <span class="badge badge-nasa">${Icons.orbit('', 14)} NASA Space Apps Challenge 2026</span>
                <span class="badge badge-cyan">${Icons.shield('', 14)} Human Research Program (HRP)</span>
                <span class="badge badge-pink" style="border-color: rgba(242, 166, 216, 0.4);">${Icons.sparkles('', 14)} Autonomous Medical Co-Pilot</span>
              </div>

              <h1 style="font-size: clamp(2.4rem, 5vw, 3.8rem); line-height: 1.12; font-weight: 800;">
                Your Health.<br/>
                Our Mission.<br/>
                <span class="text-gradient">Beyond Earth.</span>
              </h1>

              <p style="font-size: 1.15rem; color: var(--text-muted); max-width: 580px; line-height: 1.65;">
                Intelligent astronaut health monitoring and AI-powered medical assistance engineered for long-duration deep-space missions to Mars.
              </p>

              <!-- Hero CTAs -->
              <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-top: 8px;">
                <button id="hero-btn-launch" class="btn btn-primary btn-lg">
                  ${Icons.rocket('', 20)} <span>Launch Dashboard</span>
                </button>
                <button id="hero-btn-explore" class="btn btn-cyan btn-lg">
                  ${Icons.stethoscope('', 20)} <span>Explore AI Assistant</span>
                </button>
                <button id="hero-btn-camera" class="btn btn-outline btn-lg">
                  ${Icons.camera('', 18)} <span>Movement AI</span>
                </button>
              </div>

              <!-- Live Telemetry Ticker Mini-Strip -->
              <div class="glass-panel" style="padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; border-radius: var(--radius-sm); margin-top: 12px; background: rgba(16, 26, 58, 0.75);">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="pulse-dot pulse-dot-green"></span>
                  <span style="font-size: 0.8rem; font-weight: 600; color: #2ed573;">SIMULATED TELEMETRY LIVE</span>
                </div>
                <div style="display: flex; gap: 20px; font-size: 0.82rem;" class="mono">
                  <span>HR: <strong style="color: var(--electric-cyan);">72 BPM</strong></span>
                  <span>SpO2: <strong style="color: var(--soft-lavender);">98.4%</strong></span>
                  <span>DELAY: <strong style="color: var(--elegant-pink);">14m 22s</strong></span>
                </div>
              </div>
            </div>

            <!-- Right Hero Holographic Visual -->
            <div style="position: relative; display: flex; justify-content: center; align-items: center;">
              <!-- Outer Glowing Orbital Rings -->
              <div style="position: absolute; width: 380px; height: 380px; border-radius: 50%; border: 1px dashed rgba(98, 221, 245, 0.25); animation: spin-slow 40s linear infinite;"></div>
              <div style="position: absolute; width: 440px; height: 440px; border-radius: 50%; border: 1px dotted rgba(242, 166, 216, 0.2); animation: spin-slow 60s linear infinite reverse;"></div>
              
              <!-- Center Holographic Orb -->
              <div class="glass-panel glass-panel-glow" style="position: relative; width: 320px; height: 320px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle at 40% 40%, rgba(118, 87, 214, 0.35) 0%, rgba(16, 26, 58, 0.85) 75%); overflow: hidden; padding: 24px; text-align: center; box-shadow: 0 0 50px rgba(118, 87, 214, 0.3);">
                
                <!-- Floating holographic avatar -->
                <div class="animate-float" style="font-size: 4.8rem; filter: drop-shadow(0 0 20px rgba(98, 221, 245, 0.7)); margin-bottom: 6px;">
                  👩‍🚀
                </div>
                
                <div style="font-weight: 700; font-size: 1.1rem; color: #ffffff;">Dr. Elena Rostova</div>
                <div style="font-size: 0.75rem; color: var(--soft-lavender); margin-bottom: 8px;">Astrobiologist • MTV Hab-01</div>

                <div style="display: flex; gap: 8px; justify-content: center;">
                  <span class="badge badge-cyan" style="font-size: 0.7rem;">Nominal</span>
                  <span class="badge badge-pink" style="font-size: 0.7rem;">Sol 142</span>
                </div>

                <!-- Floating Biometric Orbiters -->
                <div style="position: absolute; top: 20px; right: 25px; background: rgba(8, 13, 36, 0.85); border: 1px solid var(--electric-cyan); border-radius: 8px; padding: 4px 8px; font-size: 0.72rem; color: var(--electric-cyan);" class="mono">
                  ECG: Lead II
                </div>
                <div style="position: absolute; bottom: 25px; left: 20px; background: rgba(8, 13, 36, 0.85); border: 1px solid var(--elegant-pink); border-radius: 8px; padding: 4px 8px; font-size: 0.72rem; color: var(--elegant-pink);" class="mono">
                  SANS: 0.0mm
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- HOW ASTROVITAL WORKS - 6 ILLUSTRATED STEPS -->
        <section style="padding: 70px 0; background: rgba(16, 26, 58, 0.35); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);">
          <div class="container">
            <div style="text-align: center; max-width: 720px; margin: 0 auto 50px;">
              <span class="badge badge-cyan" style="margin-bottom: 12px;">SYSTEM ARCHITECTURE</span>
              <h2 style="font-size: 2.2rem; margin-bottom: 14px;">How AstroVital AI Works</h2>
              <p style="color: var(--text-muted); font-size: 1.05rem;">
                A unified autonomous health loop connecting deep-space telemetry, radiation-hardened edge intelligence, and terrestrial mission control.
              </p>
            </div>

            <div class="grid grid-cols-3 gap-6">
              <!-- Step 1 -->
              <div class="glass-panel" style="padding: 28px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 16px; right: 20px; font-size: 2.2rem; font-weight: 800; color: rgba(184, 164, 255, 0.12);" class="mono">01</div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(98, 221, 245, 0.15); border: 1px solid rgba(98, 221, 245, 0.4); display: flex; align-items: center; justify-content: center; color: var(--electric-cyan); margin-bottom: 18px;">
                  ${Icons.activity('', 24)}
                </div>
                <h3 style="font-size: 1.15rem; margin-bottom: 10px;">Continuous Telemetry</h3>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
                  Bio-harness, smart suit bio-sensors, and cabin ECLSS continuously sample ECG, SpO2, core body temperature, and HRV at microsecond intervals.
                </p>
              </div>

              <!-- Step 2 -->
              <div class="glass-panel" style="padding: 28px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 16px; right: 20px; font-size: 2.2rem; font-weight: 800; color: rgba(184, 164, 255, 0.12);" class="mono">02</div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(118, 87, 214, 0.2); border: 1px solid rgba(184, 164, 255, 0.4); display: flex; align-items: center; justify-content: center; color: var(--soft-lavender); margin-bottom: 18px;">
                  ${Icons.cpu('', 24)}
                </div>
                <h3 style="font-size: 1.15rem; margin-bottom: 10px;">Edge AI Anomaly Detection</h3>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
                  Onboard machine learning neural engines evaluate vitals against each astronaut's personal baseline to detect arrhythmias, hypoxia, and sleep deficits in 0ms.
                </p>
              </div>

              <!-- Step 3 -->
              <div class="glass-panel" style="padding: 28px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 16px; right: 20px; font-size: 2.2rem; font-weight: 800; color: rgba(184, 164, 255, 0.12);" class="mono">03</div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(242, 166, 216, 0.15); border: 1px solid rgba(242, 166, 216, 0.4); display: flex; align-items: center; justify-content: center; color: var(--elegant-pink); margin-bottom: 18px;">
                  ${Icons.alertTriangle('', 24)}
                </div>
                <h3 style="font-size: 1.15rem; margin-bottom: 10px;">Smart Triaged Alerts</h3>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
                  Incidents are categorized into Normal, Advisory Warning, and Critical alerts with NASA-approved first-level safety guidelines and instant crew notification.
                </p>
              </div>

              <!-- Step 4 -->
              <div class="glass-panel" style="padding: 28px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 16px; right: 20px; font-size: 2.2rem; font-weight: 800; color: rgba(184, 164, 255, 0.12);" class="mono">04</div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(98, 221, 245, 0.15); border: 1px solid rgba(98, 221, 245, 0.4); display: flex; align-items: center; justify-content: center; color: var(--electric-cyan); margin-bottom: 18px;">
                  ${Icons.sparkles('', 24)}
                </div>
                <h3 style="font-size: 1.15rem; margin-bottom: 10px;">Conversational Co-Pilot</h3>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
                  Astronauts interactively type symptoms to receive guided microgravity countermeasures, hydration checks, and automatic incident report generation.
                </p>
              </div>

              <!-- Step 5 -->
              <div class="glass-panel" style="padding: 28px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 16px; right: 20px; font-size: 2.2rem; font-weight: 800; color: rgba(184, 164, 255, 0.12);" class="mono">05</div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(118, 87, 214, 0.2); border: 1px solid rgba(184, 164, 255, 0.4); display: flex; align-items: center; justify-content: center; color: var(--soft-lavender); margin-bottom: 18px;">
                  ${Icons.wifiOff('', 24)}
                </div>
                <h3 style="font-size: 1.15rem; margin-bottom: 10px;">Deep-Space DTN Offline Sync</h3>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
                  Built for up to 24-minute light delays and solar conjunction blackouts. Local storage buffers all events, auto-syncing when communication is restored.
                </p>
              </div>

              <!-- Step 6 -->
              <div class="glass-panel" style="padding: 28px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 16px; right: 20px; font-size: 2.2rem; font-weight: 800; color: rgba(184, 164, 255, 0.12);" class="mono">06</div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(242, 166, 216, 0.15); border: 1px solid rgba(242, 166, 216, 0.4); display: flex; align-items: center; justify-content: center; color: var(--elegant-pink); margin-bottom: 18px;">
                  ${Icons.globe('', 24)}
                </div>
                <h3 style="font-size: 1.15rem; margin-bottom: 10px;">Flight Surgeon Guidance</h3>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
                  Earth medical specialists receive structured AI summaries, review long-term trend drifts, and transmit validated clinical protocols to the Mars crew.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- MAIN FEATURES SHOWCASE -->
        <section style="padding: 70px 0;">
          <div class="container">
            <div style="text-align: center; max-width: 700px; margin: 0 auto 50px;">
              <span class="badge badge-pink" style="margin-bottom: 12px;">INNOVATION HIGHLIGHTS</span>
              <h2 style="font-size: 2.2rem; margin-bottom: 14px;">Engineered for Mars Transit</h2>
              <p style="color: var(--text-muted); font-size: 1.05rem;">
                Explore the core modules developed to protect crew health on multi-year exploration class missions.
              </p>
            </div>

            <div class="grid grid-cols-2 gap-8" class="lg-grid-cols-1">
              <!-- Feature 1 -->
              <div class="glass-panel" style="padding: 32px; display: flex; gap: 20px;">
                <div style="color: var(--electric-cyan); flex-shrink: 0;">${Icons.activity('', 32)}</div>
                <div>
                  <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Smart Health Monitoring</h3>
                  <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 16px;">
                    Continuous ECG lead II streams, heart rate variability, SpO2, circadian temperature curves, and daily caloric burn tracking against individual astronaut baselines.
                  </p>
                  <button class="btn btn-outline btn-sm" onclick="store.setView('astronaut')">Open Health Dashboard &rarr;</button>
                </div>
              </div>

              <!-- Feature 2 -->
              <div class="glass-panel" style="padding: 32px; display: flex; gap: 20px;">
                <div style="color: var(--elegant-pink); flex-shrink: 0;">${Icons.sparkles('', 32)}</div>
                <div>
                  <h3 style="font-size: 1.25rem; margin-bottom: 8px;">AI Health Assistant</h3>
                  <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 16px;">
                    Conversational triage assistant trained on aerospace medical guidelines. Analyzes current biometrics, suggests countermeasures, and prepares formal clinical incident reports.
                  </p>
                  <button class="btn btn-outline btn-sm" onclick="store.setView('ai-assistant')">Talk to AI Co-Pilot &rarr;</button>
                </div>
              </div>

              <!-- Feature 3 -->
              <div class="glass-panel" style="padding: 32px; display: flex; gap: 20px;">
                <div style="color: var(--soft-lavender); flex-shrink: 0;">${Icons.camera('', 32)}</div>
                <div>
                  <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Camera Movement Analysis</h3>
                  <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 16px;">
                    Computer vision biomechanics tracking for microgravity exercises (ARED squats, deadlifts, T2 treadmill). Measures symmetry, range of motion, and eccentric muscle fatigue.
                  </p>
                  <button class="btn btn-outline btn-sm" onclick="store.setView('camera-analysis')">Launch Movement AI &rarr;</button>
                </div>
              </div>

              <!-- Feature 4 -->
              <div class="glass-panel" style="padding: 32px; display: flex; gap: 20px;">
                <div style="color: #ffab00; flex-shrink: 0;">${Icons.shieldAlert('', 32)}</div>
                <div>
                  <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Autonomous Offline Support</h3>
                  <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 16px;">
                    Full operational capability when disconnected from Earth. Uses Delay-Tolerant Networking (DTN) and local persistent storage with automated batch re-synchronization.
                  </p>
                  <button class="btn btn-outline btn-sm" onclick="store.toggleOfflineMode()">Test Offline Mode &rarr;</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- WHY HEALTH MONITORING IS CRITICAL FOR MARS -->
        <section style="padding: 70px 0; background: linear-gradient(180deg, rgba(8, 13, 36, 0.4) 0%, rgba(16, 26, 58, 0.7) 100%); border-top: 1px solid var(--border-subtle);">
          <div class="container">
            <div style="text-align: center; max-width: 780px; margin: 0 auto 50px;">
              <span class="badge badge-nasa" style="margin-bottom: 12px;">NASA HUMAN RESEARCH PROGRAM</span>
              <h2 style="font-size: 2.2rem; margin-bottom: 14px;">The Harsh Realities of Mars Transit</h2>
              <p style="color: var(--text-muted); font-size: 1.05rem;">
                A round-trip mission to Mars spans over 500 days in extreme deep space. Real-time medical evacuation is physically impossible.
              </p>
            </div>

            <div class="grid grid-cols-3 gap-6">
              <div class="glass-panel" style="padding: 24px;">
                <div style="font-size: 1.8rem; margin-bottom: 10px;">🦴</div>
                <h4 style="font-size: 1.1rem; margin-bottom: 8px; color: var(--electric-cyan);">Microgravity Bone Loss</h4>
                <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.6;">
                  Astronauts lose 1.0% to 1.5% of bone mineral density per month in weightlessness, particularly in the hips and spine, demanding precise resistive countermeasure monitoring.
                </p>
              </div>

              <div class="glass-panel" style="padding: 24px;">
                <div style="font-size: 1.8rem; margin-bottom: 10px;">☢️</div>
                <h4 style="font-size: 1.1rem; margin-bottom: 8px; color: var(--soft-lavender);">Cosmic & Solar Radiation</h4>
                <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.6;">
                  Beyond Earth's magnetosphere, galactic cosmic rays (GCR) and solar particle events (SPE) pose acute and cumulative risks of DNA damage and cardiovascular degeneration.
                </p>
              </div>

              <div class="glass-panel" style="padding: 24px;">
                <div style="font-size: 1.8rem; margin-bottom: 10px;">👁️</div>
                <h4 style="font-size: 1.1rem; margin-bottom: 8px; color: var(--elegant-pink);">SANS & Fluid Shift</h4>
                <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.6;">
                  Cephalad fluid redistribution elevates intracranial pressure, causing Spaceflight-Associated Neuro-ocular Syndrome (optic disc edema and hyperopic visual shift).
                </p>
              </div>

              <div class="glass-panel" style="padding: 24px;">
                <div style="font-size: 1.8rem; margin-bottom: 10px;">💤</div>
                <h4 style="font-size: 1.1rem; margin-bottom: 8px; color: #ffab00;">Circadian Disruption</h4>
                <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.6;">
                  Artificial lighting, operational noise, and absence of terrestrial day-night cues cause microgravity insomnia, cognitive fatigue, and sympathetic autonomic strain.
                </p>
              </div>

              <div class="glass-panel" style="padding: 24px;">
                <div style="font-size: 1.8rem; margin-bottom: 10px;">⏱️</div>
                <h4 style="font-size: 1.1rem; margin-bottom: 8px; color: #ff6b81;">4 to 24-Min Comm Delay</h4>
                <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.6;">
                  Radio signals take up to 24 minutes one-way at maximum orbital separation. Real-time emergency telephone consultation with Earth doctors is physically ruled out by the speed of light.
                </p>
              </div>

              <div class="glass-panel" style="padding: 24px;">
                <div style="font-size: 1.8rem; margin-bottom: 10px;">🤖</div>
                <h4 style="font-size: 1.1rem; margin-bottom: 8px; color: var(--electric-cyan);">Autonomous AI Triage</h4>
                <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.6;">
                  AstroVital AI bridges this critical gap, empowering astronauts and crew medical officers with autonomous, validated, on-station clinical decision intelligence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- FOOTER -->
        <footer style="padding: 50px 0 30px; border-top: 1px solid var(--border-subtle); color: var(--text-dim); font-size: 0.85rem;">
          <div class="container" style="display: flex; flex-direction: column; gap: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: var(--electric-cyan); font-weight: 800; font-size: 1.1rem;">AstroVital AI</span>
                <span style="color: var(--text-muted);">| NASA Space Apps Challenge 2026</span>
              </div>
              <div style="display: flex; gap: 20px;">
                <button class="nav-link" onclick="store.setView('landing')">Home</button>
                <button class="nav-link" onclick="store.setView('astronaut')">Dashboard</button>
                <button class="nav-link" onclick="store.setView('ai-assistant')">AI Assistant</button>
                <button class="nav-link" onclick="store.setView('about')">About System</button>
              </div>
            </div>

            <div style="padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
              <div>
                &copy; 2026 AstroVital AI Engineering Team. Developed for the NASA Space Apps Challenge.
              </div>
              <div style="color: var(--text-dim); font-size: 0.78rem;">
                IMPORTANT DEMO DISCLAIMER: Prototype demonstration with simulated biometric data. Does not replace professional aerospace flight surgeons.
              </div>
            </div>
          </div>
        </footer>
      </div>
    `;
  },

  bindEvents(container) {
    const launchBtn = container.querySelector('#hero-btn-launch');
    if (launchBtn) {
      launchBtn.addEventListener('click', () => {
        soundFX.playBlip();
        store.setView('astronaut');
      });
    }

    const exploreBtn = container.querySelector('#hero-btn-explore');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        soundFX.playBlip();
        store.setView('ai-assistant');
      });
    }

    const cameraBtn = container.querySelector('#hero-btn-camera');
    if (cameraBtn) {
      cameraBtn.addEventListener('click', () => {
        soundFX.playBlip();
        store.setView('camera-analysis');
      });
    }
  }
};
