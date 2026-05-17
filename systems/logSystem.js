const config = require('../config/settings.json');

module.exports = (client) => {

  const getLogChannel = (guild) =>
    guild.channels.cache.find(c =>
      c.name === config.logChannelName
    );

  // 🗑️ mensaje eliminado
  client.on('messageDelete', async (message) => {

    if (!message.guild) return;
    if (!message.author) return;

    const log = getLogChannel(message.guild);
    if (!log) return;

    log.send(`🗑️ Mensaje borrado de ${message.author.tag}: ${message.content || 'sin texto'}`);
  });

  // 👤 entrada
  client.on('guildMemberAdd', async (member) => {

    const log = getLogChannel(member.guild);
    if (!log) return;

    log.send(`📥 Entró: ${member.user.tag}`);
  });

  // 👋 salida
  client.on('guildMemberRemove', async (member) => {

    const log = getLogChannel(member.guild);
    if (!log) return;

    log.send(`📤 Salió: ${member.user.tag}`);
  });
};