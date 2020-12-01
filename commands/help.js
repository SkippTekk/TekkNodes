const pagination = require('discord.js-pagination');
const { MessageEmbed } = require('discord.js');

const prefix = require('../config.json')

module.exports = {
    name: "help1",
    description: "Gives the users the help they need!",

    async run (client, message, args) {
        if (message.deletable) message.delete();

        const moderation = new MessageEmbed()
            .setTitle('Moderation (staff only)')
            .addField(`kick`, 'Kicks a member using ID or mention.')
            .addField(`nuke`, 'Clears messages can\'t go above 100')
            .addField(`ban`, 'Bans the user with ID or mention')
            .setTimestamp()

        const fun = new MessageEmbed()

            .setTitle('Information')
            .setTimestamp()
        const utility = new MessageEmbed()
            .setTitle('Utility')
            .addField(`ping`, 'Ping between host and bot.')
            .addField(`help`, 'Gee how did you find this option?')
            .addField(`level`, 'Allows you to get someone\'s level in the discord!')
            .setTimestamp()

        const pages = [
            utility,
            fun,
            moderation
        ]

        const emojiList = ["⬅️", "➡️"]
        
        const timout = '120000';

        pagination(message, pages, emojiList, timout).then(m => m.delete({timeout: 120000}));
    }
}