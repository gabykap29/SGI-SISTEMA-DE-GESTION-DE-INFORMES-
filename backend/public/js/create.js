const formNuevoUsuario = document.querySelector('#formNuevoUsuario');

formNuevoUsuario.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rol = document.getElementById('rol').value;
    const confirmPassword = document.getElementById('confirmPassword').value
    if(password !== confirmPassword){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las contraseñas no coinciden',
        })
        return
    }
    const response = await fetch('http://localhost:3000/api/create',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            firstName,
            lastName,
            username,
            password,
            rol
        }),

    });
    const respToJson = await response.json();
    if(response.status !== 200 && response.status !== 201){
        Swal.fire({
            icon:'error',
            title:respToJson.message,
        });
        return;
    }
    Swal.fire({
        icon:'success',
        title: 'Usuario Creado con éxito',
        text: respToJson.message
    })
    formNuevoUsuario.reset();
    setTimeout(()=>{
        window.location.href='/login';
    },2000);

})
