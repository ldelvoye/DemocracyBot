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

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.channel.send('pong')
    }
})

client.on('ready', () => {
    console.log(`Logged in as user ${client.user?.username}`)
})

client.login(process.env.TOKEN)