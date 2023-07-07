        const id = 2;
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
            const response = await fetch(`http://localhost:3000/api/informe/${id}`)
            const data = await response.json();
            console.log(data)
                let Departamento = departamento[data.Departamento_idDepartamento];
                let Localidad = localidad[data.Localidad_idLocalidad]
                let Tipo = tipo[data.Tipo_idTipo]
                let fecha = dayjs(data.Fecha).format('DD/MM/YYYY');
                Info.innerHTML += `
                <section>
                    <h5>Departamento: <div><p>${Departamento}</p></div></h5>
                    <h5>Localidad <div><p>${Localidad}</p></div></h5>
                    <h5>Tipo <div class="Tipo"><p>${Tipo}</p></div></h5>
                    <h5>Fecha <div class="Fecha"> <p>${fecha}</p></div></h5>
                </section>
                <section>
                    <h5>Titulo <p>${data.Titulo}</p></h5>
                    <h5>Infome</h5>
                    <div class="Informe">
                        <p>${data.Informe}</p>
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

