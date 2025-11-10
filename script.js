// script.js - Menu Mobile Funcional
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== INICIANDO SCRIPT ===');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    console.log('Menu toggle encontrado:', !!menuToggle);
    console.log('Nav encontrado:', !!nav);
    
    // Clique no menu hamburguer
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Menu clicado!');
            
            // Alternar classes
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            body.classList.toggle('no-scroll');
            
            console.log('Nav active:', nav.classList.contains('active'));
            console.log('MenuToggle active:', menuToggle.classList.contains('active'));
        });
    }
    
    // Fechar menu ao clicar nos links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Link clicado - fechando menu');
            closeMobileMenu();
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    function closeMobileMenu() {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('no-scroll');
    }
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
        });
    }
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});

// Prevenir scroll quando menu estiver aberto
const style = document.createElement('style');
style.textContent = `
    body.no-scroll {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .menu-toggle {
            display: flex !important;
        }
    }
`;
document.head.appendChild(style);
