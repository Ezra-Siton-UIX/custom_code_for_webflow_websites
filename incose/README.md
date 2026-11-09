# INCOSE IL 2027: the conference site

A static site of six pages in Hebrew (right to left): the home, the conference day, the tutorials day, the speakers, the committees and the registration. There is no CMS and no server code of ours: the pages are plain HTML, assembled by one small script.

Read this before changing anything. The site is built on a few rules (below), and most of what breaks a site like this is breaking one of them.

## Running it

Plain Node, no `npm install`:

```
node build.cjs         → index.html, day1.html, … next to this file
node build.cjs --php   → _php/: the same pages named .php, with the links between them fixed, ready to upload
node serve.cjs         → the preview: http://localhost:5050
```

**Preview through `serve.cjs`, not by opening the files.** A browser won't load the font from `file://`, so a page opened from disk shows the fallback font. The preview server also fetches the registration's own scripts from their server (read-only, GET only). It sends them nothing, so a test registration can't reach their system.

**Never edit the built pages** (`index.html`, `day1.html`, …): the next build overwrites them. Edit `_src/`, then build.

The build also reports which program cubes and people tiles have no popup content yet, for example:

```
day1.html  popups: posters, s11, s21, s13  | no content yet in popups.json: opening, s12, s22, s23, panel
```

**Uploading:** copy the contents of `_php/` into `activity_page/incoseil2027/` on their server. `assets/` is not in it on purpose: that folder already exists on the server (the local `assets/` is only a copy, so the preview shows the pictures).

## Where things are

