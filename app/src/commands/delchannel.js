exports.run = function(client, message, args, prefix, discordData, discordConfig, db) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Necesitas el permiso `ADMINISTRADOR`.");
var channelDb = db.prepare(`SELECT * FROM alertChannel WHERE guildId = ${message.guild.id}`).get();
if (!channelDb) return message.channel.send(`No has configurado ningún canal de alertas en este servidor.`);
else {
    db.prepare(`DELETE FROM alertChannel WHERE guildId = ${message.guild.id}`).run();
    message.channel.send(`Has eliminado correctamente la configuración de alertas en este servidor.`);
};
};