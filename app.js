async function loadContent() {
  const res = await fetch("./content.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Unable to load content.json");
  return await res.json();
}

function $(id){ return document.getElementById(id); }

function setText(id, value){
  const el = $(id);
  if (el) el.textContent = value ?? "";
}

function setLink(id, href){
  const el = $(id);
  if (!el) return;
  if (!href) { el.style.display = "none"; return; }
  el.href = href;
}

function setImage(id, src){
  const el = $(id);
  if (!el) return;
  if (!src) { el.style.display = "none"; return; }
  el.src = src;
}

function createPill(text){
  const s = document.createElement("span");
  s.className = "pill";
  s.textContent = text;
  return s;
}

function createStat(label, value){
  const d = document.createElement("div");
  d.className = "stat";
  const strong = document.createElement("strong");
  strong.textContent = value;
  const span = document.createElement("span");
  span.textContent = label;
  d.appendChild(strong);
  d.appendChild(span);
  return d;
}

function createBentoCard(item, onClick){
  const card = document.createElement("div");
  card.className = "card bento-card";
  card.tabIndex = 0;

  const top = document.createElement("div");
  top.className = "bento-top";

  const title = document.createElement("div");
  title.className = "bento-title";
  title.textContent = item.title;

  const meta = document.createElement("div");
  meta.className = "bento-meta";
  meta.textContent = item.meta || "Details";

  top.appendChild(title);
  top.appendChild(meta);

  const text = document.createElement("div");
  text.className = "bento-text";
  text.textContent = item.preview || "";

  card.appendChild(top);
  card.appendChild(text);

  const open = () => onClick(item);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => { if (e.key === "Enter") open(); });

  return card;
}

function createProjectCard(p, onClick){
  const card = document.createElement("div");
  card.className = "card project-card";
  card.tabIndex = 0;

  const top = document.createElement("div");
  top.className = "bento-top";

  const title = document.createElement("div");
  title.className = "bento-title";
  title.textContent = p.title;

  const meta = document.createElement("div");
  meta.className = "bento-meta";
  meta.textContent = p.meta || "";

  top.appendChild(title);
  top.appendChild(meta);

  const text = document.createElement("div");
  text.className = "bento-text";
  text.textContent = p.preview || "";

  const tags = document.createElement("div");
  tags.className = "project-tags";
  (p.tags || []).forEach(t => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = t;
    tags.appendChild(tag);
  });

  card.appendChild(top);
  card.appendChild(text);
  if ((p.tags || []).length) card.appendChild(tags);

  const open = () => onClick(p);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => { if (e.key === "Enter") open(); });

  return card;
}

function createTimelineItem(t){
  const card = document.createElement("div");
  card.className = "card time-item";

  const row = document.createElement("div");
  row.className = "row";

  const role = document.createElement("div");
  role.className = "role";
  role.textContent = t.roleCompany;

  const when = document.createElement("div");
  when.className = "when";
  when.textContent = t.dates;

  row.appendChild(role);
  row.appendChild(when);

  const where = document.createElement("div");
  where.className = "where";
  where.textContent = t.location || "";

  const ul = document.createElement("ul");
  (t.bullets || []).forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    ul.appendChild(li);
  });

  card.appendChild(row);
  if (t.location) card.appendChild(where);
  if ((t.bullets || []).length) card.appendChild(ul);

  return card;
}

function openModal({ kicker, title, text, bullets }){
  const modal = $("modal");
  $("modalKicker").textContent = kicker || "";
  $("modalTitle").textContent = title || "";
  $("modalText").textContent = text || "";

  const ul = $("modalList");
  ul.innerHTML = "";
  (bullets || []).forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    ul.appendChild(li);
  });

  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  const modal = $("modal");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderSimpleList(id, items){
  const el = $(id);
  if (!el) return;
  el.innerHTML = "";
  (items || []).forEach(x => {
    const li = document.createElement("li");
    li.textContent = x;
    el.appendChild(li);
  });
}

/* Theme icons */
const ICON_AUTO = `
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M7 2h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7Zm1 14h8v2H8v-2Z"/>
</svg>`;

const ICON_LIGHT = `
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM11 2h2v3h-2V2Zm0 17h2v3h-2v-3ZM2 11h3v2H2v-2Zm17 0h3v2h-3v-2ZM4.22 5.64l1.41-1.41 2.12 2.12-1.41 1.41-2.12-2.12Zm12.03 12.03 1.41-1.41 2.12 2.12-1.41 1.41-2.12-2.12ZM18.36 4.22l1.41 1.41-2.12 2.12-1.41-1.41 2.12-2.12ZM5.64 18.36l1.41 1.41-2.12 2.12-1.41-1.41 2.12-2.12Z"/>
</svg>`;

const ICON_DARK = `
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M21 14.6A8.5 8.5 0 0 1 9.4 3a7 7 0 1 0 11.6 11.6ZM12 20a8 8 0 0 0 7.74-6.02 9 9 0 1 1-9.72-9.72A8 8 0 0 0 12 20Z"/>
</svg>`;

/* Theme: Auto / Light / Dark */
function systemTheme(){
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefersLight ? "light" : "dark";
}

