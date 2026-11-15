// AstroVital AI - Central State Store & Persistence Layer
// Supports LocalStorage synchronization and Delay-Tolerant Networking (DTN)

class AstroStore {
  constructor() {
    this.listeners = [];
    this.loadState();
    this.startTelemetryTick();
  }

  loadState() {
    const savedState = localStorage.getItem('astrovital_state_v1');
    let parsed = null;
    try {
      if (savedState) parsed = JSON.parse(savedState);
    } catch (e) {
      console.warn("Could not parse saved state:", e);
    }

    this.state = {
      currentView: (parsed && parsed.currentView) || 'landing',
      currentRole: (parsed && parsed.currentRole) || 'astronaut', // 'astronaut' | 'cmo' | 'earth'
      currentAstronautId: 'astro-01', // Dr. Elena Rostova
      isOffline: (parsed && typeof parsed.isOffline === 'boolean') ? parsed.isOffline : false,
      isSyncing: false,
      syncProgress: 0,
      soundEnabled: true,
      voiceEnabled: false,
      selectedExerciseId: 'ex-squat',
      isExerciseAnalyzing: true,
      alerts: (parsed && parsed.alerts) || [...AstroData.initialAlerts],
      reports: (parsed && parsed.reports) || [...AstroData.initialReports],
      pendingOfflineReports: (parsed && parsed.pendingOfflineReports) || [],
      chatMessages: (parsed && parsed.chatMessages) || [
        {
          id: 'msg-01',
          sender: 'ai',
          text: `Greetings, Dr. Rostova. I am your onboard **AstroVital AI Medical Co-Pilot** on MTV Hab-01.

Your current biometric telemetry shows **Class 1 Flight Nominal** status (Heart Rate: **72 BPM**, SpO2: **98.4%**, Sleep: **7.7 hrs**).

How are you feeling right now in microgravity? You can describe any symptoms, ask about your health baselines, or test simulated protocols.`,
          timestamp: 'Sol 142 - 08:30 UTC'
        }
      ],
      // Live simulated telemetry jitter
      liveTelemetry: {
        heartRate: 72,
        spO2: 98.4,
        coreTempC: 37.1,
        cabinPressurePsi: 10.2,
        cabinOxygenPct: 30.1,
        activeCalories: 1420,
        hrvRmssd: 58,
        ecgPhase: 0,
        anomalyActive: null // null | 'tachycardia' | 'hypoxia' | 'fatigue'
      }
    };
  }

  saveState() {
    try {
      const toSave = {
        currentView: this.state.currentView,
        currentRole: this.state.currentRole,
        isOffline: this.state.isOffline,
        alerts: this.state.alerts,
        reports: this.state.reports,
        pendingOfflineReports: this.state.pendingOfflineReports,
        chatMessages: this.state.chatMessages
      };
      localStorage.setItem('astrovital_state_v1', JSON.stringify(toSave));
    } catch (e) {
      console.warn("Failed to save to localStorage:", e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(event = {}) {
    this.saveState();
    this.listeners.forEach(fn => fn(this.state, event));
  }

  // Navigation
  setView(viewName) {
    if (this.state.currentView === viewName) return;
    this.state.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.notify({ type: 'VIEW_CHANGED', view: viewName });
  }

  // Role Switching
  setRole(role) {
    this.state.currentRole = role;
    this.notify({ type: 'ROLE_CHANGED', role });
  }

  // Sound FX
  toggleSound() {
    this.state.soundEnabled = !this.state.soundEnabled;
    this.notify({ type: 'SOUND_TOGGLED', enabled: this.state.soundEnabled });
  }

  toggleVoice() {
    this.state.voiceEnabled = !this.state.voiceEnabled;
    this.notify({ type: 'VOICE_TOGGLED', enabled: this.state.voiceEnabled });
  }

  // Offline Mode Toggle & Sync
  toggleOfflineMode() {
    if (this.state.isOffline) {
      // Reconnecting to Earth!
      this.triggerEarthReconnection();
    } else {
      // Going offline
      this.state.isOffline = true;
      this.notify({ type: 'OFFLINE_STATUS_CHANGED', isOffline: true });
    }
  }

  triggerEarthReconnection() {
    this.state.isSyncing = true;
    this.state.syncProgress = 10;
    this.notify({ type: 'SYNC_STARTED' });

    let progress = 10;
    const interval = setInterval(() => {
      progress += 25;
      this.state.syncProgress = Math.min(progress, 100);
      this.notify({ type: 'SYNC_PROGRESS', progress: this.state.syncProgress });

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.state.isOffline = false;
          this.state.isSyncing = false;

          // Process all pending reports and mark as delivered to Earth
          if (this.state.pendingOfflineReports.length > 0) {
            this.state.pendingOfflineReports.forEach(rep => {
              const existing = this.state.reports.find(r => r.id === rep.id);
              if (existing) {
                existing.status = "Delivered to Earth";
                existing.flightSurgeonDirective = "Received & Verified by Houston Flight Surgeon console following DTN reconnection.";
              }
            });
            this.state.pendingOfflineReports = [];
          }

          this.notify({ type: 'SYNC_COMPLETED' });
        }, 600);
      }
    }, 400);
  }

