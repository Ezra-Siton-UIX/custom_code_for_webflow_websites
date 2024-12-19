/* code as copy paste inside webflow */
/* under: https://www.f2vc.com/events/cybersecurity-showcase */

/*### UTM PARAMS ###*/
var queryString = window.location.search;
console.log(queryString);
// ?utm_source=facebook&utm_medium=post&utm_campaign=webflow
var URLSearchParams_wb = new URLSearchParams(queryString);

const utmParameters = [
  "utm_source", 
  "utm_medium", 
  "utm_campaign"
];

for (const utm_element of utmParameters) {
  /* if utm_source exist */
  $( "form" ).each(function( index ) {
    if(URLSearchParams_wb.has(utm_element)){
      console.log(utm_element + "is exist");
      /* get UTM value of this utm param */
      var value = URLSearchParams_wb.get(utm_element)
      /* change form hidden feild to this utm url value */
      $( this ).find("["+utm_element+"]").val(value);
      $( this ).find("["+utm_element+"]").attr("type", "hidden");
    }

  })
}/* end for loop */


let lp_sticky_cta = document.querySelector("[lp_sticky_cta]");

/* check if navbar exists (to avoid js console errors) */
let exists_vanilla = document.querySelectorAll("[lp_sticky_cta]").length > 0;

/* if user scroll add active class */
window.addEventListener('scroll', function() {
  if(exists_vanilla && window.pageYOffset > 300 && window.pageYOffset < 2333){
    lp_sticky_cta.classList.add('active');
  }else if(exists_vanilla){
    lp_sticky_cta.classList.remove('active');

  }
});


var swiperNodes_2 = "";
var pagination = '<div class=swiper-pagination></div>';
var next_prev_buttons = '<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>'; 
var scrollbar = '<div class="swiper-scrollbar"></div>';

swiperNodes_2 = swiperNodes_2.concat(pagination);

/* loop throw all swipers on the page */
$('.swiper[swiper_with_line_animation]').each(function( index ) {
  $( this ).append(swiperNodes_2);
});

/* added under webflow as CDN */


/* tab menu swiper */


/* 1 of 2 - tab menu swiper */
const swiper_tabs_buttons = new Swiper('.swiper[swiper_with_line_button_tabs]', {
  // Optional parameters
  centeredSlidesBounds: false,
  loop: false,
  slideToClickedSlide: true,
  centeredSlides: false,
  spaceBetween: 16,

  slidesPerView: 5,

  breakpoints: {
    // when window width is >= 640px
    0: {
      slidesOffsetAfter: 16,
      slidesOffsetBefore: 16,
      slidesPerView: "auto",
      spaceBetween: 16,
      centeredSlidesBounds: true,
      centeredSlides: true,
    },
    800: {
      slidesOffsetAfter: 32,
      slidesOffsetBefore: 32,
      slidesPerView: "auto",
      spaceBetween: 32,


    },
    1200: {
      slidesOffsetAfter: 60,
      slidesOffsetBefore: 60,
      slidesPerView:  "auto",
      spaceBetween: 40,
      centeredSlidesBounds: true,
      centeredSlides: true,
      
      allowTouchMove: false
    },
  },

  on: {
    init: function () {
      $("[swiper_with_line_animation]").css("opacity", 1);
      $("[swiper_with_line_button_tabs]").css("opacity", 1);
    },
  },

});

/* 2 of 2 tab cards swiper */
const swiper_tabs = new Swiper('.swiper[swiper_with_line_animation]', {
  // Optional parameters

  centeredSlidesBounds: false,
  loop: false,

  slideToClickedSlide: true,

  slidesPerView: 1.7,
  centeredSlides: true,
  spaceBetween: 16,
  keyboard: {
    enabled: true
  },

  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: false,
    clickable: true,
  },

  breakpoints: {
    // when window width is >= 640px
    0: {
      slidesOffsetAfter: 0,
      slidesOffsetBefore: 0,
      slidesPerView: 1.2,
      spaceBetween: 16,
      centeredSlidesBounds: false,
      centeredSlides: true,

    },
    700: {
      slidesOffsetAfter: 32,
      slidesOffsetBefore: 32,
    },
  },


  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 15000,
    disableOnInteraction: false,
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

  on: {
    init: function () {

    },
  },

});



/* swiper controllers */

swiper_tabs.autoplay.stop();

swiper_tabs.controller.control = swiper_tabs_buttons;
swiper_tabs_buttons.controller.control = swiper_tabs;

const bars = document.querySelectorAll("[bar]");
const tabs_btns = document.querySelectorAll("[tabs_btn]");

tabs_btns.forEach((tabs_btn, i) => {
  console.log(i)
  tabs_btn.addEventListener('click', () => {
    console.log(i, "clicked");
    swiper_tabs.slideTo(i);
    set_active_state(tabs_btn);
  });
});

$("[tabs_btn]").eq(0).addClass("active");


function set_active_state(tabs_btn){
  $("[tabs_btn]").removeClass("active");
  tabs_btn.classList.add("active");
}


set_bar_width_to_zero();

function set_bar_width_to_zero(){
  bars.forEach(bar => {
    bar.style.width = 0;
  });/* end foreach */
}

swiper_tabs.on('autoplayTimeLeft', function ({realIndex}, timeLeft, percentage) {
  //console.log(timeLeft);
  let bar_width = 100 * (1 - percentage);
  bars[realIndex].style.width = `${bar_width}%`;
  //console.log(swiper.realIndex, "timeLeft", timeLeft, "percentage", 1 - percentage);
});

swiper_tabs.on('slideChange', function (swiper) {
  set_bar_width_to_zero();
  set_active_state(tabs_btns[swiper.realIndex])
  swiper_tabs.autoplay.start()
});




$( ".swiper[swiper_with_line_animation]" ).hover(
  function() {
    //swiper_tabs.autoplay.stop();
    //swiper_tabs.autoplay.pause();


  }, function() {
    //swiper_tabs.autoplay.resume()
    //swiper_tabs.autoplay.start()

  }
);







// swiper - match the height of the slides */
var swiper_text_boxes = document.querySelectorAll('[company-card_tab]');
var allDivsHeight = [];
for (i = 0; i < swiper_text_boxes.length; i++) {
  allDivsHeight.push(swiper_text_boxes[i].offsetHeight);
}
console.log(allDivsHeight);//just for debugging
const the_tallest_slide = Math.max(...allDivsHeight);

for (i = 0; i < swiper_text_boxes.length; i++) {
  swiper_text_boxes[i].style.minHeight = `${the_tallest_slide}px`;
}








/* play the line animation only when scroll into view */

var waypoints = $("[trigger_auto_play_lines]").waypoint({
  handler: function() {
    console.log("waypoint in view");
    swiper_tabs.slideTo(0);
    swiper_tabs.autoplay.start();
    //swiper_tabs.autoplay.resume()

    this.destroy();
  },
  offset: 'bottom-in-view'
});


var waypoints_footer = $("[RSVP_section]").waypoint({
  handler: function() {
    console.log("RSVP_section waypoint in view");

  },
  offset: 'bottom-in-view'
});



