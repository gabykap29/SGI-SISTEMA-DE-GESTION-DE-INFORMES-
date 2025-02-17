const print = document.getElementById("print");
const Observaciones = document.getElementById("Observaciones");
let cant = 0;
const divImagen = document.getElementById("imagem");
const firstImg = document.getElementById("firstImg");
const secondImg = document.getElementById("secondImg");
const thirdImg = document.getElementById("thirdImg");
const fourtImg = document.getElementById("fourtImg");
const fifthImg = document.getElementById("fifthImg");

const obtenerImagen = (rutaImagen) => {
  if (rutaImagen) {
    // Construye la URL completa de la imagen utilizando el origen del sitio web y la ruta de la imagen
    const imageURL = window.location.origin + rutaImagen;
    return imageURL;
  } else {
    return "";
  }
};
document.addEventListener("DOMContentLoaded", async () => {
  //capturar el id desde la url
  const url = window.location.href;
  const parts = url.split("/");
  const id = parts[4];

  const response = await fetch(`/api/informe/${id}`);
  const data = await response.json();
  const Departamento = document.getElementById("departamento");
  const informe = document.getElementById("informe");
  const localidad = document.getElementById("localidad");
  const tituloInforme = document.getElementById("titleReport");
  const Fecha = document.getElementById("Fecha");
  const tipo = document.getElementById("Tipo");
  const imgs = document.getElementById("imgs");
  cant = data.informePersons.length;

  let Tipo = data.Tipo.nombre;
  let fecha = dayjs(data.Fecha).format("DD/MM/YYYY");
  Departamento.innerHTML += `Departamento: ${data.InformesDepart.nombre}`;
  tituloInforme.innerHTML = `<u>${data.Titulo}</u>`;
  localidad.innerHTML = `Localidad: ${data.InformesLocal.nombre}`;
  informe.innerHTML = `${data.Informe}`;
  Fecha.innerHTML = `Fecha: ${fecha}`;
  tipo.innerHTML = `Tipo:: ${Tipo}`;

const sectionImg = document.getElementById('sectionImg');

if (data.Files.length > 0) {
    // Recorre cada archivo en data.Files
    for (let i = 0; i < data.Files.length; i++) {
      imgs.style.display = "none";
        // Crea un contenedor para cada imagen
        const imgContainer = document.createElement('div');
        imgContainer.style.flex = '1 1 calc(50% - 10px)'; // Cada imagen ocupa el 50% del espacio, menos el gap
        imgContainer.style.maxWidth = 'calc(50% - 10px)'; // Limita el ancho al 50% del contenedor

        // Crea la etiqueta de imagen
        const imgElement = document.createElement('img');
        imgElement.src = obtenerImagen(data.Files[i].filesRoute); // Asigna la ruta de la imagen
        imgElement.style.width = '100%'; // La imagen ocupa el 100% del contenedor
        imgElement.style.height = '400px'; // Mantiene la proporción de la imagen

        // Añade la imagen al contenedor
        imgContainer.appendChild(imgElement);

        // Añade el contenedor al sectionImg
        sectionImg.appendChild(imgContainer);
    }
}
});