  // Add Health Incident Report
  createReport({ subject, symptoms, vitals, aiPreliminaryAssessment, prescribedGuidance, severity = 'Moderate' }) {
    const newReport = {
      id: `REP-2026-${String(this.state.reports.length + 43).padStart(3, '0')}`,
      subject: subject || "Biometric Anomaly Incident",
      astronautId: this.state.currentAstronautId,
      astronautName: "Dr. Elena Rostova",
      createdSol: AstroData.mission.missionDay,
      timestamp: `Sol ${AstroData.mission.missionDay} - ${new Date().toISOString().substring(11, 16)} UTC`,
      severity,
      symptoms: symptoms || "Reported physiological anomaly during routine monitoring.",
      vitalsAtEvent: vitals || { ...this.state.liveTelemetry },
      aiPreliminaryAssessment: aiPreliminaryAssessment || "Analyzed via AstroVital AI local neural inference engine.",
      prescribedGuidance: prescribedGuidance || "Approved microgravity countermeasure protocol administered.",
      status: this.state.isOffline ? "Queued locally" : "Delivered to Earth",
      flightSurgeonDirective: this.state.isOffline 
        ? "Pending uplink (Delay-Tolerant Network buffer active)." 
        : "Automated telemetry packet logged. Awaiting Flight Surgeon signature.",
      aiAssisted: true
    };

    this.state.reports.unshift(newReport);

    if (this.state.isOffline) {
      this.state.pendingOfflineReports.unshift(newReport);
    }

    this.notify({ type: 'REPORT_CREATED', report: newReport });
    return newReport;
  }

  // Flight Surgeon transmits directive to Mars
  transmitDirective(reportId, directiveText) {
    const report = this.state.reports.find(r => r.id === reportId);
    if (report) {
      report.flightSurgeonDirective = directiveText;
      report.status = "Directive Received from Earth";
      this.notify({ type: 'DIRECTIVE_TRANSMITTED', reportId, directiveText });
    }
  }

