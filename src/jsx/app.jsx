const React = require('react')
const Inicio = require('./inicio.jsx')
const Navbar = require('./components/NavBar.jsx')
const { useState, useEffect } = require('react')

function App(){
    const [user, setUser] = useState(null);
    let data;

    if (typeof window !== 'undefined') {
        data = window.__SERVER_PROPS__    
        delete window.__SERVER_PROPS__;
        document.getElementById('variablesuwu').innerHTML = ""
       }

    useEffect(() => {
        if (data !== undefined) {
            setUser(data.props.user);
        }
    }, []);

    return(
        <>
            <Navbar user={user}></Navbar>
            <Inicio></Inicio>            
        </>
    )
}

module.exports = App