/**/
const tabs_menu_slider_swiper = new Swiper('[tabs_menu_slider22]', {
  // Optional parameters
  loop: false,
  direction: "vertical",
  slideToClickedSlide: true,
  // centeredSlides: true,
  // centeredSlidesBounds: false,


  breakpoints: {
    // when window width is >= 640px
    0: {
      slidesPerView: "3",
      spaceBetween: 0,
      direction: "vertical",
    },
    700: {
      slidesPerView: 3,
      spaceBetween: 0
    },
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  on: {
    init: function () {
      console.log('swiper initialized');
      $("[opacity_0_on_load]").css("opacity", 1)
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: '[custom_next]',
    prevEl: '[custom_prev]',
  },

  on: {
    slideChange: function () {
    },
  }
});



const tabs_content_slider_swiper = new Swiper('[tabs_content_slider]', {
  // Optional parameters
  loop: false,
  slideToClickedSlide: true,
  centeredSlides: true,
  centeredSlidesBounds: false,


  breakpoints: {
    // when window width is >= 640px
    0: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    700: {
      slidesPerView: 1,
      spaceBetween: 40
    },
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },


  // Navigation arrows
  navigation: {
    nextEl: '[custom_next]',
    prevEl: '[custom_prev]',
  },

  on: {
    slideChange: function () {
    },
  }
});




//tabs_content_slider_swiper.controller.control = tabs_menu_slider_swiper;
//tabs_menu_slider_swiper.controller.control = tabs_content_slider_swiper;


const btns = document.querySelectorAll('[tabs_menu_slider] [tabs_menu_slider_menu_item]')
setActiveMenu_Btn(0);


btns.forEach(function(element, i) {
  // element refers to the DOM node
  /* add click event */
  element.addEventListener("click", function() {
    tabs_content_slider_swiper.slideTo(i);
  });
  /*#### Accessibility #### */

  /* add keyboard enter event */
  element.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      tabs_content_slider_swiper.slideTo(i+1);
    }
  });

});

tabs_content_slider_swiper.on('slideChange', function () {
  setActiveMenu_Btn(this.realIndex);

});

function setActiveMenu_Btn(index){
  /* remove active and set aria-selected "false" to  tabs buttons */
  if(btns.length > 0){
    btns.forEach.call(btns, function(el) {
      el.classList.remove("active");
      el.setAttribute("aria-selected", false);
      el.setAttribute("tabindex", -1);
    });
    console.log(index);

    btns[index].className += " active";
    btns[index].setAttribute("tabindex", 0);
    btns[index].setAttribute("aria-selected", false);

  }
}

