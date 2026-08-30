const frame = document.getElementById('baFrame');
  const after = document.getElementById('afterImg');
  const handle = document.getElementById('baHandle');
  let dragging = false;

  function setPos(clientX){
    const rect = frame.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(4, Math.min(96, pct));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = pct + '%';
  }

  handle.addEventListener('pointerdown', (e)=>{ dragging = true; handle.setPointerCapture(e.pointerId); });
  window.addEventListener('pointerup', ()=> dragging = false);
  window.addEventListener('pointermove', (e)=>{ if(dragging) setPos(e.clientX); });
  frame.addEventListener('click', (e)=> setPos(e.clientX));

  // gentle auto-demo on load: sweep once to hint interactivity
  let demoStep = 0;
  const demo = setInterval(()=>{
    demoStep++;
    const pct = 50 + Math.sin(demoStep/6) * 18;
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = pct + '%';
    if(demoStep > 40){ clearInterval(demo); after.style.clipPath='inset(0 0 0 50%)'; handle.style.left='50%'; }
  }, 45);