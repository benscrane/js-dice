const screen = require('./lib/screen');

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
screen.drawScreen(data);

async function main() {
    let input;
    do {
        input = await screen.getPlayers(data);
        if (input.trim().length > 0) {
            data.game.players.push(input.trim());
            screen.drawScreen(data);
        }
    } while (input.trim().length > 0)
    startGame();
    screen.drawScreen(data);
    process.exit();
}

main();