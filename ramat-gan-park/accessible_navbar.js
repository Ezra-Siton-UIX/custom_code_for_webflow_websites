/* as cdn under github */

/* ## OPEN MODAL V3 ## */
/*
                  1. set close button by close_modal attribute (the same for open)
                  2. add focus_inside_modal attribute for the item you want to be on focus when the modal open
                  3. add data-attribute for the filter-btn
                  4. add role=dialog and aria-modal=true
                  5. aria-labelledby add id for the modal title
                  */

var is_en = false;
if(window.location.href.match("/en/") || window.location.href == "https://www.nesher.co.il/en" || window.location.href == "https://nesheril.webflow.io/en"){
  is_en = true;
}
const set_title = false; /* set title by custom js */
let open_menu_txt = "פתיחת תפריט ראשי";
let close_menu_txt = "סגירת תפריט ראשי";

if(is_en){
  open_menu_txt = "Open Navbar Menu";
  close_menu_txt = "Close Navbar Menu";
}

/* ############## 1 of 5 - SET THIS on webflow ##############*/

/* 1 of 4 - add data attribute for the open model btn + {value}  for example [open_menu_btn=my_popup] */
const open_menu_btns = document.querySelectorAll("[open_menu_btn]"); /* the button open the modal */
if(open_menu_btns.length == 0){console.error("add [open_menu_btn] to the open modal item");}
/* 2 of 4- the entire modal  + {value} for example [modal_wrapper=my_popup] */
const modal_wrappers = document.querySelectorAll("[modal_wrapper]"); /* include the entire modal (overlay and so on) */
if(modal_wrappers.length == 0){console.error("add [modal_wrappers] to the modal wrapper div");}
/* 3 of 4 - set the focus trap area div */
const focus_this_when_modal_open_items = document.querySelectorAll("[focus_this_when_modal_open]");
if(focus_this_when_modal_open_items.length == 0){console.error("add [focus_this_when_modal_open_items] to the div get focus");}
/* 4 */
const close_buttons_by_click_elements_inside_modal = document.querySelectorAll("[modal_wrapper] [close_button_by_click_element]"); /* overlay_area */
if(close_buttons_by_click_elements_inside_modal.length == 0){console.error("add [close_buttons_by_click_elements_inside_modal] to the overlay to close the menu");}


/* ############## 2 of 5 - Pre settings ##############*/
/* focusable only by code */
focus_this_when_modal_open_items.forEach((focus_this_when_modal_open_item, i) => {
  focus_this_when_modal_open_item.setAttribute("tabindex","-1");
  focus_this_when_modal_open_item.setAttribute("style","outline: none");
});


modal_wrappers.forEach((modal_wrapper) => {
  modal_wrapper.addEventListener('keydown', handleKey);
});

document.addEventListener('keydown', close_menu_when_click_esc);


/* ############## 3.1 of 6 - Close menu addEventListener ##############*/
close_buttons_by_click_elements_inside_modal.forEach((close_button_by_click_elements_inside_modal, i) => {
  close_button_by_click_elements_inside_modal.setAttribute("tabindex","-1");
  close_button_by_click_elements_inside_modal.addEventListener("click", function (e) {
    // close modal here ==> "how" - on webflow interaction the menu close on second click (and the menu is open) */
    const the_name_of_the_btn_that_open_the_modal = this.closest("[modal_wrapper]").getAttribute("modal_wrapper");
      document.querySelector(`[open_menu_btn=${the_name_of_the_btn_that_open_the_modal}`).click();
  });
});


/* ############## 3.2 of 5 - Open_menu_btns addEventListener ##############*/
open_menu_btns.forEach((open_menu_btn, i) => {
  var isOpen = false;
  /* do only one time */
  open_menu_btn.setAttribute("role","button");
  /* change later on each click */
  open_menu_btn.setAttribute("aria-label",open_menu_txt);
  open_menu_btn.setAttribute("aria-expanded","false");
  if(set_title)open_menu_btn.setAttribute("title",close_menu_txt);

  /* click event */
  open_menu_btn.addEventListener("click", function (e) {

    /* ON CLICK ON BTN ONE CLOSE THE SECOND MENU */
    /* שימושי במקרים נדירים שיש תפריט עליון עם שתי פופאפים */
    /* יש פה ריסק לרקורסיה כי כדי לסגור את התפריט צריך ללחוץ על הכפתור */
    const this_button_open_witch_video = open_menu_btn.getAttribute("open_menu_btn");
    const the_other_menu_open_btn_item = document.querySelector(`[open_menu_btn][aria-expanded=true]:not([open_menu_btn="${this_button_open_witch_video}"])`);
    if(the_other_menu_open_btn_item !== null){
      console.log("the_other_menu_open_btn_item", the_other_menu_open_btn_item);
      the_other_menu_open_btn_item.click();
    }/*end /* ON CLICK ON BTN ONE CLOSE THE SECOND MENU */
    /* this button */
    e.preventDefault();
    open_menu_btn.blur();
    //console.log("open_modals_btn clicked");
    isOpen = !isOpen;
    toggle_navbar_states(this, isOpen);
  });

});


