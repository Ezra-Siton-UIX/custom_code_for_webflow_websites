
import  { enterAnimation } from './barba_js/enterAnimation.js';
import  { leaveAnimation } from './barba_js/leaveAnimation.js';

export function load_barba(){

  $("[nav_menu] a").click(function(){
    $("[menu-button]").click();
  });

  barba.init({
    debug: true,
    transitions: [
      {
        sync: false,
        leave: ({ current }) =>leaveAnimation(current.container),
        once: ({ next }) => enterAnimation(next.container),
        enter: ({ next }) => enterAnimation(next.container)
      }
    ]
  });

  barba.hooks.once((data) => {
    console.log("once")

    
  });

  barba.hooks.after((data) => {
    console.log("afteeeeeeeeeer")

  });

  barba.hooks.enter((data) => {
    window.scrollTo(0, 0);

    // create your stunning leave animation here
    console.log('enter');
    Webflow.destroy();
    Webflow.ready();
    Webflow.require('ix2').init();

    //scrollSmoother_init();
  });
}








