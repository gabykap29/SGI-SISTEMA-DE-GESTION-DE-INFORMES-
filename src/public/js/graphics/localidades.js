const contentCanvas = document.getElementById('contentCanvas');

document.addEventListener("DOMContentLoaded",(e)=>{
    e.preventDefault();
    const $grafica = document.querySelector("#grafica");
    const title = document.getElementById('title');
    $grafica.innerHTML='';
    title.innerHTML = "<h4>Informes por Localidad</h4>"

const porLocal = {
    label: 'Localidades',
    data: [12,33,23,12,35,23],
    backgroundColor: 'rgba(235, 93, 110, 0.2)',
    borderColor: 'rgba(211, 93, 110, 1)',
    borderWidth: 1,
};
let labels = ['Formosa', 'Clorinda', 'Pirane', 'S.F.Laishi','Ing. Juarez', 'Vaca Muerta']
new Chart($grafica , {
    type: 'polarArea',
    data: {
        labels: labels,
        datasets: [porLocal]
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