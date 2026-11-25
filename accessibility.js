/*!
 * תפריט נגישות – Shon's Place
 * הוספה לאתר: לפני </body> הוסיפו
 *   <script src="accessibility.js" defer></script>
 * הגדרות: שנו את STATEMENT_URL לכתובת הצהרת הנגישות של האתר.
 */
(function () {
  'use strict';
  if (document.getElementById('a11y-root')) return;

  var STATEMENT_URL = 'accessibility.html'; // כתובת הצהרת הנגישות
  var STORAGE_KEY = 'a11y-prefs-v1';
  var GOLD = '#d4af5f';

  /* ---------- שמירת העדפות ---------- */
  var prefs = {};
  try { prefs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { prefs = {}; }
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch (e) {} }

  /* ---------- עיצוב ---------- */
  var css = [
    '#a11y-root,#a11y-root *{box-sizing:border-box;font-family:Arial,"Segoe UI",sans-serif!important;letter-spacing:normal!important;line-height:1.4!important;filter:none!important}',
    '#a11y-toggle{position:fixed;bottom:24px;right:24px;z-index:2147483646;width:56px;height:56px;border-radius:50%;border:2px solid #111;background:' + GOLD + ';color:#111;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.45);transition:transform .15s}',
    '#a11y-toggle:hover{transform:scale(1.07)}',
    '#a11y-toggle:focus-visible,#a11y-panel button:focus-visible,#a11y-panel a:focus-visible{outline:3px solid #fff!important;outline-offset:2px}',
    '#a11y-toggle svg{width:32px;height:32px}',
    '#a11y-panel{position:fixed;bottom:92px;right:24px;z-index:2147483647;width:340px;max-width:calc(100vw - 32px);max-height:calc(100vh - 120px);overflow:auto;background:#161616;color:#f2f2f2;border:1px solid ' + GOLD + ';border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,.6);direction:rtl;text-align:right;font-size:16px!important}',
    '#a11y-panel[hidden]{display:none}',
    '#a11y-panel header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #333}',
    '#a11y-panel h2{margin:0;font-size:19px!important;color:' + GOLD + '}',
    '#a11y-close{background:none;border:0;color:#f2f2f2;font-size:26px!important;cursor:pointer;width:36px;height:36px;border-radius:8px}',
    '#a11y-close:hover{background:#2a2a2a}',
    '#a11y-panel .a11y-size{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 16px 4px}',
    '#a11y-panel .a11y-size span{font-size:15px!important}',
    '#a11y-panel .a11y-size div{display:flex;gap:6px;align-items:center}',
    '#a11y-panel .a11y-size button{width:40px;height:40px;border-radius:8px;border:1px solid #444;background:#222;color:#fff;font-size:18px!important;cursor:pointer}',
    '#a11y-panel .a11y-size output{min-width:46px;text-align:center;font-size:14px!important;color:#ccc}',
    '#a11y-panel .a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px 16px}',
    '#a11y-panel .a11y-grid button{min-height:64px;padding:8px;border-radius:10px;border:1px solid #3a3a3a;background:#222;color:#f2f2f2;font-size:14px!important;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center}',
    '#a11y-panel .a11y-grid button .ic{font-size:20px!important;line-height:1!important}',
    '#a11y-panel .a11y-grid button:hover{border-color:' + GOLD + '}',
    '#a11y-panel .a11y-grid button[aria-pressed="true"]{background:' + GOLD + ';color:#111;border-color:' + GOLD + ';font-weight:bold}',
    '#a11y-panel footer{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 16px 16px;border-top:1px solid #333}',
    '#a11y-reset{background:none;border:1px solid #555;color:#f2f2f2;border-radius:8px;padding:8px 12px;cursor:pointer;font-size:14px!important}',
    '#a11y-reset:hover{border-color:' + GOLD + '}',
    '#a11y-panel footer a{color:' + GOLD + ';font-size:14px!important}',
    '.a11y-skip{position:absolute;top:-60px;right:8px;z-index:2147483647;background:' + GOLD + ';color:#111;padding:10px 16px;border-radius:8px;font:bold 16px Arial,sans-serif;text-decoration:none}',
    '.a11y-skip:focus{top:8px}',

    /* --- מצבים --- */
    'html.a11y-contrast body>*:not(#a11y-root){filter:contrast(1.6)!important}',
    'html.a11y-dark-contrast body,html.a11y-dark-contrast body *:not(#a11y-root):not(#a11y-root *){background-color:#000!important;color:#fff!important;border-color:#fff!important;text-shadow:none!important;box-shadow:none!important}',
    'html.a11y-dark-contrast body a:not(#a11y-root *),html.a11y-dark-contrast body a *:not(#a11y-root *){color:#ffeb3b!important}',
    'html.a11y-light body,html.a11y-light body *:not(#a11y-root):not(#a11y-root *){background-color:#fff!important;color:#000!important;border-color:#000!important;text-shadow:none!important;box-shadow:none!important}',
    'html.a11y-light body a:not(#a11y-root *),html.a11y-light body a *:not(#a11y-root *){color:#0033cc!important}',
    'html.a11y-dark-contrast body *:not(#a11y-root *),html.a11y-light body *:not(#a11y-root *){background-image:none!important}',
    'html.a11y-dark-contrast img,html.a11y-dark-contrast video,html.a11y-light img,html.a11y-light video{opacity:1!important}',
    'html.a11y-gray body>*:not(#a11y-root){filter:grayscale(1)!important}',
    'html.a11y-gray.a11y-contrast body>*:not(#a11y-root){filter:grayscale(1) contrast(1.6)!important}',
    'html.a11y-links a:not(#a11y-root *){text-decoration:underline!important;outline:2px solid #ffeb3b!important;outline-offset:2px}',
    'html.a11y-headings h1:not(#a11y-root *),html.a11y-headings h2:not(#a11y-root *),html.a11y-headings h3:not(#a11y-root *),html.a11y-headings h4:not(#a11y-root *){outline:2px dashed #4fc3f7!important;outline-offset:4px}',
    'html.a11y-font body *:not(#a11y-root *){font-family:Arial,Helvetica,sans-serif!important}',
    'html.a11y-spacing body *:not(#a11y-root *){line-height:1.8!important;letter-spacing:.06em!important;word-spacing:.12em!important}',
    'html.a11y-cursor,html.a11y-cursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\' viewBox=\'0 0 48 48\'%3E%3Cpath d=\'M6 4l30 18-13 3-7 13z\' fill=\'%23000\' stroke=\'%23fff\' stroke-width=\'3\'/%3E%3C/svg%3E") 4 4,auto!important}',
    'html.a11y-motion *,html.a11y-motion *::before,html.a11y-motion *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}',
    'html.a11y-focus *:focus{outline:3px solid #ff9800!important;outline-offset:3px!important}',
    '@media (max-width:480px){#a11y-toggle{bottom:16px;right:16px;width:50px;height:50px}#a11y-panel{right:16px;bottom:76px}}'
  ].join('\n');
  var style = document.createElement('style');
  style.id = 'a11y-style';
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- אפשרויות ---------- */
  var TOGGLES = [
    { key: 'dark-contrast', label: 'ניגודיות כהה', ic: '◐', excl: ['light'] },
    { key: 'light', label: 'רקע בהיר', ic: '☀', excl: ['dark-contrast'] },
    { key: 'contrast', label: 'ניגודיות גבוהה', ic: '◑' },
    { key: 'gray', label: 'גווני אפור', ic: '▦' },
    { key: 'links', label: 'הדגשת קישורים', ic: '🔗' },
    { key: 'headings', label: 'הדגשת כותרות', ic: 'H' },
    { key: 'font', label: 'גופן קריא', ic: 'Aa' },
    { key: 'spacing', label: 'ריווח טקסט', ic: '↔' },
    { key: 'cursor', label: 'סמן גדול', ic: '➤' },
    { key: 'motion', label: 'עצירת אנימציות', ic: '⏸' },
    { key: 'focus', label: 'הדגשת פוקוס', ic: '⌖' }
  ];

  /* ---------- בניית הממשק ---------- */
  var root = document.createElement('div');
  root.id = 'a11y-root';
  root.setAttribute('dir', 'rtl');
  root.setAttribute('lang', 'he');

  var grid = TOGGLES.map(function (t) {
    return '<button type="button" data-key="' + t.key + '" aria-pressed="false"><span class="ic" aria-hidden="true">' + t.ic + '</span>' + t.label + '</button>';
  }).join('');

  root.innerHTML =
    '<button id="a11y-toggle" type="button" aria-label="פתיחת תפריט נגישות" aria-expanded="false" aria-controls="a11y-panel">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><circle cx="12" cy="4" r="2"/><path d="M21 9h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>' +
    '</button>' +
    '<div id="a11y-panel" role="dialog" aria-modal="false" aria-labelledby="a11y-title" hidden>' +
      '<header><h2 id="a11y-title">תפריט נגישות</h2><button id="a11y-close" type="button" aria-label="סגירת תפריט הנגישות">×</button></header>' +
      '<div class="a11y-size"><span id="a11y-size-label">גודל טקסט</span><div role="group" aria-labelledby="a11y-size-label">' +
        '<button type="button" data-size="-1" aria-label="הקטנת טקסט">−</button>' +
        '<output id="a11y-size-val" aria-live="polite">100%</output>' +
        '<button type="button" data-size="1" aria-label="הגדלת טקסט">+</button>' +
      '</div></div>' +
      '<div class="a11y-grid">' + grid + '</div>' +
      '<footer><button id="a11y-reset" type="button">↺ איפוס הגדרות</button>' +
        '<a href="' + STATEMENT_URL + '">הצהרת נגישות</a></footer>' +
    '</div>';
  document.body.appendChild(root);

  /* קישור "דלג לתוכן" */
  var main = document.querySelector('main') || document.querySelector('section');
  if (main) {
    if (!main.id) main.id = 'main-content';
    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
    var skip = document.createElement('a');
    skip.className = 'a11y-skip';
    skip.href = '#' + main.id;
    skip.textContent = 'דלג לתוכן הראשי';
    document.body.insertBefore(skip, document.body.firstChild);
  }

  var toggleBtn = root.querySelector('#a11y-toggle');
  var panel = root.querySelector('#a11y-panel');
  var html = document.documentElement;

  /* ---------- גודל טקסט ---------- */
  var SIZE_STEPS = [100, 115, 130, 150, 175, 200];
  var TEXT_SEL = 'p,li,a,span,h1,h2,h3,h4,h5,h6,label,button,td,th,blockquote,small,strong,em,b,i,figcaption,div,input,textarea,select';
  function applySize() {
    var idx = prefs.size || 0;
    var factor = SIZE_STEPS[idx] / 100;
    var els = document.body.querySelectorAll(TEXT_SEL);
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (root.contains(el)) continue;
      if (!el.hasAttribute('data-a11y-fs')) {
        el.setAttribute('data-a11y-fs', parseFloat(getComputedStyle(el).fontSize));
      }
      if (factor === 1) el.style.removeProperty('font-size');
      else el.style.setProperty('font-size', (parseFloat(el.getAttribute('data-a11y-fs')) * factor) + 'px', 'important');
    }
    root.querySelector('#a11y-size-val').textContent = SIZE_STEPS[idx] + '%';
  }

  /* ---------- מצבים ---------- */
  function applyToggles() {
    TOGGLES.forEach(function (t) {
      var on = !!prefs[t.key];
      html.classList.toggle('a11y-' + t.key, on);
      var b = root.querySelector('[data-key="' + t.key + '"]');
      if (b) b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var vids = document.querySelectorAll('video');
    for (var i = 0; i < vids.length; i++) {
      if (prefs.motion) { if (!vids[i].paused) { vids[i].setAttribute('data-a11y-paused', '1'); vids[i].pause(); } }
      else if (vids[i].getAttribute('data-a11y-paused')) { vids[i].removeAttribute('data-a11y-paused'); vids[i].play().catch(function () {}); }
    }
  }

  function applyAll() { applyToggles(); if (prefs.size) applySize(); }

  /* ---------- אירועים ---------- */
  function openPanel() {
    panel.hidden = false;
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.setAttribute('aria-label', 'סגירת תפריט נגישות');
    panel.querySelector('#a11y-close').focus();
  }
  function closePanel(returnFocus) {
    panel.hidden = true;
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'פתיחת תפריט נגישות');
    if (returnFocus) toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', function () { panel.hidden ? openPanel() : closePanel(false); });
  root.querySelector('#a11y-close').addEventListener('click', function () { closePanel(true); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) closePanel(true);
    // קיצור מקלדת: Alt + A
    if (e.altKey && (e.key === 'a' || e.key === 'A' || e.key === 'ש')) { e.preventDefault(); panel.hidden ? openPanel() : closePanel(true); }
  });
  document.addEventListener('click', function (e) {
    if (!panel.hidden && !root.contains(e.target)) closePanel(false);
  });

  root.querySelectorAll('[data-size]').forEach(function (b) {
    b.addEventListener('click', function () {
      var idx = (prefs.size || 0) + parseInt(b.getAttribute('data-size'), 10);
      prefs.size = Math.max(0, Math.min(SIZE_STEPS.length - 1, idx));
      save(); applySize();
    });
  });

  root.querySelectorAll('[data-key]').forEach(function (b) {
    b.addEventListener('click', function () {
      var key = b.getAttribute('data-key');
      prefs[key] = !prefs[key];
      var def = TOGGLES.filter(function (t) { return t.key === key; })[0];
      if (prefs[key] && def.excl) def.excl.forEach(function (k) { prefs[k] = false; });
      save(); applyToggles();
    });
  });

  root.querySelector('#a11y-reset').addEventListener('click', function () {
    prefs = {}; save(); applyToggles(); applySize();
  });

  /* החלת העדפות שמורות בטעינה */
  applyAll();
})();
