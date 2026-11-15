// AstroVital AI - Mission Telemetry & Simulation Data
// Designed for NASA Space Apps Challenge 2026
// Ares V - Mars Transit Vehicle (MTV Hab-01) - Mission Day 142 / 520

const AstroData = {
  mission: {
    id: "ARES-V-EXP-03",
    name: "Ares V Mars Transit Mission",
    vehicle: "Deep Space Habitat - MTV Hab-01",
    missionDay: 142,
    totalMissionDays: 520,
    distanceFromEarthKm: 225480000,
    oneWayLightDelaySeconds: 862, // 14m 22s
    cabinPressurePsi: 10.2,
    cabinOxygenPct: 30.1,
    cabinCo2Mmhg: 2.1,
    radiationDosimeterRate: 1.48, // microGy/hr
    orbitPhase: "Heliocentric Cruise Phase II",
    destination: "Mars - Jezero Basin Outpost Alpha"
  },

  crew: [
    {
      id: "astro-01",
      name: "Dr. Elena Rostova",
      callsign: "Astra-1",
      role: "Mission Specialist & Astrobiologist",
      avatar: "👩‍🚀",
      age: 34,
      bloodType: "O+",
      status: "OPTIMAL",
      suitId: "EVA-Mk-IV #04",
      module: "Astrobiology Lab / Node 2",
      baseline: {
        restingHeartRate: 62,
        maxHeartRate: 184,
        bloodPressure: "118/76 mmHg",
        vo2Max: "48.2 mL/kg/min",
        baselineSpO2: 98.8,
        coreTempC: 37.0,
        targetSleepHours: 8.0,
        targetExerciseKcal: 1500,
        boneMineralDensityTScore: -0.4,
        cumulativeRadiationMSv: 42.8,
        maxCareerRadiationMSv: 600.0
      },
      currentTelemetry: {
        heartRate: 72,
        heartRateStatus: "normal",
        hrvRmssd: 58,
        spO2: 98.4,
        coreTempC: 37.1,
        activeCalories: 1420,
        sleepTotalHours: 7.7,
        sleepQualityScore: 91,
        respiratoryRate: 14,
        hydrationIndex: 94, // %
        dailyCountermeasureMins: 140, // 2h 20m target completed
        evaHoursTotal: 28.5
      }
    },
    {
      id: "astro-02",
      name: "Cmdr. Marcus Vance",
      callsign: "Vanguard",
      role: "Expedition Commander & Pilot",
      avatar: "👨‍🚀",
      age: 42,
      bloodType: "A+",
      status: "MONITORING",
      suitId: "EVA-Mk-IV #01",
      module: "Command Deck / Flight Avionics",
      baseline: {
        restingHeartRate: 58,
        maxHeartRate: 178,
        bloodPressure: "120/78 mmHg",
        vo2Max: "51.0 mL/kg/min",
        baselineSpO2: 99.0,
        coreTempC: 36.9,
        targetSleepHours: 8.0,
        targetExerciseKcal: 1600,
        boneMineralDensityTScore: -0.2,
        cumulativeRadiationMSv: 51.2,
        maxCareerRadiationMSv: 600.0
      },
      currentTelemetry: {
        heartRate: 84,
        heartRateStatus: "warning",
        hrvRmssd: 42,
        spO2: 97.9,
        coreTempC: 37.3,
        activeCalories: 1580,
        sleepTotalHours: 5.8,
        sleepQualityScore: 74,
        respiratoryRate: 16,
        hydrationIndex: 88,
        dailyCountermeasureMins: 150,
        evaHoursTotal: 44.0
      }
    },
    {
      id: "astro-03",
      name: "Dr. Priya Sharma",
      callsign: "Caduceus",
      role: "Crew Medical Officer (CMO) & Systems Lead",
      avatar: "👩‍⚕️",
      age: 38,
      bloodType: "B+",
      status: "OPTIMAL",
      suitId: "EVA-Mk-IV #03",
      module: "Medical Bay / Hab Core",
      baseline: {
        restingHeartRate: 64,
        maxHeartRate: 182,
        bloodPressure: "116/74 mmHg",
        vo2Max: "46.5 mL/kg/min",
        baselineSpO2: 98.6,
        coreTempC: 37.0,
        targetSleepHours: 8.0,
        targetExerciseKcal: 1450,
        boneMineralDensityTScore: -0.3,
        cumulativeRadiationMSv: 39.4,
        maxCareerRadiationMSv: 600.0
      },
      currentTelemetry: {
        heartRate: 68,
        heartRateStatus: "normal",
        hrvRmssd: 62,
        spO2: 98.9,
        coreTempC: 37.0,
        activeCalories: 1390,
        sleepTotalHours: 8.1,
        sleepQualityScore: 94,
        respiratoryRate: 13,
        hydrationIndex: 96,
        dailyCountermeasureMins: 145,
        evaHoursTotal: 18.2
      }
    },
    {
      id: "astro-04",
      name: "Leo Tanaka",
      callsign: "Nova-Tech",
      role: "Lead Flight Engineer & Life Support",
      avatar: "👨‍💻",
      age: 31,
      bloodType: "AB-",
      status: "OPTIMAL",
      suitId: "EVA-Mk-IV #02",
      module: "ECLSS / Propulsion Ring",
      baseline: {
        restingHeartRate: 60,
        maxHeartRate: 188,
        bloodPressure: "114/72 mmHg",
        vo2Max: "53.4 mL/kg/min",
        baselineSpO2: 98.9,
        coreTempC: 36.8,
        targetSleepHours: 8.0,
        targetExerciseKcal: 1650,
        boneMineralDensityTScore: -0.1,
        cumulativeRadiationMSv: 46.1,
        maxCareerRadiationMSv: 600.0
      },
      currentTelemetry: {
        heartRate: 65,
        heartRateStatus: "normal",
        hrvRmssd: 60,
        spO2: 98.7,
        coreTempC: 36.9,
        activeCalories: 1620,
        sleepTotalHours: 7.5,
        sleepQualityScore: 89,
        respiratoryRate: 15,
        hydrationIndex: 92,
        dailyCountermeasureMins: 150,
        evaHoursTotal: 36.8
      }
    }
  ],

  // 24-Hour hourly telemetry data for Dr. Elena Rostova
  hourly24h: [
    { time: "00:00", hr: 56, baseline: 62, spo2: 98.9, temp: 36.6, hrv: 68, state: "Deep Sleep" },
    { time: "02:00", hr: 54, baseline: 62, spo2: 99.1, temp: 36.5, hrv: 72, state: "REM Sleep" },
    { time: "04:00", hr: 58, baseline: 62, spo2: 98.8, temp: 36.6, hrv: 69, state: "Light Sleep" },
    { time: "06:00", hr: 63, baseline: 62, spo2: 98.7, temp: 36.8, hrv: 64, state: "Wake & Routine" },
    { time: "08:00", hr: 78, baseline: 62, spo2: 98.5, temp: 37.0, hrv: 58, state: "Lab Research" },
    { time: "10:00", hr: 142, baseline: 62, spo2: 97.8, temp: 37.6, hrv: 34, state: "ARED Resistance Squats" },
    { time: "11:30", hr: 135, baseline: 62, spo2: 97.9, temp: 37.5, hrv: 38, state: "T2 Treadmill Session" },
    { time: "13:00", hr: 74, baseline: 62, spo2: 98.4, temp: 37.2, hrv: 55, state: "Nutrition & Rest" },
    { time: "15:00", hr: 76, baseline: 62, spo2: 98.3, temp: 37.1, hrv: 57, state: "Botany Experiment Check" },
    { time: "17:00", hr: 79, baseline: 62, spo2: 98.2, temp: 37.2, hrv: 56, state: "Crew Briefing" },
    { time: "19:00", hr: 71, baseline: 62, spo2: 98.5, temp: 37.1, hrv: 61, state: "Personal Downtime" },
    { time: "21:00", hr: 66, baseline: 62, spo2: 98.6, temp: 36.9, hrv: 64, state: "Pre-Sleep Prep" }
  ],

  // 7-day trend
  sevenDays: [
    { day: "Sol 136", avgHr: 67, sleepHrs: 7.9, kcal: 1510, spo2: 98.6, status: "Normal" },
    { day: "Sol 137", avgHr: 69, sleepHrs: 7.4, kcal: 1480, spo2: 98.5, status: "Normal" },
    { day: "Sol 138", avgHr: 74, sleepHrs: 6.8, kcal: 1620, spo2: 98.3, status: "Normal" },
    { day: "Sol 139", avgHr: 78, sleepHrs: 6.2, kcal: 1540, spo2: 98.1, status: "Warning" }, // mild fatigue
    { day: "Sol 140", avgHr: 68, sleepHrs: 8.2, kcal: 1450, spo2: 98.6, status: "Normal" },
    { day: "Sol 141", avgHr: 70, sleepHrs: 7.6, kcal: 1490, spo2: 98.5, status: "Normal" },
    { day: "Sol 142 (Today)", avgHr: 72, sleepHrs: 7.7, kcal: 1420, spo2: 98.4, status: "Normal" }
  ],

  // Sleep breakdown for today
  sleepHypnogram: {
    totalHours: 7.7,
    deepMinutes: 135, // 2h 15m (29%)
    remMinutes: 110,  // 1h 50m (24%)
    lightMinutes: 217,// 3h 37m (47%)
    awakeAwakenings: 2,
    efficiencyScore: 91,
    circadianShiftMinutes: +15, // minimal drift
    sleepSpO2Average: 98.9
  },

  // Smart Alerts
  initialAlerts: [
    {
      id: "ALT-2026-089",
      astronautId: "astro-02",
      astronautName: "Cmdr. Marcus Vance",
      level: "warning", // normal | warning | critical
      category: "Circadian Rhythm / Fatigue",
      title: "Circadian Phase Delay & Reduced Sleep Architecture",
      timestamp: "Sol 142 - 06:14 UTC",
      metric: "5.8 hrs sleep (-28% vs baseline) | HRV RMSSD: 42ms (-28%)",
      explanation: "Commander Vance exhibited an accumulated sleep deficit over consecutive duty cycles. Microgravity sleep quality is degraded with reduced slow-wave restorative sleep.",
      recommendation: "Prescribe 30-minute blue-enriched light exposure during next duty block. Reduce non-essential cognitive load. CMO review recommended.",
      status: "Open", // Open | Acknowledged | In Progress | Resolved
      acknowledgedBy: null
    },
    {
      id: "ALT-2026-088",
      astronautId: "astro-01",
      astronautName: "Dr. Elena Rostova",
      level: "normal",
      category: "Post-Exercise Adaptation",
      title: "Exercise Countermeasure Goal Achieved",
      timestamp: "Sol 142 - 11:45 UTC",
      metric: "140 min resistive/aerobic load completed (1,420 kcal)",
      explanation: "Elena completed daily ARED squats and T2 treadmill session. Heart rate recovery curve returned to baseline within 14 minutes, indicating robust cardiovascular conditioning.",
      recommendation: "Ensure 750 mL electrolyte hydration packet #2 within 45 minutes to offset fluid loss.",
      status: "Resolved",
      acknowledgedBy: "Auto-AI Protocol"
    },
    {
      id: "ALT-2026-087",
      astronautId: "astro-04",
      astronautName: "Leo Tanaka",
      level: "normal",
      category: "Radiation Dosimetry",
      title: "Daily Cosmic Radiation Exposure Nominal",
      timestamp: "Sol 142 - 08:00 UTC",
      metric: "1.48 µGy/hr | Cumulative: 46.1 mSv",
      explanation: "Active radiation shielding within MTV Hab-01 water wall perimeter functioning at 98.4% efficacy during standard galactic cosmic ray background flux.",
      recommendation: "Standard dosimeter logging continued. No storm shelter sheltering required.",
      status: "Resolved",
      acknowledgedBy: "ECLSS Telemetry"
    }
  ],

  // Pre-loaded Medical Incident Reports
  initialReports: [
    {
      id: "REP-2026-042",
      subject: "Post-EVA Orthostatic Transient Dizziness Review",
      astronautId: "astro-01",
      astronautName: "Dr. Elena Rostova",
      createdSol: 139,
      timestamp: "Sol 139 - 18:32 UTC",
      severity: "Moderate",
      symptoms: "Mild cephalic pressure, transient postural dizziness upon exiting EVA suit Mk-IV.",
      vitalsAtEvent: { hr: 98, bp: "128/84", spo2: 98.1, temp: 37.3 },
      aiPreliminaryAssessment: "Likely microgravity cephalad fluid redistribution accentuated by post-EVA suit depressurization and mild fluid deficit. No signs of decompression sickness.",
      prescribedGuidance: "Administered 650 mL isotonic electrolyte solution, 40-minute horizontal crew-quarter rest, monitored orthostatic vitals.",
      status: "Delivered to Earth", // Queued locally | Transmitting | Delivered to Earth | Closed
      flightSurgeonDirective: "Approved. Continue monitoring daily fluid intake. Repeat orthostatic stand simulation if symptoms reoccur.",
      aiAssisted: true
    },
    {
      id: "REP-2026-043",
      subject: "Cognitive Fatigue & Sleep Deprivation Trend",
      astronautId: "astro-02",
      astronautName: "Cmdr. Marcus Vance",
      createdSol: 141,
      timestamp: "Sol 141 - 22:15 UTC",
      severity: "Low-Moderate",
      symptoms: "Reported difficulty falling asleep in crew sleep pod; morning grogginess during navigation burn check.",
      vitalsAtEvent: { hr: 84, bp: "124/80", spo2: 97.9, temp: 37.2 },
      aiPreliminaryAssessment: "Circadian desynchronization related to shift scheduling. HRV RMSSD shows sympathetic overdrive consistent with chronic light sleep fragmentation.",
      prescribedGuidance: "Suggested melatonin 0.5 mg micro-dose 30 min before sleep slot; 460 nm blue light cut-off in cabin.",
      status: "Delivered to Earth",
      flightSurgeonDirective: "Acknowledged by Houston Flight Surgeon. Dr. Priya to verify sleep quarters soundproofing seals.",
      aiAssisted: true
    }
  ],

  // Pre-approved NASA Medical Safety Guidelines & AI Knowledge Base
  medicalGuidanceRules: {
    dizziness: {
      triggers: ["dizzy", "dizziness", "lightheaded", "spinning", "vertigo", "faint", "unsteady"],
      aiResponse: `**Preliminary Assessment: Microgravity Neuro-Vestibular Adaptation & Cephalad Fluid Shift**

In microgravity, the absence of hydrostatic pressure causes blood and interstitial fluids to shift toward the upper body and head (cephalad shift). This can cause transient feelings of dizziness, head fullness, or orthostatic intolerance especially after exertion or exiting suits.

**Approved First-Level Safety Protocol (NASA Flight Medicine Guidelines):**
1. **Immediate Stabilization**: Rest securely in your crew quarters. Avoid rapid rotational head movements.
2. **Hydration & Electrolytes**: Consume 500–750 mL of NASA standard electrolyte rehydration solution (Formula B) over the next 30 minutes.
3. **Telemetry Check**: Observe SpO2 and pulse rate. Ensure cabin pressure remains above 10.0 PSI.
4. **Escalation Trigger**: If dizziness is accompanied by chest pain, visual field loss (scotoma), or limb numbness, contact Crew Medical Officer Dr. Priya Sharma immediately on intercom channel Alpha.

*Safety Notice: AstroVital AI provides non-diagnostic decision support. A formal report can be logged for Flight Surgeons.*`
    },

    heartRate: {
      triggers: ["heart", "pulse", "bpm", "palpitation", "racing", "tachycardia", "fast"],
      aiResponse: `**Telemetry Review: Cardiovascular Dynamics Analysis**

Your current simulated heart rate is **72 BPM**, with a 24-hour resting baseline of **62 BPM**. Peak rate reached **142 BPM** earlier during your ARED resistance squats, which represents an appropriate physiological exertion curve (77% of theoretical VO2 max).

**Key Observations:**
- **Recovery Time**: 14 minutes to return below 80 BPM (Nominal cardiovascular resilience).
- **HRV (RMSSD)**: 58 ms indicates balanced autonomic nervous system tone.
- **Oxygenation (SpO2)**: 98.4% confirms adequate pulmonary gas exchange.

**Approved Countermeasures:**
- If you feel an unexpected spike outside of exercise, verify hydration levels (microgravity plasma volume decreases by ~10–15% in the first weeks of transit).
- Take 10 deep, controlled breaths: 4-second inhalation, 4-second hold, 6-second exhalation to stimulate vagal nerve tone.
- If palpitations persist for more than 15 minutes at rest, trigger an automated ECG telemetry capture for CMO review.`
    },

    sleep: {
      triggers: ["sleep", "tired", "fatigue", "insomnia", "woke", "exhausted", "rest"],
      aiResponse: `**Sleep Architecture & Circadian Analysis**

Last night's recorded sleep cycle: **7 Hours 42 Minutes** (Sleep Efficiency: **91%**).

**Sleep Stage Breakdown:**
- **Deep (Slow-Wave) Sleep**: 2h 15m (29%) — *Excellent physical recovery and growth hormone replenishment.*
- **REM Sleep**: 1h 50m (24%) — *Optimal cognitive memory consolidation and emotional regulation.*
- **Light Sleep**: 3h 37m (47%).
- **Awakenings**: 2 brief arousals (14 min total), common in microgravity sleeping bags.

**Circadian Alignment:**
Your diurnal core body temperature curve shows a healthy trough of 36.5°C at 02:00 UTC. Circadian drift is minimal (+15 minutes). 

**Recommendation:** Your sleep profile supports full mission duty certification today. Maintain standard 22:00 UTC cabin dimming schedule.`
    },

    recentChanges: {
      triggers: ["recent", "changes", "trend", "summary", "status", "health overview", "baseline"],
      aiResponse: `**Comprehensive 7-Day Longitudinal Health Summary (Mission Sol 136–142)**

Astronaut: **Dr. Elena Rostova** (Mission Specialist)

1. **Cardiovascular Stability**: Average resting HR has remained steady at 69 ± 3 BPM. Blood pressure estimated nominal (118/76 mmHg).
2. **Exercise Countermeasure Compliance**: 94% target adherence. Total weekly energy expenditure: 10,510 kcal across ARED and T2 treadmill protocols.
3. **Radiation Accumulation**: +10.4 µGy/day. Total cumulative mission dose: **42.8 mSv** (well below the NASA career limit of 600 mSv).
4. **Fluid & Electrolyte Balance**: Mild plasma volume compensation observed on Sol 139 following EVA-04, successfully stabilized with oral rehydration.

Overall Status: **CLASS 1 — FLIGHT NOMINAL**.`
    },

    defaultHelp: {
      aiResponse: `**AstroVital AI Medical Co-Pilot Standby**

I am continuously monitoring your biometric telemetry streams from your bio-harness, smart flight suit, and cabin ECLSS environmental sensors.

**How I can assist you right now:**
- **Explain Vital Signs**: Ask about your heart rate, sleep architecture, SpO2, or HRV.
- **Triage Symptoms**: Report symptoms like dizziness, nausea, fatigue, or muscle soreness.
- **Check Countermeasures**: Review your ARED resistance training and aerobic targets.
- **Generate Reports**: Prepare structured incident summaries for the Crew Medical Officer or Earth Flight Surgeons.

*Remember: In acute medical emergencies, immediately contact Crew Medical Officer Dr. Priya Sharma via Hab Comm Channel 1.*`
    }
  },

  // Simulated Movement Analysis exercise templates
  movementExercises: [
    {
      id: "ex-squat",
      name: "ARED Microgravity Squat Protocol",
      description: "Countermeasure against lower-body bone mineral density loss in femur and lumbar spine.",
      targetReps: 12,
      currentReps: 8,
      symmetryScore: 96,
      symmetryStatus: "Optimal (Slight left load preference)",
      rangeOfMotionDeg: 112,
      targetRomDeg: 110,
      tempoCompliancePct: 94,
      spinalAlignment: "Nominal (Lordotic curve maintained)",
      fatigueIndexPct: 14, // low fatigue
      velocityDropPct: 6.2,
      feedback: "Biomechanics nominal. Maintain heel pressure against ARED footplate during ascending phase.",
      keypoints: [
        { name: "Shoulder Left", x: 42, y: 32 },
        { name: "Shoulder Right", x: 58, y: 32 },
        { name: "Elbow Left", x: 36, y: 44 },
        { name: "Elbow Right", x: 64, y: 44 },
        { name: "Hip Left", x: 45, y: 55 },
        { name: "Hip Right", x: 55, y: 55 },
        { name: "Knee Left", x: 44, y: 72 },
        { name: "Knee Right", x: 56, y: 72 },
        { name: "Ankle Left", x: 43, y: 88 },
        { name: "Ankle Right", x: 57, y: 88 }
      ]
    },
    {
      id: "ex-treadmill",
      name: "T2 Treadmill Microgravity Gait",
      description: "Preserves cardiovascular endurance and soleus muscle elasticity using bungee harness loading.",
      targetReps: 100, // strides
      currentReps: 64,
      symmetryScore: 98,
      symmetryStatus: "Excellent bilateral balance",
      rangeOfMotionDeg: 84,
      targetRomDeg: 85,
      tempoCompliancePct: 98,
      spinalAlignment: "Nominal (Vertical posture)",
      fatigueIndexPct: 22,
      velocityDropPct: 8.5,
      feedback: "Cadence matched to 168 SPM. Harness bungee tension verified at 75% bodyweight equivalent.",
      keypoints: [
        { name: "Shoulder Left", x: 44, y: 28 },
        { name: "Shoulder Right", x: 56, y: 28 },
        { name: "Hip Left", x: 46, y: 52 },
        { name: "Hip Right", x: 54, y: 52 },
        { name: "Knee Left", x: 40, y: 68 },
        { name: "Knee Right", x: 58, y: 70 },
        { name: "Ankle Left", x: 38, y: 86 },
        { name: "Ankle Right", x: 60, y: 88 }
      ]
    },
    {
      id: "ex-deadlift",
      name: "ARED Heavy Resistive Deadlift",
      description: "Axial loading countermeasure preserving bone density in lumbar vertebrae and hip trochanter.",
      targetReps: 10,
      currentReps: 6,
      symmetryScore: 92,
      symmetryStatus: "Minor right side bar tilt (1.4°)",
      rangeOfMotionDeg: 95,
      targetRomDeg: 90,
      tempoCompliancePct: 91,
      spinalAlignment: "Good (Zero lumbar flexion under peak load)",
      fatigueIndexPct: 35,
      velocityDropPct: 16.4,
      feedback: "Ascending velocity decreasing. Cue: Drive through heels and engage latissimus dorsi.",
      keypoints: [
        { name: "Shoulder Left", x: 43, y: 38 },
        { name: "Shoulder Right", x: 57, y: 38 },
        { name: "Hip Left", x: 46, y: 60 },
        { name: "Hip Right", x: 54, y: 60 },
        { name: "Knee Left", x: 45, y: 74 },
        { name: "Knee Right", x: 55, y: 74 },
        { name: "Ankle Left", x: 44, y: 89 },
        { name: "Ankle Right", x: 56, y: 89 }
      ]
    }
  ]
};
