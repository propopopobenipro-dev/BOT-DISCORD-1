require('dotenv').config();

const {
  REST,
  Routes,
  SlashCommandBuilder,
  PermissionFlagsBits
} = require('discord.js');

const commands = [

  new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banear usuario')
    .addUserOption(o =>
      o.setName('usuario').setDescription('Usuario').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulsar usuario')
    .addUserOption(o =>
      o.setName('usuario').setDescription('Usuario').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Borrar mensajes')
    .addIntegerOption(o =>
      o.setName('cantidad').setDescription('Cantidad').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Bloquear canal')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Desbloquear canal')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)

].map(c => c.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {

  try {
    console.log(`🚀 Registrando ${commands.length} comandos...`);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Listo');
  } catch (err) {
    console.error(err);
  }
})();