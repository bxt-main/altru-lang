// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('lang-toggle');
    const currentLang = localStorage.getItem('preferred-lang') || 'zh';
    
    // Set initial language
    setLanguage(currentLang);
    
    // Handle language toggle
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            setLanguage(newLang);
            localStorage.setItem('preferred-lang', newLang);
        });
    }
    
    // Handle navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetLang = this.dataset.lang;
            if (targetLang) {
                setLanguage(targetLang);
                localStorage.setItem('preferred-lang', targetLang);
            }
        });
    });
});

function setLanguage(lang) {
    const isChinese = lang === 'zh';
    document.body.classList.toggle('lang-zh', isChinese);
    document.body.classList.toggle('lang-en', !isChinese);
    
    // Update language toggle text
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = isChinese ? 'English' : '中文';
    }
    
    // Hide/show language-specific content
    const chineseElements = document.querySelectorAll('[data-lang="zh"]');
    const englishElements = document.querySelectorAll('[data-lang="en"]');
    
    chineseElements.forEach(el => el.style.display = isChinese ? 'inline' : 'none');
    englishElements.forEach(el => el.style.display = isChinese ? 'none' : 'inline');
}