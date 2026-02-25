// --- FAIL-SAFE DATABASE ---
const fallbackData = {
    "name": "Ganesh Kalal (MIEAust)",
    "role": "Project Engineer",
    "kicker": "Melbourne VIC • Telecom • Civil Infrastructure",
    "heroSubtitle": "Civil and Telecom Project Engineer delivering Tier-1 projects. Specializing in 5G rollouts, statutory approvals, and precision structural execution.",
    "aboutLead": "Strategy-driven engineer balancing technical oversight with commercial discipline.",
    "aboutStory": "I bridge the gap between structural engineering theory and site execution. With over 5 years of experience across 5G telecom infrastructure, metro rail, live-traffic freeways, and the largest industrial closures in the Southern Hemisphere.",
    "knownFor": [
      "5G Infrastructure Rollouts & Upgrades",
      "Site Acquisition, Permitting & Council Approvals",
      "Fibre Backhaul, Trenching & Civil Works Coordination",
      "Structural Tower Design & Audits (AS/NZS 1170.2)",
      "Subcontractor Management & Commercial Execution"
    ],
    "certifications": [
      { "name": "Oracle Primavera P6 Professional", "issuer": "Compass Consult", "icon": "calendar-days" },
      { "name": "Generative AI for Project Managers", "issuer": "Project Management Institute (PMI)", "icon": "bot" },
      { "name": "Leadership Development", "issuer": "Osprey International", "icon": "award" }
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
        "title": "Tier-1 Industrial Closures (Exxon & Rio Tinto)",
        "tags": ["Industrial", "Demolition", "Civil"],
        "meta": "VIC & NT | 2024 - Present | $365M+",
        "preview": "Project Engineer contributing to Australia's largest industrial demolition projects.",
        "fullText": "End-to-end commercial and delivery oversight. Involving explosive demolition events, 142,000 tonnes of steel, and 300,000 tonnes of concrete.",
        "bullets": [
          "Managed subcontractor packages and regulatory interfaces.",
          "Negotiated contract variations totaling $8M+.",
          "Updated Primavera P6 schedules reflecting sequencing impacts."
        ],
        "links": [
          { "title": "World's Most Powerful Shear Unveiled", "url": "https://libertyindustrial.com/worlds-most-powerful-shear-unveiled-in-australia/" },
          { "title": "Rio Tinto Recycling Record Steel", "url": "https://libertyindustrial.com/rio-tinto-starts-recycling-steel-from-australias-largest-ever-demolition-project-on-the-northern-territorys-gove-peninsula/" },
          { "title": "ExxonMobil Altona Demolition Works", "url": "https://corporate.exxonmobil.com/locations/australia/australia-newsroom/mobil-community-outreach/2025/altona-refinery-facilities-to-begin-demolition-works" }
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
        "tags": ["Civil", "QA/QC", "Infrastructure"],
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
        "dates": "03/2024 - Present",
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
      },
      {
        "roleCompany": "Graduate Civil Engineer, Structcom",
        "dates": "06/2020 - 10/2021",
        "location": "Caulfield VIC",
        "bullets": ["Designed stormwater drainage, OSD systems, and site grading.", "Coordinated geotechnical investigations and council approvals."]
      },
      {
        "roleCompany": "Engineering Cadet / Site Eng, Tata Projects",
        "dates": "01/2019 - 07/2019",
        "location": "Mumbai, India",
        "bullets": ["Supported QA/QC for concrete pours (slump testing).", "Assisted in pile integrity and dynamic load testing for foundations."]
      }
    ],
    "contact": {
      "email": "ganesh.r.kalal24@gmail.com",
      "linkedin": "https://www.linkedin.com/in/ganesh-kalal/"
    }
};

let siteData = fallbackData; 

