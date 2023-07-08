 const Info = document.getElementById('info');



        let departamento = [null, 'Formosa','Pilcomayo','Pilagas','Laishi','Pirané','Patiño','Bermejo', 'Ramon Lista', 'Matacos'];
        let localidad = [
            null,
            "Formosa",
            "Colonia pastoril",
            "Gran Guardia",
            "San Hilario",
            "Mariano Boedo",
            "Villa del Carmen",
            "Clorinda",
            "Laguna Naick Neck",
            "Riacho He He",
            "Monte Lindo",
            "S.F Laishí",
            "Gral. Mansilla",
            "Herradura",
            "Yatai",
            "Misión Tacaagle",
            "Laguna Gallo",
            "Tres Lagunas",
            "El Espinillo",
            "Pirané",
            "El Colorado",
            "Villa Dos Trece",
            "Mayor Villafañe",
            "Palo Santo",
            "Las Lomitas",
            "Comandante Fontana",
            "Villa Gral Guemes",
            "Estanislao del Campo",
            "Pozo del Tigre",
            "Gral. Belgrano",
            "San Martin I",
            "San Martin II",
            "Fortin Lugones",
            "Subt. Perin",
            "Posta Cambio Zalazar",
            "Colonia Sarmiento",
            "Juan G. Bazan",
            "Bartolomé De Las Casas",
            "El Recreo",
            "Fortin Sargento Leyes",
            "Fortin Soledad",
            "Guadalcazar",
            "Lamadrid",
            "La Rinconada",
            "Los Chiriguanos",
            "Pozo de Maza",
            "Pozo del Mortero",
            "Vaca Perdida",
            "Gral. Mosconi",
            "El Potrillo",
            "Ing. Juarez"
          ];
        let tipo = [
            null, 
            "Politica", 
            "Institucional", 
            "Educación",
            "Religioso"
        ]
          


        // Funcion para obtener los datos de la reserva cuando se carga la página
        document.addEventListener('DOMContentLoaded', async () => {
            //capturar el id desde la url
            const url = window.location.href;
            const parts = url.split('/');
            const id = parts[parts.length - 1];
          
            const response = await fetch(`http://localhost:3000/api/informe/${id}`);
            const data = await response.json();
            console.log(data)
                let Departamento = departamento[data.Departamento_idDepartamento];
                let Localidad = localidad[data.Localidad_idLocalidad]
                let Tipo = tipo[data.Tipo_idTipo]
                let fecha = dayjs(data.Fecha).format('DD/MM/YYYY');
                Info.innerHTML += `
                <section>
                    <h5><b>Departamento:</b> ${Departamento}</h5>
                    <br>
                    <h5><b>Localidad:</b> ${Localidad}</h5>
                    <br>
                    <h5><b>Tipo:</b>  ${Tipo}</h5>
                    <br>
                    <h5><b>Fecha:</b> ${fecha}</h5>
                </section>
                <section>
                    <br>
                    <h5><b>Titulo:</b> ${data.Titulo}</h5>
                    <br>
                    <h5><b>Infome </b></h5>
                    <div class="Informe">
                        <h5>${data.Informe}</h5>
                    </div>
                </section>
                        `;
            });

            
        // <td>${Departamento}</td>
        // <td>${Localidad}</td>
        // <td>${Tipo}</td>
        // <td>${fecha}</td>
        // <td>${informe.Titulo}</td>
        // <td>${informe.Informe}</td>
