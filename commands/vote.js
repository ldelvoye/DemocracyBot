const { SlashCommandBuilder, userMention, CommandInteractionOptionResolver } = require('discord.js');

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

        const voter = interaction.user
        const voterId = voter.id
        const votee = interaction.options.getUser('user')
        const voteeId = votee.id
        await interaction.reply(`${voter} voted for ${votee}`)
    }
}