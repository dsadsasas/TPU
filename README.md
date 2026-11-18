# Test Prep Unraveled

A one-page personal collection of SAT guides. Built with plain HTML and CSS, hosted from the repository root. No build step or analytics.

- `index.html`: introduction and SAT PDF downloads.
- `css/styles.css`: responsive page styling.
- `pdfs/`: PDF files. Ten supplied guides converted to PDFs with personal metadata removed. The original Word documents are not published.

## Add PDFs

Save each supplied PDF in `pdfs/`. Add one row in `index.html` per guide:

```html
<article class="guide-row">
  <div>
    <h3>Guide title</h3>
    <p>A short description of the guide’s contents.</p>
  </div>
  <a class="download-link" href="pdfs/guide-filename.pdf" download
     aria-label="Download Guide title as a PDF">Download PDF ↓</a>
</article>
```

Use the guide’s actual title and contents. Keep all guides on this page.

## Preview and hosting

Serve this directory with a static HTTP server or open `index.html` locally. The guides page opens directly without a password or JavaScript.

The repository uses GitHub Pages with the custom domain in `CNAME`. Publish the root files. The ZIP and nested `TestPrepUnraveled/` folder are historical copies, not the active website.
