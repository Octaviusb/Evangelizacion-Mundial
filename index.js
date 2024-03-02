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
<<<<<<< HEAD
  try {
    const text = element.innerText;
    const translatedText = await translate(text, { to: targetLanguage });
    element.innerText = translatedText.text;
  } catch (error) {
    console.error("Error en la traducción:", error);
  }
=======
  // Obtiene el texto del elemento
  const text = element.innerText;

  // Traduce el texto al idioma deseado usando google-translate-api
  const translatedText = await translate(text, { to: targetLanguage });

  // Asigna el texto traducido al elemento
  element.innerText = translatedText.text;
>>>>>>> 67a3a659cf9cb7c7a6ea8df9c2bb43a66f752d51
}
