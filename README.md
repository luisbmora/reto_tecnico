# Documentación de la API

Este README proporciona una visión general de las rutas de la API para la gestión de usuarios y empresas, así como instrucciones para la instalación y configuración del proyecto.

## Tabla de Contenidos

1. [Instalación y Configuración](#instalación-y-configuración)
2. [Rutas de Empresa](#rutas-de-empresa)
3. [Rutas de Usuario](#rutas-de-usuario)
4. [Documentación de la API (Swagger)](#documentación-de-la-api-swagger)
5. [Autenticación](#autenticación)
6. [Validación](#validación)
7. [Seeders](#seeders)
8. [Manejo de Errores](#manejo-de-errores)
9. [Próximos Pasos](#próximos-pasos)

## Instalación y Configuración

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/luisbmora/reto_tecnico.git
   cd test_tecnico
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   PORT=3000
   MDB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   LOG_LEVEL=info
   ```
   Asegúrate de cambiar `your_jwt_secret` por una cadena segura para tu entorno.

4. Inicia la aplicación:
   ```bash
   npm start
   ```

La aplicación ahora debería estar corriendo en `http://localhost:3000`.

## Rutas de Empresa

URL Base: `/enterprise`

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET    | `/`      | Obtener todas las empresas | Requerida |
| POST   | `/`      | Crear una nueva empresa | Requerida |
| PUT    | `/:id`   | Actualizar una empresa por ID | Requerida |
| DELETE | `/:id`   | Eliminar una empresa por ID | Requerida |

## Rutas de Usuario

URL Base: `/users`

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET    | `/`      | Obtener todos los usuarios | Requerida |
| POST   | `/`      | Crear un nuevo usuario | No Requerida |
| POST   | `/login` | Inicio de sesión de usuario | No Requerida |
| GET    | `/run/seeds` | Ejecutar seeder de usuarios | No Requerida |

## Documentación de la API (Swagger)

La API está documentada utilizando Swagger/OpenAPI 3.0.0. Puedes acceder a la interfaz de usuario de Swagger para interactuar con la API en:

```
http://localhost:3000/api-docs
```

Esta documentación proporciona una visión detallada de todos los endpoints disponibles, estructuras de solicitud/respuesta, y te permite probar la API directamente desde el navegador.

### Características Principales en la Documentación de Swagger:

1. **Información del Servidor**: 
   - URL: http://localhost:3000/api-docs
   - Descripción: Servidor de desarrollo local

2. **Autenticación**: 
   - La API utiliza autenticación por Token Bearer (JWT) para rutas protegidas.

3. **Endpoints**:
   - Información detallada sobre todas las rutas de usuario y empresa.
   - Esquemas de cuerpo de solicitud para operaciones POST y PUT.
   - Esquemas de respuesta para respuestas exitosas y de error.

4. **Modelos**:
   - Esquema de Usuario
   - Esquema de Empresa

5. **Seeds**:
   - Endpoint para ejecutar seeds de la base de datos: GET `/users/run/seeds`

Asegúrate de mantener la documentación de Swagger actualizada a medida que realizas cambios en tu API.

## Autenticación

La mayoría de las rutas requieren autenticación utilizando el middleware `isAuth`. Asegúrate de incluir el token de autenticación necesario en los encabezados de la solicitud para estas rutas. La API utiliza JWT (JSON Web Tokens) para la autenticación.

## Validación

La API utiliza el middleware `celebrate` para la validación de solicitudes. Sin embargo, los esquemas de validación están actualmente comentados en el código proporcionado. Descomenta e implementa los esquemas de validación apropiados (por ejemplo, `UserValidator.getAll`, `UserValidator.saveUser`, etc.) para habilitar la validación de solicitudes.

## Seeders

Los seeders son scripts que se utilizan para poblar la base de datos con datos iniciales o de prueba. Son útiles para:

1. Configurar rápidamente un entorno de desarrollo con datos de ejemplo.
2. Preparar datos para pruebas.
3. Inicializar la base de datos con datos necesarios para el funcionamiento de la aplicación.

### Cómo ejecutar los seeders:

Las rutas de usuario incluyen un endpoint de seeding (`/run/seeds`) que te permite poblar la base de datos con datos iniciales de usuario. 

Para ejecutar los seeders:

1. Asegúrate de que tu servidor esté en funcionamiento.
2. Realiza una solicitud GET a la siguiente URL:
   ```
   http://localhost:3000/api/users/run/seeds
   ```
3. Este endpoint primero eliminará los datos existentes y luego insertará nuevos datos de semilla.

Respuesta esperada:
- Éxito (200): `{ message: "Datos eliminados e insertados correctamente." }`
- Error (500): `{ error: "Error al ejecutar los seeders." }`

**Nota**: Ten cuidado al ejecutar los seeders en un entorno de producción, ya que pueden eliminar datos existentes.
