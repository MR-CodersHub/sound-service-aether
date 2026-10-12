/**
 * AETHER CINEMATICS - FORM VALIDATION & ACKNOWLEDGEMENTS
 * Client-side validation for contact, newsletter, login and signup forms.
 * Shows success / acknowledgement messages after submission. Vanilla JS.
 */

(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_RE = /^[\d\s+\-()]{7,20}$/;

  function getErrorBox(input) {
    var group = input.closest('.form-group');
    if (group) return group;
    return input.closest('.auth-field') || input.parentElement;
  }

  function markError(input, show) {
    var box = getErrorBox(input);
    if (!box) return;
    box.classList.toggle('has-error', !!show);
    input.setAttribute('aria-invalid', show ? 'true' : 'false');
  }

  function validateField(input) {
    var value = (input.value || '').trim();
    var type = (input.getAttribute('type') || 'text').toLowerCase();
    var valid = true;

    if (input.hasAttribute('required')) {
      if (type === 'checkbox') {
        valid = input.checked;
      } else {
        valid = value.length > 0;
      }
    }

    if (valid && value.length > 0) {
      if (type === 'email') valid = EMAIL_RE.test(value);
      else if (type === 'tel') valid = PHONE_RE.test(value);
      else if (input.dataset.minlength) valid = value.length >= parseInt(input.dataset.minlength, 10);
      else if (input.dataset.min) valid = value.length >= parseInt(input.dataset.min, 10);
    }

    // Confirm-password style matching
    if (valid && input.dataset.match) {
      var target = document.getElementById(input.dataset.match);
      if (target && value !== target.value) valid = false;
    }

    markError(input, !valid);
    return valid;
  }

  function validateForm(form) {
    var fields = form.querySelectorAll('input, select, textarea');
    var valid = true;
    var firstInvalid = null;

    fields.forEach(function (input) {
      if (input.type === 'hidden' || input.disabled || input.dataset.optional !== undefined) {
        // still validate value types below for optional fields with content
      }
      var ok = validateField(input);
      if (!ok) {
        valid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });

    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  function showSuccess(form) {
    var id = form.getAttribute('data-success');
    var block = id ? document.getElementById(id) : (form.parentElement ? form.parentElement.querySelector('.form-success-block') : null);
    if (block) {
      block.classList.add('visible');
      block.style.display = 'block';
      form.style.display = 'none';
      block.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      var alert = form.querySelector('.inline-alert.success');
      if (alert) alert.style.display = 'flex';
    }

    // Update dynamic acknowledgement values
    var nameField = form.querySelector('[name="name"], [name="fullName"]');
    var nameSlots = document.querySelectorAll('[' + (id || 'x') + '-name]');
    if (nameField && nameSlots.length) {
      nameSlots.forEach(function (s) { s.textContent = nameField.value.trim(); });
    }

    var original = form.querySelector('button[type="submit"]');
    if (original) {
      var prev = original.innerHTML;
      original.innerHTML = 'Submitted \u2713';
      original.disabled = true;
      setTimeout(function () {
        original.innerHTML = prev;
        original.disabled = false;
      }, 2600);
    }

    // Auto-redirect if data-redirect is configured
    var redirectUrl = form.getAttribute('data-redirect');
    if (redirectUrl) {
      setTimeout(function () {
        window.location.href = redirectUrl;
      }, 1200);
    }
  }

  function resetHandlers(form) {
    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('blur', function () {
        if ((input.value || '').length > 0 || input.hasAttribute('required')) validateField(input);
      });
      input.addEventListener('input', function () {
        if (getErrorBox(input) && getErrorBox(input).classList.contains('has-error')) validateField(input);
      });
    });
  }

  function initForm(form) {
    resetHandlers(form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;
      showSuccess(form);

      if (form.getAttribute('data-reset') !== 'false') {
        var values = {};
        form.querySelectorAll('[data-keep]').forEach(function (el) { values[el.id] = el.value; });
        form.reset();
        form.querySelectorAll('[data-keep]').forEach(function (el) { el.value = values[el.id] || ''; });
      }
    });
  }

  function initAll() {
    document.querySelectorAll('form.js-validate').forEach(initForm);

    // Success blocks can be dismissed / re-opened
    document.querySelectorAll('[data-reset-form]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var form = document.getElementById(btn.getAttribute('data-reset-form'));
        var block = btn.closest('.form-success-block');
        if (block) block.style.display = 'none';
        if (form) form.style.display = '';
      });
    });

    // Password visibility eye toggle
    initPasswordToggles();
  }

  function initPasswordToggles() {
    document.querySelectorAll('.password-toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = btn.getAttribute('data-target');
        var input = targetId ? document.getElementById(targetId) : (btn.closest('.password-field-wrap') ? btn.closest('.password-field-wrap').querySelector('input') : null);
        if (!input) return;

        var isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');

        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        btn.classList.toggle('is-visible', isPassword);

        var showIcon = btn.querySelector('.eye-show');
        var hideIcon = btn.querySelector('.eye-hide');
        if (showIcon && hideIcon) {
          showIcon.style.display = isPassword ? 'none' : 'block';
          hideIcon.style.display = isPassword ? 'block' : 'none';
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
