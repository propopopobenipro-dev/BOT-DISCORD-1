const {
  PermissionFlagsBits,
  ChannelType
} = require("discord.js");

module.exports = {
  name: "setupperms",

  async execute(message) {

    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return message.reply("❌ Necesitas admin.");
    }

    const guild = message.guild;

    // =========================
    // 🎭 ROLES
    // =========================

    let staffRole = guild.roles.cache.find(r => r.name === "STAFF");

    if (!staffRole) {
      staffRole = await guild.roles.create({
        name: "STAFF",
        color: "Red",
        permissions: [
          PermissionFlagsBits.ManageMessages,
          PermissionFlagsBits.KickMembers,
          PermissionFlagsBits.BanMembers,
          PermissionFlagsBits.ManageChannels
        ]
      });
    }

    // =========================
    // 🔒 CONFIGURAR CANALES
    // =========================

    guild.channels.cache.forEach(async channel => {

      // STAFF
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

        await channel.permissionOverwrites.edit(
          staffRole,
          {
            ViewChannel: true,
            SendMessages: true
          }
        );
      }

      // TICKETS
      if (channel.name.includes("tickets")) {

        await channel.permissionOverwrites.edit(
          guild.roles.everyone,
          {
            ViewChannel: true,
            SendMessages: false
          }
        );

        await channel.permissionOverwrites.edit(
          staffRole,
          {
            ViewChannel: true,
            SendMessages: true
          }
        );
      }

      // REGLAS / ANUNCIOS
      if (
        channel.name.includes("reglas") ||
        channel.name.includes("anuncios")
      ) {

        await channel.permissionOverwrites.edit(
          guild.roles.everyone,
          {
            SendMessages: false
          }
        );
      }

    });

    message.reply("🔥 Permisos configurados automáticamente.");
  }
};
