const Info = document.getElementById('info');
const cargarPersona = document.getElementById('cargarPersona');
const cantPersonas = document.getElementById('cantPersonas');
const personas = document.getElementById('personas');
let cant = 0;
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
            const imagenDiv = document.getElementById('imagen');
            //capturar el id desde la url
            const url = window.location.href;
            const parts = url.split('/');
            const id = parts[parts.length - 1];
          
            const response = await fetch(`/api/informe/${id}`);
            const data = await response.json();
                cant = data.informePersons.length;
                let Departamento = departamento[data.Departamento_idDepartamento];
                let Localidad = localidad[data.Localidad_idLocalidad]
                let Tipo = tipo[data.Tipo_idTipo]
                let fecha = dayjs(data.Fecha).format('DD/MM/YYYY');
                let imagen = obtenerImagen(data.RutaImagen);
                titles.innerHTML += `
                  <h5 class="mx-2 mb-4">   Departamento:  ${Departamento}</h5>
                  <h5 class="mx-2 mb-4">  Localidad: ${Localidad}<h5>
                  <h5 class="mx-2 mb-4">  Fecha:  ${fecha}</h5>
                  <h5 class="mx-2 mb-4">  Tipo:  ${Tipo}</h5>
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
              <div class="d-flex justify-content-center align-items-center"><span id="Observaciones">${data.Observaciones}</span> </div>
              `
            }
                cant = data.informePersons.length;
                cantPersonas.innerHTML = `<h6>Personas Cargadas: ${cant}</h6>`
            console.log(data);
            for(let i = 0; i< data.informePersons.length; i++){
              let fecha = dayjs(data.informePersons[i].fechaNac).format('DD/MM/YYYY');
              personas.innerHTML += `
              <tr>
              <td>${data.informePersons[i].dni}</td>
              <td>${data.informePersons[i].lastName}</td>
              <td>${data.informePersons[i].firstName}</td>
              <td>${fecha}</td>
              <td>${data.informePersons[i].address}</td>
            </tr>
              
              `
            }

            });
            
const formPerson = document.getElementById('formPerson');

formPerson.addEventListener('submit', async (e) => {
  e.preventDefault();
  
              //capturar el id desde la url
              const url = window.location.href;
              const parts = url.split('/');
              const id = parts[parts.length - 1];


  const dni = document.getElementById('dni').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const address = document.getElementById('address').value;
  const descriptions = document.getElementById('description').value;
  const fechaNac = document.getElementById('fechaNac').value;

try {
  const res = await fetch(`/api/informe/${id}/persons`,{
          method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              dni,
              firstName,
              lastName,
              address,
              descriptions,
              fechaNac
            }),
          });
          Swal.fire({
              icon:'success',
              title: 'Persona cargada con éxito!'

          });
          formPerson.reset();
          const ress = await fetch(`/api/informe/${id}`);
          const dat = await ress.json();
              cant = dat.informePersons.length;
              cantPersonas.innerHTML = `<h6>Personas Cargadas: ${cant}</h6>`
              personas.innerHTML = "";
              for(let i = 0; i< dat.informePersons.length; i++){
                let fecha = dayjs(dat.informePersons[i].fechaNac).format('DD/MM/YYYY');

                personas.innerHTML += `
                <tr>
                <td>${dat.informePersons[i].dni}</td>
                <td>${dat.informePersons[i].lastName}</td>
                <td>${dat.informePersons[i].firstName}</td>
                <td>${fecha}</td>
                <td>${dat.informePersons[i].address}</td>
              </tr>
                
                `
              }
        
} catch (error) {
  console.log(error);
  Swal.fire({
    icon:'error',
    title: 'Error interno del servidor!',
});
}
});
