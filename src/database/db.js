const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./src/database/usuarios.db');
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS usuarios (id TEXT UNIQUE, nombre TEXT, correo TEXT UNIQUE, avatar TEXT, provider TEXT)");
});

module.exports = db;