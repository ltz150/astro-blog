let dispose = () => {};
export default function initArticleToc() {
  dispose();
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.toc-nav a[data-heading]')];
  const headings = [...new Set(links.map(a => document.getElementById(a.dataset.heading!)).filter((h): h is HTMLElement => !!h))];
  if (!headings.length) { dispose = () => {}; return; }
  let frame = 0;
  const update = () => {
    frame = 0;
    let current = headings[0];
    for (const h of headings) {if(h.getBoundingClientRect().top <= 120) current=h; else break;}
    for (const a of links) {
      if (a.dataset.heading === current.id) a.setAttribute('aria-current','location');
      else a.removeAttribute('aria-current');
    }
  };
  const onScroll = () => { if (!frame) frame=requestAnimationFrame(update); };
  const onClick = (event: MouseEvent) => {
    const link=(event.target as Element).closest<HTMLAnchorElement>('.toc-nav a[data-heading]');
    if(!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const heading=document.getElementById(link.dataset.heading!);
    if(!heading) return;
    event.preventDefault();
    history.replaceState(history.state,'',link.getAttribute('href')!);
    const top=heading.getBoundingClientRect().top+window.scrollY-96;
    window.scrollTo({top:Math.max(0,top),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  };
  document.addEventListener('click',onClick);
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  update();
  dispose=()=>{cancelAnimationFrame(frame); document.removeEventListener('click',onClick); window.removeEventListener('scroll',onScroll); window.removeEventListener('resize',onScroll);};
}
