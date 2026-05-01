// Animated particle mesh background
const c=document.getElementById('bg-canvas');
if(c){const x=c.getContext('2d');let P=[];const colors=['139,122,255','0,228,192','255,126,179','255,179,71'];
const resize=()=>{c.width=innerWidth;c.height=innerHeight};resize();addEventListener('resize',resize);
class Dot{constructor(){this.r()}r(){this.x=Math.random()*c.width;this.y=Math.random()*c.height;this.s=Math.random()*2.2+.6;this.dx=(Math.random()-.5)*.35;this.dy=(Math.random()-.5)*.35;this.o=Math.random()*.45+.15;this.c=colors[Math.floor(Math.random()*colors.length)]}u(){this.x+=this.dx;this.y+=this.dy;if(this.x<0||this.x>c.width||this.y<0||this.y>c.height)this.r()}d(){x.beginPath();x.arc(this.x,this.y,this.s,0,Math.PI*2);x.fillStyle=`rgba(${this.c},${this.o})`;x.fill()}}
for(let i=0;i<90;i++)P.push(new Dot());
!function a(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.u();p.d()});
for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);if(d<140){x.beginPath();x.strokeStyle=`rgba(139,122,255,${.08*(1-d/140)})`;x.lineWidth=.5;x.moveTo(P[i].x,P[i].y);x.lineTo(P[j].x,P[j].y);x.stroke()}}
requestAnimationFrame(a)}()}

// Navbar scroll
const nav=document.querySelector('.navbar');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>50));

// Mobile menu
const toggle=document.querySelector('.nav-toggle'),menu=document.querySelector('.nav-menu');
if(toggle)toggle.onclick=()=>menu.classList.toggle('active');
document.querySelectorAll('.nav-link').forEach(l=>l.onclick=()=>menu.classList.remove('active'));

// No scroll reveal - everything visible immediately

// Modals
function openModal(id){const m=document.getElementById(id);if(m){m.classList.add('active');document.body.style.overflow='hidden'}}
function closeModal(id){const m=document.getElementById(id);if(m){m.classList.remove('active');document.body.style.overflow=''}}

// Lightbox
function openLightbox(s){const l=document.getElementById('lightbox');document.getElementById('lightbox-img').src=s;l.classList.add('active');document.body.style.overflow='hidden'}
function closeLightbox(){document.getElementById('lightbox').classList.remove('active');document.body.style.overflow=''}
document.addEventListener('click',e=>{if(e.target.classList.contains('project-img')||e.target.classList.contains('modal-img')||e.target.classList.contains('modal-img--single')){e.stopPropagation();openLightbox(e.target.src)}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const l=document.getElementById('lightbox');if(l.classList.contains('active')){closeLightbox();return}document.querySelectorAll('.project-modal.active').forEach(m=>closeModal(m.id))}});

// Contact form
const form=document.getElementById('contactForm');
if(form)form.onsubmit=async e=>{e.preventDefault();const s=document.getElementById('form-status');try{const r=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(r.ok){s.textContent='✅ Сообщение отправлено!';s.style.color='#00e4c0';form.reset()}else{s.textContent='❌ Ошибка';s.style.color='#ff7eb3'}}catch{s.textContent='❌ Ошибка сети';s.style.color='#ff7eb3'}};
