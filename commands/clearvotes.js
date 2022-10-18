const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { resetLeaderboard } = require("../database/bot_db_operations");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearvotes')
    .setDescription('Clears the leaderboard -admin command'),
  
  async execute(interaction) {
    console.log('resetting leaderboard')
    await resetLeaderboard();

    const message = new EmbedBuilder()
      .setTitle('Leaderboard successfully reset')
      .setColor(0xA020F0)
    
    await interaction.reply({ embeds: [message] })
  }
}