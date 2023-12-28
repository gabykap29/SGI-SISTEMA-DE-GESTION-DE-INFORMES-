const tableTypes = document.getElementById("table-types");
const formTipo = document.getElementById("formTipo");

const getTipo = async () => {
  const res = await fetch("/api/informes/tipos");
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    console.log("Error al obtener los tipos de informe");
    return [];
  }
};

const showTipo = async (tipos) => {
  tipos.data.forEach((tipo, index) => {
    tableTypes.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${tipo.nombre}</td>
            <td>
                <button class="btn-delete-type btn btn-danger btn-sm" data-id="${
                  tipo.idTipo
                }"><i class="bi bi-trash-fill"></i></button>
            </td>
        </tr>
        `;
  });
};

const deleteType = async (id) => {
  Swal.fire({
    title: "¿Estás seguro?",
    icon: "warning",
    text: "Esta acción no se puede revertir, se eliminaran todos los informes que tengan este tipo",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Estoy seguro",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/informes/tipos/delete/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        Swal.fire({
          icon: "success",
          title: "Tipo de informe eliminado",
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

const getIdType = (elemento) => {
  while (elemento) {
    if (elemento.hasAttribute("data-id")) {
      return elemento.getAttribute("data-id");
    }
    elemento = elemento.parentElement;
  }
  return null;
};

document.addEventListener("DOMContentLoaded", async () => {
  const tipos = await getTipo();
  showTipo(tipos);

  formTipo.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newTipo = document.getElementById("Tipo").value;

    const res = await fetch("/api/informes/tipos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre: newTipo }),
    });
    if (res.ok) {
      const data = await res.json();
      Swal.fire({
        icon: "success",
        title: "Tipo de informe creado",
        text: data.message,
      });
      showTipo(await getTipo());
    } else {
      const data = await res.json();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message,
      });
    }
  });
  const deleteButton = document.querySelectorAll(".btn-delete-type");
  deleteButton.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      const idType = getIdType(event.target);
      deleteType(idType);
    });
  });
});
