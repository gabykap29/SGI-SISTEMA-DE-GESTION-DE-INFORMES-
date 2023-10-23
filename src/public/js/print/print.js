const print = document.getElementById('print');
const Observaciones = document.getElementById('Observaciones');
let cant = 0;
const divImagen = document.getElementById('imagem');
 const firstImg = document.getElementById('firstImg');
 const secondImg = document.getElementById('secondImg');
 const thirdImg = document.getElementById('thirdImg');
 const fourtImg = document.getElementById('fourtImg');
 const fifthImg = document.getElementById('fifthImg');

const obtenerImagen = (rutaImagen) => {
  if (rutaImagen) {
    // Construye la URL completa de la imagen utilizando el origen del sitio web y la ruta de la imagen
    const imageURL = window.location.origin  + rutaImagen;
    return imageURL;
  } else {
    return '';
  }
};

          
        // Funcion para obtener los datos de la reserva cuando se carga la página
        document.addEventListener('DOMContentLoaded', async () => {
            let departamento = [null, 'Formosa','Pilcomayo','Pilagas','Laishi','Pirané','Patiño','Bermejo', 'Ramon Lista', 'Matacos'];
            let arrayLocal = [
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
            //capturar el id desde la url
            const url = window.location.href;
            const parts = url.split('/');
            const id = parts[4];

            const response = await fetch(`/api/informe/${id}`);
            const data = await response.json();
            const Departamento = document.getElementById('departamento');
            const informe = document.getElementById('informe');
            const localidad = document.getElementById('localidad');
            const tituloInforme = document.getElementById('titleReport');
            const Fecha = document.getElementById('Fecha');
            const tipo = document.getElementById('Tipo');
            const imgs = document.getElementById('imgs')
                cant = data.informePersons.length;
                let Depart = departamento[data.Departamento_idDepartamento];
                let Local = arrayLocal[data.Localidad_idLocalidad]
                let Tipo = data.Informes.nombre;
                let fecha = dayjs(data.Fecha).format('DD/MM/YYYY');
                Departamento.innerHTML += `Departamento: ${Depart}`;
                tituloInforme.innerHTML=`${data.Titulo}`;
                localidad.innerHTML=`Localidad: ${Local}`;
                informe.innerHTML= `${data.Informe}`;
                Fecha.innerHTML=`Fecha: ${fecha}`;
                tipo.innerHTML=`Tipo de Informe: ${Tipo}`
            if(data.Files.length >0){
              for(let i = 0; i < data.Files.length; i++){
                let imagen = obtenerImagen(data.Files[i].filesRoute);
                    imgs.innerHTML += `<div class="col mt-2">
                    <img class="img" src="${imagen}" alt="" id="firstImg">
                    <div class="d-flex justify-content-center align-items-center">
                      <span id="descriptionOne">${data.Files[i].descriptions}</span>
                    </div>`


              }}



            })
