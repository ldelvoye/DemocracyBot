const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Command lists & what they do'),
  
  async execute(interaction) {
    const message = new EmbedBuilder()
      .setTitle('Help - Commands')
      .setColor(0x89CFF0)
      .addFields(
        {name: `/vote`, value: `Vote for the server's leader`},
        {name: `/leader`, value: `Various information about the server`},
        {name: `/help`, value: `Show the help menu`},
        {name: `\u200B`, value: '-- Leader-only commands --'},
        {name: `/banvote`, value: `Begin a ban vote, the peasants will get 24 hours to vote`}
      )
  
      await interaction.reply({embeds:[message]})
  }
}