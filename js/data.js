// GOAG Platform - Authoritative Data Model & Master Seed Data
// Based on GOAG_Platform_Business_Flow_Functional_Architecture_v1.0.pdf

const GOAG_DEFAULT_DATA = {
  // 1. Authoritative 23-Employee Master Directory (Page 5)
  employees: [
    {
      id: "GOAG-A001",
      name: "Yalamarthi Tulasi Ram",
      designation: "Cofounder, Director",
      department: "Executive Management",
      role: "director",
      email: "tulasi.ram@goag.in",
      phone: "+91 98480 11001",
      baseSalary: 180000,
      avatar: "TR",
      responsibilities: "Simple Director dashboard: Financials, Sales, Production tracking, Marketing schedule, Vendor payment schedules."
    },
    {
      id: "GOAG-A002",
      name: "Bandaru Santhosh Kumar",
      designation: "Cofounder, Director",
      department: "Executive Management",
      role: "director",
      email: "santhosh.kumar@goag.in",
      phone: "+91 98480 11002",
      baseSalary: 180000,
      avatar: "SK",
      responsibilities: "Simple Director dashboard: Financials, Sales, Production tracking, Vendor management & purchase approvals."
    },
    {
      id: "GOAG-A003",
      name: "V Vishwateja Kumar Reddy",
      designation: "Cofounder, Head Quality Control",
      department: "QC & Procurement",
      role: "qc_lead",
      email: "vishwateja@goag.in",
      phone: "+91 98480 11003",
      baseSalary: 180000,
      avatar: "VK",
      responsibilities: "Director dashboard: Financials, Sales, Production, Vendor management, Payment schedules, Custom quote approvals, Purchase lead, QC audits."
    },
    {
      id: "GOAG-A004",
      name: "Battula Saran Kumar",
      designation: "Cofounder, Head of Finance",
      department: "Finance & Accounts",
      role: "finance_lead",
      email: "saran.kumar@goag.in",
      phone: "+91 98480 11004",
      baseSalary: 180000,
      avatar: "BS",
      responsibilities: "Director dashboard: Financials, Sales, Production, Store inventory tracking, Vendor management, Payments, Custom quote approvals, Tax admin."
    },
    {
      id: "GOAG-A005",
      name: "Ganesh Pentela",
      designation: "Cofounder, Head - HR & Operations",
      department: "Operations & HR",
      role: "master_admin",
      email: "ganesh.pentela@goag.in",
      phone: "+91 98480 11005",
      baseSalary: 200000,
      avatar: "GP",
      responsibilities: "Master access to entire ERP: Director dashboard, Store inventory, Vendor management, Quote approvals, Leave approvals, full HR/Payroll admin."
    },
    {
      id: "GOAG-A006",
      name: "Vamsi Krishna K",
      designation: "Cofounder, Head Aftersales",
      department: "Executive & Aftersales",
      role: "director",
      email: "vamsi.krishna@goag.in",
      phone: "+91 98480 11006",
      baseSalary: 180000,
      avatar: "VK",
      responsibilities: "Director dashboard: Financials, Sales, Production, Store inventory tracking, Vendor management, Payment schedules, Quote approvals."
    },
    {
      id: "GOAG-E007",
      name: "Kapil Kumar K",
      designation: "Production Manager",
      department: "Production Operations",
      role: "production_mgr",
      email: "kapil.kumar@goag.in",
      phone: "+91 98480 12007",
      baseSalary: 75000,
      avatar: "KK",
      responsibilities: "Sending quotes internally, Store inventory (view only), Task assignment, Component purchase requests, Leave/Payslip ESS access."
    },
    {
      id: "GOAG-E008",
      name: "Mandugula Vamshi Teja",
      designation: "Manager - Sales",
      department: "Commercial Sales",
      role: "sales_mgr",
      email: "vamshi.teja@goag.in",
      phone: "+91 98480 12008",
      baseSalary: 65000,
      avatar: "VT",
      responsibilities: "Customer data entry & tracking (lead to sale, delivery date confirmation), Marketing plan, Auto/Manual quotes, Leave/Payslip ESS."
    },
    {
      id: "GOAG-E009",
      name: "Voleti Veera Babu",
      designation: "Lead Production, R&D",
      department: "Production & R&D",
      role: "rd_lead",
      email: "veera.babu@goag.in",
      phone: "+91 98480 12009",
      baseSalary: 70000,
      avatar: "VB",
      responsibilities: "Store inventory (view only), Task assignment to technicians, Component purchase requests, Leave/Payslip ESS, Isolated R&D workspace lead."
    },
    {
      id: "GOAG-E010",
      name: "Meegala Vikas",
      designation: "Lead - Aftersales",
      department: "Aftersales Support",
      role: "aftersales_lead",
      email: "vikas.meegala@goag.in",
      phone: "+91 98480 12010",
      baseSalary: 55000,
      avatar: "MV",
      responsibilities: "Aftersales customer tracking (entry to delivery confirmation), Service diagnostics, Warranty override authority, Handover OTP, Supervisor."
    },
    {
      id: "GOAG-E011",
      name: "Guduri Harsha Deep",
      designation: "Supervisor - Sales & Purchase",
      department: "Stores & Procurement",
      role: "stores_supervisor",
      email: "harsha.deep@goag.in",
      phone: "+91 98480 12011",
      baseSalary: 45000,
      avatar: "HD",
      responsibilities: "Store inventory tracking & daily inward/outward updates, Raising purchase requests, Packing & Dispatch verification, Leave/Payslip ESS."
    },
    {
      id: "GOAG-E012",
      name: "Uppalapati Maneesha",
      designation: "Admin Assistant & Accountant",
      department: "Accounts & HR Admin",
      role: "accountant_hr",
      email: "maneesha.u@goag.in",
      phone: "+91 98480 12012",
      baseSalary: 48000,
      avatar: "UM",
      responsibilities: "Store inventory & inward/outward updation, Purchase requests, Invoices (Cash & Bank sequences) & E-Way bills, Petty cash ledger, HR admin."
    },
    {
      id: "GOAG-E013",
      name: "Darla Chandra Shekar",
      designation: "Design Engineer",
      department: "Engineering & Design",
      role: "design_eng",
      email: "chandra.shekar@goag.in",
      phone: "+91 98480 12013",
      baseSalary: 42000,
      avatar: "CS",
      responsibilities: "CAD Modeling, prototype simulations in R&D sandbox, Standard Employee Self-Service."
    },
    {
      id: "GOAG-E014",
      name: "Bommali Himagiri",
      designation: "Drone Technician",
      department: "UAV Assembly & Fab",
      role: "technician",
      email: "himagiri.b@goag.in",
      phone: "+91 98480 12014",
      baseSalary: 32000,
      avatar: "BH",
      responsibilities: "Standard ESS: Assigned drone manufacturing tasks, executing 20-page checklists (e.g. GOAG-5X-001), timesheet tracking."
    },
    {
      id: "GOAG-E015",
      name: "Bommali Yuvaraju",
      designation: "Senior Technician Drone Assembling",
      department: "UAV Assembly",
      role: "technician",
      email: "yuvaraju.b@goag.in",
      phone: "+91 98480 12015",
      baseSalary: 35000,
      avatar: "BY",
      responsibilities: "Standard ESS: Assigned assembly tasks, executing 20-page checklists, regular employee dashboard."
    },
    {
      id: "GOAG-E016",
      name: "Ghanta Sasidhar",
      designation: "Drone Technician",
      department: "UAV Assembly",
      role: "technician",
      email: "sasidhar.g@goag.in",
      phone: "+91 98480 12016",
      baseSalary: 30000,
      avatar: "GS",
      responsibilities: "Standard ESS: Assigned manufacturing tasks, executing product checklists, payslip requests."
    },
    {
      id: "GOAG-E017",
      name: "Kaluva Palle Venkatesh",
      designation: "Drone Technician",
      department: "UAV Assembly",
      role: "technician",
      email: "venkatesh.k@goag.in",
      phone: "+91 98480 12017",
      baseSalary: 30000,
      avatar: "KV",
      responsibilities: "Standard ESS: Assigned assembly tasks, executing product checklists, payslip requests."
    },
    {
      id: "GOAG-E018",
      name: "Jagana Adhi Lakshmi",
      designation: "Drone Technician",
      department: "UAV Assembly",
      role: "technician",
      email: "adhi.lakshmi@goag.in",
      phone: "+91 98480 12018",
      baseSalary: 30000,
      avatar: "AL",
      responsibilities: "Standard ESS: Assigned assembly tasks, executing product checklists, payslip requests."
    },
    {
      id: "GOAG-E019",
      name: "Vuppala Yashwanth Kumar",
      designation: "UAV Engineer",
      department: "Avionics & Systems",
      role: "uav_engineer",
      email: "yashwanth.v@goag.in",
      phone: "+91 98480 12019",
      baseSalary: 45000,
      avatar: "YK",
      responsibilities: "Standard ESS: Assigned technical tasks, executing assembly & flight checklists, flight test pilot."
    },
    {
      id: "GOAG-E020",
      name: "Shaik Muzeeb",
      designation: "Drone Technician",
      department: "UAV Assembly",
      role: "technician",
      email: "muzeeb.s@goag.in",
      phone: "+91 98480 12020",
      baseSalary: 30000,
      avatar: "SM",
      responsibilities: "Standard ESS: Assigned assembly tasks, executing product checklists, payslip requests."
    },
    {
      id: "GOAG-E021",
      name: "Mandem Ashok Kumar",
      designation: "Sales Executive",
      department: "Commercial Sales",
      role: "sales_exec",
      email: "ashok.kumar@goag.in",
      phone: "+91 98480 12021",
      baseSalary: 35000,
      avatar: "AK",
      responsibilities: "Standard ESS: Inbound inquiry logging, Auto quotes generation (strictly catalog prices), customer data entry."
    },
    {
      id: "GOAG-E022",
      name: "Sardena Vijay Kumar",
      designation: "Drone Technician",
      department: "UAV Assembly",
      role: "technician",
      email: "vijay.kumar@goag.in",
      phone: "+91 98480 12022",
      baseSalary: 30000,
      avatar: "VK",
      responsibilities: "Standard ESS: Assigned assembly tasks, executing product checklists, payslip requests."
    },
    {
      id: "GOAG-E023",
      name: "Thotakura Saida Rao",
      designation: "UAV Engineer",
      department: "Avionics & Testing",
      role: "uav_engineer",
      email: "saida.rao@goag.in",
      phone: "+91 98480 12023",
      baseSalary: 46000,
      avatar: "SR",
      responsibilities: "Standard ESS: Avionics calibration, flight test protocol execution & pass/fail certification, service diagnostics."
    }
  ],

  // 2. Master Products Catalog (Section 4)
  products: [
    {
      id: "PROD-5X",
      name: "GOAG 5X Heavy-Lift Drone",
      category: "Agricultural Drone",
      basePrice: 485000,
      hsn: "88069200",
      gstRate: 18,
      leadTimeDays: 7,
      description: "16-Liter agricultural hexacopter with dual 22000mAh smart batteries, radar obstacle avoidance, and precision spray boom.",
      image: "assets/goag_5x_drone.jpg"
    },
    {
      id: "PROD-GRAYDON",
      name: "Graydon Industrial Drone",
      category: "Surveillance & Mapping",
      basePrice: 375000,
      hsn: "88069300",
      gstRate: 18,
      leadTimeDays: 10,
      description: "Long-endurance carbon hybrid quadcopter with 30x optical zoom gimbal and dual-frequency RTK GNSS receiver.",
      image: "assets/drone_assembly_lab.jpg"
    },
    {
      id: "PROD-SPRAY-16L",
      name: "16L Smart Spraying Rig Module",
      category: "Payload System",
      basePrice: 48000,
      hsn: "84248990",
      gstRate: 12,
      leadTimeDays: 3,
      description: "High-pressure brushless diaphragm pump, quick-lock 16L tank, centrifugal atomizing nozzles, and level sensor.",
      image: "assets/drone_field_operations.jpg"
    },
    {
      id: "PROD-GCS-TAB",
      name: "GOAG Ground Control Station (GCS)",
      category: "Avionics & Remote",
      basePrice: 65000,
      hsn: "85269190",
      gstRate: 18,
      leadTimeDays: 4,
      description: "Handheld 7-inch sunlight readable touchscreen telemetry station with dual-band 2.4/5.8GHz video transmission link.",
      image: "assets/drone_field_operations.jpg"
    }
  ],

  // 3. Components & Spares Master (Section 4)
  components: [
    { id: "COMP-MOT-8318", name: "Brushless Motor 8318 100KV", category: "Propulsion", unit: "Pcs", unitCost: 8500, listPrice: 10500, stockQty: 28, reorderLevel: 12, hsn: "85013119", gstRate: 18 },
    { id: "COMP-ESC-80A", name: "FOC Smart ESC 80A 12S", category: "Propulsion", unit: "Pcs", unitCost: 3800, listPrice: 4800, stockQty: 34, reorderLevel: 15, hsn: "85044090", gstRate: 18 },
    { id: "COMP-PROP-3011", name: "30x11 Carbon Fiber Folding Propeller (Pair)", category: "Propulsion", unit: "Pair", unitCost: 2600, listPrice: 3400, stockQty: 22, reorderLevel: 10, hsn: "88073000", gstRate: 18 },
    { id: "COMP-FC-CUBE", name: "Cube Orange+ Flight Controller Kit", category: "Avionics", unit: "Kit", unitCost: 38000, listPrice: 46000, stockQty: 9, reorderLevel: 5, hsn: "90142000", gstRate: 18 },
    { id: "COMP-GPS-HERE4", name: "Here4 Dual-Band RTK GPS/Compass", category: "Avionics", unit: "Pcs", unitCost: 18500, listPrice: 22500, stockQty: 11, reorderLevel: 6, hsn: "85269190", gstRate: 18 },
    { id: "COMP-BATT-22K", name: "Smart Flight Battery 22000mAh 12S", category: "Power", unit: "Pcs", unitCost: 34000, listPrice: 42000, stockQty: 16, reorderLevel: 8, hsn: "85076000", gstRate: 18 },
    { id: "COMP-PDB-12S", name: "Heavy-Lift PDB 12S 200A with BEC", category: "Power", unit: "Pcs", unitCost: 4500, listPrice: 6200, stockQty: 14, reorderLevel: 6, hsn: "85371000", gstRate: 18 },
    { id: "COMP-PUMP-BL", name: "Brushless Diaphragm Spray Pump 12S", category: "Spray System", unit: "Pcs", unitCost: 5200, listPrice: 7000, stockQty: 8, reorderLevel: 5, hsn: "84138190", gstRate: 12 },
    { id: "COMP-NOZZLE-4X", name: "Centrifugal Atomizing Nozzle Set (4x)", category: "Spray System", unit: "Set", unitCost: 6500, listPrice: 8800, stockQty: 10, reorderLevel: 4, hsn: "84249000", gstRate: 12 },
    { id: "COMP-FRAME-5X", name: "Carbon Fiber Hexacopter Foldable Airframe 5X", category: "Structure", unit: "Kit", unitCost: 62000, listPrice: 82000, stockQty: 5, reorderLevel: 3, hsn: "88079000", gstRate: 18 }
  ],

  // 4. Engineering Bill-of-Materials (BOM) for GOAG 5X (Section 4 & 13)
  bomGOAG5X: [
    { componentId: "COMP-FRAME-5X", name: "Carbon Fiber Hexacopter Airframe 5X", qty: 1 },
    { componentId: "COMP-MOT-8318", name: "Brushless Motor 8318 100KV", qty: 6 },
    { componentId: "COMP-ESC-80A", name: "FOC Smart ESC 80A 12S", qty: 6 },
    { componentId: "COMP-PROP-3011", name: "30x11 Carbon Fiber Folding Propeller (Pair)", qty: 3 },
    { componentId: "COMP-FC-CUBE", name: "Cube Orange+ Flight Controller Kit", qty: 1 },
    { componentId: "COMP-GPS-HERE4", name: "Here4 Dual-Band RTK GPS/Compass", qty: 1 },
    { componentId: "COMP-PDB-12S", name: "Heavy-Lift PDB 12S 200A with BEC", qty: 1 },
    { componentId: "COMP-BATT-22K", name: "Smart Flight Battery 22000mAh 12S", qty: 2 },
    { componentId: "COMP-PUMP-BL", name: "Brushless Diaphragm Spray Pump 12S", qty: 1 },
    { componentId: "COMP-NOZZLE-4X", name: "Centrifugal Atomizing Nozzle Set (4x)", qty: 1 }
  ],

  // 5. Customer Registry (Section 8)
  customers: [
    {
      id: "CUST-8492",
      name: "Krishna Agri Enterprises",
      contactPerson: "K. Murali Krishna",
      phone: "+91 94401 22849",
      email: "murali@krishnaagri.com",
      company: "Krishna Agri Enterprises Ltd.",
      address: "D.No 4-22, Industrial Area, Auto Nagar",
      city: "Vijayawada",
      state: "Andhra Pradesh",
      pincode: "520007",
      gstin: "37AABCK8492Q1ZT",
      type: "Commercial Agricultural Operator",
      activeAircraft: ["GOAG-5X-001"],
      totalSpend: 1144600
    },
    {
      id: "CUST-8493",
      name: "Deccan Drone Agro Tech",
      contactPerson: "Dr. R. K. Varma",
      phone: "+91 98492 44551",
      email: "info@deccanagro.in",
      company: "Deccan Drone Agro Tech Pvt. Ltd.",
      address: "Plot 18, Agri Tech Park, Shamshabad",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "501218",
      gstin: "36AACCD9182P1ZV",
      type: "Commercial Service Provider",
      activeAircraft: ["GOAG-5X-003", "GOAG-GD-002"],
      totalSpend: 1680000
    },
    {
      id: "CUST-8494",
      name: "Punjab Green Fields FPO",
      contactPerson: "Harpreet Singh Gill",
      phone: "+91 98140 77123",
      email: "harpreet@punjabgreen.org",
      company: "Punjab Green Fields Farmers Collective",
      address: "GT Road, Near Canal Colony",
      city: "Ludhiana",
      state: "Punjab",
      pincode: "141001",
      gstin: "03AAGCP5512B1ZR",
      type: "Farmer Producer Organisation",
      activeAircraft: ["GOAG-5X-004"],
      totalSpend: 572300
    }
  ],

  // 6. Authorized Dealers (Section 31 & 32)
  dealers: [
    {
      id: "DEALER-01",
      name: "Sri Balaji Drone Works & Spares",
      contactPerson: "P. Satyanarayana",
      phone: "+91 98485 33221",
      city: "Rajahmundry",
      state: "Andhra Pradesh",
      pincode: "533101",
      gstin: "37AADCS9812M1Z5",
      creditLimit: 1500000,
      currentBalance: 420000,
      discountPct: 15,
      activeOrdersCount: 2
    },
    {
      id: "DEALER-02",
      name: "Deccan Precision Agri Hub",
      contactPerson: "S. Venkat Rao",
      phone: "+91 98490 66778",
      city: "Warangal",
      state: "Telangana",
      pincode: "506002",
      gstin: "36AABFD7712J1Z8",
      creditLimit: 2000000,
      currentBalance: 680000,
      discountPct: 18,
      activeOrdersCount: 3
    }
  ],

  // 7. Work Orders (Section 7, 9, 10)
  workOrders: [
    {
      id: "WO-2026-05X-014",
      unitSerial: "GOAG-5X-001",
      customerId: "CUST-8492",
      customerName: "Krishna Agri Enterprises",
      customerContact: "+91 94401 22849",
      productId: "PROD-5X",
      productName: "GOAG 5X Heavy-Lift Drone",
      quantity: 1,
      bomSpec: "Standard 5X Quad Rigs + Dual Smart Battery + 16L Spray Rig",
      commercialEdd: "18-Oct-2026",
      approxUsualTimeHours: 4.5,
      actualElapsedHours: 3.2,
      assignedTechnicianId: "GOAG-E014",
      assignedTechnicianName: "Bommali Himagiri",
      assignedChecklistId: "CL-5X-001-A",
      status: "In Assembly (20p)", // WO Created -> BOM Checked -> Assigned -> In Assembly (20p) -> Ready Test Fly -> Ready QC -> Ready Dispatch -> Delivered
      bomStatus: "Sufficient (100% Reserved)",
      flightPilotId: "GOAG-E023",
      flightPilotName: "Thotakura Saida Rao",
      qcInspectorId: "GOAG-A003",
      qcInspectorName: "V Vishwateja Kumar Reddy",
      checklistProgress: 14, // 14 out of 20 stages done
      // STRICTLY REDACTED FROM TECHNICIANS (Section 7):
      financials: {
        itemSellingPrice: 485000,
        gstAmount: 87300,
        totalInvoiceValue: 572300,
        advancePaymentReceived: 300000,
        outstandingBalance: 272300,
        discounts: 0,
        commercialTerms: "50% Advance, Balance prior to dispatch"
      }
    },
    {
      id: "WO-2026-05X-015",
      unitSerial: "GOAG-5X-002",
      customerId: "CUST-8493",
      customerName: "Deccan Drone Agro Tech",
      customerContact: "+91 98492 44551",
      productId: "PROD-5X",
      productName: "GOAG 5X Heavy-Lift Drone",
      quantity: 1,
      bomSpec: "Standard 5X Quad Rigs + Dual Smart Battery + 16L Spray Rig",
      commercialEdd: "24-Oct-2026",
      approxUsualTimeHours: 4.5,
      actualElapsedHours: 0.0,
      assignedTechnicianId: "GOAG-E015",
      assignedTechnicianName: "Bommali Yuvaraju",
      assignedChecklistId: "CL-5X-002-A",
      status: "BOM Checked",
      bomStatus: "Shortage Detected (Waiting for Motors)",
      flightPilotId: "GOAG-E019",
      flightPilotName: "Vuppala Yashwanth Kumar",
      qcInspectorId: "GOAG-A003",
      qcInspectorName: "V Vishwateja Kumar Reddy",
      checklistProgress: 0,
      financials: {
        itemSellingPrice: 485000,
        gstAmount: 87300,
        totalInvoiceValue: 572300,
        advancePaymentReceived: 286150,
        outstandingBalance: 286150,
        discounts: 0,
        commercialTerms: "50% Advance, Balance on delivery"
      }
    },
    {
      id: "WO-2026-05X-012",
      unitSerial: "GOAG-5X-000",
      customerId: "CUST-8494",
      customerName: "Punjab Green Fields FPO",
      customerContact: "+91 98140 77123",
      productId: "PROD-5X",
      productName: "GOAG 5X Heavy-Lift Drone",
      quantity: 1,
      bomSpec: "Standard 5X Quad Rigs + Dual Smart Battery",
      commercialEdd: "05-Oct-2026",
      approxUsualTimeHours: 4.5,
      actualElapsedHours: 4.3,
      assignedTechnicianId: "GOAG-E014",
      assignedTechnicianName: "Bommali Himagiri",
      assignedChecklistId: "CL-5X-000-A",
      status: "Ready Dispatch",
      bomStatus: "Delivered to Dispatch Staging",
      flightPilotId: "GOAG-E023",
      flightPilotName: "Thotakura Saida Rao",
      qcInspectorId: "GOAG-A003",
      qcInspectorName: "V Vishwateja Kumar Reddy",
      checklistProgress: 20,
      financials: {
        itemSellingPrice: 485000,
        gstAmount: 87300,
        totalInvoiceValue: 572300,
        advancePaymentReceived: 572300,
        outstandingBalance: 0,
        discounts: 0,
        commercialTerms: "100% Cleared via NEFT"
      }
    }
  ],

  // 8. 20-Page Manufacturing & Assembly Checklist Template (Section 10, Page 13)
  checklistStagesTemplate: [
    { page: 1, domain: "Airframe & Structural Hardware", test: "Carbon tube alignment, fold-joint rigidity check", action: "Visual alignment & joint locking inspection", passed: true, remarks: "Tubes seated at 0.0 deg deviation" },
    { page: 2, domain: "Airframe & Structural Hardware", test: "Motor mount torque check (3.5 Nm torque wrench)", action: "Torque verification per arm mount bolt", passed: true, remarks: "Torque calibrated with certified wrench" },
    { page: 3, domain: "Airframe & Structural Hardware", test: "Landing gear dampening & skid lock engagement", action: "Mechanical drop damper compression test", passed: true, remarks: "Damper rebound nominal" },
    { page: 4, domain: "Propulsion & Power Harness", test: "ESC wiring polarity & heat sink thermal paste", action: "Thermal paste application & polarity check", passed: true, remarks: "Polarity verified on all 6 ESCs" },
    { page: 5, domain: "Propulsion & Power Harness", test: "Main XT90 power lead solder to PDB & insulation", action: "Solder joint resistance (<0.05 Ohm) test", passed: true, remarks: "Measured 0.02 Ohm resistance" },
    { page: 6, domain: "Propulsion & Power Harness", test: "Motor spin orientation check (CW/CCW sequence)", action: "Prop-off motor direction indicator verify", passed: true, remarks: "Motors 1,3,5 CCW, 2,4,6 CW verified" },
    { page: 7, domain: "Avionics & Flight Controller", test: "Flight controller vibration dampening silicone isolators", action: "Damping plate resonance vibration check", passed: true, remarks: "Triple-axis dampeners seated" },
    { page: 8, domain: "Avionics & Flight Controller", test: "PDB power distribution & dual BEC rail continuity", action: "Multimeter continuity check across rails", passed: true, remarks: "Zero short circuits detected" },
    { page: 9, domain: "Avionics & Flight Controller", test: "BEC 5V and 12V voltage calibration under 2A load", action: "Multimeter voltage logging (5.12V / 12.04V)", passed: true, remarks: "Stable rail output confirmed" },
    { page: 10, domain: "Sensors, Telemetry & GPS", test: "Dual GPS compass offset & magnetometer calibration", action: "GCS telemetry calibration log", passed: true, remarks: "Compass offsets within 150 count range" },
    { page: 11, domain: "Sensors, Telemetry & GPS", test: "RF telemetry link strength (433/915MHz RSSI > -60dBm)", action: "RSSI link benchmark at 10m", passed: true, remarks: "Signal strength -48 dBm verified" },
    { page: 12, domain: "Sensors, Telemetry & GPS", test: "Lidar rangefinder & obstacle avoidance radar calibration", action: "Ground proximity distance test (0.5m to 15m)", passed: true, remarks: "Millimeter accuracy confirmed" },
    { page: 13, domain: "Payload & Application Systems", test: "Agricultural 16L tank ultrasonic liquid level sensor zeroing", action: "Empty/Full water calibration check", passed: true, remarks: "Sensor calibrated to 0L and 16L levels" },
    { page: 14, domain: "Payload & Application Systems", test: "Brushless chemical pump pressure & flow rate benchmark", action: "Functional wet flow rate test (4.5 L/min)", passed: true, remarks: "Flow rate 4.6 L/min at 60 psi" },
    { page: 15, domain: "Payload & Application Systems", test: "Centrifugal atomizing nozzle spray pattern & cutoff valve", action: "Uniform mist verification & zero-drip test", passed: false, remarks: "Pending nozzle pressure test" },
    { page: 16, domain: "Firmware & Ground Station", test: "Flashing stable ArduCopter firmware & PID parameter load", action: "Firmware version & parameter hash commit", passed: false, remarks: "Waiting for firmware lock" },
    { page: 17, domain: "Firmware & Ground Station", test: "RC failsafe link loss & automated RTH altitude locking", action: "Transmitter switch-off failsafe trigger", passed: false, remarks: "To be verified on bench" },
    { page: 18, domain: "Ground Bench & Safety Audit", test: "Arming switch safety check & dual battery latch lock", action: "Arming interlock and mechanical latch test", passed: false, remarks: "Bench safety audit pending" },
    { page: 19, domain: "Ground Bench & Safety Audit", test: "Prop-off high throttle ramp & dynamic amp draw test", action: "Current draw measurement under full throttle", passed: false, remarks: "Scheduled after nozzle test" },
    { page: 20, domain: "Pre-Flight Readiness Sign-Off", test: "Tool inventory check, clean build verification & pilot handoff", action: "Lead technician digital signature commit", passed: false, remarks: "Final gate before Flight Test queue" }
  ],

  // 9. Quotations (Section 6, 7)
  quotations: [
    {
      id: "GOAG-QT-2026-0182",
      customerId: "CUST-8492",
      customerName: "Krishna Agri Enterprises",
      customerContact: "+91 94401 22849",
      pincode: "520007",
      salesPerson: "Mandugula Vamshi Teja",
      type: "Custom", // Auto vs Custom
      products: [{ productId: "PROD-5X", name: "GOAG 5X Heavy-Lift Drone", qty: 1, unitPrice: 485000, hsn: "88069200", gstRate: 18 }],
      subtotal: 485000,
      gstType: "Intrastate (CGST 9% + SGST 9%)",
      cgst: 43650,
      sgst: 43650,
      igst: 0,
      total: 572300,
      discountGiven: 15000,
      directorApproval: {
        required: true,
        approved: true,
        approvedBy: "Battula Saran Kumar (GOAG-A004)",
        approvalDate: "01-Oct-2026"
      },
      status: "Confirmed & Work Order Spawned",
      dateCreated: "01-Oct-2026"
    },
    {
      id: "GOAG-QT-2026-0183",
      customerId: "CUST-8493",
      customerName: "Deccan Drone Agro Tech",
      customerContact: "+91 98492 44551",
      pincode: "501218",
      salesPerson: "Mandem Ashok Kumar",
      type: "Auto", // Auto pulls list price
      products: [{ productId: "PROD-5X", name: "GOAG 5X Heavy-Lift Drone", qty: 1, unitPrice: 485000, hsn: "88069200", gstRate: 18 }],
      subtotal: 485000,
      gstType: "Interstate (IGST 18%)",
      cgst: 0,
      sgst: 0,
      igst: 87300,
      total: 572300,
      discountGiven: 0,
      directorApproval: { required: false, approved: true, approvedBy: "Auto-System Rule" },
      status: "Client Reviewing",
      dateCreated: "02-Oct-2026"
    }
  ],

  // 10. Financial Invoices (Section 17 - Mandatory Cash vs Bank Segregation)
  invoices: [
    {
      id: "GOAG-ACCT-INV-2026-0041",
      sequenceType: "Account (Bank) Sequence",
      workOrderId: "WO-2026-05X-012",
      customerId: "CUST-8494",
      customerName: "Punjab Green Fields FPO",
      gstin: "03AAGCP5512B1ZR",
      amount: 485000,
      taxAmount: 87300,
      totalAmount: 572300,
      paymentMode: "Bank NEFT Transfer (UTR: HDFC0092182741)",
      paymentStatus: "100% Cleared",
      eWayBillNo: "281098471629",
      eWayBillStatus: "Generated (Consignment > ₹50,000)",
      vehicleNumber: "AP 16 TX 4921",
      date: "28-Sep-2026",
      generatedBy: "Uppalapati Maneesha (GOAG-E012)"
    },
    {
      id: "GOAG-CASH-INV-2026-0008",
      sequenceType: "Cash Transaction Sequence",
      workOrderId: null,
      customerId: "CUST-8492",
      customerName: "Krishna Agri Enterprises (Counter Pickup)",
      gstin: "37AABCK8492Q1ZT",
      amount: 14200,
      taxAmount: 2556,
      totalAmount: 16756,
      paymentMode: "Physical Cash Receipt",
      paymentStatus: "Cash Book Credited",
      eWayBillNo: "N/A (< ₹50,000 threshold)",
      eWayBillStatus: "Exempt",
      vehicleNumber: "Customer Self Handover",
      date: "30-Sep-2026",
      generatedBy: "Uppalapati Maneesha (GOAG-E012)"
    }
  ],

  // 11. Dual-Path Petty Cash & Vouchers (Section 16)
  pettyCash: [
    {
      id: "PETTY-2026-0084",
      path: "Path A: Accounts-Initiated",
      payee: "Sri Sai Industrial Hardware",
      category: "Workshop Consumables & Fasteners",
      amount: 3450,
      date: "01-Oct-2026",
      initiator: "Uppalapati Maneesha (GOAG-E012)",
      approver: "Battula Saran Kumar (GOAG-A004)",
      voucherImageUrl: "assets/drone_assembly_lab.jpg",
      status: "Committed to Monthly Expense Ledger"
    },
    {
      id: "PETTY-2026-0085",
      path: "Path B: Employee Reimbursement Claim",
      payee: "HP Fuel Station (Field Test Transport)",
      category: "Vehicle Test Fuel & Transit",
      amount: 2200,
      date: "02-Oct-2026",
      initiator: "Bommali Himagiri (GOAG-E014)",
      approver: "Uppalapati Maneesha (GOAG-E012)",
      voucherImageUrl: "assets/drone_field_operations.jpg",
      status: "Approved & Reimbursed"
    }
  ],

  // 12. Aftersales Service & Defect Analytics (Section 20, 21, 22, 23, 24)
  serviceTickets: [
    {
      id: "SRV-2026-BR01-0842",
      droneSerial: "5X-2026-001",
      customerName: "Krishna Agri Enterprises",
      customerPhone: "+91 94401 22849",
      dateIntake: "29-Sep-2026",
      symptomCategory: "Motor 2 Bearing Noise & Vibrations",
      intakeOtp: "7492",
      intakeOtpVerified: true,
      accessoriesBrought: ["Hexacopter Airframe", "Remote GCS Tab", "2x Smart Batteries (SN-8821, SN-8822)"],
      intakeDamagePhotos: ["assets/goag_5x_drone.jpg"],
      assignedTechnicianId: "GOAG-E014",
      assignedTechnicianName: "Bommali Himagiri",
      supervisorId: "GOAG-E010",
      supervisorName: "Meegala Vikas",
      usualServiceDurationHours: 3.0,
      actualElapsedHours: 2.2,
      workRemarks: "Replaced Arm 2 Brushless Motor bearing and calibrated dynamic balance. Tested motor temperature after 15 min run.",
      partsReplaced: ["COMP-MOT-8318"],
      repairCost: 4200,
      warrantyOverride: {
        applied: true,
        waivedBy: "Meegala Vikas (Lead - Aftersales)",
        justification: "Under 1-year manufacturer warranty; zero impact or moisture found on motor casing.",
        finalPayable: 0
      },
      status: "Ready for Handover", // Intake -> Diagnostics -> In Repair -> Repair Tested -> Handover OTP Verified
      handoverOtp: "9134",
      handoverOtpVerified: false
    },
    {
      id: "SRV-2026-BR01-0843",
      droneSerial: "5X-2026-004",
      customerName: "Harpreet Singh Gill",
      customerPhone: "+91 98140 77123",
      dateIntake: "01-Oct-2026",
      symptomCategory: "Smart Battery Cell Balancing Fault",
      intakeOtp: "5812",
      intakeOtpVerified: true,
      accessoriesBrought: ["1x 22000mAh Battery (SN-BATT-9904)"],
      intakeDamagePhotos: ["assets/goag_5x_drone.jpg"],
      assignedTechnicianId: "GOAG-E019",
      assignedTechnicianName: "Vuppala Yashwanth Kumar",
      supervisorId: "GOAG-E010",
      supervisorName: "Meegala Vikas",
      usualServiceDurationHours: 1.5,
      actualElapsedHours: 1.0,
      workRemarks: "BMS firmware communication failure. Routed to external OEM battery service center.",
      partsReplaced: [],
      repairCost: 0,
      warrantyOverride: { applied: false, waivedBy: null, justification: null, finalPayable: 0 },
      externalServiceLoop: {
        isExternal: true,
        vendorName: "Tattu / Smart BMS Systems Lab",
        dateShipped: "01-Oct-2026",
        waybillNo: "DTDC-EXP-992182",
        status: "In Transit to Vendor Lab"
      },
      status: "External Service Sent",
      handoverOtp: "3318",
      handoverOtpVerified: false
    }
  ],

  // Defect Pattern Analytics Engine (Section 20)
  defectAnalytics: [
    { component: "Brushless Motor 8318", failureMode: "Bearing Wear / Dust Intrusion", count: 8, severity: "Medium", alertTriggered: true, alertedTo: "V Vishwateja (QC) & Veera Babu (R&D)" },
    { component: "FOC ESC 80A", failureMode: "Thermal Throttling in High Temp", count: 3, severity: "Low", alertTriggered: false, alertedTo: "None" },
    { component: "Centrifugal Nozzle", failureMode: "Clogging from thick bio-fertilizer", count: 5, severity: "Medium", alertTriggered: true, alertedTo: "Veera Babu (R&D)" }
  ],

  // 13. HR Daily Attendance (Section 25)
  // Status codes: P (Present), A (Absent), HD (Half Day), OD (On Duty / Field), OT (Overtime)
  attendanceToday: {
    date: "2026-10-02",
    records: {
      "GOAG-A001": { status: "P", inTime: "09:00", outTime: "18:00", otHours: 0 },
      "GOAG-A002": { status: "P", inTime: "09:05", outTime: "18:00", otHours: 0 },
      "GOAG-A003": { status: "P", inTime: "08:50", outTime: "18:30", otHours: 0.5 },
      "GOAG-A004": { status: "P", inTime: "09:00", outTime: "18:00", otHours: 0 },
      "GOAG-A005": { status: "P", inTime: "08:45", outTime: "18:30", otHours: 0.5 },
      "GOAG-A006": { status: "P", inTime: "09:10", outTime: "18:00", otHours: 0 },
      "GOAG-E007": { status: "P", inTime: "08:55", outTime: "18:00", otHours: 0 },
      "GOAG-E008": { status: "P", inTime: "09:15", outTime: "18:00", otHours: 0 },
      "GOAG-E009": { status: "P", inTime: "08:40", outTime: "18:40", otHours: 1.0 },
      "GOAG-E010": { status: "P", inTime: "08:50", outTime: "18:00", otHours: 0 },
      "GOAG-E011": { status: "P", inTime: "08:30", outTime: "18:00", otHours: 0 },
      "GOAG-E012": { status: "P", inTime: "09:00", outTime: "18:00", otHours: 0 },
      "GOAG-E013": { status: "P", inTime: "09:05", outTime: "18:00", otHours: 0 },
      "GOAG-E014": { status: "P", inTime: "08:30", outTime: "18:30", otHours: 1.0 },
      "GOAG-E015": { status: "P", inTime: "08:35", outTime: "18:00", otHours: 0 },
      "GOAG-E016": { status: "P", inTime: "08:40", outTime: "18:00", otHours: 0 },
      "GOAG-E017": { status: "P", inTime: "08:45", outTime: "18:00", otHours: 0 },
      "GOAG-E018": { status: "P", inTime: "08:50", outTime: "18:00", otHours: 0 },
      "GOAG-E019": { status: "OD", inTime: "08:00", outTime: "19:00", otHours: 1.0, remarks: "Field Demo in Guntur" },
      "GOAG-E020": { status: "P", inTime: "08:35", outTime: "18:00", otHours: 0 },
      "GOAG-E021": { status: "P", inTime: "09:10", outTime: "18:00", otHours: 0 },
      "GOAG-E022": { status: "P", inTime: "08:30", outTime: "18:00", otHours: 0 },
      "GOAG-E023": { status: "P", inTime: "08:45", outTime: "18:15", otHours: 0.25 }
    }
  },

  // 14. Geographic Delivery Map Points across India (Section 30)
  deliveryMapPins: [
    { id: "PIN-01", customer: "Krishna Agri Enterprises", model: "GOAG 5X", units: 18, state: "Andhra Pradesh / Telangana", pincode: "522001", lat: 16.3067, lng: 80.4365, hubDistance: "12 km" },
    { id: "PIN-02", customer: "Maharashtra Agro Sprayers", model: "GOAG 5X", units: 9, state: "Maharashtra Agri Belt", pincode: "440001", lat: 21.1458, lng: 79.0882, hubDistance: "75 km" },
    { id: "PIN-03", customer: "Punjab Green Fields FPO", model: "GOAG 5X", units: 6, state: "Punjab / Haryana Sector", pincode: "141001", lat: 30.9010, lng: 75.8573, hubDistance: "110 km" },
    { id: "PIN-04", customer: "Deccan Drone Tech", model: "GOAG 5X & Graydon", units: 8, state: "Karnataka / TN Sector", pincode: "560001", lat: 12.9716, lng: 77.5946, hubDistance: "45 km" },
    { id: "PIN-05", customer: "Gujarat Industrial Surveyors", model: "Graydon Hybrid", units: 4, state: "Gujarat Industrial Belt", pincode: "380001", lat: 23.0225, lng: 72.5714, hubDistance: "68 km" }
  ],

  // 15. Isolated R&D Workspace Projects (Section 34)
  rdProjects: [
    {
      id: "RD-2026-004",
      title: "Graydon V2 Carbon Hybrid Prototype",
      leadId: "GOAG-E009",
      leadName: "Voleti Veera Babu",
      designerId: "GOAG-E013",
      designerName: "Darla Chandra Shekar",
      status: "In Bench Stress Testing",
      flightHoursCompleted: 24.5,
      targetFlightHours: 50.0,
      notes: "Dual battery quick-swap mechanism tested. Aerodynamic drag reduced by 14% with streamlined canopy.",
      cadUrl: "#",
      commercialGraduationGate: {
        bomFrozen: false,
        twentyPageManualPrepared: false,
        directorSignoff: false,
        eligibleForCatalog: false
      }
    }
  ],

  // 16. Executive Cockpit Financial Totals (Section 29)
  executiveFinancials: {
    moneyInMonth: 4250000,
    moneyInDelta: "+18% vs Last Month • 14 Quotes Paid",
    moneyOutMonth: 2810000,
    vendorPOs: 2200000,
    pettyCashTotal: 110000,
    salariesAndAdmin: 500000,
    outstandingReceivables: 1140000,
    pendingClientCount: 5,
    netMonthlyOperatingCash: 1440000,
    healthRunway: "Healthy Operating Runway (8.4 Months)"
  }
};
