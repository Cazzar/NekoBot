var Commander = require('discordful-commander');

/**
 * @param {Commander} cmder
 */
module.exports = function (cmder) {
    cmder
        .command('nya', {
            desc: 'Nya~~~'
        }, function(msg) {
            this.reply(`Ny${Array(Math.floor(Math.random() * (10 - 2)) + 2).join("a")}~`);
        });

        cmder
        .command('pet', {
            desc: 'Purr'
        }, function(msg) {
            this.reply(`*Pu${Array(Math.floor(Math.random() * (15 - 3)) + 3).join("r")}~*`);
        });
};