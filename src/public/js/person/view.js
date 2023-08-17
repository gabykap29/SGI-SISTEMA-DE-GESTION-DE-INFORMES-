const documentFind = document.getElementById('documentFind');
const simpleFind = document.getElementById('simpleFind');
const seccionBuscar = document.getElementById('seccionBuscar');
const formFind = document.getElementById('find')
documentFind.addEventListener('click',(e)=>{
    e.preventDefault();
    seccionBuscar.innerHTML = `
    <br>
        <div class="col-md-4">
            <label for="validationDefault01" class="form-label">DNI</label>
            <input type="text" class="form-control" id="dni" placeholder="32190897" required>
        </div>
        <br>
        <button class='btn btn-success'>Buscar</button>
    `
})
simpleFind.addEventListener('click',(e)=>{
    e.preventDefault();
    seccionBuscar.innerHTML = `
    <br>
    <div class='container'>
        <div class='row'>
            <div class="col-md-4">
                <label for="validationDefault01" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="firstName" placeholder="Kent" required>
            </div>
            <div class="col-md-4">
            <label for="validationDefault01" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="firstName" placeholder="Clark" required>
            </div>
        </div>
        <br>
        <button class='btn btn-success'>Buscar</button>
    </div>
    `
})
formFind.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const 
})