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
    const response = await fetch(`/api/informe/${id}`);
    const data = await response.json();
        departamento.value = data.Departamento_idDepartamento;
        localidad.value = data.Localidad_idLocalidad;
        tipo.value = data.Tipo_idTipo;
        fecha.value = data.Fecha;
        titulo.value=data.Titulo;
        informe.value = data.Tnforme
    });

//Enviar los datos al backend

formEditar.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const url = window.location.href;
    const parts = url.split('/');
    const id = parts[parts.length - 1];
    const  Departamento_idDepartamento = document.getElementById('selecDepartamento').value;
    const Localidad_idLocalidad = document.getElementById('selecLocalidad').value;
    const Tipo_idTipo = document.getElementById('tipo').value;
    const Fecha = document.getElementById('fecha').value;
    const Titulo = document.getElementById('titulo').value;
    const RutaImagen = document.getElementById('rutaImagen').value;
    const Informe = document.getElementById('informe').value;
    console.log(
        Departamento_idDepartamento,
        Localidad_idLocalidad,
        Tipo_idTipo,
        Fecha,
        Titulo,
        RutaImagen,
        Informe)
    const response = await fetch(`/api/informes/edit/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            Departamento_idDepartamento,
            Localidad_idLocalidad,
            Tipo_idTipo,
            Fecha,
            Titulo,
            RutaImagen,
            Informe,
        }),
    });
    const respToJson = await response.json();
    if(response.status !== 201 && response.status !== 200){
        Swal.fire({
            icon:'error',
            title:respToJson.message,
        });
        return;
    }
    Swal.fire({
        icon:'success',
        title:'Informe actualizado con éxito',
        text: respToJson.message
    })
    console.log(respToJson);
    formEditar.reset();
    setTimeout(()=>{
        window.location.href='/informes/views';
    },2000);
})

