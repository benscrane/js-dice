const term = require('terminal-kit').terminal;

exports.drawScreen = function(data) {
    data = data || {};
    data.title = data.title || 'JS Dice';
    data.game = data.game || {};
    data.game.turn = data.game.turn || 0;
    data.game.players = data.game.players || [];
    data.game.lives = data.game.lives || [];
    term.reset();
    term.setDefaultBgColorRgb(0,0,0);
    term.setDefaultColorRgb(255,255,255);
    term.bgBlue.white(centerLine(data.title));
    updatePlayers(data.game);
    if (data.game.lives.length > 0) {
        let lives = data.game.lives;
        term.moveTo(1,3);
        term(setWidth('Lives:'));
        for (let i = 0; i < lives.length; i++) {
            term(setWidth(lives[i]));
        }
        term('\n');
    }
    updateRolls(data.game);
}

function updateRolls(game) {
    if (game.rolls.length > 0) {
        let rolls = game.rolls;
        term.moveTo(1,4);
        term(setWidth('Rolls:'));
        for (let i = 0; i < rolls.length; i++) {
            let x = (i * 10) + 11;
            term.moveTo(x, 4);
            if (rolls[i] !== null) {
                term(setWidth(rolls[i]));
            }
        }
    }
}

exports.updateRolls = updateRolls;

function updateThreshold(game) {
    term.saveCursor();
    term.moveTo(1,5);
    if (game.lowest > 0 && !game.firstRoller) {
        term(`${game.lowest} in ${game.numRolls} rolls`)
    }
}
exports.updateThreshold = updateThreshold;

function updateCurrentTurn(game) {
    term.saveCursor();
    term.moveTo(1, 7);
    term.bgGreen.white(`${game.players[game.turn]}'s turn`);
    term.restoreCursor();
}
exports.updateCurrentTurn = updateCurrentTurn;

function updatePlayers(game) {
    game = game || {};
    players = game.players || [];
    lives = game.lives || [];
    turn = game.turn || 0;
    if (players.length > 0) {
        term.saveCursor();
        term.moveTo(1,2);
        term(setWidth('Players:'));
        for (let i = 0; i < players.length; i++) {
            if (lives.length === 0) {
                term(setWidth(players[i]));
            } else if (lives[i] === 0) {
                term.bgRed(setWidth(players[i]));
            } else if (turn === i) {
                term.bgGreen(setWidth(players[i]));
            } else {
                term(setWidth(players[i]));
            }
        }
        term.restoreCursor();
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
    term.eraseLine();
    term('Enter players: ');
    let inputPromise = await term.inputField({
        maxLength: 8
    }).promise;
    let input = await inputPromise;
    return input;
}

exports.updatePlayers = updatePlayers;

exports.endGame = function() {
    term.moveTo(1, term.height);
    process.exit();
}

exports.getRollDecision = async function() {
    term.moveTo(1, term.height);
    term.eraseLine();
    term('Press ENTER to roll; S to stay');
    let termPromise = await term.yesOrNo({ 
        yes: ['ENTER'],
        no: ['s', 'S']
    }).promise;
    let response = await termPromise;
    return response;
}

exports.getContinueDecision = async function() {
    term.moveTo(1, term.height);
    term.eraseLine();
    term('Press ENTER to continue; Q to quit');
    let termPromise = await term.yesOrNo({
        yes: ['ENTER'],
        no: ['q', 'Q']
    }).promise;
    let response = await termPromise;
    return response;
}

exports.updateRollDisplay= function(game, rolledDice, roll) {
    term.moveTo(1, 10 + roll);
    term(`${game.players[game.turn]} rolled ${rolledDice}`);
}

exports.clearRollDisplay = function() {
    term.moveTo(1, 10);
    term.eraseLine();
    term.moveTo(1, 11);
    term.eraseLine();
    term.moveTo(1, 12);
    term.eraseLine();
}