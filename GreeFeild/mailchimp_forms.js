
/* Trick to connect webflow regular form to mailchimp form without zapier */
/* ezra siton - march 21 */
let wb_form_want_to_receive_newsletters;

// name="tags
// 4891042
// 6410864

const $mailchimp_tags = $('[name="tags"]');
let this_mailchimp_value_tag_code = "";
$mailchimp_tags.val("");

const $PAGE_URL_feild = $('[name="PAGE_URL"]');
const path = window.location;
$PAGE_URL_feild.val(path);




$("[type=radio]").on( "change", function() {
  this_radio_value = $( this ).val();
  let this_mailchimp_value_tag_code;

  switch(this_radio_value) {
    case "Founder":
      this_mailchimp_value_tag_code = "4891042";
      break;
    case "Investor":
      this_mailchimp_value_tag_code = "6410864";
      break;
    case "Other":
      this_mailchimp_value_tag_code = "";
      break;
    default:
      this_mailchimp_value_tag_code = "";
  }/* end switch */

  /* set mailchimp tag */
  $mailchimp_tags.val(this_mailchimp_value_tag_code);

} )

function split_full_name_to_first_and_last_name(input) {
  var fullName = input || "";
  var result = {};

  if (fullName.length > 0) {
    var nameTokens = fullName.match(/(?:(?:[A-ZÁ-ÚÑÜ][a-zá-úñü]+){1,2})|(?:(?:[aeodlsz]{1,3}[ ]){0,2}[A-ZÁ-ÚÑÜ][a-zá-úñü]+)/gmis) || [];

    switch (nameTokens.length) {
      case 1:
        [result.name] = nameTokens;
        break;
      case 2:
        [result.name, result.lastName] = nameTokens;
        break;
      case 3:
        [result.name, result.lastName, result.secondLastName] = nameTokens;
        break;
      default:
        [result.name, result.middleName, result.lastName, result.secondLastName] = nameTokens;
    }
  }

  return result;
}

// On 'blur' will update when you click off the field FORM_LOCAT
$('[webflow_form] form input:not([type=radio])').on('blur', function(){
  /* Getters (get the value of webflow regular form) */
  let this_wb_feild_type = $(this).attr("data-field");
  if(this_wb_feild_type !== undefined){
    this_wb_feild_type = this_wb_feild_type.toUpperCase();
  }
  const this_wb_feild_value = $(this).val();

  if(this_wb_feild_type == "EMAIL"){
    $(`[data-form-name=mailchimp] [name=${this_wb_feild_type}]`).val(this_wb_feild_value);
  }

  if(this_wb_feild_type == "FNAME"){
    const full_name_object = split_full_name_to_first_and_last_name(this_wb_feild_value);
    $(`[data-form-name=mailchimp] [name=FNAME]`).val(full_name_object.name);
    $(`[data-form-name=mailchimp] [name=LNAME]`).val(full_name_object.lastName);
  }
});/* end on blur       david@greenfield-growth.com  */

/* webflow form node */
let $webflow_form = $( "[webflow_form] form" );
let mailchimp_form = $( "[data-form-name=mailchimp] form" );
/* when webflow form submit */
$webflow_form.submit(function( event ) {
  const form_loaction = $(this).attr("form_location");
  $(`[data-form-name=mailchimp] [name=FORM_LOCAT]`).val(form_loaction);

  if(form_loaction !== "Website Navbar Subscribe"){
    $mailchimp_tags.val("");
  }
  /* if _want_to_receive_newsletters is TRUE */
  /* send mailchimp form by code */
  $("#mc-embedded-subscribe").click();

});