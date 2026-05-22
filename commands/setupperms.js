const {
  PermissionFlagsBits
} = require("discord.js");

module.exports = {
  name: "setupperms",

  async execute(message, args) {

    // 🔒 admin only
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return message.reply("❌ Necesitas admin.");
    }

    const guild = message.guild;

    // ⚙️ mensaje inicio
    const statusMsg = await message.reply(
      "⚙️ Configurando permisos..."
    );

    try {

      for (const channel of guild.channels.cache.values()) {

        // =========================
        // 🔒 STAFF PRIVADO
        // =========================
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
        }

        // =========================
        // 📢 SOLO LECTURA
        // =========================
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
        }

        // =========================
        // 🎫 TICKETS
        // =========================
        if (channel.name.includes("tickets")) {

          await channel.permissionOverwrites.edit(
            guild.roles.everyone,
            {
              ViewChannel: true
            }
          );
        }

      }

      // ✅ terminado
      await statusMsg.edit(
        "🔥 Permisos configurados correctamente."
      );

    } catch (err) {

      console.error(err);

      // ❌ error
      await statusMsg.edit(
        "❌ Error configurando permisos."
      );
    }
  }
};
