/* =========================================================
   PORTAFOLIO WEB PERSONAL - HENRY ALVAREZ AQUIJE
   JavaScript Vanilla - Funcionalidades Interactivas
   ========================================================= */

// ===================== DOM READY =====================
document.addEventListener('DOMContentLoaded', function() {
    initWelcomeMessage();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initActiveNav();
    initBackToTop();
    initThemeToggle();
    initScrollReveal();
    initSkillBars();
});

// ===================== MENSAJE DE BIENVENIDA =====================
function initWelcomeMessage() {
    const welcomeOverlay = document.getElementById('welcomeOverlay');

    if (welcomeOverlay) {
        // Mostrar mensaje por 2.5 segundos, luego ocultar
        setTimeout(() => {
            welcomeOverlay.classList.add('hidden');
        }, 2500);

        // Eliminar del DOM después de la transición
        setTimeout(() => {
            welcomeOverlay.style.display = 'none';
        }, 3300);
    }
}

// ===================== HEADER SCROLL =====================
function initHeaderScroll() {
    const header = document.getElementById('header');

    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===================== MENÚ MÓVIL =====================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !nav) return;

    // Toggle del menú
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');

        // Prevenir scroll cuando el menú está abierto
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===================== SCROLL SUAVE =====================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botones del hero
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================== NAVEGACIÓN ACTIVA =====================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.getElementById('header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===================== BOTÓN VOLVER ARRIBA =====================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================== MODO OSCURO / CLARO =====================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (!themeToggle) return;

    // Verificar preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');

        // Guardar preferencia
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ===================== SCROLL REVEAL =====================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.sobre-mi-card, .skill-card, .proyecto-card, .estadistica-item, .contacto-wrapper'
    );

    if (revealElements.length === 0) return;

    // Agregar clase reveal a los elementos
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Dejar de observar una vez revelado
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// ===================== BARRAS DE PROGRESO =====================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    if (skillBars.length === 0) return;

    // Guardar el ancho original y resetear a 0
    skillBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.dataset.width = targetWidth;
        bar.style.width = '0%';
    });

    const barsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.dataset.width;

                // Animar la barra después de un pequeño delay
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 200);

                barsObserver.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        barsObserver.observe(bar);
    });
}

// ===================== VALIDACIÓN DE FORMULARIO (si se agrega) =====================
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        const value = input.value.trim();

        // Validar campos vacíos
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }

        // Validar email
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                input.classList.add('error');
            }
        }

        // Validar longitud mínima del mensaje
        if (input.name === 'mensaje' && value.length < 10) {
            isValid = false;
            input.classList.add('error');
        }
    });

    return isValid;
}

// ===================== UTILIDADES =====================
// Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle para eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
