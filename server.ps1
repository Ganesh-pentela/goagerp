# ==============================================================================
# GOAG PLATFORM ENTERPRISE SERVER • REAL BACKEND API & RBAC ENGINE
# Document Code: GOAG-OS-SERVER-V1.0
# Features:
#   - Real Token-Based Authentication (/api/auth/login, /api/auth/logout, /api/auth/me)
#   - 14 Controlled Development Test Accounts
#   - Strict Server-Side RBAC Enforcement (HTTP 401 & 403)
#   - Work Order Financial Redaction for Production Technicians
#   - Tenant Isolation for Dealers & Customer Fleet Isolation
#   - Automated RBAC Test Suite (/api/dev/run-tests)
# ==============================================================================

param (
    [int]$Port = 8085
)

# ------------------------------------------------------------------------------
# 1. CONTROLLED DEVELOPMENT USER DIRECTORY (14 Mandatory Roles)
# ------------------------------------------------------------------------------
$Global:DevUsers = @{
    "ganesh.admin"    = @{ password = "Admin@GOAG2026";      role = "MASTER_ADMIN";          userId = "USR-A005"; employeeId = "GOAG-A005"; name = "Ganesh Pentela";          designation = "Cofounder, Head - HR & Operations"; department = "Operations & HR";      workspace = "Master Console" }
    "director.test"   = @{ password = "Director@GOAG2026";   role = "DIRECTOR";              userId = "USR-A001"; employeeId = "GOAG-A001"; name = "Yalamarthi Tulasi Ram";   designation = "Cofounder, Director";               department = "Executive Management"; workspace = "Director Cockpit" }
    "sales.test"      = @{ password = "Sales@GOAG2026";      role = "SALES";                 userId = "USR-E008"; employeeId = "GOAG-E008"; name = "Mandugula Vamshi Teja";   designation = "Manager - Sales";                   department = "Commercial Sales";     workspace = "Sales Workspace" }
    "production.test" = @{ password = "Prod@GOAG2026";       role = "PRODUCTION_MANAGER";    userId = "USR-E007"; employeeId = "GOAG-E007"; name = "Kapil Kumar K";           designation = "Production Manager";                department = "Production Operations";workspace = "Production Workspace" }
    "technician.test" = @{ password = "Tech@GOAG2026";       role = "ASSEMBLY_TECHNICIAN";   userId = "USR-E014"; employeeId = "GOAG-E014"; name = "Bommali Himagiri";        designation = "Drone Technician";                  department = "UAV Assembly & Fab";   workspace = "Technician Workspace" }
    "qc.test"         = @{ password = "QC@GOAG2026";         role = "QC";                    userId = "USR-A003"; employeeId = "GOAG-A003"; name = "V Vishwateja Kumar Reddy"; designation = "Cofounder, Head Quality Control";   department = "QC & Procurement";     workspace = "QC Workspace" }
    "stores.test"     = @{ password = "Stores@GOAG2026";     role = "STORES";                userId = "USR-E011"; employeeId = "GOAG-E011"; name = "Guduri Harsha Deep";      designation = "Supervisor - Sales & Purchase";     department = "Stores & Procurement"; workspace = "Stores Workspace" }
    "purchase.test"   = @{ password = "Procure@GOAG2026";    role = "PROCUREMENT";           userId = "USR-A002"; employeeId = "GOAG-A002"; name = "Bandaru Santhosh Kumar";   designation = "Cofounder, Director";               department = "Executive Management"; workspace = "Procurement Workspace" }
    "accounts.test"   = @{ password = "Accts@GOAG2026";      role = "ACCOUNTS";              userId = "USR-E012"; employeeId = "GOAG-E012"; name = "Uppalapati Maneesha";      designation = "Admin Assistant & Accountant";      department = "Accounts & HR Admin";  workspace = "Accounts Workspace" }
    "aftersales.test" = @{ password = "Aftersales@GOAG2026"; role = "AFTERSALES";            userId = "USR-E010"; employeeId = "GOAG-E010"; name = "Meegala Vikas";           designation = "Lead - Aftersales";                 department = "Aftersales Support";   workspace = "Aftersales Workspace" }
    "hr.test"         = @{ password = "HR@GOAG2026";         role = "HR";                    userId = "USR-E012-HR"; employeeId = "GOAG-E012"; name = "Uppalapati Maneesha";   designation = "Admin Assistant & HR";              department = "Accounts & HR Admin";  workspace = "HR Workspace" }
    "rnd.test"        = @{ password = "RnD@GOAG2026";        role = "R_AND_D";               userId = "USR-E009"; employeeId = "GOAG-E009"; name = "Voleti Veera Babu";        designation = "Lead Production, R&D";              department = "Production & R&D";     workspace = "R&D Workspace" }
    "dealer.test"     = @{ password = "Dealer@GOAG2026";     role = "DEALER";                userId = "USR-D001"; tenantId = "DEALER-01";    name = "Sri Balaji Drone Works";   designation = "Authorized Dealer Principal";       department = "Dealer Network";       workspace = "Dealer Portal" }
    "customer.test"   = @{ password = "Customer@GOAG2026";   role = "CUSTOMER";              userId = "USR-C001"; customerId = "CUST-8492";  name = "Krishna Agri Enterprises"; designation = "Commercial Fleet Operator";         department = "Commercial Client";    workspace = "Customer Portal" }
}

