const {
  EmbedBuilder
} = require("discord.js");

const config =
  require("../config/settings.json");

module.exports = async (member) => {

  const serverConfig =
    config.servers[member.guild.id];

  if (!serverConfig) return;

  const channel =
    member.guild.channels.cache.find(
      c => c.name ===
      serverConfig.goodbyeChannel
    );

  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle("💀 Un jugador salió")
    .setDescription(
      `${member.user.tag} abandonó el servidor`
    )
    .setColor("Red")
    .setThumbnail(
      member.user.displayAvatarURL()
    );

  channel.send({
    embeds: [embed]
  });
};
