document.addEventListener('DOMContentLoaded', async () => {
    let siteData = {};

    // Initialization
    async function init() {
        initTheme();
        await loadData();
        if (siteData.name) {
            populateHero();
            populateAbout();
            populateCareer();
            initProjectFilters();
            populateProjects('all');
            initCharts();
            populateAchievements();
            populateContact();
        }
        initScrollReveal();
        initNavHighlight();
        lucide.createIcons();
    }

    // Fetch JSON
    async function loadData() {
        try {
            const response = await fetch('./content.json');
            if(response.ok) {
                siteData = await response.json();
            } else {
                console.error("Failed to load content.json");
            }
        } catch (e) {
            console.error("Error fetching data:", e);
        }
    }

    // Theme Management
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        document.getElementById('themeIcon').setAttribute('data-lucide', savedTheme === 'dark' ? 'sun' : 'moon');

        document.getElementById('themeToggle').addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            document.getElementById('themeIcon').setAttribute('data-lucide', newTheme === 'dark' ? 'sun' : 'moon');
            lucide.createIcons();
            initCharts(); // Re-render charts for color contrast updates
        });
    }

    // Populators
    function populateHero() {
        document.getElementById('heroPositioning').textContent = siteData.kicker;
        document.getElementById('heroName').textContent = siteData.name.split(' (')[0]; 
        document.getElementById('heroTitle').textContent = siteData.role;
        document.getElementById('heroTagline').textContent = siteData.heroSubtitle;
    }

    function populateAbout() {
        document.getElementById('aboutLead').innerHTML = `<strong>${siteData.aboutLead}</strong><br><br>${siteData.aboutStory}`;
        
        const ul = document.getElementById('aboutBullets');
        siteData.knownFor.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });

        const statsGrid = document.getElementById('statsGrid');
        siteData.stats.forEach(stat => {
            const div = document.createElement('div');
            div.className = 'stat-box glass-panel';
            // Count up animation logic could go here, keeping simple for now
            div.innerHTML = `<div class="stat-val">${stat.value}</div><div class="stat-lbl">${stat.label}</div>`;
            statsGrid.appendChild(div);
        });
    }

    function populateCareer() {
        const timeline = document.getElementById('careerTimeline');
        siteData.timeline.forEach((job, index) => {
            const parts = job.roleCompany.split(',');
            const role = parts[0].trim();
            const company = parts.length > 1 ? parts.slice(1).join(',').trim() : "";
            
            // Extract some tags from bullets dynamically
            const kw1 = job.bullets[0] ? job.bullets[0].split(' ')[0] : "Engineering";
            const kw2 = job.bullets[1] ? job.bullets[1].split(' ')[0] : "Management";

            const card = document.createElement('div');
            card.className = 'timeline-item glass-panel reveal';
            
            card.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-header">
                    <div class="role-info">
                        <h3>${role}</h3>
                        <h4>${company}</h4>
                        <div class="role-tags">
                            <span class="role-tag">${kw1}</span>
                            <span class="role-tag">${kw2}</span>
                            <span class="role-tag"><i data-lucide="map-pin" style="width:10px;height:10px;display:inline;"></i> ${job.location}</span>
                        </div>
                    </div>
                    <div class="role-dates">${job.dates}</div>
                </div>
                <div class="timeline-details">
                    <ul>${job.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
                </div>
            `;

            card.addEventListener('click', () => {
                const isExpanded = card.classList.contains('expanded');
                document.querySelectorAll('.timeline-item').forEach(c => c.classList.remove('expanded'));
                if (!isExpanded) card.classList.add('expanded');
            });
            timeline.appendChild(card);
        });
    }

    function initProjectFilters() {
        const container = document.getElementById('projectFilters');
        const filters = ['All', 'Civil', 'Industrial', 'Telecom'];
        
        container.innerHTML = '';
        filters.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `filter-chip ${cat === 'All' ? 'active' : ''}`;
            btn.textContent = cat;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                populateProjects(cat === 'All' ? 'all' : cat);
            });
            container.appendChild(btn);
        });
    }

    function populateProjects(filter) {
        const grid = document.getElementById('projectsBento');
        grid.innerHTML = '';
        
        let filtered = siteData.projects;
        if(filter !== 'all') {
            filtered = siteData.projects.filter(p => p.tags && p.tags.some(t => t.toLowerCase() === filter.toLowerCase()));
        }

        filtered.forEach((p, index) => {
            const tile = document.createElement('div');
            // Make first item large, 4th item medium for bento layout
            let sizeClass = index === 0 ? 'large' : (index === 3 ? 'medium' : '');
            tile.className = `bento-tile glass-panel reveal active ${sizeClass}`;
            
            // Subtle abstract gradients for tiles
            const hues = [190, 220, 280, 160];
            const hue = hues[index % hues.length];
            tile.style.background = `linear-gradient(135deg, hsla(${hue}, 80%, 15%, 0.4), var(--glass-bg))`;

            tile.innerHTML = `
                <div class="bento-content">
                    <div class="bento-tags">
                        ${p.tags ? p.tags.slice(0,3).map(t => `<span class="bento-tag">${t}</span>`).join('') : ''}
                    </div>
                    <h3 class="bento-title">${p.title}</h3>
                    <div class="bento-overlay-text">
                        <span>View Case Study</span> <i data-lucide="arrow-right" style="width:16px;height:16px;"></i>
                    </div>
                </div>
            `;
            
            tile.addEventListener('click', () => openModal(p));
            grid.appendChild(tile);
        });
        lucide.createIcons();
    }

    // Modal Logic
    function openModal(project) {
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalTags').innerHTML = project.tags ? project.tags.map(t => `<span>${t}</span>`).join('') : '';

        // Extract metrics from JSON
        document.getElementById('modalMetrics').innerHTML = `
            <div class="modal-metric"><i data-lucide="map-pin"></i> ${project.scope.location}</div>
            <div class="modal-metric"><i data-lucide="calendar"></i> ${project.scope.date}</div>
            <div class="modal-metric"><i data-lucide="circle-dollar-sign"></i> ${project.scope.value}</div>
        `;

        document.getElementById('modalScope').innerHTML = project.scope.details.map(item => `<li>${item}</li>`).join('');
        document.getElementById('modalRole').innerHTML = project.role.map(item => `<li>${item}</li>`).join('');
        document.getElementById('modalConstraints').innerHTML = project.constraints.map(item => `<li>${item}</li>`).join('');
        document.getElementById('modalOutcomes').innerHTML = project.outcomes.map(item => `<li>${item}</li>`).join('');

        const modal = document.getElementById('projectModal');
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        lucide.createIcons();
    }

    window.closeModal = () => {
        const modal = document.getElementById('projectModal');
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };

    // Chart.js Dashboard
    function initCharts() {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        const tColor = isLight ? '#475569' : '#94a3b8';
        const gColor = isLight ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.05)';
        const accent = isLight ? '#0284c7' : '#06b6d4';

        Chart.defaults.color = tColor;
        Chart.defaults.font.family = "'Inter', sans-serif";

        if(window.chart1) window.chart1.destroy();
        if(window.chart2) window.chart2.destroy();

        // Bar Chart - Budgets based on CV data
        const ctxPortfolio = document.getElementById('budgetChart').getContext('2d');
        window.chart1 = new Chart(ctxPortfolio, {
            type: 'bar',
            data: {
                labels: ['Rio Tinto', 'ExxonMobil', 'Telecom 5G', 'West Gate'],
                datasets: [{
                    label: 'Project Value ($M)',
                    data: [300, 65, 50, 20], 
                    backgroundColor: accent,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    y: { beginAtZero: true, grid: { color: gColor } }, 
                    x: { grid: { display: false } } 
                }
            }
        });

        // Line Chart - QA Compliance
        const ctxOutput = document.getElementById('efficiencyChart').getContext('2d');
        window.chart2 = new Chart(ctxOutput, {
            type: 'line',
            data: {
                labels: ['2019', '2021', '2023', '2024', '2025'],
                datasets: [{
                    label: 'QA Pass Rate (%)',
                    data: [96, 98, 100, 100, 100], 
                    borderColor: accent,
                    backgroundColor: isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(6, 182, 212, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    y: { min: 90, max: 100, grid: { color: gColor } }, 
                    x: { grid: { display: false } } 
                }
            }
        });
    }

    function populateAchievements() {
        const scroll = document.getElementById('achievementsScroll');
        if(!siteData.achievements) return;
        
        siteData.achievements.forEach(ach => {
            const card = document.createElement('div');
            card.className = 'ach-card glass-panel';
            card.innerHTML = `
                <div class="ach-icon"><i data-lucide="${ach.icon}"></i></div>
                <div class="ach-text">${ach.text}</div>
            `;
            scroll.appendChild(card);
        });
    }

    function populateContact() {
        if(siteData.contact) {
            const links = document.getElementById('socialLinks');
            links.innerHTML = `
                <a href="${siteData.contact.linkedin}" target="_blank" class="glass-panel"><i data-lucide="linkedin"></i> LinkedIn</a>
                <a href="mailto:${siteData.contact.email}" class="glass-panel"><i data-lucide="mail"></i> Email</a>
            `;
            document.getElementById('footerText').innerHTML = `&copy; ${new Date().getFullYear()} ${siteData.name}. Engineered for Performance.`;
        }
    }

    // UX UTILS
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    function initNavHighlight() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 150) current = section.getAttribute('id');
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    init();
});

----- content.json -----
{
  "name": "Ganesh Kalal (MIEAust)",
  "role": "Senior Project Engineer",
  "tagline": "Specializing in Major Infrastructure, Telecom, and Tier-1 Industrial Closures.",
  "kicker": "Melbourne VIC • Civil • Structural • Delivery",
  "profilePhotoUrl": "./profile.png",
  "heroTitle": "Delivering complex infrastructure through structural precision and rigorous QA compliance.",
  "heroSubtitle": "Civil and Structural Engineer with 5+ years of experience across Tier-1/Tier-2 environments. Expert in technical design review, subcontractor management, tender evaluation, and delivering high-risk projects safely and on program.",
  "signatureLine": "Clear sequence. Strong controls. Clean QA. Deliver it right.",
  "stats": [
    { "label": "Portfolio Value", "value": "$400M+" },
    { "label": "Telecom Sites", "value": "150+" },
    { "label": "QA Non-Conformances", "value": "Zero" }
  ],
  "aboutLead": "A strategy-driven engineer balancing technical oversight with commercial discipline.",
  "aboutStory": "Based in Melbourne, I bridge the gap between engineering theory and site execution. My background spans metro rail foundations, live-traffic freeway upgrades, 5G rollouts, and the largest industrial demolitions in the Southern Hemisphere.",
  "knownFor": [
    "Structural design & analysis (AS 3600, AS 4100, AS 1170)",
    "Planning & sequencing heavy civil works",
    "SOW/RFQ preparation & tender evaluation",
    "Hold point verification & rigorous QA reporting",
    "Cost/Schedule tracking & variation management"
  ],
  "projects": [
    {
      "title": "Rio Tinto Gove Industrial Closure",
      "tags": ["Industrial", "Demolition", "Civil"],
      "scope": {
        "location": "Gove, NT",
        "date": "2024 - 2025",
        "value": "$300M",
        "details": [
          "Australia's largest industrial closure project.",
          "Decontamination and heavy structural dismantling.",
          "Precision explosive works and large-scale material recovery."
        ]
      },
      "role": [
        "Project Engineer managing procurement documentation.",
        "Reviewed structural design packages for AS 3600 and AS 4100 compliance.",
        "Managed contractor coordination and quality verification."
      ],
      "constraints": [
        "Remote NT location logistics.",
        "High-risk explosive events.",
        "Gumatj Traditional Owner coordination."
      ],
      "outcomes": [
        "Supported progress claims across multiple subcontractors.",
        "Maintained stringent safety and environmental standards."
      ]
    },
    {
      "title": "ExxonMobil Altona Refinery",
      "tags": ["Industrial", "Contracts", "Heavy Civil"],
      "scope": {
        "location": "Altona, VIC",
        "date": "2024 - Present",
        "value": "$65M",
        "details": [
          "Decommissioning of major refinery assets.",
          "Removal of stacks, LPG tanks, boilers and pipe racks.",
          "Bulk earthworks and site remediation."
        ]
      },
      "role": [
        "Prepared SOW/RFQ packages.",
        "Technical and commercial evaluation of 15+ tender submissions.",
        "Supervised on-site concrete demolition works."
      ],
      "constraints": [
        "Live operational environment (fuel import operations).",
        "Complex brownfield structural interfaces."
      ],
      "outcomes": [
        "Negotiated and justified contract variations totaling $8M+.",
        "Coordinated statutory approvals with Hobsons Bay City Council."
      ]
    },
    {
      "title": "National 5G Telecom Upgrade",
      "tags": ["Telecom", "Structural", "Design"],
      "scope": {
        "location": "Victoria",
        "date": "2023 - 2024",
        "value": "$50M",
        "details": [
          "Large-scale telecom infrastructure upgrades across metro and regional Victoria.",
          "Lattice towers, monopoles, rooftop and greenfield installations."
        ]
      },
      "role": [
        "Led structural design coordination for 150+ tower upgrades.",
        "Completed 100+ site inspections ensuring compliance.",
        "Prepared BoQ/BOM and supported fabrication reviews."
      ],
      "constraints": [
        "Strict adherence to AS/NZS 1170.2 (Wind Loading) and carrier specifications.",
        "Land access and municipal permitting."
      ],
      "outcomes": [
        "Secured statutory planning approvals from 20+ councils.",
        "Successfully managed civil coordination for fibre backhaul connectivity."
      ]
    },
    {
      "title": "West Gate Freeway Upgrade",
      "tags": ["Civil", "Infrastructure", "Concrete QA"],
      "scope": {
        "location": "Melbourne, VIC",
        "date": "2022 - 2023",
        "value": "Confidential",
        "details": [
          "Major transport infrastructure upgrade.",
          "Installation of reinforced concrete crash barriers and precast noise walls."
        ]
      },
      "role": [
        "Structural design support and construction oversight.",
        "Reviewed shop drawings and supervised concrete pours.",
        "Conducted QA including concrete testing and reinforcement verification."
      ],
      "constraints": [
        "Live-traffic freeway conditions.",
        "Stringent VicRoads standards and AS 5100 requirements."
      ],
      "outcomes": [
        "Achieved zero non-conformances across 100+ structural installations.",
        "Ensured compliance with VicRoads Traffic Noise Reduction Policy."
      ]
    },
    {
      "title": "Mumbai Metro Line 4 & 5",
      "tags": ["Civil", "Infrastructure", "QA"],
      "scope": {
        "location": "Mumbai, India",
        "date": "2018 - 2019",
        "value": "Confidential",
        "details": [
          "Government-funded metro rail construction.",
          "Elevated viaducts, stations, and underground tunnel (TBM) interfaces."
        ]
      },
      "role": [
        "Civil Site Engineer supporting independent verification.",
        "Concrete QA/QC (slump testing, dimensional checks).",
        "Conducted Pile Integrity Testing (PIT) and Dynamic Load Testing (DLT)."
      ],
      "constraints": [
        "Dense, high-traffic urban construction environment.",
        "Complex deep foundation works and excavation safety."
      ],
      "outcomes": [
        "Successfully monitored tunnel alignment and precast bridge element installation.",
        "Collaborated with engineers to close out non-conformance reports (NCRs)."
      ]
    }
  ],
  "timeline": [
    {
      "roleCompany": "Project Engineer, Liberty Industrial",
      "dates": "02/2024 - Present",
      "location": "Altona VIC / Gove NT",
      "bullets": [
        "Planning, sequencing, and delivery of heavy civil & structural works on $100M+ industrial projects.",
        "Preparing SOW, RFQ, ITPs and managing technical queries, RFIs, and engineering coordination.",
        "Producing weekly progress reports covering cost, schedule, risk, and statutory approvals.",
        "Conducting site inspections, verifying hold points, and administering budget variations ($8M+)."
      ]
    },
    {
      "roleCompany": "Structural Engineer, Indara Digital Infrastructures",
      "dates": "04/2023 - 03/2024",
      "location": "Melbourne VIC",
      "bullets": [
        "Delivered 150+ lattice tower and steel pole upgrades including structural design and analysis.",
        "Reviewed drawings and ITPs for AS/NZS 1170 & 4100 compliance and conducted field inspections.",
        "Supported tender evaluation and provided technical input to contract negotiations.",
        "Coordinated land access and secured statutory approvals across 20+ councils."
      ]
    },
    {
      "roleCompany": "Graduate Structural Engineer, Clive Steele Partners",
      "dates": "11/2021 - 03/2023",
      "location": "Clayton VIC",
      "bullets": [
        "Designed reinforced concrete elements (barriers, foundations) to AS 3600.",
        "Reviewed subcontractor shop drawings and supervised on-site concrete works including quality testing.",
        "Conducted asset inspections and prepared rectification recommendations for municipal infrastructure.",
        "Coordinated approvals with councils, organised geotechnical surveys and DBYD searches."
      ]
    },
    {
      "roleCompany": "Graduate Civil Engineer, Structcom Consulting Engineers",
      "dates": "06/2020 - 10/2021",
      "location": "Caulfield VIC",
      "bullets": [
        "Designed stormwater drainage and OSD systems to meet local council requirements.",
        "Supported structural design and drafting for community centres and public transport assets.",
        "Coordinated statutory approvals with councils and developers, organizing land surveys and geotech inputs."
      ]
    },
    {
      "roleCompany": "Civil Site Engineer, Tata Projects (Mumbai Metro)",
      "dates": "02/2018 - 07/2019",
      "location": "Mumbai, India",
      "bullets": [
        "Supported independent verification and QA/QC teams on massive elevated viaduct and station construction.",
        "Performed concrete QA/QC and dimensional checks for piers and foundations.",
        "Conducted Pile Integrity Testing (PIT) and Dynamic Load Testing (DLT) for deep foundation works.",
        "Monitored tunnel alignment (TBM), excavation safety, and installation of precast bridge elements."
      ]
    }
  ],
  "achievements": [
    { "icon": "shield-check", "text": "Maintained an absolute zero LTI record across all high-risk Tier-1 environments." },
    { "icon": "trending-up", "text": "Negotiated and successfully justified $8M+ in complex contract variations." },
    { "icon": "check-circle", "text": "Achieved zero non-conformances on 100+ West Gate Freeway structural installations." },
    { "icon": "radio-tower", "text": "Successfully delivered design coordination for 150+ 5G telecom tower upgrades." },
    { "icon": "map", "text": "Introduced GPS and Drone topographic surveying to improve site remediation accuracy." }
  ],
  "contact": {
    "location": "Melbourne, VIC",
    "phone": "0424 121 941",
    "email": "ganesh.r.kalal24@gmail.com",
    "linkedin": "https://www.linkedin.com/in/ganesh-kalal/"
  },
  "downloadCvUrl": "CV_Ganesh Kalal.pdf"
}
