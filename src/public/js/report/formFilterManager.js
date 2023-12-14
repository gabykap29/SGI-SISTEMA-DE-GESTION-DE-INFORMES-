const listadoInformes = document.querySelector("#registros");

const obtenerInformes = async () => {
  const res = await fetch(`/api/informes`, {});
  

  if (res.status === 404) {
    return [];
  }

  const data = await res.json();
  console.log(data);
  return data;
};

const deleteButton = document.querySelectorAll(".eliminar-informe");
deleteButton.forEach((boton) => {
  boton.addEventListener("click", eliminarInforme);
});

const mostrarInformes = (informes) => {
  // Si no hay tareas, mostrar un mensaje
  if (informes.length === 0) {
    listadoInformes.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">No hay informes cargados!</td>
            </tr>
        `;
    return;
  }

  informes.forEach((informe) => {
    console.log(informe);
    let fecha = dayjs(informe.Fecha).format("DD/MM/YYYY");
    listadoInformes.innerHTML += `
                  <tr>
                      <td>${informe.InformesDepart.nombre}</td>
                      <td>${informe.InformesLocal.nombre}</td>
                      <td>${informe.Tipo.nombre}</td>
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
};


const obtenerIdInforme = (elemento) => {
  while (elemento) {
    if (elemento.hasAttribute("data-id")) {
      return elemento.getAttribute("data-id");
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

document.addEventListener("DOMContentLoaded", async () => {
  const showInformes = (informes) => {
    // Si no hay tareas, mostrar un mensaje
    if (informes.length === 0) {
      listadoInformes.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">No hay informes cargados!</td>
            </tr>
        `;
      return;
    }


    informes.forEach((informe) => {
      console.log(informe);
      let fecha = dayjs(informe.Fecha).format("DD/MM/YYYY");
      listadoInformes.innerHTML += `
                    <tr>
                        <td>${informe.InformesDepart.nombre}</td>
                        <td>${informe.InformesLocal.nombre}</td>
                        <td>${informe.Tipo.nombre}</td>
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
  };

  try {
    const url = window.location.href;
    const parts = url.split("/");
    const id = parts[parts.length - 1];
    let confirmarId = parseInt(id);
    if (confirmarId) {
      const informesDepar = async () => {
        const res = await fetch(`/api/filtrar?departamentoId=${id}`, {});

        if (res.status === 404) {
          return [];
        }

        const data = await res.json();
        return data;
      };

      const informes = await informesDepar();
      showInformes(informes);

      const deleteButton = document.querySelectorAll(".eliminar-informe");
      deleteButton.forEach((boton) => {
        boton.addEventListener("click", (event) => {
          const idInforme = obtenerIdInforme(event.target);
          eliminarInforme(idInforme);
        });
      });
    } else {
      const informes = await obtenerInformes();
      mostrarInformes(informes);
      //Mostrar aqui
      const deleteButton = document.querySelectorAll(".eliminar-informe");
      deleteButton.forEach((boton) => {
        boton.addEventListener("click", (event) => {
          const idInforme = obtenerIdInforme(event.target);
          eliminarInforme(idInforme);
        });
      });
    }
  } catch (error) {
    console.log({ error });

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});