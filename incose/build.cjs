// Puts the site together, from _src/ into the finished pages next to this file. Edit _src, then run it again:
//   node build.cjs         → index.html, day1.html, ... at the root (open them as they are)
//   node build.cjs --php   → _php/: the same pages named .php, the links too, with the folders they need: ready to upload
// One source of truth for each thing:
//   _src/people.json       every person, once: name, organisation, photo, bio (name_en / org_en where the page is English).
//                          Anywhere a person appears, a page or the program names them by key, and the build writes them from here
//   _src/program.json      both days' programs, once: rows (time, kind), sessions (number, title, the chair's key, lectures). The build
//                          draws the tables and writes every program popup from it
//   _src/pages/*.html      each page's frame; its first line is {"title", "description" (SEO), "nav": the menu item it marks,
//                          "crumb": its name in the breadcrumbs, "when": its date and place in the banner (inner pages)}. Markers in it:
//                            <!-- @program day1 -->                 a day's program table (from program.json)
//                            <!-- @tile ram | יו"ר מושב 2.2 -->    a person's tile (from people.json; the role after | is optional)
//                            <!-- @figure shoker | יו"ר יום הכנס --> a person's signature figure (photo, name, role, organisation)
//                            -en versions (@tile-en, @figure-en) use the person's English name and organisation
//   _src/partials/*.html   the shared pieces: <!-- @head --> <!-- @nav --> <!-- @banner --> <!-- @footer --> <!-- @end -->
const fs = require('fs');
const path = require('path');
const DIR = __dirname;
const SRC = path.join(DIR, '_src');
const php = process.argv.includes('--php');
const OUT = php ? path.join(DIR, '_php') : DIR;
const PAGES = ['index', 'day1', 'day2', 'speakers', 'committees', 'register'];
const PLACEHOLDER = 'assets/incose_vip_person.png';   // their grey silhouette, for a person with no photo

const part = (name) => fs.readFileSync(path.join(SRC, 'partials', `${name}.html`), 'utf8').trimEnd();
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(SRC, name), 'utf8'));
const people = readJson('people.json');
const program = readJson('program.json');
// a file's fingerprint (from its content) on its link: a changed CSS or JS gets a new address, so no browser shows an old copy
const stamp = (file) => require('crypto').createHash('md5').update(fs.readFileSync(path.join(DIR, file))).digest('hex').slice(0, 8);
const STAMPS = Object.fromEntries(['st-css/st.css', 'st-js/st-site.js', 'st-js/register.js'].map((file) => [file, stamp(file)]));
const attr = (text) => String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const strip = (html) => String(html).replace(/<[^>]+>/g, '');

// ---- people ----
const who = (key) => {
  const p = people[key];
  if (!p) throw new Error(`no "${key}" in _src/people.json`);
  return p;
};
const nameOf = (p, en) => (en && p.name_en) || p.name;
const orgOf = (p, en) => (en && p.org_en) || p.org || '';

// ---- popups: the program's (filled while a day is drawn, by id) and, for p-<key>, any person straight from people.json ----
const popups = {};
const pick = (name) => popups[name] || (name.startsWith('p-') && people[name.slice(2)] && people[name.slice(2)].bio ? { person: name.slice(2) } : undefined);
const extraLinked = new Set();   // popups a page needs beyond its cubes (a panel's panelists), collected while its program is drawn
// a panel's panelists: the same cards as the lectures; each opens that person's card (when they have a bio)
const panelistItems = (keys) => keys.map((key) => {
  const p = who(key);
  const inner = `<span class="st-lecture-ttl">${p.name}</span> <span class="st-lecture-who">${p.img ? `<img src="${p.img}" alt="" width="28" height="28">` : ''}${p.org || ''}</span>`;
  if (!p.bio) return `<li class="st-lecture">${inner}</li>`;
  extraLinked.add(`p-${key}`);
  return `<li><button class="st-lecture" type="button" data-pop="p-${key}" aria-haspopup="dialog">${inner}`
    + '<span class="st-lecture-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></span></button></li>';
}).join('\n              ');
const popupTitle = (name) => pick(name).title || people[pick(name).person].name;

