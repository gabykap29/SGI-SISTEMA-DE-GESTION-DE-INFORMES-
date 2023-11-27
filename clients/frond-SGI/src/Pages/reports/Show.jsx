import { useState, useEffect } from "react"


const ShowReport = () => {
const [informes, setInformes] = useState([]);
    useEffect(()=>{
        const obtenerInformes = async () =>{
            try {
                const res = await fetch('http://localhost:3000/api/informes');
                if(!res){
                    const data = [];
                    return data;
                }
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error, 'Error al obtener los informes');
            }

        }
       
        obtenerInformes().then(data=>{
            setInformes(data)
        })
       console.log(informes);
    },[]);


    return (
        <>
    <div className="container col-12 bgForm" style={{paddingBottom: "250px"}}>
      <div className="">
        <div className="card m-2">
          <div className="card-body">
            <nav className="navbar navbar-light" aria-label="First navbar example">
              <div className="container-fluid d-flex flex-row">
                <div className="seccionBuscar">
                <span><b>Buscar por:</b> </span><button className="btn btn-outline-secondary shadow" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
                <img id="icon-Search" style={{width: "13px"}} src="/css/images/abajo.svg" alt="" /></button>
              </div>
                <div className="navbar-collapse collapse" id="navbarsExample01">
                  <br />
                  <div className="form-cargar" id="panel-busqueda">
                    <form id="formSearch" action="" className="row g-3 needs-validation" >
                        <div className="col-md-3 position-relative">
                            <label htmlFor="validationTooltip04" className="form-label">Departamento</label>
                            <select className="form-select" id="selecDepartamento" >
                              <option  disabled value="">Selecciona una opción</option>
                              <option value="1">Formosa</option>
                              <option value="2">Pilcomayo</option>
                              <option value="3">Pilagás</option>
                              <option value="4">Laishí</option>
                              <option value="5">Pirané</option>
                              <option value="6">Patiño</option>
                              <option value="7">Bermejo</option>
                              <option value="8">Ramon Lista</option> 
                              <option value="9">Matacos</option>
                              </select>
                          </div>
                          <div className="col-md-3 position-relative">
                            <label htmlFor="validationTooltip04" className="form-label">Localidad</label>
                            <select className="form-select" id="selecLocalidad" >
                              <option  disabled value="">Selecciona una opción</option>
                            </select>
                          </div>
                          <div className="col-md-3 position-relative" id="divTipo">
                            <label htmlFor="validationTooltip04" className="form-label">Tipo</label>
                            <select className="form-select" id="tipo" >
                              <option  disabled value="">Selecciona una opción</option>
                              <option value="1">Política</option>
                              <option value="2">Institucional</option>
                              <option value="3">Educación</option>
                              <option value="4">Religioso</option>
                              <option value="5">Proselitismo</option>
                              <option value="6">Salud</option>
                              <option value="7">Seguridad</option>
                              <option value="8">Eventos Climáticos</option>
                              <option value="9">Hídricos</option>
                              <option value="10">Personalizado</option>
                            </select>
                          </div>
                          <div className="col-md-2 position-relative">
                            <label htmlFor="validationTooltip02" className="form-label">Fecha Inicio</label>
                            <input type="date" className="form-control" id="fechaInicio" value="" />
                          </div>
                          <div className="col-md-2 position-relative">
                            <label htmlFor="validationTooltip02" className="form-label">Fecha Final</label>
                            <input type="date" className="form-control" id="fechaFinal" value="" />
                          </div>
                          <div className="col-md-2 position-relative">
                            <label htmlFor="validationTooltipUsername" className="form-label">Titulo</label>
                            <div className="input-group has-validation">
                              <input type="text" className="form-control" id="titulo" aria-describedby="validationTooltipUsernamePrepend" />
                            </div>
                          </div>
                          <div className="col-md-3 position-relative">
                            <label htmlFor="validationTooltipUsername" className="form-label">Palabras claves</label>
                            <div className="input-group has-validation">
                              <input type="text" className="form-control" id="informe" aria-describedby="validationTooltipUsernamePrepend" />
                            </div>
                          </div>
                          <div className=" position-relative">
                            <button type="submit" className="btn btn-outline-success">Buscar</button>
                          </div>
                </form>
                </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
    
    <div className="card m-2 shadow">
      <div className="card-body">
        <div className="table-responsive">
          <div className="col ">
              <table className=" table table-bordered table-hover table-striped" id="tablaInformes">
                  <thead className="table-primary">
                      <tr>
                          <th>Departamento</th>
                          <th>Localidad</th>
                          <th>Tipo</th>
                          <th>Fecha </th>
                          <th>Título </th>
                          <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                        informes.length > 0 ? (
                            informes.map(informe=>(
                                <tr>
                                <td>{informe.Departamento_idDepartamento}</td>
                                <td>{informe.Localidad_idLocalidad}</td>
                                <td>{informe.Tipo_idTipo}</td>
                                <td>{informe.Fecha}</td>
                                <td>{informe.Titulo}</td>
                                <td>
                                    <a href="/informes/view/${informe.idInforme}" target="_blank" class="btn btn-outline-primary btn-sm">Ver</a>
                                    <a href="/informe/edit/${informe.idInforme}" target="_blank" class="btn btn-outline-success btn-sm">Editar</a>
                                    <button id= "deleteButton" class="btn btn-outline-danger btn-sm eliminar-informe" data-id="${informe.idInforme}">Eliminar</button>
                                    
                                </td>
                            </tr>
                            ))
                        )
                        : <th>No hay informes</th>
                    }

                  </tbody>
              </table>
          </div>
      </div>
      </div>
    </div>
    </div>
    </div>
        </>
    )


};

export default ShowReport;