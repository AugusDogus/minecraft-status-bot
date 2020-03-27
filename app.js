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

client.on('ready', () => {
    // Set the refresh refresh rate for the bot's status
    client.setInterval(update, process.env.delay || 30000);
    // If we're added to the server, check if the roll exists.
    let guild = client.guilds.get('546494699997888542');
    if (guild) {
        if (!guild.roles.find(role => role.name === "Playing Minecraft")) {
            // Add the roll to the server.
            guild.createRole({
                hoist: true,
                name: 'Playing Minecraft',
            }).then(role => {
                process.env.roleID = role.id;
            }).catch(error => {
                if (error == 'DiscordAPIError: Missing Permissions') {
                    console.error('Please give the bot Administrator privileges and restart.');
                }
            });
        } else {
            process.env.roleID = guild.roles.find(role => role.name === 'Playing Minecraft').id;
        }
    } else {
        console.error('Please add the bot to your server and restart.');
    }
    // Update everyone's role status from while the bot was starting/restarting.
    guild.members.forEach((member) => {
        // Check if they are playing a game
        if (member.presence.game) {
            // Check if the game is Minecraft
            if (member.presence.game.name === 'Minecraft') {
                // Give them the Playing Minecraft role
                member.addRole(process.env.roleID);
            }
        } else {
            member.removeRole(process.env.roleID);
        }
    });
});

// Check status
client.on('presenceUpdate', (old, member) => {
    // Check if they started playing a game
    if (member.presence.game) {
        // Check if the game is Minecraft
        if (member.presence.game.name === 'Minecraft') {
            // Give them the Playing Minecraft role
            member.addRole(process.env.roleID);
        }
    }
    // Check if they stopped playing a game
    if (old.presence.game) {
        // Check if the game was Minecraft Legends
        if (old.presence.game.name === 'Minecraft') {
            // Make sure they're not still playing Minecraft Legends
            if (member.presence.game) {
                if (member.presence.game.name !== 'Minecraft') {
                    member.removeRole(process.env.roleID);
                }
            } else {
                member.removeRole(process.env.roleID);
            }
        }
    }
});

// Login to discord api
client.login(process.env.token);
