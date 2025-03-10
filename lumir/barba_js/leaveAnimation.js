import  { barba_setting } from './barba_setting.js';

export function leaveAnimation(e) {
  return new Promise(async resolve => {
    const elements = e.querySelectorAll("h1");
    await gsap
      .to(e, {
      duration: barba_setting.page_transition_duration,
      //y: 100,
      opacity: 0,
      delay: 0.5,
      ease: "power2.inOut",
      stagger: 0.3
    })
      .then();
    resolve()
  });
}
