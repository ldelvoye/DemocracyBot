module.exports = client => {
    client.on('guildMemberRemove', member => {
        const channel = member.guild.channels.cache.get('1031325406005055513')
        channel.send(`Goodbye ${member}, their vote has been removed.`)
    })
}