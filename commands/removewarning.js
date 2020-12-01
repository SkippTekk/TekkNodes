const db = require('quick.db');

module.exports = {
    name: "pardon",
    description: "Removes a strike from a user",

    async run (client, message, args){
        if(!message.member.hasPermission('ADMINASTRATOR')) return;

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Who is getting smacked...');
        if(user.bot) return message.channel.send('It\'s the humans i\'m after!');

        if(user.id === message.author.id) return message.channel.send('You can\'t remove your own strikes...')

        if(warnings === null) return message.channel.send(`**${user.username}** has no warnings...`);

        db.delete(`warnings_${message.guild.id}_${user.id}`);

        message.channel.send('Strike has been removed.')
    }
}