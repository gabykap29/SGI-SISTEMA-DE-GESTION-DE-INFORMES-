 const Info = document.getElementById('info');

// ...

const obtenerImagen = (rutaImagen) => {
  if (rutaImagen) {
    // Construye la URL completa de la imagen utilizando el origen del sitio web y la ruta de la imagen
    const imageURL = window.location.origin + '/uploads/' + rutaImagen;
    return `<img src="${imageURL}" class="container" alt="Imagen del informe" id="Img-Info">`;
  } else {
    return '';
  }
};
  
  // ...
  

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
                <section class="seccionInforme">
                    <div id="titulo"><h5><b>Titulo:</b> ${data.Titulo}</h5></div>
                    <br>
                    <div id="departamento"><h5><b>Departamento:</b> ${Departamento}</h5></div>
                    <br>
                    <div id="localidad"><h5><b>Localidad:</b> ${Localidad}</h5></div>
                    <br>
                    <div id="fecha"><h5><b>Fecha:</b> ${fecha}</h5></div>
                    <br>
                    <div id= "tipo"><h5><b>Tipo de Informe:</b>  ${Tipo}</h5></div>
                    <br>
                    <div class="Informe">
                        <h5><b>Infome: </b></h5>
                        <p>${data.Informe}</p>
                        <br><br>
                        </div>
                        <div class='container'>${imagen}</div> <!-- Mostrar la imagen -->
                        <div "><p class="observaciones">${data.Observaciones}</p></div>
                </section>

                        `;
            });

            
        // <td>${Departamento}</td>
        // <td>${Localidad}</td>
        // <td>${Tipo}</td>
        // <td>${fecha}</td>
        // <td>${informe.Titulo}</td>
        // <td>${informe.Informe}</td>

