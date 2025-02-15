const tablePerson = document.getElementById("tablePerson");
const find = document.getElementById("find");

const getPerson = async (dni, firstName, lastName) => {
  try {
    const res = await fetch(
      `/api/persons/?dni=${dni}&firstName=${firstName}&lastName=${lastName}`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al obtener los datos.",
    });
    return [];
  }
};

find.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dni = document.getElementById("dni").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;

  if (!dni && !firstName && !lastName) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debe ingresar al menos un campo!",
    });
    return [];
  }
  const person = await getPerson(dni, firstName, lastName);
  let timerInterval;
  Swal.fire({
    title: "Buscando...",
    timer: 1000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      //Mostrar las personas en el dom
      for (let i = 0; i < person.length; i++) {
        let dni = person[i].dni;
        let firstName = person[i].firstName;
        let lastName = person[i].lastName;
        let fechaNac = person[i].fechaNac;
        let address = person[i].address;
        tablePerson.innerHTML = `
            <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr class="table-primary">
                        <th scope="col"><i class="bi bi-list-ol"></i></th>
                        <th scope="col">DNI</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Clase</th>
                        <th scope="col">Domicilio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">${i}</th>
                        <td>${dni}</td>
                        <td>${firstName}</td>
                        <td>${lastName}</td>
                        <td>${fechaNac}</td>
                        <td>${address}</td>
                        <td>
                            <a href="/ver/persona/${person[i].idPerson}" target="_blank" class="btn btn-outline-primary btn-sm" target='_blank'>Ver</a>

                        </td>
                        </tr>
                </tbody>
            </table>
            </div>
            `;
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error en la busqueda!",
      });
      tablePerson.innerHTML =
        "<h3>No se encontraron resultados que coincidan con su búsqueda </h3>";
    }
  });
});
