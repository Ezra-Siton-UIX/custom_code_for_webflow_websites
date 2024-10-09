/* docs - for example for "category":
THE LIST
1 - add [list] data attribute to the entire list wrapper (Filters menu + The list himself)
THE BTN
2 - data_filter_btn for the buttons + bind the value 
3 - add data_btn_collection_item_wrapper for the cms collection item of the btn (We want to hide empty filter buttons)
THE DATA
4 - on collection list add data-filter for the item with the category txt 
*/

const show_all_btn_text = "All";
const show_all_btn = $(`[data_filter_btn="${show_all_btn_text}"]`)
const anchor_url = "#blog";

/* ### list.js add mandatory class by code ### */
$("[data-filter]" ).each(function( index ) {
  const this_filter = $( this ).attr("data-filter") ;
  $( this ).addClass(this_filter) ;
});

/* ### Add id to the list ### */
$("[list]" ).each(function( index ) {
  $( this ).attr("id","list") ;
});

$("[pagination]" ).each(function( index ) {
  $( this ).addClass("pagination") ;
});


/* ### list.js add mandatory class by code ### */
$("[data-sort]" ).each(function( index ) {
  $( this ).addClass("sort") ;
});



/* list.js remove empty filter btns */
let all_categories_array = [];

$("[data-filter=category]" ).each(function( index ) {
  let this_text = $( this ).text();
  all_categories_array.push(this_text);
});


function removeDuplicates(arr) {
  return arr.filter((item,index) => arr.indexOf(item) === index);
}


$("[data_btn_collection_item_wrapper]").hide();

/* show only categories with items (hide empty categories) */
all_categories_array.forEach(function(category) {
  /* hide webflow cms collection item */
  $(`[data_filter_btn="${category}"]`).parent("[data_btn_collection_item_wrapper]").show();
  $(`[data_filter_btn="${category}"]`).parent("[data_btn_collection_item_wrapper]").css("opacity", 1);

  /* add counter - for each tab list item
  const numbers_of_items_on_this_category = $(`[data_item_category_name="${category}"]`).length;

  $(`[data_filter_btn="${category}"] [categoty_counter]`).text(" (" + numbers_of_items_on_this_category + ")");
  $(`[data_filter_btn="${category}"] [categoty_counter]`).text(" (" + numbers_of_items_on_this_category + ")").hide();
   */
});

/* show all button */
show_all_btn.parent("[data_btn_collection_item_wrapper]").show();
show_all_btn.parent("[data_btn_collection_item_wrapper]").css("opacity", 1);
show_all_btn.addClass("is-selected");


/* LIST JS setting */
const button_selector = "data_filter_btn";
const perPage = 12;

var options = {
  valueNames: ['category'],
  page: perPage,

  pagination: true,

}

var blogList = new List('blog_list', options);


blogList.on('updated', function (list) {
  var isFirst = list.i == 1;
  var isLast = list.i > list.matchingItems.length - list.page;

  // make the Prev and Nex buttons disabled on first and last pages accordingly
  $("[pagination_prev], [pagination_next]").show();
  if (isFirst) {
    $("[pagination_prev]").hide();
  }
  if (isLast) {
    $("[pagination_next]").hide();
  }

  // hide pagination if there one or less pages to show

  if (list.matchingItems.length <= perPage) {
    $("[pagination_layout]").hide();
  } else {
    $("[pagination_layout]").show();
  }



});/* emd updated */

blogList.sort('fund', { order: "desc" }) /* desc */



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
      blogList.filter(); // Remove all filters
    }else{
      blogList.filter(function(item) {
        var this_item_category = item.values().category;
        var this_item_name = item.values().name;
        console.log(this_item_category, this_item_name, button_text);

        return this_item_category == button_text;
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
})/* end click */

blogList.on('filterStart', function ({matchingItems }) {
  console.log("filterStart");
  $("[blog_card]").css("opacity", 0);
});

blogList.on('filterComplete', function ({matchingItems }) {
  console.log("filterComplete");

  setTimeout(function(){
    $("[blog_card]").css("opacity", 1);
  }, 0);


});

blogList.on('updated', function ({matchingItems }) {
  console.log("filterStart");
  $("[blog_card]").css("opacity", 0);

  setTimeout(function(){
    $("[blog_card]").css("opacity", 1);
  }, 100);
});








$("[pagination_next]").click(function() {
  $("[pagination] .active")
    .next()
    .trigger("click");

  window.location = anchor_url;

});

$("[pagination]").click(function() {
  window.location = anchor_url;
});


$("[pagination_prev]").click(function() {
  $("[pagination] .active")
    .prev()
    .trigger("click");

  window.location = anchor_url;
});
