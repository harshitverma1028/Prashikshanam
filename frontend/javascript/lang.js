document.addEventListener('DOMContentLoaded', () => {
    const langSelector = document.getElementById('language-selector');
    const elementsToTranslate = document.querySelectorAll('[data-lang-key]');

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`json/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Could not load translations for language: ${lang}`);
            }
            const translations = await response.json();
            updatePageContent(translations);
            localStorage.setItem('selectedLanguage', lang);
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }
    function updatePageContent(translations) {
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });
    }

    // Add an event listener to the language selector
    langSelector.addEventListener('change', (event) => {
        loadTranslations(event.target.value);
    });

    // Load the language on page load
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    langSelector.value = savedLang;
    loadTranslations(savedLang);
});