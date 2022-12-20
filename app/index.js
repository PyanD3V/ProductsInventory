const Discord = require('discord.js');
const client = new Discord.Client();
const sqlite = require('better-sqlite3');
const db = new sqlite3("./src/database/sql.db");
const discordConfig = require('./src/configuration/credentials/discord.json');
const discordData = require('./src/configuration/data/discord.json');
const postedDB = require("./src/database/posted.json");
const prefix = discordData.PREFIX;
const userDataTable = db.prepare("CREATE TABLE IF NOT EXISTS alertChannel(guildId TEXT NOT NULL default '', channelId TEXT NOT NULL default '', PRIMARY KEY('guildId'));")
userDataTable.run();

client.on('ready', function() {
    console.log(client.user.username + " initialized.")
});

client.on('message', function(message){
if (!message.guild) return;
if (message.author.bot) return;
if (!message.content.startsWith(prefix)) return;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
try {
const commandFile = require('./src/commands/' + command + '.js');
commandFile.run(client, message, args, prefix, discordData, discordConfig, db);
} catch (err) {
if (discordData.ignoreErrors.some(iE => !err.message.startsWith(iE))) return;
console.log(err.message);
}
});
client.login(discordConfig.TOKEN);