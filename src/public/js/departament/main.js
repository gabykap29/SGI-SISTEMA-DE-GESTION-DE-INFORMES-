const selecDepartamento = document.getElementById('selecDepartamento');

const getDepartaments = async () => {
    try {
        const response = await fetch('/api/departaments');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const renderDepartaments = async () => {
    const departaments = await getDepartaments();
    departaments.data.forEach(departament => {
        selecDepartamento.innerHTML += `
            <option value="${departament.idDepartamento}">${departament.nombre}</option>
        `;
    });
};

    renderDepartaments();
