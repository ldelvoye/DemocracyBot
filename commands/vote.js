import { SlashCommandBuilder } from 'discord.js'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Adds a vote to the user of your choice.')
        .addUserOption( option =>
            option
                .setName('user')
                .setDescription('The user you want to vote for')
                .setRequired(true)),
    async execute(interaction) {

        return interaction.reply('Hello')
    }
}