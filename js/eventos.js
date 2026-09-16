document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        fetch('data/calendario.json').then(res => res.json()).catch(() => []),
        fetch('https://ergast.com/api/f1/current.json').then(res => res.json()).catch(() => null)
    ]).then(([jsonEventos, f1Data]) => {
        let todosLosEventos = [...jsonEventos];

        if (f1Data && f1Data.MRData && f1Data.MRData.RaceTable && f1Data.MRData.RaceTable.Races) {
            const carrerasF1 = f1Data.MRData.RaceTable.Races.map(race => ({
                categoria: "automovilismo",
                competicion: "Fórmula 1",
                nombre: race.raceName,
                evento: race.raceName,
                circuito: race.Circuit.circuitName,
                fecha: race.date,
                estado: "PRÓXIMAMENTE"
            }));
            todosLosEventos = [...todosLosEventos, ...carrerasF1];
        }

        // Variable global compartida
        window.eventos = todosLosEventos;

        // Para calendario.html
        if (typeof renderCalendar === "function") {
            if (typeof updateCompetitionFilter === "function") updateCompetitionFilter();
            renderCalendar();
        }

        // Para index.html
        renderTarjetasInicio(todosLosEventos);
    });
});

function renderTarjetasInicio(eventos) {
    const contenedorProximas = document.getElementById("contenedor-proximas-pruebas");
    if (!contenedorProximas) return;

    contenedorProximas.innerHTML = "";

    eventos.forEach(ev => {
        const tarjeta = document.createElement("div");
        
        // Estilos de tarjeta directamente aplicados
        tarjeta.style.background = "#111111";
        tarjeta.style.border = "1px solid #333333";
        tarjeta.style.borderRadius = "8px";
        tarjeta.style.padding = "16px";
        tarjeta.style.marginBottom = "15px";
        tarjeta.style.boxShadow = "0 4px 8px rgba(0,0,0,0.5)";

        const titulo = ev.competicion || ev.campeonato || "Prueba";
        const nombreEvento = ev.evento || ev.nombre || "";

        tarjeta.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: #ff3333; font-size: 18px; font-weight: bold;">${titulo} - ${nombreEvento}</h3>
            <p style="margin: 4px 0; color: #cccccc; font-size: 14px;"><strong>Circuito:</strong> ${ev.circuito || "Por confirmar"}</p>
            <p style="margin: 4px 0; color: #aaaaaa; font-size: 14px;"><strong>Fecha:</strong> ${ev.fecha}</p>
        `;

        contenedorProximas.appendChild(tarjeta);
    });
}
