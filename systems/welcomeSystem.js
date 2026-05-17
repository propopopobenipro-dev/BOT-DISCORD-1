const {
  EmbedBuilder
} = require("discord.js");

const config =
  require("../config/settings.json");

module.exports = async (member) => {

  const serverConfig =
    config.servers[member.guild.id];

  if (!serverConfig) return;

  // 🎭 autorol
  const role =
    member.guild.roles.cache.get(
      serverConfig.memberRoleId
    );

  if (role) {
    await member.roles.add(role);
  }

  // 👋 canal bienvenida
  const channel =
    member.guild.channels.cache.find(
      c => c.name ===
      serverConfig.welcomeChannel
    );

  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle("👑 Nueva Personita")
    .setDescription(
      `Bienvenido ${member}`
    )
    .setColor("Gold")
    .setThumbnail(
      member.user.displayAvatarURL()
    );

  channel.send({
    embeds: [embed]
  });
};
