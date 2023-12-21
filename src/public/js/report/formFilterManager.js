const btnPrevious = document.getElementById("btnPrevious");
const btnNext = document.getElementById("btnNext");
const listadoInformes = document.querySelector("#registros");
const completed = document.querySelectorAll(".completed");
const incomplete = document.querySelectorAll(".incomplete");
let page = 0;
let url = `/api/filtrar?`;

completed.forEach((element) => {
  const tooltip = document.createElement("span");
  tooltip.innerHTML = `<i class="bi bi-x-circle-fill"></i> Completado`;
  tooltip.classList.add("tooltip-content");

  element.appendChild(tooltip);

  element.addEventListener("mouseenter", () => {
    tooltip.style.display = "inline";
  });

  element.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
});

incomplete.forEach((element) => {
  const tooltip = document.createElement("span");
  tooltip.innerHTML = `<i class="bi bi-x-circle-fill"></i> No completado`;
  tooltip.classList.add("tooltip-content");

  element.appendChild(tooltip);

  element.addEventListener("mouseenter", () => {
    tooltip.style.display = "inline";
  });

  element.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
});






const obtenerInformes = async () => {
  const res = await fetch(url, {});

  if (res.status === 404) {
    return [];
  }

  const data = await res.json();

  return data;
};

const deleteButton = document.querySelectorAll(".eliminar-informe");
deleteButton.forEach((boton) => {
  boton.addEventListener("click", eliminarInforme);
});

const mostrarInformes = (informes) => {
  if (informes.length === 0) {
    listadoInformes.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">Ningun informe cargado coincide con la busqueda!</td>
            </tr>
        `;
    return;
  }
  let isComplete;
  listadoInformes.innerHTML = "";
  informes.forEach((informe) => {
    let fecha = dayjs(informe.Fecha).format("DD/MM/YYYY");
    informe.isComplete == true
      ? (isComplete = `<button class="btn btn-outline-success completed">
                                        <i class="bi bi-check-circle-fill"></i>
                                    </button>`)
      : (isComplete = `
                                    <button class="btn btn-outline-warning incomplete">
                                        <i class="bi bi-exclamation-triangle-fill"></i>
                                    </button>
                                    `);
    listadoInformes.innerHTML += `
                  <tr>
                      <td>${informe.InformesDepart.nombre}</td>
                      <td>${informe.InformesLocal.nombre}</td>
                      <td>${informe.Tipo.nombre}</td>
                      <td>${fecha}</td>
                      <td>${informe.Titulo}</td>
                      <td>${isComplete}</td>
                      <td>
                          <a href="/informes/view/${informe.idInforme}" target="_blank" class="btn btn-outline-primary btn-sm"><i class="bi bi-eye-fill"></i></a>
                          <a href="/informe/edit/${informe.idInforme}" target="_blank" class="btn btn-outline-success btn-sm"><i class="bi bi-pencil-square"></i></a>
                          <button id= "deleteButton" class="btn btn-outline-danger btn-sm eliminar-informe" data-id="${informe.idInforme}"><i class="bi bi-trash"></i></button>    
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

document
  .getElementById("formSearch")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    page = 0;
    // Obtener los valores ingresados en el formulario
    const departamentoId = document.getElementById("selecDepartamento").value;
    const localidadId = document.getElementById("selecLocalidad").value;
    const tipo = document.getElementById("tipo").value;
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFinal = document.getElementById("fechaFinal").value;
    const titulo = document.getElementById("titulo").value;
    const informe = document.getElementById("informe").value;
    const isComplete = document.getElementById('isComplete').value;
    try {
      url = `/api/filtrar?departamentoId=${departamentoId}&localidadId=${localidadId}&tipo=${tipo}&fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}&titulo=${titulo}&informe=${informe}&page=${page}&isComplete=${isComplete}`;
      const response = await fetch(url);
      const data = await response.json();
      mostrarInformes(data);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }



  });

document.addEventListener("DOMContentLoaded", async () => {
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
      mostrarInformes(informes);

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

btnPrevious.addEventListener("click", async () => {
  if (page >= 1) {
    page--;
    url = url.replace (`&page=${page+1}`,`&page=${page}`);
  };
  const response = await fetch(url);
  const data = await response.json();
  mostrarInformes(data);
});

btnNext.addEventListener("click", async () => {
  page++;
  if(url.includes('&page=')){
    url = url.replace (`&page=${page-1}`,`&page=${page}`);
  }else{
    url = url.concat(`&page=${page}`);
  };
  
  const response = await fetch(url);
  const data = await response.json();
  mostrarInformes(data);
});