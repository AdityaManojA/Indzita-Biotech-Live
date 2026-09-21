export const companyData = {
  name: "IndZita Biotech",
  legalName: "IndZita Biotech Pvt. Ltd.",
  tagline: "Translating piRNA Biomarkers into Early Non-Invasive Diagnostics",
  heroHeadline: "Revolutionizing Healthcare through Advanced Diagnostics and Automation",
  heroDescription: "Pioneering the next generation of non-invasive molecular diagnostics for Cervical Cancer and Parkinson's disease, paired with custom-engineered organoid bioreactors and intelligent sample automation.",
  email: "indzitabiotech@gmail.com",
  copyright: "© 2026 IndZita Biotech Pvt. Ltd. All rights reserved.",
  year: 2026,
  logo: "/images/Logo/indzita_logo.png",
  metrics: [
    { label: "Target Biomarkers", value: "piRNA Profiling", desc: "Non-invasive early detection" },
    { label: "Organoid Culture", value: "12-Well Plates", desc: "Speed-controlled micro-stirring" },
    { label: "Clinical Pipeline", value: "Closed Automated", desc: "Zero carryover contamination" },
    { label: "Clinical Partners", value: "Tier-1 Institutes", desc: "RGCB, Karkinos, NIMHANS" }
  ]
};

export const workflowSteps = [
  {
    step: 1,
    id: "sample-collection",
    title: "Sample Collection",
    category: "Step 01: Pre-Analytical",
    image: "/images/sample.png",
    shortDesc: "Painless, non-invasive collection optimized for cellular integrity and stable transcript preservation.",
    fullDesc: "Specialized non-invasive swabs and liquid biopsy collection protocols preserve fragile small non-coding RNA without requiring invasive surgical biopsies or cold-chain degradation.",
    keyMetrics: [
      { label: "Volume Requirement", val: "Minimal (0.5 - 1.0 mL)" },
      { label: "Preservation Buffer", val: "Proprietary RNA Shield" },
      { label: "Stability", val: "72 hrs at room temp" }
    ]
  },
  {
    step: 2,
    id: "pirna-isolation",
    title: "piRNA Isolation Kit",
    category: "Step 02: Extraction",
    image: "/images/kit.png",
    shortDesc: "Proprietary magnetic bead and silica membrane purification tailored specifically for piRNA fraction.",
    fullDesc: "Targeted purification isolating 26–32 nucleotide PIWI-interacting RNAs away from high-abundance ribosomal and messenger RNA, ensuring high purity yields for ultra-sensitive detection.",
    keyMetrics: [
      { label: "Elution Time", val: "< 15 minutes" },
      { label: "RNA Size Cutoff", val: "24 - 34 nucleotides" },
      { label: "Purity A260/280", val: "1.95 - 2.05" }
    ]
  },
  {
    step: 3,
    id: "pirna-amplification",
    title: "piRNA Amplification",
    category: "Step 03: Polyadenylation & Reverse Transcription",
    image: "/images/graph.png",
    shortDesc: "High-specificity stem-loop reverse transcription and target amplification of biomarker signatures.",
    fullDesc: "Given the short length of piRNAs, specialized stem-loop cDNA synthesis with high-fidelity reverse transcriptase converts minute molecular targets into quantifiable cDNA libraries without non-specific primer dimers.",
    keyMetrics: [
      { label: "Enzyme Efficiency", val: "> 98.5%" },
      { label: "Target Panels", val: "Cervical & Parkinson's" },
      { label: "False Positive Rate", val: "< 0.1%" }
    ]
  },
  {
    step: 4,
    id: "qpcr-analysis",
    title: "QPCR Analysis",
    category: "Step 04: Real-time Quantitative Detection",
    image: "/images/machine.png",
    shortDesc: "Multiplex fluorescence detection capturing real-time cycle threshold (Ct) curves with AI curve fitting.",
    fullDesc: "TaqMan-based dual-labeled fluorogenic probes monitor exponential amplification cycle-by-cycle, calculating exact copy-number variations against internal calibrators.",
    keyMetrics: [
      { label: "Dynamic Range", val: "7 orders of magnitude" },
      { label: "Limit of Detection", val: "< 5 copies/reaction" },
      { label: "Run Duration", val: "38 minutes" }
    ]
  },
  {
    step: 5,
    id: "clinical-report",
    title: "Clinical Report",
    category: "Step 05: Diagnostic Decision Support",
    image: "/images/report.png",
    shortDesc: "Automated, physician-ready diagnostic summary with risk stratification and biomarker profile breakdown.",
    fullDesc: "AI-assisted algorithmic scoring synthesizes multi-marker expression signatures into an actionable clinical readout, flagging dysregulated piRNAs with confidence intervals and comparison to reference cohorts.",
    keyMetrics: [
      { label: "Report Turnaround", val: "Automated Instant" },
      { label: "Format", val: "Digital EMR & PDF" },
      { label: "Validation", val: "Multi-center clinical cohorts" }
    ]
  }
];

