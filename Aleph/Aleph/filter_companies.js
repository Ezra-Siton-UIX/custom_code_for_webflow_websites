/* 
      Hello
      -----Attributes list:
      [toggleclass] 
      [clear_filters]
      [filter_btn_text] - (For modal filter apply button "Show 4 results")
      empty_list_message
      clear_filters

      ----filter button:
      [filter_type=category]
      [data_filter_btn=Cyber]
        [data-filter=category] 

      filter Cards:
      [list_js_list_class]
        [list_card]
      */

//gsap.registerPlugin(ScrollTrigger);



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const debug = urlParams.get('debug')
if(debug !== null)$("[list-js-data]").show();

let is_grid_class = true;

set_menu_active_state_to_ALL_btn();

$("[list_js_list_class]").addClass("list_js_list_class");

$("[data-filter]" ).each(function( index ) {
  const this_filter = $( this ).attr("data-filter") ;
  $( this ).addClass(this_filter) ;
});

const button_selector = "data_filter_btn";

var options = {
  listClass: "list_js_list_class",
  valueNames: [ 'name', 'category', 'vertical','year', { name: 'is_eu', attr: 'is_eu' }]
};

const how_many_items_prop = $("[how_many_items_to_show_on_load]").attr("how_many_items_to_show_on_load");
let how_many_items_to_show_on_load = how_many_items_prop !== undefined ? how_many_items_prop : 1000;

const path = window.location.pathname;
if(path !== "/"){
  how_many_items_to_show_on_load = 999999999999999999999;
}


const checkbox_true_value = "yes";

var companies_List = new List('companies', options);

$("[result_count]").text(companies_List.matchingItems.length);
$("[result_count]").css("opacity", 1);



companies_List.on('filterComplete', function ({matchingItems }) {

  //console.log("filterComplete");

});



$("[clear_filters]").on( "click", function() {
  //console.log( "Handler for `click` called." );
  $("input[search]").val("")
  companies_List.search(); // Show all items in list
  companies_List.filter(); // Remove all filters]

  // filter menu set "ALL" button to be active //
  set_menu_active_state_to_ALL_btn();

  $("[radio_button]").removeClass("active_state");

  $(`[filter_type]`).removeClass("disable_me");
  $(`[filter_type]`).attr("tabindex", "0");



  filter_query = {
    category: {
      value: "All",
      filter_isActive: false
    },
    vertical: {
      value: "All",
      filter_isActive: false
    },
    is_eu: {
      value: false,
      filter_isActive: false 
    }
  }

  checkbox_is_active = false;

  uptade_the_number_of_active_filters(true);
} );


function set_menu_active_state_to_ALL_btn(){
  const all_node_vertical = $("[filter_type=vertical][data_filter_btn=All]");
  set_active_state(all_node_vertical, "vertical");

  const all_node_category = $("[filter_type=category][data_filter_btn=All]");
  set_active_state(all_node_category, "category");

  $("[filter_type=is_eu][checkbox]").removeClass("active_state");;
  $("[filter_type=is_eu][checkbox]").attr("data_filter_btn", "true");;

}

function set_active_state(node, btn_filter_type){
  $(`.active_state[filter_type="${btn_filter_type}"]`).removeClass("active_state");
  node.addClass("active_state");
}

let filter_query = {
  category: {
    value: "All",
    filter_isActive: false
  },
  vertical: {
    value: "All",
    filter_isActive: false
  },
  is_eu: {
    value: false,
    filter_isActive: false 
  }
}


let group_by_vertical = _.groupBy(companies_List.items, function(item) {
  return item._values.vertical;
});
let group_by_category = _.groupBy(companies_List.items, function(item) {
  return item._values.category;
});


for (const [category_name, group_object] of Object.entries(group_by_category)) {
  group_object.forEach(function(group_object_item) {
    const { name } = group_object_item._values;
    const { category } = group_object_item._values;
    const { vertical } = group_object_item._values;

    if(vertical == "Tel Aviv"){

    }
  });
}/* end for group_by_category */


