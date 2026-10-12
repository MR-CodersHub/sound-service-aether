/**
 * AETHER CINEMATICS - DASHBOARD CONTROLLER
 * Powers both the admin and user dashboards: sidebar panel switching,
 * dynamic tables, chart bars, progress bars and client-side table search.
 * Vanilla JS only.
 */

(function () {
  'use strict';

  var ICONS = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>'
  };

  /* ------------------------------- Sample data ----------------------------- */

  var USER_PROJECTS = [
    { name: 'Private Cinema \u2013 Bel Air Estate', type: 'Custom Home Theatre', status: 'progress', progress: 68, engineer: 'Marcus Bell', date: 'Apr 18, 2026' },
    { name: 'Living Room Atmos Retrofit', type: 'Surround Sound', status: 'pending', progress: 15, engineer: 'Elena Novak', date: 'May 02, 2026' },
    { name: 'Whole-Home Audio \u2013 8 Zones', type: 'Whole-Home Audio', status: 'progress', progress: 42, engineer: 'Priya Raman', date: 'May 20, 2026' },
    { name: 'Guest Suite Projection', type: 'Projector & Screen', status: 'complete', progress: 100, engineer: 'Julian Marsh', date: 'Feb 09, 2026' },
    { name: 'Home Office Acoustic Tuning', type: 'Acoustic Tuning', status: 'complete', progress: 100, engineer: 'Elena Novak', date: 'Jan 22, 2026' }
  ];

  var USER_TICKETS = [
    { id: '#TCK-4821', subject: 'Adjust cinema scene lighting', status: 'pending', date: '2 days ago' },
    { id: '#TCK-4790', subject: 'Subwoofer calibration question', status: 'complete', date: '1 week ago' },
    { id: '#TCK-4755', subject: 'Add streaming service to rack', status: 'complete', date: '3 weeks ago' }
  ];

  var USER_ASSETS = [
    { name: 'Reference 4K Laser Projector', detail: 'Registered \u00b7 Warranty to Mar 2029' },
    { name: '9.4.6 Atmos Processor', detail: 'Registered \u00b7 Warranty to Mar 2028' },
    { name: 'Motorised ALR Screen 200"', detail: 'Registered \u00b7 Warranty to Mar 2028' },
    { name: 'Multi-Zone Audio Controller', detail: 'Registered \u00b7 Warranty to May 2027' }
  ];

  var USER_APPOINTMENTS = [
    { title: 'Acoustic Calibration Visit', when: 'Apr 12, 2026 \u00b7 10:00 AM', note: 'Engineer: Marcus Bell \u00b7 On-site tuning' },
    { title: 'Projector Firmware Update', when: 'Apr 26, 2026 \u00b7 2:30 PM', note: 'Remote session \u00b7 45 minutes' },
    { title: 'Final Sign-off & Demo', when: 'May 06, 2026 \u00b7 6:00 PM', note: 'Cinema demonstration with client' }
  ];

  var USER_INVOICES = [
    { id: '#INV-2041', amount: '$12,400.00', status: 'complete', date: 'Mar 30, 2026' },
    { id: '#INV-2018', amount: '$8,150.00', status: 'complete', date: 'Mar 02, 2026' },
    { id: '#INV-1994', amount: '$4,900.00', status: 'pending', date: 'Due Apr 20, 2026' }
  ];

  var ADMIN_ORDERS = [
    { client: 'Montgomery Estate', service: 'Custom Home Theatre', amount: '$142,000', status: 'progress', engineer: 'Marcus Bell' },
    { client: 'Vance Penthouse', service: 'Whole-Home Audio', amount: '$38,500', status: 'progress', engineer: 'Priya Raman' },
    { client: 'Al-Rashid Residence', service: 'Surround Sound', amount: '$22,300', status: 'pending', engineer: 'Elena Novak' },
    { client: 'Cotswold Manor', service: 'Projector & Screen', amount: '$19,800', status: 'complete', engineer: 'Julian Marsh' },
    { client: 'Marina Sky Villa', service: 'Acoustic Tuning', amount: '$14,200', status: 'complete', engineer: 'Elena Novak' },
    { client: 'Hillside Retreat', service: 'Smart Control', amount: '$27,600', status: 'cancelled', engineer: 'Priya Raman' }
  ];

  var ADMIN_LEADS = [
    { name: 'Griffith Estate', source: 'Referral', value: '$85k', stage: 'Negotiation' },
    { name: 'Nakamura Residence', source: 'Website', value: '$34k', stage: 'Design' },
    { name: 'Beaumont Loft', source: 'Instagram', value: '$21k', stage: 'Qualified' },
    { name: 'Sable House', source: 'Exhibition', value: '$120k', stage: 'Proposal' }
  ];

  var ADMIN_TEAM = [
    { name: 'Marcus Bell', role: 'Lead Acoustic Architect', projects: 6, billable: 92 },
    { name: 'Elena Novak', role: 'Acoustics Engineer', projects: 5, billable: 88 },
    { name: 'Priya Raman', role: 'Automation Specialist', projects: 7, billable: 95 },
    { name: 'Julian Marsh', role: 'Projection Lead', projects: 4, billable: 81 }
  ];

  var ADMIN_ACTIVITY = [
    { title: 'New consultation booked', when: '12 minutes ago', note: 'Griffith Estate \u00b7 Dedicated cinema, Beverly Hills' },
    { title: 'Invoice #INV-2041 paid', when: '1 hour ago', note: '$12,400.00 received from Montgomery Estate' },
    { title: 'Project milestone reached', when: '3 hours ago', note: 'Vance Penthouse \u2013 acoustic shell completed' },
    { title: 'New lead captured', when: 'Yesterday', note: 'Nakamura Residence via website form' }
  ];

  var REVENUE = [42, 58, 49, 67, 74, 61, 82, 76, 90, 84, 96, 88];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /* ------------------------------- Renderers -------------------------------- */

  function statusLabel(status) {
    var map = { complete: 'Complete', progress: 'In Progress', pending: 'Pending', cancelled: 'Cancelled' };
    return '<span class="status-pill status-' + status + '">' + (map[status] || status) + '</span>';
  }

  function renderUser() {
    var projects = document.getElementById('user-projects');
    if (projects) {
      projects.innerHTML = USER_PROJECTS.map(function (p) {
        return '<tr>' +
          '<td><strong style="color:var(--text-primary);">' + p.name + '</strong><br><span style="font-size:0.78rem;color:var(--text-muted);">' + p.type + '</span></td>' +
          '<td>' + statusLabel(p.status) + '</td>' +
          '<td style="min-width:150px;"><div class="progress-track"><div class="progress-fill" data-width="' + p.progress + '%" style="width:0;"></div></div><span style="font-size:0.72rem;color:var(--text-muted);">' + p.progress + '%</span></td>' +
          '<td>' + p.engineer + '</td>' +
          '<td>' + p.date + '</td>' +
        '</tr>';
      }).join('');
    }

    var tickets = document.getElementById('user-tickets');
    if (tickets) {
      tickets.innerHTML = USER_TICKETS.map(function (t) {
        return '<tr><td>' + t.id + '</td><td>' + t.subject + '</td><td>' + statusLabel(t.status) + '</td><td>' + t.date + '</td></tr>';
      }).join('');
    }

    var assets = document.getElementById('user-assets');
    if (assets) {
      assets.innerHTML = USER_ASSETS.map(function (a) {
        return '<div class="asset-item"><div><strong>' + a.name + '</strong><span>' + a.detail + '</span></div>' +
          '<span class="tag-pill">Active</span></div>';
      }).join('');
    }

    var appts = document.getElementById('user-appointments');
    if (appts) {
      appts.innerHTML = USER_APPOINTMENTS.map(function (a) {
        return '<div class="timeline-item"><span>' + a.when + '</span><h4>' + a.title + '</h4><p>' + a.note + '</p></div>';
      }).join('');
    }

    var invoices = document.getElementById('user-invoices');
    if (invoices) {
      invoices.innerHTML = USER_INVOICES.map(function (i) {
        return '<tr><td>' + i.id + '</td><td>' + i.amount + '</td><td>' + statusLabel(i.status) + '</td><td>' + i.date + '</td></tr>';
      }).join('');
    }
  }

  function renderAdmin() {
    var orders = document.getElementById('admin-orders');
    if (orders) {
      orders.innerHTML = ADMIN_ORDERS.map(function (o) {
        return '<tr>' +
          '<td><strong style="color:var(--text-primary);">' + o.client + '</strong></td>' +
          '<td>' + o.service + '</td>' +
          '<td><strong style="color:var(--text-primary);">' + o.amount + '</strong></td>' +
          '<td>' + statusLabel(o.status) + '</td>' +
          '<td>' + o.engineer + '</td>' +
        '</tr>';
      }).join('');
    }

    var leads = document.getElementById('admin-leads');
    if (leads) {
      leads.innerHTML = ADMIN_LEADS.map(function (l) {
        return '<tr><td>' + l.name + '</td><td><span class="tag-pill">' + l.source + '</span></td><td>' + l.value + '</td><td>' + l.stage + '</td></tr>';
      }).join('');
    }

    var team = document.getElementById('admin-team');
    if (team) {
      team.innerHTML = ADMIN_TEAM.map(function (m) {
        return '<div class="asset-item"><div><strong>' + m.name + '</strong><span>' + m.role + ' \u00b7 ' + m.projects + ' projects</span></div>' +
          '<div style="min-width:120px;"><div class="progress-track"><div class="progress-fill" data-width="' + m.billable + '%" style="width:0;"></div></div><span style="font-size:0.72rem;color:var(--text-muted);">' + m.billable + '% billable</span></div></div>';
      }).join('');
    }

    var activity = document.getElementById('admin-activity');
    if (activity) {
      activity.innerHTML = ADMIN_ACTIVITY.map(function (a) {
        return '<div class="timeline-item"><span>' + a.when + '</span><h4>' + a.title + '</h4><p>' + a.note + '</p></div>';
      }).join('');
    }

    var chart = document.getElementById('revenue-chart');
    if (chart) {
      var max = Math.max.apply(null, REVENUE);
      chart.innerHTML = REVENUE.map(function (v, i) {
        var pct = Math.round((v / max) * 100);
        return '<div class="chart-bar"><div class="bar" data-h="' + pct + '%" style="height:0;"></div><span class="lbl">' + MONTHS[i] + '</span></div>';
      }).join('');
    }
  }

  /* --------------------------- Progress / chart anim ------------------------ */
  function animateBars() {
    setTimeout(function () {
      document.querySelectorAll('.progress-fill[data-width]').forEach(function (el) {
        el.style.transition = 'width 1s cubic-bezier(0.16,1,0.3,1)';
        el.style.width = el.getAttribute('data-width');
      });
      document.querySelectorAll('.chart-bar .bar[data-h]').forEach(function (el) {
        el.style.height = el.getAttribute('data-h');
      });
    }, 150);
  }

  /* ------------------------------- Sidebar --------------------------------- */
  function initSidebar() {
    var links = document.querySelectorAll('.dash-nav-link[data-panel]');
    if (!links.length) return;

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        var key = link.getAttribute('data-panel');
        links.forEach(function (l) { l.classList.toggle('active', l === link); });
        document.querySelectorAll('.dash-panel').forEach(function (panel) {
          panel.style.display = panel.getAttribute('data-panel-id') === key ? '' : 'none';
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* --------------------------- Table search -------------------------------- */
  function initTableSearch() {
    document.querySelectorAll('[data-table-search]').forEach(function (input) {
      var tableId = input.getAttribute('data-table-search');
      var table = document.getElementById(tableId);
      if (!table) return;
      input.addEventListener('input', function () {
        var q = input.value.toLowerCase().trim();
        var rows = table.querySelectorAll('tbody tr');
        var visible = 0;
        rows.forEach(function (row) {
          var match = row.textContent.toLowerCase().indexOf(q) !== -1;
          row.style.display = match ? '' : 'none';
          if (match) visible++;
        });
        var empty = table.parentElement.querySelector('.table-empty');
        if (empty) empty.style.display = visible ? 'none' : 'block';
      });
    });
  }

  function boot() {
    var mode = document.body.getAttribute('data-dash');
    if (mode === 'user') renderUser();
    else if (mode === 'admin') renderAdmin();
    else return;

    initSidebar();
    initTableSearch();
    animateBars();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
