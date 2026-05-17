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
    .setName('clear')
    .setDescription('Borra mensajes')
    .addIntegerOption(o =>
      o.setName('cantidad').setDescription('1-100').setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.member.roles.cache.has(ADMIN_ROLE_ID)) {
      return interaction.reply({ content: '❌ Sin permisos', ephemeral: true });
    }

    await interaction.deferReply();

    const amount = interaction.options.getInteger('cantidad');

    await interaction.channel.bulkDelete(amount, true);
  });
}