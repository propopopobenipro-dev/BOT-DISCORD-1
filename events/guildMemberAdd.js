const welcome = require('../systems/welcomeSystem');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    welcome(member);
  }
};