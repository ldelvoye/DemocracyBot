const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  getCurrentLeader,
  getUserInformation,
} = require("../database/bot_db_operations");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leader")
    .setDescription("Various information about the server"),

  async execute(interaction) {
    const leader = await getCurrentLeader();
    console.log(leader)
    const leaderInfo = await getUserInformation(leader);

    const author = interaction.user;
    const authorId = author.id;
    const authorInfo = await getUserInformation(authorId);

    const message = new EmbedBuilder()
      .setTitle("Current information about the server")
      .setColor(0xf4c2c2);
    if (leader === 0) {
      message.addFields({
        name: `Leader`,
        value: `There is currently no leader. Quick, vote for someone to change that!`,
      });
    } else {
      message.addFields({
        name: `Leader`,
        value: `The current leader is <@${leader}> with ${leaderInfo.votes} votes`,
      });
    }
    message.addFields({
      name: `Your information`,
      value: `You currently have ${authorInfo.votes} votes. You've voted for <@${authorInfo.candidateID}>`,
    });

    await interaction.reply({ embeds: [message] });
  },
};
