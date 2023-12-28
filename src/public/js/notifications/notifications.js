const notification = document.getElementById("iconoNotificacion");
const itemsNotifications = document.getElementById("notificaciones");
const notif = document.getElementById('notif')
let classListNotificacionIcon = notification.classList;
const getIncompleted = async () => {
  const res = await fetch("/api/informes/incomplete");
  if (res.status === 404) {
    return [];
  }
  const data = await res.json();
  return data;
};

document.addEventListener("DOMContentLoaded", async () => {
  const incompletos = await getIncompleted();
  if (incompletos.length > 0) {
    notif.innerHTML = `<img src="/img/iconoNotificaciones.png" alt="notificaciones" width=50>Notificaciones`    
    classListNotificacionIcon.remove("bg-primary");
    classListNotificacionIcon.add("bg-danger");
    incompletos.forEach((incompleto) => {
      let fecha = dayjs(incompleto.Fecha).format("DD/MM/YYYY");
      itemsNotifications.innerHTML += `
      <div class="dropdown-item d-flex flex-row flex-wrap dropdown-item-custom">
      <a href="/informes/view/${incompleto.idInforme}" class="dropdown-item">
        <img src="/img/portapapeles.png" class="rounded" width="30" alt="Imagen de informe">
        <div class="ml-3">
          <b>${incompleto.Titulo}</b>
          <p class="mb-0 text-muted">${fecha}</p>
        </div>
      </a>
    </div>
            `;
    });
  }else{
    itemsNotifications.innerHTML = `
    <div class="dropdown-item d-flex flex-row flex-wrap dropdown-item-custom">
    <a href="#" class="dropdown-item">
      <img src="/img/completado.png" class="rounded" width="30" alt="Imagen de informe">
      <div class="ml-3">
        <p class="mb-0 text-muted">Sin notificaciones!</p>
      </div>
    </a>
  </div>
    `
  }
});
