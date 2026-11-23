// Lend Partners - Interactive UI Logic (Vanilla JavaScript)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reveal Animations on Scroll
  const revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('visible'));
  }

  // 2. Animated Metric Counters
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const animateCount = (element) => {
      const target = Number(element.dataset.count);
      const prefix = element.dataset.prefix || '';
      const suffix = element.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - ((1 - progress) ** 3);
        element.textContent = `${prefix}${Math.round(target * eased).toLocaleString('en-AU')}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.classList.add('counter-finish');
        }
      };
      requestAnimationFrame(step);
    };
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((counter) => countObserver.observe(counter));
  }

  // Sticky Navbar Scroll Elevation
  const siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    const onScroll = () => {
      if (window.scrollY > 25) {
        siteNav.classList.add('nav-scrolled');
      } else {
        siteNav.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Hero 3D Interactive Parallax on Mousemove
  const heroVisual = document.querySelector('.structure-visual');
  const heroHome = document.querySelector('.hero-home');
  if (heroVisual && heroHome && window.matchMedia('(min-width: 992px)').matches) {
    let isTicking = false;
    heroHome.addEventListener('mousemove', (e) => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const rect = heroHome.getBoundingClientRect();
          const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
          const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
          heroVisual.style.transform = `perspective(1000px) rotateY(${mouseX * 8}deg) rotateX(${-mouseY * 8}deg)`;
          isTicking = false;
        });
        isTicking = true;
      }
    });
    heroHome.addEventListener('mouseleave', () => {
      heroVisual.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
      heroVisual.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      setTimeout(() => {
        heroVisual.style.transition = '';
      }, 900);
    });
    heroHome.addEventListener('mouseenter', () => {
      heroVisual.style.transition = 'transform 0.2s ease-out';
    });
  }

  // Sai Divisions interactive active-pop hover switcher
  const saiCards = document.querySelectorAll('.sai-card');
  if (saiCards.length) {
    saiCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        saiCards.forEach((c) => c.classList.remove('active-pop'));
        card.classList.add('active-pop');
      });
    });
  }

  // Stagger animation delays for grid items
  const gridContainers = document.querySelectorAll('.lenders-grid, .team-section .row, .deals-membership-section .row, .sai-divisions-grid');
  gridContainers.forEach((grid) => {
    Array.from(grid.children).forEach((child, index) => {
      child.style.transitionDelay = `${(index % 6) * 0.08}s`;
    });
  });

  // 3. Hero Title Word Animation
  const heroTitle = document.querySelector('.hero-copy h1');
  if (heroTitle) {
    const wrapEm = heroTitle.querySelector('em');
    if (wrapEm && !wrapEm.querySelector('span')) {
      wrapEm.innerHTML = wrapEm.textContent
        .split(' ')
        .map((word) => `<span class="word-rise"><span>${word}</span></span>`)
        .join(' ');
    }
    heroTitle.classList.add('title-in');
  }

  // 4. Interactive Methodology Phases
  const phases = [
    {
      caption: 'Phase 01 of 04\u00a0 · \u00a0Clarity before action',
      title: 'Understand your objectives',
      copy: 'Most brokers ask “How much do you want to borrow?” We ask “Where do you want to be in 5, 10, and 20 years?” We map your borrowing purpose, ambitions, family milestones and liquidity requirements before building the roadmap.',
      deliverables: [
        'Strategic discovery interview',
        '10-year wealth & debt trajectory mapping',
        'Tax & accounting team coordination',
        'Entity structure alignment'
      ],
    },
    {
      caption: 'Phase 02 of 04\u00a0 · \u00a0Facts before figures',
      title: 'Assess your circumstances',
      copy: 'We review your income structure, liabilities, entity setup, credit profile and existing securities to establish an accurate, bank-ready picture of your position and constraints.',
      deliverables: [
        'Comprehensive financial position review',
        'Lender credit-policy compatibility scan',
        'Risk, tax & asset-protection assessment',
        'Borrowing capacity sensitivity analysis'
      ],
    },
    {
      caption: 'Phase 03 of 04\u00a0 · \u00a0Structure over product',
      title: 'Structure suitable lending options',
      copy: 'We model scenarios across more than 100 institutional and private lenders, then present a shortlist of structures ranked by flexibility, cost and long-term strategic fit — never by commission.',
      deliverables: [
        'Side-by-side facility comparison',
        'Recommended debt architecture blueprint',
        'Rate, fee & feature trade-off analysis',
        'Contingency & exit strategy planning'
      ],
    },
    {
      caption: 'Phase 04 of 04\u00a0 · \u00a0Certainty to settlement',
      title: 'Guide the application process',
      copy: 'We manage valuations, approvals and documentation end-to-end, coordinate your legal and accounting team, and keep the settlement timeline on track with proactive updates.',
      deliverables: [
        'End-to-end application management',
        'Valuation & lender coordination',
        'Settlement checklist & milestone tracking',
        'Post-settlement structure review'
      ],
    },
  ];

  const methodDetail = document.querySelector('#methodDetail');
  const phaseCaption = document.querySelector('#phaseCaption');
  const phaseElements = document.querySelectorAll('.phase');

  if (methodDetail && phaseCaption && phaseElements.length) {
    const renderPhase = (index) => {
      const phase = phases[index];
      if (!phase) return;
      methodDetail.innerHTML = `
        <div>
          <span class="eyebrow eyebrow-light"><span></span>Execution blueprint</span>
          <h3>${phase.title}</h3>
          <p>${phase.copy}</p>
          <a href="about.html" class="btn btn-light">Experience our process <span class="arrow" aria-hidden="true">↗</span></a>
        </div>
        <div class="deliverables">
          <span class="footer-label">Key phase deliverables</span>
          <ul>${phase.deliverables.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>`;
      methodDetail.classList.remove('phase-swap');
      void methodDetail.offsetWidth; // Trigger reflow for animation
      methodDetail.classList.add('phase-swap');
      phaseCaption.innerHTML = phase.caption;
    };

    phaseElements.forEach((phaseElement) => {
      phaseElement.addEventListener('click', () => {
        phaseElements.forEach((item) => item.classList.remove('active'));
        phaseElement.classList.add('active');
        renderPhase(Number(phaseElement.dataset.index));
      });
    });
  }

  // 5. Loan Repayment Calculator
  const loanAmount = document.querySelector('#loanAmount');
  const interestRate = document.querySelector('#interestRate');
  if (loanAmount && interestRate) {
    const loanOutput = document.querySelector('#loanOutput');
    const rateOutput = document.querySelector('#rateOutput');
    const repaymentOutput = document.querySelector('#repaymentOutput');
    const principalOutput = document.querySelector('#principalOutput');
    const interestOutput = document.querySelector('#interestOutput');
    const totalOutput = document.querySelector('#totalOutput');
    const principalBar = document.querySelector('#principalBar');

    const updateCalculator = () => {
      const principal = Number(loanAmount.value);
      const rate = Number(interestRate.value) / 100 / 12;
      const months = 30 * 12; // 30-year term
      const payment = principal * (rate * ((1 + rate) ** months)) / (((1 + rate) ** months) - 1);
      const total = payment * months;
      const interest = total - principal;
      const formatMoney = (value) => `$${Math.round(value).toLocaleString('en-AU')}`;

      if (loanOutput) loanOutput.textContent = formatMoney(principal);
      if (rateOutput) rateOutput.textContent = `${Number(interestRate.value).toFixed(2)}% p.a.`;
      if (repaymentOutput) repaymentOutput.innerHTML = `${formatMoney(payment)}<small>/month</small>`;
      if (principalOutput) principalOutput.textContent = formatMoney(principal);
      if (interestOutput) interestOutput.textContent = formatMoney(interest);
      if (totalOutput) totalOutput.textContent = formatMoney(total);

      if (principalBar && total > 0) {
        const percent = Math.min(100, Math.max(10, (principal / total) * 100));
        principalBar.style.width = `${percent}%`;
      }
    };

    loanAmount.addEventListener('input', updateCalculator);
    interestRate.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // 6. Calculator Tabs
  document.querySelectorAll('.calc-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.calc-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // 7. Insight Category Filters
  const filterButtons = document.querySelectorAll('.filter-button');
  const insightEntries = document.querySelectorAll('.insight-entry');
  if (filterButtons.length && insightEntries.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((item) => item.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        insightEntries.forEach((entry) => {
          entry.classList.toggle('d-none', filter !== 'all' && entry.dataset.category !== filter);
        });
      });
    });
  }

  // 8. Form Handlers (Contact, Enquiry Modal & Newsletter)
  const enquiryForm = document.querySelector('#enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#enqName')?.value || 'Client';
      const service = document.querySelector('#enqService')?.value || 'General Finance';
      const msgBox = enquiryForm.querySelector('.enquiry-feedback');
      if (msgBox) {
        msgBox.innerHTML = `
          <div class="alert alert-success mt-3 mb-0" role="alert">
            <h6 class="alert-heading fw-bold mb-1">Enquiry Successfully Dispatched!</h6>
            <p class="small mb-1">Thank you, <strong>${name}</strong>. Your ${service} enquiry has been logged and routed to our designated credit desk at <strong>hello@lendpartners.com.au</strong>.</p>
            <p class="small text-muted mb-0">A senior lending adviser will contact you within 2 business hours.</p>
          </div>`;
      }
      enquiryForm.reset();
    });
  }

  // Pre-fill Enquiry Modal service if clicked from specific card
  document.querySelectorAll('[data-bs-target="#enquiryModal"]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const service = trigger.getAttribute('data-service');
      const select = document.querySelector('#enqService');
      if (service && select) {
        select.value = service;
      }
    });
  });

  // Standard Form Handlers (Contact & Newsletter)
  document.querySelectorAll('form:not(#enquiryForm):not(#chatForm)').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = form.querySelector('.form-message');
      if (message) {
        message.textContent = form.id === 'contactForm'
          ? 'Thank you. A strategist has received your inquiry and will be in touch shortly.'
          : 'You’re on the list. Watch your inbox for the next note.';
        message.classList.add('visible');
      }
      if (form.id === 'contactForm') {
        form.reset();
      }
    });
  });

  // 9. Interactive Lead Capture Chatbot
  const chatbotToggle = document.querySelector('#chatbotToggle');
  const chatbotWindow = document.querySelector('#chatbotWindow');
  const chatbotClose = document.querySelector('#chatbotClose');
  const chatMessages = document.querySelector('#chatMessages');
  const chatForm = document.querySelector('#chatForm');
  const chatInput = document.querySelector('#chatInput');

  if (chatbotToggle && chatbotWindow && chatbotClose) {
    const toggleChat = () => chatbotWindow.classList.toggle('open');
    chatbotToggle.addEventListener('click', toggleChat);
    chatbotClose.addEventListener('click', () => chatbotWindow.classList.remove('open'));

    const addMessage = (text, sender = 'bot') => {
      if (!chatMessages) return;
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${sender === 'user' ? 'chat-msg-user' : 'chat-msg-bot'}`;
      msgDiv.innerHTML = text;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Quick action buttons inside chatbot
    document.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('chat-action-btn')) {
        const action = e.target.getAttribute('data-action');
        const text = e.target.textContent;
        addMessage(text, 'user');

        setTimeout(() => {
          if (action === 'borrowing') {
            addMessage(`
              <strong>Borrowing Capacity Scan:</strong><br>
              We model borrowing power across 60+ lenders, accounting for negative gearing, bonuses, and trust structures.<br><br>
              Would you like to test numbers in our <a href="index.html#calculator" style="color:var(--blue-600);text-decoration:underline;">Calculator</a>, or book a fast 15-min assessment?
            `);
          } else if (action === 'celeste') {
            addMessage(`
              <strong>Director Consultation with Celeste Thomas:</strong><br>
              Celeste works directly with developers, business owners, and complex residential investors.<br><br>
              Please enter your <strong>Name and Phone Number</strong> below, and her desk will schedule a priority callback.
            `);
          } else if (action === 'commercial') {
            addMessage(`
              <strong>Commercial & Development Finance:</strong><br>
              We arrange senior bank debt, non-bank private credit, mezzanine facilities, and lease-doc options up to 75% LVR.<br><br>
              What is your target property type or purchase amount?
            `);
          } else if (action === 'enquiry') {
            const modalEl = document.querySelector('#enquiryModal');
            if (modalEl && window.bootstrap) {
              const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
              modal.show();
              addMessage(`Opened our priority enquiry form for you! Fill in your details and we’ll reach out promptly.`);
            }
          }
        }, 450);
      }
    });

    if (chatForm && chatInput) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = chatInput.value.trim();
        if (!userText) return;
        addMessage(userText, 'user');
        chatInput.value = '';

        setTimeout(() => {
          // Intelligent capture reply
          addMessage(`
            Thank you. Your message has been routed to our Melbourne advisory desk at <strong>hello@lendpartners.com.au</strong>.<br><br>
            If you need urgent assistance, feel free to call our direct line on <a href="tel:1300221888" style="color:var(--blue-600);font-weight:bold;">1300 221 888</a>.
          `);
        }, 500);
      });
    }
  }

  // 12. Hero Video Autoplay Assurance
  const heroVideo = document.querySelector('.hero-bg-video');
  if (heroVideo) {
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Handled silently if autoplay restricted by device power saving
      });
    }
  }
});
