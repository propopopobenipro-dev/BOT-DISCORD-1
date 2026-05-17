const goodbye = require('../systems/goodbyeSystem');

module.exports = {
  name: 'guildMemberRemove',
  async execute(member) {
    goodbye(member);
  }
};