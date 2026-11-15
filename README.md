# AstroVital AI 🚀
### Intelligent Astronaut Health Monitoring & AI-Powered Medical Assistance
**NASA Space Apps Challenge 2026 Prototype**

---

## 🌟 Project Overview

**AstroVital AI** is an autonomous, interplanetary astronaut health monitoring and clinical decision-support platform designed for deep-space exploration, specifically human transit missions to **Mars** aboard the *Ares V* Deep Space Habitat (*MTV Hab-01*).

During a 500+ day mission to Mars, radio signals take between **4 and 24 minutes** to travel one-way between Mars and Earth, and periodic solar conjunctions block radio communication entirely. Astronauts cannot rely on real-time telemedicine from Earth.

AstroVital AI bridges this gap through:
1. **Continuous Wearable Telemetry**: Non-invasive monitoring of lead-II ECG, SpO2, core temperature, and HRV.
2. **Autonomous Edge AI Triage**: Real-time onboard neural evaluation against each astronaut's personal baseline.
3. **Conversational Medical Co-Pilot**: Safe, non-diagnostic symptom checking and approved NASA countermeasure protocols.
4. **Biomechanical Computer Vision Analysis**: Pose estimation tracking for exercise countermeasures (ARED squats and T2 treadmill).
5. **Delay-Tolerant Networking (DTN) Offline Mode**: Full autonomous operation during communication blackouts with automated re-synchronization.
6. **Multi-Tier Dashboards**: Unified interface connecting Astronauts, Onboard Crew Medical Officers, and Terrestrial Flight Surgeons at NASA Mission Control in Houston.

> **DEMO DISCLAIMER**: This is a prototype system developed for the NASA Space Apps Challenge 2026. All physiological telemetry and medical events are simulated demonstration data. AstroVital AI provides non-diagnostic decision support and does not replace certified aerospace flight surgeons.

---

## 🎨 Visual Identity & Color Palette

Built to NASA aerospace standards with a futuristic, elegant design system:
- **Deep Space Navy**: `#080D24` (Primary background)
- **Midnight Blue**: `#101A3A` (Elevated surfaces)
- **Cosmic Purple**: `#7657D6` (Primary accent)
- **Soft Lavender**: `#B8A4FF` (Secondary text and subtle borders)
- **Elegant Pink**: `#F2A6D8` (Feminine, sophisticated accent)
- **Electric Cyan**: `#62DDF5` (High-contrast telemetry & active status)
- **Starlight White**: `#F7F7FF` (Crisp typography)

---

## 🧭 Navigation & Core Modules

1. **Home (Landing Page)**: Hero section, 6-step illustrated system architecture, core features, and Mars deep-space health challenge breakdown.
2. **Astronaut Dashboard**: Personal health hub for Dr. Elena Rostova. Includes a 60 FPS dynamic Canvas ECG lead-II monitor, 24-hour and 7-day interactive trend curves vs. personal baseline, active smart alerts, and clinical profile.
3. **AI Health Assistant ("AstroVital AI Core")**: Interactive medical HUD chatbot. Features prompt chips, symptom triage, live telemetry cross-referencing, approved NASA first-level countermeasures, and one-click Health Incident Report generation.
4. **Crew Dashboard**: Station-wide medical console for Crew Medical Officer Dr. Priya Sharma. Real-time telemetry grid of all 4 crew members, alert acknowledgment workflow, and incident triage queue.
5. **Earth Medical Dashboard**: Houston Mission Control (MCC-H) console. Real-time 14m 22s light delay indicator, downlinked telemetry matrix, AI longitudinal clinical synthesis, and interactive medical directive uplink.
6. **Camera Movement Analysis**: Computer vision pose estimation visualizer. Displays skeletal keypoints, bilateral symmetry score (96%), joint range of motion (112°), and eccentric muscular fatigue tracking.
7. **About Page**: NASA Space Apps Challenge briefing, Human Research Program (HRP) alignment, technical architecture, and simulated vs. real capability audit table.

---

## 🚀 How to Run the Application

The application is completely self-contained with **zero external CDN dependencies**, allowing it to run 100% offline in air-gapped or sandboxed environments.

### Option 1: Direct Browser Launch
Open the file directly in any modern browser (Chrome, Edge, Firefox, Safari):
```powershell
Start-Process "C:\Users\khluo\.gemini\antigravity\scratch\astrovital-ai\index.html"
```

### Option 2: Run via Python Server
```powershell
cd C:\Users\khluo\.gemini\antigravity\scratch\astrovital-ai
python server.py
# Open http://localhost:8080 in your browser
```

### Option 3: Run via Node.js Server
```powershell
cd C:\Users\khluo\.gemini\antigravity\scratch\astrovital-ai
node server.js
# Open http://localhost:8080 in your browser
```

---

## ⌨️ Interactive Demo Controls & Keyboard Shortcuts

- **Inject Anomaly Dropdown** (Top Nav): Trigger simulated *Tachycardia (>120 BPM)*, *Cabin Hypoxia (SpO2: 91%)*, or *Circadian Sleep Deficit* to watch the entire dashboard, ECG waveform, alerts, and AI assistant react in real time.
- **Earth Link Toggle** (Top Nav): Switch between *Online (14m Delay)* and *Offline (Blackout)*. Generate reports offline to see them buffer in local storage, then restore the link to watch the animated DTN synchronization progress bar.
- **Role Switcher** (Top Nav): Instantly jump between *Astronaut (Dr. Elena)*, *Medical Officer (Dr. Priya)*, and *Flight Surgeon (Houston)*.
- **Keyboard Shortcuts**:
  - `1` - Home
  - `2` - Astronaut Dashboard
  - `3` - AI Co-Pilot
  - `4` - Crew Dashboard
  - `5` - Earth Medical
  - `6` - Movement Analysis
  - `7` - About Page
  - `O` - Toggle Deep-Space Offline Mode
  - `M` - Toggle Sound Effects

---

## 🔬 Scientific & Technical Audit

| Feature | Implementation Mechanism | Simulated vs. Real Logic |
| :--- | :--- | :--- |
| **Real-Time ECG Monitor** | HTML5 Canvas P-Q-R-S-T vector waveform engine | Real 60 FPS canvas calculation; BPM driven by physiological simulation |
| **AI Conversational Engine** | Rule-based triage cross-referenced with live sensor state | Real NLP symptom evaluation; NASA Flight Medicine safety guidance |
| **DTN Offline Sync** | Persistent LocalStorage state machine + batch synchronization | Real local buffering, queue management, and re-sync progress animation |
| **Movement Pose Tracking** | 12-keypoint Canvas skeletal kinematic generator | Real joint angle, symmetry, and eccentric velocity fatigue calculation |
| **Sound Synthesizer** | Web Audio API Oscillator & Gain nodes | Real native browser audio synthesis (no MP3/WAV files required) |

Developed with ❤️ for the **NASA Space Apps Challenge 2026**.
