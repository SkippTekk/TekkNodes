

const { Client,  Collection } = require('discord.js');
const client = new Client();

const { token, prefix } = require('./config.json');

//discord stats
let stats = {
    serverID: '675588702193451008',
    total: "753665462973366282",
    member: "753665754678689893",
    bots: "753665527313858643"
}
client.on('guildMemberAdd', member => {
    if(member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on('guildMemberRemove', member => {
    if(member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);

    
})
//give away information shit
const { GiveawaysManager } = require('discord-giveaways');
const config = require('./config.json');
client.config = config;
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaway.json",
    updateCountdownEvery: 1000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

//discord leveling
const leveling = require('discord-leveling');
//command handeler
const { readdirSync } = require('fs');

const { join } = require('path');

client.commands= new Collection();

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return message.channel.send("Sorry I don't work in DM's");

    let profile = await leveling.Fetch(message.author.id);
    leveling.AddXp(message.author.id, 1)

    if(profile.xp + 100 > 150){
        leveling.AddLevel(message.author.id, 1);
        leveling.SetXp(message.author.id, 0);
        message.channel.send(`Congrats ${message.author.username}, You just leveled up to ${profile.level +1}!`).then(m => m.delete({timeout: 5000}));
    }

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;

        try{
            client.commands.get(command).run(client, message, args);
        } catch (error) {
            console.log(error);
        }
    }
})

client.on("error", console.error);
client.on('ready', () => {
    console.log('logged in')
});
client.login(token)