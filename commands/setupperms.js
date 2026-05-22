const {
  PermissionFlagsBits
} = require("discord.js");

// 📂 cargar template
const channelsData = require("../template/channels.json");

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
      "⚙️ Configurando permisos automáticamente..."
    );

    try {

      const template = channelsData["ImperiumHub"];

      if (!template) {
        return statusMsg.edit(
          "❌ No encontré la plantilla ImperiumHub."
        );
      }

      // 🔥 recorrer categorías
      for (const [categoryName, channels] of Object.entries(template)) {

        // 🔥 recorrer canales
        for (const channelName of channels) {

          // buscar canal
          const channel = guild.channels.cache.find(
            c => c.name === channelName
          );

          // ⚠️ no existe
          if (!channel) {
            console.log(`⚠️ No existe: ${channelName}`);
            continue;
          }

          // =========================
          // 🔒 STAFF PRIVADO
          // =========================
          if (
            categoryName.includes("STAFF")
          ) {

            await channel.permissionOverwrites.edit(
              guild.roles.everyone,
              {
                ViewChannel: false
              }
            );

            console.log(`🔒 Privado: ${channel.name}`);
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

            console.log(`📢 Solo lectura: ${channel.name}`);
          }

          // =========================
          // 🎫 TICKETS
          // =========================
          if (
            channel.name.includes("tickets")
          ) {

            await channel.permissionOverwrites.edit(
              guild.roles.everyone,
              {
                ViewChannel: true
              }
            );

            console.log(`🎫 Tickets configurado`);
          }

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
