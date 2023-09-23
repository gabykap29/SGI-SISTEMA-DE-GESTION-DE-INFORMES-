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
                let canvasContent = document.querySelector('.graficos.col-9');
                let clases = canvasContent.classList;
                clases.remove('col-9');
                clases.add('col-12');
            } else {
                aside.style.display = 'block';
                let canvasContent = document.querySelector('.graficos.col-9');
                let clases = canvasContent.classList;
                clases.remove('col-12');
                clases.add('col-9');
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    adjustLayout();

    window.addEventListener('resize', adjustLayout);
});

