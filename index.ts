import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages
    ]
})

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.channel.send('pong')
    }
})

client.on('ready', () => {
    console.log(`Logged in as user ${client.user?.username}`)
})

client.login(process.env.TOKEN)