const fs = require("fs");
const path = require("path");

module.exports = {
  name: "messageCreate",

  async execute(message) {

    if (message.author.bot) return;

    // =========================
    // 📁 TEMPLATE CHANNELS
    // =========================

    if (message.content === "!template") {

      if (!message.member.permissions.has("Administrator")) {
        return message.reply("❌ No tienes permisos.");
      }

      const filePath = path.join(
        __dirname,
        "../templates/channels.json"
      );

      const templates = JSON.parse(
        fs.readFileSync(filePath, "utf8")
      );

     const template = templates["ImperiumHub"];

      for (const categoryName in template) {

        const category =
          await message.guild.channels.create({
            name: categoryName,
            type: 4
          });

        for (const channelName of template[categoryName]) {

          await message.guild.channels.create({
            name: channelName,
            type: 0,
            parent: category.id
          });
        }
      }

      return message.reply(
        "✅ Template de canales creado."
      );
    }

    // =========================
    // 👑 TEMPLATE ROLES
    // =========================

    if (message.content === "!roles") {

      if (!message.member.permissions.has("Administrator")) {
        return message.reply("❌ No tienes permisos.");
      }

      const filePath = path.join(
        __dirname,
        "../templates/roles.json"
      );

      const templates = JSON.parse(
        fs.readFileSync(filePath, "utf8")
      );

      const roles = templates["nexusworks"];

      for (const role of roles) {

        await message.guild.roles.create({
          name: role.name,
          color: role.color,
          permissions: role.permissions,
          hoist: role.hoist || false
        });
      }

      return message.reply(
        "✅ Roles creados correctamente."
      );
    }
  }
};
