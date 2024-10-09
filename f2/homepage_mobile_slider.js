const homepage_companies_mobile_slider_slider = new Swiper('.swiper[homepage_companies_mobile_slider]', {
  // Optional parameters
  loop: false,
  slidesPerView: 1.15,
  spaceBetween: 0,
  centeredSlides: true,
  slideToClickedSlide: true,
  slidesOffsetAfter: 16,
  slidesOffsetBefore: 16,
  centeredSlidesBounds: true,

  // Navigation arrows
  navigation: {
    nextEl: '[custom_next]',
    prevEl: '[custom_prev]',
  },
  /*
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  */
  
  /*
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  */
  on: {
    init: function () {
      console.log('swiper initialized');
      $("[homepage_companies_mobile_slider]").css("opacity", 1)
    },
  },
});