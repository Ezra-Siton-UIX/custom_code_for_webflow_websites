export function nadlan2u_CRM() {

  const CONFIG = {
    publisher: "8825", // old value 11528
    globalpass: "ram33ad4",
    banner: "website",
    apiBaseUrl: "https://www.n2u.co.il/leadsbanner.asmx/getleadsbanner",
    note: "", // ← note קבוע לכל הקריאות
    DEBUG: true
  };

  function getLeadUrlFromForm(form) {
    // 👇 קודם בודקים אם יש projectid ב-body
    const bodyProjectId = document.body.getAttribute('projectid')?.trim();

    // 👇 אם אין bodyProjectId, נשתמש בערך מה-select
    const selectProjectId = form
    .querySelector('select[data-custom-select]')?.value?.trim();

    const projectid = bodyProjectId || selectProjectId;

    if (!projectid || projectid === 'general') {
      console.warn("No project selected – or general selected - skipping CRM submit");
      return null;
    }

    const fullname = form.querySelector('[data-fullname]')?.value?.trim() || "";
    const phone    = form.querySelector('[data-phone]')?.value?.trim() || "";
    const email    = form.querySelector('[data-email]')?.value?.trim() || "";
    const note  = form.querySelector('[data-note]')?.value?.trim() || "";

    const url = new URL(CONFIG.apiBaseUrl);
    // consts
    url.searchParams.set("globalpass", CONFIG.globalpass);
    url.searchParams.set("publisher", CONFIG.publisher);
    url.searchParams.set("banner", CONFIG.banner);
    // vars
    url.searchParams.set("projectid", projectid);
    url.searchParams.set("fullname", fullname);
    url.searchParams.set("phone", phone);
    url.searchParams.set("email", email);
    url.searchParams.set("note", note);

    return url.toString();
  }


  document.addEventListener('submit', function (e) {
    const form = e.target;


    // בודקים את ה-select ואת projectid מה-body
    const select = form.querySelector('select[data-custom-select]');
    const bodyProjectId = document.body.getAttribute('projectid')?.trim();
    const projectid = bodyProjectId || select?.value?.trim();

    // אם projectid הוא "general" – שולחים רק ל-Webflow, לא ל-CRM
    if (projectid === 'general') {
      console.warn("General info selected – skipping CRM, submitting only to Webflow");
      return; // לא שולחים ל-CRM
    }

    const finalUrl = getLeadUrlFromForm(form);

    // אין projectid – נמנע את השליחה לחלוטין
    if (!finalUrl) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    console.log("Generated Lead URL:", finalUrl);

    if (!CONFIG.DEBUG) {
      // שולחים ל-CRM
      fetch(finalUrl)
        .then(res => res.text())
        .then(data => console.log("CRM response:", data))
        .catch(err => console.error("CRM error:", err));

      // מאפשרים ל-Webflow לשלוח את הטופס רגיל
      // לא עושים stopImmediatePropagation()
      // לא עושים preventDefault() אם רוצים submit רגיל
      // אם רוצים לשלוח ידנית אחרי fetch, אפשר להשתמש ב: form.submit();
    } else {
      // DEBUG=false → בודקים בלי לשלוח Webflow
      alert("ww")
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  });


  // select_menu_nadlan2u_crm
  function select_menu_nadlan2u_crm() {
    console.log('select_menu_nadlan2u_crm init');

    const lang = document.body.classList.contains('ltr') ? 'en' : 'he';

    const values = [];

    // מקור ה-CMS
    const listWrapper = document.querySelector('[form_select_menu_source]');
    if (!listWrapper) return;

    const items = listWrapper.querySelectorAll('[project_form_dropdown_item]');

    items.forEach(item => {
      // console.log(item);
      const project_name = item.querySelector(`[project_form_dropdown_wrapper=${lang}] [project_title]`).textContent.trim();
      const project_location = " – " + item.querySelector(`[project_form_dropdown_wrapper=${lang}] [project_location]`).textContent.trim();

      const tnufaElement = item.querySelector(`[project_form_dropdown_wrapper=${lang}] [tnufa_bair]:not(.w-condition-invisible)`);
      const tnufa_bair = tnufaElement ? " • " + tnufaElement.textContent.trim(): "";

      const nadlan_2u_project_id = item.querySelector("[nadlan_2u_project_id]").getAttribute('nadlan_2u_project_id');

      let name;

      if (window.innerWidth > 768) { // רק למסכים גדולים מ-768px
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

    // console.log('VALUES:', values);

    // SELECT של Webflow – עכשיו על כל הסלקטים בדף
    const selects = document.querySelectorAll('select[data-custom-select]');
    selects.forEach(select => {
      // ניקוי כל האופציות הקיימות
      select.innerHTML = '';

      // יצירת placeholder ראשוני
      const placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      placeholderOption.textContent = lang == "he" ? "בחר פרויקט..." : "Select Project...";
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      select.appendChild(placeholderOption);

      // רינדור האופציות
      values.forEach(item => {
        if (item.type !== 'item') return;

        const option = document.createElement('option');
        option.value = item.nadlan_2u_project_id;
        option.textContent = item.name;
        select.appendChild(option);
      });

      // הוספת אופציית "כללי" בסוף
      const addToStart = true; // שנה ל-false אם רוצים להוסיף בסוף

      const generalOption = document.createElement('option');
      generalOption.value = 'general';
      generalOption.textContent = lang == "he" ? "מידע כללי" : "General Info";

      if (addToStart) {
        // הכנס אחרי האופציה ה-disabled הראשונה
        select.insertBefore(generalOption, select.children[1]);
      } else {
        // הוסף בסוף
        select.appendChild(generalOption);
      }


      // preselect לפי body
      function preselectProjectFromBody(select) {
        const projectid = document.body.getAttribute('projectid');
        // value as text to webflow forms
        const hiddenField_project_name = document.querySelector('input[data-project_name]');

        if (!projectid) return;

        const option = select.querySelector(`option[value="${projectid}"]`);
        if (!option) return;

        select.value = projectid;
        hiddenField_project_name.value = option.text;
        
        // אופציונלי – אם יש לוגיקה על change
        select.dispatchEvent(new Event('change', { bubbles: true }));

        console.log('Preselected project:', {
          value: projectid,
          label: option.textContent
        });
      }
      console.log(select);

      preselectProjectFromBody(select);

      // האזנה לשינוי (אופציונלי)
      select.addEventListener('change', e => {
        console.log({
          value: e.target.value,
          label: e.target.options[e.target.selectedIndex]?.text
        });

        const form = e.target.closest('form'); // מוצא את הטופס שה-select שייך לו
        const hiddenField_project_name = form.querySelector('input[data-project_name]');

        if (hiddenField_project_name) {
          const this_select_value = e.target.options[e.target.selectedIndex]?.text;
          hiddenField_project_name.value = this_select_value || "";
        }

      });
    });
  }// end select_menu_nadlan2u_crm
  
  select_menu_nadlan2u_crm();

  console.log("nadlan2u_CRM loaded (DEBUG:", CONFIG.DEBUG, ")");
}
