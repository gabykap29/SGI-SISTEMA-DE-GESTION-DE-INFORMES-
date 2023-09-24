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
            const titles = document.getElementById('titles');
            const informe = document.getElementById('informeView');
            const tituloInforme = document.getElementById('titleReport');
            const imagenDiv = document.getElementById('imagen')
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
                titles.innerHTML += `
                  <h5 class="mx-2 mb-4"> <b>  Departamento: </b> ${Departamento}</h5>
                  <h5 class="mx-2 mb-4"> <b> Localidad:</b> ${Localidad}<h5>
                  <h5 class="mx-2 mb-4"> <b> Fecha: </b> ${fecha}</h5>
                  <h5 class="mx-2 mb-4"> <b> Tipo: </b> ${Tipo}</h5>
            </div>`;
            tituloInforme.innerHTML=`
            <h2> <u>${data.Titulo}</u></h2>
            `
            informe.innerHTML= `
            <p >
            ${data.Informe}
            <br>
            <br>
            </p>`;

            if(imagen){
              imagenDiv.innerHTML = `
              ${imagen}
              `
            }


            });
            btnImprimir.addEventListener('click', () => {
              // Ocultar el botón de impresión para que no se imprima en el documento.
              document.getElementById("btn-Imprimir").style.display = "none";
            
              // Obtener el contenido del div con id "info".
              let contenido = document.getElementById("info").innerHTML;
              document.querySelector('.navbar').style.display = 'none';
              window.print();

            
              // Mostrar nuevamente el botón de impresión.
              document.getElementById("btn-Imprimir").style.display = "block";
              document.querySelector('.navbar').style.display = '';
            });
            

