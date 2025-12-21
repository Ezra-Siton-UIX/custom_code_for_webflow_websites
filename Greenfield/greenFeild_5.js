/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */
/* added under webflow as CDN */

/**>>>>>>>>>> 1 of 13 <<<<<<<<<<**/
/* ### change url to url category param of all footer category links */

$("[category_footer_link]" ).each(function( index ) {
  let this_url = $( this ).attr("href");
  let this_text = $( this ).text();
  $(this).attr("href", `${this_url}?category=${this_text}`);
});

/* ### stop bubble linkedin ### */
$("[linkedin_btn]").click(function(event){
  event.stopPropagation();
});

/**>>>>>>>>>> 2 of 13 <<<<<<<<<<**/
/*### change url of company modal #### */

$("[company_url]" ).each(function( index ) {
  $( this ).attr("target", "_blank");
});

$("[careers_url]" ).each(function( index ) {
  $( this ).attr("target", "_blank");
});

/**>>>>>>>>>> 3 of 13 <<<<<<<<<<**/
/*### set the url on hidden form feild (To know the page the user send the form from) ###*/

const page_url = window.location.pathname;

$("input[page_url]" ).each(function( index ) {
  $( this ).val(page_url);
  $( this ).attr("type", "hidden");
});

/**>>>>>>>>>> 4 of 10 <<<<<<<<<<**/
/*### clean up the CMS url text (From https://hello.com to "hello.com") ##*/
$("[company_website_link]" ).each(function( index ) {
  let this_full_url = $( this ).text();
  this_full_url = this_full_url.replace(/^https?:\/\//, '');
  if(this_full_url.at(-1) == "/"){
    this_full_url = this_full_url.slice(0, -1);
  }
  $( this ).text(this_full_url);
});

/**>>>>>>>>>> 5 of 13 <<<<<<<<<<**/
/*#### Modal Form CTA modal radio button - add active class on click ####*/
$("[cta-radio_btn]").removeClass("active")

$("[cta-radio_btn]").click(function(){
  $("[cta-radio_btn]").removeClass("active")
  $(this).addClass("active")
});

/**>>>>>>>>>> 6 of 13 <<<<<<<<<<**/
/*#### CTA modal fancybox ####*/
Fancybox.bind("[cta][data-fancybox]", {
  // Your custom options
  closeButton: false,
  dragToClose: false,
  autoFocus: false,
  groupAll: false,
  groupAttr: false,
  hideScrollbar: true,

  on: {
    reveal: (fancybox, slide) => {
      // The content of this slide is loaded and ready to be revealed
      console.log("reveal cta");
      //lenis.stop()
      lenis.destroy()
    },
    close: (fancybox, slide) => {
      // The content of this slide is loaded and ready to be revealed
      console.log("close cta");
      //lenis.start()
      lenis.start()
    },
  },
});


/**>>>>>>>>>> 7 of 13 <<<<<<<<<<**/
/*### Fancybox Companies & team Modal ###*/

if($("[data-src][data-fancybox]").length > 0){

  /* pre step for both fancybox modals */
  $( "[data-src][data-fancybox]" ).each(function( index ) {
    const this_data_src =  $( this ).attr("data-src");
    const new_data_src = "#"+this_data_src;
    $( this ).attr("data-src", new_data_src);
  });

  Fancybox.bind("[companies] [data-fancybox]", {
    // Your custom options
    closeButton: false,
    dragToClose: false,
    autoFocus: false,
    groupAll: false,
    groupAttr: false,
    hideScrollbar: true,

    on: {
      reveal: (fancybox, slide) => {
        // The content of this slide is loaded and ready to be revealed
        //lenis.stop()
        const company_popup_image_overlay = slide.el.querySelector("[company_popup_image_overlay]");

        setTimeout(() => {
          company_popup_image_overlay.style.opacity = "0.4";
        }, 200);

        lenis.destroy();
      },
      close: (fancybox, slide) => {
        // The content of this slide is loaded and ready to be revealed
        //lenis.start()
        lenis.start()
      },
    },
  });

  /**>>>>>>>>>> 8 of 13 <<<<<<<<<<**/
  /*### Fancybox Team Modal ###*/

  /* pre step for both fancybox modals */
  $( "[data-src][data-fancybox][team_card]" ).each(function( index ) {
    /* set thumbnail */
    const img_url = $("[team_image]").eq(index).attr("src");
    $( this ).attr("data-thumb", img_url);
  });

  Fancybox.bind("[team] [data-fancybox]", {
    // Your custom options
    closeButton: false,
    autoFocus: false,
    groupAll: true,
    hideScrollbar: true,

    Thumbs: {
      type: "classic",
    },
    on: {
      reveal: (fancybox, slide) => {
        // The content of this slide is loaded and ready to be revealed
        console.log("reveal");
        lenis.destroy()
      },
      close: (fancybox, slide) => {
        // The content of this slide is loaded and ready to be revealed
        console.log("close");
        lenis.start()
      },
    },
  });
}



/*#### add active class to card on scroll - 0 of 5
        if(window.location.pathname == "/"){
          $( "[company_card]" ).each(function( index ) {
            var inview = new Waypoint.Inview({
              element: $("[company_card]")[index],
              enter: function(direction) {


              },
              entered: function(direction) {
                $("[company_card]").removeClass("is_active");
                $(this.element).addClass("is_active");
              },
              exit: function(direction) {

              },
              exited: function(direction) {
                $(this.element).removeClass("is_active");

              },
              offset: '60%'
            })

            });
        }
         ####*/

/**>>>>>>>>>> 9 of 10 <<<<<<<<<<**/
/*### Navbar Animation on srcoll ###*/

/* check if navbar exists (to avoid js console errors) */
let exists = $( "[navbar]" ).length ? true : false;


$(function(){
  var lastScrollTop = 0, delta = 5;
  $(window).scroll(function(){

    if(exists && $(window).scrollTop() > 120) {
      $("[navbar]").addClass("active");

    } else if(exists) {
      /* remove active class */
      $("[navbar]").removeClass("active");
    }


    if(exists && $(window).scrollTop() > 120) {
      var nowScrollTop = $(this).scrollTop();
      if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
        if (nowScrollTop > lastScrollTop){
          // ACTION ON
          // SCROLLING DOWN 
          $("[navbar]").css("transform", "translate3d(0px, -110%, 0px");

        } else {
          // ACTION ON
          // SCROLLING UP 
          $("[navbar]").css("transform", "translate3d(0px, 0%, 0px");
        }
        lastScrollTop = nowScrollTop;
      }

    }
  });
});


