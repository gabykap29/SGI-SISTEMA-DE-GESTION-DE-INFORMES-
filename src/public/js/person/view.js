const seccionBuscar = document.getElementById('seccionBuscar');
const formFind = document.getElementById('find');
const registros = document.getElementById('registros')

document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    registros.innerHTML = `
    <tr>
        <td colspan="7" class="text-center">Aquí aparecerán los informes vinculados a la persona ingresada!</td>
    </tr>
`;    
})


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
        html: 'Buscando en todos los informes! <b></b>.',
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
        if(!res.informePersons){
            seccionBuscar.innerHTML = '';
            registros.innerHTML='';
            registros.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center">El dni ingresado, no coincide con los registros ingresados!</td>
                </tr>
            `;

            return            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La persona que busca no existe en la base de datos',

              })
 
            ;
        };
        seccionBuscar.innerHTML = `<div class='container'>
                                        <div class='row'>
                                            <div class='col-md-3'>
                                                <img src="/css/images/usuario.png" style="width: 90px;padding-top:20px" alt="">
                                            </div>
                                            <div class='col-md-9'>
                                                <p><b><u>Nombre y Apellido:</u></b> ${res.firstName} ${res.lastName}</p>
                                                <p><b><u>Documento:</u></b> ${res.dni}</p>
                                                <p><b><u>Domicilio:</u></b> ${res.address}</p>
                                                <p><b><u>Observaciones:</u></b> ${res.description}</p>
                                            </div>
                                        </div>
                                    </div>
        ` 
        registros.innerHTML = ''
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
            <td>
                <a href="/informes/view/${informe.idInforme}" target="_blank" class="btn btn-outline-primary btn-sm" target='_blank'>Ver</a>
                <a href="/informe/edit/${informe.idInforme}" target="_blank" class="btn btn-outline-success btn-sm">Editar</a>
                
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