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


/*### change url of company modal #### */

$("[company_url]" ).each(function( index ) {
  $( this ).attr("target", "_blank");
});

$("[careers_url]" ).each(function( index ) {
  $( this ).attr("target", "_blank");
});

/*### set the url on hidden form feild (To know the page the user send the form from) ###*/

const page_url = window.location.pathname;

$("input[page_url]" ).each(function( index ) {
  $( this ).val(page_url);
  $( this ).attr("type", "hidden");
});


$("[company_website_link]" ).each(function( index ) {
  let this_full_url = $( this ).text();
  this_full_url = this_full_url.replace(/^https?:\/\//, '');
  if(this_full_url.at(-1) == "/"){
    this_full_url = this_full_url.slice(0, -1);
    console.log(this_full_url);
  }
  $( this ).text(this_full_url);
});


/*#### 0 of 6 CTA modal radio button - add active class on click ####*/
$("[cta-radio_btn]").removeClass("active")

$("[cta-radio_btn]").click(function(){
  $("[cta-radio_btn]").removeClass("active")
  $(this).addClass("active")
});

/*#### 0 of 6 CTA modal fancybox ####*/
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

/*#### 0 of 6 ####*/

if($("[data-src][data-fancybox]").length > 0){

  $( "[data-src][data-fancybox]" ).each(function( index ) {
    const this_data_src =  $( this ).attr("data-src");
    const new_data_src = "#"+this_data_src;
    $( this ).attr("data-src", new_data_src);

    /* set thumbnail */
    const img_url = $("[team_image]").eq(index).attr("src");
    $( this ).attr("data-thumb", img_url);
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
        console.log("reveal companies");
        //lenis.stop()
        const company_popup_image_overlay = slide.el.querySelector("[company_popup_image_overlay]");

        setTimeout(() => {
          company_popup_image_overlay.style.opacity = "0.4";
        }, 200);


        lenis.destroy();


      },
      close: (fancybox, slide) => {
        // The content of this slide is loaded and ready to be revealed
        console.log("close companies");
        //lenis.start()
        lenis.start()
      },
    },
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



/*#### 0 of 5 ####*/
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



/*#### 0 of 5 ####*/
if(document.querySelector("[navbar]") !== null){
  const navbar_height = document.querySelector("[navbar]").clientHeight;
  if(document.querySelector("[hero_section]") !== null){
    // document.querySelector("[hero_section]").style.setProperty('min-height', `calc(100svh - ${navbar_height}px)`);
  }
}



/*#### 0 of 4 navbar sticky trick ####*/
/* NAVBAR ANIMATION */
/* check if navbar exists (to avoid js console errors) */
let exists = $( "[navbar]" ).length ? true : false;
/* if user scroll add active class */
$(window).on("scroll", function() {

});

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


/*#### 1 of 3 - swiper_hero_logos #######*/
/* show modals on hover */
//$("[diagram_modal_overlay]").hide();
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
    el: '.swiper-pagination',
    clickable: true
  },
};


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

/*#### 2 of 3 - swiper_hero_logos #######*/
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

/* ######################################## */

/*#### 2 of 3 - marquee_cms_item #######*/

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


