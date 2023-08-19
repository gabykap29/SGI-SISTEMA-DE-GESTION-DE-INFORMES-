const deletebtn = document.querySelectorAll('.eliminar-informe');
deletebtn.forEach((boton) => {
  boton.addEventListener('click', eliminarInfo);
});

const eliminarInfo = async (idInforme) => {
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

document.getElementById('formSearch').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
  
    // Obtener los valores ingresados en el formulario
    const departamentoId = document.getElementById('selecDepartamento').value;
    const localidadId = document.getElementById('selecLocalidad').value;
    const tipo = document.getElementById('tipo').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFinal = document.getElementById('fechaFinal').value;
    const titulo = document.getElementById('titulo').value;
    const informe = document.getElementById('informe').value;
  
    // Construir la URL con los parámetros de consulta
    const url = `/api/filtrar?departamentoId=${departamentoId}&localidadId=${localidadId}&tipo=${tipo}&fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}&titulo=${titulo}&informe=${informe}`;
    try {
      // Realizar la solicitud GET al backend
      const response = await fetch(url);
      const data = await response.json();
  
      // Manipular la respuesta del backend, por ejemplo, actualizar el DOM con los resultados
      mostrar(data);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      // Manejar el error de la solicitud, por ejemplo, mostrar un mensaje de error al usuario
    }
  });
  
  const mostrar = (informes) => {
    const listadoInformes = document.getElementById('registros');
  
    // Si no hay informes, mostrar un mensaje
    if (informes.length === 0) {
      listadoInformes.innerHTML = `
        <tr>
          <td colspan="7" class="text-center">No hay informes registrados</td>
        </tr>
      `;
      return;
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
    "F Laishi",
    "Gral. Mansilla",
    "Herradura",
    "Yatai",
    "MisiÃ³n Tacaagle",
    "Laguna Gallo",
    "Tres Lagunas",
    "El Espinillo",
    "PiranÃ©",
    "El Colorado",
    "Villa Dos Trece",
    "Mayor VillafaÃ±e",
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
    "BartolomÃ© De Las Casas",
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
  
    let html = '';
    informes.forEach(informe => {
      let Departamento = departamento[informe.Departamento_idDepartamento];
      let Localidad = localidad[informe.Localidad_idLocalidad];
      let Tipo = tipo[informe.Tipo_idTipo];
      let fecha = dayjs(informe.Fecha).format('DD/MM/YYYY');
  
      html += `
        <tr>
          <td>${Departamento}</td>
          <td>${Localidad}</td>
          <td>${Tipo}</td>
          <td>${fecha}</td>
          <td>${informe.Titulo}</td>
          <td>${informe.Informe}</td>
          <td>
            <a href="/informes/view/${informe.idInforme}" class="btn btn-outline-primary btn-sm">Ver</a>
            <a href="/informe/edit/${informe.idInforme}" class="btn btn-outline-success btn-sm">Editar</a>
            <button id= "deletebtn" class="btn btn-outline-danger btn-sm eliminar-informe" data-id="${informe.idInforme}">Eliminar</button>
          </td>
        </tr>
      `;
    });
  
    listadoInformes.innerHTML = html;
  };
  
document.addEventListener('DOMContentLoaded',async ()=>{
      // Obtener la fecha actual
      let fechaActual = new Date().toISOString().split("T")[0];
      // Asignar la fecha actual al campo de fecha
      document.getElementById("fechaInicio").value = fechaActual;
      document.getElementById("fechaFinal").value = fechaActual;
});