| What | Where |
|---|---|
| Each page | `_src/pages/*.html`. Its first line is `{"title", "description", "nav"}`: the page's SEO title and description, and the menu item it marks |
| The menu | `_src/partials/nav.html` |
| The inner pages' banner | `_src/partials/banner.html` |
| The logos and the calendar section (every page) | `_src/partials/footer.html` |
| The footer, the popup and the scripts | `_src/partials/end.html` |
| The `<head>` | `_src/partials/head.html` |
| **Popup content** | **`_src/popups.json`** |
| **People** (photo, name, organisation, bio) | **`_src/people.json`** |
| All the CSS | `st-css/st.css` (one file) |
| All our JS | `st-js/st-site.js` (the popup) |
| Our pictures | `st-images/` |
| The font (Google Sans, Hebrew and Latin) | `st-fonts/` |
| The favicon (theirs) | `favicon.ico` |
| Their pictures (the server's `assets/`) | `assets/` (a copy for the preview) |
| Their old pages, for reference | `_source/` |
| Old pictures and sources of our renders | `_not-used/` |

A page places a shared piece with a marker: `<!-- @head -->`, `<!-- @nav -->`, `<!-- @banner -->`, `<!-- @footer -->`, `<!-- @end -->`. A shared piece is written once, so a fix to it reaches every page.

## What is in the page file, and what is in JSON

| Content | Lives in |
|---|---|
| The program's times, titles, chairs (the cubes) | the page file (`_src/pages/day1.html`, `day2.html`) |
| The home's texts, the tutorials day's text | the page file |
| The speakers and committees tiles | the page file |
| **What a popup shows** (its title, labels, text, person) | **`_src/popups.json`** |
| **A person's bio and photo** | **`_src/people.json`**: written once, used by every popup that shows that person |

### Adding content to a popup

Every cube in the program, and every tile on the speakers page, already has a name: `data-pop="s12"`, `data-pop="p-ram"`. A cube opens a popup only when `_src/popups.json` has an entry with its name. Then the build adds the cube's "+ לפרטים" button (it covers the whole cube) and the popup. Without an entry, the cube stays plain. **To link a cube, add an entry and build; the page itself doesn't change.**

An entry in `_src/popups.json`:

```json
"s12": {
  "title": "אתגרי הבשלה מערכתית בשילוב משתמשי קצה",
  "meta": ["מושב 1.2", "12:20-13:35", "יפעת קוזובסקי"],
  "text": ["The session's description, one string per paragraph."],
  "person": "ifat",
  "role": "יו״ר המושב"
}
```

- `title`: the popup's heading.
- `meta`: the labels under it, in this order: the session, the time, the person.
- `text`: the running text (a lecture's abstract), one string per paragraph. Optional.
- `person` and `role`: a key in `people.json`, shown as a card under the text, with the role as its label. Optional.
- `"dir": "ltr"`: for an entry written in English.

A popup about a person alone (a speakers tile) is just `"p-ram": { "person": "ram" }`. Its title is then the person's name, and the body is the photo and the bio.

An entry in `_src/people.json`:

```json
"ifat": {
  "name": "יפעת קוזובסקי",
  "org": "אלביט מערכות",
  "img": "assets/ifat.png",
  "bio": "<p>First paragraph.</p><p>Second.</p>"
}
```

Add `"dir": "ltr"` for a bio in English.

A new cube in a page is a `div.st-slot` with a `data-pop` name: `<div class="st-slot" data-pop="s14">…</div>`. **No `div` inside a cube**: the build finds the cube's end at its first `</div>`.

## The rules

1. **One container.** Every row of every page sits in `.st-wrap`, including the menu, the banner and the footer. It is `--st-container` wide. Never give a block a max-width of its own to make it a container. A narrower reading column inside it is fine (`.st-narrow`).
2. **One section.** Every section is `.st-section`, so every section's top and bottom space is the same token (`--st-section`). Two sections on the same background, one after the other, would double the space. Give the second one `.st-joined`, which removes its top space.
3. **One heading style.** A block's heading is `.st-title`, an `h1` or `h2` with the mint line under it. The gap under it is the same everywhere (`--st-head-gap`). Never make a second heading style.
4. **Vertical rhythm.** The gaps between blocks are set only by the flow rules in `st.css`: `.st-title + *`, `.st-sub + *`, `.st-people + .st-title`. **A block never sets its own top margin**, or it would erase the gap above it. A block's own inner spacing is its own business.
5. **Tokens.** Colours, the font and the radii are variables in `:root`, at the top of `st.css`, named by role (`--st-ink`, `--st-mint`, `--st-line`…). A rule never holds a raw colour. A shade that is a little lighter or more transparent is mixed from its token (`color-mix(in srgb, var(--st-mint) 30%, transparent)`). To change a colour site-wide, change one line.
6. **Semantic HTML.**
   - The page landmarks are `header`, `nav`, `main`, `section` and `footer`.
   - Each page has exactly one `h1`. On the speakers and committees pages it is visually hidden, because the groups' titles lead there.
   - The program is a real `table`, with the time as each row's header. It keeps explicit `role`s, so it stays a table for a screen reader when a phone stacks it.
   - A list is a `ul`, a person is a `figure`, a date is a `time`.
   - A meaningful picture has `alt` text; a decorative one has `alt=""`.
   - A link that opens a new window says so in hidden text.
7. **Everything is prefixed `st-`.** Classes, ids and files. That way nothing of ours collides with Bootstrap or with their registration module.
8. **Copy:** no em dash (—) in the site's text.
9. **Nothing moves on load.**
   - Every picture has `width` and `height` in its real proportions, so its space is kept before it loads (the banner's shape once had none, and the whole page jumped).
   - The font is `block`.
   - Measured: the layout shift (CLS) is 0 on every page.
10. **SEO.** Each page has a title and a description written for its topic, in its first line. The build puts them into `<title>`, `description` and the `og:` tags (a shared link's preview). The `.html` pages (the preview, a GitHub demo) carry `noindex`. The `.php` pages for their server don't, so only the real site is indexed.

## The framework

- **Bootstrap 5.3.3, RTL build,** loaded from jsDelivr with integrity hashes (SRI), in `head.html` and `end.html`. **It is used for the menu only:** the navbar, which opens and closes on a phone (`collapse`). Our `st.css` loads after it, so ours wins. On a phone, the panel drops over the page under the bar, so the page doesn't move.
  - Do not build layout with Bootstrap classes (`row`, `col-*`, spacing utilities). The layout is `st-` and the tokens.
  - Bootstrap's base styles (reboot) are on. Our rules set their own margins, so the reboot doesn't move them.
  - `body` has `data-bs-no-jquery`, so Bootstrap never touches jQuery (only the registration page has it, and that jQuery is theirs).
- **The popup is the browser's own `<dialog>`,** not Bootstrap's modal.
  - There is one dialog for the whole site, in `end.html`.
  - `st-site.js` fills it from the `<template>` the build writes for each popup.
  - The browser handles the accessibility: focus moves in and stays inside, Esc closes it, and focus returns to the button that opened it.
- **The font is Google Sans** (Hebrew included), **hosted with the site** in `st-fonts/`, preloaded in `head.html`, with `font-display: block`: no text is drawn until the font is in, so it never swaps and nothing jumps. Its fallback (`Google Sans Fallback` in `st.css`) is Arial resized to Google Sans's measured width, for a slow first visit. Don't switch back to the Google Fonts link or to `swap`: either brings the jump back.
- **No other library.**

## The registration page (careful)

`_src/pages/register.html` holds **their** registration module (activity 4086), copied as it is. Every `id`, `name`, `class`, `onclick` and hidden field stays as it was, because their scripts depend on them. **Only the look is ours,** from `.st-register` in `st.css`, styled through their own ids and classes. Don't rename or restructure anything inside it.

- **Their scripts:** they load from their server's root, in their original order: `/js/jquery.min.js`, `/js/sweetalert2.min.js`, `/js/acc-plug.js`, `/js/my.js`, `/js/reg.js`. `acc-plug.js` is needed because `reg.js` saves the form in a cookie through it.
- **The price table** is written by their `/js/script_act2027.js`.
- **Where the form sends:** it posts to `/regPost.php` and checks membership against `/iltam_check_mem.php`.
- **Where it works:** **only on their server.** Opened locally, the page shows the form, but nothing in it runs.
- **The config block** (`RECID`, `VAT`, `actGRP`, `actPRC`) is what their PHP wrote for this activity: prices and payment links. If prices change, it changes there.
- **It appears once it's ready.** The block stays hidden until the page has loaded (`st-site.js` adds `.is-ready`), because their scripts rewrite the price table while loading, and it would jump.
- **The one edit:** the contact email link was missing its colon, and is now `mailto:`.

## Still open (content from the client)

- **Tutorials day:** `TITLE 1`–`5`, "John Doe • Tutorial X", Prof. A / Ms. C / Dr. D / Prof. E, and four "John Doe" tiles on the speakers page. These are their placeholders until the tutorials are announced.
- **2027 session descriptions:** none exist yet. The popups show the session chair. Their old data (`AT_J` in `_source/`) still holds the 2025 sessions.
- **Bios:** there is none for Ifat Kozovsky, Michael Winokur or Moshe Shoker. Ram Oron's entry in their data is a board-election statement, not a bio, so it isn't used.
- **Their price script has two wrong dates:** "יומיים של הכנס, 18.11 - 13.01.2027" (should be 12.01), and "יום הסדנאות … יום ה'" (13.1.2027 is a Wednesday, ד'). Those are in their `/js/script_act2027.js`, on their server.
- **Tutorials day platform:** the tutorials day page says Microsoft Teams, but the registration's price table says ZOOM.

## A demo on GitHub Pages

What to know before showing the site from GitHub Pages:

- **The repository must be public.** On a free account, Pages needs a public repo. `_source/`, `_not-used/` and `_php/` stay out (`.gitignore`), and the demo's pages carry `noindex`.
- **Upper/lower case in file names.** Windows ignores it and GitHub's server doesn't, so every link must match its file exactly. All 231 links were checked on 9.11.2026.
- **The site lives under a sub-path** (`…github.io/incose_conf_2027/`), so a link starting with `/` breaks. Ours are relative. The registration's `/js/…` are theirs: on the demo the form shows but doesn't run.
- **Turning it on:** Settings → Pages → Deploy from a branch → `main` / root, once. Every later push publishes by itself, in about 1–10 minutes; a client who doesn't see a change should refresh (Ctrl+F5).
- **GitHub runs Jekyll on the files,** so folders starting with `_` (`_src`) are not published. That's fine: the source stays in the code, not on the demo.
