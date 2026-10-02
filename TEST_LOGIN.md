# GOAG Platform — Development Test Accounts & Login Directory
**Document Code:** GOAG-SEC-DEV-CREDS-V1  
**Environment:** Development & Security RBAC Test Environment  
**Base URL:** `http://localhost:8085/` (or `http://127.0.0.1:8085/`)  
**Login Route:** `http://localhost:8085/#login`  
**RBAC Test Suite & Matrix:** `http://localhost:8085/#dev-rbac`

> [!CAUTION]
> **DEVELOPMENT ONLY:** These credentials are exclusively for testing the Role-Based Access Control (RBAC), tenant isolation, and data redaction matrices. Never use these credentials in staging or production deployments.

---

## 1. Controlled Development Test Accounts (14 Mandatory Roles)

| Role Code | Username | Development Password | Associated Employee / Entity | Assigned Primary Workspace | Permitted Data Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **MASTER_ADMIN** | `ganesh.admin` | `Admin@GOAG2026` | Ganesh Pentela (`GOAG-A005`) | **Master Console** | Universal (`ALL`) |
| **DIRECTOR** | `director.test` | `Director@GOAG2026` | Yalamarthi Tulasi Ram (`GOAG-A001`) | **Director Cockpit** | Executive & Commercial (`ALL`) |
| **SALES** | `sales.test` | `Sales@GOAG2026` | Mandugula Vamshi Teja (`GOAG-E008`) | **Sales Workspace** | Sales, Quotes, Leads (`OWN_DEPARTMENT`) |
| **PRODUCTION_MANAGER** | `production.test`| `Prod@GOAG2026` | Kapil Kumar K (`GOAG-E007`) | **Production Workspace** | Production Floor (Financials Redacted) |
| **ASSEMBLY_TECHNICIAN**| `technician.test`| `Tech@GOAG2026` | Bommali Himagiri (`GOAG-E014`) | **Technician Workspace (ESS)**| Assigned Units Only (`ASSIGNED_RECORDS`) |
| **QC** | `qc.test` | `QC@GOAG2026` | V Vishwateja Kumar Reddy (`GOAG-A003`) | **QC Workspace** | Quality Control & Flight Audits |
| **STORES** | `stores.test` | `Stores@GOAG2026` | Guduri Harsha Deep (`GOAG-E011`) | **Stores Workspace** | Stock, Inward/Outward, BOM Check |
| **PROCUREMENT** | `purchase.test` | `Procure@GOAG2026` | Bandaru Santhosh Kumar (`GOAG-A002`) | **Procurement Workspace** | Vendor Orders & PO Approvals |
| **ACCOUNTS** | `accounts.test` | `Accts@GOAG2026` | Uppalapati Maneesha (`GOAG-E012`) | **Accounts Workspace** | Invoicing (Cash/Bank), Petty Cash, Ledgers |
| **AFTERSALES** | `aftersales.test`| `Aftersales@GOAG2026` | Meegala Vikas (`GOAG-E010`) | **Aftersales Workspace** | Branch Service, Dual-OTP, Diagnostics |
| **HR** | `hr.test` | `HR@GOAG2026` | Uppalapati Maneesha (`GOAG-E012`) | **HR Workspace** | Attendance, Payroll, Salaries |
| **R_AND_D** | `rnd.test` | `RnD@GOAG2026` | Voleti Veera Babu (`GOAG-E009`) | **R&D Sandbox** | Isolated Prototypes & CAD Data |
| **DEALER** | `dealer.test` | `Dealer@GOAG2026` | Sri Balaji Drone Works (`DEALER-01`)| **Dealer Portal** | Tenant Isolated (`OWN_DEALER`) |
| **CUSTOMER** | `customer.test` | `Customer@GOAG2026` | Krishna Agri Enterprises (`CUST-8492`)| **Customer Portal** | Customer Isolated (`OWN_ACCOUNT`) |

---

## 2. Authentication Handshake & Token Lifecycle

1. **Authentication Endpoint:** `POST /api/auth/login`
   - Request Body: `{"username": "<username>", "password": "<password>"}`
   - Successful Response (`200 OK`):
     ```json
     {
       "token": "goag_sec_tok_...",
       "user": {
         "userId": "USR-A005",
         "username": "ganesh.admin",
         "employeeId": "GOAG-A005",
         "name": "Ganesh Pentela",
         "role": "MASTER_ADMIN",
         "workspace": "Master Console"
       },
       "authorizedModules": ["cockpit", "sales", "production", "checklist", "qc", "stores", "invoicing", "aftersales", "hr", "dealer", "customer", "rd", "audit", "master_data"]
     }
     ```
2. **Subsequent API Requests:**
   - Every protected request must include:
     `Authorization: Bearer <token>`
   - Missing token &rarr; `401 Unauthorized`
   - Insufficient permissions &rarr; `403 Forbidden`
3. **Logout Endpoint:** `POST /api/auth/logout`
   - Immediately revokes and invalidates the session token on the server.
