const Info = document.getElementById('info');
const cargarPersona = document.getElementById('cargarPersona');
const cantPersonas = document.getElementById('cantPersonas');
const personas = document.getElementById('personas');
const Observaciones = document.getElementById('Observaciones');
let cant = 0;
const divImagen = document.getElementById('imagem');
const firstImg = document.getElementById('firstImg');
const secondtImg = document.getElementById('secondtImg');
const thirdImg = document.getElementById('thirdImg');
const fourtImg = document.getElementById('fourtImg');
const fifthImg = document.getElementById('fifthImg');
const descriptionOne = document.getElementById('descriptionOne');
const descriptionTwo = document.getElementById('descriptionTwo');
const descriptionTree = document.getElementById('descriptionTree');
const descriptionFour = document.getElementById('descriptionFour');

//-----------------------Obtener Imagenes-------------------------------------
const obtenerImagen = (rutaImagen) => {
  if (rutaImagen) {
    // Construye la URL completa de la imagen utilizando el origen del sitio web y la ruta de la imagen
    const imageURL = window.location.origin + rutaImagen;
    return imageURL;
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
          

        document.addEventListener('DOMContentLoaded', async () => {
            const titles = document.getElementById('titles');
            const informe = document.getElementById('informeView');
            const tituloInforme = document.getElementById('titleReport');
            const imagenDiv = document.getElementById('imagen');
            const print = document.getElementById('print');
            //capturar el id desde la url
            const url = window.location.href;
            const parts = url.split('/');
            const id = parts[parts.length - 1];
            print.innerHTML=`
            <a class='btn' href='/informes/${id}/print'> <img src='/css/images/print.png' > </a>
            `
            const response = await fetch(`/api/informe/${id}`);
            const data = await response.json();
                cant = data.informePersons.length;
                let Departamento = departamento[data.Departamento_idDepartamento];
                let Localidad = localidad[data.Localidad_idLocalidad]
                let Tipo = data.Informes.nombre;
                let fecha = dayjs(data.Fecha).format('DD/MM/YYYY');
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
            if(data.Files.length >0){
              for(let i = 0; i < data.Files.length; i++){
                const imagen = obtenerImagen(data.Files[i].filesRoute);
                
                switch (i){
                  case 0:{
                    firstImg.src = imagen;
                    descriptionOne.innerHTML = data.Files[i].descriptions;
                    break;
                  }
                  case 1:{
                    secondtImg.src = imagen;
                    descriptionTwo.innerHTML = data.Files[i].descriptions;
                    break;
                  }
                  case 2:{
                    thirdImg.src =  imagen;
                    descriptionTree.innerHTML = data.Files[i].descriptions;
                    break;
                  }
                  case 3:{
                    fourtImg.src = imagen;
                    descriptionFour.innerHTML = data.Files[i].descriptions;
                    break;
                  }
                  case 4:{
                    fifthImg.src = imagen;
                    break;
                  }
                }
              }
              
            }

                cant = data.informePersons.length;
                cantPersonas.innerHTML = `<h6>Personas Cargadas: ${cant}</h6>`
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
            

//-----------------------formulario de Personas-----------------------------------
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
                    //si hubo errores en la peticion el si sistema devolverá un error 400
                    if(!res.ok){
                      Swal.fire({
                        icon:'error',
                        title: 'El campo dni debe ser un número!, evite usar puntos!',
                      })
                    }else{
                      Swal.fire({
                        icon:'success',
                        title: 'Persona cargada con éxito!'

                    });
                    formPerson.reset();
                    };



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

//----------------------formulario de Imagenes-------------------------------------

        const formFiles = document.getElementById('formFiles');
        formFiles.addEventListener('submit', async(e)=>{
          e.preventDefault();
          const rutaImagen = document.getElementById('rutaImagen').files[0];
          const descriptions = document.getElementById('descriptions').value;
          console.log(rutaImagen,descriptions);
          const url = window.location.href;
          const parts = url.split('/');
          const id = parts[parts.length - 1];
          const formData = new FormData();
          formData.append('rutaImagen',rutaImagen);
          formData.append('descriptions',descriptions);

          try {
            const response = await fetch(`/api/informes/${id}/imagen`,{
              method:'POST',
              body:formData
            });
            const respToJson = await response.json();
            const errorMessage = respToJson.message;
            if (response.status !== 201 && response.status !== 200) {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: errorMessage
              });
              return;}

              Swal.fire({
                icon: 'success',
                title: 'Imagen cargada con éxito',
              });
              formFiles.reset();
              setTimeout(() => {
                window.location.href = `/informes/view/${id}`;
              }, 2000);
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: "Vuelva a iniciar sesión o actualice la pagina!"
            });
          }
        })