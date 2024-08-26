![image](https://github.com/user-attachments/assets/35c5cf4b-dd6b-4a08-ae92-b3e07b97c3e6)

Tercer proyecto del bootcamp de programación fullstack SoyHenry.

⭐ SANTE - KINESIOLOGÍA ⭐

![image](https://github.com/user-attachments/assets/249abd12-281e-46fc-97cf-3faada02c601)

Página web con estructura fullstack. Single Page Application (SPA) compuesto por un servidor HTTP para gestionar turnos de una base de datos. 

🛠️ Tecnologías utilizadas:
- React
- Tailwind
- Typescript
- Node
- TypeOrm.
- SQL.

🎯 Objetivos:
- Diseñar una página web orientada a un sistema de registro de turnos con sus fechas y horarios y con la posibilidad de cancelarlos.
- Manejo de repositorios con Git y Github.
- Manejo de protocolos de comunicación.
- Manejo de bases de datos.

## Instalación

Sigue estos pasos para clonar y ejecutar el proyecto:

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/amandabrousson/P3-Henry.git

2. **Ejecutarlo en Visual Studio Code e instalar sus dependencias en el backend como frontend**:

    ```bash
    Npm install

 3. **Para ejecutar el proyecto y ver la página desde el frontend **:

    ```bash
    Npm run dev

 4. **Para ejecutar el proyecto desde el backend **:

    ```bash
    Npm start

5. Crear archivo .env. Dentro de este archivo, se encontrarán las variables de entorno necesarias para ejecutar la conexión con la base de datos y el puerto de escucha del servidor Express.

Variables a definir
- Puerto del backend, Usuario y clave de PostgreSQL y nombre de la base de datos.

  ```bash
  PORT=3000
  DB_USERNAME=example_username
  DB_PASSWORD=example_password
  DB_NAME=example_DB_name

🚀 Desarrollo:

Se compone por:

- Sección “Home”, la cual muestra la portada de la página web, así como tambien muestra un boton "ingresar" el cual redirige al formulario de registro. Dicho registro contiene validaciones como completar todos los campos, preexistencia de un usuario con nombre de usuario, email o DNI. La imagen a agregar debe ser una url de la web. 

![image](https://github.com/user-attachments/assets/b34a6e42-2633-45d8-b1bb-d6a87da86612)

o, en caso de contar con una cuenta, iniciar sesión:

![image](https://github.com/user-attachments/assets/ee6eb4be-49c4-427f-926e-6c43b9d9cece)

- Sección "Sobre Nosotros", el cual introduce al equipo que atiende el consultorio, sus objetivos, así como los servicios que ofrecen al público:

![image](https://github.com/user-attachments/assets/81073b4d-e1ed-4d61-980b-7d26e8f96123)

- Sección "Mis turnos", es, en caso de no estar autenticado, otra forma de acceder al formulario de registro y login de la página. Como bien menciona, es un requisito el estar autenticado para poder sacar un turno.

![image](https://github.com/user-attachments/assets/80470284-7e21-46f1-8435-ca883bba7485)

Al estar autenticado, mis turnos se ejecuta con el dashboard de turnos, en donde se visualiza el formulario de turnos:

![image](https://github.com/user-attachments/assets/481354f4-94e9-4ee8-95e6-9be03d59c4a9)

así como los turnos que ha sacado:

![image](https://github.com/user-attachments/assets/33797b6d-df5b-417a-92f3-fb3c90204fcf)

- Perfil del usuario: Al iniciar sesión, el boton de "Login" pasará a ejecutar "Logout" y por encima de dicho botón aparecerá el nombre del usuario.

![image](https://github.com/user-attachments/assets/117ff4c3-5e43-4423-abc3-8822ec6b4b16)

al clickear sobre el nombre, el usuario podrá acceder a su perfil. Allí podrá visualizar sus datos, así como también tendrá la posibilidad de eliminar su cuenta.

![image](https://github.com/user-attachments/assets/f9fedc98-a686-4c50-ad2d-8b6f4103f919)

- En la sección de "Contacto" el usuario podrá encontrar un mapa que muestra la ubicación del consultorio, un número de teléfono, así como un formulario de contacto por medio del cual evacuar dudas, sugerencias y/ o reclamos.

![image](https://github.com/user-attachments/assets/0a3abfc8-09b0-4b00-bddf-353baa754ba9)










