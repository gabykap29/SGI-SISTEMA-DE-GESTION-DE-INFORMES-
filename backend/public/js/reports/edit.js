const formEditar = document.getElementById('form-editar');
const departamento = document.getElementById('selecDepartamento');
const localidad = document.getElementById('selecLocalidad');
const tipo = document.getElementById('tipo');
const fecha = document.getElementById('fecha');
const titulo = document.getElementById('fecha');
const informe = document.getElementById('informe');



// Funcion para obtener los datos del informe cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {
    //capturar el id desde la url
    const url = window.location.href;
    const parts = url.split('/');
    const id = parts[parts.length - 1];
    const response = await fetch(`http://localhost:3000/api/informe/${id}`);
    const data = await response.json();
    console.log(data)
        departamento.value = data.Departamento_idDepartamento;
        localidad.value = data.Localidad_idLocalidad;
        tipo.value = data.Tipo_idTipo;
        fecha.value = data.Fecha;
        titulo.value=data.Titulo;
        informe.value = data.Tnforme
    });