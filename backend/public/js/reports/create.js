const formNuevoInforme = document.getElementById('formNuevoInforme');

formNuevoInforme.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const  Departamento_idDepartamento = document.getElementById('selecDepartamento').value;
    const Localidad_idLocalidad = document.getElementById('selecLocalidad').value;
    const Tipo_idTipo = document.getElementById('tipo').value;
    const Fecha = document.getElementById('fecha').value;
    const Titulo = document.getElementById('titulo').value;
    const RutaImagen = document.getElementById('rutaImagen').value;
    const Informe = document.getElementById('informe').value;

    const response = await fetch('http://localhost:3000/api/informes/create',{
        method:'POST',
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
        title:'Informe creado con éxito',
        text: respToJson.message
    })
    console.log(respToJson);
    formNuevoInforme.reset();
    setTimeout(()=>{
        window.location.href='/informes';
    },2000);
})