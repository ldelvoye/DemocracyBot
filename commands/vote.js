const { SlashCommandBuilder, userMention } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Cast or change your vote!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Who you are voting for')
                .setRequired(true)
            ),
    async execute(interaction) {
        await interaction.reply(`${interaction.user} voted for ${interaction.options.getUser('user')}`)
    }
}