const formNuevoInforme = document.getElementById('formNuevoInforme');


formNuevoInforme.addEventListener('submit', async (e) => {
  e.preventDefault();
  const Departamento_idDepartamento = document.getElementById('selecDepartamento').value;
  const Localidad_idLocalidad = document.getElementById('selecLocalidad').value;
  const Tipo_idTipo = document.getElementById('tipo').value;
  const Fecha = document.getElementById('fecha').value;
  const Titulo = document.getElementById('titulo').value;
  const informe = document.getElementById('informe').value;

  try {
    const response = await fetch('/api/informes/create', {
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
              informe,
            }),
          });

    const respToJson = await response.json();
    if (response.status !== 201 && response.status !== 200) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Algunos campos del formulario están incompletos!'
      });
      return;
    }
    Swal.fire({
      icon: 'success',
      title: 'Informe creado con éxito',
      text: respToJson.message
    });
    formNuevoInforme.reset();
    setTimeout(() => {
      window.location.href = '/informes/view/'+ respToJson.idInforme;
    }, 2000);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Ha ocurrido un error al enviar el formulario, por favor, actualice la pagina!'
    });
  }
});


