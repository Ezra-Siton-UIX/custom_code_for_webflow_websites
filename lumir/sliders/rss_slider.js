/*## 1 of X -- Homepage => Hero => News Slider ##*/
export function init_rss_slider(){
  const is_swiper_news_rss = $(".swiper[news_rss]").length > 0;
  if(is_swiper_news_rss){
    const swiper_news_rss = new Swiper('.swiper[news_rss]', {
      // Optional parameters

      loop: true,
      slidesPerView: 'auto',

      centeredSlides: true,
      slideToClickedSlide: true,

      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },

      a11y: {
        slideRole: 'listitem',
        containerMessage: "Lumir News",
        containerRole: "list 2",
        itemRoleDescriptionMessage: "Lumir News Article"
      },

      breakpoints: {
        // when window width is >= 640px
        0: {
          slidesPerView: 1.3,
          spaceBetween: 20,
          freeMode: false
        },
        700: {
          slidesPerView: "auto",
          spaceBetween: 40
        },
      },

      on: {
        init: function ({el}) {
          $(".swiper[news_rss]").css("opacity", 1);
          //$(".swiper[news_rss]").removeClass("hide_on_load");       
          
          console.log('swiper initialized', el);
        },
      },

      // Navigation arrows
      navigation: {
        nextEl: '[swiper_button_next_rss]',
        prevEl: '[swiper_button_prev_rss]',
      },
    });/* end swiper intiliaze */



    const slide_to_where = document.documentElement.clientWidth > 900 ? 4 : 3; 


    setTimeout(function() {
      swiper_news_rss.slideTo(slide_to_where, 400);
    }, 500);

  }/* end if */
}
