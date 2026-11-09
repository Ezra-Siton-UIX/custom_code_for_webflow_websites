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

The build reports each page and its popups, and which cubes have nothing to show yet, for example:

```
day2.html  (4 popups)  | no content yet: d2-h1, d2-h2, d2-h3, d2-h4, d2-h5
```

**Uploading:** copy the contents of `_php/` into `activity_page/incoseil2027/` on their server. `assets/` is not in it on purpose: that folder already exists on the server (the local `assets/` is only a copy, so the preview shows the pictures).

**No Node on the computer?** Edit the JSON on GitHub, in the browser. The repository's Pages workflow can run `node incose/build.cjs` before it publishes, so a commit rebuilds the site by itself. An AI agent (Claude Code) always has Node, because it runs on it.

## One source of truth

**Every detail is written in one place.** A person's name, photo or organisation lives only in `people.json`. A session's title, time or chair lives only in `program.json`. Pages and the program refer to people by key, and the build writes them out. If you fix something in one place, it changes everywhere.

| What | Its one place |
|---|---|
| **Every person:** name, organisation, photo, bio (and `name_en` / `org_en` for the English places) | **`_src/people.json`** |
| **Both days' programs:** rows, sessions, chairs, lectures, the panel, and their popups | **`_src/program.json`** |
| Each page's frame and its texts | `_src/pages/*.html`. Its first line is `{"title", "description", "nav", "crumb"}`: the SEO title and description, the menu item it marks, and its name in the breadcrumbs |
| The menu | `_src/partials/nav.html` |
| The inner pages' banner | `_src/partials/banner.html` |
| The logos and the calendar section (every page) | `_src/partials/footer.html` |
| The footer, the popup and the scripts | `_src/partials/end.html` |
| The `<head>` | `_src/partials/head.html` |
| All the CSS | `st-css/st.css` (one file) |
| All our JS | `st-js/st-site.js` (the popup, the menu); `st-js/register.js` (the registration page's code) |
| Our pictures / the font / the favicon | `st-images/` / `st-fonts/` / `favicon.ico` |
| Their pictures (the server's `assets/`) | `assets/` (a copy for the preview) |
| Their old pages, old pictures | `_source/`, `_not-used/` (not in git) |

**Markers in a page.** The build replaces each one:

| Marker | Becomes |
|---|---|
| `<!-- @head -->` `<!-- @nav -->` `<!-- @banner -->` `<!-- @footer -->` `<!-- @end -->` | the shared pieces |
| `<!-- @program day1 -->` | that day's program table, with all its popups (from `program.json`) |
| `<!-- @tile ram \| יו"ר מושב 2.2 -->` | a person's tile: photo, name, the role written after the bar (optional), organisation. With a bio, the tile opens the person's card |
| `<!-- @figure shoker \| יו"ר יום הכנס -->` | a person's signature figure (the home's chairs, the tutorials day) |
| `@tile-en`, `@figure-en` | the same, with the person's English name and organisation |

## A person (`people.json`)

```json
"ram": { "name": "ד\"ר רם אורון", "org": "נובה", "img": "assets/OronRam.jpg", "bio": "<p>…</p>" }
```

- **With a `bio`:** the person opens their card wherever they appear: a tile, a lecture's speaker, a panelist, and the card inside a session's popup.
- **Without a `bio`:** they show, but don't open (most committee members today).
- **`"sample": true`:** the bio is lorem ipsum, waiting for the real one.
- **`"dir": "ltr"`:** an English bio. If the person also has `name_en`, their popup is entirely in English.

## The program (`program.json`)

Each day has `rows`. A row is either one cube across the whole row, or a row of sessions, one per track:

```json
{ "time": "12:20-13:35", "part": "מושב צהרים", "sessions": [
  { "id": "s12", "num": "1.2", "title": "…", "chair": "ifat",
    "lectures": [
      { "title": "…", "speaker": "sample", "text": ["The abstract, one string per paragraph."] },
      { "title": "…", "clickable": false }
    ] },
  { "id": "s22", "num": "2.2", "title": "…", "chair": "ram", "lectures": [ … ] } ] }
```

- **A session:**
  - `id`: its name, unique.
  - `num`: its number.
  - `title`: may hold a `<span class="st-nw">ה-AI</span>`, which keeps the phrase from breaking.
  - `chair`: a person's key.
  - `lectures`: its lectures. Their numbers (1.2.1, 1.2.2…), names and every popup label are worked out by the build.
- **A lecture:**
  - `title`;
  - `speaker`: a person's key;
  - `text`: its abstract, a list of paragraphs;
  - `"clickable": false`: it doesn't open (e.g. no lecturer yet). A lecture with no `text` and no `speaker` doesn't open either. Example: 2.3.3.
- **A single cube:** `kind` gives its look:
  - `"break"`: a short break, dashed;
  - `"neutral"`: a meal or a gathering;
  - `"plenary"`: white with a mint frame;
  - `"session"`: tinted, used on the one-track day.
- **What a single cube can hold:**
  - `title`;
  - `list`: lines of [bold, the rest];
  - `text`: one short line in the cube, or a list of paragraphs for its popup;
  - `summary`: the cube's short line when `text` is the popup's;
  - `lead`: `{ "person", "label", "as" }`, the "בהובלת …" line;
  - `speaker` and `role`;
  - `note`: plain text, e.g. a placeholder;
  - `id`: its popup, when it has `text` or a `speaker`;
  - `pop`: a shared popup from the day's `popups` (the two poster rows share one);
  - `back`: its name on the "חזרה ל…" button.
- **The panel** (the last row of day 1):
  - `questions`: its numbered questions, in the popup;
  - `panelists`: people's keys. Each panelist is a card that opens their card, three in a row (one under another on a phone).
- **A day:** `tracks` (the column heads) for two tracks; `"dir": "ltr", "lang": "en"` for an English day (day 2).

### What opens

**One model for every program cube,** so adding lectures later changes nothing else:

- **The parent:** a cube's **head** (its number, title, short line and person's line: "יו״ר מושב: …", "בהובלת …") is one button that opens its popup. Only the title is underlined, in its track's colour, fully on hover. The person's card is inside that popup, so their line has no button of its own. The lectures under the head are separate cards.
- **The children:** a **lecture** (or a panelist) is a whole card that opens. It has an arrow at its far end, its title underlined, and a frame in its track's colour on hover.
- **A session's popup:**
  - its lectures first, then its chair;
  - a lecture there switches the popup to the lecture (with a short fade), and a green "חזרה למושב …" button returns;
  - a panelist in the panel's popup works the same way ("חזרה לפאנל המומחים").
