// Dependencies
const Discord = require('discord.js');
const client = new Discord.Client();
const gamedig = require('gamedig');

// Main update
const update = () => {
    gamedig.query({
        type: 'minecraft',
        host: process.env.ip
    }).then((state) => {
        setActivity(state.players.length + ' of ' + state.maxplayers);
    }).catch(() => {
        setActivity('Server is offline');
    });
};

const setActivity = ((status) => {
    client.user.setActivity(status, {type: 'PLAYING'})
        .catch((error) => {
            console.error(error);
        });
});

// Set the refresh refresh rate for the bot's status
client.on('ready', () => {
    client.setInterval(update, process.env.delay);
});

// Login to discord api
client.login(process.env.token);