function applyTheme(mode){
  const theme = mode === "auto" ? systemTheme() : mode;
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

function getThemeMode(){
  const saved = localStorage.getItem("themeMode");
  if (saved === "light" || saved === "dark" || saved === "auto") return saved;
  return "auto";
}

function cycleMode(mode){
  if (mode === "auto") return "light";
  if (mode === "light") return "dark";
  return "auto";
}

function modeIcon(mode){
  if (mode === "auto") return ICON_AUTO;
  if (mode === "light") return ICON_LIGHT;
  return ICON_DARK;
}

function updateThemeIcons(mode){
  const m = $("themeIconMobile");
  const d = $("themeIconDesktop");
  const icon = modeIcon(mode);
  if (m) m.innerHTML = icon;
  if (d) d.innerHTML = icon;

  // update aria labels so it is accessible
  const b1 = $("themeToggle");
  const b2 = $("themeToggleDesktop");
  const label = mode === "auto" ? "Theme Auto" : (mode === "light" ? "Theme Light" : "Theme Dark");
  if (b1) b1.setAttribute("aria-label", label);
  if (b2) b2.setAttribute("aria-label", label);
}

function setThemeMode(mode){
  localStorage.setItem("themeMode", mode);
  applyTheme(mode);
  updateThemeIcons(mode);
}

function initThemeToggle(){
  let mode = getThemeMode();
  applyTheme(mode);
  updateThemeIcons(mode);

  const handler = () => {
    mode = cycleMode(mode);
    setThemeMode(mode);
  };

  const b1 = $("themeToggle");
  const b2 = $("themeToggleDesktop");
  if (b1) b1.addEventListener("click", handler);
  if (b2) b2.addEventListener("click", handler);

  // live update if user chose auto
  if (window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    mq.addEventListener?.("change", () => {
      const current = getThemeMode();
      if (current === "auto") {
        applyTheme("auto");
        updateThemeIcons("auto");
      }
    });
  }
}

/* Mobile menu */
function setMenu(open){
  const menu = $("mobileMenu");
  const btn = $("navToggle");
  if (!menu || !btn) return;

  if (open) {
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
  } else {
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
  }
}

function initMobileMenu(){
  const btn = $("navToggle");
  const menu = $("mobileMenu");
  if (!btn || !menu) return;

  setMenu(false);

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    setMenu(!isOpen);
  });

  document.querySelectorAll(".mobile-link").forEach(a => {
    a.addEventListener("click", () => setMenu(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) setMenu(false);
  });
}

(async function init(){
  try{
    initThemeToggle();
    initMobileMenu();

    const data = await loadContent();

    setText("name", data.name);
    setText("portraitName", data.name);
    setText("tagline", data.tagline);
    setText("portraitRole", data.role);
    setText("kicker", data.kicker);
    setText("heroTitle", data.heroTitle);
    setText("heroSubtitle", data.heroSubtitle);
    setText("aboutLead", data.aboutLead);
    setText("aboutStory", data.aboutStory);
    setText("signatureLine", data.signatureLine);

    setImage("profilePhoto", data.profilePhotoUrl || "./profile.png");

    setLink("linkedinLink", data.contact?.linkedin || null);
    setLink("mobileLinkedinLink", data.contact?.linkedin || null);
    setLink("contactLinkedinBtn", data.contact?.linkedin || null);

    if (data.contact?.email){
      setLink("emailLink", `mailto:${data.contact.email}`);
      setLink("mobileEmailLink", `mailto:${data.contact.email}`);
      setLink("contactEmailBtn", `mailto:${data.contact.email}`);
    } else {
      setLink("emailLink", null);
      setLink("mobileEmailLink", null);
      setLink("contactEmailBtn", null);
    }

    setLink("downloadCvLink", data.downloadCvUrl || null);

    const pillRow = $("pillRow");
    pillRow.innerHTML = "";
    (data.pills || []).forEach(p => pillRow.appendChild(createPill(p)));

    const stats = $("stats");
    stats.innerHTML = "";
    (data.stats || []).forEach(s => stats.appendChild(createStat(s.label, s.value)));

    renderSimpleList("knownFor", data.knownFor);
    renderSimpleList("tools", data.tools);

    const bento = $("bentoGrid");
    bento.innerHTML = "";
    (data.bento || []).forEach(item => {
      bento.appendChild(createBentoCard(item, (x) => {
        openModal({
          kicker: "Explore",
          title: x.title,
          text: x.fullText || x.preview || "",
          bullets: x.bullets || []
        });
      }));
    });

    const projects = $("projectsGrid");
    projects.innerHTML = "";
    (data.projects || []).forEach(p => {
      projects.appendChild(createProjectCard(p, (x) => {
        openModal({
          kicker: x.meta || "Project",
          title: x.title,
          text: x.fullText || x.preview || "",
          bullets: x.bullets || []
        });
      }));
    });

    const tl = $("timelineList");
    tl.innerHTML = "";
    (data.timeline || []).forEach(t => tl.appendChild(createTimelineItem(t)));

    const c = $("contactLines");
    c.innerHTML = "";
    const lines = [
      data.contact?.location ? `Location ${data.contact.location}` : null,
      data.contact?.phone ? `Phone ${data.contact.phone}` : null,
      data.contact?.email ? `Email ${data.contact.email}` : null
    ].filter(Boolean);

    lines.forEach(line => {
      const d = document.createElement("div");
      d.textContent = line;
      c.appendChild(d);
    });

    const year = new Date().getFullYear();
    setText("footerText", `Copyright ${year} ${data.name}. Hosted on GitHub Pages.`);

    document.querySelectorAll("[data-close='1']").forEach(el => el.addEventListener("click", closeModal));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  } catch (e){
    console.error(e);
    document.body.innerHTML = `
      <div style="max-width:900px;margin:40px auto;padding:16px;color:#111;font-family:system-ui">
        <h2>Site error</h2>
        <p>Could not load <code>content.json</code>. Make sure it is in the same folder as <code>index.html</code>.</p>
      </div>`;
  }
})();
