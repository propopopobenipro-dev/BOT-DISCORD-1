const { EmbedBuilder } = require("discord.js");
const config = require("../config/settings.json");

module.exports = async (member) => {

  // 👤 AUTO-ROL MIEMBRO
  const role = member.guild.roles.cache.get(config.memberRoleId);
  if (role) {
    member.roles.add(role).catch(() => {});
  }

  const channel =
    member.guild.channels.cache.find(
      c => c.name === "🛬│bienvenida"
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

  channel.send({ embeds: [embed] });
};