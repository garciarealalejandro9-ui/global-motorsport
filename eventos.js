// Función principal para cargar datos desde la API de F1 (Jolpica-F1)
async function cargarDatosMotorsport() {
    try {
        // 1. Obtener la próxima carrera
        const respProxima = await fetch('https://api.jolpica.net/ergast/f1/current/next.json');
        const datosProxima = await respProxima.json();
        const proximaCarrera = datosProxima.MRData.RaceTable.Races[0];

        // 2. Obtener los resultados de la última carrera terminada
        const respUltima = await fetch('https://api.jolpica.net/ergast/f1/current/last/results.json');
        const datosUltima = await respUltima.json();
        const ultimaCarrera = datosUltima.MRData.RaceTable.Races[0];

        // 3. Renderizar "Próximas pruebas"
        const contenedorProximas = document.getElementById('contenedor-proximas-pruebas');
        if (contenedorProximas && proximaCarrera) {
            contenedorProximas.innerHTML = `
                <div class="event">
                    <div class="event-date">PRÓXIMAMENTE</div>
                    <h3>${proximaCarrera.raceName}</h3>
                    <p>Fórmula 1 · ${proximaCarrera.Circuit.circuitName} (${proximaCarrera.date})</p>
                </div>
            `;
        }

        // 4. Renderizar "Últimas pruebas"
        const contenedorUltimas = document.getElementById('contenedor-ultimas-pruebas');
        if (contenedorUltimas && ultimaCarrera) {
            const ganador = ultimaCarrera.Results[0].Driver;
            contenedorUltimas.innerHTML = `
                <div class="event">
                    <div class="event-date">FINALIZADA</div>
                    <h3>${ultimaCarrera.raceName}</h3>
                    <p>Ganador: ${ganador.givenName} ${ganador.familyName} (${ultimaCarrera.Results[0].Constructor.name})</p>
                </div>
            `;
        }

        // 5. Detectar si la carrera es HOY para activar "EN VIVO"
        const hoy = new Date().toISOString().split('T')[0];
        const seccionVivo = document.getElementById('seccion-en-vivo');
        const contenedorVivo = document.getElementById('contenedor-en-vivo');

        if (seccionVivo && proximaCarrera && proximaCarrera.date === hoy) {
            seccionVivo.style.display = 'block';
            contenedorVivo.innerHTML = `
                <div class="event" style="border: 2px solid #e53e3e;">
                    <div class="event-date" style="background: #e53e3e; color: #fff;">🔴 EN VIVO</div>
                    <h3>${proximaCarrera.raceName}</h3>
                    <p>Fórmula 1 · ${proximaCarrera.Circuit.circuitName}</p>
                </div>
            `;
        }

    } catch (error) {
        console.error("Error cargando los datos de la API:", error);
    }
}

// Ejecutar automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', cargarDatosMotorsport);
