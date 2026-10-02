// ==============================================================================
// GOAG PLATFORM ENTERPRISE OPERATING SYSTEM • CLIENT LOGIC ENGINE
// Document Code: GOAG-OS-CLIENT-V1.0
// Features:
//   - Real Server Authentication & Session Token Lifecycle
//   - Dynamic Role Navigation from Server-Returned Permissions
//   - Role-Tailored Workspace Routing (Master Admin, Director, Sales, Tech, etc.)
//   - Server-Side Data Redaction & 401/403 Error Interception
//   - Automated RBAC Security Suite Execution Console
// ==============================================================================

const App = {
  authToken: null,
  currentUser: null,
  authorizedModules: [],
  authorizedActions: [],
  canViewFinancials: false,
  activeChecklistStage: 15,
  state: null,

  // Module to Nav Config Mapping
  navModuleMap: {
    "cockpit":          { id: "tab-cockpit",          view: "view-cockpit",     icon: "📊", label: "Director Cockpit & Map" },
    "sales":            { id: "tab-sales",            view: "view-sales",       icon: "💼", label: "Commercial & Sales" },
    "production":       { id: "tab-production",       view: "view-production",  icon: "🛠️", label: "Production 6-Lane" },
    "checklist":        { id: "tab-checklist",        view: "view-checklist",   icon: "📋", label: "20-Page Build Checklist" },
    "qc":               { id: "tab-qc",               view: "view-qc",          icon: "✈️", label: "Flight Test & QC Audit" },
    "stores":           { id: "tab-stores",           view: "view-stores",      icon: "📦", label: "Stores & BOM Inventory" },
    "invoicing":        { id: "tab-invoicing",        view: "view-invoicing",   icon: "💳", label: "Invoicing & Ledgers" },
    "aftersales":       { id: "tab-aftersales",       view: "view-aftersales",  icon: "🔧", label: "Aftersales & Dual-OTP" },
    "hr":               { id: "tab-hr",               view: "view-hr",          icon: "👥", label: "HR, Attendance & ESS" },
    "dealer":           { id: "tab-dealer",           view: "view-dealer",      icon: "🏢", label: "Dealer Portal" },
    "dealer_portal":    { id: "tab-dealer",           view: "view-dealer",      icon: "🏢", label: "Dealer Portal" },
    "customer":         { id: "tab-customer",         view: "view-customer",    icon: "🌾", label: "Customer Fleet Portal" },
    "customer_portal":  { id: "tab-customer",         view: "view-customer",    icon: "🌾", label: "Customer Fleet Portal" },
    "rd":               { id: "tab-rd",               view: "view-rd",          icon: "🔬", label: "Isolated R&D Sandbox" },
    "audit":            { id: "tab-audit",            view: "view-audit",       icon: "🛡️", label: "Audit Trail & Master Data" },
    "assigned_checklist": { id: "tab-checklist",      view: "view-checklist",   icon: "📋", label: "My Assigned Checklist" },
    "technician_ess":   { id: "tab-hr",               view: "view-hr",          icon: "🛠️", label: "Technician ESS Workspace" },
    "production_view":  { id: "tab-production",       view: "view-production",  icon: "🛠️", label: "Production Floor View" }
  },

  init() {
    this.state = JSON.parse(JSON.stringify(GOAG_DEFAULT_DATA));
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    // Check for existing session token
    const savedToken = sessionStorage.getItem("GOAG_AUTH_TOKEN");
    if (savedToken) {
      this.authToken = savedToken;
      this.verifySession();
    } else {
      this.showLoginScreen();
    }
  },

  updateClock() {
    const clockEl = document.getElementById('system-clock');
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  },

  showLoginScreen() {
    const loginScreen = document.getElementById('login-screen');
    const authHeader = document.getElementById('authenticated-header');
    const mainNav = document.getElementById('main-nav');
    const mainContent = document.getElementById('main-content-container');

    if (loginScreen) loginScreen.style.display = 'flex';
    if (authHeader) authHeader.style.display = 'none';
    if (mainNav) mainNav.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';
  },

  showAuthenticatedApp() {
    const loginScreen = document.getElementById('login-screen');
    const authHeader = document.getElementById('authenticated-header');
    const mainNav = document.getElementById('main-nav');
    const mainContent = document.getElementById('main-content-container');

    if (loginScreen) loginScreen.style.display = 'none';
    if (authHeader) authHeader.style.display = 'flex';
    if (mainNav) mainNav.style.display = 'flex';
    if (mainContent) mainContent.style.display = 'block';

    this.renderHeaderAndWorkspace();
    this.renderNavigation();
    this.routeToPrimaryWorkspace();
    this.fetchServerData();
  },

  fillDevLogin(username, password) {
    document.getElementById('login-username').value = username;
    document.getElementById('login-password').value = password;
    this.submitLogin();
  },

  async submitLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorBox = document.getElementById('login-error-msg');

    if (!username || !password) return;
    if (errorBox) errorBox.style.display = 'none';

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        if (errorBox) {
          errorBox.textContent = `Authentication Failed: ${data.message || 'Invalid credentials'}`;
          errorBox.style.display = 'block';
        }
        return;
      }

      // Successful Authentication
      this.authToken = data.token;
      this.currentUser = data.user;
      this.authorizedModules = data.authorizedModules || [];
      this.authorizedActions = data.authorizedActions || [];
      this.canViewFinancials = data.canViewFinancials || false;

      sessionStorage.setItem("GOAG_AUTH_TOKEN", data.token);
      this.showToast(`Authenticated as ${data.user.name} [${data.user.role}]`);
      this.showAuthenticatedApp();

    } catch (err) {
      console.error("Login request error:", err);
      if (errorBox) {
        errorBox.textContent = `Server Connection Error: ${err.message}`;
        errorBox.style.display = 'block';
      }
    }
  },

  async verifySession() {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${this.authToken}` }
      });

      if (!res.ok) {
        sessionStorage.removeItem("GOAG_AUTH_TOKEN");
        this.authToken = null;
        this.showLoginScreen();
        return;
      }

      const data = await res.json();
      this.currentUser = data.user;
      this.authorizedModules = data.authorizedModules || [];
      this.authorizedActions = data.authorizedActions || [];
      this.canViewFinancials = data.canViewFinancials || false;

      this.showAuthenticatedApp();
    } catch (e) {
      sessionStorage.removeItem("GOAG_AUTH_TOKEN");
      this.showLoginScreen();
    }
  },

  async logout() {
    if (this.authToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${this.authToken}` }
        });
      } catch (e) {}
    }

    sessionStorage.removeItem("GOAG_AUTH_TOKEN");
    this.authToken = null;
    this.currentUser = null;
    this.authorizedModules = [];
    this.showLoginScreen();
    this.showToast("Signed out. Session invalidated on server.");
  },

  renderHeaderAndWorkspace() {
    const user = this.currentUser;
    if (!user) return;

    // Header Info
    const avatarEl = document.getElementById('user-avatar');
    const nameEl = document.getElementById('user-display-name');
    const roleBadgeEl = document.getElementById('user-role-badge');
    const headerWorkspaceEl = document.getElementById('header-workspace-label');

    const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : "US";
    if (avatarEl) avatarEl.textContent = initials;
    if (nameEl) nameEl.textContent = `${user.name} (${user.designation ? user.designation.split(',')[0] : user.role})`;
    if (roleBadgeEl) roleBadgeEl.textContent = `[${user.role}]`;
    if (headerWorkspaceEl) headerWorkspaceEl.textContent = user.workspace || "Operational Console";

    // Workspace Banner (Phase 6)
    const bannerTitle = document.getElementById('workspace-banner-title');
    const bannerFinancial = document.getElementById('workspace-financial-label');
    const bannerScope = document.getElementById('workspace-scope-label');

    if (bannerTitle) bannerTitle.textContent = `${user.workspace} • Logged in as ${user.name}`;
    if (bannerFinancial) {
      bannerFinancial.textContent = this.canViewFinancials ? "UNRESTRICTED (Commercial Access)" : "STRICTLY REDACTED (Zero Financial Data)";
      bannerFinancial.style.color = this.canViewFinancials ? "var(--emerald-accent)" : "var(--rose-danger)";
    }
    if (bannerScope) bannerScope.textContent = user.role === 'MASTER_ADMIN' ? 'Universal (ALL)' : `Role-Restricted (${user.department})`;
  },

  // Dynamic Navigation Generator (Phase 7)
  renderNavigation() {
    const navBar = document.getElementById('main-nav');
    if (!navBar) return;
    navBar.innerHTML = '';

    const addedViews = new Set();

    this.authorizedModules.forEach(modKey => {
      const config = this.navModuleMap[modKey];
      if (config && !addedViews.has(config.view)) {
        addedViews.add(config.view);

        const tab = document.createElement('div');
        tab.className = 'nav-item';
        tab.id = config.id;
        tab.setAttribute('data-view', config.view);
        tab.innerHTML = `
          <span class="nav-icon">${config.icon}</span>
          <span>${config.label}</span>
        `;
        tab.onclick = () => this.switchView(config.view);
        navBar.appendChild(tab);
      }
    });

    // Add Development RBAC Test Matrix Link
    const rbacDevTab = document.createElement('div');
    rbacDevTab.className = 'nav-item';
    rbacDevTab.id = 'tab-dev-rbac';
    rbacDevTab.setAttribute('data-view', 'view-dev-rbac');
    rbacDevTab.style.borderColor = 'rgba(139, 92, 246, 0.4)';
    rbacDevTab.innerHTML = `
      <span class="nav-icon">🛡️</span>
      <span style="color: #c084fc;">RBAC Security Suite</span>
    `;
    rbacDevTab.onclick = () => this.openRBACDevConsole();
    navBar.appendChild(rbacDevTab);
  },

  routeToPrimaryWorkspace() {
    const role = this.currentUser ? this.currentUser.role : 'MASTER_ADMIN';

    if (role === 'MASTER_ADMIN' || role === 'DIRECTOR') {
      this.switchView('view-cockpit');
    } else if (role === 'SALES') {
      this.switchView('view-sales');
    } else if (role === 'PRODUCTION_MANAGER') {
      this.switchView('view-production');
    } else if (role === 'ASSEMBLY_TECHNICIAN') {
      this.switchView('view-checklist');
    } else if (role === 'QC') {
      this.switchView('view-qc');
    } else if (role === 'STORES') {
      this.switchView('view-stores');
    } else if (role === 'ACCOUNTS') {
      this.switchView('view-invoicing');
    } else if (role === 'AFTERSALES') {
      this.switchView('view-aftersales');
    } else if (role === 'HR') {
      this.switchView('view-hr');
    } else if (role === 'R_AND_D') {
      this.switchView('view-rd');
    } else if (role === 'DEALER') {
      this.switchView('view-dealer');
    } else if (role === 'CUSTOMER') {
      this.switchView('view-customer');
    } else {
      this.switchView('view-cockpit');
    }
  },

  switchView(viewId) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));

    const tab = document.querySelector(`.nav-item[data-view="${viewId}"]`);
    if (tab) tab.classList.add('active');

    const targetView = document.getElementById(viewId);
    if (targetView) targetView.classList.add('active');
  },

  openRBACDevConsole() {
    this.switchView('view-dev-rbac');
    this.runLiveRBACTests();
  },

  async runLiveRBACTests() {
    const tbody = document.getElementById('rbac-tests-table-body');
    const badge = document.getElementById('rbac-suite-summary-badge');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem;">⚡ Executing server-side security checks...</td></tr>`;

    try {
      const res = await fetch('/api/dev/run-tests');
      const data = await res.json();

      tbody.innerHTML = '';
      data.results.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong style="font-family: var(--font-mono); color: var(--cyan-primary);">${t.id}</strong></td>
          <td><strong>${t.test}</strong></td>
          <td style="font-size: 0.78rem;">${t.user}</td>
          <td style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--amber-warning);">${t.expected}</td>
          <td style="font-family: var(--font-mono); font-size: 0.75rem; color: #fff;">${t.actual}</td>
          <td>
            <span class="${t.pass ? 'pass-pill' : 'fail-pill'}">
              ${t.pass ? '✓ PASS' : '✕ FAIL'}
            </span>
          </td>
        `;
        tbody.appendChild(tr);
      });

      if (badge) {
        badge.innerHTML = `<span class="badge ${data.failed === 0 ? 'badge-emerald' : 'badge-rose'}">${data.passed} / ${data.totalTests} Tests Passed (${Math.round((data.passed / data.totalTests) * 100)}%)</span>`;
      }
      this.showToast(`Automated RBAC Suite Executed: ${data.passed}/${data.totalTests} Passed.`);
    } catch (e) {
      tbody.innerHTML = `<tr><td colspan="6" style="color: var(--rose-danger); text-align:center;">Failed to execute test suite: ${e.message}</td></tr>`;
    }
  },

  async fetchServerData() {
    this.loadWorkOrders();
    this.renderQuotations();
    this.renderChecklist();
    this.renderInventory();
    this.renderInvoices();
    this.renderServiceTickets();
    this.renderAttendance();
    this.renderAuditLogs();
  },

  async loadWorkOrders() {
    try {
      const res = await fetch('/api/work-orders', {
        headers: { 'Authorization': `Bearer ${this.authToken}` }
      });

      if (res.ok) {
        const data = await res.json();
        this.renderSwimlaneWithData(data.workOrders || []);
      } else if (res.status === 403) {
        const board = document.getElementById('swimlane-board');
        if (board) {
          board.innerHTML = `
            <div style="grid-column: span 6; background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.3); padding: 2rem; border-radius: var(--radius-md); text-align: center; color: #fb7185;">
              🚫 <strong>HTTP 403 Forbidden:</strong> Your current authenticated role (${this.currentUser.role}) does not have permission to view internal production work orders.
            </div>
          `;
        }
      }
    } catch (e) {
      console.warn("Could not load work orders from API:", e);
    }
  },

  renderSwimlaneWithData(workOrders) {
    const board = document.getElementById('swimlane-board');
    if (!board) return;
    board.innerHTML = '';

    const lanes = [
      { key: "WO Released", title: "1. WO Released", color: "var(--cyan-primary)" },
      { key: "BOM Checked", title: "2. BOM Verified", color: "var(--blue-primary)" },
      { key: "In Assembly (20p)", title: "3. 20-Page Checklist", color: "var(--emerald-accent)" },
      { key: "Ready Test Fly", title: "4. Test Flight", color: "var(--amber-warning)" },
      { key: "Ready QC", title: "5. QC & Photos", color: "var(--purple-rd)" },
      { key: "Ready Dispatch", title: "6. Stores Dispatch", color: "#ec4899" }
    ];

    lanes.forEach(lane => {
      const col = document.createElement('div');
      col.className = 'swimlane-column';

      const matchedWOs = workOrders.filter(w => w.status === lane.key);

      col.innerHTML = `
        <div class="swimlane-header">
          <span class="swimlane-title" style="color: ${lane.color};">
            ${lane.title}
          </span>
          <span class="swimlane-count">${matchedWOs.length}</span>
        </div>
        <div class="swimlane-cards"></div>
      `;

      const cardContainer = col.querySelector('.swimlane-cards');

      if (matchedWOs.length === 0) {
        cardContainer.innerHTML = `<div style="font-size: 0.75rem; color: var(--text-dim); text-align: center; padding: 2rem 0;">No units in this lane</div>`;
      } else {
        matchedWOs.forEach(wo => {
          const card = document.createElement('div');
          card.className = 'wo-card';
          card.onclick = () => App.showWorkOrderDetails(wo);

          // Server-Side Redaction Check (Section 7)
          const isRedacted = typeof wo.financials === 'string' && wo.financials.includes('REDACTED');
          const financialDisplay = isRedacted ? 
            `<span style="color: var(--rose-danger); font-size: 0.72rem; font-family: var(--font-mono); font-weight:700;">[REDACTED AT SERVER]</span>` : 
            `<span style="color: #34d399; font-weight: 700; font-size: 0.8rem;">₹ ${wo.financials ? wo.financials.totalInvoiceValue.toLocaleString('en-IN') : '--'}</span>`;

          card.innerHTML = `
            <div class="wo-header">
              <span class="wo-id">${wo.id}</span>
              <span class="badge badge-cyan">${wo.unitSerial}</span>
            </div>
            <div class="wo-product-name">${wo.productName}</div>
            <div class="wo-meta-row"><span>Customer:</span> <strong>${wo.customerName}</strong></div>
            <div class="wo-meta-row"><span>Technician:</span> <strong>${wo.assignedTechnicianName}</strong></div>
            <div class="wo-meta-row"><span>Commercial EDD:</span> <strong>${wo.commercialEdd}</strong></div>
            <div class="wo-meta-row" style="margin-top: 0.4rem;"><span>Pricing:</span> ${financialDisplay}</div>
            <div style="margin-top: 0.5rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-dim);">
                <span>Checklist Progress</span><span>${wo.checklistProgress} / 20 Stages</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${(wo.checklistProgress / 20) * 100}%;"></div>
              </div>
            </div>
          `;
          cardContainer.appendChild(card);
        });
      }

      board.appendChild(col);
    });
  },

  showWorkOrderDetails(wo) {
    const isRedacted = typeof wo.financials === 'string' && wo.financials.includes('REDACTED');

    const body = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">
          <div>
            <h3 style="font-family: var(--font-display); color: var(--cyan-primary);">${wo.id}</h3>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Aircraft Unit: <strong>${wo.unitSerial}</strong></span>
          </div>
          <span class="badge badge-emerald">${wo.status}</span>
        </div>

        <div class="card-grid-2" style="margin-bottom: 0;">
          <div>
            <label class="form-label">Client Reference:</label>
            <div style="font-weight: 700; color: #fff;">${wo.customerName}</div>
          </div>
          <div>
            <label class="form-label">Commercial Delivery Date (EDD):</label>
            <div style="font-weight: 700; color: var(--amber-warning);">${wo.commercialEdd}</div>
          </div>
        </div>

        <div style="background: rgba(0,0,0,0.3); padding: 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <label class="form-label">BOM Pick-list Specification:</label>
          <div style="font-size: 0.82rem; color: #fff;">${wo.bomSpec}</div>
        </div>

        <!-- Server-Side Privacy Redaction Box (Section 7) -->
        <div style="border: 1px solid ${isRedacted ? 'var(--rose-danger)' : 'var(--border-subtle)'}; background: ${isRedacted ? 'rgba(244,63,94,0.08)' : 'rgba(0,0,0,0.2)'}; padding: 1rem; border-radius: var(--radius-md);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <label class="form-label" style="color: ${isRedacted ? 'var(--rose-danger)' : 'var(--cyan-primary)'};">
              Commercial Financial Data (Section 7 Mandate):
            </label>
            ${isRedacted ? `<span class="badge badge-rose">REDACTED AT SERVER LEVEL</span>` : `<span class="badge badge-emerald">AUTHORIZED VIEW</span>`}
          </div>

          ${isRedacted ? `
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #fb7185; text-align: center; padding: 1rem 0;">
              [STRICTLY REDACTED AT SERVER LEVEL]<br>
              Zero financial fields (selling price, advance, balance, margin) were transmitted across the HTTP wire.
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.82rem;">
              <div style="display: flex; justify-content: space-between;"><span>Selling Price:</span> <strong>₹ ${wo.financials.itemSellingPrice.toLocaleString('en-IN')}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span>Advance Payment:</span> <strong style="color: #34d399;">₹ ${wo.financials.advancePaymentReceived.toLocaleString('en-IN')}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span>Outstanding Balance:</span> <strong style="color: var(--amber-warning);">₹ ${wo.financials.outstandingBalance.toLocaleString('en-IN')}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span>Profit Margin:</span> <strong style="color: var(--cyan-primary);">₹ ${wo.financials.margins.toLocaleString('en-IN')}</strong></div>
            </div>
          `}
        </div>
      </div>
    `;

    this.openModal(`Work Order Traveler: ${wo.id}`, body, `<button class="btn btn-secondary" onclick="App.closeModal()">Close</button>`);
  },

  renderChecklist() {
    const sidebar = document.getElementById('checklist-stages-list');
    const detail = document.getElementById('checklist-stage-detail');
    if (!sidebar || !detail) return;

    sidebar.innerHTML = '';
    const stages = this.state.checklistStagesTemplate;

    stages.forEach(st => {
      const item = document.createElement('div');
      item.className = `checklist-stage-item ${st.page === this.activeChecklistStage ? 'active' : ''} ${st.passed ? 'completed' : ''}`;
      item.onclick = () => {
        this.activeChecklistStage = st.page;
        this.renderChecklist();
      };

      item.innerHTML = `
        <span>Page ${st.page}: ${st.domain.split('&')[0]}</span>
        <span>${st.passed ? '✓' : '•'}</span>
      `;
      sidebar.appendChild(item);
    });

    const activeStage = stages.find(s => s.page === this.activeChecklistStage) || stages[0];
    const isCompleted = activeStage.passed;

    detail.innerHTML = `
      <div class="checklist-active-header">
        <div>
          <span class="checklist-domain-badge">${activeStage.domain}</span>
          <h2 style="font-family: var(--font-display); font-size: 1.35rem; color: #fff; margin-top: 0.25rem;">
            Page ${activeStage.page}: ${activeStage.test}
          </h2>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
            Mandatory Action: <strong>${activeStage.action}</strong>
          </p>
        </div>
        <span class="badge ${isCompleted ? 'badge-emerald' : 'badge-amber'}">
          ${isCompleted ? 'PASSED & STAMPED' : 'PENDING TECHNICIAN VERIFICATION'}
        </span>
      </div>

      <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem;">
        <div class="form-group">
          <label class="form-label">Digital Parameter Reading / Test Metric:</label>
          <input type="text" id="checklist-param-input" class="form-control" 
                 value="${activeStage.remarks || ''}" 
                 placeholder="Enter verified reading (e.g. 5.12V, 3.5 Nm, 4.6 L/min)">
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          Assigned Technician: <strong>Bommali Himagiri (GOAG-E014)</strong> • Target Usual Time: <strong>4.5 hrs</strong>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1rem;">
        ${!isCompleted ? `
          <button class="btn btn-emerald" onclick="App.commitChecklistStage(${activeStage.page})">
            ✓ Commit & Advance to Next Stage →
          </button>
        ` : `
          <button class="btn btn-secondary" onclick="App.reopenChecklistStage(${activeStage.page})">
            Edit / Re-verify Stage
          </button>
        `}
      </div>
    `;

    const progressBadge = document.getElementById('checklist-overall-progress');
    if (progressBadge) {
      const verifiedCount = stages.filter(s => s.passed).length;
      progressBadge.textContent = `${verifiedCount} of 20 Stages Verified`;
    }
  },

  commitChecklistStage(pageNum) {
    const input = document.getElementById('checklist-param-input');
    const reading = input ? input.value : "Verified by technician";
    const stage = this.state.checklistStagesTemplate.find(s => s.page === pageNum);
    if (stage) {
      stage.passed = true;
      stage.remarks = reading;
      if (pageNum < 20) this.activeChecklistStage = pageNum + 1;
      this.renderChecklist();
      this.showToast(`Stage ${pageNum} committed into database.`);
    }
  },

  reopenChecklistStage(pageNum) {
    const stage = this.state.checklistStagesTemplate.find(s => s.page === pageNum);
    if (stage) {
      stage.passed = false;
      this.renderChecklist();
      this.showToast(`Stage ${pageNum} reopened for re-inspection.`);
    }
  },

  resetChecklistDemo() {
    this.state.checklistStagesTemplate = JSON.parse(JSON.stringify(GOAG_DEFAULT_DATA.checklistStagesTemplate));
    this.activeChecklistStage = 15;
    this.renderChecklist();
    this.showToast("Checklist reset to baseline demonstration state.");
  },

  renderQuotations() {
    const tbody = document.getElementById('quotations-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    this.state.quotations.forEach(q => {
      const tr = document.createElement('tr');
      const isCustom = q.type === 'Custom';
      tr.innerHTML = `
        <td><strong style="color: var(--cyan-primary);">${q.id}</strong></td>
        <td><strong>${q.customerName}</strong></td>
        <td>${q.products[0].name}</td>
        <td><span class="badge ${isCustom ? 'badge-amber' : 'badge-cyan'}">${q.type}</span></td>
        <td style="font-size: 0.75rem;">${q.gstType}</td>
        <td><strong>₹ ${q.total.toLocaleString('en-IN')}</strong></td>
        <td><span class="badge badge-emerald">✓ Approved</span></td>
        <td><span class="badge badge-emerald">${q.status}</span></td>
        <td><button class="btn btn-secondary btn-sm" onclick="App.previewQuotation('${q.id}')">View PDF</button></td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderInventory() {
    const tbody = document.getElementById('inventory-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    this.state.components.forEach(c => {
      const tr = document.createElement('tr');
      const isShort = c.stockQty <= c.reorderLevel;
      tr.innerHTML = `
        <td><strong style="font-family: var(--font-mono); color: var(--cyan-primary);">${c.id}</strong></td>
        <td><strong>${c.name}</strong></td>
        <td>${c.category}</td>
        <td><strong>${c.stockQty} ${c.unit}</strong></td>
        <td>${c.reorderLevel} ${c.unit}</td>
        <td>₹ ${c.unitCost.toLocaleString('en-IN')}</td>
        <td><span class="badge ${isShort ? 'badge-rose' : 'badge-emerald'}">${isShort ? 'SHORTAGE' : 'OPTIMAL'}</span></td>
        <td><button class="btn btn-secondary btn-sm" onclick="App.triggerStockInward('${c.id}')">+ Inward</button></td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderInvoices() {
    const tbody = document.getElementById('invoices-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    this.state.invoices.forEach(inv => {
      const tr = document.createElement('tr');
      const isCash = inv.sequenceType.includes('Cash');
      tr.innerHTML = `
        <td><strong style="color: ${isCash ? 'var(--amber-warning)' : 'var(--cyan-primary)'}; font-family: var(--font-mono);">${inv.id}</strong></td>
        <td><span class="badge ${isCash ? 'badge-amber' : 'badge-cyan'}">${inv.sequenceType}</span></td>
        <td>${inv.customerName}</td>
        <td style="font-family: var(--font-mono); font-size: 0.75rem;">${inv.gstin}</td>
        <td>₹ ${inv.amount.toLocaleString('en-IN')}</td>
        <td><strong>₹ ${inv.totalAmount.toLocaleString('en-IN')}</strong></td>
        <td style="font-size: 0.78rem;">${inv.paymentMode}</td>
        <td style="font-family: var(--font-mono); font-size: 0.75rem;">${inv.eWayBillNo}</td>
        <td><button class="btn btn-secondary btn-sm" onclick="App.viewInvoiceModal('${inv.id}')">View</button></td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderServiceTickets() {
    const tbody = document.getElementById('service-tickets-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    this.state.serviceTickets.forEach(st => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="font-family: var(--font-mono); color: var(--cyan-primary);">${st.id}</strong></td>
        <td><strong>${st.droneSerial}</strong></td>
        <td>${st.customerName}</td>
        <td>${st.symptomCategory}</td>
        <td><span class="badge badge-emerald">✓ Verified (${st.intakeOtp})</span></td>
        <td>${st.assignedTechnicianName}</td>
        <td><span class="badge badge-cyan">${st.handoverOtp}</span></td>
        <td><span class="badge badge-emerald">${st.status}</span></td>
        <td><button class="btn btn-secondary btn-sm" onclick="App.viewServiceDetails('${st.id}')">Details</button></td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderAttendance() {
    const tbody = document.getElementById('attendance-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const records = this.state.attendanceToday.records;
    this.state.employees.forEach(emp => {
      const rec = records[emp.id] || { status: "P", inTime: "09:00", outTime: "18:00", otHours: 0 };
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="font-family: var(--font-mono); color: var(--cyan-primary);">${emp.id}</strong></td>
        <td><strong>${emp.name}</strong></td>
        <td>${emp.designation}</td>
        <td>${emp.department}</td>
        <td><span class="badge badge-emerald">${rec.status}</span></td>
        <td style="font-family: var(--font-mono); font-size: 0.75rem;">${rec.inTime}</td>
        <td style="font-family: var(--font-mono); font-size: 0.75rem;">${rec.outTime}</td>
        <td>${rec.otHours} hrs</td>
        <td><button class="btn btn-secondary btn-sm" onclick="App.regularizeAttendance('${emp.id}')">Regularize</button></td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderAuditLogs() {
    const tbody = document.getElementById('audit-logs-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const logs = [
      { timestamp: "2026-10-02 08:30:12", userId: "GOAG-A005", name: "Ganesh Pentela", entity: "System", action: "INITIALIZE", summary: "Platform booted with RBAC security engine" },
      { timestamp: "2026-10-02 09:15:44", userId: "GOAG-E014", name: "Bommali Himagiri", entity: "WorkOrder", action: "UPDATE", summary: "WO-014 Stage 14 (Pump pressure) signed off" },
      { timestamp: "2026-10-02 10:45:00", userId: "GOAG-A004", name: "Saran Kumar", entity: "Quotation", action: "APPROVE", summary: "Approved custom quote GOAG-QT-0182" }
    ];

    logs.forEach(l => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">${l.timestamp}</td>
        <td><span class="badge badge-cyan">${l.userId}</span></td>
        <td><strong>${l.name}</strong></td>
        <td><span class="badge badge-purple">${l.entity}</span></td>
        <td><strong style="font-family: var(--font-mono);">${l.action}</strong></td>
        <td style="font-size: 0.8rem;">${l.summary}</td>
        <td><span class="badge badge-emerald">SUCCESS</span></td>
      `;
      tbody.appendChild(tr);
    });
  },

  showPinDetails(pinId) {
    const pin = this.state.deliveryMapPins.find(p => p.id === pinId);
    if (!pin) return;
    this.showToast(`Zone: ${pin.state} • ${pin.units} Units • PIN: ${pin.pincode}`);
  },

  signOffFlightTest() {
    this.showToast("Flight test certified by pilot. Unit transitioned to QC Audit.");
  },

  approveQCAudit() {
    this.showToast("QC Pass certified with multi-angle photos. Unit transferred to Stores.");
  },

  rejectQCAudit() {
    this.showToast("QC Issue flagged. Unit returned to assembly rework queue.");
  },

  triggerStockInward(compId) {
    const comp = this.state.components.find(c => c.id === compId);
    if (comp) {
      comp.stockQty += 10;
      this.renderInventory();
      this.showToast(`Inward recorded: +10 ${comp.unit} to ${comp.name}.`);
    }
  },

  openNewQuoteModal() { this.showToast("Quotation Builder initialized."); },
  openMaterialRequestModal() { this.showToast("Material Request modal initialized."); },
  openNewInvoiceModal() { this.showToast("Invoice Generator initialized."); },
  openPettyCashModal() { this.showToast("Petty Cash voucher modal initialized."); },
  openNewServiceModal() { this.showToast("Branch Intake modal initialized."); },
  openCommercialGraduationModal() { this.showToast("R&D Commercial Graduation Gate opened."); },
  previewQuotation(id) { this.showToast(`Previewing Quotation ${id}.`); },
  viewInvoiceModal(id) { this.showToast(`Displaying Tax Invoice ${id}.`); },
  viewServiceDetails(id) { this.showToast(`Service case details for ${id}.`); },
  regularizeAttendance(id) { this.showToast(`Attendance regularized for ${id}.`); },
  refreshData() { this.fetchServerData(); this.showToast("Telemetry refreshed from server."); },

  openModal(title, bodyHtml, footerHtml) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = bodyHtml;
    document.getElementById('modal-footer').innerHTML = footerHtml;
    document.getElementById('app-modal-overlay').classList.add('active');
  },

  closeModal() {
    document.getElementById('app-modal-overlay').classList.remove('active');
  },

  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color: var(--cyan-primary);">⚡</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Initialize Application on DOM Ready or immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
