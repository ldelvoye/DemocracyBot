const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Adds a vote to the user of your choice.')
        .addUserOption( option: any =>
            option
                .setName('user')
                .setDescription('The user you want to vote for')
                .setRequired(true)
            ),
    async execute(interaction: any) {
        
        return interaction.reply('')
    }
}