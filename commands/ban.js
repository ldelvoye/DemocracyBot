const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const pollEmbed = require('discord.js-poll-embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Begins a ban vote')
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("choose the banvote target")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    message = pollEmbed("test_msg", "test_title", "test_options", 300)
    await interaction.reply({ embeds: [message] });
  }    
}