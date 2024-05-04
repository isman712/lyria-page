const React = require('react')
const { X, Info } = require('./icons.jsx')
const { useState, useEffect, useRef } = require('react')
const Toogle = require('./info.jsx')

function Modal({title, info, cerrar, children}){
    const [ sinfo, setSinfo] = useState(false)

    function Clos(){
        cerrar(false)
    }
    function infoOpen(){
        setSinfo(true)
    }
    function InfoCloset(){
        setSinfo(false)
    }

    const menuRefopen2 = useRef(null);
    
    useEffect(() => {
        function handleClickOutside2(event) {
          if (menuRefopen2.current && !menuRefopen2.current.contains(event.target)) {
            Clos()
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside2);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside2);
        };
      }, []);



    return(
        <div className='Modal'>
            <div className='Mod' ref={menuRefopen2}>
                <div className='Title'>
                    <div className='titulo'>
                        <h3>{title}</h3>
                    </div>
                    <div className='opcciones'>
                        {sinfo && (
                            <Toogle>{info}</Toogle>
                        )}
                        <Info event2={infoOpen} event3={InfoCloset}></Info>
                        <X event={Clos}></X>
                    </div>
                </div>
                <div className='Cuerpo'>{children}</div>
            </div>
        </div>
    )
}

module.exports = Modal