
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  if(window.location.pathname == "/"){
    VANTA.NET({
      el: "#your-element-selector",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 55.00,
      minWidth: 100.00,
      scale: 1,
      scaleMobile: 1.00,
      color: 0xffffff,
      backgroundColor: 0x0,
      maxDistance: 0.00,
      spacing: 20.00
    })
  }








  /* fit height of div for the height of sticky navbar 
  if($("[spacer_for_sticky_navbar]").length > 0){
    const sticky_height = document.querySelector("[inner_navbar]").getBoundingClientRect().bottom;
    console.log(sticky_height);
  }
  */

  // Mutation Observer requires a a new instance to be set.
  // A function if passed as an argument to understand what to do with any detected mutations.


  const observer = new MutationObserver(mutations => {
    // There could be one or more mutations so one way to access them is with a loop.
    mutations.forEach(record => {
      // In each iteration an individual mutation can be accessed.

      // In this case if the type of mutation is of attribute run the following block.
      // A mutation could have several types.
      if(record.type === 'attributes') {
        const changedAttrName  = record.attributeName;
        const newValue = record.target.getAttribute(changedAttrName);

        if(changedAttrName == "aria-expanded" && newValue == "true"){
          console.log("the menu is open");

          // $("[navbar] [inner_navbar]").css("border-radius", "16px 16px 0px 0px");

          lenis.stop()
          $("body").css("overflow", "hidden");
          $("[navbar_overlay]").css("opacity", 1);
          $("[navbar_overlay]").css("zIndex", 100);
          $("[navbar_overlay]").css("height", "0%");
          $("[navbar_overlay]").css("position", "fixed")





          gsap.to(
            "[navbar_overlay]",
            {
              height: "100%",
              ease: "slow(0.7,0.7,false)",
              duration: 0.8,
            }, 
          )

          gsap.from(
            "[data-nav-menu-open] [nav_item]",
            {
              opacity: 0,
              delay: 0.05,
              y: 50,
              ease: "slow(0.7,0.7,false)",
              stagger: 0.10
            },

          )


        }

        if(changedAttrName == "aria-expanded" && newValue == "false"){
          console.log("the menu is close");

          //  $("[navbar] [inner_navbar]").css("border-radius", "16px 16px 16px 16px");


          lenis.start()
          $("body").css("overflow", "auto");

          $("[navbar_overlay]").css("opacity", 0);
          $("[navbar_overlay]").css("zIndex", -1);
          $("[navbar_overlay]").css("height", 0);




        }
      }
    });
  });

  // A list to be used as a target below.
  const my_element = document.querySelector("[navbar] .menu-button");
  // This is the code that tells MutationObserver what to keep an eye on.
  // In this case it is the list targeted earlier and
  // it will only observe changes to attributes of the elements such as class, id or any other attribute.
  observer.observe(my_element, {
    attributes: true
  });




  /* NAVBAR ANIMATION */
  /* check if navbar exists (to avoid js console errors) */
  let exists = $( "[navbar]" ).length ? true : false;
  /* if user scroll add active class */
  $(window).on("scroll", function() {

  });

  $(function(){
    var lastScrollTop = 0, delta = 5;
    $(window).scroll(function(){



      if(exists && $(window).scrollTop() > 70) {
        $("[navbar]").addClass("active");

        -100
      } else if(exists) {
        /* remove active class */
        $("[navbar]").removeClass("active");
      }


      if(exists && $(window).scrollTop() > 70) {
        var nowScrollTop = $(this).scrollTop();
        if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
          if (nowScrollTop > lastScrollTop){
            // ACTION ON
            // SCROLLING DOWN 
            $("[navbar]").css("transform", "translate3d(0px, -200%, 0px");


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



  /* ################# Fancybox ################# */
  let on_first_time_modal_shows = true;
  let wistia_api_url = "//fast.wistia.net/assets/external/E-v1.js";

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
    closeButton: false,
    autoFocus: false,
    groupAttr: false,
    on: {
      reveal: (fancybox, slide) => {
        // The content of this slide is loaded and ready to be revealed
        console.log("reveal");

        if(on_first_time_modal_shows){
          let myScript = document.createElement("script");
          myScript.setAttribute("src", wistia_api_url);
          document.body.appendChild(myScript);
        }

        on_first_time_modal_shows = false;

        lenis.destroy()
      },
      close: (fancybox, slide) => {
        // The content of this slide is loaded and ready to be revealed
        console.log("close");
        lenis.start()
      },
    },
  });



  /* ################# form Show Other button on Click ################# */

  /* POPUP FORM */
  $client_type_radio = $("[client_type_radio]");
  $other_hidden_feild = $("[other_hidden_feild]");
  $other_hidden_feild.hide();


  $client_type_radio.change(function() {
    let value = $(this).find(".w-form-label").text();
    console.log("value", value);

    if(value == "Other" || value == "other"){
      $other_hidden_feild.show();
    }else{
      $other_hidden_feild.hide();
    }
  });

  /* contact us FORM */
  $client_type_select_menu = $("[client_type_select]");
  $other_select_menu_feild = $("[other_select_menu]");
  $other_select_menu_feild.hide();




  $client_type_select_menu.on('change', function() {

    let value = this.value;
    console.log("value", value);

    if(value == "Other" || value == "other"){
      $other_select_menu_feild.show();
    }else{
      $other_select_menu_feild.hide();
    }
  });

  /* ################## SWIPER ################## */
  const $swiper_solution_node = document.querySelector("[solution_swiper]");
  const $swiper_testimonials_node = document.querySelector("[testimonials]");

  if($swiper_solution_node !== null || $swiper_testimonials_node !== null){

    function load_swiper_libary(){
      $.ajax({ 
        url: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', 
        dataType: 'text', 
        cache: true,
        success: function(css) { 
          $('<style>').html(css).appendTo('head'); 
        } 
      }); 


      jQuery.ajax({
        url: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
        dataType: "script",
        cache: true
      }).done(function() {
        load_solution_swiper();
      });
    }

    load_swiper_libary();

    function load_solution_swiper(){
      const solution_swiper = new Swiper('[solution_swiper]', {
        // Optional parameters
        loop: true,
        slideToClickedSlide: true,
        centeredSlides: true,
        centeredSlidesBounds: false,


        breakpoints: {
          // when window width is >= 640px
          0: {
            slidesPerView: 1.2,
            spaceBetween: 10
          },
          700: {
            slidesPerView: 2.2,
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

      // swiper - match the height of the slides */
      var swiper_text_boxes = document.querySelectorAll('[swiper_text_box]');
      var allDivsHeight = [];
      for (i = 0; i < swiper_text_boxes.length; i++) {
        allDivsHeight.push(swiper_text_boxes[i].offsetHeight);
      }
      console.log(allDivsHeight);//just for debugging
      const the_tallest_slide = Math.max(...allDivsHeight);

      for (i = 0; i < swiper_text_boxes.length; i++) {
        swiper_text_boxes[i].style.minHeight = `${the_tallest_slide}px`;
      }

      /* swiper testomonials */
      const swiper_testimonials = new Swiper('.swiper[testimonials]', {
        loop: true,
        pagination: {
          el: '[swiper_testimonials_pagination]',
          clickable: true
        },
        navigation: {
          nextEl: '[custom_testimonials_next]',
          prevEl: '[custom_testimonials_prev]',
        },
      });
      
    }/* end load swiper function */
  }

});/* DOMContentLoaded */

