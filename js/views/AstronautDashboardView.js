// AstroVital AI - Astronaut Personal Health Hub
// Astronaut: Dr. Elena Rostova (Mission Specialist & Astrobiologist)

const AstronautDashboardView = {
  activeTimeframe: '24h', // '24h' | '7d'
  alertFilter: 'all',    // 'all' | 'warning' | 'critical' | 'normal'

  render() {
    const s = store.state;
    const astro = AstroData.crew.find(c => c.id === s.currentAstronautId) || AstroData.crew[0];
    const live = s.liveTelemetry;
    const isAnomaly = live.anomalyActive !== null;

    // Filter alerts
    const filteredAlerts = s.alerts.filter(a => {
      if (this.alertFilter === 'all') return true;
      return a.level === this.alertFilter;
    });

    return `
      <div class="astronaut-dashboard container" style="padding: 32px 24px 80px;">
        
        <!-- TOP PROFILE HEADER CARD -->
        <div class="glass-panel" style="padding: 24px 28px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
          <div style="display: flex; align-items: center; gap: 18px;">
            <div style="position: relative; width: 68px; height: 68px; border-radius: 50%; background: linear-gradient(135deg, rgba(118, 87, 214, 0.4), rgba(98, 221, 245, 0.3)); display: flex; align-items: center; justify-content: center; font-size: 2.2rem; border: 2px solid var(--electric-cyan); box-shadow: 0 0 20px rgba(98, 221, 245, 0.3);">
              ${astro.avatar}
              <span class="pulse-dot ${isAnomaly ? 'pulse-dot-red' : 'pulse-dot-green'}" style="position: absolute; bottom: 2px; right: 2px;"></span>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <h1 style="font-size: 1.55rem; font-weight: 800;">${astro.name}</h1>
                <span class="badge ${isAnomaly ? 'badge-warning' : 'badge-success'}">
                  ${isAnomaly ? 'ANOMALY DETECTED' : 'OPTIMAL - MISSION READY'}
                </span>
                <span class="badge badge-nasa">${astro.callsign}</span>
              </div>
              <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 3px;">
                ${astro.role} • <span class="mono">${AstroData.mission.vehicle}</span> • Module: <span style="color: var(--soft-lavender);">${astro.module}</span>
              </div>
            </div>
          </div>

          <!-- Mission Indicators -->
          <div style="display: flex; gap: 24px; align-items: center;" class="mono">
            <div style="text-align: right;">
              <div style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Mission Elapsed</div>
              <div style="font-size: 1.15rem; font-weight: 700; color: var(--electric-cyan);">SOL ${AstroData.mission.missionDay} <span style="font-size: 0.8rem; color: var(--text-dim);">/ 520</span></div>
            </div>
            <div style="text-align: right; border-left: 1px solid var(--border-subtle); padding-left: 20px;">
              <div style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">EVA Cumulative</div>
              <div style="font-size: 1.15rem; font-weight: 700; color: var(--soft-lavender);">${astro.currentTelemetry.evaHoursTotal} hrs</div>
            </div>
            <div style="text-align: right; border-left: 1px solid var(--border-subtle); padding-left: 20px;">
              <div style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Suit Bio-Harness</div>
              <div style="font-size: 0.95rem; font-weight: 600; color: var(--elegant-pink);">${astro.suitId}</div>
            </div>
          </div>
        </div>

        <!-- LIVE TELEMETRY TILES GRID -->
        <div class="telemetry-grid" style="margin-bottom: 28px;">
          
          <!-- Tile 1: Heart Rate + Live ECG Monitor -->
          <div class="glass-panel" style="padding: 22px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: ${live.heartRate > 100 ? '#ff4757' : 'var(--electric-cyan)'};">${Icons.heart('', 20)}</span>
                  <span style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Heart Rate</span>
                </div>
                <span class="badge ${live.heartRate > 100 ? 'badge-critical' : 'badge-cyan'} mono">
                  ${live.heartRate > 100 ? 'ELEVATED' : 'NOMINAL'}
                </span>
              </div>
              <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px;">
                <span class="mono" style="font-size: 2.4rem; font-weight: 800; color: ${live.heartRate > 100 ? '#ff4757' : '#ffffff'};">${live.heartRate}</span>
                <span style="font-size: 0.9rem; color: var(--text-dim);">BPM</span>
                <span style="margin-left: auto; font-size: 0.78rem; color: var(--text-muted);" class="mono">
                  Base: ${astro.baseline.restingHeartRate} BPM
                </span>
              </div>
            </div>

            <!-- Embedded Live ECG Canvas Waveform -->
            <div class="ecg-canvas-container" style="margin-top: 10px;">
              <canvas id="ecg-live-canvas" style="width: 100%; height: 100%; display: block;"></canvas>
              <div class="ecg-grid-overlay"></div>
            </div>
          </div>

          <!-- Tile 2: Blood Oxygen SpO2 & Cabin Pressure -->
          <div class="glass-panel" style="padding: 22px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: ${live.spO2 < 94 ? '#ff4757' : 'var(--soft-lavender)'};">${Icons.activity('', 20)}</span>
                <span style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Blood Oxygen (SpO2)</span>
              </div>
              <span class="badge ${live.spO2 < 94 ? 'badge-critical' : 'badge-success'} mono">
                ${live.spO2 < 94 ? 'HYPOXIA RISK' : 'STABLE'}
              </span>
            </div>
            <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px;">
              <span class="mono" style="font-size: 2.4rem; font-weight: 800; color: ${live.spO2 < 94 ? '#ff4757' : '#ffffff'};">${live.spO2}%</span>
              <span style="margin-left: auto; font-size: 0.78rem; color: var(--text-muted);" class="mono">Target &ge; 98.0%</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 1px solid var(--border-subtle); font-size: 0.78rem;" class="mono">
              <span style="color: var(--text-dim);">Cabin Pressure: <strong style="color: var(--electric-cyan);">${live.cabinPressurePsi} PSI</strong></span>
              <span style="color: var(--text-dim);">O2 Fraction: <strong style="color: var(--soft-lavender);">${live.cabinOxygenPct}%</strong></span>
            </div>
          </div>

          <!-- Tile 3: Physical Activity & ARED Countermeasures -->
          <div class="glass-panel" style="padding: 22px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--elegant-pink);">${Icons.zap('', 20)}</span>
                <span style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Daily Exercise</span>
              </div>
              <span class="badge badge-pink mono">94% TARGET</span>
            </div>
            <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px;">
              <span class="mono" style="font-size: 2.4rem; font-weight: 800; color: #ffffff;">${live.activeCalories}</span>
              <span style="font-size: 0.9rem; color: var(--text-dim);">/ 1,500 kcal</span>
            </div>
            <!-- Progress Bar -->
            <div style="width: 100%; height: 6px; background: rgba(242, 166, 216, 0.2); border-radius: 3px; margin-bottom: 12px; overflow: hidden;">
              <div style="width: 94%; height: 100%; background: linear-gradient(90deg, var(--cosmic-purple), var(--elegant-pink));"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem;" class="mono">
              <span style="color: var(--text-dim);">ARED Resistive: <strong style="color: #ffffff;">80 min</strong></span>
              <span style="color: var(--text-dim);">T2 Aerobic: <strong style="color: #ffffff;">60 min</strong></span>
            </div>
          </div>

          <!-- Tile 4: Sleep Architecture & Autonomic Recovery -->
          <div class="glass-panel" style="padding: 22px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #62DDF5;">${Icons.moon('', 20)}</span>
                <span style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Sleep & Recovery</span>
              </div>
              <span class="badge badge-cyan mono">SCORE 91/100</span>
            </div>
            <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px;">
              <span class="mono" style="font-size: 2.4rem; font-weight: 800; color: #ffffff;">7h 42m</span>
              <span style="margin-left: auto; font-size: 0.78rem; color: var(--text-muted);" class="mono">Deep: 2h 15m (29%)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 1px solid var(--border-subtle); font-size: 0.78rem;" class="mono">
              <span style="color: var(--text-dim);">HRV RMSSD: <strong style="color: var(--electric-cyan);">${live.hrvRmssd} ms</strong></span>
              <span style="color: var(--text-dim);">Core Temp: <strong style="color: var(--soft-lavender);">${live.coreTempC}°C</strong></span>
            </div>
          </div>

        </div>

        <!-- MAIN SECTION: HEALTH TRENDS & SMART ALERTS -->
        <div style="display: grid; grid-template-columns: 1.6fr 1.1fr; gap: 28px; margin-bottom: 28px;" class="lg-grid-cols-1">
          
          <!-- LEFT: INTERACTIVE HEALTH TRENDS CHART -->
          <div class="glass-panel" style="padding: 26px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
              <div>
                <h3 style="font-size: 1.25rem; font-weight: 700;">Biometric Trends & Personal Baseline</h3>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">
                  Comparing Sol 142 telemetry against pre-flight Earth baseline (62 BPM resting).
                </div>
              </div>

              <!-- Timeframe Selector Tabs -->
              <div style="display: flex; background: rgba(8, 13, 36, 0.6); padding: 4px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <button id="tab-24h" class="btn btn-sm ${this.activeTimeframe === '24h' ? 'btn-primary' : 'btn-outline'}" style="padding: 4px 12px; font-size: 0.78rem;">24 Hours</button>
                <button id="tab-7d" class="btn btn-sm ${this.activeTimeframe === '7d' ? 'btn-primary' : 'btn-outline'}" style="padding: 4px 12px; font-size: 0.78rem;">7 Days</button>
              </div>
            </div>

            <!-- Interactive Trend Chart SVG Graphic -->
            <div id="trend-chart-container" style="width: 100%; height: 260px; position: relative;">
              ${this.renderTrendChart()}
            </div>

            <!-- Chart Legend -->
            <div style="display: flex; justify-content: center; gap: 24px; margin-top: 18px; font-size: 0.8rem;" class="mono">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="width: 12px; height: 3px; background: var(--electric-cyan); border-radius: 2px;"></span>
                <span>Observed Telemetry</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="width: 12px; height: 2px; background: var(--soft-lavender); border-style: dashed; border-radius: 2px;"></span>
                <span>Personal Baseline (62 BPM)</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="width: 10px; height: 10px; background: rgba(242, 166, 216, 0.4); border: 1px solid var(--elegant-pink); border-radius: 50%;"></span>
                <span>Exercise Countermeasure Phase</span>
              </div>
            </div>
          </div>

          <!-- RIGHT: SMART ALERTS FEED -->
          <div class="glass-panel" style="padding: 26px; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <h3 style="font-size: 1.25rem; font-weight: 700;">Smart Health Alerts</h3>
                <span class="badge badge-warning" style="font-size: 0.7rem;">${filteredAlerts.length} Active</span>
              </div>

              <!-- Alert Filter Pills -->
              <div style="display: flex; gap: 4px;">
                <button class="btn btn-sm btn-outline filter-btn" data-filter="all" style="padding: 2px 8px; font-size: 0.7rem;">All</button>
                <button class="btn btn-sm btn-outline filter-btn" data-filter="warning" style="padding: 2px 8px; font-size: 0.7rem;">Warning</button>
                <button class="btn btn-sm btn-outline filter-btn" data-filter="critical" style="padding: 2px 8px; font-size: 0.7rem;">Critical</button>
              </div>
            </div>

            <!-- Alerts List Scrollable Area -->
            <div style="display: flex; flex-direction: column; gap: 14px; max-height: 380px; overflow-y: auto; padding-right: 6px;">
              ${filteredAlerts.length === 0 ? `
                <div style="padding: 40px 20px; text-align: center; color: var(--text-dim);">
                  ${Icons.checkCircle2('pulse-dot-green', 32)}
                  <div style="margin-top: 10px; font-weight: 600; color: #2ed573;">No Active Alerts</div>
                  <div style="font-size: 0.8rem; margin-top: 4px;">All physiological parameters within nominal flight thresholds.</div>
                </div>
              ` : filteredAlerts.map(alert => `
                <div class="glass-panel" style="padding: 16px; border-left: 4px solid ${alert.level === 'critical' ? '#ff4757' : (alert.level === 'warning' ? '#ffab00' : '#2ed573')}; background: rgba(8, 13, 36, 0.75);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                    <span class="badge ${alert.level === 'critical' ? 'badge-critical' : (alert.level === 'warning' ? 'badge-warning' : 'badge-success')}" style="font-size: 0.68rem;">
                      ${alert.level.toUpperCase()}
                    </span>
                    <span style="font-size: 0.72rem; color: var(--text-dim);" class="mono">${alert.timestamp}</span>
                  </div>

                  <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 4px; color: #ffffff;">${alert.title}</div>
                  <div style="font-size: 0.78rem; color: var(--electric-cyan); margin-bottom: 6px;" class="mono">${alert.metric}</div>
                  <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">${alert.explanation}</div>
                  
                  <div style="background: rgba(118, 87, 214, 0.12); border: 1px solid rgba(184, 164, 255, 0.2); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.78rem; color: var(--soft-lavender); margin-bottom: 12px;">
                    <strong>Recommended Action:</strong> ${alert.recommendation}
                  </div>

                  <div style="display: flex; gap: 8px; justify-content: flex-end;">
                    <button class="btn btn-outline btn-sm triage-ai-btn" data-alert="${alert.id}" style="font-size: 0.75rem; padding: 4px 10px;">
                      ${Icons.sparkles('', 14)} <span>Ask AI</span>
                    </button>
                    ${alert.status !== 'Resolved' ? `
                      <button class="btn btn-cyan btn-sm ack-alert-btn" data-alert="${alert.id}" style="font-size: 0.75rem; padding: 4px 10px;">
                        ${Icons.checkCircle2('', 14)} <span>Acknowledge</span>
                      </button>
                    ` : `
                      <span class="badge badge-success" style="font-size: 0.7rem;">Resolved</span>
                    `}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- LOWER SECTION: HEALTH PROFILE & CAMERA BIOMECHANICS CTA -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px;" class="lg-grid-cols-1">
          
          <!-- Astronaut Biometric Baseline Profile -->
          <div class="glass-panel" style="padding: 26px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 1.2rem; font-weight: 700;">NASA Clinical Baseline Profile</h3>
              <span class="badge badge-nasa">Ares V Standards</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 0.84rem;">
              <div style="padding: 12px; background: rgba(8, 13, 36, 0.6); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <div style="color: var(--text-dim); font-size: 0.72rem; text-transform: uppercase;">Blood Pressure Baseline</div>
                <div style="font-size: 1.1rem; font-weight: 700; color: #ffffff;" class="mono">${astro.baseline.bloodPressure}</div>
                <div style="color: #2ed573; font-size: 0.75rem;">Normotensive</div>
              </div>

              <div style="padding: 12px; background: rgba(8, 13, 36, 0.6); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <div style="color: var(--text-dim); font-size: 0.72rem; text-transform: uppercase;">VO2 Aerobic Max</div>
                <div style="font-size: 1.1rem; font-weight: 700; color: var(--electric-cyan);" class="mono">${astro.baseline.vo2Max}</div>
                <div style="color: var(--text-muted); font-size: 0.75rem;">Top 5% Astronaut Class</div>
              </div>

              <div style="padding: 12px; background: rgba(8, 13, 36, 0.6); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <div style="color: var(--text-dim); font-size: 0.72rem; text-transform: uppercase;">Bone Mineral Density (DXA)</div>
                <div style="font-size: 1.1rem; font-weight: 700; color: var(--soft-lavender);" class="mono">T-Score: ${astro.baseline.boneMineralDensityTScore}</div>
                <div style="color: var(--text-muted); font-size: 0.75rem;">-0.2% change since Earth launch</div>
              </div>

              <div style="padding: 12px; background: rgba(8, 13, 36, 0.6); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <div style="color: var(--text-dim); font-size: 0.72rem; text-transform: uppercase;">Career Radiation Dosimeter</div>
                <div style="font-size: 1.1rem; font-weight: 700; color: var(--elegant-pink);" class="mono">${astro.baseline.cumulativeRadiationMSv} / 600 mSv</div>
                <div style="width: 100%; height: 4px; background: rgba(242, 166, 216, 0.2); border-radius: 2px; margin-top: 6px;">
                  <div style="width: ${(astro.baseline.cumulativeRadiationMSv / 600 * 100).toFixed(1)}%; height: 100%; background: var(--elegant-pink);"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Camera Movement Analysis Teaser Card -->
          <div class="glass-panel" style="padding: 26px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(98, 221, 245, 0.35); background: linear-gradient(135deg, rgba(16, 26, 58, 0.8) 0%, rgba(118, 87, 214, 0.15) 100%);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="color: var(--electric-cyan);">${Icons.camera('', 22)}</span>
                  <h3 style="font-size: 1.2rem; font-weight: 700;">Camera-Based Movement Analysis</h3>
                </div>
                <span class="badge badge-cyan">AI Vision</span>
              </div>
              <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 16px;">
                Evaluate musculoskeletal form, bilateral symmetry, joint angles, and muscular fatigue during microgravity exercise routines on the ARED resistance device and T2 treadmill.
              </p>
              <div style="display: flex; gap: 16px; margin-bottom: 20px; font-size: 0.82rem;" class="mono">
                <div>Squat Symmetry: <strong style="color: var(--electric-cyan);">96%</strong></div>
                <div>Knee Flexion: <strong style="color: var(--soft-lavender);">112°</strong></div>
                <div>Fatigue Index: <strong style="color: #2ed573;">Low (14%)</strong></div>
              </div>
            </div>

            <button id="launch-movement-btn" class="btn btn-cyan btn-lg" style="width: 100%;">
              ${Icons.play('', 18)} <span>Launch Interactive Movement AI Demo &rarr;</span>
            </button>
          </div>

        </div>

      </div>
    `;
  },

  renderTrendChart() {
    if (this.activeTimeframe === '24h') {
      const data = AstroData.hourly24h;
      const width = 640;
      const height = 220;
      const padding = { top: 20, right: 30, bottom: 35, left: 45 };
      const chartW = width - padding.left - padding.right;
      const chartH = height - padding.top - padding.bottom;

      const minVal = 40;
      const maxVal = 160;

      const getX = (i) => padding.left + (i / (data.length - 1)) * chartW;
      const getY = (val) => padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

      // Construct SVG path for heart rate
      let pathD = '';
      let areaD = `M ${getX(0)} ${padding.top + chartH}`;

      data.forEach((d, i) => {
        const x = getX(i);
        const y = getY(d.hr);
        if (i === 0) {
          pathD += `M ${x} ${y}`;
          areaD += ` L ${x} ${y}`;
        } else {
          // Smooth curve using cubic bezier control points
          const prevX = getX(i - 1);
          const prevY = getY(data[i - 1].hr);
          const cpX1 = prevX + (x - prevX) / 2;
          const cpX2 = prevX + (x - prevX) / 2;
          pathD += ` C ${cpX1} ${prevY}, ${cpX2} ${y}, ${x} ${y}`;
          areaD += ` C ${cpX1} ${prevY}, ${cpX2} ${y}, ${x} ${y}`;
        }
      });

      areaD += ` L ${getX(data.length - 1)} ${padding.top + chartH} Z`;

      const baselineY = getY(62);

      return `
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%; overflow: visible;" class="mono">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#62DDF5" stop-opacity="0.38"/>
              <stop offset="100%" stop-color="#7657D6" stop-opacity="0.0"/>
            </linearGradient>
          </defs>

          <!-- Horizontal Grid Lines -->
          ${[60, 90, 120, 150].map(v => `
            <line x1="${padding.left}" y1="${getY(v)}" x2="${width - padding.right}" y2="${getY(v)}" stroke="rgba(184, 164, 255, 0.12)" stroke-width="1"/>
            <text x="${padding.left - 8}" y="${getY(v) + 4}" fill="#6b779a" font-size="10" text-anchor="end">${v}</text>
          `).join('')}

          <!-- Baseline Line -->
          <line x1="${padding.left}" y1="${baselineY}" x2="${width - padding.right}" y2="${baselineY}" stroke="#B8A4FF" stroke-width="1.5" stroke-dasharray="4 4"/>
          <text x="${width - padding.right + 6}" y="${baselineY + 3}" fill="#B8A4FF" font-size="9" text-anchor="start">Base (62)</text>

          <!-- Filled Area Under Curve -->
          <path d="${areaD}" fill="url(#chartGradient)"/>

          <!-- Line Stroke -->
          <path d="${pathD}" fill="none" stroke="#62DDF5" stroke-width="2.6" stroke-linecap="round"/>

          <!-- Highlighting Data Points -->
          ${data.map((d, i) => `
            <circle cx="${getX(i)}" cy="${getY(d.hr)}" r="${d.hr > 120 ? '4.5' : '3'}" fill="${d.hr > 120 ? '#F2A6D8' : '#62DDF5'}" stroke="#080D24" stroke-width="1.5"/>
            <text x="${getX(i)}" y="${height - 10}" fill="#9aa4c4" font-size="9" text-anchor="middle">${d.time}</text>
          `).join('')}
        </svg>
      `;
    } else {
      // 7-day trend bars and line
      const data = AstroData.sevenDays;
      const width = 640;
      const height = 220;
      const padding = { top: 20, right: 30, bottom: 35, left: 45 };
      const chartW = width - padding.left - padding.right;
      const chartH = height - padding.top - padding.bottom;

      const getX = (i) => padding.left + (i / (data.length - 1)) * chartW;
      const getY = (val) => padding.top + chartH - ((val - 50) / 50) * chartH;

      let lineD = '';
      data.forEach((d, i) => {
        const x = getX(i);
        const y = getY(d.avgHr);
        if (i === 0) lineD += `M ${x} ${y}`;
        else lineD += ` L ${x} ${y}`;
      });

      return `
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%; overflow: visible;" class="mono">
          <!-- Horizontal Grid Lines -->
          ${[60, 70, 80, 90].map(v => `
            <line x1="${padding.left}" y1="${getY(v)}" x2="${width - padding.right}" y2="${getY(v)}" stroke="rgba(184, 164, 255, 0.12)" stroke-width="1"/>
            <text x="${padding.left - 8}" y="${getY(v) + 4}" fill="#6b779a" font-size="10" text-anchor="end">${v}</text>
          `).join('')}

          <!-- Sleep Bars -->
          ${data.map((d, i) => {
            const x = getX(i) - 14;
            const barH = (d.sleepHrs / 10) * chartH;
            const barY = padding.top + chartH - barH;
            return `
              <rect x="${x}" y="${barY}" width="28" height="${barH}" rx="4" fill="rgba(118, 87, 214, 0.25)" stroke="rgba(184, 164, 255, 0.4)"/>
              <text x="${getX(i)}" y="${height - 10}" fill="#9aa4c4" font-size="9" text-anchor="middle">${d.day.split(' ')[0]}</text>
              <text x="${getX(i)}" y="${barY - 6}" fill="#B8A4FF" font-size="9" text-anchor="middle">${d.sleepHrs}h</text>
            `;
          }).join('')}

          <!-- Heart rate line overlay -->
          <path d="${lineD}" fill="none" stroke="#62DDF5" stroke-width="2.4"/>
          ${data.map((d, i) => `
            <circle cx="${getX(i)}" cy="${getY(d.avgHr)}" r="3.5" fill="#62DDF5" stroke="#080D24" stroke-width="1.5"/>
          `).join('')}
        </svg>
      `;
    }
  },

  bindEvents(container) {
    // Initialize ECG canvas
    new EcgMonitor('ecg-live-canvas');

    // Timeframe tabs
    const tab24 = container.querySelector('#tab-24h');
    const tab7 = container.querySelector('#tab-7d');

    if (tab24 && tab7) {
      tab24.addEventListener('click', () => {
        soundFX.playBlip();
        this.activeTimeframe = '24h';
        const chartBox = container.querySelector('#trend-chart-container');
        if (chartBox) chartBox.innerHTML = this.renderTrendChart();
        tab24.className = 'btn btn-sm btn-primary';
        tab7.className = 'btn btn-sm btn-outline';
      });

      tab7.addEventListener('click', () => {
        soundFX.playBlip();
        this.activeTimeframe = '7d';
        const chartBox = container.querySelector('#trend-chart-container');
        if (chartBox) chartBox.innerHTML = this.renderTrendChart();
        tab7.className = 'btn btn-sm btn-primary';
        tab24.className = 'btn btn-sm btn-outline';
      });
    }

    // Filter alert pills
    container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundFX.playBlip();
        this.alertFilter = e.currentTarget.getAttribute('data-filter');
        store.notify({ type: 'RENDER_VIEW' });
      });
    });

    // Acknowledge alert button
    container.querySelectorAll('.ack-alert-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundFX.playPulse();
        const alertId = e.currentTarget.getAttribute('data-alert');
        store.acknowledgeAlert(alertId, "Dr. Elena Rostova");
      });
    });

    // Ask AI about alert button
    container.querySelectorAll('.triage-ai-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundFX.playBlip();
        const alertId = e.currentTarget.getAttribute('data-alert');
        const alert = store.state.alerts.find(a => a.id === alertId);
        if (alert) {
          store.addChatMessage('user', `AI Co-Pilot: Analyze alert "${alert.title}" (${alert.metric}) and provide approved first-level countermeasures.`);
          // Trigger contextual AI response
          setTimeout(() => {
            store.addChatMessage('ai', `**Analysis for Alert ${alert.id} (${alert.category})**\n\n${alert.explanation}\n\n**Approved Medical Guidance:**\n${alert.recommendation}\n\n*Would you like me to log an official medical incident report for Dr. Priya Sharma and Earth Flight Control?*`);
          }, 600);
        }
        store.setView('ai-assistant');
      });
    });

    // Movement CTA
    const movementBtn = container.querySelector('#launch-movement-btn');
    if (movementBtn) {
      movementBtn.addEventListener('click', () => {
        soundFX.playBlip();
        store.setView('camera-analysis');
      });
    }
  }
};
