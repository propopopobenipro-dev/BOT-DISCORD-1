const { EmbedBuilder } = require("discord.js");

module.exports = async (member) => {

  const channel = member.guild.channels.cache.find(
    c => c.name === "🛫│despedidas"
  );

  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle("📉 Un ciudadano ha caído")
    .setDescription(
      `⚔️ ${member.user.tag} ha abandonado ImperiumGeo\n\n.`
    )
    .setColor("Red")
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter({ text: "Sistema de despedidas automático" });

  channel.send({ embeds: [embed] });
};