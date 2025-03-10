import  { barba_setting } from './barba_setting.js';

export function enterAnimation(e) {
  return new Promise(resolve => {
    const elements = e.querySelectorAll("h1");
    gsap
      .from(e, {
      duration: barba_setting.page_transition_duration,
      //y: 100,
      opacity: 0,
      //clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%, 0% 100%)',
      ease: "power2.inOut",
    })
      .then(resolve());

  });
}