const screen = require('./lib/screen');

data = {
    game: {
        players: [
            'Ben',
            'Ennio',
            'Seamus'
        ]
    }
}

function startGame() {
    data.game.lives = [];
    for (let i = 0; i < data.game.players.length; i++) {
        data.game.lives.push(3);
    }
}
startGame();
screen.drawScreen(data);