import { gsap_setting } from './gsap_setting.js';


export function card_bg_image_animation() {
  const cards = gsap.utils.toArray("[card_bg_image]");
  if (!cards.length) return;

  gsap.set(cards, { opacity: 0.8 });

  ScrollTrigger.batch(cards, {
    interval: 0,
    batchMax: 3,
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
  });
}
