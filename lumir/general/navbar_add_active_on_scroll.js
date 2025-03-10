export function navbar_add_active_on_scroll(){
  /* check if navbar exists (to avoid js console errors) */
  let exists = $( "[navbar]" ).length ? true : false;
  /* if user scroll add active class */
  $(window).on("scroll", function() {
    if(exists && $(window).scrollTop() > 50) {
      $("[navbar]").addClass("active");
      //$("[navbar]").css("background", "rgba(255, 255, 255, 1)");
    } else if(exists) {
      /* remove active class */
      $("[navbar]").removeClass("active");
      //$("[navbar]").css("background", "transparent");
    }
  });
}

