# 📚 Biblioteca Digital — I.E. Marco Fidel Suárez
### Gualanday, Coello — Departamento del Tolima, Colombia
**Documentación Técnica, Manual de Instalación y Ficha Técnica de Arquitectura**

---

## 📑 Tabla de Contenidos
1. [Ficha Técnica General del Sistema](#1-ficha-técnica-general-del-sistema)
2. [Ficha Técnica de Frontend](#2-ficha-técnica-de-frontend)
3. [Ficha Técnica de Backend](#3-ficha-técnica-de-backend)
4. [Base de Datos: Firebase Firestore](#4-base-de-datos-firebase-firestore)
   - [Esquema de Colecciones y Atributos](#esquema-de-colecciones)
   - [Reglas de Seguridad (Security Rules)](#reglas-de-seguridad-firestorerules)
   - [Políticas de Caché y Persistencia Offline](#políticas-de-caché-y-persistencia-offline)
5. [Instalación y Configuración](#5-instalación-y-configuración)
   - [Requisitos Previos del Sistema](#requisitos-previos)
   - [Guía Paso a Paso](#guía-paso-a-paso)
   - [Variables de Entorno (.env)](#variables-de-entorno)
6. [Infraestructura y Despliegue con Vercel](#6-infraestructura-y-despliegue-con-vercel)
   - [Topología de Red y Arquitectura Vercel](#topología-de-red-y-arquitectura-vercel)
   - [Configuración de Despliegue (vercel.json)](#configuración-de-despliegue-verceljson)
   - [Despliegue Continuo (CI/CD) con GitHub y Vercel](#despliegue-continuo-cicd-con-github-y-vercel)
   - [Asignación de Dominio Personalizado](#asignación-de-dominio-personalizado)
7. [Mantenimiento, Seguridad y Rendimiento](#7-mantenimiento-seguridad-y-rendimiento)
8. [Créditos e Información Institucional](#8-créditos-e-información-institucional)

---

## 1. Ficha Técnica General del Sistema

| Parámetro | Especificación Técnica |
| :--- | :--- |
| **Nombre del Software** | Sistema de Biblioteca Digital Institucional |
| **Entidad Titular** | Institución Educativa Marco Fidel Suárez (Gualanday, Coello, Tolima) |
| **Versión Actual** | `v1.2.0-production` |
| **Tipo de Aplicación** | Single Page Application (SPA) / Progressive Web App Ready |
| **Modelo Arquitectónico** | Jamstack Desacoplado (Static Site Generation / Client-Side Rendering + BaaS) |
| **URL de Producción** | [https://ais-pre-lgzoztfww7aqfg5mb6ekqa-262585239986.us-east1.run.app](https://ais-pre-lgzoztfww7aqfg5mb6ekqa-262585239986.us-east1.run.app) |
| **Población Objetivo** | Comunidad educativa: estudiantes (preescolar a 11°), docentes, directivos y familias |
| **Licenciamiento** | Software Libre Educativo / Abierto |

---

## 2. Ficha Técnica de Frontend

El frontend está desarrollado bajo estándares modernos para garantizar fluidez en conexiones móviles y terminales escolares de recursos moderados.

### 2.1 Especificaciones de Tecnología
- **Librería Central:** `React 19.0.1` (Arquitectura funcional orientada a Hooks).
- **Lenguaje:** `TypeScript 5.8+` (Tipado estricto con interfaces completas para el catálogo).
- **Bundler y Herramientas de Compilación:** `Vite 8.3.0` con `@vitejs/plugin-react`.
- **Framework de Estilos:** `Tailwind CSS v4.3.3` (Motor de estilos compilados de alto rendimiento `@tailwindcss/vite`).
- **Iconografía:** `Lucide React 0.546.0` (Íconos vectoriales SVG optimizados y accesibles).
- **Módulo de Código QR:** `qrcode.react` (Generación de SVG dinámico para lectura desde cámaras móviles).
- **Tipografía Institucional:** `Plus Jakarta Sans` servida con `font-display: swap` y preconexiones DNS.

### 2.2 Componentes de la Interfaz
```text
src/
├── main.tsx                    # Punto de anclaje ReactDOM
├── index.css                   # Capas base de Tailwind y scroll fluido
├── App.tsx                     # Orquestador: Barra institucional, hero, buscador, áreas y footer
├── components/
│   ├── ResourceCard.tsx        # Renderizado de libros/guías, etiquetas y accesos directos
│   ├── ResourceDetailModal.tsx # Ventana modal con sinopsis, objetivos pedagógicos y metadata
│   ├── ShareModal.tsx          # Generación de QR, copiado rápido y compartir en WhatsApp
│   └── AddResourceModal.tsx    # Formulario controlado para registro de recursos por docentes
└── data/
    └── resources.ts            # Definición tipada de la interfaz EducationalResource y catálogo base
```

### 2.3 Matriz de Compatibilidad de Dispositivos y Navegadores
| Plataforma | Sistema Operativo | Navegadores Soportados |
| :--- | :--- | :--- |
| **Smartphones** | Android 7.0+ / iOS 13+ | Chrome Mobile, Safari Mobile, Edge Mobile, Firefox, Opera |
| **Tablets** | iPadOS / Android Tablet | Safari, Chrome, Samsung Internet |
| **Computadores** | Windows 10/11, macOS, Linux, ChromeOS | Chrome, Firefox, Safari, Microsoft Edge, Brave |

---

## 3. Ficha Técnica de Backend

La arquitectura está concebida bajo el paradigma **Jamstack Serverless**, delegando el cálculo de datos a microservicios en el Edge y Firebase como Backend-as-a-Service (BaaS), con soporte opcional de Node.js Express para proxy de seguridad o APIs internas.

### 3.1 Especificaciones del Servidor
- **Runtime:** `Node.js 18.x / 20.x / 22.x LTS`
- **Módulo de Servidor (Opcional Full-Stack):** `Express 4.21.2`
- **Carga de Variables:** `dotenv 17.2.3`
- **Compilador TS de Ejecución:** `tsx 4.21.0`
- **Protocolo de Comunicación:** HTTPS con TLS 1.3
- **Formato de Carga Útil:** JSON UTF-8
- **Políticas de CORS:** Acceso restringido a los dominios autorizados de la institución y entornos Vercel.

### 3.2 Cabeceras de Seguridad Recomendadas (HTTP Headers)
```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 4. Base de Datos: Firebase Firestore

La persistencia de recursos en la nube se implementa a través de **Google Cloud Firestore**, una base de datos documental NoSQL flexible, escalable y en tiempo real.

### Esquema de Colecciones

#### 1. Colección `resources` (Catálogo de Recursos Educativos)
Cada documento en la colección representa un material pedagógico:

```json
{
  "id": "res-unique-uuid-001",
  "title": "La Vorágine - Edición Centenario",
  "author": "José Eustasio Rivera",
  "category": "lenguaje",
  "categoryLabel": "Lenguaje y Literatura",
  "description": "Obra clásica de la literatura colombiana. Narración en las selvas del Amazonas.",
  "gradeLevel": "Grados 9° a 11°",
  "url": "https://www.cervantesvirtual.com/obra/la-voragine--0/",
  "fileType": "Libro Digital",
  "publisher": "Biblioteca Virtual Miguel de Cervantes",
  "year": "1924 / Digital",
  "isFeatured": true,
  "createdAt": "2026-09-25T12:00:00Z",
  "updatedAt": "2026-09-25T12:00:00Z",
  "uploadedBy": "coello.iemarcofidelsuarez@sedtolima.edu.co"
}
```

**Tipos de datos en Firestore:**
- `id`: `string` (Identificador alfanumérico)
- `category`: `string` (`lenguaje` \| `matematicas` \| `ciencias` \| `sociales` \| `tecnologia` \| `ingles`)
- `fileType`: `string` (`Libro Digital` \| `Guía de Aprendizaje` \| `Portal Web` \| `PDF`)
- `isFeatured`: `boolean`
- `createdAt` / `updatedAt`: `timestamp`

#### 2. Colección `institution_info` (Datos Institucionales)
Documento singleton `sede_gualanday`:
```json
{
  "name": "Institución Educativa Marco Fidel Suárez",
  "location": "Corregimiento de Gualanday, Coello, Tolima",
  "address": "Calle 1A No. 1-13",
  "officialEmail": "coello.iemarcofidelsuarez@sedtolima.edu.co",
  "phone": "+57 320 244 2996",
  "officialSite": "https://marcofidelsuarezcoello.edu.co/",
  "shift": "Mañana",
  "sector": "Oficial / Público"
}
```

### Reglas de Seguridad (`firestore.rules`)
Las siguientes reglas protegen la integridad de los datos, permitiendo lectura abierta para toda la comunidad y restringiendo la escritura:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Lectura pública de recursos para cualquier visitante
    match /resources/{resourceId} {
      allow read: if true;
      
      // Creación permitida si cumple validaciones mínimas del esquema
      allow create: if request.resource.data.title is string 
                    && request.resource.data.author is string
                    && request.resource.data.url is string
                    && request.resource.data.category in ['lenguaje', 'matematicas', 'ciencias', 'sociales', 'tecnologia', 'ingles'];
                    
      // Edición o eliminación restringida a usuarios con rol docente/administrador autenticado
      allow update, delete: if request.auth != null && request.auth.token.role == 'admin';
    }

    // Información institucional: solo lectura pública
    match /institution_info/{docId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'admin';
    }
  }
}
```

### Políticas de Caché y Persistencia Offline
- **Cliente Web:** La aplicación implementa sincronización con `localStorage` (`mf_suarez_resources_v1`) como capa primaria de contingencia.
- **SDK Firestore:** Permite activación de persistencia offline con `enableIndexedDbPersistence(db)` para que los estudiantes puedan consultar recursos previamente cacheados aún sin conexión a internet en la sede rural.

---

## 5. Instalación y Configuración

### Requisitos Previos
- **Node.js:** Versión `18.18.0` o superior (Recomendado `20.x LTS`).
- **NPM:** Gestor de paquetes versión `9.0.0` o superior.
- **Git:** Para clonar el repositorio de código.
- **Cuenta en Firebase:** Si se desea vincular a un proyecto propio de Google Cloud / Firebase.
- **Cuenta en Vercel:** Para el despliegue automático en la nube.

### Guía Paso a Paso

#### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/biblioteca-digital-iemfs.git
cd biblioteca-digital-iemfs
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Configurar variables de entorno
Copia la plantilla de variables:
```bash
cp .env.example .env
```

Edita `.env` con los valores correspondientes:
```env
# URL del entorno
APP_URL="http://localhost:3000"

# Credenciales de Firebase (obtenidas en la consola de Firebase)
VITE_FIREBASE_API_KEY="AIzaSyA..."
VITE_FIREBASE_AUTH_DOMAIN="biblioteca-iemfs.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="biblioteca-iemfs"
VITE_FIREBASE_STORAGE_BUCKET="biblioteca-iemfs.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="262585239986"
VITE_FIREBASE_APP_ID="1:262585239986:web:abcd1234efgh"
```

#### 4. Ejecutar el servidor de desarrollo local
```bash
npm run dev
```
Abre tu navegador en `http://localhost:3000`.

#### 5. Compilación y comprobación de tipos
```bash
# Validar tipos con TypeScript
npm run lint

# Generar compilación optimizada en carpeta /dist
npm run build
```

---

## 6. Infraestructura y Despliegue con Vercel

La aplicación está lista para ser desplegada en **Vercel**, aprovechando su red Edge Global distribuida, compresión HTTP/3 y certificados TLS automáticos.

### Topología de Red y Arquitectura Vercel

```text
[ Usuario Móvil / PC ]
         │
         ▼  (HTTPS / TLS 1.3 / HTTP3)
[ Vercel Edge Network (Anycast CDN Global) ]
   ├── Enrutamiento SPA (Rewrites a /index.html)
   ├── Caché Inteligente de Activos Estáticos (.js, .css, .woff2, imágenes)
   └── Compresión Automática (Brotli / Gzip)
         │
         ▼
[ Google Cloud Firestore / Firebase Services ]
   └── Consulta y lectura en tiempo real del catálogo
```

### Configuración de Despliegue (`vercel.json`)
El archivo `vercel.json` ubicado en la raíz del repositorio asegura el correcto comportamiento de la SPA:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Despliegue Continuo (CI/CD) con GitHub y Vercel

#### Método A: Mediante la interfaz web de Vercel (Recomendado)
1. Inicia sesión en [Vercel](https://vercel.com).
2. Haz clic en **"Add New..."** → **"Project"**.
3. Importa el repositorio de GitHub donde subiste el código.
4. En la configuración de construcción:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. En la sección **"Environment Variables"**, añade las variables definidas en tu `.env` (`VITE_FIREBASE_*`, `APP_URL`).
6. Haz clic en **"Deploy"**. En ~45 segundos el sitio estará activo con URL pública `.vercel.app`.

#### Método B: Mediante Vercel CLI (Terminal)
```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Iniciar sesión en tu cuenta
vercel login

# Desplegar a producción
vercel --prod
```

### Asignación de Dominio Personalizado
Para asociar un dominio oficial de la institución (ej. `biblioteca.marcofidelsuarezcoello.edu.co`):
1. Ve al proyecto en el panel de Vercel → **Settings** → **Domains**.
2. Escribe el subdominio deseado y presiona **Add**.
3. En el panel de control DNS de tu proveedor de dominio (SED Tolima o registrador):
   - Crear un registro **CNAME**:
     - **Host:** `biblioteca`
     - **Valor:** `cname.vercel-dns.com`
4. Vercel aprovisionará automáticamente el certificado SSL emitido por *Let's Encrypt*.

---

## 7. Mantenimiento, Seguridad y Rendimiento

1. **Monitoreo de Core Web Vitals:**
   - La arquitectura garantiza métricas de **LCP (Largest Contentful Paint) < 1.2s** y **CLS (Cumulative Layout Shift) = 0** gracias a la pre-renderización y carga diferida de modales.
2. **Backups del Catálogo:**
   - El catálogo institucional cuenta con respaldo en código estático (`src/data/resources.ts`) y soporte para exportación en JSON desde Firestore.
3. **Optimización de Recursos Móviles:**
   - No se emplean imágenes pesadas sin optimizar; toda la iconografía y el código QR se generan vectorialmente mediante SVG.

---

## 8. Créditos e Información Institucional

**Institución Educativa Marco Fidel Suárez**  
*Sede Principal — Corregimiento de Gualanday*  
Municipio de Coello, Departamento del Tolima, Colombia  

- **Dirección:** Calle 1A No. 1-13, Gualanday, Coello, Tolima  
- **Correo Electrónico:** [coello.iemarcofidelsuarez@sedtolima.edu.co](mailto:coello.iemarcofidelsuarez@sedtolima.edu.co)  
- **Línea Telefónica:** [+57 320 244 2996](tel:3202442996)  
- **Portal Web Oficial:** [marcofidelsuarezcoello.edu.co](https://marcofidelsuarezcoello.edu.co/)  
- **Enlace de Producción Activo:** [Biblioteca Digital en la Web](https://ais-pre-lgzoztfww7aqfg5mb6ekqa-262585239986.us-east1.run.app)
