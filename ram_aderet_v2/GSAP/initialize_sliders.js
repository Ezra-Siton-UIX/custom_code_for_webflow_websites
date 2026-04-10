export function initialize_sliders(){

  const clients_logos_item = document.querySelector('[clients_logos]')

  if(clients_logos_item !== null){
    const swiper_clients_logos = new Swiper('[clients_logos]', {
      // Optional parameters
      loop: true,
      autoplay: {
        delay: 94000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      on: {
        init: function () {
          console.log('swiper initialized');
        },
      },
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2.3,
          freeMode: {
            enabled: true,
            sticky: true,
          },
          spaceBetween: 20
        },
        // when window width is >= 640px
        991: {
          slidesPerView: 7,
          slidesPerGroup: 7,
          spaceBetween: 16
        }
      },// end breakpoints
      spaceBetween: 16,
      // If we need pagination
      pagination: {
        el: '[swiper_pagination]',
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: '[custom_arrow=next]',
        prevEl: '[custom_arrow=prev]',
      },
    });
  }// end clients_logos_item is not null


  //swiper_clients_logos.changeLanguageDirection("ltr")


}