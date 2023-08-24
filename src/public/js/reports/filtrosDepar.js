const listadoInformes = document.querySelector('#div-tarjetas');

const obtenerInformes = async () => {
    const res = await fetch('/api/porDepar', {
    });

    if(res.status === 404 ) {
        return [];
    }

    const data = await res.json();
    return data;
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
    // Acceder a cada objeto "Departamento" y "CantidadInformes"
    const cantidadInformes = informes.cantidadInformes;
    let cantidadFormosa = 0;
    let cantidadPilcomayo = 0;
    let cantidadPilagas = 0;
    let cantidadLaishi = 0;
    let cantPirane = 0;
    let cantPatiño = 0;
    let cantidadBermejo = 0;
    let cantidadRamonLista = 0;
    let cantidadMatacos = 0;
    for (const item of cantidadInformes) {
      switch (item.Departamento) {
          case 1:
              cantidadFormosa = item.CantidadInformes;
              break;
          case 2:
              cantidadPilcomayo = item.CantidadInformes;
              break;
          case 3:
              cantidadPilagas = item.CantidadInformes;
              break;
          case 4:
              cantidadLaishi = item.CantidadInformes;
              break;
          case 5:
              cantPirane = item.CantidadInformes;
              break;
          case 6:
              cantPatiño = item.CantidadInformes;
              break;
          case 7:
              cantidadBermejo = item.CantidadInformes;
              break;
          case 8:
              cantidadRamonLista = item.CantidadInformes;
              break;
          case 9:
              cantidadMatacos = item.CantidadInformes;
              break;
          default:

              break;
      }
  

}
listadoInformes.innerHTML += `
<div class="tarjetas">
<div class="card">
    <img src="..." class="card-img-top" alt="">
  
    <div class="card-body">
      <h5 class="card-title">Formosa</h5>
      <div class="" id="">
        <h3 class="cantidad" id="cantFormosa">${cantidadFormosa}</h3>
      </div>
    </div>
  </div>
</div>
<div class="tarjetas">
<div class="card">
    <img src="..." class="card-img-top" alt="">
  
    <div class="card-body">
      <h5 class="card-title">Pilcomayo</h5>
      <h3 class="cantidad" id="cantPilcomayo">${cantidadPilcomayo}</h3>
    </div>
  </div>
</div>
<div class="tarjetas">
<div class="card">
    <img src="..." class="card-img-top" alt="">
  
    <div class="card-body">
      <h5 class="card-title">Pirané</h5>
      <h3 class="cantidad" id="cantPirane">${cantPirane}</h3>
    </div>
  </div>
</div>
<div class="tarjetas">
<div class="card">
    <img src="..." class="card-img-top" alt="">
  
    <div class="card-body">
      <h5 class="card-title">Laishí</h5>
      <h3 class="cantidad" id="cantLaishi">${cantidadLaishi}</h3>
    </div>
  </div>
</div>
<div class="tarjetas">
<div class="card">
    <img src="..." class="card-img-top" alt="">
  
    <div class="card-body">
      <h5 class="card-title">Pilagás</h5>
      <h3 class="cantidad" id="cantPilagas">${cantidadPilagas}</h3>
    </div>
  </div>
</div>
<div class="tarjetas">
<div class="card">
    <img src="..." class="card-img-top" alt="">
  
    <div class="card-body">
      <h5 class="card-title">Patiño</h5>
      <h3 class="cantidad" id="cantPatino">${cantPatiño}</h3>
    </div>
  </div>
</div>
<div class="tarjetas">
<div class="card">
    <img src="..." class="card-img-top" alt="">
  
    <div class="card-body">
      <h5 class="card-title">Bermejo</h5>
      <h3 class="cantidad" id="cantBermejo">${cantidadBermejo}</h3>
    </div>
  </div>
</div>
<div class="tarjetas">
<div class="card">
    <img src="..." class="card-img-top" alt="">
  
    <div class="card-body">
      <h5 class="card-title">Ramón Lista</h5>
      <h3 class="cantidad" id="cantRamonLista">${cantidadRamonLista}</h3>
    </div>
  </div>
</div>
<div class="tarjetas">
<div class="card">
    <img src="..." class="card-img-top" alt="">
  
    <div class="card-body">
      <h5 class="card-title">Matacos</h5>
      <h3 class="cantidad" id="cantMatacos">${cantidadMatacos}</h3>
    </div>
  </div>
</div>
        `;
    }
document.addEventListener('DOMContentLoaded', async () => {
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

  document.querySelectorAll('.eliminar-informe').forEach((boton) => {
    boton.addEventListener('click', eliminarInforme);
  });
});