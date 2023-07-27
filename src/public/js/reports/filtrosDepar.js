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
        if(item.Departamento === 1){
            cantidadFormosa = item.CantidadInformes;
        }else if(item.Departamento === 2){
            cantidadPilcomayo = item.CantidadInformes;
        }else if(item.Departamento === 3){
            cantidadPilagas = item.CantidadInformes;
        }else if(item.Departamento === 4){
            cantidadLaishi = item.CantidadInformes;
        }else if(item.Departamento === 5){
            cantPirane = item.CantidadInformes;
        }else if(item.Departamento === 6){
            cantPatiño = item.CantidadInformes;
        }else if(item.Departamento === 7){
            cantidadBermejo = item.CantidadInformes;
        }else if(item.Departamento === 8){
            cantidadRamonLista = item.CantidadInformes;
        }else if(item.Departamento === 9){
            cantidadMatacos = item.CantidadInformes;
        }

}
listadoInformes.innerHTML += `
<div class="tarjetas">
<div class="card">
    <img src="..." class="card-img-top" alt="">
  
    <div class="card-body">
      <h5 class="card-title">Formosa</h5>
      <div class="cantidad" id="">
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
      <h3 class="cantidad" id="cantPirane">${cantidadPilagas}</h3>
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
      <h3 class="cantidad" id="cantPilagas">${cantPirane}</h3>
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




// const eliminarInforme = async (event) => {
//   const id = event.target.dataset.id;
//   console.log("The button was clicked!");

//   Swal.fire({
//     title: "Estás seguro?",
//     text: `Estás por eliminar un informe del sistema!`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Estoy seguro!",
//     cancelButtonText: "Cancelar",
//   }).then(async (result) => {
//     if (result) {
//       try {
//         const res = await fetch(
//           `/api/informes/deleted/${id}`,
//           {
//             method: "DELETE",
//           }
//         );

//         const data = await res.json();

//         Swal.fire({
//           icon: "success",
//           title: "Informe eliminado",
//           text: data.message,
//         });

//         setTimeout(() => {
//           window.location.reload();
//         }, 2200);
//       } catch (error) {
//         console.log(error);
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: error.message,
//         });
//       }
//     }
//   });
// };

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