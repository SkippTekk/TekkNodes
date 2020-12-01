const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
    name: "botinfo",

    async run (client, message, args) {
        if (message.deletable) message.delete();
    let botembed = new MessageEmbed()
    .setDescription(`Bot information || Creater <@267920707248193537>`)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RANDOM")
    .addField("Bot Name", client.user.username)
    .addField("Discords it's watching", client.guilds.cache.size)
    .setFooter(`Command ran by ${message.author.tag}`)
    .setTimestamp()

    return message.channel.send(botembed)
        
    }
}