/**>>>>>>>>>> 10 of 13 <<<<<<<<<<**/
/*### Diagram Desktop hover Setting // Mobile Swiper Diagram  ###*/

/* Part 10.1 - show modals on hover */
$( "[diagram_modal_overlay]" ).css("transform", `translateY(40px)`);

$( "[diagram_col]" ).hover(
  function() {/* hover in */
    const this_col_index = $( this ).attr("diagram_col");

    $( "[diagram_modal_overlay]" ).eq(this_col_index).css("transform", `translateY(0px)`);
    $( "[diagram_modal_overlay]" ).eq(this_col_index).css("opacity", 1);

  }, function() {/* hover out */
    const this_col_index = $( this ).attr("diagram_col");

    $( "[diagram_modal_overlay]" ).eq(this_col_index).css("transform", `translateY(40px)`);
    $( "[diagram_modal_overlay]" ).eq(this_col_index).css("opacity", 0);

  }
);

const is_swiper_diagram_stages_slider = $(".swiper[diagram_stages_slider]").length > 0;

/* Part 10.2 - Diagram Mobile Slider */

const diagram_content_slider_options = {
  // Optional parameters
  centeredSlides: true,
  slideToClickedSlide: true,
  loop: false,
  spaceBetween: 32,
  centeredSlides: true,
  slideToClickedSlide: true,

  breakpoints: {
    // when window width is >= 640px
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
      freeMode: true
    },
    700: {
      slidesPerView: 1,
      spaceBetween: 40
    },
  },

  // If we need pagination
  pagination: {
    el: contentEl.querySelector('.swiper-pagination'),
    clickable: true
  },
};

/* Part 10.3 - Diagram Mobile Navbar Slider */

