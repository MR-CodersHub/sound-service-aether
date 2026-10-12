/**
 * AETHER CINEMATICS - SERVICE DETAILS ENGINE
 * Renders the correct service page dynamically from the ?id= query param so a
 * single service-details.html serves every service card. Vanilla JS only.
 */

(function () {
  'use strict';

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

  var SERVICES = [
    {
      id: 'custom-home-theatre',
      name: 'Custom Home Theatre',
      category: 'Cinematic Spaces',
      image: 'hero-cinema.jpg',
      tagline: 'Your Home. Your Private Cinema.',
      excerpt: 'Transform a dedicated room into a reference-grade private cinema with projection, seating layouts and acoustic engineering built around Hollywood standards.',
      description: 'Our flagship service turns an unused room into a purpose-built movie palace. We handle everything from decoupled wall construction and star-ceiling lighting to the final optical and acoustic calibration, delivering an experience that rivals commercial theatres while fitting seamlessly into your home.',
      specs: ['Dolby Atmos 9.4.6', 'Native 4K Laser', 'Acoustic Decoupling', 'Motorised Seating'],
      features: [
        ['Room & Sightline Design', 'Every seat is positioned for an unobstructed, immersive field of view with elevated secondary rows.'],
        ['Decoupled Acoustic Shell', 'Floating floors, resilient channels, and layered drywall isolate bass energy from the rest of the home.'],
        ['Reference Projection', 'Native 4K laser projection paired with micro-perforated acoustic screens for hidden stage channels.'],
        ['Cinema Lighting Scenes', 'Motorised blackout shades, fibre-optic star ceilings and step lighting on a single control scene.'],
        ['Tactile Bass Engineering', 'Multiple DSP subwoofers aligned to remove room nulls and deliver infrasonic impact.'],
        ['White-Glove Calibration', 'Multi-point audio and colourimity calibration to studio reference levels before handover.']
      ],
      faqs: [
        ['How long does a dedicated cinema build take?', 'A typical build spans 8 to 14 weeks depending on construction scope, bespoke joinery and equipment lead times. We provide a detailed schedule after the design phase.'],
        ['Do I need a large room?', 'No. Excellent cinemas have been designed in rooms as small as 4 x 5 metres. Careful geometry matters far more than raw size.'],
        ['Can you work with my existing architecture team?', 'Absolutely. We routinely collaborate with architects, interior designers and general contractors, providing AV drawings and coordination.'],
        ['Will the construction disrupt my home?', 'We sequence work to minimise disruption, isolate dust, and protect finished surfaces throughout the installation.']
      ],
      pricing: [
        ['Essential', '$18,000', 'Single-row dedicated room, 5.1.2 audio, 4K projection and basic acoustic treatment.', ['5.1.2 Surround', '4K Projection', '12 Acoustic Panels', 'Room Calibration']],
        ['Signature', '$42,000', 'Two-row tiered theatre, 7.2.4 Dolby Atmos, laser projection and full acoustic design.', ['7.2.4 Dolby Atmos', '4K Laser Projection', 'Full Acoustic Design', 'Lighting Scenes', 'Star Ceiling']],
        ['Bespoke', 'From $95,000', 'Ground-up architectural cinema with decoupled construction and reference-grade components.', ['9.4.6 Atmos', 'Decoupled Build', 'Reference Hardware', 'Custom Joinery', 'Concierge Support']]
      ]
    },
    {
      id: 'surround-sound',
      name: 'Surround Sound Installation',
      category: 'Spatial Audio',
      image: 'service-surround.jpg',
      tagline: 'Sound That Moves Around You.',
      excerpt: 'Immersive object-based audio through precisely positioned architectural speakers and calibrated subwoofers tailored to your room.',
      description: 'We design and install surround systems that place you at the centre of the action. From compact 5.1 living-room packages to full 9.2.6 object-based arrays, every speaker position is calculated using room modelling rather than guesswork.',
      specs: ['7.2.4 & 9.2.6', 'In-Wall Discrete', 'Dolby Atmos / DTS:X', 'Dirac Calibration'],
      features: [
        ['Speaker Position Modelling', 'Three-dimensional ray tracing determines optimal angles and heights for your exact seating arrangement.'],
        ['Architectural Speakers', 'Flush in-wall and in-ceiling drivers disappear into the decor while delivering studio-grade output.'],
        ['Bass Management', 'Multiple calibrated subwoofers smooth low-frequency response across every seat.'],
        ['Object-Based Decoding', 'Dolby Atmos, DTS:X and Auro-3D rendered natively by high-channel-count processors.'],
        ['Clean Cable Routing', 'Structured conduit and concealed runs mean no visible wiring anywhere in the room.'],
        ['Room Correction', 'Dirac Live and automated calibration tune the system to the acoustic signature of your space.']
      ],
      faqs: [
        ['Can surround sound be added without major construction?', 'Yes. Surface-mount and on-wall options avoid cutting walls, though in-wall brings the cleanest aesthetic.'],
        ['How many speakers do I really need?', 'For most living rooms, 5.1.2 delivers a dramatic upgrade. Dedicated rooms benefit from 7.2.4 or more.'],
        ['Will it work with my current TV and sources?', 'We integrate with your existing displays, streaming devices and games consoles seamlessly.'],
        ['Can it integrate with whole-home audio?', 'Indeed. Surround systems can share amplification and control with multi-room audio zones.']
      ],
      pricing: [
        ['Essential', '$6,500', '5.1.2 object-based audio with architectural speakers and calibration.', ['5.1.2 Atmos', 'In-Ceiling Speakers', 'Single Subwoofer', 'Calibration']],
        ['Signature', '$14,000', '7.2.4 full Atmos with premium in-wall speakers and dual subwoofers.', ['7.2.4 Atmos', 'Premium In-Wall', 'Dual Subwoofers', 'Dirac Calibration']],
        ['Bespoke', 'From $32,000', '9.2.6 reference array with dedicated processing and acoustic treatment.', ['9.2.6 Array', 'Reference Processing', 'Acoustic Treatment', 'Full Tuning']]
      ]
    },
    {
      id: 'projector-screen',
      name: 'Projector & Screen Installation',
      category: 'Optics & Display',
      image: 'service-projector.jpg',
      tagline: 'Big Picture, Perfectly Placed.',
      excerpt: 'The right screen size, throw distance and image quality for your room, with motorised drop-down or fixed ambient-light-rejecting screens.',
      description: 'Projection is the heart of a cinematic room, and small details decide whether the image delights or disappoints. We calculate throw ratios, screen gain, and ambient light performance to deliver a picture that remains vivid in real-world rooms.',
      specs: ['Native 4K Laser', 'ALR Fabric', 'Motorised Drop', 'HDR Tone Mapping'],
      features: [
        ['Screen Sizing & Placement', 'We model viewing angles and throw distance to guarantee a comfortable, immersive image.'],
        ['Ambient Light Rejection', 'ALR screens preserve contrast in rooms where light control is imperfect.'],
        ['Motorised Concealment', 'Drop-down screens disappear into ceiling reveals when not in use.'],
        ['Reference Calibration', 'Grayscale, gamma and colour points calibrated to accurate, cinema-grade standards.'],
        ['HDR Optimisation', 'Dynamic tone mapping tuned for your projector and screen combination.'],
        ['Acoustic Transparency', 'Micro-perforated screens allow centre channels to sit behind the image where they belong.']
      ],
      faqs: [
        ['What screen size suits my room?', 'As a rule, the front row should sit 1.2 to 1.5 times the screen width away for comfortable immersion.'],
        ['Do laser projectors need lamp replacement?', 'Laser light sources typically run 20,000 hours or more, effectively eliminating routine lamp changes.'],
        ['Can a screen be installed on a regular ceiling?', 'Yes. Motorised and fixed options both work with standard and drop ceilings.'],
        ['How bright must the room be controlled?', 'ALR screens work in moderate light; blackout shades deliver the best contrast for critical viewing.']
      ],
      pricing: [
        ['Essential', '$5,200', 'Fixed-frame ALR screen with 4K projector and calibration.', ['Fixed ALR Screen', '4K Projector', 'Mounting', 'Calibration']],
        ['Signature', '$11,500', 'Motorised drop screen, laser projector and ceiling concealment.', ['Motorised Screen', '4K Laser Projector', 'Ceiling Reveal', 'HDR Calibration']],
        ['Bespoke', 'From $26,000', 'Reference laser projection with acoustic screen and motorised masking.', ['Acoustic Screen', 'Reference Laser', 'Motorised Masking', 'Full Calibration']]
      ]
    },
    {
      id: 'whole-home-audio',
      name: 'Whole-Home Audio',
      category: 'Whole Estate',
      image: 'service-whole-home.jpg',
      tagline: 'Music in Every Room, Perfectly in Sync.',
      excerpt: 'Seamlessly integrated multi-room audio across living spaces, terraces and suites with invisible speakers and one-touch control.',
      description: 'Fill your home with high-resolution music that follows you from room to room. Architecturally discreet speakers and a centralised control platform let every family member enjoy their own audio, anytime, from a simple app or wall panel.',
      specs: ['Multi-Zone', 'High-Res HiFi', 'Invisible Speakers', 'App Control'],
      features: [
        ['Zoned Architecture', 'Independent volume and source selection for every room, balcony and garden zone.'],
        ['Invisible Speakers', 'Plaster-in and micro in-ceiling drivers that vanish completely into the architecture.'],
        ['High-Resolution Streaming', 'Support for lossless and hi-res services plus local music libraries.'],
        ['Touch & Voice Control', 'Wall keypads, touch panels, app control and voice assistant integration.'],
        ['Outdoor Audio', 'Weather-rated speakers discretely integrated into terraces and pool areas.'],
        ['Scalable Platform', 'Add zones at any time without replacing the core system.']
      ],
      faqs: [
        ['Can I add just two or three rooms?', 'Yes, the platform scales from a handful of rooms to an entire estate.'],
        ['Will guests be able to control the music?', 'Guest access and simple keypads make control effortless for anyone in the home.'],
        ['Does it support my streaming subscriptions?', 'We integrate Spotify, Tidal, Deezer, Apple Music and local libraries, among others.'],
        ['Can it work with outdoor spaces?', 'Weather-rated speakers and amplifiers extend the experience to terraces and gardens.']
      ],
      pricing: [
        ['Essential', '$4,800', 'Four zones of high-resolution streaming with in-ceiling speakers.', ['4 Zones', 'In-Ceiling Speakers', 'App Control', 'Streaming Setup']],
        ['Signature', '$12,500', 'Eight zones with invisible speakers and touch-panel control.', ['8 Zones', 'Invisible Speakers', 'Touch Panels', 'Hi-Res Streaming']],
        ['Bespoke', 'From $28,000', 'Estate-wide audio with outdoor zones and full automation integration.', ['Unlimited Zones', 'Outdoor Audio', 'Automation Integration', 'Concierge Support']]
      ]
    },
    {
      id: 'acoustic-treatments',
      name: 'Acoustic Room Tuning',
      category: 'Room Engineering',
      image: 'project-acoustic.jpg',
      tagline: 'Hear the Room Disappear.',
      excerpt: 'Custom architectural acoustic panels, bass traps and diffusers that transform a problematic room into an accurate listening space.',
      description: 'Rooms, not equipment, are the biggest limitation on sound quality. Our acoustic engineers measure your space and design bespoke treatments that tame reflections, control bass, and preserve the natural life of the sound.',
      specs: ['Absorption & Diffusion', 'Custom Timber', 'Bass Traps', 'Measured Design'],
      features: [
        ['Acoustic Measurement', 'Impulse response and frequency analysis reveal exactly which frequencies and reflections need treatment.'],
        ['Bespoke Panel Fabrication', 'Custom timber diffusers and fabric panels built to match your interior finishes.'],
        ['Corner Bass Control', 'Strategically placed traps smooth low-frequency behaviour and remove boomy resonance.'],
        ['Reverberation Tuning', 'We target an ideal RT60 for the room type rather than deadening every surface.'],
        ['Aesthetic Integration', 'Treatments are designed as architectural features, not afterthoughts.'],
        ['Before & After Reporting', 'Measured data demonstrates the improvement after installation.']
      ],
      faqs: [
        ['Will treatments make my room feel dead?', 'No. We balance absorption with diffusion so the room stays lively yet accurate.'],
        ['How many panels will I need?', 'It depends entirely on room dimensions and construction. We provide a measured recommendation.'],
        ['Can panels match my decor?', 'Yes. Panels are made to order in fabric, timber and custom colours.'],
        ['Is treatment only for dedicated rooms?', 'No. Any room where you watch or listen seriously benefits from even modest treatment.']
      ],
      pricing: [
        ['Essential', '$2,900', 'First reflection point treatment with six absorption panels.', ['6 Panels', 'Reflection Control', 'Installation', 'Measurement']],
        ['Signature', '$7,800', 'Balanced absorption and diffusion with corner bass traps.', ['Absorption + Diffusion', 'Bass Traps', 'Custom Finishes', 'Before/After Report']],
        ['Bespoke', 'From $18,000', 'Full bespoke acoustic design with custom architectural treatments.', ['Full Room Design', 'Bespoke Millwork', 'Wideband Treatment', 'Ongoing Tuning']]
      ]
    },
    {
      id: 'smart-control',
      name: 'Smart Control & Automation',
      category: 'Intelligence',
      image: 'hardware-tech.jpg',
      tagline: 'One Touch. Everything Moves.',
      excerpt: 'Unified control of lighting, shades, audio, video and climate, choreographed into effortless scenes your whole family can use.',
      description: 'Great automation removes friction. We program intuitive scenes that coordinate every device in the room so that watching a film, hosting a party, or leaving for the day becomes a single, elegant command.',
      specs: ['Crestron / Control4', 'Lighting Scenes', 'Shade Control', 'Voice Integration'],
      features: [
        ['Unified Interfaces', 'Handheld remotes, wall keypads and touch panels designed for real daily use.'],
        ['Scene Choreography', 'Lighting, shades, audio and sources coordinated into one-touch experiences.'],
        ['Lighting Control', 'Dimmable wired and wireless lighting tuned for viewing and entertaining.'],
        ['Climate Tie-In', 'Thermostats and ventilation respond automatically to room occupancy.'],
        ['Remote Monitoring', 'Proactive diagnostics keep the system running without you thinking about it.'],
        ['Future Proofing', 'Open platforms and documentation keep your system upgradeable for years.']
      ],
      faqs: [
        ['Which control platform do you recommend?', 'Crestron and Control4 both excel; we recommend based on your home size, budget and integrations.'],
        ['Can automation control my existing AV gear?', 'In most cases yes, through network, infrared, serial or relay control.'],
        ['Will the family find it easy to use?', 'That is the whole point. We design around the people who actually live in the room.'],
        ['Is remote support available?', 'Yes. We offer remote diagnostics and priority service plans.']
      ],
      pricing: [
        ['Essential', '$3,600', 'Single-room control with lighting, shades and AV scenes.', ['Single Room', 'Lighting Scenes', 'Shade Control', 'Universal Remote']],
        ['Signature', '$9,800', 'Multi-room automation with touch panels and voice control.', ['Multi-Room', 'Touch Panels', 'Voice Control', 'Climate Tie-In']],
        ['Bespoke', 'From $24,000', 'Whole-home automation with full integration and monitoring.', ['Whole Home', 'Full Integration', 'Remote Monitoring', 'Service Plan']]
      ]
    }
  ];

  function serviceById(id) {
    for (var i = 0; i < SERVICES.length; i++) if (SERVICES[i].id === id) return SERVICES[i];
    return null;
  }

  function cardHTML(s) {
    return '' +
      '<article class="service-card service-card-compact" style="grid-column:auto;">' +
        '<div class="service-card-image">' +
          '<span class="service-category-tag">' + s.category + '</span>' +
          '<img src="' + A + s.image + '" alt="' + s.name + '" loading="lazy">' +
        '</div>' +
        '<div class="service-card-body">' +
          '<h3 class="service-title">' + s.name + '</h3>' +
          '<p class="service-desc">' + s.excerpt + '</p>' +
          '<div class="service-card-footer">' +
            '<a href="service-details.html?id=' + s.id + '" class="service-explore-link"><span>Explore Service</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>' +
            '<span class="service-specs">' + s.specs.slice(0, 2).join(' &bull; ') + '</span>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function iconFor(i) {
    var icons = [
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/></svg>'
    ];
    return icons[i % icons.length];
  }

  function mount() {
    var root = document.getElementById('service-root');
    if (!root) return;

    var id = new URLSearchParams(window.location.search).get('id');
    var s = serviceById(id) || SERVICES[0];

    document.title = s.name + ' | AETHER CINEMATICS';

    // Hero
    var set = function (sel, text) { var el = document.getElementById(sel); if (el) el.textContent = text; };
    set('service-breadcrumb-name', s.name);
    set('service-cat', s.category);
    set('service-title', s.name);
    set('service-tagline', s.tagline);
    set('service-desc', s.description);
    var img = document.getElementById('service-hero-img');
    if (img) {
      img.src = A + s.image;
      img.alt = s.name;
      img.onerror = function () {
        if (!this.getAttribute('data-fallback')) {
          this.setAttribute('data-fallback', '1');
          this.src = '../../assets/images/' + s.image;
        } else if (this.getAttribute('data-fallback') === '1') {
          this.setAttribute('data-fallback', '2');
          this.src = '../assets/images/' + s.image;
        }
      };
    }

    var specs = document.getElementById('service-specs');
    if (specs) specs.innerHTML = s.specs.map(function (sp) { return '<span class="spec-pill">' + sp + '</span>'; }).join('');

    // Features
    var features = document.getElementById('service-features');
    if (features) {
      features.innerHTML = s.features.map(function (f, i) {
        return '<div class="content-card">' +
          '<div class="icon-badge">' + iconFor(i) + '</div>' +
          '<h3>' + f[0] + '</h3>' +
          '<p>' + f[1] + '</p>' +
        '</div>';
      }).join('');
    }

    // FAQs
    var faq = document.getElementById('service-faq');
    if (faq) {
      faq.innerHTML = s.faqs.map(function (q, i) {
        return '<div class="accordion-item' + (i === 0 ? ' open' : '') + '">' +
          '<button class="accordion-header" type="button"><span>' + q[0] + '</span>' +
          '<span class="accordion-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>' +
          '<div class="accordion-body"><div class="accordion-body-inner"><p>' + q[1] + '</p></div></div>' +
        '</div>';
      }).join('');
    }

    // Pricing
    var pricing = document.getElementById('service-pricing');
    if (pricing) {
      var featureChecks = function (arr, limit) {
        return arr.slice(0, limit).map(function (f) {
          return '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>' + f + '</li>';
        }).join('');
      };
      var midFeatures = s.pricing[0][3].concat(s.pricing[1][3]).filter(function (v, i, a) { return a.indexOf(v) === i; });
      var topFeatures = midFeatures.concat(s.pricing[2][3]).filter(function (v, i, a) { return a.indexOf(v) === i; });
      var tiers = [
        { name: s.pricing[0][0], price: s.pricing[0][1], sub: s.pricing[0][2], feats: s.pricing[0][3], featured: false },
        { name: s.pricing[1][0], price: s.pricing[1][1], sub: s.pricing[1][2], feats: midFeatures, featured: true },
        { name: s.pricing[2][0], price: s.pricing[2][1], sub: s.pricing[2][2], feats: topFeatures, featured: false }
      ];
      pricing.innerHTML = tiers.map(function (t) {
        return '<div class="pricing-card' + (t.featured ? ' featured' : '') + '">' +
          (t.featured ? '<span class="pricing-badge">Most Popular</span>' : '') +
          '<div class="pricing-name">' + t.name + '</div>' +
          '<p class="pricing-sub">' + t.sub + '</p>' +
          '<div class="price-tag"><span class="amount">' + t.price + '</span></div>' +
          '<ul class="pricing-features">' + featureChecks(t.feats, 6) + '</ul>' +
          '<a href="contact.html?service=' + encodeURIComponent(s.name) + '" class="btn ' + (t.featured ? 'btn-primary' : 'btn-secondary') + ' w-full">Request Quote</a>' +
        '</div>';
      }).join('');
    }

    // Related services
    var related = document.getElementById('service-related');
    if (related) {
      related.innerHTML = SERVICES.filter(function (x) { return x.id !== s.id; }).slice(0, 3).map(cardHTML).join('');
    }

    // Re-init accordions if UI helper present
    if (window.AetherUI && window.AetherUI.initAccordions) window.AetherUI.initAccordions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  window.AETHER_SERVICES = { list: SERVICES, cardHTML: cardHTML, serviceById: serviceById };
})();
