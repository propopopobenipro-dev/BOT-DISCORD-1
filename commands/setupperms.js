const {
  PermissionFlagsBits
} = require("discord.js");

module.exports = {
  name: "setupperms",

  async execute(message) {

    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return message.reply("❌ Necesitas admin.");
    }

    const guild = message.guild;

    // 🔥 mensaje inicio
    const msg = await message.reply(
      "⚙️ Configurando permisos automáticamente..."
    );

    try {

      // =========================
      // 🔒 CONFIGURAR CANALES
      // =========================

      for (const channel of guild.channels.cache.values()) {

        // 👑 STAFF PRIVADO
        if (
          channel.name.includes("staff") ||
          channel.name.includes("log") ||
          channel.name.includes("moderación") ||
          channel.name.includes("reportes")
        ) {

          await channel.permissionOverwrites.edit(
            guild.roles.everyone,
            {
              ViewChannel: false
            }
          );

          console.log(`🔒 Privado: ${channel.name}`);
        }

        // 📢 SOLO LECTURA
        if (
          channel.name.includes("reglas") ||
          channel.name.includes("anuncios") ||
          channel.name.includes("información")
        ) {

          await channel.permissionOverwrites.edit(
            guild.roles.everyone,
            {
              SendMessages: false
            }
          );

          console.log(`📢 Solo lectura: ${channel.name}`);
        }

        // 🎫 TICKETS
        if (channel.name.includes("tickets")) {

          await channel.permissionOverwrites.edit(
            guild.roles.everyone,
            {
              ViewChannel: true
            }
          );

          console.log(`🎫 Tickets configurado`);
        }
      }

      // ✅ terminó
      await msg.edit(
        "🔥 Permisos configurados correctamente."
      );

    } catch (err) {

      console.error(err);

      // ❌ error
      await msg.edit(
        "❌ No pude configurar algunos permisos. Revisá consola."
      );
    }
  }
};
