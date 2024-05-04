const React = require('react')
const { Google, Discord, List, X} = require('./UI/icons.jsx')
const { useState, useEffect, useRef } = require('react')
const Modal = require('./UI/modal.jsx')
const Boton = require('./UI/Boton.jsx')


function SubMenu({reff}){
    return(
    <div className='MenuMovil'>
        <div className='Submenu' ref={reff}>
             <h1><span>Lyria</span>Studio</h1>
        </div>
    </div>)
}

function NavBar({user}){

    const [ menu, setMenu ] = useState(false)
    const [ menu2, setMenu2 ] = useState(false)
    const [ modalLogin, setModalLogin ] = useState(false)
    const menuRef = useRef(null);
    const menuRef2 = useRef(null);
    const menuRefOpen2 = useRef(null);
    const menuRefopen = useRef(null);

    function OpenLogin(){
        setModalLogin(true)
    }

    useEffect(() => {
        function handleClickOutside(event) {
          if (menuRef.current && !menuRef.current.contains(event.target) && menuRefopen.current && !menuRefopen.current.contains(event.target)) {
            setMenu(false)
          }
          if (menuRef2.current && !menuRef2.current.contains(event.target) && menuRefOpen2.current && !menuRefOpen2.current.contains(event.target)) {
            setMenu2(false)
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    function Open(){
        if(menu){ setMenu(false) } else { setMenu(true) }
    }
    function Open2(){
        if(menu2){ setMenu2(false) } else { setMenu2(true) }
    }

    return(
        <>
            <header id='navbaruwu'>
                {menu2 && (
                    <SubMenu reff={menuRef2}/>
                )}
                <nav className='navbar'>
                    <div className='logo'>
                        <List event={Open2} reff={menuRefOpen2}/>
                        <img src="/img/icon.png" alt="Lyria" />
                        <h1><span>Lyria</span>Studio</h1>
                    </div>
                    <div className='opcciones'>
                        <ul>
                            <li><a>Inicio</a></li>
                            <li><a>Proyectos</a></li>
                            <li><a>Contacto</a></li>
                        </ul>
                    </div>
                    <div className='panel'>
                    {user ? (
                        <>
                        <div className='logito'>
                            <img onClick={Open} ref={menuRefopen} src={user.avatar} alt="" />
                        </div>
                        {menu && (
                            <div className='menu' ref={menuRef}>
                            <ul>
                                <li><a>Perfil</a></li>
                                <li><a>Configuración</a></li>
                                <li><a href='/logout' className='red'>Cerrar sesión</a></li>
                            </ul>
                        </div>
                        )}
                        </>
                    ) : (
                        <>
                        
                        <Boton event={OpenLogin} stylos="login">Login</Boton>
                        {modalLogin && (
                            <Modal info="Regístrate o inicia sesión utilizando Discord o Google" cerrar={setModalLogin}>
                                <div className='LoginModalA'>
                                    <div className='titulo'>
                                        <h2>Registro/ingreso</h2>
                                    </div>
                                    <div className='buttons'>
                                        <a href="auth/discord" className='discord'> <Discord/> Discord</a>
                                        <span>
                                            <span></span>
                                            <h6>O</h6>
                                            <span></span>
                                        </span>
                                        <a href="/auth/google" className='google'> <Google/> Google</a>
                                    </div>
                                </div>
                            </Modal>
                        )}
                        </>
                    )}
                    </div>
                </nav>
            </header>     
        </>
    )
}

module.exports = NavBar