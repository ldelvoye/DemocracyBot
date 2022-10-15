const { Client, Collection, GatewayIntentBits } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')
const {token} = require('./config.json')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages
    ]
})

// client.commands = new Collection()
// const commandsPath = path.join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));

// for (const file of commandFiles) {
//     const filePath = path.join(commandsPath, file);
//         const command = require(filePath)
//         client.commands.set(command.data.name, command)
// }

// Commands reply/functionality
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});
//

client.on('ready', () => {
    console.log(`Logged in as user ${client.user?.username}`)
})

client.login(token)