// a person in a popup: a card under the running text, its role on top, the round photo beside the name and the organisation, the bio
const person = (key, role, en) => {
  const p = who(key);
  return `<aside class="st-person-card">${role ? `<p class="st-person-role">${role}</p>` : ''}`
    + `<div class="st-person">${p.img ? `<img src="${p.img}" alt="" width="80" height="80">` : ''}<p><b>${nameOf(p, en)}</b>${orgOf(p, en) ? `<span>${orgOf(p, en)}</span>` : ''}</p></div>`
    + `<div class="st-bio"${p.dir ? ` dir="${p.dir}"` : ''}>${p.bio}</div></aside>`;
};
// a session's lectures as list items: each lecture a whole-card button (its number, title, speaker and an arrow) that opens its own popup.
// `linked` (when given) collects the lectures, so the page gets their popups
const lectureItems = (keys, session, linked) => keys.map((key) => {
  const lecture = popups[key];
  if (!lecture) throw new Error(`lecture "${key}" (in "${session}") was not drawn from _src/program.json`);
  const p = lecture.person ? who(lecture.person) : null;
  const speaker = p ? `<span class="st-lecture-who">${p.img ? `<img src="${p.img}" alt="" width="28" height="28">` : ''}${p.name}${p.org ? `, ${p.org}` : ''}</span>` : '';
  // a lecture that does not open: "clickable": false (e.g. no lecturer yet), or nothing to show (no text, no speaker).
  // Its card stays plain information: no button, no underline, no arrow, and no popup is written for it
  if (lecture.clickable === false || !(lecture.text || lecture.person)) {
    return `<li class="st-lecture"><span class="st-lecture-num">${lecture.num}</span> <span class="st-lecture-ttl">${lecture.title}</span>${speaker ? ` ${speaker}` : ''}</li>`;
  }
  if (linked) linked.add(key);
  return `<li><button class="st-lecture" type="button" data-pop="${key}" aria-haspopup="dialog">`
    + `<span class="st-lecture-num">${lecture.num}</span> <span class="st-lecture-ttl">${lecture.title}</span> ${speaker}`
    + '<span class="st-lecture-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></span>'
    + '</button></li>';
}).join('\n              ');
// a popup's content as a <template> the page's script copies into the one dialog: the title and its labels, the paragraphs, the person.
// A popup about a person alone (p-<key>): the title is the name, the label the organisation, the body the photo and the bio
const popupTemplate = (name) => {
  const p = pick(name);
  let { title, meta = [], dir } = p;
  let body = (p.text || []).map((paragraph) => `<p>${paragraph}</p>`).join('');
  // a session's popup: its lectures first (what the reader looks for), each a button that switches the popup to that lecture; the chair after
  if (p.lectures) body += `<h3 class="st-pop-h">הרצאות המושב</h3><ul class="st-lectures">${lectureItems(p.lectures, name)}</ul>`;
  if (p.questions) body += `<p class="st-pop-q">במהלך הפאנל נעלה שאלות (וננסה להשיב עליהן) כגון:</p><ol class="st-pop-ol">${p.questions.map((q) => `<li>${q}</li>`).join('')}</ol>`;
  if (p.panelists) body += `<h3 class="st-pop-h">חברי הפאנל</h3><ul class="st-lectures st-panelists">${panelistItems(p.panelists)}</ul>`;
  if (p.person && !title) {
    const w = who(p.person);
    const en = w.dir === 'ltr' && !!w.name_en;   // an English bio: the whole popup in English
    title = nameOf(w, en);
    meta = orgOf(w, en) ? [orgOf(w, en)] : [];
    dir = dir || w.dir;
    body += `<div class="st-person-solo">${w.img ? `<img src="${w.img}" alt="" width="96" height="96">` : ''}<div class="st-bio">${w.bio}</div></div>`;
  } else if (p.person) {
    body += person(p.person, p.role, dir === 'ltr');
  }
  // data-back: its name on the "חזרה ל…" button of a popup opened from it (a session: מושב 1.3; a row: its "back" in program.json)
  return `<template id="pop-${name}" data-title="${attr(title)}" data-meta="${attr(meta.join('|'))}"${p.back ? ` data-back="${attr(p.back)}"` : ''}${dir ? ` data-dir="${dir}"` : ''}${p.badge ? ` data-badge="${attr(p.badge)}"` : ''}>${body}</template>`;
};

