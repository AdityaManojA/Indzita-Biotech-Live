# Graph Report - indzita  (2026-09-22)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 116 nodes · 196 edges · 18 communities (12 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 601 input · 45 output

## Graph Freshness
- Built from commit: `452e52f2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Project Dependencies and Metadata
- Biotech Research and Diagnostics
- Molecular Visualization Components
- Web App Manifest Configuration
- App.jsx
- react
- indzitaData.js
- lucide-react
- devDependencies
- scripts
- IndZita Biotech Pvt Ltd
- main.jsx
- BioreactorSection.jsx
- DiagnosticPlatform.jsx
- VirtualLabModal.jsx
- National Institute of Mental Health and Neuro Sciences
- Bioreactor Prototype
- IndZita Team Photo

## God Nodes (most connected - your core abstractions)
1. `react` - 19 edges
2. `lucide-react` - 15 edges
3. `IndZita Biotech Pvt. Ltd.` - 8 edges
4. `companyData` - 7 edges
5. `PCR Kit for Cervical Cancer Detection` - 6 edges
6. `scripts` - 5 edges
7. `SplinePhaseBrowser()` - 4 edges
8. `PhaseCurveThumb()` - 3 edges
9. `PhaseCurveViewer()` - 3 edges
10. `workflowSteps` - 3 edges

## Surprising Connections (you probably didn't know these)
- `piRNA Amplification Graph` --references--> `PCR Kit for Cervical Cancer Detection`  [EXTRACTED]
  Images/graph.png → data.md
- `piRNA Isolation Kit` --references--> `PCR Kit for Cervical Cancer Detection`  [EXTRACTED]
  Images/kit.png → data.md
- `QPCR Analysis Machine` --references--> `PCR Kit for Cervical Cancer Detection`  [EXTRACTED]
  Images/machine.png → data.md
- `Clinical Report` --references--> `PCR Kit for Cervical Cancer Detection`  [EXTRACTED]
  Images/report.png → data.md
- `Sample Collection` --references--> `PCR Kit for Cervical Cancer Detection`  [EXTRACTED]
  Images/sample.png → data.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **IndZita Product Portfolio** — public_images_product_images_bioreactor, public_images_product_images_controller, public_images_product_images_compact_diagnostic_system_device, public_images_product_images_intelligent_sample_processing_device_right [EXTRACTED 0.90]
- **Cervical Cancer Diagnostic Workflow** — images_sample_png, images_kit_png, images_graph_png, images_machine_png, images_report_png [EXTRACTED 1.00]
- **MAHA MedTech Mission Consortium** — data_indzita_biotech, data_bric_rgcb, data_karkinos_healthcare [EXTRACTED 1.00]

## Communities (18 total, 6 thin omitted)

### Community 0 - "Project Dependencies and Metadata"
Cohesion: 0.11
Nodes (16): dependencies, lucide-react, motion, react, react-dom, @splinetool/react-spline, @splinetool/runtime, name (+8 more)

### Community 1 - "Biotech Research and Diagnostics"
Cohesion: 0.15
Nodes (15): Dr. Ani V Das, Automated Diagnostic Platform, BRIC - Rajiv Gandhi Centre for Biotechnology, IndZita Biotech Pvt. Ltd., Karkinos Healthcare, ₹7 Crore MAHA MedTech Mission Grant, Organoid Bioreactor for 12-Well Plates, PCR Kit for Cervical Cancer Detection (+7 more)

### Community 2 - "Molecular Visualization Components"
Cohesion: 0.31
Nodes (6): @splinetool/react-spline, MolecularPipeline(), PhaseCurveThumb(), PhaseCurveViewer(), SplinePhaseBrowser(), workflowSteps

### Community 3 - "Web App Manifest Configuration"
Cohesion: 0.22
Nodes (8): background_color, display, icons, name, orientation, short_name, start_url, theme_color

### Community 4 - "App.jsx"
Cohesion: 0.33
Nodes (5): ContactTerminal(), LeadershipTeam(), NewsBanner(), PressReleaseArticle(), pressArticleData

### Community 5 - "react"
Cohesion: 0.36
Nodes (5): motion, react, GenomicAsciiCanvas(), Hero(), MolecularAtlasGrid()

### Community 6 - "indzitaData.js"
Cohesion: 0.43
Nodes (4): InstitutionalNetwork(), institutionalPartners, leadershipTeam, researchCollaborators

### Community 7 - "lucide-react"
Cohesion: 0.40
Nodes (4): lucide-react, Footer(), Header(), companyData

### Community 8 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, @types/react, @types/react-dom, vite, @vitejs/plugin-react

### Community 9 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, deploy, dev, preview

### Community 10 - "IndZita Biotech Pvt Ltd"
Cohesion: 0.50
Nodes (4): IndZita Biotech Pvt Ltd, IndZita Biotech Logo, Compact Diagnostic System, Intelligent Sample Processing Device

### Community 11 - "main.jsx"
Cohesion: 0.50
Nodes (3): react-dom, App(), src_index

## Knowledge Gaps
- **45 isolated node(s):** `lucide-react`, `motion`, `react`, `react-dom`, `@splinetool/react-spline` (+40 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 50 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `Project Dependencies and Metadata`, `Molecular Visualization Components`, `App.jsx`, `indzitaData.js`, `lucide-react`, `main.jsx`, `BioreactorSection.jsx`, `DiagnosticPlatform.jsx`, `VirtualLabModal.jsx`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `Project Dependencies and Metadata`, `Molecular Visualization Components`, `App.jsx`, `react`, `indzitaData.js`, `BioreactorSection.jsx`, `DiagnosticPlatform.jsx`, `VirtualLabModal.jsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **What connects `lucide-react`, `motion`, `react` to the rest of the system?**
  _45 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Dependencies and Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._