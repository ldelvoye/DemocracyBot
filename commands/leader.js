const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  getCurrentLeader,
  getCurrentVote,
} = require("../database/bot_db_operations");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Command lists & what they do"),

  async execute(interaction) {
    const leader = getCurrentLeader();
    const currentVote = getCurrentVote();

    const message = new EmbedBuilder()
      .setTitle("Help - Commands")
      .setColor(0x89cff0)
      .addFields({ name: `/vote`, value: `Vote for the server's leader` });

    await interaction.reply({ embeds: [message] });
  },
};
