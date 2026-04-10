
export function scale_image_mask(){

  const scale_image_on_scroll_triggers = gsap.utils.toArray(
    "[scale_image_on_scroll_trigger]"
  );

  if(scale_image_on_scroll_triggers.length > 0){
    // matchMedia
    let mm = gsap.matchMedia(),
        breakPoint = 991;

    mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        let { isDesktop, isMobile, reduceMotion } = context.conditions;

        const ease = "power2.inOut";
        const duration = reduceMotion ? 0 : 2;
        const inset_from = isDesktop ? "inset(100px 300px round 16px)" : "inset(50px 50px round 16px)";
        const start = isDesktop ? "center center" : "center center";
        const pin = isDesktop ? true : true;
        const scrub = isDesktop ? 4 : 2;
        const end_muliplier = isDesktop ? 1.4 : 1;

        // disable on mobile
        if(!isDesktop)return;

        scale_image_on_scroll_triggers.forEach((scale_image_on_scroll_trigger, i) => {
          gsap.set(scale_image_on_scroll_trigger, {"overflow":"hidden"})

          const $parallax_section =
                scale_image_on_scroll_trigger.querySelector("[parallax_section]");
          const $image = scale_image_on_scroll_trigger.querySelector("[card_bg_image]");
          const $banner_gradient_overlay = scale_image_on_scroll_trigger.querySelector("[banner_gradient_overlay]");   
          const $enter_when_scale_end = scale_image_on_scroll_trigger.querySelector("[enter_when_scale_end]");

          let tl = gsap.timeline({
            // yes, we can add it to an entire timeline!
            scrollTrigger: {
              trigger: scale_image_on_scroll_trigger,
              pinSpacing: true,
              pin: pin, // pin the trigger element while active
              start: start, // when the center of the trigger hits the center of the viewport
              end: () => "+=" + scale_image_on_scroll_trigger.offsetHeight * end_muliplier,
              scrub: scrub, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
              snap: {
                snapTo: [0, 1],
                directional: true,
                inertia: true,
                duration: { min: 0.2, max: 0.4 },
                delay: 0
              },
            },
            defaults: {
              ease: ease,
            },
          });


          $("[data-w-tab]").click(function() {

            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 200);// <- This time is in milliseconds 

          });


          /* ANIMATION */

          // 1
          tl.from(
            $parallax_section,
            {
              clipPath: inset_from,/* top/bottom left/right */
              duration: 1
            },
            "Start"
          );

          // 2
          tl.to(
            $image,
            {
              opacity: 1,
              scale: 1.6,
              duration: 2
            },
            "Start"
          );

          // 2
          tl.from(
            $banner_gradient_overlay,
            {
              opacity: 0,
              duration: 1
            },
            0.3
          );

          // 3
          tl.from(
            $enter_when_scale_end,
            {
              y: "100%",
              duration: 2
            },
            0.3
          );

          tl.to(
            $enter_when_scale_end,
            {
              x: 0,
              duration: 1
            }
          );
        });// end gsap.timeline

        return () => {
          // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
          // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
        };
      }
    );

  }// end if













}