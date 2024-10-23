document.addEventListener("DOMContentLoaded", (event) => {

  // create
  let mm = gsap.matchMedia();
  const breakPoint = 800;

  mm.add(
    {
      // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
      let { isDesktop, isMobile } = context.conditions;

      const parallax_triggers = gsap.utils.toArray("[trigger_box]");
      parallax_triggers.forEach((parallax_trigger, i) => {


        let from_x = parallax_trigger.getAttribute("from_x");
        let from_y = parallax_trigger.getAttribute("from_y");
        let from_right_top = parallax_trigger.getAttribute("from_right_top");
        let from_left_top = parallax_trigger.getAttribute("from_left_top");
        let start = parallax_trigger.getAttribute("start");
        let refreshPriority = parallax_trigger.getAttribute("refreshPriority");
        const from_y_deafult_value = 100;

        if(refreshPriority == null){
          refreshPriority = 1;
        }

        let delay = parallax_trigger.getAttribute("delay");

        if(delay == null || delay == ""){
          delay = 0;
        }


        if(from_y == null || from_y == ""){
          from_y = from_y_deafult_value;
        }

        if(from_x == null || from_x == ""){
          from_x = 0;
        }

        if(from_right_top !== null && from_right_top !== "from_right_top"){
          from_x = from_right_top;
          from_y = from_right_top;
        }

        if(from_right_top == "from_right_top"){
          from_x = from_y_deafult_value;
          from_y = from_y_deafult_value;
        }

        if(from_left_top !== null && from_left_top !== "from_left_top"){
          from_x = -from_left_top;
          from_y = from_left_top;
        }

        if(from_left_top == "from_left_top"){
          from_x = -from_y_deafult_value;
          from_y = from_y_deafult_value;
        }

        if(start == null){
          start = "-93% 100%"; //      start = "-95% 100%";
        }

        // var parallax_section = parallax_trigger.querySelector("[parallax_section]");
        //var image = parallax_trigger.querySelector("img");
        //var second_section = parallax_trigger.querySelector("[second_section]");
        let tl_enter_animation = gsap.timeline({
          // yes, we can add it to an entire timeline!
          scrollTrigger: {
            trigger: parallax_trigger,
            pinSpacing: false,
            refreshPriority: refreshPriority,
            markers: false,
            pin: false, // pin the trigger element while active
            start: start, // when the center of the trigger hits the center of the viewport
            end: "center 94%",
            scrub: isDesktop ? 3 : 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
          },
          defaults: {
            ease: "slow(0.7,0.7,false)",
          },
        });


        /* ANIMATION */
        tl_enter_animation.from(
          parallax_trigger,
          {
            opacity: isDesktop ? 0 : 1,
            y: isDesktop ? Number(from_y) : 50,
            x: isDesktop ? Number(from_x) : 0,
            delay: delay
          }
        )
      });/* end for each */





    }); /* end match media */


});/* end DOMContentLoaded */




