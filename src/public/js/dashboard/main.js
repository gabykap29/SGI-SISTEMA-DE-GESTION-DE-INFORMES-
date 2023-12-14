const registros = document.querySelector('#registros');
const registrosPersonas = document.querySelector('#personas');
const getInc = async () => {
    const res = await fetch('/api/informes/incomplete')
    if(res.status === 404) {
        return []
    }
    const data = await res.json()
    return data;
};

const getPeoples = async () => {
    try {
        const res = await fetch('/api/persons');
        if(res.status === 404) {
            return []
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    };
};



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

        //Tabla informes incompletos
        const incompletos = await getInc();
        if(incompletos.length > 0) {

            incompletos.forEach(incompleto => {
                let fecha = dayjs(incompleto.Fecha).format("DD/MM/YYYY");
                registros.innerHTML += `
                <tr>
                    <td>${fecha}</td>
                    <td>${incompleto.Tipo.Nombre}</td>
                    <td>${incompleto.Titulo}</td>
                    <td><a class="btn btn-sm btn-primary" href="/informes/${incompleto.idInforme}">Detalles</a></td>
                </tr>
                `
            });
            
        }
        //Tabla personas
        const personas = await getPeoples();
        if(personas.length > 0) {
            personas.forEach(persona => {
                registrosPersonas.innerHTML += `
                <div class="card col-md-3 d-flex justify-content-center align-items-center">
                                    <div class="card-body">
                                        <img class="img-fluid rounded-circle rounded-circle-custom" src="/img/user.png" alt="" style="width: 70px;">
                                        <h6 class="mb-0 mt-3" id="nameComplete">${persona.lastName} ${persona.firstName}</h6>
                                        <p class="mb-0 mt-2" id="dni">${persona.DNI}</p>
                                        <a href="/ver/persona/${persona.id}" class="btn btn-primary">Ver más</a>
                                    </div>
                 </div>
                `
            });
            
        }

});