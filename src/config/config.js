require('dotenv').config()

const config = {
    APP_NAME: process.env.APP_NAME,
    PORT: process.env.PORT,
    GOOGLE_AUTH_ID: process.env.GOOGLE_AUTH_ID,
    GOOGLE_AUTH_SECRET: process.env.GOOGLE_AUTH_SECRET,
    URL: process.env.URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
}

module.exports = config