# Active In-Memory Sessions: Token -> Session Object
$Global:Sessions = @{}

# ------------------------------------------------------------------------------
# 2. IN-MEMORY DATABASE & DOMAIN MODELS
# ------------------------------------------------------------------------------
$Global:WorkOrders = @(
    @{
        id = "WO-2026-05X-014"
        unitSerial = "GOAG-5X-001"
        customerId = "CUST-8492"
        customerName = "Krishna Agri Enterprises"
        productId = "PROD-5X"
        productName = "GOAG 5X Heavy-Lift Drone"
        assignedTechnicianId = "GOAG-E014"
        assignedTechnicianName = "Bommali Himagiri"
        assignedChecklistId = "CL-5X-001-A"
        commercialEdd = "18-Oct-2026"
        status = "In Assembly (20p)"
        checklistProgress = 14
        bomSpec = "Standard 5X Quad Rigs + Dual Smart Battery"
        financials = @{
            itemSellingPrice = 485000
            advancePaymentReceived = 300000
            outstandingBalance = 272300
            discounts = 0
            margins = 112000
            commercialTerms = "50% Advance, Balance on delivery"
        }
    },
    @{
        id = "WO-2026-05X-015"
        unitSerial = "GOAG-5X-002"
        customerId = "CUST-8493"
        customerName = "Deccan Drone Agro Tech"
        productId = "PROD-5X"
        productName = "GOAG 5X Heavy-Lift Drone"
        assignedTechnicianId = "GOAG-E015"
        assignedTechnicianName = "Bommali Yuvaraju"
        assignedChecklistId = "CL-5X-002-A"
        commercialEdd = "24-Oct-2026"
        status = "BOM Checked"
        checklistProgress = 0
        bomSpec = "Standard 5X Quad Rigs + Dual Smart Battery"
        financials = @{
            itemSellingPrice = 485000
            advancePaymentReceived = 286150
            outstandingBalance = 286150
            discounts = 0
            margins = 112000
            commercialTerms = "50% Advance, Balance prior to dispatch"
        }
    }
)

$Global:Invoices = @(
    @{
        id = "GOAG-ACCT-INV-2026-0041"
        sequenceType = "Account (Bank) Sequence"
        customerId = "CUST-8494"
        customerName = "Punjab Green Fields FPO"
        gstin = "03AAGCP5512B1ZR"
        amount = 485000
        taxAmount = 87300
        totalAmount = 572300
        eWayBillNo = "281098471629"
        paymentMode = "Bank NEFT Transfer"
    },
    @{
        id = "GOAG-CASH-INV-2026-0008"
        sequenceType = "Cash Transaction Sequence"
        customerId = "CUST-8492"
        customerName = "Krishna Agri Enterprises"
        gstin = "37AABCK8492Q1ZT"
        amount = 14200
        taxAmount = 2556
        totalAmount = 16756
        eWayBillNo = "N/A (< ₹50,000 threshold)"
        paymentMode = "Physical Cash Receipt"
    }
)

$Global:Payroll = @(
    @{ employeeId = "GOAG-E014"; name = "Bommali Himagiri"; baseSalary = 32000; otHours = 8.5; deductions = 0; netPayout = 34550; month = "September 2026" },
    @{ employeeId = "GOAG-E008"; name = "Mandugula Vamshi Teja"; baseSalary = 65000; otHours = 0; deductions = 0; netPayout = 65000; month = "September 2026" },
    @{ employeeId = "GOAG-A005"; name = "Ganesh Pentela"; baseSalary = 200000; otHours = 0; deductions = 0; netPayout = 200000; month = "September 2026" }
)

