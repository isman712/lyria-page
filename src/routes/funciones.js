const db = require("../database/db.js");


function GetUserEmail(correo) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM usuarios WHERE correo = ?", [correo], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

module.exports = { GetUserEmail }