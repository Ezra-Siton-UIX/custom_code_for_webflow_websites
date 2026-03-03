import { gsap_setting } from './gsap_setting.js';


export function card_bg_image_animation() {
  
  gsap.set("[card_bg_image]", { 
    opacity: 0.8, 
  });

  ScrollTrigger.batch("[card_bg_image]", {
    interval: 0, // time window (in seconds) for batching to occur.
    batchMax: 3, // maximum batch size (targets)

    onEnter: batch => gsap.to(batch, {
      duration: 0.25,
      ease: gsap_setting.easing_type,
      scale: 1,
      autoAlpha: 1,
      opacity: 1,
      stagger: { each: gsap_setting.stagger_duration }, 
      overwrite: true,
      clearProps: true,
      scrollTrigger: {
        start: "top center",
        end: "bottom center"
      }
    }),

    // אם תרצה תוכל להחזיר קוד לאירועים נוספים:
    // onLeave: batch => gsap.set(batch, { opacity: 0 }),
    // onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    // onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),

  });

}
