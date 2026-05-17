const config = require('../config/settings.json');

const {
  PermissionsBitField
} = require('discord.js');

function isAdmin(member) {
  return config.adminRoleIds.some(id =>
    member.roles.cache.has(id)
  );
}

module.exports = {
  name: 'interactionCreate',

  async execute(interaction) {

    if (!interaction.isChatInputCommand()) return;

    try {

      // ================= BAN =================
      if (interaction.commandName === 'ban') {

        if (!isAdmin(interaction.member))
          return interaction.reply({ content: '❌ Sin permisos', ephemeral: true });

        const user = interaction.options.getUser('usuario');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member)
          return interaction.reply({ content: '❌ No encontrado', ephemeral: true });

        await member.ban();
        return interaction.reply(`🔨 ${user.tag} baneado`);
      }

      // ================= KICK =================
      if (interaction.commandName === 'kick') {

        if (!isAdmin(interaction.member))
          return interaction.reply({ content: '❌ Sin permisos', ephemeral: true });

        const user = interaction.options.getUser('usuario');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member)
          return interaction.reply({ content: '❌ No encontrado', ephemeral: true });

        await member.kick();
        return interaction.reply(`👢 ${user.tag} expulsado`);
      }

      // ================= CLEAR =================
      if (interaction.commandName === 'clear') {

        if (!isAdmin(interaction.member))
          return interaction.reply({ content: '❌ Sin permisos', ephemeral: true });

        const amount = interaction.options.getInteger('cantidad');

        await interaction.channel.bulkDelete(amount, true);

        return interaction.reply({
          content: `🧹 ${amount} mensajes eliminados`,
          ephemeral: true
        });
      }

      // ================= LOCK =================
      if (interaction.commandName === 'lock') {

        if (!isAdmin(interaction.member))
          return interaction.reply({ content: '❌ Sin permisos', ephemeral: true });

        await interaction.channel.permissionOverwrites.edit(
          interaction.guild.roles.everyone,
          { SendMessages: false }
        );

        return interaction.reply('🔒 Canal bloqueado');
      }

      // ================= UNLOCK =================
      if (interaction.commandName === 'unlock') {

        if (!isAdmin(interaction.member))
          return interaction.reply({ content: '❌ Sin permisos', ephemeral: true });

        await interaction.channel.permissionOverwrites.edit(
          interaction.guild.roles.everyone,
          { SendMessages: true }
        );

        return interaction.reply('🔓 Canal desbloqueado');
      }

    } catch (err) {
      console.log(err);

      if (!interaction.replied) {
        return interaction.reply({
          content: '❌ Error',
          ephemeral: true
        });
      }
    }
  }
};
