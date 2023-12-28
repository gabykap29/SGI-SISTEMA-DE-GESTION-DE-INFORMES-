
const tableLocalities = document.getElementById('localities');
const formLocalities = document.getElementById('formLocalities');
const getLocalities = async () => {
    const res = await fetch('/api/localities');
    if(res.ok){
        const data = await res.json();
        return data;
    }else{
        console.log('Error al obtener las localidades');
    };
};

const showLocalities = async (localities) => {
    tableLocalities.innerHTML= '';
    localities.Localidades.forEach((locality,index)=>{
        tableLocalities.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${locality.nombre}</td>
            <td>${locality.Departamento.nombre}</td>
            <td>
                <button class="btn-delete-locality btn btn-danger btn-sm " data-id="${locality.idLocalidad}"><i class="bi bi-trash-fill"></i></button>
            </td>
        </tr>
        `;
    });
};

const deleteLocality = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Estoy seguro",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/localities/delete/?idLocality=${id}`, {
            method: "DELETE",
          });
  
          const data = await res.json();
  
          Swal.fire({
            icon: "success",
            title: "Localidad eliminada",
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

  const getIdLocality = (elemento) => {
    while (elemento) {
      if (elemento.hasAttribute("data-id")) {
        return elemento.getAttribute("data-id");
      }
      elemento = elemento.parentElement;
    }
    return null;
  };


document.addEventListener('DOMContentLoaded',async ()=>{
    const localities = await getLocalities();
    showLocalities(localities);

    formLocalities.addEventListener('submit',async (e)=>{
        e.preventDefault();
        const locality = document.getElementById('Locality').value;
        const department = document.getElementById('selecDepartamento').value;
        const res = await fetch('/api/localities/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({locality,department})
        });
        if(res.ok){
            const data = await res.json();
            Swal.fire({
                icon:'success',
                title:'Localidad creada',
                text:data.message
            });
            showLocalities(await getLocalities());
        }else{
            const data = await res.json();
            Swal.fire({
                icon:'error',
                title:'Error',
                text:data.message
            });
        };

    });
    const deleteButton = document.querySelectorAll('.btn-delete-locality');
    deleteButton.forEach((boton) => {
      boton.addEventListener("click", (event) => {
        const idLocality = getIdLocality(event.target);
        deleteLocality(idLocality);
      });
    });
  
});