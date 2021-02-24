const initializeDiscordConfig = () => {
    const dotenv = require('dotenv');
    const path = require('path');
    dotenv.config({ path: require('find-config')('../.env') });
    console.log(require('dotenv').config({ path: path.join(__dirname, '../.env') }))

    if (process.env.token === undefined) {
        console.error("Token is not set correctly!")
    }
    if (process.env.prefix === undefined) {
        console.error("Prefix is not set correctly!")
    }
    const cfg = {
        discord: {
            token: process.env.token,
            prefix: process.env.prefix
        }
    }
    return cfg
}

module.exports.initializeDiscordConfig = initializeDiscordConfig;