const diagram_navbar_slider_options = {
  // Optional parameters
  loop: false,
  spaceBetween: 42,
  centeredSlides: true,
  slideToClickedSlide: true,

  breakpoints: {
    // when window width is >= 640px
    0: {
      slidesPerView: "auto",
      spaceBetween: 16,
      freeMode: true
    },
    700: {
      slidesPerView: "auto",

      spaceBetween: 60
    },
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
};

if(is_swiper_diagram_stages_slider){
  const swiper_diagram_stages_slider_content = new Swiper('.swiper[diagram_stages_slider=content]', diagram_content_slider_options);
  const swiper_diagram_stages_slider_navbar = new Swiper('.swiper[diagram_stages_slider=navbar]', diagram_navbar_slider_options);

  swiper_diagram_stages_slider_content.controller.control = swiper_diagram_stages_slider_navbar;
  swiper_diagram_stages_slider_navbar.controller.control = swiper_diagram_stages_slider_content;

}/* end if */

/* ######################################## */

/**>>>>>>>>>> 11 of 13 <<<<<<<<<<**/
/*### swiper_hero_logos  ###*/

const is_swiper_hero_logos = $(".swiper[hero_logos]").length > 0;

if(is_swiper_hero_logos){
  const swiper_hero_logos = new Swiper('.swiper[hero_logos]', {
    // Optional parameters

    loop: true,

    spaceBetween: 42,
    centeredSlides: true,
    slideToClickedSlide: true,

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false
    },

    a11y: {
      slideRole: 'listitem',
      containerMessage: "Greenfield Companies",
      containerRole: "list 2",
      itemRoleDescriptionMessage: "Company Item"
    },

    breakpoints: {
      // when window width is >= 640px
      0: {
        slidesPerView: "auto",
        spaceBetween: 10,
        freeMode: true
      },
      700: {
        slidesPerView: "auto",
        spaceBetween: 60
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });/* end swiper intiliaze */

  swiper_hero_logos.on('init', function () {
    $("[opacity_0_on_load]").css("opacity", 1);
  });

  const slide_to_where = document.documentElement.clientWidth > 900 ? 4 : 3; 


  setTimeout(function() {
    swiper_hero_logos.slideTo(slide_to_where, 400);
  }, 500);

}/* end if */



/**>>>>>>>>>> 12 of 13 <<<<<<<<<<**/
/** Random the companies cards fade in / out under Homepage **/

if(window.location.pathname == "/"){


  const cards = $("[shuffle_grid] [card]");
  const slice_by = 4; /* how many item to show */
  const fade_in = 1000;
  const fade_out = 1000;
  const delay = 2000;

  $(`[shuffle_grid] [card]:nth-child(n+${slice_by + 1 })`).css("display", "block")
  $(`[shuffle_grid] [card]:nth-child(n+${slice_by + 1 })`).css("opacity", "1")

  cards.fadeOut(0);

  let all_companies_array = [];
  cards.each(function( index ) {
    all_companies_array.push(index.toString());
  });

  const scrambled_on_load = all_companies_array.sort(() => Math.random() - 0.5);
  var items_to_remove = scrambled_on_load.slice(0, slice_by);
  getRandomFoods(4, items_to_remove);

  function getRandomFoods(count, items_to_remove) {
    // Scrambling the array
    const scrambled = all_companies_array.sort(() => Math.random() - 0.5);

    var newList = scrambled.filter(function(word){
      return !items_to_remove.includes(word);
    })

    const newList_slice = newList.slice(0, slice_by);

    for (let i = 0; i < slice_by; i++) { 
      cards.eq(newList_slice[i]).fadeIn(fade_in).delay(delay).fadeOut(fade_out).promise().done(
        function(){
          if(i == slice_by - 1){
            getRandomFoods(slice_by, items_to_remove);
          }
        })}/* end for loop */

    items_to_remove = newList_slice;
  }

}/* end if homepage */


/**>>>>>>>>>> 13 of 13 <<<<<<<<<<**/
/*#### Marquee_cms_item #######*/

const marquee_cms_items = $("[marquee_cms_item]");
const insert_items_here_marquee__group = $("[marquee__group]");
const feature_bagde_wrapper = $("[feature_bagde_wrapper]"); /* item under webflow */
const marquee__group_parent = $("[marquee__group_parent]");

/* 
                      marquee__group_parent
                        marquee__group
                         feature_bagde_wrapper
                           feature_badge
                            feature_badge_logo
                      */      

marquee_cms_items.each(function( index ) {
  const this_marquee_cms_item_img_src = $( this ).attr("company_image_src");
  const this_marquee_cms_item_alt = $( this ).attr("company_image_alt");
  var $clone = feature_bagde_wrapper.eq(0).clone();
  $clone.find("[feature_badge_logo]").attr("src", this_marquee_cms_item_img_src);
  $clone.find("[feature_badge_logo]").attr("alt", this_marquee_cms_item_alt);

  $clone.appendTo(insert_items_here_marquee__group);
  feature_bagde_wrapper.eq(0).remove();

});
$("[opacity_0_on_load]").css("opacity", 1)

const clone = $("[marquee__group]").clone();
marquee__group_parent.append(clone);

$(".marquee__group").css("animation", "scroll-x 100s linear infinite");
$(".marquee__group").css("margin-left", "16px");
