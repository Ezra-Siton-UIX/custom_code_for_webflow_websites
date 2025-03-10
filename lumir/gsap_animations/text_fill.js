export function text_fill(){


  const textElements = gsap.utils.toArray("[text-fill]");

  /*## 4 of X -- fill text on scroll ##*/

  textElements.forEach(function(textElement, i) {
    gsap.set(textElement, {
      backgroundSize: "0%"
    });
  });// end forEach


  textElements.forEach((text) => {
    gsap.fromTo(
      text,
      { backgroundSize: "0%" },
      {
        backgroundSize: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: text,
          start: "top 100%",
          end: "center 85%",
          scrub: 2,
          duration: 3,
          once: true,
        }
      }
    );
  });

}

