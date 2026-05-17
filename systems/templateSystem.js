module.exports = async (message) => {

  const lines = message.content.split("\n");

  let currentCategory = null;

  for (const line of lines) {

    if (line.startsWith("[CATEGORY]")) {

      const categoryName = line.replace("[CATEGORY]", "").trim();

      currentCategory = await message.guild.channels.create({
        name: categoryName,
        type: 4
      });

    }


    if (line.startsWith("#")) {

      const channelName = line.replace("#", "").trim();

      await message.guild.channels.create({
        name: channelName,
        type: 0,
        parent: currentCategory.id
      });

    }

  }

};