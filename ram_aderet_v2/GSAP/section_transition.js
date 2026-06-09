import { gsap_setting } from './gsap_setting.js';

export function section_transition() {

  gsap.registerPlugin(ScrollTrigger);

  // ─────────────────────────────────────────────
  // Cover Hero — "Curtain" / ATMOS Effect
  //
  // THE TRICK
  //   The hero is a fixed-size frame (100svh, overflow: hidden).
  //   GSAP moves the inner wrapper DOWN (+Y) as the user scrolls.
  //   overflow: hidden clips what drops below the frame,
  //   revealing the solid background color from the bottom up.
  //   The next section rises naturally beneath — no JS needed on it.
  //
  // SCROLL MATH (speed = 0.5)
  //   scroll 0vh  → inner Y = 0       (full image visible)
  //   scroll 50vh → inner Y = +25vh   (bottom quarter clipped)
  //   scroll 100vh → inner Y = +50vh  (hero gone)
  //
  // INSPIRED BY: ayocin.com (ATMOS agency)
  // ─────────────────────────────────────────────

  const SPEED = 0.5;

  document.querySelectorAll("[data-cover-hero]").forEach((section) => {
    const inner = section.querySelector("[data-cover-hero-inner]");
    if (!inner) return;

    // Move inner DOWN as user scrolls — the clip does the rest
    gsap.to(inner, {
      y: () => section.offsetHeight * SPEED,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",      // starts exactly when hero hits top of viewport
        end: "bottom top",     // ends when hero bottom leaves viewport top
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // Fade out as the hero scrolls away
    gsap.to(inner, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "85% top",
        scrub: true,
      },
    });

    // data-hero-parallax-scale — zoom image as hero scrolls
    section.querySelectorAll("[data-hero-parallax-scale]").forEach((el) => {
      const scale = parseFloat(el.dataset.heroParallaxScale) || 1.4;
      gsap.to(el, {
        scale,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // data-movement — depth layering inside hero (desktop only)
    if (window.matchMedia("(min-width: 768px)").matches) {
      section.querySelectorAll("[data-movement]").forEach((el) => {
        const movement = Number(el.getAttribute("data-movement")) || 80;
        gsap.fromTo(el,
                    { y: 0 },
                    {
          y: movement,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
                   );
      });
    }
  });


}
