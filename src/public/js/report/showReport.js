const Info = document.getElementById("info");
const cargarPersona = document.getElementById("cargarPersona");
const cantPersonas = document.getElementById("cantPersonas");
const personas = document.getElementById("personas");
const Observaciones = document.getElementById("Observaciones");
let cant = 0;
const divImagen = document.getElementById("imagem");
const firstImg = document.getElementById("firstImg");
const secondtImg = document.getElementById("secondtImg");
const thirdImg = document.getElementById("thirdImg");
const fourtImg = document.getElementById("fourtImg");
const fifthImg = document.getElementById("fifthImg");
const descriptionOne = document.getElementById("descriptionOne");
const descriptionTwo = document.getElementById("descriptionTwo");
const descriptionTree = document.getElementById("descriptionTree");
const descriptionFour = document.getElementById("descriptionFour");
const titleEstado = document.getElementById("titleEstado");

//-----------------------Obtener Imagenes-------------------------------------
const obtenerImagen = (rutaImagen) => {
  if (rutaImagen) {
    // Construye la URL completa de la imagen utilizando el origen del sitio web y la ruta de la imagen
    const imageURL = window.location.origin + rutaImagen;
    return imageURL;
  } else {
    return "";
  }
};
const completeReport = async () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Estás por completar un Informe, este proceso es irreversible",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Estoy seguro",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const url = window.location.href;
        const parts = url.split("/");
        const id = parts[parts.length - 1];
        const res = await fetch(`/api/informes/complete/${id}`, {
          method: "PUT",
        });

        const data = await res.json();
        if (data.message === "El informe ya fue completado!") {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message,
          });
          return;
        }
        Swal.fire({
          icon: "success",
          title: "Informes completados",
          text: data.message,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2200);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    }
  });
};

function display() {
  const titleContainer = document.getElementById("titleContainer");
  const imageContainer = document.getElementById("imageContainer");
  const reportContainer = document.getElementById("reportContainer");
  const personContainer = document.getElementById("personContainer");
  const Footer = document.getElementById("Footer");

  const row = document.getElementById("rowPrincipal"); // Selecciona el elemento row que contiene las tarjetas

  const displayWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (displayWidth < 600) {
    row.classList.remove("row-cols-2"); // Elimina la clase que divide en 2 columnas
    row.classList.add("flex-column"); // Agrega una clase para que las tarjetas se apilen verticalmente
    titleContainer.classList.remove("col-6");
    titleContainer.classList.add("col-12");
    imageContainer.classList.add("col-12");
    reportContainer.classList.remove('col-6');
    reportContainer.classList.add('col-12');
    personContainer.classList.add('col-12');
    Footer.style.display = "none";
  } else {
    row.classList.remove("flex-column"); // Elimina la clase que apila verticalmente
    row.classList.add("row-cols-2"); // Agrega la clase para dividir en 2 columnas
    titleContainer.classList.remove("col-12");
    titleContainer.classList.add("col-6");
    imageContainer.classList.remove("col-12");
    
    reportContainer.classList.remove('col-12');
    reportContainer.classList.add('col-6');
    personContainer.classList.remove('col-12');
    Footer.style.display = 'block';
    
  }
}




document.addEventListener("DOMContentLoaded", async () => {
  const titles = document.getElementById("titles");
  const informe = document.getElementById("informeView");
  const tituloInforme = document.getElementById("titleReport");
  const imagenDiv = document.getElementById("imagen");
  const print = document.getElementById("print");

  display();


  //capturar el id desde la url
  const url = window.location.href;
  const parts = url.split("/");
  const id = parts[parts.length - 1];
  print.innerHTML = `
            <a class='btn btn-outline-secondary mt-2' href='/informes/${id}/print'> <i class="bi bi-printer"></i> </a>
            `;
  const response = await fetch(`/api/informe/${id}`);
  const data = await response.json();
  if (data.isComplete === true) {
    titleEstado.innerHTML = `Informe Completado <a href='#' id='btnComplete'> <img src='/img/completado.png' style='width: 30px; height: 30px;' </a>`;
  } else {
    titleEstado.innerHTML = `Informe no completado <a href='#' id='btnComplete'> <img src='/img/incompleto.png' style='width: 30px; height: 30px;' </a>`;
  }
  if (data.informePersons) {
    cant = data.informePersons.length;
  }
  let fecha = dayjs(data.Fecha).format("DD/MM/YYYY");
  titles.innerHTML += `
                  <h6 class=" mb-4">   Departamento:  ${data.InformesDepart.nombre}</h6>
                  <h6 class=" mb-4">  Localidad: ${data.InformesLocal.nombre}<h6>
                  <h6 class=" mb-4">  Fecha:  ${fecha}</h6>
                  <h6 class=" mb-4">  Tipo:  ${data.Tipo.nombre}</h6>
            </div>`;
  tituloInforme.innerHTML = `
            <h6> <u>${data.Titulo}</u></h6>
            `;
  informe.innerHTML = `
            <p >
            ${data.Informe}
            <br>
            <br>
            </p>`;
  if (data.Files.length > 0) {
    for (let i = 0; i < data.Files.length; i++) {
      const imagen = obtenerImagen(data.Files[i].filesRoute);

      switch (i) {
        case 0: {
          firstImg.src = imagen;
          descriptionOne.innerHTML = data.Files[i].descriptions;
          break;
        }
        case 1: {
          secondtImg.src = imagen;
          descriptionTwo.innerHTML = data.Files[i].descriptions;
          break;
        }
        case 2: {
          thirdImg.src = imagen;
          descriptionTree.innerHTML = data.Files[i].descriptions;
          break;
        }
        case 3: {
          fourtImg.src = imagen;
          descriptionFour.innerHTML = data.Files[i].descriptions;
          break;
        }
        case 4: {
          fifthImg.src = imagen;
          break;
        }
      }
    }
  }

  if (data.informePersons) {
    cant = data.informePersons.length;
    cantPersonas.innerHTML = `<h6 class="text-center"><strong>Personas: ${cant}</strong></h6>`;
    for (let i = 0; i < data.informePersons.length; i++) {
      let fecha = dayjs(data.informePersons[i].fechaNac).format("DD/MM/YYYY");
      personas.innerHTML += `
              <tr>
                <td>${data.informePersons[i].dni}</td>
                <td>${data.informePersons[i].lastName}</td>
                <td>${data.informePersons[i].firstName}</td>
                <td>${fecha}</td>
                <td>${data.informePersons[i].address}</td>
              </tr>
              
              `;
    }
    const btnComplete = document.getElementById("btnComplete");
    btnComplete.addEventListener("click", () => {
      completeReport();
    });
  }
});

