const contentCanvas = document.getElementById('contentCanvas');
document.addEventListener('DOMContentLoaded', async(e)=>{
    e.preventDefault();
    const $grafica = document.querySelector("#grafica");
    $grafica.innerHTML='';
    const title = document.getElementById('title');
    title.innerHTML = "<h4>Informes por Título</h4>"

    try {    
        const reportTitle = async () => {
            const res = await fetch('/api/informes/forTitle');
            if (res.status === 404) {
                return [];
            }
    
            const data = await res.json();
            return data.title;
        }
    
        let etiq = [];
        let count = [];
        const reports = await reportTitle();
        console.log(reports);
    
        if (Array.isArray(reports)) {
            for (const item of reports) {
                etiq.push(item.Titulo);
                count.push(item.count);
            }
            console.log(etiq, count);
        } else {
            console.error('Los datos recibidos de la API no son un array válido.');
        }
        console.log(etiq, count);
    
        const porTitulo = {
            label: 'Titulo',
            data: count,
            backgroundColor: 'rgba(235, 93, 110, 0.2)',
            borderColor: 'rgba(211, 93, 110, 1)',
            borderWidth: 1,
        };
    
        new Chart($grafica , {
            type: 'bar',
            data: {
                labels: etiq,
                datasets: [porTitulo]
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
    } catch (error) {
        console.error(error);
    }



})