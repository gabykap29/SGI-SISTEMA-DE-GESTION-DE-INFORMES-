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
            <a href="#" class="dropdown-item">
                    <a class="fw-normal mb-0" href="/informes/view/${incompleto.idInforme}"><h6 class="">${incompleto.Titulo}</h6></a>
                    <small>${fecha}</small>
            </a>
                <hr class="dropdown-divider">
            `;
    });
  }
});
