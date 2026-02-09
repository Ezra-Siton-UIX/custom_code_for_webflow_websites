const params = new URLSearchParams(document.location.search);
const show_banner = params.get("show_banner"); 
const show_modal_delay = 2000; //ms
const cockie_expDays = 30; // days

// micromodal -------------------------
const microModal_setting = {
  onShow: onShow_MicroModal, // [1]
  onClose: onClose_MicroModal, // [2]
  openTrigger: 'data-custom-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  openClass: 'is-open', // [5]
  disableScroll: false, // [6]
  disableFocus: true, // [7]
  awaitOpenAnimation: true, // [8]
  awaitCloseAnimation: true, // [9]
  debugMode: true // [10]
}

//event listenrs -------------------------
document.querySelectorAll('[consent]').forEach(consent_btn => {
  consent_btn.addEventListener('click', event => {
    //handle click
    const this_consent_status = event.target.getAttribute("consent"); 
    // granted or denied
    setConsent_Cookie(this_consent_status, cockie_expDays);
  })
})

document.querySelectorAll('[Cookies_Setting]').forEach(Cookies_Setting_btn => {
  Cookies_Setting_btn.addEventListener('click', event => {
    //handle click
    MicroModal.show('micromodal', microModal_setting); 
  })
})


// cookie -------------------------
function getCookie (name) {
  let value = `; ${document.cookie}`;
  let parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function onShow_MicroModal(){
  //console.log("onShow_MicroModal");
}

function onClose_MicroModal(){
  //console.log("onClose_MicroModal");
}

function setConsent_Cookie(this_consent_status, expDays) {
  //console.log(this_consent_status)
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();

  document.cookie = `consent=${this_consent_status}; ${expires}`;
}

function delete_Cookie(){
  document.cookie = 'consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';

}

let is_consent_Cookie_exsist = getCookie('consent');

if(is_consent_Cookie_exsist == undefined || show_banner !== null){
  //console.log("First time the user seen the banner");
  setTimeout(function(){
    MicroModal.show('micromodal', microModal_setting);  
  }, show_modal_delay);

}






