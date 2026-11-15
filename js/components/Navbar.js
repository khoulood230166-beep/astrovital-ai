// AstroVital AI - Futuristic Mission Navigation Bar

class Navbar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.mobileMenuOpen = false;
    this.render();
    this.bindEvents();

    store.subscribe(() => {
      this.render();
      this.bindEvents();
    });
  }

  render() {
    if (!this.container) return;
    const s = store.state;
    const isOff = s.isOffline;
    const pendingCount = s.pendingOfflineReports.length;

    this.container.innerHTML = `
      <nav class="navbar">
        <div class="navbar-container">
          <!-- Brand -->
          <div class="nav-brand" id="nav-brand-btn">
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, rgba(118, 87, 214, 0.4) 0%, rgba(98, 221, 245, 0.3) 100%); border: 1px solid rgba(98, 221, 245, 0.5); box-shadow: 0 0 15px rgba(98, 221, 245, 0.25);">
              <span style="color: var(--electric-cyan);">${Icons.orbit('', 22)}</span>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-weight: 800; font-size: 1.15rem; letter-spacing: -0.01em;" class="text-gradient">AstroVital AI</span>
                <span class="badge badge-nasa" style="font-size: 0.65rem; padding: 2px 7px;">NASA 2026</span>
              </div>
              <div style="font-size: 0.7rem; color: var(--text-dim);" class="mono">ARES V • HAB-01 • SOL 142</div>
            </div>
          </div>

          <!-- Navigation Links -->
          <ul class="nav-links">
            <li>
              <button class="nav-link ${s.currentView === 'landing' ? 'active' : ''}" data-view="landing">
                ${Icons.compass('', 16)} <span>Home</span>
              </button>
            </li>
            <li>
              <button class="nav-link ${s.currentView === 'astronaut' ? 'active' : ''}" data-view="astronaut">
                ${Icons.user('', 16)} <span>Astronaut</span>
              </button>
            </li>
            <li>
              <button class="nav-link ${s.currentView === 'ai-assistant' ? 'active' : ''}" data-view="ai-assistant">
                <span style="color: var(--elegant-pink);">${Icons.sparkles('', 16)}</span> <span>AI Co-Pilot</span>
              </button>
            </li>
            <li>
              <button class="nav-link ${s.currentView === 'crew' ? 'active' : ''}" data-view="crew">
                ${Icons.users('', 16)} <span>Crew Hab</span>
              </button>
            </li>
            <li>
              <button class="nav-link ${s.currentView === 'earth' ? 'active' : ''}" data-view="earth">
                ${Icons.globe('', 16)} <span>Earth Control</span>
              </button>
            </li>
            <li>
              <button class="nav-link ${s.currentView === 'camera-analysis' ? 'active' : ''}" data-view="camera-analysis">
                ${Icons.camera('', 16)} <span>Movement AI</span>
              </button>
            </li>
            <li>
              <button class="nav-link ${s.currentView === 'about' ? 'active' : ''}" data-view="about">
                ${Icons.info('', 16)} <span>About</span>
              </button>
            </li>
          </ul>

          <!-- Action Controls & Status -->
          <div style="display: flex; align-items: center; gap: 10px;">
            <!-- Simulation Injector Dropdown -->
            <div style="position: relative;">
              <select id="anomaly-select" style="background: rgba(16, 26, 58, 0.9); border: 1px solid var(--border-subtle); color: var(--soft-lavender); padding: 5px 10px; border-radius: var(--radius-sm); font-size: 0.78rem; outline: none; cursor: pointer;">
                <option value="">⚡ Inject Anomaly</option>
                <option value="tachycardia">Tachycardia (>120 BPM)</option>
                <option value="hypoxia">Cabin Hypoxia (SpO2: 91%)</option>
                <option value="fatigue">Circadian Sleep Deficit</option>
                <option value="nominal">✅ Nominal Baseline</option>
              </select>
            </div>

            <!-- Offline Mode Toggle Button -->
            <button id="offline-toggle-btn" class="offline-toggle-btn ${isOff ? 'offline' : 'online'}" title="Toggle Mars Deep-Space Communication Link">
              ${isOff ? Icons.wifiOff('', 15) : Icons.wifi('', 15)}
              <span>${isOff ? `OFFLINE (${pendingCount} Queued)` : 'EARTH LINK (14m)'}</span>
            </button>

            <!-- Role Selector Pill -->
            <div style="position: relative;">
              <select id="role-select" style="background: rgba(22, 32, 68, 0.85); border: 1px solid rgba(184, 164, 255, 0.3); color: var(--starlight-white); padding: 5px 10px; border-radius: var(--radius-sm); font-size: 0.78rem; outline: none; cursor: pointer;">
                <option value="astronaut" ${s.currentRole === 'astronaut' ? 'selected' : ''}>Astronaut (Elena)</option>
                <option value="cmo" ${s.currentRole === 'cmo' ? 'selected' : ''}>Medical Officer (Priya)</option>
                <option value="earth" ${s.currentRole === 'earth' ? 'selected' : ''}>Flight Surgeon (Earth)</option>
              </select>
            </div>

            <!-- Sound FX Toggle -->
            <button id="sound-btn" class="btn btn-outline btn-sm" style="padding: 6px 9px;" title="Toggle UI Sound Effects">
              ${s.soundEnabled ? Icons.volume2('', 16) : Icons.volumeX('', 16)}
            </button>

            <!-- Mobile Hamburger Toggle -->
            <button id="mobile-hamburger" class="btn btn-outline btn-sm mobile-menu-btn" style="padding: 6px 10px;">
              ${Icons.activity('', 18)}
            </button>
          </div>
        </div>

        <!-- Mobile Drawer Menu -->
        ${this.mobileMenuOpen ? `
          <div style="background: rgba(8, 13, 36, 0.98); border-top: 1px solid var(--border-subtle); padding: 16px 24px; display: flex; flex-direction: column; gap: 8px;">
            <button class="nav-link ${s.currentView === 'landing' ? 'active' : ''}" data-view="landing">${Icons.compass('', 16)} Home</button>
            <button class="nav-link ${s.currentView === 'astronaut' ? 'active' : ''}" data-view="astronaut">${Icons.user('', 16)} Astronaut Dashboard</button>
            <button class="nav-link ${s.currentView === 'ai-assistant' ? 'active' : ''}" data-view="ai-assistant">${Icons.sparkles('', 16)} AI Health Assistant</button>
            <button class="nav-link ${s.currentView === 'crew' ? 'active' : ''}" data-view="crew">${Icons.users('', 16)} Crew Dashboard</button>
            <button class="nav-link ${s.currentView === 'earth' ? 'active' : ''}" data-view="earth">${Icons.globe('', 16)} Earth Medical</button>
            <button class="nav-link ${s.currentView === 'camera-analysis' ? 'active' : ''}" data-view="camera-analysis">${Icons.camera('', 16)} Movement Analysis</button>
            <button class="nav-link ${s.currentView === 'about' ? 'active' : ''}" data-view="about">${Icons.info('', 16)} About Project</button>
          </div>
        ` : ''}
      </nav>
    `;
  }

  bindEvents() {
    // Nav buttons
    this.container.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.getAttribute('data-view');
        soundFX.playBlip();
        store.setView(view);
        this.mobileMenuOpen = false;
      });
    });

    const brandBtn = this.container.querySelector('#nav-brand-btn');
    if (brandBtn) {
      brandBtn.addEventListener('click', () => {
        soundFX.playBlip();
        store.setView('landing');
      });
    }

    // Role switcher
    const roleSelect = this.container.querySelector('#role-select');
    if (roleSelect) {
      roleSelect.addEventListener('change', (e) => {
        soundFX.playPulse();
        const role = e.target.value;
        store.setRole(role);
        if (role === 'astronaut') store.setView('astronaut');
        if (role === 'cmo') store.setView('crew');
        if (role === 'earth') store.setView('earth');
      });
    }

    // Offline mode toggle
    const offlineBtn = this.container.querySelector('#offline-toggle-btn');
    if (offlineBtn) {
      offlineBtn.addEventListener('click', () => {
        soundFX.playTransmit();
        store.toggleOfflineMode();
      });
    }

    // Anomaly simulation
    const anomalySelect = this.container.querySelector('#anomaly-select');
    if (anomalySelect) {
      anomalySelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (!val) return;
        soundFX.playAlert();
        store.triggerAnomaly(val);
        e.target.value = '';
      });
    }

    // Sound toggle
    const soundBtn = this.container.querySelector('#sound-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        store.toggleSound();
      });
    }

    // Mobile menu toggle
    const mobileBtn = this.container.querySelector('#mobile-hamburger');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        this.render();
        this.bindEvents();
      });
    }
  }
}
