const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  updateVotes,
  updateLeaderboard,
} = require("../database/bot_db_operations");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Cast or change your vote!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Who you are voting for")
        .setRequired(true)
    ),

  async execute(interaction) {
    const voter = interaction.user;
    const voterId = voter.id;
    const votee = interaction.options.getUser("user");
    const voteeId = votee.id;

    updateVotes(voterId, voteeId);
    updateLeaderboard();

    const message = new EmbedBuilder()
      .setTitle("You just cast your vote")
      .setColor(0x00ff00);
      if (votee.bot === true) {
        message.setDescription(`**Error!** You cannot vote for a bot`)
      } else {message.setDescription(`${voter} voted for ${votee}`)}

    await interaction.reply({ embeds: [message] });
  },
};
