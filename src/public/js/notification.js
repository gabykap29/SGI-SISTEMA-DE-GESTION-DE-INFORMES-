const notification = document.getElementById('notifications');
const itemsNotifications = document.getElementById('itemsNotifications');
let classNames = itemsNotifications.classList;
const getIncompleted = async () => {
    const res = await fetch('/api/informes/incomplete')
    if(res.status === 404) {
        return []
    }
    const data = await res.json()
    return data;
};

document.addEventListener('DOMContentLoaded', async () => {
    const incompletos = await getIncompleted();
    if(incompletos.length > 0) {
        classNames.add('alert')
        classNames.add('alert-danger');
        itemsNotifications.innerHTML ="";
        notification.innerHTML='<img src="/css/images/notificaciones1.png" alt="Notificacion" style="width:30px">'
        incompletos.forEach(incompleto => {
            let fecha = dayjs(incompleto.Fecha).format("DD/MM/YYYY");
            itemsNotifications.innerHTML += `
            <li><a href="/informes/view/${incompleto.idInforme}">${incompleto.Titulo}-${fecha}</a> </li>
            <hr>
            `
        })
    }
});