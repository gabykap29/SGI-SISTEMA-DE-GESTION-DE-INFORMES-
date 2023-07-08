const listadoInformes = document.querySelector('#registros');

const obtenerInformes = async () => {
    const res = await fetch('http://localhost:3000/api/informes', {
    });

    if(res.status === 404 ) {
        return [];
    }

    const data = await res.json();
    return data;
}

const eliminarInforme = async (event) => {
    const id = event.target.dataset.id;
  
    Swal.fire({
      title: "Estás seguro?",
      text: `Estás por eliminar un informe del sistema!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Estoy seguro!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result) {
        try {
          const res = await fetch(
            `http://localhost:3000/api/informes/deleted/${id}`,
            {
              method: "DELETE",
            }
          );
  
          const data = await res.json();
  
          Swal.fire({
            icon: "success",
            title: "Empleado eliminado",
            text: data.message,
          });
  
          setTimeout(() => {
            window.location.reload();
          }, 2200);
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        }
      }
    });
  };

const mostrarInformes = (informes) => {

    // Si no hay tareas, mostrar un mensaje
    if(informes.length === 0){
        listadoInformes.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">No hay tareas registradas</td>
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
        "Religioso"
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
                        <td>${informe.Informe}</td>
                        <td>
                            <a href="http://localhost:3000/informes/view/${informe.idInforme}" class="btn btn-outline-primary btn-sm">Ver</a>
                            <a href="http://localhost:3000/informe/edit/${informe.idInforme}" class="btn btn-outline-success btn-sm">Editar</a>
                            <button class="btn btn-outline-danger btn-sm eliminar-informe" data-id="${informe.id}">Eliminar</button>
                            
                        </td>
                    </tr>
                `;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const informes = await obtenerInformes();     
    mostrarInformes(informes);
} catch (error) {  // Dentro de catch se coloca el código que se ejecutará en caso de que haya un error
    console.log({ error });

    // Mensaje para el usuario
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
    });
}

  document.querySelectorAll('.eliminar-informe').forEach((boton) => {
    boton.addEventListener('click', eliminarInforme);
  });
});