const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { printScreen } = require('./lib/screen');
const { getPlayers } = require('./lib/input');

const game = {};
async function main() {
    printScreen();
    game.players = await getPlayers();
    console.log(game.players);
}

console.log("Players entered");