const formNuevoInforme = document.getElementById('formNuevoInforme');

formNuevoInforme.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const departamento = document.getElementById('selecDepartamento').value;
    const localidad = document.getElementById('selecLocalidad').value;
    const fecha = document.getElementById('fecha').value;
    const titulo = document.getElementById('titulo').value;
    const imagen = document.getElementById('rutaImagen').value;
    const informe = document.getElementById('informe').value;

    const response = await fetch('http://localhost:3000/api/informes/create',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            departamento,
            localidad,
            fecha,
            titulo,
            imagen,
            informe,
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
        window.location.href='/informes/create';
    },2000);
})