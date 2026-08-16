/*
 * First Ex — site behaviour
 * Language switching (EN / AR + RTL), portfolio rendering and filtering,
 * project dialog, scroll reveal, animated statistics and contact form.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'firstex.lang';
  var state = { lang: 'en' };

  /* ---------------------------------------------------------------- i18n */

  function t(key) {
    var pack = I18N[state.lang] || I18N.en;
    return pack[key] !== undefined ? pack[key] : (I18N.en[key] || '');
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = t(el.getAttribute('data-i18n'));
      if (!value) return;
      // Only a handful of strings carry markup (the hero headline).
      if (value.indexOf('<') !== -1) el.innerHTML = value;
      else el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });

    document.title = t('meta.title');
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));
  }

  function setLanguage(lang, options) {
    state.lang = lang === 'ar' ? 'ar' : 'en';
    var isRtl = state.lang === 'ar';

    document.documentElement.lang = state.lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

    try { localStorage.setItem(STORAGE_KEY, state.lang); } catch (e) { /* private mode */ }

    applyTranslations();
    renderProjects();
    renderCompanyDetails();

    if (!options || !options.silent) {
      // Re-run the counters so the numerals match the active locale.
      document.querySelectorAll('.stat-value').forEach(function (el) { delete el.dataset.counted; });
      animateStats();
    }
  }

  /* ---------------------------------------------------------------- Number formatting */

  function formatNumber(value) {
    var locale = state.lang === 'ar' ? 'ar-SA' : 'en-US';
    try { return new Intl.NumberFormat(locale).format(value); }
    catch (e) { return String(value); }
  }

  /* ---------------------------------------------------------------- Project artwork */

  /*
   * Abstract architectural artwork generated per concept. These are
   * placeholders by design: drop a real photograph in by replacing the
   * `.project-art` contents with an <img> when renders are available.
   */
  function projectArt(kind) {
    var g =
      '<defs>' +
      '<linearGradient id="sky-' + kind + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#0F2437"/><stop offset="100%" stop-color="#16324a"/>' +
      '</linearGradient>' +
      '<radialGradient id="glow-' + kind + '" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="#D9BB74" stop-opacity=".26"/>' +
      '<stop offset="55%" stop-color="#D9BB74" stop-opacity=".08"/>' +
      '<stop offset="100%" stop-color="#D9BB74" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<rect width="400" height="250" fill="url(#sky-' + kind + ')"/>' +
      '<circle cx="336" cy="34" r="150" fill="url(#glow-' + kind + ')"/>';

    var shapes = {
      tower:
        '<g fill="none" stroke="#D9BB74" stroke-opacity=".85" stroke-width="1.4">' +
        '<path d="M150 250V62h100v188"/>' +
        '<path d="M166 62V42h68v20M200 42V22"/>' +
        '<path d="M150 88h100M150 114h100M150 140h100M150 166h100M150 192h100M150 218h100"/>' +
        '<path d="M200 62v188"/>' +
        '</g>' +
        '<g fill="#D9BB74" fill-opacity=".14"><rect x="150" y="62" width="50" height="188"/></g>' +
        '<g fill="none" stroke="#ffffff" stroke-opacity=".18" stroke-width="1">' +
        '<path d="M60 250v-70h60v70M280 250v-96h60v96"/></g>',
      residence:
        '<g fill="none" stroke="#D9BB74" stroke-opacity=".85" stroke-width="1.4">' +
        '<path d="M60 250v-60l40-30 40 30v60M100 160v-22"/>' +
        '<path d="M180 250v-72l44-32 44 32v72"/>' +
        '<path d="M300 250v-52l34-26 34 26v52"/>' +
        '</g>' +
        '<g fill="#D9BB74" fill-opacity=".12">' +
        '<rect x="205" y="196" width="38" height="54"/><rect x="76" y="206" width="26" height="44"/>' +
        '</g>' +
        '<path d="M0 250h400" stroke="#ffffff" stroke-opacity=".2"/>' +
        '<g stroke="#7BD8A6" stroke-opacity=".45" stroke-width="1.2" fill="none">' +
        '<path d="M154 250v-26M154 236l10-8M154 236l-10-8M286 250v-26M286 236l10-8M286 236l-10-8"/></g>',
      district:
        '<g fill="none" stroke="#D9BB74" stroke-opacity=".8" stroke-width="1.3">' +
        '<path d="M40 250v-88h52v88M104 250v-130h44v130M160 250v-64h58v64M230 250v-108h48v108M290 250v-78h64v78"/>' +
        '<path d="M0 214h400M0 250h400"/>' +
        '</g>' +
        '<g fill="#D9BB74" fill-opacity=".13"><rect x="104" y="120" width="44" height="130"/><rect x="230" y="142" width="48" height="108"/></g>' +
        '<g fill="none" stroke="#ffffff" stroke-opacity=".22" stroke-width="1"><path d="M0 232h400"/></g>',
      waterfront:
        '<g fill="none" stroke="#D9BB74" stroke-opacity=".85" stroke-width="1.4">' +
        '<path d="M70 186V96h60v90M130 186V70h58v116M188 186V110h60v76M248 186V84h64v102"/>' +
        '<path d="M70 118h242M70 146h242"/>' +
        '</g>' +
        '<g fill="#D9BB74" fill-opacity=".12"><rect x="130" y="70" width="58" height="116"/></g>' +
        '<path d="M0 186h400" stroke="#ffffff" stroke-opacity=".3"/>' +
        '<g fill="none" stroke="#8FD4E8" stroke-opacity=".45" stroke-width="1.2">' +
        '<path d="M0 206c30-10 60 10 90 0s60 10 90 0 60 10 90 0 60 10 90 0"/>' +
        '<path d="M0 228c30-10 60 10 90 0s60 10 90 0 60 10 90 0 60 10 90 0"/>' +
        '</g>',
      business:
        '<g fill="none" stroke="#D9BB74" stroke-opacity=".85" stroke-width="1.4">' +
        '<path d="M46 250v-74h108v74M172 250v-96h96v96M286 250v-64h74v64"/>' +
        '<path d="M46 200h108M172 182h96M286 214h74"/>' +
        '</g>' +
        '<g fill="#D9BB74" fill-opacity=".13"><rect x="172" y="154" width="96" height="96"/></g>' +
        '<path d="M0 250h400" stroke="#ffffff" stroke-opacity=".22"/>' +
        '<g fill="none" stroke="#ffffff" stroke-opacity=".16"><path d="M20 250v-30h14v30M366 250v-38h14v38"/></g>',
      avenue:
        '<g fill="none" stroke="#D9BB74" stroke-opacity=".85" stroke-width="1.4">' +
        '<path d="M40 250V150h120v100M240 250V150h120v100"/>' +
        '<path d="M40 182h120M240 182h120"/>' +
        '<path d="M40 150l60-30 60 30M240 150l60-30 60 30"/>' +
        '</g>' +
        '<g fill="#D9BB74" fill-opacity=".12"><rect x="66" y="196" width="34" height="54"/><rect x="298" y="196" width="34" height="54"/></g>' +
        '<path d="M180 250l20-70h0l20 70z" fill="#ffffff" fill-opacity=".07"/>' +
        '<path d="M0 250h400" stroke="#ffffff" stroke-opacity=".22"/>'
    };

    return '<svg viewBox="0 0 400 250" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">' +
      g + (shapes[kind] || shapes.tower) + '</svg>';
  }

  /* ---------------------------------------------------------------- Portfolio */

  var activeFilter = 'all';

  function renderProjects() {
    var grid = document.getElementById('projectGrid');
    if (!grid) return;
    var lang = state.lang;

    grid.innerHTML = PROJECTS.map(function (p, i) {
      var c = p[lang];
      return (
        '<button class="project" type="button" data-project="' + p.id + '" data-category="' + p.category + '"' +
        ' style="animation-delay:' + (i * 60) + 'ms">' +
          '<span class="project-art">' + projectArt(p.art) +
            '<span class="project-badge">' + c.type + '</span>' +
          '</span>' +
          '<span class="project-body">' +
            '<span class="project-location">' + c.location + '</span>' +
            '<h3>' + c.name + '</h3>' +
            '<p>' + c.summary + '</p>' +
            '<span class="project-meta">' +
              '<span>' + t('projects.area') + ' <b>' + c.area + '</b></span>' +
              '<span>' + t('projects.scope') + ' <b>' + c.scope + '</b></span>' +
            '</span>' +
            '<span class="project-link">' + t('projects.view') +
              '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">' +
              '<path d="M5 12h13M12 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</span>' +
          '</span>' +
        '</button>'
      );
    }).join('');

    applyFilter(activeFilter);
  }

  function applyFilter(filter) {
    activeFilter = filter;
    document.querySelectorAll('.project').forEach(function (card) {
      var match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !match);
    });
  }

  function initFilters() {
    var bar = document.getElementById('projectFilters');
    if (!bar) return;
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;
      bar.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      applyFilter(btn.dataset.filter);
    });
  }

  /* ---------------------------------------------------------------- Project dialog */

  var modal, lastFocused;

  function openProject(id) {
    var project = PROJECTS.filter(function (p) { return p.id === id; })[0];
    if (!project) return;
    var c = project[state.lang];

    document.getElementById('modalArt').innerHTML = projectArt(project.art);
    document.getElementById('modalLocation').textContent = c.location;
    document.getElementById('modalTitle').textContent = c.name;
    document.getElementById('modalDetail').textContent = c.detail;

    document.getElementById('modalSpecs').innerHTML =
      '<div><dt>' + t('projects.area') + '</dt><dd>' + c.area + '</dd></div>' +
      '<div><dt>' + t('projects.scope') + '</dt><dd>' + c.scope + '</dd></div>' +
      '<div><dt>' + t('projects.type') + '</dt><dd>' + c.type + '</dd></div>';

    document.getElementById('modalHighlights').innerHTML = c.highlights.map(function (h) {
      return '<li>' + h + '</li>';
    }).join('');

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close').focus();
  }

  function closeProject() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused) lastFocused.focus();
  }

  function initModal() {
    modal = document.getElementById('projectModal');
    if (!modal) return;

    document.addEventListener('click', function (e) {
      var card = e.target.closest('[data-project]');
      if (card) { openProject(card.dataset.project); return; }
      if (e.target.closest('[data-close]')) closeProject();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeProject();
    });
  }

  /* ---------------------------------------------------------------- Company details */

  function renderCompanyDetails() {
    var cr = COMPANY.cr;
    var isAr = state.lang === 'ar';

    var set = function (id, value, attr, attrValue) {
      var el = document.getElementById(id);
      if (!el) return;
      el.textContent = value;
      if (attr) el.setAttribute(attr, attrValue);
    };

    set('crLegalName', isAr ? cr.legalNameAr : cr.legalNameEn);
    set('crUnified', cr.unifiedNumber);
    set('crIssued', cr.issueDate);
    set('crEntity', isAr ? cr.entityTypeAr : cr.entityTypeEn);
    set('crStatus', isAr ? cr.statusAr : cr.statusEn);

    // Phone numbers are pinned to LTR so the grouped digits are not
    // reordered by the bidi algorithm when the page runs right-to-left.
    ['contactPhone', 'footerPhone'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.setAttribute('dir', 'ltr');
    });
    set('contactPhone', COMPANY.phoneDisplay, 'href', 'tel:' + COMPANY.phoneIntl);
    set('contactEmail', COMPANY.email, 'href', 'mailto:' + COMPANY.email);
    set('footerPhone', COMPANY.phoneDisplay, 'href', 'tel:' + COMPANY.phoneIntl);
    set('footerEmail', COMPANY.email, 'href', 'mailto:' + COMPANY.email);
    set('footerCr', cr.unifiedNumber);
    set('footerLegalName', isAr ? cr.legalNameAr : cr.legalNameEn);

    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------- Header & nav */

  function initHeader() {
    var header = document.getElementById('siteHeader');
    var nav = document.getElementById('primaryNav');
    var toggle = document.getElementById('menuToggle');

    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Highlight the section currently in view.
    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ---------------------------------------------------------------- Reveal + counters */

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
        if (entry.target.id === 'stats') animateStats();
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px' });
    items.forEach(function (el) { io.observe(el); });
  }

  function animateStats() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.stat-value').forEach(function (el) {
      if (el.dataset.counted === '1') return;
      el.dataset.counted = '1';

      var target = parseInt(el.dataset.count, 10) || 0;
      var suffix = el.dataset.suffix || '';
      var thousands = el.dataset.format === 'thousands';

      var paint = function (value) {
        el.textContent = formatNumber(thousands ? Math.round(value / 1000) * 1000 : Math.round(value)) + suffix;
      };

      if (reduce) { paint(target); return; }

      var duration = 1400;
      var start = null;
      var step = function (ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        paint(target * eased);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* ---------------------------------------------------------------- Contact form */

  function initForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var status = document.getElementById('formStatus');

    var showError = function (input, message) {
      input.closest('.field').classList.add('has-error');
      var slot = form.querySelector('[data-error-for="' + input.id + '"]');
      if (slot) slot.textContent = message;
    };

    var clearError = function (input) {
      input.closest('.field').classList.remove('has-error');
      var slot = form.querySelector('[data-error-for="' + input.id + '"]');
      if (slot) slot.textContent = '';
    };

    form.addEventListener('input', function (e) {
      if (e.target.matches('input, textarea')) clearError(e.target);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';

      var name = document.getElementById('fName');
      var email = document.getElementById('fEmail');
      var phone = document.getElementById('fPhone');
      var interest = document.getElementById('fInterest');
      var message = document.getElementById('fMessage');

      var valid = true;
      [name, email, message].forEach(function (input) { clearError(input); });

      if (!name.value.trim()) { showError(name, t('form.required')); valid = false; }
      if (!email.value.trim()) { showError(email, t('form.required')); valid = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        showError(email, t('form.invalidEmail')); valid = false;
      }
      if (!message.value.trim()) { showError(message, t('form.required')); valid = false; }
      if (!valid) return;

      // No backend is bundled with the static site: hand the enquiry to the
      // visitor's mail client. Swap this for a POST to your CRM endpoint.
      var interestLabel = interest.options[interest.selectedIndex].textContent;
      var subject = 'First Ex enquiry — ' + interestLabel;
      var body =
        t('form.name') + ': ' + name.value.trim() + '\n' +
        t('form.email') + ': ' + email.value.trim() + '\n' +
        t('form.phone') + ': ' + (phone.value.trim() || '-') + '\n' +
        t('form.interest') + ': ' + interestLabel + '\n\n' +
        message.value.trim() + '\n';

      window.location.href = 'mailto:' + COMPANY.email +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      status.textContent = t('form.success');
      form.reset();
    });
  }

  /* ---------------------------------------------------------------- Boot */

  function detectLanguage() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('lang')) return params.get('lang');
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
    } catch (e) { /* private mode */ }
    return (navigator.language || 'en').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en';
  }

  document.addEventListener('DOMContentLoaded', function () {
    setLanguage(detectLanguage(), { silent: true });

    initHeader();
    initFilters();
    initModal();
    initForm();
    initReveal();

    document.getElementById('langToggle').addEventListener('click', function () {
      setLanguage(state.lang === 'ar' ? 'en' : 'ar');
    });
  });
})();
