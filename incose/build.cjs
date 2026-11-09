// Puts the site together, from _src/ into the finished pages next to this file. Edit _src, then run it again:
//   node build.cjs         → index.html, day1.html, ... at the root (open them as they are)
//   node build.cjs --php   → _php/: the same pages named .php, the links too, with the folders they need: ready to upload
// What it joins:
//   _src/pages/*.html      each page; its first line is {"title", "description" (the SEO title and description), "nav": the menu item it marks}
//   _src/partials/*.html   the shared pieces, put in by markers: <!-- @head --> <!-- @nav --> <!-- @banner --> <!-- @footer --> <!-- @end -->
//   _src/popups.json       every popup's content, by name. A cube <div class="st-slot" data-pop="NAME"> opens a popup only
//                          when NAME is in it: the build then adds the cube's "+ לפרטים" button and the popup's <template>
//   _src/people.json       every person a popup shows (photo, name, organisation, bio), by key: written once, used anywhere
const fs = require('fs');
const path = require('path');
const DIR = __dirname;
const SRC = path.join(DIR, '_src');
const php = process.argv.includes('--php');
const OUT = php ? path.join(DIR, '_php') : DIR;
const PAGES = ['index', 'day1', 'day2', 'speakers', 'committees', 'register'];

const part = (name) => fs.readFileSync(path.join(SRC, 'partials', `${name}.html`), 'utf8').trimEnd();
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(SRC, name), 'utf8'));
const people = readJson('people.json');
const popups = readJson('popups.json');
const attr = (text) => String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// a person in a popup: a card under the running text, its role on top, the round photo beside the name and the organisation, the bio
const person = (key, role) => {
  const p = people[key];
  if (!p) throw new Error(`no "${key}" in _src/people.json`);
  return `<aside class="st-person-card">${role ? `<p class="st-person-role">${role}</p>` : ''}`
    + `<div class="st-person">${p.img ? `<img src="${p.img}" alt="" width="80" height="80">` : ''}<p><b>${p.name}</b>${p.org ? `<span>${p.org}</span>` : ''}</p></div>`
    + `<div class="st-bio"${p.dir ? ` dir="${p.dir}"` : ''}>${p.bio}</div></aside>`;
};
// a popup's content as a <template> the page's script copies into the one dialog: the title and its labels, the paragraphs, the person.
// A popup about a person alone ({"person": "motil"}, no title): the title is the name, the label the organisation, the body the photo and the bio.
const popupTemplate = (name) => {
  const p = popups[name];
  let { title, meta = [], dir } = p;
  let body = (p.text || []).map((paragraph) => `<p>${paragraph}</p>`).join('');
  if (p.person && !title) {
    const who = people[p.person];
    if (!who) throw new Error(`no "${p.person}" in _src/people.json (popup "${name}")`);
    title = who.name;
    meta = who.org ? [who.org] : [];
    dir = dir || who.dir;
    body += `<div class="st-person-solo">${who.img ? `<img src="${who.img}" alt="" width="96" height="96">` : ''}<div class="st-bio">${who.bio}</div></div>`;
  } else if (p.person) {
    body += person(p.person, p.role);
  }
  return `<template id="pop-${name}" data-title="${attr(title)}" data-meta="${attr(meta.join('|'))}"${dir ? ` data-dir="${dir}"` : ''}>${body}</template>`;
};
const popupTitle = (name) => popups[name].title || people[popups[name].person].name;

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
    .replace('<!-- @nav -->', () => part('nav').replace(`data-nav="${meta.nav}"`, `data-nav="${meta.nav}" aria-current="page"`))
    .replace('<!-- @banner -->', () => part('banner'))
    .replace('<!-- @footer -->', () => part('footer'))
    .replace('<!-- @end -->', () => part('end'))
    .replace('<html lang="he" dir="rtl">', `<html lang="he" dir="rtl">\n<!-- built by build.cjs from _src/pages/${file}: edit there, not here -->`);

  // the cubes: one with a popup in popups.json gets its button (stretched over the whole cube) and its template; the rest stay plain
  const linked = new Set();
  const waiting = new Set();
  html = html.replace(/<div class="st-slot([^"]*)" data-pop="([\w-]+)">([\s\S]*?)<\/div>/g, (_, more, name, inside) => {
    if (!popups[name]) { waiting.add(name); return `<div class="st-slot${more}">${inside}</div>`; }
    linked.add(name);
    return `<div class="st-slot${more} is-pop">${inside}  <button class="st-slot-more" type="button" data-pop="${name}" aria-haspopup="dialog" dir="rtl">לפרטים<span class="visually-hidden"> על ${popupTitle(name)}</span></button>\n          </div>`;
  });
  if (linked.size) html = html.replace('</main>', () => `${[...linked].map(popupTemplate).join('\n')}\n</main>`);

  if (php) html = html.replace(new RegExp(`href="(${PAGES.join('|')})\\.html`, 'g'), 'href="$1.php');
  const name = php ? file.replace(/\.html$/, '.php') : file;
  fs.writeFileSync(path.join(OUT, name), html);
  const report = linked.size || waiting.size ? `  popups: ${[...linked].join(', ') || 'none'}${waiting.size ? `  | no content yet in popups.json: ${[...waiting].join(', ')}` : ''}` : '';
  console.log(path.relative(DIR, path.join(OUT, name)) + report);
}
