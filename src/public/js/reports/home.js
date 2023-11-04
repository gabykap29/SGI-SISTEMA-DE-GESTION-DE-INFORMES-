const registros = document.getElementById('registros');



const obtenerIncompletos = async () => {
    const res = await fetch('/api/informes/incomplete')
    if(res.status === 404) {
        return []
    }
    const data = await res.json()
    return data;
};
const showInformes = (informes) => {
    // Si no hay informes, mostrar un mensaje
    if (informes.length === 0) {
      registros.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">No hay informes pendientes, hurra!!</td>
            </tr>
        `;
      return;
    }

    let departamento = [
      null,
      "Formosa",
      "Pilcomayo",
      "Pilagas",
      "Laishi",
      "Pirané",
      "Patiño",
      "Bermejo",
      "Ramon Lista",
      "Matacos",
    ];
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
      "Ing. Juarez",
    ];

    informes.forEach((informe) => {
      console.log(informe);
      let Departamento = departamento[informe.Departamento_idDepartamento];
      let Localidad = localidad[informe.Localidad_idLocalidad];
      tipoArray = [
        null,
        "Politica",
        "Institucional",
        "Educación",
        "Religioso",
        "Proselitismo",
        "Salud",
        "Seguridad",
        "Eventos Climáticos",
        "Hídricos",
      ];
      let Tipo;
      if (informe.Tipo_idTipo > 9 || informe.Tipo_idTipo == null) {
        Tipo = "Personalizado";
      } else {
        Tipo = tipoArray[informe.Tipo_idTipo];
      }
      let fecha = dayjs(informe.Fecha).format("DD/MM/YYYY");
      registros.innerHTML += `
                    <tr class= "alert alert-danger">
                        <td>${Departamento}</td>
                        <td>${Localidad}</td>
                        <td>${Tipo}</td>
                        <td>${fecha}</td>
                        <td>${informe.Titulo}</td>
                        <td>
                            <a href="/informes/view/${informe.idInforme}" target="_blank" class="btn btn-outline-primary btn-sm">Ver</a>
                            <a href="/informe/edit/${informe.idInforme}" target="_blank" class="btn btn-outline-success btn-sm">Editar</a>
                            <button id= "deleteButton" class="btn btn-outline-danger btn-sm eliminar-informe" data-id="${informe.idInforme}">Eliminar</button>
                            
                        </td>
                    </tr>
                `;
    });
  };

document.addEventListener('DOMContentLoaded', async()=>{
    const informes =  await obtenerIncompletos();
    console.log(informes);
    showInformes(informes);
})