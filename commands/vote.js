import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('elect')
        .setDescription('Cast or change your vote!'),
    async execute(interaction) {
        await interaction.reply()
    }
}