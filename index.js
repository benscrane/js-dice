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
        highest: null,
        lowest: null
    }
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
    while (!data.game.finished) {
        screen.drawScreen(data);
        screen.updateCurrentTurn(data.game);
        let roll = 0;
        while (roll < data.game.numRolls) {
            let rollResult = await screen.getRollDecision();
            if (rollResult === false) {
                break;
            }
            // roll the dice, 
            let rolledDice = game.rollDice();
            screen.updateRollDisplay(data.game, rolledDice, roll);
            roll++;
        }
        data.game.finished = true;
    }
    screen.clearRollDisplay();
    screen.endGame();
}

main();