function update_the_ui_related_to_the_selected_item(group_by_data,compare_value, btn_filter_type){

  const other_nav_filter_list_selector = btn_filter_type == "category" ? "vertical" : "category"; /*if we click on category we want to update vertical list */
  $(`[filter_type=${other_nav_filter_list_selector}]`).removeClass("found");
  $(`[filter_type=${other_nav_filter_list_selector}]`).removeClass("disable_me");
  $(`[filter_type=${other_nav_filter_list_selector}]`).attr("tabindex", "0");


  for (const [vertical_name, group_object] of Object.entries(group_by_vertical)) {

    group_object.forEach(function(group_object_item) {
      const { name } = group_object_item._values;
      const { category } = group_object_item._values; /* web for example */
      const { vertical } = group_object_item._values;

      if(category == compare_value && compare_value !== "All"){
        //console.log(name, category,compare_value, vertical)
        $(`[filter_type="${other_nav_filter_list_selector}"][data_filter_btn="${vertical}"]:not([data_filter_btn="All"])`).addClass("found");

        //$(`[filter_type="vertical"]:not([data_filter_btn="${vertical}"])`).addClass("active_state");
      }

      if(vertical == compare_value && compare_value !== "All"){
        //console.log("vertical", name, category,compare_value, vertical)
        $(`[filter_type="${other_nav_filter_list_selector}"][data_filter_btn="${category}"]:not([data_filter_btn="All"])`).addClass("found");
        //$(`[filter_type="vertical"]:not([data_filter_btn="${vertical}"])`).addClass("active_state");
      }

    });/* end for each */


  }/* end for group_by_category */

  if(compare_value !== "All"){
    $(`[data_filter_btn][filter_type=${other_nav_filter_list_selector}]:not(".found"):not([data_filter_btn="All"])`).addClass("disable_me");
    $(`[data_filter_btn][filter_type=${other_nav_filter_list_selector}]:not(".found"):not([data_filter_btn="All"])`).attr("tabindex", "-1");

  }

}

/* radio button change style on click */
$( "[radio_button]" ).on( "click", function() {
  $( this ).toggleClass("active_state");
});

function set_active_state(node, btn_filter_type){
  $(`.active_state[filter_type="${btn_filter_type}"]`).removeClass("active_state");
  node.addClass("active_state");
}

let checkbox_is_active = false;

$(`[${button_selector}]`).on('click', function() {
  const this_filter_value = $(this).attr(button_selector);
  const btn_filter_type =  $(this).attr("filter_type");

  /* set active state */
  if(btn_filter_type !== "is_eu"){
    set_active_state($(this),btn_filter_type);

    /* Update the Filter Query Object */
    filter_query[btn_filter_type].value = this_filter_value;
    filter_query[btn_filter_type].filter_isActive = this_filter_value == "All" ? false : true;
  }
  /*>>>>>>>>>>>>>>>> CHECKBOX >>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
  else if(btn_filter_type == "is_eu"){
    checkbox_is_active = !checkbox_is_active;
    $(this).attr("data_filter_btn", checkbox_is_active);
    $(this).toggleClass("active_state");
    filter_query["is_eu"].value = checkbox_is_active;
    filter_query["is_eu"].filter_isActive = checkbox_is_active;

  }


  let is_show_all_state = Boolean(!filter_query["vertical"].filter_isActive &&!filter_query["category"].filter_isActive);


  /*################################################################
                                      THE LIST.js FILTER HIMSELF
                      /*################################################################*/
  companies_List.filter(function(item) {
    const this_item_category = item.values()["category"];
    const this_item_vertical = item.values()["vertical"];
    const this_item_is_eu = item.values()["is_eu"];
    const this_item_name = item.values()["name"];


    /** CASE 1 - category all - vertical all **/
    if(filter_query["vertical"].value == "All" && filter_query["category"].value == "All"){
      if(checkbox_is_active){
        return this_item_is_eu == checkbox_true_value;
      }
      else {
        return true
      };
    }
    /** CASE 2 - category web - vertical all --or-- category all - vertical some_value **/
    if(this_item_category == filter_query["category"].value && filter_query["vertical"].value == "All"
       || this_item_vertical == filter_query["vertical"].value && filter_query["category"].value == "All"
      ){
      if(checkbox_is_active){
        return this_item_is_eu == checkbox_true_value;
      }
      else {
        return true
      };
    }

    /** CASE 3 - category web - vertical all --and-- category all - vertical some_value **/
    if(this_item_category == filter_query["category"].value && this_item_vertical == filter_query["vertical"].value
      ){
      if(checkbox_is_active){
        return this_item_is_eu == checkbox_true_value;
      }
      else {
        return true
      };
    }


  });/* end user list JS FILTER */

  if(btn_filter_type !== "is_eu"){
    update_the_ui_related_to_the_selected_item(group_by_category,this_filter_value,btn_filter_type);
  }else{
  }

  //console.log(filter_status);
});


