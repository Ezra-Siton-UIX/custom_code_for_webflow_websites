import  { setting } from '../setting/global_setting.js';

export function clip_path_image(){
  ScrollTrigger.batch("[clip_wrapper='yes']", {
    //interval: 0.1, // time window (in seconds) for batching to occur. 
    //batchMax: 3,   // maximum batch size (targets)
    onEnter: batch => {
      batch.forEach((card, index) => revealItem(card))
    },
    once: true,
    markers: false,
    start: "120px bottom",
    // you can also define things like start, end, etc.
  });

  function revealItem(card, direction) {
    /* 1 of 2 - Wrapper */
    /* 2 of 2 - Wrapper => image */
    
    gsap.from(card.querySelector("img"), {
      duration: setting.animation_duration * 2,
      autoAlpha: 0,
      scale: 1,

    });
    
    gsap.to(card, {
      duration: setting.animation_duration,
      ease: setting.easing_type,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  
    });



  }

}
