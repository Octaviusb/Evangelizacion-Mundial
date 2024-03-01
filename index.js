// Espera a que la API de Google Translate se cargue
googleTranslateElementInit = () => {
  new google.translate.TranslateElement({pageLanguage: 'es'}, 'google_translate_element');
}

function translatePage() {
  // Obtiene el idioma deseado (puedes personalizar esto)
  const targetLanguage = prompt("Ingresa el código de idioma destino (por ejemplo, 'es' para español):");

  // Traduce el contenido de la página
  document.querySelectorAll('body *').forEach(element => {
    translateElement(element, targetLanguage);
  });
}

async function translateElement(element, targetLanguage) {
  // Obtiene el texto del elemento
  const text = element.innerText;

  // Traduce el texto al idioma deseado usando google-translate-api
  const translatedText = await translate(text, { to: targetLanguage });

  // Asigna el texto traducido al elemento
  element.innerText = translatedText.text;
}
