document.addEventListener('DOMContentLoaded', async() => {
        // Single Bar Chart
        var ctx4 = $("#bar-chart").get(0).getContext("2d");
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
            
        var myChart4 = new Chart(ctx4, {
            type: "bar",
            data: {
                title:"Cantidad de Informes por Departamento",
                labels: ['Formosa', 'Pilcomayo', 'Pilagas', 'Laishi', 'Pirané', 'Patiño', 'Bermejo', 'Ramon Lista', 'Matacos'],
                datasets: [{
                    label:'Formosa',
                    backgroundColor: [
                        "rgba(0, 156, 255, .9)",
                        "rgba(0, 156, 255, .8)",
                        "rgba(0, 156, 255, .7)",
                        "rgba(0, 156, 255, .6)",
                        "rgba(0, 156, 255, .5)",
                        "rgba(0, 156, 255, .4)",
                        "rgba(0, 156, 255, .3)",
                        "rgba(0, 156, 255, .2)",
                        "rgba(0, 156, 255, .1)"
                    ],fill:true,
                    data: cantidades
                }]
            },
            options: {
                responsive: true
            }
        });
});