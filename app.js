// --- FAIL-SAFE DATABASE ---
const fallbackData = {
    "name": "Ganesh Kalal (MIEAust)",
    "role": "Project Engineer",
    "kicker": "Melbourne VIC • Telecom • Infrastructure",
    "heroSubtitle": "Civil and Telecom Project Engineer delivering Tier-1 projects. Specializing in 5G rollouts, statutory approvals, and precision structural execution.",
    "aboutLead": "Strategy-driven engineer balancing technical oversight with commercial discipline.",
    "aboutStory": "I bridge the gap between structural engineering theory and site execution, with over 5 years of experience across metro rail, live-traffic freeways, and large-scale industrial closures.",
    "knownFor": [
      "5G Infrastructure Rollouts & Upgrades",
      "Site Acquisition, Permitting & Council Approvals",
      "Fibre Backhaul, Trenching & Civil Works Coordination",
      "Structural Tower Design & Audits (AS/NZS 1170.2)",
      "Subcontractor Management & Commercial Execution"
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
        "preview": "Structural design coordination for 150+ tower upgrades and 100+ site inspections.",
        "fullText": "Delivered design coordination, structural analysis, field inspections, and approvals support for critical telecom infrastructure.",
        "bullets": [
          "Delivered 150+ lattice tower and steel/timber pole upgrades.",
          "Managed trenching interfaces and civil coordination for fibre backhaul.",
          "Secured statutory planning approvals from 20+ councils."
        ]
      },
      {
        "title": "Tier-1 Industrial Closures",
        "tags": ["Industrial", "Demolition", "Civil"],
        "meta": "VIC & NT | 2024 - Present | $300M+",
        "preview": "Project Engineer contributing to full lifecycle delivery of large-scale brownfield remediation.",
        "fullText": "End-to-end commercial and delivery oversight in live operational environments (ExxonMobil & Rio Tinto).",
        "bullets": [
          "Managed subcontractor packages and regulatory interfaces.",
          "Negotiated contract variations totaling $8M+.",
          "Updated Primavera P6 schedules reflecting sequencing impacts."
        ]
      },
      {
        "title": "West Gate Freeway Upgrade",
        "tags": ["Civil", "Infrastructure", "QA"],
        "meta": "Melbourne, VIC | 2022 - 2023 | Confidential",
        "preview": "Structural design support and QA verification of reinforced concrete crash barriers.",
        "fullText": "Quality-critical infrastructure delivery ensuring compliance with VicRoads and AS 5100.",
        "bullets": [
          "Supervised shop drawings and on-site concrete pours.",
          "Conducted QA testing and reinforcement verification.",
          "Achieved zero non-conformances across 100+ structural installations."
        ]
      },
      {
        "title": "Mumbai Metro Line 4 & 5",
        "tags": ["Civil", "QA/QC"],
        "meta": "Mumbai, India | 2018 - 2019 | Confidential",
        "preview": "Civil Site Engineer supporting independent verification on elevated viaducts.",
        "fullText": "Oversight of massive concrete construction and underground tunnel operations.",
        "bullets": [
          "Performed concrete QA/QC for deep foundations.",
          "Conducted Pile Integrity and Dynamic Load Testing.",
          "Monitored tunnel alignment (TBM) and excavation safety."
        ]
      }
    ],
    "timeline": [
      {
        "roleCompany": "Project Engineer, Liberty Industrial",
        "dates": "02/2024 - Present",
        "location": "Altona VIC / Gove NT",
        "bullets": ["Supported end-to-end delivery of $100M+ industrial projects.", "Managed subcontractor procurement (RFQs, tender evaluations).", "Administered variations ($8M+), progress claims and EOTs."]
      },
      {
        "roleCompany": "Structural Project Engineer, Indara",
        "dates": "04/2023 - 03/2024",
        "location": "Melbourne VIC",
        "bullets": ["Delivered 150+ telecom infrastructure upgrades (5G expansion).", "Coordinated land access and statutory submissions.", "Managed civil interfaces for foundations and fibre backhaul."]
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
    
    // --- GSAP & INTERACTIVITY INIT ---
    gsap.registerPlugin(ScrollTrigger);

    function initCustomCursor() {
        const cursorDot = document.getElementById('cursorDot');
        const cursorRing = document.getElementById('cursorRing');
        
        if(window.matchMedia("(pointer: fine)").matches && cursorDot && cursorRing) {
            let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
            let ringX = mouseX, ringY = mouseY;

            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX; mouseY = e.clientY;
                gsap.set(cursorDot, { x: mouseX, y: mouseY });
            });

            gsap.ticker.add(() => {
                ringX += (mouseX - ringX) * 0.15;
                ringY += (mouseY - ringY) * 0.15;
                gsap.set(cursorRing, { x: ringX, y: ringY });
            });

            const interactiveElements = document.querySelectorAll('a, button, .bento-tile, .timeline-item, .magnetic, .social-btn');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
            });
        } else {
            if(cursorDot) cursorDot.style.display = 'none';
            if(cursorRing) cursorRing.style.display = 'none';
        }
    }

    function initMagneticButtons() {
        if(!window.matchMedia("(pointer: fine)").matches) return;
        const magnetics = document.querySelectorAll('.magnetic');
        magnetics.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const strength = btn.dataset.strength || 20;
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength;
                gsap.to(btn, { x: x, y: y, duration: 0.5, ease: "power2.out" });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
        });
    }

    function initCardSpotlights() {
        if(!window.matchMedia("(pointer: fine)").matches) return;
        const cards = document.querySelectorAll('.spotlight-card, .bento-tile');
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--y', `${e.clientY - rect.top}px`);
            });
        });
    }

    function initGSAPReveals() {
        gsap.utils.toArray('.gsap-fade-up').forEach(elem => {
            gsap.fromTo(elem, 
                { y: 60, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: elem, start: "top 85%" } }
            );
        });
    }

    // --- DATA LOADING & POPULATION ---
    async function init() {
        try {
            const res = await fetch('./content.json', {cache: 'no-store'});
            if(res.ok) siteData = await res.json();
        } catch (e) { console.warn("Using fallback data."); }

        populateHero();
        populateAbout();
        populateProjects();
        populateCareer();
        populateContact();
        initCharts();
        
        // Let DOM render, then init animations
        setTimeout(() => {
            initCustomCursor();
            initMagneticButtons();
            initCardSpotlights();
            initGSAPReveals();
            if(typeof lucide !== 'undefined') lucide.createIcons();
        }, 100);
    }

    function populateHero() {
        document.getElementById('heroPositioning').textContent = siteData.kicker;
        document.getElementById('heroTagline').textContent = siteData.heroSubtitle;
    }

    function populateAbout() {
        document.getElementById('aboutLead').innerHTML = `<strong>${siteData.aboutLead}</strong><br><br>${siteData.aboutStory}`;
        const ul = document.getElementById('aboutBullets');
        siteData.knownFor.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<i data-lucide="check-circle-2"></i> <span>${item}</span>`;
            ul.appendChild(li);
        });

        const statsGrid = document.getElementById('statsGrid');
        siteData.stats.forEach(stat => {
            const div = document.createElement('div');
            div.className = 'stat-box glass-panel spotlight-card';
            div.innerHTML = `<div class="stat-val">${stat.value}</div><div class="stat-lbl">${stat.label}</div>`;
            statsGrid.appendChild(div);
        });
    }

    function populateProjects() {
        const grid = document.getElementById('projectsBento');
        const filters = document.getElementById('projectFilters');
        
        // Setup Filters
        ['All', 'Telecom', 'Civil', 'Industrial'].forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `chip magnetic ${cat === 'All' ? 'active' : ''}`;
            btn.dataset.strength = "10";
            btn.textContent = cat;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                renderProjects(cat);
            });
            filters.appendChild(btn);
        });

        function renderProjects(filter) {
            grid.innerHTML = '';
            let filtered = siteData.projects;
            if(filter !== 'All') {
                filtered = siteData.projects.filter(p => p.tags.some(t => t.includes(filter)));
            }

            filtered.forEach((p, i) => {
                const tile = document.createElement('div');
                let sizeClass = i === 0 ? 'large' : (i === 3 ? 'medium' : '');
                tile.className = `bento-tile glass-panel spotlight-card ${sizeClass}`;
                
                // Subtle gradient logic
                const hues = [190, 220, 260, 160];
                const h = hues[i % hues.length];
                tile.style.background = `linear-gradient(135deg, hsla(${h}, 80%, 15%, 0.3), var(--bg-glass))`;

                tile.innerHTML = `
                    <div>
                        <div class="bento-tags">${p.tags.slice(0,2).map(t => `<span class="bento-tag">${t}</span>`).join('')}</div>
                        <h3 class="bento-title">${p.title}</h3>
                    </div>
                    <div class="bento-link">View Case Study <i data-lucide="arrow-right"></i></div>
                `;
                tile.addEventListener('click', () => openModal(p));
                grid.appendChild(tile);
            });
            initCardSpotlights(); // re-init spotlights for new DOM
            if(typeof lucide !== 'undefined') lucide.createIcons();
        }
        renderProjects('All');
    }

    function populateCareer() {
        const tl = document.getElementById('careerTimeline');
        siteData.timeline.forEach((job, i) => {
            const parts = job.roleCompany.split(',');
            const card = document.createElement('div');
            card.className = 'timeline-item glass-panel spotlight-card gsap-fade-up';
            if(i === 0) card.classList.add('expanded');
            
            card.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-header">
                    <div>
                        <h3 class="role-title">${parts[0]}</h3>
                        <div class="role-company">${parts.slice(1).join(',')} • ${job.location}</div>
                    </div>
                    <div class="role-dates">${job.dates}</div>
                </div>
                <div class="timeline-details">
                    <ul class="timeline-list">${job.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
                </div>
            `;
            card.addEventListener('click', () => {
                const isExp = card.classList.contains('expanded');
                document.querySelectorAll('.timeline-item').forEach(c => c.classList.remove('expanded'));
                if(!isExp) card.classList.add('expanded');
            });
            tl.appendChild(card);
        });
    }

    function populateContact() {
        if(siteData.contact) {
            document.getElementById('socialLinks').innerHTML = `
                <a href="${siteData.contact.linkedin}" target="_blank" class="social-btn magnetic" data-strength="10"><span>LinkedIn Profile</span> <i data-lucide="arrow-up-right"></i></a>
                <a href="mailto:${siteData.contact.email}" class="social-btn magnetic" data-strength="10"><span>${siteData.contact.email}</span> <i data-lucide="mail"></i></a>
            `;
            document.getElementById('footerText').innerHTML = `&copy; ${new Date().getFullYear()} ${siteData.name.split(' ')[0]}. Engineering Precision.`;
        }
    }

    // --- MODAL ---
    window.openModal = function(p) {
        document.getElementById('modalTitle').textContent = p.title;
        document.getElementById('modalTags').innerHTML = p.tags.map(t => `<span class="bento-tag">${t}</span>`).join('');
        
        const m = p.meta.split('|');
        document.getElementById('modalMetrics').innerHTML = `
            <div class="modal-metric"><i data-lucide="map-pin"></i> ${m[0]}</div>
            <div class="modal-metric"><i data-lucide="calendar"></i> ${m[1]}</div>
            <div class="modal-metric"><i data-lucide="circle-dollar-sign"></i> ${m[2]}</div>
        `;

        const b = p.bullets || [];
        const mid = Math.ceil(b.length/2);
        document.getElementById('modalScope').innerHTML = `<li>${p.preview}</li>` + b.slice(0,mid).map(x=>`<li>${x}</li>`).join('');
        document.getElementById('modalRole').innerHTML = `<li>${p.fullText}</li>`;
        document.getElementById('modalConstraints').innerHTML = "<li>Managed structural interfaces in complex environments.</li>";
        document.getElementById('modalOutcomes').innerHTML = b.slice(mid).map(x=>`<li>${x}</li>`).join('');

        const modal = document.getElementById('projectModal');
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if(typeof lucide !== 'undefined') lucide.createIcons();
    }

    window.closeModal = function() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // --- CHARTS ---
    function initCharts() {
        if(typeof Chart === 'undefined') return;
        Chart.defaults.color = '#8892b0';
        Chart.defaults.font.family = "'Inter', sans-serif";

        new Chart(document.getElementById('budgetChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Rio Tinto', 'Exxon', 'Telecom 5G', 'West Gate'],
                datasets: [{ label: 'Value ($M)', data: [300, 65, 50, 15], backgroundColor: '#00f0ff', borderRadius: 4 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } }
        });

        new Chart(document.getElementById('typeChart').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Telecom 5G', 'Industrial', 'Civil'],
                datasets: [{ data: [40, 45, 15], backgroundColor: ['#00f0ff', '#0088ff', '#7000ff'], borderWidth: 0 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#ffffff' } } } }
        });
    }

    init();
});
