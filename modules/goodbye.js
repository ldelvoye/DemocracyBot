const { removeVoter, updateLeaderboard} = require("../database/bot_db_operations");

module.exports = (client) => {
  client.on("guildMemberRemove", (member) => {
    const channel = member.guild.channels.cache.get("1031325406005055513");
    removeVoter(member.id);
    channel.send(`Goodbye ${member}, their vote has been removed.`);

//     let temp = await updateLeaderboard()
//     let leaders = Object.values(temp)
//     let oldLeaderId = leaders[0]
//     let newLeaderId = leaders[1]

//     if (newLeaderId > 0) {
//         let rolePleb = member.guild.roles.cache.find(r => r.id === "1031334547591274556")
//         let roleLeader = member.guild.roles.cache.find(r => r.id === "1031329937287807046")
  
//         if (oldLeaderId > 0) {
//           let oldLeader = await member.guild.members.fetch(oldLeaderId)
//           oldLeader.roles.add(rolePleb)
//           oldLeader.roles.remove(roleLeader)
//         }
  
//         let newLeader = await member.guild.members.fetch(newLeaderId)
//         newLeader.roles.add(roleLeader)
//         newLeader.roles.remove(rolePleb)
  
//         const leaderChangeMessage = new EmbedBuilder()
//           .setTitle("New Leader!")
//           .setDescription(`Congratulations, ${newLeader}, you are the new leader!`)
//           .setColor(0x7DF9FF)
  
//         member.send({ embeds: [leaderChangeMessage]})
//       }
  });
};
