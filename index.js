const screen = require('./lib/screen');
const game = require('./lib/game');

data = {
    game: {
        players: [],
        finished: false
    }
}

function startGame() {
    data.game.lives = [];
    for (let i = 0; i < data.game.players.length; i++) {
        data.game.lives.push(3);
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
    screen.drawScreen(data);
    process.exit();
}

main();