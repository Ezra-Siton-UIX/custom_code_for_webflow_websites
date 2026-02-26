import  { trigger_box_animation } from './GSAP/trigger_box_animation.js';
import  { countUp } from './GSAP/countUp.js';
import  { countUpDecimal } from './GSAP/countUpDecimal.js';
import  { swiper_evrideo } from './sliders/swiper_evrideo.js';
import  { paint_canvas_bubbles } from './bubbles/paint_canvas_bubbles.js';


window.scrollBy(0, 1);
paint_canvas_bubbles();


function load_micromodal_modal(){

  /* 🚨🚨🚨 MICRO MODAL CORE 🚨🚨🚨 */

  //# attributes list 
  // micromodal
  // modal__overlay
  // modal__container
  // data-custom-close
  // data-custom-open


  const micromodal = document.querySelector("[micromodal]");
  micromodal.setAttribute("aria-hidden", "true");

  const modal__overlay = document.querySelector("[modal__overlay]");
  modal__overlay.setAttribute("tabindex", "-1");
  modal__overlay.setAttribute("data-micromodal-close", "");


  const modal__container = document.querySelector("[modal__container]");
  modal__container.setAttribute("role", "dialog");
  modal__container.setAttribute("aria-modal", "true");


  function onShow_MicroModal(){
    console.log("onShow_MicroModal");
    document.body.style.overflow = 'hidden'; // מונע גלילה

    //lenis.stop();
  }

  function onClose_MicroModal(){
    console.log("onClose_MicroModal");
    document.body.style.overflow = ''; // מחזיר גלילה


    //lenis.start()
  }

  const microModal_setting = {
    onShow: onShow_MicroModal, // [1]
    onClose: onClose_MicroModal, // [2]
    openClass: 'is-open', // [5]
    disableScroll: true, // [6]
    disableFocus: true, // [7]
    awaitOpenAnimation: false, // [8]
    awaitCloseAnimation: false, // [9]
    debugMode: true // [10]
  }

  MicroModal.init(microModal_setting);

  //MicroModal.show('micromodal', microModal_setting); 

}

load_micromodal_modal();     // 💬 modal functionality


/* check if navbar exists (to avoid js console errors) */
const $navbar = $('[uk_navbar]');

if ($navbar.length) {
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 80) {
      $navbar.addClass('uk_active');
    } else {
      $navbar.removeClass('uk_active');
    }
  });
}

/**>>>>>>>>>> 5 of 13 <<<<<<<<<<**/
/*#### Modal Form CTA modal radio button - add active class on click ####*/
$("[cta-radio_btn]").removeClass("active")

$("[cta-radio_btn]").click(function(){
  $("[cta-radio_btn]").removeClass("active")
  $(this).addClass("active")
});

const page_url = window.location.pathname;

$("input[page_url]" ).each(function( index ) {
  $( this ).val(page_url);
  $( this ).attr("type", "hidden");
});


document.addEventListener('DOMContentLoaded', () => {
  // 🔹 פונקציות תמיד רצות, גם אם המשתמש ביקש reduced motion
  swiper_evrideo();          // 💥 full page swiper animations

  // 👀 בדיקה אם המשתמש ביקש להפחית תנועה
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion) {
    console.log("Reduced motion if off");
    // 🎬 Animations ON —
    trigger_box_animation();     // 💬 small box animations
    countUp();                   // 💬 counters
    countUpDecimal(2);           // 💬 decimal counters

  } else {
    // ⏸️ Reduced Motion — 
    console.log("Reduced motion detected — skipping heavy animations.");
    const heroVideo = document.querySelector('[hero_video]');
    if (heroVideo) {
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
      heroVideo.currentTime = 0;
    }
  }
});








/* BEEPUP */
const beefupOrderItems = document.querySelectorAll("[beefup_order]");

beefupOrderItems.forEach((orderItem, index) => {
  // index מתחיל מ-0 → מוסיפים 1
  const number = index + 1;

  // מוביל אפס עבור מספרים < 10
  const formattedNumber = number < 10 ? "0" + number : number.toString();

  orderItem.textContent = formattedNumber;
  orderItem.style.opacity = 1;

});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typeof jQuery !== "undefined" && $.fn.beefup) {
  const $beefup = $('.beefup').beefup({
    openSingle: true,
    selfBlock: false,
    openSpeed: prefersReducedMotion ? 0 : 400,
    closeSpeed: prefersReducedMotion ? 0 : 400
  });

  $beefup.open($('.beefup').eq(0));
} else {
  console.warn("jQuery או beefup לא נטענו עדיין");
}

// TOP BAR //
// בוחרים לפי data attributes
(function () {

  const topBar = document.querySelector('[data-top-bar]');
  if (!topBar) return;

  const closeBtn = document.querySelector('[data-top-bar-close]');
  const show_always = true;

  if (!show_always && localStorage.getItem('topBarClosed') === 'true') {
    topBar.style.display = 'none';
  }

  if (!closeBtn) return;

  closeBtn.addEventListener('click', function () {
    topBar.style.display = 'none';

    if (!show_always) {
      localStorage.setItem('topBarClosed', 'true');
    }
  });

})();



function toggle_video(){

  // 1 - toggle background videos 
  document.querySelectorAll('[toogle_video]').forEach(toogle_video_button => {
    const iconPlay = toogle_video_button.querySelector('[video_play]');
    const iconPause = toogle_video_button.querySelector('[video_pause]');
    const video = document.querySelector("[hero_video]");

    if (!video) return;

    video.muted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // אם נחסם autoplay – ננסה שוב אחרי אינטראקציה
        document.addEventListener("click", () => video.play(), { once: true });
      });
    }



    function updateUI() {
      const isPaused = video.paused;

      // אייקונים
      if (iconPlay)  iconPlay.style.display  = isPaused ? 'block' : 'none';
      if (iconPause) iconPause.style.display = isPaused ? 'none'  : 'block';

      // ARIA + title
      toogle_video_button.setAttribute(
        'aria-label',
        isPaused ? 'Play the video' : 'Pause the video'
      );

      toogle_video_button.setAttribute(
        'title',
        isPaused ? 'Play the video' : 'Pause the video'
      );
    }

    // ✅ אתחול ARIA מיידי (לפני כל אירוע)
    toogle_video_button.setAttribute('aria-label', 'Pause the video');
    toogle_video_button.setAttribute('title', 'Pause the video');

    // מצב התחלתי (ברירת מחדל: הווידאו מנגן)
    updateUI();

    toogle_video_button.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    // שמירה על סנכרון תמידי
    video.addEventListener('play', updateUI);
    video.addEventListener('pause', updateUI);

  });
}
//toggle_video();
