const ms = require('ms')

module.exports ={
    name: "reroll",
    description: "Allows the giveaway to do a reroll",

    async run (client, message, args) {
        if (message.deletable) message.delete();
        if(!message.member.hasPermission("MANAGE_ROLES")) return;

        if(!args[0]) return message.channel.send('No giveaway ID was provided.')

        let giveaway =  client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
        if(!giveaway) return message.channel.send('Couldn\'t find giveaway... give me a name or ID');

        client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            message.channel.send('Giveaway has been rerolled!')
        })
        .catch((e) => {
            if(e.startsWith(`Giveaway with ID ${giveaway.messageID} is still going.`)){
                message.channel.send('This giveays hasn\'t ended yet!')
            } else{
                console.log(e);
                message.channel.send(`Error has accord ${e}`)
            }
        })

    }
}