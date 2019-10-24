const screen = require('./lib/screen');
const game = require('./lib/game');

data = {
    game: {
        players: [],
        finished: false,
        turn: 0,
        firstRoll: 0,
        numRolls: 3,
        rolls: [],
        lives: [],
        highest: null,
        lowest: null,
        previousLoser: 0,
        firstRoller: true
    }
}

function resetRound() {
    data.game.numRolls = 3;
    data.game.rolls = game.seedRolls(data.game.players);
    data.game.highest = null;
    data.game.lowest = null;
    data.game.firstRoller = true;
}

async function runRound() {
    // for each player alive, run turn
    let startIndex = data.game.previousLoser || 0;
    resetRound();
    for (let i = 0; i < data.game.players.length; i++) {
        let index = (i + startIndex) % data.game.players.length;
        if (data.game.lives[index] > 0) {
            data.game.turn = index;
            screen.drawScreen(data);
            screen.updateCurrentTurn(data.game);
            await runTurn();
        }
    }
    endRound();
    screen.drawScreen(data);
}

function endRound() {
    // find the loser, no ties yet
    data.game.highest = game.getHighestRoll(data.game.rolls);
    data.game.lowest = game.getLowestRoll(data.game.rolls);
    let loser = data.game.rolls.indexOf(data.game.lowest);
    let livesLost = data.game.highest == 21 ? 2 : 1;
    data.game.lives[loser]-= livesLost;
    if (data.game.lives[loser] < 0) {
        data.game.lives[loser] = 0;
    }
    // set next turn
    data.game.previousLoser = loser;
}

async function runTurn() {
    screen.updateThreshold(data.game);
    // let player roll
    let roll = 0;
    // roll automatically
    let rolledDice = game.rollDice();
    screen.updateRollDisplay(data.game, rolledDice, roll);
    roll++;
    while (roll < data.game.numRolls) {
        let rollResult = await screen.getRollDecision();
        if (rollResult === false) {
            break;
        }
        rolledDice = game.rollDice();
        screen.updateRollDisplay(data.game, rolledDice, roll);
        roll++;
    }
    // rolled dice is the final roll
    data.game.rolls[data.game.turn] = rolledDice;
    data.game.lowest = game.getLowestRoll(data.game.rolls);
    // if player is first, set limit on number of rolls
    if (data.game.firstRoller) {
        data.game.numRolls = roll;
        data.game.firstRoller = false;
    }
    screen.updateRolls(data.game);
    let keepPlaying = await screen.getContinueDecision();
    if (!keepPlaying) {
        process.exit();
    }
    screen.clearRollDisplay();
}

async function main() {
    screen.drawScreen(data);
    let input;
    do {
        input = await screen.getPlayers(data);
        if (input.trim().length > 0) {
            data.game.players.push(input.trim());
            screen.updatePlayers(data.game);
        }
    } while (input.trim().length > 0)
    data.game.lives = game.seedLives(data.game.players);
    data.game.rolls = game.seedRolls(data.game.players);
    screen.drawScreen(data);
    // game loop
    while (!data.game.finished && data.game.players.length > 0) {
        // run round
        await runRound();
        data.game.finished = game.isGameOver(data.game);
    }
    screen.clearRollDisplay();
    screen.endGame();
}

main();