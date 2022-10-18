const { removeVoter } = require("../database/bot_db_operations");

module.exports = (client) => {
  client.on("guildMemberRemove", (member) => {
    const channel = member.guild.channels.cache.get("1031325406005055513");
    removeVoter(member.id);
    channel.send(`Goodbye ${member}, their vote has been removed.`);
  });
};
