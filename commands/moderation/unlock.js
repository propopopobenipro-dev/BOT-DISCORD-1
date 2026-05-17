if (!isAdmin(interaction.member)) {
  return interaction.reply({
    content: "❌ Solo admins pueden usar este comando",
    ephemeral: true
  });
}
const { SlashCommandBuilder } = require('discord.js');
const { ADMIN_ROLE_ID } = require('../../utils/permissions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Desbloquea canal'),

  async execute(interaction) {
    if (!interaction.member.roles.cache.has(ADMIN_ROLE_ID)) {
      return interaction.reply({ content: '❌ Sin permisos', ephemeral: true });
    }

    await interaction.deferReply();

    await interaction.channel.permissionOverwrites.edit(
      interaction.guild.roles.everyone,
      { SendMessages: true }
    );

    await interaction.editReply('🔓 Canal desbloqueado');
  }
};