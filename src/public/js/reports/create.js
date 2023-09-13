const formNuevoInforme = document.getElementById('formNuevoInforme');
const formPeople = document.getElementById('formPeople');
const btnPeople = document.getElementById('btnPeople')
btnPeople.addEventListener('click', async (e)=>{
  e.preventDefault();
  formPeople.innerHTML +=`
  <br>
  <div>
  <button class="verMenos" id="verMenos"><img src="/css/images/menos.png" style="width: 25px;alt="ver menos"></button>
  </div>
    <div class="card col-5">
      <br>
      <div class="col-md-4">
        <label for="validationCustom01" class="form-label">DNI</label>
        <input type="text" class="form-control" id="dni" name="dni" placeholder="41176787" >
      </div>
      <div class="col">
        <label for="validationCustom02" class="form-label">Apellido</label>
        <input type="text" class="form-control" id="lastName" name="lastName">
      </div>
      <div class="col>
        <label for="validationCustomUsername" class="form-label">Nombres</label>
        <div class="input-group has-validation">
          <input type="text" class="form-control" id="firstName" name="firstName" aria-describedby="inputGroupPrepend">
        </div>
      </div>
      <div class="col>
        <label for="validationCustom03" class="form-label">Domicilio</label>
        <input type="text" class="form-control" id="address" name="address">
      </div>
      <div class="col">
        <label for="validationCustom05" class="form-label">Observaciones</label>
        <textarea type="text" class="form-control" id="description" name="description" ></textarea>
      </div>
      </div>
    </div>
  `
  const btnMenos = document.querySelector('.verMenos');
  btnMenos.addEventListener('click',async(e)=>{
    e.preventDefault();
    formPeople.innerHTML= "";
  })
  
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

  const dni = document.querySelectorAll('input[id^="dni"]');
  const firstNames = document.querySelectorAll('input[id^="firstName"]');
  const lastNames = document.querySelectorAll('input[id^="lastName"]');
  const addresses = document.querySelectorAll('input[id^="address"]');
  const descriptions = document.querySelectorAll('textarea[id^="description"]');

  const formData = new FormData();

  formData.append('Departamento_idDepartamento', Departamento_idDepartamento);
  formData.append('Localidad_idLocalidad', Localidad_idLocalidad);
  formData.append('Tipo_idTipo', Tipo_idTipo);
  formData.append('Fecha', Fecha);
  formData.append('Titulo', Titulo);
  formData.append('Observaciones', Observaciones);
  formData.append('rutaImagen', document.getElementById('rutaImagen').files[0]);
  formData.append('Informe', Informe);

  dni.forEach((input, index) => {
      formData.append(`persons[${index}][dni]`, input.value);
      formData.append(`persons[${index}][firstName]`, firstNames[index].value);
      formData.append(`persons[${index}][lastName]`, lastNames[index].value);
      formData.append(`persons[${index}][address]`, addresses[index].value);
      formData.append(`persons[${index}][description]`, descriptions[index].value);
  });
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
      text: 'Ha ocurrido un error al enviar el formulario, por favor, actualice la pagina!'
    });
  }
});


