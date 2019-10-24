"use strict";

function seedLives(players) {
    let lives = [];
    for (let i = 0; i < players.length; i++) {
        lives.push(3);
    }
    return lives;
};

function isGameOver(game) {
    let lives = game.lives.filter(l => l > 0);
    if (lives.length > 1) {
        return false;
    } else {
        return true;
    }
}

function seedRolls(players) {
    let rolls = [];
    for (let i = 0; i < players.length; i++) {
        rolls.push(null);
    }
    return rolls;
}

function rollDice() {
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    return Number([dice1, dice2].sort((a, b) => b - a).join(""));
};

// function for the union of probabilities
// P(A or B) = P(A) + P(B) - P(A and B)
function probabilityUnion(prob, numRolls, numPlayers) {
    if (numPlayers === 1) {
        return Math.pow(prob, numRolls);
    } else {
        return Math.pow(prob, numRolls) + probabilityUnion(prob, numRolls, numPlayers - 1) - (Math.pow(prob, numRolls) * probabilityUnion(prob, numRolls, numPlayers -1));
    }
}

function probStayAlive(roll, numRolls, numPlayers) {
    const index = RANKED_LIST.indexOf(roll);
    const prob = CUMULATIVE_PROBS[index] / 36;
    return probabilityUnion(prob, numRolls, numPlayers);
}

function probRollStays(roll, numRolls, numPlayers, lowRoll) {
    if (RANKED_LIST.indexOf(roll) >= RANKED_LIST.indexOf(lowRoll)) {
        return 1;
    } else if (numPlayers == 0){
        // no one after you and roll not the highest already, probability is 0
        return 0;
    } else {
        return probStayAlive(roll, numRolls, numPlayers);
    }
}

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

/**
 * 
 * @param {Number} roll - number just rolled by current player
 * @param {Number} numRolls - number of allowed rolls
 * @param {Number} numPlayers - number of players left after current player
 * @param {Number} rollNum - current roll of current player (1, 2, or 3)
 * @param {Number} lowRoll - current lowest established roll (default to 999 if no low roll established (player is first))
 * @returns {Boolean} - whether or not to roll again
 */
function shouldRollAgain(roll, numRolls, numPlayers, rollNum, lowRoll = 999) {
    if (rollNum >= 3 || (rollNum >= numRolls && lowRoll != 999)) return false;     //maximum rolls reached
    let currentProb = probRollStays(roll, numRolls, numPlayers, lowRoll);
    let newNumRolls = lowRoll == 999 ? numRolls + 1 : numRolls;
    let nextCumulProb = 0;
    for (let i = 0; i < RANKED_LIST.length; i++) {
        nextCumulProb += probRollStays(RANKED_LIST[i], newNumRolls, numPlayers, lowRoll) * PROBABILITIES[i];
    }
    let nextProb = nextCumulProb / 36;
    if (currentProb >= nextProb) {
        return false;
    } else {
        return true;
    }
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
    probabilityUnion,
    rollDice,
    seedLives,
    seedRolls,
    RANKED_LIST,
    getRollProb,
    getCumulRollProb,
    probStayAlive,
    shouldRollAgain,
    isGameOver,
    getHighestRoll,
    getLowestRoll,
    numPlayersLeft
}