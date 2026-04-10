
import  { gsap_setting } from './gsap_setting.js';


export function button_enter_animation(){


  ScrollTrigger.batch("[uk_button]", {
    onEnter: (batch) => {
      batch.forEach((section) => {
        const q = gsap.utils.selector(section); // Create a scoped selector for this section

        gsap.to(section, {
          duration: 0.7,
          ease: gsap_setting.easing_type,
          opacity: 1,
          clipPath: "inset(0% 0% round 20px)", // שינוי clip-path
          delay: 0,
          onComplete: () => {
            // ברגע שסיימה את האנימציה, מחזירים את ה-clip-path ל-initial
            gsap.delayedCall(1, () => { // חכה שנייה (1 שניה)
              section.setAttribute("anim_btn_completed", "true");
            });
          }
        });

      });
    },
    once: true,
  });
}