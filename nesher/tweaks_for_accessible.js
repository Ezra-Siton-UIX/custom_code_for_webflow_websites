console.clear();


tippy('[tippy]', {
  duration: 0,
  content: (reference) => reference.getAttribute('aria-label'),
  allowHTML: true,
  arrow: false,

});



const href = url = window.location.href;
const isEnglish = href.match("/en/") || href == "https://www.nesher.co.il/en" || href == "https://nesheril.webflow.io/en";

/* 0 - set the lang tag of the page */



/* set "en" for "/en/" directory */
if(isEnglish){
  /* ## SET lang Attribute dynamically */
  set_lang("en");
}else{
  /*## HEBREW ##*/
  /* ## SET lang Attribute dynamically */
  set_lang("he");
  /* ## SET aria labels */

  /* webflow lightbox */
  var lightbox_close_buttons = document.querySelectorAll('.w-lightbox-control.w-lightbox-close');
  [].forEach.call(lightbox_close_buttons, function(lightbox_close_button) {
    lightbox_close_button.ariaLabel = "סגור חלון";
  });
}

function set_lang(lang){
  console.log(lang);
  document.documentElement.lang = lang;
}


/* 1 - SPLIDE convert a to button */
const splide__arrows = $(".splide__arrow, .loop-update-btn, [convert_to_btn2]");

splide__arrows.each(function( index ) {
  let this_classes = $(this).attr("class");
  let this_id = $(this).attr("id");
  let data_w_id = $(this).attr("data-w-id");
  $(this).replaceWith($(`<button data-w-id="${data_w_id}" id="${this_id}" class="${this_classes}">${this.innerHTML}</button>`));
});


/* 2 - faq Toogle aria-expanded */
$("[faq_title]").click(function() {

  $(this).toggleClass("active");
  $("[faq_title]").attr("aria-expanded", false);
  $("[faq_title].active").attr("aria-expanded", true);
});

$("[faq_title]").on("keypress", function(e){
  if(e.which == 13){
    $(this).click();
  }
});

/* 3 - ################ video play/Pause btn #################*/ 
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
  },
  {
    "button_selector": "hero_toogle_btn_video",
    "video_selector": "hero_bg_video",
  },
  {
    "button_selector": "homepage_video_1_btn", // homepage #Thinking green section
    "video_selector": "homepage_video_1_VIDEO",  // homepage #Thinking green section

  },
  {
    "button_selector": "homepage_video_2_btn",  // homepage #Blue & White Cement section
    "video_selector": "homepage_video_2_VIDEO", // homepage #Thinking Blue & White Cement section
  },
  /* מחזון למציאות */
  {
    "button_selector": "history_btn_video_1",  
    "video_selector": "history_video_1", 
  },
  {
    "button_selector": "history_btn_video_2",  
    "video_selector": "history_video_2", 
  },
  {
    "button_selector": "history_btn_video_3",  
    "video_selector": "history_video_3", 
  },
  {
    "button_selector": "history_btn_video_4",  
    "video_selector": "history_video_4", 
  },


]

for (let video_item of video_items) {

  let video_auto_play = true;

  const btn_node = $(`[${video_item.button_selector}]`);
  const video_node = $(`[${video_item.video_selector}]`);;

  set_aria_and_title_toggle_button_on_load(btn_node, video_auto_play);
  set_aria_and_title_toggle_button_on_load(btn_node, video_auto_play);

  $(`[${video_item.button_selector}]`).click(function() {
    video_auto_play = !video_auto_play;
    const this_video = $(`[${video_item.video_selector}]`);
    video_button_toogle($(this), this_video, video_auto_play)
  });

  $(`[${video_item.button_selector}]`).on("keypress", function(e){
    if(e.which == 13){
      video_auto_play = !video_auto_play;
      const this_video = $(`[${video_item.video_selector}]`);
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


/* 4 - add aria label to "read more" btns of product cards */

const product_aria_pre_text = isEnglish ? "Learn More about " : "למד עוד על ";


const product_items = $("[product_item_slider]");

product_items.each(function( index ) {
  let this_aria_label_title = $(this).find("[product_name]").text();  
  let this_aria_label_sub_title = $(this).find("[product_sub_t]").text();  
  $(this).find("a").attr("aria-label", product_aria_pre_text + this_aria_label_sub_title + ": " + this_aria_label_title);
  $(this).find("a").attr("title", product_aria_pre_text + this_aria_label_sub_title + ": " + this_aria_label_title);
})

/* 5 - make the entire card clickable */

const clickable_cards = $("[clickable_card]");

clickable_cards.each(function( index ) {
  let this_url = $(this).find("[href]").attr("href");
  $(this).click(function() {
    location.href = this_url;
  });

})

/* 6 - add aria label for navbar sticky sub navbar (with anchors) */
const anchor_btn_txt = isEnglish ? "Anchor link to: " : "קישור באותו העמוד לאזור: ";
const anchor_nav_items = $("[anchor_nav_item]");

anchor_nav_items.each(function( index ) {
  let this_btn_txt = $(this).text();
  $(this).attr("aria-label", anchor_btn_txt + this_btn_txt);
  $(this).attr("title", anchor_btn_txt + this_btn_txt);
})

/* 7 - add aria label for navbar sticky sub navbar (with anchors) */
$("[expand_job_position]").each(function( index ) {  
  let is_job_position_expanded = false;
  $(this).attr("aria-expanded", is_job_position_expanded);


  $(this).click(function() {
    is_job_position_expanded = !is_job_position_expanded;
    let title_txt = is_job_position_expanded ? read_less_txt : read_more_txt
    $(this).attr("aria-expanded", is_job_position_expanded);
  });/* end click event */
})


/* 7 - add target _blank to articles links */
const article_links = $(`[article] a`);

article_links.each(function( index ) {
  $(this).attr("target", "_blank");
});


/* 8 - add aria for open in new window links */
const new_window_links = $(`a[target="_blank"]`);
const open_in_new_window_txt = isEnglish ? "Open in a new window" : "פתיחה בחלון חדש";

new_window_links.each(function( index ) {

  $(this).attr("aria-label", open_in_new_window_txt);
  $(this).attr("title", open_in_new_window_txt);
});


/* 9 - add aria for open in new window links */
const new_pdf_window_links = $(`a[pdf]`);
const open_pdf_in_new_window_txt = isEnglish ? "Open PDF document in a new window" : "פתיחה מסמך PDF בחלון חדש";

new_pdf_window_links.each(function( index ) {

  $(this).attr("aria-label", open_pdf_in_new_window_txt);
  $(this).attr("title", open_pdf_in_new_window_txt);
  $(this).attr("target", "_blank");
});
