document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar eventos desde data/calendario.json y API de F1
    Promise.all([
        fetch('data/calendario.json').then(res => res.json()).catch(() => []),
        fetch('https://ergast.com/api/f1/current.json').then(res => res.json()).catch(() => null)
    ]).then(([jsonEventos, f1Data]) => {
        let todosLosEventos = [...jsonEventos];

        // Procesar F1 si la API responde
        if (f1Data && f1Data.MRData && f1Data.MRData.RaceTable.Races) {
            const carrerasF1 = f1Data.MRData.RaceTable.Races.map(race => ({
                categoria: "Monoplazas",
                campeonato: "Fórmula 1",
                evento: race.raceName,
                circuito: race.Circuit.circuitName,
                fecha: race.date,
                estado: "PRÓXIMAMENTE"
            }));
            todosLosEventos = [...todosLosEventos, ...carrerasF1];
        }

        // 2. Si la página es calendario.html (vista mensual)
        if (typeof renderCalendar === "function") {
            window.eventosCalendario = todosLosEventos;
            renderCalendar();
        } 
        
        // 3. Si la página es index.html (vista de tarjetas en portada)
        renderTarjetasInicio(todosLosEventos);
    });
});

function renderTarjetasInicio(eventos) {
    const contenedorProximas = document.getElementById("contenedor-proximas-pruebas");
    if (!contenedorProximas) return;

    contenedorProximas.innerHTML = "";
    eventos.forEach(ev => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "card-evento";
        tarjeta.innerHTML = `
            <h3>${ev.campeonato} - ${ev.evento}</h3>
            <p><strong>Circuito:</strong> ${ev.circuito}</p>
            <p><strong>Fecha:</strong> ${ev.fecha}</p>
        `;
        contenedorProximas.appendChild(tarjeta);
    });
}
