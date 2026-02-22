import  { gsap_setting } from './gsap_setting.js';

export function trigger_box_animation() {

  gsap.set("[trigger_box]", { y: 32, autoAlpha:0 });

  // עידכון ה-ScrollTrigger על מנת שיתחשב במצב הנוכחי
  ScrollTrigger.refresh();  

  ScrollTrigger.batch("[trigger_box]", {
    interval: 0.25,
    batchMax: 10,
    onEnter: batch => {
      gsap.to(batch, {
        duration: gsap_setting.reveal_duration * 1.1,
        autoAlpha: 1,
        y: 0,
        delay: 0.0,
        ease: gsap_setting.easing_type,
        stagger: { each: gsap_setting.stagger_duration },
        scrollTrigger: {
          start: "clamp(top bottom)",
          end: "clamp(bottom top)"
        },
      });
    },
  });

}