export const bioreactorData = {
  category: "Custom Designing & Production",
  title: "Organoid Bioreactor for 12-Well Plates",
  mechanism: "Speed Controlled Constant Stirring Mechanism",
  description: "Engineered specifically for physiologically relevant 3D organoid cultures, tissue engineering, and drug screening models. Maintains uniform microfluidic shear stress across 12-well formats with zero thermal leakage.",
  specs: [
    {
      title: "Chemically Resistant",
      desc: "Constructed with medical-grade biocompatible PTFE and anodized alloy impervious to aggressive lab reagents, alcohols, and acids."
    },
    {
      title: "For use in Incubators",
      desc: "Designed to operate seamlessly inside 37°C, 95% relative humidity, and 5% CO2 incubator atmospheres without condensation."
    },
    {
      title: "Long Run Hours",
      desc: "Ultra-low heat brushless micro-motor architecture engineered for continuous uninterrupted stirring exceeding 720+ continuous hours."
    },
    {
      title: "Lab Tested",
      desc: "Rigidly validated with patient-derived cervical organoid cultures and neuro-spheroid models for reproducible batch yields."
    }
  ],
  hardware: [
    {
      id: "controller",
      name: "Precision Controller Unit",
      image: "/images/Product images/controller.jpg",
      role: "Microprocessor Drive & RPM Logic",
      features: [
        "Digital RPM feedback loop (10 - 250 RPM)",
        "Bi-directional stirring profiles & intermittent pause modes",
        "Heat-isolated external controller footprint",
        "Overload and stall protection circuit"
      ]
    },
    {
      id: "docking-matrix",
      name: "Bioreactor Docking Nest",
      image: "/images/Product images/bioreactor.jpg",
      role: "12-Well Plate Incubator Vessel",
      features: [
        "Magnetic coupling array for frictionless torque transfer",
        "Standardized footprint compatible with 12-well standard culture plates",
        "Autoclavable culture contact parts",
        "Zero vibration propagation to neighboring culture racks"
      ]
    }
  ]
};

