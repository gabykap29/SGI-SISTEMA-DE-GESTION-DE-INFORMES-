const formNuevoInforme = document.getElementById('formNuevoInforme');

formNuevoInforme.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const Departamento_idDepartamento = document.getElementById('selecDepartamento').value;
  const Localidad_idLocalidad = document.getElementById('selecLocalidad').value;
  const Tipo_idTipo = document.getElementById('tipo').value;
  const Fecha = document.getElementById('fecha').value;
  const Titulo = document.getElementById('titulo').value;
  const Informe = document.getElementById('informe').value;

  const formData = new FormData();
  formData.append('Departamento_idDepartamento', Departamento_idDepartamento);
  formData.append('Localidad_idLocalidad', Localidad_idLocalidad);
  formData.append('Tipo_idTipo', Tipo_idTipo);
  formData.append('Fecha', Fecha);
  formData.append('Titulo', Titulo);
  formData.append('rutaImagen', document.getElementById('rutaImagen').files[0]);
  formData.append('Informe', Informe);

  try {
    const response = await fetch('/api/informes/create', {
      method: 'POST',
      body: formData
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
    console.log(respToJson);
    formNuevoInforme.reset();
    setTimeout(() => {
      window.location.href = '/informes/views';
    }, 2000);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Ha ocurrido un error al enviar el formulario'
    });
  }
});