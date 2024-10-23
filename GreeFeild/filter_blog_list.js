const blog_menu_swiper = new Swiper('[blog_menu]', {
  // Optional parameters
  loop: false,
  //slideToClickedSlide: true,
  centeredSlides: true,
  centeredSlidesBounds: true,

  freeMode: true,

  breakpoints: {
    // when window width is >= 640px
    0: {
      slidesPerView: "auto",
      spaceBetween: 10,
    },
    700: {
      slidesPerView: 'auto',
      spaceBetween: 10,
      centeredSlides: true,
    },
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  on: {
    init: function () {
      console.log('swiper initialized');
      $("[opacity_0_on_load]").css("opacity", 1)
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: '[custom_next]',
    prevEl: '[custom_prev]',
  },

  on: {
    slideChange: function () {
    },
  }
});


function on_load_list_js(){

  $("[data_btn=All]").attr("href", "/knowledge-hub");

  $("[list_js_filters_and_items_id]").attr("id", "list_js_filters_and_items_id")
  /* #################### 1 of 2 - pre step add class to data attributes for list js to work */
  $("[list_js_list_class]").addClass("list_js_list_class"); 
  $("[fuzzy-search]").addClass("fuzzy-search");
  $("[empty_list_message]").hide();

  $("[data-filter]" ).each(function( index ) {
    const this_filter_type = $( this ).attr("data-filter").trim();
    const this_data_filter_node = $( this );
    this_data_filter_node.addClass(this_filter_type);
  });

  /* trim empty white spaces (add by mistake)
        const "web     " to => "web"
        */
  $("[data_btn]" ).each(function( index ) {
    $( this ).attr("data_filter_btn_index", index); 
  });
}

on_load_list_js();

const list_js_options = {
  valueNames: [ 'name', 'category' ],
  listClass: "list_js_list_class",
  fuzzySearch: {
    searchClass: "fuzzy-search",
    location: 0,
    //distance: 1000,
    threshold: 0.4,
    multiSearch: true
  }
};

var list_js_data = new List('list_js_filters_and_items_id', list_js_options);

$("[total_list_items]").text(list_js_data.matchingItems.length);

list_js_data.on('updated', function ({matchingItems, filtered, items  }) {

  const is_not_filtered = items.length == matchingItems.length
  is_not_filtered ? $("[clear_filters]").css("opacity", 0) : $("[clear_filters]").css("opacity", 1)


  $("[total_list_items]").text(list_js_data.matchingItems.length);
  $("[result_count]").text(list_js_data.matchingItems.length);


  /* ## HANDEL EMPTY RESULTS ## */
  if(matchingItems.length == 0){
    $("[empty_list_message]").show();
  }else{
    $("[empty_list_message]").hide();
  }
  $("[insert_before]").hide();


});/* end on updated */


/* 🐩🐩🐩🐩🐩 HANDLE updated events 🐩🐩🐩🐩🐩🐩*/
list_js_data.on('searchStart', function ({matchingItems, filtered }) {
  //console.log("filterStart");
  console.log("eeeee")
  $("[list_js_list_class] [list_card]").css("opacity", 0);
});

list_js_data.on('searchComplete', function ({matchingItems }) {
  //console.log("filterComplete");

  // Defining the function
  setTimeout(function() {
    $("[list_js_list_class] [list_card]").css("opacity", 1);
  }, 100);
});


$("[clear_filters]").on( "click", function() {


  /* clear search */
  $("input[fuzzy-search]").val("");
  list_js_data.fuzzySearch(); // Show all items in list
  // Remove all filters
  list_js_data.filter(); 
});

$("[fuzzy-search]").on( "focus", function() {
  let this_text = $(this).val();
  list_js_data.fuzzySearch(this_text); 
});


const active_btn_index = $("[data_btn].w--current").attr("data_filter_btn_index");
blog_menu_swiper.slideTo(active_btn_index, 200);