// ---- the program: a day's table from program.json; its sessions, lectures and popups are registered as it is drawn ----
const renderProgram = (dayKey) => {
  const day = program[dayKey];
  if (!day) throw new Error(`no "${dayKey}" in _src/program.json`);
  const before = new Set(Object.keys(popups));   // the popups this day adds get its badge (below)
  const en = day.lang === 'en';
  const tracks = day.tracks || [];
  for (const [id, p] of Object.entries(day.popups || {})) {
    popups[id] = { ...p, meta: [...(p.meta || []), ...(p.person ? [nameOf(who(p.person), en)] : [])], ...(day.dir ? { dir: day.dir } : {}) };
  }
  // a person's line in a cube: the photo, a label, the name and the organisation (or "as": what they are here)
  const line = (key, label, as, sep = ', ') => {
    const p = who(key);
    const tail = as || orgOf(p, en);
    return `<span class="st-slot-chair">${p.img ? `<img src="${p.img}" alt="" width="32" height="32">` : ''}${label ? `${label} ` : ''}${nameOf(p, en)}${tail ? `${sep}${tail}` : ''}</span>`;
  };
  const cube = (id, parts) => `\n          <div class="st-slot"${id ? ` data-pop="${id}"` : ''}>\n            ${parts.filter(Boolean).join('\n            ')}\n          </div>\n        `;
  const timeCell = (r) => {
    const [from, to] = r.time.split('-');
    return `<th scope="row" role="rowheader"><span class="st-time"><time>${from}</time>-<time>${to}</time></span>${r.part ? `<span class="st-part">${r.part}</span>` : ''}</th>`;
  };
  // a session: its popup (title, labels, chair, lectures) and each lecture's popup
  const session = (s, time) => {
    const ids = (s.lectures || []).map((l, i) => {
      const id = `${s.id}-${i + 1}`;
      const num = `${s.num}.${i + 1}`;
      popups[id] = { num, title: l.title, meta: [`מושב ${s.num}`, `הרצאה ${num}`, time, ...(l.speaker ? [who(l.speaker).name] : [])],
        text: l.text, person: l.speaker, role: 'המרצה', clickable: l.clickable };
      return id;
    });
    popups[s.id] = { title: strip(s.title), meta: [`מושב ${s.num}`, time, ...(s.chair ? [who(s.chair).name] : [])],
      person: s.chair, role: 'יו״ר המושב', back: `מושב ${s.num}`, ...(ids.length ? { lectures: ids } : {}) };
    return cube(s.id, [`<span class="st-slot-num">מושב ${s.num}</span>`, `<span class="st-slot-ttl">${s.title}</span>`, s.chair && line(s.chair, 'יו״ר מושב:')]);
  };
  // a one-track day's sessions take its colour ("track" in program.json: 3 is the tutorials day's purple; 1 by default)
  const KIND = { break: 'st-break', plenary: 'st-plenary', neutral: '', session: `st-t${day.track || 1}` };
  const rows = day.rows.map((r) => {
    if (r.sessions) {
      return `<tr role="row">${timeCell(r)}${r.sessions.map((s, i) => `<td class="st-t${i + 1}" data-track="${tracks[i]}" role="cell">${session(s, r.time)}</td>`).join('')}</tr>`;
    }
    // a single cube: a full row on a two-track day, the one column on a one-track day; its own popup when it has something to show
    const host = r.speaker || (r.lead && r.lead.person);
    if (r.id && (r.text || r.speaker)) {
      popups[r.id] = { title: strip(r.title), meta: [r.time, ...(host ? [nameOf(who(host), en)] : [])],
        text: typeof r.text === 'string' ? [r.text] : r.text, questions: r.questions, panelists: r.panelists, person: host, back: r.back || strip(r.title), role: r.role || (r.lead && r.lead.label), ...(day.dir ? { dir: day.dir } : {}) };
      // the panelists show only in the panel's popup (not in the cube, as on their old site); their cards must be on the page
      for (const key of r.panelists || []) if (who(key).bio) extraLinked.add(`p-${key}`);
    }
    const parts = [
      `<span class="st-slot-ttl">${r.title}</span>`,
      r.list && `<ul class="st-slot-list">${r.list.map(([strong, rest]) => `<li><strong>${strong}</strong> ${rest}</li>`).join('')}</ul>`,
      // the cube's own short line: a row's text when it is one line (a string), or its "summary"; a longer text (a list of paragraphs) is the popup's
      (typeof r.text === 'string' || r.summary) && `<span class="st-slot-text">${typeof r.text === 'string' ? r.text : r.summary}</span>`,
      r.lead && line(r.lead.person, r.lead.label, r.lead.as),
      r.speaker && line(r.speaker, '', '', ' • '),
      r.note && `<span class="st-slot-chair">${r.note}</span>`,
    ];
    const kind = [tracks.length ? 'st-all' : '', KIND[r.kind] || ''].filter(Boolean).join(' ');
    return `<tr role="row">${timeCell(r)}<td${kind ? ` class="${kind}"` : ''}${tracks.length ? ` colspan="${tracks.length}"` : ''} role="cell">${cube(r.pop || r.id, parts)}</td></tr>`;
  }).join('\n      ');
  const head = tracks.length
    ? `<thead role="rowgroup"><tr role="row"><td class="st-prog-corner" role="cell"></td>${tracks.map((t, i) => `<th class="st-t${i + 1}" scope="col" role="columnheader">${t}</th>`).join('')}</tr></thead>`
    : '<colgroup><col class="st-col-time"><col></colgroup>';
  // a day's badge ("badge" in program.json): on every popup this day added, shown above the popup's title
  if (day.badge) for (const id of Object.keys(popups)) if (!before.has(id)) popups[id].badge = day.badge;
  return `<table class="st-prog${day.track ? ` st-day-t${day.track}` : ''}" role="table"${day.dir ? ` dir="${day.dir}"` : ''}${day.lang ? ` lang="${day.lang}"` : ''}>\n    ${head}\n    <tbody role="rowgroup">\n      ${rows}\n    </tbody>\n  </table>`;
};

