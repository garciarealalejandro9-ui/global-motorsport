// ==========================================
// CENTRALIZADOR DE BANDERAS - GLOBAL MOTORSPORT
// ==========================================

// Diccionario universal incluyendo regiones específicas e internacionales
const countryCodes = {
    // Oceanía y Asia
    "australia": "au", "albert park": "au",
    "china": "cn", "shanghai": "cn",
    "japan": "jp", "suzuka": "jp",
    "bahrain": "bh",
    "saudi arabia": "sa", "arabia saudí": "sa", "jeddah": "sa",
    "azerbaijan": "az", "baku": "az", "azerbaiyán": "az",
    "singapore": "sg", "marina bay": "sg", "singapur": "sg",
    "qatar": "qa", "lusail": "qa", "catar": "qa",
    "abu dhabi": "ae", "yas marina": "ae",

    // Europa y Regiones Especiales
    "monaco": "mc",
    "spain": "es", "españa": "es", "madrid": "es",
    
    // Banderas regionales específicas (usando URLs directas o imágenes locales optimizadas)
    // Usaremos un enlace gráfico o miniatura limpia para Cataluña y Emilia-Romaña
    "catalunya": "catalunya", "cataluña": "cataluña", "barcelona": "cataluña",
    "emilia romagna": "emilia-romagna", "emilia-romagna": "emilia-romagna", "imola": "emilia-romagna",

    "austria": "at", "red bull ring": "at",
    "uk": "gb", "britain": "gb", "british": "gb", "silverstone": "gb", "gran bretaña": "gb",
    "belgium": "be", "spa": "be", "belgica": "be", "bélgica": "be",
    "hungary": "hu", "hungaroring": "hu", "hungría": "hu",
    "netherlands": "nl", "dutch": "nl", "zandvoort": "nl", "países bajos": "nl", "holanda": "nl",
    
    // Italia general (excluyendo Imola que va por separado)
    "italy": "it", "monza": "it", "italia": "it",
    
    "portugal": "pt", "algarve": "pt",
    "turkey": "tr", "turquía": "tr", "istanbul": "tr",

    // América
    "miami": "us",
    "canada": "ca", "gilles villeneuve": "ca", "montreal": "ca",
    "united states": "us", "us": "us", "usa": "usa", "austin": "us", "cota": "us", "estados unidos": "us",
    "mexico": "mx", "méxico": "mx", "hermanos rodríguez": "mx",
    "brazil": "br", "brasil": "br", "são paulo": "br", "sao paulo": "br", "interlagos": "br",
    "las vegas": "us"
};

const driverNationalityCodes = {
    "british": "gb", "italian": "it", "dutch": "nl", "monegasque": "mc",
    "australian": "au", "spanish": "es", "mexican": "mx", "french": "fr",
    "german": "de", "thai": "th", "japanese": "jp", "chinese": "cn",
    "danish": "dk", "canadian": "ca", "finnish": "fi", "argentine": "ar",
    "new zealander": "nz", "brazilian": "br"
};

/**
 * Devuelve la etiqueta HTML <img> con el estilo unificado de tarjeta redondeada.
 */
function getFlagHTML(raceName = "", circuitName = "") {
    const combined = (raceName + " " + circuitName).toLowerCase();
    
    for (let key in countryCodes) {
        if (combined.includes(key)) {
            const val = countryCodes[key];
            
            // Si es una región especial, podemos apuntar a una imagen local en tu proyecto (ej: assets/flags/regions/)
            // o a un recurso gráfico específico.
            if (val === "cataluña" || val === "catalunya") {
                // Puedes guardar la imagen de la bandera de Cataluña en tu repo como assets/flags/catalonia.png
                return `<img src="assets/flags/catalonia.png" alt="Cataluña" class="country-flag-img" loading="lazy">`;
            }
            if (val === "emilia-romagna") {
                // Puedes guardar la imagen de Emilia-Romaña en tu repo como assets/flags/emilia-romagna.png
                return `<img src="assets/flags/emilia-romagna.png" alt="Emilia-Romaña" class="country-flag-img" loading="lazy">`;
            }
            
            // Para países normales, tira de FlagCDN
            return `<img src="https://flagcdn.com/w40/${val}.png" alt="${key}" class="country-flag-img" loading="lazy">`;
        }
    }
    
    return `<span class="flag-fallback">🏁</span>`;
}

function getDriverFlagHTML(nationality = "") {
    const nat = nationality.toLowerCase();
    if (driverNationalityCodes[nat]) {
        const code = driverNationalityCodes[nat];
        return `<img src="https://flagcdn.com/w40/${code}.png" alt="${nationality}" class="country-flag-img" loading="lazy">`;
    }
    return `<span class="flag-fallback">🏁</span>`;
}
