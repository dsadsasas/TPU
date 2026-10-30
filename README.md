# TestPrepUnraveled

A personal home for the free SAT and ACT guides shared under the TikTok name TestPrepUnraveled. Open **index.html** in a browser to start. Everything runs with HTML, CSS, and vanilla JavaScript. No npm, Node.js, framework, database, server code, API keys, or build process is required.

## What is included

- `index.html`: Home, eight topic cards, eight popular guides, and a short introduction connecting the guides to TikTok.
- `sat-guides.html` and `act-guides.html`: searchable libraries with category filters, result counts, and empty states.
- `contact.html`: an honest contact placeholder; add your own contact details before launch.
- `privacy.html`: analytics disclosure and accept/decline controls.
- `guides/`: ten complete guide pages, each with original examples, reference tables, tips, three practice questions, and expandable answer explanations. The two additional guides populate SAT Practice and ACT Strategy.
- `pdfs/`: ten real, three-page PDFs matching the guides, plus replacement instructions.
- `css/styles.css`: all shared, responsive styling; colors are at the top.
- `js/main.js`: mobile menu, search, and category filters.
- `js/analytics.js`: optional GA4 setup, consent, and PDF-click events.
- `images/`: the site favicon.
- `robots.txt`, `sitemap.xml`, `.nojekyll`: deployment and indexing files.

All internal links are relative, so they work locally and under a GitHub Pages repository path. The site has no external fonts or runtime libraries. Analytics is the only optional external script. Keep the whole folder together when copying the site.

## Make it yours

1. **Contact:** find `CHANGE CONTACT INFORMATION` in `contact.html`. Replace the status paragraph with your preferred public contact information. For example, use `<a href="mailto:YOUR-EMAIL">Get in touch</a>` after replacing YOUR-EMAIL.
2. **Colors and appearance:** edit the CSS variables at the top of `css/styles.css`. Shared headers and footers are written directly in each HTML page for maximum portability; update each copy if you change them.
3. **Dates and reading time:** update each guide’s author row, `<time datetime="YYYY-MM-DD">`, reading time, and matching library-card metadata when you change content. Update the sitemap's `lastmod` only when that page changes.

## Add a new guide

1. Copy a similar page from `guides/`, give it a descriptive lowercase filename such as `sat-linear-equations.html`, and edit its content.
2. Update its `<title>`, description, Open Graph title/description, heading, category, author/date, reading time, table of contents, original examples, and answer explanations. Keep one `<h1>` per page.
3. Copy a complete `<article class="guide-card">…</article>` into `sat-guides.html` or `act-guides.html` near the `ADD NEW GUIDES` comment. Update the title, description, reading time, both links, and tracking attributes. If desired, copy it into Home’s Popular Guides too.
4. Set `data-category` to the exact filter label, such as `Reading &amp; Writing`. Set `data-search` to a lowercase string containing the new title, description, and keywords. The script discovers cards automatically; no JavaScript editing is needed. For a new category, also copy a filter button and update its `data-filter` label.
5. Save the matching PDF in `pdfs/`, update download links, and add the new deployed page URL to `sitemap.xml`. Update the static initial “Showing … guides” text in the library for consistency, although JavaScript recalculates it on load.

## Add or replace a PDF

Replace a file in `pdfs/` using the same filename to keep all existing links working. To use a new filename, update the `href` on its library/Home cards and at **both the top and bottom** of the guide page.

Top-level card example:

```html
<a class="pdf-link"
   href="pdfs/sat-linear-equations.pdf"
   download
   data-guide-name="SAT Linear Equations"
   data-test-type="SAT"
   data-category="Math">↓ Download PDF</a>
```

Inside a page in `guides/`, use `../pdfs/sat-linear-equations.pdf`. Keep `download` and all three `data-` attributes. Browsers may offer a preview or Save dialog depending on local settings. PDFs are standalone files; edits to HTML do not automatically update their contents. Export your revised guide as PDF from your preferred document editor, then replace the sample.

## Connect Google Analytics 4

1. Create a GA4 property and Web data stream for your published site.
2. In `js/analytics.js`, replace the single setup value `G-XXXXXXXXXX` in `const MEASUREMENT_ID` with your real web-stream Measurement ID, for example `G-ABC1234567`. Do not put a private API secret into the website.
3. Publish the updated file and accept analytics in the site's banner or Privacy page. Analytics intentionally does not load for the placeholder, `file://` previews, or visitors who decline. If browser storage is unavailable, consent may need to be chosen again on another page.
4. Use GA4’s page and user reports for visits and visitors. Guide pages appear under their `/guides/…` paths. Every download link sends a custom `guide_download` event with `guide_name`, `test_type`, and `category`, while allowing the normal download to proceed.
5. In GA4 Admin → Custom definitions, create event-scoped dimensions for `guide_name`, `test_type`, and `category` to analyze them in reports. Check Realtime (or DebugView with your normal debug setup) while clicking a PDF on the deployed site.
6. Google Enhanced Measurement may also send `file_download`. Do not add it to `guide_download` counts, since both can describe the same click. A click event is not proof of a completed download. Ad blockers, declined consent, or offline use can prevent analytics, so do not treat counts as exact usage totals.

The site does not include a custom analytics dashboard. Privacy text describes the implementation; review it when changing providers or collection settings.

Official event setup documentation: https://developers.google.com/analytics/devguides/collection/ga4/events

## Publish free with GitHub Pages

1. Create a public GitHub repository, for example `TestPrepUnraveled`.
2. Upload the contents of this folder, keeping `index.html` at the repository root and preserving the `css`, `js`, `images`, `guides`, and `pdfs` folders. Include `.nojekyll`. Do not upload a ZIP as the website itself; extract it first.
3. Commit the files to `main`.
4. Open the repository’s **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select **main** and **/(root)**. Save.
5. When deployment finishes, use the site URL GitHub shows, normally `https://YOUR-USERNAME.github.io/TestPrepUnraveled/`.
6. Replace the placeholder origin throughout `sitemap.xml` with that actual URL (without a trailing slash before the page path). In `robots.txt`, uncomment the `Sitemap:` line and set it to the actual absolute sitemap URL. For a repository site, the robots.txt file lives under that repository path; search engines consult robots.txt at the domain root. You can submit this sitemap directly in Search Console, or use a user-site repository/custom domain if you need domain-root crawler directives.
7. Check Home, the two libraries, a guide, and a PDF at the deployed URL. Later edits publish when you commit them to the selected branch.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

These same static files can be hosted on Netlify or Vercel without a build command. Choose a plain/static project configuration and publish the directory containing `index.html`.

## Content and verification

All questions and explanations are original sample content. Current test-format references are linked from the guides; always consult the test provider for admission requirements, allowed tools, and administration-specific rules. All ten PDFs contain the corresponding full sample guide and were rendered for visual inspection.

All 15 HTML pages were checked for valid local links and anchors after removing the About page. One previously created file, `pdfs/act-math-formulas.pdf`, is currently absent from the workspace; its download links need that file restored or replaced. Metadata, category consistency, and PDF text were checked during the original build. Both JavaScript files passed syntax checks in JavaScriptCore without Node.js. The browser tool blocked file:// access in this environment, so live browser layout and interaction verification could not be completed here. Open index.html locally to review the actual site. Live GA4 receipt must be verified after adding your real ID and deploying.
