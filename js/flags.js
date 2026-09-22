// ==========================================
// CENTRALIZADOR DE BANDERAS - GLOBAL MOTORSPORT
// ==========================================

const countryCodes = {
    // Países y circuitos internacionales habituales
    "australia": "au", "albert park": "au",
    "china": "cn", "chinese": "cn", "shanghai": "cn",
    "japan": "jp", "japanese": "jp", "suzuka": "jp",
    "bahrain": "bh",
    "saudi arabia": "sa", "arabia saudí": "sa", "jeddah": "sa",
    "azerbaijan": "az", "baku": "az", "azerbaiyán": "az",
    "singapore": "sg", "marina bay": "sg", "singapur": "sg",
    "qatar": "qa", "lusail": "qa", "catar": "qa",
    "abu dhabi": "ae", "yas marina": "ae",

    "monaco": "mc",
    "spain": "es", "españa": "es", "madrid": "es",
    
    // Regiones personalizadas simplificadas
    "catalunya": "catalunya", "cataluña": "catalunya", "barcelona": "catalunya",
    "emilia romagna": "emilia", "emilia-romagna": "emilia", "imola": "emilia",

    "austria": "at", "red bull ring": "at",
    "uk": "gb", "britain": "gb", "british": "gb", "silverstone": "gb", "gran bretaña": "gb",
    "belgium": "be", "spa": "be", "belgica": "be", "bélgica": "be",
    "hungary": "hu", "hungaroring": "hu", "hungría": "hu",
    "netherlands": "nl", "dutch": "nl", "zandvoort": "nl", "países bajos": "nl", "holanda": "nl",
    
    "italy": "it", "monza": "it", "italia": "it",
    
    "turkey": "tr", "turquía": "tr", "istanbul": "tr",

    "miami": "us",
    "canada": "ca", "gilles villeneuve": "ca", "montreal": "ca",
    "united states": "us", "us": "us", "usa": "us", "austin": "us", "cota": "us", "estados unidos": "us",
    "mexico": "mx", "méxico": "mx", "hermanos rodríguez": "mx",
    "brazil": "br", "brasil": "br", "são paulo": "br", "sao paulo": "br", "interlagos": "br",
    "las vegas": "us",

    // ==========================================
    // NUEVAS BANDERAS HISTÓRICAS Y ESPECÍFICAS
    // ==========================================
    "france": "fr", "francia": "fr", "french": "fr", "paul ricard": "fr", "magny-cours": "fr",
    "russia": "ru", "rusia": "ru", "sochi": "ru",
    "germany": "de", "alemania": "de", "hockenheim": "de", "nürburgring": "de", "nurburgring": "de",
    "malaysia": "my", "malasia": "my", "sepang": "my",
    "europe": "eu", "europa": "eu", "european": "eu", // Bandera de la Unión Europea para el GP de Europa
    "korea": "kr", "corea": "kr", "yeongam": "kr",
    "india": "in", "buddh": "in",
    "san marino": "sm", 
    "south africa": "za", "sudáfrica": "za", "sudafrice": "za", "kyalami": "za",
    "argentina": "ar", "buenos aires": "ar",
    "portugal": "pt", "algarve": "pt", "portimão": "pt", "estoril": "pt",
    "500": "us", "indianapolis": "us", // Para las 500 Millas de Indianápolis (histórico F1)
    "pacific": "jp", "tiAis": "jp", // Para el GP del Pacífico (Japón)
    "eifel": "de", // Para el GP de Eifel (Alemania)
    "morocco": "ma", "marruecos": "ma", "ain-diab": "ma"
};

const driverNationalityCodes = {
    "british": "gb", "italian": "it", "dutch": "nl", "monegasque": "mc",
    "australian": "au", "spanish": "es", "mexican": "mx", "french": "fr",
    "german": "de", "thai": "th", "japanese": "jp", "chinese": "cn",
    "danish": "dk", "canadian": "ca", "finnish": "fi", "argentine": "ar",
    "new zealander": "nz", "brazilian": "br"
};

function getFlagHTML(raceName = "", circuitName = "") {
    const combined = (raceName + " " + circuitName).toLowerCase();
    
    for (let key in countryCodes) {
        if (combined.includes(key)) {
            const val = countryCodes[key];
            
            // Manejo de regiones locales personalizadas
            if (val === "catalunya") {
                return `<img src="../../js/assets/214-cataluna_400px.jpg" alt="${key}" class="country-flag-img" loading="lazy">`;
            }
            if (val === "emilia") {
                return `<img src="../../js/assets/3840px-Flag_of_Emilia-Romagna_(de_facto).svg" alt="${key}" class="country-flag-img" loading="lazy">`;
            }
            
            // Banderas estándar mediante FlagCDN
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
