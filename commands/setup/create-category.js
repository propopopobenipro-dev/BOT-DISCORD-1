const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-category')
    .setDescription('Crea una categoría')
    .addStringOption(option =>
      option
        .setName('nombre')
        .setDescription('Nombre de la categoría')
        .setRequired(true)
    ),

  async execute(interaction) {
    const name = interaction.options.getString('nombre');

    await interaction.guild.channels.create({
      name: name,
      type: ChannelType.GuildCategory,
    });

    await interaction.reply(`🏛️ Categoría **${name}** creada`);
  },
};