// ==================== GLOBAL ELEMENT ====================
const navbar = document.getElementById('mainNavbar');
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById("backToTop");
const dropdowns = document.querySelectorAll('.dropdown');


// ==================== SCROLL EFFECT ====================
window.addEventListener('scroll', function() {
    const scrollValue = window.scrollY || document.documentElement.scrollTop;

    // Navbar effect
    if (scrollValue > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to Top visibility
    if (backToTopBtn) {
        backToTopBtn.style.display = scrollValue > 300 ? "flex" : "none";
    }
});


// ==================== MOBILE MENU ====================
menu.addEventListener('click', function(e) {
    e.stopPropagation(); 
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Dropdown (mobile only)
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            this.classList.toggle('active');
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && !menuLinks.contains(e.target)) {
        menu.classList.remove('is-active');
        menuLinks.classList.remove('active');
    }
});


// ==================== BACK TO TOP ====================
if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ==================== INFOGRAFIS SLIDER ====================
let currentPage = 1;
const totalPages = 2;

function goToPage(pageNum) {
    const slider = document.getElementById('infoSlider');
    const totalPages = 2;

    if (pageNum < 1 || pageNum > totalPages) return;

    // Slide content
    const translateValue = (pageNum - 1) * 100;
    slider.style.transform = `translateX(-${translateValue}%)`;

    // Update active button
    document.querySelectorAll('.page-num').forEach(el => {
        el.classList.remove('active');
    });

    const activeBtn = document.getElementById('btn' + pageNum);
    if (activeBtn) activeBtn.classList.add('active');

    currentPage = pageNum;
}

function movePage(direction) {
    if (direction === 'next') {
        goToPage(currentPage + 1);
    } else {
        goToPage(currentPage - 1);
    }
}


// ==================== PDF PREVIEW ====================
function changePDF(pdfPath) {
    const iframe = document.getElementById('pdf-preview');
    const downloadLink = document.getElementById('pdf-download-link');
    const titleElement = document.getElementById('pdf-title');

    iframe.src = pdfPath;
    downloadLink.href = pdfPath;

    let fileName = pdfPath.split('/').pop().replace('.pdf', '');
    titleElement.innerText = "Dokumen: " + fileName;

    document.querySelector('.pdf-viewer-section').scrollIntoView({
        behavior: 'smooth'
    });
}


// ==================== FILTER DOKUMEN PPID ====================
function filterYear(year) {

    // Update button
    const buttons = document.querySelectorAll('.year-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText === year || (year === 'all' && btn.innerText === 'Semua')) {
            btn.classList.add('active');
        }
    });

    // Filter items
    const files = document.querySelectorAll('.file-item');
    files.forEach(file => {
        if (year === 'all' || file.getAttribute('data-year') === year) {
            file.style.display = 'flex';
        } else {
            file.style.display = 'none';
        }
    });
}


// ==================== FILTER SURVEI ====================
function filterSurvei(year) {

    document.querySelectorAll('.year-btn')
        .forEach(btn => btn.classList.remove('active'));

    event.target.classList.add('active');

    const cards = document.querySelectorAll('.survei-card');
    cards.forEach(card => {
        card.style.display =
            card.getAttribute('data-year') === year ? 'block' : 'none';
    });
}


// ==================== FAQ ACCORDION ====================
function toggleFAQ(element) {
    const parent = element.parentElement;
    const answer = element.nextElementSibling;

    parent.classList.toggle('active');

    if (parent.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
        answer.style.maxHeight = null;
    }
}


// ==================== FILTER STATUS ADUAN ====================
function filterStatus(status) {

    document.querySelectorAll('.status-btn')
        .forEach(btn => btn.classList.remove('active'));

    event.target.classList.add('active');

    const cards = document.querySelectorAll('.aduan-card');
    cards.forEach(card => {
        card.style.display =
            (status === 'all' || card.getAttribute('data-status') === status)
            ? 'block'
            : 'none';
    });
}


// ==================== VIDEO ====================
function openVideo(url) {
    window.open(url, '_blank');
}


// ==================== ACCESSIBILITY SYSTEM ====================
document.addEventListener('DOMContentLoaded', function() {

    const accessBtn = document.querySelector('.accessibility-btn');
    const accessMenu = document.querySelector('.accessibility-menu');
    const accessWrapper = document.querySelector('.accessibility-wrapper');
    const body = document.body;

    if (accessBtn && accessMenu) {

        // Toggle menu
        accessBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            accessMenu.classList.toggle('show');
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!accessWrapper.contains(e.target)) {
                accessMenu.classList.remove('show');
            }
        });

        // Zoom In
        let fontSizeLevel = 100;
        const btnZoom = document.querySelector('.zoom-text');

        if (btnZoom) {
            btnZoom.addEventListener('click', function(e) {
                e.preventDefault();
                fontSizeLevel += 10;
                if (fontSizeLevel > 150) fontSizeLevel = 100;

                document.documentElement.style.fontSize = fontSizeLevel + '%';
                document.body.style.fontSize = fontSizeLevel + '%';
            });
        }

        // High Contrast
        const btnContrast = document.querySelector('.high-contrast');

        if (btnContrast) {
            btnContrast.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.toggle('dark-mode');

                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('contrastMode', isDark ? 'enabled' : 'disabled');
            });
        }

        // Zoom Out
        const btnZoomOut = document.querySelector('.zoom-out-text');

        if (btnZoomOut) {
            btnZoomOut.addEventListener('click', function(e) {
                e.preventDefault();
                fontSizeLevel -= 10;
                if (fontSizeLevel < 80) fontSizeLevel = 80;

                document.documentElement.style.fontSize = fontSizeLevel + '%';
            });
        }
    }
});


// ==================== FADE ANIMATION ====================
document.addEventListener('DOMContentLoaded', function() {

    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('show', entry.isIntersecting);
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));
});