export const diagnosticPlatformData = {
  category: "AI Powered Automation",
  title: "Automated Platform for Non-Invasive Diagnosis of Cervical Cancer & Parkinson's Disease",
  subtitle: "A next-generation automated diagnostic platform integrating intelligent sample handling, buffer management, and rapid molecular analysis into a compact clinical system.",
  description: "Closing the gap between complex molecular biochemistry and routine clinical turnaround. This point-of-care platform automates hands-on fluidics, extraction, and optical reading in a single sealed cassette cartridge.",
  subsystems: [
    {
      id: "compact-system",
      title: "Compact Diagnostic System",
      image: "/images/Product images/Compact Diagnostic System/device.png",
      tagline: "Fully Integrated Benchtop Molecular Station",
      desc: "Self-contained clinical diagnostic unit engineered for rapid, automated, and non-invasive sample analysis. Houses the thermal cycler, optical sensor array, and embedded microcontroller.",
      specs: [
        "Footprint: Compact benchtop architecture",
        "Turnaround: Raw sample to verified report in < 55 mins",
        "Optical: Quad-channel multi-wavelength fluorometer",
        "Connectivity: Cloud EMR integration and encrypted local storage"
      ]
    },
    {
      id: "sample-processing",
      title: "Intelligent Sample Processing",
      image: "/images/Product images/Intelligent Sample Processing/device_right.png",
      tagline: "Microfluidic Precision Liquid Handling",
      desc: "Optimized multi-stage fluid handling and cassette-based docking enable cross-contamination-free automated workflows.",
      hotspots: [
        {
          id: "buffer-chamber",
          name: "Buffers Chamber",
          position: "Top Left Section",
          color: "cyan",
          summary: "Multi-reagent reservoir housing pre-packaged lysis buffers, wash reagents, and elution solutions.",
          details: "Automated micro-metering valves inject exact reagent micro-volumes (down to ±0.5 µL) without aerosolization or cross-well contamination."
        },
        {
          id: "cassette-port",
          name: "Sample / Cassette Port",
          position: "Bottom Right Interface",
          color: "blue",
          summary: "Hermetically sealed single-use cassette docking port with mechanical latch and RFID verification.",
          details: "Locks the disposable patient cartridge in place, validates test kit lot expiration via embedded micro-tag, and aligns microfluidic needles."
        }
      ]
    }
  ]
};

export const institutionalPartners = [
  {
    name: "BRIC - RGCB",
    fullName: "Biotechnology Research and Innovation Council — Rajiv Gandhi Centre for Biotechnology",
    website: "https://rgcb.res.in",
    logo: "/images/Collaborators/BRIC RGCB logo.png",
    role: "Core molecular validation & piRNA biomarker discovery collaborator.",
    highlight: "National institute dedicated to cutting-edge research in cancer biology and infectious disease diagnostics."
  },
  {
    name: "Karkinos Healthcare",
    fullName: "Karkinos Oncology Healthcare Network",
    website: "https://www.karkinos.in",
    logo: "/images/Collaborators/Karkinos logo.png",
    role: "Oncology clinical trial network & cervical cancer screening cohort partner.",
    highlight: "End-to-end oncology platform driving distributed early cancer detection across clinical populations."
  },
  {
    name: "NIMHANS",
    fullName: "National Institute of Mental Health and Neurosciences",
    website: "https://nimhans.ac.in",
    logo: "/images/Collaborators/Nimhans.png",
    role: "Neurodegenerative biomarker investigation & Parkinson’s disease validation.",
    highlight: "Premier multidisciplinary neuroscience institute leading clinical research into neuro-biomarkers."
  }
];

export const leadershipTeam = [
  {
    name: "Dr. Ani V Das",
    role: "Director",
    affiliation: "IndZita Biotech",
    specialty: "Molecular Diagnostics & piRNA Genomics",
    bio: "Pioneering translational researcher with deep expertise in non-coding RNA biology, stem cell differentiation, and oncological biomarker discovery."
  },
  {
    name: "Ashwin Sudhakar",
    role: "Director",
    affiliation: "IndZita Biotech",
    specialty: "Biomedical Instrumentation & Automation",
    bio: "Instrumentation and mechatronics lead driving hardware engineering for automated molecular sample processors and microfluidic bioreactor units."
  },
  {
    name: "Arun Warrier",
    role: "Director",
    affiliation: "IndZita Biotech",
    specialty: "Clinical Oncology Strategy",
    bio: "Clinical strategist translating laboratory breakthroughs into regulated point-of-care medical diagnostic systems and multi-center validation trials."
  }
];

