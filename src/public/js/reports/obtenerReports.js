const listadoInformes = document.querySelector('#registros');

const obtenerInformes = async () => {
    const res = await fetch('/api/informes', {
    });

    if(res.status === 404 ) {
        return [];
    }

    const data = await res.json();
    return data;
}

const deleteButton = document.querySelectorAll('.eliminar-informe');
deleteButton.forEach((boton) => {
  boton.addEventListener('click', eliminarInforme);
});


const mostrarInformes = (informes) => {

    // Si no hay tareas, mostrar un mensaje
    if(informes.length === 0){
        listadoInformes.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">No hay informes cargados!</td>
            </tr>
        `;
        return;
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
        "Hídricos"
    ]
      

    informes.forEach(informe => {
        let Departamento = departamento[informe.Departamento_idDepartamento];
        let Localidad = localidad[informe.Localidad_idLocalidad]
        let Tipo = tipo[informe.Tipo_idTipo]
        let fecha = dayjs(informe.Fecha).format('DD/MM/YYYY');
        listadoInformes.innerHTML += `
                    <tr>
                        <td>${Departamento}</td>
                        <td>${Localidad}</td>
                        <td>${Tipo}</td>
                        <td>${fecha}</td>
                        <td>${informe.Titulo}</td>
                        <td>
                            <a href="/informes/view/${informe.idInforme}" target="_blank" class="btn btn-outline-primary btn-sm">Ver</a>
                            <a href="/informe/edit/${informe.idInforme}" target="_blank" class="btn btn-outline-success btn-sm">Editar</a>
                            <button id= "deleteButton" class="btn btn-outline-danger btn-sm eliminar-informe" data-id="${informe.idInforme}">Eliminar</button>
                            
                        </td>
                    </tr>
                `;
    });
}


const obtenerIdInforme = (elemento) => {
  while (elemento) {
    if (elemento.hasAttribute('data-id')) {
      return elemento.getAttribute('data-id');
    }
    elemento = elemento.parentElement;
  }
  return null;
};

const eliminarInforme = async (idInforme) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Estás por eliminar un informe del sistema.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Estoy seguro",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/informes/deleted/${idInforme}`, {
          method: "PUT",
        });

        const data = await res.json();

        Swal.fire({
          icon: "success",
          title: "Informe eliminado",
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

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const informes = await obtenerInformes();
    mostrarInformes(informes);

    const deleteButton = document.querySelectorAll('.eliminar-informe');
    deleteButton.forEach((boton) => {
      boton.addEventListener('click', (event) => {
        const idInforme = obtenerIdInforme(event.target);
        eliminarInforme(idInforme);
      });
    });

    const url = window.location.href;
    const parts = url.split('/');
    const id = parts[parts.length - 1];


    if(id != null || undefined){



      
    }


  } catch (error) {
    console.log({ error });

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
  }
});
