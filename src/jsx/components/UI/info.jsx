const React = require('react')

function Info({ text, children }){
    return(
        <span className='info'>{children}</span>
    )
}

module.exports = Info