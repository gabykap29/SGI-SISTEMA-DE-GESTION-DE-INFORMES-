const listadoUsuarios = document.querySelector('#usuarios');

const obtenerUsuarios = async () => {
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


const mostrarUsuarios = (usuarios) => {

    // Si no hay tareas, mostrar un mensaje
    if(usuarios.length === 0){
        listadoUsuarios.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">No hay tareas registradas</td>
            </tr>
        `;
        return;
    };
   

    usuarios.forEach(usuario => {
        let fecha = dayjs(usuario.CreatedAt).format('DD/MM/YYYY');
        let rol = usuario.rol;
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
        listadoUsuarios.innerHTML += `
                    <tr>
                        <td>${usuario.username}</td>
                        <td>${usuario.lastName}</td>
                        <td>${usuario.firstName}</td>
                        <td>${rol}</td>
                        <td>${fecha}</td>
                        <td>
                            <a href="/usuario/edit/${usuario.id}" class="btn btn-outline-primary btn-sm">Modificar</a>
                            
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
    const usuarios = await obtenerUsuarios();     
    mostrarUsuarios(usuarios);
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