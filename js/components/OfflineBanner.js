// AstroVital AI - Deep Space Communication & DTN Offline Synchronization Banner

class OfflineBanner {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.render();
    store.subscribe(() => this.render());
  }

  render() {
    if (!this.container) return;
    const s = store.state;

    if (s.isSyncing) {
      this.container.innerHTML = `
        <div class="sync-banner">
          <div class="container" style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 10px; font-weight: 600; color: var(--electric-cyan);">
                <span class="animate-spin-slow">${Icons.refresh('', 18)}</span>
                <span>Connection restored. Synchronizing pending medical telemetry & reports with Houston Mission Control...</span>
              </div>
              <span class="mono" style="font-size: 0.8rem; color: var(--electric-cyan);">${s.syncProgress}%</span>
            </div>
            <!-- Progress Bar -->
            <div style="width: 100%; height: 6px; background: rgba(98, 221, 245, 0.2); border-radius: 3px; overflow: hidden;">
              <div style="width: ${s.syncProgress}%; height: 100%; background: linear-gradient(90deg, var(--cosmic-purple), var(--electric-cyan)); transition: width 0.3s ease;"></div>
            </div>
          </div>
        </div>
      `;
      return;
    }

    if (s.isOffline) {
      const count = s.pendingOfflineReports.length;
      this.container.innerHTML = `
        <div class="offline-banner">
          <div class="container" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="color: #ff4757;">${Icons.wifiOff('', 20)}</span>
              <div>
                <strong style="color: #ff6b81;">Deep-Space Communication Link Interrupted:</strong>
                <span style="color: var(--starlight-white); margin-left: 6px;">
                  Solar conjunction blackout active. Local autonomous health monitoring and AI assistant remain 100% operational on MTV Hab-01.
                </span>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="badge badge-warning" style="font-size: 0.72rem;">
                ${count} ${count === 1 ? 'Report' : 'Reports'} Buffered Locally
              </span>
              <button id="banner-reconnect-btn" class="btn btn-cyan btn-sm">
                ${Icons.wifi('', 14)} <span>Simulate Connection Restore</span>
              </button>
            </div>
          </div>
        </div>
      `;

      const reconBtn = this.container.querySelector('#banner-reconnect-btn');
      if (reconBtn) {
        reconBtn.addEventListener('click', () => {
          soundFX.playTransmit();
          store.triggerEarthReconnection();
        });
      }
      return;
    }

    // When online and nominal
    this.container.innerHTML = '';
  }
}
