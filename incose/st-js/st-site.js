/* INCOSE IL 2027: the popup, and the registration's reveal (the menu is Bootstrap's own collapse, nothing here) */
(() => {
  // the registration: their scripts rewrite it while the page loads; it is shown once they are done
  const register = document.querySelector('.st-register');
  if (register) window.addEventListener('load', () => register.classList.add('is-ready'));

  // the popup: <button data-pop="x"> fills the one <dialog> from <template id="pop-x" data-title data-meta="a|b|c">
  // (the build writes both from _src/popups.json):
  // the title, a label for each part of data-meta (the session, the time, the person), the template's content as the body.
  // The dialog is the browser's own: focus moves in and stays inside, Esc closes, focus returns to the button.
  const pop = document.getElementById('st-pop');
  if (!pop) return;
  const title = pop.querySelector('#st-pop-title');
  const meta = pop.querySelector('.st-pop-meta');
  const body = pop.querySelector('.st-pop-body');
  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-pop]');
    if (opener) {
      const template = document.getElementById(`pop-${opener.dataset.pop}`);
      if (!template) return;
      pop.dir = template.dataset.dir || 'rtl';   // an English popup is written left to right
      title.textContent = template.dataset.title || '';
      meta.replaceChildren(...(template.dataset.meta || '').split('|').filter(Boolean).map((text) => {
        const item = document.createElement('li');
        item.textContent = text;
        return item;
      }));
      meta.hidden = !meta.children.length;
      body.replaceChildren(template.content.cloneNode(true));
      pop.showModal();
      body.scrollTop = 0;
      return;
    }
    // a click on the dark around it (the dialog itself, outside its box) or on a close button
    if (event.target === pop || event.target.closest('.st-pop-x, .st-pop-close')) pop.close();
  });
})();
