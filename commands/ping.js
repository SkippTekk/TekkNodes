const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ping",
    description: "Pings the server.",

    async run (client, message, args) {
        if (message.deletable) message.delete();
        const msg = await message.channel.send(`Pinging....`);

        msg.edit(`Pong!
        Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        API Latency is ${Math.round(client.ws.ping)}ms`);
    }
};