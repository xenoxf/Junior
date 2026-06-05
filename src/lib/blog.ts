export type BlogPost = {
  slug: string
  title: string
  description: string
  content: string
  contentHtml: string
  date: string
  tags: string[]
  author: string
}

function mdToHtml(md: string): string {
  return md
    .split('\n')
    .map((line) => {
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`
      if (line.startsWith('```')) return '<pre><code>'
      if (line === '```') return '</code></pre>'
      if (line.startsWith('- **')) {
        const m = line.match(/- \*\*(.+?)\*\*(.*)/)
        if (m) return `<li><strong>${m[1]}</strong>${m[2]}</li>`
      }
      if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`
      if (line.trim() === '') return '<br/>'
      if (/^\d+\. /.test(line)) return `<li>${line.replace(/^\d+\. /, '')}</li>`
      return `<p>${line}</p>`
    })
    .join('\n')
}

const post1 = `Soy Jesus Adrian Camacho Casierra, tambien conocido como Junior Adrian o Adrian Camacho, y soy un desarrollador full stack de Cali, Colombia. Empece a programar cuando tenia 13 anos, y hoy con 15 anos ya tengo 7+ proyectos en produccion.

## Como empece?

Todo comenzo con la curiosidad. Veia videos de tecnologia y me preguntaba como se hacian las paginas web. Un dia decidi buscar "como hacer una pagina web" y termine aprendiendo HTML y CSS. Al principio era frustrante, pero cada pequeno logro me motivaba a seguir.

## Mi stack actual

Hoy trabajo principalmente con JavaScript y TypeScript. Mi stack incluye:

- **React** para interfaces de usuario
- **Node.js y NestJS** para APIs
- **PostgreSQL** para bases de datos
- **Astro** para sitios estaticos como este portafolio
- **Tauri** para aplicaciones de escritorio

## Consejos para otros jovenes programadores

1. **No te compares** - Cada persona tiene su propio ritmo de aprendizaje
2. **Construye proyectos** - La teoria es importante, pero construir proyectos es lo que realmente ensena
3. **Comparte tu trabajo** - Sube tu codigo a GitHub y muestra lo que haces
4. **Se constante** - 30 minutos al dia es mejor que 5 horas una vez a la semana

Si yo pude aprender a mi edad, tu tambien puedes. Lo importante es la curiosidad y las ganas de crear.`

const post2 = `Las APIs REST son el corazon de cualquier aplicacion moderna. En esta guia, Jesus Adrian Camacho Casierra (Adrian Camacho) te muestra como construir APIs profesionales usando NestJS y TypeScript.

## Por que NestJS?

NestJS es un framework progresivo para Node.js que usa TypeScript por defecto. Su arquitectura modular lo hace perfecto para proyectos escalables.

## Configuracion inicial

\`\`\`bash
npm i -g @nestjs/cli
nest new mi-api
cd mi-api
\`\`\`

## Estructura de un modulo

NestJS organiza el codigo en modulos, controladores y servicios:

- **Modulos**: Agrupan funcionalidad relacionada
- **Controladores**: Manejan las rutas HTTP
- **Servicios**: Contienen la logica de negocio

## Ejemplo basico

Un controlador simple en NestJS se ve asi:

\`\`\`typescript
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll()
  }

  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.create(dto)
  }
}
\`\`\`

## Conclusion

NestJS + TypeScript es una combinacion poderosa para construir APIs profesionales. Si estas empezando, te recomiendo practicar con proyectos pequenos e ir aumentando la complejidad gradualmente.`

const post3 = `Soy Jesus Adrian Camacho Casierra, un desarrollador full stack colombiano de 15 anos, y en este articulo quiero compartir por que creo que todo programador en Colombia deberia tener un portafolio web.

## Visibilidad profesional

Un portafolio es tu carta de presentacion. Cuando alguien busca "Jesus Adrian Camacho" o "Adrian Camacho Casierra" en Google, lo primero que encuentra es mi portafolio. Eso es exactamente lo que quiero.

## Ventajas de tener un portafolio

1. **Control total** - Muestras exactamente lo que quieres que vean
2. **Demuestras habilidades** - El portafolio en si mismo es una muestra de tu trabajo
3. **Diferenciacion** - Te destacas de otros desarrolladores
4. **Marca personal** - Construyes tu identidad como profesional

## Tecnologias que use

Este portafolio esta construido con:

- **Astro** como generador de sitios estaticos
- **React** para componentes interactivos
- **TypeScript** para type safety
- **CSS Modules** para estilos
- **Desplegado en Vercel**

## Consejo final

No esperes a ser "experto" para crear tu portafolio. Empieza con lo que sabes y ve mejorandolo con el tiempo. Mi portafolio ha tenido varias versiones y seguira evolucionando.`

const post4 = `Cali, Colombia. Una ciudad conocida por la salsa, el clima calido y la amabilidad de su gente. Pero tambien es el lugar donde nacio mi pasion por la programacion.

## Crecimiento en equipo

He construido proyectos como **KLUK API** (un e-commerce API), **Kire** (plataforma educativa con IA), **Sistek Pro** (sitio corporativo) y **Back-OS**. Cada proyecto me ha ensenado algo nuevo.

## Trabajar remoto desde Colombia

Una de las mejores cosas de ser desarrollador es que puedes trabajar desde cualquier lugar. Desde mi casa en Cali, he colaborado en proyectos, aprendido nuevas tecnologias y construido mi portafolio.

## Lo que viene

A mis 15 anos, tengo claro que esto es solo el comienzo. Quiero seguir aprendiendo, construyendo y compartiendo mi conocimiento con otros jovenes colombianos que quieran iniciarse en la programacion.

Si estas leyendo esto y eres de Colombia, recuerda: no importa de donde vengas, lo que importa es a donde quieres llegar.`

export const blogPosts: BlogPost[] = [
  {
    slug: 'como-empezar-en-programacion-a-los-15',
    title: 'Como empece a programar a los 15 anos y construi mi primer proyecto real',
    description: 'Jesus Adrian Camacho Casierra, un desarrollador colombiano de 15 anos, cuenta como comenzo su viaje en la programacion y construyo sus primeros proyectos como desarrollador full stack.',
    date: '2026-01-15',
    tags: ['programacion', 'principiantes', 'JavaScript', 'experiencia'],
    author: 'Jesus Adrian Camacho Casierra',
    content: post1,
    contentHtml: mdToHtml(post1),
  },
  {
    slug: 'guia-apis-rest-con-nestjs-y-typescript',
    title: 'Guia completa para construir APIs REST con NestJS y TypeScript',
    description: 'Aprende a construir APIs REST profesionales usando NestJS y TypeScript. Una guia practica por Jesus Adrian Camacho, desarrollador full stack colombiano.',
    date: '2026-02-20',
    tags: ['NestJS', 'TypeScript', 'APIs', 'backend'],
    author: 'Jesus Adrian Camacho Casierra',
    content: post2,
    contentHtml: mdToHtml(post2),
  },
  {
    slug: 'portafolio-desarrollador-colombiano',
    title: 'Por que todo desarrollador colombiano deberia tener un portafolio web',
    description: 'Jesus Adrian Camacho (Junior Adrian) explica por que es importante tener un portafolio como desarrollador web en Colombia y como el suyo le ha abierto puertas.',
    date: '2026-03-10',
    tags: ['portafolio', 'carrera', 'Colombia', 'desarrollo web'],
    author: 'Jesus Adrian Camacho Casierra',
    content: post3,
    contentHtml: mdToHtml(post3),
  },
  {
    slug: 'de-cali-para-el-mundo',
    title: 'De Cali, Colombia, para el mundo: mi historia como desarrollador full stack',
    description: 'Jesus Adrian Camacho Casierra (tambien conocido como Adrian Casierra) comparte su historia como joven programador de Cali, Colombia, construyendo software para el mundo.',
    date: '2026-04-05',
    tags: ['Cali', 'Colombia', 'historia', 'inspiracion'],
    author: 'Jesus Adrian Camacho Casierra',
    content: post4,
    contentHtml: mdToHtml(post4),
  },
]
