/* INCOSE IL 2027: the popup, and the registration's reveal (the menu is Bootstrap's own collapse, nothing here) */
(() => {
  // a touch listener on the page, so iPhone Safari shows the CSS :active (press) state
  document.addEventListener('touchstart', () => {}, { passive: true });

  // the phone menu (Bootstrap's collapse): while it is open the page under it dims; a tap outside it, or Esc, closes it (Bootstrap's own API).
  // The dim layer catches that tap, so it only closes the menu and does not also press what is under it
  const panel = document.getElementById('st-nav-panel');
  if (panel) {
    panel.addEventListener('show.bs.collapse', () => document.body.classList.add('st-menu-open'));
    panel.addEventListener('hide.bs.collapse', () => document.body.classList.remove('st-menu-open'));
    const close = () => { if (panel.classList.contains('show') && window.bootstrap) window.bootstrap.Collapse.getOrCreateInstance(panel, { toggle: false }).hide(); };
    document.addEventListener('click', (event) => { if (!event.target.closest('.st-nav')) close(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  }

  // the registration: their scripts rewrite it while the page loads; it is shown once they are done
  const register = document.querySelector('.st-register');
  if (register) window.addEventListener('load', () => register.classList.add('is-ready'));

  // the popup: <button data-pop="x"> fills the one <dialog> from <template id="pop-x" data-title data-meta="a|b|c">
  // (the build writes both from _src/popups.json):
  // the title, a label for each part of data-meta (the session, the time, the person), the template's content as the body.
  // The dialog is the browser's own: focus moves in and stays inside, Esc closes, focus returns to the button.
  // A popup opened from inside the open one (a lecture from its session) keeps a way back: "חזרה ל..." at the top.
  const pop = document.getElementById('st-pop');
  if (!pop) return;
  const title = pop.querySelector('#st-pop-title');
  const meta = pop.querySelector('.st-pop-meta');
  const body = pop.querySelector('.st-pop-body');
  const back = pop.querySelector('.st-pop-back');
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const trail = [];   // the popups this one was opened from, the latest last
  let current = null;

  const show = (name) => {
    const template = document.getElementById(`pop-${name}`);
    if (!template) return false;
    current = name;
    pop.dir = template.dataset.dir || 'rtl';   // an English popup is written left to right
    title.textContent = template.dataset.title || '';
    meta.replaceChildren(...(template.dataset.meta || '').split('|').filter(Boolean).map((text) => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    meta.hidden = !meta.children.length;
    body.replaceChildren(template.content.cloneNode(true));
    body.scrollTop = 0;
    // the way back: to the popup it was opened from, by its name (data-back: "חזרה למושב 1.3", "חזרה לפאנל המומחים")
    const from = trail.length ? document.getElementById(`pop-${trail[trail.length - 1]}`) : null;
    back.hidden = !from;
    if (from) back.querySelector('span').textContent = `חזרה ל${from.dataset.back || from.dataset.title}`;
    return true;
  };
  // a soft change of content inside the open popup (none with reduced motion)
  const glide = () => {
    if (!still.matches) pop.querySelector('.st-pop-in').animate([{ opacity: 0.35, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'ease-out' });
  };

  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-pop]');
    if (opener) {
      const wasOpen = pop.open;
      if (wasOpen) trail.push(current); else trail.length = 0;
      // its colour: the track it was opened from (a track 2 cube: blue); a switch inside the popup keeps it
      if (!wasOpen) pop.dataset.track = opener.closest('.st-t2') ? '2' : '1';
      if (!show(opener.dataset.pop)) { if (wasOpen) trail.pop(); return; }
      if (wasOpen) { glide(); back.focus(); } else pop.showModal();
      return;
    }
    if (event.target.closest('.st-pop-back')) {
      show(trail.pop());
      glide();
      (back.hidden ? pop.querySelector('.st-pop-x') : back).focus();
      return;
    }
    // a click on the dark around it (the dialog itself, outside its box) or on a close button
    if (event.target === pop || event.target.closest('.st-pop-x, .st-pop-close')) pop.close();
  });
  pop.addEventListener('close', () => { trail.length = 0; });
})();
