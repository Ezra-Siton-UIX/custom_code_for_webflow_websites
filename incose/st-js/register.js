// the registration page's code (register.html): what was written inline in their module, moved here so the page holds only markup.
// The form itself is their code, on their server: /js/reg.js, /js/my.js and /js/script_act2027.js (it writes the price table and the date choice).

// 1. the activity's settings, as their PHP wrote them for activity 4086 (prices, VAT, payment links, error messages).
//    On their server the PHP writes these values; reg.js reads them as globals
    var RECID =  ['4086'];
    var VAT = parseFloat('1.18',10);
    var localErrors = {"missing-email":"חסר מייל","invalid-email":"מייל לא תקין","missing-fname":"חסר שם פרטי","missing-lname":"חסר שם משפחה",
"missing-cname":"חסר שם חברה","missing-jname":"חסר תפקיד","missing-phone":"חסר טלפון נייד","invalid-phone":"מספר טלפון לא תקין",
"reg_exists":"הרשמה לפעילות זו כבר קיימת",
"credit_error":"שגיאה - לא ניתן לשלם באשראי",
"paypal_error":"PAYPAL AMOUNT ERROR",
"reg_remove":"הסר",
"non-member-but-selected":"לא זוהה, חברותך תאומת לאחר ההרשמה"};
    var actGRP = {"p":1050,"0":1050,"1":600,"v0":"1,239","g0":"aHR0cHM6Ly9tZXNodWxhbS5jby5pbC9zL2M3OGQyZjAzLTMyZTUtOTE5Zi1hMzhkLTVjMzI3ZjdmNWVkZg==","v1":"708","g1":"aHR0cHM6Ly9tZXNodWxhbS5jby5pbC9zL2E1MDIwZDhhLTg2ODktY2JjMS1mNmVmLTE2MTIyZDYwMDA4NQ==","all":"aHR0cHM6Ly9tZXNodWxhbS5jby5pbC9zL2M3OGQyZjAzLTMyZTUtOTE5Zi1hMzhkLTVjMzI3ZjdmNWVkZg==","iincose":"aHR0cHM6Ly9tZXNodWxhbS5jby5pbC9zL2E1MDIwZDhhLTg2ODktY2JjMS1mNmVmLTE2MTIyZDYwMDA4NQ==","std":"error","lec":"aHR0cHM6Ly9tZXNodWxhbS5jby5pbC9zLzczYmE0MmU1LTQxNDMtMWFjZi1iYzA3LTBiZDY4MGQ0Y2JkOQ==","aud":"error","ieee":"aHR0cHM6Ly9tZXNodWxhbS5jby5pbC9zLzQ0OWI3ODQ5LTkwMzYtN2Q3NS1kMzgyLTQyM2QzNzhhNTUzYg==","vaa":"aHR0cHM6Ly9tZXNodWxhbS5jby5pbC9zLzdhNDdiZDJmLTU3NzItZTM1MC0yN2MxLWNhYWU0OTlmYjUxMg==","g_error":1};
    var actPRC = [{"groupCode":"all","groupName":"קהל רחב","price":1050,"price_vat":1239},{"groupCode":"iincose","groupName":"IncoseIL","price":600,"price_vat":708},{"groupCode":"iincose","groupName":"חברי INCOSE_IL","price":"600,300,900","price_vat":708},{"groupCode":"std","groupName":"סטודנטים להנדסת מערכות","price":"330,130,440","price_vat":389.4},{"groupCode":"lec","groupName":"מרצים ויו\"ר מושבים","price":"0,300,300","price_vat":0},{"groupCode":"aud","groupName":"קהל רחב","price":"800,300,1050","price_vat":944},{"groupCode":"ieee","groupName":"חברי IEEE","price":"550,400,850","price_vat":649},{"groupCode":"vaa","groupName":"חברי ועדת התוכנית","price":"400,300,650","price_vat":472}];
    var actDate = '12/01/2027';

// 2. their links marked .air open in a new tab (it ran at the bottom of the page: here it waits for the page)
document.addEventListener('DOMContentLoaded', function () {
    for (var e in document.getElementsByClassName("air")){
        document.getElementsByClassName("air")[e].target="_Blank";
    }
});