- **A person's tile** opens as a whole tile, with "+ לפרטים".
- **A cube with nothing to show** (a coffee break) doesn't open.

### The colours

- **A track's colour:** each track sets `--st-accent` and `--st-accent-ink` on its cubes (track 1: mint and teal; track 2: the logo's blue). The underlines and numbers inherit them.
- **A day's colour:** a one-track day can have its own (`"track": 3` in `program.json`: the tutorials day's deep blue, `--st-t3`). Its table gets `.st-day-t3`, its cubes and frames take that blue through `--st-accent`, and its popups open with `data-track="3"`. Day 1 keeps the mint and the blue.
- **The popup's colour:** the popup takes the colour of the track it was opened from. `st-site.js` sets `data-track="2"`, and the `--st-pop-*` variables switch to blue. A switch inside the popup keeps it.
- **Three kinds of cube:**
  - **sessions** are tinted by track;
  - **meals and breaks** share one pale tint of the logo's bright blue (`--st-sky`, `--st-neutral-bg`), and short breaks are also dashed;
  - **plenaries** (for everyone) are white with a frame in that blue: no track's colour.

### The sample content

- **Sessions:** all six (1.1–2.3) hold three samples each ("הרצאה מקוננת למושב לדוגמא", the `sample` person, lorem ipsum).
- **The panel:** lorem ipsum questions and six sample panelists.
- **The tutorials day:** a flat day, one popup per row (no lectures inside). Its five tutorials (`TITLE 1`-`5`) have John Doe as lecturer and an English lorem ipsum abstract, marked `"sample": true`. The breaks don't open.
- **People:** Shoker, Kozovsky, Oron, Winokur and the tutorials day's "John Doe" (in English) have lorem ipsum bios (`"sample": true`).

Replace each with the real content, keeping the same shape.

## Right to left (RTL), and adding English

**The site is Hebrew, written right to left:** `<html lang="he" dir="rtl">` on every page, and Bootstrap's RTL build (`bootstrap.rtl.min.css`). Everything flows from the right: the menu starts at the right, the program's time column is on the right, lists have their dots on the right.

