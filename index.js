require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// 📦 colección de comandos (por si luego agregas prefix commands)
client.commands = new Collection();

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

// 👋 bienvenida
if (fs.existsSync('./systems/welcomeSystem.js')) {
  require('./systems/welcomeSystem');
}

// 👋 despedida
if (fs.existsSync('./systems/goodbyeSystem.js')) {
  require('./systems/goodbyeSystem');
}

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