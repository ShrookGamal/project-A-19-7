window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader-screen');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = '0.6s';
            setTimeout(() => loader.remove(), 600);
        }
    }, 1500);
});

const openMenu = document.getElementById('open-menu');
const closeMenu = document.getElementById('close-menu');
const sideMenu = document.getElementById('side-menu');
const menuBackdrop = document.querySelector('.menu-backdrop');
const menuLinks = document.querySelectorAll('.m-link');

function toggleMenu() {
    sideMenu.classList.toggle('active');
    document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : 'auto';
}

if (openMenu) openMenu.addEventListener('click', toggleMenu);
if (closeMenu) closeMenu.addEventListener('click', toggleMenu);
if (menuBackdrop) menuBackdrop.addEventListener('click', toggleMenu);

menuLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

const siteHeader = document.querySelector('.slim-nav');
const sections = document.querySelectorAll('section, main');
const navLi = document.querySelectorAll('.desktop-links li');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        siteHeader.style.height = '65px';
        siteHeader.style.background = 'rgba(10, 14, 20, 0.95)';
    } else {
        siteHeader.style.height = '75px';
        siteHeader.style.background = 'rgba(255, 255, 255, 0.05)';
    }

    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((li) => {
        li.classList.remove("active");
        const linkHref = li.querySelector("a").getAttribute("href").substring(1);
        if (linkHref === current) {
            li.classList.add("active");
        }
    });
});

document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.mesh-shape, .geometric-shape');
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    shapes.forEach((shape, i) => {
        const factor = (i + 1) * 0.5;
        shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});

const statNumbers = document.querySelectorAll('.stat-number');
const barFills = document.querySelectorAll('.bar-fill');
let animatedStats = false;

const startStatsAnimation = () => {
    statNumbers.forEach(num => {
        const target = +num.getAttribute('data-target');
        let count = 0;
        const updateCount = () => {
            const speed = target / 50;
            if (count < target) {
                count += speed;
                num.innerText = Math.ceil(count);
                setTimeout(updateCount, 30);
            } else {
                num.innerText = target;
            }
        };
        updateCount();
    });

    barFills.forEach(bar => {
        const width = bar.style.getPropertyValue('--w');
        bar.style.width = width;
    });
};

const observerGeneral = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-section') && !animatedStats) {
                startStatsAnimation();
                animatedStats = true;
            }
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translate(0, 0) scale(1)';
        }
    });
}, { threshold: 0.2 });

const revealElements = document.querySelectorAll('.v-card, .vision-image-side, .s-card, .animate-scroll, .about-section');
revealElements.forEach(el => {
    if (!el.classList.contains('about-section')) {
        el.style.opacity = '0';
        if (el.classList.contains('v-card')) el.style.transform = 'translateX(-50px)';
        if (el.classList.contains('s-card') || el.classList.contains('animate-scroll')) el.style.transform = 'translateY(50px)';
    }
    observerGeneral.observe(el);
});
function sendFinalWhatsApp() {
    const name = document.getElementById('fnName').value;
    const service = document.getElementById('fnService').value;
    const msg = document.getElementById('fnMsg').value;

    if (!name || !service) {
        alert("لطفاً، املأ الاسم والخدمة");
        return;
    }

    const phone = "966560704020";
    const text = `*طلب خدمة من إيبرا مودرن*%0A*الاسم:* ${name}%0A*الخدمة:* ${service}%0A*الملاحظات:* ${msg}`;
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});