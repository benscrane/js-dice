'use strict';
const { RANKED_LIST } = require('./probHelpers');

/**
 * Creates an array containing the starting lives (3) for each player
 * @param {[String]} players - array of players' names
 * @returns {[Number]} - array of lives for each player
 */
function seedLives(players) {
    let lives = [];
    for (let i = 0; i < players.length; i++) {
        lives.push(3);
    }
    return lives;
};

/**
 * Creates an array of rolls for each player, starting as null
 * @param {[String]} players - array of players' names
 * @returns {[Number]} - array of rolls for each player, null
 */
function seedRolls(players) {
    let rolls = [];
    for (let i = 0; i < players.length; i++) {
        rolls.push(null);
    }
    return rolls;
}

/**
 * Checks if the game is over by looking at array of lives remaining
 * @param {[Number]} lives - array of all players' remaining lives
 * @returns {Boolean} - true if game is over, else false 
 */
function isGameOver(lives) {
    lives = lives.filter(l => l > 0);
    if (lives.length > 1) {
        return false;
    } else {
        return true;
    }
}

/**
 * Returns a random dice roll
 * @returns {Number} - a random, valid dice roll
 */
function rollDice() {
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    return Number([dice1, dice2].sort((a, b) => b - a).join(""));
};

/**
 * Returns the highest roll from a list of rolls
 * @param {[Number]} rolls - Array of rolls
 * @returns {Number} - the highest roll
 */
function getHighestRoll(rolls) {
    rolls = rolls.filter(n => n != null);
    let rankedRolls = rolls.map(n => RANKED_LIST.indexOf(n));
    return rolls[rankedRolls.indexOf(Math.max(...rankedRolls))];
}

/**
 * Returns the lowest roll from list of rolls
 * @param {[Number]} rolls - array of rolls
 * @returns {Number} - the lowest roll
 */
function getLowestRoll(rolls) {
    rolls = rolls.filter(n => n != null);
    let rankedRolls = rolls.map(n => RANKED_LIST.indexOf(n));
    return rolls[rankedRolls.indexOf(Math.min(...rankedRolls))];
}

/**
 * Returns the number of players left to go
 * Not counting the current player
 * @param {[Number]} lives - array of lives
 * @param {[Number]} rolls - array of rolls
 * @returns {Number} - number of players still alive
 */
function numPlayersLeft(lives, rolls) {
    let alive = lives.filter(l => l > 0).length;
    let went = rolls.filter(r => r > 0).length;
    return alive - went - 1;
}

module.exports = {
    rollDice,
    seedLives,
    seedRolls,
    isGameOver,
    getHighestRoll,
    getLowestRoll,
    numPlayersLeft
}