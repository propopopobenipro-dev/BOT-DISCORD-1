module.exports = async (message) => {

  const lines = message.content.split("\n");

  let roleData = {};

  for (const line of lines) {

    if (line.startsWith("name:")) {
      roleData.name = line.replace("name:", "").trim();
    }

    if (line.startsWith("color:")) {
      roleData.color = line.replace("color:", "").trim();
    }

    if (line.startsWith("permissions:")) {

      roleData.permissions = line
        .replace("permissions:", "")
        .split(",");

    }

    
    if (line === "") {

      if (roleData.name) {

        await message.guild.roles.create({
          name: roleData.name,
          color: roleData.color,
          permissions: roleData.permissions
        });

      }

      roleData = {};

    }

  }

};