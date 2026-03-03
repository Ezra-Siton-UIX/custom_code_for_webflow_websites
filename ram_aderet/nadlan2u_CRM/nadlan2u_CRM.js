export function nadlan2u_CRM() {

  /*
nadlan2u_CRM – Console / Debug Usage Documentation

After the script loads, two global functions are available for testing:

1️⃣ getFinalUrlFromForm(form)
-----------------------------------
- Returns the FINAL URL as it would be sent to the CRM.
- All values are URL-encoded (including Hebrew text).
- Usage:
    const form = document.querySelector('form'); // select your form
    const finalUrl = getFinalUrlFromForm(form);
    console.log(finalUrl);

2️⃣ getFinalUrlObject(form)
-----------------------------------
- Returns a readable JS object with all fields:
    - fullname
    - phone
    - email
    - note
    - projectid
    - and other parameters
- All values are decoded (decodeURIComponent), including Hebrew, email, and numbers.
- Usage:
    const form = document.querySelector('form'); // select your form
    const finalObj = getFinalUrlObject(form);
    console.log(finalObj);

Example output of getFinalUrlObject(form):
{
  globalpass: "ram33ad4",
  publisher: "8825",
  banner: "website",
  projectid: "3208",
  fullname: "Ezra Siton",
  phone: "0523408910",
  email: "siton22@hotmail.com",
  note: "Karmi Gat test by site developer"
}

Tips:
- Always use a precise selector if there are multiple forms on the page:
    const form = document.querySelector('form#contactForm');
- Using the console allows you to preview values in real-time without submitting the form.
- If new fields are added to the form, getFinalUrlObject will automatically decode them.
*/


  const CONFIG = {
    crmFormAttribute: "data_nadlan_crm",
    publisher: "8825", // old value 11528
    globalpass: "ram33ad4",
    banner: "website",
    apiBaseUrl: "https://www.n2u.co.il/leadsbanner.asmx/getleadsbanner",
    note: "", // ← note קבוע לכל הקריאות
    DEBUG: false
  };

  // ------------------- פונקציה לניקוי תווים מיוחדים -------------------
  function cleanText(str) {
    if (!str) return "";
    // מסיר תווי כיוון RTL/LTR (U+200E, U+200F, U+202A–U+202E)
    return str.replace(/[\u200E\u200F\u202A-\u202E]/g, '').trim();
  }

  // ------------------- הפונקציה שמייצרת URL מהטופס -------------------
  function getLeadUrlFromForm(form) {
    const bodyProjectId = document.body.getAttribute('projectid')?.trim();
    const selectProjectId = form.querySelector('select[data-custom-select]')?.value?.trim();
    const projectid = bodyProjectId || selectProjectId;

    if (!projectid || projectid === 'general') {
      console.warn("No project selected – or general selected - skipping CRM submit");
      return null;
    }

    const fullname = cleanText(form.querySelector('[data-fullname]')?.value) || "";
    const phone    = cleanText(form.querySelector('[data-phone]')?.value) || "";
    const email    = cleanText(form.querySelector('[data-email]')?.value) || "";
    const note     = cleanText(form.querySelector('[data-note]')?.value) || "";

    const url = new URL(CONFIG.apiBaseUrl);
    url.searchParams.set("globalpass", CONFIG.globalpass);
    url.searchParams.set("publisher", CONFIG.publisher);
    url.searchParams.set("banner", CONFIG.banner);
    url.searchParams.set("projectid", projectid);
    url.searchParams.set("fullname", fullname);
    url.searchParams.set("phone", phone);
    url.searchParams.set("email", email);
    url.searchParams.set("note", note);

    return url.toString();
  }

  // ------------------- פונקציות גלובליות ל-FINAL URL ואובייקט -------------------
  window.getFinalUrlFromForm = function(form) {
    const url = getLeadUrlFromForm(form);
    console.log("FINAL URL:", url);
    return url;
  };

  window.getFinalUrlObject = function(form) {
    const urlString = getLeadUrlFromForm(form);
    if (!urlString) return null;

    const url = new URL(urlString);
    const params = {};
    for (const [key, value] of url.searchParams.entries()) {
      params[key] = decodeURIComponent(value); // מפענח עברית, אימייל וכו'
    }
    console.log("FINAL URL as object:", params);
    return params;
  };

  // ------------------- שמירת ההתנהגות הקיימת של submit -------------------
  document.addEventListener('submit', function (e) {
    const form = e.target;

    // ⛔ לא טופס CRM → יוצאים
    if (!form.hasAttribute(CONFIG.crmFormAttribute)) {
      return;
    }

    const select = form.querySelector('select[data-custom-select]');
    const bodyProjectId = document.body.getAttribute('projectid')?.trim();
    const projectid = bodyProjectId || select?.value?.trim();

    if (projectid === 'general') {
      console.warn("General info selected – skipping CRM, submitting only to Webflow");
      return; // לא שולחים ל-CRM
    }

    const finalUrl = getLeadUrlFromForm(form);

    if (!finalUrl) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    console.log("Generated Lead URL:", finalUrl);

    if (!CONFIG.DEBUG) {
      fetch(finalUrl)
        .then(res => res.text())
        .then(data => console.log("CRM response:", data))
        .catch(err => console.error("CRM error:", err));
    } else {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
    
    // GA events
    
  });

  // ------------------- הפונקציה המקורית שלך לשדות select -------------------
  function select_menu_nadlan2u_crm() {
    console.log('select_menu_nadlan2u_crm init');

    const lang = document.body.classList.contains('ltr') ? 'en' : 'he';
    const values = [];
    const listWrapper = document.querySelector('[form_select_menu_source]');
    if (!listWrapper) return;

    const items = listWrapper.querySelectorAll('[project_form_dropdown_item]');

    items.forEach(item => {
      const project_name = item.querySelector(`[project_form_dropdown_wrapper=${lang}] [project_title]`).textContent.trim();
      const project_location = " – " + item.querySelector(`[project_form_dropdown_wrapper=${lang}] [project_location]`).textContent.trim();
      const tnufaElement = item.querySelector(`[project_form_dropdown_wrapper=${lang}] [tnufa_bair]:not(.w-condition-invisible)`);
      const tnufa_bair = tnufaElement ? " • " + tnufaElement.textContent.trim(): "";
      const nadlan_2u_project_id = item.querySelector("[nadlan_2u_project_id]").getAttribute('nadlan_2u_project_id');

      let name;
      if (window.innerWidth > 768) {
        name = project_name + project_location + tnufa_bair;
      } else {
        name = project_name + project_location;
      }

      values.push({
        name,
        nadlan_2u_project_id,
        type: 'item'
      });
    });

    const selects = document.querySelectorAll('select[data-custom-select]');
    selects.forEach(select => {
      select.innerHTML = '';
      const placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      placeholderOption.textContent = lang == "he" ? "בחר פרויקט..." : "Select Project...";
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      select.appendChild(placeholderOption);

      values.forEach(item => {
        if (item.type !== 'item') return;
        const option = document.createElement('option');
        option.value = item.nadlan_2u_project_id;
        option.textContent = item.name;
        select.appendChild(option);
      });

      const addToStart = true;
      const generalOption = document.createElement('option');
      generalOption.value = 'general';
      generalOption.textContent = lang == "he" ? "מידע כללי" : "General Info";

      if (addToStart) {
        select.insertBefore(generalOption, select.children[1]);
      } else {
        select.appendChild(generalOption);
      }

      function preselectProjectFromBody(select) {
        const projectid = document.body.getAttribute('projectid');
        const hiddenField_project_name = document.querySelector('input[data-project_name]');
        if (!projectid) return;
        const option = select.querySelector(`option[value="${projectid}"]`);
        if (!option) return;
        select.value = projectid;
        hiddenField_project_name.value = option.text;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('Preselected project:', {
          value: projectid,
          label: option.textContent
        });
      }

      preselectProjectFromBody(select);

      select.addEventListener('change', e => {
        console.log({
          value: e.target.value,
          label: e.target.options[e.target.selectedIndex]?.text
        });
        const form = e.target.closest('form');
        const hiddenField_project_name = form.querySelector('input[data-project_name]');
        if (hiddenField_project_name) {
          const this_select_value = e.target.options[e.target.selectedIndex]?.text;
          hiddenField_project_name.value = this_select_value || "";
        }
      });
    });
  }

  // קריאה לפונקציה המקורית
  select_menu_nadlan2u_crm();

  console.log("nadlan2u_CRM loaded (DEBUG:", CONFIG.DEBUG, ")");
}
