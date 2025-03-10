import  { init_rss_slider } from './sliders/rss_slider.js';
import  { companies_tab_slider } from './sliders/companies_tab_slider.js';

import  { counter_up as init_gsap_counter_up } from './gsap_animations/counter_up.js';
import  { text_fill } from './gsap_animations/text_fill.js';
import  { clip_path_image } from './gsap_animations/clip_path_image.js';

import  { event_when_wb_menu_is_open } from './general/event_when_wb_menu_is_open.js';
import  { navbar_add_active_on_scroll } from './general/navbar_add_active_on_scroll.js';

//load_barba();

init_rss_slider();
navbar_add_active_on_scroll();
event_when_wb_menu_is_open();

clip_path_image();
text_fill();

companies_tab_slider();
init_gsap_counter_up();


$("[opacity_0_on_load]").css("opacity", 1)





















