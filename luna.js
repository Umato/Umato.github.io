var lunaConfig = {};

fetch('https://umato.github.io/LunaSkin/config.json?v=' + Date.now(), { cache: 'no-store' })
  .then(response => {
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
  })
  .then(response => response.json())
  .then(function(cfg) {
    lunaConfig = cfg;
    const ImagesPath = lunaConfig.Web.ImagesPath;
    const images = lunaConfig.Images;

    for (let key in images) {
      Game.Loader.Replace(key, ImagesPath + images[key]);
    }

    const translations = {
      "%1 cookie": ["%1 луна-печенек", "%1 луна-печенек"]
    };
    if (ModLanguage('*', translations)) {
      console.log("Language updated");
    } else {
      console.log("Error while updating language");
    }

    const bakeryName = document.getElementById('bakeryName');
    if (bakeryName) bakeryName.innerHTML = 'пекарня луны';
  })
  .catch(err => console.error('LunaSkin fetch error:', err));
