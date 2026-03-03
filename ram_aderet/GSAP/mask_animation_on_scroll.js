// מייצא את כל הקוד כפונקציה
export function mask_animation_on_scroll() {



  // פרלקס לתמונה

  // פרלקס לתמונה
  document.querySelectorAll("[parallax_trigger]").forEach(parallax_trigger => {
    const parallax_image = parallax_trigger.querySelector("[parallax_image]");

    gsap.to(parallax_image, {
      y: "-25%", // תזוזת פרלקס
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: parallax_trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
        markers: false // רק לפיתוח
      }
    });
  });



  function createMaskAnimation({ pinValue, startValue, endFactor }) {
    gsap.utils.toArray("[wrapper_mask]").forEach(section => {
      let box = section.querySelector("[top-box]");

      box.style.webkitMaskImage = "linear-gradient(to top, black 0%, transparent 0%)";
      box.style.maskImage = "linear-gradient(to top, black 0%, transparent 0%)";

      let maskData = { maskProgress: 0 };

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: startValue,
          end: () => "+=" + section.offsetHeight * endFactor,
          scrub: 1.5,
          pin: pinValue,
          anticipatePin: 1,
          markers: false,
          ease: "expo.out",
        }
      });

      tl.fromTo(maskData, 
                { maskProgress: 0 },
                { 
        maskProgress: 100,
        onUpdate: () => {
          const value = maskData.maskProgress.toFixed(2);
          box.style.webkitMaskImage = `linear-gradient(to top, black ${value}%, transparent ${value}%)`;
          box.style.maskImage = `linear-gradient(to top, black ${value}%, transparent ${value}%)`;
        }
      }
               )

    });
  }

  // מכניס את ה-matchMedia לתוך הפונקציה שתרוץ מתי שאתה מחליט
  ScrollTrigger.matchMedia({

    // Desktop
    "(min-width: 768px)": () => createMaskAnimation({
      pinValue: false,
      startValue: "50% 60%",
      endFactor: 1.0
    }),

    // Mobile
    "(max-width: 767px)": () => createMaskAnimation({
      pinValue: false,
      startValue: "top center",
      endFactor: 1.5
    })

  });
}
