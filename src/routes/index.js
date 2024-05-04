var express = require('express');
const { APP_NAME } = require('../config/config');
var router = express.Router();
const passport = require('../util/passport.js');
const { GetUserEmail } = require('./funciones.js');
const db = require('../database/db.js');
const { elogs } = require('lyria-logs');

router.get('/', async function(req, res, next) {

  if(req.user){
    const email = req.user.provider === "discord" ? req.user.email : req.user.emails[0].value;
    GetUserEmail(email).then(usuario => {
      res.renderReact('app', {props: { title: APP_NAME, user: usuario}});
    })
  } else {
    res.renderReact('app', {props: { title: APP_NAME, user: undefined}});
  }

});

router.get('/auth/google', passport.authenticate('google'), async (req, res, next) => {
  try {
    const email = req.user.emails[0].value;
    const user = req.user;
    
    const usuario = await GetUserEmail(email);

    if (!usuario) {
      await db.run("INSERT INTO usuarios (id, nombre, correo, avatar, provider) VALUES (?, ?, ?, ?, ?)", [user.id, user.displayName, email, user.photos[0].value, user.provider]);
    } else {
      await db.run("UPDATE usuarios SET nombre = ?, avatar = ?, provider = ? WHERE correo = ?", [user.displayName, user.photos[0].value, user.provider, email]);
    }

    res.redirect('/');
  } catch (error) {
    elogs.error("Error al autenticar con Google:", error);
    res.status(500).send("Error interno del servidor");
  }    
});

router.get("/auth/discord", passport.authenticate("discord"), async (req, res, next) => {
  const user = req.user;
  const avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

  try {
    const usuario = await GetUserEmail(user.email);
    
    if (!usuario) {
      await db.run("INSERT INTO usuarios (id, nombre, correo, avatar, provider) VALUES (?, ?, ?, ?, ?)", [user.id, user.username, user.email, avatar, user.provider]);
    } else {
      await db.run("UPDATE usuarios SET nombre = ?, avatar = ?, provider = ? WHERE correo = ?", [user.username, avatar, user.provider, user.email]);
    }
    
    res.redirect('/');
  } catch (error) {
    elogs.error("Error al autenticar con Discord:", error);
    res.status(500).send("Error interno del servidor");
  } 
});

router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
module.exports = router;
