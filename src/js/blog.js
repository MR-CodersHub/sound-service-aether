/**
 * AETHER CINEMATICS - BLOG ENGINE
 * Client-side search + category filtering for the blog list, and dynamic
 * article rendering on blog-details.html based on the ?id= query parameter.
 * Vanilla JS only.
 */

(function () {
  'use strict';

  var IMG = 'assets/images/';

  // Prefix must resolve for pages inside /public/pages -> "../../assets/images/"
  function assetBase() {
    var path = window.location.pathname.replace(/\\/g, '/');
    var idx = path.indexOf('/public/');
    if (idx !== -1) {
      var after = path.slice(idx + 1);
      var depth = after.split('/').length - 1;
      var prefix = '';
      for (var i = 0; i < depth; i++) {
        prefix += '../';
      }
      return prefix + 'assets/images/';
    }
    if (path.indexOf('/pages/') !== -1) {
      return '../../assets/images/';
    }
    return '../../assets/images/';
  }

  var A = assetBase();

  var POSTS = [
    {
      id: 'setup-guide',
      title: 'The Complete Guide to Planning a Dedicated Home Cinema Room',
      category: 'Home Cinema',
      image: 'hero-cinema.jpg',
      author: 'Julian Marsh',
      date: 'March 12, 2026',
      read: '9 min read',
      excerpt: 'From room selection and seating geometry to acoustic treatment and projection throw distance, here is the master checklist we use before a single panel is fitted.',
      tags: ['Planning', 'Room Design', 'Dolby Atmos'],
      body: [
        ['h2', 'Start with the room, not the gear'],
        ['p', 'A great private cinema begins long before the projector is chosen. Room proportions, seating distance, and the ability to control ambient light define how immersive the finished space will feel. We measure ceiling height, wall construction, and even the floor cavity to understand how sound will behave.'],
        ['p', 'The ideal room is a rectangle with a length roughly 1.6 to 1.9 times its width. This ratio naturally reduces standing waves that cause boomy or hollow bass responses. If your room falls outside this range, acoustic treatment becomes even more important.'],
        ['h2', 'Establish the viewing geometry'],
        ['p', 'The first row should sit at a distance of 1.2 to 1.5 times the screen width for a cinematic field of view that comfortably fills your peripheral vision without forcing eye movement. Elevate secondary rows by 250 to 300 millimetres for an unobstructed sightline.'],
        ['blockquote', 'A cinema is measured in sightlines and silence, not in the number of boxes on a rack.'],
        ['h2', 'Plan for acoustic isolation'],
        ['p', 'If the room shares a wall with living spaces, decoupled construction is essential. Resilient channels, double drywall with damping compound, and a floating subfloor dramatically reduce the low-frequency energy that travels through structure.'],
        ['ul', ['Measure and mark all speaker positions before drywall.', 'Run conduit for future upgrades even if unused today.', 'Dedicate a dedicated 20-amp circuit for the equipment rack.', 'Plan ventilation that does not introduce fan noise into the room.']],
        ['h2', 'Budget in the right order'],
        ['p', 'We recommend allocating roughly 30% to acoustic treatment and room construction, 40% to audio and video components, and the remainder to seating, lighting, and automation. Investing in the room first pays exponential dividends in perceived performance.'],
        ['p', 'When these fundamentals are right, even a mid-tier processor can deliver an experience that feels genuinely cinematic. When they are wrong, no amount of exotic hardware can rescue the result.']
      ]
    },
    {
      id: 'best-keyboards',
      title: 'Choosing Reference Loudspeakers: What Actually Matters',
      category: 'Acoustics',
      image: 'project-acoustic.jpg',
      author: 'Elena Novak',
      date: 'March 4, 2026',
      read: '7 min read',
      excerpt: 'Sensitivity, dispersion, and distortion figures explained in plain language, so you can compare loudspeakers by performance rather than marketing.',
      tags: ['Speakers', 'HiFi', 'Reference'],
      body: [
        ['h2', 'Beyond the specification sheet'],
        ['p', 'Loudspeaker specifications describe measurable behaviour, but they rarely tell the full story of how a speaker will perform in your room. Understanding a handful of key parameters helps you shortlist intelligently.'],
        ['h2', 'Dispersion consistency is king'],
        ['p', 'The most important quality in a home theatre speaker is even off-axis response. If a speaker sounds different when you move half a metre to the side, the surround field collapses. Look for controlled directivity and a waveguide or horn that matches the tweeter to the midrange.'],
        ['h2', 'Sensitivity vs. amplification'],
        ['p', 'A speaker rated at 90 dB sensitivity needs roughly half the power of an 87 dB design to reach the same output. High sensitivity is not automatically better, but it gives more headroom with modest amplification.'],
        ['blockquote', 'Match the amplifier to the load, and match the speaker to the room. Everything else is preference.'],
        ['h2', 'Listen with familiar material'],
        ['p', 'Bring recordings you know intimately. A reference track with dense orchestration exposes tonal balance, while a spoken-word clip reveals midrange clarity and sibilance. Let the room and the speaker settle before drawing conclusions.'],
        ['ul', ['Check dialogue intelligibility at low volume.', 'Listen for cabinet resonance on dynamic peaks.', 'Confirm the centre channel matches the mains timbrally.']]
      ]
    },
    {
      id: 'dolby-atmos-explained',
      title: 'Dolby Atmos Explained: Heights, Objects, and Real Rooms',
      category: 'Technology',
      image: 'service_surround_sound_1791737352684.jpg',
      author: 'Priya Raman',
      date: 'February 24, 2026',
      read: '6 min read',
      excerpt: 'Object-based audio finally makes sense when you understand the renderer. Here is how height channels transform an ordinary room into a three-dimensional soundstage.',
      tags: ['Dolby Atmos', 'Surround', 'Immersive'],
      body: [
        ['h2', 'From channels to objects'],
        ['p', 'Traditional surround assigns audio to fixed channels. Object-based formats carry positional metadata instead, and the processor places each sound in three-dimensional space in real time based on your exact speaker layout.'],
        ['h2', 'The role of height channels'],
        ['p', 'Heights are what separate a good theatre from a great one. Overhead effects, rain, and flyovers no longer smear across the room. They pass directly above the listener, anchoring the experience.'],
        ['h2', 'Four heights or six?'],
        ['p', 'A 7.1.4 layout covers the majority of residential rooms beautifully. Adding two more heights benefits long rooms with multiple rows, but only when the seating area is large enough to justify the extra positions.'],
        ['blockquote', 'The renderer rewards good placement far more than sheer channel count.'],
        ['h2', 'Calibration completes the illusion'],
        ['p', 'After installation, automated room correction plus manual verification ensure that objects transition smoothly between speakers. A well-calibrated 5.1.4 system will out-perform a poorly placed 9.2.6 every time.'],
        ['ul', ['Aim heights toward the primary listening position.', 'Keep channels equidistant where architecture allows.', 'Re-run calibration after any furniture change.']]
      ]
    },
    {
      id: 'projector-buying-guide',
      title: 'Projector or Large-Format Display? A Practical Decision Guide',
      category: 'Buying Guide',
      image: 'service_projector_screen_1791737380066.jpg',
      author: 'Marcus Bell',
      date: 'February 15, 2026',
      read: '8 min read',
      excerpt: 'Screen size, ambient light, and black level behaviour determine which technology wins in your specific room. We break down the trade-offs honestly.',
      tags: ['Projectors', 'Displays', 'Buying Guide'],
      body: [
        ['h2', 'The case for projection'],
        ['p', 'Nothing beats a projector for pure scale. A 120-inch image at a fraction of the cost of an equivalent display delivers the cinematic presence that defines a dedicated theatre.'],
        ['h2', 'The case for large-format displays'],
        ['p', 'Modern emissive displays offer absolute black levels and are far more forgiving in rooms with uncontrolled light. For bright, multi-purpose living spaces, they are often the smarter choice.'],
        ['h2', 'Measure your ambient light first'],
        ['p', 'Before choosing, observe how much daylight reaches the screen during the hours you will actually watch. Ambient light rejecting screens help, but they cannot defeat a wall of glass without proper shades.'],
        ['blockquote', 'Choose the technology that suits the room you have, not the room you wish you had.'],
        ['ul', ['Dedicated dark room: projection wins on scale.', 'Bright multi-use room: display wins on contrast.', 'Hybrid room: ALR screen plus laser projector.']]
      ]
    },
    {
      id: 'acoustic-panels-101',
      title: 'Acoustic Panels 101: Absorption, Diffusion, and Placement',
      category: 'Acoustics',
      image: 'project_acoustic_room_1791737468678.jpg',
      author: 'Elena Novak',
      date: 'February 6, 2026',
      read: '7 min read',
      excerpt: 'Not all treatment is equal. Learn when to absorb, when to diffuse, and why covering every wall is a mistake that deadens a room.',
      tags: ['Acoustics', 'Treatment', 'Room Tuning'],
      body: [
        ['h2', 'Absorption vs. diffusion'],
        ['p', 'Absorption removes energy at first reflection points, tightening imaging and reducing harshness. Diffusion scatters energy in time and space, preserving liveliness while eliminating problematic echoes.'],
        ['h2', 'Treat the first reflection points'],
        ['p', 'The side walls between your speakers and your ears are the priority. A 50 to 75 millimetre absorber panel positioned by mirror trick tames the strongest early reflection and sharpens the centre image.'],
        ['h2', 'Do not over-absorb'],
        ['p', 'A room covered in foam feels lifeless and unnatural. Use absorption strategically and rely on diffusion on the rear wall to keep the space engaging.'],
        ['blockquote', 'The goal is a room that disappears, not a room that swallows sound.'],
        ['ul', ['Absorb front and side reflections.', 'Diffuse the rear wall.', 'Add bass traps in corners for low-frequency control.']]
      ]
    },
    {
      id: 'smart-cinema-automation',
      title: 'One Touch Cinema: Designing Effortless Smart Control',
      category: 'Smart Home',
      image: 'service_whole_home_1791737409086.jpg',
      author: 'Priya Raman',
      date: 'January 28, 2026',
      read: '5 min read',
      excerpt: 'Great automation should be invisible. Here is how we sequence lighting, shades, audio, and sources into a single scene your whole family can use.',
      tags: ['Smart Home', 'Automation', 'Crestron'],
      body: [
        ['h2', 'Automation should reduce decisions'],
        ['p', 'The best systems ask nothing of the user. Press one button and the room should transition gracefully into viewing mode without a sequence of remotes or apps.'],
        ['h2', 'Choreograph the scene'],
        ['p', 'Dim the lights to a calibrated level, close the motorised shades, wake the processor, and select the correct source. Each step is timed so the room feels alive rather than mechanical.'],
        ['h2', 'Keep control intuitive'],
        ['p', 'A handheld remote for everyday use, a touch panel for room control, and a wall keypad for quick scenes cover every scenario without overwhelming anyone.'],
        ['blockquote', 'The finest automation is the automation nobody notices.'],
        ['ul', ['Design scenes around real routines.', 'Provide a simple all-off command.', 'Document the system for future owners.']]
      ]
    }
  ];

  var CATEGORIES = ['All', 'Home Cinema', 'Acoustics', 'Technology', 'Buying Guide', 'Smart Home'];

  function postById(id) {
    for (var i = 0; i < POSTS.length; i++) if (POSTS[i].id === id) return POSTS[i];
    return null;
  }

  function cardHTML(p) {
    return '' +
      '<article class="blog-card">' +
        '<a href="blog-details.html?id=' + p.id + '" class="blog-card-img">' +
          '<span class="blog-cat">' + p.category + '</span>' +
          '<img src="' + A + p.image + '" alt="' + p.title + '" loading="lazy">' +
        '</a>' +
        '<div class="blog-card-body">' +
          '<div class="blog-meta"><span>' + p.date + '</span><span>&bull;</span><span>' + p.read + '</span></div>' +
          '<h3><a href="blog-details.html?id=' + p.id + '">' + p.title + '</a></h3>' +
          '<p>' + p.excerpt + '</p>' +
          '<a href="blog-details.html?id=' + p.id + '" class="blog-read-link">Read Article <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>' +
        '</div>' +
      '</article>';
  }

  /* ----------------------------- LIST PAGE ----------------------------- */
  function mountList() {
    var grid = document.getElementById('blog-grid');
    if (!grid) return;

    var state = { category: 'All', query: '' };

    // Category filter chips
    var filters = document.getElementById('blog-filters');
    if (filters) {
      filters.innerHTML = CATEGORIES.map(function (c, i) {
        return '<button type="button" class="filter-chip' + (i === 0 ? ' active' : '') + '" data-cat="' + c + '">' + c + '</button>';
      }).join('');
      filters.querySelectorAll('.filter-chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
          filters.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
          chip.classList.add('active');
          state.category = chip.getAttribute('data-cat');
          render();
        });
      });
    }

    // Search input
    var search = document.getElementById('blog-search-input');
    if (search) {
      search.addEventListener('input', function () {
        state.query = search.value.toLowerCase().trim();
        render();
      });
    }

    function render() {
      var list = POSTS.filter(function (p) {
        var catOk = state.category === 'All' || p.category === state.category;
        var q = state.query;
        var textOk = !q ||
          p.title.toLowerCase().indexOf(q) !== -1 ||
          p.excerpt.toLowerCase().indexOf(q) !== -1 ||
          p.category.toLowerCase().indexOf(q) !== -1 ||
          p.tags.join(' ').toLowerCase().indexOf(q) !== -1;
        return catOk && textOk;
      });

      var count = document.getElementById('blog-result-count');
      if (count) count.textContent = list.length + (list.length === 1 ? ' article' : ' articles');

      if (!list.length) {
        grid.innerHTML = '<div class="no-results"><p>No articles match your search. Try another keyword or category.</p></div>';
        return;
      }
      grid.innerHTML = list.map(cardHTML).join('');
    }

    // Support ?category= deep links
    var params = new URLSearchParams(window.location.search);
    var preCat = params.get('category');
    if (preCat && CATEGORIES.indexOf(preCat) !== -1 && filters) {
      filters.querySelectorAll('.filter-chip').forEach(function (c) {
        c.classList.toggle('active', c.getAttribute('data-cat') === preCat);
      });
      state.category = preCat;
    }
    var preQ = params.get('q');
    if (preQ && search) { search.value = preQ; state.query = preQ.toLowerCase(); }

    render();
  }

  /* ---------------------------- DETAIL PAGE ---------------------------- */
  function mountDetail() {
    var root = document.getElementById('article-root');
    if (!root) return;

    var id = new URLSearchParams(window.location.search).get('id');
    var post = postById(id) || POSTS[0];

    document.title = post.title + ' | AETHER CINEMATICS Blog';

    var breadcrumbCat = document.getElementById('article-breadcrumb-cat');
    if (breadcrumbCat) breadcrumbCat.textContent = post.category;

    var cat = document.getElementById('article-cat');
    if (cat) cat.textContent = post.category;

    var title = document.getElementById('article-title');
    if (title) title.textContent = post.title;

    var meta = document.getElementById('article-meta');
    if (meta) meta.innerHTML = '<span>' + post.author + '</span><span>&bull;</span><span>' + post.date + '</span><span>&bull;</span><span>' + post.read + '</span>';

    var hero = document.getElementById('article-hero-img');
    if (hero) { hero.src = A + post.image; hero.alt = post.title; }

    var bodyHTML = post.body.map(function (row) {
      var tag = row[0];
      var content = row[1];
      if (tag === 'ul') {
        return '<ul>' + content.map(function (li) { return '<li>' + li + '</li>'; }).join('') + '</ul>';
      }
      return '<' + tag + '>' + content + '</' + tag + '>';
    }).join('');

    var body = document.getElementById('article-body');
    if (body) {
      body.innerHTML = bodyHTML +
        '<h2>Final thoughts</h2>' +
        '<p>Every project is a balance of art and engineering. If you would like to explore how these ideas apply to your own space, our acoustic architects are always happy to talk through the possibilities during a complimentary consultation.</p>';
    }

    var tags = document.getElementById('article-tags');
    if (tags) {
      tags.innerHTML = post.tags.map(function (t) {
        return '<a href="blog.html?q=' + encodeURIComponent(t) + '" class="tag-pill">' + t + '</a>';
      }).join('');
    }

    // Sidebar recent posts
    var recent = document.getElementById('recent-posts');
    if (recent) {
      recent.innerHTML = POSTS.filter(function (p) { return p.id !== post.id; }).slice(0, 4).map(function (p) {
        return '<a href="blog-details.html?id=' + p.id + '" class="recent-post">' +
          '<img src="' + A + p.image + '" alt="' + p.title + '" loading="lazy">' +
          '<div><h5>' + p.title + '</h5><span>' + p.date + '</span></div>' +
        '</a>';
      }).join('');
    }

    // Sidebar tag cloud
    var cloud = document.getElementById('blog-tags');
    if (cloud) {
      var allTags = [];
      POSTS.forEach(function (p) { p.tags.forEach(function (t) { if (allTags.indexOf(t) === -1) allTags.push(t); }); });
      cloud.innerHTML = allTags.map(function (t) {
        return '<a href="blog.html?q=' + encodeURIComponent(t) + '" class="tag-pill">' + t + '</a>';
      }).join('');
    }

    // Related posts
    var related = document.getElementById('related-posts');
    if (related) {
      var rel = POSTS.filter(function (p) {
        return p.id !== post.id && (p.category === post.category || p.tags.some(function (t) { return post.tags.indexOf(t) !== -1; }));
      });
      if (rel.length < 3) {
        POSTS.forEach(function (p) { if (p.id !== post.id && rel.indexOf(p) === -1 && rel.length < 3) rel.push(p); });
      }
      related.innerHTML = rel.slice(0, 3).map(cardHTML).join('');
    }
  }

  function boot() {
    mountList();
    mountDetail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.AETHER_BLOG = { posts: POSTS, cardHTML: cardHTML, postById: postById };
})();
