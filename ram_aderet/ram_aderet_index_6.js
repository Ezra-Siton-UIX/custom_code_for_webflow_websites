// Develope by Ezra Siton, Israel //
gsap.registerPlugin(ScrollTrigger, SplitText);

import  { countUp } from './GSAP/countup_gsap.js';
import  { button_enter_animation } from './GSAP/button_enter_animation.js';
import  { toogle_navbar_active } from './NAVBAR/toogle_navbar_active.js';
import  { scale_image_mask } from './GSAP/scale_image_mask.js';
import  { split_text } from './GSAP/split_text.js';
import  { trigger_box_animation } from './GSAP/trigger_box_animation.js';
import  { card_bg_image_animation } from './GSAP/card_bg_image_animation.js';
import  { initialize_sliders } from './GSAP/initialize_sliders.js';
import  { fit_zigzag_height } from './GSAP/fit_zigzag_height.js';
import  { marquee__items } from './GSAP/marquee__items.js';
import  { accessibility } from './accessibility/accessibility.js';
import  { fancybox_modals } from './fancybox_modals/fancybox_modals.js';
import  { mask_animation_on_scroll } from './GSAP/mask_animation_on_scroll.js';
import  { basic_parralax_image } from './GSAP/basic_parralax_image.js';
// CRM
import  { nadlan2u_CRM } from './nadlan2u_CRM/nadlan2u_CRM.js';
// Forms CRM
nadlan2u_CRM();

// en Scripts 
const is_en = window.location.pathname.toLowerCase().includes('/en/');
const project_lang = document.querySelector('[project_lang="EN"]');


// add alts to home > projects > project > CMS gallery         
// lightbox_image 
// project_location
// Select all elements with the class "example"
const lightbox_images = document.querySelectorAll('[lightbox_image]');
const project_name = document.querySelector('[project_name]')?.textContent;
const project_location = document.querySelector('[project_location][he]')?.textContent;
// Iterate over the NodeList using forEach
lightbox_images.forEach(lightbox_image => {
  // Perform an action on each individual element
  lightbox_image.alt = `${project_name} - ${project_location}`;
});


const enableLenis = false; // תשנה ל־true כשמוכנים להפעיל

if (enableLenis) {
  const lenis = new Lenis();

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); 
  });

  const currentScrollPosition = lenis.scroll;
  lenis.scrollTo(currentScrollPosition + 1, {
    duration: 0.1, 
    easing: (t) => t, 
  });
}

//lenis.stop();
//lenis.start()



// projects / project page (show/hide marketing footer form symbol placeholder logo)
const page_with_PlaceholderImage = document.querySelector('img[src*="placeholder"][project_page_real_logo_footer_form]') !== null;
const real_logo_if_logo_feild_is_set = document.querySelector('[project_page_real_logo_footer_form]');
const place_holder_logo_if_logo_feild_is_not_set = document.querySelector("[project_page_placeholder_logo_footer_form]");       // הלוגו האמיתי

// אם הפלייסהולדר **לא קיים**, כלומר יש לוגו אמיתי
if (page_with_PlaceholderImage) {
  // מסתיר את כל האלמנט של הלוגו הממלא מקום (אם יש) 
  real_logo_if_logo_feild_is_set.style.display = "none";
  place_holder_logo_if_logo_feild_is_not_set.style.display = "block";
}




window.addEventListener('load', () => {
  const col = document.querySelector('[power_numbers_animation_col]');
  const image = document.querySelector('[power_numbers_animation_image]');

  if (!col || !image) {
    console.warn('power_numbers_animation_col או power_numbers_animation_image לא נמצאו בדף');
    return;
  }

  // איפוס transform כדי למנוע בעיות iOS
  gsap.set(image, { y: 0 });

  const colHeight = col.offsetHeight;
  const imageHeight = image.offsetHeight;

  // הגנה – אם התמונה קטנה מהעמודה, אין אנימציה
  if (imageHeight <= colHeight) {
    console.warn('גובה התמונה קטן או שווה לגובה העמודה – אין צורך באנימציה');
    return;
  }

  const distance = imageHeight - colHeight;

  gsap.to(image, {
    y: -distance,      // תמיד למעלה בלבד
    duration: 25,
    ease: 'linear',
    repeat: -1,
    force3D: true      // שיפור ביצועים באייפון
  });
});



