const fallbackData = {
    "name": "Ganesh Kalal (MIEAust)",
    "role": "Project Engineer",
    "kicker": "Melbourne VIC • Telecom • Civil Infrastructure",
    "heroSubtitle": "Delivering Tier-1 projects with structural precision. Specializing in 5G rollouts, statutory approvals, and complex brownfield execution.",
    "visaStatus": "Australian Permanent Resident",
    "aboutLead": "Strategy-driven engineer balancing technical oversight with commercial discipline.",
    "aboutStory": "I bridge the gap between structural engineering theory and site execution. With over 5 years of experience across 5G telecom infrastructure, metro rail, live-traffic freeways, and the largest industrial closures in the Southern Hemisphere.",
    "knownFor": [
      "5G Infrastructure Rollouts & Upgrades",
      "Site Acquisition & Statutory Approvals",
      "Structural Design & Audits (AS/NZS 1170.2, AS 3600)",
      "Subcontractor Management & Procurement"
    ],
    "logistics": [
        { "name": "White Card", "icon": "hard-hat" },
        { "name": "Victorian Driver's License", "icon": "car" },
        { "name": "Working at Heights", "icon": "triangle-right" },
        { "name": "Confined Spaces", "icon": "box" },
        { "name": "Asbestos Safety", "icon": "shield-alert" },
        { "name": "Mental Health First Aider", "icon": "heart-pulse" }
    ],
    "education": [
        { "degree": "Master of Engineering Science (Structural)", "school": "Swinburne University of Technology", "date": "2019 - 2021" },
        { "degree": "Bachelor of Civil Engineering", "school": "University of Pune", "date": "2014 - 2018" }
    ],
    "affiliations": [
        { "org": "Engineers Australia (MIEAust)", "status": "NER Registration in progress" },
        { "org": "Project Management Institute", "status": "Working towards PMP" }
    ],
    "techStack": [
        "MS Project", "Primavera P6", "Procore", "AutoCAD 3D", "Civil 3D", "SpaceGass", "Microstran", "MS Tower", "RAPT", "Inducta", "12d"
    ],
    "stats": [
      { "label": "Portfolio Value", "value": "$400M+" },
      { "label": "Telecom Sites", "value": "150+" },
      { "label": "QA Defects", "value": "Zero" }
    ],
    "projects": [
      {
        "title": "National 5G Telecom Upgrade",
        "tags": ["Telecom", "Structural", "Design"],
        "meta": "Victoria | 2023 - 2024 | $50M",
        "imageUrl": "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=800&q=80",
        "preview": "Structural design coordination for 150+ tower upgrades and 100+ site inspections.",
        "fullText": "Delivered design coordination, structural analysis, field inspections, and approvals support for critical telecom infrastructure.",
        "bullets": [
          "Delivered 150+ lattice tower and steel/timber pole upgrades ensuring compliance with AS1170.2.",
          "Managed trenching interfaces and civil coordination for fibre backhaul.",
          "Secured statutory planning approvals from 20+ councils, reducing approval cycles by 20%."
        ]
      },
      {
        "title": "Tier-1 Industrial Closures (Exxon & Rio Tinto)",
        "tags": ["Industrial", "Demolition", "Civil"],
        "meta": "VIC & NT | 2024 - Present | $365M+",
        "imageUrl": "https://images.unsplash.com/photo-1534398079543-7ae6d016b86c?auto=format&fit=crop&w=800&q=80",
        "preview": "Project Engineer contributing to Australia's largest industrial demolition projects.",
        "fullText": "End-to-end commercial and delivery oversight. Involving explosive demolition events, 142,000 tonnes of steel, and 300,000 tonnes of concrete.",
        "bullets": [
          "Managed subcontractor packages, RFQs, and regulatory interfaces with local councils.",
          "Negotiated and technically justified contract variations totaling $8M+.",
          "Organised scrap steel load-outs exceeding 135,000 tonnes (approx $65M+ in scrap value)."
        ],
        "links": [
          { "title": "Rio Tinto Recycling Record Steel", "url": "https://libertyindustrial.com/" }
        ]
      },
      {
        "title": "West Gate Freeway Upgrade",
        "tags": ["Civil", "Infrastructure", "QA"],
        "meta": "Melbourne, VIC | 2022 - 2023 | Confidential",
        "imageUrl": "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80",
        "preview": "Structural design support and QA verification of reinforced concrete crash barriers.",
        "fullText": "Quality-critical infrastructure delivery ensuring compliance with VicRoads and AS 5100.",
        "bullets": [
          "Supervised shop drawings and on-site concrete pours for precast noise walls.",
          "Provided input on temporary works including formwork detailing and access scaffolding.",
          "Achieved zero non-conformances across 100+ structural installations."
        ]
      },
      {
        "title": "Mumbai Metro Line 4 & 5",
        "tags": ["Civil", "QA/QC", "Infrastructure"],
        "meta": "Mumbai, India | 2018 - 2019 | Confidential",
        "imageUrl": "https://images.unsplash.com/photo-1582298538104-e3facf70a256?auto=format&fit=crop&w=800&q=80",
        "preview": "Civil Site Engineer supporting independent verification on elevated viaducts.",
        "fullText": "Oversight of massive concrete construction and underground tunnel operations.",
        "bullets": [
          "Performed concrete QA/QC for deep foundations (slump testing, dimensional checks).",
          "Conducted Dynamic Load Testing (DLT) and Pile Integrity Testing (PIT).",
          "Monitored tunnel alignment (TBM) and excavation safety."
        ]
      }
    ],
    "timeline": [
      {
        "roleCompany": "Project Engineer, Liberty Industrial",
        "dates": "03/2024 - Present",
        "location": "Altona VIC / Gove NT",
        "bullets": ["Supported end-to-end delivery of $100M+ industrial projects.", "Administered variations ($8M+), progress claims and EOTs."]
      },
      {
        "roleCompany": "Structural Project Engineer, Indara",
        "dates": "04/2023 - 03/2024",
        "location": "Melbourne VIC",
        "bullets": ["Delivered 150+ telecom infrastructure upgrades (5G expansion).", "Managed civil interfaces for foundations and fibre backhaul."]
      },
      {
        "roleCompany": "Graduate Structural Engineer, Clive Steele Partners",
        "dates": "11/2021 - 03/2023",
        "location": "Clayton VIC",
        "bullets": ["Designed steel framing and reinforced concrete to AS 4100/3600.", "Conducted site inspections and QA hold-point sign-offs."]
      }
    ],
    "contact": {
      "email": "ganesh.r.kalal24@gmail.com",
      "linkedin": "https://www.linkedin.com/in/ganesh-kalal/"
    }
};

