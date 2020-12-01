const leveling = require('discord-leveling');
const { description } = require('./kick');
const canvacord = require('canvacord');
const Discord = require('discord.js');
const level = require('../commands/level');

module.exports = {
    name: "level",
    description: "Getting yours or someone elses level!",

    async run (client, message, args) {
        if (message.deletable) message.delete();
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author || message.user.discriminator;
        let output = await leveling.Fetch(user.id);


        let rank = await leveling.Leaderboard({limit: 50, search: message.author.id})
        let profile = await leveling.Fetch(message.author.id);
        
        let image = await canvacord.rank({ 
            username: user.username, 
            discrim: user.discriminator, 
            level: output.level.toString(), 
            rank: rank.toString(), 
            neededXP: 100, 
            currentXP: output.xp,
            totalXP: output.level, 
            avatarURL: message.author.displayAvatarURL({ format: "png" }), 
            background: "./backround.png"
        });
        let attachment = new Discord.MessageAttachment(image, "rank.png");
        return message.channel.send(attachment).then(m => m.delete({timeout: 10000}));
        //return message.channel.send(`${user} is level ${output.level} with ${output.xp}/100`).then(m => m.delete({timeout: 30000}));
    }
}