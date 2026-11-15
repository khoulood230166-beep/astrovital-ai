// AstroVital AI - About & NASA Space Apps Challenge 2026 Briefing

const AboutView = {
  render() {
    return `
      <div class="about-page container" style="padding: 32px 24px 80px; max-width: 1100px;">
        
        <!-- TITLE HEADER -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 12px;">
            <span class="badge badge-nasa">${Icons.orbit('', 14)} NASA Space Apps Challenge 2026</span>
            <span class="badge badge-cyan">${Icons.shield('', 14)} Human Research Program</span>
          </div>
          <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 12px;">
            About <span class="text-gradient">AstroVital AI</span>
          </h1>
          <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 720px; margin: 0 auto; line-height: 1.6;">
            Pioneering autonomous medical decision support for long-duration human exploration of the Moon, Mars, and deep space.
          </p>
        </div>

        <!-- THE CHALLENGE OVERVIEW -->
        <div class="glass-panel" style="padding: 32px; margin-bottom: 32px;">
          <h2 style="font-size: 1.45rem; font-weight: 700; margin-bottom: 14px; color: var(--electric-cyan); display: flex; align-items: center; gap: 10px;">
            ${Icons.rocket('', 22)} <span>The Challenge: Deep Space Exploration Medicine</span>
          </h2>
          <p style="color: var(--starlight-white); font-size: 0.95rem; line-height: 1.7; margin-bottom: 14px;">
            On the International Space Station (ISS) in Low Earth Orbit, sick or injured astronauts can be stabilized and returned to Earth within hours. Ground flight surgeons maintain continuous, zero-latency broadband communication with the station.
          </p>
          <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.7;">
            During a multi-year mission to Mars, however, this safety net disappears. One-way speed-of-light delays range between <strong>4 and 24 minutes</strong>, and periodic orbital solar conjunctions sever communication entirely for weeks. Immediate evacuation is physically impossible. Crew members and onboard Medical Officers must possess autonomous, trustworthy AI clinical decision support to detect subtle biometric shifts, manage chronic spaceflight adaptation, and administer approved countermeasures before conditions become life-threatening.
          </p>
        </div>

        <!-- 4-LAYER SYSTEM ARCHITECTURE -->
        <div class="glass-panel" style="padding: 32px; margin-bottom: 32px;">
          <h2 style="font-size: 1.45rem; font-weight: 700; margin-bottom: 20px; color: var(--soft-lavender); display: flex; align-items: center; gap: 10px;">
            ${Icons.cpu('', 22)} <span>System Architecture & Data Flow</span>
          </h2>

          <div class="grid grid-cols-2 gap-6" class="lg-grid-cols-1">
            <div style="background: rgba(8, 13, 36, 0.65); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 20px;">
              <div style="color: var(--electric-cyan); font-weight: 700; font-size: 1.05rem; margin-bottom: 6px;">
                1. Wearables & ECLSS Ingestion Layer
              </div>
              <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.6;">
                Continuous high-frequency capture of lead-II ECG, continuous peripheral oxygen saturation (SpO2), core body temperature, and cabin pressure/CO2 concentrations through non-invasive smart suit bio-harnesses.
              </p>
            </div>

            <div style="background: rgba(8, 13, 36, 0.65); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 20px;">
              <div style="color: var(--soft-lavender); font-weight: 700; font-size: 1.05rem; margin-bottom: 6px;">
                2. Onboard Edge Neural Inference Engine
              </div>
              <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.6;">
                Radiation-hardened compute cluster running optimized machine learning models locally on MTV Hab-01. Performs real-time anomaly detection, baseline deviation tracking, and conversational symptom triage without needing Earth connectivity.
              </p>
            </div>

            <div style="background: rgba(8, 13, 36, 0.65); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 20px;">
              <div style="color: var(--elegant-pink); font-weight: 700; font-size: 1.05rem; margin-bottom: 6px;">
                3. Delay-Tolerant Networking (DTN) Buffer
              </div>
              <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.6;">
                Built on interplanetary bundle protocol standards. During communication blackouts, health logs and generated incident reports persist in a persistent local queue, automatically synchronizing with Houston when RF line-of-sight is restored.
              </p>
            </div>

            <div style="background: rgba(8, 13, 36, 0.65); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 20px;">
              <div style="color: #2ed573; font-weight: 700; font-size: 1.05rem; margin-bottom: 6px;">
                4. Flight Surgeon Terrestrial Telemetry Console
              </div>
              <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.6;">
                Terrestrial console at NASA Johnson Space Center (MCC Houston). Delivers AI-synthesized longitudinal trend summaries, allows clinical drill-downs into historical records, and permits uplink of binding medical orders.
              </p>
            </div>
          </div>
        </div>

        <!-- SIMULATED VS REAL FUNCTIONALITY AUDIT TABLE -->
        <div class="glass-panel" style="padding: 32px; margin-bottom: 32px;">
          <h2 style="font-size: 1.45rem; font-weight: 700; margin-bottom: 12px; color: #ffffff; display: flex; align-items: center; gap: 10px;">
            ${Icons.fileText('', 22)} <span>Technical Demonstration Audit Matrix</span>
          </h2>
          <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 20px;">
            To ensure complete scientific transparency for the NASA Space Apps Challenge judging panel, the table below documents which platform components utilize simulated prototype data versus fully functioning client-side algorithms.
          </p>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;" class="mono">
              <thead>
                <tr style="border-bottom: 2px solid var(--border-subtle); text-align: left; color: var(--soft-lavender);">
                  <th style="padding: 10px 14px;">Feature Module</th>
                  <th style="padding: 10px 14px;">Real Implementation</th>
                  <th style="padding: 10px 14px;">Simulated Demonstration Layer</th>
                </tr>
              </thead>
              <tbody style="color: var(--text-muted);">
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 12px 14px; color: #ffffff; font-weight: 600;">Real-Time ECG Waveform</td>
                  <td style="padding: 12px 14px; color: #2ed573;">Functional HTML5 Canvas math engine computing continuous P-Q-R-S-T cardiac vectors at 60 FPS matching live BPM.</td>
                  <td style="padding: 12px 14px; color: var(--soft-lavender);">Heart rate values are driven by a simulated physiological drift generator.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 12px 14px; color: #ffffff; font-weight: 600;">AI Conversational Co-Pilot</td>
                  <td style="padding: 12px 14px; color: #2ed573;">Interactive conversational engine cross-referencing real-time biometrics, triaging symptoms, and generating structured clinical reports.</td>
                  <td style="padding: 12px 14px; color: var(--soft-lavender);">Uses pre-approved NASA Flight Medicine safety guidance rules without external black-box cloud APIs.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 12px 14px; color: #ffffff; font-weight: 600;">DTN Offline Mode & Sync</td>
                  <td style="padding: 12px 14px; color: #2ed573;">Real persistent LocalStorage state engine, disconnection handling, buffered transmission queues, and automatic re-sync progress bar.</td>
                  <td style="padding: 12px 14px; color: var(--soft-lavender);">Simulates solar conjunction blackout and Deep Space Network speed-of-light lag.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 12px 14px; color: #ffffff; font-weight: 600;">Camera Movement Analysis</td>
                  <td style="padding: 12px 14px; color: #2ed573;">Canvas biomechanical skeleton renderer computing real-time joint angles, symmetry index, and eccentric velocity fatigue.</td>
                  <td style="padding: 12px 14px; color: var(--soft-lavender);">Demonstrates simulated 12-keypoint pose extraction as a functional proof-of-concept.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 12px 14px; color: #ffffff; font-weight: 600;">Multi-Role Dashboards</td>
                  <td style="padding: 12px 14px; color: #2ed573;">Complete interactive multi-tier workflows for Astronauts, Crew Medical Officers, and Earth Flight Surgeons with live state synchronization.</td>
                  <td style="padding: 12px 14px; color: var(--soft-lavender);">Crew members and mission specs represent the Ares V Mars Transit Hab-01 scenario.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- MEDICAL ETHICS & SAFETY NOTICE -->
        <div class="glass-panel" style="padding: 24px 28px; border-left: 4px solid var(--elegant-pink); background: rgba(16, 26, 58, 0.75);">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 8px; color: var(--elegant-pink);">
            Medical Safety & Ethical AI Principles
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
            AstroVital AI is intentionally designed as an <strong>autonomous decision-support tool</strong>, adhering to the principle of human-in-the-loop oversight. In accordance with NASA flight medicine ethics, the AI does not issue definitive medical diagnoses or administer unapproved therapies. For high-acuity anomalies, the platform immediately escalates to onboard crew medical officers and triggers standardized mission contingency checklists.
          </p>
        </div>

      </div>
    `;
  },

  bindEvents() {}
};
