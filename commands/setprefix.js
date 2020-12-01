const db = require('quick.db');

module.exports= {
    name: "setprefix",
    description: "Set the servers prefix",

    async run (client, message, args) {
        if (message.deletable) message.delete();
        if(!message.member.hasPermission("MANAGE_GUILD")) return;

        if(!args[0]) return message.channel.send('Please provide a prefix you wish to use.').then(m => m.delete({timeout: 5000}))

        if(args[1]) return message.channel.send('The prefix can\'t have two spaces').then(m => m.delete({timeout: 5000}));

        db.set(`prefix_${message.guild.id}`, args[0])

        message.channel.send(`Prefix is now set to **${args[0]}** have a good day.`).then(m => m.delete({timeout: 5000}))
    }
}