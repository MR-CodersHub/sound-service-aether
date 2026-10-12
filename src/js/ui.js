/**
 * AETHER CINEMATICS - SHARED UI HELPERS
 * Accordions, animated counters, countdown, and simple tab panels.
 * Vanilla JS only. Safe to include on every page.
 */

(function () {
  'use strict';

  /* ------------------------------- Accordions ------------------------------- */
  function initAccordions(scope) {
    var root = scope || document;
    root.querySelectorAll('.accordion-item').forEach(function (item) {
      if (item.dataset.bound === '1') return;
      item.dataset.bound = '1';

      var header = item.querySelector('.accordion-header');
      var body = item.querySelector('.accordion-body');
      if (!header || !body) return;

      if (item.classList.contains('open')) {
        body.style.maxHeight = body.scrollHeight + 'px';
      }

      header.addEventListener('click', function () {
        var group = item.parentElement;
        var single = group && group.dataset.single !== undefined;
        var isOpen = item.classList.contains('open');

        if (single) {
          group.querySelectorAll('.accordion-item.open').forEach(function (other) {
            if (other !== item) {
              other.classList.remove('open');
              var ob = other.querySelector('.accordion-body');
              if (ob) ob.style.maxHeight = '0px';
            }
          });
        }

        if (isOpen) {
          item.classList.remove('open');
          body.style.maxHeight = '0px';
        } else {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }

  /* ------------------------------- Counters -------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var animate = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = (el.getAttribute('data-decimals') | 0) || 0;
      var duration = 1600;
      var start = null;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = (target * eased).toFixed(decimals);
        el.textContent = Number(value).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.target.dataset.done !== '1') {
          entry.target.dataset.done = '1';
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  /* ------------------------------- Countdown ------------------------------- */
  function initCountdown() {
    var el = document.getElementById('countdown');
    if (!el) return;
    var target = new Date(el.getAttribute('data-target')).getTime();

    function tick() {
      var now = Date.now();
      var diff = Math.max(0, target - now);
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      var set = function (id, v) { var n = document.getElementById(id); if (n) n.textContent = String(v).padStart(2, '0'); };
      set('cd-days', d); set('cd-hours', h); set('cd-mins', m); set('cd-secs', s);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* --------------------------------- Tabs ---------------------------------- */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (wrap) {
      var buttons = wrap.querySelectorAll('[data-tab]');
      var panels = wrap.querySelectorAll('[data-tab-panel]');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var key = btn.getAttribute('data-tab');
          buttons.forEach(function (b) { b.classList.toggle('active', b === btn); });
          panels.forEach(function (p) { p.style.display = p.getAttribute('data-tab-panel') === key ? '' : 'none'; });
        });
      });
    });
  }

  function initAll() {
    initAccordions();
    initCounters();
    initCountdown();
    initTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.AetherUI = {
    initAccordions: initAccordions,
    initCounters: initCounters,
    initCountdown: initCountdown,
    initTabs: initTabs,
    initAll: initAll
  };
})();