companies_List.on('filterStart', function ({matchingItems, filtered }) {
  //console.log("filterStart");
});

companies_List.on('filterComplete', function ({matchingItems }) {
  //console.log("filterComplete");

  // Defining the function
  // Defining the function


});

/*######################################################
                    updated
                    updated
                    updated
                    updated
  /*######################################################
  /*######################################################
  /*######################################################*/

companies_List.on('updated', function ({matchingItems, filtered, items  }) {

  //load_gsap_batch_animations_2();

  $(`[list_card]`).toggleClass( "toggleclass", is_grid_class);

  $("[list_js_list_class] [list_card]").css("opacity", 0);

  setTimeout(function() {
    $("[list_js_list_class] [list_card]").css("opacity", 1);
  }, 50);

  const is_not_filtered = items.length == matchingItems.length

  is_not_filtered ? $("[clear_filters]").css("opacity", 0) : $("[clear_filters]").css("opacity", 1);

  toogle_grid_Class();

  $("[result_count]").text(companies_List.matchingItems.length);

  uptade_the_number_of_active_filters(true)

  /* ## HANDEL EMPTY RESULTS ## */
  if(matchingItems.length == 0){
    $("[empty_list_message]").show();
    $("[result_count_wrapper]").hide();
  }
  else{
    $("[empty_list_message]").hide();
    $("[result_count_wrapper]").show();
  }
  //console.log(matchingItems.length, how_many_items_to_show_on_load)
  // LOAD MORE //
  if(matchingItems.length > how_many_items_to_show_on_load){
    $("[show_more]").show();
  }else{
    $("[show_more]").hide();
  }

});

const button_that_open_the_modal_text = "Filters";

function uptade_the_number_of_active_filters(clear){

  /* count the num of active filters */
  let num_of_filters = 0;

  Object.entries(filter_query).forEach(([key, value]) => {
    //console.log(key, value);
    if(value.filter_isActive == true){
      num_of_filters ++;
    }
  });

  /* prefare data */
  const $filter_btn_text_node = $("[filter_btn_text]");
  let filter_btn_text = num_of_filters > 0 ? `${button_that_open_the_modal_text} (${num_of_filters})` : button_that_open_the_modal_text;

  //console.log(filter_btn_text, "filter_btn_text");

  num_of_filters > 0 ? $filter_btn_text_node.text(`Filter (${num_of_filters})`) : $filter_btn_text_node.text(`${button_that_open_the_modal_text}`);


}


/*### sort ###*/
var isClicked = false;
companies_List.sort("name" , { order: "asc" }); 

$(`[sort_by]`).on('click', function() {
  //$(this).toggleClass("active_state");
  isClicked = !isClicked;
  //isClicked ? sort_type = "asc" : sort_type = "desc";

  if(isClicked){
    companies_List.sort("year" , { order: "desc" }); 
  }else{
    companies_List.sort("name" , { order: "asc" }); 
  }

});

$(`[checkbox]`).on('click', function() {

});





$(`[toggleclass]`).on('click', function() {
  is_grid_class = !is_grid_class;
  toogle_grid_Class();

  $(`[list_card]`).toggleClass( "toggleclass");


});


//show_only_n_elemnts(how_many_items_to_show_on_load);
let counter = 1;
$(`[show_more]`).on('click', function() {
  counter ++;
  show_only_n_elemnts(999999);

});

