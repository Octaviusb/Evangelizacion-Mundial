var url = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDhm4MWUafQ72DSvq2e_BbzxaGT1ENdAcM&source=auto&target=' + targetLanguage + '&q=' + encodeURI(inputText);


// Espera a que la API de Google Translate se cargue
googleTranslateElementInit = () => {
  new google.translate.TranslateElement({ pageLanguage: 'es' }, 'google_translate_element');
}

async function translatePage() {
  const targetLanguage = prompt("Ingresa el código de idioma destino (por ejemplo, 'es' para español):");

  document.querySelectorAll('body *').forEach(async element => {
    try {
      const text = element.innerText;
      const translatedText = await translateWithGoogleAPI(text, targetLanguage, apiKey);
      element.innerText = translatedText;
    } catch (error) {
      console.error("Error en la traducción:", error);
    }
  });
}

async function translateWithGoogleAPI(text, targetLanguage, apiKey) {
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      target: targetLanguage,
    }),
  });

  const data = await response.json();

  if (data && data.data && data.data.translations && data.data.translations.length > 0) {
    return data.data.translations[0].translatedText;
  } else {
    throw new Error('No se pudo realizar la traducción.');
  }
}
