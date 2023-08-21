document.addEventListener('DOMContentLoaded', async () => {
    // Obtener una referencia al elemento canvas del DOM
    const $grafica = document.querySelector("#grafica");
    // Las etiquetas son las que van en el eje X. 
    const etiquetas = ['Formosa', 'Pilcomayo', 'Pilagas', 'Laishi', 'Pirané', 'Patiño', 'Bermejo', 'Ramon Lista', 'Matacos']

    const obtenerInformes = async () => {
        const res = await fetch('/api/porDepar');
        if (res.status === 404) {
            return [];
        }
        const data = await res.json();
        return data;
    }

    const data = await obtenerInformes();
    const cantidadInformes = data.cantidadInformes;
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
      }}
      let cantidades = [cantidadFormosa,
        cantidadPilcomayo,
        cantidadPilagas,
        cantidadLaishi,
        cantPirane,
        cantPatiño,
        cantidadBermejo,
        cantidadRamonLista,
        cantidadMatacos]
        
const porDepar = {
    label: "Informes - 2023",
    data: cantidades,
    backgroundColor: 'rgba(211, 93, 110, 0.2)',
    borderColor: 'rgba(211, 93, 110, 1)',
    borderWidth: 1,
};

new Chart($grafica, {
    type: 'bar',
    data: {
        labels: etiquetas,
        datasets: [porDepar]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
    }
});
})