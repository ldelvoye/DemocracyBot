const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const {db} = require("../database/database_operations");

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

    const message = new EmbedBuilder()
      .setTitle("You just cast your vote")
      .setDescription(`${voter} voted for ${votee}`)
      .setColor(0x00ff00);

    await interaction.reply({ embeds: [message] });
  },
};
