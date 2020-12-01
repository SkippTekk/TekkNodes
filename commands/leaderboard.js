const leveling = require('discord-leveling');
const { description } = require('./kick');
const canvacord = require('canvacord');
const Discord = require('discord.js')

module.exports = {
    name: "leaderboard",
    description: "Getting yours or someone elses level!",

    async run (client, message, args) {
        
         if (message.deletable) message.delete();
         message.channel.send('not working yet')
    }
}