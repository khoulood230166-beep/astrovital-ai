// AstroVital AI - Onboard Crew Health & Hab Medical Bay Dashboard
// Used by Dr. Priya Sharma (Crew Medical Officer) & Hab-01 Crew

const CrewDashboardView = {
  selectedAlert: null,

  render() {
    const s = store.state;
    const crew = AstroData.crew;
    const alerts = s.alerts;
    const reports = s.reports;

    return `
      <div class="crew-dashboard container" style="padding: 32px 24px 80px;">
        
        <!-- HEADER -->
        <div class="glass-panel" style="padding: 24px 28px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h1 style="font-size: 1.6rem; font-weight: 800;">Ares V Onboard Crew Medical Hub</h1>
              <span class="badge badge-nasa">HAB-01 MEDICAL BAY</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              Station Medical Officer: <strong style="color: var(--soft-lavender);">Dr. Priya Sharma, MD</strong> • Total Crew Complement: <strong>4 Astronauts</strong>
            </div>
          </div>

          <div style="display: flex; gap: 12px; align-items: center;">
            <span class="badge badge-cyan" style="font-size: 0.75rem; padding: 6px 12px;">
              ${Icons.shield('', 14)} HAB STATUS: NOMINAL
            </span>
            <button class="btn btn-outline btn-sm" onclick="store.setView('ai-assistant')">
              ${Icons.sparkles('', 14)} <span>Open AI Co-Pilot</span>
            </button>
          </div>
        </div>

        <!-- CREW COMPLEMENT 4-CARD GRID -->
        <div style="margin-bottom: 28px;">
          <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
            ${Icons.users('', 20)} <span>Active Crew Telemetry Matrix</span>
          </h2>

          <div class="grid grid-cols-4 gap-6" class="lg-grid-cols-2">
            ${crew.map(member => {
              const isElena = member.id === 'astro-01';
              const hr = isElena ? s.liveTelemetry.heartRate : member.currentTelemetry.heartRate;
              const spo2 = isElena ? s.liveTelemetry.spO2 : member.currentTelemetry.spO2;
              const status = isElena ? (s.liveTelemetry.anomalyActive ? 'WARNING' : 'OPTIMAL') : member.status;

              return `
                <div class="glass-panel" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid ${status === 'OPTIMAL' ? '#2ed573' : (status === 'MONITORING' ? '#ffab00' : '#ff4757')};">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                      <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(118, 87, 214, 0.25); border: 1px solid rgba(184, 164, 255, 0.4); display: flex; align-items: center; justify-content: center; font-size: 1.6rem;">
                        ${member.avatar}
                      </div>
                      <span class="badge ${status === 'OPTIMAL' ? 'badge-success' : 'badge-warning'} mono" style="font-size: 0.68rem;">
                        ${status}
                      </span>
                    </div>

                    <div style="font-weight: 700; font-size: 1.05rem; color: #ffffff;">${member.name}</div>
                    <div style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 12px;">${member.role}</div>

                    <!-- Telemetry values -->
                    <div style="background: rgba(8, 13, 36, 0.65); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; font-size: 0.8rem;" class="mono">
                      <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-dim);">Heart Rate:</span>
                        <strong style="color: ${hr > 100 ? '#ff4757' : 'var(--electric-cyan)'};">${hr} BPM</strong>
                      </div>
                      <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-dim);">SpO2:</span>
                        <strong style="color: ${spo2 < 94 ? '#ff4757' : 'var(--soft-lavender)'};">${spo2}%</strong>
                      </div>
                      <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-dim);">Sleep:</span>
                        <span style="color: #ffffff;">${member.currentTelemetry.sleepTotalHours}h (${member.currentTelemetry.sleepQualityScore}%)</span>
                      </div>
                      <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-dim);">Module:</span>
                        <span style="color: var(--elegant-pink); font-size: 0.72rem;">${member.module.split('/')[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div style="margin-top: 14px; display: flex; gap: 8px;">
                    <button class="btn btn-outline btn-sm view-profile-btn" data-astro="${member.id}" style="width: 100%; font-size: 0.75rem;">
                      View Health Record &rarr;
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- TWO COLUMNS: ACTIVE ALERTS & RECENT INCIDENT REPORTS -->
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 28px;" class="lg-grid-cols-1">
          
          <!-- LEFT: ACTIVE CREW HEALTH ALERTS & ACKNOWLEDGMENT -->
          <div class="glass-panel" style="padding: 26px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <h3 style="font-size: 1.25rem; font-weight: 700;">Station Medical Alerts</h3>
                <span class="badge badge-warning">${alerts.length} Total</span>
              </div>
              <span style="font-size: 0.78rem; color: var(--text-dim);" class="mono">ARES V HAB-01</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 14px; max-height: 480px; overflow-y: auto;">
              ${alerts.map(a => `
                <div class="glass-panel" style="padding: 16px; background: rgba(8, 13, 36, 0.7); border-left: 4px solid ${a.level === 'critical' ? '#ff4757' : (a.level === 'warning' ? '#ffab00' : '#2ed573')};">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                    <div>
                      <span class="badge ${a.level === 'critical' ? 'badge-critical' : (a.level === 'warning' ? 'badge-warning' : 'badge-success')}" style="font-size: 0.68rem;">
                        ${a.level.toUpperCase()}
                      </span>
                      <strong style="margin-left: 8px; color: var(--electric-cyan); font-size: 0.85rem;">${a.astronautName}</strong>
                    </div>
                    <span style="font-size: 0.72rem; color: var(--text-dim);" class="mono">${a.timestamp}</span>
                  </div>

                  <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 4px; color: #ffffff;">${a.title}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 10px;">${a.explanation}</div>

                  <div style="background: rgba(16, 26, 58, 0.7); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-size: 0.76rem; color: var(--soft-lavender); margin-bottom: 10px;">
                    <strong>CMO Protocol:</strong> ${a.recommendation}
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem;">
                    <span style="color: var(--text-dim);" class="mono">
                      Status: <strong style="color: ${a.status === 'Resolved' ? '#2ed573' : '#ffab00'};">${a.status}</strong>
                    </span>

                    <div style="display: flex; gap: 8px;">
                      ${a.status !== 'Resolved' ? `
                        <button class="btn btn-cyan btn-sm cmo-ack-btn" data-alert="${a.id}" style="font-size: 0.72rem; padding: 4px 10px;">
                          Acknowledge as CMO
                        </button>
                        <button class="btn btn-outline btn-sm cmo-resolve-btn" data-alert="${a.id}" style="font-size: 0.72rem; padding: 4px 10px;">
                          Resolve
                        </button>
                      ` : `
                        <span class="badge badge-success" style="font-size: 0.7rem;">Completed</span>
                      `}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- RIGHT: REPORTS REQUIRING ATTENTION & TRANSMISSION QUEUE -->
          <div class="glass-panel" style="padding: 26px; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <h3 style="font-size: 1.25rem; font-weight: 700;">Clinical Incident Reports</h3>
                <span class="badge badge-nasa">${reports.length} Reports</span>
              </div>

              <button class="btn btn-primary btn-sm" id="create-manual-report-btn" style="font-size: 0.75rem;">
                ${Icons.fileText('', 14)} <span>+ New Report</span>
              </button>
            </div>

            <!-- List of reports -->
            <div style="display: flex; flex-direction: column; gap: 14px; max-height: 480px; overflow-y: auto;">
              ${reports.map(r => `
                <div class="glass-panel" style="padding: 16px; background: rgba(8, 13, 36, 0.75); border: 1px solid var(--border-subtle);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                    <div>
                      <span class="badge badge-nasa mono" style="font-size: 0.65rem;">${r.id}</span>
                      <strong style="margin-left: 6px; font-size: 0.85rem; color: #ffffff;">${r.astronautName}</strong>
                    </div>
                    <span class="badge ${r.status.includes('Queued') ? 'badge-warning' : 'badge-cyan'}" style="font-size: 0.65rem;">
                      ${r.status}
                    </span>
                  </div>

                  <div style="font-weight: 700; font-size: 0.92rem; margin-bottom: 4px; color: var(--electric-cyan);">${r.subject}</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 8px;">${r.symptoms}</div>
                  
                  <div style="font-size: 0.75rem; color: var(--soft-lavender); line-height: 1.4; background: rgba(118, 87, 214, 0.1); padding: 8px; border-radius: var(--radius-sm); margin-bottom: 8px;">
                    <strong>AI Assessment:</strong> ${r.aiPreliminaryAssessment}
                  </div>

                  <div style="font-size: 0.72rem; color: var(--text-dim);" class="mono">
                    Earth Directive: <em style="color: var(--starlight-white);">${r.flightSurgeonDirective}</em>
                  </div>
                </div>
              `).join('')}
            </div>

          </div>

        </div>

      </div>
    `;
  },

  bindEvents(container) {
    // CMO Acknowledge alert
    container.querySelectorAll('.cmo-ack-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundFX.playPulse();
        const id = e.currentTarget.getAttribute('data-alert');
        store.acknowledgeAlert(id, "Dr. Priya Sharma (CMO)");
      });
    });

    // CMO Resolve alert
    container.querySelectorAll('.cmo-resolve-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundFX.playBlip();
        const id = e.currentTarget.getAttribute('data-alert');
        store.resolveAlert(id);
      });
    });

    // View profile
    container.querySelectorAll('.view-profile-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundFX.playBlip();
        const astroId = e.currentTarget.getAttribute('data-astro');
        store.state.currentAstronautId = astroId;
        store.setView('astronaut');
      });
    });

    // Create report
    const createBtn = container.querySelector('#create-manual-report-btn');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        soundFX.playTransmit();
        store.createReport({
          subject: "Routine Hab Medical Officer Observation",
          symptoms: "Periodic physical wellness examination completed by Dr. Priya Sharma.",
          severity: "Low"
        });
      });
    }
  }
};
