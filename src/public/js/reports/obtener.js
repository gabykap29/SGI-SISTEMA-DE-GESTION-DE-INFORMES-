const Info = document.getElementById('info');
const btnImprimir = document.getElementById('btn-Imprimir');
const obtenerImagen = (rutaImagen) => {
  if (rutaImagen) {
    // Construye la URL completa de la imagen utilizando el origen del sitio web y la ruta de la imagen
    const imageURL = window.location.origin + '/uploads/' + rutaImagen;
    return `<img src="${imageURL}" class="container" alt="Imagen del informe" id="Img-Info">`;
  } else {
    return '';
  }
};
  
        let departamento = [null, 'Formosa','Pilcomayo','Pilagas','Laishi','Pirané','Patiño','Bermejo', 'Ramon Lista', 'Matacos'];
        let localidad = [
            null,
            "Formosa",
            "Colonia pastoril",
            "Gran Guardia",
            "San Hilario",
            "Mariano Boedo",
            "Villa del Carmen",
            "Clorinda",
            "Laguna Naick Neck",
            "Riacho He He",
            "Monte Lindo",
            "S.F Laishí",
            "Gral. Mansilla",
            "Herradura",
            "Yatai",
            "Misión Tacaagle",
            "Laguna Gallo",
            "Tres Lagunas",
            "El Espinillo",
            "Pirané",
            "El Colorado",
            "Villa Dos Trece",
            "Mayor Villafañe",
            "Palo Santo",
            "Las Lomitas",
            "Comandante Fontana",
            "Villa Gral Guemes",
            "Estanislao del Campo",
            "Pozo del Tigre",
            "Gral. Belgrano",
            "San Martin I",
            "San Martin II",
            "Fortin Lugones",
            "Subt. Perin",
            "Posta Cambio Zalazar",
            "Colonia Sarmiento",
            "Juan G. Bazan",
            "Bartolomé De Las Casas",
            "El Recreo",
            "Fortin Sargento Leyes",
            "Fortin Soledad",
            "Guadalcazar",
            "Lamadrid",
            "La Rinconada",
            "Los Chiriguanos",
            "Pozo de Maza",
            "Pozo del Mortero",
            "Vaca Perdida",
            "Gral. Mosconi",
            "El Potrillo",
            "Ing. Juarez"
          ];
        let tipo = [
            null, 
            "Politica", 
            "Institucional", 
            "Educación",
            "Religioso",
            "Proselitismo",
            "Salud",
            "Seguridad",
            "Eventos Climáticos",
            "Hidricos"
        ]
          


        // Funcion para obtener los datos de la reserva cuando se carga la página
        document.addEventListener('DOMContentLoaded', async () => {
            //capturar el id desde la url
            const url = window.location.href;
            const parts = url.split('/');
            const id = parts[parts.length - 1];
          
            const response = await fetch(`/api/informe/${id}`);
            const data = await response.json();
                let Departamento = departamento[data.Departamento_idDepartamento];
                let Localidad = localidad[data.Localidad_idLocalidad]
                let Tipo = tipo[data.Tipo_idTipo]
                let fecha = dayjs(data.Fecha).format('DD/MM/YYYY');
                let imagen = obtenerImagen(data.RutaImagen);
                Info.innerHTML += `
                <section id="seccionInforme">
                  <div class="Informe-Completo">
                    <div id="tituloInfo"><h3>${data.Titulo}</h3></div>

                    <div id="departamento"><p><b>Departamento:</b> ${Departamento}</p></div>

                    <div id="localidad"><p><b>Localidad:</b> ${Localidad}</p></div>

                    <div id="fecha"><p><b>Fecha:</b> ${fecha}</p></div>

                    <div id= "tipo"><p><b>Tipo de Informe:</b>  ${Tipo}</p></div>

                    <div class="Informe">
                        <p><b>Infome: </b></p>
                        <p>${data.Informe}</p>
                        </div>
                        <div class='container div-imagen'>${imagen}</div> <!-- Mostrar la imagen -->
                        <div "><p class="observaciones">${data.Observaciones}</p></div>
                        <div><p>Creado por: ${data.usuario}</p></div>
                    </div>
                </section>

                        `;
            });
            btnImprimir.addEventListener('click', () => {
              // Ocultar el botón de impresión para que no se imprima en el documento.
              document.getElementById("btn-Imprimir").style.display = "none";
            
              // Obtener el contenido del div con id "info".
              var contenido = document.getElementById("info").innerHTML;
              
              window.print();

            
              // Mostrar nuevamente el botón de impresión.
              document.getElementById("btn-Imprimir").style.display = "block";
            });
            

