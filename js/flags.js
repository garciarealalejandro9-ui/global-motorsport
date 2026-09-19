// ==========================================
// CENTRALIZADOR DE BANDERAS - GLOBAL MOTORSPORT
// ==========================================

const countryCodes = {
    // Países y circuitos internacionales
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
    
    "portugal": "pt", "algarve": "pt",
    "turkey": "tr", "turquía": "tr", "istanbul": "tr",

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
                return `<img src="../../js/assets/3840px-Flag_of_Emilia-Romagna_(de_facto).svg.png" alt="${key}" class="country-flag-img" loading="lazy">`;
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
