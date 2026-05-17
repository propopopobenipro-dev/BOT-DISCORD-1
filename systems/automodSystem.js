const config = require('../config/automod.json');

const cooldown = new Map();

module.exports = (client) => {

  client.on('messageCreate', async (message) => {

    if (!message.guild) return;
    if (message.author.bot) return;

    const now = Date.now();
    const id = message.author.id;

    if (cooldown.has(id)) {
      if (now - cooldown.get(id) < config.spamCooldownMs) return;
    }

    cooldown.set(id, now);

    const content = message.content.toLowerCase();

    // LINKS
    if (config.bannedLinks.some(w => content.includes(w))) {

      if (message.member.permissions.has('Administrator')) return;

      await message.delete().catch(() => {});
      return message.channel.send(`🚫 ${message.author} links no permitidos`);
    }

    // CAPS
    if (
      message.content.length > 10 &&
      message.content === message.content.toUpperCase()
    ) {

      await message.delete().catch(() => {});
      return message.channel.send(`⚠️ ${message.author} no uses mayúsculas`);
    }
  });
};