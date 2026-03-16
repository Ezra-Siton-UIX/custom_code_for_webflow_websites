
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
          clipPath: "inset(0% 0% round 20px)",
          delay: 0,
					onComplete: () => {
            gsap.set(section, { 
              clipPath: "initial",  
              opacity: 1,
            });
          }
        });

        gsap.from(q("div"), {
          duration: 0.6,
          ease: gsap_setting.easing_type,
          delay: 0.7,
          opacity: 0,
        });
      });
    },
    once: true,
  });


}
