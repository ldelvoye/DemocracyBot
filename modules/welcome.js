module.exports = client => {
    client.on('guildMemberAdd', member => {
        console.log(member.id)
        const channel = member.guild.channels.cache.get('1031325406005055513')
        channel.send(`Welcome ${member} to the **Democracy server**! Before anything, cast your vote using /vote. If you need help, use /help.`)

        const role = member.guild.roles.cache.find(r => r.id === "1031334547591274556");
        console.log(member)
        member.roles.add(role)
    })
}