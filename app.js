// Fetch Data
async function loadContent() {
    try {
        const res = await fetch("./content.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
    } catch (error) {
        console.error("Could not load content.json:", error);
        return null;
    }
}

const $ = (id) => document.getElementById(id);

function setText(id, text) {
    const el = $(id);
    if (el && text) el.textContent = text;
}

function setLink(id, url) {
    const el = $(id);
    if (el) {
        if (url) {
            el.href = url;
            el.style.display = "inline-flex";
        } else {
            el.style.display = "none";
        }
    }
}

// Builders
function createStat(label, value, index) {
    const div = document.createElement("div");
    div.className = `stat reveal delay-${(index % 3) + 1}`; // Staggered delay
    div.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
    return div;
}

function createCard(item, isProject, onClick, index) {
    const card = document.createElement("div");
    card.className = `card reveal delay-${(index % 3) + 1}`; // Staggered delay
    
    let tagsHtml = "";
    if (isProject && item.tags) {
        tagsHtml = `<div class="project-tags">` + 
                   item.tags.map(t => `<span class="tag">${t}</span>`).join('') + 
                   `</div>`;
    }

    card.innerHTML = `
        <div class="bento-meta">${item.meta || 'Detail'}</div>
        <div class="bento-title">${item.title}</div>
        <div class="bento-text">${item.preview}</div>
        ${tagsHtml}
    `;
    
    card.addEventListener("click", () => onClick(item));
    return card;
}

function createTimelineNode(t, index) {
    const item = document.createElement("div");
    item.className = "time-item reveal"; 
    
    let bulletsHtml = "";
    if (t.bullets) {
        bulletsHtml = `<ul>` + t.bullets.map(b => `<li>${b}</li>`).join('') + `</ul>`;
    }

    item.innerHTML = `
        <div class="when">${t.dates}</div>
        <div class="role">${t.roleCompany}</div>
        <div class="where">📍 ${t.location}</div>
        ${bulletsHtml}
    `;
    return item;
}

// Interactions
function openModal(data) {
    $("modalKicker").textContent = data.meta || "Explore";
    $("modalTitle").textContent = data.title;
    $("modalText").textContent = data.fullText || data.preview;
    
    const ul = $("modalList");
    ul.innerHTML = "";
    if (data.bullets) {
        data.bullets.forEach(b => {
            const li = document.createElement("li");
            li.innerHTML = b; // Allow bolding inside bullets
            ul.appendChild(li);
        });
    }

    $("modal").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    $("modal").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    $("themeIcon").textContent = newTheme === "light" ? "🌙" : "🌓";
}

// The "Awesome" Visual Observers
function initVisualEffects() {
    // 1. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        $("scrollBar").style.width = scrolled + '%';
    });

    // 2. Mouse Spotlight Effect on Cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 3. Staggered Scroll Reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    
    // Trigger immediate reveals for items currently in viewport
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
            if(el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
}

// Initialization
async function init() {
    const data = await loadContent();
    if (!data) return;

    setText("kicker", data.kicker);
    setText("heroTitle", data.heroTitle);
    setText("heroSubtitle", data.heroSubtitle);
    setText("signatureLine", data.signatureLine);
    
    setLink("downloadCvLink", data.downloadCvUrl);
    setLink("linkedinLink", data.contact?.linkedin);

    const statsDiv = $("stats");
    data.stats?.forEach((s, i) => statsDiv.appendChild(createStat(s.label, s.value, i)));

    const bentoGrid = $("bentoGrid");
    data.bento?.forEach((item, i) => bentoGrid.appendChild(createCard(item, false, openModal, i)));

    const projectsGrid = $("projectsGrid");
    data.projects?.forEach((proj, i) => projectsGrid.appendChild(createCard(proj, true, openModal, i)));

    const timelineList = $("timelineList");
    data.timeline?.forEach((t, i) => timelineList.appendChild(createTimelineNode(t, i)));

    if (data.contact) {
        $("contactLines").innerHTML = `
            <strong>Email:</strong> <a href="mailto:${data.contact.email}" style="color:var(--accent1)">${data.contact.email}</a><br>
            <strong>Phone:</strong> ${data.contact.phone}<br>
            <strong>Location:</strong> ${data.contact.location}
        `;
    }

    $("themeToggle").addEventListener("click", toggleTheme);
    $("closeModalBtn").addEventListener("click", closeModal);
    $("modalBackdrop").addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

    // Initialize all the cool effects after DOM is built
    initVisualEffects();
}

document.addEventListener("DOMContentLoaded", init);
