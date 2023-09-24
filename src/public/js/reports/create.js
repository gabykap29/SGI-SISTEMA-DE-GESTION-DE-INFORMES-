const formNuevoInforme = document.getElementById('formNuevoInforme');
const formPeople = document.getElementById('formPeople');
const btnPeople = document.getElementById('btnPeople')
const guardarPersona = document.getElementById('guardarPersona');

let arrayPersonas = [];


guardarPersona.addEventListener('click',(e) => {
  e.preventDefault()
  
  const formPerson = document.getElementById('formPerson');
  const dni = document.getElementById('dni').value;
  const firstNames = document.getElementById('firstName').value;
  const lastNames = document.getElementById('lastName').value;
  const addresses = document.getElementById('address').value;
  const descriptions = document.getElementById('description').value;

  const person = {
    dni:dni,
    firstNames:firstNames,
    lastNames:lastNames,
    addresses:addresses,
    descriptions:descriptions,
  }
 
  arrayPersonas.push(person);
  console.log(arrayPersonas);
  Swal.fire({
    icon: 'success',
  });

});



formNuevoInforme.addEventListener('submit', async (e) => {
  e.preventDefault();

  const Departamento_idDepartamento = document.getElementById('selecDepartamento').value;
  const Localidad_idLocalidad = document.getElementById('selecLocalidad').value;
  const Tipo_idTipo = document.getElementById('tipo').value;
  const Fecha = document.getElementById('fecha').value;
  const Titulo = document.getElementById('titulo').value;
  const Observaciones = document.getElementById('observaciones').value
  const Informe = document.getElementById('informe').value;


  const formData = new FormData();
  const personsJson = JSON.stringify(arrayPersonas);
  formData.append('Departamento_idDepartamento', Departamento_idDepartamento);
  formData.append('Localidad_idLocalidad', Localidad_idLocalidad);
  formData.append('Tipo_idTipo', Tipo_idTipo);
  formData.append('Fecha', Fecha);
  formData.append('Titulo', Titulo);
  formData.append('Observaciones', Observaciones);
  formData.append('rutaImagen', document.getElementById('rutaImagen').files[0]);
  formData.append('Informe', Informe);
  console.log(arrayPersonas);
  formData.append('Persons',personsJson);

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
    formNuevoInforme.reset();
    setTimeout(() => {
      window.location.href = '/informes/views';
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


