// Pinterest clone - feed gerado dinamicamente
const titles = [
  "Midnight plum aesthetic","Winter portrait","Save for grades","Anime collage",
  "Pink gothic","Academic tears","Floral skeleton","Cottagecore vibes",
  "Dark academia","Y2K fashion","Coquette style","Soft girl",
  "Old money","Cyber girl","Pastel dream","Retro film",
  "Minimal desk","Cute stickers","Street style","Forest walk",
  "Café aesthetic","Vintage book","Rainy window","Night city"
];

const heights = [220,280,340,260,400,300,240,360,420,260,300,380,240,320,360,280,400,260,340,300,380,260,320,400];

const colors = ["b794c4","f4a8b6","8b8589","e0c097","a8b5a0","d4a574","9bb3d4","c9a7c4","e8b4a0","8a9ba8","d8b4a0","b8a4c9","f0c4a4","a8a4b8","e4b4c4","b4c4d4"];

const feed = document.getElementById("masonry");

function makePin(i){
  const h = heights[i % heights.length];
  const w = 300;
  const c = colors[i % colors.length];
  const seed = i+10;
  const useColor = i % 3 === 0;
  const src = useColor
    ? `https://placehold.co/${w}x${h}/${c}/fff?text=${encodeURIComponent(titles[i%titles.length])}`
    : `https://picsum.photos/seed/pin${seed}/${w}/${h}`;

  const el = document.createElement("div");
  el.className = "pin-card";
  el.innerHTML = `
    <img src="${src}" alt="${titles[i%titles.length]}" loading="lazy" />
    <button class="save-btn">Guardar</button>
    <div class="pin-actions">
      <button title="Compartir"><i class="fas fa-arrow-up-from-bracket"></i></button>
      <button title="Más"><i class="fas fa-ellipsis"></i></button>
    </div>
  `;
  return el;
}

function loadPins(n=30){
  const frag = document.createDocumentFragment();
  const start = feed.children.length;
  for(let i=start;i<start+n;i++) frag.appendChild(makePin(i));
  feed.appendChild(frag);
}

loadPins(40);

// Infinite scroll
window.addEventListener("scroll", () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 600){
    loadPins(20);
  }
});

// Tabs
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Sidebar active
document.querySelectorAll(".sidebar-icon").forEach(icon => {
  icon.addEventListener("click", e => {
    if(icon.hasAttribute("data-bs-toggle")) return;
    e.preventDefault();
    document.querySelectorAll(".sidebar-icon").forEach(i => i.classList.remove("active"));
    icon.classList.add("active");
  });
});
