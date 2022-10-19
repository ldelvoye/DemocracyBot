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

    let temp = await updateLeaderboard()
    let leaders = Object.values(temp)
    let oldLeaderId = leaders[0]
    let newLeaderId = leaders[1]

    if (newLeaderId > 0) {
      let rolePleb = interaction.guild.roles.cache.find(r => r.id === "1031334547591274556")
      let roleLeader = interaction.guild.roles.cache.find(r => r.id === "1031329937287807046")

      if (oldLeaderId > 0) {
        let oldLeader = await interaction.guild.members.fetch(oldLeaderId)
        oldLeader.roles.add(rolePleb)
        oldLeader.roles.remove(roleLeader)
      }

      let newLeader = await interaction.guild.members.fetch(newLeaderId)
      newLeader.roles.add(roleLeader)
      newLeader.roles.remove(rolePleb)

      const leaderChangeMessage = new EmbedBuilder()
        .setTitle("New Leader!")
        .setDescription(`Congratulations, ${newLeader}, you are the new leader!`)
        .setColor(0x7DF9FF)

      await interaction.followUp({ embeds: [leaderChangeMessage]})
    }
  },
};
