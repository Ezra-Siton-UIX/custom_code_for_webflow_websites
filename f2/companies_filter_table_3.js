
const navbar_height = $("[navbar_wrapper]").height();
$("[page_anchor]").css("top", `-${navbar_height}px`);

/* list.js add mandatory class by code */
$("[data-filter]" ).each(function( index ) {
  const this_filter = $( this ).attr("data-filter") ;
  $( this ).addClass(this_filter) ;
});

/* list.js add mandatory class by code */
$("[data-sort]" ).each(function( index ) {
  $( this ).addClass("sort") ;
});

/* add styles for custom design (fund I is yellow, fund II is blue and so on) 
$("[data-filter=stage]" ).each(function( index ) {
  let this_text = $( this ).text();
  this_text = this_text.replace(/\s+/g, '-').toLowerCase();
  $( this ).addClass("fund_badge") ;  
  $( this ).addClass(this_text) ;
});
*/

/* list.js remove empty filter btns */
let all_categories_array = [];
/* sector_name */
$("[sector_name]" ).each(function( index ) {
  let this_text = $( this ).text();
  all_categories_array.push(this_text);
});

console.log(all_categories_array);

function removeDuplicates(arr) {
  return arr.filter((item,index) => arr.indexOf(item) === index);
}


/* show only categories with items (hide empty categories) */
all_categories_array.forEach(function(category) {
  $(`[data_filter_btn="${category}"]`).parent("[data_btn_wrapper]").show();
  $(`[data_filter_btn="${category}"]`).parent("[data_btn_wrapper]").css("opacity", 1);

  /* add counter - for each tab list item
  const numbers_of_items_on_this_category = $(`[data_item_category_name="${category}"]`).length;

  $(`[data_filter_btn="${category}"] [categoty_counter]`).text(" (" + numbers_of_items_on_this_category + ")");
  $(`[data_filter_btn="${category}"] [categoty_counter]`).text(" (" + numbers_of_items_on_this_category + ")").hide();
   */
});

/* show all button */
$(`[data_filter_btn]`).eq(0).parent("[data_btn_wrapper]").show();
$(`[data_filter_btn]`).eq(0).parent("[data_btn_wrapper]").css("opacity", 1);
$(`[data_filter_btn]`).eq(0).addClass("is-selected");

/* change url from https://www.hello.com/ => to www.hello.com
$("[company_website_link]" ).each(function( index ) {
  let this_full_url = $( this ).text();
  this_full_url = this_full_url.replace(/^https?:\/\//, '');
  if(this_full_url.at(-1) == "/"){
    this_full_url = this_full_url.slice(0, -1);
    console.log(this_full_url);
  }
  $( this ).text(this_full_url);
});
 */

/* LIST JS setting */
const button_selector = "data_filter_btn";

var options = {
  valueNames: [ 'name', 'description', 'stage',  'year', 'category', 'sector', 'co_investors' ]
};

var companyList = new List('companies', options);


companyList.sort('fund', { order: "desc" }) /* desc */


console.log(companyList);

const data_filter_btns = $("[data_filter_btn]");

data_filter_btns.each(function( index ) {

  let isFilter = true;

  $(this).on('click', function() {

    const button_text = $(this).text();

    console.log("button_text clicked");


    $("[data_filter_btn].is-selected").removeClass("is-selected");

    $(this).addClass("is-selected");
    //const data_filter_btns = $("[data_filter_btn].is-selected");

    /*
        let filters = [];
    data_filter_btns.each(function( index ) {
      const this_filter = {
        filter_name: $(this).find("[category_name]").text(),
        isFilter: true
      }
      filters.push(this_filter);
    });
    */

    /* filter by category (loop throw list) */

    if(button_text == "All"){
      companyList.filter(); // Remove all filters
    }else{
      companyList.filter(function(item) {
        var this_item_category = item.values().category;
        var this_item_name = item.values().name;
        console.log("this_item_category", this_item_category, "this_item_name", this_item_name, "button_text", button_text);
        return this_item_category.includes(button_text);
        //return this_item_category == button_text;
        //console.log("item value is: " + category, "this btn value is: " + this_btn_value);

        /*

            let is_found = false;
      let one_found = false;

      let this_filter = [];
      filters.forEach(function(filter) {
        const this_active_filter =  Boolean(this_item_category == filter.filter_name);
        if(this_active_filter){
          one_found = true;
        }

              if (one_found) {
        return true;
      } else {
        return false;
      }
      });*/

      });/* list JS end filter */  


    }


  });
})


/* fancybox */
Fancybox.bind('[data-fancybox]', {
  // Custom options for all galleries
  closeButton: false,
  autoFocus: false,
  groupAttr: false,
  dragToClose: false,
  

  tpl: {

    // Main structure of Fancybox
    main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
  <div class="fancybox__carousel"></div>
  <div class="fancybox__footer"></div>
</div>`,
  },

  animated: true,
  zoom: false,
  showClass: "f-fadeFastIn",

  on: {
    reveal: (fancybox, slide) => {
      // The content of this slide is loaded and ready to be revealed
      //lenis.stop()     
      console.log("fancybox reveal");
    },
    close: (fancybox, slide) => {
      // The content of this slide is loaded and ready to be revealed
      console.log("fancybox close");
      //lenis.start()
      //stop_all_videos();
    }
  }
}); 



companyList.on('filterStart', function ({matchingItems }) {
  console.log("filterStart");
  $("[table_collection_item]").css("opacity", 0);
});

companyList.on('filterComplete', function ({matchingItems }) {
  console.log("filterComplete");

  setTimeout(function(){
    $("[table_collection_item]").css("opacity", 1);
  }, 0);


});


//Swipe 
let touchstartX = 0
let touchendX = 0
let fingerCount = 0

const checkDirection = () => {

  const distance = 50 //Minimum distance for the swipe to work

  //left
  if (touchendX < touchstartX && (touchstartX - touchendX) > distance ){

    //Do something cool
    // Close all instances

    Fancybox.close();

  } 
  //right
  if (touchendX > touchstartX && (touchendX - touchstartX) > distance){

    //Do something cooler
    // Close all instances

    Fancybox.close();

  }

}

document.addEventListener('touchstart', e => {

  fingerCount = e.touches.length
  touchstartX = e.changedTouches[0].clientX  

})

document.addEventListener('touchend', e => {

  touchendX = e.changedTouches[0].clientX
  if(fingerCount === 1){ 
    checkDirection() 
  }

})
