// const documentFind = document.getElementById('documentFind');
// const simpleFind = document.getElementById('simpleFind');
const seccionBuscar = document.getElementById('seccionBuscar');
const formFind = document.getElementById('find');
const registros = document.getElementById('registros')
// documentFind.addEventListener('click',(e)=>{
//     e.preventDefault();
//     seccionBuscar.innerHTML = `
//     <br>
//         <div class="col-md-4">
//             <label for="validationDefault01" class="form-label">DNI</label>
//             <input type="text" class="form-control" id="dni" placeholder="32190897" required>
//         </div>
//         <br>
//         <button class='btn btn-success'>Buscar</button>
//     `
// })
// simpleFind.addEventListener('click',(e)=>{
//     e.preventDefault();
//     seccionBuscar.innerHTML = `
//     <br>
//     <div class='container'>
//         <div class='row'>
//             <div class="col-md-4">
//                 <label for="validationDefault01" class="form-label">Apellido</label>
//                 <input type="text" class="form-control" id="firstName" placeholder="Kent" required>
//             </div>
//             <div class="col-md-4">
//             <label for="validationDefault01" class="form-label">Nombre</label>
//             <input type="text" class="form-control" id="lastName" placeholder="Clark" required>
//             </div>
//         </div>
//         <br>
//         <button class='btn btn-success'>Buscar</button>
//     </div>
//     `
// })
formFind.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const dni = document.getElementById('dni').value;
    const data = {
        dni: dni,
    }
    try {
        const response = await fetch('/api/find/person',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data),
        });
        const res = await response.json(); 

        let timerInterval
        Swal.fire({
        title: 'Buscando en base de datos',
        html: 'I will close in <b></b> milliseconds.',
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
        console.log(res.informePersons)
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
            "Hídricos"
        ]
        seccionBuscar.innerHTML = `<div class='container'>
                                        <div class='row'>
                                            <div class='col-md-3'>
                                                <img src="/css/images/usuario.png" style="width: 90px;" alt="">
                                            </div>
                                            <div class='col-md-7'>
                                                <p>Nombre y Apellido: ${res.firstName} ${res.lastName}</p>
                                                <p>Documento: ${res.dni}</p>
                                                <p>Domicilio: ${res.address}</p>
                                                <p>Observaciones: ${res.description}</p>
                                            </div>
                                        </div>
                                    </div>
        `
        res.informePersons.forEach(informe =>{
            let Departamento = departamento[informe.Departamento_idDepartamento];
            let Localidad = localidad[informe.Localidad_idLocalidad]
            let Tipo = tipo[informe.Tipo_idTipo]
            let fecha = dayjs(informe.Fecha).format('DD/MM/YYYY');
            registros.innerHTML += `
            <tr>
            <td>${Departamento}</td>
            <td>${Localidad}</td>
            <td>${Tipo}</td>
            <td>${fecha}</td>
            <td>${informe.Titulo}</td>
            <td>${informe.Informe}</td>
            <td>
                <a href="/informes/view/${informe.idInforme}" class="btn btn-outline-primary btn-sm" target='_blank'>Ver</a>
                <a href="/informe/edit/${informe.idInforme}" class="btn btn-outline-success btn-sm">Editar</a>
                
            </td>
        </tr>
            `
        })


})
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }

}) 