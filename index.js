googleTranslateElementInit = () => {
  new google.translate.TranslateElement({ pageLanguage: 'es' }, 'google_translate_element');
}

async function translatePage() {
  const selectElement = document.createElement('select');
  selectElement.innerHTML = `
    <option value="en">Inglés</option>
    <option value="fr">Francés</option>
    <option value="de">Alemán</option>
    <option value="it">Italiano</option>
    <!-- Agrega más opciones de idioma según tus necesidades -->
  `;

  const targetLanguage = await promptWithSelect("Selecciona el idioma destino:", selectElement);

  if (targetLanguage) {
    document.querySelectorAll('body *').forEach(async element => {
      try {
        const text = element.innerText;
        const translatedText = await translateWithGoogleAPI(text, targetLanguage, apiKey);
        element.innerText = translatedText;
      } catch (error) {
        console.error("Error en la traducción:", error);
      }
    });
  } else {
    console.log("No se seleccionó ningún idioma destino.");
  }
}

async function promptWithSelect(message, selectElement) {
  return new Promise((resolve, reject) => {
    const wrapperElement = document.createElement('div');
    const messageElement = document.createElement('div');
    const buttonElement = document.createElement('button');

    messageElement.textContent = message;
    buttonElement.textContent = "Traducir";

    wrapperElement.appendChild(messageElement);
    wrapperElement.appendChild(selectElement);
    wrapperElement.appendChild(buttonElement);

    const closePrompt = () => {
      document.body.removeChild(wrapperElement);
      reject(null);
    };

    buttonElement.addEventListener('click', () => {
      const selectedValue = selectElement.value;
      document.body.removeChild(wrapperElement);
      resolve(selectedValue);
    });

    document.body.appendChild(wrapperElement);
  });
}

async function translateWithGoogleAPI(text, targetLanguage, apiKey) {
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${AIzaSyA7TZnzkop_2v2s0Lj52JW-eCuJ-c69u-k}`;
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