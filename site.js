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

const thumbOf = (p) => p.thumb || `media/thumbs/${p.id}.jpg`;
const pad = (n) => String(n).padStart(2, "0");
// Seconds -> broadcast timecode HH:MM:SS:FF (30 fps)
const timecode = (s) => `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(Math.floor(s) % 60)}:${pad(Math.floor((s % 1) * 30))}`;

// One "channel" per style, in this order (label = the "label" in portfolio.js)
const STYLES = [
  { label: "Short-Form Ad", name: "Short-Form Ads", text: "Talking-head ads with strong hooks, captions and motion graphics." },
  { label: "UGC Edit", name: "UGC", text: "Creator-style product videos that feel native to TikTok and Reels." },
  { label: "AI UGC", name: "AI UGC", text: "Realistic AI creators presenting products." },
  { label: "AI Hook", name: "AI Hooks (No Talking Head)", text: "Scroll-stopping AI hooks without a talking head." },
  { label: "AI Pixar 3D", name: "AI Pixar-Style 3D", text: "Animated 3D characters that stay consistent from shot to shot." },
  { label: "Motion Graphics", name: "Motion Graphics", text: "Kinetic type and animated graphics for promos and Reels." },
  { label: "Thumbnail", name: "YouTube Thumbnails", text: "Bold, trending thumbnails built to get the click." },
  { label: "Static Ad", name: "Static Ads", text: "Clean, on-brand ad creatives for Facebook and Instagram." },
  { label: "Carousel", name: "IG Carousels", text: "Swipeable carousels that teach, build trust and sell." },
  { label: "Infographic", name: "Infographics", text: "Clear, colorful visuals that explain at a glance." },
  { label: "Illustration", name: "Digital Illustration", text: "Custom illustrated artwork and portraits." },
  { label: "AI Claymation", name: "AI Claymation", text: "A stop-motion clay look, made with AI." },
  { label: "AI Podcast", name: "AI Podcast", text: "Podcast-style AI clips with captions." },
];

let channel = 0;
STYLES.forEach((s) => {
  const works = PORTFOLIO.filter((p) => p.label === s.label);
  if (!works.length) return;
  channel++;
  const g = document.createElement("div");
  g.className = "group reveal";
  g.innerHTML =
    `<div class="group-head"><span class="group-num">CH ${pad(channel)}</span>` +
    `<div><h3>${s.name}</h3><p>${s.text}</p></div></div><div class="group-items"></div>`;
  const row = g.querySelector(".group-items");
  works.forEach((p) => {
    const el = document.createElement("button");
    el.className = "item " + (p.kind === "carousel" ? "image" : p.kind) + (p.ratio > 1.2 ? " wide" : "");
    el.innerHTML = `<img src="${thumbOf(p)}" alt="${p.title}" loading="lazy"><span class="play"></span>`;
    el.addEventListener("click", () => openItem(p));
    row.appendChild(el);
  });
  groups.appendChild(g);
});

