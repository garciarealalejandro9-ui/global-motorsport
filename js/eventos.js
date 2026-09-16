<script>
    function toggleMenu() {
        document.getElementById("menu").classList.toggle("show");
    }

    function toggleLanguages(event) {
        event.stopPropagation();
        document.getElementById("languages").classList.toggle("show");
    }
</script>

<script src="js/eventos.js"></script>
<script>
    // Mantiene el renderizado de tu vista de mes original
    if (typeof updateCompetitionFilter === "function") updateCompetitionFilter();
    if (typeof renderCalendar === "function") renderCalendar();
</script>
</body>
</html>
