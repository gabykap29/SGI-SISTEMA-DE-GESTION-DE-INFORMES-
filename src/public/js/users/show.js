const userList = document.querySelector('#usuarios');

const getUser = async () => {
    const res = await fetch('/api/usuarios', {
    });

    if(res.status === 404 ) {
        return [];
    }

    const data = await res.json();
    return data;
}

const deleteButton = document.querySelectorAll('.eliminar-informe');
deleteButton.forEach((boton) => {
  boton.addEventListener('click', eliminarUsuario);
});


const showUser = (users) => {

    // Si no hay tareas, mostrar un mensaje
    if(users.length === 0){
        userList.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">No hay usuarios registrados</td>
            </tr>
        `;
        return;
    };
   

    users.forEach((user,index) => {
        let fecha = dayjs(user.CreatedAt).format('DD/MM/YYYY');
        let rol = user.rol;
        switch(rol){
          case "Moderate":
            rol = "Administrador";
            break;
          case "User":
            rol = "Usuario";
            break;
          case "Other":
            rol = "Visualizador"
            break;
        }
        userList.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${user.username}</td>
                        <td>${user.lastName}</td>
                        <td>${user.firstName}</td>
                        <td>${rol}</td>
                        <td>${fecha}</td>
                        <td>
                            <a href="/usuario/edit/${user.id}" class="btn btn-outline-success btn-sm"><i class="bi bi-pencil-square"></i></a>
                            
                        </td>
                    </tr>
                `;
    });
}



const eliminarUsuario = async (event) => {
  const id = event.target.params;

  Swal.fire({
    title: "Estás seguro?",
    text: `Estás por eliminar un usuario del sistema!`,
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
          `/api/usuario/delete/${id}`,
          {
            method: "DELETE",
          }
        );

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
          title: "Oops...",
          text: error.message,
        });
      }
    }
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const users = await getUser();     
    showUser(users);
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
    boton.addEventListener('click', eliminarUsuario);
  });
});