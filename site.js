// Put your LinkedIn link here (example: "https://www.linkedin.com/in/christiansorio") and it shows up in Contact.
const LINKEDIN = "";

const groups = document.getElementById("groups");
const lightbox = document.getElementById("lightbox");
const frame = document.getElementById("frame");
const caption = document.getElementById("caption");

document.getElementById("year").textContent = new Date().getFullYear();
if (LINKEDIN) {
  const a = document.getElementById("linkedin");
  a.href = LINKEDIN;
  a.hidden = false;
}

// One separate group per style, in this order (label = the "label" in portfolio.js)
const STYLES = [
  { label: "Short-Form Ad", name: "Short-Form Ads", text: "Talking-head ads with strong hooks, captions and motion graphics." },
  { label: "UGC Edit", name: "UGC", text: "Creator-style product videos that feel native to TikTok and Reels." },
  { label: "AI UGC", name: "AI UGC", text: "Realistic AI creators presenting products." },
  { label: "AI Hook", name: "AI Hooks (No Talking Head)", text: "Scroll-stopping AI hooks without a talking head." },
  { label: "AI Pixar 3D", name: "AI Pixar-Style 3D", text: "Animated 3D characters that stay consistent from shot to shot." },
  { label: "Motion Graphics", name: "Motion Graphics", text: "Kinetic type and animated graphics for promos and Reels." },
  { label: "Infographic", name: "Infographics", text: "Clear, colorful visuals that explain at a glance." },
  { label: "Illustration", name: "Digital Illustration", text: "Custom illustrated artwork and portraits." },
  { label: "AI Claymation", name: "AI Claymation", text: "A stop-motion clay look, made with AI." },
  { label: "AI Podcast", name: "AI Podcast", text: "Podcast-style AI clips with captions." },
];

STYLES.forEach((s, i) => {
  const works = PORTFOLIO.filter((p) => p.label === s.label);
  if (!works.length) return;
  const g = document.createElement("div");
  g.className = "group reveal";
  g.innerHTML =
    `<div class="group-head"><span class="group-num">${String(i + 1).padStart(2, "0")}</span>` +
    `<div><h3>${s.name}</h3><p>${s.text}</p></div></div><div class="group-items"></div>`;
  const row = g.querySelector(".group-items");
  works.forEach((p) => {
    const el = document.createElement("button");
    el.className = "item " + p.kind;
    el.innerHTML =
      `<img src="media/thumbs/${p.id}.jpg" alt="${p.title}" loading="lazy">` +
      `<span class="play"></span>`;
    el.addEventListener("click", () => openItem(p));
    row.appendChild(el);
  });
  groups.appendChild(g);
});

// Lightbox: videos play from Google Drive, images show full size
function openItem(p) {
  frame.style.setProperty("--r", p.ratio);
  frame.innerHTML =
    p.kind === "video"
      ? `<iframe src="https://drive.google.com/file/d/${p.id}/preview" allow="autoplay; fullscreen" allowfullscreen></iframe>`
      : `<img src="https://drive.google.com/thumbnail?id=${p.id}&sz=w2000" alt="${p.title}" onerror="this.src='media/thumbs/${p.id}.jpg'">`;
  caption.textContent = p.title;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeItem() {
  lightbox.classList.remove("open");
  frame.innerHTML = "";
  document.body.style.overflow = "";
}
lightbox.querySelector(".close").addEventListener("click", closeItem);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeItem(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeItem(); });

// Nav background on scroll
const nav = document.querySelector(".nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 30), { passive: true });

// Fade things in as they scroll into view
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
