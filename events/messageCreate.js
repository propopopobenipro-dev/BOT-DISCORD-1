const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,

  async execute(message, client) {

    // 🚫 ignorar bots
    if (message.author.bot) return;

    // 🚫 ignorar si no empieza con !
    if (!message.content.startsWith("!")) return;

    // =========================
    // ⚙️ SETUP PERMISOS
    // =========================
    if (message.content === "!setupperms") {

      // 👑 solo admins
      if (!message.member.permissions.has("Administrator")) {
        return message.reply("❌ Necesitas permisos de administrador.");
      }

      const fs = require("fs");
      const path = require("path");
      const {
        PermissionFlagsBits,
        ChannelType
      } = require("discord.js");

      const channelsPath = path.join(__dirname, "..", "channels.json");

      if (!fs.existsSync(channelsPath)) {
        return message.reply("❌ No encontré channels.json");
      }

      const channelsData = JSON.parse(
        fs.readFileSync(channelsPath, "utf8")
      );

      await message.reply("⚙️ Configurando permisos automáticamente...");

      try {

        for (const templateName in channelsData) {

          const categories = channelsData[templateName];

          for (const categoryName in categories) {

            const channels = categories[categoryName];

            for (const channelName of channels) {

              const channel = message.guild.channels.cache.find(
                c => c.name === channelName
              );

              if (!channel) {
                console.log(`❌ Canal no encontrado: ${channelName}`);
                continue;
              }

              try {

                // 👋 WELCOME
                if (channelName.includes("welcome")) {

                  await channel.permissionOverwrites.edit(
                    message.guild.roles.everyone,
                    {
                      SendMessages: false,
                      ViewChannel: true
                    }
                  );

                }

                // 💀 GOODBYE
                else if (channelName.includes("goodbye")) {

                  await channel.permissionOverwrites.edit(
                    message.guild.roles.everyone,
                    {
                      SendMessages: false,
                      ViewChannel: true
                    }
                  );

                }

                // 📜 REGLAS
                else if (channelName.includes("reglas")) {

                  await channel.permissionOverwrites.edit(
                    message.guild.roles.everyone,
                    {
                      SendMessages: false,
                      AddReactions: false
                    }
                  );

                }

                // 📢 ANUNCIOS
                else if (channelName.includes("anuncios")) {

                  await channel.permissionOverwrites.edit(
                    message.guild.roles.everyone,
                    {
                      SendMessages: false
                    }
                  );

                }

                // 🔒 STAFF
                else if (
                  channelName.includes("staff") ||
                  channelName.includes("moderación") ||
                  channelName.includes("reportes") ||
                  channelName.includes("log")
                ) {

                  await channel.permissionOverwrites.edit(
                    message.guild.roles.everyone,
                    {
                      ViewChannel: false
                    }
                  );

                }

                console.log(`✅ Configurado: ${channelName}`);

              } catch (err) {

                console.log(`❌ Error en ${channelName}:`, err);

              }

            }

          }

        }

        message.channel.send("🔥 Setup de permisos terminado correctamente.");

      } catch (err) {

        console.error(err);

        message.channel.send("❌ Hubo un error configurando permisos.");

      }

    }

  }
};
