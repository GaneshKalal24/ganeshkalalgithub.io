document.addEventListener('DOMContentLoaded', async () => {
    let siteData = {};

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
        lucide.createIcons();
    }

    async function loadData() {
        try {
            const res = await fetch('./content.json');
            if(res.ok) siteData = await res.json();
        } catch (e) { console.error("Failed to load content.json", e); }
    }

    function initTheme() {
        const saved = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', saved);
        document.getElementById('themeIcon').setAttribute('data-lucide', saved === 'dark' ? 'sun' : 'moon');

        document.getElementById('themeToggle').addEventListener('click', () => {
            const current = document.body.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            document.getElementById('themeIcon').setAttribute('data-lucide', next === 'dark' ? 'sun' : 'moon');
            lucide.createIcons();
            initCharts(); // Re-render charts for color updates
        });
    }

    function populateHero() {
        document.getElementById('heroPositioning').textContent = siteData.kicker;
        document.getElementById('heroName').textContent = siteData.name.split(' (')[0]; 
        document.getElementById('heroTitle').textContent = siteData.role;
        document.getElementById('heroTagline').textContent = siteData.heroSubtitle;
    }

    function populateAbout() {
        const ul = document.getElementById('aboutBullets');
        siteData.knownFor.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<i data-lucide="check-circle-2"></i> <span>${item}</span>`;
            ul.appendChild(li);
        });

        const statsGrid = document.getElementById('statsGrid');
        siteData.stats.forEach(stat => {
            const div = document.createElement('div');
            div.className = 'stat-box glass-panel';
            div.innerHTML = `<div class="stat-val">${stat.value}</div><div class="stat-lbl">${stat.label}</div>`;
            statsGrid.appendChild(div);
        });
    }

    function populateCareer() {
        const timeline = document.getElementById('careerTimeline');
        siteData.timeline.forEach((job, idx) => {
            const parts = job.roleCompany.split(',');
            const role = parts[0].trim();
            const company = parts.length > 1 ? parts.slice(1).join(',').trim() : "";
            
            // Extract keywords for collapsed view
            const kw1 = job.bullets[0] ? job.bullets[0].split(' ')[0] : "Engineering";
            const kw2 = job.bullets[1] ? job.bullets[1].split(' ')[0] : "Management";

            const card = document.createElement('div');
            card.className = 'timeline-item glass-panel reveal';
            if(idx === 0) card.classList.add('expanded'); // Open first by default
            
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
                const isExp = card.classList.contains('expanded');
                document.querySelectorAll('.timeline-item').forEach(c => c.classList.remove('expanded'));
                if (!isExp) card.classList.add('expanded');
            });
            timeline.appendChild(card);
        });
    }

    function initProjectFilters() {
        const container = document.getElementById('projectFilters');
        const filters = ['All', 'Telecom', 'Industrial', 'Civil'];
        
        filters.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `filter-chip ${cat === 'All' ? 'active' : ''}`;
            btn.textContent = cat;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                populateProjects(cat);
            });
            container.appendChild(btn);
        });
    }

    function populateProjects(filter) {
        const grid = document.getElementById('projectsBento');
        grid.innerHTML = '';
        
        let filtered = siteData.projects;
        if(filter !== 'All') {
            filtered = siteData.projects.filter(p => p.tags && p.tags.includes(filter));
        }

        filtered.forEach((p, index) => {
            const tile = document.createElement('div');
            let sizeClass = index === 0 ? 'large' : (index % 3 === 0 ? 'medium' : '');
            tile.className = `tile glass-panel reveal active ${sizeClass}`;
            
            // Generate dark abstract gradient based on index
            const hues = [195, 260, 220, 160];
            const h = hues[index % hues.length];
            tile.style.background = `linear-gradient(135deg, hsla(${h}, 80%, 20%, 0.3), var(--card-bg))`;

            tile.innerHTML = `
                <div class="tile-content">
                    <div class="tile-tags">
                        ${p.tags.slice(0,2).map(t => `<span>${t}</span>`).join('')}
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

    function openModal(project) {
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalTags').innerHTML = project.tags.map(t => `<span>${t}</span>`).join('');

        const metaParts = project.meta.split('|');
        const loc = metaParts[0] || "Location N/A";
        const date = metaParts[1] || "Date N/A";
        const val = metaParts[2] || "Confidential";

        document.getElementById('modalMetrics').innerHTML = `
            <div class="modal-metric"><i data-lucide="map-pin"></i> ${loc.trim()}</div>
            <div class="modal-metric"><i data-lucide="calendar"></i> ${date.trim()}</div>
            <div class="modal-metric"><i data-lucide="circle-dollar-sign"></i> ${val.trim()}</div>
        `;

        const b = project.bullets || [];
        const mid = Math.ceil(b.length / 2);
        
        document.getElementById('modalScope').innerHTML = `<li>${project.preview}</li>` + b.slice(0, mid).map(item => `<li>${item}</li>`).join('');
        document.getElementById('modalOutcomes').innerHTML = `<li>${project.fullText}</li>` + b.slice(mid).map(item => `<li>${item}</li>`).join('');

        document.getElementById('projectModal').classList.add('open');
        document.getElementById('projectModal').setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lucide.createIcons();
    }

    window.closeModal = () => {
        document.getElementById('projectModal').classList.remove('open');
        document.getElementById('projectModal').setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    function initCharts() {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        const tColor = isLight ? '#475569' : '#94a3b8';
        const gColor = isLight ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.05)';
        const accent = isLight ? '#0284c7' : '#06b6d4';

        Chart.defaults.color = tColor;
        Chart.defaults.font.family = "'Inter', sans-serif";

        if(window.ch1) window.ch1.destroy();
        if(window.ch2) window.ch2.destroy();

        // Budget Chart
        window.ch1 = new Chart(document.getElementById('budgetChart'), {
            type: 'bar',
            data: {
                labels: ['Industrial', 'Telecom', 'Civil'],
                datasets: [{
                    label: 'Project Value ($M)',
                    data: [365, 50, 20], 
                    backgroundColor: accent,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { grid: { color: gColor } }, x: { grid: { display: false } } }
            }
        });

        // Distribution Doughnut
        window.ch2 = new Chart(document.getElementById('typeChart'), {
            type: 'doughnut',
            data: {
                labels: ['Telecom/5G', 'Industrial Demolition', 'Transport/Civil'],
                datasets: [{
                    data: [40, 40, 20],
                    backgroundColor: [accent, '#6366f1', '#1e293b'],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
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
            document.getElementById('socialLinks').innerHTML = `
                <a href="${siteData.contact.linkedin}" target="_blank" class="glass-panel"><i data-lucide="linkedin"></i> LinkedIn</a>
                <a href="mailto:${siteData.contact.email}" class="glass-panel"><i data-lucide="mail"></i> Email</a>
            `;
            document.getElementById('footerText').innerHTML = `&copy; ${new Date().getFullYear()} ${siteData.name}. Project Engineering Portfolio.`;
        }
    }

    function initScrollReveal() {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }

    init();
});
