# Sistema de Gestión de Informes

Este sistema de gestión permite la creación, edición, visualización y eliminación de informes de distintos tipos. Incluye funcionalidades como el manejo de usuarios, roles, personas, y relaciones entre personas e informes.

## Funcionalidades

- **Login:** Acceso seguro al sistema.
- **Index:** Página principal con resumen y enlaces rápidos.
- **Carga:** Funcionalidad para cargar nuevos informes.
- **Informes Cargados:** Vista de informes con filtros y opciones de búsqueda.
- **Informes Completados/No Completados:** Separación y filtrado de informes según su estado de completitud.
- **Editar:** Capacidad para editar informes existentes.
- **Vista de Informes:** Visualización detallada de informes.
- **Sistema de Notificaciones:** Notificaciones para informes no completados.
- **Usuarios:** Gestión de usuarios y roles de acceso.
- **Roles de Usuarios:** Definición de roles y permisos.
- **Personas:** Mantenimiento de registros de personas.
- **Personas por Informes:** Relación entre personas e informes.

## Requerimientos

Para utilizar este sistema, es necesario tener instalados los siguientes componentes:

- Node.js v18.17.0
- MySQL Server
- XAMPP (opcional, para corroborar datos de la base de datos)

## Instalación

1. Clonar el repositorio con el comando `git clone`.
2. En la carpeta `src`, abrir una terminal.
3. Ejecutar el comando `npm install` (se requiere Node.js).
4. Crear el archivo `.env` para configurar las variables del sistema. Completa el archivo con la información del `.envExample` del repositorio.
5. Una vez completados los pasos anteriores con éxito, ejecutar el comando `node app` para poner en marcha el sistema.
6. Para acceder al sistema, abrir el navegador y dirigirse a `https://tu-ip:port-elegido/login`. El usuario por defecto es `admin` y la contraseña `1234` (puedes cambiarla en la sección de usuarios).

## Tecnologías Utilizadas

- JavaScript
- Node.js
- MySQL


