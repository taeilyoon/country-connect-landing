class MaeulLeum {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.setupSmoothScrolling();
    this.setupFormValidation();
  }

  setupEventListeners() {
    this.setupNavigation();
    this.setupCTAButtons();
    this.setupScrollEffects();
  }

  setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            this.scrollToSection(target);
            navMenu.classList.remove('active');
          }
        }
      });
    });

    window.addEventListener('scroll', () => {
      this.handleHeaderScroll();
    });
  }

  handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  setupCTAButtons() {
    const ctaButtons = document.querySelectorAll('[data-user-type]');

    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const userType = button.getAttribute('data-user-type');
        this.handleUserTypeSelection(userType);
      });
    });
  }

  handleUserTypeSelection(userType) {
    const modal = this.createUserTypeModal(userType);
    document.body.appendChild(modal);

    requestAnimationFrame(() => {
      modal.classList.add('active');
    });

    const closeBtn = modal.querySelector('.modal-close');
    const submitBtn = modal.querySelector('.modal-submit');

    closeBtn.addEventListener('click', () => {
      this.closeModal(modal);
    });

    submitBtn.addEventListener('click', () => {
      this.handleUserTypeSubmit(userType, modal);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });
  }

  createUserTypeModal(userType) {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const titles = {
      traveler: '2030 여행형으로 시작하기',
      host: '50+ 호스트로 등록하기'
    };

    const contents = {
      traveler: `
        <p>서울 근郊의 아름다운 마을에서 특별한 경험을 시작하세요!</p>
        <div class="modal-form">
          <div class="form-group">
            <label>이름</label>
            <input type="text" id="modal-name" placeholder="홍길동" required>
          </div>
          <div class="form-group">
            <label>연락처</label>
            <input type="tel" id="modal-phone" placeholder="010-0000-0000" required>
          </div>
          <div class="form-group">
            <label>이메일</label>
            <input type="email" id="modal-email" placeholder="email@example.com" required>
          </div>
          <div class="form-group">
            <label>선호 지역</label>
            <select id="modal-region" required>
              <option value="">선택해주세요</option>
              <option value="chuncheon">춘천</option>
              <option value="jeju">제주</option>
              <option value="jeonju">전주</option>
              <option value="gangneung">강릉</option>
              <option value="yeosu">여수</option>
            </select>
          </div>
        </div>
      `,
      host: `
        <p>성수기 구인난을 신뢰할 수 있는 파트너십으로 해결하세요!</p>
        <div class="modal-form">
          <div class="form-group">
            <label>업체명</label>
            <input type="text" id="modal-business" placeholder="마을게스트하우스" required>
          </div>
          <div class="form-group">
            <label>대표자명</label>
            <input type="text" id="modal-owner" placeholder="김사장님" required>
          </div>
          <div class="form-group">
            <label>연락처</label>
            <input type="tel" id="modal-phone" placeholder="010-0000-0000" required>
          </div>
          <div class="form-group">
            <label>업체 종류</label>
            <select id="modal-type" required>
              <option value="">선택해주세요</option>
              <option value="guesthouse">게스트하우스</option>
              <option value="cafe">카페</option>
              <option value="tourism">관광보조</option>
              <option value="farm">농촌체험</option>
            </select>
          </div>
        </div>
      `
    };

    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <h2>${titles[userType]}</h2>
        ${contents[userType]}
        <button class="btn btn-primary modal-submit">등록하기</button>
      </div>
    `;

    return modal;
  }

  handleUserTypeSubmit(userType, modal) {
    const formData = this.collectModalFormData(userType);

    if (this.validateModalData(formData)) {
      this.submitUserRegistration(userType, formData);
      this.closeModal(modal);
      this.showSuccessMessage(userType);
    } else {
      this.showErrorMessage();
    }
  }

  collectModalFormData(userType) {
    const data = {};

    if (userType === 'traveler') {
      data.name = document.getElementById('modal-name').value;
      data.phone = document.getElementById('modal-phone').value;
      data.email = document.getElementById('modal-email').value;
      data.region = document.getElementById('modal-region').value;
    } else {
      data.business = document.getElementById('modal-business').value;
      data.owner = document.getElementById('modal-owner').value;
      data.phone = document.getElementById('modal-phone').value;
      data.type = document.getElementById('modal-type').value;
    }

    return data;
  }

  validateModalData(data) {
    return Object.values(data).every(value => value && value.trim() !== '');
  }

  submitUserRegistration(userType, formData) {
    console.log('Submitting registration:', { userType, formData });
  }

  showSuccessMessage(userType) {
    const messages = {
      traveler: '여행형 등록이 완료되었습니다! 곧 연락드리겠습니다.',
      host: '호스트 등록이 완료되었습니다! 검증 후 서비스를 시작할 수 있습니다.'
    };

    this.showNotification(messages[userType], 'success');
  }

  showErrorMessage() {
    this.showNotification('모든 필드를 올바르게 입력해주세요.', 'error');
  }

  closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  }

  setupScrollEffects() {
    this.setupParallaxEffect();
    this.setupScrollIndicator();
  }

  setupParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
      });
    }
  }

  setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
          scrollIndicator.style.opacity = '0';
        } else {
          scrollIndicator.style.opacity = '1';
        }
      });
    }
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Add reveal class and observe elements
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(el => observer.observe(el));
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          this.scrollToSection(target);
        }
      });
    });
  }

  scrollToSection(target) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = target.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactFormSubmit(contactForm);
      });
    }
  }

  handleContactFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (this.validateContactForm(data)) {
      this.submitContactForm(data);
      this.showNotification('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.', 'success');
      form.reset();
    } else {
      this.showNotification('모든 필드를 올바르게 입력해주세요.', 'error');
    }
  }

  validateContactForm(data) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^01[016789]-?\d{3,4}-?\d{4}$/;

    return data.name &&
      data.email &&
      emailPattern.test(data.email) &&
      data.userType &&
      data.message;
  }

  submitContactForm(data) {
    console.log('Contact form submission:', data);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.classList.add('show');
    });

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  setupAnalytics() {
    this.trackPageView();
    this.setupCTATracking();
  }

  trackPageView() {
    console.log('Page view tracked:', window.location.pathname);
  }

  setupCTATracking() {
    const ctaButtons = document.querySelectorAll('[data-user-type]');
    ctaButtons.forEach(button => {
      button.addEventListener('click', () => {
        const userType = button.getAttribute('data-user-type');
        console.log('CTA clicked:', { userType, location: 'hero' });
      });
    });
  }
}

class StatsCounter {
  constructor() {
    this.counters = [];
    this.init();
  }

  init() {
    this.setupCounters();
    this.setupIntersectionObserver();
  }

  setupCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = this.parseNumber(stat.textContent);
      this.counters.push({
        element: stat,
        target: target,
        current: 0,
        formatted: stat.textContent
      });
    });
  }

  parseNumber(text) {
    const cleanText = text.replace(/[^\d]/g, '');
    return parseInt(cleanText, 10);
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounting();
          observer.disconnect();
        }
      });
    }, options);

    const statsSection = document.querySelector('.trust-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  startCounting() {
    this.counters.forEach(counter => {
      this.animateCounter(counter);
    });
  }

  animateCounter(counter) {
    const duration = 2000;
    const steps = 60;
    const increment = counter.target / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      counter.current = Math.min(counter.target, Math.floor(increment * currentStep));

      if (counter.formatted.includes('%')) {
        counter.element.textContent = counter.current + '%';
      } else {
        counter.element.textContent = counter.current.toLocaleString();
      }

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MaeulLeum();
  new StatsCounter();
});

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});