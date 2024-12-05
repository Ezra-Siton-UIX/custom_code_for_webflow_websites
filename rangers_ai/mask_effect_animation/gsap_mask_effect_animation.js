document.addEventListener("DOMContentLoaded", (event) => {

  if(window.location.pathname !== "/"){
    return; 
  }

  /* show random video */
  const all_videos = document.querySelectorAll('[video]');
  let video;
  if(all_videos.length > 1){
    const video_random_index = Math.floor(Math.random() * all_videos.length);
    video = all_videos[video_random_index];  
  }else{
    video = querySelector("[video]");
  }

  all_videos.forEach(this_video => {
    //this_video.style.display = "none";
    this_video.style.zIndex = "-1";
    this_video.querySelector("video").pause();
  });

  video.style.display = "block";
  video.style.zIndex = "1";


  // create
  let mm = gsap.matchMedia();
  const breakPoint = 991;
  const big_screen = 4000;
  var animation_trigger;

  addEventListener("resize", (event) => {
    console.log($( window ).width());

  });


  mm.add(
    {
      // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
      isDesktop: `(min-width: ${breakPoint}px)`,
      isBigScreen: `(min-width: ${big_screen}px)`,
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      // this setup code only runs when viewport is at least 800px wide

      let { isDesktop, isBigScreen, reduceMotion } = context.conditions;


      console.log(isBigScreen);

      animation_trigger = isBigScreen ? "trigger_for_big_screens" : "trigger_for_small_screens";


      if(isDesktop){ 

        const blend_mode_element_animation_triggers = gsap.utils.toArray(`[${animation_trigger}]`);

        blend_mode_element_animation_triggers.forEach((trigger, i) => {
          const moving_from_bottom_to_top_wrapper = trigger.querySelector(
            "[moving_from_bottom_to_top_wrapper]"
          );

          const layer_of_text = trigger.querySelector( "[layer_of_text]");

          const white_overlay = trigger.querySelector("[white_overlay]");


          const top_layer_with_blend_mode_and_white_bg = trigger.querySelector(
            "[top_layer]"
          );
          const bottom_image = trigger.querySelector("[bottom_image]");
          const first_item_show_after_animation_ends = trigger.querySelector(
            "[layer_of_text] [first]"
          );

          const second_item_show_after_animation_ends = trigger.querySelector(
            "[layer_of_text] [second]"
          );

          const scale_animation_element = trigger.querySelector(
            "[scale_animation_element]"
          );

          gsap.set(scale_animation_element, { opacity: 0 });
          gsap.set(moving_from_bottom_to_top_wrapper, { position: "absolute", opacity: 1 });
          gsap.set(white_overlay, { position: "absolute", zIndex: 2 });
          gsap.set(top_layer_with_blend_mode_and_white_bg, { position: "absolute", zIndex: 5 });
          gsap.set(layer_of_text, { position: "absolute", zIndex: 6 });




          let tl = gsap.timeline({
            // yes, we can add it to an entire timeline!
            scrollTrigger: {
              trigger: trigger,
              refreshPriority: 2,
              pinSpacing: true,
              pin: true, // pin the trigger element while active
              start: "top top", // when the center of the trigger hits the center of the viewport
              end: () => "+=" + trigger.offsetHeight * 2.5,
              scrub: 2, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            },
            defaults: {
              ease: "slow(0.7,0.7,true)",
            },
            onStart: function(){ video.querySelector("video").play(); },

          });

          const start_delay = 0;
          const delay_animation = 2;
          const animation_part_one_duration = isBigScreen ? 8 : 0; // mask
          const animation_part_two_duration = 8; // scale image
          const animation_part_three_duration = 2; // show text

          /* ANIMATION */

          /* 1 - the image reveal*/


          tl.from(
            moving_from_bottom_to_top_wrapper,
            {
              delay: delay_animation,
              y: isBigScreen ? "100%" : 0,
              duration: animation_part_one_duration,

            },
            start_delay
          );



          /* 1 - the image reveal*/
          tl.from(
            video,
            {
              delay: delay_animation,
              y: isBigScreen ? "-100%" : 0,
              duration: animation_part_one_duration,

            },
            start_delay
          ); 

          /* 2 - the image element (Change only for parallax effect) */
          tl.from(
            bottom_image,
            {
              delay: delay_animation,
              opacity: 1,
              y: "-100%",
              duration: animation_part_one_duration,
            },
            start_delay
          );



          /* 3 - the huge scale overlay */
          tl.to(
            scale_animation_element,
            { opacity: 1, duration: 0 },
            animation_part_one_duration + delay_animation + start_delay
          );

          tl.fromTo(
            scale_animation_element,
            { scale: 200, y: 0 },
            { 
              scale: 1.01, 
              duration: animation_part_two_duration,

            },
            animation_part_one_duration + delay_animation + start_delay
          );


          /* 4. The text when animation ends */
          tl.from(
            white_overlay,
            {
              opacity: 0,
              duration: animation_part_two_duration
            },
            (animation_part_one_duration + animation_part_two_duration + delay_animation + start_delay) 
          );        





          tl.from(
            first_item_show_after_animation_ends,
            {
              y: 40,
              opacity: 0,
              duration: animation_part_two_duration
            },
            (animation_part_one_duration + animation_part_two_duration + delay_animation + start_delay) * 1.05
          );

          tl.to(
            "[fix_bottom_border_bug_overlay]",
            {
              height: 3, 
              duration: 0
            },
            (animation_part_one_duration + animation_part_two_duration + delay_animation + start_delay) * 1.05
          );





        });
      }

    }); /* end match media */





});/* end DOMContentLoaded */
