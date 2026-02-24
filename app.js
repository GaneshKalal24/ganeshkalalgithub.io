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

/* Theme toggle */
function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefersLight ? "light" : "dark";
}

function updateToggleLabel(theme) {
  const btn = $("themeToggle");
  if (!btn) return;
  btn.textContent = theme === "light" ? "Dark mode" : "Light mode";
}

function initThemeToggle() {
  let theme = getInitialTheme();
  applyTheme(theme);
  updateToggleLabel(theme);

  const btn = $("themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    theme = (theme === "light") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    applyTheme(theme);
    updateToggleLabel(theme);
  });
}

/* Mobile hamburger menu */
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

  // Close when clicking a link
  document.querySelectorAll(".mobile-link").forEach(a => {
    a.addEventListener("click", () => setMenu(false));
  });

  // Close when switching to desktop
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

    // Links desktop + mobile
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

    // Pills
    const pillRow = $("pillRow");
    pillRow.innerHTML = "";
    (data.pills || []).forEach(p => pillRow.appendChild(createPill(p)));

    // Stats
    const stats = $("stats");
    stats.innerHTML = "";
    (data.stats || []).forEach(s => stats.appendChild(createStat(s.label, s.value)));

    // About lists
    renderSimpleList("knownFor", data.knownFor);
    renderSimpleList("tools", data.tools);

    // Bento
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

    // Projects
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

    // Timeline
    const tl = $("timelineList");
    tl.innerHTML = "";
    (data.timeline || []).forEach(t => tl.appendChild(createTimelineItem(t)));

    // Contact
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

    // Modal close
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
