// Cargar de forma dinámica todas las disciplinas de Motorsport
async function cargarGlobalMotorsport() {
    try {
        let proximasPruebas = [];
        let ultimasPruebas = [];

        // ----------------------------------------------------
        // 1. CARGAR FÓRMULA 1 (Desde API Ergast / Jolpica)
        // ----------------------------------------------------
        try {
            const respF1Next = await fetch('https://api.jolpica.net/ergast/f1/current/next.json');
            const datosF1Next = await respF1Next.json();
            const f1Next = datosF1Next.MRData.RaceTable.Races[0];

            if (f1Next) {
                proximasPruebas.push({
                    disciplina: '🏎️ Monoplazas (Fórmula 1)',
                    nombre: f1Next.raceName,
                    lugar: f1Next.Circuit.circuitName,
                    fecha: f1Next.date
                });
            }

            const respF1Last = await fetch('https://api.jolpica.net/ergast/f1/current/last/results.json');
            const datosF1Last = await respF1Last.json();
            const f1Last = datosF1Last.MRData.RaceTable.Races[0];

            if (f1Last) {
                const ganador = f1Last.Results[0].Driver;
                ultimasPruebas.push({
                    disciplina: '🏎️ Monoplazas (Fórmula 1)',
                    nombre: f1Last.raceName,
                    info: `Ganador: ${ganador.givenName} ${ganador.familyName} (${f1Last.Results[0].Constructor.name})`
                });
            }
        } catch (e) {
            console.warn("No se pudo obtener datos en vivo de F1:", e);
        }

        // ----------------------------------------------------
        // 2. CARGAR RESTO DE DISCIPLINAS (Desde data/calendario.json)
        // ----------------------------------------------------
        try {
            const respJson = await fetch('data/calendario.json');
            const eventosJson = await respJson.json();

            eventosJson.forEach(item => {
                if (item.estado === "PRÓXIMAMENTE") {
                    proximasPruebas.push({
                        disciplina: `${getIconoCategoria(item.categoria)} ${item.categoria} (${item.campeonato})`,
                        nombre: item.evento,
                        lugar: item.circuito,
                        fecha: item.fecha
                    });
                } else if (item.estado === "FINALIZADA") {
                    ultimasPruebas.push({
                        disciplina: `${getIconoCategoria(item.categoria)} ${item.categoria} (${item.campeonato})`,
                        nombre: item.evento,
                        info: `Circuito: ${item.circuito} (${item.fecha})`
                    });
                }
            });
        } catch (e) {
            console.warn("No se pudo cargar data/calendario.json:", e);
        }

        // ----------------------------------------------------
        // 3. RENDERIZAR EN EL HTML (index.html)
        // ----------------------------------------------------
        const contenedorProximas = document.getElementById('contenedor-proximas-pruebas');
        if (contenedorProximas && proximasPruebas.length > 0) {
            contenedorProximas.innerHTML = proximasPruebas.map(p => `
                <div class="event">
                    <div class="event-date">PRÓXIMAMENTE</div>
                    <h3>${p.nombre}</h3>
                    <p><strong>${p.disciplina}</strong> · ${p.lugar} ${p.fecha ? `(${p.fecha})` : ''}</p>
                </div>
            `).join('');
        }

        const contenedorUltimas = document.getElementById('contenedor-ultimas-pruebas');
        if (contenedorUltimas && ultimasPruebas.length > 0) {
            contenedorUltimas.innerHTML = ultimasPruebas.map(u => `
                <div class="event">
                    <div class="event-date">FINALIZADA</div>
                    <h3>${u.nombre}</h3>
                    <p><strong>${u.disciplina}</strong> · ${u.info}</p>
                </div>
            `).join('');
        }

    } catch (error) {
        console.error("Error general al cargar los eventos:", error);
    }
}

// Función auxiliar para asignar íconos según la categoría
function getIconoCategoria(categoria) {
    switch (categoria) {
        case 'Monoplazas': return '🏎️';
        case 'Motos': return '🏍️';
        case 'Rally': return '🌲';
        case 'Resistencia': return '⏱️';
        case 'Stock Cars': return '🇺🇸';
        case 'Drift': return '💨';
        case 'Drag': return '🚦';
        default: return '🏁';
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', cargarGlobalMotorsport);