// ---- people on the pages: a tile (speakers, committees) and a signature figure (the home's chairs, the tutorials day) ----
const tile = (key, role, en) => {
  const p = who(key);
  return `<li><div class="st-slot st-tile"${p.bio ? ` data-pop="p-${key}"` : ''}><img src="${p.img || PLACEHOLDER}" alt="" width="112" height="112">`
    + `<span class="st-tile-name">${nameOf(p, en)}</span>${role ? `<span class="st-tile-role">${role}</span>` : ''}${orgOf(p, en) ? `<span class="st-tile-org">${orgOf(p, en)}</span>` : ''}</div></li>`;
};
const figure = (key, role, en) => {
  const p = who(key);
  return `<figure class="st-chair"><img src="${p.img || PLACEHOLDER}" alt="${attr(nameOf(p, en))}" width="104" height="104"><figcaption>`
    + `<p class="st-chair-name">${nameOf(p, en)}</p>${role ? `<p class="st-chair-role">${role}</p>` : ''}${orgOf(p, en) ? `<p class="st-chair-org">${orgOf(p, en)}</p>` : ''}</figcaption></figure>`;
};

// the inner pages' banner, with the page's own date and place ("when": [iso date, the date as shown, the place] in its first line;
// the default is both days)
const WHEN = ['2027-01-12', '12-13 בינואר 2027', 'מלון דניאל, הרצליה'];
const banner = (meta) => {
  const [iso, date, place] = meta.when || WHEN;
  return part('banner').replace('{{when-iso}}', iso).replace('{{when-date}}', date).replace('{{when-place}}', place);
};
// breadcrumbs under an inner page's banner: home › the page (its "crumb" in the first line). The .php build (their server, real URLs)
// also writes them as a BreadcrumbList for Google
const SITE = 'https://www.incoseil.org/activity_page/incoseil2027/';
const crumbs = (meta, page) => {
  if (!meta.crumb) return '';
  const home = php ? 'index.php' : 'index.html';
  const trail = `<nav class="st-crumbs" aria-label="פירורי לחם"><ol class="st-wrap"><li><a href="${home}">ראשי</a></li><li aria-current="page">${meta.crumb}</li></ol></nav>`;
  if (!php) return trail;
  const data = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ראשי', item: SITE },
    { '@type': 'ListItem', position: 2, name: meta.crumb, item: `${SITE}${page}.php` }] };
  return `${trail}\n<script type="application/ld+json">${JSON.stringify(data)}</script>`;
};

