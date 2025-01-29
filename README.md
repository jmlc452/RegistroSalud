# Sistema de Admisión Médica Dividido por Especialidades

## Descripción
Este proyecto es un sistema de admisión médica diseñado para gestionar historias médicas de pacientes, organizadas por especialidades y tipos de roles. El sistema permite el registro, consulta y actualización de datos médicos de manera eficiente y centralizada, reemplazando el proceso manual basado en papel y lápiz.

## Características Principales
- **Registro y autenticación de usuarios** con diferentes roles: administradores, doctores, enfermeras y pacientes.
- **Manejo de historias médicas**, incluyendo:
  - Datos personales del paciente.
  - Antecedentes médicos.
  - Motivo de consulta.
  - Examen físico.
  - Diagnóstico.
  - Plan de tratamiento.
  - Evolución y notas clínicas.
  - Archivos adjuntos.
- **Asignación de consultas** por especialidad.
- **Gestor de usuarios** con diferentes permisos según su rol.
- **Interfaz web amigable**, desarrollada con JavaScript y Bootstrap.
- **API REST** desarrollada con Node.js y Express.
- **Base de datos en MongoDB** para almacenamiento estructurado de la información.

## Tecnologías Utilizadas
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Frontend**: JavaScript, Bootstrap, Handlebars, jQuery.
- **Autenticación**: JSON Web Tokens (JWT).
- **Gestor de archivos**: express-fileupload.

## Estructura del Proyecto
El proyecto está organizado en dos carpetas principales:
- **frontend**: Contiene los archivos HTML, CSS y JavaScript necesarios para la interfaz de usuario. Para ejecutar el login, se recomienda utilizar Live Server.
- **backend**: Contiene el servidor desarrollado con Node.js y Express. 

## Instalación y Configuración
### Prerrequisitos
Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (para el frontend)

### Pasos de Instalación
#### Backend
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/jmlc452/RegistroSalud.git
   ```
2. Ingresar al directorio del backend:
   ```sh
   cd RegistroSalud/backend
   ```
3. Instalar dependencias:
   ```sh
   npm install
   ```
4. Configurar variables de entorno en un archivo `.env`:
   ```env
   PORT=8081
   MONGO_URI=mongodb://localhost:27017/miBase
   JWT_SECRET=clave_segura_xd69
   ```
5. Ejecutar el servidor:
   ```sh
   npm start
   ```

#### Frontend
1. Ingresar al directorio del frontend:
   ```sh
   cd jmlc452/frontend
   ```
2. descomprimir el archivo `libs.rar` en la raiz de la carpeta
   
3. Abrir el archivo `index.html` (`login/index.html`) con Live Server para visualizar la interfaz:
   ```sh
   # Si usas VS Code, abre el archivo y presiona botón derecho -> "Open with Live Server"
   ```

## Uso
1. Acceder a la aplicación en el navegador:
   ```
   http://localhost:5500
   ```
2. Registrarse o iniciar sesión según el rol asignado.
3. Gestionar historias médicas según los permisos disponibles.

## Contribución
Si deseas contribuir a este proyecto eres bienvenido de hacerlo

## Licencia
Este proyecto está bajo la licencia MIT.

## Contacto
Si tienes preguntas o sugerencias, contáctame en:
- **Correo**: jmlc452@gmail.com
- **GitHub**: [tu-usuario](https://github.com/jmlc452)

