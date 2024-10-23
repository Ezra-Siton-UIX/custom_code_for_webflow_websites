/* pre steps:
    add:
    list_js_list_class attribute to the list
    add:
    list_js_filters_and_items_id attrivute for the list and filter wrapper

    match:
    the data of the buttons and card

    update the search jquery

    */

/* fomantic dropdown */





document.addEventListener("DOMContentLoaded", (event) => {



  const is_en = window.location.href.includes('/en') ||window.location.href.includes('cdpn');


  load_list_js_data();

  if(window.location.pathname == "/cpe/boomboom/index.html"){
    load_list_js_data();
  }


  function load_list_js_data(){

    on_load_list_js();

    let filter_query = {
      name: [
      ],
      status:[
      ],
      category:[

      ],
      role: [
      ],
      class: [
      ],
      team: [
      ],
      program: [
      ],
      location: [
      ],
    };



    let list_js_valueNames = [];

    /* create keys from the Query Data */
    Object.keys(filter_query).forEach(key => {
      const value = filter_query[key];
      list_js_valueNames.push(key);
    });



    const button_that_open_the_modal_text = is_en ? "Filters" : "סינון";
    const button_selector = "data_filter_btn";
    const filter_mode = "and" // "or", "and"

    /* if we want the "all button" **works better with "or" mode */
    const show_all_button = true;

    if(show_all_button)$(`[filter_type][data_filter_btn="All"]`).css({"opacity": 1});
    if(show_all_button)$(`[filter_type][data_filter_btn="All"]`).addClass("active_state");

    function set_active_state(filter_mode, btn_filter_type, this_filter_value, filter_query, is_checkbox){

      if(is_checkbox){
        $(`[filter_type="${btn_filter_type}"]`).toggleClass("active_state");
        return;
      }

      switch (filter_mode) {
        case 'or':
          /* GUI update - or */
          $(`[filter_type="${btn_filter_type}footer_menu_link "]`).removeClass("active_state");
          $(`[filter_type="${btn_filter_type}"][data_filter_btn="${this_filter_value}"]`).addClass("active_state");
          break;
        case 'and':
          /* GUI update - and */
          if(this_filter_value == "all" || filter_query[btn_filter_type].length == 0){
            $(`[filter_type="${btn_filter_type}"]`).removeClass("active_state");
            $(`[filter_type="${btn_filter_type}"][data_filter_btn="All"]`).addClass("active_state");
          }else{/* not all btn */
            console.table(filter_mode, btn_filter_type, this_filter_value);
            $(`[filter_type="${btn_filter_type}"][data_filter_btn="All"]`).removeClass("active_state");
            $(`[filter_type="${btn_filter_type}"][data_filter_btn="${this_filter_value}"]`).toggleClass("active_state");
          }
          break;
      }
    }




    /* #################### 2 of 2 - initialize list js object + sort */
    const list_js_options = {
      valueNames: list_js_valueNames,
      listClass: "list_js_list_class",

    };

    var list_js_data = new List('list_js_filters_and_items_id', list_js_options);
    $("[total_list_items]").text(list_js_data.matchingItems.length);
    $("[result_count]").text(list_js_data.matchingItems.length);



    $('.ui.dropdown')
      .dropdown({
      placeholder: 'Status',
      values: [
        {
          name     : 'Company Status',
          type     : 'header'
          // Will be displayed as header
        },
        {
          name: 'Any Status',
          value: 'All',
          //"description": "Born 2018",
          //  "image": "https://fomantic-ui.com/images/avatar/small/elliot.jpg"
        },
        {
          name: 'Active',
          value: 'Active',
          //"description": "Born 2018",
          //  "image": "https://fomantic-ui.com/images/avatar/small/elliot.jpg"
        },
        {
          name     : 'Exited',
          value    : 'Acquired',
          //"description": "Born 2018",
          // "image": "https://fomantic-ui.com/images/avatar/small/jenny.jpg",

        }
      ],
      onChange: function(value, text, $selectedItem) {
        // custom action
        //filter_query["category"].push("Fintech");
        if(value == "All"){
          filter_query['status'] = [];
          const this_query = buildFilter(filter_query);
          const result = filterData(list_js_data, this_query);
        }else{

          filter_query['status'] = [];
          filter_query['status'].push(value);

          const this_query = buildFilter(filter_query);
          const result = filterData(list_js_data, this_query);
          update_the_number_of_active_filters(false);
          console.log(filter_query);

        }


      }


    });

    $('[dropdown__embed]').css("opacity", 1);


    /* 🐩🐩🐩🐩🐩 HANDLE updated events 🐩🐩🐩🐩🐩🐩*/
    list_js_data.on('filterStart', function ({matchingItems, filtered }) {
      //console.log("filterStart");
      $("[list_js_list_class] [list_card]").css("opacity", 0);
    });

    list_js_data.on('filterComplete', function ({matchingItems }) {
      //console.log("filterComplete");

      // Defining the function
      setTimeout(function() {
        $("[list_js_list_class] [list_card]").css("opacity", 1);
      }, 100);




    });

    /* ############################################
                                      ############################################
                                      ############################################
                                      ############################################
                                      ############################################
                                      ################# updated ##########################
                                      ############################################
                                      ############################################
                                      ############################################
                                      ############################################
                                      ############################################
                                      */

    list_js_data.on('updated', function ({matchingItems, filtered, items  }) {

      const is_not_filtered = items.length == matchingItems.length
      is_not_filtered ? $("[clear_filters]").css("opacity", 0) : $("[clear_filters]").css("opacity", 1)


      $("[total_list_items]").text(list_js_data.matchingItems.length);
      $("[result_count]").text(list_js_data.matchingItems.length);

      update_the_number_of_active_filters(true)

      /* ## HANDEL EMPTY RESULTS ## */
      if(matchingItems.length == 0){
        $("[empty_list_message]").show();
      }else{
        $("[empty_list_message]").hide();
      }
      $("[insert_before]").hide();

      /* ADD TITLE BEFORE GROUP */
      insert_before_title();

    });/* end on updated */

    function insert_before_title(){
      /* on load state */
      $("[insert_before]").hide();
      let insert_before_node_mayor = $(`.is_mayor[data-filter="0"]`).closest("[list_card]")
      let insert_before_node_not_mayor = $(`.is_mayor[data-filter="1"]`).closest("[list_card]")

      $( "[insert_before=mayor]" ).clone().insertBefore( insert_before_node_mayor.eq(0));
      $( "[insert_before=not-mayor]" ).clone().insertBefore( insert_before_node_not_mayor.eq(0));

      $( "[insert_before]" ).show();

      //$("<h1 insert_before>mayor</h1>").insertBefore( insert_before_node_mayor.eq(0));
      //$("<h1 insert_before>not-mayor</h1>").insertBefore( insert_before_node_not_mayor.eq(0) );
    }

    insert_before_title();

    /* ################# CLICK EVENTS ############### */

    /* ## Disable form feild form subbmition ## */
    $('[fuzzy-search]').submit(function() {
      return false;
    });

    $('[disable_form]').submit(function() {
      return false;
    });




  


    /*set category on load by url params */

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category_param = urlParams.get('category')


    if(category_param !== null && category_param.length > 0){
      filter_query['category'].push(category_param);

      const this_query = buildFilter(filter_query);
      const result = filterData(list_js_data, this_query);
      update_the_number_of_active_filters(false);
      set_active_state(filter_mode, 'category', category_param, filter_query, false);

      /* set menu scroll position */
      
      var left = $(`[data_filter_btn="${category_param}"]`).offset().left;

      if(left > 100){
        $("[scrollable_menu]").scrollLeft( left - 70 );

      }


    }



    $(`[${button_selector}]`).on('click', function() {
      console.clear();


      // Construct URLSearchParams object instance from current URL querystring.
      var queryParams = new URLSearchParams(window.location.search);
      // Set new or modify existing parameter value. 
      queryParams.delete("category");

      // Replace current querystring with the new one.
      history.replaceState(null, null, "?"+queryParams.toString());


      /* ## 1 - get btn values (value and type) ## */
      let this_filter_value = $(this).attr(button_selector);
      const btn_filter_type =  $(this).attr("filter_type");;

      /* Toogle Mechanizem */
      const is_checkbox =  $(this).attr("checkbox") !== undefined ? true : false;
      if(is_checkbox){
        $(this).attr("data_filter_btn", this_filter_value == "true" ? "false" : "true");
      }

      /* ## 2 -😬😬😬😬😬  Set active state 😬😬😬😬😬 ## */
      if(filter_query[btn_filter_type] == undefined){
        console.error("no such filter on the 'filter_query' var named:", btn_filter_type)
        return;
      }
      else if(this_filter_value.toLowerCase() == "all"){
        filter_query[btn_filter_type] = [];
      }else{
        switch (filter_mode) {
            /* 🥶🥶🥶🥶🥶🥶 */ 
          case 'or':
            filter_query[btn_filter_type] = [];
            filter_query[btn_filter_type].push(this_filter_value);
            break;
            /* 🤯🤯🤯🤯🤯🤯 */ 
          case 'and':

            /* ## 1 - check if the value already exists ## */
            let is_filter_exist = filter_query[btn_filter_type].includes(this_filter_value); // true

            /* ## 👽👽 The value exist remove from => filter query ## */
            if(is_filter_exist){
              filter_query[btn_filter_type] = filter_query[btn_filter_type].filter(function (this_filter_query_value) {
                return this_filter_query_value !== this_filter_value;
              });
            }
            /* ## 👾👾 The value not exist add to => filter query ## */
            else{
              filter_query[btn_filter_type].push(this_filter_value);
            };

            if(is_checkbox && this_filter_value !== "false"){
              filter_query[btn_filter_type] = [];
              filter_query[btn_filter_type].push(this_filter_value);
            };
            break;
        }
      }

      /* 3 set active state (or -or- and) */
      set_active_state(filter_mode, btn_filter_type, this_filter_value, filter_query, is_checkbox);

      console.log(filter_query);

      const this_query = buildFilter(filter_query);
      const result = filterData(list_js_data, this_query);
      // list_js_data.sort("is_mayor");
      update_the_number_of_active_filters(false);
    });

    $("[clear_filters]").on( "click", function() {
      /* Reset Query */
      filter_query = {
        category:[

        ],
      };

      /* SET TO DEAAFULT THE DROPDOWN */
      $('.dropdown')
        .dropdown('set selected', "All");

      $(".active_state").removeClass("active_state");
      /* clear search */
      $("input[fuzzy-search]").val("");
      list_js_data.fuzzySearch(); // Show all items in list
      // Remove all filters
      list_js_data.filter(); 

      $('[data_filter_btn="All"]').addClass("active_state")
    });

    $("[fuzzy-search]").on( "focus", function() {
      let this_text = $(this).val();
      list_js_data.fuzzySearch(this_text); 
    });

    /* REMOVE EMPTY Buttons (without any items) => usefull for webflow CMS */

    function remove_filter_buttons_without_match_items(){
      /* list.js remove empty filter btns */
      let all_categories_array = [];

      $("[data-filter=category]" ).each(function( index ) {
        let this_text = $( this ).text();
        all_categories_array.push(this_text);
      });

      //$("[filter_type=category]:not([data_filter_btn=All])").closest(".w-dyn-item").hide();

      /* Show only categories with items (hide empty categories) */
      all_categories_array.forEach(function(category) {
        //console.log("all_categories_array", all_categories_array)
        /* hide webflow cms collection item */
        $(`[data_filter_btn="${category}"]`).closest(".w-dyn-item").show();
        $(`[data_filter_btn="${category}"]`).closest(".w-dyn-item").css("opacity",1);
      });
    }

    remove_filter_buttons_without_match_items();

    /* on load change styles */
    $("[data_filter_btn=All]").addClass("is_active");
    $("[list_js_list_class] [list_card]").css("opacity", 1);
    $("[total_list_items]").css("opacity", 1);
    $("[meta_search_div]").css("opacity", 1);

    /* HELPER FUNCTIONS */

    function update_the_number_of_active_filters(clear){
      /* count the num of active filters */
      let num_of_filters = 0;
      Object.entries(filter_query).forEach(([key, value]) => {
        if(value.length > 0){
          num_of_filters = num_of_filters + value.length
        }
      });

      /* prefare data */
      const $num_of_active_filters_node = $("[num_of_active_filters]");

      let filter_btn_text = num_of_filters > 0 ? `${button_that_open_the_modal_text} (${num_of_filters})` : button_that_open_the_modal_text;
      num_of_filters > 0 ? $num_of_active_filters_node.text(`Filter (${num_of_filters})`) : $num_of_active_filters_node.text(`${button_that_open_the_modal_text}(${num_of_filters})`);
      /* Update The UI */
      if(!clear){
        $num_of_active_filters_node.text(filter_btn_text);
      }else{
        $num_of_active_filters_node.text(button_that_open_the_modal_text);
      }
    }/* end update_the_number_of_active_filters */

    function on_load_list_js(){
      $(".active_state").removeClass("active_state");
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
      $("[data_filter_btn]" ).each(function( index ) {
        const this_filter_btn = $( this ).attr("data_filter_btn").trim();
        $( this ).attr("data_filter_btn", this_filter_btn);
      });



      remove_filter_buttons_without_match_items();
    }

    /* ################# FILTERS ################# */
    function buildFilter(filter){
      /* code reference: Tyler Burdsall - Medium:
                                                                  https://tylerburdsall.medium.com/building-a-dynamic-filter-with-es6-javascript-71dfeb50c371
                                                                  */
      let query = {};
      for (let keys in filter) {
        //console.log(keys, filter[keys], filter, query[keys], filter[keys])
        if ( (filter[keys].constructor === Object) || (filter[keys].constructor === Array && filter[keys].length > 0)) {
          query[keys] = filter[keys];
        }
      }
      return query;
    };
    function filterData(data, query){

      /* code reference: Tyler Burdsall - Medium: https://tylerburdsall.medium.com/building-a-dynamic-filter-with-es6-javascript-71dfeb50c371 */
      const keysWithMinMax = [
        'listPrice',
        'bedrooms'
      ];
      const filteredData = list_js_data.filter((this_item) => {
        const list_js_item = this_item._values;/*list js data */




        for (let key in query) {

          const query_lowercaseWords = query[key].map(word => word.toLowerCase());





          //console.log(query['program']);


          if(list_js_item[key] === undefined) {/* if 1 */
            console.log("1111111111111111111111");
            return false;
          }
          else if(keysWithMinMax.includes(key)) {/* 3 */
            console.log("33333333333333333333333");
            if (query[key]['min'] !== null && list_js_item[key] < query[key]['min']) {
              //return false;
            }
            if(query[key]['max'] !== null && list_js_item[key] > query[key]['max']) {
              //return false;
            }
          }
          else if(!query_lowercaseWords.includes(list_js_item[key].toLowerCase())) {/* 4 - if 3 (! בודק אם לא דומה ומחזיר שקר) */
            console.log("44444444444444444");
            return false;
          }
        }/* end inner loop */

        /* 2 of 2 - return true */
        return true;
      });
      return filteredData;
    };




  }/* close load list js function */






});/* end DOMContentLoaded */