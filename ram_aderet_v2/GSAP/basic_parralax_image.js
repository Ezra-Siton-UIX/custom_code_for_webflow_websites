import  { gsap_setting } from './gsap_setting.js';


export function basic_parralax_image(){

  // פרלקס לתמונה
  document.querySelectorAll("[parallax_trigger_new]").forEach(parallax_trigger => {

    const parallax_image = parallax_trigger.querySelector("[parallax_image]");

    //console.log("parallax_image", parallax_image);

    gsap.to(parallax_image, {
      yPercent: -18, // 
      scale: 1,
      ease: "none",
      transformOrigin: "top center", // או "top center"
      scrollTrigger: {
        trigger: parallax_trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  });
}