**The CSS doesn't care about direction.** It uses logical properties (`padding-inline-start`, `margin-inline`, `inset-inline-end`, `text-align: start`), never `left` or `right`, so a block flips by itself when its direction changes. The few physical values left are symmetric or decorative: the wave fading out at both sides, the dots in two corners, the "+" on the calendar page. **Keep it that way:** write `inline-start` / `inline-end`, not `left` / `right`.

**English inside the Hebrew site** (as on the tutorials day): give the element `dir="ltr" lang="en"`. It then reads left to right, with its dots and alignment on the left, and no extra CSS. In the code:

- **The tutorials day:** the program table (`<table … dir="ltr" lang="en">`) and its text (`<section … dir="ltr" lang="en">`).
- **An English day's popups:** a day with `"dir": "ltr", "lang": "en"` in `program.json` (day 2) writes its table and its popups left to right.
- **A bio in English:** `"dir": "ltr"` in its `people.json` entry.
- **A short English phrase inside a Hebrew sentence:** wrap it so the line doesn't scramble, e.g. `<span class="st-nw">ב-Microsoft Teams</span>` (it also keeps the phrase on one line), or `<bdi>…</bdi>`.

**A whole English version.** Today there is none: their old "English" link led back to the Hebrew home.

- **The pages:** a set of pages with `<html lang="en" dir="ltr">`, for example in `_src/pages/en/`.
- **Bootstrap:** its regular, left-to-right build (`bootstrap.min.css`) instead of the RTL one. This needs a second `head` partial, or a switch in `build.cjs`.
- **`st.css`:** stays as it is, because of the logical properties.
- **The texts the site itself writes,** which are Hebrew today:
  - the menu (`nav.html`);
  - the banner's line (`banner.html`);
  - the footer and the popup's "סגירה" (`end.html`);
  - the "לפרטים" button the build adds to a cube (`build.cjs`);
  - the skip link (`head.html`).

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

## How the popups work (for the next agent)

**The content is in the HTML, not made by JavaScript.** The build writes every popup's text into the page itself; the script only shows it. Opening a popup never fetches anything.

**The flow, from source to screen:**

1. **The sources.** What a popup says lives in `_src/program.json` (rows, sessions, lectures, the panel) and `_src/people.json` (people and their bios). Nothing about a popup is written in a page.
2. **The build writes one `<template>` per popup** a page needs, at the end of its `<main>` (`popupTemplate()` in `build.cjs`):
   ```html
   <template id="pop-d2-h1" data-title="TITLE 1" data-meta="08:30-10:00|John Doe" data-back="TITLE 1" data-dir="ltr" data-badge="Tutorials Day">
     …the body: paragraphs, the lecture cards, the person's card…
   </template>
   ```
   A `<template>` is part of the HTML file (view-source shows it), but the browser doesn't draw it.
   - `data-title` → the popup's `<h2>`;
   - `data-meta` → the label pills under it (split on `|`);
   - `data-back` → this popup's name on the "חזרה ל…" button of a popup opened from it;
   - `data-dir` → `ltr` for an English popup;
   - `data-badge` → the day's pill above the title (a day's `"badge"` in `program.json`, "Tutorials Day").
3. **The openers** are buttons with `data-pop="<name>"`, also written by the build: a cube's head, a lecture card, a panelist, a person's tile (`.st-slot-more`).
4. **One `<dialog id="st-pop">` for the whole site** (`_src/partials/end.html`): the head (the back button, the badge, the `<h2>`, the pills, the X), the body, the foot ("סגירה").
5. **`st-js/st-site.js`** (its popup part, about 60 lines) listens for a click on any `[data-pop]`. It finds `#pop-<name>`, copies its `data-*` into the head and its content into the body, sets `dir`, and opens the dialog (`showModal()`).
   - **A `[data-pop]` inside the open popup** (a lecture in its session) switches the content instead of opening a second popup. It keeps a trail, shows "חזרה ל{data-back}", and fades the change.
   - **The colour** comes from the opener: inside `.st-t2` the popup gets `data-track="2"`, and the `--st-pop-*` variables turn blue.
   - **Closing:** the X, "סגירה", a click on the backdrop, or Esc.
6. **The browser's `<dialog>` does the accessibility:** focus moves in and stays inside, Esc closes it, and focus returns to the opener.

**The names:**

