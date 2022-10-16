module.exports = client => {
    client.on('guildMemberAdd', member => {
        const channel = member.guild.channels.cache.get('1031325406005055513')
        channel.send(`Welcome ${member} to the **Democracy server**! Before anything, cast your vote using /vote. If you need help, use /help.`)
    })
}