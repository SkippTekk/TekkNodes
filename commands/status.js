const db = require('quick.db');

module.exports = {
    name: "status",
    description: "Strikes a user in the discord",

    async run (client, message, args){
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author || message.user.userID;

        let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === null) warnings = 0;

        message.channel.send(`**${user.username}** has *${warnings}* warnings(s)`)
    }
}