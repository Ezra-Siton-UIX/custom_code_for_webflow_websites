/* as cdn under github */

/* ## OPEN MODAL ## */
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

/* 1 */
const open_modals_btns = document.querySelectorAll("[open_modal]");
/* 2 */
const menu_modal = document.querySelector("[menu_modal]"); /* include the entire modal (overlay and so on) */
/* 3 */
const focus_this_when_modal_open = document.querySelector("[focus_this_when_modal_open]");
/* 4 */
const hambuger_menu = document.querySelector("[hambuger_menu]");

var open_menu_txt = "פתיחת תפריט ראשי";
var close_menu_txt = "סגירת תפריט ראשי";
var isOpen = false;



if(is_en){
  open_menu_txt = "Open Navbar Menu";
  close_menu_txt = "Close Navbar Menu";
}

if(hambuger_menu){
  hambuger_menu.setAttribute("aria-label",open_menu_txt);
  hambuger_menu.setAttribute("aria-expanded","false");
  hambuger_menu.setAttribute("role","button")
}

/* focusable only by code */
if(focus_this_when_modal_open)focus_this_when_modal_open.setAttribute("tabindex","-1");

/* Open Events */
open_modals_btns.forEach((open_modals_btn) => {
  hambuger_menu.addEventListener("click", function (e) {
    /* this button */
    event.preventDefault();
    this.blur();
    console.log("open_modals_btn clicked");
    toggle_navbar_states();
  });
});


/* ## open/close modal functions ## */
function toggle_navbar_states(){
  console.log("toggle");
  /* toggle */
  menu_modal.setAttribute("aria-hidden",isOpen);
  open_modals_btns.forEach((open_modals_btn) => {
    set_aria_expanded(open_modals_btn, !isOpen);
  });
  isOpen = !isOpen;


  /* when open only */
  if(isOpen){
    console.log("isOpen");
    menu_modal.addEventListener('keydown', handleKey);
    setTimeout(() => {
      focus_this_when_modal_open.focus();
    }, 100); /* bug - focus not working without timer (some conflict with webflow interactions) */
    hambuger_menu.setAttribute("aria-label",close_menu_txt);
    hambuger_menu.setAttribute("title",close_menu_txt);
  }
  /* when close only */
  if(!isOpen){
    console.log("isClose");
    menu_modal.removeEventListener('keydown', handleKey);
    hambuger_menu.setAttribute("aria-label",open_menu_txt);
    hambuger_menu.setAttribute("title",open_menu_txt);
    hambuger_menu.focus();
  }
}

function set_aria_expanded(open_modals_btn, status){
  open_modals_btn.setAttribute("aria-expanded",status);
}

/* set active when click enter */

/* CLOSE MENU WHEN CLICK ESCAPE */

document.addEventListener('keydown', close_menu_when_click_esc);

function close_menu_when_click_esc(){
  if (event.key === 'Escape' && isOpen) {
    // close modal here
    hambuger_menu.click();
  }
}


/* TAB TRAP */


// place this line in the dialog show function - to only add the listener when the dialog is shown
// uncomment and place this in the dialog close/hide function to remove the listener when dialog is closed/hidden
// window.removeEventListener('keydown', handleKey);
function handleKey(e) {
  console.log(e);

  if (e.keyCode === 9) {
    let focusable = focus_this_when_modal_open.querySelectorAll('a, input,button,select,textarea');
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
