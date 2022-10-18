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

    const temp = await updateLeaderboard()
    const leaders = Object.values(temp)
    const oldLeaderId = Number(leaders[0])
    const newLeaderId = Number(leaders[1])

    if (newLeaderId !== 0) {
      const leaderChangeMessage = new EmbedBuilder()
        .setTitle("New Leader!")
        .setDescription(`Congratulations, <@${leaders[1]}>, you are the new leader!`)
        .setColor(0x7DF9FF)
      
      const rolePleb = interaction.guild.roles.cache.find(r => r.id === "1031334547591274556")
      const roleLeader = interaction.guild.roles.cache.find(r => r.id === "1031329937287807046")

      if (oldLeaderId !== 0) {
        const oldLeader = await interaction.member.fetch(oldLeaderId)
        oldLeader.roles.add(rolePleb)
        oldLeader.roles.remove(roleLeader)
      }

      const newLeader = await interaction.member.fetch(newLeaderId)
      newLeader.roles.add(roleLeader)
      newLeader.roles.remove(rolePleb)

      await interaction.followUp({ embeds: [leaderChangeMessage]})
    }
  },
};
