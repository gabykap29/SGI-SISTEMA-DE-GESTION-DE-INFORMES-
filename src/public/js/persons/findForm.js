const tablePerson = document.getElementById('tablePerson');
const find = document.getElementById('find');

const getPerson = async(dni,firstName,lastName)=>{
    const res = await fetch(`/api/persons/?dni=${dni}&firstName=${firstName}&lastName=${lastName}`);
    if(res.status === 404){
        return [];
    };
    const data = await res.json();
    return data;
}


find.addEventListener('submit', async (e)=>{
   e.preventDefault();
   const dni = document.getElementById('dni').value;
   const firstName = document.getElementById('firstName').value;
   const lastName = document.getElementById('lastName').value;
   const person = await getPerson(dni,firstName,lastName);
   let timerInterval
   Swal.fire({
   title: 'Buscando...',
   timer: 2000,
   timerProgressBar: true,
   didOpen: () => {
       Swal.showLoading()
       const b = Swal.getHtmlContainer().querySelector('b')
       timerInterval = setInterval(() => {
       b.textContent = Swal.getTimerLeft()
       }, 100)
   },
   willClose: () => {
       clearInterval(timerInterval)
   }
   }).then((result) => {
   /* Read more about handling dismissals below */
   if (result.dismiss === Swal.DismissReason.timer) {
       console.log('I was closed by the timer')
   }
   });
    //Mostrar las personas en el dom
       for(let i = 0; i < person.length; i++){
        let dni = person[i].dni; 
        let firstName = person[i].firstName;
        let lastName = person[i].lastName;
        let fechaNac = dayjs(person[i].fechaNac).format('DD/MM/YYYY');
        let address = person[i].address;tablePerson.innerHTML = `
        <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr class="">
                    <th scope="col">#</th>
                    <th scope="col">DNI</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Fecha de Nacimiento</th>
                    <th scope="col">Domicilio</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">${i}</th>
                    <td>${dni}</td>
                    <td>${firstName}</td>
                    <td>${lastName}</td>
                    <td>${fechaNac}</td>
                    <td>${address}</td>
                    <td>
                        <a href="/ver/persona/${person[i].idPerson}" target="_blank" class="btn btn-outline-primary btn-sm" target='_blank'>Ver</a>
                        
                    </td>
                    </tr>
            </tbody>
        </table>
        </div>
        `;
    }

});










