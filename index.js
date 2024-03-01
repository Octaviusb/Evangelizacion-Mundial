function translatePage() {
  // Obtiene el idioma deseado (puedes personalizar esto)
  const targetLanguage = prompt("Ingresa el código de idioma destino (por ejemplo, 'es' para español):");

  // Traduce el contenido de la página
  document.querySelectorAll('body *').forEach(element => {
    translateElement(element, targetLanguage);
  });
}

async function translateElement(element, targetLanguage) {
  try {
    const text = element.innerText;
    const translatedText = await translate(text, { to: targetLanguage });
    element.innerText = translatedText.text;
  } catch (error) {
    console.error("Error en la traducción:", error);
  }
}