export const researchCollaborators = [
  {
    name: "Dr. Jackson James",
    role: "Research Collaborator",
    affiliation: "BRIC - RGCB",
    specialty: "Neurobiology & Stem Cell Dynamics",
    bio: "Leading scientist investigating neural signaling networks and biomarker regulation in neurodegenerative diseases."
  },
  {
    name: "Dr. Mahendran K.R",
    role: "Research Collaborator",
    affiliation: "BRIC - RGCB",
    specialty: "Nanopore Biophysics & Single-Molecule Sensing",
    bio: "Specialist in membrane biophysics, nanopores, and advanced bio-sensing technologies for ultrasensitive molecular detection."
  }
];

// Presets for the Interactive Virtual Diagnostic Simulator
export const simulationPresets = {
  cervical: {
    panelName: "Cervical Cancer piRNA Biomarker Panel",
    biomarkerTarget: "piR-hsa-8201 / piR-hsa-16442",
    sampleType: "Cervical Liquid Biopsy / Swab Extract",
    baselineCt: 23.4,
    cutOffCt: 28.0,
    riskThreshold: "Elevated Oncological Signature",
    recommendation: "Flagged for immediate confirmatory colposcopy and clinical evaluation.",
    cycles: [
      { cycle: 5, fluorescence: 12 },
      { cycle: 10, fluorescence: 18 },
      { cycle: 15, fluorescence: 32 },
      { cycle: 20, fluorescence: 78 },
      { cycle: 22, fluorescence: 165 },
      { cycle: 24, fluorescence: 390 },
      { cycle: 26, fluorescence: 720 },
      { cycle: 28, fluorescence: 1150 },
      { cycle: 30, fluorescence: 1580 },
      { cycle: 35, fluorescence: 2100 },
      { cycle: 40, fluorescence: 2240 }
    ]
  },
  parkinsons: {
    panelName: "Parkinson's Disease Early Neuro-piRNA Panel",
    biomarkerTarget: "piR-neuro-9188 / micro-transcript sig",
    sampleType: "Peripheral Biofluid Specimen",
    baselineCt: 25.1,
    cutOffCt: 29.5,
    riskThreshold: "Early Neuro-Degenerative Marker Detected",
    recommendation: "Recommend clinical neurology follow-up and motor assessment tracking.",
    cycles: [
      { cycle: 5, fluorescence: 10 },
      { cycle: 10, fluorescence: 15 },
      { cycle: 15, fluorescence: 28 },
      { cycle: 20, fluorescence: 62 },
      { cycle: 23, fluorescence: 140 },
      { cycle: 25, fluorescence: 330 },
      { cycle: 27, fluorescence: 680 },
      { cycle: 30, fluorescence: 1290 },
      { cycle: 35, fluorescence: 1980 },
      { cycle: 40, fluorescence: 2150 }
    ]
  }
};

