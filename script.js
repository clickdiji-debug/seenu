const menu=document.querySelector('.menu');
const nav=document.querySelector('.nav nav');
if(menu && nav){
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('mobile-open');
    menu.setAttribute('aria-expanded',open?'true':'false');
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('mobile-open')));
}
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity=1;
      e.target.style.transform='translateY(0)';
      observer.unobserve(e.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.services article,.case,.steps article,.timeline article,.stats-grid article,.cert-card,.seo-grid article').forEach(el=>{
  el.style.opacity=0;
  el.style.transform='translateY(18px)';
  el.style.transition='opacity .6s ease,transform .6s ease';
  observer.observe(el);
});

// ===== 2026 REBUILD additions: animated counters, reveal for new sections, lead form =====
document.querySelectorAll('.founder-grid article,.faq-list details,.founder-strip').forEach(el=>{
  el.style.opacity=0;
  el.style.transform='translateY(18px)';
  el.style.transition='opacity .6s ease,transform .6s ease';
  observer.observe(el);
});
function animateCount(el){
  const target=parseFloat(el.dataset.count);
  const decimals=parseInt(el.dataset.decimals||'0',10);
  const prefix=el.dataset.prefix||'';
  const suffix=el.dataset.suffix||'';
  const dur=1600; const start=performance.now();
  function tick(now){
    const t=Math.min((now-start)/dur,1);
    const eased=1-Math.pow(1-t,3);
    const val=target*eased;
    el.textContent=prefix+val.toLocaleString('en-IN',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})+suffix;
    if(t<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ animateCount(e.target); countObserver.unobserve(e.target); }
  });
},{threshold:.4});
document.querySelectorAll('[data-count]').forEach(el=>countObserver.observe(el));
const leadForm=document.getElementById('lead-form');
if(leadForm){
  leadForm.addEventListener('submit',ev=>{
    ev.preventDefault();
    const name=document.getElementById('lead-name').value.trim();
    const phone=document.getElementById('lead-phone').value.trim();
    const msg=document.getElementById('lead-msg').value.trim();
    const text='Hi Srinivas, I am '+name+' ('+phone+'). '+msg;
    window.open('https://wa.me/919492727646?text='+encodeURIComponent(text),'_blank');
  });
}

// ===== V3 additions: word rotator, scroll progress, animated bars, card tilt =====
(function(){
  const rot=document.getElementById('rotator');
  if(rot){
    const words=['customers.','leads.','revenue.','growth.'];
    let wi=0;
    setInterval(()=>{
      rot.classList.add('swap');
      setTimeout(()=>{ wi=(wi+1)%words.length; rot.textContent=words[wi]; rot.classList.remove('swap'); },200);
    },2400);
  }
  const prog=document.getElementById('scrollProgress');
  if(prog){
    addEventListener('scroll',()=>{
      const h=document.documentElement;
      const max=h.scrollHeight-h.clientHeight;
      prog.style.width=(max>0?(h.scrollTop/max)*100:0)+'%';
    },{passive:true});
  }
  const barObserver=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.style.width=e.target.dataset.bar+'%'; barObserver.unobserve(e.target); }
    });
  },{threshold:.35});
  document.querySelectorAll('[data-bar]').forEach(el=>barObserver.observe(el));
  if(matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.case,.founder-grid article').forEach(card=>{
      card.addEventListener('mousemove',ev=>{
        const r=card.getBoundingClientRect();
        const x=(ev.clientX-r.left)/r.width-.5, y=(ev.clientY-r.top)/r.height-.5;
        card.style.transform='perspective(900px) rotateX('+(-y*4)+'deg) rotateY('+(x*4)+'deg) translateY(-3px)';
      });
      card.addEventListener('mouseleave',()=>{ card.style.transform=''; });
    });
  }
})();

// ===== V4: photo card parallax tilt =====
(function(){
  const card=document.getElementById('photoCard');
  const visual=document.querySelector('.hero-visual');
  if(card && visual && matchMedia('(pointer:fine)').matches){
    visual.addEventListener('mousemove',ev=>{
      const r=visual.getBoundingClientRect();
      const x=(ev.clientX-r.left)/r.width-.5, y=(ev.clientY-r.top)/r.height-.5;
      card.style.transform='translate(-50%,-50%) perspective(1000px) rotateX('+(-y*6)+'deg) rotateY('+(x*6)+'deg)';
    });
    visual.addEventListener('mouseleave',()=>{ card.style.transform='translate(-50%,-50%)'; });
  }
})();
