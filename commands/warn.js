const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "smite",
    description:"warning a user of there action and logging",
    
    async run (client, message, args) {
	if (message.deletable) message.delete();
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Perms are denied.");

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Who is getting smacked...').then(m => m.delete({timeout: 10000}));
        if(user.bot) return message.channel.send('It\'s the humans i\'m after!').then(m => m.delete({timeout: 10000}));

        if(message.author.id === user.id) return message.channel.send('Warning yourself doesn\'t help me much...').then(m => m.delete({timeout: 10000}));
        if(message.guild.owner.id === user.id) return message.channel.send('uhhhhh. He\'s my boss. I ain\'t gonna touch that....').then(m => m.delete({timeout: 10000}));

        let reason = args.slice(1).join(" ");
        if(!reason) reason = 'Unspecified';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === 3 ) return message.channel.send('User has had over 3 or more warnings!').then(m => m.delete({timeout: 10000}));

        if(warnings === null){
            totalWarnings = db.get(`warnings_${message.guild.id}_${user.id}`)
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`You were warned in *` + message.guild.name + `*\n For the reason of ` + reason + `\n From ` + message.author);
            await message.channel.send(user.username + ` has a total of ` + totalWarning) + ` warning.`;
        }
        if(warnings !== null){
            totalWarnings = db.get(`warnings_${message.guild.id}_${user.id}`)
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`You were warned in *` + message.guild.name + `*\n For the reason of ` + reason + `\n From ` + message.author);
            await message.channel.send(user.username + ` has a total of ` + totalWarnings+ ` warning.`).then(m => m.delete({timeout: 10000}));
        }
    }
}
