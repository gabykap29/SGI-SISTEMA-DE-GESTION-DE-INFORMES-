const dni = document.getElementById("dni");
const imgPerson = document.getElementById("imgPerson");
const fechaNac = document.getElementById("fechaNac");
const adress = document.getElementById("adress");
const completeName = document.getElementById("completeName");
const created = document.getElementById("created");
const work = document.getElementById("work");
const mail = document.getElementById("mail");
const phone = document.getElementById("phone");
const facebook = document.getElementById("facebook");
const instagram = document.getElementById("instagram");
const registros = document.getElementById("registros");
const locality = document.getElementById("locality");
const province = document.getElementById("province");
//capturar el id desde la url
const url = window.location.href;
const parts = url.split("/");
const id = parts[parts.length - 1];

const getPerson = async () => {
  const res = await fetch(`/api/person/${id}'`);
  if (res.status === 404) {
    return [];
  }
  const data = await res.json();
  return data;
};

const showPerson = async () => {
  const url = window.location.href;
  const parts = url.split("/");
  const Url = parts[parts.length - 4];
  const res = await getPerson();
  created.innerHTML = `Ultima actualización: ${dayjs(res.createdAt).format("DD/MM/YYYY")}`;
  completeName.innerHTML = `${res.firstName} ${res.lastName}`;
  dni.innerHTML = `DNI: ${res.dni}`;
  fechaNac.innerHTML = `Clase: ${res.fechaNac}`;
  adress.innerHTML = `Dirección: ${res.address}`;
  imgPerson.src = "https://" + Url + res.ImgPersons.rutaImagen;
  imgPerson.src ?? "https://" + Url + "/img/user.png";
  locality.innerHTML = `Localidad: ${res.locality}`;
  province.innerHTML = `Provincia: ${res.province}`;
  work.innerHTML = `Trabajo: ${res.work}`;
  mail.innerHTML = `Email: ${res.mail}`;
  phone.innerHTML = `Teléfono: ${res.phone}`;
  facebook.innerHTML = `Facebook: ${res.facebook}`;
  instagram.innerHTML = `Instagram: ${res.instagram}`;
  for (let i = 0; i < res.informePersons.length; i++) {
    let Tipo = res.informePersons[i].Tipo.nombre;
    let fecha = dayjs(res.informePersons[i].Fecha).format("DD/MM/YYYY");
    registros.innerHTML += `
        <tr>
        <td>${res.informePersons[i].InformesDepart.nombre}</td>
        <td>${res.informePersons[i].InformesLocal.nombre}</td>
        <td>${Tipo}</td>
        <td>${fecha}</td>
        <td>${res.informePersons[i].Titulo}</td>
        <td>
            <a href="/informes/view/${res.informePersons[i].idInforme}" target="_blank" class="btn btn-outline-primary btn-sm" target='_blank'><i class="bi bi-eye-fill"></i></a>
            <a href="/informe/edit/${res.informePersons[i].idInforme}" target="_blank" class="btn btn-outline-success btn-sm"><i class="bi bi-pencil-square"></i></a>

        </td>
    </tr>
        `;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  showPerson();
});
