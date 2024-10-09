const swiper_tabs = new Swiper('.swiper[swiper_with_line_animation]', {
  // Optional parameters

  centeredSlidesBounds: false,
  loop: false,

  slideToClickedSlide: true,

  slidesPerView: 1.3,
  centeredSlides: true,
  spaceBetween: 16,
  keyboard: {
    enabled: true
  },

  breakpoints: {
    // when window width is >= 640px
    0: {
      slidesOffsetAfter: 16,
      slidesOffsetBefore: 16,
      slidesPerView: 1.15,
      spaceBetween: 10,
      centeredSlidesBounds: true,
      centeredSlides: true,

    },
    700: {
      slidesOffsetAfter: 32,
      slidesOffsetBefore: 32,
    },
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 7500,
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



/* tab menu swiper */
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
      slidesPerView: 3.5,
      spaceBetween: 10,
      centeredSlidesBounds: true,
      centeredSlides: true,
    },
    700: {
    },
  },

  on: {
    init: function () {
      $("[swiper_with_line_animation]").css("opacity", 1);
      $("[swiper_with_line_button_tabs]").css("opacity", 1);
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
  stop_all_videos();
  swiper_tabs.autoplay.start()
});



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

/* ### WISTIA ### */
window._wq = window._wq || [];
_wq.push({ id: "_all", onReady: function(video) {
  //console.log("sdffffffffffffffffffffff")
  // for all existing and future videos, run this function
  video.bind('play', function() {
    // when one video plays, iterate over all the videos and pause each,
    // unless it's the video that just started playing.
    var allVideos = Wistia.api.all();
    for (var i = 0; i < allVideos.length; i++) {
      if (allVideos[i].hashedId() !== video.hashedId()) {
        allVideos[i].pause();
      }
    }
  });
}});




window._wq = window._wq || [];
_wq.push({ id: "_all", onReady: function(video) {
  console.log("I got a handle to the video!", video);
}});

window._wq = window._wq || [];
_wq.push({ id: "_all", onReady: function(video) {
  // for all existing and future videos, run this function
  video.bind('play', function() {
    console.log("video played");

    swiper_tabs.autoplay.pause()

    // when one video plays, iterate over all the videos and pause each,
    // unless it's the video that just started playing.
    var allVideos = Wistia.api.all();
    for (var i = 0; i < allVideos.length; i++) {
      if (allVideos[i].hashedId() !== video.hashedId()) {
        allVideos[i].pause();
      }
    }
  });

  video.bind('pause', function() {
    console.log("video pause");
    swiper_tabs.autoplay.resume()
    // when one video plays, iterate over all the videos and pause each,
    // unless it's the video that just started playing.

  });
}});

function stop_all_videos(){
  window._wq = window._wq || [];
  _wq.push({ id: "_all", onReady: function(video) {
    // for all existing and future videos, run this function
    var allVideos = Wistia.api.all();
    for (var i = 0; i < allVideos.length; i++) {
      if (allVideos[i].hashedId() !== video.hashedId()) {
        allVideos[i].pause();
      }
    }
  }});

}





/* play the line animation only when scroll into view */

var waypoints = $("[trigger_auto_play_lines]").waypoint({
  handler: function() {
    console.log("waypoint in view");
    swiper_tabs.slideTo(0);
    swiper_tabs.autoplay.start();
    this.destroy();
  },
  offset: 'bottom-in-view'
});

