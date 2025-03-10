export function event_when_wb_menu_is_open(){

  const navbar_white_logo = document.querySelector("[navbar_white_logo]");

  const observer = new MutationObserver(mutations => {
    // There could be one or more mutations so one way to access them is with a loop.
    mutations.forEach(record => {
      // In each iteration an individual mutation can be accessed.
      // In this case if the type of mutation is of attribute run the following block.
      // A mutation could have several types.

      // Stage ONE - "the menu start open"
      if(record.attributeName == 'class' && record.target.ariaExpanded == "false"){
        console.log("menu `start` open");
        run_when_webflow_menu_is_OPEN();
      }
      if(record.attributeName == 'class' && record.target.ariaExpanded == "true"){
        console.log("menu `start` close");
        run_when_webflow_menu_is_CLOSE();
      }

      // Stage Two - "the menu start opened"
      if(record.type === 'attributes') {
        const changedAttrName  = record.attributeName;
        const newValue = record.target.getAttribute(changedAttrName);

        if(changedAttrName == "aria-expanded" && newValue == "true"){
          console.log("menu is open");
          //run_when_webflow_menu_is_OPEN();

        }// end menu if open
        if(changedAttrName == "aria-expanded" && newValue == "false"){
          console.log("menu is close");

        }// end menu if close
      }
    });
  });


  // A list to be used as a target below.
  const webflow_menu_btn_status = document.querySelector(".w-nav-button");
  // This is the code that tells MutationObserver what to keep an eye on.
  // In this case it is the list targeted earlier and
  // it will only observe changes to attributes of the elements such as class, id or any other attribute.
  observer.observe(webflow_menu_btn_status, {
    attributes: true
  });

  // YOUR CUSTOM CODE

  // when open
  function run_when_webflow_menu_is_OPEN(){
    navbar_white_logo.style.opacity = 1;

    setTimeout(() => {
      // webflow_menu_btn_status.setAttribute("hamburger_open_color", "hamburger_open_color");
    }, 0);
  }

  // when close
  function run_when_webflow_menu_is_CLOSE(){
    navbar_white_logo.style.opacity = 0;

    setTimeout(() => {
      console.log("run when wb close")
      // webflow_menu_btn_status.removeAttribute("hamburger_open_color");

    }, 700);


  }


}