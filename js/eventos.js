document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        fetch('data/calendario.json').then(res => res.json()).catch(() => []),
        fetch('https://ergast.com/api/f1/current.json').then(res => res.json()).catch(() => null)
    ]).then(([jsonEventos, f1Data]) => {
        let todosLosEventos = [...jsonEventos];

        if (f1Data && f1Data.MRData && f1Data.MRData.RaceTable.Races) {
            const carrerasF1 = f1Data.MRData.RaceTable.Races.map(race => ({
                categoria: "automovilismo",
                competicion: "Fórmula 1",
                evento: race.raceName,
                circuito: race.Circuit.circuitName,
                fecha: race.date,
                estado: "PRÓXIMAMENTE"
            }));
            todosLosEventos = [...todosLosEventos, ...carrerasF1];
        }

        // Si estamos en la página del calendario mensual
        if (typeof renderCalendar === "function") {
            window.eventos = todosLosEventos;
            if (typeof updateCompetitionFilter === "function") updateCompetitionFilter();
            renderCalendar();
        }

        // Si estamos en la portada (index.html)
        renderTarjetasInicio(todosLosEventos);
    });
});

function renderTarjetasInicio(eventos) {
    const contenedorProximas = document.getElementById("contenedor-proximas-pruebas");
    if (!contenedorProximas) return;

    contenedorProximas.innerHTML = "";

    eventos.forEach(ev => {
        const tarjeta = document.createElement("div");
        
        // Estilos visuales de tarjeta
        tarjeta.style.background = "#111";
        tarjeta.style.border = "1px solid #333";
        tarjeta.style.borderRadius = "8px";
        tarjeta.style.padding = "15px";
        tarjeta.style.marginBottom = "15px";
        tarjeta.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";

        const titulo = ev.competicion || ev.campeonato || "Prueba";
        const nombreEvento = ev.evento || ev.nombre || "";

        tarjeta.innerHTML = `
            <h3 style="margin: 0 0 8px 0; color: #ff3333; font-size: 18px;">${titulo} - ${nombreEvento}</h3>
            <p style="margin: 4px 0; color: #ccc;"><strong>Circuito:</strong> ${ev.circuito || "Por confirmar"}</p>
            <p style="margin: 4px 0; color: #aaa; font-size: 14px;"><strong>Fecha:</strong> ${ev.fecha}</p>
        `;

        contenedorProximas.appendChild(tarjeta);
    });
}