  // Alert Management
  acknowledgeAlert(alertId, acknowledgedBy = "Crew Member") {
    const alert = this.state.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = "Acknowledged";
      alert.acknowledgedBy = acknowledgedBy;
      this.notify({ type: 'ALERT_UPDATED', alertId });
    }
  }

  resolveAlert(alertId) {
    const alert = this.state.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = "Resolved";
      this.notify({ type: 'ALERT_UPDATED', alertId });
    }
  }

  // Chat message handling
  addChatMessage(sender, text) {
    const message = {
      id: `msg-${Date.now()}`,
      sender,
      text,
      timestamp: `Sol 142 - ${new Date().toISOString().substring(11, 16)} UTC`
    };
    this.state.chatMessages.push(message);
    this.notify({ type: 'CHAT_MESSAGE_ADDED', message });
    return message;
  }

  // Trigger Anomaly Simulation
  triggerAnomaly(type) {
    this.state.liveTelemetry.anomalyActive = type;

    if (type === 'tachycardia') {
      this.state.liveTelemetry.heartRate = 124;
      this.state.liveTelemetry.hrvRmssd = 26;
      this.state.liveTelemetry.coreTempC = 37.5;
      
      // Inject alert
      const alert = {
        id: `ALT-SIM-${Date.now().toString().slice(-4)}`,
        astronautId: "astro-01",
        astronautName: "Dr. Elena Rostova",
        level: "warning",
        category: "Cardiovascular / Tachycardia",
        title: "Sudden Tachycardia Spike at Rest (>120 BPM)",
        timestamp: "Just Now",
        metric: "Heart Rate: 124 BPM (+100% vs baseline) | RMSSD: 26ms",
        explanation: "Sustained resting heart rate exceeding physiological flight envelope. No concurrent physical exercise recorded on ARED or T2.",
        recommendation: "Cease strenuous tasks. Seat in crew rest station, begin deep breathing protocol, and check SpO2.",
        status: "Open",
        acknowledgedBy: null
      };
      this.state.alerts.unshift(alert);

    } else if (type === 'hypoxia') {
      this.state.liveTelemetry.spO2 = 91.2;
      this.state.liveTelemetry.cabinOxygenPct = 21.4;
      this.state.liveTelemetry.heartRate = 96;

      const alert = {
        id: `ALT-SIM-${Date.now().toString().slice(-4)}`,
        astronautId: "astro-01",
        astronautName: "Dr. Elena Rostova",
        level: "critical",
        category: "Pulmonary / Environmental Hypoxia",
        title: "Desaturation Event Detected (SpO2: 91.2%)",
        timestamp: "Just Now",
        metric: "SpO2: 91.2% | Local Cabin O2: 21.4%",
        explanation: "Acute drop in peripheral arterial oxygen saturation below NASA flight threshold (94%). Potential microgravity localized CO2 pocket or oxygen feed valve fluctuation.",
        recommendation: "Don emergency portable breathing mask. Move immediately to Hab Core Node 1. Notify Dr. Priya Sharma.",
        status: "Open",
        acknowledgedBy: null
      };
      this.state.alerts.unshift(alert);

    } else if (type === 'fatigue') {
      this.state.liveTelemetry.hrvRmssd = 31;
      this.state.liveTelemetry.heartRate = 82;

      const alert = {
        id: `ALT-SIM-${Date.now().toString().slice(-4)}`,
        astronautId: "astro-01",
        astronautName: "Dr. Elena Rostova",
        level: "warning",
        category: "Cognitive & Physical Fatigue",
        title: "Autonomic Nervous System Recovery Deficit",
        timestamp: "Just Now",
        metric: "HRV RMSSD: 31ms (-47% from 30-day mean)",
        explanation: "Sympathetic nervous system dominance indicates cumulative microgravity fatigue and incomplete physiological recovery.",
        recommendation: "Reduce scheduled EVA simulator workload by 50%. Enforce 30-minute quiet reflection in sleep module.",
        status: "Open",
        acknowledgedBy: null
      };
      this.state.alerts.unshift(alert);

    } else {
      // Return to nominal
      this.state.liveTelemetry.heartRate = 72;
      this.state.liveTelemetry.spO2 = 98.4;
      this.state.liveTelemetry.coreTempC = 37.1;
      this.state.liveTelemetry.hrvRmssd = 58;
      this.state.liveTelemetry.cabinOxygenPct = 30.1;
      this.state.liveTelemetry.anomalyActive = null;
    }

    this.notify({ type: 'ANOMALY_TRIGGERED', anomaly: type });
  }

  // Periodic Telemetry Simulation Heartbeat
  startTelemetryTick() {
    setInterval(() => {
      if (!this.state.liveTelemetry.anomalyActive) {
        // Natural subtle realistic drift
        const jitter = (Math.random() - 0.5) * 2;
        this.state.liveTelemetry.heartRate = Math.round(Math.max(68, Math.min(76, 72 + jitter)));
        this.state.liveTelemetry.spO2 = +(98.4 + (Math.random() - 0.5) * 0.4).toFixed(1);
      }
      this.notify({ type: 'TELEMETRY_TICK', live: this.state.liveTelemetry });
    }, 2500);
  }
}

// Global store instance
const store = new AstroStore();
