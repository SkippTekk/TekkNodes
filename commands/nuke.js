module.exports = {
    name: 'nuke',
    description: 'Clears a number of messages.',

    async run (client, message, args) {
        if (message.deletable) message.delete();
        const amount = args.join(" ");
        if(!message.member.hasPermission("KICK_MEMBERS")) return;
        if(!message.guild.me.hasPermission("KICK_MEMBER")) return message.channel.send('Please guild master, my role needs to kick users for me to work....').then(m => m.delete({timeout: 5000}));
        if(!amount) return message.reply('Oi, i need a number please.').then(m => m.delete({timeout: 5000}));

        if(amount > 100) return message.reply('you cannot clear more then 100 messages dumbass.').then(m => m.delete({timeout: 5000}))

        if(amount < 1) return message.reply('durrr can\'t remove that number.').then(m => m.delete({timeout: 5000}))

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages)
        });

        message.channel.send(`${amount} message was nuked....`).then(m => m.delete({timeout: 5000}));
    }
}