const term = require('terminal-kit').terminal;

exports.drawScreen = function(data) {
    data = data || {};
    data.title = data.title || 'JS Dice';
    data.game = data.game || {};
    data.game.turn = data.game.turn || 0;
    data.game.players = data.game.players || [];
    data.game.lives = data.game.lives || [];
    term.reset();
    term.bgBlue.white(centerLine(data.title));
    if (data.game.players.length > 0) {
        let players = data.game.players;
        let lives = data.game.lives;
        term('Players:  ');
        for (let i = 0; i < players.length; i++) {
            if (lives.length > 0 && lives[i] > 0) {
                if (data.game.turn === i) {
                    term.bgGreen(setWidth(players[i]));
                } else {
                    term(setWidth(players[i]));
                }
            } else if (lives.length === 0) {
                term(setWidth(players[i]));
            } else {
                term.bgRed(setWidth(players[i]));
            }
        }
        term('\n');
    }
    if (data.game.lives.length > 0) {
        let lives = data.game.lives;
        term.moveTo(1,3);
        term(setWidth('Lives:'));
        for (let i = 0; i < lives.length; i++) {
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
    return string.slice(0, length - 2) + " ".repeat(2);
}

exports.getPlayers = async function(data) {
    term.moveTo(1, term.height);
    term('Enter players: ');
    term.eraseLineAfter();
    let inputPromise = await term.inputField({
        maxLength: 8
    }).promise;
    let input = await inputPromise;
    return input;
}