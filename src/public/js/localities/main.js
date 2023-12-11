const selecLocalidad = document.getElementById('selecLocalidad');
const Departamento = document.getElementById('selecDepartamento');
const getLocalities = async () => {
    try {
        const response = await fetch('/api/localities');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const renderLocalities = async (idDepartamento) => {
    const localities = await getLocalities();
    localities.Localidades.forEach(locality => {
        
        if (locality.Departamento_idDepartamento == idDepartamento) {
            
            selecLocalidad.innerHTML += `
                <option value="${locality.idLocalidad}">${locality.nombre}</option>
            `;
        };
    });
};

Departamento.addEventListener('change', () => {
    const idDepartamento = Departamento.value;
    selecLocalidad.innerHTML = '';
    renderLocalities(idDepartamento);
});