const express = require('express');
const app = express();
const { Client, Intents, Collection, Interaction  } = require('discord.js')
const discord = require("discord.js")
const fs = require('fs')
const config = require("./config.json")
const client = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: 32767,
});

module.exports = client;

client.on("ready", () => {
  console.log(`Bot made by Marus.!🧃#6958`.green)
  console.log(`Logged in as ${client.user.tag}`.cyan)
  client.user.setActivity("Marus Development", {
    type: "WATCHING",
  });
});

//new collections
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync('./commands');

//load the files
['command', 'slashCommand'].forEach((handler) => {
    require(`./handler/${handler}`)(client)
});


app.listen(8083, () => {
  console.log('Listening on port 8083')
});

app.get('/', (req, res) => {
  res.send(`<h2>Discord.js v13 Quick.db Ticket bot is alive!<h2>`)
});

client.on("guildMemberAdd", member => {

  var role = member.guild.roles.cache.get(config.role);

  if (!role) return;

  member.roles.add(role);

  let { MessageEmbed } = require("discord.js")
  console.log(`${member.user.tag} is ${config.servernaam} gejoined!`);
  var botEmbed = new discord.MessageEmbed()
      .setColor("#319CF3")
      .setTitle("👋 Welkom Bij Marus Development!")
      .setDescription(`Hallo <@${member.id}>, Welkom in **Marus Development™**!`)
      .setThumbnail('https://cdn.discordapp.com/attachments/1012371015919226892/1030182352875425913/logo.png', ({ dynamic: true, size: 4096 }))
      .setTimestamp()
      .setFooter(`© Marus Development`, `${client.user.displayAvatarURL()}`)
      .addFields(
          { name: "__Members__:", value: `> We hebben nu : **${member.guild.memberCount.toString()}**Members!` }
      )


  member.guild.channels.cache.get(config.welcome).send({
      content: `<@${member.id}>`,
      embeds: [botEmbed],
  })

});


client.login(config.token)