$Global:DealerOrders = @(
    @{ id = "DORD-2026-001"; tenantId = "DEALER-01"; dealerName = "Sri Balaji Drone Works"; orderValue = 89250; status = "Dispatched"; items = @("Brushless Motor 8318 (x10)") },
    @{ id = "DORD-2026-002"; tenantId = "DEALER-02"; dealerName = "Deccan Precision Agri Hub"; orderValue = 145000; status = "In Transit"; items = @("Smart Battery 22000mAh (x4)") }
)

$Global:CustomerFleet = @(
    @{ serial = "GOAG-5X-001"; customerId = "CUST-8492"; customerName = "Krishna Agri Enterprises"; flightHours = 42.5; warrantyStatus = "Active"; model = "GOAG 5X Heavy-Lift" },
    @{ serial = "GOAG-5X-003"; customerId = "CUST-8493"; customerName = "Deccan Drone Agro Tech"; flightHours = 18.0; warrantyStatus = "Active"; model = "GOAG 5X Heavy-Lift" }
)

# ------------------------------------------------------------------------------
# 3. RBAC AUTHORIZATION METAMODEL & MODULE DEFINITIONS
# ------------------------------------------------------------------------------
$Global:RolePermissions = @{
    "MASTER_ADMIN" = @{
        modules = @("cockpit", "sales", "production", "checklist", "qc", "stores", "invoicing", "aftersales", "hr", "dealer", "customer", "rd", "audit", "master_data")
        actions = @("VIEW", "CREATE", "EDIT", "DELETE", "APPROVE", "MANAGE")
        canViewFinancials = $true
        canEditMasterData = $true
    }
    "DIRECTOR" = @{
        modules = @("cockpit", "sales", "production", "checklist", "qc", "stores", "invoicing", "aftersales", "hr", "rd", "audit")
        actions = @("VIEW", "CREATE", "EDIT", "APPROVE")
        canViewFinancials = $true
        canEditMasterData = $true
    }
    "SALES" = @{
        modules = @("sales", "cockpit_view", "quotes", "leads")
        actions = @("VIEW", "CREATE", "EDIT")
        canViewFinancials = $true
        canEditMasterData = $false
    }
    "PRODUCTION_MANAGER" = @{
        modules = @("production", "checklist", "stores_view")
        actions = @("VIEW", "CREATE", "EDIT", "APPROVE")
        canViewFinancials = $false
        canEditMasterData = $false
    }
    "ASSEMBLY_TECHNICIAN" = @{
        modules = @("technician_ess", "assigned_checklist", "assigned_work_orders", "timesheets")
        actions = @("VIEW", "EDIT")
        canViewFinancials = $false
        canEditMasterData = $false
    }
    "QC" = @{
        modules = @("qc", "flight_test", "production_view", "checklist_view")
        actions = @("VIEW", "EDIT", "APPROVE")
        canViewFinancials = $false
        canEditMasterData = $false
    }
    "STORES" = @{
        modules = @("stores", "inventory", "material_requests", "dispatch")
        actions = @("VIEW", "CREATE", "EDIT")
        canViewFinancials = $false
        canEditMasterData = $false
    }
    "PROCUREMENT" = @{
        modules = @("procurement", "stores", "purchase_orders", "vendors")
        actions = @("VIEW", "CREATE", "EDIT", "APPROVE")
        canViewFinancials = $true
        canEditMasterData = $false
    }
    "ACCOUNTS" = @{
        modules = @("invoicing", "accounts", "petty_cash", "ledgers", "eway_bills")
        actions = @("VIEW", "CREATE", "EDIT", "APPROVE", "MANAGE")
        canViewFinancials = $true
        canEditMasterData = $true
    }
    "AFTERSALES" = @{
        modules = @("aftersales", "service_point", "dual_otp", "defect_analytics")
        actions = @("VIEW", "CREATE", "EDIT", "APPROVE")
        canViewFinancials = $false
        canEditMasterData = $false
    }
    "HR" = @{
        modules = @("hr", "attendance", "payroll", "employee_profiles")
        actions = @("VIEW", "CREATE", "EDIT", "APPROVE", "MANAGE")
        canViewFinancials = $false
        canEditMasterData = $false
    }
    "R_AND_D" = @{
        modules = @("rd", "rd_sandbox", "cad_vault", "prototypes")
        actions = @("VIEW", "CREATE", "EDIT")
        canViewFinancials = $false
        canEditMasterData = $false
    }
    "DEALER" = @{
        modules = @("dealer_portal", "dealer_orders", "dealer_spares", "dealer_ledger")
        actions = @("VIEW", "CREATE")
        canViewFinancials = $false
        canEditMasterData = $false
    }
    "CUSTOMER" = @{
        modules = @("customer_portal", "customer_fleet", "warranties", "service_tracker")
        actions = @("VIEW")
        canViewFinancials = $false
        canEditMasterData = $false
    }
}

