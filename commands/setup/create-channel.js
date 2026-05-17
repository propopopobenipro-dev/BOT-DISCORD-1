const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-channel')
    .setDescription('Crea un canal de texto')
    .addStringOption(option =>
      option
        .setName('nombre')
        .setDescription('Nombre del canal')
        .setRequired(true)
    ),

  async execute(interaction) {
    const name = interaction.options.getString('nombre');

    await interaction.guild.channels.create({
      name: name,
      type: ChannelType.GuildText,
    });

    await interaction.reply(`✅ Canal **${name}** creado`);
  },
};