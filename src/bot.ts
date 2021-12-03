import dotenv from 'dotenv';
import Discord, { Intents, Guild, MessageEmbed } from 'discord.js';
import gamedig, { QueryOptions, QueryResult } from 'gamedig';

dotenv.config();

const client = new Discord.Client({
	intents: [
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILDS,
	],
});

// Login to Discord API
await client.login(process.env.token);
console.log('Bot started');

// Check if we've already registered the command
let commands = await client?.application?.commands?.fetch();
if (commands?.filter((c) => c.name === 'players').size === 0) {
	// Register the command
	await client.application?.commands.create({
		name: 'players',
		description: 'Displays the number of players on the server.',
	});
	console.log('Command created!');
} else {
	let command: any = await commands?.filter((c) => c.name === 'players').first();
	console.log(`Command \`/player\` already exists with id: ${command.id}`);
}

// Fetch the guilds we're in
let guilds: Discord.Collection<string, Discord.OAuth2Guild> = await client.guilds.fetch();

// Loop through each guild and check if we've already registered the role
guilds.forEach(async (guild: Discord.OAuth2Guild | Guild) => {
	guild = await guild.fetch();
	let roles: Discord.Collection<string, Discord.Role> = await guild.roles.fetch();
	let role = roles.find((r) => r.name === 'Playing Minecraft');
	if (!!role) {
		console.log(`Role \`Playing Minecraft\` already exists with id: ${role.id}`);
	} else {
		// Create the role
		role = await guild.roles.create({ name: 'Playing Minecraft' });
		console.log(`Role \`Playing Minecraft\` created with id: ${role.id}`);
	}
});

client.on('interactionCreate', async (interaction) => {
	console.log(`Interaction created: ${interaction.id}`);
	if (!interaction.isCommand()) return;
	console.log(`${interaction.member.user.username} ran the command \`/${interaction.command?.name}\``);

	if (interaction.commandName === 'players') {
		let state: gamedig.QueryResult;
		try {
			const gamedigOptions: QueryOptions = { type: 'minecraft', host: String(process.env.ip) };
			state = await gamedig.query(gamedigOptions);
		} catch (error) {
			console.log(error);
			return interaction.reply('Could not connect to the server.');
		}

		if (state.players.length === 0) {
			return interaction.reply('There are no players online.');
		} else {
			let embed: MessageEmbed = await generateEmbed(state);
			return interaction.reply({ embeds: [embed] });
		}
	}
});

client.on('presenceUpdate', async (o, newPresence) => {
	// Get the id for the Playing Minecraft role
	let roles: Discord.Collection<string, Discord.Role> | undefined = await newPresence?.guild?.roles.fetch();
	let role = roles?.find((r) => r.name === 'Playing Minecraft');

	// Check if the user is playing Minecraft
	if (
		newPresence.activities.length === 0 ||
		!newPresence.activities.find((a) => a.type === 'PLAYING') ||
		!newPresence.activities.find((a) => a.name.toLowerCase().includes('minecraft'))
	) {
		if (!!role) newPresence?.member?.roles.remove(role.id);
	} else {
		if (!!role) newPresence?.member?.roles.add(role.id);
	}
});

// Update our presence when the bot first starts
updatePresence();

// Loop once every minute
setInterval(updatePresence, Number(process.env.delay) || 30000);

// Update the presence of the bot
async function updatePresence() {
	let state: gamedig.QueryResult;
	const gamedigOptions: QueryOptions = { type: 'minecraft', host: String(process.env.ip) };
	state = await gamedig.query(gamedigOptions);

	client.user?.setPresence({
		activities: [
			{
				name: `${state.players.length} / ${state.maxplayers} online`,
				type: 'WATCHING',
			},
		],
	});
}

// Generate an embed with the player list
async function generateEmbed(state: QueryResult) {
	let playerNames: gamedig.Player[] = state.players;
	let players = [];
	for (let i = 0; i < playerNames.length; i++) {
		if (playerNames[i].name) {
			players.push(playerNames[i].name);
		}
	}
	let playerText = '';
	for (let i = 0; i < players.length; i++) {
		if (playerText === '') {
			playerText = '• ' + players[i];
		} else {
			playerText = playerText + '\n • ' + players[i];
		}
	}

	const embed = new MessageEmbed();
	embed.setColor('#5cb85c');
	embed.setTitle('mc.compatibilityissues.com');
	embed.setURL('https://map.compatibilityissues.com');
	embed.setDescription(playerText);
	embed.setFooter(`Who's playing?`);
	embed.setTimestamp(new Date());
	embed.setAuthor(
		`Online Players ${state.players.length} / ${state.maxplayers}`,
		String(`https://cdn.discordapp.com/avatars/${client?.user?.id}/${client?.user?.avatar}.png`),
	);
	return embed;
}