/* ############## 3.3 of 5 - Toggle States Function ##############*/
function toggle_navbar_states(open_menu_btn, isOpen){
  console.log("toggle", "isOpen", isOpen);
  const which_modal_this_btn_control_of = open_menu_btn.getAttribute("open_menu_btn");
  /* toggle the modal this btn control of */
  const $the_modal_connect_to_this_button = document.querySelector(`[modal_wrapper=${which_modal_this_btn_control_of}]`);

  document.querySelectorAll(`[open_menu_btn="${which_modal_this_btn_control_of}"]`).forEach((open_modals_btn) => {
    // set_aria_expanded(open_modals_btn, !isOpen);
  });

  set_aria_expanded(open_menu_btn, isOpen);
  $the_modal_connect_to_this_button.setAttribute("aria-hidden",!isOpen);

  /* when open only */
  if(isOpen){
    console.log("isOpen");
    /* tab trap */
    $the_modal_connect_to_this_button.addEventListener('keydown', handleKey);
    setTimeout(() => {
      $the_modal_connect_to_this_button.querySelector("[focus_this_when_modal_open]").focus();
    }, 100); /* bug - focus not working without timer (some conflict with webflow interactions) */
    open_menu_btn.setAttribute("aria-label",close_menu_txt);
    if(set_title)open_menu_btn.setAttribute("title",close_menu_txt);
  }
  /* when close only */
  if(!isOpen){
    console.log("isClose");
    $the_modal_connect_to_this_button.removeEventListener('keydown', handleKey);
    open_menu_btn.setAttribute("aria-label",open_menu_txt);
    if(set_title)open_menu_btn.setAttribute("title",open_menu_txt);
    open_menu_btn.focus();
  }
}

/* ############## 4 of 5 - Tab Trap ##############*/
// place this line in the dialog show function - to only add the listener when the dialog is shown
// uncomment and place this in the dialog close/hide function to remove the listener when dialog is closed/hidden
// window.removeEventListener('keydown', handleKey);
function handleKey(e) {
  console.log(e);

  if (e.keyCode === 9) {

    let focusable = e.target.closest("[focus_this_when_modal_open]").querySelectorAll(`a, input, button, select,textarea`);
    console.log(focusable[focusable.length - 1]);

    if (focusable.length) {
      let first = focusable[0];
      let last = focusable[focusable.length - 1];
      let shift = e.shiftKey;
      if (shift) {
        if (e.target === first) { // shift-tab pressed on first input in dialog
          last.focus();
          e.preventDefault();
        }
      } else {
        if (e.target === last) { // tab pressed on last input in dialog
          first.focus();
          e.preventDefault();
        }
      }
    }
  }
}/* handle key */


/* ############## 5 of 5 - Helper Functions ##############*/
function click_on_the_open_btn_again(the_name_of_the_btn_that_open_the_modal){
  document.querySelector(`[open_menu_btn=${the_name_of_the_btn_that_open_the_modal}`).click();
}

function close_menu_when_click_esc(e){
  if (event.key === 'Escape') {
    const the_name_of_the_btn_that_open_the_modal = document.querySelector("[modal_wrapper][aria-hidden=false]").getAttribute("modal_wrapper");

    // close modal here ==> "how" - on webflow interaction the menu close on second click (and the menu is open) */
    click_on_the_open_btn_again(the_name_of_the_btn_that_open_the_modal);
  }
}

function set_aria_expanded(open_modals_btn, status){
  open_modals_btn.setAttribute("aria-expanded",status);
}



/* 3 - ################ video play/Pause btn #################*/ 

const isEnglish = false;

const video_pause_txt = isEnglish ? "Pause Background Video" : "עצירת סרטון רקע";
const video_play_txt = isEnglish ? "Play Background Video" : "נגן סרטון רקע";

/* set aria on load */
function set_aria_and_title_toggle_button_on_load($node, video_auto_play){
  video_auto_play ? $node.attr('aria-label', video_pause_txt) : $node.attr('aria-label',video_play_txt);
  video_auto_play ? $node.attr('title', video_pause_txt) : $node.attr('title', video_play_txt);
}

/* about section video */
const video_items = [
  {
    "button_selector": "toogle_play_video",
    "video_selector": "home_bg_video",
  }
]

for (let video_item of video_items) {

  let video_auto_play = true;

  const btn_node = $(`[${video_item.button_selector}]`);
  const video_node = $(`[${video_item.video_selector}] video`);

  set_aria_and_title_toggle_button_on_load(btn_node, video_auto_play);
  set_aria_and_title_toggle_button_on_load(btn_node, video_auto_play);

  $(`[${video_item.button_selector}]`).click(function() {
    video_auto_play = !video_auto_play;
    const this_video = $(`[${video_item.video_selector}] video`);
    video_button_toogle($(this), this_video, video_auto_play)
  });

  $(`[${video_item.button_selector}]`).on("keypress", function(e){
    if(e.which == 13){
      video_auto_play = !video_auto_play;
      const this_video = $(`[${video_item.video_selector}] video`);
      video_button_toogle($(this), this_video, video_auto_play)
    }
  });

}


function video_button_toogle($this, $video, video_auto_play){

  /* toogle class */
  $this.toggleClass("play_v");
  /* toogle video */
  video_auto_play ? $video.trigger('play') : $video.trigger('pause');
  /* button aria */
  video_auto_play ? $this.attr('aria-label', video_pause_txt) : $this.attr('aria-label',video_play_txt);
  video_auto_play ? $this.attr('title', video_pause_txt) : $this.attr('title', video_play_txt)
}

