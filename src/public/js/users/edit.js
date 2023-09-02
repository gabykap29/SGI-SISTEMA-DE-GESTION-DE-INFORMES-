const formEditar = document.getElementById('formEditar');
const lastName = document.getElementById('lastName');
const firstName = document.getElementById('firstName');
const username = document.getElementById('username');
const rol = document.getElementById('rol');
const password = document.getElementById('password');
const passwordConfirmation = document.getElementById('passwordConfirmation');

document.addEventListener('DOMContentLoaded', async () => {
    //capturar el id desde la url
    const url = window.location.href;
    const parts = url.split('/');
    const id = parts[parts.length - 1];
    const response = await fetch(`/api/usuario/${id}`);
    const data = await response.json();
        lastName.value = data.lastName;
        firstName.value = data.firstName;
        username.value = data.username;
        password.value = '***********';
        rol.value=rol.Titulo;
    });



// Escuchar el evento submit
formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = window.location.href;
    const parts = url.split('/');
    const id = parts[parts.length - 1];

    const data = {
        lastName: lastName.value,
        firstName: firstName.value,
        username: username.value,
        rol: rol.value,
        password: password.value,
    };
    try {
        const response = await fetch(`/api/usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const respToJson = await response.json();

        if (response.status !== 201 && response.status !== 200) {
            Swal.fire({
                icon: 'error',
                title: respToJson.message,
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado con éxito',
            text: respToJson.message 

        });
        setTimeout(() => {
            window.location.href = '/view/usuarios';
        }, 2000);

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Ha ocurrido un error al enviar el formulario'|| message
        });
    }
});
