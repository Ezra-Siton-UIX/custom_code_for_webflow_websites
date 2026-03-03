import { gsap_setting } from './gsap_setting.js';

export function split_text() {
  
  // רישום הפלאגין
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const splits = document.querySelectorAll("[split]");
  const split_heros = document.querySelectorAll("[split_hero]");

  // הוספת setAttribute אל תיאורי הפרויקטים
  const project_about_RTB_titles = document.querySelectorAll("[project_about_RTB2] :is(h1, h2, h3, h4, h5, h6)");
  project_about_RTB_titles.forEach((project_about_RTB_title) => {
    project_about_RTB_title.setAttribute("trigger_box", "");
  });

  const project_about_RTB_paragraphs = document.querySelectorAll("[project_about_RTB2] p");
  project_about_RTB_paragraphs.forEach((project_about_RTB_paragraph) => {
    project_about_RTB_paragraph.setAttribute("trigger_box", "");
  });

  // הגדרת שקיפות עבור הפרויקטים
  if (project_about_RTB_titles.length > 0) {
    gsap.set("[project_about_RTB]", {
      opacity: 1
    });
  }

  // טיפול באלמנטים של split_hero
  if (split_heros.length > 0) {
    gsap.set("[split_hero]", {
      opacity: 1
    });

    let split_hero = new SplitText("[split_hero]", { // השתמש ב- new SplitText כאן אם אתה רוצה לאתחל את האובייקט
      type: "words, lines",
      mask: "words", // שמור רק על mask אחד
      linesClass: "line++",
    });

    gsap.from(split_hero.words, {
      yPercent: -120,
      opacity: 1,
      duration: 0.7,
      ease: gsap_setting.easing_type,
      stagger: 0.2
    });
  }

  // טיפול באלמנטים של split
  if (splits.length > 0) {
    gsap.set("[split]", {
      opacity: 1
    });

    ScrollTrigger.batch("[split]", {
      interval: 0, // זמן החלון של ה batching
      batchMax: 5, // הגבול למספר אלמנטים בבת אחת
      onEnter: batch => {
        batch.forEach((split_text_node) => {
          // אם זה לא בוצע כבר על האלמנט, הפעל את האנימציה
          if (!split_text_node.hasAttribute('data-split-text')) {
            split_text_node.setAttribute('data-split-text', 'true');
            split_text_animation(split_text_node);
          }
        });
      },
      stagger: 0.2,  // הוספת עיכוב בהפעלה
      once: true,
      markers: false,
      ease: gsap_setting.easing_type,
    });
  }

  // אנימציה על split_text_node
  function split_text_animation(split_text_node) {
    const closest_section = split_text_node.closest('.uk-section');

    // SplitText על הטקסט
    const splitInstance = new SplitText(split_text_node, {
      type: "words, lines",
      mask: "words",
      linesClass: "line",
      autoSplit: true,
      onSplit: (instance) => {
        return gsap.from(instance.words, {
          yPercent: -120,
          opacity: 0,
          stagger: gsap_setting.stagger_duration,
          duration: gsap_setting.reveal_duration,
          ease: gsap_setting.easing_type,
          scrollTrigger: {
            trigger: closest_section,
            markers: false,
            scrub: false,
            //start: "top bottom",
            //end: "bottom center",
          }
        });
      }
    });
  }

}
