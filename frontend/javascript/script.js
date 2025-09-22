const typeEl = document.getElementById('typewriter');
const words = ["Recommendation Engine","Internship Matcher","Career Accelerator"];
let wIdx = 0, chIdx = 0, forward = true;
function tick(){
  const word = words[wIdx];
  if(forward){
    chIdx++;
    if(chIdx>word.length){ forward=false; setTimeout(tick,900); return; }
  } else {
    chIdx--;
    if(chIdx===0){ forward=true; wIdx=(wIdx+1)%words.length; setTimeout(tick,180); return; }
  }
  typeEl.textContent = word.slice(0,chIdx);
  setTimeout(tick, forward?80:40);
}
tick();
let countersRun=false;
const nums = document.querySelectorAll('.num');
const obs = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && !countersRun){
      countersRun=true;
      nums.forEach(n=>{
        const target = +n.dataset.target;
        const duration = 1700;
        const start = performance.now();
        const step = (ts)=>{
          const p = Math.min((ts-start)/duration,1);
          n.textContent = Math.floor(p*target).toLocaleString();
          if(p<1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }
  });
},{threshold:0.35});
nums.forEach(n=>obs.observe(n));

/* =========================
   Testimonial slider
   ========================= */
const track = document.getElementById('testiTrack');
const total = track.children.length;
let cur = 0;
const prevBtn = document.getElementById('prevTest');
const nextBtn = document.getElementById('nextTest');
const counter = document.getElementById('testCounter');

function updateTest(){
  track.style.transform = `translateX(-${cur * (100/total)}%)`;
  counter.textContent = `${cur+1} / ${total}`;
}
prevBtn.addEventListener('click', ()=>{ cur = (cur-1+total)%total; updateTest(); });
nextBtn.addEventListener('click', ()=>{ cur = (cur+1)%total; updateTest(); });
let autoTest = setInterval(()=>{ cur=(cur+1)%total; updateTest(); }, 4500);
['mouseenter','focusin'].forEach(ev=>{ track.addEventListener(ev, ()=>clearInterval(autoTest))});
['mouseleave','focusout'].forEach(ev=>{ track.addEventListener(ev, ()=>autoTest = setInterval(()=>{ cur=(cur+1)%total; updateTest(); }, 4500))});

/* =========================
   Steps SVG connections (draw-on-scroll)
   ========================= */
function drawConnections(){
  const svg = document.querySelector('svg.connection');
  if(!svg) return;
  // remove old
  while(svg.firstChild) svg.removeChild(svg.firstChild);
  const boxes = Array.from(document.querySelectorAll('.step-box'));
  // compute midpoints in svg coords
  const rect = svg.getBoundingClientRect();
  boxes.forEach((b,i)=>{
    if(i===boxes.length-1) return;
    const a = boxes[i].getBoundingClientRect();
    const c = boxes[i+1].getBoundingClientRect();
    const x1 = a.left + a.width/2 - rect.left;
    const y1 = a.top + a.height/2 - rect.top;
    const x2 = c.left + c.width/2 - rect.left;
    const y2 = c.top + c.height/2 - rect.top;
    // control points for a nice curve
    const dx = (x2-x1)*0.5;
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    const d = `M ${x1},${y1} C ${x1+dx},${y1-40} ${x2-dx},${y2+40} ${x2},${y2}`;
    path.setAttribute('d', d);
    path.setAttribute('stroke', '#7a9cff66');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill','none');
    path.setAttribute('stroke-linecap','round');
    path.setAttribute('marker-end','url(#arr)');
    // dash animation
    path.style.strokeDasharray = path.getTotalLength();
    path.style.strokeDashoffset = path.getTotalLength();
    path.style.transition = 'stroke-dashoffset 1.3s ease-in-out';
    svg.appendChild(path);
    setTimeout(()=>{ path.style.strokeDashoffset = '0'; }, 220*i);
  });
}
const stepsObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) drawConnections();
  });
},{threshold:0.3});
stepsObs.observe(document.querySelector('.steps-wrap'));

/* =========================
   Resize handler to redraw connections
   ========================= */
let resizeTO;
window.addEventListener('resize', ()=>{
  clearTimeout(resizeTO);
  resizeTO = setTimeout(()=>drawConnections(), 300);
});

/* =========================
   Modal handlers
   ========================= */
function openModal(){ document.getElementById('modal').style.display='grid'; }
function closeModal(){ document.getElementById('modal').style.display='none'; }

/* =========================
   Light accessibility tweaks
   ========================= */
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('keydown', (e)=>{ if(e.key==='Enter') el.click(); });
});

/* =========================
   Smooth scroll for nav
   ========================= */
/* =========================
   Smooth scroll for nav (only for # links)
   ========================= */
document.querySelectorAll('nav.links a').forEach(a=>{
  a.addEventListener('click', (ev)=>{
    const href = a.getAttribute('href');
    if(href.startsWith('#')) {  // only for same-page anchors
      ev.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});


/* =========================
   SVG initial draw once images load
   ========================= */
window.addEventListener('load', ()=>{ setTimeout(drawConnections, 480); });