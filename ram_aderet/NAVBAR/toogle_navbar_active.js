gsap.registerPlugin(ScrollTrigger, SplitText);

export function toogle_navbar_active(lenis){

  /* check if navbar exists (to avoid js console errors) */
  let exists = $( "[navbar]" ).length ? true : false;

  const pixel_to_scroll_before_active_added = 120;

  // Mutation Observer requires a a new instance to be set.
  // A function if passed as an argument to understand what to do with any detected mutations.
  const observer = new MutationObserver(mutations => {
    // There could be one or more mutations so one way to access them is with a loop.
    mutations.forEach(record => {
      // In each iteration an individual mutation can be accessed.
      // In this case if the type of mutation is of attribute run the following block.
      // A mutation could have several types.
      //console.log(record);

      if(record.type === 'attributes') {
        const changedAttrName  = record.attributeName;
        const newValue = record.target.getAttribute(changedAttrName);

        if(changedAttrName == "aria-expanded" && newValue == "true" && $(window).scrollTop() < 2){
          $("[navbar]").addClass("active");
          // When the popup opens
          //document.body.style.overflow = 'hidden';
          //lenis.stop()
        }

        if(changedAttrName == "aria-expanded" && newValue == "false" && $(window).scrollTop() < 2){
          //console.log("the menu is close");
          /* remove active class */
          $("[navbar]").removeClass("active");
          // When the popup closes
          //document.body.style.overflow = 'auto'; // Or 'scroll' depending on desired behavior
          //lenis.start()

        }
      }
    });
  });


  // A list to be used as a target below.
  const my_element = document.querySelector("[navbar] [navbar_hamburger]");
  // This is the code that tells MutationObserver what to keep an eye on.
  // In this case it is the list targeted earlier and
  // it will only observe changes to attributes of the elements such as class, id or any other attribute.

  if(my_element !== null){
    observer.observe(my_element, {
      attributes: true
    });
  }



  // dedect if dropdown open 

  // Select all .w-dropdown elements
  document.querySelectorAll('[navbar] .w-dropdown .w-dropdown-toggle').forEach(function(dropdown) {
    // Create a MutationObserver to watch for attribute changes
    const observer = new MutationObserver(function(mutationsList) {
      mutationsList.forEach(function(mutation) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'aria-expanded'
        ) {
          const value = dropdown.getAttribute('aria-expanded');
          if (value === 'true') {
            //console.log('open');
            if($(window).scrollTop() < pixel_to_scroll_before_active_added){
              $("[navbar]").addClass("active");
            }

          } else if (value === 'false') {
            //console.log('close');
            if($(window).scrollTop() < pixel_to_scroll_before_active_added){
              $("[navbar]").removeClass("active");
            }
          }
        }
      });
    });

    // Configure the observer to watch for attribute changes
    observer.observe(dropdown, {
      attributes: true,
      attributeFilter: ['aria-expanded']
    });
  });


  // scroll to top;

  var lastScrollTop = 0, delta = 5;

  $(window).scroll(function(){

    if(exists && $(window).scrollTop() > pixel_to_scroll_before_active_added) {
      $("[navbar]").addClass("active");
    } else if(exists) {
      /* remove active class */
      $("[navbar]").removeClass("active");
    }


    if(exists && $(window).scrollTop() > pixel_to_scroll_before_active_added) {
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

    };


  });

}