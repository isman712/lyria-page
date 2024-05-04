function cuerpo(htmlString, props){
    return `
    <html>
        <head>
            <link rel="stylesheet" href="/css/style.css"/>
            <link rel="stylesheet" href="/css/UI.css"/>
            <link rel="stylesheet" href="/css/Navbar.css"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <title>${props.props.title}</title>
            <link rel="icon" href="/img/favicon.ico" type="image/x-icon"/>
        </head>
        <body>
            <div id="root">${htmlString}</div>
        </body>
            <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
            <script id="variablesuwu">
                    window.__SERVER_PROPS__ = ${JSON.stringify(props)};
                </script>
            <script src='/js/client.js'></script>
    </html>`
}

module.exports = { cuerpo }