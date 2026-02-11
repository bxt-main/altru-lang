// Language switching functionality
function switchLanguage(lang) {
    // Hide all language sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected language section
    const langSection = document.getElementById(`intro-${lang}`);
    if (langSection) {
        langSection.classList.remove('hidden');
    }
    
    // Update button states
    document.querySelectorAll('.language-switch button').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`lang-${lang}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Store preference in localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update button text
    const themeBtn = document.querySelector('.theme-toggle button');
    if (themeBtn) {
        themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
}

// Initialize based on user preferences
document.addEventListener('DOMContentLoaded', function() {
    // Set language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    const userLang = navigator.language.split('-')[0];
    const preferredLang = ['zh', 'en'].includes(userLang) ? userLang : 'en';
    const finalLang = localStorage.getItem('preferredLanguage') || preferredLang;
    
    switchLanguage(finalLang);
    
    // Set theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const finalTheme = localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');
    
    document.body.setAttribute('data-theme', finalTheme);
    const themeBtn = document.querySelector('.theme-toggle button');
    if (themeBtn) {
        themeBtn.textContent = finalTheme === 'dark' ? '☀️' : '🌙';
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Plausible analytics integration
if (typeof plausible !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        plausible('pageview');
    });
}