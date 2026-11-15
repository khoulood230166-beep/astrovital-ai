// AstroVital AI - Core Application Controller
// NASA Space Apps Challenge 2026

class AstroApp {
  constructor() {
    this.viewContainer = document.getElementById('view-container');
    this.currentViewInstance = null;

    this.init();
  }

  init() {
    try {
      // 1. Initialize background Starfield
      new Starfield('starfield-canvas');

      // 2. Initialize Navigation Bar
      new Navbar('navbar-root');

      // 3. Initialize Offline/Sync Banner
      new OfflineBanner('offline-banner-root');

      // 4. Render Initial View
      this.renderCurrentView();

      // 5. Subscribe to state changes
      store.subscribe((state, event) => {
        if (event.type === 'VIEW_CHANGED' || event.type === 'RENDER_VIEW') {
          this.renderCurrentView();
        } else if (event.type === 'TELEMETRY_TICK') {
          this.updateLiveIndicators(state.liveTelemetry);
        }
      });

      // 6. Bind Global Keyboard Shortcuts
      this.bindKeyboardShortcuts();

      console.log("🚀 AstroVital AI Initialized. System Nominal. Sol 142.");
    } catch (err) {
      console.error("Critical error during AstroVital initialization:", err);
      if (this.viewContainer) {
        this.viewContainer.innerHTML = `
          <div style="padding: 40px; text-align: center; color: #ff6b81;">
            <h2>System Initialization Notice</h2>
            <p>${err.message}</p>
          </div>
        `;
      }
    }
  }

  renderCurrentView() {
    if (!this.viewContainer) return;
    const currentView = store.state.currentView;

    let viewHtml = '';
    let viewModule = null;

    switch (currentView) {
      case 'landing':
        viewHtml = LandingView.render();
        viewModule = LandingView;
        break;
      case 'astronaut':
        viewHtml = AstronautDashboardView.render();
        viewModule = AstronautDashboardView;
        break;
      case 'ai-assistant':
        viewHtml = AIAssistantView.render();
        viewModule = AIAssistantView;
        break;
      case 'crew':
        viewHtml = CrewDashboardView.render();
        viewModule = CrewDashboardView;
        break;
      case 'earth':
        viewHtml = EarthMedicalView.render();
        viewModule = EarthMedicalView;
        break;
      case 'camera-analysis':
        viewHtml = CameraAnalysisView.render();
        viewModule = CameraAnalysisView;
        break;
      case 'about':
        viewHtml = AboutView.render();
        viewModule = AboutView;
        break;
      default:
        viewHtml = LandingView.render();
        viewModule = LandingView;
    }

    // Direct render with smooth transition
    this.viewContainer.style.opacity = '0';
    this.viewContainer.style.transform = 'translateY(6px)';
    this.viewContainer.style.transition = 'opacity 0.18s ease, transform 0.18s ease';

    setTimeout(() => {
      this.viewContainer.innerHTML = viewHtml;
      if (viewModule && typeof viewModule.bindEvents === 'function') {
        viewModule.bindEvents(this.viewContainer);
      }
      this.currentViewInstance = viewModule;

      this.viewContainer.style.opacity = '1';
      this.viewContainer.style.transform = 'translateY(0)';
    }, 50);
  }

  updateLiveIndicators(live) {
    const hrElements = document.querySelectorAll('.live-hr-val');
    hrElements.forEach(el => {
      el.textContent = live.heartRate;
    });

    const spo2Elements = document.querySelectorAll('.live-spo2-val');
    spo2Elements.forEach(el => {
      el.textContent = live.spO2;
    });
  }

  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }

      if (e.key === '1') store.setView('landing');
      if (e.key === '2') store.setView('astronaut');
      if (e.key === '3') store.setView('ai-assistant');
      if (e.key === '4') store.setView('crew');
      if (e.key === '5') store.setView('earth');
      if (e.key === '6') store.setView('camera-analysis');
      if (e.key === '7') store.setView('about');
      if (e.key.toLowerCase() === 'o') store.toggleOfflineMode();
      if (e.key.toLowerCase() === 'm') store.toggleSound();
    });
  }
}

// Ensure execution whether DOM is already loaded or still loading
function bootstrapAstroVital() {
  if (!window.app) {
    window.app = new AstroApp();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapAstroVital);
} else {
  bootstrapAstroVital();
}
