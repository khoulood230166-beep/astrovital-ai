// AstroVital AI - Autonomous Onboard Medical Co-Pilot
// Interactive Chatbot with Biometric Telemetry Cross-Referencing & Report Generation

const AIAssistantView = {
  isTyping: false,

  render() {
    const s = store.state;
    const live = s.liveTelemetry;

    return `
      <div class="ai-assistant-page container" style="padding: 28px 24px 60px; max-width: 1200px;">
        
        <!-- TOP SAFETY & PROTOCOL HEADER BANNER -->
        <div class="glass-panel" style="padding: 16px 22px; margin-bottom: 20px; border-left: 4px solid var(--electric-cyan); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; background: rgba(16, 26, 58, 0.85);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(98, 221, 245, 0.15); display: flex; align-items: center; justify-content: center; color: var(--electric-cyan);">
              ${Icons.stethoscope('', 20)}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <strong style="color: #ffffff; font-size: 0.95rem;">AstroVital AI Medical Co-Pilot</strong>
                <span class="badge badge-cyan" style="font-size: 0.65rem;">NASA ExMC Protocol</span>
                <span class="badge ${s.isOffline ? 'badge-warning' : 'badge-nasa'}" style="font-size: 0.65rem;">
                  ${s.isOffline ? '100% LOCAL EDGE MODE' : 'EARTH-SYNCED'}
                </span>
              </div>
              <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 2px;">
                Autonomous non-diagnostic decision support system for Mars transit missions. Uses simulated biometric telemetry.
              </div>
            </div>
          </div>

          <!-- Quick Telemetry Glance in Header -->
          <div style="display: flex; gap: 16px; font-size: 0.8rem;" class="mono">
            <div>HR: <strong style="color: ${live.heartRate > 100 ? '#ff4757' : 'var(--electric-cyan)'};">${live.heartRate} BPM</strong></div>
            <div>SpO2: <strong style="color: ${live.spO2 < 94 ? '#ff4757' : 'var(--soft-lavender)'};">${live.spO2}%</strong></div>
            <div>Temp: <strong style="color: var(--elegant-pink);">${live.coreTempC}°C</strong></div>
          </div>
        </div>

        <!-- MAIN CHAT CONTAINER -->
        <div class="glass-panel chat-window" style="border: 1px solid rgba(184, 164, 255, 0.25);">
          
          <!-- Chat Message Feed -->
          <div class="chat-messages" id="chat-messages-box">
            ${s.chatMessages.map(msg => this.renderMessage(msg)).join('')}
            
            ${this.isTyping ? `
              <div class="chat-bubble ai" style="display: flex; align-items: center; gap: 8px; width: fit-content;">
                <span class="pulse-dot pulse-dot-cyan"></span>
                <span style="font-size: 0.85rem; color: var(--text-muted);">AstroVital AI is evaluating telemetry & clinical knowledge base...</span>
              </div>
            ` : ''}
          </div>

          <!-- SUGGESTED QUESTION CHIPS -->
          <div style="padding: 12px 24px; border-top: 1px solid var(--border-subtle); background: rgba(8, 13, 36, 0.75); display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none;">
            <button class="btn btn-outline btn-sm prompt-chip" data-prompt="Why is my heart rate higher than usual?">
              ${Icons.heart('', 14)} <span>Why is my heart rate higher?</span>
            </button>
            <button class="btn btn-outline btn-sm prompt-chip" data-prompt="How was my sleep last night?">
              ${Icons.moon('', 14)} <span>How was my sleep?</span>
            </button>
            <button class="btn btn-outline btn-sm prompt-chip" data-prompt="I feel dizzy. What should I do?">
              ${Icons.alertTriangle('', 14)} <span>I feel dizzy. What should I do?</span>
            </button>
            <button class="btn btn-outline btn-sm prompt-chip" data-prompt="Show me my recent health changes.">
              ${Icons.activity('', 14)} <span>Recent health changes</span>
            </button>
            <button class="btn btn-outline btn-sm prompt-chip" data-prompt="Prepare a health incident report for Earth Flight Surgeons.">
              ${Icons.fileText('', 14)} <span>Generate Incident Report</span>
            </button>
          </div>

          <!-- INPUT FORM -->
          <form id="chat-form" style="padding: 18px 24px; border-top: 1px solid var(--border-subtle); display: flex; gap: 12px; background: rgba(16, 26, 58, 0.95); align-items: center;">
            <input 
              type="text" 
              id="chat-input" 
              placeholder="Describe symptoms, ask about health baselines, or request safety guidance..."
              autocomplete="off"
              style="flex: 1; background: rgba(8, 13, 36, 0.8); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px 18px; color: #ffffff; font-size: 0.93rem; outline: none; transition: border-color 0.2s;"
            />
            
            <button type="submit" class="btn btn-primary" style="padding: 12px 22px;">
              <span>Send</span> ${Icons.send('', 16)}
            </button>
          </form>

        </div>

        <!-- SAFETY WARNING FOOTER -->
        <div style="margin-top: 14px; text-align: center; font-size: 0.76rem; color: var(--text-dim);">
          ${Icons.shield('', 12)} Medical Disclaimer: AstroVital AI provides decision-support insights derived from simulated telemetry. It does not replace onboard medical officers or certified flight surgeons.
        </div>

      </div>
    `;
  },

  renderMessage(msg) {
    const isUser = msg.sender === 'user';
    const formattedText = this.formatMarkdown(msg.text);

    return `
      <div class="chat-bubble ${isUser ? 'user' : 'ai'}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 0.72rem; color: ${isUser ? 'rgba(255,255,255,0.7)' : 'var(--text-dim)'};" class="mono">
          <span>${isUser ? 'ASTRONAUT (Dr. Elena Rostova)' : 'ASTROVITAL AI CORE'}</span>
          <span>${msg.timestamp}</span>
        </div>
        <div style="color: #ffffff; font-size: 0.92rem; line-height: 1.65;">
          ${formattedText}
        </div>

        <!-- In-Chat Action: If AI message contains report option, render one-click generator button -->
        ${!isUser && msg.text.toLowerCase().includes('report') ? `
          <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; gap: 10px;">
            <button class="btn btn-cyan btn-sm gen-report-btn" data-msg="${encodeURIComponent(msg.text)}">
              ${Icons.fileText('', 14)} <span>Create Official Health Incident Report</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;
  },

  formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n- /g, '<br/>• ')
      .replace(/\n1\. /g, '<br/>1. ')
      .replace(/\n2\. /g, '<br/>2. ')
      .replace(/\n3\. /g, '<br/>3. ')
      .replace(/\n4\. /g, '<br/>4. ');
  },

  handleUserSubmit(text) {
    if (!text.trim()) return;
    soundFX.playPulse();

    // Add user message
    store.addChatMessage('user', text);

    this.isTyping = true;
    const sBox = document.getElementById('chat-messages-box');
    if (sBox) sBox.scrollTop = sBox.scrollHeight;

    // Simulate AI inference delay (500-800ms)
    setTimeout(() => {
      this.isTyping = false;
      const response = this.generateAIResponse(text);
      soundFX.playBlip();
      store.addChatMessage('ai', response);

      // Optional text-to-speech if voice is enabled
      if (store.state.voiceEnabled && 'speechSynthesis' in window) {
        try {
          const clean = response.replace(/[*#]/g, '');
          const utter = new SpeechSynthesisUtterance(clean.substring(0, 200));
          window.speechSynthesis.speak(utter);
        } catch (e) {}
      }

      const box = document.getElementById('chat-messages-box');
      if (box) box.scrollTop = box.scrollHeight;
    }, 650);
  },

  generateAIResponse(userInput) {
    const lower = userInput.toLowerCase();
    const live = store.state.liveTelemetry;

    // Dizziness / Orthostatic / Fluid shift
    if (AstroData.medicalGuidanceRules.dizziness.triggers.some(t => lower.includes(t))) {
      return AstroData.medicalGuidanceRules.dizziness.aiResponse;
    }

    // Heart rate / palpitations / tachycardia
    if (AstroData.medicalGuidanceRules.heartRate.triggers.some(t => lower.includes(t))) {
      if (live.heartRate > 105) {
        return `**CRITICAL TELEMETRY OBSERVATION: Elevated Heart Rate Detected**

Your real-time sensor stream currently indicates a heart rate of **${live.heartRate} BPM** (exceeding your resting baseline of 62 BPM by +${live.heartRate - 62} BPM). 

**Immediate Assessment:**
- Autonomic HRV (RMSSD) is depressed at **${live.hrvRmssd} ms**, reflecting elevated sympathetic arousal.
- SpO2 is **${live.spO2}%**, ruling out acute pulmonary hypoxia.
- Core temperature is **${live.coreTempC}°C**.

**First-Level Countermeasure Steps:**
1. Stop all physical exertion immediately. Sit or secure yourself in your private sleeping quarters.
2. Inhale slowly for 4 seconds, hold for 4 seconds, and exhale for 6 seconds (vagal nerve stimulation).
3. Hydrate with 500 mL electrolyte solution (Formula B).
4. If this feeling is accompanied by chest tightness, radiating pain, or shortness of breath, press your emergency comm badge to summon Crew Medical Officer Dr. Priya Sharma.

*Would you like me to create an official Incident Report to transmit to Earth Mission Control?*`;
      }
      return AstroData.medicalGuidanceRules.heartRate.aiResponse;
    }

    // Sleep / fatigue
    if (AstroData.medicalGuidanceRules.sleep.triggers.some(t => lower.includes(t))) {
      return AstroData.medicalGuidanceRules.sleep.aiResponse;
    }

    // Recent changes / trends
    if (AstroData.medicalGuidanceRules.recentChanges.triggers.some(t => lower.includes(t))) {
      return AstroData.medicalGuidanceRules.recentChanges.aiResponse;
    }

    // Incident report request
    if (lower.includes('report') || lower.includes('incident') || lower.includes('flight surgeon')) {
      return `**Automated Health Incident Report Ready for Generation**

Based on your current telemetry on Sol 142 (Heart Rate: **${live.heartRate} BPM**, SpO2: **${live.spO2}%**, Sleep: **7.7h**, HRV: **${live.hrvRmssd}ms**):

I can immediately generate a structured NASA Health Incident Report packet. It will:
1. Log telemetry waveforms and time-stamped physiological parameters.
2. Alert Crew Medical Officer Dr. Priya Sharma on Hab-01.
3. Queue into the Delay-Tolerant Network buffer for transmission to the Earth Flight Surgeon team in Houston.

*Click the button below to generate and dispatch the official report.*`;
    }

    // Fallback general guidance
    return `**AstroVital AI Medical Co-Pilot Standby**

I analyzed your query: *"I noted your query regarding your condition."*

**Current Bio-Telemetry Cross-Reference:**
- Heart Rate: **${live.heartRate} BPM** (Baseline: 62 BPM)
- Oxygenation (SpO2): **${live.spO2}%** (Nominal)
- Core Temperature: **${live.coreTempC}°C**
- Sleep Score: **91/100** (Sol 142)

**Guidance:**
No acute life-threatening anomalies detected in the sensor matrix. Please observe standard hydration and daily 2.5-hour ARED countermeasure protocols.

If you are experiencing pain, visual disturbances, or discomfort, please describe the specific symptom or contact Dr. Priya Sharma in the Hab Core Medical Bay.`;
  },

  bindEvents(container) {
    const form = container.querySelector('#chat-form');
    const input = container.querySelector('#chat-input');
    const messagesBox = container.querySelector('#chat-messages-box');

    // Scroll to bottom initially
    if (messagesBox) {
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value;
        input.value = '';
        this.handleUserSubmit(text);
      });
    }

    // Quick prompt chips
    container.querySelectorAll('.prompt-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.currentTarget.getAttribute('data-prompt');
        this.handleUserSubmit(text);
      });
    });

    // In-chat generate report button
    container.querySelectorAll('.gen-report-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        soundFX.playTransmit();
        const rep = store.createReport({
          subject: "Symptom Triage & Biometric Incident Report",
          symptoms: "Reported symptoms triaged via AstroVital AI Co-Pilot interface.",
          severity: store.state.liveTelemetry.heartRate > 100 ? "High" : "Moderate"
        });

        store.addChatMessage('ai', `✅ **Official Health Incident Report ${rep.id} Created!**\n\n- **Subject**: ${rep.subject}\n- **Transmission Status**: ${rep.status}\n- **Delivery**: ${store.state.isOffline ? 'Queued in Mars Hab buffer (DTN Uplink Pending)' : 'Delivered to Earth Flight Surgeon console'}\n\nYou can review this report in the **Crew Hab** or **Earth Control** dashboard.`);
      });
    });
  }
};
