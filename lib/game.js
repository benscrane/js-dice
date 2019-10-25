'use strict';

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

//////////////////////////////

function getHighestRoll(rolls) {
    rolls = rolls.filter(n => n != null);
    let rankedRolls = rolls.map(n => RANKED_LIST.indexOf(n));
    return rolls[rankedRolls.indexOf(Math.max(...rankedRolls))];
}

function getLowestRoll(rolls) {
    rolls = rolls.filter(n => n != null);
    let rankedRolls = rolls.map(n => RANKED_LIST.indexOf(n));
    return rolls[rankedRolls.indexOf(Math.min(...rankedRolls))];
}

function numPlayersLeft(game) {
    let alive = game.lives.filter(l => l > 0).length;
    let went = game.rolls.filter(r => r > 0).length;
    return alive - went - 1;
}

const RANKED_LIST = [
    31, 32, 41, 42, 43, 51, 52, 53, 54, 61, 62, 63, 64, 65, 11, 22, 33, 44, 55, 66, 21
];

const PROBABILITIES = [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2
];

const CUMULATIVE_PROBS = [
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 36
];

function getRollProb(i) {
    return PROBABILITIES[i] / 36;
}

function getCumulRollProb(i) {
    return CUMULATIVE_PROBS[i] / 36;
}

module.exports = {
    rollDice,
    seedLives,
    seedRolls,
    RANKED_LIST,
    getRollProb,
    getCumulRollProb,
    isGameOver,
    getHighestRoll,
    getLowestRoll,
    numPlayersLeft
}