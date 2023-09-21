const contentCanvas = document.getElementById('contentCanvas');
document.addEventListener('DOMContentLoaded', async(e)=>{
    e.preventDefault();
    const graficaFecha = document.getElementById('graficaFecha');
let  fechas = {
    fechaInicio:'2023/01/01',
    fechaFinal: new Date()
};
const meses = [
    'Politica',
'Institucional',
'Educacion',
'Religioso',
'Proselitismo',
'Salud',
'Seguridad',
'Climaticos',
'Hidricos',
  ];

  const obtener = async () => {
    const res = await fetch('/api/informes/findDate',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(
            fechas
        )
    });
    const data = await res.json();
    return data;
}
const dataReport = await obtener();
let Politica = 0;
let Institucional = 0;
let Educacion = 0;
let Religioso = 0;
let Proselitismo = 0;
let Salud = 0;
let Seguridad = 0;
let Climaticos = 0;
let Hidricos = 0;
for (const item of dataReport) {
  switch (item.tipo_idTipo) {
      case 1:
            Politica += item.count;
          break;
      case 2:
            Institucional += item.count;
          break;
      case 3:
          Educacion += item.count;
          break;
      case 4:
        Religioso += item.count;
          break;
      case 5:
          Proselitismo += item.count;
          break;
      case 6:
          Salud += item.count;
          break;
      case 7:
          Seguridad += item.count;
          break;
      case 8:
          Climaticos = item.count;
          break;
      case 9:
          Hidricos = item.count;
          break;
      default:

          break;
  }};
  let cant = [Politica,
  Institucional,
  Educacion,
  Religioso,
  Proselitismo,
  Salud,
  Seguridad,
  Climaticos,
  Hidricos]
  const $grafica = document.querySelector("#grafica");
  const title = document.getElementById('title');
  $grafica.innerHTML='';
  title.innerHTML = "<h4>Informes por Fecha</h4>"
  const porDate = {
    label: `periodos: ${fechas.fechaInicio} a ${fechas.fechaFinal}`,
    data: cant,
    backgroundColor: 'rgba(211, 93, 110, 0.2)',
    borderColor: 'rgba(211, 93, 110, 1)',
    borderWidth: 1,
};

new Chart($grafica, {
    type: 'line',
    data: {
        labels: meses,
        datasets: [porDate]
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

    
});