if (php) {
  fs.mkdirSync(OUT, { recursive: true });
  // assets/ is not copied: it is their server's own folder, already there (the local one is a copy for the preview)
  for (const item of ['st-css', 'st-js', 'st-images', 'st-fonts', 'favicon.ico']) fs.cpSync(path.join(DIR, item), path.join(OUT, item), { recursive: true });
}
for (const file of fs.readdirSync(path.join(SRC, 'pages')).filter((f) => f.endsWith('.html'))) {
  let html = fs.readFileSync(path.join(SRC, 'pages', file), 'utf8');
  const meta = JSON.parse(html.match(/^<!--(\{.*?\})-->/)[1]);
  html = html.replace(/^<!--\{.*?\}-->\r?\n/, '')
    // the preview and the GitHub demo are not for search engines (only their server's .php pages are): noindex on those
    .replace('<!-- @head -->', () => part('head').replace('{{title}}', meta.title).replace('{{title-attr}}', attr(meta.title)).replace(/{{description}}/g, attr(meta.description || '')).replace('<title>', php ? '<title>' : '<meta name="robots" content="noindex, nofollow">\n<title>'))
    .replace('<!-- @nav -->', () => part('nav').split(`data-nav="${meta.nav}"`).join(`data-nav="${meta.nav}" aria-current="page"`))
    .replace('<!-- @banner -->', () => `${banner(meta)}\n${crumbs(meta, file.replace(/\.html$/, ''))}`)
    .replace('<!-- @footer -->', () => part('footer'))
    .replace('<!-- @end -->', () => part('end'))
    .replace(/<!-- @program ([\w-]+) -->/g, (_, day) => renderProgram(day))
    .replace(/<!-- @tile(-en)? ([\w-]+)(?: \| (.+?))? -->/g, (_, en, key, role) => tile(key, role, !!en))
    .replace(/<!-- @figure(-en)? ([\w-]+)(?: \| (.+?))? -->/g, (_, en, key, role) => figure(key, role, !!en))
    .replace(/(href|src)="(st-css\/st\.css|st-js\/(?:st-site|register)\.js)"/g, (_, at, file) => `${at}="${file}?v=${STAMPS[file]}"`)
    .replace('<html lang="he" dir="rtl">', `<html lang="he" dir="rtl">\n<!-- built by build.cjs from _src/pages/${file}: edit there, not here -->`);

  // the cubes. A program cube (one with a .st-slot-ttl title) has ONE model, whatever it holds:
  //   - its head (number, title, person's line) is the one button that opens its popup (when it has text, a person or lectures);
  //   - its lectures, if any, are listed under it, each lecture its own button and popup.
  //   A person's tile (no .st-slot-ttl) opens as a whole tile.
  const linked = new Set(extraLinked);
  extraLinked.clear();
  const waiting = new Set();
  html = html.replace(/<div class="st-slot([^"]*)" data-pop="([\w-]+)">([\s\S]*?)<\/div>/g, (_, more, name, inside) => {
    const p = pick(name);
    if (!p) { waiting.add(name); return `<div class="st-slot${more}">${inside}</div>`; }
    if (!inside.includes('<span class="st-slot-ttl">')) {
      linked.add(name);
      return `<div class="st-slot${more} is-pop">${inside}  <button class="st-slot-more" type="button" data-pop="${name}" aria-haspopup="dialog" dir="rtl">לפרטים<span class="visually-hidden"> על ${popupTitle(name)}</span></button>\n          </div>`;
    }
    let head = inside;
    if (p.text || p.person || p.lectures) {
      linked.add(name);
      // the cube's head (its number, title, short line and person's line, the spans up to its first list) is ONE button to its popup;
      // the popup holds the person's card, so their line needs no button of its own. A span may hold a nested span (.st-nw) or an img
      head = inside.replace(/^(\s*)((?:<span class="st-slot-(?:num|ttl|text|chair)">(?:[^<]|<(?!\/?span)|<span[^>]*>[^<]*<\/span>)*<\/span>\s*)+)/,
        (_, lead, parts) => `${lead}<button class="st-slot-head" type="button" data-pop="${name}" aria-haspopup="dialog">\n              ${parts.trim().replace(/\n\s*/g, '\n              ')}\n            </button>\n          `);
    }
    const list = p.lectures ? `  <ul class="st-lectures">\n              ${lectureItems(p.lectures, name, linked)}\n            </ul>\n          ` : '';
    // a cube that opens and holds nothing else to click (no lectures): the whole cube opens it, like a person's tile (.is-pop)
    const whole = head !== inside && !p.lectures;
    return `<div class="st-slot${more}${whole ? ' is-pop' : ''}">${head}${list}</div>`;
  });
  if (linked.size) html = html.replace('</main>', () => `${[...linked].map(popupTemplate).join('\n')}\n</main>`);

  if (php) html = html.replace(new RegExp(`href="(${PAGES.join('|')})\\.html`, 'g'), 'href="$1.php');
  const name = php ? file.replace(/\.html$/, '.php') : file;
  fs.writeFileSync(path.join(OUT, name), html);
  const report = waiting.size ? `  | no content yet: ${[...waiting].join(', ')}` : '';
  console.log(path.relative(DIR, path.join(OUT, name)) + (linked.size ? `  (${linked.size} popups)` : '') + report);
}
