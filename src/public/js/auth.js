const formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', async(e)=>{
    e.preventDefault();

    const username =document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({username,password}),
    });

    if(!response.ok){
        const {message}= await response.json();
        return Swal.fire('Error',message, 'error');
    }
    const {message} = await response.json();
    Swal.fire('Correcto', message,'success');
    setTimeout(()=>{
        window.location.href='/index';
    },2000);

})

///Aministrador