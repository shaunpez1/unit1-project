module.exports = function(robot) {
    robot.respond(/hello/i, function(msg) {
        msg.reply("Hey there!");
    });
}
