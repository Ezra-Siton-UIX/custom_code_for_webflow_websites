if(window.location.pathname == "/operators"){
  VANTA.NET({
    el: "#your-element-selector",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 400.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xffffff,
    backgroundColor: "#0419d5",
    points: 6.00,
    maxDistance: 18.00,
    spacing: 44.00,
    showDots: true
  })

};

let swiperNodes = "";
const pagination = '<div class=swiper-pagination></div>';
const next_prev_buttons = '<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>'; 
const scrollbar = '<div class="swiper-scrollbar"></div>';
const not_active_slide_scale_value = 0.85;
const not_active_slide_opacity_value = 0.6;

swiperNodes = swiperNodes.concat(pagination);
/* loop throw all swipers on the page */
$('.swiper').each(function( index ) {
  $( this ).append(swiperNodes);
});

const operator_text_slider = new Swiper('[operator_text_slider]', {
  // Optional parameters
  loop: true,
  slidesPerView: 1.5,
  spaceBetween: 0,
  centeredSlides: true,
  slideToClickedSlide: true,
  effect: "creative",
  creativeEffect: {
    limitProgress: 2, // slides after 2nd before/after active will have same state
    prev: {
      opacity: 0,
      scale: not_active_slide_scale_value,
      // will set `translateX(-90%)` on previous slides
      translate: ["-50%", 0, 0],
    },
    next: {
      opacity: 0,
      scale: not_active_slide_scale_value,
      // will set `translateX(90%)` on next slides
      translate: ["50%", 0, 0],
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: '[custom_next]',
    prevEl: '[custom_prev]',
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  on: {
    init: function () {
      console.log('swiper initialized');
      $("[operator_text_slider]").css("opacity", 1)


    },
  },
});



const operator_logos_slider = new Swiper('[operator_logos_slider]', {
  // Optional parameters
  loop: true,
  slidesPerView: 1.5,
  spaceBetween: 0,

  centeredSlides: true,
  slideToClickedSlide: true,

  effect: "creative",
  creativeEffect: {
    limitProgress: 2, // slides after 2nd before/after active will have same state
    prev: {
      opacity: not_active_slide_opacity_value,
      scale: not_active_slide_scale_value,
      // will set `translateX(-90%)` on previous slides
      translate: ["-50%", 0, 0],
    },
    next: {
      opacity: not_active_slide_opacity_value,
      scale: not_active_slide_scale_value,
      // will set `translateX(90%)` on next slides
      translate: ["50%", 0, 0],
    },
  },

  on: {
    init: function () {
      console.log('swiper initialized');
      $("[operator_logos_slider], [operator_hero_img], [custom_prev], [custom_next]").css("opacity", 1);
    },
  },
});


operator_text_slider.on('init', function () {
  console.log('operator_text_slider init');
});

operator_text_slider.controller.control = operator_logos_slider;
operator_logos_slider.controller.control = operator_text_slider;

