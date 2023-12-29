const formDestroy = document.getElementById('form-destroy');

formDestroy.addEventListener('submit', async (e) => {
    e.preventDefault();
    const confirmartion = document.getElementById('confirmation').value;
    const pass = document.getElementById('pass').value;

    if(confirmartion !== 'CONFIRMACION'){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Confirmación requerida!, por favor ingrese la palabra CONFIRMACION en el campo de confirmación",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    }else{
        const res = await fetch('/api/destroyDatabase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pass
            })
        });

        const data = await res.json();
        if(data.message === 'Database destroyed'){
            setTimeout(() => {
                Swal.fire({
                    title: "Sweet!",
                    text: "Modal with a custom image.",
                    imageUrl: "/img/destroy.gif",
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Custom image"
                  });
            },3000)
            Swal.fire({
                icon: "success",
                title: "Base de datos eliminada",
                text: "La base de datos ha sido eliminada correctamente",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Contraseña incorrecta",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
            }
        }
});