document.addEventListener('DOMContentLoaded', async () => {
    
    // --- 1. DATA LOADING ---
    try {
        const res = await fetch('./content.json', { cache: 'no-store' });
        if(res.ok) {
            const fetchedData = await res.json();
            siteData = { ...fallbackData, ...fetchedData }; 
        }
    } catch (e) {
        console.warn("Fetch failed, using fail-safe internal data.");
    }

    // --- 2. THEME TOGGLE ---
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);

        const toggleBtn = document.getElementById('themeToggle');
        if(toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const currentTheme = document.body.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    }

    // --- 3. POPULATE DOM ---
    function populateDOM() {
        // Hero
        const nameNode = document.getElementById('heroName');
        if(nameNode) nameNode.textContent = (siteData.name || "Ganesh Kalal").split(' (')[0];
        
        const roleNode = document.getElementById('heroRole');
        if(roleNode) roleNode.textContent = siteData.role || "Project Engineer";

        const posNode = document.getElementById('heroPositioning');
        if(posNode) posNode.textContent = siteData.kicker || "Civil & Structural Engineer";
        
        const tagNode = document.getElementById('heroTagline');
        if(tagNode) tagNode.textContent = siteData.heroSubtitle || siteData.tagline || "";

        const photoNode = document.getElementById('heroPhoto');
        if(photoNode && siteData.profilePhotoUrl) photoNode.src = siteData.profilePhotoUrl;

        // About
        const leadNode = document.getElementById('aboutLead');
        if(leadNode) leadNode.innerHTML = `<strong>${siteData.aboutLead || ''}</strong><br><br>${siteData.aboutStory || ''}`;
        
        const ul = document.getElementById('aboutBullets');
        if(ul) {
            (siteData.knownFor || []).forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<i data-lucide="check-circle-2"></i> <span>${item}</span>`;
                ul.appendChild(li);
            });
        }

        const certGrid = document.getElementById('certGrid');
        if(certGrid && siteData.certifications) {
            siteData.certifications.forEach(cert => {
                const div = document.createElement('div');
                div.className = 'cert-item';
                div.innerHTML = `
                    <i data-lucide="${cert.icon}" class="cert-icon"></i>
                    <div class="cert-text">
                        <h5>${cert.name}</h5>
                        <p>${cert.issuer}</p>
                    </div>
                `;
                certGrid.appendChild(div);
            });
        }

        const statsGrid = document.getElementById('statsGrid');
        if(statsGrid) {
            (siteData.stats || []).forEach(stat => {
                const div = document.createElement('div');
                div.className = 'stat-box glass-panel spotlight-card tilt-card';
                div.innerHTML = `<div class="stat-val">${stat.value || 'N/A'}</div><div class="stat-lbl">${stat.label || 'Metric'}</div>`;
                statsGrid.appendChild(div);
            });
        }

        // Projects
        const projGrid = document.getElementById('projectsBento');
        const filters = document.getElementById('projectFilters');
        if(projGrid && filters) {
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
                projGrid.innerHTML = '';
                let filtered = siteData.projects || [];
                if(filter !== 'All') {
                    filtered = filtered.filter(p => (p.tags || []).some(t => t.toLowerCase().includes(filter.toLowerCase())));
                }

                filtered.forEach((p, i) => {
                    const tile = document.createElement('div');
                    let sizeClass = i === 0 ? 'large' : (i === 3 ? 'medium' : '');
                    tile.className = `bento-tile glass-panel spotlight-card tilt-card ${sizeClass}`;
                    
                    const hues = [190, 220, 260, 160];
                    tile.style.background = `linear-gradient(135deg, hsla(${hues[i % hues.length]}, 80%, 15%, 0.3), var(--bg-glass))`;

                    tile.innerHTML = `
                        <div>
                            <div class="bento-tags">${(p.tags || []).slice(0,3).map(t => `<span class="bento-tag">${t}</span>`).join('')}</div>
                            <h3 class="bento-title">${p.title || 'Project'}</h3>
                        </div>
                        <div class="bento-link">View Case Study <i data-lucide="arrow-right"></i></div>
                    `;
                    tile.addEventListener('click', () => openModal(p));
                    projGrid.appendChild(tile);
                });
                
                initCardSpotlights(); 
                if(typeof lucide !== 'undefined') lucide.createIcons();
            }
            renderProjects('All');
        }

        // Timeline
        const tl = document.getElementById('careerTimeline');
        if(tl) {
            (siteData.timeline || []).forEach((job, i) => {
                const parts = (job.roleCompany || "Role, Company").split(',');
                const card = document.createElement('div');
                card.className = 'timeline-item glass-panel spotlight-card gsap-fade-up';
                if(i === 0) card.classList.add('expanded');
                
                card.innerHTML = `
                    <div class="timeline-dot"></div>
                    <div class="timeline-header">
                        <div>
                            <h3 class="role-title">${parts[0]}</h3>
                            <div class="role-company">${parts.slice(1).join(',')} • ${job.location || ''}</div>
                        </div>
                        <div class="role-dates">${job.dates || ''}</div>
                    </div>
                    <div class="timeline-details">
                        <ul class="timeline-list">${(job.bullets || []).map(b => `<li>${b}</li>`).join('')}</ul>
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

        // Contact
        const socialLinks = document.getElementById('socialLinks');
        if(socialLinks && siteData.contact) {
            socialLinks.innerHTML = `
                <a href="${siteData.contact.linkedin || '#'}" target="_blank" class="social-btn magnetic" data-strength="10"><span>LinkedIn Profile</span> <i data-lucide="arrow-up-right"></i></a>
                <a href="mailto:${siteData.contact.email || '#'}" class="social-btn magnetic" data-strength="10"><span>${siteData.contact.email || 'Email'}</span> <i data-lucide="mail"></i></a>
            `;
        }
        const fText = document.getElementById('footerText');
        if(fText) fText.innerHTML = `&copy; ${new Date().getFullYear()} ${(siteData.name || "Ganesh").split(' ')[0]}. Engineering Precision.`;
    }

    // --- 4. MODAL LOGIC ---
    window.openModal = function(p) {
        document.getElementById('modalTitle').textContent = p.title || 'Project Details';
        document.getElementById('modalTags').innerHTML = (p.tags || []).map(t => `<span class="bento-tag">${t}</span>`).join('');
        
        const m = (p.meta || "Location | Date | Value").split('|');
        document.getElementById('modalMetrics').innerHTML = `
            <div class="modal-metric"><i data-lucide="map-pin"></i> ${m[0] || 'N/A'}</div>
            <div class="modal-metric"><i data-lucide="calendar"></i> ${m[1] || 'N/A'}</div>
            <div class="modal-metric"><i data-lucide="circle-dollar-sign"></i> ${m[2] || 'Confidential'}</div>
        `;

        const b = p.bullets || ["Details pending."];
        const mid = Math.ceil(b.length/2);
        
        document.getElementById('modalScope').innerHTML = `<li>${p.preview || ''}</li>` + b.slice(0,mid).map(x=>`<li>${x}</li>`).join('');
        document.getElementById('modalRole').innerHTML = `<li>${p.fullText || ''}</li>`;
        document.getElementById('modalConstraints').innerHTML = "<li>Managed structural interfaces in complex environments.</li><li>Coordinated with multiple stakeholders to ensure QA compliance.</li>";
        
        const linksContainer = document.getElementById('modalLinks');
        if(p.links && p.links.length > 0) {
            linksContainer.innerHTML = p.links.map(link => `
                <a href="${link.url}" target="_blank" class="modal-ext-link">
                    <i data-lucide="link"></i> ${link.title}
                </a>
            `).join('');
        } else {
            linksContainer.innerHTML = "<p style='color:var(--text-muted); font-size:0.9rem;'>No external media available.</p>";
        }

        const modal = document.getElementById('projectModal');
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if(typeof lucide !== 'undefined') lucide.createIcons();
    }

    window.closeModal = function() {
        const modal = document.getElementById('projectModal');
        if(modal) {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    // --- 5. UI/UX INTERACTIVITY ---
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

            document.querySelectorAll('a, button, .bento-tile, .timeline-item, .magnetic, .social-btn').forEach(el => {
                el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
            });
        }
    }

    function initMagneticButtons() {
        if(!window.matchMedia("(pointer: fine)").matches || typeof gsap === 'undefined') return;
        document.querySelectorAll('.magnetic').forEach(btn => {
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
        document.querySelectorAll('.spotlight-card, .bento-tile, .profile-frame').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--y', `${e.clientY - rect.top}px`);
            });
        });
    }

    function init3DTilt() {
        if(!window.matchMedia("(pointer: fine)").matches || typeof gsap === 'undefined') return;
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;
                gsap.to(card, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, ease: "power1.out", duration: 0.4 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotationX: 0, rotationY: 0, ease: "elastic.out(1, 0.3)", duration: 1 });
            });
        });
    }

    function initGSAPReveals() {
        if(typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            document.querySelectorAll('.gsap-fade-up').forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
            return;
        }
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.gsap-fade-up').forEach(elem => {
            gsap.fromTo(elem, 
                { y: 60, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: elem, start: "top 85%" } }
            );
        });
    }

    // --- RUN EVERYTHING ---
    initTheme();
    populateDOM();
    
    setTimeout(() => {
        if(typeof lucide !== 'undefined') lucide.createIcons();
        initCustomCursor();
        initMagneticButtons();
        initCardSpotlights();
        init3DTilt();
        initGSAPReveals();
    }, 100);

});
