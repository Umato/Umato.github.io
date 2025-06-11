var lunaConfig = {};

fetch('https://umato.github.io/config.json')
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
    if (bakeryName) bakeryName.innerHTML = 'Luna Bakery';
  })
  .catch(err => console.error('LunaSkin fetch error:', err));
