const fs = require('fs');
const path = require('path');

const {
  PermissionsBitField,
  ChannelType
} = require('discord.js');

module.exports = {
  name: 'messageCreate',

  async execute(message) {
    if (message.author.bot) return;

    const prefix = '!';

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();

    // ==================================================
    // 🎭 !roles
    // ==================================================

    if (command === 'roles') {

      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return message.reply('❌ No tienes permisos');
      }

      const rolesData = require('../templates/roles.json').imperiumgeo;

      const mapPerms = (perms) => {
        if (!perms || perms.length === 0) return [];

        return perms
          .map(p => PermissionsBitField.Flags[p])
          .filter(Boolean);
      };

      await message.channel.send('🏗️ Creando roles...');

      for (const role of rolesData) {

        const existingRole = message.guild.roles.cache.find(
          r => r.name === role.name
        );

        if (existingRole) continue;

        try {

          await message.guild.roles.create({
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            permissions: mapPerms(role.permissions)
          });

          console.log(`✅ Rol creado: ${role.name}`);

        } catch (err) {

          console.log(`❌ Error creando rol ${role.name}`);
          console.log(err);

        }
      }

      return message.channel.send('🎭 Roles creados correctamente');
    }

    // ==================================================
    // 🏛️ !template
    // ==================================================

    if (command === 'template') {

      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return message.reply('❌ No tienes permisos');
      }

      const templateData = require('../templates/channels.json').imperiumgeo;

      await message.channel.send('🏗️ Creando estructura del servidor...');

      try {

        for (const categoryName in templateData) {

          let category = message.guild.channels.cache.find(
            c => c.name === categoryName &&
            c.type === ChannelType.GuildCategory
          );

          if (!category) {
            category = await message.guild.channels.create({
              name: categoryName,
              type: ChannelType.GuildCategory
            });
          }

          for (const channelName of templateData[categoryName]) {

            const existingChannel = message.guild.channels.cache.find(
              c => c.name === channelName
            );

            if (existingChannel) continue;

            await message.guild.channels.create({
              name: channelName,
              type: ChannelType.GuildText,
              parent: category.id
            });

            console.log(`✅ Canal creado: ${channelName}`);
          }
        }

        return message.channel.send('🏛️ Template creado correctamente');

      } catch (err) {

        console.log(err);
        return message.channel.send('❌ Error creando template');

      }
    }

    // ==================================================
    // 🛑 !stopbot
    // ==================================================

    if (command === 'stopbot') {

      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return message.reply('❌ No tienes permisos');
      }

      await message.channel.send('🛑 Apagando bot...');
      process.exit(0);
    }
  }
};