/* 1 of 3 - homepage slider

        prev_btn

        next_btn

        this_slide_number

        total_slides

        */
let numOf_future_events_Slides = document.querySelectorAll(".swiper-slide").length;

if(numOf_future_events_Slides == 0){
  $("[swiper_arrows_wrapper]").hide();
  $(".swiper[homepage_events]").css("opacity", 1);
  $("[btn_future_events]").hide();
}else{
  const swiper_homepage_events = new Swiper('.swiper[homepage_events]', {
    // Optional parameters
    loop: false,
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        loop: false,
        slidesPerView: 1.15,
        spaceBetween: 16,
        centeredSlides: true,
        slideToClickedSlide: true,
        slidesOffsetAfter: 16,
        slidesOffsetBefore: 16,
        centeredSlidesBounds: true,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 40,
        centeredSlides: false,
        centeredSlidesBounds: false,

      }
    },

    // If we need pagination
    pagination: {
      el: '[swiper_pagination]',
    },

    // Navigation arrows
    navigation: {
      nextEl: '[events_homepage_section] [next_btn]',
      prevEl: '[events_homepage_section] [prev_btn]',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    /* events */
    on: {
      beforeInit: function(){
        let numOfSlides = this.wrapperEl.querySelectorAll(".swiper-slide").length;
        $('[events_homepage_section] [total_slides]').text(numOfSlides);

      },
      init: function(){
        //$("[events_homepage_section] [swiper_arrows_wrapper]").css("opacity", 1);


        $(".swiper[homepage_events]").css("opacity", 1);

        setTimeout(function(){
          $("[events_homepage_section] [swiper_arrows_wrapper]").css("visibility", "initial");

        }, 4000);

      },
      slideChange: function(){
        var currentSlide = this.realIndex + 1;
        console.log("currentSlide is:" + currentSlide);
        $('[events_homepage_section] [this_slide_number]').text(currentSlide);
      },
      lock: function(){
        console.log("lock")
        $("[events_homepage_section] [swiper-wrapper]").css("justify-content", "center");
      },
      unlock: function(){
        console.log("unlock")
        $("[events_homepage_section] [swiper-wrapper]").css("justify-content", "initial");
      },

    }    
  });



}


/* 2 of 3 - visitor-info => colinary */



/* 3 of 3 - visitor-info => environment */

const swiper_kayamot = new Swiper('.swiper[kayamot]', {
  // Optional parameters
  loop: false,
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  grabCursor: true,

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      loop: false,
      slidesPerView: 1.12,
      spaceBetween: 16,
      centeredSlides: true,
      slideToClickedSlide: true,
      slidesOffsetAfter: 16,
      slidesOffsetBefore: 16,
      centeredSlidesBounds: true,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3.4,
      spaceBetween: 40,
      centeredSlides: true,
      centeredSlidesBounds: true,
      slidesOffsetAfter: 80,
      slidesOffsetBefore: 80,
    }
  },

  // If we need pagination
  pagination: {
    el: '[swiper_pagination]',
  },

  // Navigation arrows
  navigation: {
    nextEl: '[environment] [next_btn]',
    prevEl: '[environment] [prev_btn]',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  /* events */
  on: {
    init: function(){
      $(".swiper[kayamot]").css("opacity", 1);
    },

    beforeInit: function(){
      let numOfSlides = this.wrapperEl.querySelectorAll(".swiper-slide").length;
      $('[environment] [total_slides]').text(numOfSlides);
    },
    init: function(){
      $("[swiper_arrows_wrapper]").css("opacity", 1);
      $(".swiper[kayamot]").css("opacity", 1);
    },

    slideChange: function(){
      var currentSlide = this.realIndex + 1;
      console.log("currentSlide is:" + currentSlide);
      $('[environment] [this_slide_number]').text(currentSlide);
    },

  }
});

swiper_kayamot.slideTo(0);
