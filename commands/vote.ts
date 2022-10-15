const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Adds a vote to the user of your choice.')
        .addUserOption( option: any =>
            option
                .setName('user')
                .setDescription('The user you want to vote for')
<<<<<<< HEAD
                .setRequired(true)
            ),
    async execute(interaction: any) {
        
        return interaction.reply('')
=======
                .setRequired(true)),
    async execute(interaction: any) {

        return interaction.reply('Hello')
>>>>>>> 9529f5a7c5a840aa64f5e968dad79b67f127b204
    }
}