let siteData = fallbackData;

document.addEventListener('DOMContentLoaded', async () => {
    
    try {
        const res = await fetch('./content.json', { cache: 'no-store' });
        if(res.ok) siteData = { ...fallbackData, ...await res.json() }; 
    } catch (e) {}

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);

    const toggleTheme = () => {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('themeToggleMobile')?.addEventListener('click', toggleTheme);

    function renderDOM() {
        try {
            if(document.getElementById('heroName')) document.getElementById('heroName').textContent = (siteData.name || "Ganesh Kalal").split(' (')[0];
            if(document.getElementById('heroRole')) document.getElementById('heroRole').setAttribute('data-text', siteData.role);
            if(siteData.profilePhotoUrl && document.getElementById('heroPhoto')) document.getElementById('heroPhoto').src = siteData.profilePhotoUrl;

            const visaText = document.getElementById('visaText');
            if(visaText && siteData.visaStatus) visaText.textContent = siteData.visaStatus;

            const leadNode = document.getElementById('aboutLead');
            if(leadNode) leadNode.innerHTML = `<strong>${siteData.aboutLead || ''}</strong><br><br>${siteData.aboutStory || ''}`;
            
            const ul = document.getElementById('aboutBullets');
            if(ul) siteData.knownFor.forEach(i => { ul.innerHTML += `<li><i data-lucide="check-circle-2"></i> <span>${i}</span></li>`; });

            const logGrid = document.getElementById('logisticsGrid');
            if(logGrid) siteData.logistics.forEach(l => { logGrid.innerHTML += `<div class="log-badge"><i data-lucide="${l.icon}"></i> ${l.name}</div>`; });

            const eduList = document.getElementById('educationList');
            if(eduList) siteData.education.forEach(e => { eduList.innerHTML += `<div class="edu-item"><div class="edu-title">${e.degree}</div><div class="edu-meta">${e.school} • ${e.date}</div></div>`; });

            const affilList = document.getElementById('affiliationsList');
            if(affilList) siteData.affiliations.forEach(a => { affilList.innerHTML += `<div class="edu-item"><div class="edu-title">${a.org}</div><div class="edu-meta">${a.status}</div></div>`; });

            const stackGrid = document.getElementById('techStackGrid');
            if(stackGrid) siteData.techStack.forEach(t => { stackGrid.innerHTML += `<span class="tech-tag">${t}</span>`; });

            const statsGrid = document.getElementById('statsGrid');
            if(statsGrid) siteData.stats.forEach(s => { statsGrid.innerHTML += `<div class="stat-box glass-panel tilt-card"><div class="stat-val">${s.value}</div><div class="stat-lbl">${s.label}</div></div>`; });

            const projGrid = document.getElementById('projectsBento');
            const filters = document.getElementById('projectFilters');
            if(projGrid && filters) {
                ['All', 'Telecom', 'Civil', 'Industrial'].forEach(cat => {
                    const btn = document.createElement('button');
                    btn.className = `chip magnetic ${cat === 'All' ? 'active' : ''}`;
                    btn.textContent = cat;
                    btn.addEventListener('click', () => {
                        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                        btn.classList.add('active');
                        renderProjects(cat);
                    });
                    filters.appendChild(btn);
                });

                function renderProjects(filter) {
                    projGrid.innerHTML = '';
                    let filtered = filter === 'All' ? siteData.projects : siteData.projects.filter(p => p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));
                    
                    filtered.forEach((p, i) => {
                        const tile = document.createElement('div');
                        let sizeClass = i === 0 ? 'large' : (i === 3 ? 'medium' : '');
                        tile.className = `bento-tile glass-panel tilt-card ${sizeClass}`;
                        
                        const img = p.imageUrl || 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=800&q=80';
                        tile.style.backgroundImage = `url('${img}')`;

                        tile.innerHTML = `
                            <div>
                                <div class="bento-tags">${p.tags.slice(0,3).map(t => `<span class="bento-tag">${t}</span>`).join('')}</div>
                                <h3 class="bento-title">${p.title}</h3>
                            </div>
                            <div style="color:#00f0ff; font-weight: 600; font-size:1rem; display:flex; align-items:center; gap:0.5rem; margin-top: 1rem;">View Case Study <i data-lucide="arrow-right"></i></div>
                        `;
                        tile.addEventListener('click', () => openModal(p));
                        projGrid.appendChild(tile);
                    });
                    if(window.lucide) lucide.createIcons();
                }
                renderProjects('All');
            }

            const tl = document.getElementById('careerTimeline');
            if(tl) siteData.timeline.forEach((job, i) => {
                const parts = job.roleCompany.split(',');
                const card = document.createElement('div');
                card.className = `timeline-item glass-panel gsap-fade-up ${i === 0 ? 'expanded' : ''}`;
                card.innerHTML = `<div class="timeline-dot"></div><div class="timeline-header"><div><h3 class="role-title">${parts[0]}</h3><div class="role-company">${parts.slice(1).join(',')}</div></div><div class="role-dates">${job.dates}</div></div><div class="timeline-details"><ul class="timeline-list">${job.bullets.map(b => `<li>${b}</li>`).join('')}</ul></div>`;
                card.addEventListener('click', () => {
                    document.querySelectorAll('.timeline-item').forEach(c => c.classList.remove('expanded'));
                    card.classList.add('expanded');
                });
                tl.appendChild(card);
            });

            if(document.getElementById('socialLinks')) document.getElementById('socialLinks').innerHTML = `<a href="${siteData.contact.linkedin}" target="_blank" class="social-btn magnetic"><span>LinkedIn Profile</span> <i data-lucide="arrow-up-right"></i></a><a href="mailto:${siteData.contact.email}" class="social-btn magnetic"><span>Email Me</span> <i data-lucide="mail"></i></a>`;
            if(document.getElementById('footerText')) document.getElementById('footerText').innerHTML = `&copy; ${new Date().getFullYear()} ${(siteData.name || "Ganesh").split(' ')[0]}. Engineering Precision.`;

        } catch (error) { console.error("DOM Error:", error); }
    }

    renderDOM();

    window.openModal = function(p) {
        document.getElementById('modalTitle').textContent = p.title;
        document.getElementById('modalTags').innerHTML = p.tags.map(t => `<span class="bento-tag">${t}</span>`).join('');
        const m = p.meta.split('|');
        document.getElementById('modalMetrics').innerHTML = `<div class="modal-metric"><i data-lucide="map-pin"></i> ${m[0]}</div><div class="modal-metric"><i data-lucide="calendar"></i> ${m[1]}</div><div class="modal-metric"><i data-lucide="circle-dollar-sign"></i> ${m[2]}</div>`;
        const mid = Math.ceil(p.bullets.length/2);
        document.getElementById('modalScope').innerHTML = `<li>${p.preview}</li>` + p.bullets.slice(0,mid).map(x=>`<li>${x}</li>`).join('');
        document.getElementById('modalRole').innerHTML = `<li>${p.fullText}</li>`;
        document.getElementById('modalConstraints').innerHTML = p.bullets.slice(mid).map(x=>`<li>${x}</li>`).join('');
        
        const linksContainer = document.getElementById('modalLinks');
        if(p.links && p.links.length > 0) {
            linksContainer.innerHTML = p.links.map(l => `<a href="${l.url}" target="_blank" class="modal-ext-link"><i data-lucide="link"></i> ${l.title}</a>`).join('');
        } else {
            linksContainer.innerHTML = "<p style='color:var(--text-muted); font-size:1rem;'>Internal works. No external media.</p>";
        }

        document.getElementById('projectModal').classList.add('open');
        document.body.style.overflow = 'hidden';
        if(window.lucide) lucide.createIcons();
    }

    window.closeModal = function() {
        document.getElementById('projectModal').classList.remove('open');
        document.body.style.overflow = '';
    }
    document.getElementById('modalBackdrop')?.addEventListener('click', closeModal);
    document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);

    if(window.lucide) lucide.createIcons();
});
