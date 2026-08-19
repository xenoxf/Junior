
import { info } from '../../lib/info'
import '../../styles/nav.css'
import Menu from '../menu-amburguesa'

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#inicio" className="nav-brand">
          {info.name}
        </a>
        <nav className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#habilidades">Habilidades</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <Menu />
      </div>
    </header>
  )
}
