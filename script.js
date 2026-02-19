// Inicialização do AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Menu Mobile
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animações dos números (stats)
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateNumber();
    });
}

// Trigger animation when stats section is visible
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animateNumbers();
            animated = true;
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.sobre-stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Cardápio tabs
const categoriaTabs = document.querySelectorAll('.categoria-tab');
const categoriaContents = document.querySelectorAll('.categoria-content');

categoriaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoriaTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all content
        categoriaContents.forEach(content => content.classList.remove('active'));
        
        // Show selected content
        const categoria = tab.getAttribute('data-categoria');
        document.getElementById(categoria).classList.add('active');
    });
});

// Galeria slider
const galeriaTrack = document.getElementById('galeriaTrack');
const galeriaPrev = document.getElementById('galeriaPrev');
const galeriaNext = document.getElementById('galeriaNext');
let currentSlide = 0;

if (galeriaTrack && galeriaPrev && galeriaNext) {
    const slides = document.querySelectorAll('.galeria-item');
    const slideWidth = slides[0]?.offsetWidth + 20 || 0;
    const maxSlide = slides.length - 3;
    
    galeriaNext.addEventListener('click', () => {
        if (currentSlide < maxSlide) {
            currentSlide++;
            galeriaTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }
    });
    
    galeriaPrev.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            galeriaTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }
    });
}

// Avaliações slider
const avaliacoesTrack = document.querySelector('.avaliacoes-track');
const dots = document.querySelectorAll('.dot');
let currentAvaliacao = 0;

if (avaliacoesTrack && dots.length > 0) {
    const avaliacoes = document.querySelectorAll('.avaliacao-card');
    const avaliacaoWidth = avaliacoes[0]?.offsetWidth + 20 || 0;
    const maxAvaliacao = avaliacoes.length - 3;
    
    function updateDots(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentAvaliacao = index;
            if (currentAvaliacao > maxAvaliacao) {
                currentAvaliacao = maxAvaliacao;
            }
            avaliacoesTrack.style.transform = `translateX(-${currentAvaliacao * avaliacaoWidth}px)`;
            updateDots(index);
        });
    });
}

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simulação de envio (aqui você pode integrar com uma API real)
        alert(`Obrigado por se inscrever! Enviaremos novidades para ${email}`);
        newsletterForm.reset();
    });
}

// WhatsApp click tracking
const whatsappBtn = document.getElementById('whatsappBtn');

if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
        // Você pode adicionar tracking aqui (Google Analytics, Facebook Pixel, etc.)
        console.log('WhatsApp clicked - lead tracking');
        
        // Exemplo de evento do Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'
            });
        }
    });
}

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Prevenir que imagens quebradas mostrem ícone de erro
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

// Adicionar classe active ao link de navegação atual
function setActiveLink() {
    const currentHash = window.location.hash;
    if (currentHash) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('active');
            }
        });
    }
}

// Chamar função quando a página carregar
window.addEventListener('load', setActiveLink);

// Detectar mudanças na hash
window.addEventListener('hashchange', setActiveLink);

// Otimização de performance
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Fechar menu mobile ao redimensionar para desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Adicionar microinterações nos botões
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
});

// Loading state para formulário
const contactForm = document.querySelector('.newsletter-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        // Simular envio (remover em produção)
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 2000);
    });
}

// Detectar posição do scroll para animações
window.addEventListener('scroll', () => {
    // Adicionar parallax effect no hero
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Console message personalizada (opcional)
console.log('%c🔥 Espetinho Brasil - O sabor da Zona Leste!', 'color: #f3b229; font-size: 16px; font-weight: bold;');
console.log('%c📱 Peça pelo WhatsApp: (11) 99999-9999', 'color: #25d366; font-size: 14px;');