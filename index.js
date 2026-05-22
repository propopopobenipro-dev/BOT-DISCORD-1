require('dotenv').config();

const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

// =========================
// 🤖 CREAR CLIENTE
// =========================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// 📦 colección de comandos
client.commands = new Collection();

// =========================
// 📂 IMPORTAR SISTEMAS
// =========================
const welcomeSystem = require("./systems/welcomeSystem");
const goodbyeSystem = require("./systems/goodbyeSystem");

// =========================
// 👋 EVENTOS DE ENTRADA/SALIDA
// =========================
client.on("guildMemberAdd", (member) => {
  welcomeSystem(member);
});

client.on("guildMemberRemove", (member) => {
  goodbyeSystem(member);
});

// =========================
// 📡 CARGAR EVENTOS
// =========================
const eventFiles = fs.readdirSync('./events').filter(f => f.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// =========================
// ⚙️ SISTEMAS AUTOMÁTICOS
// =========================
require('./systems/logSystem')(client);
require('./systems/automodSystem')(client);

// =========================
// 🔥 BOT READY
// =========================
client.once('ready', () => {
  console.log(`🔥 Bot conectado como ${client.user.tag}`);
});

// =========================
// 🚀 LOGIN
// =========================
client.login(process.env.TOKEN);
