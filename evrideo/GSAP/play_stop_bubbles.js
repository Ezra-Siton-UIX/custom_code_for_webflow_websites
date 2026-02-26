export function play_stop_bubbles() {
  /* ===========================================================
     🌈⚡ VIEWPORT ANIMATIONS WITH RESPONSIVE BLUR ⚡🌈
  =========================================================== */

  // 🎯 Breakpoint
  const isSmallScreen = window.matchMedia('(max-width: 1280px)').matches;

  // Blur רספונסיבי
  const BLUR_VALUE = isSmallScreen ? '0px' : '0px';

  const animatedElements = document.querySelectorAll(
    '[animation_type="anim_slow"], [animation_type="anim_medium"], [animation_type="anim_fast"], [animation_type="anim_pulse"], [animation_type="anim_h_scroll"], [animation_type="anim_move_left"], [animation_type="anim_move_right"]'
  );

  animatedElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    el.style.filter = 'none';
    el.style.transition = 'none';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.style.filter = `blur(${BLUR_VALUE})`;

        const delay = entry.target.getAttribute('animation_delay');
        if (delay) entry.target.style.animationDelay = `-${delay}`;

        const opacity = entry.target.getAttribute('animation_opacity');
        if (opacity) entry.target.style.opacity = opacity;

      } else {
        entry.target.style.animationPlayState = 'paused';
        entry.target.style.filter = 'none';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '100px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}
