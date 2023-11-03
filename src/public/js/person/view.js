const dni = document.getElementById('dni');
const imgPerson = document.getElementById('imgPerson');
const fechaNac = document.getElementById('fechaNac');
const adress = document.getElementById('adress');
const completeName = document.getElementById('completeName');
const created = document.getElementById('created');
const work = document.getElementById('work');
const mail = document.getElementById('mail');
const phone = document.getElementById('phone');
const facebook = document.getElementById('facebook');
const instagram = document.getElementById('instagram');
const registros = document.getElementById('registros');
//capturar el id desde la url
const url = window.location.href;
const parts = url.split("/");
const id = parts[parts.length - 1];

let departamento = [
    null,
    "Formosa",
    "Pilcomayo",
    "Pilagas",
    "Laishi",
    "Pirané",
    "Patiño",
    "Bermejo",
    "Ramon Lista",
    "Matacos",
  ];
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
    "Ing. Juarez",
  ];


const getPerson = async ()=>{
    const res = await fetch(`/api/person/${id}'`);
    if(res.status === 404){
        return [];
    };
    const data = await res.json();
    return data;
}

const showPerson = async ()=>{
    const url = window.location.href;
    const parts = url.split("/");
    const Url = parts[parts.length - 4];
    const res = await getPerson();
    completeName.innerHTML= `${res.firstName} ${res.lastName}`;
    dni.innerHTML = `DNI: ${res.dni}`;
    fechaNac.innerHTML = `Fecha de Nac: ${dayjs(res.birthDate).format('DD/MM/YYYY')}`;
    adress.innerHTML = `Dirección: ${res.address}`;
    imgPerson.src = 'https://'+Url + res.ImgPersons.rutaImagen;
    work.innerHTML = `Trabajo: ${res.work}`;
    mail.innerHTML = `Email: ${res.mail}`;
    phone.innerHTML = `Teléfono: ${res.phone}`;
    facebook.innerHTML = `Facebook: ${res.facebook}`;
    instagram.innerHTML = `Instagram: ${res.instagram}`;
    console.log(res)
    for(let i = 0; i < res.informePersons.length; i++){
        let idDepar = res.informePersons[i].Departamento_idDepartamento; 
        let Departamento = departamento[idDepar];
        let idLocal = res.informePersons[i].Localidad_idLocalidad;
        let Localidad = localidad[idLocal];
        let Tipo = res.informePersons[i].Informes.nombre;
        let fecha = dayjs(res.informePersons[i].Fecha).format('DD/MM/YYYY');
        registros.innerHTML += `
        <tr>
        <td>${Departamento}</td>
        <td>${Localidad}</td>
        <td>${Tipo}</td>
        <td>${fecha}</td>
        <td>${res.informePersons[i].Titulo}</td>
        <td>
            <a href="/informes/view/${res.informePersons[i].idInforme}" target="_blank" class="btn btn-outline-primary btn-sm" target='_blank'>Ver</a>
            <a href="/informe/edit/${res.informePersons[i].idInforme}" target="_blank" class="btn btn-outline-success btn-sm">Editar</a>
            
        </td>
    </tr>
        `
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    showPerson();
})










        

        


