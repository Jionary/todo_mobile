# Todo Mobile App

Aplicacion movil para gestion de listas y tareas. El proyecto fue desarrollado con Expo React Native y consume un backend propio construido con Quarkus, MySQL y Firebase Admin SDK.

## Backend deployado

Status publico:

```txt
https://todo-mobile-backend-f8gn.onrender.com/status
```

La app movil consume el backend deployado desde `services/api.ts`.

## Tecnologias

- Expo React Native
- TypeScript
- Expo Router
- Firebase Authentication
- Firebase ID Token / JWT
- Axios con instancia personalizada e interceptors
- React Query
- AsyncStorage
- NativeWind / Tailwind
- Quarkus Java
- MySQL

## Funcionalidades

- Login con Firebase Authentication
- Persistencia de sesion con token
- Envio de token Bearer al backend
- Navegacion protegida
- Perfil de usuario
- Logout funcional
- CRUD de listas
- CRUD de tareas
- Marcar tareas como completadas o pendientes
- Busqueda por listas y tareas
- Estados de loading
- Estados de error
- Componentes reutilizables

## Estructura principal

```txt
app/                 Rutas y pantallas con Expo Router
components/          Componentes compartidos de UI/layout
features/auth/       Autenticacion, sesion y perfil
features/lists/      Listas, servicios, componentes, queries y mutations
features/todos/      Tareas, servicios, componentes, queries y mutations
features/search/     Busqueda
services/api.ts      Instancia Axios con interceptors
```

## Ejecutar el frontend

Instalar dependencias:

```bash
npm install
```

Iniciar Expo:

```bash
npx expo start -c
```

Opciones:

- Escanear el QR con Expo Go para probar en celular.
- Presionar `w` para probar en navegador.

## Usuario de prueba

```txt
Email: jio@gmail.com
Password: [password configurado en Firebase]
```

## Configuracion del backend

El backend utiliza variables de entorno para conectarse a MySQL y Firebase Admin SDK:

```env
DB_USERNAME=
DB_PASSWORD=
DB_URL=
CORS_ORIGINS=
FIREBASE_SERVICE_ACCOUNT=
```
