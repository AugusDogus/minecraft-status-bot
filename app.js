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
        // Count number of players.
        let players = 0;
        for (let i = 0; i < state.players.length; i++) {
            if (state.players[i].id != null) {
                players++;
            }
        }
        setActivity(players + ' of ' + state.maxplayers);
    }).catch(() => {
        setActivity('Server is offline');
    });
};

// Send status to discord
const setActivity = ((status) => {
    client.user.setActivity(status, {type: 'PLAYING'})
        .catch((error) => {
            console.error(error);
        });
});

// Set the refresh refresh rate for the bot's status
client.on('ready', () => {
    client.setInterval(update, process.env.delay || 30000);
});

// Login to discord api
client.login(process.env.token);
