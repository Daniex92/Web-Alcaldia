document.addEventListener("DOMContentLoaded", function() {
  // Asigna un evento click a cada botón con la clase "mas-info"
  var buttons = document.querySelectorAll(".mas-info");

  buttons.forEach(function(button) {
      button.addEventListener("click", function() {
          // Obtiene el ID del acordeón correspondiente al botón
          var acordeonID = this.getAttribute("id").replace("mas-info-", "");
          // Encuentra el div de información adicional correspondiente
          var infoDiv = document.getElementById(acordeonID);

          // Verifica si el div de información adicional está visible
          if (infoDiv.style.display === "block") {
              infoDiv.style.display = "none";
              this.textContent = "Ver más";
          } else {
              infoDiv.style.display = "block";
              this.textContent = "Ver menos";
          }
      });
  });
});