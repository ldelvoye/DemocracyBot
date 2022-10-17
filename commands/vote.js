const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { update } = require("sequelize/lib/model");
const {
  updateVotes,
  updateLeaderboad,
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

    /* 
      first check if voter exists in db
        if does, then update voteeID
        go to voteeID and update their count
      if does not exist then
        create new entry in db with voterid, voteeid, vote, and leader=false
        go to voteeID and update count
    */

    updateVotes(voterId, voteeId);
    updateLeaderboad();

    const message = new EmbedBuilder()
      .setTitle("You just cast your vote")
      .setDescription(`${voter} voted for ${votee}`)
      .setColor(0x00ff00);

    await interaction.reply({ embeds: [message] });
  },
};
