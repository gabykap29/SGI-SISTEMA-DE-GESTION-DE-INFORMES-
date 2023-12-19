const newReport = document.getElementById('newReport');


const sendForm = async () => {
    const Departamento_idDepartamento = document.getElementById('selecDepartamento').value;
    const Localidad_idLocalidad = document.getElementById('selecLocalidad').value;
    const Tipo_idTipo = document.getElementById('tipo').value;
    const Fecha = document.getElementById('fecha').value;
    const Titulo = document.getElementById('titulo').value;
    const informe = document.getElementById('informe').value;
    const isComplete = document.getElementById('isCompleted').checked;
    try {
        const response = await fetch('/api/informes/create', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Departamento_idDepartamento,
                Localidad_idLocalidad,
                Tipo_idTipo,
                Fecha,
                Titulo,
                informe,
                isComplete,
            }),
          });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

newReport.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = await sendForm();

    if (data) {
        Swal.fire({
            title: 'Informe creado con éxito!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn btn-primary', // Agrega la clase 'btn btn-primary' de Bootstrap
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/index';
            }
        });
    } else {
        Swal.fire({
            title: 'Error al crear el informe',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'btn btn-primary', // Agrega la clase 'btn btn-primary' de Bootstrap
              }
        });
    }
});
