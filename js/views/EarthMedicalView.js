// AstroVital AI - Earth Medical Team Dashboard
// NASA Johnson Space Center - Mission Control Center (MCC Houston)
// Flight Surgeon Telemedicine Console • Deep Space Telemetry Link

const EarthMedicalView = {
  selectedReportId: null,

  render() {
    const s = store.state;
    const mission = AstroData.mission;
    const crew = AstroData.crew;
    const reports = s.reports;

    return `
      <div class="earth-medical-dashboard container" style="padding: 32px 24px 80px;">
        
        <!-- FLIGHT SURGEON CONSOLE HEADER -->
        <div class="glass-panel" style="padding: 24px 28px; margin-bottom: 28px; border-top: 3px solid var(--electric-cyan); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
          <div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="color: var(--electric-cyan);">${Icons.globe('', 26)}</span>
              <h1 style="font-size: 1.6rem; font-weight: 800;">NASA Mission Control — Houston Flight Surgeon Console</h1>
              <span class="badge badge-nasa">MCC-H TELEMETRY</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              Target: <strong style="color: #ffffff;">Ares V (MTV Hab-01)</strong> • Mars Transit Phase II • Flight Surgeon on Duty: <strong>Dr. Robert Harris, MD / Aerospace Medicine</strong>
            </div>
          </div>

          <!-- Deep-Space Link Telemetry Indicators -->
          <div style="display: flex; gap: 20px; align-items: center; background: rgba(8, 13, 36, 0.75); border: 1px solid var(--border-subtle); padding: 10px 18px; border-radius: var(--radius-sm);" class="mono">
            <div>
              <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase;">One-Way Light Delay</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: ${s.isOffline ? '#ff4757' : 'var(--electric-cyan)'};">
                ${s.isOffline ? 'INFINITE (BLACKOUT)' : '14m 22s'}
              </div>
            </div>
            <div style="border-left: 1px solid var(--border-subtle); padding-left: 16px;">
              <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase;">Earth-Mars Distance</div>
              <div style="font-size: 1.05rem; font-weight: 700; color: var(--soft-lavender);">225.48M km</div>
            </div>
            <div style="border-left: 1px solid var(--border-subtle); padding-left: 16px;">
              <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase;">DTN Uplink Packet Integrity</div>
              <div style="font-size: 1.05rem; font-weight: 700; color: ${s.isOffline ? '#ffab00' : '#2ed573'};">
                ${s.isOffline ? '0% (Offline)' : '99.8% Nominal'}
              </div>
            </div>
          </div>
        </div>

        <!-- 4-ASTRONAUT TELEMETRY SUMMARY CARDS -->
        <div style="margin-bottom: 28px;">
          <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
            ${Icons.activity('', 20)} <span>Downlinked Crew Biometric Stream</span>
          </h2>

          <div class="grid grid-cols-4 gap-6" class="lg-grid-cols-2">
            ${crew.map(c => {
              const isElena = c.id === 'astro-01';
              const hr = isElena ? s.liveTelemetry.heartRate : c.currentTelemetry.heartRate;
              const spo2 = isElena ? s.liveTelemetry.spO2 : c.currentTelemetry.spO2;
              const anomaly = isElena && s.liveTelemetry.anomalyActive;

              return `
                <div class="glass-panel" style="padding: 20px; border-left: 3px solid ${anomaly ? '#ff4757' : 'var(--electric-cyan)'};">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div>
                      <div style="font-weight: 700; font-size: 1rem; color: #ffffff;">${c.name}</div>
                      <div style="font-size: 0.75rem; color: var(--text-dim);">${c.role.split('&')[0]}</div>
                    </div>
                    <span class="badge ${anomaly ? 'badge-critical' : 'badge-success'} mono" style="font-size: 0.65rem;">
                      ${anomaly ? 'ANOMALY' : 'HEALTHY'}
                    </span>
                  </div>

                  <div style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 0.8rem;" class="mono">
                    <span style="color: var(--text-dim);">Downlinked HR:</span>
                    <strong style="color: ${hr > 100 ? '#ff4757' : 'var(--electric-cyan)'};">${hr} BPM</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-top: 4px; font-size: 0.8rem;" class="mono">
                    <span style="color: var(--text-dim);">SpO2 Saturation:</span>
                    <strong style="color: ${spo2 < 94 ? '#ff4757' : 'var(--soft-lavender)'};">${spo2}%</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-top: 4px; font-size: 0.8rem;" class="mono">
                    <span style="color: var(--text-dim);">Cumul. Radiation:</span>
                    <strong style="color: var(--elegant-pink);">${c.baseline.cumulativeRadiationMSv} mSv</strong>
                  </div>

                  <button class="btn btn-outline btn-sm earth-inspect-btn" data-astro="${c.id}" style="width: 100%; margin-top: 14px; font-size: 0.72rem;">
                    Inspect Detailed Feed &rarr;
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- MAIN SECTION: AI CLINICAL SYNTHESIS & DOWNLINKED REPORTS -->
        <div style="display: grid; grid-template-columns: 1.25fr 1.15fr; gap: 28px;" class="lg-grid-cols-1">
          
          <!-- LEFT: AI-GENERATED CLINICAL SUMMARIES (AI-ASSISTED) -->
          <div class="glass-panel" style="padding: 26px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: var(--soft-lavender);">${Icons.cpu('', 22)}</span>
                <h3 style="font-size: 1.25rem; font-weight: 700;">AI Longitudinal Clinical Synthesis</h3>
              </div>
              <span class="badge badge-pink" style="font-size: 0.65rem;">AI-ASSISTED SUMMARY</span>
            </div>

            <!-- Caution Banner -->
            <div style="background: rgba(118, 87, 214, 0.12); border: 1px solid rgba(184, 164, 255, 0.25); border-radius: var(--radius-sm); padding: 12px 16px; margin-bottom: 18px; font-size: 0.8rem; color: var(--soft-lavender); display: flex; gap: 10px;">
              <span style="color: var(--electric-cyan); flex-shrink: 0;">${Icons.info('', 18)}</span>
              <div>
                <strong>AstroVital AI Flight Surgeon Clinical Digest:</strong> Synthesized from 2,880 telemetry data points and hab atmospheric logs over the last 24 mission hours. Requires physician sign-off.
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.88rem; line-height: 1.6; color: var(--text-muted);">
              <div>
                <strong style="color: #ffffff;">1. Cardiovascular & Fluid Redistribution (Dr. Elena Rostova):</strong><br/>
                No evidence of serious ventricular dysrhythmia. Post-exercise recovery profile reflects good compensatory cardiovascular tone under 1.25 g-equivalent resistive loading on ARED. Mild orthostatic dizziness reported on Sol 139 treated nominally with electrolyte protocol.
              </div>

              <div>
                <strong style="color: #ffffff;">2. Circadian Desynchronization (Cmdr. Marcus Vance):</strong><br/>
                Accumulated 6.4-hour sleep debt across last 4 sols during high-workload maneuver planning. Heart rate variability (RMSSD) exhibits sympathetic bias (42 ms vs 58 ms baseline). Countermeasure: 460 nm light exposure adjustment recommended.
              </div>

              <div>
                <strong style="color: #ffffff;">3. Radiation & ECLSS Environment:</strong><br/>
                Total habitat dose rate is 1.48 µGy/hr. Secondary neutron capture within storm shelter remains within ALARA (As Low As Reasonably Achievable) safety margins.
              </div>
            </div>

            <!-- Physician Action Button -->
            <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end;">
              <button class="btn btn-primary" id="open-directive-modal-btn">
                ${Icons.send('', 16)} <span>Transmit Clinical Directive to Mars Hab &rarr;</span>
              </button>
            </div>
          </div>

          <!-- RIGHT: DOWNLINKED INCIDENT REPORTS & TRANSMISSION HISTORY -->
          <div class="glass-panel" style="padding: 26px; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <h3 style="font-size: 1.25rem; font-weight: 700;">Downlinked Medical Reports</h3>
                <span class="badge badge-cyan">${reports.length} Received</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--text-dim);" class="mono">DTN BUFFER OK</span>
            </div>

            <!-- List of reports -->
            <div style="display: flex; flex-direction: column; gap: 14px; max-height: 480px; overflow-y: auto;">
              ${reports.map(r => `
                <div class="glass-panel" style="padding: 16px; background: rgba(8, 13, 36, 0.7); border: 1px solid var(--border-subtle);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                    <div>
                      <span class="badge badge-nasa mono" style="font-size: 0.65rem;">${r.id}</span>
                      <strong style="margin-left: 8px; color: var(--electric-cyan); font-size: 0.88rem;">${r.astronautName}</strong>
                    </div>
                    <span class="badge ${r.status.includes('Queued') ? 'badge-warning' : 'badge-success'} mono" style="font-size: 0.65rem;">
                      ${r.status}
                    </span>
                  </div>

                  <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 4px; color: #ffffff;">${r.subject}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">${r.symptoms}</div>
                  
                  <div style="background: rgba(16, 26, 58, 0.8); border: 1px solid var(--border-subtle); padding: 8px 12px; border-radius: var(--radius-sm); font-size: 0.76rem; color: var(--soft-lavender); margin-bottom: 8px;">
                    <strong>AI Assessment:</strong> ${r.aiPreliminaryAssessment}
                  </div>

                  <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 10px;" class="mono">
                    Flight Surgeon Directive: <strong style="color: var(--electric-cyan);">${r.flightSurgeonDirective}</strong>
                  </div>

                  <div style="display: flex; justify-content: flex-end;">
                    <button class="btn btn-outline btn-sm reply-directive-btn" data-report="${r.id}" style="font-size: 0.72rem; padding: 4px 10px;">
                      Update Earth Directive &rarr;
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>

          </div>

        </div>

      </div>

      <!-- TRANSMIT DIRECTIVE MODAL (HIDDEN BY DEFAULT) -->
      <div id="directive-modal" class="modal-backdrop" style="display: none;">
        <div class="modal-content" style="padding: 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--electric-cyan);">${Icons.send('', 22)}</span>
              <h3 style="font-size: 1.3rem; font-weight: 700;">Transmit Flight Surgeon Medical Directive</h3>
            </div>
            <button id="close-directive-modal" style="background: none; border: none; color: var(--text-dim); cursor: pointer;">
              ${Icons.x('', 20)}
            </button>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
            Formulate a binding medical order or clinical guidance to uplink to the Mars Ares V habitat. Due to planetary geometry, uplink takes <strong>14 minutes 22 seconds</strong> to arrive.
          </p>

          <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--soft-lavender); display: block; margin-bottom: 6px;">Select Recipient Astronaut:</label>
              <select id="modal-recipient-select" style="width: 100%; background: rgba(8, 13, 36, 0.8); border: 1px solid var(--border-subtle); color: #ffffff; padding: 10px; border-radius: var(--radius-sm); outline: none;">
                <option value="astro-01">Dr. Elena Rostova (Mission Specialist)</option>
                <option value="astro-02">Cmdr. Marcus Vance (Commander)</option>
                <option value="astro-03">Dr. Priya Sharma (Crew Medical Officer)</option>
                <option value="astro-04">Leo Tanaka (Lead Engineer)</option>
              </select>
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--soft-lavender); display: block; margin-bottom: 6px;">Standard Pre-Approved Protocol Template:</label>
              <select id="modal-template-select" style="width: 100%; background: rgba(8, 13, 36, 0.8); border: 1px solid var(--border-subtle); color: #ffffff; padding: 10px; border-radius: var(--radius-sm); outline: none;">
                <option value="Increase daily oral electrolyte fluid loading by 750 mL prior to next EVA cycle. Maintain ARED squat loads.">Hydration & Fluid Loading Protocol</option>
                <option value="Administer 0.5 mg micro-dose sublingual melatonin 30 minutes prior to scheduled sleep cycle. Enforce 460 nm blue-light blackout in Hab sleeping pod.">Circadian Reset & Light Therapy Protocol</option>
                <option value="Conduct 15-minute bilateral orthostatic stand test with continuous bio-harness logging. Log ocular visual acuity check on grid.">Orthostatic & SANS Visual Acuity Check</option>
                <option value="Reduce scheduled heavy EVA simulation by 40% for the next 48 hours to facilitate autonomic recovery.">Prescribe 48-Hour Rest & Recovery Window</option>
              </select>
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--soft-lavender); display: block; margin-bottom: 6px;">Clinical Directive Text:</label>
              <textarea id="modal-directive-text" rows="4" style="width: 100%; background: rgba(8, 13, 36, 0.8); border: 1px solid var(--border-subtle); color: #ffffff; padding: 10px; border-radius: var(--radius-sm); outline: none; font-family: inherit; font-size: 0.88rem;"></textarea>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button class="btn btn-outline" id="cancel-directive-btn">Cancel</button>
            <button class="btn btn-primary" id="confirm-transmit-btn">
              ${Icons.rocket('', 16)} <span>Uplink Directive to Mars (14m Delay)</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents(container) {
    const modal = container.querySelector('#directive-modal');
    const openBtn = container.querySelector('#open-directive-modal-btn');
    const closeBtn = container.querySelector('#close-directive-modal');
    const cancelBtn = container.querySelector('#cancel-directive-btn');
    const confirmBtn = container.querySelector('#confirm-transmit-btn');
    const templateSelect = container.querySelector('#modal-template-select');
    const textArea = container.querySelector('#modal-directive-text');

    if (templateSelect && textArea) {
      textArea.value = templateSelect.value;
      templateSelect.addEventListener('change', () => {
        textArea.value = templateSelect.value;
      });
    }

    const showModal = () => {
      soundFX.playBlip();
      if (modal) modal.style.display = 'flex';
    };

    const hideModal = () => {
      if (modal) modal.style.display = 'none';
    };

    if (openBtn) openBtn.addEventListener('click', showModal);
    if (closeBtn) closeBtn.addEventListener('click', hideModal);
    if (cancelBtn) cancelBtn.addEventListener('click', hideModal);

    // Update directive on individual reports
    container.querySelectorAll('.reply-directive-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.selectedReportId = e.currentTarget.getAttribute('data-report');
        showModal();
      });
    });

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        soundFX.playTransmit();
        const directiveText = textArea.value;
        const targetReport = this.selectedReportId || (store.state.reports[0] && store.state.reports[0].id);

        if (targetReport) {
          store.transmitDirective(targetReport, directiveText);
        }

        hideModal();
        alert(`🛰️ Directive queued for transmission to Mars MTV Hab-01!\n\nFlight Surgeon Directive: "${directiveText}"\n\nSpeed-of-light delay: 14m 22s.`);
        store.notify({ type: 'RENDER_VIEW' });
      });
    }

    // Inspect individual astronaut
    container.querySelectorAll('.earth-inspect-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundFX.playBlip();
        const id = e.currentTarget.getAttribute('data-astro');
        store.state.currentAstronautId = id;
        store.setView('astronaut');
      });
    });
  }
};
