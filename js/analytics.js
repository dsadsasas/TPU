/* GOOGLE ANALYTICS 4 SETUP
   Replace G-XXXXXXXXXX below with your real GA4 web-stream Measurement ID.
   This is the ONLY place you need to change it. No analytics requests are made
   with the placeholder, on file://, or before a visitor accepts analytics.
   Page views (including guide visits) are sent by the config call.
   Use GA4 Reports for visitors and pages; there is no custom dashboard.
*/
(() => {
  const MEASUREMENT_ID = 'G-XXXXXXXXXX'; // <-- REPLACE WITH YOUR GOOGLE ANALYTICS ID
  const configured = /^G-[A-Z0-9]+$/.test(MEASUREMENT_ID) && MEASUREMENT_ID !== 'G-XXXXXXXXXX';
  const canLoad = configured && /^https?:$/.test(location.protocol);
  const storageKey = 'testprep-analytics-consent';
  let consent = null;
  try { consent = localStorage.getItem(storageKey); } catch (_) { /* Guides still work without storage. */ }
  let loaded = false;
  function startAnalytics() {
    if (!canLoad || consent !== 'accepted' || loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(script);
  }
  function updateStatus() {
    const status = document.querySelector('#consent-status');
    if (status) status.textContent = (!configured ? 'Analytics is currently unconfigured. ' : '') + 'Your choice: ' + (consent || 'not yet selected') + '.';
  }
  function choose(value) {
    consent = value;
    try { localStorage.setItem(storageKey, value); } catch (_) { /* Choice applies to this page. */ }
    document.querySelector('.consent-banner')?.remove();
    updateStatus();
    if (value === 'accepted') startAnalytics();
    else if (loaded) { window['ga-disable-' + MEASUREMENT_ID] = true; location.reload(); }
  }
  document.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => choose(button.dataset.consent)));
  if (canLoad && consent !== 'accepted' && consent !== 'declined') {
    const banner = document.createElement('section');
    banner.className = 'consent-banner'; banner.setAttribute('aria-label', 'Optional analytics');
    const privacyPath = location.pathname.includes('/guides/') ? '../privacy.html' : 'privacy.html';
    banner.innerHTML = '<div><strong>Help us understand what’s useful.</strong><p>Allow optional analytics for page views and guide download clicks? <a href="' + privacyPath + '">Privacy details</a></p></div><button type="button" class="button" data-choice="accepted">Accept</button><button type="button" class="button secondary" data-choice="declined">Decline</button>';
    banner.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => choose(button.dataset.choice)));
    document.body.appendChild(banner);
  }
  /* Track a click without blocking the normal PDF download. Add these three
     data attributes when adding a PDF link: data-guide-name, data-test-type,
     and data-category. Custom event name: guide_download.
     In GA4 Admin > Custom definitions, register these event-scoped dimensions:
     guide_name, test_type, category. Use DebugView/Realtime to verify events.
     Enhanced Measurement may separately report file_download; don't add its
     totals to guide_download, since both may represent the same click. */
  window.trackGuideDownload = function (link) {
    if (!loaded || consent !== 'accepted' || typeof window.gtag !== 'function') return;
    window.gtag('event', 'guide_download', {
      guide_name: link.dataset.guideName,
      test_type: link.dataset.testType,
      category: link.dataset.category,
      transport_type: 'beacon'
    });
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-guide-name][download]');
    if (link) window.trackGuideDownload(link);
    // No preventDefault: the browser handles the file normally.
  });
  updateStatus(); startAnalytics();
})();
