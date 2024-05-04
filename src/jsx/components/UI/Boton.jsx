const React = require('react')

function Boton({url, event, stylos, children }){
    if(!stylos){
        stylos = ""
    }
    return(
        <a onClick={event} href={url} className={'btn ' + stylos} >{children}</a>
    )
}

module.exports = Boton