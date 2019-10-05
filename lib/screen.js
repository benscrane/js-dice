const chalk = require('chalk');
const clear = require('clear');

exports.printScreen = function(data) {
    clear();
    data = data || {};
    const header = data.header || 'Welcome to JS Dice';
    console.log(chalk.green(header));
}