companies_List.show(0, how_many_items_to_show_on_load); // Display item 4,5,6 

//console.log(companies_List)

function show_only_n_elemnts(nun_of_items_to_show){
  companies_List.show(0, nun_of_items_to_show); // Display item 4,5,6 

  if(companies_List.matchingItems.length > nun_of_items_to_show){
    $("[show_more]").show();
  }else{
    $("[show_more]").hide();
  }

}



/* list.js remove empty filter btns */
let all_categories_array = [];
let all_verticals_array = [];


$(`[filter_type="category"]`).parent(".w-dyn-item").hide();
$(`[filter_type="vertical"]`).parent(".w-dyn-item").hide();
$(`[data_filter_btn="All"]`).parent(".w-dyn-item").show();


companies_List.items.forEach((item) => {
  const this_category = item._values["category"];
  const this_vertical = item._values["vertical"];

  $(`[data_filter_btn="${this_category}"]`).parent(".w-dyn-item").show();
  $(`[data_filter_btn="${this_vertical}"]`).parent(".w-dyn-item").show();

});


let toggleBtn = document.querySelectorAll("[data-view-btn]");

// remove grid class
function toogle_grid_Class() {

  const companyList = $("[company_list]"); // 1 
  const companyContent = $("[company_content]"); // 2
  const contentItems = $("[company_content-item]"); // 3 
  const companyLogo_wrap = $('[company_logo-wrap]'); // 4 
  const founderImages = $("[company_cover-img]"); // 5 
  const companyName = $("[company_content-name]"); // 6

  const each_card_nested_company_founders_list = $("[company_founders_list]");

  companyList.toggleClass("grid", is_grid_class);
  companyContent.toggleClass("grid", is_grid_class);
  contentItems.toggleClass("grid", is_grid_class);
  companyLogo_wrap.toggleClass("grid", is_grid_class);
  founderImages.toggleClass("grid", is_grid_class);
  companyName.toggleClass("grid", is_grid_class);




  each_card_nested_company_founders_list.toggleClass("grid", is_grid_class);

  /* toogle button */
  let grid_icon = $("[data-toggle-icon=grid]");
  let list_icon = $("[data-toggle-icon=list]");
  let toogle_btn_txt = $("[data-btn-text]");

  grid_icon.toggleClass("is-hide", is_grid_class);
  list_icon.toggleClass("is-hide", !is_grid_class);
  is_grid_class ? toogle_btn_txt.text("List") :  toogle_btn_txt.text("Grid")


}

$("[opacity_0_on_load]").css("opacity", "1")

/* ADD ARIA LABEL TO FILTER BUTTONS */
$( "[filter_type]" ).each(function( index ) {
  let filter_type = $(this).attr("filter_type");
  let filter_value = $(this).attr("data_filter_btn");

  if(filter_type == "is_eu"){
    filter_type = "Active Companies";
    filter_value = "";
  }
  const aria_label = `Filter by: ${filter_type}, ${filter_value}`;
  $(this).attr("aria-label", aria_label)
  //$(this).attr("title", aria_label);

});


/* GSAP scroll */

function load_gsap_batch_animations_2(){

  //console.log("load_gsap_batch_animations count");

  ScrollTrigger.batch("[list_card]", {
    //interval: 0.1, // time window (in seconds) for batching to occur. 
    //batchMax: 3,   // maximum batch size (targets)
    onEnter: batch => {
      batch.forEach((card, index) => revealItem(card))
    },
    once: true,
    markers: false,
    ease: "slow(0.7,0.7,true)",
    // you can also define things like start, end, etc.
  });


}


function revealItem(batch, direction) {

  const reveal_duration = 2;
  const easing_type = "power4.out";

  //console.log("revealItemrevealItemrevealItemrevealItem");




  gsap.set(batch.querySelector(".company_cover-img.grid"), { 
    autoAlpha: 0,
    scale: 1,
    y: 0,
    overwrite: true
  })


  gsap.to(batch.querySelector(".company_cover-img.grid"), { 
    duration: reveal_duration * 1.1,
    autoAlpha: 1,
    ease: easing_type,
    scale: 1,
    overwrite: true
  })
}
