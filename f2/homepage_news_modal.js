$( "[data-src]" ).each(function( index ) {
  const this_data_src =  $( this ).attr("data-src");
  const new_data_src = "#"+this_data_src;
  $( this ).attr("data-src", new_data_src);

});


/* fancybox */
Fancybox.bind('[data-fancybox]', {
  // Custom options for all galleries
  closeButton: false,
  autoFocus: false,
  groupAttr: false,
  dragToClose: false,



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