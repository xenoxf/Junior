import React from 'react'
import '../styles/nav.css'
import { MenuIcon } from 'lucide-react'

export default function Menu() {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
        <div className="burguer">
            <button onClick={toggleMenu} className="burguer-boton">
            <MenuIcon color="black" size={34} /> 
        </button>
        { isOpen && (
            <div className="menu">
                <a className="nav-link" href="#inicio" onClick={toggleMenu}>Inicio</a>
                <a className="nav-link" href="#proyectos" onClick={toggleMenu}>Proyectos</a>
                <a className="nav-link" href="#habilidades" onClick={toggleMenu}>Habilidades</a>
                <a className="nav-link" href="#contacto" onClick={toggleMenu}>Contacto</a>
            </div>
        )}
        </div>
        
        </>
    )
}