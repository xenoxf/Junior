import type { Service } from '../types'

export const services: Service[] = [
  {
    title: 'Desarrollo Web Full Stack',
    description: 'Aplicaciones web completas con React, Next.js o Astro en frontend y Node.js/NestJS en backend. Bases de datos PostgreSQL, autenticación y despliegue.',
    icon: '🌐',
    features: ['SPA y SSR con React/Next.js', 'APIs REST con NestJS/Express', 'Bases de datos PostgreSQL', 'Autenticación JWT + OAuth', 'Deploy en Vercel/Render'],
  },
  {
    title: 'APIs y Backend',
    description: 'APIs robustas y escalables con Node.js, NestJS o Express. Arquitectura limpia, documentación Swagger y buenas prácticas.',
    icon: '⚙️',
    features: ['APIs REST documentadas', 'Autenticación y autorización', 'Rate limiting y seguridad', 'Integración con servicios cloud', 'WebSockets y tiempo real'],
  },
  {
    title: 'Aplicaciones de Escritorio',
    description: 'Apps de escritorio modernas con Tauri 2 + React. Rendimiento nativo con interfaz web. Perfecto para herramientas internas y dashboards.',
    icon: '🖥️',
    features: ['Tauri 2 + React', 'Interfaz nativa moderna', 'Actualizaciones automáticas', 'Multiplataforma', 'Bajo consumo de recursos'],
  },
  {
    title: 'Automatización y Scripts',
    description: 'Herramientas CLI, scripts de automatización y procesamiento de datos. Desde parsers hasta sistemas complejos en Node.js y Java.',
    icon: '🤖',
    features: ['CLI tools en Node.js/Java', 'Procesamiento de datos', 'Scraping y automatización', 'Integración de APIs externas', 'Sistemas de cola y jobs'],
  },
]
