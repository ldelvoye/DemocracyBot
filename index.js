const { Client, Collection, GatewayIntentBits } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages
    ]
})

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endswith('js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file):;
        const command = require(filePath)
        client.commands.set(command.data.name, command)
}

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.channel.send('pong')
    }
})

client.on('ready', () => {
    console.log(`Logged in as user ${client.user?.username}`)
})

client.login(process.env.TOKEN)