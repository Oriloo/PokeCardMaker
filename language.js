// Fonction utilitaire pour récupérer une valeur imbriquée à partir d'une clé sous forme "a.b.c"
function getNestedValue(obj, key) {
    return key.split('.').reduce((o, k) => (o || {})[k], obj);
}

function updateTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = getNestedValue(translations, key);
        if (text) {
            el.textContent = text;
        }
    });
    if (translations["page-title"]) {
        document.title = translations["page-title"];
    }
}

// Fonction pour charger le fichier de langue (en.json ou fr.json)
function loadLanguage(lang) {
    fetch(`assets/language/${lang}.json`)
        .then(response => response.json())
        .then(translations => {
            updateTranslations(translations);
        })
        .catch(error => console.error("Erreur de chargement de la langue :", error));
}

// Au chargement, on vérifie si une langue a déjà été sélectionnée
const defaultLang = localStorage.getItem('selectedLanguage') || 'en';
document.getElementById("language-selector").value = defaultLang;
loadLanguage(defaultLang);

document.getElementById("language-selector").addEventListener("change", function () {
    loadLanguage(this.value);
});

// Charge la langue par défaut au démarrage (par exemple, English)
loadLanguage("en");
