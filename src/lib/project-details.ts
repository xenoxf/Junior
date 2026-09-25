export type EndpointRow = {
  method: string
  path: string
  description: string
  auth: string
}

export type StackRow = {
  capa: string
  tecnologia: string
  detalle: string
}

export type ProjectDetail = {
  context: string[]
  architectureDiagram: string
  architectureNotes: string[]
  stackTable: StackRow[]
  modules?: { name: string; description: string }[]
  endpoints?: EndpointRow[]
  dataDiagram?: string
  dataNotes?: string[]
  authSecurity?: string[]
  frontend?: { routes?: string[]; notes: string[] }
  deployment: { where: string; how: string[]; env?: string[] }
  methodology: string[]
  challenges: { title: string; solution: string }[]
  learnings: string[]
  runLocally: string[]
  nextSteps: string[]
}

export const projectDetails: Record<string, ProjectDetail> = {
  learnyos: {
    context: [
      'LearnYos es el frontend del sistema educativo Kire (frontend learnyos-x2 + backend Klerk). El problema que ataca: estudiar para exámenes tipo ICFES / quiz es lento si el material hay que crearlo a mano. LearnYos lo genera con IA a partir de un tema o de archivos (PDF, imágenes) y lo convierte en exámenes jugables, flashcards y notas con Markdown + KaTeX.',
      'Usuarios: estudiantes que practican, crean mazos y repasan; docentes o creadores que comparten material con códigos de 5 caracteres. El frontend debe renderizar contenido rico (Markdown, resaltado de código, fórmulas), manejar estados de generación asíncrona y no exponer nunca las keys de IA: todo pasa por Klerk.',
    ],
    architectureDiagram: `Navegador (Next.js 14 App Router, React 18)
   │  react-hook-form + Zod · TanStack Query · next-themes
   │  react-markdown + KaTeX + highlight.js · Recharts (progreso)
   ▼
Klerk API (NestJS) ── JWT + x-api-key ── PostgreSQL / Gemini / SMTP
   ▲
Vercel (learnyos.vercel.app)`,
    architectureNotes: [
      'Next.js 14 con App Router: páginas de exámenes, flashcards, notas, chat, comunidad y estadísticas. Estado servidor con TanStack Query para caché y revalidación.',
      'Formularios tipados con react-hook-form + Zod + @hookform/resolvers; UI con Radix UI + Tailwind CSS 3 + sonner/vaul para feedback.',
      'Contenido educativo renderizado con react-markdown + remark-gfm/math + rehype-katex/highlight: soporta tablas, fórmulas y código.',
      'Chat educativo con streaming SSE (EventSource) contra POST /messages/send/stream; exámenes jugables con intentos registrados en /exam-attempts.',
    ],
    stackTable: [
      { capa: 'Framework', tecnologia: 'Next.js 14 / React 18', detalle: 'App Router, SSR/SSG donde conviene, resto CSR contra la API' },
      { capa: 'Estado servidor', tecnologia: 'TanStack Query 5', detalle: 'Caché de exámenes, mazos, notas, créditos y chat' },
      { capa: 'Formularios', tecnologia: 'react-hook-form + Zod', detalle: 'Validación tipada antes de llamar a Klerk' },
      { capa: 'UI', tecnologia: 'Radix UI + Tailwind 3', detalle: 'Accordion, dialog, tabs, toast, command palette (cmdk)' },
      { capa: 'Contenido', tecnologia: 'Markdown + KaTeX + highlight.js', detalle: 'Notas y preguntas con fórmulas y código' },
      { capa: 'Gráficas', tecnologia: 'Recharts', detalle: 'Progreso e historial de intentos' },
      { capa: 'Backend', tecnologia: 'Klerk (NestJS + PostgreSQL)', detalle: 'Ver ficha /proyecto/klerk' },
    ],
    dataNotes: [
      'El frontend no tiene BD propia: todo el dominio (User, Exam → Question → Option, Card → FlashCard, Note → NoteContent, Chat → Message, DailyCredits, Likes, ExamAttempt) vive en PostgreSQL vía Klerk.',
      'Comparte códigos de 5 caracteres para contenido público (/exams/code/:code); likes polimórficos y chat global para comunidad.',
    ],
    authSecurity: [
      'Login email/contraseña, Google OAuth y modo invitado; el backend devuelve accessToken (24h) + refreshToken hasheado.',
      'Cada request lleva x-api-key global + Authorization: Bearer JWT; el frontend guarda el token y el rol para gating de rutas.',
    ],
    frontend: {
      routes: ['/ (home)', '/exams, /exams/play/:id, /exams/code/:code', '/flash-cards, /flash-cards/code/:code', '/notes, /notes/code/:code', '/chat (streaming SSE)', '/comunidad, /estadísticas, /créditos'],
      notes: ['Generación por tema o archivo: el frontend sube a Klerk y muestra skeleton + polling/stream hasta tener el JSON estructurado.', 'Reproductor de exámenes con temporizador, corrección inmediata y registro de intento para estadísticas.'],
    },
    deployment: {
      where: 'Vercel (learnyos.vercel.app) · API Klerk separada · PostgreSQL gestionado (Aiven/Neon)',
      how: ['Build: next build; env con NEXT_PUBLIC_API_URL + API_KEY pública de lectura', 'CORS_ORIGINS en Klerk debe incluir el dominio Vercel', 'Preview deployments por PR para probar integración antes de merge'],
    },
    methodology: [
      'Desarrollo iterativo por features educativas: primero exámenes quiz, luego ICFES, flashcards, notas y chat.',
      'Contrato API-first: los DTOs de Klerk (GenerateExamDto, etc.) dictan los schemas Zod del frontend; si el backend rechaza (400 array), se muestra tal cual.',
      'Verificación con pnpm build + ESLint (next lint) antes de cada push; revisión manual del streaming SSE con throttling de red.',
    ],
    challenges: [
      { title: 'Renderizar IA impredecible', solution: 'JsonExtractor en backend + sanitización XSS en frontend; si el JSON viene con fences markdown se limpia antes de renderizar.' },
      { title: 'Costos de IA', solution: 'Créditos diarios (30/día) visibles en UI (/credits/status); rate-limit por generación reflejado con mensajes y retry.' },
    ],
    learnings: ['App Router + React Server Components vs. componentes cliente para Markdown/KaTeX.', 'Diseño de UX para generación asíncrona larga (optimistic UI + SSE).', 'Integración frontend-backend con doble capa de auth (API key + JWT).'],
    runLocally: ['git clone https://github.com/xenoxf/learnyos-x2 && cd learnyos-x2', 'pnpm install (o npm install)', 'Crear .env.local con NEXT_PUBLIC_API_URL=http://localhost:2300 y la x-api-key de Klerk', 'pnpm dev → http://localhost:3000 (requiere Klerk corriendo)'],
    nextSteps: ['Modo offline con Service Workers para repasar sin conexión.', 'Spaced repetition real en flashcards.', 'Exportar exámenes a PDF.'],
  },

  klerk: {
    context: [
      'Klerk es el backend del sistema Kire / LearnYos: API educativa con IA que genera exámenes (quiz e ICFES), flashcards y notas desde un tema o archivo, con chat educativo en streaming, créditos diarios y comunidad. Documentado en README y ARCHITECTURE.md.',
      'Decisión clave: monolito modular NestJS en vez de microservicios, para que un solo desarrollador pueda mantener 11 dominios con un único deploy y una sola base PostgreSQL.',
    ],
    architectureDiagram: `┌──────────┐  HTTPS + x-api-key + JWT  ┌─────────────────────────────────┐
│ Frontend │ ────────────────────────▶ │ Klerk API (NestJS 10, Express)    │
│ LearnYos │                            │ auth │ users │ exams │ flash-cards │
└──────────┘                            │ notes │ messages │ gemini │ credits │
                                        │ likes │ global-chat │ exam-attempts │
                                        └──────┬──────────────┬───────────────┘
                                               │              │
                                    ┌──────────▼─────┐ ┌──────▼──────────────┐
                                    │  PostgreSQL    │ │ Gemini API (rotación│
                                    │  TypeORM       │ │ keys + fallback) +  │
                                    └────────────────┘ │ SMTP + Google OAuth │
                                                       └─────────────────────┘`,
    architectureNotes: [
      'Capas por módulo: *.controller.ts (HTTP, DTOs, guards) → *.service.ts (negocio) → entities/*.entity.ts (TypeORM) → dto/*.dto.ts (class-validator). Transversal en src/common (guards, filtros, decoradores, storage).',
      'Arranque en src/main.ts: CORS por env, rate-limit por ruta sensible, Helmet con CSP, ValidationPipe global (whitelist + forbidNonWhitelisted + transform), sanitización XSS, AllExceptionsFilter y ApiKeyGuard global.',
      'Módulo gemini centraliza prompts (AI_PROMPTS.ts), salida JSON por responseSchema, JsonExtractor anti-markdown, multimodal base64 y streaming SSE vía generateContentStream.',
    ],
    stackTable: [
      { capa: 'Framework', tecnologia: 'NestJS 10 + Express', detalle: 'DI por módulos, platform-express' },
      { capa: 'ORM / BD', tecnologia: 'TypeORM 0.3 + PostgreSQL (pg)', detalle: 'autoLoadEntities, synchronize solo dev' },
      { capa: 'IA', tecnologia: '@google/generative-ai', detalle: 'Rotación GEMINI_API_KEY(s) ante 429; fallback gemini-2.5-flash-lite → 2.5-flash → 2.0-flash-lite → 1.5-flash' },
      { capa: 'Auth', tecnologia: 'Passport JWT + Google OAuth 2.0 + bcryptjs', detalle: 'Access 24h + refresh SHA-256; invitados con isGuest' },
      { capa: 'Email', tecnologia: 'Nodemailer SMTP', detalle: 'Verificación de cuentas' },
      { capa: 'Seguridad', tecnologia: 'Helmet + throttler + express-rate-limit', detalle: '20 req/15min en /auth; límites diarios de generación' },
      { capa: 'Tests', tecnologia: 'Jest + Supertest', detalle: 'Unit + e2e' },
    ],
    modules: [
      { name: 'auth', description: 'Registro/login local, Google (código e ID token), invitados, refresh, verificación email.' },
      { name: 'users', description: 'CRUD + borrado lógico pendingDeletion.' },
      { name: 'exams', description: 'Exámenes quiz/ICFES con Exam → ExamQuestion → ExamOption.' },
      { name: 'flash-cards', description: 'Mazos Card → FlashCard.' },
      { name: 'notes', description: 'Note → NoteContent (Markdown enriquecido).' },
      { name: 'messages', description: 'Chats con IA en JSON o SSE, con archivos adjuntos.' },
      { name: 'gemini', description: 'Wrapper IA: prompts, schemas, rotación, multimodal, streaming.' },
      { name: 'credits', description: '30 créditos/día por usuario para generación.' },
      { name: 'likes', description: 'Likes polimórficos exam|card|note con UNIQUE(userId, cardType, cardId).' },
      { name: 'global-chat', description: 'Chat comunitario.' },
      { name: 'exam-attempts', description: 'Intentos + estadísticas; formatters deck/exam.' },
    ],
    endpoints: [
      { method: 'POST', path: '/auth/register · /auth/login · /auth/google · /auth/refresh · /auth/me · /auth/guest', description: 'Ciclo completo de autenticación', auth: 'x-api-key (+ JWT según ruta)' },
      { method: 'POST', path: '/exams/generate/topic_or_reference', description: 'Generar examen por tema o archivo', auth: 'JWT + créditos' },
      { method: 'POST', path: '/flash-cards/generate/topic_or_reference', description: 'Generar mazo por tema o archivo', auth: 'JWT + créditos' },
      { method: 'POST', path: '/notes/generate/topic_or_reference', description: 'Generar nota por tema o archivo', auth: 'JWT + créditos' },
      { method: 'GET', path: '/exams · /exams/play/:id · /exams/code/:code · /exams/search', description: 'CRUD + jugar + compartir + buscar', auth: 'JWT' },
      { method: 'POST', path: '/messages/send · /messages/send/stream (SSE)', description: 'Chat educativo JSON o streaming', auth: 'JWT' },
      { method: 'GET', path: '/credits/status · /credits/costs', description: 'Saldo y costos de IA', auth: 'JWT' },
      { method: 'GET', path: '/health · /ping · /gemini/health', description: 'Health checks públicos', auth: 'Ninguna / x-api-key' },
    ],
    dataDiagram: `User 1──* Note 1──1 NoteContent
User 1──* Exam 1──* ExamQuestion 1──* ExamOption
User 1──* Card 1──* FlashCard
User 1──* Chat 1──* Message
User 1──* DailyCredits · CardLike · ExamAttempt
Códigos de 5 caracteres en Note/Exam/Card para compartir.`,
    dataNotes: ['Índices en userId y createdAt; cascadas en hijos; UNIQUE en likes para evitar dobles.', 'Uploads en /uploads servidos estático + enviados en base64 a Gemini para análisis multimodal.'],
    authSecurity: [
      'ApiKeyGuard global exige x-api-key salvo /health, /ping, /auth/* o JWT válido.',
      'JwtGuard / JwtAuthGuard / RequireAuthGuard + decoradores @RequireAuth/@AllowGuest para bloquear invitados donde no apliquen.',
      'Límite 1 MB por body (413), sanitización <script>/on*= en body permitiendo Markdown, TypeORM parametrizado anti-SQLi, frameguard deny.',
    ],
    deployment: {
      where: 'Render/Railway/VPS + PostgreSQL gestionado (Aiven/Neon con SSL)',
      how: ['pnpm install --frozen-lockfile && pnpm build', 'NODE_ENV=production, synchronize=false + migraciones TypeORM', 'Reverse proxy Nginx/Caddy con HTTPS; BACKEND_URL al dominio público', 'Puerto configurable (default 2300)'],
      env: ['DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME', 'JWT_SECRET, JWT_EXPIRATION, API_KEY', 'GEMINI_API_KEY, GEMINI_API_KEY_2', 'GOOGLE_CLIENT_ID/SECRET, MAIL_USER/MAIL_PASS, CORS_ORIGINS'],
    },
    methodology: [
      'Docs como código: README y ARCHITECTURE.md se actualizan con cada módulo para mantener la documentación al día sin leer todo el código.',
      'Seguridad por defecto: todo cerrado salvo lo explícitamente público; validación estricta que rechaza propiedades extra.',
      'Economía de IA: créditos + rate-limit + rotación de keys para no quemar cuota en un abuso.',
    ],
    challenges: [
      { title: 'Gemini devuelve markdown con JSON dentro', solution: 'JsonExtractor que limpia fences y parsea; responseSchema para forzar JSON mode.' },
      { title: '429 de cuota', solution: 'Rotación automática de 2 keys + fallback de 4 modelos ordenados por costo/calidad.' },
      { title: 'Secretos expuestos en historial', solution: 'Purgado de git + rotación obligatoria documentada en README antes de publicar.' },
    ],
    learnings: ['Diseño de APIs modulares NestJS a escala (11 dominios).', 'Orquestación de LLMs en producción: prompts, schemas, streaming y costos.', 'Endurecimiento real: Helmet, rate-limit granular, XSS, ApiKey global.'],
    runLocally: ['git clone https://github.com/xenoxf/klerk && cd klerk', 'pnpm install', 'cp .env.example .env y completar DB, JWT_SECRET, API_KEY, GEMINI_API_KEY(s)', 'pnpm run start:dev → http://localhost:2300'],
    nextSteps: ['Migraciones TypeORM versionadas para producción.', 'Cola (BullMQ) para generaciones largas con reintentos.', 'Evaluación automática de calidad de exámenes generados.'],
  },

  sistekpro: {
    context: [
      'Sistek Pro es ahora un sistema full stack, no solo un sitio. El frontend (repo systekpro) es la presencia profesional de Sistek —infraestructura tecnológica y redes en Cali— y el backend (repo sistekpro-backend, NestJS 11) es la herramienta operativa: usuarios por roles, fichas técnicas (hojas de vida de equipos), órdenes de servicio con timeline y seguimiento público por QR.',
      'Verificado en READMEs y código: frontend Astro 6 + React 19 + Tailwind 4 con SEO completo; backend NestJS 11 con TypeORM, PostgreSQL/MySQL, auth API Key + JWT, Helmet, Throttler y documentación API.md para el frontend. Incluye database.drawio con el ERD.',
    ],
    architectureDiagram: `Visitantes / Clientes                    Técnicos / Admin
        │                                        │
        ▼                                        ▼
Astro 6 SSG + Islas React 19            NestJS 11 API REST (Render)
(SEO, blog, servicios, seguimiento) ──fetch──▶ auth │ users │ ficha_tecnica
        │                                   │ ordenes │ clientes │ empleados
        │                                   │ leads │ departamentos
        ▼                                        ▼
Vercel (sistekpro.vercel.app)          PostgreSQL (+ MySQL compat.)
QR público ──▶ /seguimiento?code=XXX ──▶ endpoint público con x-api-key`,
    architectureNotes: [
      'Frontend: Astro 6 con contenido en src/content (blog), layouts con SEO, páginas por servicio en src/pages/servicios, sistema de seguimiento en /seguimiento y formularios backendless vía FormSubmit + GA4.',
      'Backend: módulos NestJS con patrón controller/service/module + dto/entities/enums por feature; transversal en src/common (seguridad, errores, metadata) y config validada con class-validator (src/config/env.validation.ts). Falla al arrancar si falta env obligatoria.',
      'Flujo de petición: Helmet → CORS → Throttler (100/60s global + 10/min login) → ApiKeyGuard → JwtGuard por roles → ValidationPipe → servicio → TypeORM → respuesta uniforme + log de lentas (>5s).',
    ],
    stackTable: [
      { capa: 'Frontend', tecnologia: 'Astro 6 + React 19 + Tailwind 4', detalle: 'SSG + islas; Tabler Icons; react-hook-form; qrcode.react' },
      { capa: 'SEO', tecnologia: 'JSON-LD + sitemap + robots', detalle: 'LocalBusiness, Organization, Service, FAQPage, BreadcrumbList; hreflang, canonical, OG/Twitter' },
      { capa: 'Backend', tecnologia: 'NestJS 11 + TypeScript ES2023', detalle: '@nestjs/config, @nestjs/jwt + bcrypt, @nestjs/throttler, helmet, class-validator' },
      { capa: 'ORM / BD', tecnologia: 'TypeORM + PostgreSQL (pg) / MySQL (mysql2)', detalle: 'synchronize:true solo dev; seed interno sin registro público' },
      { capa: 'Package mgmt', tecnologia: 'pnpm (backend) / npm (frontend)', detalle: 'Node 20+ / 22+; PG 14+' },
      { capa: 'Deploy', tecnologia: 'Vercel (front) + Render (back)', detalle: 'Backend vivo en sistekpro-backend.onrender.com' },
    ],
    modules: [
      { name: 'auth', description: 'POST /auth/login (10 req/min) → { token 10h, user:{id,name,role} }; GET /auth/profile. Sin registro público.' },
      { name: 'users', description: 'GET/PATCH/DELETE /users solo admin; password nunca se devuelve, se re-hashea al actualizar.' },
      { name: 'ficha_tecnica', description: 'CRUD hojas de vida de equipos: cliente, servicio, marca/modelo/serial único, CPU/RAM/disco, garantía, fechas.' },
      { name: 'ordenes', description: 'Órdenes con estados + timeline de eventos + código de seguimiento público (QR → TRACKING_URL_BASE).' },
      { name: 'clientes / empleados / departamentos / leads', description: 'Gestión operativa y comercial conectada a fichas y órdenes.' },
    ],
    endpoints: [
      { method: 'GET', path: '/', description: 'Health "Hola Mundo!"', auth: 'x-api-key' },
      { method: 'POST', path: '/auth/login {name,password}', description: 'Emite JWT 10h + rol', auth: 'x-api-key' },
      { method: 'GET', path: '/users · /users/:id', description: 'Listar / detalle (UUID)', auth: 'JWT admin' },
      { method: 'PATCH/DELETE', path: '/users/:id', description: 'Actualizar (re-hash) / eliminar', auth: 'JWT admin' },
      { method: 'CRUD', path: '/ficha-tecnica', description: 'Hojas de vida; serial único (409 si duplica)', auth: 'JWT cualquier rol' },
      { method: 'CRUD + público', path: '/ordenes · /seguimiento/:code', description: 'Gestión interna + consulta pública por QR', auth: 'JWT / solo x-api-key' },
    ],
    dataDiagram: `users (id UUID, name UNIQUE, password_hash, role admin|mantenimiento)
  │ 1──* ficha_tecnica (serialEquipo UNIQUE, cliente, hardware, garantía)
  │ 1──* ordenes (estado, timeline eventos) ── código seguimiento ──▶ QR
clientes · empleados · departamentos · leads ──▶ relacionan fichas/órdenes
Ver database.drawio en el repo para el ERD exacto.`,
    dataNotes: ['Seed crea admin + mantenimiento (pnpm run seed); no hay endpoint de registro.', 'Formato de error uniforme {statusCode, error, message, path, method, timestamp} con 400/401/403/404/409/429 documentados.'],
    authSecurity: [
      'Doble capa: header x-api-key global en TODAS las rutas + Bearer JWT en protegidas; rol viaja en el token.',
      'Validación .env al boot; Helmet, Throttler global 100/60s, CORS por env, DTOs estrictos anti-inyección.',
      'Nunca commitear .env: JWT_SECRET y API_KEY con openssl rand -hex 32.',
    ],
    frontend: {
      routes: ['/ (home)', '/servicios/* (redes, cableado CAT6, WiFi, soporte)', '/sistema (acceso operativo)', '/seguimiento (consulta pública por código/QR)', '/blog/*, /nosotros, /contacto, /políticas'],
      notes: ['SEO como feature: meta OG/Twitter, hreflang, canonical, sitemap dinámico, breadcrumbs semánticos.', 'Formularios con FormSubmit (sin backend propio en el front) + QR con qrcode.react para órdenes.'],
    },
    deployment: {
      where: 'Frontend Vercel (sistekpro.vercel.app) · Backend Render (sistekpro-backend.onrender.com) · PostgreSQL gestionado',
      how: ['Frontend: npm run build → Astro SSG a Vercel', 'Backend: pnpm build && pnpm start:prod (o start:dev con watch); seed previo', 'CORS_ORIGIN y TRACKING_URL_BASE apuntando al dominio Vercel', 'DB_SSL=true en gestionados; synchronize:false en producción + migraciones'],
      env: ['PORT, CORS_ORIGIN', 'DB_HOST/PORT/USER/PASS/NAME, DB_SSL', 'JWT_SECRET, JWT_EXPIRATION=10h, API_KEY', 'THROTTLE_TTL/LIMIT, TRACKING_URL_BASE', 'SEED_ADMIN_PASSWORD, SEED_MANTENIMIENTO_PASSWORD'],
    },
    methodology: [
      'API-first con API.md como contrato: el frontend se programa contra tablas de endpoints y ejemplos, no contra prueba-error.',
      'Guías internas de integración y troubleshooting para resolver errores de integración y 401 de forma sistemática.',
      'Orden de estudio recomendado en README (del main.ts → capas → flujos) para onboarding rápido de reclutadores/devs.',
    ],
    challenges: [
      { title: '401 fantasma en login', solution: 'Revisar x-api-key vs JWT, CORS_ORIGIN, expiración 10h y rol con guía interna de troubleshooting.' },
      { title: 'synchronize en prod', solution: 'Documentado como solo-dev; en prod migraciones y synchronize:false.' },
      { title: 'Seguimiento público sin filtrar datos', solution: 'Endpoint público mínimo por código, con solo x-api-key y sin exponer usuarios internos.' },
    ],
    learnings: ['Construir un sistema empresa-real: marketing + operación en dos repos coordinados.', 'Auth por roles con doble llave y seed seguro.', 'SEO técnico + Deploy desacoplado Vercel/Render.'],
    runLocally: ['Frontend: git clone https://github.com/xenoxf/systekpro && npm install && npm run dev (→ :4321)', 'Backend: git clone https://github.com/xenoxf/sistekpro-backend && pnpm install', 'Crear .env según README §3 (DB + JWT_SECRET + API_KEY)', 'createdb sistekpro_db && pnpm run seed && pnpm run start:dev (→ :3000)'],
    nextSteps: ['Migraciones TypeORM y CI con tests Jest + e2e.', 'Adjuntos/fotos de equipos en fichas (S3/Cloudinary).', 'Notificaciones por estado de orden (email/WhatsApp).'],
  },

  diamante: {
    context: [
      'Diamante es un sistema institucional full stack: web pública en Astro 7 + React 19 y CMS headless en Strapi 5 con PostgreSQL y Cloudinary. La web tiene 20+ páginas (identidad, noticias, galería, sedes, especialidades, admisiones, PQRSF, corrupción, contacto) y todo el contenido dinámico sale de Strapi.',
      'Verificado en el repo: /web (Astro) con src/pages/*.astro + /api, /strapi con ~20 content-types en src/api, /data con state_store.db y strapi/.env.example. Deploy web en diamante-nu.vercel.app.',
    ],
    architectureDiagram: `Editores ──▶ Strapi 5 Admin ──▶ PostgreSQL
              │ uploads ──▶ Cloudinary
              ▼ REST /api/*
Astro 7 SSG/SSR (diamante-nu.vercel.app)
noticias · galería · sedes · especialidades · PQRSF · admisiones`,
    architectureNotes: [
      'Desacople total: Strapi solo expone REST; Astro hace fetch en build/SSR y genera páginas estáticas rápidas con islas React donde hay interactividad.',
      'Content-types: noticia, categoria-noticia, galeria-item, categoria-galeria, sede, especialidad, slide-carrusel, documento-institucional, pagina-* (inicio, identidad, contacto, admisiones, conexiones, invitaciones-home), configuracion-general, mensaje-contacto, solicitud-pqrsf, denuncia-corrupcion, invitacion-contratacion.',
      'Uploads a Cloudinary vía @strapi/provider-upload-cloudinary; PG vía pg driver; state local en data/state_store.db para utilidades.',
    ],
    stackTable: [
      { capa: 'Frontend', tecnologia: 'Astro 7 + React 19', detalle: 'SSG + SSR selectivo; sitemap vía @astrojs/sitemap' },
      { capa: 'CMS', tecnologia: 'Strapi 5.52', detalle: 'users-permissions, plugin-cloud, REST auto-generado' },
      { capa: 'BD', tecnologia: 'PostgreSQL', detalle: 'Driver pg; SQLite solo dev local' },
      { capa: 'Media', tecnologia: 'Cloudinary', detalle: 'Provider oficial de uploads' },
      { capa: 'Deploy', tecnologia: 'Vercel (web)', detalle: 'diamante-nu.vercel.app' },
    ],
    endpoints: [
      { method: 'GET', path: '/api/noticias?populate=*', description: 'Noticias con categorías e imágenes', auth: 'Token Strapi / público' },
      { method: 'GET', path: '/api/galeria-items · /api/sedes · /api/especialidades', description: 'Contenido institucional', auth: 'Público' },
      { method: 'POST', path: '/api/mensaje-contacto · /api/solicitud-pqrsf · /api/denuncia-corrupcion', description: 'Formularios ciudadanos', auth: 'Público + captcha/rate-limit' },
      { method: 'GET', path: '/api/pagina-inicio · /api/configuracion-general', description: 'Home y ajustes globales', auth: 'Público' },
    ],
    dataDiagram: `noticia *──1 categoria-noticia · galeria-item *──1 categoria-galeria
sede 1──* especialidad · slide-carrusel (home)
documento-institucional (manual, PEI, útiles, resoluciones)
mensaje-contacto · solicitud-pqrsf · denuncia-corrupcion (escritura pública)`,
    authSecurity: ['Roles Strapi (public/authenticated) por content-type; escritura pública solo en formularios.', 'Validación de uploads (tipo/tamaño) en Cloudinary; CORS restringido al dominio Vercel.'],
    frontend: {
      routes: ['/ (home con slides)', '/noticias/*, /galeria, /sedes/*, /especialidades/*', '/mision, /vision, /valores, /pei, /organigrama, /directorio', '/inscripciones, /contratacion, /peticiones-quejas-y-reclamos, /denuncias, /contacto, /canales'],
      notes: ['Muchas páginas son Markdown/collections + fetch a Strapi; sitemap.xml.ts dinámico.', 'Formularios POST directo a Strapi con estados y validación cliente.'],
    },
    deployment: {
      where: 'Vercel (web) + Strapi en VPS/Render + PostgreSQL gestionado + Cloudinary',
      how: ['Web: pnpm build en /web con STRAPI_URL pública', 'Strapi: strapi build && strapi start con .env (DB + Cloudinary + JWT secrets)', 'Revalidar Astro al publicar en Strapi (webhook → redeploy)'],
      env: ['STRAPI_URL, STRAPI_TOKEN', 'DATABASE_URL, CLOUDINARY_NAME/KEY/SECRET', 'JWT_SECRET, ADMIN_JWT_SECRET, API_TOKEN_SALT'],
    },
    methodology: ['CMS-first: primero se modelan content-types, luego las páginas Astro los consumen.', 'Contenido versionable: documentos institucionales como colección, no PDFs sueltos.', 'Accesibilidad y SEO para sector público/educativo.'],
    challenges: [
      { title: '20+ páginas sin duplicar fetch', solution: 'Helpers GET centralizados en /web/src/pages/api + layouts compartidos.' },
      { title: 'Imágenes pesadas', solution: 'Cloudinary con transformaciones (responsive + lazy).' },
    ],
    learnings: ['Modelado CMS real con Strapi 5.', 'SSG a escala con decenas de rutas y sitemap dinámico.', 'Formularios públicos seguros (PQRSF/denuncias).'],
    runLocally: ['Web: cd diamante/web && pnpm install && pnpm dev (→ :4321)', 'CMS: cd diamante/strapi && npm install && cp .env.example .env && npm run develop (→ :1337)', 'Configurar STRAPI_URL en la web hacia http://localhost:1337'],
    nextSteps: ['Búsqueda full-text de noticias/documentos.', 'Portal de admisiones con trazabilidad.', 'Internacionalización.'],
  },

  killer: {
    context: [
      'Killer es mi proyecto más “sistemas”: un explorador de archivos desktop con Tauri 2 + SolidJS donde el filesystem real está en Go y Rust solo es el puente IPC. Nació del template Tauri + Solid + TS y evolucionó a arquitectura tri-lenguaje documentada en ARCHITECTURE.md y go/README.md.',
      'Para un reclutador: demuestra IPC real, manejo de procesos hijo, tipos compartidos entre 3 lenguajes y estrategia de fallback web vs desktop.',
    ],
    architectureDiagram: `┌──────────────┐ invoke("fs_*") ┌──────────────┐ stdin JSON ┌──────────────┐
│ SolidJS (TS) │ ────────────────▶ │ Rust (Tauri)   │ ───────────▶ │ Go (fs.SVC)    │
│ fsService +  │ ◀──────────────── │ go_bridge/     │ ◀─────────── │ internal/fs +  │
│ fsCache      │   JSON Response   │ sidecar.rs     │ stdout JSON  │ internal/ipc   │
└──────────────┘                   └──────────────┘              └──────────────┘
         └────────────── TÚNEL IPC stdio (sin HTTP ni sockets) ──────────────┘
stderr solo logs humanos [go]/[rust].`,
    architectureNotes: [
      'Go (killer/go): Service stateless con ListDir, ReadFile (límite 10 MB, detección binarios), Tree recursivo con MaxDepth, Stat, WriteFile, Exists, EnsureDir, Delete. Tipos Directory/FileDeck/File/Stat idénticos a src/types/fs.ts.',
      'Rust (src-tauri/src/go_bridge): GoBridge spawnea el binario (busca en binaries/killer-go*, ../go/killer-go, /tmp/killer-go o KILLER_GO_BIN), mantiene Child + pipes con Mutex para llamadas secuenciales; comandos fs_ping/list_dir/read_file/stat/tree/write/delete son proxies delgados. build.rs compila Go automáticamente.',
      'Frontend (src/): fsService (invoke + isTauri), fileService híbrido real/mock, fsCache reactivo, mock en cache/file.ts (archs) para vite dev. App.tsx carga mock y luego reemplaza con árbol real.',
    ],
    stackTable: [
      { capa: 'UI', tecnologia: 'SolidJS 1.9 + Vite 6', detalle: 'Signals; lucide-react icons' },
      { capa: 'Desktop', tecnologia: 'Tauri 2 + Tokio + UUID', detalle: 'Commands, setup con manage(), opener plugin' },
      { capa: 'Filesystem', tecnologia: 'Go 1.22+ (os/filepath)', detalle: 'Sin dependencias pesadas; JSON line-delimited' },
      { capa: 'Contrato', tecnologia: 'types/fs.ts ↔ types.go', detalle: 'Mismo JSON; trailing slash en dirs' },
      { capa: 'Build', tecnologia: 'pnpm + cargo + go build', detalle: 'Triple linux-gnu para sidecar' },
    ],
    endpoints: [
      { method: 'invoke', path: 'fs_ping', description: 'Health del túnel', auth: 'Tauri' },
      { method: 'invoke', path: 'fs_list_dir {path}', description: 'Un nivel de carpeta', auth: 'Tauri' },
      { method: 'invoke', path: 'fs_read_file {path}', description: 'Contenido o placeholder binario', auth: 'Tauri' },
      { method: 'invoke', path: 'fs_tree {root,maxDepth,showHidden}', description: 'Árbol recursivo limitado', auth: 'Tauri' },
      { method: 'invoke', path: 'fs_stat · fs_write_file · fs_delete', description: 'Metadata y escritura', auth: 'Tauri' },
    ],
    dataDiagram: `Request Rust→Go (stdin, una línea):
{"id":"uuid","method":"list_dir","params":{"path":"/src"}}
Response Go→Rust (stdout, una línea):
{"id":"uuid","result":{"type":"dir","path":"/src/","name":"src",...},"error":null}`,
    dataNotes: ['Sin sockets ni HTTP: el sidecar es hijo del proceso Tauri y muere con él (SIGINT/SIGTERM).', 'Subdirs inaccesibles se saltean sin tumbar el tree completo.'],
    deployment: {
      where: 'Desktop Linux/Win/Mac (Tauri bundle) + modo web mock en Vite',
      how: ['go vet ./... && go build -o src-tauri/binaries/killer-go ./go', 'cp a killer-go-x86_64-unknown-linux-gnu para el bundler', 'pnpm tauri dev (real) vs pnpm dev (mock web en :1420)'],
    },
    methodology: [
      'Contrato primero: tipos TS y Go se escriben a la par y se prueban con echo JSON por pipe antes de tocar UI.',
      'Fallback como feature: la app siempre arranca (web o sin Go) y degrada a mock documentado.',
      'Docs vivas: README + ARCHITECTURE.md + go/README.md con comandos copiables.',
    ],
    challenges: [
      { title: 'Orden de respuestas por stdio', solution: 'Mutex call_lock en Rust; Go procesa secuencial.' },
      { title: 'Binarios gigantes', solution: 'LimitReader 10 MB + detección NUL/UTF-8 → placeholder "[binary N bytes]".' },
      { title: 'Sidecar no encontrado', solution: 'Búsqueda en 4 rutas + env KILLER_GO_BIN + build.rs que lo compila solo.' },
    ],
    learnings: ['IPC por stdio entre Rust y Go.', 'Empaquetado Tauri con binarios externos.', 'Diseño tolerante a fallos con mocks.'],
    runLocally: ['cd killer && pnpm install && pnpm dev (mock web → :1420)', 'Con Go real: cd killer/go && go build -o ../src-tauri/binaries/killer-go . && cp a triple linux-gnu', 'cd killer && pnpm tauri dev', 'Probar Go solo: echo \'{"id":"1","method":"ping","params":{}}\' | /tmp/killer-go'],
    nextSteps: ['Búsqueda full-text y watcher de cambios.', 'Permisos y operaciones batch.', 'Firmado y auto-update Tauri.'],
  },

  xenner: {
    context: [
      'Xenner es un bloc de notas desktop (Tauri 2 + SolidJS + TS + Rust) donde toda la UI se personaliza con skins en archivos TXT que el usuario edita. El diseño es tolerante a fallos: una skin rota jamás cuelga la app.',
      'El valor técnico: un SkinEngine tolerante a fallos + backend Rust mínimo + transparencia real de ventana para glassmorphism.',
    ],
    architectureDiagram: `skins/<nombre>/*.txt ──▶ Rust scan_skins/read_skin_file ──▶ SolidJS SkinEngine
config.txt (skinPath="webcore") ──▶ parse clave="valor" ──▶ CSS vars --skin-*
default glassmorphism EMBEBIDA ◀── fallback si falta/falla/corrupto ── app viva`,
    architectureNotes: [
      'Formato TXT: una variable por línea clave="valor" (comillas opcionales), # comentarios, última duplicada gana, desconocidas se ignoran, valores con !important/;/{} se descartan (anti-CSS-injection).',
      'Por componente: background.txt, button.txt, note.txt, sidebar.txt, input.txt, toolbar.txt + skin.txt (manifiesto name/version/author). Claves comunes background/text/border/radius/blur/shadow/accent/font + propias (backgroundHover, itemActive, placeholder, focus...).',
      'Aplicación: variables --skin-<comp>-<clave> en :root; componentes solo usan vars, nunca colores hardcodeados. Cambiar TXT + recargar = nueva apariencia.',
      'Rust: scan_skins lista carpetas con skin.txt válido ([] si nada); lectura que nunca falla. Frontend: notas CRUD fase 1 en localStorage; ventana transparent:true + html,body{background:transparent} para blur real del SO (window-vibrancy en Win/Mac a futuro).',
    ],
    stackTable: [
      { capa: 'UI', tecnologia: 'SolidJS + Vite 6 + TS', detalle: 'SkinEngine + signals de notas' },
      { capa: 'Desktop', tecnologia: 'Tauri 2 + Rust', detalle: 'skin.rs, transparent window, opener' },
      { capa: 'Skins', tecnologia: 'TXT plano', detalle: 'Especificación docs/SKIN_SPEC.md (fuente de verdad)' },
      { capa: 'Persistencia', tecnologia: 'localStorage (fase 1)', detalle: 'AppData + hot-reload de skins en roadmap' },
    ],
    dataDiagram: `xenner/skins/
  config.txt → skinPath="webcore"
  glass-default/ (ejemplo = default embebida)
  webcore/ (segunda skin ejemplo)
  <tu-skin>/skin.txt + *.txt`,
    authSecurity: ['Sin auth: app local. Higiene anti-inyección en parser TXT.', 'Riesgo documentado: transparent:true + Nvidia en Linux puede fallar (issue Tauri #14924) con conmutador previsto.'],
    frontend: {
      routes: ['Desktop de notas (lista + editor + selector de skin)'],
      notes: ['Componentes 100% var-driven; cambiar tema no toca código.', 'Flujo de desarrollo: revisar SKIN_SPEC → pnpm build / cargo check → commit en español.'],
    },
    deployment: {
      where: 'Desktop (Tauri bundle) + vite dev para UI',
      how: ['cd xenner && pnpm install && pnpm dev (:1420) para UI', 'cargo check -p xenner_lib en src-tauri para Rust', 'cargo build / tauri build solo cuando se pida (lento)'],
    },
    methodology: ['Spec-first: SKIN_SPEC.md manda sobre el código; si discrepan se corrige código.', 'Verificación con build real antes de dar por terminado un cambio.', 'Commits pequeños tras cada función (xenner: <tarea> — <detalle>).'],
    challenges: [
      { title: 'Skins de usuario que rompen CSS', solution: 'Parser permisivo + default embebida + ignorar claves/valores peligrosos.' },
      { title: 'Blur real vs fake', solution: 'Transparencia Tauri + CSS; backdrop-filter solo blurea DOM, el SO blurea el fondo.' },
    ],
    learnings: ['Diseño de DSL mínimo usable por no-programadores.', 'Ventanas transparentes Tauri y composición del SO.', 'Contratos tolerantes a fallos.'],
    runLocally: ['cd xenner && pnpm install', 'pnpm dev (UI) o pnpm build para verificar', 'Editar xenner/skins/<nombre>/*.txt y recargar; cambiar config.txt para alternar skins'],
    nextSteps: ['Hot-reload de skins sin reinicio.', 'Skins de usuario en AppData.', 'window-vibrancy en Win/Mac + sincronización.'],
  },

  kluk: {
    context: ['API del e-commerce KLUK: catálogo de productos, carrito de compras, favoritos, usuarios con autenticación, reportes agregados y subida de imágenes a Cloudinary. NestJS 10 + TypeORM + PostgreSQL + JWT, con documentación Swagger.'],
    architectureDiagram: `Storefront / clientes ──REST + JWT──▶ KLUK API (NestJS 10)
  auth │ users │ productos │ carrito │ favorites │ reportes │ cloudinary
   ▼
PostgreSQL (TypeORM) + Cloudinary (media)`,
    architectureNotes: ['Módulos por dominio (users, auth, productos, carrito, favorites, reportes, cloudinary) con validación class-validator y Helmet.', 'Subidas con multer + streamifier hacia Cloudinary centralizado en módulo propio.', 'Swagger (@nestjs/swagger) como documentación viva en /api.'],
    stackTable: [
      { capa: 'Framework', tecnologia: 'NestJS 10 + TS', detalle: 'Modular por dominio' },
      { capa: 'BD', tecnologia: 'TypeORM 0.3 + PostgreSQL', detalle: 'Driver pg; synchronize:true solo dev' },
      { capa: 'Auth', tecnologia: 'JWT + bcryptjs', detalle: 'Login + guards' },
      { capa: 'Media', tecnologia: 'Cloudinary + multer', detalle: 'Imágenes de producto vía streamifier' },
      { capa: 'Docs', tecnologia: 'Swagger', detalle: 'OpenAPI en /api' },
    ],
    endpoints: [
      { method: 'CRUD', path: '/productos', description: 'Catálogo de productos', auth: 'JWT (escritura admin)' },
      { method: 'CRUD', path: '/carrito', description: 'Carrito por usuario', auth: 'JWT' },
      { method: 'CRUD', path: '/favorites', description: 'Favoritos por usuario', auth: 'JWT' },
      { method: 'GET', path: '/reportes/*', description: 'Agregados para dashboard', auth: 'JWT admin' },
      { method: 'CRUD', path: '/users · /auth/*', description: 'Usuarios y login', auth: 'Mixto' },
      { method: 'GET', path: '/api', description: 'Documentación Swagger', auth: 'Ninguna' },
    ],
    dataDiagram: `User 1──* Carrito 1──* Item *──1 Producto
User *──* Favoritos ── Producto · Reportes = agregados SQL`,
    deployment: {
      where: 'Render/Railway/VPS + PostgreSQL + Cloudinary',
      how: ['npm install && npm run build && npm run start:prod', 'Env: DB_HOST/PORT/USER/PASS/NAME, SSL, JWT_SECRET, CLOUDINARY_*'],
    },
    methodology: ['Dominio e-commerce clásico para practicar NestJS a fondo.', 'Swagger como documentación viva.'],
    challenges: [{ title: 'Consistencia carrito-stock', solution: 'Transacciones TypeORM en checkout.' }],
    learnings: ['NestJS modular, guards y uploads a Cloudinary.', 'Reportes agregados para dashboards.'],
    runLocally: ['git clone https://github.com/xenoxf/kluk && npm install', 'Configurar .env (DB_*, SSL, JWT_SECRET, CLOUDINARY_*) y npm run start:dev'],
    nextSteps: ['Pagos (Stripe/MercadoPago).', 'Migraciones versionadas y tests e2e.'],
  },

}
