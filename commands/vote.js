const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  updateVotes,
  updateLeaderboard,
  getCurrentLeader,
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

    const message = new EmbedBuilder()
      if (votee.bot === true) {
        message.setTitle("Error")
        message.setDescription(`You cannot vote for a bot`)
        message.setColor(0x7CFC00)
      } else {
        message.setTitle("You just cast your vote")
        message.setDescription(`${voter} voted for ${votee}`)
        message.setColor(0x00ff00)
        updateVotes(voterId, voteeId);
      }

    await interaction.reply({ embeds: [message] })

    const currentLeader = await getCurrentLeader();
    console.log('Current leader', currentLeader)
    const newLeader = await updateLeaderboard();
    console.log('New leader?', newLeader)
    if (newLeader !== 0) {
      const leaderChange = new EmbedBuilder()
        .setTitle("New Leader!")
        .setDescription(`Congratulations, <@${newLeader}>, you are the new leader!`)
        .setColor(0x7DF9FF)
      
      await interaction.followUp({ embeds: [leaderChange]})
    }
  },
};
