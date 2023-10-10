const usern = document.getElementById('usern');
const nameComplete = document.getElementById('nameComplete');
const rol = document.getElementById('role');
const createAt= document.getElementById('createAt');
const btnEdit = document.getElementById('btnEdit');
const currentUrl = window.location.href;
const urlParts = currentUrl.split('/');
const id = urlParts[4];
console.log(id)
const obtenerUsuario = async()=>{
    try {
        const res = await fetch(`/api/usuario/${id}`)
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}




document.addEventListener('DOMContentLoaded',async()=>{
    const user = await obtenerUsuario();
    const role = (user.rol==("Moderate")? "Administrador": ('User')? "Usuario del sistema":"Visualizador del sistema");
    usern.innerHTML = `Usuario: ${user.username}`;
    nameComplete.innerHTML = `Nombre completo: ${user.lastName} ${user.firstName}`;
    rol.innerHTML = `Rol: ${role}`;
    createAt.innerHTML = `Fecha de creacion: ${dayjs(user.createdAt).format('DD/MM/YYYY')}`;


    if(user.rol != 'Moderate'){
        btnEdit.style.display = 'none'
        console.log(user.rol)
    }
});