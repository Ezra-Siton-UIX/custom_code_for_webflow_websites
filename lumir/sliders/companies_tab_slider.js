import  { setting } from '../setting/global_setting.js';

export function companies_tab_slider(){

  const is_swiper_tabs_content_slider = $(".swiper[tabs_content_slider]").length > 0;
  if(is_swiper_tabs_content_slider == false)return;
  
  /*## 4 of X -- home => tabs_content_slider | each_slider_animationl ##*/

  const each_slider_animation = gsap.utils.toArray("[tabs_content_slider] [clip_wrapper]");
  const tab_menu_btns = document.querySelectorAll('[tabs_menu_slider] [tabs_menu_slider_menu_item]');
  
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
      el: '[companies_slider_pagination]',
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
  });// end new Swiper

  setActiveMenu_Btn(0);
  tabs_content_slider_swiper.slideToLoop(0);

  tab_menu_btns.forEach(function(element, i) {
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
        tabs_content_slider_swiper.slideTo(i);
      }
    });

  });// end forEach

  tabs_content_slider_swiper.on('slideChange', function ({realIndex}) {
    setActiveMenu_Btn(this.realIndex);
    run_gsap_animation(realIndex);
  });// end on slideChange

  ScrollTrigger.create({
    trigger: each_slider_animation[0],
    start: "top bottom",
    once: true,
    onEnter: function () {
      run_gsap_animation(0);
    },
  });// end on ScrollTrigger

  function run_gsap_animation(realIndex){
    each_slider_animation.forEach((section, i) => {
      if(realIndex == i){
        /* show animation */
        gsap.to(each_slider_animation[realIndex], {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          delay: 0.3,
          ease: setting.easing_type,
          duration: setting.animation_duration * 1.5
        });

      }else{    
        /* HIDE set deafult state for all other animations (not active slide) */
        gsap.to(section, {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',/*hide */
          opacity: 0
        }); 
      }
    });
  }// end run_gsap_animation

  function setActiveMenu_Btn(index){
    /* remove active and set aria-selected "false" to  tabs buttons */
    if(tab_menu_btns.length > 0){
      tab_menu_btns.forEach.call(tab_menu_btns, function(tab_menu_btn) {
        tab_menu_btn.classList.remove("active");
        tab_menu_btn.setAttribute("aria-selected", false);
        tab_menu_btn.setAttribute("tabindex", -1);
      });
      tab_menu_btns[index].className += " active";
      tab_menu_btns[index].setAttribute("tabindex", 0);
      tab_menu_btns[index].setAttribute("aria-selected", false);
    }
  }// end setActiveMenu_Btn

}