if(is_en || project_lang !== null){
  document.documentElement.lang = 'en';

  // Get elements by attribute
  const nameEl = document.querySelector('[project_name]');
  const categoryEl = document.querySelector('[project_category]');
  const locationEl = document.querySelector('[project_location]');

  // Extract and trim text
  const nameText = nameEl ? nameEl.textContent.trim() : '';
  const locationText = locationEl ? locationEl.textContent.trim() : '';
  const categoryText = categoryEl ? categoryEl.textContent.trim() : '';

  // Build the title
  let pageTitle = '';

  if (nameText) {
    pageTitle += nameText;
  }

  if (locationText) {
    pageTitle += nameText ? `, ${locationText}` : locationText;
  }

  if (categoryText) {
    pageTitle += (nameText || locationText) ? ` | ${categoryText}` : categoryText;
  }

  // Set as document title
  if (pageTitle) {
    document.title = pageTitle + " | Ram Aderet";
  }
}






// form hidden feild
var $page_name_feilds = document.querySelectorAll("[page_name]");

$page_name_feilds.forEach((page_name_feild) => {
  page_name_feild.value =  window.location.pathname; 
});


const mm = gsap.matchMedia();


// אם המשתמש ביקש תנועה מופחתת – לא מריצים אנימציות כבדות
mm.add("(prefers-reduced-motion: reduce)", () => {
  console.log("❌ תנועה מופחתת מופעלת (לא מריצים אנימציות)");
  // כאן אפשר לשים אנימציות קלות או לדלג לגמרי
  // למשל: לא לעשות כלום או רק fade-in פשוט
  // fade_in_elements(); // אם יש צורך
  gsap.set("[trigger_box]", { opacity: 1 });
  gsap.set("[split_hero]", { opacity: 1 });
  gsap.set("[split]", { opacity: 1 });
  gsap.set("[counter]", { opacity: 1 });
  gsap.set("[uk_button]", { opacity: 1, clipPath: "inset(0% 0% round 20px)" });

  //countUp();

  return () => {
    console.log("🧹 ניקוי עבור מצב תנועה מופחתת");
  };
});

mm.add("not (prefers-reduced-motion: reduce)", () => {
  // Your GSAP logic for reduced motion users
  console.log("Reduced motion is OFF - run Animations");


  vegas();

  // Example: fade in something instead of moving
  basic_parralax_image();
  mask_animation_on_scroll();
  split_text();
  scale_image_mask();
  button_enter_animation();
  trigger_box_animation();
  card_bg_image_animation();

  countUp();
  // Return a cleanup function (optional)
  return () => {
    console.log("Cleanup for reduced motion");
  };
});


// general 
if (typeof lenis !== 'undefined') {
  toogle_navbar_active(lenis);
} else {
  toogle_navbar_active();
}

initialize_sliders();
fit_zigzag_height();

// fancybox_modals
if (typeof lenis !== 'undefined') {
  fancybox_modals(lenis);} 
else {
  fancybox_modals();
}




window.Webflow ||= [];
window.Webflow.push(function () {
  // הקוד שלך כאן
  // זה ירוץ רק אחרי ש-Webflow סיים לאתחל הכל
  marquee__items();
});

// accessibility
accessibility();


