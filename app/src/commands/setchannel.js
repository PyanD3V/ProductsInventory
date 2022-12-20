exports.run = function(client, message, args, prefix, discordData, discordConfig, db) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Necesitas el permiso `ADMINISTRADOR`.");
var channel = message.mentions.channels.first() || message.channel;
var channelDb = db.prepare(`SELECT * FROM alertChannel WHERE guildId = ${message.guild.id}`).get();
if (!channelDb) {
    db.prepare(`INSERT INTO alertChannel(guildId, channelId) VALUES(${message.guild.id}, ${channel.id})`).run();
    message.channel.send(`Has configurado la configuración de alertas al canal ${channel}.`);
} else {
    db.prepare(`UPDATE alertChannel SET channelId = ${channel.id} WHERE guildId = ${message.guild.id}`).run();
    message.channel.send(`Has cambiado la configuración de alertas al canal ${channel}.`);
};
};