//-----------------------formulario de Personas-----------------------------------
const formPerson = document.getElementById("formPerson");
formPerson.addEventListener("submit", async (e) => {
  e.preventDefault();

  //capturar el id desde la url
  const url = window.location.href;
  const parts = url.split("/");
  const id = parts[parts.length - 1];

  const dni = document.getElementById("dni").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const descriptions = document.getElementById("description").value;
  const fechaNac = document.getElementById("fechaNac").value;
  const facebook = document.getElementById("facebook").value;
  const instagram = document.getElementById("instagram").value;
  const phone = document.getElementById("phone").value;
  const work = document.getElementById("work").value;
  const mail = document.getElementById("mail").value;
  const formData = new FormData();
  const rutaImagen = document.getElementById("rutaImagenPerson").files[0];
  formData.append("dni", dni);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("address", address);
  formData.append("descriptions", descriptions);
  formData.append("fechaNac", fechaNac);
  formData.append("rutaImagen", rutaImagen);
  formData.append("facebook", facebook);
  formData.append("instagram", instagram);
  formData.append("phone", phone);
  formData.append("work", work);
  formData.append("mail", mail);

  try {
    const res = await fetch(`/api/informe/${id}/persons`, {
      method: "POST",
      body: formData,
    });
    //si hubo errores en la peticion el si sistema devolverá un error 400
    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "El campo dni debe ser un número!, evite usar puntos!",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Persona cargada con éxito!",
      });
      formPerson.reset();
    }

    const ress = await fetch(`/api/informe/${id}`);
    const dat = await ress.json();
    cantPersonas.innerHTML = `<h6>Personas Cargadas: ${cant}</h6>`;
    personas.innerHTML = "";
    for (let i = 0; i < dat.informePersons.length; i++) {
      let fecha = dayjs(dat.informePersons[i].fechaNac).format("DD/MM/YYYY");

      personas.innerHTML += `
                <tr>
                <td>${dat.informePersons[i].dni}</td>
                <td>${dat.informePersons[i].lastName}</td>
                <td>${dat.informePersons[i].firstName}</td>
                <td>${fecha}</td>
                <td>${dat.informePersons[i].address}</td>
              </tr>
                
                `;
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: error,
    });
  }
});

//----------------------formulario de Imagenes-------------------------------------

const formFiles = document.getElementById("formFiles");
formFiles.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Selected file:", document.getElementById("rutaImagen").files[0]);

  const rutaImagenInput = document.getElementById("rutaImagen");
  const descriptions = document.getElementById("descriptions").value;

  // Check if a file is selected
  let rutaImagen;
  if (rutaImagenInput.files.length > 0) {
    rutaImagen = rutaImagenInput.files[0];
  } else {
    console.error("No file selected for rutaImagen");
    // Handle the case where no file is selected
    return;
  }

  const url = window.location.href;
  const parts = url.split("/");
  const id = parts[parts.length - 1];
  const formData = new FormData();
  formData.append("rutaImagen", rutaImagen);
  formData.append("descriptions", descriptions);

  try {
    const response = await fetch(`/api/informes/${id}/imagen`, {
      method: "POST",
      body: formData,
    });
    const respToJson = await response.json();
    const errorMessage = respToJson.message;
    if (response.status !== 201 && response.status !== 200) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Imagen cargada con éxito",
    });
    formFiles.reset();
    setTimeout(() => {
      window.location.href = `/informes/view/${id}`;
    }, 2000);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Vuelva a iniciar sesión o actualice la pagina!",
    });
  }
});
window.addEventListener("resize", () => {
  console.log("Window resize event");
  display();
});