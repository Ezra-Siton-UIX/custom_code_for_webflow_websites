/* st-dots: slow drifting dots behind the header's content, the close ones joined by faint mint lines,
   like a network of systems; with a mouse, the network reaches for the pointer. One canvas, put into
   .st-section by this script. Off with reduced motion; it sleeps while the header is off screen. */
(() => {
  const section = document.querySelector('.st-section');
  if (!section || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'st-dots';
  canvas.setAttribute('aria-hidden', 'true');
  section.prepend(canvas);
  const ctx = canvas.getContext('2d');

  const MINT = '110, 243, 223';   // the ring's colour
  const LINK = 120;               // px: dots closer than this are joined
  const REACH = 170;              // px: dots this close to the pointer reach for it
  let dots = [];
  let width = 0;
  let height = 0;
  let pointer = null;
  let frame = 0;
  let running = false;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = section.clientWidth;
    height = section.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round((width * height) / 14000);   // more dots on a bigger header
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.6,
    }));
  };

  const line = (a, b, strength) => {
    ctx.strokeStyle = `rgba(${MINT}, ${strength})`;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    for (const dot of dots) {
      dot.x += dot.vx;
      dot.y += dot.vy;
      if (dot.x < 0 || dot.x > width) dot.vx *= -1;
      if (dot.y < 0 || dot.y > height) dot.vy *= -1;
    }
    for (let i = 0; i < dots.length; i += 1) {
      const a = dots[i];
      for (let j = i + 1; j < dots.length; j += 1) {
        const distance = Math.hypot(a.x - dots[j].x, a.y - dots[j].y);
        if (distance < LINK) line(a, dots[j], (1 - distance / LINK) * 0.25);
      }
      if (pointer) {
        const distance = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (distance < REACH) line(a, pointer, (1 - distance / REACH) * 0.45);
      }
      ctx.fillStyle = `rgba(${MINT}, 0.6)`;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fill();
    }
    frame = requestAnimationFrame(draw);
  };

  section.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const box = section.getBoundingClientRect();
    pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
  });
  section.addEventListener('pointerleave', () => { pointer = null; });

  new ResizeObserver(resize).observe(section);
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) { running = true; frame = requestAnimationFrame(draw); }
    else if (!entry.isIntersecting && running) { running = false; cancelAnimationFrame(frame); }
  }).observe(section);
})();
