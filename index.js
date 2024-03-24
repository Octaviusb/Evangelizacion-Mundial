function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'es' }, 'google_translate_element');
}

async function translatePage() {
  const selectElement = document.createElement('select');
  selectElement.innerHTML = `
  <option value="af">Afrikáans</option>
  <option value="sq">Albanés</option>
  <option value="de">Alemán</option>
  <option value="am">Amhárico</option>
  <option value="ar">Árabe</option>
  <option value="hy">Armenio</option>
  <option value="az">Azerí</option>
  <option value="eu">Euskera</option>
  <option value="bn">Bengalí</option>
  <option value="be">Bielorruso</option>
  <option value="my">Birmano</option>
  <option value="bs">Bosnio</option>
  <option value="bg">Búlgaro</option>
  <option value="km">Camboyano</option>
  <option value="kn">Canarés</option>
  <option value="ca">Catalán</option>
  <option value="ceb">Cebuano</option>
  <option value="ny">Chichewa</option>
  <option value="zh-CN">Chino simplificado</option>
  <option value="zh-TW">Chino tradicional</option>
  <option value="si">Cingalés</option>
  <option value="ko">Coreano</option>
  <option value="ht">Criollo haitiano</option>
  <option value="hr">Croata</option>
  <option value="da">Danés</option>
  <option value="sk">Eslovaco</option>
  <option value="sl">Esloveno</option>
  <option value="es">Español</option>
  <option value="eo">Esperanto</option>
  <option value="et">Estonio</option>
  <option value="tl">Filipino</option>
  <option value="fi">Finlandés</option>
  <option value="fr">Francés</option>
  <option value="fy">Frisón</option>
  <option value="gd">Gaélico escocés</option>
  <option value="cy">Galés</option>
  <option value="gl">Gallego</option>
  <option value="ka">Georgiano</option>
  <option value="el">Griego</option>
  <option value="gu">Gujarati</option>
  <option value="ha">Hausa</option>
  <option value="haw">Hawaiano</option>
  <option value="iw">Hebreo</option>
  <option value="hi">Hindi</option>
  <option value="hmn">Hmong</option>
  <option value="hu">Húngaro</option>
  <option value="ig">Igbo</option>
  <option value="id">Indonesio</option>
  <option value="en">Inglés</option>
  <option value="ga">Irlandés</option>
  <option value="is">Islandés</option>
  <option value="it">Italiano</option>
  <option value="ja">Japonés</option>
  <option value="jw">Javanés</option>
  <option value="kk">Kazajo</option>
  <option value="rw">Kinyarwanda</option>
  <option value="ky">Kirguís</option>
  <option value="ku">Kurdo</option>
  <option value="la">Latín</option>
  <option value="lv">Letón</option>
  <option value="lt">Lituano</option>
  <option value="lb">Luxemburgués</option>
  <option value="mk">Macedonio</option>
  <option value="ml">Malayalam</option>
  <option value="ms">Malayo</option>
  <option value="mg">Malgache</option>
  <option value="mt">Maltés</option>
  <option value="mi">Maorí</option>
  <option value="mr">Maratí</option>
  <option value="mn">Mongol</option>
  <option value="ne">Nepalí</option>
  <option value="no">Noruego</option>
  <option value="or">Oriya</option>
  <option value="nl">Neerlandés</option>
  <option value="ps">Pastún</option>
  <option value="fa">Persa</option>
  <option value="pl">Polaco</option>
  <option value="pt">Portugués</option>
  <option value="pa">Panyabí</option>
  <option value="ro">Rumano</option>
  <option value="ru">Ruso</option>
  <option value="sm">Samoano</option>
  <option value="sr">Serbio</option>
  <option value="st">Sesotho</option>
  <option value="sn">Shona</option>
  <option value="sd">Sindhi</option>
  <option value="so">Somalí</option>
  <option value="su">Sundanés</option>
  <option value="sv">Sueco</option>
  <option value="sw">Suajili</option>
  <option value="tg">Tayiko</option>
  <option value="th">Tailandés</option>
  <option value="ta">Tamil</option>
  <option value="cs">Checo</option>
  <option value="te">Telugu</option>
  <option value="tr">Turco</option>
  <option value="uk">Ucraniano</option>
  <option value="ug">Uigur</option>
  <option value="ur">Urdu</option>
  <option value="uz">Uzbeko</option>
  <option value="vi">Vietnamita</option>
  <option value="xh">Xhosa</option>
  <option value="yi">Yidis</option>
  <option value="yo">Yoruba</option>
  <option value="zu">Zulú</option>
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
