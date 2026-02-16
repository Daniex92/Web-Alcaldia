/**
 * main.js - Código Consolidado y Optimizado.
 * Incluye: Reloj Digital, Acordeón "Ver más", y Geolocalización con Google Maps.
 */

document.addEventListener("DOMContentLoaded", function() {

    // 1. Reloj Digital en Encabezado
    function initClock() {
        const relojDiv = document.getElementById('reloj');

        function updateClock() {
            const now = new Date();
            // Formato HH:MM:SS con ceros a la izquierda
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            if (relojDiv) {
                relojDiv.textContent = `${hours}:${minutes}:${seconds}`;
            }
        }

        updateClock();
        // Actualiza cada segundo (1000ms)
        setInterval(updateClock, 1000); 
    }

    // 2. Lógica del Botón "Ver más/Ver menos" (Acordeón)
    function initAccordion() {
        // Selecciona todos los botones con la clase 'mas-info'
        const buttons = document.querySelectorAll(".mas-info");

        buttons.forEach(function(button) {
            button.addEventListener("click", function() {
                // Obtiene el valor del atributo data-target (ej: 'pueblito-de-barro')
                const targetID = this.getAttribute("data-target");
                // Encuentra el div de información adicional correspondiente
                const infoDiv = document.getElementById(targetID);

                if (infoDiv) {
                    // Alternar la visibilidad (de 'none' a 'block')
                    if (infoDiv.style.display === "block") {
                        infoDiv.style.display = "none";
                        this.textContent = "Ver más";
                    } else {
                        infoDiv.style.display = "block";
                        this.textContent = "Ver menos";
                    }
                }
            });
        });
    }

    // 3. Lógica de Geolocalización y Google Maps
    function initGeolocationAndMaps() {
        // Selecciona todos los enlaces de ubicación con la clase '.ubicacion'
        const ubicacionLinks = document.querySelectorAll(".ubicacion");

        // Función para abrir Google Maps con ruta
        function abrirGoogleMaps(destino, puntoInicio) {
            // Se utiliza la URL de Google Maps para obtener indicaciones (directions)
            const url = `https://www.google.com/maps/dir/${puntoInicio}/${destino}`;
            window.open(url, '_blank');
        }

        // Función para obtener la ubicación del usuario y abrir el mapa
        function obtenerUbicacionYAbrirMapa(destinoCoords) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const latitud = position.coords.latitude;
                        const longitud = position.coords.longitude;
                        const puntoInicio = `${latitud},${longitud}`;
                        
                        // Abre el mapa con la ruta desde la ubicación del usuario al destino
                        abrirGoogleMaps(destinoCoords, puntoInicio);
                    }, 
                    function(error) {
                        console.error("Error al obtener la ubicación del usuario:", error);
                        alert("No se pudo obtener tu ubicación actual. Abriendo el mapa del destino sin ruta de inicio.");
                        // Fallback: Abre el mapa solo con la ubicación del destino
                        window.open(`https://www.google.com/maps/search/?api=1&query=${destinoCoords}`, '_blank');
                    }
                );
            } else {
                console.error("La geolocalización no está disponible en este navegador.");
                alert("Tu navegador no soporta geolocalización. Abriendo el mapa del destino.");
                // Fallback: Abre el mapa solo con la ubicación del destino
                window.open(`https://www.google.com/maps/search/?api=1&query=${destinoCoords}`, '_blank');
            }
        }

        // Asignar el evento a todos los enlaces de ubicación
        ubicacionLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Detiene la navegación estándar
                // Obtiene las coordenadas del atributo data-coords
                const destinoCoords = this.getAttribute('data-coords');
                if (destinoCoords) {
                    obtenerUbicacionYAbrirMapa(destinoCoords);
                }
            });
        });
    }

    // Inicializar todas las funcionalidades al cargar el DOM
    initClock();
    initAccordion();
    initGeolocationAndMaps();
});