document.addEventListener("DOMContentLoaded", (event) => {

  const project_sticky_cta = document.querySelector("[project_sticky_cta]");
  const project_main_wrapper = document.querySelector("[project_main_wrapper]");

  const close_marketing_project_banner = document.querySelector("[close_marketing_project_banner]");

  if(close_marketing_project_banner){
    close_marketing_project_banner.addEventListener('click', function() {
      project_sticky_cta.style.display = "none";
    });
  }

  if(project_sticky_cta !== null)gsap.set(project_sticky_cta, { y: 100 });

  if(project_main_wrapper !== null){
    ScrollTrigger.create({
      trigger: project_main_wrapper,
      start: "top top",
      end: "bottom bottom",
      markers: false,
      toggleActions: "play pause resume play", // onEnter, onLeave, onEnterBack, onLeaveBack
      onEnter: function () {
        gsap.to(project_sticky_cta, { y: 0, opacity: 1, duration: 0.3 });
      },
      onEnterBack: function () {
        gsap.to(project_sticky_cta, { y: 0, opacity: 1, duration: 0.3 });
      },
      onLeave: function () {
        gsap.to(project_sticky_cta, { y: 100, opacity: 0, duration: 0.3 });
      }, // assure that the element is hidden when scrolled into view
      onLeaveBack: function () {
        gsap.to(project_sticky_cta, { y: 100, opacity: 0, duration: 0.3 });
      } // assure that the element is hidden when scrolled into view
    });
  }

});



/// project 3 main categories (מגורים/הנדסה/התחדשות עירונית)
/// show video on hover 
// הגדרות גלובליות
// הגדרות גלובליות

/*
  const IMAGE_FADE_DURATION = 0.5; // משך fade של התמונה
  const EASE_TYPE = "power2.out";

  document.querySelectorAll("[animate_card_link_block]").forEach(category_card => {
    const category_image = category_card.querySelector("[card_bg_image]");
    const category_video = category_card.querySelector("video");

    category_card.addEventListener("mouseenter", () => {
      if (category_image) {
        gsap.to(category_image, { 
          opacity: 0, 
          duration: IMAGE_FADE_DURATION, 
          ease: EASE_TYPE 
        });
      }

      if (category_video) {
        category_video.currentTime = 0;
        category_video.play();
      }
    });

    category_card.addEventListener("mouseleave", () => {
      if (category_image) {
        gsap.to(category_image, { 
          opacity: 1, 
          duration: IMAGE_FADE_DURATION, 
          ease: EASE_TYPE 
        });
      }

      if (category_video) {
        category_video.pause();
      }
    });
  });

  */

// הגדרות גלובליות
const DURATION = 0.2; // משך האנימציה
const EASE = "power2.out";

document.querySelectorAll("[animate_card_link_block]").forEach(category_card => {
  const category_video = category_card.querySelector("video");

  // ברירת מחדל: עצור את הסרטון
  category_video.pause();
  gsap.set(category_video, { opacity: 1 }); // תמיד גלוי

  category_card.addEventListener("mouseenter", () => {
    if (!category_video) return;

    category_video.play(); // ממשיכים מנקודת העצירה הקודמת
    gsap.to(category_video, { opacity: 1, duration: DURATION, ease: EASE });
  });

  category_card.addEventListener("mouseleave", () => {
    if (!category_video) return;

    category_video.pause();
    gsap.to(category_video, { opacity: 1, duration: DURATION, ease: EASE });
  });
});

function vegas(){
  // vegas 

  // Your jQuery code goes here
  // Step 1: Get all slide image elements
  const vegas_images = [...document.querySelectorAll('[lightbox_image]')];
  const first = vegas_images.shift();
  if (first) vegas_images.push(first); // רק אם יש פריט

  // Step 2: Map them into the desired format
  const data = {
    slides: Array.from(vegas_images).map(img => ({
      src: img.src
    }))
  };

  setTimeout(function() {
    if(vegas_images.length > 2){
      $('[vegas_slideshow]').vegas({
        overlay: false,
        timer: false,
        loop: true,
        transition: 'fade', 
        transitionDuration: 1500,
        delay: 5000,
        animationDuration: 9000,
        animation: 'random',
        slides: data.slides,
        // 👇 הגבלת הזום
        animationOptions: {
          scale: 1.02,  // במקום 1.2–1.3 ברירת מחדל
          center: 'top',            // מתחילים מלמעלה
          pan: 'top'                 // subtle upward pan
        }
      });
    }

  }, 2000);
}
