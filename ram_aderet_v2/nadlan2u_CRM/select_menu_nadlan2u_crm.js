export function select_menu_nadlan2u_crm() {
  //console.log('select_menu_nadlan2u_crm init');

  const lang = document.body.classList.contains('ltr') ? 'en' : 'he';

  const values = [];

  // מקור ה-CMS
  const listWrapper = document.querySelector('[form_select_menu_source]');
  if (!listWrapper) return;

  const items = listWrapper.querySelectorAll('[project_form_dropdown_item]');

  items.forEach(item => {
    //console.log(item);
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
    const generalOption = document.createElement('option');
    generalOption.value = 'general';
    generalOption.textContent = lang == "he" ? "כללי" : "General";
    select.appendChild(generalOption);

    // preselect לפי body
    function preselectProjectFromBody(select) {
      const projectid = document.body.getAttribute('projectid');
      if (!projectid) return;

      const option = select.querySelector(`option[value="${projectid}"]`);
      if (!option) return;

      select.value = projectid;

      // אופציונלי – אם יש לוגיקה על change
      select.dispatchEvent(new Event('change', { bubbles: true }));

      console.log('Preselected project:', {
        value: projectid,
        label: option.textContent
      });
    }

    preselectProjectFromBody(select);

    // האזנה לשינוי (אופציונלי)
    select.addEventListener('change', e => {
      console.log({
        value: e.target.value,
        label: e.target.options[e.target.selectedIndex]?.text
      });
    });
  });
}
