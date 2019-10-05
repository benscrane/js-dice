const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.getPlayers = async function() {
    let players = [];
    const prefix = 'Enter players: ';
    rl.on('line', (line) => {
        console.log(line.trim().length);
        if (line.trim().length === 0) {
            rl.close();
        }
        players.push(line.trim());
        rl.setPrompt(prefix, prefix.length);
        rl.prompt();
    }).on('close', () => {
        process.exit(0);
        return players;
    });
    rl.setPrompt(prefix, prefix.length);
    rl.prompt();
}