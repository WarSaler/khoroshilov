// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Переключение мобильного меню
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Анимация гамбургера
        navToggle.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Плавная прокрутка к разделам
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Учитываем высоту навигации
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Активная ссылка в навигации при прокрутке
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

    // Фильтрация портфолио
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс к нажатой кнопке
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Анимация навыков при прокрутке
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.resume');

    function animateSkills() {
        const skillsSectionTop = skillsSection.offsetTop;
        const skillsSectionHeight = skillsSection.clientHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        if (scrollY + windowHeight > skillsSectionTop + 200) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    }

    let skillsAnimated = false;
    window.addEventListener('scroll', function() {
        if (!skillsAnimated) {
            animateSkills();
            skillsAnimated = true;
        }
    });

    // Обработка формы контактов
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Простая валидация
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все поля');
                return;
            }

            // Здесь можно добавить отправку данных на сервер
            alert('Спасибо за сообщение! Я свяжусь с вами в ближайшее время.');
            
            // Очищаем форму
            this.reset();
        });
    }

    // Обработка формы обратной связи (Formspree)
    const form = document.getElementById('contactForm');
    const status = document.getElementById('form-status');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            status.textContent = '';
            status.className = 'form-status';
            const data = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    status.textContent = 'Спасибо! Ваше сообщение отправлено.';
                    status.classList.add('success');
                    form.reset();
                } else {
                    status.textContent = 'Ошибка при отправке. Попробуйте ещё раз.';
                    status.classList.add('error');
                }
            } catch (error) {
                status.textContent = 'Ошибка сети. Попробуйте позже.';
                status.classList.add('error');
            }
        });
    }

    // Печатающий эффект для заголовка
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Применяем эффект к заголовку
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 500);
    }

    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами
    const animatedElements = document.querySelectorAll('.activity-item, .timeline-item, .skill-item, .portfolio-item, .contact-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Добавляем CSS для анимации
    const style = document.createElement('style');
    style.textContent = `
        .activity-item,
        .timeline-item,
        .skill-item,
        .portfolio-item,
        .contact-item {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .activity-item.animate,
        .timeline-item.animate,
        .skill-item.animate,
        .portfolio-item.animate,
        .contact-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-toggle.active .bar:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active .bar:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);

    // Плавное появление страницы
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // Кнопка "Наверх"
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #3498db;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 18px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // Показать/скрыть кнопку при прокрутке
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Прокрутка наверх при клике
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Функция для загрузки данных из резюме (можно расширить)
function loadResumeData() {
    // Здесь можно добавить код для загрузки данных из PDF или другого источника
    console.log('Загрузка данных резюме...');
}

// Функция для обновления контактной информации
function updateContactInfo(email, phone, location) {
    const emailElements = document.querySelectorAll('[data-contact="email"]');
    const phoneElements = document.querySelectorAll('[data-contact="phone"]');
    const locationElements = document.querySelectorAll('[data-contact="location"]');

    emailElements.forEach(el => el.textContent = email);
    phoneElements.forEach(el => el.textContent = phone);
    locationElements.forEach(el => el.textContent = location);
}

// Функция для добавления нового элемента в портфолио
function addPortfolioItem(title, description, category, link) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item';
    portfolioItem.setAttribute('data-category', category);
    
    portfolioItem.innerHTML = `
        <div class="portfolio-content">
            <h4>${title}</h4>
            <p>${description}</p>
            <a href="${link}" class="btn-link">Подробнее</a>
        </div>
    `;
    
    portfolioGrid.appendChild(portfolioItem);
}

// Функция для добавления нового навыка
function addSkill(name, percentage) {
    const skillsGrid = document.querySelector('.skills-grid');
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    
    skillItem.innerHTML = `
        <h4>${name}</h4>
        <div class="skill-bar">
            <div class="skill-progress" style="width: ${percentage}%"></div>
        </div>
        <span>${percentage}%</span>
    `;
    
    skillsGrid.appendChild(skillItem);
} 