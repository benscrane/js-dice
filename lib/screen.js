const term = require('terminal-kit').terminal;

exports.drawScreen = function(data) {
    data = data || {};
    data.title = data.title || 'JS Dice';
    data.game = data.game || {};
    term.reset();
    term.bell();
    term.bgBlue.white(centerLine(data.title));
    if (data.game.players !== undefined) {
        let players = data.game.players;
        let lives = data.game.lives;
        term('Players:  ');
        for (let i = 0; i < players.length; i++) {
            if (lives[i] > 0) {
                term(setWidth(players[i]));
            } else {
                term.bgRed(setWidth(players[i]));
            }
        }
        term('\n');
        term('Lives:    ');
        for (let i = 0; i < players.length; i++) {
            term(setWidth(lives[i]));
        }
        term('\n');
    }
}

function centerLine(line) {
    const startWhite = Math.floor((term.width - line.length) / 2);
    return " ".repeat(startWhite) + line + " ".repeat(term.width - line.length - startWhite);
}

function setWidth(string, length) {
    string = String(string);
    length = length || 10;
    string = string.trim();
    string += " ".repeat(length);
    return string.slice(0, length - 2);
}

