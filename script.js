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
