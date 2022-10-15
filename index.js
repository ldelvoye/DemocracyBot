import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
require('./config.json').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages
    ]
})

client.commands = new Collection()
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endswith('js'));

for (const file of commandFiles) {
    const filePath = join(commandsPath, file):;
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

client.login(token)