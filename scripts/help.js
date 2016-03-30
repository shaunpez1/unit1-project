module.exports = function(robot) {
    var rules = [];
    rules = "Here is a list of your commands: \n \"Weather\" Get the current weather \n \"Weather Temperature\" Get today's weather (in F) \n \"Weather Today\" Get today's forecast \n \"Weather This Week\" Get this weeks forcast \n \"Cruises (or Tours)\" Get list of cruises for the day \n \"Cruise or tour {number}\" Select cruise for more information e.g cruise 4";
    robot.hear(/^help$/i, function(msg) {
        msg.emote(rules);
        msg.emote("http://tinyurl.com/z3x4794");
    });

}
