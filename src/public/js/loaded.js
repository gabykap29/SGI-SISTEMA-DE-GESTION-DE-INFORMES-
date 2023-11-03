window.onload = function(){
    $('#onload').fadeOut();
    $('body').removeClass('hidden')
}


//función para ocultar el aside

window.addEventListener('DOMContentLoaded', () => {
    const aside = document.getElementById('aside');

    const adjustLayout = () => {
        try {
            if (window.innerWidth <= 876) {
                aside.style.display = 'none';
                let headers = document.getElementById('Headers');
                let clases = headers.classList;
                clases.remove('Headers');
                clases.remove('col-10');
            } else {
                aside.style.display = 'block';
                let headers = document.getElementById('Headers');
                let clases = headers.classList;
                clases.add('Headers');
                clases.add('col-10');
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    adjustLayout();

    window.addEventListener('resize', adjustLayout);
});

