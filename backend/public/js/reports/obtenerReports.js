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

const eliminarReservas = async (event) => {
    const id = event.target.dataset.id;

    try {
        const res = await fetch(`http://localhost:3000/api/informes/${id}`, {
            method: 'DELETE'
        });

        const data = await res.json();

        console.log(data);

        Swal.fire({
            icon: 'success',
            title: 'Reserva eliminada',
            text: data.message,
        });
        
        setTimeout(() => {
            window.location.reload();
        }, 2200);

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        })
    }

}

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

    informes.forEach(informe => {
        listadoInformes.innerHTML += `
                    <tr>
                        <td>${informe.Departamento_idDepartamento}</td>
                        <td>${informe.Localidad_idLocalidad}</td>
                        <td>${informe.Tipo_idTipo}</td>
                        <td>${informe.Fecha}</td>
                        <td>${informe.Titulo}</td>
                        <td>${informe.Informe}</td>
                        <td>
                            <button onclick=eliminarReservas(event) class="btn btn-danger btn-sm" data-id="${informe.id}">Eliminar</button>
                            <a href="http://localhost:3000/api/informe/${informe.id}" class="btn btn-warning btn-sm">Editar</a>
                        </td>
                    </tr>
                `;
    });
}


document.addEventListener('DOMContentLoaded', async () => {

    console.log('DOM cargado')

    // Dentro de try se coloca el código que se quiere ejecutar
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
});