| Popup | Its name |
|---|---|
| A session | its `id` (`s11`) |
| A lecture | the session's id and its place (`s11-1`) |
| A single row | its `id` (`panel`, `d2-h1`) |
| A shared popup | its key in the day's `popups` (`posters`) |
| A person's card | `p-` and their key (`p-ram`) |

**To add or change a popup:** edit the JSON (a row with an `id` and a `text` or a `speaker`; a lecture in a session; a person's `bio`), then run `node build.cjs`. Never write a `<template>` or a `data-pop` by hand: the build writes only the popups a page uses, and reports the cubes that have nothing to show yet.

**Search:** the text is in the HTML source, but inside a `<template>` it isn't displayed, so don't count on it for SEO. What must be found belongs on the page itself (a session's title, a person's name in the table and the tiles).

## The framework

- **Bootstrap 5.3.3, RTL build,** loaded from jsDelivr with integrity hashes (SRI), in `head.html` and `end.html`. **It is used for the menu only:** the navbar, which opens and closes on a phone (`collapse`). Our `st.css` loads after it, so ours wins. On a phone, the panel drops over the page under the bar, so the page doesn't move.
  - Do not build layout with Bootstrap classes (`row`, `col-*`, spacing utilities). The layout is `st-` and the tokens.
  - Bootstrap's base styles (reboot) are on. Our rules set their own margins, so the reboot doesn't move them.
  - `body` has `data-bs-no-jquery`, so Bootstrap never touches jQuery (only the registration page has it, and that jQuery is theirs).
- **The popup is the browser's own `<dialog>`,** not Bootstrap's modal.
  - There is one dialog for the whole site, in `end.html`.
  - `st-site.js` fills it from the `<template>` the build writes for each popup (the whole mechanism: "How the popups work" above).
  - The browser handles the accessibility: focus moves in and stays inside, Esc closes it, and focus returns to the button that opened it.
- **The font is Google Sans** (Hebrew included), **hosted with the site** in `st-fonts/`, preloaded in `head.html`, with `font-display: block`: no text is drawn until the font is in, so it never swaps and nothing jumps. Its fallback (`Google Sans Fallback` in `st.css`) is Arial resized to Google Sans's measured width, for a slow first visit. Don't switch back to the Google Fonts link or to `swap`: either brings the jump back.
- **No other library.**

## The registration page (careful)

`_src/pages/register.html` holds **their** registration module (activity 4086), copied as it is. Every `id`, `name`, `class`, `onclick` and hidden field stays as it was, because their scripts depend on them. **Only the look is ours,** from `.st-register` in `st.css`, styled through their own ids and classes. Don't rename or restructure anything inside it.

- **Their scripts:** they load from their server's root, in their original order: `/js/jquery.min.js`, `/js/sweetalert2.min.js`, `/js/acc-plug.js`, `/js/my.js`, `/js/reg.js`. `acc-plug.js` is needed because `reg.js` saves the form in a cookie through it.
- **The price table** is written by their `/js/script_act2027.js` (its rows; it also marks the column of the date chosen below, which st.css turns off: far from the choice, a coloured column read as random). The `<table>` is ours, with Bootstrap's standard classes (`table table-bordered table-striped align-middle`); `st.css` gives it the site's colours and undoes their style (it scaled the chosen column and squeezed the cells).
- **Where the form sends:** it posts to `/regPost.php` and checks membership against `/iltam_check_mem.php`.
- **Where it works:** **only on their server.** Opened locally, the page shows the form, but nothing in it runs.
- **The code is in one file, `st-js/register.js`:** the config (`RECID`, `VAT`, `actGRP`, `actPRC`, the error messages) that their PHP wrote for this activity (prices and payment links), their small loop that opens `.air` links in a new tab, the price table's head (a title and a line under it for each column, written in place of the head their script draws), and the date choice's rows (a click anywhere on a row picks it; their labels' `for` is broken). The page itself holds only markup and their `onclick`s. On their server the PHP programmer writes the config, so if prices change, it changes there. The form is basic on purpose: its logic is theirs.
- **It appears once it's ready.** The block stays hidden until the page has loaded (`st-site.js` adds `.is-ready`), because their scripts rewrite the price table while loading, and it would jump.
- **The edits:** the contact email link was missing its colon, and is now `mailto:`; the heading is "הרשמה לכנס INCOSE IL 2027"; the shekel sign sits on the price's left (`.sign` is an inline-block, so it doesn't join the number).

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
