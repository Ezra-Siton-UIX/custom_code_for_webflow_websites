// 🎨 קונסטים לשינוי קל

const white_BUBBLE_COLOR = '102, 126, 234'; // RGB בלבד, לא rgba
const BUBBLE_COLOR = '117, 89, 255'; // RGB בלבד, לא rgba
const BUBBLE_BLUR = 25; // px
const BUBBLE_OPACITY = 0.6 // from 0 to 1;
const second_addColorStop = 0.9; // from 0.5 to 1 - higher you get bigger bubble




// בוחרים את כל האלמנטים עם סימבול Webflow
const blogWrappers = document.querySelectorAll('[blog_canvas]');

blogWrappers.forEach(wrapper => {
  // יוצרים canvas אם אין
  let canvas = wrapper.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    wrapper.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');

  function drawBubble() {
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // רדיוס גדול ככל האפשר מבלי לשבור את העיגול
    const radius = Math.min(canvas.width, canvas.height) / 2 * 0.95;

    // gradient רדיאלי
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, `rgba(${BUBBLE_COLOR}, ${BUBBLE_OPACITY})`);
    gradient.addColorStop(second_addColorStop, `rgba(${BUBBLE_COLOR}, 0)`);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // שמירה על הקנבס
    ctx.save();

    // חיתוך לעיגול
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();

    // בלור + ציור gradient
    const blur = Math.min(BUBBLE_BLUR, radius / 2); // לא יותר מחצי הרדיוס
    ctx.filter = `blur(${blur}px)`;
    ctx.fillStyle = gradient;
    // מצייר מלבן שמכסה את העיגול
    ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

    // איפוס filter ושחזור
    ctx.filter = 'none';
    ctx.restore();
  }

  // ציור ראשוני
  drawBubble();

  // עדכון רספונסיבי אם ההורה משתנה
  window.addEventListener('resize', drawBubble);
});







import  { trigger_box_animation } from './GSAP/trigger_box_animation.js';
import  { countUp } from './GSAP/countUp.js';
import  { countUpDecimal } from './GSAP/countUpDecimal.js';
import  { swiper_evrideo } from './sliders/swiper_evrideo.js';
import  { play_stop_bubbles } from './GSAP/play_stop_bubbles.js';

window.scrollBy(0, 1);


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

    // 🎬 Animations ON — הרצת פונקציות אנימציה כבדות / אפקטים
    play_stop_bubbles();       // 💥 floating bubble animations
    trigger_box_animation();     // 💬 small box animations
    countUp();                   // 💬 counters
    countUpDecimal(2);           // 💬 decimal counters

  } else {
    // ⏸️ Reduced Motion — דילוג על פונקציות אנימציה כבדות
    console.log("Reduced motion detected — skipping heavy animations.");
    document.querySelector('[hero_video]').pause();

    // 🔹 כאן אפשר להוסיף פונקציות חלופיות שלא משתמשות באנימציה
  }

});




// 1 - toggle background videos 
document.querySelectorAll('[toogle_video]').forEach(button => {


  button.setAttribute('aria-label', 'Pause the video');
  button.setAttribute('title', 'Pause the video');

  button.addEventListener('click', () => {

    // Find the video inside that ancestor
    const video = document.querySelector('[hero_video]');
    if (!video) return;

    // Toggle play/pause
    if (video.paused) {
      video.play();
      button.setAttribute('aria-label', 'Pause the video');
      button.setAttribute('title', 'Pause the video');
    } else {
      video.pause();
      button.setAttribute('aria-label', 'Play the video');
      button.setAttribute('title', 'Play the video');
    }
  });
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
