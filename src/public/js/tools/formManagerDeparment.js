const tableDepartment = document.getElementById('tableDepartment');
const formDeparment = document.getElementById('formDeparment');

const getDepartment = async () => {
    const res = await fetch('/api/departaments');
    if(res.ok){
        const data = await res.json();
        return data;
    }else{
        console.log('Error al obtener los departamentos');
    };
};

const showDepartment = async (departments) => {
    tableDepartment.innerHTML = '';
    departments.data.forEach((department,index)=>{
        tableDepartment.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${department.nombre}</td>
            <td>
                <button class="btn btn-danger btn-sm btn-delete-department" data-id='${department.idDepartamento}'><i class="bi bi-trash-fill"></i></button>
            </td>
        </tr>
        `;
    });
};

const getIdDepartment = (elemento) => {
    while (elemento) {
      if (elemento.hasAttribute("data-id")) {
        return elemento.getAttribute("data-id");
      }
      elemento = elemento.parentElement;
    }
    return null;
  };

const deleteDepartment = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás por eliminar un informe del sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Estoy seguro",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/department/delete/?idDepartment=${id}`, {
            method: "DELETE",
          });
  
          const data = await res.json();
  
          Swal.fire({
            icon: "success",
            title: "Departamento eliminado",
            text: data.message,
          });
  
          setTimeout(() => {
            window.location.reload();
          }, 2200);
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };




document.addEventListener('DOMContentLoaded',async ()=>{
    const departments = await getDepartment();
    showDepartment(departments);

    formDeparment.addEventListener('submit',async (e)=>{
        e.preventDefault();
        const nombre = document.getElementById('Department').value;
        const res = await fetch('/api/department/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({nombre})
        });
        if(res.ok){
            showDepartment(await getDepartment());
        }else{
            console.log('Error al crear el departamento, codigo de error: '+res.status );
        };
    });

    const deleteButton = document.querySelectorAll('.btn-delete-department');
      deleteButton.forEach((boton) => {
        boton.addEventListener("click", (event) => {
          const idDepartment = getIdDepartment(event.target);
          deleteDepartment(idDepartment);
        });
      });


});