export function swiper_evrideo() {

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sliderElement = document.querySelector('.swiper[evrideo_main_page_slider]');
  if (!sliderElement) return;


  const evrideo_main_page_slider = new Swiper('.swiper[evrideo_main_page_slider]', {
    loop: true,
    centeredSlides: true,
    speed: prefersReducedMotion ? 0 : 500, // ⏱ אפס מהירות = transition מידי
    spaceBetween: 24,
    pagination: {
      el: '[swiper_pagination="evrideo_main_page_slider"]',
      clickable: true
    },

    navigation: {
      nextEl: '[swiper-custom-next-prev=next]',
      prevEl: '[swiper-custom-next-prev=prev]',
    }
  });

  const swiper_tabButtons = document.querySelectorAll(
    '[evrideo_main_page_slider] [swiper_tab_button]'
  );

  evrideo_main_page_slider.on('click', (swiper, event) => {
    // הסלייד שנלחץ
    const slide = swiper.clickedSlide;
    const index = swiper.clickedIndex;

    if (!slide) return;
    swiper.slideNext(); // או slideTo / slideToLoop
  });

  // click → slide
  swiper_tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      evrideo_main_page_slider.slideToLoop(index);
    });
  });

  // slide → active tab
  function setActiveTab(index) {
    swiper_tabButtons.forEach(btn => btn.classList.remove('is-active'));
    swiper_tabButtons[index]?.classList.add('is-active');
  }

  // init
  setActiveTab(evrideo_main_page_slider.realIndex);

  // on change
  evrideo_main_page_slider.on('slideChange', () => {
    setActiveTab(evrideo_main_page_slider.realIndex);
  });
}