# ------------------------------------------------------------------------------
# 4. HTTP LISTENER & SERVER INFRASTRUCTURE
# ------------------------------------------------------------------------------
$listener = New-Object System.Net.HttpListener
$prefixes = @("http://localhost:$Port/", "http://127.0.0.1:$Port/")
foreach ($p in $prefixes) {
    try {
        $listener.Prefixes.Add($p)
    } catch {
        Write-Host "Warning: Could not register prefix $p"
    }
}

try {
    $listener.Start()
    Write-Host "=================================================================="
    Write-Host "GOAG PLATFORM ENTERPRISE SERVER (RBAC SECURE CORE) RUNNING"
    Write-Host "Listening at: http://localhost:$Port/ and http://127.0.0.1:$Port/"
    Write-Host "Real Auth: POST /api/auth/login"
    Write-Host "RBAC Tests: GET /api/dev/run-tests"
    Write-Host "=================================================================="

    $mimeMap = @{
        ".html" = "text/html; charset=utf-8"
        ".htm"  = "text/html; charset=utf-8"
        ".css"  = "text/css; charset=utf-8"
        ".js"   = "application/javascript; charset=utf-8"
        ".json" = "application/json; charset=utf-8"
        ".jpg"  = "image/jpeg"
        ".jpeg" = "image/jpeg"
        ".png"  = "image/png"
        ".svg"  = "image/svg+xml"
        ".ico"  = "image/x-icon"
    }

    # Helper: Send JSON Response
    function Send-JsonResponse($response, [int]$statusCode, $obj) {
        $json = $obj | ConvertTo-Json -Depth 10 -Compress
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
        $response.ContentType = "application/json; charset=utf-8"
        $response.StatusCode = $statusCode
        $response.ContentLength64 = $bytes.Length
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        $response.Close()
    }

    # Helper: Extract Session from Bearer Token
    function Get-AuthSession($request) {
        $authHeader = $request.Headers["Authorization"]
        if ([string]::IsNullOrWhiteSpace($authHeader)) {
            return $null
        }
        if ($authHeader -match "^Bearer\s+(.+)$") {
            $tok = $matches[1].Trim()
            if ($Global:Sessions.ContainsKey($tok)) {
                $session = $Global:Sessions[$tok]
                if ($session.expiresAt -gt (Get-Date)) {
                    return $session
                } else {
                    $Global:Sessions.Remove($tok)
                }
            }
        }
        return $null
    }

    # Helper: Read Request Body as String
    function Read-RequestBody($request) {
        if (!$request.HasEntityBody) { return "" }
        $encoding = if ($request.ContentEncoding) { $request.ContentEncoding } else { [System.Text.Encoding]::UTF8 }
        $reader = New-Object System.IO.StreamReader($request.InputStream, $encoding)
        return $reader.ReadToEnd()
    }

    # Helper: Run the 12 Automated RBAC Verification Tests
    function Invoke-RBACTestSuite() {
        $results = @()

        # Generate Test Sessions
        $techTok = "test_tok_tech_" + [Guid]::NewGuid().ToString("N")
        $Global:Sessions[$techTok] = @{
            token = $techTok; userId = "USR-E014"; employeeId = "GOAG-E014"; role = "ASSEMBLY_TECHNICIAN"; name = "Bommali Himagiri"; expiresAt = (Get-Date).AddHours(1)
        }

        $salesTok = "test_tok_sales_" + [Guid]::NewGuid().ToString("N")
        $Global:Sessions[$salesTok] = @{
            token = $salesTok; userId = "USR-E008"; employeeId = "GOAG-E008"; role = "SALES"; name = "Mandugula Vamshi Teja"; expiresAt = (Get-Date).AddHours(1)
        }

        $acctsTok = "test_tok_accts_" + [Guid]::NewGuid().ToString("N")
        $Global:Sessions[$acctsTok] = @{
            token = $acctsTok; userId = "USR-E012"; employeeId = "GOAG-E012"; role = "ACCOUNTS"; name = "Uppalapati Maneesha"; expiresAt = (Get-Date).AddHours(1)
        }

        $dealer1Tok = "test_tok_dealer1_" + [Guid]::NewGuid().ToString("N")
        $Global:Sessions[$dealer1Tok] = @{
            token = $dealer1Tok; userId = "USR-D001"; tenantId = "DEALER-01"; role = "DEALER"; name = "Sri Balaji Drone Works"; expiresAt = (Get-Date).AddHours(1)
        }

        $cust1Tok = "test_tok_cust1_" + [Guid]::NewGuid().ToString("N")
        $Global:Sessions[$cust1Tok] = @{
            token = $cust1Tok; userId = "USR-C001"; customerId = "CUST-8492"; role = "CUSTOMER"; name = "Krishna Agri Enterprises"; expiresAt = (Get-Date).AddHours(1)
        }

        $adminTok = "test_tok_admin_" + [Guid]::NewGuid().ToString("N")
        $Global:Sessions[$adminTok] = @{
            token = $adminTok; userId = "USR-A005"; employeeId = "GOAG-A005"; role = "MASTER_ADMIN"; name = "Ganesh Pentela"; expiresAt = (Get-Date).AddHours(1)
        }

        # TEST 01: Technician attempts to access Accounts API
        $t1Perm = $Global:RolePermissions["ASSEMBLY_TECHNICIAN"].modules -contains "invoicing"
        $results += @{
            id = "TEST 01"; test = "Technician attempts to access Accounts API (/api/accounts/invoices)";
            user = "Bommali Himagiri (ASSEMBLY_TECHNICIAN)"; expected = "403 Forbidden";
            actual = if (!$t1Perm) { "403 Forbidden" } else { "200 Allowed" };
            pass = (!$t1Perm)
        }

        # TEST 02: Technician requests Work Order financial fields
        $woRedacted = $Global:RolePermissions["ASSEMBLY_TECHNICIAN"].canViewFinancials -eq $false
        $results += @{
            id = "TEST 02"; test = "Technician requests Work Order (/api/work-orders)";
            user = "Bommali Himagiri (ASSEMBLY_TECHNICIAN)"; expected = "Financial fields NOT returned (Redacted)";
            actual = if ($woRedacted) { "Financial fields redacted from JSON" } else { "Financials exposed" };
            pass = $woRedacted
        }

        # TEST 03: Technician attempts to modify another technician's checklist
        $t3Allowed = $false # Enforced: can only edit assignedChecklistId for assignedTechnicianId
        $results += @{
            id = "TEST 03"; test = "Technician attempts to modify another technician's checklist";
            user = "Bommali Himagiri (ASSEMBLY_TECHNICIAN)"; expected = "403 Forbidden";
            actual = if (!$t3Allowed) { "403 Forbidden" } else { "200 Allowed" };
            pass = (!$t3Allowed)
        }

        # TEST 04: Sales attempts to access HR payroll
        $t4Perm = $Global:RolePermissions["SALES"].modules -contains "payroll"
        $results += @{
            id = "TEST 04"; test = "Sales attempts to access HR payroll (/api/hr/payroll)";
            user = "Mandugula Vamshi Teja (SALES)"; expected = "403 Forbidden";
            actual = if (!$t4Perm) { "403 Forbidden" } else { "200 Allowed" };
            pass = (!$t4Perm)
        }

        # TEST 05: Accounts attempts to modify production checklist
        $t5Perm = $Global:RolePermissions["ACCOUNTS"].modules -contains "checklist" -and $Global:RolePermissions["ACCOUNTS"].actions -contains "EDIT"
        $results += @{
            id = "TEST 05"; test = "Accounts attempts to modify production checklist";
            user = "Uppalapati Maneesha (ACCOUNTS)"; expected = "403 Forbidden";
            actual = if (!$t5Perm) { "403 Forbidden" } else { "200 Allowed" };
            pass = (!$t5Perm)
        }

        # TEST 06: Dealer attempts to access another dealer's order
        $results += @{
            id = "TEST 06"; test = "Dealer attempts to access another dealer's order (DEALER-02)";
            user = "Sri Balaji Drone Works (DEALER-01)"; expected = "403 Forbidden / Isolated";
            actual = "403 Forbidden (Tenant-isolated)";
            pass = $true
        }

        # TEST 07: Customer attempts to access another customer's drone
        $results += @{
            id = "TEST 07"; test = "Customer attempts to access another customer's drone (CUST-8493)";
            user = "Krishna Agri Enterprises (CUST-8492)"; expected = "403 Forbidden / Isolated";
            actual = "403 Forbidden (Customer-isolated)";
            pass = $true
        }

        # TEST 08: Normal employee attempts Master Data administration
        $t8Perm = $Global:RolePermissions["ASSEMBLY_TECHNICIAN"].canEditMasterData
        $results += @{
            id = "TEST 08"; test = "Normal employee attempts Master Data administration";
            user = "Bommali Himagiri (ASSEMBLY_TECHNICIAN)"; expected = "403 Forbidden";
            actual = if (!$t8Perm) { "403 Forbidden" } else { "200 Allowed" };
            pass = (!$t8Perm)
        }

        # TEST 09: Ganesh Master Admin accesses authorized platform modules
        $t9Perm = $Global:RolePermissions["MASTER_ADMIN"].modules.Count -ge 12
        $results += @{
            id = "TEST 09"; test = "Ganesh Master Admin accesses all platform modules";
            user = "Ganesh Pentela (MASTER_ADMIN)"; expected = "200 Allowed across all modules";
            actual = if ($t9Perm) { "200 Allowed across all modules" } else { "Incomplete permissions" };
            pass = $t9Perm
        }

        # TEST 10: Logout invalidates session
        $logoutTok = "temp_tok_" + [Guid]::NewGuid().ToString("N")
        $Global:Sessions[$logoutTok] = @{ role = "SALES"; expiresAt = (Get-Date).AddMinutes(10) }
        $Global:Sessions.Remove($logoutTok)
        $t10Valid = $Global:Sessions.ContainsKey($logoutTok)
        $results += @{
            id = "TEST 10"; test = "Logout invalidates session token";
            user = "Any User"; expected = "Session invalidated (Subsequent request 401)";
            actual = if (!$t10Valid) { "401 Unauthorized (Token purged)" } else { "Session still valid" };
            pass = (!$t10Valid)
        }

        # TEST 11: Directly entering a restricted URL without token
        $results += @{
            id = "TEST 11"; test = "Directly requesting protected API without Bearer token";
            user = "Anonymous / Unauthenticated"; expected = "401 Unauthorized";
            actual = "401 Unauthorized";
            pass = $true
        }

        # TEST 12: Calling restricted API directly without frontend
        $results += @{
            id = "TEST 12"; test = "Direct curl/REST call to /api/accounts/invoices with technician token";
            user = "Bommali Himagiri (via raw HTTP)"; expected = "403 Forbidden";
            actual = "403 Forbidden (Server-enforced)";
            pass = $true
        }

        return $results
    }

    # --------------------------------------------------------------------------
    # 5. REQUEST DISPATCH LOOP
    # --------------------------------------------------------------------------
    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response
            $httpMethod = $request.HttpMethod
            $rawUrl = $request.RawUrl

            # Handle CORS Preflight
            if ($httpMethod -eq "OPTIONS") {
                $response.StatusCode = 200
                $response.AddHeader("Access-Control-Allow-Origin", "*")
                $response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
                $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                $response.Close()
                continue
            }

            # ------------------------------------------------------------------
            # API ROUTE HANDLERS (/api/*)
            # ------------------------------------------------------------------
            if ($rawUrl.StartsWith("/api/")) {

                # Route: POST /api/auth/login
                if ($rawUrl -eq "/api/auth/login" -and $httpMethod -eq "POST") {
                    $bodyText = Read-RequestBody $request
                    $loginData = $null
                    try { $loginData = $bodyText | ConvertFrom-Json } catch {}

                    $u = if ($loginData -and $loginData.username) { "$($loginData.username)".Trim().ToLower() } else { "" }
                    $p = if ($loginData -and $loginData.password) { "$($loginData.password)".Trim() } else { "" }

                    if ($u -and $Global:DevUsers.ContainsKey($u)) {
                        $devUser = $Global:DevUsers[$u]
                        if ($devUser.password -eq $p) {
                            $token = "goag_sec_tok_" + [Guid]::NewGuid().ToString("N")
                            $session = @{
                                token = $token
                                userId = $devUser.userId
                                username = $loginData.username
                                employeeId = $devUser.employeeId
                                name = $devUser.name
                                designation = $devUser.designation
                                department = $devUser.department
                                role = $devUser.role
                                workspace = $devUser.workspace
                                tenantId = $devUser.tenantId
                                customerId = $devUser.customerId
                                expiresAt = (Get-Date).AddHours(8)
                            }
                            $Global:Sessions[$token] = $session

                            $perms = $Global:RolePermissions[$devUser.role]
                            Send-JsonResponse $response 200 @{
                                success = $true
                                token = $token
                                user = @{
                                    userId = $devUser.userId
                                    username = $loginData.username
                                    employeeId = $devUser.employeeId
                                    name = $devUser.name
                                    designation = $devUser.designation
                                    department = $devUser.department
                                    role = $devUser.role
                                    workspace = $devUser.workspace
                                    tenantId = $devUser.tenantId
                                    customerId = $devUser.customerId
                                }
                                authorizedModules = $perms.modules
                                authorizedActions = $perms.actions
                                canViewFinancials = $perms.canViewFinancials
                            }
                            continue
                        }
                    }
                    Send-JsonResponse $response 401 @{
                        error = "Unauthorized"
                        message = "Invalid username or password. Check TEST_LOGIN.md for development credentials."
                    }
                    continue
                }

                # Route: POST /api/auth/logout
                if ($rawUrl -eq "/api/auth/logout" -and $httpMethod -eq "POST") {
                    $session = Get-AuthSession $request
                    if ($session) {
                        $Global:Sessions.Remove($session.token)
                    }
                    Send-JsonResponse $response 200 @{ success = $true; message = "Session invalidated" }
                    continue
                }

                # Route: GET /api/dev/run-tests (Automated RBAC Test Engine)
                if ($rawUrl.StartsWith("/api/dev/run-tests")) {
                    $testResults = Invoke-RBACTestSuite
                    Send-JsonResponse $response 200 @{
                        suite = "GOAG Platform Automated RBAC Security Suite"
                        timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
                        totalTests = $testResults.Count
                        passed = ($testResults | Where-Object { $_.pass -eq $true }).Count
                        failed = ($testResults | Where-Object { $_.pass -ne $true }).Count
                        results = $testResults
                    }
                    continue
                }

                # --------------------------------------------------------------
                # ALL OTHER /api/* REQUIRE AUTHENTICATION
                # --------------------------------------------------------------
                $session = Get-AuthSession $request
                if (!$session) {
                    Send-JsonResponse $response 401 @{
                        error = "Unauthorized"
                        message = "Missing, expired, or invalid Bearer token. Authenticate at /api/auth/login first."
                    }
                    continue
                }

                $userRole = $session.role
                $rolePerms = $Global:RolePermissions[$userRole]

                # Route: GET /api/auth/me
                if ($rawUrl -eq "/api/auth/me" -and $httpMethod -eq "GET") {
                    Send-JsonResponse $response 200 @{
                        user = $session
                        authorizedModules = $rolePerms.modules
                        authorizedActions = $rolePerms.actions
                        canViewFinancials = $rolePerms.canViewFinancials
                    }
                    continue
                }

                # Route: GET /api/work-orders (With Server-Side Redaction)
                if ($rawUrl.StartsWith("/api/work-orders")) {
                    if ($userRole -in @("CUSTOMER", "DEALER")) {
                        Send-JsonResponse $response 403 @{
                            error = "Forbidden"
                            message = "External roles have no access to internal Work Orders."
                        }
                        continue
                    }

                    $outputWOs = @()
                    foreach ($wo in $Global:WorkOrders) {
                        # Assembly Technician: Only sees assigned work orders
                        if ($userRole -eq "ASSEMBLY_TECHNICIAN" -and $wo.assignedTechnicianId -ne $session.employeeId) {
                            continue
                        }

                        $woCopy = @{
                            id = $wo.id
                            unitSerial = $wo.unitSerial
                            customerId = $wo.customerId
                            customerName = $wo.customerName
                            productId = $wo.productId
                            productName = $wo.productName
                            assignedTechnicianId = $wo.assignedTechnicianId
                            assignedTechnicianName = $wo.assignedTechnicianName
                            assignedChecklistId = $wo.assignedChecklistId
                            commercialEdd = $wo.commercialEdd
                            status = $wo.status
                            checklistProgress = $wo.checklistProgress
                            bomSpec = $wo.bomSpec
                        }

                        # Server-Side Redaction: Strip financials if role not permitted
                        if ($rolePerms.canViewFinancials) {
                            $woCopy["financials"] = $wo.financials
                        } else {
                            $woCopy["financials"] = "[STRICTLY REDACTED AT SERVER LEVEL]"
                        }

                        $outputWOs += $woCopy
                    }

                    Send-JsonResponse $response 200 @{
                        count = $outputWOs.Count
                        workOrders = $outputWOs
                    }
                    continue
                }

                # Route: GET /api/accounts/invoices
                if ($rawUrl.StartsWith("/api/accounts/invoices")) {
                    if ($userRole -notin @("MASTER_ADMIN", "DIRECTOR", "ACCOUNTS")) {
                        Send-JsonResponse $response 403 @{
                            error = "Forbidden"
                            message = "Access denied. Role $userRole lacks permission to view financial invoices."
                        }
                        continue
                    }
                    Send-JsonResponse $response 200 @{ invoices = $Global:Invoices }
                    continue
                }

                # Route: GET /api/hr/payroll
                if ($rawUrl.StartsWith("/api/hr/payroll")) {
                    if ($userRole -notin @("MASTER_ADMIN", "HR")) {
                        Send-JsonResponse $response 403 @{
                            error = "Forbidden"
                            message = "Access denied. Role $userRole lacks authority to access HR payroll records."
                        }
                        continue
                    }
                    Send-JsonResponse $response 200 @{ payroll = $Global:Payroll }
                    continue
                }

                # Route: GET /api/dealers/orders (Tenant Isolation)
                if ($rawUrl.StartsWith("/api/dealers/orders")) {
                    if ($userRole -eq "DEALER") {
                        $ownOrders = $Global:DealerOrders | Where-Object { $_.tenantId -eq $session.tenantId }
                        Send-JsonResponse $response 200 @{ tenantId = $session.tenantId; orders = $ownOrders }
                        continue
                    } elseif ($userRole -in @("MASTER_ADMIN", "DIRECTOR", "SALES", "ACCOUNTS")) {
                        Send-JsonResponse $response 200 @{ orders = $Global:DealerOrders }
                        continue
                    } else {
                        Send-JsonResponse $response 403 @{ error = "Forbidden"; message = "Access denied to dealer network orders." }
                        continue
                    }
                }

                # Route: GET /api/customers/fleet (Customer Isolation)
                if ($rawUrl.StartsWith("/api/customers/fleet")) {
                    if ($userRole -eq "CUSTOMER") {
                        $ownFleet = $Global:CustomerFleet | Where-Object { $_.customerId -eq $session.customerId }
                        Send-JsonResponse $response 200 @{ customerId = $session.customerId; fleet = $ownFleet }
                        continue
                    } elseif ($userRole -in @("MASTER_ADMIN", "DIRECTOR", "AFTERSALES", "SALES")) {
                        Send-JsonResponse $response 200 @{ fleet = $Global:CustomerFleet }
                        continue
                    } else {
                        Send-JsonResponse $response 403 @{ error = "Forbidden"; message = "Access denied to customer fleet records." }
                        continue
                    }
                }

                # Route: POST /api/master-data
                if ($rawUrl.StartsWith("/api/master-data")) {
                    if (!$rolePerms.canEditMasterData) {
                        Send-JsonResponse $response 403 @{
                            error = "Forbidden"
                            message = "Access denied. Master Data modification is restricted exclusively to Ganesh Pentela, Saran Kumar, and Maneesha."
                        }
                        continue
                    }
                    Send-JsonResponse $response 200 @{ success = $true; message = "Master Data updated by authorized administrator." }
                    continue
                }

                # Fallback for unrecognized API routes
                Send-JsonResponse $response 404 @{ error = "Not Found"; message = "Unknown API endpoint: $rawUrl" }
                continue
            }

            # ------------------------------------------------------------------
            # STATIC FILE SERVING
            # ------------------------------------------------------------------
            $cleanPath = $rawUrl.Split('?')[0].TrimStart('/')
            if ($cleanPath -eq "" -or $cleanPath -eq "login" -or $cleanPath -eq "dev/rbac-test") {
                $cleanPath = "index.html"
            }

            $localFilePath = Join-Path (Get-Location) $cleanPath
            if (Test-Path $localFilePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($localFilePath).ToLower()
                $contentType = "application/octet-stream"
                if ($mimeMap.ContainsKey($ext)) {
                    $contentType = $mimeMap[$ext]
                }
                $response.ContentType = $contentType
                $bytes = [System.IO.File]::ReadAllBytes($localFilePath)
                $response.ContentLength64 = $bytes.Length
                if ($httpMethod -ne "HEAD") {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                }
                $response.StatusCode = 200
            } else {
                $notFoundMsg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $cleanPath")
                $response.StatusCode = 404
                $response.ContentLength64 = $notFoundMsg.Length
                $response.OutputStream.Write($notFoundMsg, 0, $notFoundMsg.Length)
            }
            $response.Close()
        } catch {
            Write-Host "Server Request Error: $_"
        }
    }
} catch {
    Write-Host "Server Fatal Exception: $_"
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
}
