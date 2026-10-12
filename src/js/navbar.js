/**
 * AETHER CINEMATICS - SHARED LAYOUT SYSTEM
 * Injects one identical navbar + footer across every page,
 * wires the profile dropdown, mobile drawer, theme toggle,
 * and RTL toggle. Vanilla JS only.
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Resolve the project base path so links work from any folder depth
     (root, /public/pages, /public/auth, /public/auth/admin ...)
  ------------------------------------------------------------------ */
  function getBase() {
    var path = window.location.pathname.replace(/\\/g, '/');
    var idx = path.indexOf('/public/');
    if (idx !== -1) {
      var after = path.slice(idx + 1); // e.g. "public/auth/admin/x.html"
      var depth = after.split('/').length - 1; // folders deep from project root
      return new Array(depth + 1).join('../'); // "public" + "auth" => "../../"
    }
    return '';
  }

  var BASE = getBase();

  var PAGES = {
    home: BASE + 'index.html',
    home2: BASE + 'public/pages/home-2.html',
    services: BASE + 'public/pages/services.html',
    serviceDetails: BASE + 'public/pages/service-details.html',
    pricing: BASE + 'public/pages/pricing.html',
    blog: BASE + 'public/pages/blog.html',
    about: BASE + 'public/pages/about.html',
    contact: BASE + 'public/pages/contact.html',
    faq: BASE + 'public/pages/FAQ.html',
    login: BASE + 'public/auth/login.html',
    signup: BASE + 'public/auth/signup.html',
    admin: BASE + 'public/auth/admin/admin-dashboard.html',
    user: BASE + 'public/auth/user/user-dashboard.html'
  };

  var NAV_LINKS = [
    { label: 'Home', href: PAGES.home, match: 'index.html' },
    { label: 'Home 2', href: PAGES.home2, match: 'home-2.html' },
    { label: 'About', href: PAGES.about, match: 'about.html' },
    { label: 'Services', href: PAGES.services, match: 'services.html' },
    { label: 'Blog', href: PAGES.blog, match: 'blog.html' },
    { label: 'Contact', href: PAGES.contact, match: 'contact.html' }
  ];

  var ICON = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="18" height="18"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="18" height="18"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    login: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>',
    signup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>',
    admin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>',
   
  };

  /* ------------------------------------------------------------------
     Theme
  ------------------------------------------------------------------ */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('aether-theme', theme); } catch (e) {}
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.innerHTML = theme === 'light' ? ICON.moon : ICON.sun;
      btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    });
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('aether-theme'); } catch (e) {}
    var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(saved || (prefersLight ? 'light' : 'dark'));
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
        var stored = null;
        try { stored = localStorage.getItem('aether-theme'); } catch (er) {}
        if (!stored) applyTheme(e.matches ? 'light' : 'dark');
      });
    }
  }

  /* ------------------------------------------------------------------
     RTL
  ------------------------------------------------------------------ */
  function applyRTL(rtl) {
    document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    try { localStorage.setItem('aether-rtl', rtl ? '1' : '0'); } catch (e) {}
    document.querySelectorAll('[data-rtl-toggle]').forEach(function (btn) {
      btn.textContent = rtl ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', rtl ? 'Switch to left to right' : 'Switch to right to left');
    });
  }

  function initRTL() {
    var saved = null;
    try { saved = localStorage.getItem('aether-rtl'); } catch (e) {}
    var rtlLangs = ['ar', 'he', 'fa', 'ur'];
    var systemRTL = rtlLangs.indexOf((navigator.language || 'en').slice(0, 2).toLowerCase()) !== -1;
    var rtl = saved !== null ? saved === '1' : systemRTL;
    applyRTL(rtl);
  }

  /* ------------------------------------------------------------------
     Which nav link is active?
  ------------------------------------------------------------------ */
  function currentFile() {
    var parts = window.location.pathname.replace(/\\/g, '/').split('/');
    return parts[parts.length - 1] || 'index.html';
  }

  /* ------------------------------------------------------------------
     Build header
  ------------------------------------------------------------------ */
  function buildHeader() {
    var file = currentFile();
    var links = NAV_LINKS.map(function (l) {
      var active = l.match === file ? ' active' : '';
      return '<a href="' + l.href + '" class="nav-link' + active + '">' + l.label + '</a>';
    }).join('');

    return '' +
      '<header class="site-nav" id="main-nav">' +
        '<div class="container-wide nav-container">' +
          '<a href="' + PAGES.home + '" class="brand-logo" aria-label="Aether Cinematics Home">' +
            '<div class="brand-icon"><img src="' + BASE + 'assets/images/logo.png" alt="aether-logo" style="height:100%;width:100%;object-fit:contain;"></div>' +
            '<span class="brand-text">AETHER</span>' +
          '</a>' +
          '<nav class="nav-links" aria-label="Primary Navigation">' + links + '</nav>' +
          '<div class="nav-actions">' +

            '<div class="nav-tools">' +
              '<button class="tool-btn" data-rtl-toggle type="button" aria-label="Toggle RTL">RTL</button>' +
              '<button class="tool-btn" data-theme-toggle type="button" aria-label="Toggle theme"></button>' +
              '<div class="profile-menu" id="profile-menu">' +
                '<button class="profile-trigger tool-btn" id="profile-trigger" type="button" aria-haspopup="true" aria-expanded="false">' +
                  '<span class="profile-avatar">' + ICON.user + '</span>' +
                '</button>' +
                '<div class="profile-dropdown" id="profile-dropdown" role="menu">' +
                  '<div class="dropdown-header"><strong>Welcome</strong><span>Access your Aether account</span></div>' +
                  '<a href="' + PAGES.login + '" class="dropdown-item" role="menuitem">' + ICON.login + ' Login</a>' +
                  '<a href="' + PAGES.signup + '" class="dropdown-item" role="menuitem">' + ICON.signup + ' Sign Up</a>' +
                  '<div class="dropdown-divider"></div>' +
                  '<a href="' + PAGES.admin + '" class="dropdown-item" role="menuitem">' + ICON.admin + ' Admin Dashboard</a>' +
                  '<a href="' + PAGES.user + '" class="dropdown-item" role="menuitem">' + ICON.dashboard + ' User Dashboard</a>' +
                '</div>' +
              '</div>' +
              '<button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open mobile navigation menu">' +
                '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
              '</button>' +
            '</div>' +
             '<a href="' + PAGES.contact + '" class="btn btn-primary btn-sm nav-cta">Book a Consultation</a>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="mobile-nav-drawer" id="mobile-drawer">' +
        '<button class="mobile-drawer-close" id="mobile-drawer-close" aria-label="Close navigation menu">' +
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
        '<div class="mobile-drawer-links">' +
          NAV_LINKS.map(function (l) { return '<a href="' + l.href + '" class="mobile-drawer-link">' + l.label + '</a>'; }).join('') +
          '<a href="' + PAGES.home2 + '" class="mobile-drawer-link">Home 2</a>' +
          '<a href="' + PAGES.faq + '" class="mobile-drawer-link">FAQ</a>' +
          '<a href="' + PAGES.login + '" class="mobile-drawer-link">Login</a>' +
        '</div>' +
        '<div style="margin-top:auto;padding-top:2rem;">' +
          '<a href="' + PAGES.contact + '" class="btn btn-primary" style="width:100%;">Book a Consultation</a>' +
        '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------
     Build footer
  ------------------------------------------------------------------ */
  function buildFooter() {
    return '' +
      '<footer class="site-footer" id="site-footer">' +
        '<div class="container-wide">' +
          '<div class="footer-top-grid">' +
            '<div class="footer-brand">' +
              '<a href="' + PAGES.home + '" class="brand-logo" aria-label="Aether Cinematics">' +
                '<div class="brand-icon"><img src="' + BASE + 'assets/images/logo.png" alt="aether-logo" style="height:100%;width:100%;object-fit:contain;"></div>' +
                '<span class="brand-text">AETHER</span>' +
              '</a>' +
              '<p>Architectural audiovisual engineering and bespoke private cinema installations. Merging acoustic precision, high-fidelity hardware, and cinema-quality immersion for the world\u2019s finest residences.</p>' +
              '<div class="footer-social-links" style="margin-top:1.5rem;">' +
                '<a href="#" class="social-icon-btn" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>' +
                '<a href="#" class="social-icon-btn" aria-label="Vimeo"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 7.42c-.1 1.9-1.4 4.5-3.9 7.8C15.6 18.6 13.3 20.3 11.6 20.3c-1 0-1.9-.9-2.6-2.8-.5-1.7-.9-3.4-1.4-5.1-.5-1.9-1-2.9-1.6-2.9-.1 0-.6.3-1.4.8L4 9.3c1-.8 1.9-1.6 2.8-2.5 1.3-1.1 2.2-1.7 2.8-1.7 1.3-.1 2.1.8 2.4 2.6.4 2.1.7 3.5.8 4 .4 1.6 1 2.4 1.6 2.4.5 0 1.1-.7 1.9-2.1.8-1.4 1.3-2.5 1.3-3.3 0-1-.5-1.5-1.4-1.5-.5 0-1 .1-1.5.3.8-2.6 2.4-3.9 4.6-3.8 1.6.1 2.3 1.1 2.2 3.1z"/></svg></a>' +
                '<a href="#" class="social-icon-btn" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>' +
              '</div>' +
            '</div>' +
            '<div>' +
              '<h4 class="footer-col-title">Services</h4>' +
              '<ul class="footer-links-list">' +
                '<li><a href="' + PAGES.serviceDetails + '?id=custom-home-theatre" class="footer-link">Custom Home Theatre</a></li>' +
                '<li><a href="' + PAGES.serviceDetails + '?id=surround-sound" class="footer-link">Surround Sound</a></li>' +
                '<li><a href="' + PAGES.serviceDetails + '?id=projector-screen" class="footer-link">Projector & Screen</a></li>' +
                '<li><a href="' + PAGES.serviceDetails + '?id=whole-home-audio" class="footer-link">Whole-Home Audio</a></li>' +
                '<li><a href="' + PAGES.serviceDetails + '?id=acoustic-treatments" class="footer-link">Acoustic Tuning</a></li>' +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h4 class="footer-col-title">Company</h4>' +
              '<ul class="footer-links-list">' +
                '<li><a href="' + PAGES.home + '" class="footer-link">Visit Home</a></li>' +
                '<li><a href="' + PAGES.about + '" class="footer-link">About Us</a></li>' +
                '<li><a href="' + PAGES.home2 + '" class="footer-link">Immersive Living</a></li>' +
                '<li><a href="' + PAGES.services + '" class="footer-link">All Services</a></li>' +
                '<li><a href="' + PAGES.blog + '" class="footer-link">Blog & Insights</a></li>' +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h4 class="footer-col-title">Support</h4>' +
              '<ul class="footer-links-list">' +
                '<li><a href="' + PAGES.contact + '" class="footer-link">Contact Us</a></li>' +
                '<li><a href="' + PAGES.faq + '" class="footer-link">FAQ</a></li>' +
                '<li><a href="' + PAGES.pricing + '" class="footer-link">Pricing Plans</a></li>' +
                '<li><a href="' + PAGES.login + '" class="footer-link">Client Login</a></li>' +
                '<li><a href="' + PAGES.signup + '" class="footer-link">Create Account</a></li>' +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h4 class="footer-col-title">Visit Us</h4>' +
              '<ul class="footer-contact-list" style="display:flex;flex-direction:column;gap:0.85rem;list-style:none;padding:0;margin:0;">' +
                '<li style="display:flex;align-items:flex-start;gap:0.65rem;font-size:0.8125rem;color:var(--text-secondary);line-height:1.5;">' +
                  '<span style="color:var(--purple-bright);flex-shrink:0;margin-top:0.15rem;" aria-hidden="true">' +
                    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
                  '</span>' +
                  '<span>Aether Cinematics, 123 Design District, <br>New York, NY 10013</span>' +
                '</li>' +
                '<li style="display:flex;align-items:center;gap:0.65rem;font-size:0.8125rem;">' +
                  '<span style="color:var(--purple-bright);flex-shrink:0;" aria-hidden="true">' +
                    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
                  '</span>' +
                  '<a href="tel:+12125550188" class="footer-link">+1 (212) 555-0188</a>' +
                '</li>' +
                '<li style="display:flex;align-items:center;gap:0.65rem;font-size:0.8125rem;">' +
                  '<span style="color:var(--purple-bright);flex-shrink:0;" aria-hidden="true">' +
                    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
                  '</span>' +
                  '<a href="mailto:support@aether.com" class="footer-link">support@aether.com</a>' +
                '</li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<p class="footer-copyright">&copy; 2026 AETHER CINEMATICS LLC. All rights reserved.</p>' +
            '<div class="footer-legal-links">' +
              '<a href="' + BASE + 'public/pages/Privacy-policy.html" class="footer-legal-link">Privacy Policy</a>' +
              '<a href="' + BASE + 'public/pages/Terms-of-service.html" class="footer-legal-link">Terms of Service</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  /* ------------------------------------------------------------------
     Wire interactions
  ------------------------------------------------------------------ */
  function wire() {
    var nav = document.querySelector('.site-nav');

    // Sticky nav
    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 30) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      };
      window.addEventListener('scroll', onScroll);
      onScroll();
    }

    // Mobile drawer
    var mToggle = document.getElementById('mobile-menu-btn');
    var mDrawer = document.getElementById('mobile-drawer');
    var mClose = document.getElementById('mobile-drawer-close');
    if (mToggle && mDrawer) {
      mToggle.addEventListener('click', function () {
        mDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
    if (mClose && mDrawer) {
      mClose.addEventListener('click', function () {
        mDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    document.querySelectorAll('.mobile-drawer-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (mDrawer) mDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Profile dropdown
    var menu = document.getElementById('profile-menu');
    var trigger = document.getElementById('profile-trigger');
    if (menu && trigger) {
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = menu.classList.toggle('open');
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.addEventListener('click', function (e) {
        if (!menu.contains(e.target)) {
          menu.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          menu.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Theme toggle buttons
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'light' ? 'dark' : 'light');
      });
    });

    // RTL toggle buttons
    document.querySelectorAll('[data-rtl-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        applyRTL(!isRTL);
      });
    });

    // Footer newsletter (client side validation + acknowledgement)
    var nlForm = document.getElementById('footer-newsletter-form');
    if (nlForm) {
      nlForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = nlForm.querySelector('input[type="email"]');
        var success = document.getElementById('footer-newsletter-success');
        var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((input.value || '').trim());
        if (!valid) {
          input.style.borderColor = '#EF4444';
          input.focus();
          return;
        }
        input.style.borderColor = '';
        if (success) success.style.display = 'flex';
        nlForm.reset();
        setTimeout(function () { if (success) success.style.display = 'none'; }, 6000);
      });
    }
  }

  /* ------------------------------------------------------------------
     Inject & boot
  ------------------------------------------------------------------ */
  function inject() {
    var headerMount = document.getElementById('site-header');
    if (headerMount) headerMount.innerHTML = buildHeader();
    else document.body.insertAdjacentHTML('afterbegin', buildHeader());

    var footerMount = document.getElementById('site-footer');
    if (footerMount) footerMount.innerHTML = buildFooter();
    else document.body.insertAdjacentHTML('beforeend', buildFooter());
  }

  initTheme();
  initRTL();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { inject(); wire(); });
  } else {
    inject();
    wire();
  }

  // Re-sync icon state after injection as well
  document.addEventListener('DOMContentLoaded', function () {
    var t = document.documentElement.getAttribute('data-theme');
    var d = document.documentElement.getAttribute('dir');
    if (t) applyTheme(t);
    if (d) applyRTL(d === 'rtl');
  });
})();
