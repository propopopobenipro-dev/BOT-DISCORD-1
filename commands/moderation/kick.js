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
    .setName('kick')
    .setDescription('Expulsa usuario')
    .addUserOption(o =>
      o.setName('usuario').setDescription('usuario').setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.member.roles.cache.has(ADMIN_ROLE_ID)) {
      return interaction.reply({ content: '❌ Sin permisos', ephemeral: true });
    }

    const user = interaction.options.getUser('usuario');
    const member = await interaction.guild.members.fetch(user.id);

    await member.kick();
  });
}