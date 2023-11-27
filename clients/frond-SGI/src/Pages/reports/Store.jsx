import { useForm } from "../../hooks/useForm.js";
import { useEffect, useState } from "react";


const Store = () => {
  return (
    <>
      <div className="col-12   px-5">
        <div className="card shadow mb-3">
          <div className="card-body ">
            <div className="container d-flex ">
              <h4>Cargar Informes</h4>
            </div>
          </div>
        </div>

        <div className="card  shadow">
          <div className="card-body">
            <div className=" form-cargar">
              <form
                action=""
                className="row  needs-validation"
                id="formNuevoInforme"
                enctype="multipart/form-data"
              >
                <div className="col-md-3 position-relative">
                  <label for="validationTooltip04" className="form-label">
                    <b>Departamento</b>
                  </label>
                  <select
                    className="form-select input"
                    id="selecDepartamento"
                    required
                  >
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
                  <label for="validationTooltip04" className="form-label">
                    <b>Localidad</b>
                  </label>
                  <select
                    className="form-select input"
                    id="selecLocalidad"
                    required
                  >
                    <option selected disabled>
                      Selecciona una opción
                    </option>
                  </select>
                  <div className="invalid-tooltip">
                    Please select a valid state.
                  </div>
                </div>
                <div className="col-md-3 position-relative" id="divTipo">
                  <label for="validationTooltip04" className="form-label">
                    <b>Tipo</b>
                  </label>
                  <select className="form-select input" id="tipo" required>
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
                  <label for="validationTooltip02" className="form-label">
                    <b>Fecha</b>
                  </label>
                  <input
                    type="date"
                    className="form-control input"
                    id="fecha"
                    value=""
                    required
                  />
                </div>

                <div className="col-md-3 position-relative">
                  <label for="validationTooltipUsername" className="form-label">
                    <b>Titulo</b>
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control input"
                      id="titulo"
                      aria-describedby="validationTooltipUsernamePrepend"
                      required
                    />
                  </div>
                </div>

                <div className="mb-1">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    <b>Informe</b>
                  </label>
                  <textarea
                    className="form-control input"
                    id="informe"
                    rows="3"
                    style={{ height: "180px" }}
                  ></textarea>

                  <div className="col-12 position-relative">
                    <label
                      for="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Completado
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isCompleted"
                    />
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Cargar Informe
                  </button>
                  <button className="btn btn-secondary" type="reset">
                    Borrar campos
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