// Lightbox: videos play from Google Drive, images show full size, carousels swipe through their slides
function openItem(p) {
  frame.style.setProperty("--r", p.ratio);
  if (p.kind === "video") {
    frame.innerHTML = `<iframe src="https://drive.google.com/file/d/${p.id}/preview" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  } else if (p.kind === "carousel") {
    frame.innerHTML =
      `<div class="slides">${p.slides.map((s, i) => `<img src="${s}" alt="${p.title} slide ${i + 1}">`).join("")}</div>` +
      `<button class="nav-btn prev" aria-label="Previous slide">‹</button><button class="nav-btn next" aria-label="Next slide">›</button>`;
    const strip = frame.querySelector(".slides");
    frame.querySelector(".prev").onclick = () => strip.scrollBy({ left: -strip.clientWidth, behavior: "smooth" });
    frame.querySelector(".next").onclick = () => strip.scrollBy({ left: strip.clientWidth, behavior: "smooth" });
  } else {
    frame.innerHTML = p.src
      ? `<img src="${p.src}" alt="${p.title}">`
      : `<img src="https://drive.google.com/thumbnail?id=${p.id}&sz=w2000" alt="${p.title}" onerror="this.src='media/thumbs/${p.id}.jpg'">`;
  }
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

// Running timecode on the hero TV, synced to the showreel
const reel = document.querySelector(".tv video");
const tc = document.getElementById("tc");
reel.addEventListener("timeupdate", () => { tc.textContent = timecode(reel.currentTime); });

// Edit Bay: a fake editing timeline. V1 holds real portfolio videos; scrubbing shows them on the monitor.
const TOTAL = 120; // seconds on the timeline
const v1 = PORTFOLIO.filter((p) => p.kind === "video").slice(0, 8);
const clipLen = TOTAL / v1.length;
const TRACKS = [
  { id: "v2", name: "V2", sub: "TITLES", clips: [[0, 9, "HOOK_TITLE"], [22, 14, "CAPTIONS_WBW"], [52, 12, "LOWER_3RD"], [80, 16, "CAPTIONS_WBW"], [108, 12, "END_CARD"]] },
  { id: "v1", name: "V1", sub: "MAIN" },
  { id: "a1", name: "A1", sub: "VO", wave: true, clips: [[2, 34, "VO_TAKE03.WAV"], [40, 36, "VO_TAKE05.WAV"], [80, 36, "VO_OUTRO.WAV"]] },
  { id: "a2", name: "A2", sub: "SFX", clips: [[0, 4, "WHOOSH"], [15, 4, "POP"], [30, 5, "RISER"], [45, 4, "WHOOSH"], [60, 4, "HIT"], [75, 5, "RISER"], [90, 4, "POP"], [105, 5, "WHOOSH"]] },
  { id: "a3", name: "A3", sub: "MUSIC", wave: true, clips: [[0, 120, "MUSIC_BED.WAV · GAIN -8DB"]] },
];
const tracksEl = document.getElementById("tracks");
const ruler = document.getElementById("ruler");
const playhead = document.getElementById("playhead");
const timeline = document.getElementById("timeline");
const bayImg = document.getElementById("bay-img");
const bayTc = document.getElementById("bay-tc");
const bayLabel = document.getElementById("bay-label");
const bayTitle = document.getElementById("bay-title");
const pct = (s) => `${(s / TOTAL) * 100}%`;

for (let s = 0; s <= TOTAL; s += 20) ruler.insertAdjacentHTML("beforeend", `<span style="left:${pct(s)}">${timecode(s).slice(3, 8)}</span>`);
TRACKS.forEach((t) => {
  const row = document.createElement("div");
  row.className = "trk";
  row.innerHTML = `<div class="trk-name"><b>${t.name}</b><em>${t.sub}</em></div>`;
  const clips = t.id === "v1" ? v1.map((p, i) => [i * clipLen, clipLen, p.title.toUpperCase().replace(/\s+/g, "_"), p]) : t.clips;
  clips.forEach(([start, len, name, p]) => {
    const c = document.createElement("div");
    c.className = `clip ${t.id}${t.wave ? " wave" : ""}`;
    c.style.left = pct(start);
    c.style.width = `calc(${pct(len)} - 2px)`;
    if (p) c.style.backgroundImage = `url(${thumbOf(p)})`;
    c.innerHTML = `<span>${name}</span>`;
    row.appendChild(c);
  });
  tracksEl.appendChild(row);
});
const v1Clips = tracksEl.querySelectorAll(".clip.v1");

let pos = 0;
let shown = -1;
function seek(s) {
  pos = (s + TOTAL) % TOTAL;
  const left = timeline.querySelector(".tracks").offsetLeft;
  playhead.style.left = `calc(${left}px + ${(pos / TOTAL).toFixed(5)} *(100% - ${left}px))`;
  bayTc.textContent = timecode(pos);
  const i = Math.min(v1.length - 1, Math.floor(pos / clipLen));
  if (i !== shown) {
    shown = i;
    bayImg.src = thumbOf(v1[i]);
    bayLabel.textContent = v1[i].label;
    bayTitle.textContent = v1[i].title;
    v1Clips.forEach((c, k) => c.classList.toggle("on", k === i));
  }
}
function scrubTo(e) {
  const r = tracksEl.getBoundingClientRect();
  seek(Math.max(0, Math.min(0.999, (e.clientX - r.left) / r.width)) * TOTAL);
}
let dragging = false;
let idleUntil = 0;
timeline.addEventListener("pointerdown", (e) => { dragging = true; timeline.setPointerCapture(e.pointerId); scrubTo(e); });
timeline.addEventListener("pointermove", (e) => {
  if (dragging || e.pointerType === "mouse") { scrubTo(e); idleUntil = performance.now() + 2500; }
});
addEventListener("pointerup", () => { dragging = false; idleUntil = performance.now() + 2500; });

// The playhead plays on its own while the Edit Bay is on screen and nobody is scrubbing
let bayVisible = false;
new IntersectionObserver(([e]) => { bayVisible = e.isIntersecting; }).observe(timeline);
let last = performance.now();
function tick(now) {
  const dt = (now - last) / 1000;
  last = now;
  if (bayVisible && !dragging && now > idleUntil) seek(pos + dt * 6);
  requestAnimationFrame(tick);
}
seek(0);
requestAnimationFrame(tick);

// Nav background on scroll, and the current channel lit up
const nav = document.querySelector(".nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 30), { passive: true });
const chLinks = [...document.querySelectorAll(".nav .ch")];
const chIo = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) chLinks.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === `#${e.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
chLinks.forEach((a) => chIo.observe(document.querySelector(a.getAttribute("href"))));

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