export const pressArticleData = {
  id: "rgcb-cervical-cancer-blood-test-grant",
  slug: "no-biopsy-just-blood-rgcb-indzita-cervical-cancer",
  headline: "No biopsy, just blood: RGCB researchers develop blood test for early cervical cancer detection, ₹7 crore grant to fund device",
  subheadline: "A revolutionary non-invasive blood diagnostic device measuring piRNA biomarkers with nanoscale nanopore technology secures ₹7 Crore funding under the MAHA MedTech Mission by ANRF, ICMR, and Gates Foundation.",
  date: "September 21, 2026",
  isoDate: "2026-09-21T19:30:00+05:30",
  dateline: "THIRUVANANTHAPURAM, KERALA",
  grantAmount: "₹7 Crore (~$840,000 USD)",
  grantor: "MAHA MedTech Mission (ANRF / ICMR / Gates Foundation)",
  author: "IndZita Biotech & BRIC-RGCB Joint Science Desk",
  readTime: "4 min read",
  category: "Translational Oncology & Automation",
  tags: [
    "Cervical Cancer Blood Test", 
    "piRNA Biomarkers", 
    "Nanopore Technology", 
    "MAHA MedTech Mission", 
    "ANRF", 
    "ICMR", 
    "Gates Foundation", 
    "BRIC-RGCB", 
    "IndZita Biotech", 
    "Karkinos Healthcare", 
    "Non-Invasive Diagnostics",
    "Liquid Biopsy India"
  ],
  leadQuote: "“The idea is that anyone should be able to use this machine, a patient just gives a blood sample, and the machine does the rest.”",
  leadQuoteAuthor: "Lead Researcher, BRIC-RGCB & IndZita Biotech Consortium",
  secondQuote: "“It's non-invasive, doesn't need a trained technician, and is expected to be both faster and cheaper than current tests.”",
  secondQuoteAuthor: "Scientific Development Team, Thiruvananthapuram",
  consortium: [
    {
      name: "BRIC - Rajiv Gandhi Centre for Biotechnology (BRIC-RGCB)",
      role: "Lead Research Institute & Nanopore Biophysics",
      location: "Thiruvananthapuram, Kerala",
      url: "https://rgcb.res.in"
    },
    {
      name: "IndZita Biotech Private Limited",
      role: "Device Engineering & Commercialization Start-Up",
      location: "Thiruvananthapuram, Kerala",
      url: "https://indzitabiotech.com"
    },
    {
      name: "Karkinos Healthcare Private Limited",
      role: "Clinical Oncology Trial Network & Distributed Screening",
      location: "Mumbai, Maharashtra",
      url: "https://www.karkinos.in"
    }
  ],
  investigators: [
    {
      name: "Dr. Ani V Das",
      role: "Lead Researcher & Director, IndZita Biotech / BRIC-RGCB",
      specialty: "piRNA Biology & Translational Oncology"
    },
    {
      name: "Dr. Mahendran K.R",
      role: "Collaborator, BRIC-RGCB",
      specialty: "Nanopore Biophysics & Single-Molecule Sensing"
    },
    {
      name: "Dr. Jackson James",
      role: "Collaborator, BRIC-RGCB",
      specialty: "Stem Cell Dynamics & Clinical Validation"
    }
  ],
  stats: [
    { label: "MedTech Grant", value: "₹7 Crore", desc: "ANRF / ICMR / Gates Foundation" },
    { label: "Specimen Required", value: "Blood Only", desc: "Zero painful pelvic biopsies" },
    { label: "Turnaround Time", value: "< Minutes", desc: "Fully automated point-of-care" },
    { label: "Patent & Validation", value: "Patented", desc: "Cell, mouse & human pilot cleared" }
  ],
  comparisonTable: [
    {
      parameter: "Sample Collection",
      conventional: "Invasive cervical scraping (Pap smear), pelvic speculum, tissue biopsy",
      indzita: "Simple peripheral blood sample (completely non-invasive, painless)"
    },
    {
      parameter: "Operator Requirement",
      conventional: "Trained gynecologist, cytopathologist, and certified laboratory staff",
      indzita: "Zero specialized technician needed; automated sample-to-answer cartridge"
    },
    {
      parameter: "Detection Modality",
      conventional: "Subjective cytological microscopy or expensive HPV DNA PCR testing",
      indzita: "Direct nanoscale electrical resistive pulse nanopore sensing of piRNA"
    },
    {
      parameter: "Turnaround Time",
      conventional: "3 to 14 days for central pathology reporting and slide review",
      indzita: "Rapid real-time diagnosis in minutes at the point of care"
    },
    {
      parameter: "Rural & Tier-2 Reach",
      conventional: "Low adoption due to cultural hesitation, pain, and lack of clinic equipment",
      indzita: "Engineered for decentralized deployment at primary health centers and rural camps"
    },
    {
      parameter: "Economic Footprint",
      conventional: "High multi-step pathology fee and complex cold-chain transport",
      indzita: "Significantly faster and cheaper with high-yield solid-state sensor"
    }
  ]
};

