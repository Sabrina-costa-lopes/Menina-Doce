document.addEventListener('DOMContentLoaded', () => {

  const frame = document.getElementById('baFrame');
  const after = document.getElementById('afterImg');
  const handle = document.getElementById('baHandle');

  // Se algum elemento não existir, evita quebrar o restante do JavaScript
  if (!frame || !after || !handle) {
    console.warn('Slider antes/depois não encontrado.');
    return;
  }

  let dragging = false;
  let demoInterval = null;
  let userInteracted = false;


  // ========================================
  // POSIÇÃO DO SLIDER
  // ========================================

  function setPosition(clientX) {

    const rect = frame.getBoundingClientRect();

    let percentage =
      ((clientX - rect.left) / rect.width) * 100;

    // Evita que o controle desapareça totalmente nas bordas
    percentage = Math.max(
      3,
      Math.min(97, percentage)
    );

    after.style.clipPath =
      `inset(0 0 0 ${percentage}%)`;

    handle.style.left =
      `${percentage}%`;
  }


  // ========================================
  // PARAR DEMONSTRAÇÃO AUTOMÁTICA
  // ========================================

  function stopDemo() {

    userInteracted = true;

    if (demoInterval) {
      clearInterval(demoInterval);
      demoInterval = null;
    }
  }


  // ========================================
  // COMEÇAR A ARRASTAR
  // ========================================

  frame.addEventListener('pointerdown', (event) => {

    dragging = true;

    stopDemo();

    frame.setPointerCapture?.(event.pointerId);

    setPosition(event.clientX);
  });


  // ========================================
  // MOVIMENTO
  // ========================================

  frame.addEventListener('pointermove', (event) => {

    if (!dragging) return;

    setPosition(event.clientX);
  });


  // ========================================
  // FINALIZAR ARRASTE
  // ========================================

  function stopDragging(event) {

    if (!dragging) return;

    dragging = false;

    if (
      event &&
      frame.hasPointerCapture?.(event.pointerId)
    ) {
      frame.releasePointerCapture(event.pointerId);
    }
  }

  frame.addEventListener(
    'pointerup',
    stopDragging
  );

  frame.addEventListener(
    'pointercancel',
    stopDragging
  );

  frame.addEventListener(
    'pointerleave',
    (event) => {

      if (
        event.buttons === 0
      ) {
        stopDragging(event);
      }

    }
  );


  // ========================================
  // CLIQUE DIRETO
  // ========================================

  frame.addEventListener('click', (event) => {

    stopDemo();

    setPosition(event.clientX);
  });


  // ========================================
  // DEMONSTRAÇÃO AUTOMÁTICA
  // ========================================

  let demoStep = 0;

  demoInterval = setInterval(() => {

    if (userInteracted) {
      stopDemo();
      return;
    }

    demoStep++;

    const percentage =
      50 + Math.sin(demoStep / 6) * 18;

    after.style.clipPath =
      `inset(0 0 0 ${percentage}%)`;

    handle.style.left =
      `${percentage}%`;

    if (demoStep > 40) {

      clearInterval(demoInterval);

      demoInterval = null;

      after.style.clipPath =
        'inset(0 0 0 50%)';

      handle.style.left =
        '50%';
    }

  }, 45);

});