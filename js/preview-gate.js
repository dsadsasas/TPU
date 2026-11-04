/* TEMPORARY PREVIEW SCREEN — a convenience gate, NOT secure authentication.
   All HTML, PDFs, and JavaScript remain publicly retrievable from static hosting.
   Use hosting-level protection if unpublished guides must actually remain private.
   Set ENABLE_PREVIEW_GATE to false when ready to launch.
   To change the password, replace PASSWORD_SHA256 with its SHA-256 hex digest.
   Changing the digest also invalidates previously remembered access.
*/
(() => {
  const ENABLE_PREVIEW_GATE = true; // CHANGE TO false TO OPEN THE SITE
  const PASSWORD_SHA256 = '9a4aabf0e5cf71cae2cea646613ce7e2a5919fa758e56819704be25a3a2c1f0b';
  const storageKey = 'tpu-preview-access';
  const root = document.documentElement;
  let remembered = false;
  try { remembered = sessionStorage.getItem(storageKey) === PASSWORD_SHA256; } catch (_) {}
  window.TPU_PREVIEW_LOCKED = ENABLE_PREVIEW_GATE && !remembered;
  if (!window.TPU_PREVIEW_LOCKED) root.removeAttribute('data-preview-locked');

  document.addEventListener('DOMContentLoaded', () => {
    if (!ENABLE_PREVIEW_GATE) return;
    const lock = document.createElement('button');
    lock.type = 'button';
    lock.className = 'preview-lock-button';
    lock.textContent = 'Lock preview';
    lock.addEventListener('click', () => {
      try { sessionStorage.removeItem(storageKey); } catch (_) {}
      location.reload();
    });
    document.body.appendChild(lock);
    if (!window.TPU_PREVIEW_LOCKED) return;

    const gate = document.createElement('main');
    gate.className = 'preview-gate';
    gate.innerHTML = `
      <section class="preview-card" aria-labelledby="preview-title">
        <p class="eyebrow">TESTPREPUNRAVELED</p>
        <h1 id="preview-title">The guides are getting ready.</h1>
        <p>I’m putting everything together. Enter the preview password to take a look.</p>
        <form class="preview-form">
          <label for="preview-password">Preview password</label>
          <input id="preview-password" name="password" type="password" autocomplete="current-password" required aria-describedby="preview-error">
          <button class="button" type="submit">Open preview</button>
          <p id="preview-error" class="preview-error" role="alert"></p>
        </form>
      </section>`;
    document.body.appendChild(gate);
    const field = gate.querySelector('input');
    const button = gate.querySelector('button');
    const error = gate.querySelector('#preview-error');
    field.focus();
    gate.querySelector('form').addEventListener('submit', async event => {
      event.preventDefault();
      button.disabled = true;
      error.textContent = '';
      field.removeAttribute('aria-invalid');
      try {
        const bytes = new TextEncoder().encode(field.value);
        const hash = await crypto.subtle.digest('SHA-256', bytes);
        const hex = Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join('');
        if (hex !== PASSWORD_SHA256) {
          error.textContent = 'That password isn’t right. Please try again.';
          field.setAttribute('aria-invalid', 'true');
          field.select();
          return;
        }
        let saved = false;
        try { sessionStorage.setItem(storageKey, hex); saved = true; } catch (_) {}
        field.value = '';
        if (saved) { location.reload(); return; }
        // Storage may be blocked: unlock only this page instead of looping.
        window.TPU_PREVIEW_LOCKED = false;
        root.removeAttribute('data-preview-locked');
        gate.remove();
        document.querySelector('.site-header a')?.focus();
      } catch (_) {
        error.textContent = 'Please open this preview over HTTPS or in a current browser to enter the password.';
      } finally { button.disabled = false; }
    });
  });
})();
