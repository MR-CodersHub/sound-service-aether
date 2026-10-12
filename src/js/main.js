/**
 * AETHER CINEMATICS - AUDIOVISUAL ARCHITECTURE & PRIVATE CINEMAS
 * Interactive Frontend Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroParticles();
  initNavigation();
  initAudioAmbience();
  initSearchModal();
  initTechShowcase();
  initBudgetChips();
  initConsultationForm();
  initLightbox();
  initScrollSpy();
});

/* ==========================================================================
   1. Hero Particle Starfield Canvas (Sparse & Understated)
   ========================================================================== */
function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let particles = [];
  const PARTICLE_COUNT = 65;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  resizeCanvas();

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.6 + 0.4,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.6 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.4 ? 'rgba(196, 181, 253,' : 'rgba(168, 85, 247,'
      });
    }
  }

  createParticles();

  function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

      // Wrap around bounds
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${Math.max(0.1, Math.min(0.85, p.opacity))})`;
      ctx.shadowBlur = p.size > 1 ? 8 : 0;
      ctx.shadowColor = '#A855F7';
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(renderParticles);
  }

  renderParticles();
}

/* ==========================================================================
   2. Navigation & Sticky Blur Header
   ========================================================================== */
function initNavigation() {
  const nav = document.querySelector('.site-nav');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileClose = document.getElementById('mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-drawer-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu open / close
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   3. Ambient Soundscape Generator (Web Audio API)
   ========================================================================== */
function initAudioAmbience() {
  const toggleBtn = document.getElementById('ambient-audio-toggle');
  if (!toggleBtn) return;

  let audioCtx = null;
  let masterGain = null;
  let isPlaying = false;
  let oscillators = [];

  function startAtmosphere() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 2.5); // Warm subtle level

      // Master lowpass filter for warm cinematic tone
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, audioCtx.currentTime);

      masterGain.connect(filter);
      filter.connect(audioCtx.destination);

      // Frequencies for a soothing cinematic chord (Sub 55Hz, 110Hz, 164.8Hz, 220Hz, 329.6Hz)
      const freqs = [55, 110, 164.81, 220, 329.63];

      oscillators = freqs.map((f, i) => {
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();

        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f + (Math.random() * 0.4 - 0.2), audioCtx.currentTime);

        oscGain.gain.setValueAtTime(0.25 / freqs.length, audioCtx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        return osc;
      });

      isPlaying = true;
      toggleBtn.classList.add('playing');
      const textSpan = toggleBtn.querySelector('.audio-label');
      if (textSpan) textSpan.textContent = 'Audio: On';
    } catch (e) {
      console.warn('Web Audio not allowed or unsupported:', e);
    }
  }

  function stopAtmosphere() {
    if (audioCtx && masterGain) {
      masterGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      setTimeout(() => {
        oscillators.forEach(osc => osc.stop());
        if (audioCtx.state !== 'closed') audioCtx.close();
        isPlaying = false;
        toggleBtn.classList.remove('playing');
        const textSpan = toggleBtn.querySelector('.audio-label');
        if (textSpan) textSpan.textContent = 'Acoustic Preview';
      }, 1200);
    }
  }

  toggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      startAtmosphere();
    } else {
      stopAtmosphere();
    }
  });
}

/* ==========================================================================
   4. Search Modal & Quick Filters
   ========================================================================== */
function initSearchModal() {
  const searchBtn = document.getElementById('search-toggle-btn');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-modal-close');
  const searchInput = document.getElementById('site-search-input');
  const searchResults = document.getElementById('search-results-list');

  if (!searchBtn || !searchModal) return;

  const searchableItems = [
    { title: 'Custom Home Theatre', category: 'Service', link: '#services', desc: 'Bespoke personal cinema room with laser projection and acoustic planning.' },
    { title: 'Surround Sound Installation', category: 'Service', link: '#services', desc: 'Dolby Atmos architectural speaker placement and calibrated subwoofers.' },
    { title: 'Projector & Screen Installation', category: 'Service', link: '#services', desc: 'Ambient light rejecting screens, ultra-short throw, 4K laser optics.' },
    { title: 'Whole-Home Multi-Room Audio', category: 'Service', link: '#services', desc: 'Discreet high-fidelity ceiling and garden sound integration.' },
    { title: 'The Private Cinema', category: 'Project', link: '#gallery', desc: 'Flagship 14-seat tiered velvet acoustic cinema.' },
    { title: 'The Living Room Experience', category: 'Project', link: '#gallery', desc: 'Motorized drop screen and flush architectural surround sound.' },
    { title: 'The Immersive Audio Room', category: 'Project', link: '#gallery', desc: 'Audiophile listening suite with custom walnut diffusion panels.' },
    { title: 'Dolby Atmos & DTS:X Receivers', category: 'Technology', link: '#technology', desc: 'High-current 32-channel discrete surround sound processing.' },
    { title: 'Acoustic Ray-Tracing & Calibration', category: 'Process', link: '#process', desc: 'Dirac Live and Trinnov digital room correction.' },
    { title: 'Book a Private Consultation', category: 'Contact', link: '#consultation', desc: 'Schedule an on-site architectural evaluation with our senior sound architect.' }
  ];

  function openModal() {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 100);
  }

  function closeModal() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    renderResults([]);
  }

  searchBtn.addEventListener('click', openModal);
  if (searchClose) searchClose.addEventListener('click', closeModal);

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeModal();
  });

  function renderResults(matches) {
    if (!searchResults) return;
    if (matches.length === 0) {
      searchResults.innerHTML = `<div style="text-align:center; padding: 2rem; color: var(--text-muted); font-size: 0.9rem;">Start typing to search services, installations, and technologies...</div>`;
      return;
    }

    searchResults.innerHTML = matches.map(item => `
      <a href="${item.link}" class="search-result-item" style="display:block; padding: 0.9rem 1.1rem; border-radius: 8px; border: 1px solid rgba(40,45,80,0.6); margin-bottom: 0.6rem; background: rgba(16,23,67,0.4); text-decoration: none;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.25rem;">
          <strong style="color: #FFFFFF; font-size: 0.95rem;">${item.title}</strong>
          <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--purple-bright); padding: 0.15rem 0.5rem; background: rgba(101,37,217,0.2); border-radius: 4px;">${item.category}</span>
        </div>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin: 0;">${item.desc}</p>
      </a>
    `).join('');

    searchResults.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeModal());
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderResults([]);
        return;
      }
      const filtered = searchableItems.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
      renderResults(filtered);
    });
  }

  // Quick tag chips in search modal
  document.querySelectorAll('.search-quick-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const term = tag.getAttribute('data-term');
      if (searchInput) {
        searchInput.value = term;
        searchInput.dispatchEvent(new Event('input'));
      }
    });
  });
}

/* ==========================================================================
   5. Technology & Equipment Interactive Showcase
   ========================================================================== */
function initTechShowcase() {
  const cards = document.querySelectorAll('.tech-card');
  const techImg = document.getElementById('tech-preview-img');
  const techTitle = document.getElementById('tech-preview-title');
  const techBadge = document.getElementById('tech-preview-badge');

  if (!cards.length) return;

  const techDetails = {
    'projectors': {
      title: '4K/8K Laser Projectors & ALR Screens',
      badge: 'OPTICAL PRECISION',
      img: 'assets/images/service-projector.jpg'
    },
    'amplifiers': {
      title: 'Multi-Channel High-Current Discrete Amplification',
      badge: 'POWER & PROCESSING',
      img: 'assets/images/hardware-tech.jpg'
    },
    'speakers': {
      title: 'Architectural In-Wall Neodymium Drivers',
      badge: 'ACOUSTIC ENGINEERING',
      img: 'assets/images/service-surround.jpg'
    },
    'subwoofers': {
      title: 'Sub-Infrasonic Dual-Opposed DSP Subwoofers',
      badge: 'BASS HARMONICS',
      img: 'assets/images/project-acoustic.jpg'
    },
    'treatments': {
      title: 'Architectural Timber Diffusers & Absorption Core',
      badge: 'ROOM TUNING',
      img: 'assets/images/hero-cinema.jpg'
    },
    'smart': {
      title: 'Seamless Crestron & Control4 Touch Automation',
      badge: 'INTELLIGENT INTEGRATION',
      img: 'assets/images/service-whole-home.jpg'
    }
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const key = card.getAttribute('data-tech');
      const item = techDetails[key];
      if (item && techImg) {
        techImg.style.opacity = '0.4';
        setTimeout(() => {
          techImg.src = item.img;
          if (techTitle) techTitle.textContent = item.title;
          if (techBadge) techBadge.textContent = item.badge;
          techImg.style.opacity = '1';
        }, 180);
      }
    });
  });
}

/* ==========================================================================
   6. Budget Range Interactive Chips
   ========================================================================== */
function initBudgetChips() {
  const chips = document.querySelectorAll('.budget-chip');
  const budgetInput = document.getElementById('budget-input');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (budgetInput) {
        budgetInput.value = chip.getAttribute('data-value');
      }
    });
  });
}

/* ==========================================================================
   7. Contact & Consultation Form Validation & Success Confirmation
   ========================================================================== */
function initConsultationForm() {
  const form = document.getElementById('consultation-form');
  const modal = document.getElementById('booking-confirmation-modal');
  const modalClose = document.getElementById('booking-confirmation-close');

  if (!form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return /^[\d\s+\-()]{7,20}$/.test(phone.trim());
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Fields
    const nameInput = document.getElementById('client-name');
    const emailInput = document.getElementById('client-email');
    const phoneInput = document.getElementById('client-phone');
    const typeSelect = document.getElementById('installation-type');

    // Reset error states
    form.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Email
    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      emailInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Phone
    if (!phoneInput.value.trim() || !validatePhone(phoneInput.value.trim())) {
      phoneInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Installation Type
    if (!typeSelect.value) {
      typeSelect.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) {
      const firstError = form.querySelector('.form-group.has-error input, .form-group.has-error select');
      if (firstError) firstError.focus();
      return;
    }

    // Prepare confirmation data
    const clientName = nameInput.value.trim();
    const clientEmail = emailInput.value.trim();
    const serviceType = typeSelect.options[typeSelect.selectedIndex].text;
    const refCode = 'AET-' + Math.floor(1000 + Math.random() * 9000);

    const refElem = document.getElementById('confirm-ref-code');
    const nameElem = document.getElementById('confirm-client-name');
    const typeElem = document.getElementById('confirm-service-type');
    const emailElem = document.getElementById('confirm-client-email');

    if (refElem) refElem.textContent = refCode;
    if (nameElem) nameElem.textContent = clientName;
    if (typeElem) typeElem.textContent = serviceType;
    if (emailElem) emailElem.textContent = clientEmail;

    // Show modal
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Reset form
    form.reset();
    document.querySelectorAll('.budget-chip').forEach(c => c.classList.remove('active'));
    const defaultChip = document.querySelector('.budget-chip[data-value="$30k - $75k"]');
    if (defaultChip) defaultChip.classList.add('active');
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   8. Portfolio Image Lightbox Modal
   ========================================================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('[data-lightbox-src]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-lightbox-src');
      const caption = trigger.getAttribute('data-lightbox-caption') || '';

      lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   9. Scroll Spy for Active Navigation Links
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
