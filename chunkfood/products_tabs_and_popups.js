/*** recipes Slider ***/

const recipes_swiper = new Swiper(".swiper[recipes]", {
  loop: true,
  slideToClickedSlide: true,
  centeredSlidesBounds: true,
  centeredSlides: true,
  grabCursor: true,

  keyboard:{
    enabled: true
  },
  // Navigation arrows
  navigation: {
    nextEl: '[swiper_arrow=next]',
    prevEl: '[swiper_arrow=prev]',
  },

  // If we need pagination
  pagination: {
    el: '[swiper-recipes-pagination]',
    clickable: true,
    dynamicBullets: true
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.20,
      spaceBetween: 12,
      slidesOffsetAfter: 0,
      slidesOffsetBefore: 0,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 24,
      centeredSlidesBounds: false,
      centeredSlides: false,
      slidesOffsetAfter: 0,
      slidesOffsetBefore: 0,
    }
  },/** end breakpoints */
  on: {
    init: function () {
      $(".swiper[recipes]").css("opacity", 1);
    },
  },
});


/**** >>> fancybox 4 modals (Two types on the same page) <<< ****/
const cooking_instructions_prefix = "_cooking_instructions";
$( "[popup_2_cooking_instructions] [modal]" ).each(function( index ) {
  const this_id = $( this ).attr("id");
  const new_this_id = this_id + cooking_instructions_prefix;
  $( this ).attr("id", new_this_id);
});

$( "[cooking_instructions][data-src]" ).each(function( index ) {
  const this_data_fancybox = $( this ).attr("data-fancybox");    
  const this_data_src =  $( this ).attr("data-src");
  const new_data_src = "#"+this_data_src+cooking_instructions_prefix;
  const new_data_fancybox = this_data_fancybox+cooking_instructions_prefix;
  $( this ).attr("data-src", new_data_src);
  $( this ).attr("data-fancybox", new_data_fancybox);

});

$( "[nutrition_and_ingredients][data-src]" ).each(function( index ) {
  const this_data_src =  $( this ).attr("data-src");
  const new_data_src = "#"+this_data_src;
  $( this ).attr("data-src", new_data_src);
});

Fancybox.bind("[data-fancybox]", {
  // Your custom options
  closeButton: false,
  dragToClose: false,
  autoFocus: false,
  groupAll: false,
  groupAttr: false,

  on: {
    reveal: (fancybox, slide) => {
      // The content of this slide is loaded and ready to be revealed
      console.log("reveal");
      //lenis.stop()
    },
    close: (fancybox, slide) => {
      // The content of this slide is loaded and ready to be revealed
      console.log("close");
      //lenis.start()
    },
  },
});


/* modal 1 of 2 - popup-1-Nutritional Values-and-Ingredients */

/* Popup slider 1 of 2 - inner slider */

// Select all elements with the class 'swiper'
const swiperElements = document.querySelectorAll('.swiper[nutritional_values_and_Ingredients]');
const swiper_menu_elements = document.querySelectorAll('[menu-for-swiper-nutritional_values_and_Ingredients]');
const swipers = [];
// Loop through each '.swiper' element and initialize Swiper
swiperElements.forEach((slider, slider_index) => {

  const this_tab_btn_Elements = swiper_menu_elements[slider_index].querySelectorAll('[swiper_tab_btn]');

  /* create byttons events listenrs */
  this_tab_btn_Elements.forEach((swiper_tab_btn, tab_index) => {
    swiper_tab_btn.addEventListener("click", (event) => {
      change_slider_tab(slider_index, tab_index);
      set_active_tab(slider_index, tab_index);
    });

  });

  const swiper = new Swiper(slider, {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 16
  });

  swiper.on('slideChange', function ({realIndex}) {
    console.log('slide changed', realIndex);
    set_active_tab(slider_index, realIndex);

  })

  swipers.push(swiper);
});
/* Popup slider 2 of 2 - popup-2-cooking instructions */


//Popup slider with button menu (looks as tab widget ) //
function set_active_tab(slider_index, tab_index){
  console.log(slider_index, tab_index);

  $(".fancybox__content [menu-for-swiper-nutritional_values_and_Ingredients]").eq(0).find("[swiper_tab_btn]").removeClass("active");

  $(".fancybox__content [menu-for-swiper-nutritional_values_and_Ingredients]").eq(0).find("[swiper_tab_btn]").eq(tab_index).addClass("active");

}
function change_slider_tab(slider_index, tab_index){
  console.log(slider_index, tab_index);


  swipers[slider_index].slideTo(tab_index);
}

/* 1 of 2 - tab menu swiper */
const swiper_tabs_buttons = new Swiper('.swiper[swiper_tabs_menu_items]', {
  // Optional parameters
  centeredSlidesBounds: false,
  loop: false,
  slideToClickedSlide: true,
  centeredSlides: false,


  slidesPerView: 4,

  breakpoints: {
    // when window width is >= 640px
    0: {

      slidesPerView: 4,
      centeredSlidesBounds: true,
      centeredSlides: true,
    },
    700: {
    },
  },

  on: {
    init: function () {
      $("[swiper_tabs_content]").css("opacity", 1);
      $("[swiper_tabs_menu_items]").css("opacity", 1);
    },
  },

});

/* 2 of 2 - tab menu content - swiper */

const swiper_tabs = new Swiper('.swiper[swiper_tabs_content]', {
  // Optional parameters

  centeredSlidesBounds: false,
  loop: false,

  slideToClickedSlide: true,

  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 16,
  keyboard: {
    enabled: true
  },

  breakpoints: {
    // when window width is >= 640px
    0: {
      slidesOffsetAfter: 0,
      slidesOffsetBefore: 0,
      slidesPerView: 1,
      spaceBetween: 16,
      centeredSlidesBounds: false,
      centeredSlides: true,

    },
    700: {
      slidesOffsetAfter: 0,
      slidesOffsetBefore: 0,
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
swiper_tabs.controller.control = swiper_tabs_buttons;
swiper_tabs_buttons.controller.control = swiper_tabs;

const main_tabs_btns = document.querySelectorAll("[tabs_btn]");

main_tabs_btns.forEach((main_tab_btn, i) => {
  main_tab_btn.addEventListener('click', () => {
    swiper_tabs.slideTo(i);
    set_active_state(main_tab_btn);
  });
});

$("[tabs_btn]").eq(0).addClass("w--current");

function set_active_state(main_tab_btn){
  $("[tabs_btn]").removeClass("w--current");
  main_tab_btn.classList.add("w--current");
}

swiper_tabs.on('slideChange', function (swiper) {
  set_active_state(main_tabs_btns[swiper.realIndex])
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

