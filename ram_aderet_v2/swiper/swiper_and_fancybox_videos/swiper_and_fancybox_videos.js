export function swiper_and_fancybox_videos() {
  const el_swiper = document.querySelector(".swiper");
  if (el_swiper) {
    const swiper = new Swiper(".swiper", {
      // Optional parameters
      loop: true,
      centeredSlides: false,

      slidesPerView: 1,
      spaceBetween: 10,

      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        // when window width is >= 640px
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 30
        }
      }, // end breakpoints

      // If we need pagination
      pagination: {
        el: "[swiper_pagination]",
        clickable: true
      },

      // Navigation arrows
      navigation: {
        nextEl: "[swiper_button_next]",
        prevEl: "[swiper_button_prev]"
      }
    });
  }
} // end swiper_and_fancybox_videos
