const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('banvote')
    .setDescription('Begins a ban vote')
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("choose the banvote target")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const banned = interaction.options.getUser("user")
    const bannedId = banned.id
    const message = new EmbedBuilder()
      .setTitle(`A new banvote has been initiated`)
      .setDescription(`Vote now to decide on ${banned}'s fate`)
      .setColor(0xFF0000)
      .addFields(
        {name: `✅ to spare them`, value: '\u200B', inline:true},
        {name: `❌ to ban them`, value: `\u200B`, inline:true}
      )

    const output = await interaction.reply({ embeds: [message], fetchReply:true })
    output.react('✅')
    output.react('❌')
  }    
}